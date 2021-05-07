const mongo = require('mongoose')
function link (){
mongo.connect("mongodb://localhost:27017/adata",{
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
var db=mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log('database connected!');
});
db.once('close', function() {
  console.log('database closed!');
});
}
module.exports=link;