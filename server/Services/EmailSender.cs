using MailKit.Net.Smtp;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using MimeKit;
using Services.Interfaces;
using static Services.Interfaces.IEmailSender;

namespace Services
{
    public class EmailSender : IEmailSender
    {
        private readonly IConfiguration configuration;
        private readonly ILogger<EmailSender> logger;
        public EmailSender(IConfiguration configuration, ILogger<EmailSender> logger)
        {
            this.configuration = configuration;
            this.logger = logger;
        }
        public async Task SendEmailAsync(string email, EmailTemplate template, params string[] parameters)
        {
            try
            {
                var emailMessage = new MimeMessage();

                emailMessage.From.Add(new MailboxAddress(configuration["EmailConfiguration:UserName"],
                                                            configuration["EmailConfiguration:From"]));
                emailMessage.To.Add(new MailboxAddress(string.Empty, email));
                emailMessage.Subject = template.Subject;
                BodyBuilder builder = new() { HtmlBody = string.Format(File.ReadAllText($"Templates\\{template.Filename}.html"), parameters) };
                emailMessage.Body = builder.ToMessageBody();

                using var client = new SmtpClient();
                await client.ConnectAsync(configuration["EmailConfiguration:SmtpServer"],
                                            int.Parse(configuration["EmailConfiguration:Port"]!),
                                            useSsl: true);
                client.Authenticate(configuration["EmailConfiguration:From"],
                                    configuration["EmailConfiguration:Password"]);
                await client.SendAsync(emailMessage);
                await client.DisconnectAsync(true);
                logger.LogInformation("File '{file}' was sent on {email}", template.Filename, email);
            }
            catch (Exception ex)
            {
                logger.LogError("{Message}", ex.Message);
            }
        }
    }
}
