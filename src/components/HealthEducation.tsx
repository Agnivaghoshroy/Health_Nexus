// import React, { useState } from 'react';
// import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
// import { Button } from './ui/button';
// import { Badge } from './ui/badge';
// import { Heart, Shield, Activity, Users, ChevronRight, Play } from 'lucide-react';
// import { ImageWithFallback } from './figma/ImageWithFallback';

// type Language = 'en' | 'hi' | 'te' | 'bn';

// interface HealthEducationProps {
//   language: Language;
// }

// const translations = {
//   en: {
//     title: 'Health Education',
//     subtitle: 'Learn about preventive healthcare and healthy living',
//     categories: {
//       prevention: 'Prevention',
//       nutrition: 'Nutrition', 
//       maternal: 'Maternal Health',
//       hygiene: 'Hygiene'
//     },
//     topics: [
//       {
//         id: 'handwashing',
//         category: 'hygiene',
//         title: 'Proper Hand Washing',
//         description: 'Learn the correct technique to wash hands and prevent infections',
//         duration: '3 min read',
//         content: 'Wash hands with soap and water for at least 20 seconds. Scrub all surfaces including back of hands, between fingers, and under nails. Use alcohol-based sanitizer when soap is not available.'
//       },
//       {
//         id: 'nutrition',
//         category: 'nutrition',
//         title: 'Balanced Diet Basics',
//         description: 'Understanding essential nutrients and healthy eating habits',
//         duration: '5 min read',
//         content: 'A balanced diet includes fruits, vegetables, whole grains, proteins, and healthy fats. Eat 5 servings of fruits and vegetables daily. Limit processed foods, sugar, and excessive salt.'
//       },
//       {
//         id: 'exercise',
//         category: 'prevention',
//         title: 'Daily Physical Activity',
//         description: 'Simple exercises you can do at home to stay healthy',
//         duration: '4 min read',
//         content: 'Aim for 150 minutes of moderate exercise weekly. Walking, stretching, and basic bodyweight exercises help maintain health. Start slowly and gradually increase intensity.'
//       },
//       {
//         id: 'pregnancy',
//         category: 'maternal',
//         title: 'Prenatal Care Essentials',
//         description: 'Important steps for a healthy pregnancy',
//         duration: '6 min read',
//         content: 'Regular check-ups, proper nutrition with folic acid, avoiding alcohol and smoking, and getting adequate rest are crucial for maternal and baby health.'
//       }
//     ]
//   },
//   hi: {
//     title: 'स्वास्थ्य शिक्षा',
//     subtitle: 'बचाव और स्वस्थ जीवन के बारे में जानें',
//     categories: {
//       prevention: 'बचाव',
//       nutrition: 'पोषण',
//       maternal: 'मातृ स्वास्थ्य',
//       hygiene: 'स्वच्छता'
//     },
//     topics: [
//       {
//         id: 'handwashing',
//         category: 'hygiene',
//         title: 'सही तरीके से हाथ धोना',
//         description: 'हाथ धोने की सही तकनीक सीखें और संक्रमण से बचें',
//         duration: '3 मिनट पढ़ें',
//         content: 'कम से कम 20 सेकंड तक साबुन और पानी से हाथ धोएं। हाथ की पीठ, उंगलियों के बीच और नाखूनों के नीचे अच्छी तरह रगड़ें।'
//       },
//       {
//         id: 'nutrition',
//         category: 'nutrition',
//         title: 'संतुलित आहार की बुनियादी बातें',
//         description: 'आवश्यक पोषक तत्वों और स्वस्थ खाने की आदतों को समझें',
//         duration: '5 मिनट पढ़ें',
//         content: 'संतुलित आहार में फल, सब्जियां, साबुत अनाज, प्रोटीन और स्वस्थ वसा शामिल है। रोजाना 5 बार फल और सब्जी खाएं।'
//       },
//       {
//         id: 'exercise',
//         category: 'prevention',
//         title: 'दैनिक शारीरिक गतिविधि',
//         description: 'घर पर कर सकने वाले सरल व्यायाम',
//         duration: '4 मिनट पढ़ें',
//         content: 'सप्ताह में 150 मिनट मध्यम व्यायाम का लक्ष्य रखें। चलना, स्ट्रेचिंग और बुनियादी व्यायाम स्वास्थ्य बनाए रखने में मदद करते हैं।'
//       },
//       {
//         id: 'pregnancy',
//         category: 'maternal',
//         title: 'गर्भकालीन देखभाल की आवश्यकताएं',
//         description: 'स्वस्थ गर्भावस्था के लिए महत्वपूर्ण कदम',
//         duration: '6 मिनट पढ़ें',
//         content: 'नियमित जांच, फोलिक एसिड के साथ उचित पोषण, शराब और धूम्रपान से बचना और पर्याप्त आराम मां और बच्चे के स्वास्थ्य के लिए महत्वपूर्ण है।'
//       }
//     ]
//   },
//   te: {
//     title: 'ఆరోగ్య విద్య',
//     subtitle: 'నివారణ ఆరోగ్య సంరక్షణ మరియు ఆరోగ్యకరమైన జీవనం గురించి తెలుసుకోండి',
//     categories: {
//       prevention: 'నివారణ',
//       nutrition: 'పోషణ',
//       maternal: 'మాతృ ఆరోగ్యం',
//       hygiene: 'పరిశుభ్రత'
//     },
//     topics: [
//       {
//         id: 'handwashing',
//         category: 'hygiene',
//         title: 'సరైన చేతుల కడుక్కోవడం',
//         description: 'చేతులు కడుక్కోవడంలో సరైన పద్ధతిని నేర్చుకుని అంటువ్యాధుల నుండి కాపాడుకోండి',
//         duration: '3 నిమిషాలు చదవండి',
//         content: 'కనీసం 20 సెకన్లపాటు సబ్బు మరియు నీటితో చేతులు కడుక్కోండి। చేతుల వెనుక భాగం, వేళ్ల మధ్య మరియు గోళ్లకింద బాగా రుద్దండి।'
//       },
//       {
//         id: 'nutrition',
//         category: 'nutrition',
//         title: 'సమతుల్య ఆహార ప్రాథమికాలు',
//         description: 'అవసరమైన పోషకాలు మరియు ఆరోగ్యకరమైన ఆహార అలవాట్లను అర్థం చేసుకోండి',
//         duration: '5 నిమిషాలు చదవండి',
//         content: 'సమతుల్య ఆహారంలో పండ్లు, కూరగాయలు, ధాన్యాలు, ప్రోటీన్లు మరియు ఆరోగ్యకరమైన కొవ్వులు ఉంటాయి।'
//       },
//       {
//         id: 'exercise',
//         category: 'prevention',
//         title: 'రోజువారీ శారీరక కార్యకలాపాలు',
//         description: 'ఇంట్లో చేయగలిగే సరళమైన వ్యాయామాలు',
//         duration: '4 నిమిషాలు చదవండి',
//         content: 'వారానికి 150 నిమిషాలు మధ్యస్థ వ్యాయామం చేయాలని లక్ష్యం పెట్టుకోండి। నడక, వ్యాయామం ఆరోగ్యాన్ని కాపాడుతాయి।'
//       },
//       {
//         id: 'pregnancy',
//         category: 'maternal',
//         title: 'గర్భధారణ సమయంలో అవసరమైన సంరక్షణ',
//         description: 'ఆరోగ్యకరమైన గర్భధారణకు ముఖ్యమైన దశలు',
//         duration: '6 నిమిషాలు చదవండి',
//         content: 'క్రమం తప్పకుండా తనిఖీలు, ఫోలిక్ యాసిడ్‌తో సరైన పోషణ, మద్యం మరియు ధూమపానం మానేయడం తల్లి మరియు శిశువు ఆరోగ్యానికి కీలకం.'
//       }
//     ]
//   },
//   bn: {
//     title: 'স্বাস্থ্য শিক্ষা',
//     subtitle: 'প্রতিরোধমূলক স্বাস্থ্যসেবা এবং স্বাস্থ্যকর জীবনযাত্রা সম্পর্কে জানুন',
//     categories: {
//       prevention: 'প্রতিরোধ',
//       nutrition: 'পুষ্টি',
//       maternal: 'মাতৃ স্বাস্থ্য',
//       hygiene: 'স্বাস্থ্যবিধি'
//     },
//     topics: [
//       {
//         id: 'handwashing',
//         category: 'hygiene',
//         title: 'সঠিক হাত ধোয়ার পদ্ধতি',
//         description: 'হাত ধোয়ার সঠিক কৌশল শিখুন এবং সংক্রমণ প্রতিরোধ করুন',
//         duration: '৩ মিনিট পড়ুন',
//         content: 'কমপক্ষে ২০ সেকেন্ড ধরে সাবান ও পানি দিয়ে হাত ধুয়ে নিন। হাতের পিছনে, আঙুলের মাঝে এবং নখের নিচে ভালোভাবে ঘষুন। সাবান না থাকলে অ্যালকোহল-ভিত্তিক স্যানিটাইজার ব্যবহার করুন।'
//       },
//       {
//         id: 'nutrition',
//         category: 'nutrition',
//         title: 'সুষম খাদ্যের মূল বিষয়',
//         description: 'প্রয়োজনীয় পুষ্টি উপাদান এবং স্বাস্থ্যকর খাদ্যাভ্যাস বুঝুন',
//         duration: '৫ মিনিট পড়ুন',
//         content: 'সুষম খাদ্যে ফল, সবজি, পূর্ণ শস্য, প্রোটিন এবং স্বাস্থ্যকর চর্বি থাকে। প্রতিদিন ৫ বার ফল ও সবজি খান। প্রক্রিয়াজাত খাবার, চিনি এবং অতিরিক্ত লবণ সীমিত করুন।'
//       },
//       {
//         id: 'exercise',
//         category: 'prevention',
//         title: 'দৈনিক শারীরিক কার্যকলাপ',
//         description: 'ঘরে বসে করতে পারেন এমন সহজ ব্যায়াম',
//         duration: '৪ মিনিট পড়ুন',
//         content: 'সাপ্তাহিক ১৫০ মিনিট মাঝারি ব্যায়ামের লক্ষ্য রাখুন। হাঁটা, স্ট্রেচিং এবং মৌলিক ব্যায়াম স্বাস্থ্য ভালো রাখতে সাহায্য করে। ধীরে ধীরে শুরু করুন এবং ক্রমশ তীব্রতা বাড়ান।'
//       },
//       {
//         id: 'pregnancy',
//         category: 'maternal',
//         title: 'গর্ভকালীন যত্নের প্রয়োজনীয়তা',
//         description: 'একটি স্বাস্থ্যকর গর্ভাবস্থার জন্য গুরুত্বপূর্ণ পদক্ষেপ',
//         duration: '৬ মিনিট পড়ুন',
//         content: 'নিয়মিত স্বাস্থ্য পরীক্ষা, ফলিক অ্যাসিড সহ সঠিক পুষ্টি, মদ ও ধূমপান পরিহার এবং পর্যাপ্ত বিশ্রাম মা ও শিশুর স্বাস্থ্যের জন্য অত্যাবশ্যক।'
//       }
//     ]
//   }
// };

