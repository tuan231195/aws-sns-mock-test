# aws-sns-mock-test
it's sample project to understand how mock works with aws.
Example with SNS. 

## Purpose 

Succeed to make sure that the sns message is sent with specific parameter by calling `snsService.publishMessage()`

## Installation

run : 
`npm install`

## Folder /succeed

# /succeed/method1
In this case, we import SNS by `import { SNS } from 'aws-sdk';`
That works as expected.

run: 
```
npm run test-succeed
```

# /succeed/method2
The implementation in `/succeed/method2` fixes the `failure/method1.test.js` by using `import SNS from 'aws-sdk/clients/sns';`
https://stackoverflow.com/a/64404039/11465286 


## Folder /failure

In this case, we import SNS by `import SNS from 'aws-sdk/clients/sns';`
Impossible to make it work.

Two ways  to test it : 

- Method1 : By just using jest. (Fixed by https://stackoverflow.com/a/64404039/11465286, see ./succeed/method2)
- Method2 : By using a third lib, called `jest-aws-sdk-mock`

run: 
```
npm run test-failure
```
