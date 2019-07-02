using System.Collections.Generic;
namespace Workout_Buddy.Models
{
    public class Profile
    {
        public int Id { get; set; }
        public string firstName { get; set; }

        public string lastName { get; set; }

        public string Email { get; set; }

        public string Goal { get; set; }

        public List<Exercise> Exercises { get; set; } = new List<Exercise>();

    }
}