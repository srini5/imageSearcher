var express = require("express")();
var mongo = require("mongodb").MongoClient;
var request = require("request");

var url = process.env.MONGOLAB_URI // read from config

express.get('/api/imagesearch/:searchParam', function(req, res) {

var count = req.query.records || 20; // no of results per page
var offset = req.query.offset || 0; // offset value that is passed in is actually the page number. 

// for bing, offset = records to skip. Hence,
offset = offset>1?offset-1:0;
offset = offset * count; 


var urlGet = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + req.params.searchParam +"&count="+count +"&offset="+offset;

request({
    url: urlGet,
    method: 'GET',
    headers: {
        "Content-Type": "multipart/form-data",
        "Ocp-Apim-Subscription-Key": process.env.BING_SUBS_KEY
        }
    }, function(error, response, body) {
    //  console.log(JSON.stringify(reqRes));
        res.writeHead(200, {
        "Content-Type": "text/json"
        });
    
    
    mongo.connect(url,function(err,db){
       if(err) throw err;
       
       var searches = db.collection('searches');
       searches.count({}, function(err, data){
           if(err) throw err;
            console.log("current count: "+ data);
            var countVal = data;
            
            //insert a record
            searches.insertOne({'recNo':countVal, 'searchStr': req.params.searchParam, 'pageNo': req.query.offset || 0}, function(err,data){
                if(err) throw err;
                console.log("inserted record...."+ req.params.searchParam);
                db.close(); 
            });
       });
   });
   
   
    // insets above can be asynchronous, so areturn the values here itself (no need to wait).            
    var fullResp = JSON.parse(response.body).value;
                
    fullResp = fullResp.map(function(val){
        var imgUrl = ((val.contentUrl.split('&'))[5].replace(/[%]3a/g,':').replace(/[%]2f/g,'/').split('='))[1];
        return ({
                "imageUrl": imgUrl,
                "alt": val.name,
                "pageUrl": val.hostPageDisplayUrl
                });
            });
               
    res.write(JSON.stringify(fullResp));
    res.end();
    });

});

express.get('/api/latest/imagesearch', function(req, res) {
    // query mongo and return the latest 10 results
    
    var count = req.query.records || 10;
    
    mongo.connect(url,function(err,db){
       if(err) throw err;    
       var searches = db.collection('searches');
    
        searches.find({},{recNo:1,searchStr:1,pageNo:1,_id:0}).sort({recNo:-1}).limit(count).toArray(function(err,data){
            if(err) throw err;
            res.writeHead(200, {
                "Content-Type": "text/json"
            });
            res.write(JSON.stringify(data));
            
            db.close();
            res.end();       
        });
    });
});

express.get('/', function(req, res) {
    res.sendFile(__dirname+'/index.html');
})

express.listen(process.env.PORT || 8080);