// const categoryIcons = {
//   prevention: Shield,
//   nutrition: Heart,
//   maternal: Users,
//   hygiene: Activity
// };

// const categoryColors = {
//   prevention: 'bg-blue-100 text-blue-700',
//   nutrition: 'bg-green-100 text-green-700',
//   maternal: 'bg-pink-100 text-pink-700',
//   hygiene: 'bg-purple-100 text-purple-700'
// };

// export function HealthEducation({ language }: HealthEducationProps) {
//   const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
//   const [selectedTopic, setSelectedTopic] = useState<string | null>(null);

//   const t = translations[language];

//   const filteredTopics = selectedCategory 
//     ? t.topics.filter(topic => topic.category === selectedCategory)
//     : t.topics;

//   if (selectedTopic) {
//     const topic = t.topics.find(t => t.id === selectedTopic);
//     if (!topic) return null;

//     return (
//       <div className="space-y-6">
//         <div className="flex items-center space-x-4">
//           <Button 
//             variant="ghost" 
//             onClick={() => setSelectedTopic(null)}
//             className="text-blue-600"
//           >
//             ← Back to topics
//           </Button>
//         </div>

//         <Card>
//           <CardHeader>
//             <div className="flex items-start justify-between">
//               <div>
//                 <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
//                 <p className="text-gray-600">{topic.description}</p>
//                 <Badge variant="secondary" className="mt-2">
//                   {topic.duration}
//                 </Badge>
//               </div>
//             </div>
//           </CardHeader>
//           <CardContent>
//             <div className="prose max-w-none">
//               <p className="text-gray-700 leading-relaxed">{topic.content}</p>
//             </div>
//           </CardContent>
//         </Card>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       <div>
//         <h1 className="text-3xl mb-2">{t.title}</h1>
//         <p className="text-gray-600">{t.subtitle}</p>
//       </div>

