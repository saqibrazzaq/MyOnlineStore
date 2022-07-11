import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  Button,
  Container,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  Link,
  Spacer,
  Stack,
  Text,
} from "@chakra-ui/react";
import * as Yup from "yup";
import ErrorDetails from "../../../Models/Error/ErrorDetails";
import { Link as RouteLink, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Field, Formik } from "formik";
import SubmitButton from "../../../components/Buttons/SubmitButton";
import BackButton from "../../../components/Buttons/BackButton";
import CityResponseDto from "../../../Models/Cities/City/CityResponseDto";
import CityStateCountryDropdown from "../../../components/Dropdowns/CityStateCountryDropdown";
import CityDetailResponseDto from "../../../Models/Cities/City/CityDetailResponseDto";
import useAxiosAuth from "../../../hooks/useAxiosAuth";
import UpdateBranchRequestParams from "../../../Models/Hr/Branch/UpdateBranchRequestParams";

const AdminUpdateBranch = () => {
  const [selectedCity, setSelectedCity] = useState<CityDetailResponseDto>();
  const [cityId, setCityId] = useState<string>();

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const axiosPrivate = useAxiosAuth();
  const navigate = useNavigate();
  let params = useParams();
  const branchId = params.branchId;
  const updateText = branchId ? "Update Branch" : "Create branch";
  const [branchData, setbranchData] = useState(
    new UpdateBranchRequestParams("", "", "", "", "")
  );

  return (
    <div>AdminUpdateBranch</div>
  )
}

export default AdminUpdateBranch