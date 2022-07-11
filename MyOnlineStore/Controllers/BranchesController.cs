using auth.Services;
using Common.ActionFilters;
using Common.Utility;
using hr.Dtos.Branch;
using hr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BranchesController : ControllerBase
    {
        private readonly IBranchService _branchService;
        private readonly IUserService _userService;
        public BranchesController(IBranchService branchService,
            IUserService userService)
        {
            _branchService = branchService;
            _userService = userService;
        }

        [HttpGet]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> FindAll(FindAllBranchesRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _branchService.FindAll(dto);
            return Ok(res);
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Search([FromQuery] SearchBranchesRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _branchService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{branchId}", Name = "FindByBranchId")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> FindByBranchId(Guid branchId, FindByBranchIdRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _branchService.FindByBranchId(branchId, dto);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof (ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Create([FromBody] CreateBranchRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _branchService.Create(dto);
            return CreatedAtAction(nameof(FindByBranchId), new { res.BranchId }, res);
        }

        [HttpPut("{branchId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Update(Guid branchId, [FromBody] UpdateBranchRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _branchService.Update(branchId, dto);
            return NoContent();
        }

        [HttpDelete("{branchId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Delete(Guid branchId, DeleteBranchRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _branchService.Delete(branchId, dto);
            return NoContent();
        }
    }
}
