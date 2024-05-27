// @ts-nocheck
"use client";
import { Call, CallRecording } from '@stream-io/video-react-sdk';
import { useGetCalls } from '../../hooks/useGetCalls'
import { useEffect, useState } from 'react';
import MeetingCard from './MeetingCard';
import { useRouter } from 'next/navigation';
import Loader from './Loader';
import { useToast } from './ui/use-toast';

type CallListProps = {
  type: "upcoming" | "ended" | "recordings"
}

const CallList = ({type}: CallListProps) => {
  const router = useRouter();
  const {toast} = useToast();
  const {isLoading, upcomingCalls, endedCalls, callRecordings} = useGetCalls();
  const [recordings, setRecordings] = useState<CallRecording[]>([]);
  
  // Get all calls in array
  const getCalls = (): Call[] | CallRecording[] => {
    switch (type) {
      case "upcoming":
        return upcomingCalls;
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      default:
        return []
    }
  };
  // Get message for each type
  const getNoCallsMessage = (): string => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings";
      case "upcoming":
        return "No Upcoming Calls";
      default:
        return ""
    }
  };

  // Get the recordings calls
  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        const callData = await Promise.all(callRecordings.map(meeting => meeting.queryRecordings()));
        const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings);
        setRecordings(recordings);
      } catch (error) {
        toast({title: "Try again later"});
      }
    };

    if (type === "recordings") fetchRecordings();
  }, [type, callRecordings, toast]);

  if (isLoading) return <Loader />;

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();
  
  return (
    <div className='grid grid-cols-1 gap-5 lg:grid-cols-2'>
      {
        calls && calls.length > 0 ? calls.map((meeting: Call | CallRecording) => (
          <MeetingCard key={(meeting as Call).id} 
            icon={
              type === 'ended' ? "/icons/previous.svg" :
              type === "upcoming" ? "/icons/upcoming.svg" : "/icons/recordings.svg"
            }
            title={meeting.state?.custom?.description?.substring(0, 32) || meeting.filename?.substring(0, 23) || 'Personal Meeting'} 
            date={(meeting as Call).state?.startsAt?.toLocaleString() || (meeting as CallRecording).start_time?.toLocaleString()}
            link={type === 'recordings' ? meeting.url : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${meeting.id}`}
            buttonIcon={type === 'recordings' ? "/icons/play.svg" : undefined}
            buttonText={type === 'recordings' ? "Play" : "Start"}
            isPreviousMeeting={type === 'ended'}
            handleClick={type === 'recordings' ? 
              () => { router.push(meeting.url); } : 
              () => { router.push(`/meeting/${meeting.id}`) }
            }
          />
        )) : (
          <h1>{noCallsMessage}</h1>
        )
      }
    </div>
  )
}

export default CallList