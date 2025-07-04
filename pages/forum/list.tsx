import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { CalendarDays, User } from "lucide-react";

const fakeDiscussions = [
  {
    id: 1,
    title: "Comment renforcer la communication en famille ?",
    author: "Marie Dupont",
    date: new Date("2025-06-30"),
    excerpt: "Quels outils utilisez-vous pour mieux dialoguer avec vos enfants ?",
  },
  {
    id: 2,
    title: "Gérer les conflits au travail",
    author: "Jean Martin",
    date: new Date("2025-07-02"),
    excerpt: "Je cherche des conseils concrets pour apaiser les tensions dans mon équipe.",
  },
  {
    id: 3,
    title: "Créer un cercle d'écoute bienveillant",
    author: "Sophie Laurent",
    date: new Date("2025-06-28"),
    excerpt: "Avez-vous déjà mis en place ce type d’espace dans votre communauté ?",
  },
];

export default function ForumPage() {
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const sortedDiscussions = [...fakeDiscussions].sort((a, b) =>
    sortOrder === "asc" ? a.date.getTime() - b.date.getTime() : b.date.getTime() - a.date.getTime()
  );

  return (
    <DefaultLayout>
      <section className="px-4 py-10 max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center mb-6">
          <h1 className="text-primary text-3xl md:text-4xl font-extrabold mb-4 md:mb-0">
            Forum des discussions
          </h1>
          <Button
            onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            className="bg-primary text-white"
          >
            Trier par date : {sortOrder === "asc" ? "plus anciennes" : "plus récentes"}
          </Button>
        </div>

        <div className="space-y-6">
          {sortedDiscussions.map((discussion) => (
            <div
              key={discussion.id}
              className="border border-gray-200 rounded-xl p-5 bg-white shadow-sm hover:shadow-md transition"
            >
              <h2 className="text-xl font-semibold text-primary mb-1">
                {discussion.title}
              </h2>
              <div className="flex items-center text-sm text-gray-500 mb-2 gap-4">
                <div className="flex items-center gap-1">
                  <User size={16} />
                  {discussion.author}
                </div>
                <div className="flex items-center gap-1">
                  <CalendarDays size={16} />
                  {discussion.date.toLocaleDateString("fr-FR")}
                </div>
              </div>
              <p className="text-primary text-sm">{discussion.excerpt}</p>
            </div>
          ))}
        </div>
      </section>
    </DefaultLayout>
  );
}
