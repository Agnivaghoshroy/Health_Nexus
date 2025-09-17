// import React, { useState, useEffect } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { AlertTriangle, Bell, MapPin, Clock, Shield, Zap, Info, Map } from 'lucide-react';

// type Language = 'en' | 'hi' | 'te' | 'bn';

// interface AlertsPanelProps {
//   language: Language;
// }

// interface Alert {
//   id: string;
//   type: 'outbreak' | 'weather' | 'vaccination' | 'emergency';
//   severity: 'low' | 'medium' | 'high' | 'critical';
//   title: string;
//   description: string;
//   location: string;
//   timestamp: Date;
//   isRead: boolean;
//   actionRequired: boolean;
// }

// const translations = {
//   en: {
//     title: 'Health Alerts',
//     subtitle: 'Real-time health notifications and outbreak updates',
//     markAllRead: 'Mark All as Read',
//     filter: 'Filter by:',
//     all: 'All Alerts',
//     unread: 'Unread',
//     types: {
//       outbreak: 'Disease Outbreaks',
//       weather: 'Weather Health',
//       vaccination: 'Vaccination',
//       emergency: 'Emergency'
//     },
//     severity: {
//       low: 'Low',
//       medium: 'Medium',
//       high: 'High',
//       critical: 'Critical'
//     },
//     actionRequired: 'Action Required',
//     viewDetails: 'View Details',
//     noAlerts: 'No alerts to display',
//     lastUpdated: 'Last updated',
//     regionalMap: 'Regional Health Map',
//     mapDescription: 'Disease prevalence and health alerts by region'
//   },
//   hi: {
//     title: 'स्वास्थ्य अलर्ट',
//     subtitle: 'वास्तविक समय स्वास्थ्य सूचनाएं और प्रकोप अपडेट',
//     markAllRead: 'सभी को पढ़ा हुआ मार्क करें',
//     filter: 'फ़िल्टर:',
//     all: 'सभी अलर्ट',
//     unread: 'अपठित',
//     types: {
//       outbreak: 'रोग प्रकोप',
//       weather: 'मौसम स्वास्थ्य',
//       vaccination: 'टीकाकरण',
//       emergency: 'आपातकाल'
//     },
//     severity: {
//       low: 'कम',
//       medium: 'मध्यम',
//       high: 'उच्च',
//       critical: 'गंभीर'
//     },
//     actionRequired: 'कार्रवाई आवश्यक',
//     viewDetails: 'विवरण देखें',
//     noAlerts: 'कोई अलर्ट प्रदर्शित नहीं करना',
//     lastUpdated: 'अंतिम अपडेट',
//     regionalMap: 'क्षेत्रीय स्वास्थ्य मानचित्र',
//     mapDescription: 'क्षेत्र के अनुसार रोग प्रसार और स्वास्थ्य अलर्ट'
//   },
//   te: {
//     title: 'ఆరోగ్య హెచ్చరికలు',
//     subtitle: 'రియల్ టైమ్ ఆరోగ్య నోటిఫికేషన్లు మరియు వ్యాప్తి అప్‌డేట్లు',
//     markAllRead: 'అన్నింటినీ చదివినట్లు మార్క్ చేయండి',
//     filter: 'వడపోత:',
//     all: 'అన్ని హెచ్చరికలు',
//     unread: 'చదవని',
//     types: {
//       outbreak: 'వ్యాధి వ్యాప్తి',
//       weather: 'వాతావరణ ఆరోగ్యం',
//       vaccination: 'టీకాలు',
//       emergency: 'అత్యవసరం'
//     },
//     severity: {
//       low: 'తక్కువ',
//       medium: 'మధ్యస్థ',
//       high: 'అధిక',
//       critical: 'క్లిష్టమైన'
//     },
//     actionRequired: 'చర్య అవసరం',
//     viewDetails: 'వివరాలు చూడండి',
//     noAlerts: 'ప్రదర్శించడానికి అలర్ట్లు లేవు',
//     lastUpdated: 'చివరిగా నవీకరించబడింది',
//     regionalMap: 'ప్రాంతీయ ఆరోగ్య మ్యాప్',
//     mapDescription: 'ప్రాంతం వారీగా వ్యాధి వ్యాప్తి మరియు ఆరోగ్య హెచ్చరికలు'
//   },
//   bn: {
//     title: 'স্বাস্থ্য সতর্কতা',
//     subtitle: 'রিয়েল-টাইম স্বাস্থ্য বিজ্ঞপ্তি এবং প্রাদুর্ভাব আপডেট',
//     markAllRead: 'সবগুলি পঠিত হিসেবে চিহ্নিত করুন',
//     filter: 'ফিল্টার:',
//     all: 'সমস্ত সতর্কতা',
//     unread: 'অপঠিত',
//     types: {
//       outbreak: 'রোগের প্রাদুর্ভাব',
//       weather: 'আবহাওয়া স্বাস্থ্য',
//       vaccination: 'টিকাদান',
//       emergency: 'জরুরি'
//     },
//     severity: {
//       low: 'কম',
//       medium: 'মাঝারি',
//       high: 'উচ্চ',
//       critical: 'গুরুতর'
//     },
//     actionRequired: 'পদক্ষেপ প্রয়োজন',
//     viewDetails: 'বিস্তারিত দেখুন',
//     noAlerts: 'প্রদর্শনের জন্য কোনো সতর্কতা নেই',
//     lastUpdated: 'সর্বশেষ আপডেট',
//     regionalMap: 'আঞ্চলিক স্বাস্থ্য মানচিত্র',
//     mapDescription: 'অঞ্চল অনুযায়ী রোগের প্রাদুর্ভাব এবং স্বাস্থ্য সতর্কতা'
//   }
// };

