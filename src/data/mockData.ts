import { Framework, ProcessStep, DPIA, RiskAssessment } from '../types';

export const frameworks: Framework[] = [
  {
    id: 'gdpr',
    name: 'GDPR',
    description: 'General Data Protection Regulation',
    category: 'Privacy',
  },
  {
    id: 'iso27001',
    name: 'ISO 27001',
    description: 'Information Security Management',
    category: 'Security',
  },
  {
    id: 'ropa',
    name: 'RoPA',
    description: 'Record of Processing Activities',
    category: 'Privacy',
  },
  {
    id: 'soc2',
    name: 'SOC 2',
    description: 'Service Organization Control 2',
    category: 'Security',
  },
  {
    id: 'hipaa',
    name: 'HIPAA',
    description: 'Health Insurance Portability and Accountability Act',
    category: 'Healthcare',
  },
  {
    id: 'ccpa',
    name: 'CCPA',
    description: 'California Consumer Privacy Act',
    category: 'Privacy',
  },
];

export const processSteps: ProcessStep[] = [
  {
    id: 'step1',
    title: 'Data Mapping Assessment',
    description: 'Identify and catalog all personal data processing activities',
    status: 'completed',
    required: true,
    hasDocument: true,
    documentType: 'Data Flow Diagram',
  },
  {
    id: 'step2',
    title: 'Privacy Policy Review',
    description: 'Review and update privacy policy for GDPR compliance',
    status: 'completed',
    required: true,
    hasDocument: true,
    documentType: 'Privacy Policy',
  },
  {
    id: 'step3',
    title: 'Records of Processing Activities (RoPA)',
    description: 'Create comprehensive RoPA documentation',
    status: 'in-progress',
    required: true,
    hasDocument: false,
    documentType: 'RoPA Document',
  },
  {
    id: 'step4',
    title: 'Data Protection Impact Assessment',
    description: 'Conduct DPIA for high-risk processing activities',
    status: 'pending',
    required: true,
    hasDocument: false,
    documentType: 'DPIA Report',
  },
  {
    id: 'step5',
    title: 'Vendor Risk Assessment',
    description: 'Assess and document third-party data processing risks',
    status: 'pending',
    required: true,
    hasDocument: false,
    documentType: 'Vendor Assessment',
  },
];

export const dpiaList: DPIA[] = [
  {
    id: 'dpia1',
    title: 'Customer Data Processing System',
    lastUpdated: '2024-12-15',
    status: 'current',
    riskLevel: 'medium',
    dueDate: '2025-06-15',
  },
  {
    id: 'dpia2',
    title: 'Employee HR Data Management',
    lastUpdated: '2024-11-20',
    status: 'overdue',
    riskLevel: 'high',
    dueDate: '2024-12-20',
  },
  {
    id: 'dpia3',
    title: 'Marketing Analytics Platform',
    lastUpdated: '2024-10-10',
    status: 'overdue',
    riskLevel: 'low',
    dueDate: '2024-12-01',
  },
  {
    id: 'dpia4',
    title: 'Cloud Storage Migration',
    lastUpdated: 'N/A',
    status: 'missing',
    riskLevel: 'high',
    dueDate: '2025-01-31',
  },
];

export const riskAssessments: RiskAssessment[] = [
  {
    id: 'risk1',
    category: 'Data Storage',
    description: 'Personal data stored in cloud databases without encryption',
    aiScore: 'High',
    dpoScore: 'Medium',
    lastModified: '2024-12-18',
    notes: 'Encryption implementation in progress',
  },
  {
    id: 'risk2',
    category: 'Data Transfer',
    description: 'International data transfers to non-adequate countries',
    aiScore: 'Medium',
    lastModified: '2024-12-17',
  },
  {
    id: 'risk3',
    category: 'Access Control',
    description: 'Insufficient role-based access controls for sensitive data',
    aiScore: 'High',
    dpoScore: 'High',
    lastModified: '2024-12-16',
    notes: 'Critical - requires immediate attention',
  },
  {
    id: 'risk4',
    category: 'Data Retention',
    description: 'Unclear data retention policies for customer information',
    aiScore: 'Low',
    dpoScore: 'Medium',
    lastModified: '2024-12-15',
    notes: 'Policy update scheduled for Q1 2025',
  },
  {
    id: 'risk5',
    category: 'Vendor Management',
    description: 'Third-party processors not adequately assessed',
    aiScore: 'Medium',
    lastModified: '2024-12-14',
  },
];