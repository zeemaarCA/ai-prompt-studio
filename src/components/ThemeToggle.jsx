"use client";

import { IoSunnyOutline } from "react-icons/io5";
import { FaRegMoon } from "react-icons/fa";
import { useTheme } from "next-themes";


export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

	return (
    <>
      <div>
      {theme === "dark" ? (
        <div
          className="flex"
          onClick={() => setTheme("light")}
        >
          <IoSunnyOutline className="h-8 w-8 cursor-pointer text-orange-400 sm:h-10 sm:w-10" />
        </div>
      ) : (
        <div
          className="flex"
          onClick={() => setTheme("dark")}
        >
          <FaRegMoon className="h-8 w-8 cursor-pointer text-sky-400 sm:h-8 sm:w-8" />
        </div>
      )}
    </div>
		</>
	);
}
