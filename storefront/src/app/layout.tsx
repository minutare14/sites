import type { Metadata } from "next";
import { Noto_Serif, Manrope } from "next/font/google";
import "./globals.css";

const notoSerif = Noto_Serif({
  variable: "--font-noto-serif",
  subsets: ["latin"],
});

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Momo & Cia | Moda que Transforma",
  description: "Peças exclusivas e limitadas feitas para trazer a melhor essência de cada mulher. Sofisticação e empoderamento em São Paulo.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${notoSerif.variable} ${manrope.variable} antialiased min-h-screen bg-brand-cream text-brand-text`}>
        <header className="fixed top-0 w-full z-50 bg-brand-cream/80 backdrop-blur-xl border-b border-brand-outline/5">
          <nav className="container mx-auto px-6 h-20 flex items-center justify-between">
            <div className="text-2xl font-serif font-bold tracking-tighter text-brand-terracotta">
              MOMO & CIA
            </div>
            <div className="hidden md:flex gap-10 text-[0.7rem] uppercase tracking-[0.2em] font-bold text-brand-text/70">
              <a href="#" className="hover:text-brand-terracotta transition-colors">Home</a>
              <a href="#" className="hover:text-brand-terracotta transition-colors">Coleção</a>
              <a href="#" className="hover:text-brand-terracotta transition-colors">Sobre</a>
              <a href="#" className="hover:text-brand-terracotta transition-colors">Contato</a>
            </div>
            <div className="flex items-center gap-6">
              <button className="text-[0.7rem] uppercase tracking-[0.1em] font-bold text-brand-terracotta hover:underline">Entrar</button>
              <button className="bg-brand-terracotta text-white px-6 py-2 rounded-md text-[0.7rem] uppercase tracking-widest font-bold shadow-lg shadow-brand-terracotta/20 hover:scale-105 transition-transform">Carrinho</button>
            </div>
          </nav>
        </header>
        
        <main className="pt-20">{children}</main>

        <footer className="bg-brand-cream-dark border-t border-brand-outline/10 text-brand-text py-20">
          <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-16 mb-16">
              <div className="col-span-1 md:col-span-2">
                <h3 className="text-3xl font-serif mb-6 text-brand-terracotta">Momo & Cia</h3>
                <p className="text-lg font-light opacity-80 leading-relaxed max-w-md">
                  Acreditamos que a moda é uma forma de transformação e empoderamento. Peças exclusivas para a sua melhor essência.
                </p>
              </div>
              <div>
                <h4 className="font-bold mb-6 uppercase text-[0.6rem] tracking-[0.2em] text-brand-navy">Navegação</h4>
                <ul className="space-y-4 text-sm font-medium">
                  <li><a href="#" className="hover:text-brand-terracotta transition-colors">Início</a></li>
                  <li><a href="#" className="hover:text-brand-terracotta transition-colors">Produtos</a></li>
                  <li><a href="#" className="hover:text-brand-terracotta transition-colors">Sobre Nós</a></li>
                  <li><a href="#" className="hover:text-brand-terracotta transition-colors">Fale Conosco</a></li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold mb-6 uppercase text-[0.6rem] tracking-[0.2em] text-brand-navy">Fale Conosco</h4>
                <p className="text-sm opacity-80 mb-6 font-medium">São Paulo, SP</p>
                <a href="https://wa.me/5511999999999" target="_blank" className="inline-block border-b-2 border-brand-terracotta pb-1 text-brand-terracotta font-bold text-sm hover:opacity-70 transition-opacity">
                  Enviar WhatsApp
                </a>
              </div>
            </div>
            
            <div className="dev-credit">
              Site desenvolvido por <strong>Minutare</strong> —
              <a href="mailto:emanoelmcedo@gmail.com" className="ml-1 underline hover:text-brand-terracotta">emanoelmcedo@gmail.com</a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
