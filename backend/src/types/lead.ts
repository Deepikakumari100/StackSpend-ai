export interface LeadRequest {
  email: string;
  company?: string;
  role?: string;
  teamSize?: number;
}

export interface LeadRecord extends LeadRequest {
  id: string;
  createdAt: string;
}
