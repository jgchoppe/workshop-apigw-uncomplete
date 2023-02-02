const {ClaimsInfoDecorator} = require("../../../../common/decorators/ClaimsInfoDecorator");
const {TodoListRepository, TaskStatus} = require("../../../../common/dynamodb/TodoListRepository");
const {getBody} = require("../../../../libs/body");
const {generateResponse} = require("../../../../libs/response");
const {StatusCodes} = require("http-status-codes");
const {buildDocumentClient} = require("../../../../libs/buildDocument");
const config = require("../../../../common/config/environment")

const TodoList = new TodoListRepository({documentClient: buildDocumentClient({}), tableName: config.TODO_LIST_TABLE})

async function createTask(event, userId) {
  const body = getBody(event)
  let taskId = ""

  // TODO: Create Task using the TodoListRepository class

  return generateResponse(StatusCodes.CREATED, {
    task: {
      id: taskId,
      userId: userId,
      status: TaskStatus.ToDo,
      name: body.name,
      description: body.description,
      dueDate: body.dueDate,
      type: 'TASK',
    }
  })
}

const handler = (event) => ClaimsInfoDecorator(createTask, event)

module.exports = {
  handler,
}