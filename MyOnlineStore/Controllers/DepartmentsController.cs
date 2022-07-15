using auth.Services;
using Common.ActionFilters;
using Common.Utility;
using hr.Dtos.Department;
using hr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DepartmentsController : ControllerBase
    {
        private readonly IDepartmentService _deptService;
        private readonly IUserService _userService;

        public DepartmentsController(IDepartmentService deptService, 
            IUserService userService)
        {
            _deptService = deptService;
            _userService = userService;
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Search ([FromQuery] SearchDepartmentRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _deptService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{departmentId}", Name = "FindByDepartmentId")]
        [Authorize(Roles =Constants.AllRoles)]
        public async Task<IActionResult> FindByDepartmentId(Guid departmentId, 
            [FromQuery] FindByDepartmentIdRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _deptService.FindByDepartmentId(departmentId, dto);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Create([FromBody] CreateDepartmentRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _deptService.Create(dto);
            return CreatedAtAction(nameof(FindByDepartmentId), new { res.DepartmentId }, res);
        }

        [HttpPut("{departmentId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Update(Guid departmentId, [FromBody] UpdateDepartmentRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _deptService.Update(departmentId, dto);
            return NoContent();
        }

        [HttpDelete("{departmentId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Delete(Guid departmentId, [FromQuery] DeleteDepartmentRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _deptService.Delete(departmentId, dto);
            return NoContent();
        }
    }
}
