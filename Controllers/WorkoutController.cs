using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Workout_Buddy.Models;
using workout_buddy;

namespace Workout_Buddy.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkoutController : ControllerBase
    {
        private readonly DatabaseContext _context;

        public WorkoutController(DatabaseContext context)
        {
            _context = context;
        }
        // GET: api/Exercise
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Workout>>> GetWorkouts()
        {
            return await _context.Workouts.ToListAsync();
        }

        // GET: api/Workout
        [HttpGet("exercises")]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetWorkouts([FromQuery]int id)
        {
            var rv = _context.Exercises.Where(w => w.WorkoutId == id);

            return await rv.ToListAsync();
        }

        // GET: api/Workout/5
        /* [HttpGet("{id}")]
        public async Task<ActionResult<Workout>> GetProfile(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);

            if (workout == null)
            {
                return NotFound();
            }

            return workout;
        } */
        /* [HttpGet("workout")]
       public async Task<List<Workout>> SearchWorkout([FromQuery] string searchTerm)
       {
           var results = _context.Workouts.Where(w => w.Name.ToLower().Contains(searchTerm.ToLower()));
           return await results.ToAsyncList();
       }
*/
        // PUT: api/Workout/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutWorkout(int id, Workout workout)
        {
            if (id != workout.Id)
            {
                return BadRequest();
            }

            _context.Entry(workout).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!WorkoutExists(id))
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

        // POST: api/Workout
        [HttpPost]
        public async Task<ActionResult<Workout>> PostWorkout([FromBody]Workout workout)
        {
            /* var exercise = _context.Exercises.FirstOrDefault(e => e.Id == workout.);
            if (exercise == null)
            { */
            _context.Workouts.Add(workout);
            await _context.SaveChangesAsync();
            // }

            return CreatedAtAction("GetWorkout", new { id = workout.Id }, workout);
        }

        // DELETE: api/Workout/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<Workout>> DeleteWorkout(int id)
        {
            var workout = await _context.Workouts.FindAsync(id);
            if (workout == null)
            {
                return NotFound();
            }

            _context.Workouts.Remove(workout);
            await _context.SaveChangesAsync();

            return workout;
        }

        private bool WorkoutExists(int id)
        {
            return _context.Workouts.Any(e => e.Id == id);
        }
    }
}
