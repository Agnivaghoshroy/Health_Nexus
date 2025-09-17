// import React, { useState, useRef, useEffect } from 'react';
// import { Button } from './ui/button';
// import { Input } from './ui/input';
// import { Card } from './ui/card';
// import { Send, Bot, User, Loader2, Mic, MicOff, Paperclip, File, Image, X } from 'lucide-react';

// type Language = 'en' | 'hi' | 'te' | 'bn';

// interface Message {
//   id: string;
//   text: string;
//   isBot: boolean;
//   timestamp: Date;
//   attachments?: {
//     type: 'file' | 'image' | 'audio';
//     name: string;
//     url?: string;
//   }[];
// }

// interface ChatInterfaceProps {
//   language: Language;
// }

// const translations = {
//   en: {
//     welcome: "Hello! I'm your health assistant. Ask me about symptoms, preventive care, vaccinations, or any health concerns.",
//     placeholder: "Ask about symptoms, vaccines, health tips...",
//     send: "Send",
//     typing: "Health Assistant is typing...",
//     startRecording: "Start recording",
//     stopRecording: "Stop recording",
//     recording: "Recording...",
//     attachFile: "Attach file",
//     attachImage: "Attach image",
//     commonQuestions: [
//       "What are COVID-19 symptoms?",
//       "When should I get vaccinated?",
//       "How to prevent malaria?",
//       "What to do for fever?"
//     ]
//   },
//   hi: {
//     welcome: "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। मुझसे लक्षण, बचाव, टीकाकरण या किसी भी स्वास्थ्य समस्या के बारे में पूछें।",
//     placeholder: "लक्षण, टीके, स्वास्थ्य सुझाव के बारे में पूछें...",
//     send: "भेजें",
//     typing: "स्वास्थ्य सहायक टाइप कर रहा है...",
//     startRecording: "रिकॉर्डिंग शुरू करें",
//     stopRecording: "रिकॉर्डिंग बंद करें",
//     recording: "रिकॉर्ड हो रहा है...",
//     attachFile: "फ़ाइल संलग्न करें",
//     attachImage: "चित्र संलग्न करें",
//     commonQuestions: [
//       "कोविड-19 के लक्षण क्या हैं?",
//       "मुझे कब टीका लगवाना चाहिए?",
//       "मलेरिया से कैसे बचें?",
//       "बुखार में क्या करें?"
//     ]
//   },
//   te: {
//     welcome: "నమస్కారం! నేను మీ ఆరోగ్య సహాయకుడిని। లక్షణాలు, నివారణ, టీకాలు లేదా ఏదైనా ఆరోగ్య సమస్యల గురించి నన్ను అడగండి।",
//     placeholder: "లక్షణాలు, టీకాలు, ఆరోగ్య చిట్కాల గురించి అడగండి...",
//     send: "పంపండి",
//     typing: "ఆరోగ్య సహాయకుడు టైప్ చేస్తున్నాడు...",
//     startRecording: "రికార్డింగ్ ప్రారంభించండి",
//     stopRecording: "రికార్డింగ్ ఆపండి",
//     recording: "రికార్డ్ చేస్తోంది...",
//     attachFile: "ఫైల్ జోడించండి",
//     attachImage: "చిత్రం జోడించండి",
//     commonQuestions: [
//       "కోవిడ్-19 లక్షణాలు ఏమిటి?",
//       "నేను ఎప్పుడు టీకా వేయించుకోవాలి?",
//       "మలేరియా నుండి ఎలా కాపాడుకోవాలి?",
//       "జ్వరం వచ్చినప్పుడు ఏం చేయాలి?"
//     ]
//   },
//   bn: {
//     welcome: "নমস্কার! আমি আপনার স্বাস্থ্য সহায়ক। লক্ষণ, প্রতিরোধ, টিকা বা যেকোনো স্বাস্থ্য সমস্যা সম্পর্কে আমাকে জিজ্ঞাসা করুন।",
//     placeholder: "লক্ষণ, টিকা, স্বাস্থ্য টিপস সম্পর্কে জিজ্ঞাসা করুন...",
//     send: "পাঠান",
//     typing: "স্বাস্থ্য সহায়ক টাইপ করছে...",
//     startRecording: "রেকর্ডিং শুরু করুন",
//     stopRecording: "রেকর্ডিং বন্ধ করুন",
//     recording: "রেকর্ড হচ্ছে...",
//     attachFile: "ফাইল সংযুক্ত করুন",
//     attachImage: "ছবি সংযুক্ত করুন",
//     commonQuestions: [
//       "কোভিড-19 এর লক্ষণগুলি কী?",
//       "কখন আমার টিকা নেওয়া উচিত?",
//       "ম্যালেরিয়া থেকে কীভাবে রক্ষা পাব?",
//       "জ্বর হলে কী করব?"
//     ]
//   }
// };

