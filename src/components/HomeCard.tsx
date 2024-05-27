import Image from "next/image"
import { HomeCardType } from "../../constants/types"
import { cn } from "@/lib/utils"

type HomeCardProps = {
  card: HomeCardType,
  handleClick: () => void
}

const HomeCard = ({card, handleClick} : HomeCardProps) => {
  return (
    <div className={`px-4 py-6 flex flex-col justify-between w-full xl:max-w-[270px] min-h-[260px] rounded-2xl cursor-pointer ${card.style}`} onClick={handleClick}>
      {/* --- Icon --- */}
      <div className="flex justify-center items-center glassmorphism size-12 rounded-xl">
        <Image src={card.img} alt={card.title} width={24} height={24} />
      </div>
      {/* --- Content --- */}
      <div className="flex flex-col gap-2">
        <h1 className="text-xl font-bold">{card.title}</h1>
        <p className="font-normal">{card.description}</p>
      </div>
    </div>
  )
}

export default HomeCard