using System;
using System.Threading.Tasks;
using Amazon.Lambda.Core;
using Amazon.SecretsManager;
using Amazon.SecretsManager.Model;
using Newtonsoft.Json;
using ChatGptDotNET;

[assembly: LambdaSerializer(typeof(Amazon.Lambda.Serialization.SystemTextJson.DefaultLambdaJsonSerializer))]

namespace YourNamespace
{
    public class YourClass
    {
        public async Task<string> YourMethod(ILambdaContext context)
        {
            var secretsManager = new AmazonSecretsManagerClient();
            var secretValueRequest = new GetSecretValueRequest { SecretId = Environment.GetEnvironmentVariable("OPENAI_SECRET_NAME") };
            var secretValueResponse = await secretsManager.GetSecretValueAsync(secretValueRequest);
            var secret = JsonConvert.DeserializeObject<OpenAISecret>(secretValueResponse.SecretString);
            
            var chatGPTClient = new ChatGPTClient(secret.OpenAiOrganization, secret.OpenAiSecretApiKey);
            string prompt = "respond to this message";
            string queryResponse = await chatGPTClient.Query(prompt);

            // TODO: add code to store queryResponse in the database

            return queryResponse;
        }
    }

    public class OpenAISecret
    {
        public string OpenAiOrganization { get; set; }
        public string OpenAiSecretApiKey { get; set; }
    }
}