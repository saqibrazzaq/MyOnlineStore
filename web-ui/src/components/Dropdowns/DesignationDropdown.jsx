import { useEffect, useState } from "react";
import Select from "react-select";
import useAxiosAuth from "../../hooks/useAxiosAuth";

const DesignationDropdown = ({handleChange, selectedDesignation}) => {
  const axiosPrivate = useAxiosAuth();
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDesignations = () => {
    setIsLoading(true);
    axiosPrivate
      .get("Designations/search", {
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
      loadDesignations();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <Select
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.designationId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select designation..."
        isLoading={isLoading}
        value={selectedDesignation}
      ></Select>
  )
}

export default DesignationDropdown