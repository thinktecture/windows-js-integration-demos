using System;
using System.Diagnostics;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using DataLayer;
using DataLayer.Models;
using GalaSoft.MvvmLight.Messaging;
using Microsoft.AspNet.SignalR;
using Microsoft.AspNet.SignalR.Hubs;
using Microsoft.Owin.Hosting;
using System.Data.Entity;

namespace Basta.WpfClient
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private string selfhostBaseAddress = "http://localhost:9000";

        private NorthwindEntities _context = new NorthwindEntities();

        private IHubContext hubContext;
        private IHubConnectionContext<dynamic> clients;

        public MainWindow()
        {
            InitializeComponent();
            InitializeSelfhosting();

            Messenger.Default.Register<EmployeeDto>(this, HandleEmployeeDto);
        }


        public void ShowHideDetails(object sender, RoutedEventArgs e)
        {
            var employeeId = ((Button)sender).CommandParameter;
            if (employeeId != null)
            {
                var details = new EmployeeDetails();
                details.EmployeeId = (int)employeeId;

                details.ShowDialog();
            }
        }


        public void OpenWebDialog(object sender, RoutedEventArgs e)
        {
            var employeeId = ((Button)sender).CommandParameter;

            if (UserHandler.ConnectedIds.Count <= 0)
            {
                Process proc = Process.Start(@"C:\Program Files (x86)\Google\Chrome\Application\chrome.exe",
                  selfhostBaseAddress + "/#/employee/" + employeeId);

                //Process proc = Process.Start(@"C:\Program Files\Internet Explorer\iexplore.exe",
                //  selfhostBaseAddress + "/#/employee/" + employeeId);

                hubContext = GlobalHost.ConnectionManager.GetHubContext<SignalRHub>();

                clients = hubContext.Clients;
            }

            clients.All.broadcastMessage(employeeId);
        }


        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            System.Windows.Data.CollectionViewSource employeeViewSource = ((System.Windows.Data.CollectionViewSource)(this.FindResource("employeeViewSource")));

            _context.Employees.Load();

            employeeViewSource.Source = _context.Employees.Local;
        }

        /// <summary>
        /// Init the self hosted WebAPI
        /// </summary>
        private void InitializeSelfhosting()
        {
            WebApp.Start<Startup>(url: selfhostBaseAddress);

            label1.Content = "Selfhosting gestartet:";
            label2.Content = "WebApi " + selfhostBaseAddress + "/api/employees/{id}";
            label3.Content = "Webanwendung " + selfhostBaseAddress;
        }

        private void OpenCefDialog(object sender, RoutedEventArgs e)
        {
            var selectedItem = this.employeeDataGrid.SelectedItem;
            var employeeId = ((Employee)selectedItem).EmployeeID;

            CefDialog c = new CefDialog(employeeId);
            c.ShowDialog();
        }


        private void HandleEmployeeDto(EmployeeDto employee)
        {
            var e = _context.Employees.First(x => x.EmployeeID == employee.EmployeeId);
            e.FirstName = employee.Vorname;
            e.LastName = employee.Nachname;
            e.Country = employee.Land;
            e.Address = employee.Adresse;
            e.City = employee.Stadt;
            e.HomePhone = employee.Telefon;
            e.PostalCode = employee.PLZ;

            _context.SaveChanges();
            this.Dispatcher.Invoke((Action)(() => employeeDataGrid.Items.Refresh()));
        }
    }
}

