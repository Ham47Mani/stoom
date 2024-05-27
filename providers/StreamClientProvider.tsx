"use client";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { useEffect, useState } from "react";
import { getTokenProvider } from "../actions/stream.actions";
import Loader from "@/components/Loader";

// =============== Our Stream SDK Info ===============
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;

const StreamClientProvider = ({children}: {children: React.ReactNode}) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();// Create a State with type of Stream Video Client
  const {user, isLoaded} = useUser();// Get Logged User From Clerk

  useEffect(() => {
    if (!user || !isLoaded) return // Check if no user login
    if (!apiKey) throw new Error('Stream  API key messing'); // Check if there's no API key
    // Create Stream Video Client Instance
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: user.id,
        name: user.username || user.id,
        image: user.imageUrl
      },
      tokenProvider: getTokenProvider
    });
    setVideoClient(client);
  }, [user, isLoaded]);

  if (!videoClient) return <Loader />

  return (
    <StreamVideo client={videoClient}>
      {children}
    </StreamVideo>
  )
}

export default StreamClientProvider