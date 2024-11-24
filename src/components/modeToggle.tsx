import { Moon, Sun } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useEffect } from "react"
import { useStore } from "@nanostores/react"
import { themeStore, setTheme } from "@/stores/themeStore"

const modeToggle = () => {
  const theme = useStore(themeStore)

  const handleChangeTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  useEffect(() => {
    const isDarkMode = document.documentElement.classList.contains("dark")
    setTheme(isDarkMode ? "dark" : "light")
  }, [])

  useEffect(() => {
    const isDark = theme === "dark"
    document.documentElement.classList[isDark ? "add" : "remove"]("dark")
  }, [theme])

  return (
    <Button variant="outline" size="icon" onClick={handleChangeTheme}>
      <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default modeToggle
