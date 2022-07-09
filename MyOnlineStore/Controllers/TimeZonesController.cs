using cities.Dtos.TimeZone;
using cities.Services;
using Common.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class TimeZonesController : ControllerBase
    {
        private readonly ITimeZoneService _timeZoneService;

        public TimeZonesController(ITimeZoneService timeZoneService)
        {
            _timeZoneService = timeZoneService;
        }

        [HttpGet]
        public IActionResult FindAll()
        {
            var timeZoneDtos = _timeZoneService.FindAll();
            return Ok(timeZoneDtos);
        }

        [HttpGet("search")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult SearchTimeZones([FromQuery] SearchTimeZoneRequestDto dto)
        {
            var res = _timeZoneService.SearchTimeZones(dto);
            return Ok(res);
        }

        [HttpGet("{timeZoneId}")]
        public IActionResult FindByTimeZoneId(Guid timeZoneId)
        {
            var res = _timeZoneService.FindByTimeZoneId(timeZoneId);
            return Ok(res);
        }

        [HttpGet("getByCountryId/{countryId}")]
        public IActionResult FindCountryId(Guid countryId)
        {
            var res = _timeZoneService.FindByCountryId(countryId);
            return Ok(res);
        }

        [HttpGet("getByCountryCode/{countryCode}")]
        public IActionResult FindByCountryCode(string countryCode)
        {
            var res = _timeZoneService.FindByCountryCode(countryCode);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create([FromBody] CreateTimeZoneRequestDto dto)
        {
            _timeZoneService.Create(dto);
            return NoContent();
        }

        [HttpPut("{timeZoneId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(Guid timeZoneId, [FromBody] UpdateTimeZoneRequestDto dto)
        {
            _timeZoneService.Update(timeZoneId, dto);
            return NoContent();
        }

        [HttpDelete("{timeZoneId}")]
        public IActionResult Delete(Guid timeZoneId)
        {
            _timeZoneService.Delete(timeZoneId);
            return NoContent();
        }
    }
}
