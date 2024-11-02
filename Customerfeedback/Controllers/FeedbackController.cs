using Microsoft.AspNetCore.Mvc;
using Customerfeedback.Models;
using Customerfeedback.Services;
using System.Threading.Tasks;

namespace Customerfeedback.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class FeedbackController : ControllerBase
    {
        private readonly IServiceBusSenderService _serviceBusSenderService;

        public FeedbackController(IServiceBusSenderService serviceBusSenderService)
        {
            _serviceBusSenderService=serviceBusSenderService;
        }
        [HttpPost]
        public async Task<IActionResult> SubmitFeedback([FromBody] Feedback feedback)
        {
            if (feedback == null)
                return BadRequest("Feedback cannot be null");

            await _serviceBusSenderService.SendMessageAsync(feedback);
            return Ok(new { message = "Feedback submitted successfully" });
        }
    }
}
