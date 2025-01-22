"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Link,
  Button,
} from "@heroui/react";
import { menuItems } from "@/utils/data/MenuItems";
import { FaGithub } from "react-icons/fa";
import Image from "next/image";

export const Logo = () => {
  return (
    <Image src="/logo.png" alt="logo" width={40} height={40} className="max-w-full h-auto invert grayscale"/>
  );
};

export default function AppNavbar() {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarContent>
        <NavbarItem>
          <NavbarMenuToggle
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            className="min-[770px]:hidden"
          />
          <NavbarBrand >
          <Logo />
          <p className="font-bold text-inherit">DEEP HANSDA</p>
        </NavbarBrand>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="center" className="min-[770px]:hidden">
        <NavbarBrand className="max-md:hidden">
          <Logo />
          <p className="font-bold text-inherit">DEEP HANSDA</p>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent justify="center" className="max-[770px]:hidden">
        {menuItems.map((item, index) => (
          <NavbarItem key={index}>
            <Link
              color="foreground"
              className="capitalize  hover:text-secondary"
              href={item.link}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>
      <NavbarContent justify="end">
        <NavbarItem>
          <Button variant="shadow" color="secondary">
            <Link href="https://github.com/DeepHansda" target="_blank">
              <FaGithub size={25} color="#fff" />
            </Link>
          </Button>
        </NavbarItem>
      </NavbarContent>
      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem isActive={true} key={index}>
            <Link
              className="w-full capitalize text-white"
              href={item.link}
              size="lg"
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}
