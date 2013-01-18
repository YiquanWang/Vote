
var mongoose = require('mongoose')
  , Vote = mongoose.model('Vote')
  , Question = require('../lib/qs_lib')


// Create an vote
exports.create = function (req, res) {
  var vote = new Vote(req.body);

  //format qs3's answer
  if((typeof(req.body.qs3)).toLowerCase() == 'object'){
    vote.qs3 = "";
    for (var i = 0; i < req.body.qs3.length; i++) {
      if(req.body.qs3[i] == '其他')
        vote.qs3 += req.body.qs3[i] + ':';
      else if (i != req.body.qs3.length - 1)
        vote.qs3 += req.body.qs3[i] + ', ';
      else
        vote.qs3 += req.body.qs3[i];

    }
  }

  //format qs4's answer
  if((typeof(req.body.qs4)).toLowerCase() == 'object'){
    vote.qs4 = "";
    for (var i = 0; i < req.body.qs4.length; i++) {
      if (i % 2 == 0) 
        vote.qs4 += req.body.qs4[i] + ':';
      else if (i != req.body.qs4.length - 1)
        vote.qs4 += req.body.qs4[i] + ', ';
      else
        vote.qs4 += req.body.qs4[i];
    }
  }

  vote.save(function(err, votes){
      if (err) {
        console.log(vote);
        res.render('vote/form', {
            title: '问卷调查'
          , qses: Question.qs
          , vote: vote
          , errors: err.errors
        })
      }
      else {
        res.redirect('/success?id='+votes.id)
      }
    })
}

// success page
exports.success = function(req, res){ 
  res.render('layouts/success', {
      title: '填写成功'
  })
}


exports.show = function(req, res){ 
  res.render('vote/form', {
      title: '问卷调查'
    , vote: new Vote({})
    , qses: Question.qs
  })     
}


exports.list = function(req, res){
  var perPage = 15
    , page = req.param('page') > 1 ? req.param('page') - 1 : 0

  Vote
    .find({})
    .populate('user', 'name')
    .sort({'createdAt': -1}) // sort by date
    .limit(perPage)
    .skip(perPage * page)
    .exec(function(err, votes) {
      if (err) return res.render('500')
      Vote.count().exec(function (err, count) {
        res.render('vote/list', {
            title: '问卷记录'
          , votes: votes
          , page: page + 1
          , pages: count / perPage
        })
      })
    })
}

exports.view = function(req, res){ 
  res.render('vote/show', {
      title: '调查问卷查看'
    , vote: req.vote
    , qses: Question.qs
  })     
}

exports.statistics = function(req, res){
  gender = {'male':0,'female':0,'totle':0}
  qs1_sta = {'a':0,'b':0,'none':0,'totle':0}  
  qs2_sta = {'a':0,'b':0,'c':0,'d':0,'e':0,'f':0,'g':0,'none':0,'totle':0}
  qs3_sta = {'a':0,'b':0,'c':0,'d':0,'none':0,'totle':0}

  Vote
    .find({})
    .exec(function(err, votes) {
      if (err) return res.render('500')
      var count = votes.length;
      gender.totle = count;
      for(var i=0; i<count; i++) {

        switch(votes[i].sex){
          case '男': gender.male++; break;
          case '女': gender.female++; break;
        }

        switch(votes[i].qs1){
          case '愿意': qs1_sta.a++; break;
          case '不愿意': qs1_sta.b++; break;
          default : qs1_sta.none++; break;
        }
        qs1_sta.totle = qs1_sta.a + qs1_sta.b + qs1_sta.none;

        if(votes[i].qs2.indexOf('星期一') >= 0) qs2_sta.a++;
        if(votes[i].qs2.indexOf('星期二') >= 0) qs2_sta.b++;
        if(votes[i].qs2.indexOf('星期三') >= 0) qs2_sta.c++;
        if(votes[i].qs2.indexOf('星期四') >= 0) qs2_sta.d++;
        if(votes[i].qs2.indexOf('星期五') >= 0) qs2_sta.e++;
        if(votes[i].qs2.indexOf('星期六') >= 0) qs2_sta.f++;
        if(votes[i].qs2.indexOf('星期日') >= 0) qs2_sta.g++;
        if(votes[i].qs2.length == 0) qs2_sta.none++;


        qs2_sta.totle = qs2_sta.a + qs2_sta.b + qs2_sta.c + qs2_sta.d + qs2_sta.e + qs2_sta.f + qs2_sta.g + qs2_sta.none;
        

        if(votes[i].qs3.indexOf('专业技能') >= 0) qs3_sta.a++;
        if(votes[i].qs3.indexOf('人生经验') >= 0) qs3_sta.b++;
        if(votes[i].qs3.indexOf('休闲娱乐') >= 0) qs3_sta.c++;
        if(votes[i].qs3.indexOf('其他') >= 0) qs3_sta.d++;
        if(votes[i].qs3.length == 0) qs3_sta.none++;
        

        qs3_sta.totle = qs3_sta.a + qs3_sta.b + qs3_sta.c + qs3_sta.d + qs3_sta.none;     
      }

      res.render('vote/statistics', {
          title: '调查问卷统计'
        , gender: gender
        , qs1: qs1_sta
        , qs2: qs2_sta
        , qs3: qs3_sta
        , qses: Question.qs
      }) 
    })    
}