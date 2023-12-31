﻿namespace School_Knowledge_Systems.Server.Models.DTOs
{
    public class TeacherDTO
    {
        public int TeacherID { get; set; }
        public string TeacherName { get; set; }
        public int PhoneNumber { get; set; }
        public int TeacherClassesPerWeek { get; set; }

        public TeacherDTO()
        {
            TeacherName = string.Empty;
        }

        public static explicit operator TeacherDTO(Teacher teacher)
        {
            return new TeacherDTO
            {
                TeacherID = teacher.TeacherID,
                TeacherName = teacher.TeacherName,
                PhoneNumber = teacher.PhoneNumber,
                TeacherClassesPerWeek = teacher.TeacherClassesPerWeek,
            };
        }

        public static explicit operator Teacher(TeacherDTO teacherDTO)
        {
            return new Teacher
            {
                TeacherID = teacherDTO.TeacherID,
                TeacherName = teacherDTO.TeacherName,
                PhoneNumber = teacherDTO.PhoneNumber,
                TeacherClassesPerWeek = teacherDTO.TeacherClassesPerWeek,
            };
        }
    }

    public class TeacherDTOPut
    {
        public string TeacherName { get; set; }
        public int TeacherID { get; set; }
        public int PhoneNumber { get; set; }
        public int TeacherClassesPerWeek { get; set; }

        public TeacherDTOPut()
        {
            TeacherName = string.Empty;
        }
    }
}
