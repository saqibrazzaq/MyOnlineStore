import PagedRequestParameters from "../../Request/RequestParameters";

export default class SearchBranchesRequestParams extends PagedRequestParameters {
  searchText?: string;
  companyId?: string;

  constructor(
    companyId?: string,
    searchText?: string,
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string
  ) {
    super(pageNumber, pageSize, orderBy);
    this.searchText = searchText;
    this.companyId = companyId;
  }
}
