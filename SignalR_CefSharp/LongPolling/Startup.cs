using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;
using Autofac;
using Autofac.Integration.WebApi;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.FileSystems;
using Microsoft.Owin.StaticFiles;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;

namespace Basta.WpfClient
{
    public class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public void Configuration(IAppBuilder appBuilder)
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

            appBuilder.MapSignalR();
            appBuilder.UseFileServer(options);



            var config = new HttpConfiguration();
            ConfigureDependancyResolver(config);

            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}/{employeeId}");

            appBuilder.UseCors(CorsOptions.AllowAll);
            appBuilder.UseWebApi(config);
        }

        private static void ConfigureDependancyResolver(HttpConfiguration configuration)
        {
            var builder = new ContainerBuilder();
            var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            builder.RegisterApiControllers(Directory.GetFiles(path, "bastaWebApi.dll").Select(Assembly.LoadFile).ToArray());
            configuration.DependencyResolver = new AutofacWebApiDependencyResolver(builder.Build());
        }

    }

    public class MyHttpConfiguration : HttpConfiguration
    {
        public MyHttpConfiguration()
        {
            ConfigureJsonSerialization();
        }

        private void ConfigureJsonSerialization()
        {
            var jsonSettings = Formatters.JsonFormatter.SerializerSettings;
            jsonSettings.Formatting = Formatting.Indented;
            jsonSettings.ContractResolver = new CamelCasePropertyNamesContractResolver();
        }
    }
}
