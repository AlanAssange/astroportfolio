import type { ComponentType } from "react";
import AboutWindow from "../components/About";
import ContactWindow from "../components/Contact";
import LinksWindow from "../components/Links";
import WorkWindow from "../components/Work";
import WelcomeWindow from "../components/Welcome";

type WindowConfigBase = {
  id: string;
  title: string;
  Component: ComponentType;
  defaultVisible?: boolean;
};

export type WindowConfigWithShortcut = WindowConfigBase & {
  label: string;
  icon: string;
  x: number;
  y: number;
};

export type WindowConfig = WindowConfigBase | WindowConfigWithShortcut;

export function hasShortcut(win: WindowConfig): win is WindowConfigWithShortcut {
  return "label" in win && "icon" in win && "x" in win && "y" in win;
}

export const windowsConfig: WindowConfig[] = [
  {
    id: "win-welcome",
    title: "welcome.title",
    Component: WelcomeWindow,
    defaultVisible: true 
  },
  {
    id: "win-lab",
    title: "shortcuts.about",
    label: "shortcuts.about",
    icon: "/ballicon.png",
    x: 52,
    y: 140,
    Component: AboutWindow,
  },
  {
    id: "win-links",
    title: "shortcuts.links",
    label: "shortcuts.links",
    icon: "/linkicon.png",
    x: 52,
    y: 380,
    Component: LinksWindow,
  },
  {
    id: "win-work",
    title: "shortcuts.work",
    label: "shortcuts.work",
    icon: "/shieldicon.png",
    x: 52,
    y: 260,
    Component: WorkWindow
  },
  {
    id: "win-contact",
    title: "shortcuts.contact",
    label: "shortcuts.contact",
    icon: "/contacticon.png",
    x: 52,
    y: 500,
    Component: ContactWindow,
  },
];