
import { Flashcard } from "../types";

export const getFlashcardsByLanguage = (languageCode: string): Flashcard[] => {
  const flashcards = allFlashcards[languageCode] || allFlashcards["en"];
  return flashcards;
};

// Sample flashcards for each language
const allFlashcards: Record<string, Flashcard[]> = {
  en: [
    { id: "en-1", text: "Good morning! How are you today?", translation: "Good morning! How are you today?" },
    { id: "en-2", text: "I would like to order a coffee, please.", translation: "I would like to order a coffee, please." },
    { id: "en-3", text: "The weather is beautiful outside.", translation: "The weather is beautiful outside." },
    { id: "en-4", text: "Could you tell me where the restroom is?", translation: "Could you tell me where the restroom is?" },
    { id: "en-5", text: "I'm sorry, I don't understand.", translation: "I'm sorry, I don't understand." },
    { id: "en-6", text: "What time does the train leave?", translation: "What time does the train leave?" },
    { id: "en-7", text: "Do you have any recommendations for restaurants?", translation: "Do you have any recommendations for restaurants?" },
    { id: "en-8", text: "It was nice meeting you.", translation: "It was nice meeting you." },
  ],
  es: [
    { id: "es-1", text: "Buenos días! ¿Cómo estás hoy?", translation: "Good morning! How are you today?" },
    { id: "es-2", text: "Me gustaría pedir un café, por favor.", translation: "I would like to order a coffee, please." },
    { id: "es-3", text: "El clima está hermoso afuera.", translation: "The weather is beautiful outside." },
    { id: "es-4", text: "¿Podría decirme dónde está el baño?", translation: "Could you tell me where the restroom is?" },
    { id: "es-5", text: "Lo siento, no entiendo.", translation: "I'm sorry, I don't understand." },
    { id: "es-6", text: "¿A qué hora sale el tren?", translation: "What time does the train leave?" },
    { id: "es-7", text: "¿Tienes alguna recomendación para restaurantes?", translation: "Do you have any recommendations for restaurants?" },
    { id: "es-8", text: "Fue un placer conocerte.", translation: "It was nice meeting you." },
  ],
  fr: [
    { id: "fr-1", text: "Bonjour ! Comment allez-vous aujourd'hui ?", translation: "Good morning! How are you today?" },
    { id: "fr-2", text: "Je voudrais commander un café, s'il vous plaît.", translation: "I would like to order a coffee, please." },
    { id: "fr-3", text: "Il fait beau dehors.", translation: "The weather is beautiful outside." },
    { id: "fr-4", text: "Pourriez-vous me dire où sont les toilettes ?", translation: "Could you tell me where the restroom is?" },
    { id: "fr-5", text: "Je suis désolé, je ne comprends pas.", translation: "I'm sorry, I don't understand." },
    { id: "fr-6", text: "À quelle heure part le train ?", translation: "What time does the train leave?" },
    { id: "fr-7", text: "Avez-vous des recommandations pour les restaurants ?", translation: "Do you have any recommendations for restaurants?" },
    { id: "fr-8", text: "C'était un plaisir de vous rencontrer.", translation: "It was nice meeting you." },
  ],
  de: [
    { id: "de-1", text: "Guten Morgen! Wie geht es dir heute?", translation: "Good morning! How are you today?" },
    { id: "de-2", text: "Ich möchte gerne einen Kaffee bestellen, bitte.", translation: "I would like to order a coffee, please." },
    { id: "de-3", text: "Das Wetter ist schön draußen.", translation: "The weather is beautiful outside." },
    { id: "de-4", text: "Könnten Sie mir sagen, wo die Toilette ist?", translation: "Could you tell me where the restroom is?" },
    { id: "de-5", text: "Es tut mir leid, ich verstehe nicht.", translation: "I'm sorry, I don't understand." },
    { id: "de-6", text: "Wann fährt der Zug ab?", translation: "What time does the train leave?" },
    { id: "de-7", text: "Haben Sie Empfehlungen für Restaurants?", translation: "Do you have any recommendations for restaurants?" },
    { id: "de-8", text: "Es war schön, Sie kennenzulernen.", translation: "It was nice meeting you." },
  ],
};

// Add more languages as needed with similar structure
