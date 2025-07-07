"use client";

import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import "react-quill/dist/quill.snow.css";
import { useAuthStore } from "@/stores/useAuthStore";
import { useRouter } from "next/router";
import Snackbar from "@/components/snackbar";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const quillModules = {
  toolbar: [
    [{ header: [1, 2, 3, false] }],
    ["bold", "italic", "underline", "strike"],
    [{ color: [] }, { background: [] }],
    [{ script: "sub" }, { script: "super" }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    [{ align: [] }],
    ["blockquote", "code-block"],
    ["link", "image", "video"],
    ["clean"],
  ],
};

export default function RessourceEditNewPage() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [publicationDate, setPublicationDate] = useState(new Date().toISOString().slice(0, 10));
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);
  const [snackbar, setSnackbar] = useState<{ message: string; type: "success" | "error" | "info" } | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/categories");
        const data = await res.json();
        if (Array.isArray(data)) {
          setCategories(data);
          setCategoryId(data[0]?.id?.toString() || "");
        }
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const user = useAuthStore((state) => state.user);

  const handleCreate = async () => {
    const payload = {
      title,
      description,
      content,
      category_id: parseInt(categoryId),
      user_id: user?.id,
      status: "published",
      type_ressource_id: 1,
    };

    try {
      const token = localStorage.getItem("auth_token");

      const response = await fetch("http://localhost:8081/api/ressources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData?.message || "Erreur lors de la création.";
        setSnackbar({ message: message, type: "error" });
        return;
      }

      sessionStorage.setItem("snackbar_message", "Ressource créée !");
      sessionStorage.setItem("snackbar_type", "success");
      router.push("/ressource");
    } catch (err: any) {
      setSnackbar({ message: "Erreur réseau ou serveur : " + err.message, type: "error" });
    }
  };

  return (
    <DefaultLayout>
      <section className="px-4 py-10 max-w-3xl mx-auto text-primary space-y-8">
        <Button
          variant="ghost"
          onClick={() => history.back()}
          className="text-sm text-primary hover:underline flex items-center gap-2"
        >
          ← Retour
        </Button>

        <h1 className="text-3xl font-bold">Créer une ressource</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Titre</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
              placeholder="Titre de la ressource"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm text-primary focus:outline-primary mt-1"
              rows={3}
              placeholder="Résumé ou introduction de la ressource"
            />
          </div>

          <div>
            <label className="text-sm font-medium">Contenu</label>
            <div className="mt-1 rounded-md overflow-hidden">
              <QuillEditor
                theme="snow"
                value={content}
                onChange={setContent}
                modules={quillModules}
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium block mb-1">Catégorie</label>
            <select
              value={categoryId}
              onChange={(e) => setCategoryId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 text-sm"
            >
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-6 flex justify-end">
          <Button className="bg-green-600 text-white" onPress={handleCreate}>
            Créer la ressource
          </Button>
        </div>

        <style jsx global>{`
          .ql-toolbar.ql-snow {
            border: none !important;
            background-color: white;
          }
          .ql-container.ql-snow {
            border: none !important;
            background-color: white;
          }
        `}</style>
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
