import AccountIdParameters from "../HrRequestParameters";

export default class FindByCompanyIdRequestParams extends AccountIdParameters {
  constructor(accountId?: string) {
    super(accountId);
  }
}