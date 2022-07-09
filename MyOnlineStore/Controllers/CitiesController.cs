using cities.Dtos.City;
using cities.Services;
using Common.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CitiesController : ControllerBase
    {
        private readonly ICityService _cityService;
        public CitiesController(ICityService cityService)
        {
            _cityService = cityService;
        }

        [HttpGet("{cityId}")]
        public IActionResult FindById(Guid cityId)
        {
            var res = _cityService.FindById(cityId);
            return Ok(res);
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] SearchCityRequestDto dto)
        {
            var res = _cityService.Search(dto);
            return Ok(res);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create([FromBody] CreateCityRequestDto dto)
        {
            _cityService.Create(dto);
            return NoContent();
        }

        [HttpPut("{cityId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Update(Guid cityId, [FromBody] UpdateCityRequestDto dto)
        {
            _cityService.Update(cityId, dto);
            return NoContent();
        }

        [HttpDelete("{cityId}")]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Delete(Guid cityId)
        {
            _cityService.Delete(cityId);
            return NoContent();
        }
    }
}
