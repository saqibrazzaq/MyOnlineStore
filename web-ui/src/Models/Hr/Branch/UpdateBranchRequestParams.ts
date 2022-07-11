export default class UpdateBranchRequestParams {
  name?: string;
  address1?: string;
  address2?: string;
  cityId?: string;
  companyId?: string;

  constructor(
    name?: string,
    address1?: string,
    address2?: string,
    cityId?: string,
    companyId?: string
  ) {
    this.name = name;
    this.address1 = address1;
    this.address2 = address2;
    this.cityId = cityId;
    this.companyId = companyId;
  }
}
