import { publishMessage } from './sns-service';
import SNS from 'aws-sdk/clients/sns';

jest.mock('aws-sdk/clients/sns', () => {
  return {
    __esModule: true,
    default: jest.fn(() => {
      return {
        publish: jest.fn(() => ({
          promise: jest.fn(() => Promise.resolve()),
        })),
        
      }
    }),
  };
});


describe('With classic jest', () => {
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

    await publishMessage(type, data);

    expect(sns.publish().promise).toHaveBeenCalledTimes(1);
    expect(sns.publish).toHaveBeenCalledWith({
      Message: JSON.stringify({
        type,
        data
      }),
      TopicArn: process.env.SNS_TOPIC_ARN
    });
  });
});