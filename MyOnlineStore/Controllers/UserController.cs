using auth.Dtos.User;
using auth.Services;
using Common.ActionFilters;
using Common.Utility;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly IConfiguration _configuration;

        public UserController(IUserService userService,
            IConfiguration configuration)
        {
            _userService = userService;
            _configuration = configuration;
        }

        [HttpPost("login")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Login([FromBody] LoginRequestDto dto)
        {
            var res = await _userService.Login(dto);
            setRefreshTokenCookie(res.RefreshToken);
            return Ok(res);
        }

        [HttpPost("logout")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult Logout()
        {
            setRefreshTokenCookie("");
            return Ok();
        }

        [HttpPost("refresh-token")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RefreshToken(
            [FromBody] TokenDto dto)
        {
            dto.RefreshToken = Request.Cookies[Constants.RefreshTokenCookieName];
            var res = await _userService.RefreshToken(dto);
            setRefreshTokenCookie(res.RefreshToken);

            return Ok(res);
        }

        [HttpPost("register")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Register(
            [FromBody] RegisterRequestDto dto)
        {
            await _userService.Register(dto);
            return Ok();
        }

        [HttpPost("register-admin")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> RegisterAdmin(
            [FromBody] RegisterRequestDto dto)
        {
            await _userService.RegisterAdmin(dto);
            return Ok();
        }

        [HttpDelete("delete-user/{username}")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> DeleteUser(
            string username)
        {
            var userDto = await _userService.GetLoggedInUser();
            await _userService.Delete(new DeleteUserRequestDto(
                username, userDto.AccountId));
            return Ok();
        }

        [HttpGet("send-verification-email")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> SendVerificationEmail()
        {
            await _userService.SendVerificationEmail();
            return Ok("Verification email sent.");
        }

        [HttpPost("verify-email")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailRequestDto dto)
        {
            await _userService.VerifyEmail(dto);
            return Ok();
        }

        [HttpGet("send-forgot-password-email")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> SendForgotPasswordEmail(
            [FromQuery] SendForgotPasswordEmailRequestDto dto)
        {
            await _userService.SendForgotPasswordEmail(dto);
            return Ok();
        }

        [HttpPost("reset-password")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> ResetPassword
            ([FromBody] ResetPasswordRequestDto dto)
        {
            await _userService.ResetPassword(dto);
            return Ok();
        }

        [HttpPost("change-password")]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> ChangePassword(
            [FromBody] ChangePasswordRequestDto dto)
        {
            await _userService.ChangePassword(dto);
            return Ok();
        }

        [HttpGet("search-users")]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> SearchUsers(
            [FromQuery] SearchUsersRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _userService.SearchUsers(
                dto, trackChanges: false);
            return Ok(res);
        }

        [HttpGet("info")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> GetUser()
        {
            var res = await _userService.GetLoggedInUser();
            return Ok(res);
        }

        [HttpPost("update-profile-picture")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> UpdateProfilePicture()
        {
            await _userService.UpdateProfilePicture(Request.Form.Files[0]);
            return NoContent();
        }

        [HttpGet]
        [Authorize(Roles = Constants.AllAdminRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> GetUser(
            [FromQuery] FindByUsernameRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = await _userService.FindByUsername(dto);
            return Ok(res);
        }

        private void setRefreshTokenCookie(string? refreshToken)
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Expires = DateTimeOffset.UtcNow.AddDays(int.Parse(
                    _configuration["JWT:RefreshTokenValidityInDays"])),
                SameSite = SameSiteMode.None,
                Secure = true
            };

            // Delete the refresh token cookie, if no token is passed
            if (string.IsNullOrEmpty(refreshToken))
            {
                Response.Cookies.Delete(Constants.RefreshTokenCookieName);
            }
            else
            {
                // Set the refresh token cookie
                Response.Cookies.Append(Constants.RefreshTokenCookieName,
                    refreshToken, cookieOptions);
            }

        }
    }
}
