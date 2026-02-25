export const USER_INFO = {
  name: "Alex Johnson",
  plan: "Insurance Choice Plus PPO",
  memberId: "ABC-123456789",
  deductible: {
    total: 3000,
    current: 1250,
  },
  outOfPocket: {
    total: 6000,
    current: 2400,
  }
};

export const MOCK_CLAIMS = [
  {
    id: "CLM-001",
    provider: "City General Hospital",
    service: "Radiology (MRI Scan)",
    date: "Oct 12, 2023",
    status: "Approved",
    amount: "$1,200.00",
    covered: "$960.00",
    responsibility: "$240.00",
    explanation: "This claim was approved at the standard network rate. Your 20% coinsurance was applied after your deductible."
  },
  {
    id: "CLM-002",
    provider: "Dr. Emily Smith, MD",
    service: "Office Visit - Specialist",
    date: "Oct 15, 2023",
    status: "Partially Covered",
    amount: "$350.00",
    covered: "$200.00",
    responsibility: "$150.00",
    explanation: "This claim was partially covered because the provider's charge exceeded the Maximum Allowable Amount for this service code."
  },
  {
    id: "CLM-003",
    provider: "QuickCare Urgent Center",
    service: "Urgent Care Visit",
    date: "Nov 02, 2023",
    status: "Under Review",
    amount: "$210.00",
    covered: "$0.00",
    responsibility: "$0.00",
    explanation: "This claim is currently being processed and waiting for additional information from the provider."
  },
  {
    id: "CLM-004",
    provider: "Metropolis Dental",
    service: "Teeth Cleaning",
    date: "Nov 10, 2023",
    status: "Denied",
    amount: "$180.00",
    covered: "$0.00",
    responsibility: "$180.00",
    explanation: "This claim was denied because the service provided is not a covered benefit under your current medical plan. Dental services require a separate dental policy."
  }
];
