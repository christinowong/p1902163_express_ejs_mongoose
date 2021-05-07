var express = require('express');
const mongo = require('mongoose');
var connection =require('./apps/connection.js');
var bodyparser=require('body-parser');
var parser=bodyparser.urlencoded({entended:false});
link= new connection();
var model = require('./apps/model.js');
var obj;
var searchobj;
var id;
function htmlrender(a,r,res){
	if (r){
		model.findOne({_id:r},function(err,finds){
			if (finds){
				obj=finds;
				res.render(a,{content:obj});
			}
		});
	}
	else{
		model.find({id},function(err,finds){
			if (finds){
				obj=finds;
				res.render(a,{content:obj});
			}
		});
	}
}
var app = express();
app.set('view engine', 'ejs');

app.listen(1337, function () {
  console.log('server started');
});

app.get('', function (req, res) {
	htmlrender('index','',res);
});	
app.get('/index', function (req, res) {
	htmlrender('index','',res);
});	
app.get('/create', function (req, res) {
    res.render('create');
})
app.post('/createform', parser, function (req, res) {
	let title=req.body.title;
	let aname=req.body.aname;
	let locate=req.body.locate;
	let rent=req.body.rent;
	let comment=req.body.comment;
	let apart = new model({
		title:title,
		aname:aname,
		locate:locate,
		rent:rent,
		comment:comment,
	});
	apart.save(function(err,res){});
    res.redirect('index');
})
app.get('/apartment',function(req,res){
	let id=req.query.id;
	htmlrender('detail',id,res);
})
app.get('/edit',function(req,res){
	let id=req.query.id;
	console.log(id);
	htmlrender('edit',id,res);
})
app.post('/editform',parser,function(req,res){
	let title=req.body.title;
	let aname=req.body.aname;
	let locate=req.body.locate;
	let rent=req.body.rent;
	let comment=req.body.comment;
	let id=req.body._id;
	model.findById(id,function (err,doc){
		if (doc){
			doc.title=title;
			doc.aname=aname;
			doc.locate=locate;
			doc.rent=rent;
			doc.comment=comment;
			doc.save(function(err,res){});
		}
	})
	res.redirect('index');
})
app.get('/delete',function(req,res){
	let id=req.query.id;
	model.findByIdAndDelete(id,function(err,res){});
	res.redirect('index');
})
app.get('/search', function (req, res) {
    model.find({},function(err,f){
    	if (res){
    		let obj=f;
    		res.render('search',{searchcontent:searchobj,content:obj});
    	}
    });
})
app.post('/searchform',parser, function (req, res) {
	console.log(req.body.aname);
    model.find({title:req.body.aname},function(err,f){
		if (res){
			let searchobj=f;
			res.render('search',{searchcontent:searchobj,content:obj});
		}
	});
	
})