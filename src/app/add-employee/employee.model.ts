export interface Employee {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    age: number;
    contactNumber: string;
    dob: string;
    profession: string;
    hobbies?: string[];
    additionalContacts?: string[];
  }
  