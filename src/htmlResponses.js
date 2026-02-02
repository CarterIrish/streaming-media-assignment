const fs = require ('fs');
const index = fs.readFileSync(`${__dirname}/../client/client.html`);
const page2 = fs.readFileSync(`${__dirname}/../client/client2.html`);
const page3 = fs.readFileSync(`${__dirname}/../client/client3.html`);

/** @type {Object} - HTTP Response Codes */
const RESPONSE_CODE =
{
    ok: 200,
    notFound: 404,
    internalError: 500,
}
Object.freeze(RESPONSE_CODE);


/**
 * Sends the main index HTML page (client.html) to the client.
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object
 * @returns {void}
 */
const getIndex = (request, response) => {
    response.writeHead(RESPONSE_CODE.ok, {'Content-Type': 'text/html'});
    response.write(index);
    response.end();
}


/**
 * Sends the second HTML page (client2.html) containing audio content to the client.
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object
 * @returns {void}
 */
const getPage2 = (request, response) =>
{
    response.writeHead(RESPONSE_CODE.ok, {'Content-Type': 'text/html'});
    response.write(page2);
    response.end();
}


/**
 * Sends the third HTML page (client3.html) containing video content to the client.
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object
 * @returns {void}
 */
const getPage3 = (request, response) =>
{
    response.writeHead(RESPONSE_CODE.ok, {'Content-Type': 'text/html'});
    response.write(page3);
    response.end();
}

module.exports.getIndex = getIndex;
module.exports.getPage2 = getPage2;
module.exports.getPage3 = getPage3;