//       {/* Category Filter */}
//       <div className="flex flex-wrap gap-3">
//         <Button
//           variant={selectedCategory === null ? "default" : "outline"}
//           onClick={() => setSelectedCategory(null)}
//         >
//           All Topics
//         </Button>
//         {Object.entries(t.categories).map(([key, label]) => {
//           const Icon = categoryIcons[key as keyof typeof categoryIcons];
//           return (
//             <Button
//               key={key}
//               variant={selectedCategory === key ? "default" : "outline"}
//               onClick={() => setSelectedCategory(key)}
//               className="flex items-center space-x-2"
//             >
//               <Icon className="w-4 h-4" />
//               <span>{label}</span>
//             </Button>
//           );
//         })}
//       </div>

//       {/* Topics Grid */}
//       <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredTopics.map((topic) => {
//           const Icon = categoryIcons[topic.category as keyof typeof categoryIcons];
//           const colorClass = categoryColors[topic.category as keyof typeof categoryColors];
          
//           return (
//             <Card 
//               key={topic.id} 
//               className="cursor-pointer hover:shadow-lg transition-shadow"
//               onClick={() => setSelectedTopic(topic.id)}
//             >
//               <CardHeader>
//                 <div className="flex items-center justify-between mb-3">
//                   <div className={`p-2 rounded-lg ${colorClass}`}>
//                     <Icon className="w-5 h-5" />
//                   </div>
//                   <ChevronRight className="w-5 h-5 text-gray-400" />
//                 </div>
//                 <CardTitle className="text-lg">{topic.title}</CardTitle>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
//                 <div className="flex items-center justify-between">
//                   <Badge variant="secondary">{topic.duration}</Badge>
//                   <Badge className={colorClass}>
//                     {t.categories[topic.category as keyof typeof t.categories]}
//                   </Badge>
//                 </div>
//               </CardContent>
//             </Card>
//           );
//         })}
//       </div>

