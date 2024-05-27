import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Button } from "./ui/button"



type MeetingModalType = {
  isOpen: boolean,
  onClose: () => void,
  title: string,
  className?: string,
  children?: React.ReactNode,
  handleClick?: () => void,
  buttonIcon?: string,
  buttonText?: string,
  image?: string,
}

const MeetingModal = ({isOpen, onClose, image, title, className, children, buttonText, buttonIcon, handleClick} : MeetingModalType) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-dark-1 px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
          {
            image && (
              <div className="flex justify-center">
                <Image src={image} alt="image" width={72} height={72} />
              </div>
            )
          }
          <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>{title}</h1>
          {children}
          <Button className="bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}>
            { buttonIcon && (
              <Image src={buttonIcon} alt="button Icon" width={16} height={16} />
            )} &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>

  )
}

export default MeetingModal