const getBody = (event) => {
  return JSON.parse(event.body)
}

module.exports = {
  getBody,
}