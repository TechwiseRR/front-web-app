"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import "react-quill/dist/quill.snow.css";
import snackbar from "@/components/snackbar";
import Snackbar from "@/components/snackbar";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

const fakeRessource = {
  id: 42,
  title: "Construire une culture de feedback bienveillante",
  content:
    "Le feedback est un levier essentiel pour faire grandir les individus et les équipes...",
  publicationDate: "2025-07-01T09:00:00Z",
  category: { id: 2, name: "Professionnel" },
  author: { id: 4, name: "Lina Belkacem" },
};

const categories = [
  { id: 1, name: "Famille" },
  { id: 2, name: "Professionnel" },
  { id: 3, name: "Éducation" },
  { id: 4, name: "Communauté" },
];

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
  const [title, setTitle] = useState(fakeRessource.title);
  const [content, setContent] = useState(fakeRessource.content);
  const [categoryId, setCategoryId] = useState(`${fakeRessource.category.id}`);
  const [publicationDate, setPublicationDate] = useState(
    fakeRessource.publicationDate.slice(0, 10)
  );
  const [snackbar, setSnackbar] = useState<{
    message: string;
    type: "success" | "error" | "info";
  } | null>(null);

  const handleSave = () => {
    const updated = {
      ...fakeRessource,
      title,
      content,
      category_id: parseInt(categoryId),
      publicationDate,
    };
    console.log("Ressource mise à jour :", updated);
    setSnackbar({ message: "Ressource enregistrée avec succès", type: "success" });
  };

  return (
    <DefaultLayout>
      <section className="px-4 py-10 max-w-3xl mx-auto text-primary space-y-8">
        <Button
          variant="ghost"
          onPress={() => history.back()}
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
          <Button className="bg-primary text-white" onPress={handleSave}>
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
        {snackbar && (
          <Snackbar
            message={snackbar.message}
            type={snackbar.type}
            onClose={() => setSnackbar(null)}
          />
        )}
      </section>
    </DefaultLayout>
  );
}
