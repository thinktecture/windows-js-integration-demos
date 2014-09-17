using System;
using System.Collections.Generic;
using System.Reflection;
using System.Web.Http.Dispatcher;

namespace WebAPISelfHostNonOWIN
{
    /// <summary>
    /// To host the Web API successfully the assembly must be loaded in the host process.
    /// Although we referenced assembly, it won't be loaded automatically
    /// unless we use any of its types or load it explicitly.
    /// In our case we need to explicitly load it
    /// it can then be consumed successfully by the client application.
    /// </summary>
    public class WebAPILoader : DefaultAssembliesResolver
    {
        public override ICollection<Assembly> GetAssemblies()
        {
            ICollection<Assembly> defaultAssemblies = base.GetAssemblies();
            List<Assembly> assemblies = new List<Assembly>(defaultAssemblies);
            Type t = typeof(BastaWebAPI.BastaController);
            Assembly a = t.Assembly;
            defaultAssemblies.Add(a);
            return assemblies;
        }
    }
}