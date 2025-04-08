
import React from "react";
import { Mic, MicOff, Loader2 } from "lucide-react";

interface RecordButtonProps {
  isRecording: boolean;
  isProcessing: boolean;
  onClick: () => void;
  disabled?: boolean;
}

const RecordButton: React.FC<RecordButtonProps> = ({
  isRecording,
  isProcessing,
  onClick,
  disabled = false,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isProcessing}
      className={`speak-button w-16 h-16 md:w-20 md:h-20 ${
        isRecording 
          ? "bg-speak-red animate-pulse-gentle" 
          : "bg-speak-red hover:bg-red-600"
      } ${disabled || isProcessing ? "opacity-70 cursor-not-allowed" : ""}`}
      aria-label={isRecording ? "Stop recording" : "Start recording"}
    >
      {isProcessing ? (
        <Loader2 className="w-8 h-8 animate-spin" />
      ) : isRecording ? (
        <MicOff className="w-8 h-8" />
      ) : (
        <Mic className="w-8 h-8" />
      )}
    </button>
  );
};

export default RecordButton;
