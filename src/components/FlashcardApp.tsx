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

  const currentFlashcard = flashcards[currentFlashcardIndex];

  const handleLanguageChange = (languageCode: string) => {
    const newLanguage = languages.find(lang => lang.code === languageCode) || languages[0];
    setSelectedLanguage(newLanguage);
    setCurrentFlashcardIndex(0);
    setPronunciationScore(null);
  };

  useEffect(() => {
    const cards = getFlashcardsByLanguage(selectedLanguage.code);
    setFlashcards(cards);
  }, [selectedLanguage]);

  const handleRecordButtonClick = async () => {
    if (isRecording) {
      stopRecording(mediaRecorderRef.current, setIsRecording, handleAudioData);
    } else {
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

  const handleAudioData = async (audioBlob: Blob) => {
    if (!currentFlashcard) return;
    
    setIsProcessing(true);
    
    try {
      const score = await analyzePronunciation(
        audioBlob, 
        currentFlashcard.text,
        selectedLanguage.code
      );
      
      setPronunciationScore(score);
      
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

  const handleNextFlashcard = () => {
    if (currentFlashcardIndex < flashcards.length - 1) {
      setCurrentFlashcardIndex(currentFlashcardIndex + 1);
    } else {
      setCurrentFlashcardIndex(0);
    }
    
    setPronunciationScore(null);
    setIsRecording(false);
  };

  const handlePlayCorrectPronunciation = async () => {
    if (!currentFlashcard) return;
    
    try {
      const audioUrl = await getPronunciationAudio(
        currentFlashcard.text,
        selectedLanguage.code
      );
      
      toast({
        title: "Playing pronunciation...",
        description: "This is a demo. In a real app, the correct pronunciation would play.",
        variant: "default",
      });
      
      setTimeout(() => {
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

  const toggleTranslation = () => {
    setShowTranslation(!showTranslation);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 md:px-8 py-12">
      <div className="flex justify-center mb-12">
        <LanguageSelector 
          selectedLanguage={selectedLanguage}
          onLanguageChange={handleLanguageChange}
        />
      </div>
      
      {currentFlashcard && (
        <>
          <div className="mb-10">
            <FlashcardDisplay 
              flashcard={currentFlashcard}
              showTranslation={showTranslation}
            />
            
            <div className="flex justify-center mt-3">
              <Button
                variant="ghost"
                onClick={toggleTranslation}
                className="text-sm text-gray-400 hover:text-gray-200"
              >
                {showTranslation ? "Hide translation" : "Show translation"}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col items-center mb-10">
            <RecordButton
              isRecording={isRecording}
              isProcessing={isProcessing}
              onClick={handleRecordButtonClick}
              disabled={!currentFlashcard}
            />
            <p className="text-sm text-gray-400 mt-3">
              {isRecording ? "Stop recording" : "Click to speak"}
            </p>
          </div>
          
          <PronunciationFeedback
            score={pronunciationScore}
            onPlayCorrectPronunciation={handlePlayCorrectPronunciation}
            isLoading={isProcessing}
          />
          
          <div className="flex justify-center mt-12">
            <Button
              onClick={handleNextFlashcard}
              className="bg-gray-800 hover:bg-gray-700 transition-colors flex items-center gap-2 px-8 py-6 rounded-full text-md"
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
