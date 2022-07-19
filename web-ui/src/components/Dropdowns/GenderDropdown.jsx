import { useEffect, useState } from "react";
import Select from "react-select";
import useAxiosAuth from "../../hooks/useAxiosAuth";

const GenderDropdown = ({handleChange, selectedGender}) => {
  const axiosPrivate = useAxiosAuth();
  const [inputValue, setInputValue] = useState("");
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadGenders = () => {
    setIsLoading(true);
    axiosPrivate
      .get("Genders")
      .then((res) => {
        setItems(res.data);
      })
      .catch((err) => {
        console.log(err);
      }).finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      loadGenders();
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
        getOptionValue={(e) => e.genderCode}
        options={items}
        onChange={handleChange}
        onInputChange={handleInputChange}
        isClearable={true}
        placeholder="Select gender..."
        isLoading={isLoading}
        value={selectedGender}
      ></Select>
    </div>
  );
}

export default GenderDropdown