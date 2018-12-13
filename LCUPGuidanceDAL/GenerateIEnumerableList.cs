using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LCUPGuidanceDAL
{
    public class GenerateIEnumerableList
    {
        DBContext db = null;
        public GenerateIEnumerableList(DBContext context)
        {
            db = context;
        }
        public IEnumerable<SelectListItem> GetStatusList(int? id)
        {
            return db.Status.Select(st => new SelectListItem
            {
                Value = st.StatusID.ToString(),
                Text = st.StatusName,
                Selected = st.StatusID == id
            });
        }
        public IEnumerable<SelectListItem> GetChildrensList(List<int> childrenIds)
        {
            return db.Student.Select(st => new SelectListItem {
                Value = st.StudentID.ToString(),
                Text = st.Firstname + " " + st.Middlename + " " + st.Lastname,
                Selected = childrenIds.Contains(st.StudentID)
            });
        }
    }
}