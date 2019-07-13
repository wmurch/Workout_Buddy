using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Workout_Buddy.Models;
using workout_buddy;

namespace sdg_react_template.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SuggestionController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public SuggestionController(DatabaseContext context)
        {
            _context = context;
        }

        // GET: api/Suggestion
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Suggestion>>> GetSuggestions()
        {
            return await _context.Suggestions.ToListAsync();
        }

        // GET: api/Suggestion/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Suggestion>> GetSuggestion(int id)
        {
            var suggestion = await _context.Suggestions.FindAsync(id);

            if (suggestion == null)
            {
                return NotFound();
            }

            return suggestion;
        }

        // PUT: api/Suggestion/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSuggestion(int id, Suggestion suggestion)
        {
            if (id != suggestion.Id)
            {
                return BadRequest();
            }

            _context.Entry(suggestion).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SuggestionExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Suggestion
        [HttpPost]
        public async Task<ActionResult<Suggestion>> PostSuggestion(Suggestion suggestion)
        {
            _context.Suggestions.Add(suggestion);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSuggestion", new { id = suggestion.Id }, suggestion);
        }

        // DELETE: api/Suggestion/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Suggestion>> DeleteSuggestion(int id)
        {
            var suggestion = await _context.Suggestions.FindAsync(id);
            if (suggestion == null)
            {
                return NotFound();
            }

            _context.Suggestions.Remove(suggestion);
            await _context.SaveChangesAsync();

            return suggestion;
        }

        private bool SuggestionExists(int id)
        {
            return _context.Suggestions.Any(e => e.Id == id);
        }
    }
}
