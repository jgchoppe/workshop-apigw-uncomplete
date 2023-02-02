const {BaseRepository} = require("../../libs/BaseRepository");
const { v4: uuidV4 } = require('uuid')

const TaskStatus = {
  ToDo: 'TODO',
  InProgress: 'IN_PROGRESS',
  Done: 'DONE',
}

class TodoListRepository extends BaseRepository {
  async CreateTask(task) {
    const taskId = uuidV4()
    const item = {
      PK: `USER#${task.userId}`,
      SK: `TASK#${taskId}`,
      taskId: taskId,
      userId: task.userId,
      name: task.name,
      status: task.status,
      description: task.description,
      dueDate: task.dueDate,
      type: 'TASK',
    }

    await this.put({
      Item: {
        ...item,
      }
    })
    return taskId
  }

  async ListUserTasks(userId) {
    const items = await this.query({
      KeyConditionExpression: 'PK = :user',
      ExpressionAttributeValues: {
        ':user': `USER#${userId}`,
      }
    })

    return items.Items
  }

  async UpdateTaskStatus(userId, taskId, status) {
    return this.update({
      UpdateExpression: 'SET #s = :newStatus',
      ExpressionAttributeNames: {
        '#s': 'status'
      },
      ExpressionAttributeValues: {
        ':newStatus': status
      },
      Key: {
        'PK': `USER#${userId}`,
        'SK': `TASK#${taskId}`
      }
    })
  }

  async GetTask(taskId) {
    const item = await this.query({
      IndexName: 'GSI1-PK', // taskId
      KeyConditionExpression: '#PK = :PK and #SK = :SK',
      ExpressionAttributeNames: {
        '#PK': 'type',
        '#SK': 'taskId',
      },
      ExpressionAttributeValues: {
        ':PK': 'TASK',
        ':SK': taskId,
      }
    })

    if (!item || !item.Items || !item.Items[0])
      return null
    return {
      id: item.Items[0].taskId,
      userId: item.Items[0].userId,
      status: item.Items[0].status,
      name: item.Items[0].name,
      description: item.Items[0].description,
      dueDate: item.Items[0].dueDate,
    }
  }

  async RemoveTask(userId, taskId) {
    await this.delete({
      Key: {
        'PK': `USER#${userId}`,
        'SK': `TASK#${taskId}`,
      }
    })
  }
}

module.exports = {
  TaskStatus,
  TodoListRepository,
}