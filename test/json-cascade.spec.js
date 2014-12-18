if( typeof jsonCascade === 'undefined' ) {
	var jsonCascade = require('../json-cascade');
}

describe('jsonCascade with primitives', function() {

	it('should the highest precedence param', function() {
		expect( jsonCascade('low', 'mid', 'high') ).toEqual( 'high' );
	})
})

describe('jsonCascade simple objects', function() {

	var actual, expected, template, lowPrecedence, midPrecedence, highPrecedence;


	it('should return an empty object', function() {
		expect( jsonCascade() ).toEqual( {} );
	})


	it('should return just the template if the template is the only param', function() {
		template = {foo: 'bar'};
		actual = jsonCascade(template);
		expect( actual ).toEqual( template );
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

describe('jsonCascade simple objects', function() {
	var actual, expected, template, lowPrecedence, midPrecedence, highPrecedence;

	itt('should return an empty object', function() {

		template = {
			"timestamp" : "2014-11-19",
			"firstName" : null,
			"lastName" : null,
			"lastPurchase" : {
				"name" : null,
				"priceInEuros" : null
			}
		};

		lowPrecedence = {
			"firstName" : "Dave",
			"lastPurchase" : {
				"name" : "shirt",
				"priceInEuros" : 50
			}
		};

		highPrecedence = {
			"firstName" : "Peter",
			"lastPurchase" : {
				"priceInEuros" : 60
			}
		};
		actual = jsonCascade(template, lowPrecedence, highPrecedence);
		expected = {
			"timestamp" : "2014-11-19",
			"firstName" : "Peter",
			"lastName" : null,
			"lastPurchase" : {
				"name" : "shirt",
				"priceInEuros" : 60
			}
		};
		expect( expected ).toEqual( actual );
	})


})

describe('jsonCascade arrays', function() {
	var actual, expected, template, lowPrecedence, midPrecedence, highPrecedence;


	it('should return an empty object', function() {
		expect( jsonCascade([]) ).toEqual( [] );
	})
})