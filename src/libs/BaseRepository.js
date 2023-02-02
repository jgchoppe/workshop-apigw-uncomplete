const {
  DeleteCommand,
  GetCommand,
  PutCommand,
  QueryCommand,
  UpdateCommand,
} = require('@aws-sdk/lib-dynamodb');

class BaseRepository {
  constructor({ documentClient, tableName }) {
    this.documentClient = documentClient;
    this.tableName = tableName;
  }

  async query(params) {
    return this.documentClient.send(new QueryCommand({
      ...params,
      TableName: this.tableName,
    }));
  }

  async get(params) {
    return this.documentClient.send(new GetCommand({
      ...params,
      TableName: this.tableName,
    }));
  }

  async delete(params) {
    return this.documentClient.send(new DeleteCommand({
      ...params,
      TableName: this.tableName,
    }));
  }

  async put(params) {
    return this.documentClient.send(new PutCommand({
      ...params,
      TableName: this.tableName,
    }));
  }

  async update(params) {
    return this.documentClient.send(new UpdateCommand({
      ...params,
      TableName: this.tableName,
    }));
  }
}

module.exports = {
  BaseRepository,
}
