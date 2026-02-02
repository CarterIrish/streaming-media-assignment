const http = require('http');
const htmlHandle = require('./htmlResponses.js');
const mediaHandle = require('./mediaResponses.js');

const port = process.env.PORT || process.env.NODE_PORT || 3000;


/**
 * Handles incoming HTTP requests and routes them to the appropriate handler
 * based on the request URL.
 * @param {Object} request - HTTP request object from the client
 * @param {Object} response - HTTP response object to send back to the client
 */
const onRequest = (request, response) => {
    console.log(request.url);
    switch(request.url)
    {
        case '/':
            htmlHandle.getIndex(request, response);
            break;
        case '/page2':
            htmlHandle.getPage2(request, response);
            break;
        case '/page3':
            htmlHandle.getPage3(request, response);
            break;
        case '/favicon.ico':
            mediaHandle.getFavicon(request, response);
            break;
        case '/party.mp4':
            mediaHandle.getParty(request, response);
            break;
        case '/bling.mp3':
            mediaHandle.getBling(request, response);
            break;
        case '/bird.mp4':
            mediaHandle.getBird(request, response);
            break;
        default: 
        htmlHandle.getIndex(request, response);
        break;
    }
};


http.createServer(onRequest).listen(port, () =>
{
    console.log(`Listening on port ${port}`);
    console.log('To test, open http://localhost:' + port + ' in your browser');   
});


