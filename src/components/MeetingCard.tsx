import Image from "next/image";
import { useToast } from "./ui/use-toast"
import { cn } from "@/lib/utils";
import { avatarImages } from "../../constants";
import { Button } from "./ui/button";

type MeetingCardProps = {
  title: string;
  date: string;
  icon: string;
  isPreviousMeeting?: boolean;
  buttonIcon?: string;
  buttonText?: string;
  handleClick: () => void;
  link: string;

}

const MeetingCard = ({title, icon, date, isPreviousMeeting, handleClick, link, buttonIcon, buttonText}: MeetingCardProps) => {
  const {toast} = useToast();

  const handleCopierLink = () => {
    navigator.clipboard.writeText(link);
    toast({
      title: "Link Copied"
    })
  }

  return (
    <section className="flex min-h-[250px] w-full flex-col justify-between rounded-xl bg-dark-1 px-5 py-8 lg:max-w-[5400px]">
      <article className="flex flex-col gap-5">
        <Image src={icon} alt={title} width={28} height={28}/>
        <div className="flex justify-between">
          <div className="flex flex-col gap-2">
            <h1 className="text-2xl font-bold">{title}</h1>
            <p className="text-base font-normal">{date}</p>
          </div>
        </div>
      </article>
      <article className={cn("flex justify-center relative", {})}>
        <div className="relative flex w-full max-sm:hidden">
          {
            avatarImages.map((img, index) => (
              <Image src={img} key={index} alt="attendes" width={40} height={40} className={cn("rounded-full", {absolute: index > 0})} style={{top: 0, left: index * 28}}/>
            ))
          }
          <div className="flex justify-center items-center absolute left-[136px] size-10 rounded-full border-[5px] border-dark-3 bg-dark-4">
            +5
          </div>
        </div>
        {
          !isPreviousMeeting && (
            <div className="flex gap-2">
              <Button onClick={handleClick} className="rounded bg-blue-1 px-6">
                {buttonIcon && (
                  <Image src={buttonIcon} alt="feature" width={20} height={20} />
                )}
                &nbsp;
                {buttonText}
              </Button>
              <Button onClick={handleCopierLink} className="bg-dark-4 px-6">
                <Image src="/icons/copy.svg" alt="copy-icon" width={20} height={20} />
                &nbsp; 
                Copy Link
              </Button>
            </div>
          )
        }
      </article>
    </section>
  )
}

export default MeetingCard