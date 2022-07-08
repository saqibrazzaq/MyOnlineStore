import AccountIdParameters from "../HrRequestParameters";

export default class UpdateCompanyRequestParams extends AccountIdParameters {
  name?: string;
  address1?: string;
  address2?: string;
  cityId?: string;

  constructor (accountId?: string, name?: string, address1?: string,
    address2?: string, cityId?: string) {
    super(accountId);

    this.name = name;
    this.address1 = address1;
    this.address2 = address2;
    this.cityId = cityId;
  }
}