﻿// <auto-generated />
using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using workout_buddy;

namespace sdgreacttemplate.Migrations
{
    [DbContext(typeof(DatabaseContext))]
    [Migration("20190710185304_correctedPropsinWorkoutModel")]
    partial class correctedPropsinWorkoutModel
    {
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.SerialColumn)
                .HasAnnotation("ProductVersion", "2.2.0-rtm-35687")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            modelBuilder.Entity("Workout_Buddy.Models.Exercise", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("BodyPart");

                    b.Property<string>("Description");

                    b.Property<string>("Name");

                    b.Property<int>("Rep");

                    b.Property<int>("Sets");

                    b.Property<int>("Weight");

                    b.Property<int?>("WorkoutId");

                    b.HasKey("Id");

                    b.HasIndex("WorkoutId");

                    b.ToTable("Exercises");
                });

            modelBuilder.Entity("Workout_Buddy.Models.Profile", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Email");

                    b.Property<string>("FirstName");

                    b.Property<string>("Goal");

                    b.Property<string>("LastName");

                    b.HasKey("Id");

                    b.ToTable("Profile");
                });

            modelBuilder.Entity("Workout_Buddy.Models.Workout", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd();

                    b.Property<string>("Name");

                    b.Property<int?>("ProfileId");

                    b.HasKey("Id");

                    b.HasIndex("ProfileId");

                    b.ToTable("Workouts");
                });

            modelBuilder.Entity("Workout_Buddy.Models.Exercise", b =>
                {
                    b.HasOne("Workout_Buddy.Models.Workout", "Workout")
                        .WithMany("Exercises")
                        .HasForeignKey("WorkoutId");
                });

            modelBuilder.Entity("Workout_Buddy.Models.Workout", b =>
                {
                    b.HasOne("Workout_Buddy.Models.Profile", "Profile")
                        .WithMany("Workouts")
                        .HasForeignKey("ProfileId");
                });
#pragma warning restore 612, 618
        }
    }
}
