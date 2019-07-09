using Microsoft.EntityFrameworkCore.Migrations;

namespace sdgreacttemplate.Migrations
{
    public partial class correctedCapitilizationonProfile : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "lastName",
                table: "Profile",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "firstName",
                table: "Profile",
                newName: "FirstName");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "Profile",
                newName: "lastName");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "Profile",
                newName: "firstName");
        }
    }
}