// // Mock AI responses with health information
// const mockResponses = {
//   en: {
//     fever: "For fever: 1) Rest and drink plenty of fluids 2) Use fever-reducing medication if needed 3) See a doctor if fever persists over 3 days or is very high 4) Monitor for other symptoms like difficulty breathing or severe headache.",
//     covid: "COVID-19 symptoms include: fever, cough, shortness of breath, loss of taste/smell, fatigue, body aches. If you have symptoms, isolate immediately and get tested. Severe symptoms require immediate medical attention.",
//     malaria: "Prevent malaria by: 1) Using bed nets 2) Wearing long sleeves at dusk/dawn 3) Using repellent 4) Removing standing water 5) Getting prompt treatment for fever in malaria areas.",
//     vaccination: "Vaccination schedules vary by age. For adults: annual flu shots, COVID boosters as recommended, tetanus every 10 years. Consult your local health center for personalized advice.",
//     default: "I understand your concern. For specific medical advice, please consult with a qualified healthcare provider. I can provide general health information and preventive care tips."
//   },
//   hi: {
//     fever: "बुखार के लिए: 1) आराम करें और खूब पानी पिएं 2) जरूरत पड़ने पर बुखार कम करने की दवा लें 3) यदि बुखार 3 दिन से अधिक रहे या बहुत तेज हो तो डॉक्टर से मिलें 4) सांस लेने में दिक्कत या तेज सिरदर्द जैसे अन्य लक्षणों पर नजर रखें।",
//     covid: "कोविड-19 के लक्षण: बुखार, खांसी, सांस लेने में दिक्कत, स्वाद/गंध का चले जाना, थकान, शरीर में दर्द। लक्षण होने पर तुरंत अलग रहें और टेस्ट कराएं।",
//     malaria: "मलेरिया से बचाव: 1) मच्छरदानी का इस्तेमाल 2) शाम/सुबह फुल बाजू के कपड़े पहनें 3) मच्छर भगाने वाली क्रीम लगाएं 4) रुका हुआ पानी हटाएं।",
//     vaccination: "टीकाकरण उम्र के अनुसार अलग होता है। वयस्कों के लिए: सालाना फ्लू का टीका, कोविड बूस्टर। स्थानीय स्वास्थ्य केंद्र से सलाह लें।",
//     default: "मैं आपकी चिंता समझता हूं। विशिष्ट चिकित्सा सलाह के लिए योग्य डॉक्टर से मिलें। मैं सामान्य स्वास्थ्य जानकारी प्रदान कर सकता हूं।"
//   },
//   te: {
//     fever: "జ్వరానికి: 1) విశ్రాంతి తీసుకోండి మరియు చాలా నీళ్లు త్రాగండి 2) అవసరమైతే జ్వరం తగ్గించే మందులు వాడండి 3) జ్వరం 3 రోజులకు మించి ఉంటే లేదా చాలా ఎక్కువగా ఉంటే వైద్యుడిని కలవండి।",
//     covid: "కోవిడ్-19 లక్షణాలు: జ్వరం, దగ్గు, ఊపిరి ఆడకపోవడం, రుచి/వాసన పోవడం, అలసట, శరీర నొప్పులు। లక్షణాలు ఉంటే వెంటనే వేరుగా ఉండి పరీక్ష చేయించుకోండి।",
//     malaria: "మలేరియా నివారణ: 1) దోమల వలలు వాడండి 2) సాయంత్రం/తెల్లవారుజామున పూర్తి చేతుల దుస్తులు వేసుకోండి 3) దోమల నివారిణి వాడండి।",
//     vaccination: "టీకాల షెడ్యూల్ వయస్సు బట్టి మారుతుంది. పెద్దలకు: వార్షిక ఫ్లూ షాట్లు, కోవిడ్ బూస్టర్లు. వ్యక్తిగత సలహా కోసం స్థానిక ఆరోగ్య కేంద్రాన్ని సంప్రదించండి।",
//     default: "మీ ఆందోళన అర్థమైంది. నిర్దిష్ట వైద్య సలహా కోసం అర్హత కలిగిన వైద్యుడిని సంప్రదించండి. నేను సాధారణ ఆరోగ్య సమాచారం అందించగలను।"
//   },
//   bn: {
//     fever: "জ্বরের জন্য: ১) বিশ্রাম নিন এবং প্রচুর পানি পান করুন ২) প্রয়োজনে জ্বর কমানোর ওষুধ খান ৩) জ্বর ৩ দিনের বেশি থাকলে বা খুব বেশি হলে ডাক্তার দেখান ৪) শ্বাসকষ্ট বা তীব্র মাথাব্যথার মতো অন্যান্য লক্ষণের দিকে নজর রাখুন।",
//     covid: "কোভিড-১৯ এর লক্ষণসমূহ: জ্বর, কাশি, শ্বাসকষ্ট, স্বাদ/গন্ধ চলে যাওয়া, ক্লান্তি, শরীরে ব্যথা। লক্ষণ থাকলে তৎক্ষণাৎ আলাদা থাকুন এবং পরীক্ষা করান।",
//     malaria: "ম্যালেরিয়া প্রতিরোধ: ১) মশারি ব্যবহার করুন ২) সন্ধ্যা/ভোরে পূর্ণ হাতার কাপড় পরুন ৩) মশা তাড়ানোর ক্রিম ব্যবহার করুন ৪) জমে থাকা পানি সরান।",
//     vaccination: "টিকার সময়সূচী বয়স অনুযায়ী আলাদা হয়। প্রাপ্তবয়স্কদের জন্য: বার্ষিক ফ্লু টিকা, কোভিড বুস্টার। ব্যক্তিগত পরামর্শের জন্য স্থানীয় স্বাস্থ্য কেন্দ্রে যোগাযোগ করুন।",
//     default: "আমি আপনার উদ্বেগ বুঝতে পারছি। নির্দিষ্ট চিকিৎসা পরামর্শের জন্য যোগ্য ডাক্তারের সাথে পরামর্শ করুন। আমি সাধারণ স্বাস্থ্য তথ্য প্রদান করতে পারি।"
//   }
// };