// // Mock alert data
// const mockAlerts: Alert[] = [
//   {
//     id: '1',
//     type: 'outbreak',
//     severity: 'high',
//     title: 'Dengue Outbreak Alert',
//     description: 'Increased dengue cases reported in the region. Take preventive measures against mosquito breeding.',
//     location: 'Central District',
//     timestamp: new Date('2024-01-08T10:30:00'),
//     isRead: false,
//     actionRequired: true
//   },
//   {
//     id: '2',
//     type: 'weather',
//     severity: 'medium',
//     title: 'Heat Wave Warning',
//     description: 'Extreme temperatures expected. Stay hydrated and avoid outdoor activities during peak hours.',
//     location: 'All Districts',
//     timestamp: new Date('2024-01-07T08:15:00'),
//     isRead: false,
//     actionRequired: false
//   },
//   {
//     id: '3',
//     type: 'vaccination',
//     severity: 'low',
//     title: 'COVID-19 Booster Campaign',
//     description: 'Free COVID-19 booster shots available at local health centers for eligible population.',
//     location: 'Health Centers',
//     timestamp: new Date('2024-01-06T14:20:00'),
//     isRead: true,
//     actionRequired: true
//   },
//   {
//     id: '4',
//     type: 'emergency',
//     severity: 'critical',
//     title: 'Water Contamination Alert',
//     description: 'Water supply contamination detected. Boil water before drinking until further notice.',
//     location: 'North District',
//     timestamp: new Date('2024-01-05T16:45:00'),
//     isRead: false,
//     actionRequired: true
//   },
//   {
//     id: '5',
//     type: 'outbreak',
//     severity: 'medium',
//     title: 'Seasonal Flu Update',
//     description: 'Flu activity is elevated. Get vaccinated and practice good hygiene to prevent spread.',
//     location: 'Region-wide',
//     timestamp: new Date('2024-01-04T09:00:00'),
//     isRead: true,
//     actionRequired: false
//   }
// ];

// const alertTypeIcons = {
//   outbreak: AlertTriangle,
//   weather: Shield,
//   vaccination: Zap,
//   emergency: Bell
// };

// const severityColors = {
//   low: 'bg-blue-100 text-blue-700 border-blue-300',
//   medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
//   high: 'bg-orange-100 text-orange-700 border-orange-300',
//   critical: 'bg-red-100 text-red-700 border-red-300'
// };

// // Mock regional data for heatmap
// const regionalData = [
//   { region: 'North District', dengue: 8, malaria: 3, covid: 5, total: 16, severity: 'high' },
//   { region: 'South District', dengue: 3, malaria: 1, covid: 2, total: 6, severity: 'medium' },
//   { region: 'East District', dengue: 12, malaria: 7, covid: 4, total: 23, severity: 'critical' },
//   { region: 'West District', dengue: 2, malaria: 0, covid: 3, total: 5, severity: 'low' },
//   { region: 'Central District', dengue: 15, malaria: 2, covid: 8, total: 25, severity: 'critical' },
//   { region: 'Rural Areas', dengue: 6, malaria: 4, covid: 1, total: 11, severity: 'medium' }
// ];

// export function AlertsPanel({ language }: AlertsPanelProps) {
//   const [alerts, setAlerts] = useState<Alert[]>(mockAlerts);
//   const [filter, setFilter] = useState<'all' | 'unread' | string>('all');
//   const [selectedType, setSelectedType] = useState<string | null>(null);
//   const [showMap, setShowMap] = useState(false);

//   const t = translations[language] || translations.en;

