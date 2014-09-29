using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using EdgeJs;


namespace Edging
{
    class Program
    {
        static void Main(string[] args)
        {
            var n = 7;

            if (args.Any())
            {
                n = int.Parse(args[0]);
            }
            // no edge
            // var result = Fakultät(n);
            
            // use edge
            var result = Start(n).Result;

            Console.WriteLine(result);
        }

        static long Fakultät(long n)
        {
            long result = 1;
            for (long c = 1; c <= n; c++)
            {
                result *= c;
            }
            return result;
        }

        public static async Task<object> Start(int n)
        {
            // importing a nodes module
            var func = Edge.Func(@" return require('./../../../calculate.js')");

            var result = await func(n);
            return result;
        }
    }
}
