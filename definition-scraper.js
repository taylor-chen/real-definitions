var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var port = process.env.PORT || 8081;

app.get('/([a-zA-Z0-9/+]+)', function(req, res){
    var term = req.url.substr(1,req.url.length);
    url = 'http://www.urbandictionary.com/define.php?term=' + term;

    request(url, function(error, response, html){
        if(!error){
            var $ = cheerio.load(html);

            var definition;
            var json = { definition : ""};

            $('.meaning').filter(function(){
                var data = $(this);
                json.definition = data.text().trim();
            })
        }
        res.send(json);
    })
})

app.listen(port);
