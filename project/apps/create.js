const model = require('./model.js');
const conn = require('../server.js');
var apart_1 = new model({
	title:"出租 住宅 好景大廈 下環 8500 元/月",
	aname:"好景大廈",
	locate:"鵝眉街",
	rent:8500,
	comment:"鵝眉街（近慈幼），好景大廈中層，電梯2房，齊租8500，11月18日起租 66106632 黃小姐，66551083 梁小姐 66436696 郭生，歡迎合作"
});
apart_1.save(function (err, docs){
	if (err){
		return console.error(err) 
	}else {
		console.log('data saved');
	}
});
