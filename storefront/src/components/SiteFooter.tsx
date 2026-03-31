import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="border-t border-brand-outline/10 bg-brand-cream-dark py-20 text-brand-text">
      <div className="container mx-auto px-6">
        <div className="mb-16 grid grid-cols-1 gap-16 md:grid-cols-4">
          <div className="md:col-span-2">
            <h3 className="mb-6 text-3xl text-brand-terracotta">Momo &amp; Cia</h3>
            <p className="max-w-md text-lg leading-relaxed opacity-80">
              Moda feminina feita para transformar autoestima em presenca, com
              catalogo vivo, imagens reais e vitrine conectada para uma
              experiencia de compra clara e elegante.
            </p>
          </div>

          <div>
            <h4 className="mb-6 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-navy">
              Navegacao
            </h4>
            <ul className="space-y-4 text-sm font-medium">
              <li>
                <Link href="/" className="transition-colors hover:text-brand-terracotta">
                  Inicio
                </Link>
              </li>
              <li>
                <Link
                  href="/colecao"
                  className="transition-colors hover:text-brand-terracotta"
                >
                  Produtos
                </Link>
              </li>
              <li>
                <Link href="/sobre" className="transition-colors hover:text-brand-terracotta">
                  Sobre nos
                </Link>
              </li>
              <li>
                <Link
                  href="/contato"
                  className="transition-colors hover:text-brand-terracotta"
                >
                  Fale conosco
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="mb-6 text-[0.6rem] font-bold uppercase tracking-[0.2em] text-brand-navy">
              Fale conosco
            </h4>
            <p className="mb-6 text-sm font-medium opacity-80">Sao Paulo, SP</p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer"
              className="inline-block border-b-2 border-brand-terracotta pb-1 text-sm font-bold text-brand-terracotta transition-opacity hover:opacity-70"
            >
              Enviar WhatsApp
            </a>
          </div>
        </div>

        <div className="dev-credit">
          Site desenvolvido por <strong>Minutare</strong> -
          <a
            href="mailto:emanoelmcedo@gmail.com"
            className="ml-1 underline hover:text-brand-terracotta"
          >
            emanoelmcedo@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}
