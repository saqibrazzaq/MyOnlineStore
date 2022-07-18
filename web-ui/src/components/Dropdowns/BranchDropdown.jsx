import { useEffect, useState } from "react";
import Select from "react-select";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import SearchBranchesRequestParams from "../../Models/Hr/Branch/SearchBranchesRequestParams";
import Common from "../../utility/Common";

const BranchDropdown = ({ companyId, handleChange, selectedBranch }) => {
  const axiosPrivate = useAxiosAuth();
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadBranches = () => {
    if (companyId) {
      setIsLoading(true);
      axiosPrivate
        .get("Branches/search", {
          params: new SearchBranchesRequestParams(
            companyId,
            inputValue,
            1,
            Common.DEFAULT_PAGE_SIZE,
            ""
          ),
        })
        .then((res) => {
          setItems(res.data.pagedList);
        })
        .catch((err) => {
          console.log(err);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      setItems([]);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadBranches();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue, companyId]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <Select
      getOptionLabel={(e) => e.name}
      getOptionValue={(e) => e.branchId}
      options={items}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isClearable={true}
      placeholder="Select branch..."
      isLoading={isLoading}
      value={selectedBranch}
    ></Select>
  );
};

export default BranchDropdown;
