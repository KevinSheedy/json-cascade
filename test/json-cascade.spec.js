if( typeof jsonCascade === 'undefined' ) {
	var jsonCascade = require('../json-cascade');
}

describe('jsonCascade simple objects', function(){

	var actual, expected, template, lowPrecedence, midPrecedence, highPrecedence;


	it('should return an empty object', function(){
		expect( typeof jsonCascade() ).toBe( 'object' );
	})


	it('should return just the template if the template is the only param', function() {
		template = {foo: 'bar'};
		actual = jsonCascade(template);
		expect( actual.foo ).toBe( 'bar' );
	})

	it('should override the template', function() {
		template = {foo: 'bar'};
		lowPrecedence = {foo: 'lowOverride'};
		actual = jsonCascade(template, midPrecedence);
		expect( actual.foo ).toBe( 'lowOverride' );
	})

	it('should override the template with the highest precedence diff', function() {
		template = {foo: 'bar'};
		lowPrecedence = {foo: 'lowOverride'};
		midPrecedence = {foo: 'midOverride'};
		actual = jsonCascade(template, lowPrecedence, midPrecedence);
		expect( actual.foo ).toBe( 'midOverride' );
	})


})