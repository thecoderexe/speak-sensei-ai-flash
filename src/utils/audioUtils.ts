
// Audio recording and playback utilities

export const startRecording = async (setIsRecording: (state: boolean) => void): Promise<MediaRecorder | null> => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const mediaRecorder = new MediaRecorder(stream);
    
    setIsRecording(true);
    mediaRecorder.start();
    
    return mediaRecorder;
  } catch (error) {
    console.error("Error starting recording:", error);
    return null;
  }
};

export const stopRecording = (
  mediaRecorder: MediaRecorder | null,
  setIsRecording: (state: boolean) => void,
  onAudioData: (audioBlob: Blob) => void
): void => {
  if (!mediaRecorder) return;
  
  mediaRecorder.ondataavailable = (event) => {
    if (event.data.size > 0) {
      const audioBlob = event.data;
      onAudioData(audioBlob);
    }
  };
  
  mediaRecorder.stop();
  setIsRecording(false);
  
  // Stop all tracks from the stream
  mediaRecorder.stream.getTracks().forEach(track => track.stop());
};

export const playAudio = (audioUrl: string): void => {
  const audio = new Audio(audioUrl);
  audio.play().catch(error => console.error("Error playing audio:", error));
};
