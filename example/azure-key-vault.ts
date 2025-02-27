import { DefaultAzureCredential } from '@azure/identity';
import { SecretClient } from '@azure/keyvault-secrets';

export default async function getSecretFromVault(secretName) {
  const credential = new DefaultAzureCredential();
  const vaultName = 'ai-rag-workshop';
  const url = `https://${vaultName}.vault.azure.net`;

  const client = new SecretClient(url, credential);
  const secret = await client.getSecret(secretName);

  return secret.value;
}
