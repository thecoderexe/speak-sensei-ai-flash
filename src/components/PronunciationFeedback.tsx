
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Volume2 } from "lucide-react";
import RatingBar from "@/components/RatingBar";
import { PronunciationScore } from "@/types";

interface PronunciationFeedbackProps {
  score: PronunciationScore | null;
  onPlayCorrectPronunciation: () => void;
  isLoading: boolean;
}

const PronunciationFeedback: React.FC<PronunciationFeedbackProps> = ({
  score,
  onPlayCorrectPronunciation,
  isLoading,
}) => {
  if (!score && !isLoading) return null;

  return (
    <Card className="mt-8 p-6 bg-gray-900 border border-gray-800 shadow-md animate-slide-up">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-medium text-gray-100">Pronunciation Analysis</h3>
          <Button 
            variant="outline" 
            onClick={onPlayCorrectPronunciation}
            disabled={isLoading}
            className="flex items-center gap-2 text-gray-300 border-gray-700 hover:bg-gray-800 hover:text-white"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-6">
            <div className="w-8 h-8 border-4 border-gray-600 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : score ? (
          <div className="space-y-4 animate-fade-in">
            <RatingBar label="Pronunciation" score={score.pronunciation} />
            <RatingBar label="Nuance" score={score.nuance} />
            <RatingBar label="Naturalness" score={score.naturalness} />
            <RatingBar label="Confidence" score={score.confidence} />
            
            <div className="mt-8 pt-4 border-t border-gray-800">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-200">Overall Score</span>
                <span className={`text-2xl font-bold ${getScoreColor(score.overall)}`}>
                  {score.overall}/10
                </span>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </Card>
  );
};

const getScoreColor = (score: number): string => {
  if (score < 4) return "text-red-500";
  if (score < 7) return "text-amber-500";
  return "text-green-500";
};

export default PronunciationFeedback;
