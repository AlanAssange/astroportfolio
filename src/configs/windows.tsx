import AboutWindow from "../components/About";
import ContactWindow from "../components/Contact";
import LinksWindow from "../components/Links";
import WorkWindow from "../components/Work";

export const windowsConfig = [
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