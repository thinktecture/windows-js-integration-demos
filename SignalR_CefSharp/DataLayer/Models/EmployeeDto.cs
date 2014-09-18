using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataLayer.Models
{
    public class EmployeeDto
    {
        public int EmployeeId { get; set; }
        public string Vorname { get; set; }
        public string Nachname { get; set; }
        public string Adresse { get; set; }
        public string Stadt { get; set; }
        public string PLZ { get; set; }
        public string Land { get; set; }
        public DateTime? Geburtsdatum { get; set; }
        public DateTime? Einstellungsdatum { get; set; }
        public string Telefon { get; set; }
    }
}
