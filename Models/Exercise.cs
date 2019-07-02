using System.Collections.Generic;
namespace Workout_Buddy.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string BodyPart { get; set; }
        public string Description { get; set; }

        public List<Exercise> Exercises { get; set; } = new List<Exercise>();
    }
}