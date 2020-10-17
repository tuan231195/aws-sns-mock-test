import SNS from 'aws-sdk/clients/sns';

const snsClient = new SNS({region: process.env.AWS_REGION});


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