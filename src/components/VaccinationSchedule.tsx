// more update after mock
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Calendar, Clock, User, Baby, Users, CheckCircle, AlertCircle } from 'lucide-react';
import type { VaccinationSchedule as APIVax } from '../services/api';
import { fetchVaccinationSchedules, createReminder } from '../services/api';

type Language = 'en' | 'hi' | 'te' | 'bn';

interface VaccinationScheduleProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Vaccination Schedule',
    subtitle: 'Stay up-to-date with recommended vaccinations',
    ageGroups: {
      infant: 'Infants (0-2 years)',
      child: 'Children (2-18 years)',
      adult: 'Adults (18+ years)',
      senior: 'Seniors (60+ years)'
    },
    status: {
      due: 'Due',
      upcoming: 'Upcoming',
      completed: 'Completed',
      overdue: 'Overdue'
    },
    addReminder: 'Set Reminder',
    viewDetails: 'View Details',
    searchPlaceholder: 'Search vaccines...',
    nextDue: 'Next Due',
    vaccineCenter: 'Find Vaccination Center'
  },
  hi: {
    title: 'टीकाकरण कार्यक्रम',
    subtitle: 'अनुशंसित टीकाकरण के साथ अद्यतन रहें',
    ageGroups: {
      infant: 'शिशु (0-2 वर्ष)',
      child: 'बच्चे (2-18 वर्ष)',
      adult: 'वयस्क (18+ वर्ष)',
      senior: 'वरिष्ठ (60+ वर्ष)'
    },
    status: {
      due: 'देय',
      upcoming: 'आगामी',
      completed: 'पूर्ण',
      overdue: 'समय से बाहर'
    },
    addReminder: 'अनुस्मारक सेट करें',
    viewDetails: 'विवरण देखें',
    searchPlaceholder: 'टीके खोजें...',
    nextDue: 'अगली नियत तारीख',
    vaccineCenter: 'टीकाकरण केंद्र खोजें'
  },
  te: {
    title: 'టీకాల షెడ్యూల్',
    subtitle: 'సిఫార్సు చేయబడిన టీకాలతో అప్‌టు డేట్‌గా ఉండండి',
    ageGroups: {
      infant: 'శిశువులు (0-2 సంవత్సరాలు)',
      child: 'పిల్లలు (2-18 సంవత్సరాలు)',
      adult: 'పెద్దలు (18+ సంవత్సరాలు)',
      senior: 'వృద్ధులు (60+ సంవత్సరాలు)'
    },
    status: {
      due: 'రావాల్సిన',
      upcoming: 'రాబోయే',
      completed: 'పూర్తైన',
      overdue: 'వదులబడింది'
    },
    addReminder: 'రిమైండర్ సెట్ చేయండి',
    viewDetails: 'వివరాలు చూడండి',
    searchPlaceholder: 'టీకాలను వెతకండి...',
    nextDue: 'తదుపరి రావాల్సిన తేదీ',
    vaccineCenter: 'టీకా కేంద్రాన్ని కనుగొనండి'
  },
  bn: {
    title: 'টিকাদানের সূচী',
    subtitle: 'সুপারিশকৃত টিকাদানের সাথে আপডেট থাকুন',
    ageGroups: {
      infant: 'শিশু (০-২ বছর)',
      child: 'শিশুরা (২-১৮ বছর)',
      adult: 'প্রাপ্তবয়স্ক (১৮+ বছর)',
      senior: 'বয়স্ক (৬০+ বছর)'
    },
    status: {
      due: 'নির্ধারিত',
      upcoming: 'আসন্ন',
      completed: 'সম্পন্ন',
      overdue: 'বিসর্জিত'
    },
    addReminder: 'রিমাইন্ডার সেট করুন',
    viewDetails: 'বিস্তারিত দেখুন',
    searchPlaceholder: 'টিকা খুঁজুন...',
    nextDue: 'পরবর্তী নির্ধারিত তারিখ',
    vaccineCenter: 'টিকাদান কেন্দ্র খুঁজুন'
  }
};

// Status colors
const statusColors: Record<string, string> = {
  due: 'bg-red-100 text-red-700 border-red-200',
  upcoming: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  completed: 'bg-green-100 text-green-700 border-green-200',
  overdue: 'bg-red-200 text-red-800 border-red-300',
  pending: 'bg-indigo-100 text-indigo-700 border-indigo-200'
};

const statusIcons: Record<string, any> = {
  due: AlertCircle,
  upcoming: Clock,
  completed: CheckCircle,
  overdue: AlertCircle,
  pending: Clock
};

// normalize API status to UI keys
function normalizeStatus(apiStatus: string | undefined) {
  if (!apiStatus) return 'upcoming';
  const s = apiStatus.toLowerCase();
  if (s === 'completed') return 'completed';
  if (s === 'due') return 'due';
  if (s === 'overdue') return 'overdue';
  if (s === 'pending') return 'pending';
  if (s === 'upcoming') return 'upcoming';
  // fallback for other uppercase variants like 'DUE' etc.
  if (apiStatus === 'DUE' || apiStatus === 'due') return 'due';
  if (apiStatus === 'COMPLETED' || apiStatus === 'completed') return 'completed';
  if (apiStatus === 'OVERDUE' || apiStatus === 'overdue') return 'overdue';
  return 'upcoming';
}

