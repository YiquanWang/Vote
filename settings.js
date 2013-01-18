
/**
 * Module dependencies.
 */

var express = require('express')
  , mongoStore = require('connect-mongodb')

exports.boot = function(app, config, passport){
  bootApplication(app, config, passport)
}

// App settings and middleware

function bootApplication(app, config, passport) {

  app.set('showStackError', true)

  app.use(express.static(__dirname + '/public'))

  app.use(express.logger(':method :url :status'))

  // set views path, template engine and default layout
  app.set('views', __dirname + '/app/views')
  app.set('view engine', 'jade')

  app.configure(function () {
    // dynamic helpers
    app.use(function (req, res, next) {
      res.locals.appName = '残友 - 义工讲坛'
      res.locals.title = '残友 - 义工讲坛'
      res.locals.showStack = app.showStackError
      res.locals.req = req
      res.locals.formatDate = function (date) {
        return date.getFullYear()+'-'+date.getMonth()+'-'+date.getDate()
      }
      res.locals.stripScript = function (str) {
        return str.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
      }
      res.locals.formatPercent = function (num, isStyle) {
        var fixNum = num * 100;
        var percent = fixNum.toFixed(0);
        if(isStyle && percent == 0)
          percent = 1;
        return percent + '%'
      }
      res.locals.createPagination = function (pages, page) {
        var url = require('url')
          , qs = require('querystring')
          , params = qs.parse(url.parse(req.url).query)
          , str = ''

        params.page = 1
        var clas = page == 1 ? "active" : "no"
        str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">First</a></li>'
        str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">1</a></li>'
        for (var p = 2; p < pages + 1; p++) {
          params.page = p
          clas = page == p ? "active" : "no"
          str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">'+ p +'</a></li>'
        }
        params.page = --p
        clas = page == params.page ? "active" : "no"
        str += '<li class="'+clas+'"><a href="?'+qs.stringify(params)+'">Last</a></li>'

        return str
      }

      next()
    })

    // cookieParser should be above session
    app.use(express.cookieParser())

    // bodyParser should be above methodOverride
    app.use(express.bodyParser())
    app.use(express.methodOverride())

    app.use(express.session({
      secret: 'noobjs',
      store: new mongoStore({
        url: config.db,
        collection : 'sessions'
      })
    }))

    app.use(passport.initialize())
    app.use(passport.session())

    app.use(express.favicon())

    // routes should be at the last
    app.use(app.router)

    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next){
      // treat as 404
      if (~err.message.indexOf('not found')) return next()

      // log it
      console.error(err.stack)

      // error page
      res.status(500).render('500')
    })

    // assume 404 since no middleware responded
    app.use(function(req, res, next){
      res.status(404).render('404', { url: req.originalUrl })
    })

  })

  app.set('showStackError', false)

}
