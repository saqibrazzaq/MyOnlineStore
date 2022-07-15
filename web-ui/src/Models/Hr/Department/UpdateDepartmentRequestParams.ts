export default class UpdateDepartmentRequestParams {
  name?: string;
  branchId?: string;

  constructor(
    branchId?: string,
    name?: string
  ) {
    this.name = name;
    this.branchId = branchId;
  }
}
