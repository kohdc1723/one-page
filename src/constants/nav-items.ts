import { IconType } from "react-icons/lib";
import { CgHomeAlt, CgViewList, CgFile, CgFileDocument } from "react-icons/cg";

interface NavItem {
  title: string;
  href: string;
  icon: IconType;
}

export const navItems: NavItem[] = [
  {
    title: "Home",
    href: "/",
    icon: CgHomeAlt
  },
  {
    title: "Resume",
    href: "/resume",
    icon: CgFile
  },
  {
    title: "Cover Letter",
    href: "/cover-letter",
    icon: CgFileDocument
  },
  {
    title: "Application",
    href: "/application",
    icon: CgViewList
  }
];