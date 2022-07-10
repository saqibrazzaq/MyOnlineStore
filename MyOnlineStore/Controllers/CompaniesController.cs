using auth.Dtos.User;
using auth.Services;
using Common.ActionFilters;
using Common.Models.Request;
using Common.Utility;
using hr.Dtos.Company;
using hr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CompaniesController : ControllerBase
    {
        private readonly ICompanyService _companyService;
        private readonly IUserService _userService;
        
        public CompaniesController(ICompanyService companyService, 
            IUserService userService)
        {
            _companyService = companyService;
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> FindAll(FindAllCompaniesRequestDto dto)
        {
            var userDto = await _userService.GetLoggedInUser();
            var res = _companyService.FindAll(new FindAllCompaniesRequestDto(userDto.AccountId));
            return Ok(res);
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Search([FromQuery] SearchCompaniesRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _companyService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{companyId}", Name = "FindByCompanyId")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> FindByCompanyId(Guid companyId)
        {
            var userDto = await _userService.GetLoggedInUser();
            var res = _companyService.FindByCompanyId(companyId, 
                new FindByCompanyIdRequestDto(userDto.AccountId));
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Create([FromBody] CreateCompanyRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _companyService.Create(dto);
            return CreatedAtAction(nameof(FindByCompanyId), new { res.CompanyId, res.AccountId }, res);
        }

        [HttpPut("{companyId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Update(Guid companyId, [FromBody] UpdateCompanyRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _companyService.Update(companyId, dto);
            return NoContent();
        }

        [HttpDelete("{companyId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Delete(Guid companyId, DeleteCompanyRequestDto dto)
        {
            var accountDto = await _userService.GetLoggedInUser();
            _companyService.Delete(companyId, new DeleteCompanyRequestDto(accountDto.AccountId));
            return NoContent();
        }
    }
}
