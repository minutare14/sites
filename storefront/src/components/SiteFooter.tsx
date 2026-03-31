import Link from "next/link";

export default function SiteFooter() {
  return (
    <footer className="mt-16 bg-brand-accent text-brand-surface">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-6 py-16 md:px-10 lg:px-14">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div className="space-y-5">
            <h3 className="font-serif text-2xl font-medium text-brand-surface">
              MOMO &amp; CIA
            </h3>
            <p className="max-w-sm text-sm leading-7 text-white/65">
              Curadoria feminina com linguagem editorial, pecas limitadas e
              presenca silenciosa para um guarda-roupa atemporal.
            </p>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
              Shop
            </p>
            <Link href="/colecao" className="block text-sm text-white/80 transition hover:text-white">
              Colecao completa
            </Link>
            <Link href="/colecao" className="block text-sm text-white/80 transition hover:text-white">
              Novidades
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
              Marca
            </p>
            <Link href="/sobre" className="block text-sm text-white/80 transition hover:text-white">
              Sobre
            </Link>
            <Link href="/contato" className="block text-sm text-white/80 transition hover:text-white">
              Contato
            </Link>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-medium uppercase tracking-[0.28em] text-white/55">
              Concierge
            </p>
            <p className="text-sm text-white/80">Sao Paulo, SP</p>
            <a
              href="https://wa.me/5511999999999"
              target="_blank"
              rel="noreferrer"
              className="inline-flex text-sm text-white underline underline-offset-6 transition hover:text-brand-warm"
            >
              Enviar WhatsApp
            </a>
          </div>
        </div>

        <div className="flex flex-col gap-4 border-t border-white/10 pt-6 text-xs uppercase tracking-[0.22em] text-white/50 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Momo &amp; Cia. Todos os direitos reservados.</p>
          <div className="dev-credit border-0 p-0 text-right">
            SITE DESENVOLVIDO POR <strong>MINUTARE</strong>
            <a
              href="mailto:emanoelmcedo@gmail.com"
              className="ml-2 underline underline-offset-4 hover:text-white"
            >
              EMANOELMCEDO@GMAIL.COM
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
