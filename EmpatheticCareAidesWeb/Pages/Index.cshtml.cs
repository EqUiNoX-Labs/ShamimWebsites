using Microsoft.AspNetCore.Mvc.RazorPages;

namespace EmpatheticCareAidesWeb.Pages
{
    public class IndexModel : PageModel
    {
        private readonly ILogger<IndexModel> _logger;

        public IndexModel(ILogger<IndexModel> logger)
        {
            _logger = logger;
        }

        public void OnGet()
        {
            ViewData["Title"] = "Compassionate home care in Leduc & Edmonton";
        }
    }
}
