"use client";

import { useRouter } from "next/router";
import DefaultLayout from "@/layouts/default";
import { Users, FileText, AlertTriangle } from "lucide-react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

export default function IndexPage() {
  const router = useRouter();

  return (
    <DefaultLayout>
      <section className="px-4 py-10 text-primary">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-4xl font-extrabold">Tableau de bord administrateur</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-blue-100 border-none shadow-sm p-6 flex flex-col items-center justify-center text-center space-y-2">
              <Users size={48} className="text-blue-600" />
              <p className="text-sm text-gray-700">Utilisateurs inscrits</p>
              <p className="text-2xl font-extrabold text-primary">532</p>
            </Card>

            <Card className="bg-green-100 border-none shadow-sm p-6 flex flex-col items-center justify-center text-center space-y-2">
              <FileText size={48} className="text-green-700" />
              <p className="text-sm text-gray-700">Ressources publiées</p>
              <p className="text-2xl font-extrabold text-primary">128</p>
            </Card>

            <Card className="bg-red-100 border-none shadow-sm p-6 flex flex-col items-center justify-center text-center space-y-2">
              <AlertTriangle size={48} className="text-red-600" />
              <p className="text-sm text-gray-700">Signalements actifs</p>
              <p className="text-2xl font-extrabold text-primary">7</p>
            </Card>
          </div>

          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-background rounded-xl p-6 shadow-md space-y-4">
              <h2 className="text-xl font-bold text-primary">Derniers signalements</h2>
              <ul className="space-y-2 text-sm">
                <li className="flex justify-between">
                  <span>Utilisateur123</span>
                  <span className="text-red-600">Contenu inapproprié</span>
                </li>
                <li className="flex justify-between">
                  <span>Utilisateur321</span>
                  <span className="text-red-600">Injures</span>
                </li>
                <li className="flex justify-between">
                  <span>Utilisateur987</span>
                  <span className="text-red-600">Spam</span>
                </li>
              </ul>
              <Button className="bg-primary text-white mt-4">
                Voir tous les signalements
              </Button>
            </div>

            <div className="bg-yellow/30 rounded-xl p-6 shadow-md space-y-4">
              <h2 className="text-xl font-bold text-primary">Activité récente</h2>
              <ul className="space-y-2 text-sm">
                <li>📤 Nouvelle ressource publiée par <strong>JeanDupont</strong></li>
                <li>📝 Commentaire modéré sur "Guide CNV"</li>
                <li>👤 Nouvel utilisateur : <strong>SophieM</strong></li>
              </ul>
              <Button
                className="bg-yellow text-primary hover:bg-yellow/80 mt-4"
                onClick={() => router.push("/ressource/moderator")}
              >
                Gérer les ressources
              </Button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
