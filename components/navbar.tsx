"use client";

import { useState } from "react";
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

export const Navbar = () => {
  const [isAuthenticated] = useState(false);

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
              <Button className="text-default-100" as={Link} href="/ressources" variant="bordered">
                Ressources
              </Button>
              <Button className="text-default-100" as={Link} href="/forum" variant="bordered">
                Forum
              </Button>
              <Button className="text-default-100" as={Link} href="/aide" variant="bordered">
                Aide
              </Button>
              {/* PENSER A AUTORISER CETTE TAB QUE LORSQUE PERMISSION = ADMIN */}
              <Button as={Link} href="/dashboard" variant="flat">
                Dashboard
              </Button>
              <Button
                as={Link}
                href="/profil"
                variant="bordered"
                className="text-sm font-normal text-white bg-primary"
              >
                Profil
              </Button>
            </>
          ) : (
            <>
              <Button className="text-default-100" as={Link} href="/" variant="bordered">
                Accueil
              </Button>
              <Button className="text-default-100" as={Link} href="/ressources" variant="bordered">
                Ressources
              </Button>
              <Button className="text-default-100" as={Link} href="/aide" variant="bordered">
                Aide
              </Button>
              <Button
                as={Link}
                href="/connexion"
                variant="bordered"
                className="text-sm font-normal text-white bg-primary"
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
              <Button className="text-default-100" as={Link} href="/ressources" variant="bordered">
                Ressources
              </Button>
              <Button className="text-default-100" as={Link} href="/forum" variant="bordered">
                Forum
              </Button>
              <Button className="text-default-100" as={Link} href="/aide" variant="bordered">
                Aide
              </Button>
              <Button
                as={Link}
                href="/profil"
                variant="bordered"
                className="text-sm font-normal text-white bg-primary"
              >
                Profil
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} href="/" variant="bordered">
                Accueil
              </Button>
              <Button as={Link} href="/ressources" variant="bordered">
                Ressources
              </Button>
              <Button as={Link} href="/aide" variant="bordered">
                Aide
              </Button>
              <Button
                as={Link}
                href="/connexion"
                variant="bordered"
                className="text-sm font-normal text-white bg-primary"
              >
                Connexion
              </Button>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
