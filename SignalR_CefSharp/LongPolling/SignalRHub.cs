using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNet.SignalR;

namespace LongPolling
{
    public class SignalRHub : Hub
    {
        public void Send(int employeeId)
        {
            Clients.All.broadcastMessage(employeeId);
        }
    }
}
