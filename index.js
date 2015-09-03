'use strict';

var through2 = require( 'through2' );

module.exports = function( callback, interval, force )
{
	interval = ( interval == null ) ? 1000 : interval;
	force = !!force;

	var bytes = 0;
	var chunks = 0;
	var lastBytes = 0;
	var lastChunks = 0;

	function reporter( )
	{
		if ( force || bytes !== lastBytes || chunks !== lastChunks )
		{
			callback( bytes, chunks, false );
		}
		lastBytes = bytes;
		lastChunks = chunks;
	}

	function ondata( chunk, enc, cb )
	{
		bytes += chunk.length;
		++chunks;
		cb( null, chunk );
	}

	function onend( cb )
	{
		clearTimeout( timer );
		callback( bytes, chunks, true );
		cb( );
	}

	var timer = setInterval( reporter, interval );

	return through2( ondata, onend );
}