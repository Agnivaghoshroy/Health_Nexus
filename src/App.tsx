import React, { useState, useEffect } from 'react';
import { LandingPage } from './components/LandingPage';
import { ChatInterface } from './components/ChatInterface';
import { HealthEducation } from './components/HealthEducation';
import { VaccinationSchedule } from './components/VaccinationSchedule';
import { SymptomsChecker } from './components/SymptomsChecker';
import { AlertsPanel } from './components/AlertsPanel';
import { LanguageSelector } from './components/LanguageSelector';
import { MessageCircle, BookOpen, Calendar, Search, Bell, Menu, X, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './components/ui/button';
import { Card } from './components/ui/card';
import { ImageWithFallback } from './components/figma/ImageWithFallback';

type Language = 'en' | 'hi' | 'te' | 'bn';
type ActiveTab = 'chat' | 'education' | 'vaccination' | 'symptoms' | 'alerts';

const translations = {
  en: {
    title: 'Health Assistant',
    subtitle: 'Your trusted healthcare companion for rural communities',
    chat: 'Chat',
    education: 'Health Education',
    vaccination: 'Vaccination',
    symptoms: 'Symptoms',
    alerts: 'Alerts',
    menu: 'Menu'
  },
  hi: {
    title: 'स्वास्थ्य सहायक',
    subtitle: 'ग्रामीण समुदायों के लिए आपका विश्वसनीय स्वास्थ्य साथी',
    chat: 'चैट',
    education: 'स्वास्थ्य शिक्षा',
    vaccination: 'टीकाकरण',
    symptoms: 'लक्षण',
    alerts: 'अलर्ट',
    menu: 'मेनू'
  },
  te: {
    title: 'ఆరోగ్య సహాయకుడు',
    subtitle: 'గ్రామీణ సమాజాలకు మీ నమ్మకమైన ఆరోగ్య సహచరుడు',
    chat: 'చాట్',
    education: 'ఆరోగ్య విద్య',
    vaccination: 'టీకాలు',
    symptoms: 'లక్షణాలు',
    alerts: 'హెచ్చరికలు',
    menu: 'మెనూ'
  },
  bn: {
    title: 'স্বাস্থ্য সহায়ক',
    subtitle: 'গ্রামীণ সম্প্রদায়ের জন্য আপনার বিশ্বস্ত স্বাস্থ্য সহচর',
    chat: 'চ্যাট',
    education: 'স্বাস্থ্য শিক্ষা',
    vaccination: 'টিকাদান',
    symptoms: 'লক্ষণ',
    alerts: 'সতর্কতা',
    menu: 'মেনু'
  }
};

export default function App() {
  const [language, setLanguage] = useState<Language>('en');
  const [activeTab, setActiveTab] = useState<ActiveTab>('chat');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasNewAlerts, setHasNewAlerts] = useState(true);
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const t = translations[language];

  const navItems = [
    { id: 'chat' as ActiveTab, label: t.chat, icon: MessageCircle },
    { id: 'education' as ActiveTab, label: t.education, icon: BookOpen },
    { id: 'vaccination' as ActiveTab, label: t.vaccination, icon: Calendar },
    { id: 'symptoms' as ActiveTab, label: t.symptoms, icon: Search },
    { id: 'alerts' as ActiveTab, label: t.alerts, icon: Bell, hasNotification: hasNewAlerts }
  ];

  useEffect(() => {
    // Simulate periodic alert checks
    const interval = setInterval(() => {
      if (Math.random() > 0.8) {
        setHasNewAlerts(true);
      }
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const handleTabClick = (tab: ActiveTab) => {
    setActiveTab(tab);
    setIsMobileMenuOpen(false);
    if (tab === 'alerts') {
      setHasNewAlerts(false);
    }
  };

  const handleGetStarted = () => {
    setShowLandingPage(false);
  };

  const handleBackToLanding = () => {
    setShowLandingPage(true);
  };

  const renderActiveComponent = () => {
    switch (activeTab) {
      case 'chat':
        return <ChatInterface language={language} />;
      case 'education':
        return <HealthEducation language={language} />;
      case 'vaccination':
        return <VaccinationSchedule language={language} />;
      case 'symptoms':
        return <SymptomsChecker language={language} />;
      case 'alerts':
        return <AlertsPanel language={language} />;
      default:
        return <ChatInterface language={language} />;
    }
  };

  // Show landing page if user hasn't started the app yet
  if (showLandingPage) {
    return <LandingPage language={language} onLanguageChange={setLanguage} onGetStarted={handleGetStarted} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={handleBackToLanding}
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">Back</span>
              </Button>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">{t.title}</h1>
                  <p className="text-sm text-gray-600 hidden sm:block">{t.subtitle}</p>
                </div>
              </div>
            </div>

            <div className="hidden md:block">
              <LanguageSelector language={language} onLanguageChange={setLanguage} />
            </div>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Collapsible Sidebar Navigation */}
          <div className={`${isSidebarCollapsed ? 'lg:w-16' : 'lg:w-64'} ${isMobileMenuOpen ? 'block' : 'hidden lg:block'} transition-all duration-300 ease-in-out`}>
            <Card className="p-4 relative">
              {/* Sidebar Toggle Button */}
              <Button
                variant="ghost"
                size="sm"
                className="absolute -right-3 top-4 w-6 h-6 p-0 rounded-full border border-gray-200 bg-white shadow-sm hidden lg:flex items-center justify-center z-10"
                onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              >
                {isSidebarCollapsed ? (
                  <ChevronRight className="w-3 h-3" />
                ) : (
                  <ChevronLeft className="w-3 h-3" />
                )}
              </Button>

              <nav className="space-y-2">
                {navItems.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Button
                      key={item.id}
                      variant={activeTab === item.id ? 'default' : 'ghost'}
                      className={`w-full relative ${isSidebarCollapsed ? 'justify-center px-2' : 'justify-start'}`}
                      onClick={() => handleTabClick(item.id)}
                      title={isSidebarCollapsed ? item.label : undefined}
                    >
                      <Icon className={`w-4 h-4 ${isSidebarCollapsed ? '' : 'mr-3'}`} />
                      {!isSidebarCollapsed && item.label}
                      {item.hasNotification && (
                        <div className={`absolute w-2 h-2 bg-red-500 rounded-full ${isSidebarCollapsed ? 'top-1 right-1' : 'top-1 right-1'}`}></div>
                      )}
                    </Button>
                  );
                })}
              </nav>

              {!isSidebarCollapsed && (
                <div className="mt-6 lg:hidden">
                  <LanguageSelector language={language} onLanguageChange={setLanguage} />
                </div>
              )}
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderActiveComponent()}
          </div>
        </div>
      </div>

      {/* Hero Section for Chat Tab */}
      {activeTab === 'chat' && (
        <div className="bg-white border-t border-gray-200 mt-8">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl mb-4">Accessible Healthcare Information</h2>
                <p className="text-gray-600 mb-6">
                  Get instant answers to your health questions, learn about preventive care, 
                  and stay updated with vaccination schedules - all in your preferred language.
                </p>
                <div className="flex flex-wrap gap-4">
                  <div className="bg-blue-50 px-4 py-2 rounded-lg">
                    <span className="text-blue-700">24/7 Available</span>
                  </div>
                  <div className="bg-green-50 px-4 py-2 rounded-lg">
                    <span className="text-green-700">Multilingual Support</span>
                  </div>
                  <div className="bg-purple-50 px-4 py-2 rounded-lg">
                    <span className="text-purple-700">Trusted Information</span>
                  </div>
                </div>
              </div>
              <div className="relative">
                <ImageWithFallback
                  src="https://images.unsplash.com/photo-1589104759909-e355f8999f7e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoZWFsdGhjYXJlJTIwZG9jdG9yJTIwcnVyYWwlMjBjb21tdW5pdHl8ZW58MXx8fHwxNzU3MzQyNTIyfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="Healthcare in rural community"
                  className="rounded-lg shadow-lg w-full h-64 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}