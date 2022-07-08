import axios from "axios";
import Common from "../utility/Common";

export default axios.create({
  baseURL: Common.HR_URL
});