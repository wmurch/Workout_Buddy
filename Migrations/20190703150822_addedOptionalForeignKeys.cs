using Microsoft.EntityFrameworkCore.Migrations;

namespace sdgreacttemplate.Migrations
{
    public partial class addedOptionalForeignKeys : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Exercises_ExerciseId",
                table: "Workouts");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Profile_ProfileId",
                table: "Workouts");

            migrationBuilder.AlterColumn<int>(
                name: "ProfileId",
                table: "Workouts",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseId",
                table: "Workouts",
                nullable: true,
                oldClrType: typeof(int));

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Exercises_ExerciseId",
                table: "Workouts",
                column: "ExerciseId",
                principalTable: "Exercises",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);

            migrationBuilder.AddForeignKey(
                name: "FK_Workouts_Profile_ProfileId",
                table: "Workouts",
                column: "ProfileId",
                principalTable: "Profile",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Exercises_ExerciseId",
                table: "Workouts");

            migrationBuilder.DropForeignKey(
                name: "FK_Workouts_Profile_ProfileId",
                table: "Workouts");

            migrationBuilder.AlterColumn<int>(
                name: "ProfileId",
                table: "Workouts",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ExerciseId",
                table: "Workouts",
                nullable: false,
                oldClrType: typeof(int),
                oldNullable: true);

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
    }
}
