import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/colecao", label: "Colecao" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

const showAdminLink = process.env.NEXT_PUBLIC_SHOW_ADMIN_LINK === "true";

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current">
      <circle cx="11" cy="11" r="7" strokeWidth="1.8" />
      <path d="M20 20L16.65 16.65" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function BagIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 stroke-current">
      <path
        d="M6.5 8.5H17.5L16.4 19.5H7.6L6.5 8.5Z"
        strokeWidth="1.8"
        strokeLinejoin="round"
      />
      <path
        d="M9 9V7.75C9 6.23122 10.2312 5 11.75 5H12.25C13.7688 5 15 6.23122 15 7.75V9"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

export default function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-4 z-50 px-4 md:px-8">
      <nav className="mx-auto flex max-w-[1440px] items-center justify-between rounded-full border border-white/20 bg-brand-surface/88 px-5 py-4 text-brand-ink shadow-[0_18px_50px_-30px_rgba(17,10,7,0.65)] backdrop-blur-xl md:px-8">
        <Link
          href="/"
          className="font-serif text-[1.9rem] font-medium tracking-[-0.04em] text-brand-ink"
        >
          MOMO &amp; CIA
        </Link>

        <div className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="font-serif text-lg italic text-brand-muted transition-colors hover:text-brand-accent"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          <Link
            href="/colecao"
            aria-label="Explorar colecao"
            className="text-brand-ink/80 transition hover:text-brand-accent"
          >
            <SearchIcon />
          </Link>
          <Link
            href="/contato"
            aria-label="Entrar em contato"
            className="text-brand-ink/80 transition hover:text-brand-accent"
          >
            <BagIcon />
          </Link>
          {showAdminLink ? (
            <a
              href={process.env.NEXT_PUBLIC_SALEOR_DASHBOARD_URL || "/app/"}
              className="hidden text-[0.7rem] font-medium uppercase tracking-[0.18em] text-brand-accent underline underline-offset-4 md:inline-flex"
            >
              Admin Saleor
            </a>
          ) : null}
          <Link
            href="/colecao"
            className="btn-primary hidden md:inline-flex"
          >
            Ver colecao
          </Link>
        </div>
      </nav>
    </header>
  );
}
