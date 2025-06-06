"use client";

import DefaultLayout from "@/layouts/default";
import { Users, FileText, AlertTriangle } from "lucide-react";
import { Card } from "@heroui/card";
import { Button } from "@heroui/button";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="px-4 py-10 text-[#053559]">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-4xl font-extrabold">Tableau de bord administrateur</h1>

          {/* Statistiques principales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="bg-[#e0f2fe] border-none shadow-sm p-6 flex flex-col items-center justify-center text-center space-y-2">
              <Users size={48} className="text-[#0369a1]" />
              <p className="text-sm text-gray-700">Utilisateurs inscrits</p>
              <p className="text-2xl font-extrabold text-[#053559]">532</p>
            </Card>

            <Card className="bg-[#dcfce7] border-none shadow-sm p-6 flex flex-col items-center justify-center text-center space-y-2">
              <FileText size={48} className="text-[#15803d]" />
              <p className="text-sm text-gray-700">Ressources publiées</p>
              <p className="text-2xl font-extrabold text-[#053559]">128</p>
            </Card>

            <Card className="bg-[#fee2e2] border-none shadow-sm p-6 flex flex-col items-center justify-center text-center space-y-2">
              <AlertTriangle size={48} className="text-[#b91c1c]" />
              <p className="text-sm text-gray-700">Signalements actifs</p>
              <p className="text-2xl font-extrabold text-[#053559]">7</p>
            </Card>
          </div>

          {/* Section actions */}
          <div className="mt-12 grid md:grid-cols-2 gap-8">
            <div className="bg-[#f3ede7] rounded-xl p-6 shadow-md space-y-4">
              <h2 className="text-xl font-bold">Derniers signalements</h2>
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
              <Button className="bg-[#053559] text-white mt-4">Voir tous les signalements</Button>
            </div>

            <div className="bg-[#fde3bc] rounded-xl p-6 shadow-md space-y-4">
              <h2 className="text-xl font-bold">Activité récente</h2>
              <ul className="space-y-2 text-sm">
                <li>📤 Nouvelle ressource publiée par <strong>JeanDupont</strong></li>
                <li>📝 Commentaire modéré sur "Guide CNV"</li>
                <li>👤 Nouvel utilisateur : <strong>SophieM</strong></li>
              </ul>
              <Button className="bg-[#f59e0b] text-white hover:bg-[#d97706] mt-4">Gérer les ressources</Button>
            </div>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
