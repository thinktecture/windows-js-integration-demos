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
using GalaSoft.MvvmLight.Messaging;

namespace Basta.WpfClient
{
    /// <summary>
    /// Interaction logic for Dialog1.xaml
    /// </summary>
    public partial class EmployeeDetails : Window
    {
        public int EmployeeId { get; set; }
        private EmployeeDto _employee;

        public EmployeeDetails()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {
            using (NorthwindEntities _context = new NorthwindEntities())
            {
                Employee empl = _context.Employees.First(x => x.EmployeeID == this.EmployeeId);

                _employee = new EmployeeDto()
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

                this.DataContext = _employee;
            }
        }

        private void btnAbbrechen_Click(object sender, RoutedEventArgs e)
        {
            this.Close();
        }

        private void btnOk_Click(object sender, RoutedEventArgs e)
        {
            Messenger.Default.Send(_employee);
            this.Close();
        }
    }
}
