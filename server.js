var http = require('http');
var url = require('url');


function start(route, handle) {
  function onRequest(request, response) {
    var pathname = url.parse(request.url).pathname;
    process.stdout.write('request for ' + pathname + ' received\n');

    route(handle, pathname, response, request);
  }

  http.createServer(onRequest).listen(8888);
  process.stdout.write('Server has started.\n');
}

exports.start = start;
