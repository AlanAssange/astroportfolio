import AboutWindow from "../components/About";
import ContactWindow from "../components/Contact";
import LinksWindow from "../components/Links";
import WorkWindow from "../components/Work";

export const windowsConfig = [
  {
    id: "win-lab",
    title: "shortcuts.about",
    label: "shortcuts.about",
    icon: "/src/assets/icons/ballicon.png",
    x: 52,
    y: 240,
    Component: AboutWindow,
  },
  {
    id: "win-links",
    title: "shortcuts.links",
    label: "shortcuts.links",
    icon: "/src/assets/icons/linkicon.png",
    x: 52,
    y: 120,
    Component: LinksWindow,
  },
  {
    id: "win-work",
    title: "shortcuts.work",
    label: "shortcuts.work",
    icon: "/src/assets/icons/shieldicon.png",
    x: 52,
    y: 360,
    Component: WorkWindow
  },
  {
    id: "win-contact",
    title: "shortcuts.contact",
    label: "shortcuts.contact",
    icon: "/src/assets/icons/contacticon.png",
    x: 52,
    y: 480,
    Component: ContactWindow,
  },
];