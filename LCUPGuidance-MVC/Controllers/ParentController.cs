using LCUPGuidanceDAL;
using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LCUPGuidance_MVC.Controllers
{
    public class ParentController : Controller
    {
        ParentDAL parentDAL = new ParentDAL(new DBContext());
        StatusDAL statusDAL = new StatusDAL(new DBContext());
        StudentParentMappingDAL spmDAL = new StudentParentMappingDAL(new DBContext());
        GenerateIEnumerableList genList = new GenerateIEnumerableList(new DBContext());
        // GET: Parent
        public ActionResult Index()
        {
            List<Parent> parents = parentDAL.GetAll();

            ViewData["statuses"] = statusDAL.GetAll();

            return View(parents);
        }
        public ActionResult AddEditParent(int id, string operation = "add")
        {
            Parent parent = new Parent();

            if (id > 0)
                parent = parentDAL.FindById(id);

            parent.StatusList = genList.GetStatusList(parent.StatusID);
            parent.ChildrensList = genList.GetChildrensList(spmDAL.GetAll(id).Select(spm => spm.StudentID).ToList());
            parent.Operation = operation;

            return PartialView("_AddEditParent", parent);
        }
        public JsonResult Post(Parent parent)
        {
            bool successYn = false;

            Dictionary<string, string> dict = new Dictionary<string, string>();

            successYn = parentDAL.Post(parent, ref dict);

            List<Parent> parents = successYn ? parentDAL.GetAll() : null;

            return Json(new
            {
                successYn = successYn,
                parents = parents,
                Errors = dict
            }, JsonRequestBehavior.AllowGet);
        }
    }
}