
export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface PronunciationScore {
  nuance: number;
  pronunciation: number;
  naturalness: number;
  confidence: number;
  overall: number;
}

export interface Flashcard {
  id: string;
  text: string;
  translation?: string;
  audioUrl?: string;
}
