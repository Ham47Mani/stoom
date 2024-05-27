import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react"


export const useGetCalls = () => {
  const [calls, setCalls] = useState<Call[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const {user} = useUser();
  const client = useStreamVideoClient();

  useEffect(() => {
    // Load all calls function
    const loadCall = async () => {
      if (!client || !user?.id) return;

      setIsLoading(true);

      try {
        const {calls} = await client.queryCalls({
          sort: [{field: 'starts_at', direction: -1}],
          filter_conditions: {
            starts_at: {$exists: true},
            $or: [
              { created_by_user_id: user.id },
              { members: {$in: [user.id]} }
            ]
          }
        });
        
        setCalls(calls);
      } 
      catch (error) { console.log(error); } 
      finally { setIsLoading(false); }
    };
    // Call Load all calls function
    loadCall();
  }, [client, user?.id]);
  
  const now = new Date();
  const endedCalls: Call[] = calls.filter(({state: {startsAt, endedAt}}: Call) => {
    return (startsAt && (new Date(startsAt) < now || !!endedAt));
  });
  const upcomingCalls: Call[] = calls.filter(({state: {startsAt}}: Call) => {
    return startsAt && new Date(startsAt) > now;
  });

  return {
    endedCalls,
    upcomingCalls,
    callRecordings: calls,
    isLoading
  };
}