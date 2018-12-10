using Microsoft.Owin;
using Owin;

[assembly: OwinStartupAttribute(typeof(LCUPGuidance_MVC.Startup))]
namespace LCUPGuidance_MVC
{
    public partial class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            ConfigureAuth(app);
        }
    }
}
