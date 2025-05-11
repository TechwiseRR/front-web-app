import { useState } from "react";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  const [form, setForm] = useState({
    lastName: "",
    firstName: "",
    username: "",
    birthdate: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: true,
    newsletter: false,
  });

  const [errors, setErrors] = useState({} as Record<string, string>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, type, value, checked } = e.target;
    setForm({ ...form, [id]: type === "checkbox" ? checked : value });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!form.lastName.trim()) newErrors.lastName = "Le nom est requis.";
    if (!form.firstName.trim()) newErrors.firstName = "Le prénom est requis.";
    if (!form.username.trim()) newErrors.username = "Le nom d’utilisateur est requis.";

    if (!form.email) {
      newErrors.email = "L’email est requis.";
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(form.email)) {
      newErrors.email = "Format d’email invalide.";
    }

    if (!form.password) {
      newErrors.password = "Le mot de passe est requis.";
    } else if (form.password.length < 6) {
      newErrors.password = "Le mot de passe doit faire au moins 6 caractères.";
    }

    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Les mots de passe ne correspondent pas.";
    }

    if (!form.terms) {
      newErrors.terms = "Vous devez accepter les conditions.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Formulaire soumis avec succès !");
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center">
        <div className="w-full max-w-md flex flex-col">
          <div className="text-center">
            <h1 className="text-3xl md:text-4xl font-extrabold text-[#053559]">Créez votre compte</h1>
            <p className="text-md mt-1 text-[#053559]">C’est rapide, sécurisé et gratuit</p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-4">
            {["lastName", "firstName", "username", "email", "password", "confirmPassword"].map((field) => (
              <div key={field} className="flex flex-col gap-1">
                <label htmlFor={field} className="text-sm text-[#053559] font-medium capitalize">
                  {field === "confirmPassword" ? "Confirmation du mot de passe" : field === "lastName" ? "Nom" : field === "firstName" ? "Prénom" : field === "username" ? "Nom d’utilisateur" : field}
                </label>
                <input
                  id={field}
                  type={field.includes("password") ? "password" : field === "email" ? "email" : "text"}
                  placeholder={field === "email" ? "example@mail.com" : "Example"}
                  className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559] p-3 rounded-md w-full"
                  value={(form as any)[field]}
                  onChange={handleChange}
                />
                {errors[field] && <span className="text-red-600 text-sm">{errors[field]}</span>}
              </div>
            ))}

            <div className="flex flex-col gap-1">
              <label htmlFor="birthdate" className="text-sm text-[#053559] font-medium">Date de naissance</label>
              <input
                id="birthdate"
                type="date"
                value={form.birthdate}
                onChange={handleChange}
                className="bg-[#ede6f9] text-[#053559] p-3 rounded-md w-full"
              />
            </div>

            <div className="flex items-start gap-2">
              <input id="terms" type="checkbox" className="mt-1" checked={form.terms} onChange={handleChange} />
              <label htmlFor="terms" className="text-sm text-[#053559]">J’accepte les CGU et la politique de confidentialité</label>
            </div>
            {errors.terms && <span className="text-red-600 text-sm">{errors.terms}</span>}

            <div className="flex items-start gap-2">
              <input id="newsletter" type="checkbox" className="mt-1" checked={form.newsletter} onChange={handleChange} />
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
