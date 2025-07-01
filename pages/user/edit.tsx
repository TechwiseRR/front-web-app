"use client";

import DefaultLayout from "@/layouts/default";
import { Input } from "@heroui/input";
import { Select, SelectItem } from "@heroui/select";
import { Button } from "@heroui/button";
import { useState } from "react";
import router from "next/router";

export default function UserEditPage() {
  // Exemple de données pré-remplies pour l'utilisateur
  const [user, setUser] = useState({
    name: "Jean Dupont",
    email: "jean@exemple.com",
    status: "actif",
  });

  const handleChange = (field: keyof typeof user, value: string) => {
    setUser({ ...user, [field]: value });
  };

  const handleSubmit = () => {
    console.log("Utilisateur mis à jour :", user);
    // ici : appel API, redirection, toast, etc.
  };

  const handleCancel = () => {
    router.push("/user/list");
  };

  return (
    <DefaultLayout>
      <section className="px-4 py-10 text-primary">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl font-extrabold">Modifier l'utilisateur</h1>
          <p className="text-lg">Modifiez les informations du compte utilisateur.</p>

          <form className="space-y-6">
            <div className="space-y-2">
              <label className="block font-medium">Nom complet</label>
              <Input
                value={user.name}
                onChange={(e) => handleChange("name", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Adresse email</label>
              <Input
                value={user.email}
                onChange={(e) => handleChange("email", e.target.value)}
                className="w-full"
              />
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Statut</label>
              <Select
                selectedKeys={[user.status]}
                onSelectionChange={(keys) =>
                  handleChange("status", Array.from(keys)[0] as string)
                }
              >
                <SelectItem key="actif">Actif</SelectItem>
                <SelectItem key="désactivé">Désactivé</SelectItem>
              </Select>
            </div>

            <div className="flex justify-end gap-4 pt-6">
              <Button
                type="button"
                className="bg-background text-primary border border-primary"
                variant="bordered"
                onClick={handleCancel}
              >
                Annuler
              </Button>
              <Button
                type="button"
                className="bg-primary text-white"
                onClick={handleSubmit}
              >
                Enregistrer
              </Button>
            </div>
          </form>
        </div>
      </section>
    </DefaultLayout>
  );
}
