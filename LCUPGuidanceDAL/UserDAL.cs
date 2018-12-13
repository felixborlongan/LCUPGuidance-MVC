using LCUPGuidanceDAL.Interfaces;
using LCUPGuidanceModel;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace LCUPGuidanceDAL
{
    public class UserDAL : IDataAccessLayer<User>
    {
        DBContext db = null;
        public UserDAL(DBContext context)
        {
            db = context;
        }
        public User FindById(int id)
        {
            User user = null;

            try
            {
                user = db.User.Where(u => u.UserID == id).FirstOrDefault();
            }
            catch { }
            return user;
        }
        public User FindByUsername(string username)
        {
            User user = null;

            try
            {
                user = db.User.Where(u => u.Username == username).FirstOrDefault();
            }
            catch { }
            return user;
        }
        public User FindByEmail(string emailaddress)
        {
            User user = null;
            try
            {
                user = db.User.Where(u => u.EmailAddress == emailaddress).FirstOrDefault();
            }
            catch { }
            return user;
        }
        public List<User> GetAll()
        {
            List<User> users = null;
            try
            {
                users = db.User.ToList();
            }
            catch { }
            return users;
        }
        public bool Post(User user, ref Dictionary<string, string> dict)
        {
            bool successOperation = false;

            Validate(user, ref dict);

            bool hasError = dict.Count > 0;

            if (!hasError)
            {
                if (user.UserID == 0)
                {
                    db.User.Add(user);
                    db.SaveChanges();
                    successOperation = true;
                }
                else
                {
                    User userToUpdate = FindById(user.UserID);
                    userToUpdate.Firstname = user.Firstname;
                    userToUpdate.Middlename = user.Middlename;
                    userToUpdate.Lastname = user.Lastname;
                    userToUpdate.Username = user.Username;
                    userToUpdate.Password = user.Password;

                    db.Entry(userToUpdate).State = EntityState.Modified;
                    db.SaveChanges();
                    successOperation = true;
                }
            }
            return successOperation;
        }
        private void Validate(User user, ref Dictionary<string, string> dict)
        {
            if (string.IsNullOrWhiteSpace(user.Firstname))
                dict["firstname"] = "Please enter username";
            if (string.IsNullOrWhiteSpace(user.Middlename))
                dict["middlename"] = "Please enter middlename";
            if (string.IsNullOrWhiteSpace(user.Lastname))
                dict["lastname"] = "Please enter lastname";
            if (string.IsNullOrWhiteSpace(user.Username))
                dict["username"] = "Please enter username";
            if (string.IsNullOrWhiteSpace(user.Password))
                dict["password"] = "Please enter password";
            if (!(new EmailAddressAttribute().IsValid(user.EmailAddress)))
                dict["emailaddress"] = "Please enter valid email address";
            if (user.StatusID == 0)
                dict["status"] = "Please enter status";

            if (string.IsNullOrWhiteSpace(user.Username))
            {
                User userWithSameUsername = FindByUsername(user.Username);
                if (userWithSameUsername != null && userWithSameUsername.Username != user.Username)
                    dict["username"] = "Username already exist.";
            }
            if (new EmailAddressAttribute().IsValid(user.EmailAddress))
            {
                User userWithSameEmailAddress = FindByEmail(user.EmailAddress);
                if (userWithSameEmailAddress != null & userWithSameEmailAddress.EmailAddress != user.EmailAddress)
                    dict["emailaddress"] = "Email Address already exist";

            }
        }
    }
}