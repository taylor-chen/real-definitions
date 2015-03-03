var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

var port = process.env.PORT || 8081;

app.get('/([a-z]+)', function(req, res){
    url = 'http://www.urbandictionary.com/define.php?term=' + req.url.substr(1,req.url.length);

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
