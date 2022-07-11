
export default class UpdateCompanyRequestParams {
  name?: string;
  address1?: string;
  address2?: string;
  cityId?: string;

  constructor (name?: string, address1?: string,
    address2?: string, cityId?: string) {
    
    this.name = name;
    this.address1 = address1;
    this.address2 = address2;
    this.cityId = cityId;
  }
}