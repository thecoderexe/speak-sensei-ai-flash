
import React from "react";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { languages } from "@/data/languages";
import { Language } from "@/types";

interface LanguageSelectorProps {
  selectedLanguage: Language;
  onLanguageChange: (languageCode: string) => void;
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({
  selectedLanguage,
  onLanguageChange,
}) => {
  return (
    <div>
      <Select
        value={selectedLanguage.code}
        onValueChange={onLanguageChange}
      >
        <SelectTrigger className="w-full md:w-[240px] border border-gray-800 bg-gray-900/80">
          <SelectValue placeholder="Select a language">
            <span>{selectedLanguage.name}</span>
          </SelectValue>
        </SelectTrigger>
        <SelectContent className="bg-gray-900 border border-gray-800">
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code} className="hover:bg-gray-800">
              <span>{language.name}</span>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
