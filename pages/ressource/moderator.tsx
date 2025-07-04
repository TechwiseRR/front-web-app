"use client";

import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Ressource } from "@/types/Ressource";
import { Button } from "@heroui/button";
import { User, CalendarDays, CheckCircle, XCircle } from "lucide-react";

const initialRessources: Ressource[] = [
  {
    id: 1,
    title: "Favoriser l’inclusion en milieu scolaire",
    content:
      "Outils pédagogiques pour intégrer les élèves en difficulté relationnelle dans la dynamique de classe.",
    publicationDate: "2025-07-03T08:00:00Z",
    status: "pending",
    validationDate: null,
    upvotes: 3,
    downvotes: 0,
    category_id: 4,
    author_id: 5,
    validator_id: null,
    author: { id: 5, name: "Clémence Fabre" },
    category: { id: 4, name: "Éducation" },
  },
  {
    id: 2,
    title: "Rituels de cohésion dans les équipes projets",
    content:
      "Utiliser des pratiques relationnelles simples pour fluidifier les interactions au sein d'une équipe projet.",
    publicationDate: "2025-06-25T14:30:00Z",
    status: "pending",
    validationDate: null,
    upvotes: 5,
    downvotes: 0,
    category_id: 3,
    author_id: 7,
    validator_id: null,
    author: { id: 7, name: "Julien Rousseau" },
    category: { id: 3, name: "Professionnel" },
  },
];

export default function ModerationPage() {
  const [ressources, setRessources] = useState<Ressource[]>(initialRessources);

  const handleValidate = (id: number) => {
    setRessources((prev) =>
      prev.map((res) =>
        res.id === id
          ? {
              ...res,
              status: "published",
              validationDate: new Date().toISOString(),
              validator_id: 999,
              validator: { id: 999, name: "Modérateur Admin" },
            }
          : res
      )
    );
  };

  const handleRefuse = (id: number) => {
    setRessources((prev) =>
      prev.map((res) =>
        res.id === id
          ? {
              ...res,
              status: "refused",
              validationDate: new Date().toISOString(),
              validator_id: 999,
              validator: { id: 999, name: "Modérateur Admin" },
            }
          : res
      )
    );
  };

  const pending = ressources.filter((r) => r.status === "pending");

  return (
    <DefaultLayout>
      <section className="px-4 py-10 max-w-5xl mx-auto">
        <h1 className="text-primary text-3xl font-extrabold mb-8">Modération des ressources</h1>

        {pending.length === 0 ? (
          <p className="text-gray-500">Aucune ressource à modérer.</p>
        ) : (
          <div className="space-y-6">
            {pending.map((ressource) => (
              <div
                key={ressource.id}
                className="border-2 border-yellow-400 bg-yellow-100 rounded-2xl p-6 shadow-lg transition-transform hover:scale-[1.01] hover:shadow-xl"
                >
                {ressource.category && (
                    <div className="mb-2 inline-block text-xs uppercase font-semibold text-yellow-900 bg-yellow-200 px-3 py-1 rounded-full">
                    {ressource.category.name}
                    </div>
                )}

                <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {ressource.title}
                </h2>

                <div className="text-sm text-gray-600 flex gap-4 mb-2">
                    <span className="flex items-center gap-1">
                    <User size={14} />
                    {ressource.author.name}
                    </span>
                    <span className="flex items-center gap-1">
                    <CalendarDays size={14} />
                    {new Date(ressource.publicationDate).toLocaleDateString("fr-FR")}
                    </span>
                </div>

                <p className="text-sm text-gray-800 mb-4">{ressource.content}</p>

                <div className="flex gap-4">
                    <Button
                    onClick={() => handleValidate(ressource.id)}
                    className="bg-green-600 text-white flex items-center gap-2"
                    >
                    <CheckCircle size={16} /> Accepter
                    </Button>
                    <Button
                    onClick={() => handleRefuse(ressource.id)}
                    className="bg-red-600 text-white flex items-center gap-2"
                    >
                    <XCircle size={16} /> Refuser
                    </Button>
                </div>
                </div>
            ))}
          </div>
        )}
      </section>
    </DefaultLayout>
  );
}