// export function ChatInterface({ language }: ChatInterfaceProps) {
//   const [messages, setMessages] = useState<Message[]>([]);
//   const [inputText, setInputText] = useState('');
//   const [isTyping, setIsTyping] = useState(false);
//   const [isRecording, setIsRecording] = useState(false);
//   const [attachments, setAttachments] = useState<{type: 'file' | 'image' | 'audio'; name: string; url?: string}[]>([]);
//   const messagesEndRef = useRef<HTMLDivElement>(null);
//   const fileInputRef = useRef<HTMLInputElement>(null);
//   const imageInputRef = useRef<HTMLInputElement>(null);

//   const t = translations[language];

//   useEffect(() => {
//     // Add welcome message
//     setMessages([{
//       id: '1',
//       text: t.welcome,
//       isBot: true,
//       timestamp: new Date()
//     }]);
//   }, [language, t.welcome]);

//   useEffect(() => {
//     // Only auto-scroll if user is near the bottom to avoid disrupting manual scrolling
//     const messagesContainer = messagesEndRef.current?.parentElement;
//     if (messagesContainer) {
//       const isNearBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 100;
//       if (isNearBottom) {
//         messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
//       }
//     }
//   }, [messages]);

//   const getResponse = (userMessage: string): string => {
//     const message = userMessage.toLowerCase();
//     const responses = mockResponses[language] || mockResponses.en;

//     if (message.includes('fever') || message.includes('জ্বর') || message.includes('बुखार') || message.includes('జ్వరం')) {
//       return responses.fever;
//     }
//     if (message.includes('covid') || message.includes('কোভিড') || message.includes('कोविड') || message.includes('కోవిడ్')) {
//       return responses.covid;
//     }
//     if (message.includes('malaria') || message.includes('ম্যালেরিয়া') || message.includes('मलेरिया') || message.includes('మలేরియా')) {
//       return responses.malaria;
//     }
//     if (message.includes('vaccin') || message.includes('টিকা') || message.includes('टीका') || message.includes('టీకా')) {
//       return responses.vaccination;
//     }
    
