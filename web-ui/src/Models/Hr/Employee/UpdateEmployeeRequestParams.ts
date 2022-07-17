export default class UpdateEmployeeRequestParams {
  firstName?: string;
  middleName?: string;
  lastName?: string;
  phoneNumber?: string;
  hireDate?: Date;
  birthDate?: Date;
  address1?: string;
  address2?: string;
  cityId?: string;
  departmentId?: string;
  designationId?: string;
  genderCode?: string;

  constructor(
    firstName?: string,
    middleName?: string,
    lastName?: string,
    phoneNumber?: string,
    hireDate?: Date,
    address1?: string,
    address2?: string,
    cityId?: string,
    departmentId?: string,
    designationId?: string,
    genderCode?: string
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.middleName = middleName;
    this.phoneNumber = phoneNumber;
    this.hireDate = hireDate;
    this.address1 = address1;
    this.address2 = address2;
    this.cityId = cityId;
    this.departmentId = departmentId;
    this.designationId = designationId;
    this.genderCode = genderCode;
  }
}
