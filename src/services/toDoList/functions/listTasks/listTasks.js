const {ClaimsInfoDecorator} = require("../../../../common/decorators/ClaimsInfoDecorator");
const {TodoListRepository} = require("../../../../common/dynamodb/TodoListRepository");
const {buildDocumentClient} = require("../../../../libs/buildDocument");
const config = require("../../../../common/config/environment")
const {generateResponse} = require("../../../../libs/response");
const {StatusCodes} = require("http-status-codes");

const TodoList = new TodoListRepository({documentClient: buildDocumentClient({}), tableName: config.TODO_LIST_TABLE})

async function listTasks(event, userId) {
  const items = await TodoList.ListUserTasks(userId)

  return generateResponse(StatusCodes.OK, {
    tasks: items,
  })
}

const handler = (event) => ClaimsInfoDecorator(listTasks, event)

module.exports = {
  handler,
}