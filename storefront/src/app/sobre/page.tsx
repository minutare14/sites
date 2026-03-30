export default function AboutPage() {
  return (
    <section className="section-padding bg-brand-cream">
      <div className="container mx-auto px-6">
        <div className="mx-auto max-w-4xl">
          <h4 className="mb-6 text-[0.6rem] font-bold uppercase tracking-[0.3em] text-brand-navy">
            Nossa historia
          </h4>
          <h1 className="mb-12 text-5xl leading-tight md:text-7xl">
            Momo &amp; Cia: a essencia do <span className="italic">empoderamento</span>
          </h1>

          <div className="grid grid-cols-1 items-start gap-16 md:grid-cols-2">
            <div className="space-y-8 text-lg leading-relaxed text-brand-text/80">
              <p>
                Fundada em Sao Paulo, a Momo &amp; Cia nasceu do desejo de
                transformar a relacao das mulheres com a moda por meio de pecas
                exclusivas e de pouca tiragem.
              </p>
              <p>
                A marca foi criada para oferecer escolhas delicadas, acessiveis
                e seguras para quem busca autenticidade sem abrir mao de
                sofisticacao.
              </p>
              <div className="rounded-2xl border border-brand-outline/10 bg-brand-terracotta/5 p-8 font-serif italic text-brand-terracotta">
                "Trazer a melhor essencia de cada pessoa e o nosso proposito
                maior."
              </div>
            </div>

            <div className="space-y-8 text-lg leading-relaxed text-brand-text/80">
              <p>
                Trabalhamos com colecoes limitadas, poucas pecas por modelo e
                um olhar atento para caimento, cor e presenca visual.
              </p>
              <p>
                Para nos, luxo e autenticidade. E autoestima. E o poder que
                floresce quando a mulher se reconhece no que veste.
              </p>
              <p className="mt-8 text-xs font-bold uppercase tracking-widest text-brand-navy">
                Autenticidade • Dedicacao • Autoestima
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
