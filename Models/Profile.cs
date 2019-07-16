using System.Collections.Generic;
namespace Workout_Buddy.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }
        public string Password { get; set; }

        public string Goal { get; set; }

        public List<Workout> Workouts { get; set; } = new List<Workout>();

    }
}