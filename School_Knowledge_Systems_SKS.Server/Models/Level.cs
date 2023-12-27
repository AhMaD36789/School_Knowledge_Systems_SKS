using System.ComponentModel.DataAnnotations;

namespace School_Knowledge_Systems.Server.Models
{
    public class Level
    {
        [Key]
        public string LevelID { get; set; }
        public int StudentsCount { get; set; }
        public IEnumerable<Section> Sections { get; set; }

        public Level()
        {
            LevelID = string.Empty;
        }
    }
}
