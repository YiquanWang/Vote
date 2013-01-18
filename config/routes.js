
var mongoose = require('mongoose')
  , Vote = mongoose.model('Vote')

module.exports = function (app, passport) {

  // vote routes
  var votes = require('../app/controllers/vote')

  // home route
  app.get('/survey', votes.show)
  app.post('/survey', votes.create)
  app.get('/survey/list', votes.list)
  app.get('/survey/show/:id', votes.view)
  app.param('id', function(req, res, next, id) {
    Vote
      .findOne({ _id : id })
      .exec(function (err, vote) {
        if (err) return next(err)
        if (!vote) return next(new Error('调查信息读取失败, 编号为:' + id))
        req.vote = vote       
        next()
      })
  })


  app.get('/survey/statistics', votes.statistics)

  app.get('/success', votes.success)


  var index = require('../app/controllers/index')
  app.get('/', index.index)
  
}