//     return responses.default;
//   };

//   const handleSend = async () => {
//     if (!inputText.trim() && attachments.length === 0) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       text: inputText || (attachments.length > 0 ? `Sent ${attachments.length} attachment(s)` : ''),
//       isBot: false,
//       timestamp: new Date(),
//       attachments: attachments.length > 0 ? [...attachments] : undefined
//     };

//     setMessages(prev => [...prev, userMessage]);
//     setInputText('');
//     setAttachments([]);
//     setIsTyping(true);

//     // Simulate AI response delay
//     setTimeout(() => {
//       const botResponse: Message = {
//         id: (Date.now() + 1).toString(),
//         text: attachments.length > 0 
//           ? "I've received your file(s). For medical images or documents, please consult with a healthcare professional for proper analysis. I can provide general health information and guidance."
//           : getResponse(inputText),
//         isBot: true,
//         timestamp: new Date()
//       };

//       setMessages(prev => [...prev, botResponse]);
//       setIsTyping(false);
//     }, 1500);
//   };

//   const startRecording = () => {
//     setIsRecording(true);
//     // In a real implementation, you would start audio recording here
//     // For now, we'll simulate recording for 3 seconds
//     setTimeout(() => {
//       setIsRecording(false);
//       setInputText(t.recording.replace('...', '') + ' [Voice message recorded]');
//     }, 3000);
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//     // In a real implementation, you would stop audio recording here
//   };

//   const handleFileAttachment = (type: 'file' | 'image') => {
//     const input = type === 'file' ? fileInputRef.current : imageInputRef.current;
//     input?.click();
//   };

//   const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
//     const files = event.target.files;
//     if (files) {
//       const newAttachments = Array.from(files).map(file => ({
//         type,
//         name: file.name,
//         url: URL.createObjectURL(file)
//       }));
//       setAttachments(prev => [...prev, ...newAttachments]);
//     }
//   };

//   const removeAttachment = (index: number) => {
//     setAttachments(prev => prev.filter((_, i) => i !== index));
//   };

//   const handleQuestionClick = (question: string) => {
//     setInputText(question);
//   };

//   return (
//     <Card className="h-[calc(100vh-200px)] min-h-[500px] max-h-[800px] flex flex-col">
//       {/* Chat Header */}
//       <div className="p-4 border-b border-gray-200 bg-blue-50">
//         <div className="flex items-center space-x-3">
//           <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
//             <Bot className="w-6 h-6 text-white" />
//           </div>
//           <div>
//             <h3 className="font-semibold text-gray-900">Health Assistant</h3>
//             <p className="text-sm text-gray-600">Available 24/7</p>
//           </div>
//         </div>
//       </div>

//       {/* Messages */}
//       <div className="flex-1 overflow-y-auto p-4 space-y-4">
//         {messages.map((message) => (
//           <div
//             key={message.id}
//             className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
//           >
//             <div className={`flex items-start space-x-2 max-w-xs md:max-w-md lg:max-w-lg ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
//               <div className={`w-8 h-8 rounded-full flex items-center justify-center ${message.isBot ? 'bg-blue-100' : 'bg-gray-100'}`}>
//                 {message.isBot ? (
//                   <Bot className="w-4 h-4 text-blue-600" />
//                 ) : (
//                   <User className="w-4 h-4 text-gray-600" />
//                 )}
//               </div>
//               <div
//                 className={`px-4 py-2 rounded-lg ${
//                   message.isBot
//                     ? 'bg-gray-100 text-gray-900'
//                     : 'bg-blue-600 text-white'
//                 }`}
//               >
//                 <p className="text-sm">{message.text}</p>
                
