
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
    <Card className="mt-8 p-6 bg-white animate-slide-up">
      <div className="flex flex-col">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Pronunciation Feedback</h3>
          <Button 
            variant="outline" 
            onClick={onPlayCorrectPronunciation}
            disabled={isLoading}
            className="flex items-center gap-2 text-speak-blue hover:text-speak-blue"
          >
            <Volume2 className="w-4 h-4" />
            <span>Listen</span>
          </Button>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center py-4">
            <div className="w-8 h-8 border-4 border-speak-blue border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : score ? (
          <div className="space-y-2">
            <RatingBar label="Pronunciation" score={score.pronunciation} />
            <RatingBar label="Nuance" score={score.nuance} />
            <RatingBar label="Naturalness" score={score.naturalness} />
            <RatingBar label="Confidence" score={score.confidence} />
            
            <div className="mt-6 pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold">Overall Score</span>
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
  if (score < 4) return "text-speak-red";
  if (score < 7) return "text-speak-yellow";
  return "text-speak-green";
};

export default PronunciationFeedback;
