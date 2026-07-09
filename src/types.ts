import { CountyData, HistoricalYearData, LeaderData } from './data/historyData';

export interface UserSession {
  userId: string;
  email: string;
  displayName: string;
  isVerified: boolean;
  avatar: string;
  savedJourneys: {
    id: string;
    countyId: string;
    year: number;
    savedAt: string;
    notes?: string;
  }[];
  achievements: {
    id: string;
    title: string;
    description: string;
    unlockedAt: string;
    icon: string;
  }[];
  conversationHistory: {
    role: 'user' | 'model';
    text: string;
    timestamp: string;
    yearContext?: number;
  }[];
}

export interface Article {
  id: string;
  title: string;
  category: 'politics' | 'culture' | 'infrastructure' | 'nature';
  content: string;
  yearContext: number;
  tags: string[];
}

export interface FeedbackLog {
  id: string;
  userEmail: string;
  timestamp: string;
  message: string;
}
