using auth.Services;
using Common.ActionFilters;
using Common.Utility;
using hr.Dtos.Employee;
using hr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class EmployeesController : ControllerBase
    {
        private readonly IEmployeeService _employeeService;
        private readonly IUserService _userService;
        public EmployeesController(IEmployeeService employeeService, 
            IUserService userService)
        {
            _employeeService = employeeService;
            _userService = userService;
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Search([FromQuery] SearchEmployeeRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _employeeService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{employeeId}", Name = "FindByEmployeeId")]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> FindByEmployeeId(Guid employeeId,
            [FromQuery] FindByEmployeeIdRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _employeeService.FindByEmployeeId(employeeId, dto);
            return Ok(res);
        }

        [HttpPost]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof (ValidationFilterAttribute))]
        public async Task<IActionResult> Create ([FromBody] CreateEmployeeRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _employeeService.Create(dto);
            return CreatedAtAction(nameof(FindByEmployeeId), new { res.EmployeeId }, res);
        }

        [HttpPut("{employeeId}")]
        [Authorize(Roles =Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Update (Guid employeeId, [FromBody] UpdateEmployeeRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _employeeService.Update(employeeId, dto);
            return NoContent();
        }

        [HttpDelete("{employeeId}")]
        [Authorize (Roles = Constants.AllAdminRoles)]
        [ServiceFilter (typeof (ValidationFilterAttribute))]
        public async Task<IActionResult> Delete (Guid employeeId, [FromQuery] DeleteEmployeeRequestDto dto)
        {
            dto.AccountId = ( await _userService.GetLoggedInUser()).AccountId;
            _employeeService.Delete(employeeId, dto);
            return NoContent() ;
        }
    }
}
