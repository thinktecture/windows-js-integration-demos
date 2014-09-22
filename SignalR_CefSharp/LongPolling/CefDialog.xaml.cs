using System;
using System.ComponentModel;
using System.Windows;
using System.Windows.Input;
using System.Windows.Shapes;
using CefSharp;
using CefSharp.Wpf;

namespace LongPolling
{
    /// <summary>
    /// Interaction logic for CefDialog.xaml
    /// </summary>
    public partial class CefDialog : Window
    {
        private readonly WebView webView;
        private bool loaded;

        public CefDialog()
        {
            InitializeComponent();

            var settings = new CefSharp.Settings();
            settings.PackLoadingDisabled = true;

            if (CEF.Initialize(settings))
            {
                var browserSettings = new BrowserSettings
                {
                    UniversalAccessFromFileUrlsAllowed = true
                };

                // ACHTUNG: als Beispiel hier fest verdrahtete URL inkl. Parameter
                var urlToNavigate = "http://localhost:9000/#/employee/3";

                webView = new WebView(urlToNavigate, browserSettings);
                webView.LoadCompleted += webView_LoadCompleted;
                webView.RegisterJsObject("cefCallback", new CefBridge());

                CefGrid.Children.Add(webView);
            }
        }

        private void webView_LoadCompleted(object sender, LoadCompletedEventArgs url)
        {
            loaded = true;
        }

        private void Window_KeyDown(object sender, KeyEventArgs e)
        {
            if (loaded)
            {
                if (e.Key == Key.I &&
                    (Keyboard.Modifiers & (ModifierKeys.Control | ModifierKeys.Shift)) == (ModifierKeys.Control | ModifierKeys.Shift))
                {
                    webView.ShowDevTools();
                }
            }
        }

        protected override void OnClosed(EventArgs e)
        {
            CEF.Shutdown();

            base.OnClosed(e);
        }
    }

    public class CefBridge
    {
        public void SampleDataResult(object result)
        {
        }
    }

}
