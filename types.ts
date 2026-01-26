
import { LucideIcon } from 'lucide-react';

export type UserRole = 'user' | 'admin' | 'super-admin' | 'vendor' | 'government';
export type KYCStatus = 'unregistered' | 'pending' | 'verified' | 'rejected';

export interface User {
  id: string;
  name: string;
  email: string;
  activeRole: UserRole;
  availableRoles: UserRole[];
  avatar: string;
  verified: boolean;
  isApproved: boolean;
  nin?: string;
  phoneNumber?: string;
  address?: string;
  securityTier: 1 | 2 | 3;
  kycStatus: KYCStatus;
  registrationDate?: string;
}

export interface Attraction {
  id: string;
  name: string;
  location: string;
  image: string;
  video?: string;
  rating: number;
  category: 'Heritage' | 'Nature' | 'Museum' | 'Experience' | 'Top Pick';
  description: string;
  ticketPrice: number;
  hasVR: boolean;
  addedBy?: string;
}

export interface Product {
  id: string | number;
  name: string;
  price: string;
  discountPrice?: string;
  vendor: string;
  vendorId: string;
  images: string[];
  description: string;
  category: string;
  rating: number;
  reviews: number;
  stock: number;
  tags?: string[];
  features?: string[];
}

export interface CartItem {
  id: string | number;
  name: string;
  price: string;
  vendor: string;
  image: string;
  quantity: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
  category: 'core' | 'services' | 'admin';
  requiredRoles?: UserRole[];
}

export interface StatCardProps {
  title: string;
  value: string;
  trend?: string;
  trendUp?: boolean;
  icon: LucideIcon;
  color: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  imageUrl?: string;
  timestamp: Date;
  isError?: boolean;
}

export enum AppView {
  LANDING = 'LANDING',
  DASHBOARD = 'DASHBOARD',
  MARKETPLACE = 'MARKETPLACE',
  TRANSPORT = 'TRANSPORT',
  EVENTS = 'EVENTS',
  HEALTH = 'HEALTH',
  WALLET = 'WALLET',
  AI_ASSISTANT = 'AI_ASSISTANT',
  ACCOMMODATION = 'ACCOMMODATION',
  SECURITY = 'SECURITY',
  SPORTS = 'SPORTS',
  UTILITIES = 'UTILITIES',
  AI_AUTOMATION = 'AI_AUTOMATION',
  TOURISM = 'TOURISM',
  GOVERNMENT = 'GOVERNMENT',
  BLOG = 'BLOG',
  APPROVALS = 'APPROVALS'
}
