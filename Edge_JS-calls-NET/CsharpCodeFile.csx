using System.Threading.Tasks;
public class Startup
{
  public async Task<object> Invoke(object input)
  {
    return "Hello World to " + input.ToString();
  }
}