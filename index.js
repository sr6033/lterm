var express = require('express');  
var app = express();  
var server = require('https').createServer(app);  
var io = require('socket.io')(server);
var fs = require('fs');
var exec = require('child_process').exec;

var child;

app.use(express.static(__dirname + '/node_modules'));  
app.get('/', function(req, res,next) {  
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(client) {  
    console.log('Client connected...');

    client.on('join', function(data) {
        //console.log(data);

        var stream = fs.createWriteStream("out.js");
        stream.once('open', function(fd) {
	    	stream.write(data);
	    	stream.end();

	    	child = exec("node out.js", function (error, stdout, stderr) {

				//res.writeHead(200, {'Content-Type': 'text/plain'});
			  	//console.log('stderr: ' + stderr);

			  	if (error !== null) {
			 	   client.emit('output', stderr);
			 	}
			 	else
				  	client.emit('output', stdout);

			});
		});

		//run and send output
    });
});

server.listen(4000);
