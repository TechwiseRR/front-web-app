import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";

export default function IndexPage() {
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

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
      <section className="flex flex-col items-center justify-center min-h-[70vh]">
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

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-6">
            <div className="flex flex-col gap-1">
              <label htmlFor="username" className="text-sm text-[#053559] font-medium">
                Nom d’utilisateur
              </label>
              <Input
                id="username"
                placeholder="Example.exp"
                value={form.username}
                onChange={handleChange}
                className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559]"
              />
              {errors.username && <span className="text-red-600 text-sm">{errors.username}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm text-[#053559] font-medium">
                Mot de passe
              </label>
              <Input
                id="password"
                type="password"
                placeholder="********"
                value={form.password}
                onChange={handleChange}
                className="bg-[#ede6f9] text-[#053559] placeholder:text-[#053559]"
              />
              {errors.password && <span className="text-red-600 text-sm">{errors.password}</span>}
            </div>

            <Button type="submit" className="bg-[#0a4267] hover:bg-[#06314f] text-white mt-2">
              Connexion
            </Button>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
