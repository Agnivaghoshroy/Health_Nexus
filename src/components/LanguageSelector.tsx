import React from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Globe } from 'lucide-react';

type Language = 'en' | 'hi' | 'te' | 'bn';

interface LanguageSelectorProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
}

const languages = {
  en: { label: 'English', native: 'English' },
  hi: { label: 'Hindi', native: 'हिंदी' },
  te: { label: 'Telugu', native: 'తెలుగు' },
  bn: { label: 'Bengali', native: 'বাংলা' }
};

export function LanguageSelector({ language, onLanguageChange }: LanguageSelectorProps) {
  return (
    <div className="flex items-center space-x-2">
      <Globe className="w-4 h-4 text-gray-500" />
      <Select value={language} onValueChange={(value: Language) => onLanguageChange(value)}>
        <SelectTrigger className="w-32">
          <SelectValue>
            {languages[language].native}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {Object.entries(languages).map(([code, info]) => (
            <SelectItem key={code} value={code}>
              {info.native}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}