var fs = require('fs');     // do odczytu plików - np. fs.readFile()
var formidable = require('formidable'); // osługa zapytań wysłanych w formularzu

exports.css = function (request, response) {
    console.log("Showing CSS styles");
    response.writeHead(200, {'Content-type' : 'text/css'});
    var fileContents = fs.readFileSync('./css/style.css', {encoding: 'utf8'});
    response.write(fileContents);
    response.end();
}

exports.welcome = function (request, response) {
    console.log("Rozpoczynam obsługę żądania welcome.");
    fs.readFile('templates/start.html', function (err, html) {
        response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
        response.write(html);                       // wyswitl plik start.html
        response.end();
    });
}

exports.upload = function (request, response) {
    console.log("Rozpoczynam obsluge zadania upload.");
    var form = new formidable.IncomingForm();
    form.parse(request, function(error, fields, files) {
        fs.renameSync(files.upload.path, "test.png");
        response.writeHead(200, {"Content-Type": "text/html"});
        response.write("received image:<br/>");
        response.write("<img src='/show' />");            // pokaz wysłany obrazek
        response.end();
    });
}

exports.show = function (request, response) {
    fs.readFile("test.png", "binary", function(error, file) {
        response.writeHead(200, {"Content-Type": "image/png"});
        response.write(file, "binary");
        response.end();
    });
}

exports.error = function (request, response) {
    console.log("Nie wiem co robić.");
    response.write("404!");
    response.end();
}