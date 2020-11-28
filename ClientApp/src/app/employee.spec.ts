import { Employee } from './employee';

describe('Employee', () => {
  it('should create an instance', () => {
    const emp = {
      id: 1,
      firstName: 'dger',
      lastName: 'dger',
      address1: 'dger',
      address2: 'dger',
      city: 'dger',
      state: 'dger',
      zipCode: 'dger',
      role: 'dger',
      department: 'dger',
      skillSets: 'dger',
      dateOfBirth: '1/2/2020',
      dateOfJoining: '1/2/2020',
      isActive:  true
    }
    expect(new Employee(
      emp.id,
      emp.firstName,
      emp.lastName,
      emp.address1,
      emp.address2,
      emp.city,
      emp.state,
      emp.zipCode,
      emp.role,
      emp.department,
      emp.skillSets,
      emp. dateOfBirth,
      emp. dateOfJoining,
      emp.isActive
      )).toBeTruthy();
  });
});
