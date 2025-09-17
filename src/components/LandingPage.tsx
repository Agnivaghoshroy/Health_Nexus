import React, { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { LanguageSelector } from './LanguageSelector';
import { AuthDialog } from './AuthDialog';
import { MessageCircle, BookOpen, Calendar, Search, Bell, MessageSquare, ArrowRight, Shield, Globe, Clock, LogIn } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Language = 'en' | 'hi' | 'te' | 'bn';

interface LandingPageProps {
  language: Language;
  onLanguageChange: (language: Language) => void;
  onGetStarted: () => void;
}

const translations = {
  en: {
    title: 'Rural Health Assistant',
    subtitle: 'Empowering Rural Communities with AI-Powered Healthcare Support',
    description: 'Access trusted healthcare information, get personalized health guidance, and stay informed about preventive care - all in your preferred language.',
    getStarted: 'Get Started',
    contactWhatsApp: 'Contact on WhatsApp',
    login: 'Login / Sign Up',
    featuresTitle: 'Our Features',
    whyChoose: 'Why Choose Our Platform?',
    features: {
      chat: {
        title: 'AI Health Chat',
        description: 'Get instant answers to your health questions from our AI assistant. Available 24/7 in multiple languages with culturally appropriate responses for rural communities.'
      },
      education: {
        title: 'Health Education Hub',
        description: 'Access comprehensive health education materials covering preventive care, hygiene practices, nutrition, and common health conditions with easy-to-understand content.'
      },
      vaccination: {
        title: 'Vaccination Tracker',
        description: 'Keep track of vaccination schedules for your family, receive timely reminders, and get information about government vaccination programs and campaigns.'
      },
      symptoms: {
        title: 'Symptoms Checker',
        description: 'Assess your symptoms with our intelligent checker that provides severity ratings and guidance on when to seek medical attention from healthcare professionals.'
      },
      alerts: {
        title: 'Health Alerts System',
        description: 'Stay informed about disease outbreaks, health advisories, and emergency health information relevant to your region with real-time notifications.'
      }
    },
    benefits: {
      accessible: {
        title: '24/7 Accessibility',
        description: 'Always available healthcare guidance'
      },
      multilingual: {
        title: 'Multilingual Support',
        description: 'Available in English, Hindi, Telugu, and Bengali'
      },
      trusted: {
        title: 'Trusted Information',
        description: 'Reliable health information from verified sources'
      }
    }
  },
  hi: {
    title: 'ग्रामीण स्वास्थ्य सहायक',
    subtitle: 'AI-संचालित स्वास्थ्य सहायता के साथ ग्रामीण समुदायों को सशक्त बनाना',
    description: 'विश्वसनीय स्वास्थ्य जानकारी प्राप्त करें, व्यक्तिगत स्वास्थ्य मार्गदर्शन पाएं, और निवारक देखभाल के बारे में जानकारी रखें - सब कुछ आपकी पसंदीदा भाषा में।',
    getStarted: 'शुरू करें',
    contactWhatsApp: 'WhatsApp पर संपर्क करें',
    login: 'लॉगिन / साइन अप',
    featuresTitle: 'हमारी सुविधाएं',
    whyChoose: 'हमारे प्लेटफॉर्म को क्यों चुनें?',
    features: {
      chat: {
        title: 'AI स्वास्थ्य चैट',
        description: 'हमारे AI सहायक से अपने स्वास्थ्य प्रश्नों के तुरंत उत्तर पाएं। ग्रामीण समुदायों के लिए सांस्कृतिक रूप से उपयुक्त उत्तरों के साथ कई भाषाओं में 24/7 उपलब्ध।'
      },
      education: {
        title: 'स्वास्थ्य शिक्षा केंद्र',
        description: 'निवारक देखभाल, स्वच्छता प्रथाओं, पोषण, और सामान्य स्वास्थ्य स्थितियों को कवर करने वाली व्यापक स्वास्थ्य शिक्षा सामग्री तक पहुंच प्राप्त करें।'
      },
      vaccination: {
        title: 'टीकाकरण ट्रैकर',
        description: 'अपने परिवार के टीकाकरण कार्यक्रम का ट्रैक रखें, समय पर रिमाइंडर प्राप्त करें, और सरकारी टीकाकरण कार्यक्रमों की जानकारी पाएं।'
      },
      symptoms: {
        title: 'लक्षण जांचकर्ता',
        description: 'हमारे बुद्धिमान चेकर के साथ अपने लक्षणों का आकलन करें जो गंभीरता रेटिंग प्रदान करता है और मार्गदर्शन देता है कि कब चिकित्सा सहायता लेनी चाहिए।'
      },
      alerts: {
        title: 'स्वास्थ्य अलर्ट सिस्टम',
        description: 'रोग प्रकोप, स्वास्थ्य सलाह, और आपके क्षेत्र से संबंधित आपातकालीन स्वास्थ्य जानकारी के बारे में वास्तविक समय की सूचनाओं के साथ सूचित रहें।'
      }
    },
    benefits: {
      accessible: {
        title: '24/7 पहुंच',
        description: 'हमेशा उपलब्ध स्वास्थ्य मार्गदर्शन'
      },
      multilingual: {
        title: 'बहुभाषी सहायता',
        description: 'अंग्रेजी, हिंदी, तेलुगु और बंगाली में उपलब्ध'
      },
      trusted: {
        title: 'विश्वसनीय जानकारी',
        description: 'सत्यापित स्रोतों से विश्वसनीय स्वास्थ्य जानकारी'
      }
    }
  },
  te: {
    title: 'గ్రామీణ ఆరోగ్య సహాయకుడు',
    subtitle: 'AI-శక్తితో కూడిన ఆరోగ్య సహాయంతో గ్రామీణ సమాజాలను శక్తివంతం చేయడం',
    description: 'నమ్మకమైన ఆరోగ్య సమాచారాన్ని పొందండి, వ్యక్తిగతీకరించిన ఆరోగ్య మార్గదర్శకత్వం పొందండి, మరియు నివారణ సంరక్షణ గురించి తెలుసుకోండి - అన్నీ మీ ఇష్టమైన భాషలో.',
    getStarted: 'ప్రారంభించండి',
    contactWhatsApp: 'WhatsApp లో సంప్రదించండి',
    login: 'లాగిన్ / సైన్ అప్',
    featuresTitle: 'మా లక్షణాలు',
    whyChoose: 'మా ప్లాట్‌ఫారమ్‌ను ఎందుకు ఎంచుకోవాలి?',
    features: {
      chat: {
        title: 'AI ఆరోగ్య చాట్',
        description: 'మా AI సహాయకుడి నుండి మీ ఆరోగ్య ప్రశ్నలకు తక్షణ సమాధానాలు పొందండి. గ్రామీణ సమాజాలకు సాంస్కృతికంగా తగిన ప్రతిస్పందనలతో అనేక భాషల్లో 24/7 అందుబాటులో ఉంది.'
      },
      education: {
        title: 'ఆరోగ్య విద్య కేంద్రం',
        description: 'నివారణ సంరక్షణ, పరిశుభ్రత పద్ధతులు, పోషకాహారం మరియు సాధారణ ఆరోగ్య పరిస్థితులను కవర్ చేసే సమగ్ర ఆరోగ్య విద్య సामగ్రిని పొందండి.'
      },
      vaccination: {
        title: 'టీకా ట్రాకర్',
        description: 'మీ కుటుంబం యొక్క టీకా షెడ్యూల్‌లను ట్రాక్ చేసుకోండి, సకాలంలో రిమైండర్లు పొందండి, మరియు ప్రభుత్వ టీకా కార్యక్రమాల గురించి సమాచారం పొందండి.'
      },
      symptoms: {
        title: 'లక్షణాల తనిఖీదారు',
        description: 'తీవ్రత రేటింగ్‌లను అందించే మరియు వైద్య సహాయం ఎప్పుడు తీసుకోవాలో మార్గదర్శకత్వం ఇచ్చే మా తెలివైన చెకర్‌తో మీ లక్షణాలను అంచనా వేయండి.'
      },
      alerts: {
        title: 'ఆరోగ్య హెచ్చరికల వ్యవస్థ',
        description: 'వ్యాధి వ్యాప్తి, ఆరోగ్య సలహాలు మరియు మీ ప్రాంతానికి సంబంధించిన అత్యవసర ఆరోగ్య సమాచారం గురించి రియల్-టైమ్ నోటిఫికేషన్‌లతో తెలుసుకోండి.'
      }
    },
    benefits: {
      accessible: {
        title: '24/7 అందుబాటు',
        description: 'ఎల్లప్పుడూ అందుబాటులో ఉండే ఆరోగ్య మార్గదర్శకత్వం'
      },
      multilingual: {
        title: 'బహుభాషా మద్దతు',
        description: 'ఇంగ్లీష్, హిందీ, తెలుగు మరియు బెంగాలీలో అందుబాటులో ఉంది'
      },
      trusted: {
        title: 'నమ్మకమైన సమాచారం',
        description: 'ధృవీకరించబడిన మూలాల నుండి విశ్వసనీయ ఆరోగ్య సమాచారం'
      }
    }
  },
  bn: {
    title: 'গ্রামীণ স্বাস্থ্য সহায়ক',
    subtitle: 'AI-চালিত স্বাস্থ্যসেবা সহায়তার মাধ্যমে গ্রামীণ সম্প্রদায়ের ক্ষমতায়ন',
    description: 'বিশ্বস্ত স্বাস্থ্য তথ্য পান, ব্যক্তিগতকৃত স্বাস্থ্য গাইডেন্স নিন, এবং প্রতিরোধমূলক যত্ন সম্পর্কে অবগত থাকুন - সবকিছু আপনার পছন্দের ভাষায়।',
    getStarted: 'শুরু করুন',
    contactWhatsApp: 'WhatsApp এ যোগাযোগ করুন',
    login: 'লগইন / সাইন আপ',
    featuresTitle: 'আমাদের বৈশিষ্ট্য',
    whyChoose: 'কেন আমাদের প্ল্যাটফর্ম বেছে নেবেন?',
    features: {
      chat: {
        title: 'AI স্বাস্থ্য চ্যাট',
        description: 'আমাদের AI সহায়ক থেকে আপনার স্বাস্থ্য প্রশ্নের তাৎক্ষণিক উত্তর পান। গ্রামীণ সম্প্রদায়ের জন্য সাংস্কৃতিকভাবে উপযুক্ত প্রতিক্রিয়ার সাথে একাধিক ভাষায় ২৪/৭ উপলব্ধ।'
      },
      education: {
        title: 'স্বাস্থ্য শিক্ষা কেন্দ্র',
        description: 'প্রতিরোধমূলক যত্ন, স্বাস্থ্যবিধি অনুশীলন, পুষ্টি এবং সাধারণ স্বাস্থ্য অবস্থা কভার করে এমন বিস্তৃত স্বাস্থ্য শিক্ষা উপকরণ অ্যাক্সেস করুন।'
      },
      vaccination: {
        title: 'টিকাদান ট্র্যাকার',
        description: 'আপনার পরিবারের টিকাদানের সময়সূচী ট্র্যাক রাখুন, সময়মতো রিমাইন্ডার পান, এবং সরকারি টিকাদান কর্মসূচি সম্পর্কে তথ্য পান।'
      },
      symptoms: {
        title: 'লক্ষণ পরীক্ষক',
        description: 'আমাদের বুদ্ধিমান চেকারের সাথে আপনার লক্ষণগুলি মূল্যায়ন করুন যা তীব্রতার রেটিং প্রদান করে এবং কখন চিকিৎসা সহায়তা নিতে হবে সে বিষয়ে গাইডেন্স দেয়।'
      },
      alerts: {
        title: 'স্বাস্থ্য সতর্কতা সিস্টেম',
        description: 'রোগের প্রাদুর্ভাব, স্বাস্থ্য পরামর্শ এবং আপনার অঞ্চলের সাথে প্রাসঙ্গিক জরুরি স্বাস্থ্য তথ্য সম্পর্কে রিয়েল-টাইম বিজ্ঞপ্তির সাথে অবগত থাকুন।'
      }
    },
    benefits: {
      accessible: {
        title: '২৪/৭ অ্যাক্সেসযোগ্যতা',
        description: 'সর্বদা উপলব্ধ স্বাস্থ্য গাইডেন্স'
      },
      multilingual: {
        title: 'বহুভাষিক সহায়তা',
        description: 'ইংরেজি, হিন্দি, তেলুগু এবং বাংলায় উপলব্ধ'
      },
      trusted: {
        title: 'বিশ্বস্ত তথ্য',
        description: 'যাচাইকৃত উৎস থেকে নির্ভরযোগ্য স্বাস্থ্য তথ্য'
      }
    }
  }
};

export function LandingPage({ language, onLanguageChange, onGetStarted }: LandingPageProps) {
  const [isAuthDialogOpen, setIsAuthDialogOpen] = useState(false);
  const t = translations[language];

  const features = [
    {
      icon: MessageCircle,
      title: t.features.chat.title,
      description: t.features.chat.description,
      color: 'bg-blue-500'
    },
    {
      icon: BookOpen,
      title: t.features.education.title,
      description: t.features.education.description,
      color: 'bg-green-500'
    },
    {
      icon: Calendar,
      title: t.features.vaccination.title,
      description: t.features.vaccination.description,
      color: 'bg-purple-500'
    },
    {
      icon: Search,
      title: t.features.symptoms.title,
      description: t.features.symptoms.description,
      color: 'bg-orange-500'
    },
    {
      icon: Bell,
      title: t.features.alerts.title,
      description: t.features.alerts.description,
      color: 'bg-red-500'
    }
  ];

  const benefits = [
    {
      icon: Clock,
      title: t.benefits.accessible.title,
      description: t.benefits.accessible.description
    },
    {
      icon: Globe,
      title: t.benefits.multilingual.title,
      description: t.benefits.multilingual.description
    },
    {
      icon: Shield,
      title: t.benefits.trusted.title,
      description: t.benefits.trusted.description
    }
  ];

  const handleWhatsAppClick = () => {
    const phoneNumber = '+1234567890'; // Replace with actual WhatsApp number
    const message = 'Hello! I would like to know more about the Rural Health Assistant platform.';
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header with Language Selector */}
      <header className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl text-gray-900">{t.title}</span>
            </div>
            <div className="flex items-center space-x-4">
              <LanguageSelector language={language} onLanguageChange={onLanguageChange} />
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center space-x-2 border-blue-600 text-blue-600 hover:bg-blue-50"
                onClick={() => setIsAuthDialogOpen(true)}
              >
                <LogIn className="w-4 h-4" />
                <span>{t.login}</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="mb-6 text-gray-900">{t.title}</h1>
              <p className="mb-6 text-gray-600">{t.subtitle}</p>
              <p className="mb-8 text-gray-700">{t.description}</p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  onClick={onGetStarted}
                  size="lg"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3"
                >
                  {t.getStarted}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
                
                <Button 
                  onClick={handleWhatsAppClick}
                  variant="outline"
                  size="lg"
                  className="border-green-500 text-green-600 hover:bg-green-50 px-8 py-3"
                >
                  <MessageSquare className="mr-2 w-5 h-5" />
                  {t.contactWhatsApp}
                </Button>
                
                <Button
                  variant="outline"
                  size="lg"
                  className="sm:hidden border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3"
                  onClick={() => setIsAuthDialogOpen(true)}
                >
                  <LogIn className="mr-2 w-5 h-5" />
                  {t.login}
                </Button>
              </div>

              <div className="flex flex-wrap gap-4">
                {benefits.map((benefit, index) => {
                  const Icon = benefit.icon;
                  return (
                    <div key={index} className="bg-white px-4 py-3 rounded-lg shadow-sm border">
                      <div className="flex items-center space-x-2">
                        <Icon className="w-5 h-5 text-blue-600" />
                        <span className="text-sm text-gray-800">{benefit.title}</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            
            <div className="relative">
              {/* Enhanced image section with decorative elements */}
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 to-green-500/20 rounded-2xl transform rotate-3"></div>
                <div className="relative bg-white p-4 rounded-2xl shadow-2xl transform -rotate-1">
                  <ImageWithFallback
                    src="https://images.unsplash.com/photo-1659353885824-1199aeeebfc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxydXJhbCUyMGhlYWx0aGNhcmUlMjBkb2N0b3IlMjBjb21tdW5pdHklMjBtZWRpY2FsfGVufDF8fHx8MTc1NzUzMDM4NHww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                    alt="Rural healthcare professional serving community"
                    className="rounded-xl w-full h-80 object-cover"
                  />
                </div>
                {/* Floating elements */}
                <div className="absolute -top-4 -left-4 w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center shadow-lg">
                  <MessageCircle className="w-8 h-8 text-white" />
                </div>
                <div className="absolute -bottom-4 -right-4 w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
                  <Shield className="w-7 h-7 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-white relative overflow-hidden">
        
        <div className="max-w-7xl mx-auto relative">
          <div className="text-center mb-12">
            <div className="inline-flex items-center space-x-2 bg-blue-50 px-4 py-2 rounded-full mb-4">
              <Shield className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 text-sm font-medium">Trusted Healthcare Platform</span>
            </div>
            <h2 className="mb-4 text-gray-900">{t.featuresTitle}</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive healthcare support designed specifically for rural communities with easy-to-use features and multilingual support.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 shadow-md bg-white/80 backdrop-blur-sm">
                  <div className="flex items-start space-x-4">
                    <div className={`${feature.color} p-3 rounded-xl shadow-lg`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="mb-2 text-gray-900">{feature.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 sm:px-6 lg:px-8 py-16 bg-gradient-to-r from-blue-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="mb-4 text-white">Ready to Get Started?</h2>
          <p className="mb-8 text-blue-100 max-w-2xl mx-auto">
            Join thousands of users who trust our platform for their healthcare needs. Get instant access to AI-powered health assistance.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={onGetStarted}
              size="lg"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-3"
            >
              {t.getStarted}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button 
              onClick={handleWhatsAppClick}
              size="lg"
              className="bg-green-500 hover:bg-green-600 text-white border-0 px-8 py-3"
            >
              <MessageSquare className="mr-2 w-5 h-5" />
              {t.contactWhatsApp}
            </Button>
            
            <Button
              size="lg"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-3"
              onClick={() => setIsAuthDialogOpen(true)}
            >
              <LogIn className="mr-2 w-5 h-5" />
              {t.login}
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-4 sm:px-6 lg:px-8 py-8 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <MessageCircle className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl">{t.title}</span>
          </div>
          <p className="text-gray-400">
            Empowering rural communities with accessible healthcare information and AI-powered assistance.
          </p>
        </div>
      </footer>

      {/* Auth Dialog */}
      <AuthDialog
        isOpen={isAuthDialogOpen}
        onClose={() => setIsAuthDialogOpen(false)}
        language={language}
      />
    </div>
  );
}