export function VaccinationSchedule({ language }: VaccinationScheduleProps) {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<string>('infant');
  const [searchTerm, setSearchTerm] = useState('');
  const [vaccines, setVaccines] = useState<Record<string, APIVax[]>>({});
  const [loading, setLoading] = useState(true);
  const [reminderLoading, setReminderLoading] = useState<Record<string, boolean>>({});

  const t = translations[language] || translations.en;

  useEffect(() => {
    const loadVaccines = async () => {
      try {
        setLoading(true);
        const data = await fetchVaccinationSchedules();
        setVaccines(data);
      } catch (error) {
        console.error('Error fetching vaccination schedules:', error);
      } finally {
        setLoading(false);
      }
    };
    loadVaccines();
  }, []);

  const filteredVaccines = (vaccines[selectedAgeGroup] || []).filter(item =>
    item.vaccine.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (item.notes || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getDueSoonCount = () => {
    return Object.values(vaccines).flat().filter(v => {
      const s = normalizeStatus(v.status);
      return s === 'due' || s === 'overdue' || s === 'pending';
    }).length;
  };

  const handleSetReminder = async (vaccine: APIVax) => {
    const id = vaccine.id;
    try {
      // show loader for this specific item
      setReminderLoading(prev => ({ ...prev, [id]: true }));

      // get user id from localStorage if available; fallback to '1'
      const storedUserId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;
      const userId = storedUserId ?? '1';

      const payload = {
        scheduleId: vaccine.id,
        vaccine: vaccine.vaccine,
        date: vaccine.dueDate || new Date().toISOString().split('T')[0],
        notes: `Reminder for ${vaccine.vaccine}`,
        user_id: userId
      };

      const res = await createReminder(payload);

      // Update UI: mark this vaccine as 'pending' (reminder scheduled)
      setVaccines(prev => {
        const next: Record<string, APIVax[]> = {};
        for (const [group, arr] of Object.entries(prev)) {
          next[group] = arr.map(it => (it.id === vaccine.id ? { ...it, status: 'pending' } : it));
        }
        return next;
      });

      // Optionally, show server response id/status
      if (res && (res.id || res.status)) {
        alert('Reminder set successfully!');
      } else {
        alert('Reminder set (no server id returned).');
      }
    } catch (error) {
      console.error('Error setting reminder:', error);
      alert('Failed to set reminder.');
    } finally {
      setReminderLoading(prev => ({ ...prev, [id]: false }));
    }
  };

  if (loading) {
    return <p>Loading vaccination schedules...</p>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Summary Cards */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertCircle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.status.due}</p>
                <p className="text-2xl">{getDueSoonCount()}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Calendar className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">{t.nextDue}</p>
                <p className="text-lg">{Object.values(vaccines).flat().find(v => v.dueDate)?.dueDate ? new Date(Object.values(vaccines).flat().find(v => v.dueDate)!.dueDate!).toLocaleDateString() : 'N/A'}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <Button className="w-full">
              <User className="w-4 h-4 mr-2" />
              {t.vaccineCenter}
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Search */}
      <div className="max-w-md">
        <Input
          placeholder={t.searchPlaceholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
      </div>

      {/* Age Group Tabs */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(t.ageGroups).map(([key, label]) => {
          const icons = {
            infant: Baby,
            child: User,
            adult: Users,
            senior: Users
          };
          const Icon = icons[key as keyof typeof icons];

          return (
            <Button
              key={key}
              variant={selectedAgeGroup === key ? "default" : "outline"}
              onClick={() => setSelectedAgeGroup(key)}
              className="flex items-center space-x-2"
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </Button>
          );
        })}
      </div>

      {/* Vaccines List */}
      <div className="grid gap-4">
        {filteredVaccines.map((vaccine, index) => {
          const uiStatus = normalizeStatus(vaccine.status);
          const StatusIcon = statusIcons[uiStatus];
          const statusClass = statusColors[uiStatus];

          return (
            <Card key={vaccine.id || index} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-lg">{vaccine.vaccine}</h3>
                      <Badge className={statusClass}>
                        <StatusIcon className="w-3 h-3 mr-1" />
                        {t.status[uiStatus as keyof typeof t.status] || uiStatus}
                      </Badge>
                    </div>

                    <p className="text-gray-600 text-sm mb-2">{vaccine.notes || 'No description available'}</p>

                    <div className="flex items-center space-x-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-4 h-4" />
                        <span>{vaccine.age || '—'}</span>
                      </div>
                      {vaccine.dueDate && (
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>Due: {new Date(vaccine.dueDate).toLocaleDateString()}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2 ml-4">
                    <Button variant="outline" size="sm">
                      {t.viewDetails}
                    </Button>
                    {uiStatus !== 'completed' && (
                      <Button size="sm" onClick={() => handleSetReminder(vaccine)} disabled={!!reminderLoading[vaccine.id]}>
                        {reminderLoading[vaccine.id] ? 'Setting...' : t.addReminder}
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {filteredVaccines.length === 0 && (
        <Card>
          <CardContent className="p-8 text-center">
            <Calendar className="w-12 h-12 mx-auto text-gray-400 mb-4" />
            <h3 className="text-lg text-gray-600 mb-2">No vaccines found</h3>
            <p className="text-gray-500">Try adjusting your search or age group selection.</p>
          </CardContent>
        </Card>
      )}

      {/* Information Banner */}
      <Card className="bg-blue-50 border-blue-200">
        <CardContent className="p-6">
          <div className="flex items-start space-x-4">
            <div className="p-2 bg-blue-100 rounded-lg">
              <AlertCircle className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h3 className="mb-2">Important Reminder</h3>
              <p className="text-gray-700 text-sm">
                Vaccination schedules may vary based on individual health conditions. 
                Always consult with your healthcare provider for personalized vaccination advice. 
                This information is for educational purposes only.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}