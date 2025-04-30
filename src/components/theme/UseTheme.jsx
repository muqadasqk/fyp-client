import { useState, useEffect } from "react";

const THEMES = ["theme-light", "theme-dark"];
const LIGHT_THEME = "theme-light";

const useTheme = () => {
  const [theme, setTheme] = useState(() => localStorage.getItem("theme") || LIGHT_THEME);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove(...THEMES);
    root.classList.add(theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return { theme, setTheme };
};

export default useTheme;
