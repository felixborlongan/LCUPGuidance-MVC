using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web.Mvc;

namespace LCUPGuidanceModel
{
    [Table("User", Schema = "dbo")]
    public class User
    {
        [Key]
        public int UserID { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Firstname { get; set; }
        public string Middlename { get; set; }
        public string Lastname { get; set; }
        public int StatusID { get; set; }
        public string EmailAddress { get; set; }
        public DateTime? Created { get; set; }
        public int? CreatedBy { get; set; }
        public DateTime? Updated { get; set; }
        public int? UpdatedBy { get; set; }

        [NotMapped]
        public virtual string Fullname
        {
            get
            {
                return Firstname + " " + Middlename + " " + Lastname;
            }
        }
        [NotMapped]
        public IEnumerable<SelectListItem> StatusList { get; set; }
        [NotMapped]
        public string Operation { get; set; }

        [ForeignKey("StatusID")]
        public virtual Status Status { get; set; }
    }
}