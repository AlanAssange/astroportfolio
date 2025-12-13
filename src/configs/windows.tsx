import AboutWindow from "../components/About";
import ContactWindow from "../components/Contact";

export const windowsConfig = [
    {
      id: "win-lab",
      title: "About",
      label: "About",
      icon: "/src/assets/icons/ballicon.png",
      x: 40,
      y: 240,
      content: () => (
        <>
        <AboutWindow/>
        </>
      ),
    },
    {
      id: "win-links",
      title: "Links",
      label: "Links",
      icon: "/src/assets/icons/linkicon.png",
      x: 40,
      y: 120,
      content: () => (
        <>
        <img src="src/assets/icons/linkedin.svg"/>
        </>
      ),
    },
    {
      id: "win-work",
      title: "Work",
      label: "Work",
      icon: "/src/assets/icons/shieldicon.png",
      x: 40,
      y: 360,
      content: () => (
        <>
          <h2>WORK IN PROGRESS</h2>
          <p>WORK IN PROGRESS</p>
          {/* <img src="/lab.jpg" /> */}
        </>
      ),
    },
    {
      id: "win-contact",
      title: "Contact",
      label: "Contact",
      icon: "/src/assets/icons/contacticon.png",
      x: 40,
      y: 480,
      content: () => (
        <>
          <ContactWindow />
        </>
      ),
    },
  ];