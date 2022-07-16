using hr.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace MyOnlineStore.Controllers
{
    [Route("api/v1/[controller]")]
    [ApiController]
    public class GendersController : ControllerBase
    {
        private readonly IGenderService _genderService;

        public GendersController(IGenderService genderService)
        {
            _genderService = genderService;
        }

        [HttpGet]
        public IActionResult FindAll()
        {
            var res = _genderService.FindAll();
            return Ok(res);
        }

        [HttpGet("{genderCode}")]
        public IActionResult FindByGenderCode(string genderCode)
        {
            var res = _genderService.FindByGenderCode(genderCode);
            return Ok(res);
        }
    }
}
