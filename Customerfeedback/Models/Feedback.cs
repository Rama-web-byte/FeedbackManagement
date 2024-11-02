namespace Customerfeedback.Models
{
    public class Feedback
    {
        public string id { get; set; }
        public string Userid { get; set; }
        public string Message { get; set; }
        public int Rating { get; set; } // e.g., from 1 to 5
    }
}
