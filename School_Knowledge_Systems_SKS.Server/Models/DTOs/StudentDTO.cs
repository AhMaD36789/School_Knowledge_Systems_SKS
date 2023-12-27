namespace School_Knowledge_Systems.Server.Models.DTOs
{
    public class StudentDTO
    {
        public string Name { get; set; }
        public int FatherPhoneNumber { get; set; }
        public string SectionID { get; set; }

        public StudentDTO()
        {
            Name = string.Empty;
            SectionID = string.Empty;
        }

        public static explicit operator Student(StudentDTO dto)
        {
            return new Student
            {
                Name = dto.Name,
                FatherPhoneNumber = dto.FatherPhoneNumber,
                SectionID = dto.SectionID,
            };
        }

        public static explicit operator StudentDTO(Student student)
        {
            return new StudentDTO
            {
                Name = student.Name,
                FatherPhoneNumber = student.FatherPhoneNumber,
                SectionID = student.SectionID,
            };
        }
    }

    public class StudentDTOPut
    {
        public int FatherPhoneNumber { get; set; }
        public string SectionID { get; set; }

        public StudentDTOPut()
        {
            SectionID = string.Empty;
        }
    }
}
