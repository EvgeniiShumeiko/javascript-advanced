const http = require('http');
const fs = require('fs');

const config = {
  port: +process.env.PORT || 3000,
  publicPath: './public'
}

/**
 * Возвращает файл по запросу (только существующий файл)
 * @param file
 * @param res
 */
let responseFileForRequest = (file, res) => {
  let body = fs.readFileSync(file);
  let fileExtension = getFileExtension(file);
  let contentType = getContentTypeByExtension(fileExtension);
  return sendResponse(res, body, 200, {"Content-Type": contentType});
}

/**
 * Возвращает разширение файла, без точки
 * можно через модуль path, path.extname(file)
 * @param file
 * @returns {string}
 */
let getFileExtension = (file) => {
  let fileSeparate = file.split('.');
  return fileSeparate.length > 0 ? fileSeparate.slice(-1) : ""
}

/**
 * Возвращает Content-Type для конкретного разширения файла
 * @param ext
 * @returns {string}
 */
let getContentTypeByExtension = (ext) => {
  let extToContentType = {
    html: "text/html",
    svg: "image/svg+xml",
    css: "text/css",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
  };
  return extToContentType.hasOwnProperty(ext) ? extToContentType[ext] : "text/plain";
}

/**
 * Функция-хелпер для отправки ответа от сервера
 * @param response
 * @param body
 * @param code
 * @param headers
 */
let sendResponse = (response, body, code, headers = {}) => {
  response.writeHead(code, headers);
  response.end(body);
};

/**
 * Обработчик запросов к серверу
 * @param req
 * @param res
 */
let requestHandler = (req, res) => {
  let url = req.url === '/' ? '/index.html' : req.url;
  let file = config.publicPath + url;
  if (fs.existsSync(file)) {
    return responseFileForRequest(file, res)
  }

  let htmlFile = file + ".html";
  if (fs.existsSync(htmlFile)) {
    return responseFileForRequest(htmlFile, res)
  }

  sendResponse(res, "404 Not Found", 404);
}


let server = http.createServer(requestHandler)

server.listen(config.port, () => {
  console.log(`Server started on ${config.port}`)
})
