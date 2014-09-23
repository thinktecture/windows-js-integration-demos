using System;
using System.Windows;
using System.Windows.Controls;
using CefSharp;
using CefSharp.Wpf;

namespace LongPolling
{
    public partial class CefWrapper : UserControl
    {
        private WebView _webView;
        private static bool _isCefInitialized;

        public int EmployeeId { get; set; }

        public static void InitializeChromiumEmbedded()
        {
            _isCefInitialized = true;

            var settings = new CefSharp.Settings
            {
                PackLoadingDisabled = false,
            };

            if (!CEF.Initialize(settings))
            {
                throw new Exception("Could not initialize CEF");
            }
        }

        public CefWrapper()
        {
            InitializeComponent();

            DataContext = this;
            DataContextChanged += CefWrapper_DataContextChanged;
        }

        void CefWrapper_DataContextChanged(object sender, DependencyPropertyChangedEventArgs e)
        {
            EmployeeId = (int)e.NewValue;

            if (_isCefInitialized)
            {
                var urlToNavigate = "http://localhost:9000/#/employee/" + EmployeeId;

                var browserSettings = new BrowserSettings
                {
                    UniversalAccessFromFileUrlsAllowed = true
                };

                _webView = new WebView(urlToNavigate, browserSettings);
                _webView.RegisterJsObject("cefCallback", new CefBridge());

                Content = _webView;
            }
            else
            {
                Content = new Label() {
                    Content = @"CEF is not initialized.
                        (This is ok in design-mode! If this happens at runtime, you need to call MapWrapper.InitializeChromiumEmbedded() before instantiating the MapWrapper-control.)"
                };
            }
        }

        public void ExecuteScript(string script)
        {
            _webView.ExecuteScript(script);
        }

        public void ShowDevTools()
        {
            if (_webView.IsBrowserInitialized)
            {
                _webView.ShowDevTools();
            }
        }

    }
}
