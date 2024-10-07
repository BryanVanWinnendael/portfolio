import ModeToggle from "./modeToggle"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { HamburgerMenuIcon } from "@radix-ui/react-icons"

const NavMobile = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon">
          <HamburgerMenuIcon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <a href="/">Home</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/projects">Projects</a>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <a href="/contact">Contact</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const Nav = () => {
  return (
    <>
      <div className="w-full h-20 flex justify-center py-4 px-2">
        <div className="max-w-[80rem] flex lg:justify-between justify-end gap-2 w-full ">
          <div className="lg:block hidden">
            <a href="/" className="font-semibold">
              Bryan Van Winnendael
            </a>
          </div>
          <ul className="gap-4 lg:flex hidden">
            <li>
              <a href="/">Home</a>
            </li>
            <li>
              <a href="/projects">Projects</a>
            </li>
            <li>
              <a href="/contact">Contact</a>
            </li>
          </ul>
          <ModeToggle />
          <div className="lg:hidden block">
            <NavMobile />
          </div>
        </div>
      </div>
    </>
  )
}

export default Nav