//       {/* Educational Banner */}
//       <Card className="bg-gradient-to-r from-blue-50 to-green-50">
//         <CardContent className="p-6">
//           <div className="grid md:grid-cols-2 gap-6 items-center">
//             <div>
//               <h3 className="text-xl mb-3">Stay Informed, Stay Healthy</h3>
//               <p className="text-gray-600 mb-4">
//                 Regular health education helps prevent diseases and promotes 
//                 community wellness. Share this knowledge with your family and neighbors.
//               </p>
//               <Button>
//                 <Play className="w-4 h-4 mr-2" />
//                 Watch Video Tutorials
//               </Button>
//             </div>
//             <div className="text-center">
//               <ImageWithFallback
//                 src="https://images.unsplash.com/photo-1578307896780-d257213543a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx2YWNjaW5hdGlvbiUyMG1lZGljYWwlMjBoZWFsdGh8ZW58MXx8fHwxNzU3MzQyNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
//                 alt="Health education"
//                 className="rounded-lg w-full h-48 object-cover"
//               />
//             </div>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }




// Updating by gemini for alert fetching -- working properly now
// REPLACE IT WITH THIS LINE:
import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Heart, Shield, Activity, Users, ChevronRight, Play } from 'lucide-react';
// ADD THESE TWO LINES:
import { getEducationTopics, EducationTopic } from '../services/api';
import { Loader2 } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

