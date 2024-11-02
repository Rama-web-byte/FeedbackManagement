using Azure.Messaging.ServiceBus;
using Microsoft.Extensions.Configuration;
using System.Text.Json;
using System.Threading.Tasks;
namespace Customerfeedback.Services
{
    public class ServiceBusSenderService:IServiceBusSenderService
    {
        private readonly string _connectionstring;
        private readonly string _queuename;

        public ServiceBusSenderService(IConfiguration configuration)
        {
            _connectionstring = configuration["ServiceBus:ConnectionString"];
            _queuename = configuration["ServiceBus:QueueName"];

        }
        public async Task SendMessageAsync<T>(T message)
        {
            await using var client = new ServiceBusClient(_connectionstring);
            ServiceBusSender sender = client.CreateSender(_queuename);

            string messagebody = JsonSerializer.Serialize(message);
            ServiceBusMessage serviceBusMessage = new ServiceBusMessage(messagebody);
            await sender.SendMessageAsync(serviceBusMessage);

        }
    }
}
