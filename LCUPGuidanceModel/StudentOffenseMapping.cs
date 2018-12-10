using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LCUPGuidanceModel
{
    [Table("StudentOffenseMapping", Schema = "dbo")]
    public class StudentOffenseMapping
    {
        [Key]
        public int StudentOffenseID { get; set; }
        public int StudentID { get; set; }
        public int OffenseID { get; set; }
        public int SchoolYearID { get; set; }
        public int SemesterID { get; set; }

        [ForeignKey("StudentID")]
        public virtual Student Student { get; set; }
        [ForeignKey("OffenseID")]
        public virtual Offense Offense { get; set; }
        [ForeignKey("SchoolYearID")]
        public virtual SchoolYear SchoolYear { get; set; }
        [ForeignKey("SemesterID")]
        public virtual Semester Semester { get; set; }
    }
}