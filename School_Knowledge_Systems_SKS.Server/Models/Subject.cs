using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace School_Knowledge_Systems.Server.Models
{
    public class Subject
    {
        [Key]
        public string SubjectID { get; set; }
        public int NoOfClassesPerWeek { get; set; }

        [ForeignKey("Level")]
        public string LevelID { get; set; }
        public int TeacherID { get; set; }
        public List<SectionSubject> Sections { get; set; }
        public Teacher Teacher { get; set; }
        public Subject()
        {
            SubjectID = string.Empty;
            LevelID = string.Empty;
        }
    }
}
