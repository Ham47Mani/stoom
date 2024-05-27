'use server';
import { currentUser } from "@clerk/nextjs/server";
import { StreamClient } from "@stream-io/node-sdk";

// Get Stream SDK info from .env file
const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
const apiSecret = process.env.STREAM_SECRET_KEY;

export const getTokenProvider = async (): Promise<string> => {
  const user = await currentUser(); // Get User Logged In
  // Check all information
  if (!user) throw new Error('User is not logged in');
  if (!apiKey) throw new Error('Stream  API key messing');
  if (!apiSecret) throw new Error("There's no API secret key");

  // Create Stream Client
  const client = new StreamClient(apiKey, apiSecret, {timeout: 3000});

  const exp = Math.round(new Date().getTime() / 1000) + 60 * 60; // Create expiration date
  const issued = Math.floor(Date.now() / 1000) - 60;// Create time for the app when issue happen

  const token = client.createToken(user.id, exp, issued);// Create the token
  return token;
}