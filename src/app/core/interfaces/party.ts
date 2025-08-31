export interface Party {
  id: number;
  address: Address[];
  userid: UserId;
  bank_id: Bank[];
  login_access: boolean;
  name: string;
  company_name: string;
  mobile_no: string;
  telephone_no: string;
  whatsapp_no: string;
  email: string;
  remark: string;
  date_of_birth: string;
  anniversary_date: string;
  gst_type: string;
  gstin: string;
  pan_no: string;
  apply_tds: boolean;
  credit_limit: number;
  opening_balance: number | null;
  opening_balance_type: string;
  membership: string | null;
  is_active: boolean;
  is_creditors: boolean;
  is_debtors: boolean;
  supplier_type: string;
  payment_terms: string;
}

export interface Address {
  id: number;
  address_line_1: string;
  address_line_2: string;
  country: string;
  state: string;
  city: string;
  pincode: number;
  is_active: boolean;
  is_default: boolean;
}

export interface UserId {
  id: number;
  username: string;
  phone_number: string | null;
  user_permissions: any[];
  is_active: boolean;
}

export interface Bank {
  id: number;
  bank_ifsc_code: string;
  bank_name: string;
  branch_name: string;
  account_no: string;
  account_holder_name: string;
  is_active: boolean;
}
