import { SNS } from 'aws-sdk';

const snsClient = new SNS();


export const publishMessage = async (type, data) => {
  try {
    const res = await snsClient.publish({
      Message: JSON.stringify({
        type,
        data
      }),
      TopicArn: process.env.SNS_TOPIC_ARN
    }).promise();

    return res;
  } catch(err) {
    console.error(err, err.stack);
    throw new Error('something went wrong.');
  }
}