"use client";

import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { useState } from "react";
import router from "next/router";

export default function UserDetailPage() {
  // Exemple de données utilisateur
  const [user] = useState({
    name: "Jean Dupont",
    email: "jean@exemple.com",
    status: "actif",
  });

  const handleCancel = () => {
    router.push("/user/list");
  };

  return (
    <DefaultLayout>
      <section className="px-4 py-10 text-primary">
        <div className="max-w-2xl mx-auto space-y-8">
          <h1 className="text-4xl font-extrabold">Détail de l'utilisateur</h1>
          <p className="text-lg">Voici les informations du compte utilisateur.</p>

          <div className="space-y-6">
            <div className="space-y-2">
              <label className="block font-medium">Nom complet</label>
              <p className="text-base">{user.name}</p>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Adresse email</label>
              <p className="text-base">{user.email}</p>
            </div>

            <div className="space-y-2">
              <label className="block font-medium">Statut</label>
              <p className="text-base capitalize">{user.status}</p>
            </div>

            <div className="flex justify-end pt-6">
              <Button
                type="button"
                className="bg-background text-primary border border-primary"
                variant="bordered"
                onClick={handleCancel}
              >
                Retour
              </Button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
