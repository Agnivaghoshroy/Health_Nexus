import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { AlertTriangle, Search, Thermometer, Heart, Brain, Stethoscope } from 'lucide-react';

type Language = 'en' | 'hi' | 'te' | 'bn';

interface SymptomsCheckerProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Symptoms Checker',
    subtitle: 'Check your symptoms and get preliminary guidance',
    searchPlaceholder: 'Search symptoms...',
    selectSymptoms: 'Select your symptoms:',
    checkSymptoms: 'Check Symptoms',
    disclaimer: 'Disclaimer',
    disclaimerText: 'This tool provides general information only and is not a substitute for professional medical advice. Consult a healthcare provider for proper diagnosis and treatment.',
    emergencyWarning: '🚨 Seek immediate medical attention if you experience severe symptoms',
    categories: {
      general: 'General',
      respiratory: 'Respiratory',
      digestive: 'Digestive',
      neurological: 'Neurological'
    },
    severity: {
      mild: 'Mild',
      moderate: 'Moderate',
      severe: 'Severe'
    },
    recommendations: {
      mild: 'Monitor symptoms and rest. Drink plenty of fluids.',
      moderate: 'Consider consulting a healthcare provider if symptoms persist.',
      severe: 'Seek immediate medical attention.'
    }
  },
  hi: {
    title: 'लक्षण जांचकर्ता',
    subtitle: 'अपने लक्षणों की जांच करें और प्रारंभिक मार्गदर्शन प्राप्त करें',
    searchPlaceholder: 'लक्षण खोजें...',
    selectSymptoms: 'अपने लक्षण चुनें:',
    checkSymptoms: 'लक्षण जांचें',
    disclaimer: 'अस्वीकरण',
    disclaimerText: 'यह उपकरण केवल सामान्य जानकारी प्रदान करता है और पेशेवर चिकित्सा सलाह का विकल्प नहीं है। उचित निदान और उपचार के लिए स्वास्थ्य सेवा प्रदाता से सलाह लें।',
    emergencyWarning: '🚨 गंभीर लक्षण अनुभव करने पर तुरंत चिकित्सा सहायता लें',
    categories: {
      general: 'सामान्य',
      respiratory: 'श्वसन',
      digestive: 'पाचन',
      neurological: 'न्यूरोलॉजिकल'
    },
    severity: {
      mild: 'हल्का',
      moderate: 'मध्यम',
      severe: 'गंभीर'
    },
    recommendations: {
      mild: 'लक्षणों की निगरानी करें और आराम करें। भरपूर तरल पदार्थ पिएं।',
      moderate: 'यदि लक्षण बने रहें तो स्वास्थ्य सेवा प्रदाता से सलाह लेने पर विचार करें।',
      severe: 'तुरंत चिकित्सा सहायता लें।'
    }
  },
  te: {
    title: 'లక్షణాల తనిఖీ',
    subtitle: 'మీ లక్షణాలను తనిఖీ చేయండి మరియు ప్రాథమిక మార్గదర్శకత్వం పొందండి',
    searchPlaceholder: 'లక్షణాలను వెతకండి...',
    selectSymptoms: 'మీ లక్షణాలను ఎంచుకోండి:',
    checkSymptoms: 'లక్షణాలను తనిఖీ చేయండి',
    disclaimer: 'నిరాకరణ',
    disclaimerText: 'ఈ సాధనం సాధారణ సమాచారాన్ని మాత్రమే అందిస్తుంది మరియు వృత్తిపరమైన వైద్య సలహాకు ప్రత్యామ్నాయం కాదు। సరైన రోగనిర్ధారణ మరియు చికిత్స కోసం ఆరోగ్య సేవా ప్రదాతను సంప్రదించండి।',
    emergencyWarning: '🚨 తీవ్రమైన లక్షణాలను అనుభవిస్తే వెంటనే వైద్య సహాయం తీసుకోండి',
    categories: {
      general: 'సాధారణ',
      respiratory: 'శ్వాస',
      digestive: 'జీర్ణ',
      neurological: 'న్యూరోలాజికల్'
    },
    severity: {
      mild: 'తేలిక',
      moderate: 'మధ్యస్థ',
      severe: 'తీవ్రమైన'
    },
    recommendations: {
      mild: 'లక్షణాలను పర్యవేక్షించండి మరియు విశ్రాంతి తీసుకోండి। చాలా ద్రవాలు త్రాగండి।',
      moderate: 'లక్షణాలు కొనసాగితే ఆరోగ్య సేవా ప్రదాతను సంప్రదించడాన్ని పరిగణించండి।',
      severe: 'వెంటనే వైద్య సహాయం తీసుకోండి।'
    }
  },
  bn: {
    title: 'লক্ষণ পরীক্ষাকারী',
    subtitle: 'আপনার লক্ষণগুলি পরীক্ষা করুন এবং প্রাথমিক নির্দেশনা পান',
    searchPlaceholder: 'লক্ষণ অনুসন্ধান করুন...',
    selectSymptoms: 'আপনার লক্ষণগুলি নির্বাচন করুন:',
    checkSymptoms: 'লক্ষণ পরীক্ষা করুন',
    disclaimer: 'দাবিত্যাগ',
    disclaimerText: 'এই টুলটি শুধুমাত্র সাধারণ তথ্য প্রদান করে এবং পেশাদার চিকিৎসা পরামর্শের বিকল্প নয়। সঠিক নির্ণয় এবং চিকিৎসার জন্য একজন স্বাস্থ্যসেবা প্রদানকারীর সাথে পরামর্শ করুন।',
    emergencyWarning: '🚨 গুরুতর লক্ষণ অনুভব করলে তাৎক্ষণিক চিকিৎসা সহায়তা নিন',
    categories: {
      general: 'সাধারণ',
      respiratory: 'শ্বাসযন্ত্র',
      digestive: 'পাচনতন্ত্র',
      neurological: 'স্নায়বিক'
    },
    severity: {
      mild: 'মৃদু',
      moderate: 'মাঝারি',
      severe: 'গুরুতর'
    },
    recommendations: {
      mild: 'লক্ষণগুলি পর্যবেক্ষণ করুন এবং বিশ্রাম নিন। প্রচুর পরিমাণে তরল পান করুন।',
      moderate: 'লক্ষণগুলি অব্যাহত থাকলে একজন স্বাস্থ্যসেবা প্রদানকারীর সাথে পরামর্শ করার কথা বিবেচনা করুন।',
      severe: 'তাৎক্ষণিক চিকিৎসা সহায়তা নিন।'
    }
  }
};

