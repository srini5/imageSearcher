var express = require("express")();
var mongo = require("mongodb").MongoClient;

var request = require("request");


express.get('/api/imagesearch/:searchParam', function(req, res) {

var urlGet = "https://api.cognitive.microsoft.com/bing/v5.0/images/search?q=" + req.params.searchParam;

request({
    url: urlGet,
    method: 'GET',
    headers: {
        "Content-Type": "multipart/form-data",
        "Ocp-Apim-Subscription-Key": "889f3e88c4dd47d48d644301d9172375"
    }
}, function(error, response, body) {
    //  console.log(JSON.stringify(reqRes));
    res.writeHead(200, {
        "Content-Type": "text/json"
    });


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


// Store the req data in mongo

});

express.get('/api/latest/imagesearch', function(req, res) {
    // query mongo and return the latest 10 results

});

express.listen(process.env.PORT || 8080);
