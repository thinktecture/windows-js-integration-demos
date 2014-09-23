using System.Linq;
using System.Web.Http;
using DataLayer;
using DataLayer.Models;

namespace bastaWebApi
{
    public class EmployeesController : ApiController
    {
        public EmployeeDto getEmployeeById(int employeeId)
        {
            EmployeeDto employee = new EmployeeDto();

            if (employeeId > 0)
            {
                using (var _context = new NorthwindEntities())
                {
                    Employee empl = _context.Employees.First(x => x.EmployeeID == employeeId);

                    employee = new EmployeeDto()
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
                }
            }
            return employee;
        }

    }
}
