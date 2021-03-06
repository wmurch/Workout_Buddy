using System.Collections.Generic;
namespace Workout_Buddy.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Sets { get; set; }
        public int Rep { get; set; }
        public int Weight { get; set; }
        public string BodyPart { get; set; }
        public string Description { get; set; }

        public int? WorkoutId { get; set; }
        public Workout Workout { get; set; }
    }
}