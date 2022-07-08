import { useEffect, useState } from "react";
import Select from "react-select";
import citiesApi from "../../Api/citiesApi";
import CitySearchRequestParams from "../../Models/Cities/City/CitySearchRequestParams";

const CityDropdown = ({ stateId, handleChange, isDisabled, selectedCity }) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCities = () => {
    const searchParams = new CitySearchRequestParams(stateId, "", inputValue);
    if (stateId) {
      setIsLoading(true);
      citiesApi
        .get("Cities/search", {
          params: searchParams,
        })
        .then((res) => {
          setItems(res.data.pagedList);
        })
        .catch((err) => {
          console.log(err);
        }).finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCities();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue, stateId]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <Select
      getOptionLabel={(e) => e.name}
      getOptionValue={(e) => e.cityId}
      options={items}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isClearable={true}
      placeholder="Select city..."
      isDisabled={isDisabled}
      value={selectedCity}
      isLoading={isLoading}
    ></Select>
  );
};

export default CityDropdown;