type Language = 'en' | 'hi' | 'te' | 'bn';

interface HealthEducationProps {
  language: Language;
}

const translations = {
  en: {
    title: 'Health Education',
    subtitle: 'Learn about preventive healthcare and healthy living',
    categories: {
      prevention: 'Prevention',
      nutrition: 'Nutrition', 
      maternal: 'Maternal Health',
      hygiene: 'Hygiene'
    },
    topics: [
      {
        id: 'handwashing',
        category: 'hygiene',
        title: 'Proper Hand Washing',
        description: 'Learn the correct technique to wash hands and prevent infections',
        duration: '3 min read',
        content: 'Wash hands with soap and water for at least 20 seconds. Scrub all surfaces including back of hands, between fingers, and under nails. Use alcohol-based sanitizer when soap is not available.'
      },
      {
        id: 'nutrition',
        category: 'nutrition',
        title: 'Balanced Diet Basics',
        description: 'Understanding essential nutrients and healthy eating habits',
        duration: '5 min read',
        content: 'A balanced diet includes fruits, vegetables, whole grains, proteins, and healthy fats. Eat 5 servings of fruits and vegetables daily. Limit processed foods, sugar, and excessive salt.'
      },
      {
        id: 'exercise',
        category: 'prevention',
        title: 'Daily Physical Activity',
        description: 'Simple exercises you can do at home to stay healthy',
        duration: '4 min read',
        content: 'Aim for 150 minutes of moderate exercise weekly. Walking, stretching, and basic bodyweight exercises help maintain health. Start slowly and gradually increase intensity.'
      },
      {
        id: 'pregnancy',
        category: 'maternal',
        title: 'Prenatal Care Essentials',
        description: 'Important steps for a healthy pregnancy',
        duration: '6 min read',
        content: 'Regular check-ups, proper nutrition with folic acid, avoiding alcohol and smoking, and getting adequate rest are crucial for maternal and baby health.'
      }
    ]
  },
  hi: {
    title: 'स्वास्थ्य शिक्षा',
    subtitle: 'बचाव और स्वस्थ जीवन के बारे में जानें',
    categories: {
      prevention: 'बचाव',
      nutrition: 'पोषण',
      maternal: 'मातृ स्वास्थ्य',
      hygiene: 'स्वच्छता'
    },
    topics: [
      {
        id: 'handwashing',
        category: 'hygiene',
        title: 'सही तरीके से हाथ धोना',
        description: 'हाथ धोने की सही तकनीक सीखें और संक्रमण से बचें',
        duration: '3 मिनट पढ़ें',
        content: 'कम से कम 20 सेकंड तक साबुन और पानी से हाथ धोएं। हाथ की पीठ, उंगलियों के बीच और नाखूनों के नीचे अच्छी तरह रगड़ें।'
      },
      {
        id: 'nutrition',
        category: 'nutrition',
        title: 'संतुलित आहार की बुनियादी बातें',
        description: 'आवश्यक पोषक तत्वों और स्वस्थ खाने की आदतों को समझें',
        duration: '5 मिनट पढ़ें',
        content: 'संतुलित आहार में फल, सब्जियां, साबुत अनाज, प्रोटीन और स्वस्थ वसा शामिल है। रोजाना 5 बार फल और सब्जी खाएं।'
      },
      {
        id: 'exercise',
        category: 'prevention',
        title: 'दैनिक शारीरिक गतिविधि',
        description: 'घर पर कर सकने वाले सरल व्यायाम',
        duration: '4 मिनट पढ़ें',
        content: 'सप्ताह में 150 मिनट मध्यम व्यायाम का लक्ष्य रखें। चलना, स्ट्रेचिंग और बुनियादी व्यायाम स्वास्थ्य बनाए रखने में मदद करते हैं।'
      },
      {
        id: 'pregnancy',
        category: 'maternal',
        title: 'गर्भकालीन देखभाल की आवश्यकताएं',
        description: 'स्वस्थ गर्भावस्था के लिए महत्वपूर्ण कदम',
        duration: '6 मिनट पढ़ें',
        content: 'नियमित जांच, फोलिक एसिड के साथ उचित पोषण, शराब और धूम्रपान से बचना और पर्याप्त आराम मां और बच्चे के स्वास्थ्य के लिए महत्वपूर्ण है।'
      }
    ]
  },
  te: {
    title: 'ఆరోగ్య విద్య',
    subtitle: 'నివారణ ఆరోగ్య సంరక్షణ మరియు ఆరోగ్యకరమైన జీవనం గురించి తెలుసుకోండి',
    categories: {
      prevention: 'నివారణ',
      nutrition: 'పోషణ',
      maternal: 'మాతృ ఆరోగ్యం',
      hygiene: 'పరిశుభ్రత'
    },
    topics: [
      {
        id: 'handwashing',
        category: 'hygiene',
        title: 'సరైన చేతుల కడుక్కోవడం',
        description: 'చేతులు కడుక్కోవడంలో సరైన పద్ధతిని నేర్చుకుని అంటువ్యాధుల నుండి కాపాడుకోండి',
        duration: '3 నిమిషాలు చదవండి',
        content: 'కనీసం 20 సెకన్లపాటు సబ్బు మరియు నీటితో చేతులు కడుక్కోండి। చేతుల వెనుక భాగం, వేళ్ల మధ్య మరియు గోళ్లకింద బాగా రుద్దండి।'
      },
      {
        id: 'nutrition',
        category: 'nutrition',
        title: 'సమతుల్య ఆహార ప్రాథమికాలు',
        description: 'అవసరమైన పోషకాలు మరియు ఆరోగ్యకరమైన ఆహార అలవాట్లను అర్థం చేసుకోండి',
        duration: '5 నిమిషాలు చదవండి',
        content: 'సమతుల్య ఆహారంలో పండ్లు, కూరగాయలు, ధాన్యాలు, ప్రోటీన్లు మరియు ఆరోగ్యకరమైన కొవ్వులు ఉంటాయి।'
      },
      {
        id: 'exercise',
        category: 'prevention',
        title: 'రోజువారీ శారీరక కార్యకలాపాలు',
        description: 'ఇంట్లో చేయగలిగే సరళమైన వ్యాయామాలు',
        duration: '4 నిమిషాలు చదవండి',
        content: 'వారానికి 150 నిమిషాలు మధ్యస్థ వ్యాయామం చేయాలని లక్ష్యం పెట్టుకోండి। నడక, వ్యాయామం ఆరోగ్యాన్ని కాపాడుతాయి।'
      },
      {
        id: 'pregnancy',
        category: 'maternal',
        title: 'గర్భధారణ సమయంలో అవసరమైన సంరక్షణ',
        description: 'ఆరోగ్యకరమైన గర్భధారణకు ముఖ్యమైన దశలు',
        duration: '6 నిమిషాలు చదవండి',
        content: 'క్రమం తప్పకుండా తనిఖీలు, ఫోలిక్ యాసిడ్‌తో సరైన పోషణ, మద్యం మరియు ధూమపానం మానేయడం తల్లి మరియు శిశువు ఆరోగ్యానికి కీలకం.'
      }
    ]
  },
  bn: {
    title: 'স্বাস্থ্য শিক্ষা',
    subtitle: 'প্রতিরোধমূলক স্বাস্থ্যসেবা এবং স্বাস্থ্যকর জীবনযাত্রা সম্পর্কে জানুন',
    categories: {
      prevention: 'প্রতিরোধ',
      nutrition: 'পুষ্টি',
      maternal: 'মাতৃ স্বাস্থ্য',
      hygiene: 'স্বাস্থ্যবিধি'
    },
    topics: [
      {
        id: 'handwashing',
        category: 'hygiene',
        title: 'সঠিক হাত ধোয়ার পদ্ধতি',
        description: 'হাত ধোয়ার সঠিক কৌশল শিখুন এবং সংক্রমণ প্রতিরোধ করুন',
        duration: '৩ মিনিট পড়ুন',
        content: 'কমপক্ষে ২০ সেকেন্ড ধরে সাবান ও পানি দিয়ে হাত ধুয়ে নিন। হাতের পিছনে, আঙুলের মাঝে এবং নখের নিচে ভালোভাবে ঘষুন। সাবান না থাকলে অ্যালকোহল-ভিত্তিক স্যানিটাইজার ব্যবহার করুন।'
      },
      {
        id: 'nutrition',
        category: 'nutrition',
        title: 'সুষম খাদ্যের মূল বিষয়',
        description: 'প্রয়োজনীয় পুষ্টি উপাদান এবং স্বাস্থ্যকর খাদ্যাভ্যাস বুঝুন',
        duration: '৫ মিনিট পড়ুন',
        content: 'সুষম খাদ্যে ফল, সবজি, পূর্ণ শস্য, প্রোটিন এবং স্বাস্থ্যকর চর্বি থাকে। প্রতিদিন ৫ বার ফল ও সবজি খান। প্রক্রিয়াজাত খাবার, চিনি এবং অতিরিক্ত লবণ সীমিত করুন।'
      },
      {
        id: 'exercise',
        category: 'prevention',
        title: 'দৈনিক শারীরিক কার্যকলাপ',
        description: 'ঘরে বসে করতে পারেন এমন সহজ ব্যায়াম',
        duration: '৪ মিনিট পড়ুন',
        content: 'সাপ্তাহিক ১৫০ মিনিট মাঝারি ব্যায়ামের লক্ষ্য রাখুন। হাঁটা, স্ট্রেচিং এবং মৌলিক ব্যায়াম স্বাস্থ্য ভালো রাখতে সাহায্য করে। ধীরে ধীরে শুরু করুন এবং ক্রমশ তীব্রতা বাড়ান।'
      },
      {
        id: 'pregnancy',
        category: 'maternal',
        title: 'গর্ভকালীন যত্নের প্রয়োজনীয়তা',
        description: 'একটি স্বাস্থ্যকর গর্ভাবস্থার জন্য গুরুত্বপূর্ণ পদক্ষেপ',
        duration: '৬ মিনিট পড়ুন',
        content: 'নিয়মিত স্বাস্থ্য পরীক্ষা, ফলিক অ্যাসিড সহ সঠিক পুষ্টি, মদ ও ধূমপান পরিহার এবং পর্যাপ্ত বিশ্রাম মা ও শিশুর স্বাস্থ্যের জন্য অত্যাবশ্যক।'
      }
    ]
  }
};

