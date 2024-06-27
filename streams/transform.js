const { Transform } = require('stream');
const transformStream = new Transform({
    transform(chunk, encoding, callback) {   //C E C
        // Transform the data (convert to uppercase)
        const transformedChunk = chunk.toString().toUpperCase();
        // Pass the transformed data to the next stream
        callback(null, transformedChunk);
    }
});
process.stdin.pipe(transformStream).pipe(process.stdout);