//   useEffect(() => {
//     // Simulate real-time alerts
//     const interval = setInterval(() => {
//       if (Math.random() > 0.9) {
//         const newAlert: Alert = {
//           id: Date.now().toString(),
//           type: 'outbreak',
//           severity: 'medium',
//           title: 'New Health Update',
//           description: 'A new health advisory has been issued. Please check latest guidelines.',
//           location: 'Your Area',
//           timestamp: new Date(),
//           isRead: false,
//           actionRequired: false
//         };
        
//         setAlerts(prev => [newAlert, ...prev]);
//       }
//     }, 60000); // Check every minute

//     return () => clearInterval(interval);
//   }, []);

//   const markAllAsRead = () => {
//     setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
//   };

//   const markAsRead = (alertId: string) => {
//     setAlerts(prev => prev.map(alert => 
//       alert.id === alertId ? { ...alert, isRead: true } : alert
//     ));
//   };

//   const filteredAlerts = alerts.filter(alert => {
//     if (filter === 'unread' && alert.isRead) return false;
//     if (selectedType && alert.type !== selectedType) return false;
//     return true;
//   });

//   const unreadCount = alerts.filter(alert => !alert.isRead).length;

//   const formatTimeAgo = (date: Date) => {
//     const now = new Date();
//     const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
//     if (diffInHours < 1) return 'Just now';
//     if (diffInHours < 24) return `${diffInHours}h ago`;
//     return `${Math.floor(diffInHours / 24)}d ago`;
//   };

//   return (
//     <div className="space-y-6">
//       <div className="flex items-center justify-between">
//         <div>
//           <h1 className="text-3xl mb-2">{t.title}</h1>
//           <p className="text-gray-600">{t.subtitle}</p>
//         </div>
//         {unreadCount > 0 && (
//           <Button variant="outline" onClick={markAllAsRead}>
//             {t.markAllRead}
//           </Button>
//         )}
//       </div>

//       {/* Map Toggle */}
//       <div className="flex justify-end mb-4">
//         <Button
//           variant={showMap ? "default" : "outline"}
//           onClick={() => setShowMap(!showMap)}
//           className="flex items-center space-x-2"
//         >
//           <Map className="w-4 h-4" />
//           <span>{t.regionalMap}</span>
//         </Button>
//       </div>

//       {/* Regional Heatmap */}
//       {showMap && (
//         <Card className="mb-6">
//           <CardHeader>
//             <CardTitle className="flex items-center space-x-2">
//               <Map className="w-5 h-5" />
//               <span>{t.regionalMap}</span>
//             </CardTitle>
//             <p className="text-sm text-gray-600">{t.mapDescription}</p>
//           </CardHeader>
//           <CardContent>
//             <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
//               {regionalData.map((region, index) => (
//                 <Card 
//                   key={index} 
//                   className={`border-2 ${
//                     region.severity === 'critical' ? 'border-red-300 bg-red-50' :
//                     region.severity === 'high' ? 'border-orange-300 bg-orange-50' :
//                     region.severity === 'medium' ? 'border-yellow-300 bg-yellow-50' :
//                     'border-green-300 bg-green-50'
//                   }`}
//                 >
//                   <CardContent className="p-4">
//                     <div className="flex items-center justify-between mb-3">
//                       <h4 className="font-medium">{region.region}</h4>
//                       <Badge 
//                         className={
//                           region.severity === 'critical' ? 'bg-red-100 text-red-700' :
//                           region.severity === 'high' ? 'bg-orange-100 text-orange-700' :
//                           region.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
//                           'bg-green-100 text-green-700'
//                         }
//                       >
//                         {region.total} cases
//                       </Badge>
//                     </div>
                    
//                     <div className="space-y-2">
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Dengue:</span>
//                         <div className="flex items-center space-x-2">
//                           <div 
//                             className="h-2 bg-red-200 rounded-full"
//                             style={{ width: '40px' }}
//                           >
//                             <div 
//                               className="h-2 bg-red-500 rounded-full"
//                               style={{ width: `${(region.dengue / 15) * 100}%` }}
//                             />
//                           </div>
//                           <span className="text-xs w-6 text-right">{region.dengue}</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">Malaria:</span>
//                         <div className="flex items-center space-x-2">
//                           <div 
//                             className="h-2 bg-yellow-200 rounded-full"
//                             style={{ width: '40px' }}
//                           >
//                             <div 
//                               className="h-2 bg-yellow-500 rounded-full"
//                               style={{ width: `${(region.malaria / 7) * 100}%` }}
//                             />
//                           </div>
//                           <span className="text-xs w-6 text-right">{region.malaria}</span>
//                         </div>
//                       </div>
                      
