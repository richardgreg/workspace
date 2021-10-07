require('dotenv').config();
import { InfuraProvider } from '@ethersproject/providers';

export const handler = async (event) => {
  try {
    const contractAddress = event.queryStringParameters.contractAddress;
    const provider = new InfuraProvider('homestead', {
      projectId: process.env.INFURA_PROJECT_ID,
      projectSecret: process.env.INFURA_PROJECT_SECRET,
    });
    const contractCode = await provider.getCode(contractAddress);
    const isContract = contractCode !== '0x';
    return { statusCode: 200, body: JSON.stringify(isContract) };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Failed to check if address points to a contract',
      }),
    };
  }
};
