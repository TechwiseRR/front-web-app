"use client";

import { useState, useEffect } from "react";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import {
  CalendarDays,
  User,
  MessageCircle,
  AlertTriangle,
  ArrowBigDown,
  ArrowBigUp,
  Pencil,
  Trash2,
  Star,
  Share2,
} from "lucide-react";
import { useRouter } from "next/router";
import { useAuthStore } from "@/stores/useAuthStore";
import Snackbar from "@/components/snackbar";

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
}

export default function RessourceDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const user = useAuthStore((state) => state.user);
  const isAdmin = useAuthStore((state) => state.isAdmin());
  const isModerator = useAuthStore((state) => state.isModerator());

  const [ressource, setRessource] = useState<any | null>(null);
  const [upvotes, setUpvotes] = useState(0);
  const [downvotes, setDownvotes] = useState(0);
  const [voteState, setVoteState] = useState<"up" | "down" | null>(null);
  const [messages, setMessages] = useState<Comment[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [reporting, setReporting] = useState(false);
  const [reportText, setReportText] = useState("");
  const [reportSent, setReportSent] = useState(false);
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    if (!id) return;
    const fetchRessource = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/ressources");
        const data = await res.json();
        const found = data?.data?.find((item: any) => `${item.id}` === `${id}`);
        if (found) {
          setRessource(found);
          setUpvotes(found.upvotes ?? 0);
          setDownvotes(found.downvotes ?? 0);
        } else {
          router.push("/ressource");
        }
      } catch {
        router.push("/ressource");
      }
    };

    const fetchComments = async () => {
      try {
        const res = await fetch(`http://localhost:8081/api/ressources/${id}/comments`);
        const data: Comment[] = await res.json();
        if (Array.isArray(data)) setMessages(data);
      } catch {
        setMessages([]);
      }
    };

    fetchRessource();
    fetchComments();
  }, [id]);

  useEffect(() => {
    if (reportSent) {
      const timer = setTimeout(() => setReportSent(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [reportSent]);

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
    } else {
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

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const payload = {
      resource_id: Number(id),
      content: newMessage.trim(),
    };

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch("http://localhost:8081/api/comments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Erreur lors de l'envoi du commentaire");
      const json = await res.json();
      const newComment: Comment = json.comment;
      setMessages((prev) => [...prev, newComment]);
      setNewMessage("");
    } catch (err: any) {
      setSnackbar({ message: "Erreur lors de l'envoi : " + err.message, type: "error" });
    }
  };

  const handleDeleteRessource = async () => {
    const confirmDelete = confirm("Supprimer la ressource ?");
    if (!confirmDelete) return;

    try {
      const token = localStorage.getItem("auth_token");

      const res = await fetch(`http://localhost:8081/api/ressources/${id}`, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Échec de la suppression");
      }

      sessionStorage.setItem("snackbar_message", "Ressource supprimée");
      sessionStorage.setItem("snackbar_type", "success");
      router.push("/ressource");
    } catch (err: any) {
      setSnackbar({ message: "Erreur lors de la suppression : " + err.message, type: "error" });
    }
  };

  const handleSendReport = () => {
    if (!reportText.trim()) return;
    setReportSent(true);
    setReporting(false);
    setReportText("");
  };

  const handleDeleteMessage = (id: number) => {
    setMessages((msgs) => msgs.filter((m) => m.id !== id));
  };

  const handleEditMessage = (id: number) => {
    const msg = messages.find((m) => m.id === id);
    if (!msg) return;
    const newContent = prompt("Modifier le message :", msg.content);
    if (newContent && newContent.trim()) {
      setMessages((msgs) => msgs.map((m) => (m.id === id ? { ...m, content: newContent.trim() } : m)));
    }
  };

  if (!ressource) {
    return (
      <DefaultLayout>
        <div className="px-4 py-10 max-w-3xl mx-auto text-center text-gray-500">
          Chargement de la ressource...
        </div>
      </DefaultLayout>
    );
  }

  const isOwner = user && ressource?.user_id === user.id;

  return (
    <DefaultLayout>
      <section className="px-4 py-10 max-w-3xl mx-auto space-y-10 text-primary">
        {ressource.category?.name && (
          <div className="inline-block text-xs uppercase tracking-wide font-semibold text-white bg-primary px-3 py-1 rounded-full">
            {ressource.category.name}
          </div>
        )}

        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onPress={() => history.back()}
            className="text-sm text-primary hover:underline flex items-center gap-2"
          >
            ← Retour
          </Button>

          <div className="flex items-center gap-4">
            <div
              onClick={() => setSnackbar({ message: "Ajouté aux favoris", type: "success" })}
              className="cursor-pointer text-yellow-500 hover:text-yellow-600"
            >
              <Star size={20} />
            </div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                setSnackbar({ message: "Lien copié dans le presse-papier", type: "success" });
              }}
              className="cursor-pointer text-blue-500 hover:text-blue-600"
            >
              <Share2 size={20} />
            </div>
          </div>
        </div>

        <h1 className="text-3xl font-bold">{ressource.title}</h1>

        <div className="text-sm text-gray-500 flex gap-4">
          <span className="flex items-center gap-1">
            <User size={14} />
            {ressource.user?.username ?? `Utilisateur #${ressource.user_id}`}
          </span>
          <span className="flex items-center gap-1">
            <CalendarDays size={14} />
            {new Date(ressource.publication_date).toLocaleDateString("fr-FR")}
          </span>
        </div>

        <div className="relative">
          {ressource.description && (
            <p className="text-base text-gray-600 mb-4 whitespace-pre-line">{ressource.description}</p>
          )}

          <div className="bg-white p-6 rounded-md shadow relative">
            <div className="absolute top-4 right-4 flex gap-2">
              {(isOwner || isModerator || isAdmin) ? (
                <Button color="danger" onPress={handleDeleteRessource}>
                  <Trash2 size={18} />
                </Button>
              ) : (
                <Button color="danger" onPress={() => setReporting(true)}>
                  <AlertTriangle size={18} />
                </Button>
              )}
              {isOwner && (
                <Button
                  color="warning"
                  onPress={() => {
                    sessionStorage.setItem("ressourceToEdit", JSON.stringify(ressource));
                    router.push(`/ressource/edit/${ressource.id}`);
                  }}
                >
                  <Pencil size={18} />
                </Button>
              )}
            </div>

            <div
              className="prose prose-sm max-w-none text-primary text-base leading-relaxed pt-12"
              dangerouslySetInnerHTML={{ __html: ressource.content }}
            />
          </div>

          <div className="flex gap-4 mt-4">
            <div onClick={() => handleVote("up")} className={`cursor-pointer flex items-center gap-1 ${voteState === "up" ? "text-green-600" : "text-gray-400"}`}>
              <ArrowBigUp size={32} />
              <span className="text-sm">{upvotes}</span>
            </div>
            <div onClick={() => handleVote("down")} className={`cursor-pointer flex items-center gap-1 ${voteState === "down" ? "text-red-600" : "text-gray-400"}`}>
              <ArrowBigDown size={32} />
              <span className="text-sm">{downvotes}</span>
            </div>
          </div>
        </div>

        {reportSent && (
          <div className="bg-green-50 text-green-700 border border-green-200 px-4 py-2 rounded-md mt-6">
            Votre signalement a bien été envoyé.
          </div>
        )}

        <div className="mt-12 space-y-6">
          <h2 className="text-xl font-bold flex items-center gap-2">
            <MessageCircle size={20} /> Discussion
          </h2>

          <div className="space-y-3">
            {messages.map((msg) => {
              const isCommentOwner = user && msg.author === user.username;
              return (
                <div key={msg.id} className="p-3 rounded-lg border bg-gray-50 relative">
                  <div className="absolute top-2 right-2 flex gap-1">
                    {isCommentOwner ? (
                      <>
                        <Button size="sm" variant="ghost" onPress={() => handleDeleteMessage(msg.id)} className="text-red-600 hover:bg-red-100">
                          <Trash2 size={14} />
                        </Button>
                        <Button size="sm" variant="ghost" onPress={() => handleEditMessage(msg.id)} className="text-yellow-600 hover:bg-yellow-100">
                          <Pencil size={14} />
                        </Button>
                      </>
                    ) : (
                      <Button size="sm" variant="ghost" onPress={() => setSnackbar({ message: `Commentaire #${msg.id} signalé.`, type: "info" })} className="text-red-600 hover:bg-red-100">
                        <AlertTriangle size={14} />
                      </Button>
                    )}
                  </div>
                  <p className="text-sm text-primary">{msg.content}</p>
                  <span className="text-xs text-gray-400">
                    — {msg.author}, {new Date(msg.date).toLocaleDateString("fr-FR")}
                  </span>
                </div>
              );
            })}
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
              <Button onPress={handleSendMessage} className="bg-yellow text-primary">
                Envoyer
              </Button>
            </div>
          </div>
        </div>
      </section>
      {snackbar && (
        <Snackbar
          message={snackbar.message}
          type={snackbar.type}
          onClose={() => setSnackbar(null)}
        />
      )}
    </DefaultLayout>
  );
}
