using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LCUPGuidanceDAL.Interfaces
{
    interface IDataAccessLayer<T>
    {
        T FindById(int id);
        List<T> GetAll();
        bool Post(T type, ref Dictionary<string, string> dict);
    }
}
