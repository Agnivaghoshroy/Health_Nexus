import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { LogIn, UserPlus, Eye, EyeOff, Mail, Lock, User } from 'lucide-react';

type Language = 'en' | 'hi' | 'te' | 'bn';
type AuthMode = 'login' | 'signup';

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  language: Language;
}

const translations = {
  en: {
    login: 'Sign In',
    signup: 'Sign Up',
    email: 'Email Address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    username: 'Username',
    loginButton: 'Sign In',
    signupButton: 'Create Account',
    noAccount: "Don't have an account?",
    hasAccount: "Already have an account?",
    signUpLink: 'Sign up',
    signInLink: 'Sign in',
    emailPlaceholder: 'Enter your email',
    passwordPlaceholder: 'Enter your password',
    confirmPasswordPlaceholder: 'Confirm your password',
    usernamePlaceholder: 'Enter your username',
    welcomeBack: 'Welcome back!',
    welcomeNew: 'Create your account',
    loginSubtitle: 'Sign in to access your health dashboard',
    signupSubtitle: 'Join our health community today'
  },
  hi: {
    login: 'साइन इन',
    signup: 'साइन अप',
    email: 'ईमेल पता',
    password: 'पासवर्ड',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    username: 'उपयोगकर्ता नाम',
    loginButton: 'साइन इन',
    signupButton: 'खाता बनाएं',
    noAccount: 'कोई खाता नहीं है?',
    hasAccount: 'पहले से खाता है?',
    signUpLink: 'साइन अप',
    signInLink: 'साइन इन',
    emailPlaceholder: 'अपना ईमेल दर्ज करें',
    passwordPlaceholder: 'अपना पासवर्ड दर्ज करें',
    confirmPasswordPlaceholder: 'अपने पासवर्ड की पुष्टि करें',
    usernamePlaceholder: 'अपना उपयोगकर्ता नाम दर्ज करें',
    welcomeBack: 'वापस स्वागत है!',
    welcomeNew: 'अपना खाता बनाएं',
    loginSubtitle: 'अपने स्वास्थ्य डैशबोर्ड तक पहुंचने के लिए साइन इन करें',
    signupSubtitle: 'आज ही हमारे स्वास्थ्य समुदाय में शामिल हों'
  },
  te: {
    login: 'సైన్ ఇన్',
    signup: 'సైన్ అప్',
    email: 'ఇమెయిల్ చిరునామా',
    password: 'పాస్‌వర్డ్',
    confirmPassword: 'పాస్‌వర్డ్ నిర్ధారించండి',
    username: 'వినియోగదారు పేరు',
    loginButton: 'సైన్ ఇన్',
    signupButton: 'ఖాతా సృష్టించండి',
    noAccount: 'ఖాతా లేదా?',
    hasAccount: 'ఇప్పటికే ఖాతా ఉందా?',
    signUpLink: 'సైన్ అప్',
    signInLink: 'సైన్ ఇన్',
    emailPlaceholder: 'మీ ఇమెయిల్ నమోదు చేయండి',
    passwordPlaceholder: 'మీ పాస్‌వర్డ్ నమోదు చేయండి',
    confirmPasswordPlaceholder: 'మీ పాస్‌వర్డ్ నిర్ధారించండి',
    usernamePlaceholder: 'మీ వినియోగదారు పేరు నమోదు చేయండి',
    welcomeBack: 'తిరిగి స్వాగతం!',
    welcomeNew: 'మీ ఖాతాను సృష్టించండి',
    loginSubtitle: 'మీ ఆరోగ్య డాష్‌బోర్డ్‌ను యాక్సెస్ చేయడానికి సైన్ ఇన్ చేయండి',
    signupSubtitle: 'ఈరోజే మా ఆరోగ్య సమాజంలో చేరండి'
  },
  bn: {
    login: 'সাইন ইন',
    signup: 'সাইন আপ',
    email: 'ইমেইল ঠিকানা',
    password: 'পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    username: 'ব্যবহারকারীর নাম',
    loginButton: 'সাইন ইন',
    signupButton: 'অ্যাকাউন্ট তৈরি করুন',
    noAccount: 'কোনো অ্যাকাউন্ট নেই?',
    hasAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    signUpLink: 'সাইন আপ',
    signInLink: 'সাইন ইন',
    emailPlaceholder: 'আপনার ইমেইল লিখুন',
    passwordPlaceholder: 'আপনার পাসওয়ার্ড লিখুন',
    confirmPasswordPlaceholder: 'আপনার পাসওয়ার্ড নিশ্চিত করুন',
    usernamePlaceholder: 'আপনার ব্যবহারকারীর নাম লিখুন',
    welcomeBack: 'আবার স্বাগতম!',
    welcomeNew: 'আপনার অ্যাকাউন্ট তৈরি করুন',
    loginSubtitle: 'আপনার স্বাস্থ্য ড্যাশবোর্ড অ্যাক্সেস করতে সাইন ইন করুন',
    signupSubtitle: 'আজই আমাদের স্বাস্থ্য সম্প্রদায়ে যোগ দিন'
  }
};

