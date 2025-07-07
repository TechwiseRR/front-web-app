"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import "react-quill/dist/quill.snow.css";

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

export default function RessourceEditPage() {
  const [ressourceId, setRessourceId] = useState<number | null>(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [publicationDate, setPublicationDate] = useState("");
  const [categories, setCategories] = useState<{ id: number; name: string }[]>([]);

  useEffect(() => {
    const stored = sessionStorage.getItem("ressourceToEdit");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setRessourceId(parsed.id ?? null);
        setTitle(parsed.title ?? "");
        setDescription(parsed.description ?? "");
        setContent(parsed.content ?? "");
        setCategoryId(`${parsed.category_id ?? parsed.category?.id ?? ""}`);
        setPublicationDate(parsed.publication_date?.slice(0, 10) ?? "");
      } catch (err) {
        console.error("Erreur parsing ressource:", err);
      }
    }
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("http://localhost:8081/api/categories");
        const json = await res.json();
        if (Array.isArray(json)) {
          setCategories(json);
        } else {
          setCategories([]);
        }
      } catch {
        setCategories([]);
      }
    };
    fetchCategories();
  }, []);

  const handleSave = async () => {
    if (!ressourceId) return;

    const payload = {
      title,
      description,
      content,
      category_id: parseInt(categoryId),
    };

    try {
      const token = localStorage.getItem("auth_token");

      const response = await fetch(`http://localhost:8081/api/ressources/${ressourceId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      console.log("Réponse reçue :", JSON.stringify(payload));
console.log("Réponse reçue :", response);

      if (!response.ok) {
        const errorData = await response.json();
        const message = errorData?.message || "Erreur lors de la mise à jour.";
        alert(message);
        return;
      }

      sessionStorage.removeItem("ressourceToEdit");
      alert("Ressource mise à jour !");
    } catch (error: any) {
      alert("Erreur réseau ou serveur : " + error.message);
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

        <h1 className="text-3xl font-bold">Modifier la ressource</h1>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium">Titre</label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="mt-1"
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
          <Button className="bg-primary text-white" onClick={handleSave}>
            Enregistrer
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
    </DefaultLayout>
  );
}
