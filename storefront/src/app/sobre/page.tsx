import Navbar from "@/components/Navbar";

export default function AboutPage() {
  return (
    <div className="flex flex-col font-sans">
      <Navbar />
      <section className="section-padding bg-brand-cream mt-20">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <h4 className="uppercase text-[0.6rem] tracking-[0.3em] font-bold text-brand-navy mb-6">Nossa História</h4>
            <h1 className="text-5xl md:text-7xl font-serif mb-12 leading-tight">Momo & Cia: A Essência do <span className="italic">Empoderamento</span></h1>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
              <div className="space-y-8 text-lg font-light leading-relaxed text-brand-text/80">
                <p>
                  Fundada há dois anos em São Paulo, a Momo & Cia nasceu de um desejo profundo: transformar a relação das mulheres com a moda.
                </p>
                <p>
                  Nossa fundadora criou a marca com o intuito de fazer peças exclusivas para cada gosto, fugindo da produção em massa e focando no que realmente importa: a essência de quem veste.
                </p>
                <div className="p-8 bg-brand-terracotta/5 rounded-2xl border border-brand-outline/10 italic font-serif text-brand-terracotta">
                  "Trazer a melhor essência de cada pessoa é o nosso propósito maior."
                </div>
              </div>
              <div className="space-y-8 text-lg font-light leading-relaxed text-brand-text/80">
                <p>
                  Trabalhamos com coleções limitadas e poucas peças por modelo. Isso garante que sua escolha seja única, assim como sua trajetória.
                </p>
                <p>
                  Para nós, luxo é autenticidade. É autoestima. É o poder que cada um tem dentro de si e que floresce quando nos sentimos bem com o que vestimos.
                </p>
                <p className="font-bold text-brand-navy uppercase text-xs tracking-widest mt-8">
                  Autenticidade • Dedicação • Autoestima
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
