export default class AuthenticationResponseDto {
  email?: string;
  roles?: string[];
  accessToken?: string;
  emailConfirmed: boolean = false;
  accountId?: string;
}