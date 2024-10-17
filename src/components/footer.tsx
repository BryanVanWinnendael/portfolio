const Footer = () => {
  const year = new Date().getFullYear()

  return (
    <div className="pt-12 text-sm ">
      <hr className="bg-white mb-4" />
      <div className="flex flex-col items-center">
        <p>@{year} Bryan Van Winnendael | Belgium</p>
        <div className="flex flex-wrap gap-2 text-gray-500">
          <a
            className="hover:text-black dark:hover:text-white duration-100"
            href="/"
          >
            Home
          </a>
          <a
            className="hover:text-black dark:hover:text-white duration-100"
            href="/projects"
          >
            Projects
          </a>
          <a
            className="hover:text-black dark:hover:text-white duration-100"
            href="/contact"
          >
            Contact
          </a>
        </div>
        <p>
          Built with{" "}
          <a
            href="https://astro.build/"
            target="_blank"
            className="text-blue-500"
          >
            Astro
          </a>
        </p>
      </div>
    </div>
  )
}

export default Footer
