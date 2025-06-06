import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function IndexPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({} as Record<string, string>);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.username.trim()) newErrors.username = "Le nom d’utilisateur est requis.";
    if (!form.password) newErrors.password = "Le mot de passe est requis.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      alert("Connexion réussie !");
      // Appel API ou redirection ici
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-primary dark:text-white text-3xl md:text-4xl font-extrabold">
              Connexion
            </h1>
            <p className="text-primary text-sm mt-4">
              Pas encore de compte ?{" "}
              <a href="/inscription" className="text-secondary underline font-medium">
                S'inscrire
              </a>
            </p>
          </div>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              id="username"
              label="Nom d’utilisateur"
              value={form.username}
              onChange={handleChange}
              isInvalid={!!errors.username}
              errorMessage={errors.username}
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

            <Button type="submit" className="bg-primary text-white mt-2">
              Connexion
            </Button>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
