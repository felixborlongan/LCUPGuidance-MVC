using LCUPGuidanceDAL.Interfaces;
using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace LCUPGuidanceDAL
{
    public class StudentDAL : IDataAccessLayer<Student>
    {
        DBContext db = null;
        public StudentDAL(DBContext context)
        {
            db = context;
        }
        public Student FindById(int id)
        {
            Student student = null;
            try
            {
                student = db.Student.Where(s => s.StudentID == id).FirstOrDefault();
            }
            catch { }
            return student;
        }
        public Student FindByEmailAddress(string emailAddress)
        {
            Student student = null;
            try
            {
                student = db.Student.Where(st => st.EmailAddress == emailAddress).FirstOrDefault();
            }
            catch { }
            return student;
        }
        public List<Student> GetAll()
        {
            List<Student> students = null;
            try
            {
                students = db.Student.ToList();
            }
            catch { }
            return students;
        }

        public bool Post(Student student, ref Dictionary<string, string> dict)
        {
            bool successOperation = false;

            Validate(student, ref dict);

            bool hasError = dict.Count > 0;

            if (!hasError)
            {
                if (student.StudentID == 0)
                {
                    db.Student.Add(student);
                    db.SaveChanges();
                    successOperation = true;
                }
                else
                {
                    Student studentToUpdate = FindById(student.StudentID);
                    studentToUpdate.Firstname = student.Firstname;
                    studentToUpdate.Middlename = student.Middlename;
                    studentToUpdate.Lastname = student.Lastname;
                    studentToUpdate.CourseID = student.CourseID;
                    studentToUpdate.StatusID = student.StatusID;

                    db.Entry(studentToUpdate).State = EntityState.Modified;
                    db.SaveChanges();
                    successOperation = true;
                }
            }

            return successOperation;
        }
        private void Validate(Student student, ref Dictionary<string, string> dict)
        {
            if (string.IsNullOrWhiteSpace(student.Firstname))
                dict["firstname"] = "Please enter first name";
            if (string.IsNullOrWhiteSpace(student.Middlename))
                dict["middlename"] = "Please enter middle name";
            if (string.IsNullOrWhiteSpace(student.Lastname))
                dict["lastname"] = "Please enter last name";
            if (string.IsNullOrWhiteSpace(student.EmailAddress))
                dict["emailaddress"] = "Please enter email address";
            if (! new EmailAddressAttribute().IsValid(student.EmailAddress))
                dict["emailaddress"] = "Please enter valid email address";
            if (student.CourseID == 0)
                dict["course"] = "Please enter course";
            if (student.StatusID == 0)
                dict["status"] = "Please enter status";

            if (new EmailAddressAttribute().IsValid(student.EmailAddress))
            {
                Student studentWithSameEmailAddress = FindByEmailAddress(student.EmailAddress);
                if (studentWithSameEmailAddress != null && studentWithSameEmailAddress.EmailAddress != student.EmailAddress)
                    dict["emailaddress"] = "Email address already exist.";
            }
        }
    }
}