//                 {/* Attachments */}
//                 {message.attachments && message.attachments.length > 0 && (
//                   <div className="mt-2 space-y-1">
//                     {message.attachments.map((attachment, index) => (
//                       <div key={index} className="flex items-center space-x-2 p-2 bg-white/10 rounded">
//                         {attachment.type === 'image' ? (
//                           <Image className="w-4 h-4" />
//                         ) : (
//                           <File className="w-4 h-4" />
//                         )}
//                         <span className="text-xs">{attachment.name}</span>
//                       </div>
//                     ))}
//                   </div>
//                 )}
                
//                 <p className={`text-xs mt-1 ${message.isBot ? 'text-gray-500' : 'text-blue-100'}`}>
//                   {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                 </p>
//               </div>
//             </div>
//           </div>
//         ))}

//         {isTyping && (
//           <div className="flex justify-start">
//             <div className="flex items-center space-x-2">
//               <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
//                 <Bot className="w-4 h-4 text-blue-600" />
//               </div>
//               <div className="bg-gray-100 px-4 py-2 rounded-lg">
//                 <div className="flex items-center space-x-1">
//                   <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
//                   <span className="text-sm text-gray-500">{t.typing}</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}

//         <div ref={messagesEndRef} />
//       </div>

//       {/* Quick Questions */}
//       {messages.length <= 1 && (
//         <div className="p-4 border-t border-gray-200 bg-gray-50">
//           <p className="text-sm text-gray-600 mb-2">Common questions:</p>
//           <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
//             {t.commonQuestions.map((question, index) => (
//               <Button
//                 key={index}
//                 variant="outline"
//                 size="sm"
//                 className="text-left h-auto p-2 justify-start"
//                 onClick={() => handleQuestionClick(question)}
//               >
//                 {question}
//               </Button>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Attachment Preview */}
//       {attachments.length > 0 && (
//         <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
//           <div className="flex flex-wrap gap-2">
//             {attachments.map((attachment, index) => (
//               <div key={index} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border">
//                 {attachment.type === 'image' ? (
//                   <Image className="w-4 h-4" />
//                 ) : (
//                   <File className="w-4 h-4" />
//                 )}
//                 <span className="text-sm">{attachment.name}</span>
//                 <Button
//                   variant="ghost"
//                   size="sm"
//                   onClick={() => removeAttachment(index)}
//                   className="h-auto p-0 w-4 h-4 text-gray-500 hover:text-red-500"
//                 >
//                   <X className="w-3 h-3" />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}

//       {/* Input */}
//       <div className="p-4 border-t border-gray-200">
//         <div className="flex items-end space-x-2">
//           {/* File Input (Hidden) */}
//           <input
//             ref={fileInputRef}
//             type="file"
//             className="hidden"
//             accept=".pdf,.doc,.docx,.txt"
//             onChange={(e) => handleFileSelect(e, 'file')}
//             multiple
//           />
//           <input
//             ref={imageInputRef}
//             type="file"
//             className="hidden"
//             accept="image/*"
//             onChange={(e) => handleFileSelect(e, 'image')}
//             multiple
//           />

//           {/* Attachment Buttons */}
//           <div className="flex space-x-1">
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => handleFileAttachment('file')}
//               title={t.attachFile}
//               className="p-2"
//             >
//               <Paperclip className="w-4 h-4" />
//             </Button>
//             <Button
//               variant="ghost"
//               size="sm"
//               onClick={() => handleFileAttachment('image')}
//               title={t.attachImage}
//               className="p-2"
//             >
//               <Image className="w-4 h-4" />
//             </Button>
//           </div>

//           {/* Text Input */}
//           <Input
//             value={inputText}
//             onChange={(e) => setInputText(e.target.value)}
//             placeholder={isRecording ? t.recording : t.placeholder}
//             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
//             className="flex-1"
//             disabled={isRecording}
//           />

//           {/* Audio Recording Button */}
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={isRecording ? stopRecording : startRecording}
//             title={isRecording ? t.stopRecording : t.startRecording}
//             className={`p-2 ${isRecording ? 'text-red-500 animate-pulse' : ''}`}
//           >
//             {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
//           </Button>

//           {/* Send Button */}
//           <Button 
//             onClick={handleSend} 
//             disabled={!inputText.trim() && attachments.length === 0 && !isRecording}
//           >
//             <Send className="w-4 h-4" />
//             <span className="sr-only">{t.send}</span>
//           </Button>
//         </div>
//       </div>
//     </Card>
//   );
// }


