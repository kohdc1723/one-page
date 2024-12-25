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
    href: "/dashboard/home",
    icon: CgHomeAlt
  },
  {
    title: "Resume",
    href: "/dashboard/resume",
    icon: CgFile
  },
  {
    title: "Cover Letter",
    href: "/dashboard/cover-letter",
    icon: CgFileDocument
  },
  {
    title: "Application",
    href: "/dashboard/application",
    icon: CgViewList
  }
];