using System;
using System.Diagnostics;
using System.Linq;
using System.Net.Http;
using System.Runtime.Remoting.Channels;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Input;
using DataLayer;
using DataLayer.Models;
using GalaSoft.MvvmLight.Messaging;
using Microsoft.AspNet.SignalR;
using Microsoft.Owin.Hosting;
using System.Data.Entity;

namespace LongPolling
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {
        private string selfhostBaseAddress = "http://localhost:9000";
        private string employeesBaseAddress = "http://localhost:8090";

        private NorthwindEntities _context = new NorthwindEntities();
        private IDisposable server = null;
        private int browserId;
        private SignalRHub theHub;

        public MainWindow()
        {
            InitializeComponent();
            InitializeSelfhosting();
            theHub = new SignalRHub();
        }


        public void ShowHideDetails(object sender, RoutedEventArgs e)
        {
            var employeeId = ((Button)sender).CommandParameter;
            if (employeeId != null)
            {
                EmployeeDetails details = new EmployeeDetails();
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

                Messenger.Default.Register<EmployeeDto>(this, HandleEmployeeDto);
            }

            var context = GlobalHost.ConnectionManager.GetHubContext<SignalRHub>();
            var clients = context.Clients;
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
            CefDialog c = new CefDialog();
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

