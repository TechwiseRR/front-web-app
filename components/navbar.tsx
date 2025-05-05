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
          <NextLink className="flex justify-start items-center gap-1" href="/">
          <Image src="/rr.png" alt="Logo" height={40} />
          </NextLink>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex sm:basis-full" justify="end">
        <NavbarItem className="hidden md:flex justify-end w-full gap-3">
          {isAuthenticated ? (
            <>
              <Button as={Link} className="text-sm font-normal text-default-600 bg-default-100" href="/ressources" variant="flat">
                Ressources
              </Button>
              <Button as={Link} className="text-sm font-normal text-default-600 bg-default-100" href="/forum" variant="flat">
                Forum
              </Button>
              <Button as={Link} className="text-sm font-normal text-default-600 bg-default-100" href="/aide" variant="flat">
                Aide
              </Button>
              <Button as={Link} className="text-sm font-normal text-white bg-[#0a4267]" href="/profil">
                Profil
              </Button>
            </>
          ) : (
            // Si l'utilisateur n'est pas authentifié
            <>
              <Button as={Link} className="text-sm font-normal text-default-600 bg-default-100" href="/home" variant="flat">
                Accueil
              </Button>
              <Button as={Link} className="text-sm font-normal text-default-600 bg-default-100" href="/ressources" variant="flat">
                Ressources
              </Button>
              <Button as={Link} className="text-sm font-normal text-default-600 bg-default-100" href="/aide" variant="flat">
                Aide
              </Button>
              <Button as={Link} className="text-sm font-normal text-white bg-[#0a4267]" href="/login">
                Connexion
              </Button>
            </>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        <NavbarMenuToggle className="text-[#0a4267]" />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-2 flex flex-col">
          {isAuthenticated ? (
            <>
              <NavbarMenuItem>
                <Link href="/ressources" size="lg">Ressources</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/forum" size="lg">Forum</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/aide" size="lg">Aide</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/profil" size="lg" color="primary">Profil</Link>
              </NavbarMenuItem>
            </>
          ) : (
            <>
              <NavbarMenuItem>
                <Link href="/home" size="lg">Accueil</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/ressources" size="lg">Ressources</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/aide" size="lg">Aide</Link>
              </NavbarMenuItem>
              <NavbarMenuItem>
                <Link href="/login" size="lg" color="primary">Connexion</Link>
              </NavbarMenuItem>
            </>
          )}
        </div>
      </NavbarMenu>
    </HeroUINavbar>
  );
};
