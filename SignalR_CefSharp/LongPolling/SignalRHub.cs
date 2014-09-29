using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using DataLayer.Models;
using GalaSoft.MvvmLight.Messaging;
using Microsoft.AspNet.SignalR;
using Newtonsoft.Json;

namespace Basta.WpfClient
{
    public class SignalRHub : Hub
    {
        public void UpdateEmployee(string empl)
        {
            var employee = JsonConvert.DeserializeObject<EmployeeDto>(empl);
            Messenger.Default.Send(employee);
        }

        public override Task OnConnected()
        {
            UserHandler.ConnectedIds.Add(Context.ConnectionId);
            return base.OnConnected();
        }

        public override Task OnDisconnected(bool stopCalled)
        {
            UserHandler.ConnectedIds.Remove(Context.ConnectionId);
            return base.OnDisconnected(stopCalled);
        }
    }

    public static class UserHandler
    {
        public static HashSet<string> ConnectedIds = new HashSet<string>();
    }
}
