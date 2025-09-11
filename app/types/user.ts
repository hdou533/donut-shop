export interface User {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  phone?: string;
  streetAddress?: string;
  postalCode?: string;
  city?: string;
  country?: string;
  admin?: boolean;
}

export interface UserProfile {
  name: string;
  email: string;
  admin: boolean;
  phone?: string;
  streetAddress?: string;
  city?: string;
  postalCode?: string;
  country?: string;
}
