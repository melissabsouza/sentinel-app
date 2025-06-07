export type Address = {
  id: number;
  street: string;
  number: number;
  district: string;
  city: string;
  state: string;
  cep: string;
};

export type Contact = {
  id: number;
  email: string;
  phone: string;
};

export type Shelter = {
  id: number;
  name: string;
  totalCapacity: number;
  currentCapacity: number;
  availableResources: string;
  status: "OPEN" | "CLOSED" | "UNKNOWN";
  lastUpdate: string;
  address: Address;
  contact: Contact;
  userEmail: string;
};

export type ShelterFormValues = Omit<
  Shelter,
  "id" | "lastUpdate"
> & {
  address: Omit<Address, "id">;
  contact: Omit<Contact, "id">;
};

export type ShelterCreateInput = Omit<
  Shelter,
  "id" | "lastUpdate"
>;
