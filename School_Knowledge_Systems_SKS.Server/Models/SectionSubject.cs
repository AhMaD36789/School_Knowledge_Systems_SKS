using System.ComponentModel.DataAnnotations.Schema;

namespace School_Knowledge_Systems.Server.Models
{
    public class SectionSubject
    {
        [ForeignKey("Section")]
        public string SectionID { get; set; }
        [ForeignKey("Subject")]
        public string SubjectID { get; set; }
        public Section Section { get; set; }
        public Subject Subject { get; set; }

        public SectionSubject()
        {
            SectionID = string.Empty;
            SubjectID = string.Empty;
        }
    }
}
