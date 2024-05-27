"use client";
import { DeviceSettings, useCall, VideoPreview } from "@stream-io/video-react-sdk"
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { Button } from "./ui/button";

type MeetingSetupProps = {
  setIsSetupCompete: Dispatch<SetStateAction<boolean>>
}

const MeetingSetup = ({setIsSetupCompete}: MeetingSetupProps) => {
  const [isMicToggledOn, setIsMicToggledOn] = useState<boolean>(false);
  const call = useCall();

  if (!call) throw new Error("useCall must be used within StreamCall component");

  useEffect(() => {
    if (isMicToggledOn) {
      call?.camera.disable();
      call?.microphone.disable();
    } else {
      call?.camera.enable();
      call?.microphone.enable();
    }
  }, [isMicToggledOn, call?.camera, call?.microphone]);

  const handleJoinMeeting = () => {
    call.join();
    setIsSetupCompete(true);
  }

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center gap-3 text-white">
      <h1 className="text-2xl font-bold">Setup</h1>
      <VideoPreview />
      <div className="flex items-center justify-center gap-3 h-16">
        <label htmlFor="cameraOn" className="flex items-center justify-center gap-2 font-medium">
          <input type="checkbox" checked={isMicToggledOn} name="cameraOn" id="cameraOn" onChange={e => setIsMicToggledOn(e.target.checked)} />
          Join with mic and camera off
        </label>
        <DeviceSettings />
      </div>
      <Button className="rounded-md bg-green-500 px-4 py-2.5" onClick={handleJoinMeeting}>Join Metting</Button>
    </div>
  )
}

export default MeetingSetup