#!/usr/bin/env node
var prerender = require('./lib');

var phantomArguments = {
    '--ignore-ssl-errors': true,
    '--load-images': process.env.LOAD_IMAGES == "true" || false,
    '--ssl-protocol': process.env.SSL_PROTOCOL || 'tlsv1.2',
}

if (process.env.PROXY) {
    phantomArguments['--proxy'] = process.env.PROXY;
}

var server = prerender({
    workers: process.env.PRERENDER_NUM_WORKERS,
    iterations: process.env.PRERENDER_NUM_ITERATIONS,
    phantomArguments: phantomArguments
});


server.use(prerender.sendPrerenderHeader());
// server.use(prerender.basicAuth());
// server.use(prerender.whitelist());
server.use(prerender.blacklist());
// server.use(prerender.logger());
server.use(prerender.removeScriptTags());
server.use(prerender.httpHeaders());
// server.use(prerender.inMemoryHtmlCache());
// server.use(prerender.s3HtmlCache());

server.start();
