export interface IEmployeeApi {
  id: number;
  firstName: string;
  lastName: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zipCode: string;
  role: string;
  department: string;
  skillSets: string;
  dateOfBirth: string;
  dateOfJoining: string;
  isActive: boolean;
}

export interface IEmployee{
  ID: number;
  Name: string;
  Address: string;
  Role: string;
  Department: string;
  SkillSets: string;
  DateOfBirth: string;
  DateOfJoining: string;
  IsActiveDisplay: string;
};
