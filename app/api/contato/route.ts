// Recebe o formulário de contato e envia por e-mail para a Nexo via Resend (https://resend.com).
// Variáveis em .env.local: RESEND_API_KEY, CONTACT_TO_EMAIL e, opcional, CONTACT_FROM_EMAIL.

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

const field = (data: Record<string, unknown>, key: string, max: number) =>
  typeof data[key] === "string" ? (data[key] as string).trim().slice(0, max) : "";

// Assunto do e-mail é uma linha só: quebras de linha viram espaço.
const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ");

const SEND_ERROR = "Não foi possível enviar agora. Tente de novo ou fale pelo WhatsApp.";

export async function POST(req: Request) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return Response.json({ error: "Requisição inválida." }, { status: 400 });
  }

  // Campo invisível: se veio preenchido, é robô. Responde ok sem enviar.
  if (field(data, "site", 200)) return Response.json({ ok: true });

  const nome = field(data, "nome", 120);
  const restaurante = field(data, "restaurante", 160);
  const email = field(data, "email", 200);
  const telefone = field(data, "telefone", 40);
  const mensagem = field(data, "mensagem", 4000);

  if (!nome || !mensagem || !EMAIL_RE.test(email)) {
    return Response.json({ error: "Preencha nome, e-mail válido e mensagem." }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !to) {
    console.error("Formulário de contato: defina RESEND_API_KEY e CONTACT_TO_EMAIL no .env.local");
    return Response.json({ error: "Envio indisponível no momento. Fale com a gente pelo WhatsApp." }, { status: 500 });
  }

  const rows: [string, string][] = [
    ["Nome", nome],
    ["Restaurante", restaurante || "—"],
    ["E-mail", email],
    ["WhatsApp / telefone", telefone || "—"],
  ];
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\nMensagem:\n${mensagem}`;
  const html = `${rows.map(([k, v]) => `<p><strong>${k}:</strong> ${esc(v)}</p>`).join("")}
<p><strong>Mensagem:</strong></p><p style="white-space:pre-wrap">${esc(mensagem)}</p>`;

  let res: Response;
  try {
    res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM_EMAIL || "nexo.menu <onboarding@resend.dev>",
        to: [to],
        reply_to: email,
        subject: oneLine(`Novo contato pelo site: ${nome}${restaurante ? ` (${restaurante})` : ""}`),
        text,
        html,
      }),
      signal: AbortSignal.timeout(10_000), // não deixa a requisição presa se o Resend travar
    });
  } catch (err) {
    console.error("Resend inacessível:", err);
    return Response.json({ error: SEND_ERROR }, { status: 502 });
  }

  if (!res.ok) {
    console.error("Resend falhou:", res.status, await res.text());
    return Response.json({ error: SEND_ERROR }, { status: 502 });
  }

  return Response.json({ ok: true });
}
