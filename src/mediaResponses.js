const fs = require('fs');
const path = require('path');

const favicon = fs.readFileSync(`${__dirname}/../client/favicon.ico`);
// Response codes
const RESPONSE_CODE =
{
    ok: 200,
    partialContent: 206,
    notFound: 404,
    internalError: 500,
}
Object.freeze(RESPONSE_CODE); // Make the response codes immutable

/**
 * 
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} streaming media file    
 */
const getParty = (request, response) =>
{
    return streamFile(request, response, '../client/party.mp4', 'video/mp4');
}

/**
 * 
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} streaming media file    
 */
const getBling = (request, response) => 
{
    return streamFile(request, response, '../client/bling.mp3', 'audio/mpeg');
}

/**
 * 
 * @param {object} request - HTTP request object
 * @param {object} response - HTTP response object
 * @returns {object} streaming media file    
 */
const getBird = (request, response) =>
{
    return streamFile(request, response, '../client/bird.mp4', 'video/mp4');
}



/**
 * Sends the favicon.ico file to the client.
 * @param {Object} request - HTTP request object
 * @param {Object} response - HTTP response object
 * @returns {void}
 */
const getFavicon = (request, response) => 
{
    response.writeHead(RESPONSE_CODE.ok, {'Content-Type': 'image/x-icon'});
    response.write(favicon);
    response.end();
}

/**
 * Streams a media file to the client using byte-range requests.
 * Supports partial content (206) responses for efficient streaming.
 * @param {Object} request - HTTP request object containing range headers
 * @param {Object} response - HTTP response object to pipe the stream to
 * @param {string} filePath - Relative path to the media file from this module
 * @param {string} contentType - MIME type of the media file (e.g., 'video/mp4', 'audio/mpeg')
 * @returns {Object} The file read stream, or undefined if an error occurs
 */
const streamFile = (request, response, filePath, contentType) => 
{
    const resolvedPath = path.resolve(__dirname, filePath);
    fs.stat(resolvedPath, (err, stats) =>
    {
        if(err)
        {
            if(err.code === 'ENOENT')
                response.writeHead(RESPONSE_CODE.notFound, {'Content-Type': 'text/plain'}); 
            return response.end(err);
        }

        let {range} = request.headers;
        if(!range)
        {
            range = 'bytes=0-';
        }
        const positions = range.replace(/bytes=/, '').split('-');
        let start = parseInt(positions[0], 10);
        const total = stats.size;
        const end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        if(start > end)
        {
            start = end - 1;
        }
        const chunksize = (end - start) + 1;
        response.writeHead(RESPONSE_CODE.partialContent,
            {
                'Content-Range': `bytes ${start}-${end}/${total}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': contentType,
            }
        )
        const stream = fs.createReadStream(resolvedPath, {start, end});
        stream.on('open', () => {stream.pipe(response)});
        stream.on('error', (streamErr) => {response.end(streamErr)});
        return stream;
    });
}



module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;
module.exports.getFavicon = getFavicon;