//                       <div className="flex justify-between items-center">
//                         <span className="text-sm text-gray-600">COVID:</span>
//                         <div className="flex items-center space-x-2">
//                           <div 
//                             className="h-2 bg-blue-200 rounded-full"
//                             style={{ width: '40px' }}
//                           >
//                             <div 
//                               className="h-2 bg-blue-500 rounded-full"
//                               style={{ width: `${(region.covid / 8) * 100}%` }}
//                             />
//                           </div>
//                           <span className="text-xs w-6 text-right">{region.covid}</span>
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               ))}
//             </div>
            
//             <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-green-300 rounded"></div>
//                 <span>Low Risk</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-yellow-300 rounded"></div>
//                 <span>Medium Risk</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-orange-300 rounded"></div>
//                 <span>High Risk</span>
//               </div>
//               <div className="flex items-center space-x-2">
//                 <div className="w-4 h-4 bg-red-300 rounded"></div>
//                 <span>Critical Risk</span>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       )}

//       {/* Summary Cards */}
//       <div className="grid md:grid-cols-4 gap-4">
//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-red-100 rounded-lg">
//                 <AlertTriangle className="w-5 h-5 text-red-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Critical</p>
//                 <p className="text-2xl">{alerts.filter(a => a.severity === 'critical').length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-orange-100 rounded-lg">
//                 <Bell className="w-5 h-5 text-orange-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Unread</p>
//                 <p className="text-2xl">{unreadCount}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-yellow-100 rounded-lg">
//                 <Zap className="w-5 h-5 text-yellow-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Action Required</p>
//                 <p className="text-2xl">{alerts.filter(a => a.actionRequired).length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>

//         <Card>
//           <CardContent className="p-4">
//             <div className="flex items-center space-x-3">
//               <div className="p-2 bg-blue-100 rounded-lg">
//                 <Info className="w-5 h-5 text-blue-600" />
//               </div>
//               <div>
//                 <p className="text-sm text-gray-600">Total Alerts</p>
//                 <p className="text-2xl">{alerts.length}</p>
//               </div>
//             </div>
//           </CardContent>
//         </Card>
//       </div>

//       {/* Filters */}
//       <div className="flex flex-wrap gap-4">
//         <div className="flex items-center space-x-2">
//           <span className="text-sm text-gray-600">{t.filter}</span>
//           <Button
//             variant={filter === 'all' ? "default" : "outline"}
//             size="sm"
//             onClick={() => setFilter('all')}
//           >
//             {t.all}
//           </Button>
//           <Button
//             variant={filter === 'unread' ? "default" : "outline"}
//             size="sm"
//             onClick={() => setFilter('unread')}
//           >
//             {t.unread} {unreadCount > 0 && `(${unreadCount})`}
//           </Button>
//         </div>

//         <div className="flex flex-wrap gap-2">
//           {Object.entries(t.types).map(([key, label]) => {
//             const Icon = alertTypeIcons[key as keyof typeof alertTypeIcons];
//             return (
//               <Button
//                 key={key}
//                 variant={selectedType === key ? "default" : "outline"}
//                 size="sm"
//                 onClick={() => setSelectedType(selectedType === key ? null : key)}
//                 className="flex items-center space-x-2"
//               >
//                 <Icon className="w-4 h-4" />
//                 <span>{label}</span>
//               </Button>
//             );
//           })}
//         </div>
//       </div>

//       {/* Alerts List */}
//       <div className="space-y-4">
//         {filteredAlerts.length === 0 ? (
//           <Card>
//             <CardContent className="p-8 text-center">
//               <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
//               <h3 className="text-lg text-gray-600 mb-2">{t.noAlerts}</h3>
//               <p className="text-gray-500">Check back later for new health alerts and updates.</p>
//             </CardContent>
//           </Card>
//         ) : (
//           filteredAlerts.map((alert) => {
//             const Icon = alertTypeIcons[alert.type as keyof typeof alertTypeIcons];
//             const severityClass = severityColors[alert.severity as keyof typeof severityColors];
            
//             return (
//               <Card 
//                 key={alert.id} 
//                 className={`cursor-pointer transition-all hover:shadow-md ${!alert.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''}`}
//                 onClick={() => markAsRead(alert.id)}
//               >
//                 <CardContent className="p-4">
//                   <div className="flex items-start justify-between">
//                     <div className="flex items-start space-x-4 flex-1">
//                       <div className={`p-2 rounded-lg ${alert.severity === 'critical' ? 'bg-red-100' : alert.severity === 'high' ? 'bg-orange-100' : alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
//                         <Icon className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-red-600' : alert.severity === 'high' ? 'text-orange-600' : alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
//                       </div>
                      
//                       <div className="flex-1">
//                         <div className="flex items-center space-x-2 mb-2">
//                           <h3 className={`${!alert.isRead ? 'font-semibold' : ''}`}>{alert.title}</h3>
//                           {!alert.isRead && (
//                             <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
//                           )}
//                         </div>
                        
