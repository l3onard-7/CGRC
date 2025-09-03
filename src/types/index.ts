export interface Framework {
  id: string;
  name: string;
  description: string;
  category: string;
  selected?: boolean;
}

export interface ProcessStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  required: boolean;
  hasDocument?: boolean;
  documentType?: string;
}

export interface DPIA {
  id: string;
  title: string;
  lastUpdated: string;
  status: 'current' | 'overdue' | 'missing';
  riskLevel: 'low' | 'medium' | 'high';
  dueDate: string;
}

export interface RiskAssessment {
  id: string;
  category: string;
  description: string;
  aiScore: 'Low' | 'Medium' | 'High';
  dpoScore?: 'Low' | 'Medium' | 'High';
  lastModified: string;
  notes?: string;
}