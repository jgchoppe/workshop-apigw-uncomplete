const {ClaimsInfoDecorator} = require("../../../../common/decorators/ClaimsInfoDecorator");
const {TodoListRepository} = require("../../../../common/dynamodb/TodoListRepository");
const {buildDocumentClient} = require("../../../../libs/buildDocument");
const config = require("../../../../common/config/environment")
const {generateResponse} = require("../../../../libs/response");
const {StatusCodes} = require("http-status-codes");

const TodoList = new TodoListRepository({documentClient: buildDocumentClient({}), tableName: config.TODO_LIST_TABLE})

async function getTask(event, userId) {
  // TODO: Get task id from event input
  const { id } = "fakeId"

  // TODO: Get task

  // TODO: Send back the task content
  return generateResponse(StatusCodes.OK, {
    task: {}
  })
}

const handler = (event) => ClaimsInfoDecorator(getTask, event)

module.exports = {
  handler,
}