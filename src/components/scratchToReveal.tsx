import { ScratchToReveal as ScratchToRevealComponent } from "@/components/ui/scratch-to-reveal"

const ScratchToReveal = () => {
  return (
    <div>
      <ScratchToRevealComponent
        width={200}
        height={200}
        minScratchPercentage={70}
        className="flex items-center justify-center overflow-hidden rounded-2xl border-2 bg-secondary w-full h-full"
        gradientColors={["#0052D4 ", "#4364F7", "#6FB1FC"]}
      >
        <p className="text-9xl">👋</p>
      </ScratchToRevealComponent>
      <p className="text-center">Scratch to reveal</p>
    </div>
  )
}

export default ScratchToReveal
