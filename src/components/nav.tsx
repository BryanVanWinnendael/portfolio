import ModeToggle from "./modeToggle"

const Nav = () => {
  return (
    <>
      <div className="w-full h-20 flex justify-center fixed z-50">
        <div className="max-w-[40rem] px-6 flex justify-between gap-2 w-full bg-background/75 backdrop-blur-sm py-4">
          <ul className="gap-4 flex text-gray-500 text-lg">
            <li>
              <a
                className="hover:text-black dark:hover:text-white duration-100"
                href="/"
              >
                Home
              </a>
            </li>
            <li>
              <a
                className="hover:text-black dark:hover:text-white duration-100"
                href="/projects"
              >
                Projects
              </a>
            </li>
            <li>
              <a
                className="hover:text-black dark:hover:text-white duration-100"
                href="/contact"
              >
                Contact
              </a>
            </li>
          </ul>
          <ModeToggle />
        </div>
      </div>
    </>
  )
}

export default Nav
