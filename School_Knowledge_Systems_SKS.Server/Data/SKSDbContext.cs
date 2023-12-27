using Microsoft.EntityFrameworkCore;
using School_Knowledge_Systems.Server.Models;

namespace School_Knowledge_Systems.Server.Data
{
    public class SKSDbContext : DbContext
    {
        public SKSDbContext(DbContextOptions<SKSDbContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<SectionSubject>().HasKey(x => new { x.SubjectID, x.SectionID });

            SeedData(modelBuilder);
        }

        private void SeedData(ModelBuilder modelBuilder)
        {
            var defaultTeacher = new Teacher
            {
                TeacherID = 1,
                TeacherName = "Default Teacher",
                PhoneNumber = 1234567890,
                TeacherClassesPerWeek = 5

            };
            modelBuilder.Entity<Teacher>().HasData(defaultTeacher);

            var defaultSubject = new Subject
            {
                SubjectID = "Default Subject",
                NoOfClassesPerWeek = 3,
                LevelID = "1",
                TeacherID = 1
            };

            modelBuilder.Entity<Subject>().HasData(defaultSubject);
        }

        public DbSet<Level> Levels { get; set; }
        public DbSet<Section> Sections { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<SectionSubject> SectionSubjects { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Teacher> Teachers { get; set; }
    }
}
