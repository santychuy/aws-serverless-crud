const { v4 } = require('uuid');
const { DynamoDBClient, PutItemCommand } = require('@aws-sdk/client-dynamodb');

module.exports.create = async (event) => {
    const dynamoClient = new DynamoDBClient({ region: 'us-west-1' });

    const { title, description } = JSON.parse(event.body);

    const createdDate = new Date();

    const id = v4();

    try {
        const cmd = new PutItemCommand({
            TableName: 'TaskName',
            Item: {
                title,
                description,
                createdDate,
                id
            }
        });
        
        const res = await dynamoClient.send(cmd);
    
        return {
            statusCode: res.$metadata.httpStatusCode,
            body: res.Attributes
        }
    } catch (e) {
        return {
            statusCode: 400,
            body: {
                error: e
            }
        }
    }

};