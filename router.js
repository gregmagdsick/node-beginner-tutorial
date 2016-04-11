function route(handle, pathname, response) {
  process.stdout.write('About to route a request for' + pathname + '\n');
  if (typeof handle[pathname] === 'function') {
    handle[pathname](response);
  } else {
    process.stdout.write('No request handler found for ' + pathname + '\n');
    response.writeHead(404, { 'content-type': 'text/plain' });
    response.write('404 not found');
    response.end();
  }
}

exports.route = route;
