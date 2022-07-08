import { useEffect, useState } from "react";
import Select from "react-select";
import citiesApi from "../../Api/citiesApi";
import StateSearchRequestParams from "../../Models/Cities/State/StateSearchRequestParams";

const StateDropdown = ({
  countryId,
  handleChange,
  isDisabled,
  selectedState,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadStates = () => {
    const searchParams = new StateSearchRequestParams(
      countryId,
      "",
      inputValue
    );
    if (countryId) {
      setIsLoading(true);
      citiesApi
        .get("States/search", {
          params: searchParams,
        })
        .then((res) => {
          setItems(res.data.pagedList);
          // console.log("state search api called. " + selectedState);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadStates();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue, countryId]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };

  return (
    <div>
      <Select
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.stateId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select state..."
        isDisabled={isDisabled}
        value={selectedState}
        isLoading={isLoading}
      ></Select>
    </div>
  );
};

export default StateDropdown;
