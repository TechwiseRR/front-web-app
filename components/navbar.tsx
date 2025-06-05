"use client";

import { useState } from "react";
import {
  Navbar as HeroUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
} from "@heroui/navbar";
import { Button } from "@heroui/button";
import { Link } from "@heroui/link";
import NextLink from "next/link";
import { Image } from "@heroui/image";

export const Navbar = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <HeroUINavbar className="bg-[#f3ede7]" maxWidth="xl" position="sticky">
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
              <Button as={Link} href="/ressources" variant="flat">
                Ressources
              </Button>
              <Button as={Link} href="/forum" variant="flat">
                Forum
              </Button>
              <Button as={Link} href="/aide" variant="flat">
                Aide
              </Button>
              <Button
                as={Link}
                href="/profil"
                variant="flat"
                className="text-sm font-normal text-white bg-[#0a4267]"
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
                variant="flat"
                className="text-sm font-normal text-white bg-[#0a4267]"
              >
                Connexion
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      {/* Mobile menu toggle */}
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle className="text-[#0a4267]" />
      </NavbarContent>

      {/* Mobile menu */}
      <NavbarMenu>
        <div className="mx-4 mt-4 flex flex-col gap-2">
          {isAuthenticated ? (
            <>
              <Button as={Link} href="/ressources" variant="flat">
                Ressources
              </Button>
              <Button as={Link} href="/forum" variant="flat">
                Forum
              </Button>
              <Button as={Link} href="/aide" variant="flat">
                Aide
              </Button>
              <Button
                as={Link}
                href="/profil"
                variant="flat"
                className="text-sm font-normal text-white bg-[#0a4267]"
              >
                Profil
              </Button>
            </>
          ) : (
            <>
              <Button as={Link} href="/" variant="flat">
                Accueil
              </Button>
              <Button as={Link} href="/ressources" variant="flat">
                Ressources
              </Button>
              <Button as={Link} href="/aide" variant="flat">
                Aide
              </Button>
              <Button
                as={Link}
                href="/connexion"
                variant="flat"
                className="text-sm font-normal text-white bg-[#0a4267]"
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
