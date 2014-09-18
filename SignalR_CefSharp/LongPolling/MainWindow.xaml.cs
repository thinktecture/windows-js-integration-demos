using System.Net.Http;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using DataLayer;
using Microsoft.Owin.Hosting;
using System.Data.Entity;

namespace LongPolling
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        public static readonly RoutedCommand DetailsCommand = new RoutedCommand();

        private string webApiBaseAddress = "http://localhost:9000";
        private string employeesBaseAddress = "http://localhost:8090";

        private NorthwindEntities _context = new NorthwindEntities();

        public MainWindow()
        {
            InitializeComponent();

            CommandBinding customCommandBinding = new CommandBinding(
                DetailsCommand, DetailsCommand_Executed, DetailsCommand_CanExecute);

            // attach CommandBinding to root window
            this.CommandBindings.Add(customCommandBinding);

        }

        private void DetailsCommand_CanExecute(object sender,
            CanExecuteRoutedEventArgs e)
        {
            Control target = e.Source as Control;

            if (target != null)
            {
                e.CanExecute = true;
            }
            else
            {
                e.CanExecute = false;
            }
        }

        void DetailsCommand_Executed(object sender, ExecutedRoutedEventArgs e)
        {
            WebApp.Start<Startup>(url: webApiBaseAddress);

            label1.Content = "Web API host started";
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

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            System.Windows.Data.CollectionViewSource employeeViewSource = ((System.Windows.Data.CollectionViewSource)(this.FindResource("employeeViewSource")));

            _context.Employees.Load();

            employeeViewSource.Source = _context.Employees.Local;

        }

        private void employeeDataGrid_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {
            var emplyoeeId = ((Employee)e.AddedItems[0]).EmployeeID;

            EmployeeDetails details = new EmployeeDetails();
            details.EmployeeId = emplyoeeId;

            details.ShowDialog();
        }
    }
}