const categoryIcons = {
  prevention: Shield,
  nutrition: Heart,
  maternal: Users,
  hygiene: Activity
};

const categoryColors = {
  prevention: 'bg-blue-100 text-blue-700',
  nutrition: 'bg-green-100 text-green-700',
  maternal: 'bg-pink-100 text-pink-700',
  hygiene: 'bg-purple-100 text-purple-700'
};

export function HealthEducation({ language }: HealthEducationProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  // ADD THESE TWO LINES:
  const [educationTopics, setEducationTopics] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const t = translations[language];
  // ADD THIS ENTIRE useEffect BLOCK:
  useEffect(() => {
    const fetchAndFormatTopics = async () => {
      setIsLoading(true);
      const apiTopics = await getEducationTopics();

      // This maps the API's category names (e.g., "Maternal Health")
      // to the keys your component uses (e.g., "maternal").
      const categoryMap: { [key: string]: string } = {
        'Prevention': 'prevention',
        'Nutrition': 'nutrition',
        'Maternal Health': 'maternal',
        'Hygiene': 'hygiene'
      };

      // This transforms the API data into the exact structure your component uses.
      const formattedTopics = apiTopics.map(topic => ({
        id: topic.id,
        category: categoryMap[topic.category] || 'prevention',
        title: topic.title,
        description: topic.description,
        duration: topic.readTime,
        content: `${topic.description}. More detailed information will be available here.` // Placeholder content
      }));

      setEducationTopics(formattedTopics);
      setIsLoading(false);
    };

    fetchAndFormatTopics();
  }, [language]); // Re-fetch if language changes (optional, but good practice)

  // REPLACE IT WITH THIS LINE:
  const filteredTopics = selectedCategory
    ? educationTopics.filter(topic => topic.category === selectedCategory)
    : educationTopics;

  if (selectedTopic) {
    const topic = educationTopics.find(t => t.id === selectedTopic);
    if (!topic) return null;
    // ADD THIS CODE BLOCK:
  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-96">
        <Loader2 className="w-10 h-10 animate-spin text-blue-600" />
      </div>
    );
  }
    return (
      <div className="space-y-6">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => setSelectedTopic(null)}
            className="text-blue-600"
          >
            ← Back to topics
          </Button>
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-2xl mb-2">{topic.title}</CardTitle>
                <p className="text-gray-600">{topic.description}</p>
                <Badge variant="secondary" className="mt-2">
                  {topic.duration}
                </Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed">{topic.content}</p>
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

      {/* Category Filter */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant={selectedCategory === null ? "default" : "outline"}
          onClick={() => setSelectedCategory(null)}
        >
          All Topics
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

      {/* Topics Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const Icon = categoryIcons[topic.category as keyof typeof categoryIcons];
          const colorClass = categoryColors[topic.category as keyof typeof categoryColors];
          
          return (
            <Card 
              key={topic.id} 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setSelectedTopic(topic.id)}
            >
              <CardHeader>
                <div className="flex items-center justify-between mb-3">
                  <div className={`p-2 rounded-lg ${colorClass}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <CardTitle className="text-lg">{topic.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 text-sm mb-3">{topic.description}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">{topic.duration}</Badge>
                  <Badge className={colorClass}>
                    {t.categories[topic.category as keyof typeof t.categories]}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Educational Banner */}
      <Card className="bg-gradient-to-r from-blue-50 to-green-50">
        <CardContent className="p-6">
          <div className="grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 className="text-xl mb-3">Stay Informed, Stay Healthy</h3>
              <p className="text-gray-600 mb-4">
                Regular health education helps prevent diseases and promotes 
                community wellness. Share this knowledge with your family and neighbors.
              </p>
              <Button>
                <Play className="w-4 h-4 mr-2" />
                Watch Video Tutorials
              </Button>
            </div>
            <div className="text-center">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1578307896780-d257213543a8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHx2YWNjaW5hdGlvbiUyMG1lZGljYWwlMjBoZWFsdGh8ZW58MXx8fHwxNzU3MzQyNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Health education"
                className="rounded-lg w-full h-48 object-cover"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}