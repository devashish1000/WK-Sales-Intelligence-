import { 
  PipelineStage, 
  ForecastData, 
  StalledDeal, 
  EntityLifecycle, 
  RiskScore, 
  RepPerformance, 
  Territory, 
  Insight,
  PartnerDoc,
  LeadStage
} from './types';

export const COLORS = {
  wkBlue: "#0A4C97",
  wkNavy: "#002A4E",
  accentTeal: "#4FD1C5",
  complianceGold: "#F4B400",
  successGreen: "#34A853",
  riskRed: "#E53935",
  neutral: "#F8FAFC"
};

export const PIPELINE_FUNNEL: PipelineStage[] = [
  { stage: "Prospect", count: 120, fill: COLORS.wkNavy },
  { stage: "Qualified", count: 75, fill: COLORS.wkBlue },
  { stage: "Proposal", count: 40, fill: COLORS.accentTeal },
  { stage: "Negotiation", count: 20, fill: COLORS.complianceGold },
  { stage: "Closed Won", count: 12, fill: COLORS.successGreen }
];

export const FORECAST_DATA: ForecastData[] = [
  { month: "Jan", value: 220000 },
  { month: "Feb", value: 245000 },
  { month: "Mar", value: 300000 },
  { month: "Apr", value: 280000 },
  { month: "May", value: 340000 },
  { month: "Jun", value: 390000 }
];

export const STALLED_DEALS: StalledDeal[] = [
  { deal_id: "D-1001", owner: "Alex", inactivity_days: 42, value: 50000 },
  { deal_id: "D-1002", owner: "Jordan", inactivity_days: 55, value: 75000 },
  { deal_id: "D-1005", owner: "Casey", inactivity_days: 35, value: 22000 }
];

export const ENTITY_LIFECYCLE: EntityLifecycle[] = [
  { phase: "Formation", date: "2024-01-12", status: 'completed' },
  { phase: "Initial Filing", date: "2024-01-15", status: 'completed' },
  { phase: "Annual Report Due", date: "2024-05-01", status: 'current' },
  { phase: "Registered Agent Update", date: "2024-09-10", status: 'upcoming' }
];

export const RISK_SCORES: RiskScore[] = [
  { entity: "ABC LLC", risk: 18, missing_docs: 1, deadline: "2024-04-30" },
  { entity: "Ventura Inc", risk: 72, missing_docs: 4, deadline: "2024-03-15" },
  { entity: "Global Trade Co", risk: 45, missing_docs: 2, deadline: "2024-06-01" },
  { entity: "Northstar Systems", risk: 85, missing_docs: 5, deadline: "2024-02-28" }
];

export const REPS: RepPerformance[] = [
  { name: "Alicia", quota: 150000, attainment: 112 },
  { name: "Brian", quota: 140000, attainment: 98 },
  { name: "Celeste", quota: 130000, attainment: 76 },
  { name: "David", quota: 160000, attainment: 105 },
  { name: "Eva", quota: 140000, attainment: 65 }
];

export const TERRITORIES: Territory[] = [
  { region: "Northeast", score: 0.78 },
  { region: "Midwest", score: 0.64 },
  { region: "Southwest", score: 0.55 },
  { region: "West Coast", score: 0.88 },
  { region: "Southeast", score: 0.72 }
];

export const INITIAL_INSIGHTS: Insight[] = [
  { title: "Pipeline Trending Up", description: "Week-over-week pipeline increased 12% driven by mid-market activity.", type: 'positive' },
  { title: "Compliance Risk Rising", description: "Three entities entered 'At Risk' due to missed filings in the Southwest region.", type: 'negative' }
];

export const PARTNER_DOCS: PartnerDoc[] = [
  { id: "DOC-001", title: "Reseller Agreement 2024", type: "Agreement", status: "Approved", lastModified: "2024-03-10" },
  { id: "DOC-002", title: "Q2 Marketing Kit", type: "Marketing", status: "Draft", lastModified: "2024-03-18" },
  { id: "DOC-003", title: "Technical Enablement Guide", type: "Enablement", status: "Review", lastModified: "2024-03-15" }
];

export const DEFAULT_LEAD_STAGES: LeadStage[] = [
  { id: "1", name: "MQL", slaHours: 24, owner: "Marketing" },
  { id: "2", name: "SAL", slaHours: 48, owner: "SDR" },
  { id: "3", name: "SQL", slaHours: 72, owner: "AE" }
];
