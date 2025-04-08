
import { PronunciationScore } from "../types";

// This is a mock API that simulates AI evaluation of pronunciation
// In a real app, this would connect to a service like Google Cloud Speech-to-Text API or similar

export const analyzePronunciation = async (
  audioBlob: Blob,
  text: string,
  languageCode: string
): Promise<PronunciationScore> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // For demo purposes, generate random scores
  // In a real app, this would be the result of the API call
  const generateRandomScore = (): number => {
    return Math.floor(Math.random() * 11); // 0-10
  };
  
  const nuance = generateRandomScore();
  const pronunciation = generateRandomScore();
  const naturalness = generateRandomScore();
  const confidence = generateRandomScore();
  
  // Calculate overall score as weighted average
  const overall = Math.round(
    (nuance * 0.25 + pronunciation * 0.35 + naturalness * 0.25 + confidence * 0.15)
  );
  
  return {
    nuance,
    pronunciation,
    naturalness,
    confidence,
    overall
  };
};

// Mock function to get pronunciation audio URL
export const getPronunciationAudio = async (
  text: string,
  languageCode: string
): Promise<string> => {
  // In a real app, this would call a text-to-speech API
  // For demo, we'll just return a placeholder
  
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Return a placeholder URL - in a real app, this would be a URL to an audio file
  return "https://example.com/audio.mp3";
};
