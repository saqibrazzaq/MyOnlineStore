import { string } from "yup";

export default interface BranchDetailResponseDto {
  branchId?: string;
  name?: string;
  address1?: string;
  address2?: string;
  companyId?: string;
  companyName?: string;
  cityId?: string;
  departmentCount: number;
}