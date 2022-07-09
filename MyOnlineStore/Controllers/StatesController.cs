using cities.Dtos.State;
using cities.Services;
using Common.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class StatesController : ControllerBase
    {
        private readonly IStateService _stateService;

        public StatesController(IStateService stateService)
        {
            _stateService = stateService;
        }

        [HttpGet("{stateId}")]
        public IActionResult FindById(Guid stateId)
        {
            var res = _stateService.FindById(stateId);
            return Ok(res);
        }

        [HttpGet("findByStateCode/{stateCode}")]
        public IActionResult FindByStateCode(string stateCode)
        {
            var res = _stateService.FindByStateCode(stateCode);
            return Ok(res);
        }

        [HttpGet("findByCountryId/{countryId}")]
        public IActionResult FindByCountryId(Guid countryId)
        {
            var res = _stateService.FindByCountryId(countryId);
            return Ok(res);
        }

        [HttpGet("findByCountryCode/{countryCode}")]
        public IActionResult FindByCountryCode(string countryCode)
        {
            var res = _stateService.FindByCountryCode(countryCode);
            return Ok(res);
        }

        [HttpGet("search")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Search([FromQuery] SearchStateRequestDto dto)
        {
            var res = _stateService.Search(dto);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create([FromBody] CreateStateRequestDto dto)
        {
            _stateService.Create(dto);
            return NoContent();
        }

        [HttpPut("{stateId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(Guid stateId, UpdateStateRequestDto dto)
        {
            _stateService.Update(stateId, dto);
            return NoContent();
        }

        [HttpDelete("{stateId}")]
        public IActionResult Delete(Guid stateId)
        {
            _stateService.Delete(stateId);
            return NoContent();
        }
    }
}
