
import React, { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { ArrowRight } from "lucide-react";
import LanguageSelector from "@/components/LanguageSelector";
import FlashcardDisplay from "@/components/FlashcardDisplay";
import RecordButton from "@/components/RecordButton";
import PronunciationFeedback from "@/components/PronunciationFeedback";
import { languages } from "@/data/languages";
import { getFlashcardsByLanguage } from "@/data/flashcards";
import { Language, PronunciationScore, Flashcard } from "@/types";
import { startRecording, stopRecording, playAudio } from "@/utils/audioUtils";
import { analyzePronunciation, getPronunciationAudio } from "@/api/pronunciationApi";

const FlashcardApp: React.FC = () => {
  const { toast } = useToast();
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(languages[0]);
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);
  const [currentFlashcardIndex, setCurrentFlashcardIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showTranslation, setShowTranslation] = useState(false);
  const [pronunciationScore, setPronunciationScore] = useState<PronunciationScore | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);

  // Get the current flashcard
  const currentFlashcard = flashcards[currentFlashcardIndex];

  // Handle language change
  const handleLanguageChange = (languageCode: string) => {
    const newLanguage = languages.find(lang => lang.code === languageCode) || languages[0];
    setSelectedLanguage(newLanguage);
    setCurrentFlashcardIndex(0);
    setPronunciationScore(null);
  };

  // Load flashcards when language changes
  useEffect(() => {
    const cards = getFlashcardsByLanguage(selectedLanguage.code);
    setFlashcards(cards);
  }, [selectedLanguage]);

  // Handle recording button click
  const handleRecordButtonClick = async () => {
    if (isRecording) {
      // Stop recording
      stopRecording(mediaRecorderRef.current, setIsRecording, handleAudioData);
    } else {
      // Start recording
      const recorder = await startRecording(setIsRecording);
      mediaRecorderRef.current = recorder;
      setPronunciationScore(null);
      
      if (!recorder) {
        toast({
          title: "Microphone access denied",
          description: "Please allow microphone access to record your pronunciation",
          variant: "destructive",
        });
      }
    }
  };

  // Handle audio data after recording stops
  const handleAudioData = async (audioBlob: Blob) => {
    if (!currentFlashcard) return;
    
    setIsProcessing(true);
    
    try {
      // In a real app, we would send the audio to a server for processing
      const score = await analyzePronunciation(
        audioBlob, 
        currentFlashcard.text,
        selectedLanguage.code
      );
      
      setPronunciationScore(score);
      
      // Show a toast based on the score
      if (score.overall >= 7) {
        toast({
          title: "Great pronunciation!",
          description: "Keep up the good work!",
          variant: "default",
        });
      } else if (score.overall >= 4) {
        toast({
          title: "Good attempt",
          description: "Try listening to the correct pronunciation",
          variant: "default",
        });
      } else {
        toast({
          title: "Keep practicing",
          description: "Listen to the correct pronunciation and try again",
          variant: "default",
        });
      }
    } catch (error) {
      console.error("Error processing pronunciation:", error);
      toast({
        title: "Error analyzing pronunciation",
        description: "Please try again",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  // Move to the next flashcard
  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < flashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    } else {
      // Cycle back to the beginning
      setCurrentFlashcardIndex(0);
    }
    
    // Reset states
    setPronunciationScore(null);
    setIsRecording(false);
  };

  // Play correct pronunciation
  const handlePlayCorrectPronunciation = async () => {
    if (!currentFlashcard) return;
    
    try {
      const audioUrl = await getPronunciationAudio(
        currentFlashcard.text,
        selectedLanguage.code
      );
      
      // In a demo, this won't work because we don't have real audio URLs
      // In a real app, we would play the audio from the URL
      toast({
        title: "Playing pronunciation...",
        description: "This is a demo. In a real app, the correct pronunciation would play.",
        variant: "default",
      });
      
      // Simulate audio playback for demo
      setTimeout(() => {
        // In a real app, this would be: playAudio(audioUrl);
        console.log("Playing audio:", audioUrl);
      }, 500);
    } catch (error) {
      console.error("Error getting pronunciation audio:", error);
      toast({
        title: "Error playing pronunciation",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  // Toggle translation visibility
  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-speak-blue to-purple-600">
          Speak Sensei
        </h1>
        <p className="text-center text-gray-600 mt-2">
          Practice your pronunciation with AI feedback
        </p>
      </header>
      
      <div className="flex justify-center">
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
      
      {currentFlashcard && (
        <>
          <div className="mb-8">
            <FlashcardDisplay 
              flashcard={currentFlashcard}
              showTranslation={showTranslation}
            />
            
            <div className="flex justify-center mt-2">
              <Button
                variant="ghost"
                onClick={toggleTranslation}
                className="text-sm text-gray-500 hover:text-speak-blue"
              >
                {showTranslation ? "Hide translation" : "Show translation"}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <RecordButton
              isRecording={isRecording}
              isProcessing={isProcessing}
              onClick={handleRecordButtonClick}
              disabled={!currentFlashcard}
            />
            <p className="text-sm text-gray-500 mt-2">
              {isRecording ? "Stop recording" : "Tap to speak"}
            </p>
          </div>
          
          <PronunciationFeedback
            score={pronunciationScore}
            onPlayCorrectPronunciation={handlePlayCorrectPronunciation}
            isLoading={isProcessing}
          />
          
          <div className="flex justify-center mt-8">
            <Button
              onClick={handleNextFlashcard}
              className="bg-speak-blue hover:bg-blue-600 flex items-center gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default FlashcardApp;
