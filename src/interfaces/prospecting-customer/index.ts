import { OrganizationInterface } from 'interfaces/organization';
import { GetQueryInterface } from 'interfaces';

export interface ProspectingCustomerInterface {
  id?: string;
  persona: string;
  company: string;
  industry: string;
  organization_id: string;
  created_at?: any;
  updated_at?: any;

  organization?: OrganizationInterface;
  _count?: {};
}

export interface ProspectingCustomerGetQueryInterface extends GetQueryInterface {
  id?: string;
  persona?: string;
  company?: string;
  industry?: string;
  organization_id?: string;
}
