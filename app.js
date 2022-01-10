const express = require('express');
const { WebSocket } = require('ws');
const app = express();
const server = require('http').createServer(app);

const webSocket = require('ws');

const wss = new webSocket.Server({server});

wss.on('connection', (ws) => {
    console.log('A new client connected..!');
    ws.send('welcome new client');
    ws.on('message', function incoming(message)  {
        console.log('received: %s', message);

        wss.clients.forEach(function each(client){
            if(client !== ws && client.readyState === WebSocket.OPEN ){
                client.send(message);
            }
        });
    });
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

server.listen(3000, () => {
    console.log('Listening on port 3000');
});
