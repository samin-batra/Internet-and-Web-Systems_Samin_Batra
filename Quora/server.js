var express=require('express');
var app = new express();
var mongodb=require('mongodb');
var mongoclient=mongodb.MongoClient;
var url="mongodb://127.0.0.1:27017/Quora";
var multer=require('multer');
var bodyparser = require('body-parser');
var clientsessions = require('client-sessions');
var cookie = require('cookie-parser');
var session = require('express-session');
var Server = require('mongo-sync').Server;
var server = new Server('127.0.0.1');
var Fiber = require('fibers');
app.set('view engine','ejs');
app.use(express.static('CSS'));
app.use(express.static('Images'));
app.use(express.static('Javascript'));
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({
	extended:true
}));

app.use(bodyparser.json());
app.use(cookie());
app.use(session({secret:"something"}));
var questions = [];
var answers = [];
var temp = {};
var i;			
var id;

app.listen(3000,function()	{
	console.log("Listening on port 3000");
});

//Serving the homepage
app.get('/',function(req,res)	{
	res.render('quora_login',{});
});

app.get('/signup',function(req,res)	{
	res.render('quora_signup',{});
});

app.post('/signup',function(req,res)	{
	console.log("Sign up page");
	mongoclient.connect(url,function(err,db)	{
		if(err)	{
			return console.error(err);
		}
		
		db.collection('Users').insertOne({name:req.body.user.firstname+" "+req.body.user.lastname,email:req.body.user.email,pwd:req.body.user.password,questionsid:"",about:""},function(err,result)	{
			if(err)	{
				return console.error(err);
			}
			console.log("Data entered");
			console.log(result);
		});
		
		res.redirect('/');
	});
});


app.post('/home',function(req,res)	{
	Fiber(function()	{
		var result = server.db("Quora").getCollection("Users").find({email:req.body.user.email}).toArray();
		if(!result)	{
			console.log("No user found");
		}
		else	{
			if(result[0].pwd==req.body.user.password)	{
					req.session.user = result[0];
					res.redirect('/home');
				}
			else	{
				console.log("Password incorrect");
			}
		}
	}).run();
});

function requireLogin(req,res,next)	{
	console.log("Inside requireLogin function");
	console.log(req.session.user);
	if(!req.session.user)	{
		res.redirect('/');
	}
	else	{
		console.log(req.session.user.topics);
		next();
	}
};
//Serving the answer page
/*app.get('/answer',requireLogin,function(req,res)	{
	console.log(req.session);
	res.render('quora_answer',{});
});*/
//Serving the notifications page
app.get('/notifications',requireLogin,function(req,res)	{
	console.log(req.session);
	res.render('quora_notifications',{});
});

app.get('/home',requireLogin,function(req,res)	{
	console.log(req.session);
	console.log("Req.query is",req.query);
	var result;
	Fiber(function()	{
		if(Object.keys(req.query).length==0)	{
			console.log("Query string is empty");
			result = server.db("Quora").getCollection("Questions").find().toArray();
		}
		else	{
			if(req.query.location==undefined)	{
				console.log("Topic required is "+req.query.topic);
				result = server.db("Quora").getCollection("Questions").find({topic:req.query.topic}).toArray();
				console.log(result);
			}
			else if(req.query.topic==undefined)	{
				result = server.db("Quora").getCollection("Questions").find({location:req.query.location}).toArray()
			}
		}
		for(i=0;i<result.length;i++)	{
			console.log(result[i].question);
			id=result[i].questionid;
			ans = server.db("Quora").getCollection("Answers").find({questionid:id}).toArray();
			if(ans[0]==undefined)	{
					continue;	
			}
			console.log(ans[0]);
			answers.push(ans[0]);
			questions.push(result[i]);
			
		}
		res.render('quora_interface',{name:req.session.user.name,questions:questions,answers:answers,visibility:"hidden",topics:req.session.user.topics});
	}).run();
	questions = [];
	answers = [];
});

app.post('/home/edit',requireLogin,function(req,res)	{
	console.log(req.body.text);
	if(req.body.text=="Edit")	{
		Fiber(function()	{
			console.log("About to query database");
			var result = server.db("Quora").getCollection("Topics").find().toArray();
			console.log(result[0]);
			res.send(result);
		}).run();
	}
	else		{
		res.send({});
	}
});
 
app.post('/home/add_topics',requireLogin,function(req,res)	{
	console.log("Topic name",req.body.topic_name);
	var topic=[];
	topic=req.session.user.topics;
	mongoclient.connect(url,function(err,db)	{
		if(err)	{
			return console.error(err);
			
		}
		console.log("User email",req.session.user.email);
		topic.push(req.body.topic_name);
		db.collection('Users').update({email:req.session.user.email},{$set:{topics:topic}},function(err,result)	{
			if(err)	{
				return console.error(err);
			}
			console.log(result);
		});
		res.send("Done");
	});
});

app.get('/answer',requireLogin,function(req,res)	{
	console.log("Inside the route function for answer");
	questions=[];
	Fiber(function()	{
		result = server.db("Quora").getCollection("Questions").find({}).toArray();
		for(i=0;i<result.length;i++)	{
			console.log(result[i].question);
			id=result[i].questionid;
			ans = server.db("Quora").getCollection("Answers").find({questionid:id}).toArray();
			if(ans[0]==undefined)	{
					questions.push(result[i]);	
					console.log(questions);
			}
		}
		res.render('quora_question',{questions:questions});
	}).run();
});

app.post('/answer',requireLogin,function(req,res)	{
	console.log("Inside post answer");
	console.log(req.body.answer);
	console.log(req.body.id);
	mongoclient.connect(url,function(err,db)	{
		if(err)	{
			return console.error(err);
		}
		db.collection("Answers").insertOne({questionid:id,answer:req.body.answer,upvotes:0},function(err,result)	{
			if(err)	{
				return console.error(err);
			}
			console.log(result);
			res.redirect('/answer');
			
		});
	});
});
app.get('/logout',requireLogin,function(req,res)	{
	console.log("Inside the log out function");
	req.session.user = undefined;
	console.log(req.session.user);
	res.redirect('/');
	res.end();
	//app.close();
});