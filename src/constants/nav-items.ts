import { IconType } from "react-icons/lib";
import { CgHomeAlt, CgViewList, CgFile, CgFileDocument } from "react-icons/cg";
import { NavValue } from "@/types/nav-item";

interface NavItem {
  value: NavValue;
  title: string;
  href: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  {
    value: "home",
    title: "Home",
    href: "/",
    icon: CgHomeAlt
  },
  {
    value: "resume",
    title: "Resume",
    href: "/resume",
    icon: CgFile
  },
  {
    value: "cover-letter",
    title: "Cover Letter",
    href: "/cover-letter",
    icon: CgFileDocument
  },
  {
    value: "application",
    title: "Application",
    href: "/application",
    icon: CgViewList
  }
];