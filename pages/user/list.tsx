"use client";

import DefaultLayout from "@/layouts/default";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@heroui/table";
import { Button } from "@heroui/button";
import { Eye, UserX, Trash2, Pencil, UserCheck } from "lucide-react";
import { useState } from "react";
import NextLink from "next/link";

type User = {
  id: number;
  name: string;
  email: string;
  status: "actif" | "désactivé";
};

const users: User[] = [
  { id: 1, name: "Jean Dupont", email: "jean@exemple.com", status: "actif" },
  { id: 2, name: "Sophie Martin", email: "sophie@exemple.com", status: "désactivé" },
  { id: 3, name: "Ali Reza", email: "ali@exemple.com", status: "actif" },
  { id: 4, name: "Nina Lopez", email: "nina@exemple.com", status: "actif" },
  { id: 5, name: "Carlos Méndez", email: "carlos@exemple.com", status: "désactivé" },
  { id: 6, name: "Sarah Kim", email: "sarah@exemple.com", status: "actif" },
  { id: 7, name: "Romain Petit", email: "romain@exemple.com", status: "actif" },
];

const columns = [
  { key: "name", label: "Nom" },
  { key: "email", label: "Email" },
  { key: "status", label: "Statut" },
  { key: "actions", label: "Actions" },
];

const itemsPerPage = 5;

export default function UserListPage() {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(users.length / itemsPerPage);
  const currentUsers = users.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  return (
    <DefaultLayout>
      <section className="px-4 py-10 text-primary">
        <div className="max-w-6xl mx-auto space-y-10">
          <h1 className="text-4xl font-extrabold">Gestion des utilisateurs</h1>
          <p className="text-lg">Consultez et gérez les comptes utilisateurs.</p>

          <Table
            aria-label="Tableau des utilisateurs"
            isStriped
            className="bg-background rounded-xl shadow-md overflow-hidden"
          >
            <TableHeader>
              <TableColumn className="bg-primary/10 text-primary font-bold px-6 py-4">
                Nom
              </TableColumn>
              <TableColumn className="bg-primary/10 text-primary font-bold px-6 py-4">
                Email
              </TableColumn>
              <TableColumn className="bg-primary/10 text-primary font-bold px-6 py-4">
                Statut
              </TableColumn>
              <TableColumn className="bg-primary/10 text-primary font-bold px-6 py-4">
                Actions
              </TableColumn>
            </TableHeader>
            <TableBody
              items={currentUsers}
              emptyContent="Aucun utilisateur trouvé"
            >
              {(item) => (
                <TableRow key={item.id}>
                  <TableCell className="px-6 py-4">{item.name}</TableCell>
                  <TableCell className="px-6 py-4">{item.email}</TableCell>
                  <TableCell className="px-6 py-4 capitalize">{item.status}</TableCell>
                  <TableCell className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <Button
                        as={NextLink}
                        href="/user/detail"
                        size="sm"
                        variant="bordered"
                        className="text-primary border-primary"
                        startContent={<Eye size={16} />}
                      >
                        Voir
                      </Button>

                      <Button
                        size="sm"
                        className="bg-yellow text-white w-[120px]"
                        startContent={
                          item.status === "actif" ? <UserX size={16} /> : <UserCheck size={16} />
                        }
                        onClick={() => {
                          alert(
                            item.status === "actif"
                              ? `Désactivation de ${item.name}`
                              : `Réactivation de ${item.name}`
                          );
                        }}
                      >
                        {item.status === "actif" ? "Désactiver" : "Réactiver"}
                      </Button>

                      <Button
                        size="sm"
                        className="bg-red-600 text-white"
                        startContent={<Trash2 size={16} />}
                      >
                        Supprimer
                      </Button>
                      <Button
                        as={NextLink}
                        href="/user/edit"
                        size="sm"
                        className="bg-primary text-white"
                        startContent={<Pencil size={16} />}
                      >
                        Modifier
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>

          <div className="flex justify-end items-center gap-2 mt-4">
            <Button
              size="sm"
              className="bg-primary text-white"
              disabled={page === 1}
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
            >
              Précédent
            </Button>
            <span className="px-3 text-sm">
              Page {page} / {totalPages}
            </span>
            <Button
              size="sm"
              className="bg-primary text-white"
              disabled={page === totalPages}
              onClick={() => setPage((p) => Math.min(p + 1, totalPages))}
            >
              Suivant
            </Button>
          </div>
        </div>
      </section>
    </DefaultLayout>
  );
}
