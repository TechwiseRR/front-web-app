"use client";

import { useEffect } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Image } from "@heroui/image";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores/useAuthStore";

export const Navbar = () => {
  const { token, initialized, initialize, isAdmin, isModerator, logout } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    initialize();
  }, [initialize]);

  const isAuthenticated = !!token;
  if (!initialized) return null;

  const handleLogout = async () => {
    try {
      await fetch("http://localhost:8081/api/auth/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
    } catch (err) {
      console.error("Erreur lors de la déconnexion :", err);
    } finally {
      logout();
      router.push("/");
    }
  };

  return (
    <HeroUINavbar maxWidth="xl" position="sticky">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink href="/" className="flex items-center gap-1">
            <Image src="/rr.png" alt="Logo" height={40} />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex sm:basis-full" justify="end">
        <NavbarItem className="hidden md:flex justify-end w-full gap-3">
          {isAuthenticated ? (
            <>
              <Button as={Link} href="/ressources" variant="bordered" className="text-primary">Ressources</Button>
              <Button as={Link} href="/forum" variant="bordered" className="text-primary">Forum</Button>
              <Button as={Link} href="/aide" variant="bordered" className="text-primary">Aide</Button>

              {isAdmin?.() && (
                <>
                  <Button as={Link} href="/dashboard" variant="bordered" className="text-primary">Dashboard</Button>
                  <Button as={Link} href="/user/list" variant="bordered" className="text-primary">Utilisateurs</Button>
                </>
              )}

              {isModerator?.() && (
                <Button as={Link} href="/ressource/moderator" variant="bordered" className="text-primary">Ressources en attente</Button>
              )}

              <Button
                as={Link}
                href="/profil"
                variant="bordered"
                className="text-primary"
              >
                Profil
              </Button>

              <Button
                onClick={handleLogout}
                variant="bordered"
                className="text-sm font-normal text-white bg-primary"
              >
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} href="/" variant="bordered" className="text-primary">Accueil</Button>
              <Button as={Link} href="/ressources" variant="bordered" className="text-primary">Ressources</Button>
              <Button as={Link} href="/aide" variant="bordered" className="text-primary">Aide</Button>
              <Button
                as={Link}
                href="/connexion"
                variant="bordered"
                className="text-primary"
              >
                Connexion
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle className="text-primary" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-4 flex flex-col gap-2">
          {isAuthenticated ? (
            <>
              <Button as={Link} href="/ressources" variant="bordered" className="text-primary">Ressources</Button>
              <Button as={Link} href="/forum" variant="bordered" className="text-primary">Forum</Button>
              <Button as={Link} href="/aide" variant="bordered" className="text-primary">Aide</Button>
              <Button as={Link} href="/profil" variant="bordered" className="text-primary">Profil</Button>
              <Button onClick={handleLogout} variant="bordered" className="bg-red-600 text-white">
                Déconnexion
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} href="/" variant="bordered" className="text-primary">Accueil</Button>
              <Button as={Link} href="/ressources" variant="bordered" className="text-primary">Ressources</Button>
              <Button as={Link} href="/aide" variant="bordered" className="text-primary">Aide</Button>
              <Button as={Link} href="/connexion" variant="bordered" className="text-primary">
                Connexion
              </Button>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
