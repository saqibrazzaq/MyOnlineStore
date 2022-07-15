export default class UpdateDepartmentRequestParams {
  name?: string;
  branchId?: string;

  constructor(
    name?: string,
    companyId?: string
  ) {
    this.name = name;
    this.branchId = companyId;
  }
}
