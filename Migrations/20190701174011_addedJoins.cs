using Microsoft.EntityFrameworkCore.Migrations;

namespace sdgreacttemplate.Migrations
{
    public partial class addedJoins : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "ExerciseId",
                table: "Workouts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ProfileId",
                table: "Workouts",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "ExerciseId",
                table: "Exercises",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ProfileId",
                table: "Exercises",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_ExerciseId",
                table: "Workouts",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_Workouts_ProfileId",
                table: "Workouts",
                column: "ProfileId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_ExerciseId",
                table: "Exercises",
                column: "ExerciseId");

            migrationBuilder.CreateIndex(
                name: "IX_Exercises_ProfileId",
                table: "Exercises",
                column: "ProfileId");

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Exercises_ExerciseId",
                table: "Exercises",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Exercises_Profile_ProfileId",
                table: "Exercises",
                column: "ProfileId",
                principalTable: "Profile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Exercises_ExerciseId",
                table: "Workouts",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Profile_ProfileId",
                table: "Workouts",
                column: "ProfileId",
                principalTable: "Profile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Exercises_ExerciseId",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Exercises_Profile_ProfileId",
                table: "Exercises");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Exercises_ExerciseId",
                table: "Workouts");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Profile_ProfileId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_ExerciseId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Workouts_ProfileId",
                table: "Workouts");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_ExerciseId",
                table: "Exercises");

            migrationBuilder.DropIndex(
                name: "IX_Exercises_ProfileId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "ExerciseId",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Workouts");

            migrationBuilder.DropColumn(
                name: "ExerciseId",
                table: "Exercises");

            migrationBuilder.DropColumn(
                name: "ProfileId",
                table: "Exercises");
        }
    }
}
