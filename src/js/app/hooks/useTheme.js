import { useEffect, useState } from "react";

export function useTheme() {
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const root = document.documentElement;
    root.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
    console.log("theme switched");
  }, [theme]);

  return { theme, toggleTheme: () => setTheme(t => (t === "dark" ? "light" : "dark")) };
}
