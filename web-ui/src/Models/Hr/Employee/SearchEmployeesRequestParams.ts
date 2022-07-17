import PagedRequestParameters from "../../Request/RequestParameters";

export default class SearchEmployeesRequestParams extends PagedRequestParameters {
  searchText?: string;
  companyId?: string;
  branchId?: string;
  departmentId?: string;
  designationId?: string;
  countryId?: string;
  stateId?: string;
  cityId?: string;
  minAge?: number;
  maxAge?: number;

  constructor(
    searchText?: string,
    companyId?: string,
    branchId?: string,
    departmentId?: string,
    designationId?: string,
    countryId?: string,
    stateId?: string,
    cityId?: string,
    minAge?: number,
    maxAge?: number,
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string
  ) {
    super(pageNumber, pageSize, orderBy);
    
    this.searchText = searchText;
    this.companyId = companyId;
    this.branchId = branchId;
    this.departmentId = departmentId;
    this.designationId = designationId;
    this.countryId = countryId;
    this.stateId = stateId;
    this.cityId = cityId;
    this.minAge = minAge;
    this.maxAge = maxAge;
  }
}
