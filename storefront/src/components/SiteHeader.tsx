import Link from "next/link";

const links = [
  { href: "/", label: "Home" },
  { href: "/colecao", label: "Colecao" },
  { href: "/sobre", label: "Sobre" },
  { href: "/contato", label: "Contato" },
];

const showAdminLink = process.env.NEXT_PUBLIC_SHOW_ADMIN_LINK === "true";

export default function SiteHeader() {
  return (
    <header className="fixed top-0 z-50 w-full border-b border-brand-outline/5 bg-brand-cream/80 backdrop-blur-xl">
      <nav className="container mx-auto flex h-20 items-center justify-between px-6">
        <Link
          href="/"
          className="text-2xl font-serif font-bold tracking-tighter text-brand-terracotta"
        >
          MOMO &amp; CIA
        </Link>

        <div className="hidden gap-10 text-[0.7rem] font-bold uppercase tracking-[0.2em] text-brand-text/70 md:flex">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-brand-terracotta"
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-4 md:gap-6">
          {showAdminLink ? (
            <a
              href={process.env.NEXT_PUBLIC_SALEOR_DASHBOARD_URL || "/app/"}
              className="text-[0.7rem] font-bold uppercase tracking-[0.1em] text-brand-terracotta hover:underline"
            >
              Admin Saleor
            </a>
          ) : null}
          <Link
            href="/colecao"
            className="rounded-md bg-brand-terracotta px-6 py-2 text-[0.7rem] font-bold uppercase tracking-widest text-white shadow-lg shadow-brand-terracotta/20 transition-transform hover:scale-105"
          >
            Comprar
          </Link>
        </div>
      </nav>
    </header>
  );
}
