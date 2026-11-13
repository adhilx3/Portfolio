import type { FlagshipProject } from '../data/projects';

export type { FlagshipProject };

export type MilestoneCategory = 'CEH' | 'InfoSec' | 'Tooling' | 'Networking' | 'Labs' | 'Other';
export type MilestoneStatus = 'completed' | 'in-progress' | 'planned';

export interface RoadmapMilestone {
  id: string;
  topic: string;
  category: MilestoneCategory;
  status: MilestoneStatus;
  progressPercent: number;
  detail: string;
  targetDate?: string;
}

export interface PortfolioStats {
  toolsBuilt: number;
  labsCompleted: number;
  domainsMastered: number;
}

export interface DynamicContent {
  version: number;
  lastUpdated: string;
  flagshipProjects: FlagshipProject[];
  roadmap: RoadmapMilestone[];
  stats: PortfolioStats;
}

export interface AdminConfig {
  githubToken?: string;
  repoOwner: string;
  repoName: string;
  branch: string;
  filePath: string;
  pinHash?: string;
}