export function AuthDialog({ isOpen, onClose, language }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    username: ''
  });

  const t = translations[language];

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (mode === 'signup') {
      if (formData.password !== formData.confirmPassword) {
        alert('Passwords do not match!');
        return;
      }
      if (!formData.username.trim()) {
        alert('Username is required!');
        return;
      }
    }

    if (!formData.email.trim() || !formData.password.trim()) {
      alert('Email and password are required!');
      return;
    }

    // Here you would integrate with your authentication service
    console.log('Auth submission:', { mode, ...formData });
    alert(`${mode === 'login' ? 'Login' : 'Signup'} successful!`);
    onClose();
  };

  const toggleMode = () => {
    setMode(prev => prev === 'login' ? 'signup' : 'login');
    setFormData({ email: '', password: '', confirmPassword: '', username: '' });
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-3">
            {mode === 'login' ? (
              <LogIn className="w-6 h-6 text-blue-600" />
            ) : (
              <UserPlus className="w-6 h-6 text-green-600" />
            )}
            <div>
              <h2 className="text-xl">
                {mode === 'login' ? t.welcomeBack : t.welcomeNew}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {mode === 'login' ? t.loginSubtitle : t.signupSubtitle}
              </p>
            </div>
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="username" className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{t.username}</span>
              </Label>
              <Input
                id="username"
                type="text"
                placeholder={t.usernamePlaceholder}
                value={formData.username}
                onChange={(e) => handleInputChange('username', e.target.value)}
                required
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="email" className="flex items-center space-x-2">
              <Mail className="w-4 h-4" />
              <span>{t.email}</span>
            </Label>
            <Input
              id="email"
              type="email"
              placeholder={t.emailPlaceholder}
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password" className="flex items-center space-x-2">
              <Lock className="w-4 h-4" />
              <span>{t.password}</span>
            </Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder={t.passwordPlaceholder}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                required
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {mode === 'signup' && (
            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="flex items-center space-x-2">
                <Lock className="w-4 h-4" />
                <span>{t.confirmPassword}</span>
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder={t.confirmPasswordPlaceholder}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-2 top-1/2 -translate-y-1/2 h-auto p-1"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          )}

          <Button
            type="submit"
            className={`w-full ${mode === 'login' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-green-600 hover:bg-green-700'}`}
          >
            {mode === 'login' ? t.loginButton : t.signupButton}
          </Button>
        </form>

        <div className="text-center pt-4 border-t">
          <p className="text-sm text-gray-600">
            {mode === 'login' ? t.noAccount : t.hasAccount}{' '}
            <Button
              variant="link"
              className={`p-0 h-auto ${mode === 'login' ? 'text-green-600 hover:text-green-700' : 'text-blue-600 hover:text-blue-700'}`}
              onClick={toggleMode}
            >
              {mode === 'login' ? t.signUpLink : t.signInLink}
            </Button>
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}