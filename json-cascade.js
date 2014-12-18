"use strict";

(function() {

	var root = this
	var previousJsonCascade = root.jsonCascade;

	var jsonCascade = function() {

		if(arguments.length == 0)
			return {};

		var template = arguments[0];

		if(arguments.length == 1)
			return deepcopy(template);

		// Template is a primitive (or null)
		if(!_.isObject(template))
			return deepcopy(arguments[arguments.length -1]);

		// Can't use slice on arguments
		var models = subsetOfArguments(1, arguments) || [];

		if(isArrayTemplate(template))
			return arrayCascade(template, models);
		else
			return arrayCascade(template, models);

	}

	jsonCascade.noConflict = function() {
		root.jsonCascade = previousJsonCascade;
		return jsonCascade;
	}

	if( typeof exports !== 'undefined' ) {
		if( typeof module !== 'undefined' && module.exports ) {
			exports = module.exports = jsonCascade;
		}
		exports.jsonCascade = jsonCascade;
	} 
	else {
		root.jsonCascade = jsonCascade;
	}

	var has_require = typeof require !== 'undefined'

	var _ = root._

	if( typeof _ === 'undefined' ) {
		if( has_require ) {
			_ = require('underscore')
		}
		else throw new Error('mymodule requires underscore, see http://underscorejs.org');
	}

	var deepcopy = root.deepcopy

	if( typeof _ === 'undefined' ) {
		if( has_require ) {
			deepcopy = require('deepcopy')
		}
		else throw new Error('mymodule requires deepcopy, see https://www.npmjs.com/package/deepcopy');
	}



	function isArrayTemplate(val) {
		return _.isArray(val) && val.length == 1 && _.isArray(val[0]);
	}

	function subsetOfArguments(index, paramArguments) {
		var arr = [];
		for(var i = index; i < paramArguments.length; i++) {
			var currentParam = paramArguments[i]
			if(_.isObject(currentParam))
				arr.push(currentParam);
		}
		return arr;
	}

	function arrayCascade(template, arrayOfModels) {
		return deepcopy(template);
	}

	function objectCascade(template, arrayOfModels) {
		return deepcopy(template);
	}

}).call(this);