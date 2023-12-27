namespace School_Knowledge_Systems.Server.Models.DTOs
{
    public class LevelDTO
    {
        public string LevelID { get; set; }
        public int StudentsCount { get; set; }

        public LevelDTO()
        {
            LevelID = string.Empty;
        }

        public static explicit operator LevelDTO(Level level)
        {
            return new LevelDTO
            {
                LevelID = level.LevelID,
                StudentsCount = level.StudentsCount
            };
        }

        public static explicit operator Level(LevelDTO levelsDTO)
        {
            return new Level
            {
                LevelID = levelsDTO.LevelID,
                StudentsCount = levelsDTO.StudentsCount
            };
        }
    }
    public class LevelDTOPut
    {
        public int StudentsCount { get; set; }
    }
}
