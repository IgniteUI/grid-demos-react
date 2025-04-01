export interface EmployeesType {
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
