using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace School_Knowledge_Systems.Server.Models
{
    public class Section
    {
        [Key]
        public string SectionID { get; set; }

        [ForeignKey("Level")]
        public string LevelID { get; set; }
        public int StudentCount { get; set; }
        public int NoOfClassesPerWeek { get; set; }
        public List<Student> Students { get; set; }
        public List<SectionSubject> Subjects { get; set; }
        public Level Level { get; set; }

        public Section()
        {
            SectionID = string.Empty;
            LevelID = string.Empty;
        }
    }
}
