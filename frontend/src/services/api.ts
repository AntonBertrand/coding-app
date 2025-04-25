const API_BASE_URL = 'http://localhost:5000/api';

export interface Language {
  id: string;
  name: string;
  icon: string;
  progress: number;
  topics: Topic[];
}

export interface Option {
  id: string;
  text: string;
}

export interface Question {
  id: string;
  text: string;
  code?: string;
  options: Option[];
  correctOptionId: string;
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  questions: Question[];
  completedLessons?: string[];
}

export const getLanguages = async (userId?: string): Promise<Language[]> => {
  try {
    const url = userId 
      ? `${API_BASE_URL}/languages?userId=${userId}`
      : `${API_BASE_URL}/languages`;
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching languages:', error);
    throw error;
  }
};

export const getLanguageById = async (id: string, userId: string): Promise<Language> => {
  try {
    const response = await fetch(`${API_BASE_URL}/languages/${id}?userId=${userId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching language:', error);
    throw error;
  }
};

export const getTopicById = async (languageId: string, topicId: string): Promise<Topic> => {
  try {
    const response = await fetch(`${API_BASE_URL}/languages/${languageId}/topics/${topicId}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching topic:', error);
    throw error;
  }
};

export const markLessonComplete = async (
  userId: string,
  languageId: string,
  topicId: string,
  lessonId: string,
  score: number
) => {
  const response = await fetch(`${API_BASE_URL}/progress/${userId}/complete-lesson`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      languageId,
      topicId,
      lessonId,
      score,
    }),
  });

  if (!response.ok) {
    throw new Error('Failed to mark lesson as complete');
  }

  return await response.json();
};

export const getUserProgress = async (userId: string) => {
  const response = await fetch(`${API_BASE_URL}/progress/${userId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch user progress');
  }

  return await response.json();
}; 