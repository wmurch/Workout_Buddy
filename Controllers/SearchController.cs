using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using workout_buddy;
using Workout_Buddy.Models;

namespace Workout_Buddy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SearchController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SearchController(DatabaseContext context)
        {
            _context = context;
        }
        [HttpGet("exercises")]
        public async Task<List<Suggestion>> SearchExercises([FromQuery] string searchTerm)
        {
            var results = _context.Suggestions.Where(w => w.Name.ToLower().Contains(searchTerm.ToLower()));
            return await results.ToListAsync();
        }
    }
}