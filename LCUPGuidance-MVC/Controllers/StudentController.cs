using LCUPGuidanceDAL;
using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LCUPGuidance_MVC.Controllers
{
    public class StudentController : Controller
    {
        StudentDAL studentDAL = new StudentDAL(new DBContext());
        StatusDAL statusDAL = new StatusDAL(new DBContext());
        // GET: Student
        public ActionResult Index()
        {
            List<Student> students = studentDAL.GetAll();

            ViewData["statuses"] = statusDAL.GetAll();

            return View(students);
        }
    }
}