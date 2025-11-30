// components/Window.tsx  (o .jsx si no usas TypeScript)
import React, { useRef, useEffect, useState} from "react";
import "../styles/window.css";

type WindowProps = {
  id: string;
  title: string;
  children?: any;
  defaultVisible?: boolean; // opcional, por si quieres que alguna empiece abierta
};

export default function Window({
  id,
  title,
  children,
  defaultVisible = false,
}: WindowProps) {
  const windowRef = useRef<HTMLDivElement>(null);
  const titlebarRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isVisible, setIsVisible] = useState(defaultVisible);

  // ← NUEVO: Escuchar evento personalizado para abrir esta ventana
  useEffect(() => {
    const openHandler = (e: CustomEvent<string>) => {
      if (e.detail === id) {
        setIsVisible(true);
        // Opcional: traer al frente al abrir
        setTimeout(() => bringToFront(), 50);
      }
    };

    // Escuchamos eventos globales tipo "open-window"
    window.addEventListener("open-window" as any, openHandler as EventListener);

    return () => {
      window.removeEventListener("open-window" as any, openHandler as EventListener);
    };
  }, [id]);

  const bringToFront = () => {
    const allWindows = document.querySelectorAll(".window");
    let maxZ = 0;
    allWindows.forEach((w) => {
      const z = parseInt(getComputedStyle(w).zIndex || "0");
      if (z > maxZ) maxZ = z;
    });
    if (windowRef.current) {
      windowRef.current.style.zIndex = String(maxZ + 1);
    }
  };
  // --- Drag logic ---
  useEffect(() => {
    const titlebar = titlebarRef.current;
    const win = windowRef.current;
    if (!titlebar || !win) return;
  
    let startX = 0;
    let startY = 0;
  
    const onPointerDown = (e: PointerEvent) => {

      e.preventDefault();
      titlebar.setPointerCapture(e.pointerId);
      bringToFront();
  
      const rect = win.getBoundingClientRect();
      const winX = rect.left + window.scrollX;
      const winY = rect.top + window.scrollY;
  
      const offsetX = e.clientX - winX;
      const offsetY = e.clientY - winY;
  
      startX = e.clientX;
      startY = e.clientY;
  
      (titlebar as any)._dragOffsetX = offsetX;
      (titlebar as any)._dragOffsetY = offsetY;
  
      setIsDragging(true);
    };
  
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
  
      const offsetX = (titlebar as any)._dragOffsetX || 0;
      const offsetY = (titlebar as any)._dragOffsetY || 0;
  
      win.style.left = `${e.clientX - offsetX}px`;
      win.style.top  = `${e.clientY - offsetY}px`;
    };
  
    const onPointerUp = (e: PointerEvent) => {
      setIsDragging(false);
      try { titlebar.releasePointerCapture(e.pointerId); } catch {}
      // limpiamos
      delete (titlebar as any)._dragOffsetX;
      delete (titlebar as any)._dragOffsetY;
    };
  
    titlebar.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("pointermove", onPointerMove);
    document.addEventListener("pointerup", onPointerUp);
  
    return () => {
      titlebar.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerup", onPointerUp);
    };
  }, [isDragging]);

  const handleWindowClick = () => bringToFront();

  return (
    <div
      ref={windowRef}
      id={id}
      className={`window ${isVisible ? "" : "hidden"}`}
      style={{
        position: "absolute"
      }} /* importante para poder mover con left/top */
      role="dialog"
      aria-label={title}
      onPointerDown={handleWindowClick} /* trae al frente al hacer click */
    >
      <div ref={titlebarRef} className="titlebar" style={{ cursor: "move" }}>
        <span className="title-text">{title}</span>
        <div className="controls">
          <button className="min-btn" aria-label="minimizar"  onClick={() => setIsVisible(false)}>
            –
          </button>
          <button className="close-btn" aria-label="cerrar" onClick={() => setIsVisible(false)}>
            ✕
          </button>
        </div>
      </div>
      <div className="content">{children}</div>
    </div>
  );
}