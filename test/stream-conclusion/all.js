'use strict';

var fs           = require( 'fs' );
var streamStatus = require( '../../' );


describe( 'stream-status', function( ) {
	it( 'should count correctly', function( ) {

		var size = 512 * 1024;

		return new Promise( function( resolve, reject ) {
			function reporter( bytes, chunks, hasEnded )
			{
				if ( !hasEnded )
					return;

				expect( chunks ).to.be.at.least( 1 );
				expect( bytes ).to.equal( size );
				resolve( );
			}

			var rs = fs.createReadStream( '/dev/urandom', { start: 0, end: size - 1 } );
			var ws = fs.createWriteStream( '/dev/null' );
			rs.pipe( streamStatus( reporter ) ).pipe( ws );
		} );
	} );
} );
