if( typeof jsonCascade === 'undefined' ) {
	var jsonCascade = require('../json-cascade');
}
if( typeof _ === 'undefined' ) {
	var _ = require('underscore');
}

describe('jsonCascade simple objects', function(){

	var actual, expected, template, lowPrecedence, midPrecedence, highPrecedence;


	it('should return an empty object when no params are passed', function(){
		expect( jsonCascade() ).toEqual( {} );
		expect( jsonCascade() ).not.toEqual( {foo: 'bar'} );
	})

	it('should return an empty object when a primitive is passed as the template', function(){
		expect( jsonCascade(5, {foo: 'bar'}) ).toEqual( {} );
	})


	it('should return just the template if the template is the only param', function() {
		template = {foo: 'bar'};
		actual = jsonCascade(template);
		expected = {foo: 'bar'};
		expect( actual ).toEqual( expected );
	})

	it('should override the template', function() {
		template = {foo: ''};
		diff = {foo: 'override'};
		actual = jsonCascade(template, diff);
		expected = {foo: 'override'};
		expect( actual ).toEqual( expected );
	})

	it('should override the template with the highest precedence diff', function() {
		template = {foo: ''};
		lowPrecedence = {foo: 'lowOverride'};
		highPrecedence = {foo: 'highOverride'};
		actual = jsonCascade(template, lowPrecedence, highPrecedence);
		expected = {foo: 'highOverride'};
		expect( actual ).toEqual( expected );
	})

	it('should override the template with the highest precedence diff', function() {
		template = {foo: '', lorem: -1, hello: ''};
		lowPrecedence = {foo: 'lowOverride', lorem: 25};
		highPrecedence = {foo: 'highOverride'};
		actual = jsonCascade(template, lowPrecedence, highPrecedence);
		expected = {foo: 'highOverride', lorem: 25, hello: ''};
		expect( actual ).toEqual( expected );
	})

	it('should only override the template value if the model value is of the correct type', function() {
		template = {foo: ''};
		diff = {foo: {lorem: 'ipsum'}};
		actual = jsonCascade(template, diff);
		expected = {foo: ''};
		expect( actual ).toEqual( expected );
	})


})


describe('jsonCascade arrays', function(){

	var actual, expected, template, lowPrecedence, midPrecedence, highPrecedence;



	it('should return an empty array when the template is an empty array', function(){
		expect( jsonCascade([]) ).toEqual( [] );
	})



	it('should return just the template if the template is the only param', function() {
		template = [{foo: ''}];
		diff = [{}, {foo: 'bar'}, {foo: 'bar', lorem: 'ipsum'}];
		actual = jsonCascade(template, diff);
		expected = [{foo: ''}, {foo: 'bar'}, {foo: 'bar'}];
		expect( actual ).toEqual( expected );
	})

});

describe('jsonCascade complex objects', function(){

	var actual, expected, template, lowPrecedence, midPrecedence, highPrecedence;

	it('should override the template with the highest precedence diff', function() {
		template = {
			customerId: -1,
			firstname: '',
			lastname: '',
			age: -1,
			gendre: 'male',
			relatedCustomerIds: [],
			homeAddress : {
				addressLine1: '',
				addressLine2: '',
				addressLine3: '',
				country: ''
			},
			workAddress : {
				addressLine1: '',
				addressLine2: '',
				addressLine3: '',
				country: ''
			},
			products: [
				{
					productId: -1,
					price: -1,
					title: '',
					relatedProductIds: []
				}
			]
		};

		lowPrecedence = {
			customerId: 1000001,
			firstname: 'John',
			lastname: 'Smith',
			age: 32,
			relatedCustomerIds: [1000003, 1000004],
			homeAddress : {
				addressLine1: 'The White House',
				addressLine2: '1600 Pennsylvania Avenue NW',
				addressLine3: 'Washington DC',
			},
			products: [
				{
					productId: 2000001,
					price: 50,
					title: 'The Mythical Man Month',
					relatedProductIds: [2000004, 2000005]
				},
				{
					productId: 2000001,
					relatedProductIds: [2000004]
				}
			]
		};

		highPrecedence = {
			customerId: 1000002,
			firstname: null,
			lastname: 'Jones',
			relatedCustomerIds: [1000005, 1000006],
			homeAddress : {
				addressLine1: '10 Downing Street',
				addressLine2: null
			},
			workAddress : {
				addressLine1: 'Aras An Uachtarain',
				country: 'Ireland'
			},
			products: [
				{
					productId: 2000002,
					price: 40,
					relatedProductIds: [2000006]
				},
				{
					price: 30,
					title: 'Clean Code',
					relatedProductIds: []
				},
				{
					title: 'Effective Java'
				}
			]
		};

		expected = {
			customerId: 1000002,
			firstname: null,
			lastname: 'Jones',
			age: 32,
			gendre: 'male',
			relatedCustomerIds: [1000005, 1000006],
			homeAddress : {
				addressLine1: '10 Downing Street',
				addressLine2: '1600 Pennsylvania Avenue NW',
				addressLine3: 'Washington DC',
				country: ''
			},
			workAddress : {
				addressLine1: 'Aras An Uachtarain',
				addressLine2: '',
				addressLine3: '',
				country: 'Ireland'
			},
			products: [
				{
					productId: 2000002,
					price: 40,
					title: 'The Mythical Man Month',
					relatedProductIds: [2000006]
				},
				{
					productId: 2000001,
					price: 30,
					title: 'Clean Code',
					relatedProductIds: []
				},
				{
					productId: -1,
					price: -1,
					title: 'Effective Java',
					relatedProductIds: []
				}
			]
		};

		actual = jsonCascade(template, lowPrecedence, highPrecedence);
		expect( actual ).toEqual( expected );
	})
})