namespace Workout_Buddy.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Sets { get; set; }
        public int Rep { get; set; }
        public int Weight { get; set; }

        public int? ProfileId { get; set; }
        public Profile Profile { get; set; }

        public int? ExerciseId { get; set; }
        public Exercise Exercise { get; set; }
    }
}