const {Transform} = require('stream');   //Depenedent Read and Write
class ReplaceText extends Transform {
  constructor(char){
    super();
    this.replaceChar = char;
  }
  _transform(chunk, encoding, callback){
    const transformChunk = chunk.toString().replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar);
    this.push(transformChunk);
    callback();
  }
  _flush(callback){
    this.push('more stuff us being passed through...')
    callback();
  }
}
const xStream = new ReplaceText('x');
process.stdin.pipe(xStream).pipe(process.stdout);

//This is dependent streams taking input from the terminal from the process.stdin
//then piping down the class Xtream for replacing all charachters
// and then pipigin out the ouput in process.stdout

//Working Process : 
// Defining the _transform method:

// _transform(chunk, encoding, callback) {
//   const transformChunk = chunk.toString().replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar);
//   this.push(transformChunk);
//   callback();
// }
// The _transform method is where the actual data transformation happens. This method is called every time a chunk of data is available. It takes three parameters:

// chunk: The chunk of data to be transformed.
// encoding: The encoding type if the chunk is a string (not used here).
// callback: A function to call when the transformation is complete.
// Inside _transform:

// chunk.toString() converts the chunk of data to a string.
// .replace(/[a-z]|[A-Z]|[0-9]/g, this.replaceChar) replaces all alphanumeric characters in the string with this.replaceChar.
// this.push(transformChunk) pushes the transformed chunk to the output.
// callback() signals that the transformation of the chunk is complete.
// Defining the _flush method:


// _flush(callback) {
//   this.push('more stuff is being passed through...');
//   callback();
// }
// The _flush method is called when there is no more data to be consumed. It can be used to perform any final operations. Here, it pushes a final string ('more stuff is being passed through...') to the output and then calls the callback to signal completion.