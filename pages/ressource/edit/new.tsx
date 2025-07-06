"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import DefaultLayout from "@/layouts/default";
import { Button } from "@heroui/button";
import { Input } from "@heroui/input";
import "react-quill/dist/quill.snow.css";

const QuillEditor = dynamic(() => import("react-quill"), { ssr: false });

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

export default function RessourceEditNewPage() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categoryId, setCategoryId] = useState("2");
  const [publicationDate, setPublicationDate] = useState(new Date().toISOString().slice(0, 10));

  const handleCreate = () => {
    const newRessource = {
      title,
      content,
      category_id: parseInt(categoryId),
      publicationDate,
    };
    console.log("Nouvelle ressource :", newRessource);
    alert("Ressource créée !");
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
          <Button className="bg-green-600 text-white" onClick={handleCreate}>
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
    </DefaultLayout>
  );
}
