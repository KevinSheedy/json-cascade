if( typeof jsonCascade === 'undefined' ) {
  var jsonCascade = require('../json-cascade');
}

describe('jsonCascade', function(){

  it('something must be done', function(){
    expect( jsonCascade() ).toBe( 'doing something' );
  })

})