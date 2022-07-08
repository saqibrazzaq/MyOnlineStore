import AccountIdParameters from "../HrRequestParameters";

export default class GetAllCompaniesRequestParameters 
extends AccountIdParameters {
   
  constructor(accountId?:string) {
    super(accountId);
  }
}