import React, { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Send, Bot, User, Loader2, Mic, MicOff, Paperclip, File, Image, X } from 'lucide-react';

// --- MODIFICATION 1: IMPORT THE REAL API SERVICE ---
// We are now importing the function that will call your backend.
import { getRagResponse, RagApiResponse } from '../services/api';

type Language = 'en' | 'hi' | 'te' | 'bn';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
  attachments?: {
    type: 'file' | 'image' | 'audio';
    name: string;
    url?: string;
  }[];
  // --- MODIFICATION 2: ADD 'source' TO THE MESSAGE STRUCTURE ---
  // This will hold the source document information from the API response.
  source?: RagApiResponse['source'];
}

interface ChatInterfaceProps {
  language: Language;
}

const translations = {
  en: {
    welcome: "Hello! I'm your health assistant. Ask me about symptoms, preventive care, vaccinations, or any health concerns.",
    placeholder: "Ask about symptoms, vaccines, health tips...",
    send: "Send",
    typing: "Health Assistant is typing...",
    startRecording: "Start recording",
    stopRecording: "Stop recording",
    recording: "Recording...",
    attachFile: "Attach file",
    attachImage: "Attach image",
    commonQuestions: [
      "What are COVID-19 symptoms?",
      "When should I get vaccinated?",
      "How to prevent malaria?",
      "What to do for fever?"
    ]
  },
  // ... other translations remain the same
  hi: {
    welcome: "नमस्ते! मैं आपका स्वास्थ्य सहायक हूँ। मुझसे लक्षण, बचाव, टीकाकरण या किसी भी स्वास्थ्य समस्या के बारे में पूछें।",
    placeholder: "लक्षण, टीके, स्वास्थ्य सुझाव के बारे में पूछें...",
    send: "भेजें",
    typing: "स्वास्थ्य सहायक टाइप कर रहा है...",
    startRecording: "रिकॉर्डिंग शुरू करें",
    stopRecording: "रिकॉर्डिंग बंद करें",
    recording: "रिकॉर्ड हो रहा है...",
    attachFile: "फ़ाइल संलग्न करें",
    attachImage: "चित्र संलग्न करें",
    commonQuestions: [
      "कोविड-19 के लक्षण क्या हैं?",
      "मुझे कब टीका लगवाना चाहिए?",
      "मलेरिया से कैसे बचें?",
      "बुखार में क्या करें?"
    ]
  },
  te: {
    welcome: "నమస్కారం! నేను మీ ఆరోగ్య సహాయకుడిని। లక్షణాలు, నివారణ, టీకాలు లేదా ఏదైనా ఆరోగ్య సమస్యల గురించి నన్ను అడగండి।",
    placeholder: "లక్షణాలు, టీకాలు, ఆరోగ్య చిట్కాల గురించి అడగండి...",
    send: "పంపండి",
    typing: "ఆరోగ్య సహాయకుడు టైప్ చేస్తున్నాడు...",
    startRecording: "రికార్డింగ్ ప్రారంభించండి",
    stopRecording: "రికార్డింగ్ ఆపండి",
    recording: "రికార్డ్ చేస్తోంది...",
    attachFile: "ఫైల్ జోడించండి",
    attachImage: "చిత్రం జోడించండి",
    commonQuestions: [
      "కోవిడ్-19 లక్షణాలు ఏమిటి?",
      "నేను ఎప్పుడు టీకా వేయించుకోవాలి?",
      "మలేరియా నుండి ఎలా కాపాడుకోవాలి?",
      "జ్వరం వచ్చినప్పుడు ఏం చేయాలి?"
    ]
  },
  bn: {
    welcome: "নমস্কার! আমি আপনার স্বাস্থ্য সহায়ক। লক্ষণ, প্রতিরোধ, টিকা বা যেকোনো স্বাস্থ্য সমস্যা সম্পর্কে আমাকে জিজ্ঞাসা করুন।",
    placeholder: "লক্ষণ, টিকা, স্বাস্থ্য টিপস সম্পর্কে জিজ্ঞাসা করুন...",
    send: "পাঠান",
    typing: "স্বাস্থ্য সহায়ক টাইপ করছে...",
    startRecording: "রেকর্ডিং শুরু করুন",
    stopRecording: "রেকর্ডিং বন্ধ করুন",
    recording: "রেকর্ড হচ্ছে...",
    attachFile: "ফাইল সংযুক্ত করুন",
    attachImage: "ছবি সংযুক্ত করুন",
    commonQuestions: [
      "কোভিড-19 এর লক্ষণগুলি কী?",
      "কখন আমার টিকা নেওয়া উচিত?",
      "ম্যালেরিয়া থেকে কীভাবে রক্ষা পাব?",
      "জ্বর হলে কী করব?"
    ]
  }
};