//                         <p className="text-gray-600 text-sm mb-3">{alert.description}</p>
                        
//                         <div className="flex items-center space-x-4 text-xs text-gray-500">
//                           <div className="flex items-center space-x-1">
//                             <MapPin className="w-3 h-3" />
//                             <span>{alert.location}</span>
//                           </div>
//                           <div className="flex items-center space-x-1">
//                             <Clock className="w-3 h-3" />
//                             <span>{formatTimeAgo(alert.timestamp)}</span>
//                           </div>
//                         </div>
//                       </div>
//                     </div>
                    
//                     <div className="flex flex-col items-end space-y-2">
//                       <Badge className={severityClass}>
//                         {t.severity[alert.severity as keyof typeof t.severity]}
//                       </Badge>
                      
//                       {alert.actionRequired && (
//                         <Badge variant="destructive">
//                           {t.actionRequired}
//                         </Badge>
//                       )}
                      
//                       <Button variant="outline" size="sm">
//                         {t.viewDetails}
//                       </Button>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             );
//           })
//         )}
//       </div>

//       {/* Last Updated */}
//       <div className="text-center text-sm text-gray-500">
//         {t.lastUpdated}: {new Date().toLocaleString()}
//       </div>
//     </div>
//   );
// }





// Updating by gemini for alert fetching -- working properly now

// ADD THESE TWO LINES WITH YOUR OTHER IMPORTS

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertTriangle, Bell, MapPin, Clock, Shield, Zap, Info, Map } from 'lucide-react';
import { getHealthAlerts, HealthAlert as ApiAlert } from '../services/api';
import { Loader2 } from 'lucide-react';

type Language = 'en' | 'hi' | 'te' | 'bn';

interface AlertsPanelProps {
  language: Language;
}

interface Alert {
  id: string;
  type: 'outbreak' | 'weather' | 'vaccination' | 'emergency';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  location: string;
  timestamp: Date;
  isRead: boolean;
  actionRequired: boolean;
}

const translations = {
  en: {
    title: 'Health Alerts',
    subtitle: 'Real-time health notifications and outbreak updates',
    markAllRead: 'Mark All as Read',
    filter: 'Filter by:',
    all: 'All Alerts',
    unread: 'Unread',
    types: {
      outbreak: 'Disease Outbreaks',
      weather: 'Weather Health',
      vaccination: 'Vaccination',
      emergency: 'Emergency'
    },
    severity: {
      low: 'Low',
      medium: 'Medium',
      high: 'High',
      critical: 'Critical'
    },
    actionRequired: 'Action Required',
    viewDetails: 'View Details',
    noAlerts: 'No alerts to display',
    lastUpdated: 'Last updated',
    regionalMap: 'Regional Health Map',
    mapDescription: 'Disease prevalence and health alerts by region'
  },
  hi: {
    title: 'स्वास्थ्य अलर्ट',
    subtitle: 'वास्तविक समय स्वास्थ्य सूचनाएं और प्रकोप अपडेट',
    markAllRead: 'सभी को पढ़ा हुआ मार्क करें',
    filter: 'फ़िल्टर:',
    all: 'सभी अलर्ट',
    unread: 'अपठित',
    types: {
      outbreak: 'रोग प्रकोप',
      weather: 'मौसम स्वास्थ्य',
      vaccination: 'टीकाकरण',
      emergency: 'आपातकाल'
    },
    severity: {
      low: 'कम',
      medium: 'मध्यम',
      high: 'उच्च',
      critical: 'गंभीर'
    },
    actionRequired: 'कार्रवाई आवश्यक',
    viewDetails: 'विवरण देखें',
    noAlerts: 'कोई अलर्ट प्रदर्शित नहीं करना',
    lastUpdated: 'अंतिम अपडेट',
    regionalMap: 'क्षेत्रीय स्वास्थ्य मानचित्र',
    mapDescription: 'क्षेत्र के अनुसार रोग प्रसार और स्वास्थ्य अलर्ट'
  },
  te: {
    title: 'ఆరోగ్య హెచ్చరికలు',
    subtitle: 'రియల్ టైమ్ ఆరోగ్య నోటిఫికేషన్లు మరియు వ్యాప్తి అప్‌డేట్లు',
    markAllRead: 'అన్నింటినీ చదివినట్లు మార్క్ చేయండి',
    filter: 'వడపోత:',
    all: 'అన్ని హెచ్చరికలు',
    unread: 'చదవని',
    types: {
      outbreak: 'వ్యాధి వ్యాప్తి',
      weather: 'వాతావరణ ఆరోగ్యం',
      vaccination: 'టీకాలు',
      emergency: 'అత్యవసరం'
    },
    severity: {
      low: 'తక్కువ',
      medium: 'మధ్యస్థ',
      high: 'అధిక',
      critical: 'క్లిష్టమైన'
    },
    actionRequired: 'చర్య అవసరం',
    viewDetails: 'వివరాలు చూడండి',
    noAlerts: 'ప్రదర్శించడానికి అలర్ట్లు లేవు',
    lastUpdated: 'చివరిగా నవీకరించబడింది',
    regionalMap: 'ప్రాంతీయ ఆరోగ్య మ్యాప్',
    mapDescription: 'ప్రాంతం వారీగా వ్యాధి వ్యాప్తి మరియు ఆరోగ్య హెచ్చరికలు'
  },
  bn: {
    title: 'স্বাস্থ্য সতর্কতা',
    subtitle: 'রিয়েল-টাইম স্বাস্থ্য বিজ্ঞপ্তি এবং প্রাদুর্ভাব আপডেট',
    markAllRead: 'সবগুলি পঠিত হিসেবে চিহ্নিত করুন',
    filter: 'ফিল্টার:',
    all: 'সমস্ত সতর্কতা',
    unread: 'অপঠিত',
    types: {
      outbreak: 'রোগের প্রাদুর্ভাব',
      weather: 'আবহাওয়া স্বাস্থ্য',
      vaccination: 'টিকাদান',
      emergency: 'জরুরি'
    },
    severity: {
      low: 'কম',
      medium: 'মাঝারি',
      high: 'উচ্চ',
      critical: 'গুরুতর'
    },
    actionRequired: 'পদক্ষেপ প্রয়োজন',
    viewDetails: 'বিস্তারিত দেখুন',
    noAlerts: 'প্রদর্শনের জন্য কোনো সতর্কতা নেই',
    lastUpdated: 'সর্বশেষ আপডেট',
    regionalMap: 'আঞ্চলিক স্বাস্থ্য মানচিত্র',
    mapDescription: 'অঞ্চল অনুযায়ী রোগের প্রাদুর্ভাব এবং স্বাস্থ্য সতর্কতা'
  }
};

