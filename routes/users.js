var express = require('express');
var router = express.Router();

//链接mongodb数据库
var mongodb =require('mongodb').MongoClient;
var db_str='mongodb://localhost:27017/blog';

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

// 注册部分
router.post('/form',function(req,res,next){
	//获取前段发来的账号、密码
	var nick =req.body['nick'];
	var zh  =req.body['zh'];
	var tel =req.body['tel'];
	var pass=req.body['pass'];

	
	//封装一个插入数据到数据库的函数
	var insertData = function(db,callback){
		//获取指定的集合
		var conn =db.collection('users')	
		// 插入一条数据
		var data =[{nick:nick,zh:zh,tel:tel,pass:pass}]
		conn.insert(data,function(err,result){
				if(err){
					console.log(err)
				}else{
					callback(result)
				}
		})
		
	}
	
	//链接数据库
	mongodb.connect(db_str,function(err,db){
		if(err){
			console.log(err)
		}else{
			console.log("success")
					db.collection('users',{safe:true},function(err,con){
						con.find({}).toArray(function(err,dsb){
							
								if(err){
								
								}else{
									
									dsb.map(function(v){
										console.log(v)
										if(zh==v.zh){
											res.send('用户名已存在')
											db.close()
											return false;
										}else{
											insertData(db,function(result){
												console.log(result)
											})
											// res.send('注册成功')
											res.redirect('/login')
													//数据库关闭
													db.close()
										}
									})
								}
						})
				})
		}
	})
	
	
})


	//登录部分
router.post('/login',function(req,res,next){
	var zhang = req.body['user']
	var mima = req.body['mm']
	// 封装一个查找函数
	var findData = function(db,callback){
		var conn = db.collection('users')
			// 判断是否与数据库中的一样
		var srr ={zh:zhang,pass:mima}
		conn.find(srr).toArray(function(err,data){
			callback(data)
		})
	}
	//获取数据
	mongodb.connect(db_str,function(err,db){
			if(err){
					console.log("连接失败1")
			}else{
				// console.log("success")
					findData(db,function(data){
						
							if(data.length>0){
								req.session.user=data[0].zh;
								
								res.redirect('/login')
									db.close()
							}else{
								res.redirect('/login')
									db.close()
							}			
					})			
			}
	})
})


// 留言部分
router.post('/liuyan',function(req,res,next){
	if(req.session.user){
	
		var tit=req.body['tit']
		var con=req.body['con']
		var insertData=function(db,callback){
			var conn=db.collection('liuyan')
			var data=[{title:tit,con:con}]
			conn.insert(data,function(err,result){
				callback(result)
			})
		}	
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log('链接失败')
			}else{
				console.log(' success')
				insertData(db,function(result){
					console.log(result)
					res.redirect('/liuyan')
					db.close()
				})	
			}
		})	
	}else{
		res.send('您的session账号未登录')
		res.redirect('/liuyan')
	}
})

// 相册展示
router.get('/photo', function(req, res, next) {
  
});
// 学无止境
router.get('/study', function(req, res, next) {
  
});
// 心灵鸡汤
router.post('/heart', function(req, res, next) {
				var con=req.body['con']
					//封装一个插入数据到数据库的函数
	var insertData = function(db,callback){
		//获取指定的集合
		var conn =db.collection('heart')	
		// 插入一条数据
		var data =[con]
		conn.insert(data,function(err,result){
				if(err){
					console.log(err)
				}else{
					callback(result)
				}
		})
		
	}
		//链接数据库
		mongodb.connect(db_str,function(err,db){
			if(err){
				console.log(err)
			}else{
				console.log("success")
						db.collection('heart',{safe:true},function(err,con){
							con.find({}).toArray(function(err,dsb){
									if(err){}else{
										dsb.map(function(v){
											console.log(v)
												insertData(db,function(result){
													console.log(result)
												
												})
												// res.send('注册成功')
												res.redirect('/heart')
														//数据库关闭
														db.close()
										})
									}
							})
					})
			}
		})
});
module.exports = router;
