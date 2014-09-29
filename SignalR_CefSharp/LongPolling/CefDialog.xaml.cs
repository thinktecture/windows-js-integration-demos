using System.Windows;
using System.Windows.Input;
using Basta.WpfClient.ViewModel;

namespace Basta.WpfClient
{
    /// <summary>
    /// Interaction logic for CefDialog.xaml
    /// </summary>
    public partial class CefDialog : Window
    {
        private static bool _isCefInit;

        public CefDialog(int employeeId)
        {
            if (!_isCefInit)
            {
                _isCefInit = true;
                CefWrapper.InitializeChromiumEmbedded();
            }

            InitializeComponent();
            cefWrapper.DataContext = employeeId;
        }

        private void Window_KeyDown(object sender, KeyEventArgs e)
        {
            if (e.Key == Key.I &&
                (Keyboard.Modifiers & (ModifierKeys.Control | ModifierKeys.Shift)) == (ModifierKeys.Control | ModifierKeys.Shift))
            {
                cefWrapper.ShowDevTools();
            }
        }

        private void GetSampleDataFromJavaScript(object sender, RoutedEventArgs e)
        {
            cefWrapper.ExecuteScript("ttTools.getSampleData()");
        }
    }

    public class CefBridge
    {
        public void SampleDataResult(object result)
        {
            MessageBox.Show("Full Name: " + result);
        }
    }
}
