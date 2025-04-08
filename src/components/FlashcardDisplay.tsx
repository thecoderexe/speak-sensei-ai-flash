
import React from "react";
import { Card } from "@/components/ui/card";
import { Flashcard } from "@/types";

interface FlashcardDisplayProps {
  flashcard: Flashcard;
  showTranslation: boolean;
}

const FlashcardDisplay: React.FC<FlashcardDisplayProps> = ({
  flashcard,
  showTranslation,
}) => {
  return (
    <Card className="flashcard animate-fade-in">
      <div className="text-center p-6 md:p-8">
        <h3 className="text-2xl md:text-4xl font-medium mb-6 text-gray-100">
          {flashcard.text}
        </h3>
        {showTranslation && flashcard.translation && (
          <p className="text-gray-400 text-base md:text-lg italic mt-4 animate-fade-in">
            {flashcard.translation}
          </p>
        )}
      </div>
    </Card>
  );
};

export default FlashcardDisplay;
