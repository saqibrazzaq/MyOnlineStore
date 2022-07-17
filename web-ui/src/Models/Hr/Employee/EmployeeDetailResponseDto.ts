export default interface EmployeeDetailResponseDto {
  employeeId?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  phoneNumber?: string;
  hireData?: Date
  birthDate?: Date
  address1?: string;
  address2?: string;
  cityId?: string;
  departmentId?: string;
  departmentName?: string;
  designationId?: string;
  designationName?: string;
  genderCode?: string;
  genderName?: string;
}