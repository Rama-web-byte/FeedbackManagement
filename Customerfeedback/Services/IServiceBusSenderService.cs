using System.Threading.Tasks;
using Customerfeedback.Models;
namespace Customerfeedback.Services
{
    public interface IServiceBusSenderService
    {
        Task SendMessageAsync<T>(T message);
    }
}
