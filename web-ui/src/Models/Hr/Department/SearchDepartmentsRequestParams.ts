import PagedRequestParameters from "../../Request/RequestParameters";

export default class SearchDepartmentsRequestParams extends PagedRequestParameters {
  searchText?: string;
  branchId?: string;

  constructor(
    branchId?: string,
    searchText?: string,
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string
  ) {
    super(pageNumber, pageSize, orderBy);
    this.searchText = searchText;
    this.branchId = branchId;
  }
}
