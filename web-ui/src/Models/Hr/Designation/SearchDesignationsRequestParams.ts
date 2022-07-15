import PagedRequestParameters from "../../Request/RequestParameters";

export default class SearchDesignationsRequestParams extends PagedRequestParameters {
  searchText?: string;

  constructor(
    searchText?: string,
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string
  ) {
    super(pageNumber, pageSize, orderBy);
    this.searchText = searchText;
  }
}
