"use strict";

(function() {
	var root = this
	var previousJsonCascade = root.jsonCascade;

	var jsonCascade = function() {
		return "";
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

}).call(this);