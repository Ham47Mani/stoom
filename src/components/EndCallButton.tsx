"usec client";
import { useCall, useCalls, useCallStateHooks } from '@stream-io/video-react-sdk';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

const EndCallButton = () => {
  const router = useRouter();
  const call = useCall();
  const {useLocalParticipant} = useCallStateHooks();
  const localparticipant = useLocalParticipant();

  // Check the meeting owner
  const isMeetingOwner = localparticipant && call?.state.createdBy && localparticipant.userId === call.state.createdBy.id;
  if (!isMeetingOwner) return null;

  const handleEndCallButton = async () => {
    call.endCall();
    router.push('/');
  }

  return (
    <Button className='bg-red-500' onClick={handleEndCallButton}>
      End call for everyone
    </Button>
  )
}

export default EndCallButton