const symptomsData = {
  general: [
    { name: 'Fever', severity: 'moderate', category: 'general' },
    { name: 'Fatigue', severity: 'mild', category: 'general' },
    { name: 'Body aches', severity: 'mild', category: 'general' },
    { name: 'Chills', severity: 'moderate', category: 'general' },
    { name: 'Loss of appetite', severity: 'mild', category: 'general' }
  ],
  respiratory: [
    { name: 'Cough', severity: 'mild', category: 'respiratory' },
    { name: 'Shortness of breath', severity: 'severe', category: 'respiratory' },
    { name: 'Chest pain', severity: 'severe', category: 'respiratory' },
    { name: 'Sore throat', severity: 'mild', category: 'respiratory' },
    { name: 'Runny nose', severity: 'mild', category: 'respiratory' }
  ],
  digestive: [
    { name: 'Nausea', severity: 'mild', category: 'digestive' },
    { name: 'Vomiting', severity: 'moderate', category: 'digestive' },
    { name: 'Diarrhea', severity: 'moderate', category: 'digestive' },
    { name: 'Stomach pain', severity: 'moderate', category: 'digestive' },
    { name: 'Loss of taste', severity: 'mild', category: 'digestive' }
  ],
  neurological: [
    { name: 'Headache', severity: 'mild', category: 'neurological' },
    { name: 'Dizziness', severity: 'moderate', category: 'neurological' },
    { name: 'Confusion', severity: 'severe', category: 'neurological' },
    { name: 'Seizures', severity: 'severe', category: 'neurological' },
    { name: 'Memory problems', severity: 'moderate', category: 'neurological' }
  ]
};

const categoryIcons = {
  general: Thermometer,
  respiratory: Stethoscope,
  digestive: Heart,
  neurological: Brain
};

const severityColors = {
  mild: 'bg-green-100 text-green-700',
  moderate: 'bg-yellow-100 text-yellow-700',
  severe: 'bg-red-100 text-red-700'
};

