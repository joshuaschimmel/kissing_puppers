const http = require('http');
const url = require('url');
const fs = require('fs');
const express = require('express');


const hostname = '0.0.0.0';
const port = 3001;

const data_json = JSON.parse(
    fs.readFileSync(__dirname + '/../data/response5.json', 'utf8')
);

const server = http.createServer((req, res) => {
    console.log(`request was made: ${req.url} with method ${req.method}`);
    let body = [];
    req.on('error', (err) => {
        console.error(err);
    }).on('data', (chunk) => {
        body.push(chunk);
    }).on('end', () => {
        body = Buffer.concat(body).toString();
    });

    switch (req.method) {
        case 'HEAD':
            //TODO: proper response
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end('Only GET methods are allowed');
            break;
        case 'GET':
            let pupper_datum = data_json[Math.floor(Math.random() * data_json.length)];
            res.writeHead(200, { "Content-Type": "application/json" });
            res.write(JSON.stringify(pupper_datum));
            res.end();
            break;
        //all other methods are disabled
        default:
            res.writeHead(405, { "Content-Type": "text/plain" });
            res.end(`Error 405: Method ${req.method} is disabled,
                    plese use GET or HEAD.`
            );
    }
});

server.listen(port, hostname, () => {
    console.log(`Server starting up at http://${hostname}:${port}/`);
});