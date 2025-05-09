import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#053559]">Connexion</h1>
            <p className="text-center text-sm mt-4 text-[#053559]">
              Pas encore de compte ?{" "}
              <a href="/inscription" className="text-[#053559] underline font-medium">
                S'inscrire
              </a>
            </p>
          </div>

          <form className="flex flex-col gap-4">

            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm text-[#053559] font-medium">Nom d’utilisateur</label>
              <input id="username" type="text" placeholder="Example.exp" className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm text-[#053559] font-medium">Mot de passe</label>
              <input id="password" type="password" placeholder="********" className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full" />
            </div>

            <button type="submit" className="bg-[#0a4267] hover:bg-[#06314f] text-white text-lg py-2 px-4 rounded-lg shadow mt-2">
              Connexion
            </button>

          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
