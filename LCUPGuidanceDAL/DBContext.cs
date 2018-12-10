using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LCUPGuidanceDAL
{
    public class DBContext : DbContext
    {
        public DBContext() : base ("DefaultConnection")
        {
            Database.SetInitializer<DBContext>(null);
        }
        public DBContext(string conString) : base (conString)
        {

        }
        public DbSet<Status> Status { get; set; }
        public DbSet<User> User { get; set; }
        public DbSet<Course> Course { get; set; }
        public DbSet<SchoolYear> SchoolYear { get; set; }
        public DbSet<Semester> Semester { get; set; }
        public DbSet<Offense> Offense { get; set; }
        public DbSet<Student> Student { get; set; }
        public DbSet<Parent> Parent { get; set; }
        public DbSet<StudentParentMapping> StudentParentMapping { get; set; }
    }
}