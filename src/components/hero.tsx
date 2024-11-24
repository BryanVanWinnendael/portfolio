const Hero = () => {
  const start = new Date("2020-09-01")
  const years = new Date().getFullYear() - start.getFullYear()
  return (
    <div className="-mt-10">
      <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-left mb-2">
        Bryan Van Winnendael
      </h1>

      <p className="mt-2 lg:max-w-[70%]">
        I'm a full stack developer based in Belgium and I started programming{" "}
        {years} years ago.
      </p>
    </div>
  )
}

export default Hero
