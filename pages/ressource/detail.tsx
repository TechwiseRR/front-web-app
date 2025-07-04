"use client";

import { useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import {
  CalendarDays,
  ThumbsUp,
  ThumbsDown,
  User,
  MessageCircle,
} from "lucide-react";

const fakeRessource = {
  id: 42,
  title: "Construire une culture de feedback bienveillante",
  content:
    "Le feedback est un levier essentiel pour faire grandir les individus et les équipes. Cette ressource présente des principes simples pour instaurer une culture où chacun ose s’exprimer avec respect et écoute.",
  publicationDate: "2025-07-01T09:00:00Z",
  status: "published",
  validationDate: "2025-07-02T14:00:00Z",
  upvotes: 23,
  downvotes: 2,
  category_id: 2,
  author_id: 4,
  validator_id: 1,
  author: { id: 4, name: "Lina Belkacem" },
  validator: { id: 1, name: "Admin RH" },
  category: { id: 2, name: "Professionnel" },
};

type Message = {
  id: number;
  author: string;
  date: string;
  content: string;
};

export default function RessourceDetailPage() {
  const ressource = fakeRessource;

  const [upvotes, setUpvotes] = useState(ressource.upvotes);
  const [downvotes, setDownvotes] = useState(ressource.downvotes);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);

  const handleVote = (type: "up" | "down") => {
    if (type === "up") {
      if (voteState === "up") {
        setUpvotes((u) => u - 1);
        setVoteState(null);
      } else {
        if (voteState === "down") setDownvotes((d) => d - 1);
        setUpvotes((u) => u + 1);
        setVoteState("up");
      }
    }

    if (type === "down") {
      if (voteState === "down") {
        setDownvotes((d) => d - 1);
        setVoteState(null);
      } else {
        if (voteState === "up") setUpvotes((u) => u - 1);
        setDownvotes((d) => d + 1);
        setVoteState("down");
      }
    }
  };

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      author: "Clara",
      date: "2025-07-04T09:00:00Z",
      content: "Merci pour cette ressource, très claire et utile 🙏",
    },
    {
      id: 2,
      author: "Ahmed",
      date: "2025-07-04T11:00:00Z",
      content: "J'ai partagé ça avec mon équipe, ça ouvre de bonnes pistes !",
    },
  ]);

  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim()) return;
    const newEntry: Message = {
      id: messages.length + 1,
      author: "Vous",
      date: new Date().toISOString(),
      content: newMessage.trim(),
    };
    setMessages([...messages, newEntry]);
    setNewMessage("");
  };

  return (
    <DefaultLayout>
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-10 text-primary">
        {ressource.category && (
          <div className="inline-block text-xs uppercase tracking-wide font-semibold text-white bg-primary px-3 py-1 rounded-full">
            {ressource.category.name}
          </div>
        )}

        <h1 className="text-3xl font-bold">{ressource.title}</h1>

        <div className="text-sm text-gray-500 flex gap-4">
          <span className="flex items-center gap-1">
            <User size={14} />
            {ressource.author.name}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays size={14} />
            {new Date(ressource.publicationDate).toLocaleDateString("fr-FR")}
          </span>
        </div>

        <div className="prose prose-sm max-w-none text-primary text-base leading-relaxed">
          {ressource.content}
        </div>

        <div className="flex items-center gap-6 mt-6 text-sm">
          <button
            onClick={() => handleVote("up")}
            className={`flex items-center gap-2 font-medium transition ${
              voteState === "up"
                ? "text-green-700 font-semibold"
                : "text-gray-500 hover:text-green-700"
            }`}
          >
            <ThumbsUp size={16} />
            {upvotes}
          </button>
          <button
            onClick={() => handleVote("down")}
            className={`flex items-center gap-2 font-medium transition ${
              voteState === "down"
                ? "text-red-700 font-semibold"
                : "text-gray-500 hover:text-red-700"
            }`}
          >
            <ThumbsDown size={16} />
            {downvotes}
          </button>
        </div>

        <div className="mt-12 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle size={20} /> Discussion
          </h2>

          <div className="space-y-3">
            {messages.map((msg) => (
              <div key={msg.id} className="p-3 rounded-lg border bg-gray-50">
                <p className="text-sm text-primary">{msg.content}</p>
                <span className="text-xs text-gray-400">
                  — {msg.author},{" "}
                  {new Date(msg.date).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </span>
              </div>
            ))}
          </div>

          <div>
            <h3 className="text-md font-medium mb-2">Ajouter un message</h3>
            <textarea
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-primary focus:outline-primary"
              rows={4}
              placeholder="Écrivez votre message ici..."
            />
            <div className="flex justify-end mt-2">
              <Button onClick={handleSend} className="bg-yellow text-primary">
                Envoyer
              </Button>
            </div>
          </div>
        </div>

        <div className="pt-8">
          <Button onClick={() => history.back()} className="bg-primary text-white">
            Retour
          </Button>
        </div>
      </section>
    </DefaultLayout>
  );
}
