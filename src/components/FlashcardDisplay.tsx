
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
      <div className="text-center">
        <h3 className="text-2xl md:text-3xl font-semibold mb-4">
          {flashcard.text}
        </h3>
        {showTranslation && flashcard.translation && (
          <p className="text-gray-500 text-sm md:text-base italic mt-2">
            {flashcard.translation}
          </p>
        )}
      </div>
    </Card>
  );
};

export default FlashcardDisplay;
