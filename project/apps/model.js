const mongo = require('mongoose');
var apartmentSchema = new mongo.Schema({
	title:{
		type:String,
		require:true,
	},
	aname:{
		type:String,
		require:true,
	},
	locate:{
		type:String,
		require:true,
	},
	rent:{
		type:Number,
		require:true,
	},
	comment:{
		type:String,
		require:true,
	},
	createTime: {
		type:Date,
		default:new Date()
	},
	updateTime: {
		type:Date,
		default:new Date()
	}
	},{timestamps: {createdAt: 'createTime', updatedAt: 'updateTime'}}
);

const model=mongo.model('apartment', apartmentSchema);
module.exports=model;