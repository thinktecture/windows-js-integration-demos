using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows;
using System.Windows.Controls;
using System.Windows.Data;
using System.Windows.Documents;
using System.Windows.Input;
using System.Windows.Media;
using System.Windows.Media.Imaging;
using System.Windows.Shapes;
using DataLayer;
using DataLayer.Models;

namespace LongPolling
{
    /// <summary>
    /// Interaction logic for Dialog1.xaml
    /// </summary>
    public partial class EmployeeDetails : Window
    {
        public int EmployeeId { get; set; }

        private NorthwindEntities _context = new NorthwindEntities();

        public EmployeeDetails()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            Employee empl = _context.Employees.First(x => x.EmployeeID == this.EmployeeId);

            EmployeeDto employee = new EmployeeDto()
            {
                EmployeeId = empl.EmployeeID,
                Vorname = empl.FirstName,
                Nachname = empl.LastName,
                Adresse = empl.Address,
                Stadt = empl.City,
                PLZ = empl.PostalCode,
                Land = empl.Country,
                Geburtsdatum = empl.BirthDate,
                Einstellungsdatum = empl.HireDate,
                Telefon = empl.HomePhone
            };

            this.DataContext = employee;
        }
    }
}
