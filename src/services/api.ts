// merging api.ts
// src/services/api.ts
import axios from 'axios';

/* ----------------------------------------
   CONFIG: Mock mode toggle & base URLs
   ---------------------------------------- */
// Set to false in env to use real backend:
// Vite:   VITE_USE_MOCK=false
// CRA:    REACT_APP_USE_MOCK=false
const USE_MOCK = (
  (typeof process !== 'undefined' && process.env.REACT_APP_USE_MOCK === 'false' ? false : undefined) ||
  (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_USE_MOCK === 'false' ? false : undefined)
) === false ? false : true;

// ngrok URL used for medgemma (Colab). Keep this pointing to your active ngrok tunnel.
const API_BASE_URL = 'https://cca0e75a2551.ngrok-free.app';

// Render URL for your main backend
const API_BASE_URL_RENDER = 'https://ai-health-chatbot-6jaw.onrender.com';

/* ----------------------------------------
   RAG / medgemma (unchanged behavior)
   ---------------------------------------- */
export interface RagApiResponse {
  answer: string;
  source: { document: string; url: string };
  confidence?: number;
}

export const getRagResponse = async (query: string): Promise<RagApiResponse> => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/v1/medgemma/infer`,
      { question: query, context: '' },
      { headers: { 'ngrok-skip-browser-warning': 'true' } }
    );

    return {
      answer: response.data.answer,
      source: { document: 'Retrieved from Health Knowledge Base', url: '#' },
      confidence: response.data.confidence
    };
  } catch (error) {
    console.error('Error fetching RAG response:', error);
    return {
      answer: "Sorry, I couldn't connect to the health service. Please try again later.",
      source: { document: 'System Error', url: '#' }
    };
  }
};

/* ----------------------------------------
   Vaccination API types & endpoints
   ---------------------------------------- */
export type VaccinationStatus = 'COMPLETED' | 'DUE' | 'OVERDUE' | string;

export interface VaccinationSchedule {
  id: string;
  vaccine: string;
  dueDate?: string;
  status: VaccinationStatus;
  notes?: string;
  age?: string;
}

// Render endpoints
const VACCINATION_SEARCH_URL = `${API_BASE_URL_RENDER}/vaccination/mock`; // change if your path differs
const CREATE_REMINDER_URL = `${API_BASE_URL_RENDER}/reminder`;

/* ----------------------------------------
   Helper: convert backend slots -> grouped shape
   Backend returns: { status: 'ok', slots: [ {date, vaccine, center}, ... ] }
   Frontend expects grouped object: { infant: [], child: [], adult: [], senior: [] }
   ---------------------------------------- */
function transformSlotsToGroups(slots: { date: string; vaccine: string; center?: string }[]) {
  const grouped: Record<string, VaccinationSchedule[]> = { infant: [], child: [], adult: [], senior: [] };
  let idx = 1;

  // Keywords for basic assignment (non-exhaustive; tweak as needed)
  const infantKeywords = ['bcg', 'hepatitis b', 'dpt', 'mmr', 'polio'];
  const childKeywords = ['booster', 'mmr booster', 'dpt booster'];
  const adultKeywords = ['covid', 'influenza', 'tetanus', 'hepatitis']; // includes covid by default -> we apply special rule below
  const seniorKeywords = ['pneumococcal', 'shingles'];

  for (const s of slots || []) {
    const vaccineLower = (s.vaccine || '').toLowerCase();
    const centerLower = (s.center || '').toLowerCase();

    // Default item shape
    const item: VaccinationSchedule = {
      id: `slot-${idx++}`,
      vaccine: s.vaccine,
      dueDate: s.date,
      status: 'DUE',
      notes: s.center ? `Center: ${s.center}` : '',
      age: 'All'
    };

    // --- Special rule for COVID-19: ---
    // If vaccine name includes "covid" then:
    //  - if center includes "community" -> assign to 'infant'
    //  - otherwise -> assign to 'adult'
    //
    // You can change this rule: e.g. base on date, or a separate field returned by backend.
    if (vaccineLower.includes('covid')) {
      if (centerLower.includes('community')) {
        grouped.infant.push(item);
      } else {
        grouped.adult.push(item);
      }
      continue;
    }

    // General keyword matching
    if (infantKeywords.some(k => vaccineLower.includes(k))) {
      grouped.infant.push(item);
    } else if (childKeywords.some(k => vaccineLower.includes(k))) {
      grouped.child.push(item);
    } else if (seniorKeywords.some(k => vaccineLower.includes(k))) {
      grouped.senior.push(item);
    } else if (adultKeywords.some(k => vaccineLower.includes(k))) {
      grouped.adult.push(item);
    } else {
      // fallback: put into adult group
      grouped.adult.push(item);
    }
  }

  return grouped;
}

/* ----------------------------------------
   fetchVaccinationSchedules()
   - returns grouped object used by VaccinationSchedule.tsx
   ---------------------------------------- */
export async function fetchVaccinationSchedules(searchQuery?: string): Promise<Record<string, VaccinationSchedule[]>> {
  if (USE_MOCK) {
    // local UI-friendly mock for dev
    await new Promise((r) => setTimeout(r, 300));
    return {
      infant: [
        { id: 'inf-1', vaccine: 'BCG', dueDate: '2025-01-01', status: 'COMPLETED', notes: 'Given at birth', age: 'At birth' },
        { id: 'inf-2', vaccine: 'Hepatitis B', dueDate: '2025-09-20', status: 'DUE', notes: 'Dose 2', age: '6 weeks' }
      ],
      child: [
        { id: 'ch-1', vaccine: 'DPT Booster', dueDate: '2025-11-15', status: 'DUE', notes: '4-6 years', age: '4-6 years' }
      ],
      adult: [
        { id: 'ad-1', vaccine: 'Influenza', dueDate: '2025-12-01', status: 'DUE', notes: 'Annual', age: 'Adult' }
      ],
      senior: [
        { id: 'sr-1', vaccine: 'Pneumococcal', dueDate: '2026-01-05', status: 'UPCOMING', notes: '65+ years', age: 'Senior' }
      ]
    };
  }

  try {
    const res = await axios.get(VACCINATION_SEARCH_URL, { params: { search: searchQuery } });
    const data = res.data;

    // If backend returns { status, slots: [...] } -> transform to grouped shape
    if (data && Array.isArray(data.slots)) {
      return transformSlotsToGroups(data.slots);
    }

    // If backend already returns grouped shape, just return it
    return data as Record<string, VaccinationSchedule[]>;
  } catch (error) {
    console.error('Error fetching vaccination schedules:', error);
    throw new Error('Could not fetch vaccination schedules');
  }
}

/* ----------------------------------------
   createReminder()
   - maps frontend payload to backend ReminderIn shape:
     backend expects: { user_id, vaccine_name, due_date }
   ---------------------------------------- */
export async function createReminder(payload: { scheduleId?: string; vaccine?: string; date?: string; notes?: string; user_id?: string }) {
  if (USE_MOCK) {
    await new Promise((r) => setTimeout(r, 300));
    return { success: true, id: `mock-reminder-${Date.now()}`, payload };
  }

  // Map to backend fields (per your main.py)
  const body = {
    user_id: payload.user_id ?? '1', // replace with real user id if you have auth
    vaccine_name: payload.vaccine ?? payload.notes ?? 'Unknown Vaccine',
    due_date: payload.date
  };

  try {
    const res = await axios.post(CREATE_REMINDER_URL, body);
    return res.data;
  } catch (error) {
    console.error('Error creating reminder:', error);
    throw new Error('Could not create reminder');
  }
}

// ==================================================================
// --- DAY 5: ALERTS & EDUCATION - NEW CODE STARTS HERE ---
// ==================================================================

/* ----------------------------------------
   Alerts API types & endpoints
   ---------------------------------------- */
export type AlertPriority = 'Critical' | 'High' | 'Medium' | 'Low';
export type AlertCategory = 'Disease Outbreaks' | 'Weather Health' | 'Vaccination' | 'Emergency';

export interface HealthAlert {
  id: string;
  title: string;
  description: string;
  priority: AlertPriority;
  category: AlertCategory;
  location: string;
  timestamp: string; // ISO 8601 date string
  isRead: boolean;
  actionRequired: boolean;
}

const ALERTS_URL = `${API_BASE_URL_RENDER}/alerts`;

export const getHealthAlerts = async (): Promise<HealthAlert[]> => {
    if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        return [
            { id: "alert1", title: "Dengue Outbreak Alert", description: "Increased dengue cases reported in the region. Take preventive measures against mosquito breeding.", priority: "High", category: "Disease Outbreaks", location: "Central District", timestamp: "2025-09-16T10:00:00Z", isRead: false, actionRequired: true },
            { id: "alert2", title: "Heat Wave Warning", description: "Extreme temperatures expected. Stay hydrated and avoid outdoor activities during peak hours.", priority: "Medium", category: "Weather Health", location: "All Districts", timestamp: "2025-09-15T14:30:00Z", isRead: false, actionRequired: false },
            { id: "alert3", title: "Water Contamination Alert", description: "Water supply contamination detected. Boil water before drinking until further notice.", priority: "Critical", category: "Emergency", location: "North District", timestamp: "2025-09-15T09:00:00Z", isRead: true, actionRequired: true },
            { id: "alert4", title: "COVID-19 Booster Campaign", description: "Free COVID-19 booster shots available at local health centers for eligible population.", priority: "Low", category: "Vaccination", location: "Health Centers", timestamp: "2025-09-14T11:00:00Z", isRead: false, actionRequired: true },
        ];
    }
    try {
        const response = await axios.get(ALERTS_URL);
        return response.data.alerts || [];
    } catch (error) {
        console.error("Error fetching health alerts:", error);
        return []; // Return empty array on error so the UI doesn't crash
    }
};

/* ----------------------------------------
   Education API types & endpoints
   ---------------------------------------- */
export type EducationCategory = 'Prevention' | 'Nutrition' | 'Maternal Health' | 'Hygiene';

export interface EducationTopic {
    id: string;
    title: string;
    description: string;
    category: EducationCategory;
    readTime: string; // e.g., "5 min read"
    icon: string; // A string name for an icon, e.g., "HandWashing"
}

const EDUCATION_URL = `${API_BASE_URL_RENDER}/education`;

export const getEducationTopics = async (): Promise<EducationTopic[]> => {
    if (USE_MOCK) {
        await new Promise((r) => setTimeout(r, 300));
        return [
            { id: 'edu1', title: 'Proper Hand Washing', description: 'Learn the correct technique to wash hands and prevent infections.', category: 'Hygiene', readTime: '3 min read', icon: 'HandWashing' },
            { id: 'edu2', title: 'Balanced Diet Basics', description: 'Simple steps for a healthy and balanced diet.', category: 'Nutrition', readTime: '5 min read', icon: 'Diet' },
            { id: 'edu3', title: 'Daily Physical Activity', description: 'Simple exercises you can do at home to stay active.', category: 'Prevention', readTime: '4 min read', icon: 'Activity' },
            { id: 'edu4', title: 'Prenatal Care Essentials', description: 'Important steps for a healthy pregnancy.', category: 'Maternal Health', readTime: '6 min read', icon: 'Maternal' },
        ];
    }
    try {
        const response = await axios.get(EDUCATION_URL);
        return response.data.topics || [];
    } catch (error) {
        console.error("Error fetching education topics:", error);
        return []; // Return empty array on error
    }
};