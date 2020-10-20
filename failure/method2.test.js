import * as AWSMock from 'jest-aws-sdk-mock';
AWSMock.mock('SNS', 'publish', 'result-message');

const { publishMessage } = require('./sns-service');
const SNS = require('aws-sdk/clients/sns');

describe('With jest-aws-sdk-mock', () => {
  it('should publish message', async  () => {
    const sns = new SNS();
    const type = 'MESSAGE_TEST';
    const data = { id: '123' };

    const result = await publishMessage(type, data);

    expect(result).toBe('result-message');
    expect(sns.publish).toHaveBeenCalledTimes(1);
    expect(sns.publish).toHaveBeenCalledWith({
      Message: JSON.stringify({
        type,
        data
      }),
      TopicArn: process.env.SNS_TOPIC_ARN
    });
  });
});