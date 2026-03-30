import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative flex min-h-[90vh] items-center overflow-hidden font-sans">
      <div className="container mx-auto grid h-full grid-cols-1 items-center gap-8 px-6 md:grid-cols-12">
        <div className="z-10 flex flex-col justify-center gap-8 md:col-span-6 md:pl-16">
          <h1 className="text-6xl leading-[0.9] text-brand-terracotta md:text-8xl">
            Moda que <br />
            <span className="italic">transforma</span>
          </h1>
          <p className="max-w-md text-xl text-brand-text/80 md:text-2xl">
            Pecas exclusivas e limitadas, agora conectadas a um catalogo real e
            editavel.
          </p>
          <div className="mt-4 flex flex-wrap gap-6">
            <Link href="/colecao" className="btn-primary">
              Descobrir colecao
            </Link>
            <Link href="/sobre" className="btn-secondary">
              Nossa historia
            </Link>
          </div>
        </div>

        <div className="relative h-[70vh] md:col-span-6 md:h-[100vh]">
          <div className="absolute top-1/2 left-1/2 -z-10 h-[120%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-cream-dark/30 blur-3xl" />
          <div className="relative h-full w-full p-4">
            <div className="relative h-full w-full overflow-hidden rounded-2xl bg-brand-terracotta/5 shadow-2xl">
              <div className="absolute inset-0 flex items-center justify-center text-4xl uppercase tracking-widest text-brand-terracotta/20 italic select-none">
                Momo &amp; Cia
              </div>
              <div className="absolute top-12 left-10 max-w-xs rounded-2xl border border-brand-outline/10 bg-brand-cream/80 p-6 backdrop-blur">
                <p className="text-xs font-bold uppercase tracking-[0.3em] text-brand-navy">
                  Edicoes limitadas
                </p>
                <p className="mt-3 text-lg leading-relaxed text-brand-text/80">
                  Vestidos, conjuntos, saias e alfaiataria com elegancia leve,
                  sofisticacao e precos acessiveis.
                </p>
              </div>
              <div className="absolute right-12 bottom-12 w-32 rounded-full border-2 border-brand-terracotta/20 p-5 text-center text-xs font-bold uppercase tracking-[0.3em] text-brand-terracotta">
                Catalogo vivo
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
