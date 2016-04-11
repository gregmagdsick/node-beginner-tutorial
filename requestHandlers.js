const fs = require('fs');
const Formidable = require('formidable');

function start(response) {
  process.stdout.write('Request handler "start" was called.\n');

var body = '<html>' +
  '<head>' +
  '<meta http-equiv="Content-Type" content="text/html; ' +
  'charset=UTF-8" />' +
  '</head>' +
  '<body>' +
  '<form action="/upload" enctype="multipart/form-data" method = "post">' +
  '<input type="file" name="Upload">' +
  '<input type="submit" value="Upload file">' +
  '</form>' +
  '</body>' +
  '</html>';

  response.writeHead(200, { 'content-type': 'text/html' });
  response.write(body);
  response.end();
}

function upload(response, request) {
  process.stdout.write('Request handler "upload" was called.\n');

  var form = new Formidable.IncomingForm();
  process.stdout.write('about to parse.\n');
  form.parse(request, (error, fields, files) => {
    process.stdout.write('parsing done.\n');
    fs.rename(files.Upload.path, '/tmp/test.png', (err) => {
      if (err) {
        fs.unlink('/tmp/test.png');
        fs.rename(files.Upload.path, '/tmp/test.png');
      }
    });
  });
  response.writeHead(200, { 'Content-Type': 'text/html' });
  response.write('received image:<br/>');
  response.write('<img src="/show" />');
  response.end();
}

function show(response) {
  process.stdout.write('Request handler "show" was called.\n');
  response.writeHead(200, { 'Content-Type': 'image/png' });
  fs.createReadStream('/tmp/test.png').pipe(response);
}

exports.start = start;
exports.upload = upload;
exports.show = show;
