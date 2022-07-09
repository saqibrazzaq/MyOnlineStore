using cities.Dtos.Country;
using cities.Services;
using Common.ActionFilters;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class CountriesController : ControllerBase
    {
        private readonly ICountryService _countryService;

        public CountriesController(ICountryService countryService)
        {
            _countryService = countryService;
        }

        [HttpGet]
        public IActionResult FindAll()
        {
            var countryDtos = _countryService.FindAll();
            return Ok(countryDtos);
        }

        [HttpGet("search")]
        public IActionResult Search([FromQuery] SearchCountryRequestDto dto)
        {
            var res = _countryService.Search(dto);
            return Ok(res);
        }

        [HttpGet("{countryId}")]
        public IActionResult FindByCountryId(Guid countryId)
        {
            var countryDto = _countryService.FindByCountryId(countryId);
            return Ok(countryDto);
        }

        [HttpGet("getByCode/{countryCode}")]
        public IActionResult FindByCountryCode(string countryCode)
        {
            var countryDto = _countryService.FindByCountryCode(countryCode);
            return Ok(countryDto);
        }

        [HttpPost]
        [ServiceFilter(typeof(ValidationFilterAttribute))]
        public IActionResult Create([FromBody] CreateCountryRequestDto dto)
        {
            _countryService.Create(dto);
            return NoContent();
        }

        [HttpPut("{countryId}")]
        public IActionResult Update(Guid countryId, [FromBody] UpdateCountryRequestDto dto)
        {
            _countryService.Update(countryId, dto);
            return NoContent();
        }

        [HttpDelete("{countryId}")]
        public IActionResult Delete(Guid countryId)
        {
            _countryService.Delete(countryId);
            return NoContent();
        }
    }
}
