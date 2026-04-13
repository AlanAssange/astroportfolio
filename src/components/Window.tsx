import React, {useEffect,useLayoutEffect,useState,useCallback} from "react";
import { useTranslation } from "react-i18next";
import { useStore } from "../utils/useStore";
import { useDraggable } from "../utils/useDraggable";
import { windowsConfig } from "../configs/windows";
import "../styles/window.css";

type WindowProps = {
  id: string;
  title: string;
  defaultVisible?: boolean;
};

export default function Window({
  id,
  title,
  defaultVisible = false,
}: WindowProps) {
  const { t } = useTranslation();
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth <= 768;
    }
    return false;
  });
  const [isPositioned, setIsPositioned] = useState(false);
  const isOpen = useStore((state) => state.openWindows.includes(id));
  const isFocused = useStore((state) => state.focusedWindow === id);
  const closeWindow = useStore((state) => state.closeWindow);
  const setFocusedWindow = useStore((state) => state.setFocusedWindow);
  const openWindow = useStore((state) => state.openWindow);

  const { windowRef, titlebarRef, onPointerDown } = useDraggable({
    id,
    isMobile,
  });
  const windowData = windowsConfig.find((win) => win.id === id);
  const ContentComponent = windowData?.Component;

  const centerWindow = useCallback(() => {
    const win = windowRef.current;
    if (!win) return;

    if (window.innerWidth <= 768) {
      win.style.left = "";
      win.style.top = "";
      setIsPositioned(true);
      return;
    }

    const width = win.offsetWidth;
    const height = win.offsetHeight;

    if (width > 0 && height > 0) {
      const left = (window.innerWidth - width) / 2;
      const top = (window.innerHeight - height) / 2;
      win.style.left = `${Math.max(0, left)}px`;
      win.style.top = `${Math.max(0, top)}px`;
      setIsPositioned(true);
    }
  }, [windowRef]);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    if (defaultVisible && !isMobile) {
      openWindow(id);
    }
  }, [defaultVisible, isMobile, id, openWindow]);

  useLayoutEffect(() => {
    if (isOpen) {
      centerWindow();
      const timeout = setTimeout(centerWindow, 30);
      return () => clearTimeout(timeout);
    } else {
      setIsPositioned(false);
    }
  }, [isOpen, centerWindow]);

  const windowClasses = [
    "window",
    isFocused ? "focused" : "",
    isPositioned ? "positioned" : "",
    !isOpen ? "hidden" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={windowRef}
      id={id}
      className={windowClasses}
      onPointerDown={() => setFocusedWindow(id)}
      style={{
        position: isMobile ? undefined : "absolute",
        left: isMobile
          ? undefined
          : isPositioned
            ? windowRef.current?.style.left
            : "-9999px",
        zIndex: isFocused ? 100 : 10,
        opacity: isMobile ? undefined : isPositioned ? 1 : 0,
        visibility: isMobile ? undefined : isPositioned ? "visible" : "hidden",
        transition: isMobile
          ? undefined
          : isPositioned
            ? "opacity 0.15s ease-in"
            : "none",
      }}
    >
      <div ref={titlebarRef} className="titlebar" onPointerDown={onPointerDown}>
        <span className="title-text">{t(title)}</span>
        <div className="controls">
          <button className="close-btn" onClick={() => closeWindow(id)}>
            [X]
          </button>
        </div>
      </div>
      <div className="content">
        {ContentComponent ? <ContentComponent /> : <p>{t("...")}</p>}
      </div>
    </div>
  );
}