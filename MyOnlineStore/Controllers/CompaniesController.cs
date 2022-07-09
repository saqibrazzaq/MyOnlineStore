using Common.ActionFilters;
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

        public CompaniesController(ICompanyService companyService)
        {
            _companyService = companyService;
        }

        [HttpGet]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult FindAll()
        {
            var res = _companyService.FindAll();
            return Ok(res);
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Search([FromQuery] SearchCompaniesRequestDto dto)
        {
            var res = _companyService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{companyId}", Name = "FindByCompanyId")]
        [Authorize(Roles = Constants.AllRoles)]
        public IActionResult FindByCompanyId(Guid companyId)
        {
            var res = _companyService.FindByCompanyId(companyId);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Create([FromBody] CreateCompanyRequestDto dto)
        {
            var res = _companyService.Create(dto);
            return CreatedAtAction(nameof(FindByCompanyId), new { res.CompanyId, res.AccountId }, res);
        }

        [HttpPut("{companyId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Update(Guid companyId, [FromBody] UpdateCompanyRequestDto dto)
        {
            _companyService.Update(companyId, dto);
            return NoContent();
        }

        [HttpDelete("{companyId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public IActionResult Delete(Guid companyId)
        {
            _companyService.Delete(companyId);
            return NoContent();
        }
    }
}
