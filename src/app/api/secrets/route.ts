import { createBaxterClient } from '@bella-baxter/sdk'

const client = await createBaxterClient({
  baxterUrl: process.env.BELLA_BAXTER_URL!,
  apiKey: process.env.BELLA_BAXTER_API_KEY!,
})

const secrets = await client.getAllSecrets('', '')
console.log(secrets)