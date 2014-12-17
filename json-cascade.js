"use strict";

(function() {

	var root = this
	var previousJsonCascade = root.jsonCascade;

	var jsonCascade = function() {

		if(arguments.length == 0)
			return {};

		var template = arguments[0];

		// Can't use slice on arguments
		var models = subsetOfArguments(1, arguments);
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



	function isArrayTemplate(val) {
		return is.array(val) && val.length == 1 && is.object(val[0]);
	}

	function subsetOfArguments(index, arguments) {
		var arr = [];
		for(var i = index; i < arguments.length; i++) {
			arr.push(arguments[i]);
		}
		return out;
	}

}).call(this);