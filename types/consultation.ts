export interface Consultation {
  id?: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  createdAt: number;
  status: 'pending' | 'contacted' | 'completed';
}
