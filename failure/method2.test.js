import { publishMessage } from './sns-service';
import SNS from 'aws-sdk/clients/sns';

const AWSMock = require('jest-aws-sdk-mock');
AWSMock.mock('SNS', 'publish', 'result-message');

describe('With jest-aws-sdk-mock', () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, { 
      AWS_REGION: 'eu-west-1',
      SNS_TOPIC_ARN: 'arn:sns'
    });
  });

  it('should publish message', async  () => {
    const sns = new SNS();
    const type = 'MESSAGE_TEST';
    const data = { id: '123' };

    const resut = await publishMessage(type, data);

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