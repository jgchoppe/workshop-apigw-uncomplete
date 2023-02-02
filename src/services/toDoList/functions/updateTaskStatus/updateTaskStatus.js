const {ClaimsInfoDecorator} = require("../../../../common/decorators/ClaimsInfoDecorator");
const {TodoListRepository} = require("../../../../common/dynamodb/TodoListRepository");
const config = require("../../../../common/config/environment")
const {getBody} = require("../../../../libs/body");
const {buildDocumentClient} = require("../../../../libs/buildDocument");
const {generateResponse} = require("../../../../libs/response");
const {StatusCodes} = require("http-status-codes");

const todoList = new TodoListRepository({documentClient: buildDocumentClient({}), tableName: config.TODO_LIST_TABLE})
async function updateTaskStatus(event, userId) {
  const body = getBody(event)
  // TODO: Get task id from event input
  const { id } = "fakeId"

  const item = await todoList.GetTask(id)
  if (!item) {
    return generateResponse(StatusCodes.NOT_FOUND, "task has not been found")
  } else if (item.userId !== userId) {
    return generateResponse(StatusCodes.FORBIDDEN, "Task User ID doesn't correspond to the request sender ID.")
  }

  await todoList.UpdateTaskStatus(userId, id, body.status)

  return generateResponse(StatusCodes.OK, "data has been updated")
}

const handler = (event) => ClaimsInfoDecorator(updateTaskStatus, event)

module.exports = {
  handler,
}