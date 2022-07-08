export default class CitySearchRequestParams {
  stateId?: string;
  cityId?: string;
  searchText?: string;

  constructor(stateId?: string, cityId?: string, searchText?: string) {
    this.stateId = stateId;
    this.cityId = cityId;
    this.searchText = searchText;
  }
}