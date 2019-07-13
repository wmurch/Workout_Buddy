using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using workout_buddy;
using Workout_Buddy.Models;
using Workout_Buddy.ViewModels;

namespace Workout_Buddy.Controllers
{
    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private DatabaseContext _context;
        public AuthController(DatabaseContext context)
        {
            this._context = context;
        }
        [HttpPost("login")]
        public async Task<ActionResult> LoginIn([FromBody] LoginViewModel loginInfo)
        {
            var profile = await _context.Profiles.FirstOrDefaultAsync(u => u.Email == loginInfo.Email);
            if (profile is null)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(profile);
            }
        }
        [HttpPost("register")]
        public async Task<ActionResult> Register([FromBody] RegisterViewModel registerInformation)
        {
            var exists = await _context.Profiles.AnyAsync(u => u.Email == registerInformation.Email);
            // if exists, return an error
            if (exists)
            {
                return BadRequest(new { message = "user with the email already exists" });
            }
            var profile = new Profile
            {
                FirstName = registerInformation.FirstName,
                LastName = registerInformation.LastName,
                Email = registerInformation.Email,
            };
            _context.Profiles.Add(profile);
            await _context.SaveChangesAsync();
            // return a token so the user can do user things
            return Ok(profile);

        }


    }
}