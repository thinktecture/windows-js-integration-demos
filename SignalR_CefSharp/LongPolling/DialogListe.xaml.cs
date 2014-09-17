﻿using System;
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

namespace LongPolling
{
    /// <summary>
    /// Interaction logic for DialogListe.xaml
    /// </summary>
    public partial class DialogListe : Window
    {
        private NorthwindEntities _context = new NorthwindEntities();

        public DialogListe()
        {
            InitializeComponent();
        }

        private void Window_Loaded(object sender, RoutedEventArgs e)
        {

            System.Windows.Data.CollectionViewSource employeeViewSource = ((System.Windows.Data.CollectionViewSource)(this.FindResource("employeeViewSource")));

            _context.Employees.Load();

            employeeViewSource.Source = _context.Employees.Local;

        }
    }
}