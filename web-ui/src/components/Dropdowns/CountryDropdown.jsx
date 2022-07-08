import { useEffect, useState } from "react";
import Select from "react-select";
import citiesApi from "../../Api/citiesApi";

const CountryDropdown = ({handleChange, selectedCountry}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadCountries = () => {
    setIsLoading(true);
    citiesApi
      .get("Countries/search", {
        params: {
          searchText: inputValue,
        },
      })
      .then((res) => {
        setItems(res.data.pagedList);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadCountries();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <div>
      <Select
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.countryId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select country..."
        isLoading={isLoading}
        value={selectedCountry}
      ></Select>
    </div>
  );
};

export default CountryDropdown;
