import DefaultLayout from "@/layouts/default";
import { Users, Handshake } from "lucide-react";
import { Button } from "@heroui/button";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="px-4 text-[#053559]">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex-1 space-y-6">
            <h1 className="text-4xl md:text-5xl font-extrabold">
              Améliorer vos relations <br />
              pour mieux vivre ensemble
            </h1>
            <p className="text-lg">
              Des ressources et des outils pour renforcer vos <br />
              liens familiaux, amicaux, professionnels ...
            </p>
            <div className="flex gap-4">
              <Button className="bg-[#053559] hover:bg-[#032842] text-white">
                Explorer les ressources
              </Button>
              <Button className="bg-[#f59e0b] hover:bg-[#d97706] text-white">
                S’inscrire
              </Button>
            </div>
          </div>

          <div className="flex-1 flex justify-center">
            <img
              src="/ressources-humaines.png"
              alt="Illustration relations humaines"
              className="w-[300px] md:w-[350px] rounded-xl"
            />
          </div>
        </div>
        <div className="max-w-6xl mx-auto mt-16 flex flex-col md:flex-row justify-between items-start gap-12">
          <div className="flex-1 text-center">
            <h2 className="text-4xl font-bold">Pour qui ? Pour quoi ?</h2>
            <div className="flex flex-col md:flex-row justify-center gap-8">
              <div className="flex flex-col items-center space-y-2 p-4 w-48">
                <Users size={70} />
                <h3 className="text-lg font-semibold">Citoyens</h3>
                <p className="text-sm text-center">Améliorer ses relations personnelles</p>
              </div>
              <div className="flex flex-col items-center space-y-2 p-4 w-48">
                <Handshake size={70} />
                <h3 className="text-lg font-semibold">Professionnels</h3>
                <p className="text-sm text-center">Accompagner et sensibiliser</p>
              </div>
            </div>
          </div>

          <div className="relative flex-1 max-w-md bg-[#fde3bc] rounded-xl p-6 shadow-md">
            <div className="absolute -left-4 top-8 w-0 h-0 border-y-[20px] border-y-transparent border-r-[20px] border-r-[#fde3bc]" />
            <h2 className="text-xl font-bold text-[#053559] mb-2">Notre mission</h2>
            <p className="text-sm text-[#053559]">
              Un projet pour reconnecter les humains, centré sur leurs besoins relationnels. <br />
              Basé sur la pyramide de Maslow, (RE)Sources Relationnelles propose des contenus
              adaptés à chaque situation pour favoriser l’empathie, l’écoute et la coopération.
            </p>
          </div>
        </div>

      </section>
    </DefaultLayout>
  );
}
