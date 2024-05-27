"use client";

import MeetingRoom from "@/components/MeetingRoom";
import MeetingSetup from "@/components/MeetingSetup";
import { useUser } from "@clerk/nextjs";
import { StreamCall, StreamTheme } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { useGetCallById } from "../../../../../hooks/useGetCallById";
import Loader from "@/components/Loader";

type MeetingProps = {
  params: {
    id: string
  }
}

const Meeting = ({params : { id }}: MeetingProps) => {
  const {user, isLoaded} = useUser();
  const [isSetupCompete, setIsSetupCompete] = useState<boolean>(false);
  const {call, isCallLoading} = useGetCallById(id);

  if (!isLoaded || isCallLoading) return <Loader />

  return (
    <main className="h-screen w-full">
      <StreamCall call={call}>
        <StreamTheme>
          {
            !isSetupCompete ? (
              <MeetingSetup setIsSetupCompete={setIsSetupCompete}/>
            ) : (
              <MeetingRoom />
            )
          }
        </StreamTheme>
      </StreamCall>
    </main>
  )
}

export default Meeting