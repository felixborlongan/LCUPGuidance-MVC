using LCUPGuidanceDAL.Interfaces;
using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace LCUPGuidanceDAL
{
    public class StatusDAL
    {
        DBContext db = null;
        public StatusDAL(DBContext context)
        {
            db = context;
        }
        public List<Status> GetAll()
        {
            return db.Status.ToList();
        }
    }
}