"use client";

import { useEffect, useState } from "react";
import DefaultLayout from "@/layouts/default";
import { Card, CardHeader, CardBody } from "@heroui/card";
import { Button } from "@heroui/button";
import {
  Autocomplete,
  AutocompleteItem,
} from "@heroui/autocomplete";

type Resource = {
  id: number;
  title: string;
  content: string;
  category: {
    name: string;
  };
};

type Category = {
  id: number;
  name: string;
};

export default function RessourcesPage() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [categoryFilter, setCategoryFilter] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchResources = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      params.append("page", currentPage.toString());

      if (categoryFilter !== "all") {
        params.append("category_id", categoryFilter);
      }

      const res = await fetch(`http://localhost:8081/api/ressources?${params}`);
      const json = await res.json();

      setResources(Array.isArray(json.data) ? json.data : []);
      setTotalPages(json.pagination?.last_page || 1);
    } catch (err) {
      console.error(err);
      setError("Erreur lors du chargement des ressources.");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch("http://localhost:8081/api/categories");
      const json = await res.json();

      if (Array.isArray(json)) {
        setCategories(json);
      } else {
        setCategories([]);
        console.warn("Format inattendu de catégories:", json);
      }
    } catch (err) {
      console.error("Erreur lors du chargement des catégories", err);
      setCategories([]);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchResources();
  }, [currentPage, categoryFilter]);

  const handleCategoryChange = (key: string | null) => {
    const validKey = key ?? "all"; // fallback si null
    setCategoryFilter(validKey);
    setCurrentPage(1);
  };

  return (
    <DefaultLayout>
      <section className="px-4 py-12 max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-primary mb-8">
          📚 Ressources disponibles
        </h1>

        {/* Filtres */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4">
          <Autocomplete
            label="Filtrer par catégorie"
            placeholder="Toutes"
            selectedKey={categoryFilter}
            onSelectionChange={(key) => handleCategoryChange(key as string | null)}
            className="max-w-xs"
          >
            <AutocompleteItem key="all">Toutes</AutocompleteItem>
            {categories.map((cat) => (
              <AutocompleteItem key={cat.id.toString()}>
                {cat.name}
              </AutocompleteItem>
            ))}
          </Autocomplete>

          <Button
            as="a"
            href="/ressource/new"
            variant="shadow"
            className="bg-gradient-to-r from-green-500 to-emerald-400 text-white font-semibold"
          >
            ➕ Créer une ressource
          </Button>
        </div>

        {/* Affichage */}
        {loading ? (
          <p className="text-center text-gray-500">Chargement...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : resources.length === 0 ? (
          <p className="text-center text-gray-500">Aucune ressource trouvée.</p>
        ) : (
          <>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {resources.map((res) => (
                <Card key={res.id} className="bg-white shadow-lg rounded-2xl p-4">
                  <CardHeader className="font-semibold text-lg text-primary">
                    {res.title}
                  </CardHeader>
                  <CardBody className="text-sm text-default-600 mb-4">
                    {res.content}
                  </CardBody>
                  <Button
                    as="a"
                    href={`/ressource/${res.id}`}
                    variant="flat"
                    className="w-full bg-gradient-to-r from-[#FF705B] to-[#FFB457] text-white"
                  >
                    Voir la ressource
                  </Button>
                </Card>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mt-10">
              <Button
                disabled={currentPage === 1}
                onPress={() => setCurrentPage((p) => p - 1)}
                variant="bordered"
              >
                Précédent
              </Button>
              <span className="text-primary font-medium px-2">
                Page {currentPage} / {totalPages}
              </span>
              <Button
                disabled={currentPage === totalPages}
                onPress={() => setCurrentPage((p) => p + 1)}
                variant="bordered"
              >
                Suivant
              </Button>
            </div>
          </>
        )}
      </section>
    </DefaultLayout>
  );
}