// Mock alert data
const mockAlerts: Alert[] = [
  {
    id: '1',
    type: 'outbreak',
    severity: 'high',
    title: 'Dengue Outbreak Alert',
    description: 'Increased dengue cases reported in the region. Take preventive measures against mosquito breeding.',
    location: 'Central District',
    timestamp: new Date('2024-01-08T10:30:00'),
    isRead: false,
    actionRequired: true
  },
  {
    id: '2',
    type: 'weather',
    severity: 'medium',
    title: 'Heat Wave Warning',
    description: 'Extreme temperatures expected. Stay hydrated and avoid outdoor activities during peak hours.',
    location: 'All Districts',
    timestamp: new Date('2024-01-07T08:15:00'),
    isRead: false,
    actionRequired: false
  },
  {
    id: '3',
    type: 'vaccination',
    severity: 'low',
    title: 'COVID-19 Booster Campaign',
    description: 'Free COVID-19 booster shots available at local health centers for eligible population.',
    location: 'Health Centers',
    timestamp: new Date('2024-01-06T14:20:00'),
    isRead: true,
    actionRequired: true
  },
  {
    id: '4',
    type: 'emergency',
    severity: 'critical',
    title: 'Water Contamination Alert',
    description: 'Water supply contamination detected. Boil water before drinking until further notice.',
    location: 'North District',
    timestamp: new Date('2024-01-05T16:45:00'),
    isRead: false,
    actionRequired: true
  },
  {
    id: '5',
    type: 'outbreak',
    severity: 'medium',
    title: 'Seasonal Flu Update',
    description: 'Flu activity is elevated. Get vaccinated and practice good hygiene to prevent spread.',
    location: 'Region-wide',
    timestamp: new Date('2024-01-04T09:00:00'),
    isRead: true,
    actionRequired: false
  }
];

const alertTypeIcons = {
  outbreak: AlertTriangle,
  weather: Shield,
  vaccination: Zap,
  emergency: Bell
};

const severityColors = {
  low: 'bg-blue-100 text-blue-700 border-blue-300',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-300',
  high: 'bg-orange-100 text-orange-700 border-orange-300',
  critical: 'bg-red-100 text-red-700 border-red-300'
};

// Mock regional data for heatmap
const regionalData = [
  { region: 'North District', dengue: 8, malaria: 3, covid: 5, total: 16, severity: 'high' },
  { region: 'South District', dengue: 3, malaria: 1, covid: 2, total: 6, severity: 'medium' },
  { region: 'East District', dengue: 12, malaria: 7, covid: 4, total: 23, severity: 'critical' },
  { region: 'West District', dengue: 2, malaria: 0, covid: 3, total: 5, severity: 'low' },
  { region: 'Central District', dengue: 15, malaria: 2, covid: 8, total: 25, severity: 'critical' },
  { region: 'Rural Areas', dengue: 6, malaria: 4, covid: 1, total: 11, severity: 'medium' }
];

