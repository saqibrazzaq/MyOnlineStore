using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hr.Migrations
{
    public partial class branchcompanyidrequired : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branch_Company_CompanyId",
                table: "Branch");

            migrationBuilder.AlterColumn<Guid>(
                name: "CompanyId",
                table: "Branch",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Branch_Company_CompanyId",
                table: "Branch",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "CompanyId",
                onDelete: ReferentialAction.Cascade);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Branch_Company_CompanyId",
                table: "Branch");

            migrationBuilder.AlterColumn<Guid>(
                name: "CompanyId",
                table: "Branch",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Branch_Company_CompanyId",
                table: "Branch",
                column: "CompanyId",
                principalTable: "Company",
                principalColumn: "CompanyId");
        }
    }
}
