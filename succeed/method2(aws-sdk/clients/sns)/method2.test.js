import { publishMessage } from './sns-service';
import SNS from 'aws-sdk/clients/sns';

const mockPromise = jest.fn(); // mock for deep function - promise
jest.mock('aws-sdk/clients/sns', () => {
  // return a function as a constructor
  return jest.fn().mockImplementation(function () { // "normal function" not arrow function
    this.publish = jest.fn(() => ({ // mock publish function
      promise: mockPromise, // returns an object what includes promise property
    }));
  });
});


describe('With classic jest', () => {
  beforeEach(() => {
    process.env = Object.assign(process.env, { 
      AWS_REGION: 'eu-west-1',
      SNS_TOPIC_ARN: 'arn:sns'
    });
  });

  it('should publish message', async  () => {
    //const sns = new SNS();
    const type = 'MESSAGE_TEST';
    const data = { id: '123' };

    await publishMessage(type, data);

    // get instance of SNS, an instance has been created in production code
    const snsMocked = SNS.mock.instances[0];

    // expect promise function will be call too
    expect(mockPromise).toHaveBeenCalled();
    expect(snsMocked.publish).toHaveBeenCalledWith({
      Message: JSON.stringify({
        type,
        data
      }),
      TopicArn: process.env.SNS_TOPIC_ARN
    });
  });
});