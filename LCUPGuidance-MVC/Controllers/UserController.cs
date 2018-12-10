using LCUPGuidanceDAL;
using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LCUPGuidance_MVC.Controllers
{
    public class UserController : Controller
    {
        UserDAL userDAL = new UserDAL(new DBContext());
        StatusDAL statusDAL = new StatusDAL(new DBContext());
        GenerateIEnumerableList genList = new GenerateIEnumerableList(new DBContext());
        // GET: User
        public ActionResult Index()
        {
            List<User> user = userDAL.GetAll();

            ViewData["statuses"] = statusDAL.GetAll();

            return View(user);
        }
        public ActionResult AddEditUser(int id, string operation = "add")
        {
            User user = new User();

            if (id != 0)
                user = userDAL.FindById(id);

            user.StatusList = genList.GetStatusList(user.StatusID);
            user.Operation = operation;

            return PartialView("_AddEditUser", user);
        }
        public JsonResult Post(User user)
        {
            Dictionary<string, string> dict = new Dictionary<string, string>();

            bool successOperation = userDAL.Post(user, ref dict);

            List<User> users = successOperation ? userDAL.GetAll() : null;

            return Json(new
            {
                successYn = successOperation,
                users = users,
                Errors = dict
            }, JsonRequestBehavior.AllowGet);
        }
    }
}