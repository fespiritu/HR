export class Employee {
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

  constructor(
      id: number,
      firstName: string,
      lastName: string,
      address1: string,
      address2: string,
      city: string,
      state: string,
      zipCode: string,
      role: string,
      department: string,
      skillSets: string,
      dateOfBirth: string,
      dateOfJoining: string,
      isActive: boolean = true)
    {
      this.id = id;
      this.firstName = firstName;
      this.lastName = lastName;
      this.address1 = address1;
      this.address2 = address2;
      this.city = city;
      this.state = state;
      this.zipCode = zipCode;
      this.role = role;
      this.department = department;
      this.skillSets = skillSets;
      this.dateOfBirth = dateOfBirth;
      this.dateOfJoining = dateOfJoining;
      this.isActive = isActive;
    }
}
