using auth.Dtos.User;
using Common.Models.Request;
using Common.Models.Response;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace auth.Services
{
    public interface IUserService
    {
        Task<AuthenticationResponseDto> Login(LoginRequestDto dto);
        Task<AuthenticationResponseDto> Register(RegisterRequestDto dto);
        Task RegisterAdmin(RegisterRequestDto dto);
        Task Delete(DeleteUserRequestDto dto);
        Task<TokenDto> RefreshToken(TokenDto dto);
        Task SendVerificationEmail();
        Task VerifyEmail(VerifyEmailRequestDto dto);
        Task SendForgotPasswordEmail(SendForgotPasswordEmailRequestDto dto);
        Task ResetPassword(ResetPasswordRequestDto dto);
        Task ChangePassword(ChangePasswordRequestDto dto);
        ApiOkPagedResponse<IEnumerable<UserResponseDto>, MetaData>
            SearchUsers(SearchUsersRequestDto dto, bool trackChanges);
        Task<UserResponseDto> GetLoggedInUser();
        Task<UserResponseDto> FindByUsername(FindByUsernameRequestDto dto);
        Task UpdateProfilePicture(IFormFile formFile);
    }
}
