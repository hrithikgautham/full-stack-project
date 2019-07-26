const http = require('http');
const fs = require('fs');
const path = require('path');
const Server= http.createServer((req, res) => {
    console.log("req.url", req.url);
    fs.readFile(path.join(__dirname, "components", "html", "index.html"), "utf8", (err, data) => {
        if(err){
            console.log("couldnt open index.html");
            fs.readFile(path.join(__dirname, "components", "html", "badRequest.html"), "utf8", (err, data) => {
                if(err){
                    console.log("couldnt open file badRequest.html");
                    res.writeHead(500, {"Content-Type": "text/html"});
                    res.write("<h1>Internal error, SORRY :(</h1>");
                    res.end();
                }
                else {
                    res.writeHead(400, {"Content-Type": "text/html"});//bad request
                    res.write(data);
                    res.end();
                }
            });
        }
        else{
            console.log("Successfuly read index.html");
            res.writeHead(200, {"Content-Type": "text/html"});
            res.write(data);
            res.end();
        }
    })
});

Server.listen(8000, () => {
    console.log("Server Listening on Port 8000....");
})