using LCUPGuidanceDAL.Interfaces;
using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LCUPGuidanceDAL
{
    public class StudentParentMappingDAL : IDataAccessLayer<StudentParentMapping>
    {
        DBContext db = null;
        public StudentParentMappingDAL(DBContext context)
        {
            db = context;
        }

        public StudentParentMapping FindById(int id)
        {
            throw new NotImplementedException();
        }

        public List<StudentParentMapping> GetAll()
        {
            throw new NotImplementedException();
        }
        public List<StudentParentMapping> GetAll(int id)
        {
            List<StudentParentMapping> studentParents = null;

            try
            {
                studentParents = db.StudentParentMapping.Where(pr => pr.ParentID == id).ToList();
            }
            catch { }
            return studentParents;
        }

        public bool Post(StudentParentMapping type, ref Dictionary<string, string> dict)
        {
            throw new NotImplementedException();
        }
    }
}