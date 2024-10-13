
export interface Auth {
  UserName: string;
  Email: string;
  Password: string;
  TaxId: string;
}

export interface UserCheck {
  Email: string;
  TaxId: string;
}