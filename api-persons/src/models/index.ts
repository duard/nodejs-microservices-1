export interface Address {
  id: number;
  street: string;
  streetName: string;
  buildingNumber: string;
  city: string;
  zipcode: string;
  country: string;
  county_code: string;
  latitude: number;
  longitude: number;
}

export interface Contact {
  id: number;
  firstname: string;
  lastname: string;
  email: string;
  phone: string;
  birthday: string;
  gender: string;
  address: Address;
  website: string;
  image: string;
}

export interface Person {
  id: number;
  name: string;
  email: string;
  vat: string;
  phone: string;
  country: string;
  addresses: Address[];
  website: string;
  image: string;
  contact: Contact;
}
