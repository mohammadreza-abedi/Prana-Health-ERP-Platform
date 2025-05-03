export interface User {
  id: number;
  username: string;
  displayName: string;
  avatar?: string;
  level: number;
  xp: number;
  role: 'user' | 'hr' | 'hse' | 'admin';
}

export interface HealthMetric {
  id: number;
  userId: number;
  date: string;
  steps: number;
  sleepHours: number;
  waterIntake: number;
  stressLevel: number;
}

export interface Challenge {
  id: number;
  title: string;
  description: string;
  type: string;
  points: number;
  targetValue: number;
  icon: string;
  duration: number;
}

export interface UserChallenge {
  id: number;
  userId: number;
  challengeId: number;
  startDate: string;
  endDate: string;
  currentValue: number;
  completed: boolean;
  challenge: Challenge;
}

export interface Badge {
  id: number;
  name: string;
  description: string;
  icon: string;
  category: string;
  requirement: string;
}

export interface UserBadge {
  id: number;
  userId: number;
  badgeId: number;
  earnedDate: string;
  badge: Badge;
}

export interface Event {
  id: number;
  title: string;
  description: string;
  startDate: string;
  startTime: string;
  endDate: string;
  endTime: string;
  location: string;
  maxParticipants?: number;
}

export interface Department {
  id: number;
  name: string;
}

export interface OrganizationalMetric {
  id: number;
  departmentId: number;
  date: string;
  participationRate: number;
  healthRiskIndex: number;
  wellBeingScore: number;
  stressManagementIndex: number;
}

export interface LeaderboardEntry {
  id: number;
  displayName: string;
  avatar?: string;
  xp: number;
  level: number;
  department?: string;
  rank?: number;
  previousRank?: number;
  streak?: number;
  badges?: number;
  challengesCompleted?: number;
  title?: string;
}

export interface DepartmentComparison {
  name: string;
  participation: number;
  health: number;
}
