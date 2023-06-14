import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface MeetingInterface {
  id?: string;
  customer_id: string;
  sales_team_member_id: string;
  date_time: any;
  created_at?: any;
  updated_at?: any;

  user_meeting_customer_idTouser?: UserInterface;
  user_meeting_sales_team_member_idTouser?: UserInterface;
  _count?: {};
}

export interface MeetingGetQueryInterface extends GetQueryInterface {
  id?: string;
  customer_id?: string;
  sales_team_member_id?: string;
}
