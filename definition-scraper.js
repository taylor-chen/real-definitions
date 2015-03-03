var express = require('express');
var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var app     = express();

app.get('/scrape', function(req, res){
    url = 'http://www.urbandictionary.com/define.php?term=test';

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
        res.send(json)
    })
})

app.listen('8081')
console.log('Port working!');
exports = module.exports = app; 