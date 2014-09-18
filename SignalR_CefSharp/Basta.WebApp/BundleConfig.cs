using System.Web.Optimization;

namespace Basta.WebApp
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.Bundles.Add(new StyleBundle("~/app/css")
               .IncludeDirectory("~/libs", "*.css", true)
               .IncludeDirectory("~/app", "*.css", true)
               .IncludeDirectory("~/assets", "*.css", true)
               );

            BundleTable.Bundles.Add(new ScriptBundle("~/app/js")
                .IncludeDirectory("~/libs", "*.js", true)
                .IncludeDirectory("~/app", "*.js", true)
                .IncludeDirectory("~/appServices", "*.js", true)
                );
        }
    }
}