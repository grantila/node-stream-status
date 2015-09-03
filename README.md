# stream-status
Reports status about data flowing through a stream, namely the number of chunks and bytes passing through.

The given callback will be called every n milliseconds (defaults to 1000, i.e. every second) with the arguments `(bytes, chunks, false)`, and when the stream ends with the arguments `(bytes, chunks, true)`.

Example:
```js
var streamStatus = require('stream-status');

function reporter(bytes, chunks, hasEnded) {
  if (hasEnded)
    console.log("The stream finished with " + bytes + " bytes in " + chunks + " chunks.");
  else
    console.log(bytes + " bytes has passed through in " + chunks + " chunks");
}

inStream.pipe(streamStatus(reporter)).pipe(outStream);
```
