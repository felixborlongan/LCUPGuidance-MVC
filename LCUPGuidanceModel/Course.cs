using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LCUPGuidanceModel
{
    [Table("Course", Schema = "dbo")]
    public class Course
    {
        [Key]
        public int CourseID { get; set; }
        public string Name { get; set; }
        public string Initial { get; set; }
        public int StatusID { get; set; }
        public DateTime? Created { get; set; }
        public int CreatedBy { get; set; }
        public DateTime? Updated { get; set; }
        public int UpdatedBy { get; set; }

        [ForeignKey("StatusID")]
        public virtual Status Status { get; set; }
    }
}