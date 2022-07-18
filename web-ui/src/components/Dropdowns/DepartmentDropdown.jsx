import { useEffect, useState } from "react";
import Select from "react-select";
import useAxiosAuth from "../../hooks/useAxiosAuth";
import SearchDepartmentsRequestParams from "../../Models/Hr/Department/SearchDepartmentsRequestParams";
import Common from "../../utility/Common";

const DepartmentDropdown = ({ branchId, handleChange, selectedDepartment }) => {
  const axiosPrivate = useAxiosAuth();
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadDepartments = () => {
    if (branchId) {
      setIsLoading(true);
      axiosPrivate
        .get("Departments/search", {
          params: new SearchDepartmentsRequestParams(
            branchId,
            "",
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
      loadDepartments();
    }, 1000);

    return () => clearTimeout(timer);
  }, [inputValue, branchId]);

  const handleInputChange = (newValue) => {
    setInputValue(newValue);
  };
  return (
    <Select
      getOptionLabel={(e) => e.name}
      getOptionValue={(e) => e.departmentId}
      options={items}
      onChange={handleChange}
      onInputChange={handleInputChange}
      isClearable={true}
      placeholder="Select department..."
      isLoading={isLoading}
      value={selectedDepartment}
    ></Select>
  );
}

export default DepartmentDropdown