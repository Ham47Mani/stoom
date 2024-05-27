"use client";
import { useRouter } from "next/navigation";
import { HomeBoxsCards } from "../../constants";
import HomeCard from "./HomeCard";
import { useState } from "react";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { VideoCallInfo } from "../../constants/types";
import { useToast } from "./ui/use-toast";
import { Textarea } from "./ui/textarea";
import ReactDatePicker from "react-datepicker";
import { Input } from "./ui/input";

const MeetingTypeList = () => {
  const router = useRouter();
  const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstanceMeeting' | undefined>();
  const [values, setValues] = useState<VideoCallInfo>({
    dateTime: new Date(),
    description: "",
    link: ""
  });
  const [callDetails, setCallDetails] = useState<Call>();
  const {user} = useUser();
  const client = useStreamVideoClient();
  const {toast} = useToast();

  // Create Meeting function
  const createMeeting = async () => {
    if (!client || !user) return
    
    try {
      if (!values.dateTime) {
        toast({title: "Please select a date and time"});
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Faild to create call instance");

      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instance meeting';

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description
          }
        }
      });
      setCallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }
      toast({title: "Meeting Created"});
    } catch (error) {
      console.log(error);
      toast({title: "Faild to create meeting"});
    }    
  }

  // Meeting Link Function
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;

  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      {/* --- Home Cards --- */}
      {
        HomeBoxsCards.map((card, i) => (
          <HomeCard key={i} card={card} handleClick={(card.handleClickValue ? () => setMeetingState(card.handleClickValue) : () => router.push(card.route as string))}/>
        ))
      }
      {/* --- Meeting Modal --- */}
      {
        !callDetails ? (
          <MeetingModal isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Create Meeting"
            handleClick={createMeeting}
          >
            <div className="flex flex-col gap-2.5">
              <label htmlFor="description" className="text-base leading-[22px] font-normal">Add a description</label>
              <Textarea id="description" className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0" onChange={(e) => {setValues({...values, description: e.target.value})}}/>
            </div>
            <div className="flex flex-col w-full gap-2.5">
              <label htmlFor="date" className="text-base leading-[22px] font-normal">Select Date and Time</label>
              <ReactDatePicker selected={values.dateTime} onChange={(date) => setValues({...values, dateTime: date!})} showTimeSelect 
                timeFormat="HH:mm"  timeIntervals={15} timeCaption="time" dateFormat="MMMM d, yyyy h:mm aa" className="w-full rounded bg-dark-3 p-2 focus:outline-none"
              />
            </div>
          </MeetingModal>
        ) : (
          <MeetingModal isOpen={meetingState === 'isScheduleMeeting'}
            onClose={() => setMeetingState(undefined)}
            title="Meeting Created"
            className="text-center"
            handleClick={() => {
              navigator.clipboard.writeText(meetingLink);
              toast({title: "Link copied"});
            }}
            image="/icons/checked.svg"
            buttonIcon="/icons/copy.svg"
            buttonText="Copy Meeting Link"
          />
        )
      }
      <MeetingModal isOpen={meetingState === 'isInstanceMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />

      <MeetingModal isOpen={meetingState === 'isJoiningMeeting'}
        onClose={() => setMeetingState(undefined)}
        title="Type the link here"
        className="text-center"
        buttonText="Join Meeting"
        handleClick={() => router.push(values.link)}
      >
        <Input className="border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0" type="text" placeholder="Meeting link" onChange={(e) => setValues({...values, link: e.target.value})} />
      </MeetingModal>
    </section>
  )
}

export default MeetingTypeList