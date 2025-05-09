import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#053559]">Créez votre compte</h1>
            <p className="text-md mt-1 text-[#053559]">C’est rapide, sécurisé et gratuit</p>
          </div>

          <form className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="lastName" className="text-sm text-[#053559] font-medium">Nom</label>
              <input id="lastName" type="text" placeholder="Example" className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="firstName" className="text-sm text-[#053559] font-medium">Prénom</label>
              <input id="firstName" type="text" placeholder="Example" className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm text-[#053559] font-medium">Nom d’utilisateur</label>
              <input id="username" type="text" placeholder="Example.exp" className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="birthdate" className="text-sm text-[#053559] font-medium">Date de naissance</label>
              <input id="birthdate" type="date" defaultValue="2000-04-04" className="bg-[#ede6f9] text-[#053559] p-3 rounded-md w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm text-[#053559] font-medium">Email</label>
              <input id="email" type="email" placeholder="Example@gmail.com" className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm text-[#053559] font-medium">Mot de passe</label>
              <input id="password" type="password" placeholder="********" className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full" />
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="confirmPassword" className="text-sm text-[#053559] font-medium">Confirmation du mot de passe</label>
              <input id="confirmPassword" type="password" placeholder="********" className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full" />
            </div>

            <div className="flex items-start gap-2">
              <input id="terms" type="checkbox" className="mt-1" defaultChecked />
              <label htmlFor="terms" className="text-sm text-[#053559]">J’accepte les CGU et la politique de confidentialité</label>
            </div>

            <div className="flex items-start gap-2">
              <input id="newsletter" type="checkbox" className="mt-1" />
              <label htmlFor="newsletter" className="text-sm text-[#053559]">Je souhaite recevoir les ressources par mail</label>
            </div>

            <button type="submit" className="bg-[#0a4267] hover:bg-[#06314f] text-white text-lg py-2 px-4 rounded-lg shadow mt-2">
              Créer mon compte
            </button>

            <p className="text-center text-sm mt-4 text-[#053559]">
              Déjà inscrit ?{" "}
              <a href="/connexion" className="text-[#053559] underline font-medium">
                Se connecter
              </a>
            </p>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
