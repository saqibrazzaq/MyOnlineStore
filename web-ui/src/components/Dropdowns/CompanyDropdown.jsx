import { useEffect, useState } from "react";
import Select from "react-select";
import useAxiosAuth from "../../hooks/useAxiosAuth";

const CompanyDropdown = ({handleChange, selectedCompany}) => {
  // console.log("selected company: " + selectedCompany?.name);
  const axiosPrivate = useAxiosAuth();
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadBranches = () => {
    setIsLoading(true);
    axiosPrivate
      .get("Companies/search", {
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
      loadBranches();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <Select
        getOptionLabel={(e) => e.name}
        getOptionValue={(e) => e.companyId}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select company..."
        isLoading={isLoading}
        value={selectedCompany}
      ></Select>
  )
}

export default CompanyDropdown