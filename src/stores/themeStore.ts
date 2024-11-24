import { atom } from "nanostores"

export const themeStore = atom<"dark" | "light">("light")

export const toggleTheme = () => {
  themeStore.set(themeStore.get() === "light" ? "dark" : "light")
}

export const setTheme = (theme: "dark" | "light") => {
  themeStore.set(theme)
}
