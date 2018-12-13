using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LCUPGuidanceModel
{
    [Table("Parent", Schema = "dbo")]
    public class Parent
    {
        [Key]
        public int ParentID { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public string Lastname { get; set; }
        public string EmailAddress { get; set; }
        public int StatusID { get; set; }
        public DateTime? Created { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? Updated { get; set; }
        public int? UpdatedBy { get; set; }

        [NotMapped]
        public IEnumerable<SelectListItem> StatusList { get; set; }
        [NotMapped]
        public ICollection<StudentParentMapping> Childrens { get; set; }
        [NotMapped]
        public IEnumerable<SelectListItem> ChildrensList { get; set; }
        [NotMapped]
        public string Operation { get; set; }
        [NotMapped]
        public string Fullname
        {
            get
            {
                return Firstname + " " + Middlename + " " + Lastname;
            }
        }

        [ForeignKey("StatusID")]
        public virtual Status Status { get; set; }
    }
}