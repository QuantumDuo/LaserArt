namespace Services.Interfaces
{
    public interface IEmailSender
    {
        public record struct EmailTemplate(string Subject, string Filename);
        public Task SendEmailAsync(string email, EmailTemplate template, params string[] parameters);
    }
}
