import AWS from "../aws/aws.config";

const dynamoDB = new AWS.DynamoDB.DocumentClient();

export default dynamoDB;
