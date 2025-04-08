
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
    <div className="mb-6">
      <Select
        value={selectedLanguage.code}
        onValueChange={onLanguageChange}
      >
        <SelectTrigger className="w-full md:w-[220px] bg-white">
          <SelectValue placeholder="Select a language">
            <div className="flex items-center">
              <span className="mr-2 text-xl">{selectedLanguage.flag}</span>
              <span>{selectedLanguage.name}</span>
            </div>
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center">
                <span className="mr-2 text-xl">{language.flag}</span>
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;