// REPLACE IT WITH THESE TWO LINES:
export function AlertsPanel({ language }: AlertsPanelProps) {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unread' | string>('all');
  const [selectedType, setSelectedType] = useState<string | null>(null);
  const [showMap, setShowMap] = useState(false);

  const t = translations[language] || translations.en;

  // REPLACE THE OLD useEffect WITH THIS NEW ONE:
  useEffect(() => {
    const fetchAndSetAlerts = async () => {
      setIsLoading(true);
      const apiAlerts = await getHealthAlerts();
      
      // This mapping object ensures the API's category names are correctly
      // converted to the keys your component's UI expects.
      const categoryApiToComponentMap: { [key: string]: Alert['type'] } = {
        'Disease Outbreaks': 'outbreak',
        'Weather Health': 'weather',
        'Vaccination': 'vaccination',
        'Emergency': 'emergency',
      };
      
      const formattedAlerts: Alert[] = apiAlerts.map(apiAlert => ({
          id: apiAlert.id,
          title: apiAlert.title,
          description: apiAlert.description,
          location: apiAlert.location,
          isRead: apiAlert.isRead,
          actionRequired: apiAlert.actionRequired,
          timestamp: new Date(apiAlert.timestamp),
          // Correctly map severity and type
          severity: apiAlert.priority.toLowerCase() as Alert['severity'],
          type: categoryApiToComponentMap[apiAlert.category] || 'emergency' // Use the map and provide a fallback
      }));

      setAlerts(formattedAlerts);
      setIsLoading(false);
    };

    fetchAndSetAlerts();
  }, []); // The empty [] means this runs only once when the page loads.

  const markAllAsRead = () => {
    setAlerts(prev => prev.map(alert => ({ ...alert, isRead: true })));
  };

  const markAsRead = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, isRead: true } : alert
    ));
  };

  const filteredAlerts = alerts.filter(alert => {
    if (filter === 'unread' && alert.isRead) return false;
    if (selectedType && alert.type !== selectedType) return false;
    return true;
  });

  const unreadCount = alerts.filter(alert => !alert.isRead).length;

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${Math.floor(diffInHours / 24)}d ago`;
  };

  // --- THIS IS THE CORRECT PLACEMENT ---
  // If the component is loading, we show the spinner and stop here.
  // The main return statement below will not be reached.
  if (isLoading) {
      return (
          <div className="flex justify-center items-center h-96">
              <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
          </div>
      );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        {unreadCount > 0 && (
          <Button variant="outline" onClick={markAllAsRead}>
            {t.markAllRead}
          </Button>
        )}
      </div>

      {/* Map Toggle */}
      <div className="flex justify-end mb-4">
        <Button
          variant={showMap ? "default" : "outline"}
          onClick={() => setShowMap(!showMap)}
          className="flex items-center space-x-2"
        >
          <Map className="w-4 h-4" />
          <span>{t.regionalMap}</span>
        </Button>
      </div>

      {/* Regional Heatmap */}
      {showMap && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Map className="w-5 h-5" />
              <span>{t.regionalMap}</span>
            </CardTitle>
            <p className="text-sm text-gray-600">{t.mapDescription}</p>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {regionalData.map((region, index) => (
                <Card 
                  key={index} 
                  className={`border-2 ${
                    region.severity === 'critical' ? 'border-red-300 bg-red-50' :
                    region.severity === 'high' ? 'border-orange-300 bg-orange-50' :
                    region.severity === 'medium' ? 'border-yellow-300 bg-yellow-50' :
                    'border-green-300 bg-green-50'
                  }`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-medium">{region.region}</h4>
                      <Badge 
                        className={
                          region.severity === 'critical' ? 'bg-red-100 text-red-700' :
                          region.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                          region.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-green-100 text-green-700'
                        }
                      >
                        {region.total} cases
                      </Badge>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Dengue:</span>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="h-2 bg-red-200 rounded-full"
                            style={{ width: '40px' }}
                          >
                            <div 
                              className="h-2 bg-red-500 rounded-full"
                              style={{ width: `${(region.dengue / 15) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs w-6 text-right">{region.dengue}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Malaria:</span>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="h-2 bg-yellow-200 rounded-full"
                            style={{ width: '40px' }}
                          >
                            <div 
                              className="h-2 bg-yellow-500 rounded-full"
                              style={{ width: `${(region.malaria / 7) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs w-6 text-right">{region.malaria}</span>
                        </div>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">COVID:</span>
                        <div className="flex items-center space-x-2">
                          <div 
                            className="h-2 bg-blue-200 rounded-full"
                            style={{ width: '40px' }}
                          >
                            <div 
                              className="h-2 bg-blue-500 rounded-full"
                              style={{ width: `${(region.covid / 8) * 100}%` }}
                            />
                          </div>
                          <span className="text-xs w-6 text-right">{region.covid}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            
            <div className="mt-4 flex items-center justify-center space-x-6 text-sm text-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-green-300 rounded"></div>
                <span>Low Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-yellow-300 rounded"></div>
                <span>Medium Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-orange-300 rounded"></div>
                <span>High Risk</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-red-300 rounded"></div>
                <span>Critical Risk</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Summary Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-red-100 rounded-lg">
                <AlertTriangle className="w-5 h-5 text-red-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Critical</p>
                <p className="text-2xl">{alerts.filter(a => a.severity === 'critical').length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Bell className="w-5 h-5 text-orange-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Unread</p>
                <p className="text-2xl">{unreadCount}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Zap className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Action Required</p>
                <p className="text-2xl">{alerts.filter(a => a.actionRequired).length}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-4">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Info className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Alerts</p>
                <p className="text-2xl">{alerts.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-600">{t.filter}</span>
          <Button
            variant={filter === 'all' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter('all')}
          >
            {t.all}
          </Button>
          <Button
            variant={filter === 'unread' ? "default" : "outline"}
            size="sm"
            onClick={() => setFilter('unread')}
          >
            {t.unread} {unreadCount > 0 && `(${unreadCount})`}
          </Button>
        </div>

        <div className="flex flex-wrap gap-2">
          {Object.entries(t.types).map(([key, label]) => {
            const Icon = alertTypeIcons[key as keyof typeof alertTypeIcons];
            return (
              <Button
                key={key}
                variant={selectedType === key ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(selectedType === key ? null : key)}
                className="flex items-center space-x-2"
              >
                <Icon className="w-4 h-4" />
                <span>{label}</span>
              </Button>
            );
          })}
        </div>
      </div>

      {/* Alerts List */}
      <div className="space-y-4">
        {filteredAlerts.length === 0 ? (
          <Card>
            <CardContent className="p-8 text-center">
              <Bell className="w-12 h-12 mx-auto text-gray-400 mb-4" />
              <h3 className="text-lg text-gray-600 mb-2">{t.noAlerts}</h3>
              <p className="text-gray-500">Check back later for new health alerts and updates.</p>
            </CardContent>
          </Card>
        ) : (
          filteredAlerts.map((alert) => {
            const Icon = alertTypeIcons[alert.type as keyof typeof alertTypeIcons];
            const severityClass = severityColors[alert.severity as keyof typeof severityColors];
            
            return (
              <Card 
                key={alert.id} 
                className={`cursor-pointer transition-all hover:shadow-md ${!alert.isRead ? 'border-l-4 border-l-blue-500 bg-blue-50' : ''}`}
                onClick={() => markAsRead(alert.id)}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4 flex-1">
                      <div className={`p-2 rounded-lg ${alert.severity === 'critical' ? 'bg-red-100' : alert.severity === 'high' ? 'bg-orange-100' : alert.severity === 'medium' ? 'bg-yellow-100' : 'bg-blue-100'}`}>
                        <Icon className={`w-5 h-5 ${alert.severity === 'critical' ? 'text-red-600' : alert.severity === 'high' ? 'text-orange-600' : alert.severity === 'medium' ? 'text-yellow-600' : 'text-blue-600'}`} />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 mb-2">
                          <h3 className={`${!alert.isRead ? 'font-semibold' : ''}`}>{alert.title}</h3>
                          {!alert.isRead && (
                            <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          )}
                        </div>
                        
                        <p className="text-gray-600 text-sm mb-3">{alert.description}</p>
                        
                        <div className="flex items-center space-x-4 text-xs text-gray-500">
                          <div className="flex items-center space-x-1">
                            <MapPin className="w-3 h-3" />
                            <span>{alert.location}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Clock className="w-3 h-3" />
                            <span>{formatTimeAgo(alert.timestamp)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex flex-col items-end space-y-2">
                      <Badge className={severityClass}>
                        {t.severity[alert.severity as keyof typeof t.severity]}
                      </Badge>
                      
                      {alert.actionRequired && (
                        <Badge variant="destructive">
                          {t.actionRequired}
                        </Badge>
                      )}
                      
                      <Button variant="outline" size="sm">
                        {t.viewDetails}
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })
        )}
      </div>

      {/* Last Updated */}
      <div className="text-center text-sm text-gray-500">
        {t.lastUpdated}: {new Date().toLocaleString()}
      </div>
    </div>
  );
}

// Taak- big code ends here