"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { useAuthStore } from "@/stores/useAuthStore";

export default function IndexPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({} as Record<string, string>);
  const [apiError, setApiError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const login = useAuthStore((state) => state.login);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setForm((prev) => ({ ...prev, [id]: value }));
    setErrors((prev) => ({ ...prev, [id]: "" }));
    setApiError(null);
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!form.email.trim()) newErrors.email = "L'adresse email est requise.";
    if (!form.password) newErrors.password = "Le mot de passe est requis.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    setApiError(null);

    try {
      const success = await login(form.email, form.password);

      if (!success) {
        setApiError("Email ou mot de passe invalide.");
        return;
      }

      router.push("/");
    } catch (err) {
      console.error(err);
      setApiError("Erreur réseau. Veuillez réessayer.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center px-4 py-8">
        <div className="w-full max-w-md flex flex-col">
          <div className="text-center mb-6">
            <h1 className="text-primary text-3xl md:text-4xl font-extrabold">
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

            {apiError && (
              <p className="text-red-500 text-sm mt-2">{apiError}</p>
            )}

            <Button
              type="submit"
              className="bg-primary text-white mt-2"
              isLoading={loading}
              disabled={loading}
            >
              Connexion
            </Button>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
