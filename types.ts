export interface PipelineStage {
  stage: string;
  count: number;
  fill?: string;
}

export interface ForecastData {
  month: string;
  value: number;
}

export interface StalledDeal {
  deal_id: string;
  owner: string;
  inactivity_days: number;
  value: number;
}

export interface EntityLifecycle {
  phase: string;
  date: string;
  status: 'completed' | 'current' | 'upcoming';
}

export interface RiskScore {
  entity: string;
  risk: number;
  missing_docs: number;
  deadline: string;
}

export interface RepPerformance {
  name: string;
  quota: number;
  attainment: number;
}

export interface Territory {
  region: string;
  score: number; // 0 to 1
}

export interface Insight {
  title: string;
  description: string;
  type: 'positive' | 'negative' | 'neutral';
}

export interface SimulationParams {
  quotaMultiplier: number;
  winRateMultiplier: number;
}

export interface PartnerDoc {
  id: string;
  title: string;
  type: 'Agreement' | 'Enablement' | 'Marketing';
  status: 'Draft' | 'Review' | 'Approved';
  lastModified: string;
}

export interface LeadStage {
  id: string;
  name: string;
  slaHours: number;
  owner: string;
}
