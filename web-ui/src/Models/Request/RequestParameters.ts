import AccountIdParameters from "../Hr/HrRequestParameters";

export default class PagedRequestParameters extends AccountIdParameters {
  pageNumber?: number;
  pageSize?: number;
  orderBy?: string;

  constructor(
    pageNumber?: number,
    pageSize?: number,
    orderBy?: string,
    accountId?: string
  ) {
    super(accountId);

    this.pageNumber = pageNumber;
    this.pageSize = pageSize;
    this.orderBy = orderBy;
  }
}
