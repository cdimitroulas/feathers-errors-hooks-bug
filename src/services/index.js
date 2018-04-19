// eslint-disable-next-line no-unused-vars
module.exports = function (app) {
  app.use('/test', {
    create: () => 'success'
  });

  const testService = app.service('test')
  testService.hooks({
    before: {
      create: [
        (context) => {
          // return new context object with modified data 
          const newData = { test: true }
          return { ...context, data: newData }
        },
        (context) => {
          throw Error('woops!')
        }
      ]
    },
    error: {
      create: [
        (context) => {
          // data should be { test: true }
          console.log(context.data) // {}
        }
      ]
    }
  })

  testService.create({})
};
