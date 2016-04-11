function start(response) {
  process.stdout.write('Request handler "start" was called.\n');

var body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; ' +
  'charset=UTF-8" />' +
  '</head>' +
  '<body>' +
  '<form action="/upload" method="post">' +
  '<textarea name="text" rows="20" cols="60"></textarea>' +
  '<input type="submit" value="Submit text" />' +
  '</form>' +
  '</body>' +
  '</html>';

  response.writeHead(200, { 'content-type': 'text/html' });
  response.write(body);
  response.end();
}

function upload(response) {
  process.stdout.write('Request handler "upload" was called.\n');
  response.writeHead(200, { 'content-type': 'text/plain' });
  response.write('hello upload');
  return 'Hello Upload';
}

exports.start = start;
exports.upload = upload;
