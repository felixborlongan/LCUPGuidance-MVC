using LCUPGuidanceDAL.Interfaces;
using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace LCUPGuidanceDAL
{
    public class ParentDAL : IDataAccessLayer<Parent>
    {
        DBContext db = null;
        public ParentDAL(DBContext context)
        {
            db = context;
        }
        public Parent FindById(int id)
        {
            Parent parent = null;

            try
            {
                parent = db.Parent.Where(pr => pr.ParentID == id).FirstOrDefault();
            }
            catch { }
            return parent;
        }
        public Parent FindByEmailAddress(string emaillAdress)
        {
            Parent parent = null;

            try
            {
                parent = db.Parent.Where(pr => pr.EmailAddress == emaillAdress).FirstOrDefault();
            }
            catch { }
            return parent;
        }
        public List<Parent> GetAll()
        {
            List<Parent> parents = null;
            try
            {
                parents = db.Parent.ToList();
            }
            catch { }
            return parents;
        }

        public bool Post(Parent parent, ref Dictionary<string, string> dict)
        {
            bool successOperation = false;

            Validate(parent, ref dict);

            bool hasErrors = dict.Count > 0;

            if (!hasErrors)
            {
                if (parent.ParentID == 0)
                {
                    db.Parent.Add(parent);
                    db.SaveChanges();
                    successOperation = true;
                }
                else
                {
                    Parent parentToUpdate = FindById(parent.ParentID);
                    parentToUpdate.Firstname = parent.Firstname;
                    parentToUpdate.Middlename = parent.Middlename;
                    parentToUpdate.Lastname = parent.Lastname;
                    parentToUpdate.EmailAddress = parent.EmailAddress;
                    parentToUpdate.StatusID = parent.StatusID;

                    db.Entry(parentToUpdate).State = EntityState.Modified;
                    db.SaveChanges();
                    successOperation = true;
                }
            }
            return successOperation;
        }
        private void Validate(Parent parent, ref Dictionary<string, string> dict)
        {
            if (string.IsNullOrWhiteSpace(parent.Firstname))
                dict["firstname"] = "Please enter first name";
            if (string.IsNullOrWhiteSpace(parent.Middlename))
                dict["middlename"] = "Please enter middle name";
            if (string.IsNullOrWhiteSpace(parent.Lastname))
                dict["lastname"] = "Please enter last name";
            if (!new EmailAddressAttribute().IsValid(parent.EmailAddress))
                dict["emailaddress"] = "Please enter valid email address";
            if (parent.StatusID == 0)
                dict["status"] = "Please enter status";
            
            if (new EmailAddressAttribute().IsValid(parent.EmailAddress))
            {
                Parent parentWithSameEmail = FindByEmailAddress(parent.EmailAddress);
                if (parentWithSameEmail != null && parentWithSameEmail.ParentID != parent.ParentID)
                    dict["emailaddress"] = "Email Address already exist.";
            }             
        }
    }
}