export function SymptomsChecker({ language }: SymptomsCheckerProps) {
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const t = translations[language] || translations.en;

  const allSymptoms = Object.values(symptomsData).flat();
  
  const filteredSymptoms = allSymptoms.filter(symptom => {
    const matchesSearch = symptom.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || symptom.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSymptomToggle = (symptomName: string) => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomName)
        ? prev.filter(s => s !== symptomName)
        : [...prev, symptomName]
    );
  };

  const analyzeSymptoms = () => {
    setShowResults(true);
  };

  const getOverallSeverity = () => {
    if (selectedSymptoms.length === 0) return 'mild';
    
    const selectedSymptomObjects = allSymptoms.filter(s => selectedSymptoms.includes(s.name));
    const severities = selectedSymptomObjects.map(s => s.severity);
    
    if (severities.includes('severe')) return 'severe';
    if (severities.includes('moderate')) return 'moderate';
    return 'mild';
  };

  const getPossibleConditions = () => {
    if (selectedSymptoms.length === 0) return [];
    
    // Simple pattern matching for common conditions
    const symptoms = selectedSymptoms.map(s => s.toLowerCase());
    const conditions = [];
    
    if (symptoms.includes('fever') && symptoms.includes('cough')) {
      conditions.push('Common cold or flu');
    }
    if (symptoms.includes('fever') && symptoms.includes('body aches')) {
      conditions.push('Viral infection');
    }
    if (symptoms.includes('nausea') && symptoms.includes('vomiting')) {
      conditions.push('Gastroenteritis');
    }
    if (symptoms.includes('headache') && symptoms.includes('fever')) {
      conditions.push('Viral illness');
    }
    
    return conditions.length > 0 ? conditions : ['General illness - consult healthcare provider'];
  };

  if (showResults) {
    const severity = getOverallSeverity();
    const conditions = getPossibleConditions();
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl">Symptom Analysis Results</h1>
          <Button variant="outline" onClick={() => setShowResults(false)}>
            ← Back to Checker
          </Button>
        </div>

        <Card className={`border-2 ${severity === 'severe' ? 'border-red-300 bg-red-50' : severity === 'moderate' ? 'border-yellow-300 bg-yellow-50' : 'border-green-300 bg-green-50'}`}>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Assessment Results</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Selected symptoms:</p>
                <div className="flex flex-wrap gap-2">
                  {selectedSymptoms.map(symptom => (
                    <Badge key={symptom} variant="secondary">{symptom}</Badge>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Severity level:</p>
                <Badge className={severityColors[severity as keyof typeof severityColors]}>
                  {t.severity[severity as keyof typeof t.severity]}
                </Badge>
              </div>

              <div>
                <p className="text-sm text-gray-600 mb-2">Possible conditions:</p>
                <ul className="list-disc list-inside space-y-1">
                  {conditions.map((condition, index) => (
                    <li key={index} className="text-sm">{condition}</li>
                  ))}
                </ul>
              </div>

              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="mb-2">Recommendation:</h4>
                <p className="text-sm">{t.recommendations[severity as keyof typeof t.recommendations]}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-orange-300 bg-orange-50">
          <CardContent className="p-4">
            <div className="flex items-start space-x-3">
              <AlertTriangle className="w-5 h-5 text-orange-600 mt-0.5" />
              <div>
                <h4 className="text-orange-800 mb-1">{t.disclaimer}</h4>
                <p className="text-sm text-orange-700">{t.disclaimerText}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Emergency Warning */}
      <Card className="border-red-300 bg-red-50">
        <CardContent className="p-4">
          <p className="text-red-800 text-sm text-center">{t.emergencyWarning}</p>
        </CardContent>
      </Card>

      {/* Search */}
      <div className="max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <Input
            placeholder={t.searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All Categories
        </Button>
        {Object.entries(t.categories).map(([key, label]) => {
          const Icon = categoryIcons[key as keyof typeof categoryIcons];
          return (
            <Button
              key={key}
              variant={selectedCategory === key ? "default" : "outline"}
              onClick={() => setSelectedCategory(key)}
              className="flex items-center space-x-2"
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Button>
          );
        })}
      </div>

      {/* Symptoms Selection */}
      <Card>
        <CardHeader>
          <CardTitle>{t.selectSymptoms}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSymptoms.map((symptom) => (
              <div
                key={symptom.name}
                className="flex items-center space-x-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer"
                onClick={() => handleSymptomToggle(symptom.name)}
              >
                <Checkbox
                  checked={selectedSymptoms.includes(symptom.name)}
                  onChange={() => handleSymptomToggle(symptom.name)}
                />
                <div className="flex-1">
                  <p className="text-sm">{symptom.name}</p>
                  <Badge 
                    size="sm" 
                    className={severityColors[symptom.severity as keyof typeof severityColors]}
                  >
                    {t.severity[symptom.severity as keyof typeof t.severity]}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          {filteredSymptoms.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              No symptoms found. Try adjusting your search or category filter.
            </div>
          )}
        </CardContent>
      </Card>

      {/* Selected Symptoms Summary */}
      {selectedSymptoms.length > 0 && (
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Selected symptoms ({selectedSymptoms.length}):</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {selectedSymptoms.map(symptom => (
                    <Badge key={symptom} variant="secondary">{symptom}</Badge>
                  ))}
                </div>
              </div>
              <Button onClick={analyzeSymptoms}>
                {t.checkSymptoms}
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Disclaimer */}
      <Card className="bg-gray-50">
        <CardContent className="p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="w-5 h-5 text-gray-600 mt-0.5" />
            <div>
              <h4 className="text-gray-800 mb-1">{t.disclaimer}</h4>
              <p className="text-sm text-gray-600">{t.disclaimerText}</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}