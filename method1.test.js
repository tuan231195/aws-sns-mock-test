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
    const data = { id: '123' };

    await publishMessage('MESSAGE_TEST', data);

    expect(sns.publish().promise).toHaveBeenCalledTimes(1);
    expect(sns.publish().promise).toHaveBeenCalledWith(data);
  });
});