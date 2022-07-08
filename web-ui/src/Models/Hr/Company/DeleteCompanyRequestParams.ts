import AccountIdParameters from "../HrRequestParameters";

export default class DeleteCompanyRequestParams extends AccountIdParameters {
  companyId: string;
  constructor(companyId:string, accountId?: string) {
    super(accountId);

    this.companyId = companyId;
  }
}