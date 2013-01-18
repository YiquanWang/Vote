// Vote schema

var mongoose = require('mongoose')
  , Schema = mongoose.Schema

var VoteSchema = new Schema({
    name: {type : String, default : '', trim : true}
  , team: {type : String, default : '', trim : true}
  , sex: {type : String, default : '', trim : true}
  , tel: {type : String, default : ''}
  , qs1: {type : String, default : ''}
  , qs2: {type : String, default : ''}
  , qs3: {type : String, default : ''}
  , qs4: {type : String, default : ''}
  , qs5: {type : String, default : ''}
  , qs6: {type : String, default : ''}
  , qs7: {type : String, default : ''}
  , createdAt  : {type : Date, default : Date.now}
})


VoteSchema.path('name').validate(function (name) {
  return name.length > 0
}, '请输入您的姓名')
VoteSchema.path('team').validate(function (team) {
  return team.length > 0
}, '请输入义工队名')
VoteSchema.path('sex').validate(function (sex) {
  return sex.length > 0
}, '请选择您的性别')
VoteSchema.path('tel').validate(function (tel) {
  return tel.length > 0
}, '请输入您的联系电话')

mongoose.model('Vote', VoteSchema)
