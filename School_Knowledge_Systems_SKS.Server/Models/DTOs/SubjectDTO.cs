namespace School_Knowledge_Systems.Server.Models.DTOs
{
    public class SubjectDTO
    {
        public string SubjectID { get; set; }
        public int NoOfClassesPerWeek { get; set; }
        public string LevelID { get; set; }
        public int TeacherID { get; set; }

        public SubjectDTO()
        {
            SubjectID = string.Empty;
            LevelID = string.Empty;
        }

        public static explicit operator SubjectDTO(Subject subject)
        {
            return new SubjectDTO
            {
                SubjectID = subject.SubjectID,
                NoOfClassesPerWeek = subject.NoOfClassesPerWeek,
                LevelID = subject.LevelID,
                TeacherID = subject.TeacherID
            };
        }

        public static explicit operator Subject(SubjectDTO subjectDTO)
        {
            return new Subject
            {
                SubjectID = subjectDTO.SubjectID,
                NoOfClassesPerWeek = subjectDTO.NoOfClassesPerWeek,
                LevelID = subjectDTO.LevelID,
                TeacherID = subjectDTO.TeacherID
            };
        }
    }

    public class SubjectDTOPut
    {
        public int NoOfClassesPerWeek { get; set; }
        public string LevelID { get; set; }
        public int TeacherID { get; set; }

        public SubjectDTOPut()
        {
            LevelID = string.Empty;
        }
    }
}
