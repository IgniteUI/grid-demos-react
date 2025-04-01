import { EmployeesType } from './employees-type';

export interface Table1TypeHRData {
  ID: number;
  Name: string;
  JobTitle: string;
  Department: string;
  Location: string;
  Country: string;
  GrossSalary: number;
  Phone: string;
  Contacts: string;
  Picture: string;
  Age: number;
  HireDate: Date;
  Employees: EmployeesType[];
}
