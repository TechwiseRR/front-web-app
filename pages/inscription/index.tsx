import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { Checkbox } from "@heroui/checkbox";

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
      <section className="flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-primary text-3xl md:text-4xl font-extrabold">
              Créez votre compte
            </h1>
            <p className="text-primary text-md mt-1">
              C’est rapide, sécurisé et gratuit
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="lastName"
              label="Nom"
              value={form.lastName}
              onChange={handleChange}
              isInvalid={!!errors.lastName}
              errorMessage={errors.lastName}
            />
            <Input
              id="firstName"
              label="Prénom"
              value={form.firstName}
              onChange={handleChange}
              isInvalid={!!errors.firstName}
              errorMessage={errors.firstName}
            />
            <Input
              id="username"
              label="Nom d’utilisateur"
              value={form.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              errorMessage={errors.username}
            />
            <Input
              id="email"
              type="email"
              label="Email"
              value={form.email}
              onChange={handleChange}
              isInvalid={!!errors.email}
              errorMessage={errors.email}
            />
            <Input
              id="password"
              type="password"
              label="Mot de passe"
              value={form.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
              errorMessage={errors.password}
            />
            <Input
              id="confirmPassword"
              type="password"
              label="Confirmation du mot de passe"
              value={form.confirmPassword}
              onChange={handleChange}
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
            />
            <Input
              id="birthdate"
              type="date"
              label="Date de naissance"
              value={form.birthdate}
              onChange={handleChange}
            />

            <div className="flex items-start gap-2 mt-2">
              <Checkbox
                id="terms"
                checked={form.terms}
                onCheckedChange={(checked) =>
                  handleChange({
                    target: {
                      id: "terms",
                      type: "checkbox",
                      checked,
                    },
                  } as any)
                }
              />
              <label htmlFor="terms" className="text-primary text-sm">
                J’accepte les CGU et la politique de confidentialité
              </label>
            </div>
            {errors.terms && (
              <span className="text-red-600 text-sm">{errors.terms}</span>
            )}

            <div className="flex items-start gap-2">
              <Checkbox
                id="newsletter"
                checked={form.newsletter}
                onCheckedChange={(checked) =>
                  handleChange({
                    target: {
                      id: "newsletter",
                      type: "checkbox",
                      checked,
                    },
                  } as any)
                }
              />
              <label htmlFor="newsletter" className="text-primary text-sm">
                Je souhaite recevoir les ressources par mail
              </label>
            </div>

            <Button type="submit" className="bg-primary text-white mt-4">
              Créer mon compte
            </Button>

            <p className="text-primary text-center text-sm mt-4">
              Déjà inscrit ?{" "}
              <a href="/connexion" className="text-primary font-medium underline">
                Se connecter
              </a>
            </p>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