// --- MODIFICATION 3: REMOVE MOCK AI RESPONSES ---
// We are deleting the 'mockResponses' and 'getResponse' function
// because we will now get real answers from the API.

export function ChatInterface({ language }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [attachments, setAttachments] = useState<{type: 'file' | 'image' | 'audio'; name: string; url?: string}[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);

  const t = translations[language];

  useEffect(() => {
    setMessages([{
      id: '1',
      text: t.welcome,
      isBot: true,
      timestamp: new Date()
    }]);
  }, [language, t.welcome]);

  useEffect(() => {
    const messagesContainer = messagesEndRef.current?.parentElement;
    if (messagesContainer) {
      const isNearBottom = messagesContainer.scrollTop + messagesContainer.clientHeight >= messagesContainer.scrollHeight - 100;
      if (isNearBottom) {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [messages]);

  // --- MODIFICATION 4: REWRITE 'handleSend' TO USE THE API ---
  const handleSend = async () => {
    const currentInput = inputText.trim();
    if (!currentInput && attachments.length === 0) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: currentInput || `Sent ${attachments.length} attachment(s)`,
      isBot: false,
      timestamp: new Date(),
      attachments: attachments.length > 0 ? [...attachments] : undefined
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setAttachments([]);
    setIsTyping(true);

    let botResponseData: RagApiResponse;

    if (attachments.length > 0) {
      // Handle attachment case without calling the RAG API
      botResponseData = {
        answer: "I've received your file(s). For medical images or documents, please consult with a healthcare professional for analysis. I can provide general health information.",
        source: { document: "System Message", url: "#" }
      };
    } else {
      // Call the real API for a text query
      botResponseData = await getRagResponse(currentInput);
    }
    
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponseData.answer,
      isBot: true,
      timestamp: new Date(),
      source: botResponseData.source, // Store the source
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };
  
  // --- MODIFICATION 5: REWRITE 'handleQuestionClick' FOR DIRECT API CALL ---
  const handleQuestionClick = async (question: string) => {
    if (isTyping) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: question,
      isBot: false,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsTyping(true);

    const botResponseData = await getRagResponse(question);
    
    const botResponse: Message = {
      id: (Date.now() + 1).toString(),
      text: botResponseData.answer,
      isBot: true,
      timestamp: new Date(),
      source: botResponseData.source,
    };

    setMessages(prev => [...prev, botResponse]);
    setIsTyping(false);
  };

  const startRecording = () => {
    setIsRecording(true);
    setTimeout(() => {
      setIsRecording(false);
      setInputText(t.recording.replace('...', '') + ' [Voice message recorded]');
    }, 3000);
  };

  const stopRecording = () => {
    setIsRecording(false);
  };

  const handleFileAttachment = (type: 'file' | 'image') => {
    const input = type === 'file' ? fileInputRef.current : imageInputRef.current;
    input?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>, type: 'file' | 'image') => {
    const files = event.target.files;
    if (files) {
      const newAttachments = Array.from(files).map(file => ({
        type,
        name: file.name,
        url: URL.createObjectURL(file)
      }));
      setAttachments(prev => [...prev, ...newAttachments]);
    }
  };

  const removeAttachment = (index: number) => {
    setAttachments(prev => prev.filter((_, i) => i !== index));
  };
  
  return (
    <Card className="h-[calc(100vh-200px)] min-h-[500px] max-h-[800px] flex flex-col">
      {/* Chat Header */}
      <div className="p-4 border-b border-gray-200 bg-blue-50">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
            <Bot className="w-6 h-6 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">Health Assistant</h3>
            <p className="text-sm text-gray-600">Available 24/7</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div className={`flex items-start space-x-2 max-w-xs md:max-w-md lg:max-w-lg ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${message.isBot ? 'bg-blue-100' : 'bg-gray-100'}`}>
                {message.isBot ? (
                  <Bot className="w-4 h-4 text-blue-600" />
                ) : (
                  <User className="w-4 h-4 text-gray-600" />
                )}
              </div>
              <div
                className={`px-4 py-2 rounded-lg ${
                  message.isBot
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-blue-600 text-white'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                
                {/* Attachments */}
                {message.attachments && message.attachments.length > 0 && (
                  <div className="mt-2 space-y-1">
                    {message.attachments.map((attachment, index) => (
                      <div key={index} className="flex items-center space-x-2 p-2 bg-black/10 rounded">
                        {attachment.type === 'image' && attachment.url ? (
                           <img src={attachment.url} alt={attachment.name} className="w-8 h-8 object-cover rounded"/>
                        ) : (
                          attachment.type === 'image' ? <Image className="w-4 h-4" /> : <File className="w-4 h-4" />
                        )}
                        <span className="text-xs truncate">{attachment.name}</span>
                      </div>
                    ))}
                  </div>
                )}

                {/* --- MODIFICATION 6: RENDER THE SOURCE CARD --- */}
                {message.isBot && message.source && message.source.document !== "System Error" && (
                  <div className={`mt-2 pt-2 text-xs ${message.isBot ? 'border-t border-gray-300' : 'border-t border-blue-400'}`}>
                    <strong>Source:</strong>{' '}
                    <a 
                      href={message.source.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className={`underline ${message.isBot ? 'text-blue-700 hover:text-blue-800' : 'text-blue-100 hover:text-white'}`}
                    >
                      {message.source.document}
                    </a>
                  </div>
                )}
                
                <p className={`text-xs mt-1 opacity-70 ${message.isBot ? 'text-gray-600' : 'text-blue-100'}`}>
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4 text-blue-600" />
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-lg">
                <div className="flex items-center space-x-1">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
                  <span className="text-sm text-gray-500">{t.typing}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      {messages.length <= 1 && (
        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <p className="text-sm text-gray-600 mb-2">Common questions:</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {t.commonQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                className="text-left h-auto p-2 justify-start"
                onClick={() => handleQuestionClick(question)}
              >
                {question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Attachment Preview */}
      {attachments.length > 0 && (
        <div className="px-4 py-2 border-t border-gray-200 bg-gray-50">
          <div className="flex flex-wrap gap-2">
            {attachments.map((attachment, index) => (
              <div key={index} className="flex items-center space-x-2 bg-white px-3 py-2 rounded-lg border">
                {attachment.type === 'image' ? (
                  <Image className="w-4 h-4" />
                ) : (
                  <File className="w-4 h-4" />
                )}
                <span className="text-sm">{attachment.name}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeAttachment(index)}
                  className="h-auto p-0 w-4 h-4 text-gray-500 hover:text-red-500"
                >
                  <X className="w-3 h-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex items-end space-x-2">
          <input ref={fileInputRef} type="file" className="hidden" accept=".pdf,.doc,.docx,.txt" onChange={(e) => handleFileSelect(e, 'file')} multiple />
          <input ref={imageInputRef} type="file" className="hidden" accept="image/*" onChange={(e) => handleFileSelect(e, 'image')} multiple />

          <div className="flex space-x-1">
            <Button variant="ghost" size="sm" onClick={() => handleFileAttachment('file')} title={t.attachFile} className="p-2">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm" onClick={() => handleFileAttachment('image')} title={t.attachImage} className="p-2">
              <Image className="w-4 h-4" />
            </Button>
          </div>

          <Input
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder={isRecording ? t.recording : t.placeholder}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1"
            disabled={isRecording}
          />

          <Button variant="ghost" size="sm" onClick={isRecording ? stopRecording : startRecording} title={isRecording ? t.stopRecording : t.startRecording} className={`p-2 ${isRecording ? 'text-red-500 animate-pulse' : ''}`}>
            {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
          </Button>

          <Button 
            onClick={handleSend} 
            disabled={(!inputText.trim() && attachments.length === 0) || isTyping}
          >
            <Send className="w-4 h-4" />
            <span className="sr-only">{t.send}</span>
          </Button>
        </div>
      </div>
    </Card>
  );
}