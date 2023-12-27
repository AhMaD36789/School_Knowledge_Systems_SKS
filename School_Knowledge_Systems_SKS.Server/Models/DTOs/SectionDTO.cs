namespace School_Knowledge_Systems.Server.Models.DTOs
{
    public class SectionDTO
    {
        public string SectionID { get; set; }
        public string LevelID { get; set; }
        public int StudentCount { get; set; }
        public int NoOfClassesPerWeek { get; set; }

        public SectionDTO()
        {
            SectionID = string.Empty;
            LevelID = string.Empty;
        }

        public static explicit operator Section(SectionDTO dto)
        {
            return new Section
            {
                SectionID = dto.SectionID,
                LevelID = dto.LevelID,
                StudentCount = dto.StudentCount,
                NoOfClassesPerWeek = dto.NoOfClassesPerWeek
            };
        }

        public static explicit operator SectionDTO(Section section)
        {
            return new SectionDTO
            {
                SectionID = section.SectionID,
                LevelID = section.LevelID,
                StudentCount = section.StudentCount,
                NoOfClassesPerWeek = section.NoOfClassesPerWeek
            };

        }
    }

    public class SectionDTOPut
    {
        public string LevelID { get; set; }
        public int StudentCount { get; set; }
        public int NoOfClassesPerWeek { get; set; }
        public SectionDTOPut()
        {
            LevelID = string.Empty;
        }
    }

}
