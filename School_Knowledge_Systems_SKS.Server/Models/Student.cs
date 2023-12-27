using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace School_Knowledge_Systems.Server.Models
{
    public class Student
    {
        [Key]
        public string Name { get; set; }
        public int FatherPhoneNumber { get; set; }

        [ForeignKey("Section")]
        public string SectionID { get; set; }
        public Section Section { get; set; }

        public Student()
        {
            Name = string.Empty;
            SectionID = string.Empty;
        }
    }
}
