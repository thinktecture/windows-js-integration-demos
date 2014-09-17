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
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using Owin;

namespace LongPolling
{
    public class Startup
    {
        // This code configures Web API. The Startup class is specified as a type
        // parameter in the WebApp.Start method.
        public void Configuration(IAppBuilder appBuilder)
        {
            var config = new HttpConfiguration();
            ConfigureDependancyResolver(config);

            config.Routes.MapHttpRoute("DefaultApi", "api/{controller}");

            appBuilder.UseCors(Microsoft.Owin.Cors.CorsOptions.AllowAll);
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
