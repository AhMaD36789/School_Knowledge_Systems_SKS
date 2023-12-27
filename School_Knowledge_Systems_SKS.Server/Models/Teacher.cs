namespace School_Knowledge_Systems.Server.Models
{
    public class Teacher
    {
        public int TeacherID { get; set; }
        public string TeacherName { get; set; }
        public int PhoneNumber { get; set; }
        public int TeacherClassesPerWeek { get; set; }
        public List<Subject> TaughtSubjects { get; set; }

        public Teacher()
        {
            TeacherName = string.Empty;
        }
    }
}
