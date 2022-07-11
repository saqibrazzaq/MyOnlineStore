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
        public async Task<IActionResult> FindAll([FromQuery] FindAllCompaniesRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _companyService.FindAll(dto);
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
        public async Task<IActionResult> FindByCompanyId(Guid companyId, [FromQuery]FindByCompanyIdRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _companyService.FindByCompanyId(companyId, dto);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Create([FromBody] CreateCompanyRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _companyService.Create(dto);
            return CreatedAtAction(nameof(FindByCompanyId), new { res.CompanyId }, res);
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
        public async Task<IActionResult> Delete(Guid companyId, [FromQuery] DeleteCompanyRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _companyService.Delete(companyId, dto);
            return NoContent();
        }
    }
}
