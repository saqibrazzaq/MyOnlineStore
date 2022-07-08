import PagedRequestParameters from "../../Request/RequestParameters";

export default class SearchCompaniesRequestParams extends PagedRequestParameters {
  searchText?: string;

  constructor(
    searchText?: string,
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string,
    accountId?: string
  ) {
    super(pageNumber, pageSize, orderBy, accountId);
    this.searchText = searchText;
  }
}
