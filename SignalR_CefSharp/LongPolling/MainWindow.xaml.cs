using System.IO;
using System.Linq;
using System.Net.Http;
using System.Reflection;
using System.Web.Http;
using System.Windows;
using Microsoft.Owin.Hosting;

namespace LongPolling
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private string webApiBaseAddress = "http://localhost:9000";
        private string employeesBaseAddress = "http://localhost:8090";

        public MainWindow()
        {
            InitializeComponent();
        }

        private void wpf_Click(object sender, RoutedEventArgs e)
        {
            DialogListe dl = new DialogListe();
            dl.ShowDialog();
        }

        private void Button_Click(object sender, RoutedEventArgs e)
        {
            // Start OWIN host 
            WebApp.Start<Startup>(url: webApiBaseAddress);

            label1.Content = "Web API host started";
        }

        private void browser_Click(object sender, RoutedEventArgs e)
        {
            HttpClient client = new HttpClient();
            var response = client.GetAsync(employeesBaseAddress).Result; 
        }
    }
}
