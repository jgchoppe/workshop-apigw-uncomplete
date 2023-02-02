const {ClaimsInfoDecorator} = require("../../../../common/decorators/ClaimsInfoDecorator");
const {TodoListRepository} = require("../../../../common/dynamodb/TodoListRepository");
const {buildDocumentClient} = require("../../../../libs/buildDocument");
const config = require("../../../../common/config/environment")
const {generateResponse} = require("../../../../libs/response");
const {StatusCodes} = require("http-status-codes");

const TodoList = new TodoListRepository({documentClient: buildDocumentClient({}), tableName: config.TODO_LIST_TABLE})

async function removeTask(event, userId) {
  // TODO: Get task id from event input
  const { id } = "fakeId"

  const item = await TodoList.GetTask(id)
  if (!item) {
    return generateResponse(StatusCodes.NOT_FOUND, "task has not been found")
  } else if (item.userId !== userId) {
    return generateResponse(StatusCodes.FORBIDDEN, "Task User ID doesn't correspond to the request sender ID.")
  }

  await TodoList.RemoveTask(userId, id)

  return generateResponse(StatusCodes.OK, {
    taskId: id,
  })
}

const handler = (event) => ClaimsInfoDecorator(removeTask, event)

module.exports = {
  handler,
}