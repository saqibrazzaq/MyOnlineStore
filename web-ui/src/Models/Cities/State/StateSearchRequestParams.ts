export default class StateSearchRequestParams {
  countryId?: string;
  stateId?: string;
  searchText?: string;

  constructor(countryId?: string, stateId?: string, searchText?: string) {
    this.countryId = countryId;
    this.stateId = stateId;
    this.searchText = searchText;
  }
}