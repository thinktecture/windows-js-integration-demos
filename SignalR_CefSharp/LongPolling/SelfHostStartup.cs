using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Owin;

[assembly: OwinStartup(typeof(LongPolling.SelfHostStartup))]
namespace LongPolling
{
    public class SelfHostStartup
    {
        public void Configuration(IAppBuilder app)
        {
            var options = new FileServerOptions()
            {
                RequestPath = new PathString(""),
                FileSystem = new PhysicalFileSystem("client"),
                EnableDefaultFiles = true,
                EnableDirectoryBrowsing = true
            };
            options.DefaultFilesOptions.DefaultFileNames.Add("index.html");
            options.StaticFileOptions.ServeUnknownFileTypes = true;

            app.UseCors(CorsOptions.AllowAll);
            app.MapSignalR();

            app.UseFileServer(options);

            var startup = new Startup();
            startup.Configuration(app);
        }
    }
}
