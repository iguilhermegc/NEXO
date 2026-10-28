import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Geist } from "next/font/google";
import { SmoothScroll } from "@/components/SmoothScroll";
import "./globals.css";

const serif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-serif",
  display: "swap",
});

const sans = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "O cliente encosta o celular na mesa, vê o vídeo do prato, chama o garçom e pede a conta. A gente monta e atualiza tudo para você.";

export const metadata: Metadata = {
  title: "NEXO",
  description,
  openGraph: {
    title: "NEXO",
    description,
    siteName: "nexo.menu",
    locale: "pt_BR",
    type: "website",
  },
};

export const viewport: Viewport = {
  themeColor: "#f7efe6",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${serif.variable} ${sans.variable}`}>
      <body>
        <SmoothScroll />
        {children}
      </body>
    </html>
  );
}
