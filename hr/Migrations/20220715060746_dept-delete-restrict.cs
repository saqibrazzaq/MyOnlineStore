using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace hr.Migrations
{
    public partial class deptdeleterestrict : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Department_Branch_BranchId",
                table: "Department");

            migrationBuilder.AlterColumn<Guid>(
                name: "BranchId",
                table: "Department",
                type: "uniqueidentifier",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"),
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Branch_BranchId",
                table: "Department",
                column: "BranchId",
                principalTable: "Branch",
                principalColumn: "BranchId",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Department_Branch_BranchId",
                table: "Department");

            migrationBuilder.AlterColumn<Guid>(
                name: "BranchId",
                table: "Department",
                type: "uniqueidentifier",
                nullable: true,
                oldClrType: typeof(Guid),
                oldType: "uniqueidentifier");

            migrationBuilder.AddForeignKey(
                name: "FK_Department_Branch_BranchId",
                table: "Department",
                column: "BranchId",
                principalTable: "Branch",
                principalColumn: "BranchId");
        }
    }
}
