using auth.Services;
using Common.ActionFilters;
using Common.Utility;
using hr.Dtos.Designation;
using hr.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class DesignationsController : ControllerBase
    {
        private readonly IDesignationService _designationService;
        private readonly IUserService _userService;

        public DesignationsController(IUserService userService, 
            IDesignationService designationService)
        {
            _userService = userService;
            _designationService = designationService;
        }

        [HttpGet("search")]
        [Authorize(Roles = Constants.AllRoles)]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public async Task<IActionResult> Search([FromQuery] SearchDesignationRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _designationService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{designationId}", Name = "FindByDesignationId")]
        [Authorize(Roles = Constants.AllRoles)]
        public async Task<IActionResult> FindByDesignationId(Guid designationId,
            [FromQuery] FindByDesignationIdRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _designationService.FindByDesignationId(designationId, dto);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Create([FromBody] CreateDesignationRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            var res = _designationService.Create(dto);
            return CreatedAtAction(nameof(FindByDesignationId), new { res.DesignationId }, res);
        }

        [HttpPut("{designationId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Update(Guid designationId, [FromBody] UpdateDesignationRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _designationService.Update(designationId, dto);
            return NoContent();
        }

        [HttpDelete("{designationId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        [Authorize(Roles = Constants.AllAdminRoles)]
        public async Task<IActionResult> Delete(Guid designationId, [FromQuery] DeleteDesignationRequestDto dto)
        {
            dto.AccountId = (await _userService.GetLoggedInUser()).AccountId;
            _designationService.Delete(designationId, dto);
            return NoContent();
        }
    }
}
