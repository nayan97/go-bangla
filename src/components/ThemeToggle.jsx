import React, { useEffect, useState } from "react";
import { LuSunMedium } from "react-icons/lu";
import { IoIosMoon } from "react-icons/io";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <label className="swap swap-rotate">
      <input
        type="checkbox"
        onChange={toggleTheme}
        checked={theme === "dark"}
      />

      <LuSunMedium className="swap-on w-6 h-6" />

      <IoIosMoon className="swap-off w-6 h-6" />
    </label>
  );
};

export default ThemeToggle;
