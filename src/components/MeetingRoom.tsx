import { useState } from "react"
import { CallLayoutType } from "../../constants/types";
import { CallControls, CallingState, CallParticipantsList, CallStatsButton, PaginatedGridLayout, SpeakerLayout, useCallStateHooks } from '@stream-io/video-react-sdk';
import { cn } from "@/lib/utils";

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import { LayoutList, User } from "lucide-react";
import { Button } from "./ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";



const MeetingRoom = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isPersonalRoom = !!searchParams.get('personal');

  const [layout, setLayout] = useState<CallLayoutType>('speaker-left');
  const [showParitipants, setShowParitipants] = useState<boolean>(false);

  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED) return <Loader />

  // Render the layout
  const CallLayout = () => {
    switch (layout) {
      case 'grid':
        return <PaginatedGridLayout />
      case 'speaker-right':
        return <SpeakerLayout participantsBarPosition='left' />
      default:
        return <SpeakerLayout participantsBarPosition='right' />
    }
  }

  return (
    <section className="relative h-screen w-full overflow-hidden pt-4 text-white">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex items-center size-full max-w-[1000px]">
          {/* ------ Call Layout ------ */}
          <CallLayout />

          {/* ------ Show All Participants ------ */}
          <div className={cn("h-[calc(100vh-86px)] hidden ms-2", {'show-block': showParitipants})}>
            <CallParticipantsList onClose={() => setShowParitipants(false)}/>
          </div>
        </div>
        {/* ------ Manipulation Box ------ */}
        <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
          <CallControls onLeave={() => {router.push('/')}}/>

          {/* ------ Controlle Layout ------ */}
          <DropdownMenu>
            <div className="flex items-center">
              <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[x19232D] px-4 py-2 hover:bg-[#4C535B]">
                <LayoutList size={20} className="text-white"/>
              </DropdownMenuTrigger>
            </div>
            <DropdownMenuContent className="bg-dark-1 border-dark-1 text-white">
              {
                ['grid' ,'speaker-left' ,'speaker-right'].map((item, index) => (
                  <div className="" key={index}>
                    <DropdownMenuItem className="cursor-pointer" onClick={() => setLayout(item.toLowerCase() as CallLayoutType)}>
                      {item}
                    </DropdownMenuItem>
                    <DropdownMenuSeparator  className="border-dark-1"/>
                  </div>
                ))
              }
            </DropdownMenuContent>
          </DropdownMenu>

          {/* ------ Call Status ------ */}
          <CallStatsButton />

          {/* ------ Hide | Show Participants Button ------ */}
          <Button onClick={() => setShowParitipants(prev => !prev)}>
            <div className="cursor-pointer rounded-2xl px-4 py-2 bg-[#19232D] hover:bg-[#4C535B]">
              <User size={20} className="text-white" />
            </div>
          </Button>

          {/* ------ End Call Button ------ */}
          {!isPersonalRoom && <EndCallButton />}
        </div>
      </div>
    </section>
  )
}

export default MeetingRoom