using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace LCUPGuidanceModel
{
    [Table("StudentParentMapping", Schema = "dbo")]
    public class StudentParentMapping
    {
        [Key]
        public int StudentParentID { get; set; }
        public int StudentID { get; set; }
        public int ParentID { get; set; }

        [ForeignKey("StudentID")]
        public virtual Student Student { get; set; }
        [ForeignKey("ParentID")]
        public virtual Parent Parent { get; set; }
    }
}