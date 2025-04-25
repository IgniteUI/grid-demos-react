export interface Employee {
  id: number;
  name: string;
  jobTitle: string;
  department: string;
  location: string;
  country: string;
  grossSalary: number;
  phone: string;
  contacts: string;
  picture: string;
  age: number;
  hireDate: string;
  employees: Employee[];
}
