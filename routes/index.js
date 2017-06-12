var express = require('express');
var router = express.Router();

//链接mongodb数据库
var mongodb =require('mongodb').MongoClient;
var db_str='mongodb://localhost:27017/blog'

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title:'首页',user:req.session.user});
});

router.get('/header', function(req, res, next) {
  res.render('header', { title:'头部',user:req.session.user});
});

router.get('/study', function(req, res, next) {
  res.render('study', { title:'study',user:req.session.user});
});

// 注册
router.get('/register',function(req,res,next){
	res.render('register',{title:'头部',user:req.session.user})
})

// 登录
router.get('/login',function(req,res,next){
	res.render('login',{ title:'头部',user:req.session.user})
})
// 退出
router.get('/relogin',function(req,res,next){
		req.session.destroy(function(err){		
			if(err){			
				console.log(err)		
			}else{			
				res.redirect("/")		
			}	
		})
	
})


// 留言
router.get('/liuyan',function(req,res,next){

		var findData = function(db, callback) {
			var conn = db.collection('liuyan')
			conn.find({}).toArray(function(err, result) {
				callback(result)
			})
		}
		
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log('链接失败')
			}else{
				console.log(' success')
				findData(db,function(result){
//					result==[{},{}]
					res.render('liuyan',{result:result})
				})	
			}
	})	
})

// 图片展示
router.get('/photo',function(req,res,next){
	res.render('photo',{})
})

//心灵鸡汤 heart
router.get('/heart',function(req,res,next){
	res.render('heart',{ title:'头部',user:req.session.user})
		/*var findData = function(db, callback) {
			var conn = db.collection('heart')
			conn.find({}).toArray(function(err, result) {
				callback(result)
			})
		}
		
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log('链接失败')
			}else{
				console.log(' success')
				findData(db,function(result){
//					result==[{},{}]
					res.render('heart',{result:result})
				})	
			}
	})*/
})


module.exports = router;
