"use strict";

(function() {

	var root = this
	var previousJsonCascade = root.jsonCascade;

	var jsonCascade = function() {

		if(arguments.length == 0)
			return {};

		var template = arguments[0];

		// Can't use slice on arguments
		var models = pickModelsFromArguments(arguments);

		if(!_.isObject(template))
			return {};

		if(_.isArray(template))
			return [];

		return objectCascade(template, models);

		return {}
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

	function isPrimitive(val) {
		return !_.isObject(val);
	}

	function isSimpleArray(val) {
		return _.isArray(val) && !isArrayTemplate(val);
	}

	function isArrayTemplate(val) {
		var template;
		return _.isArray(val) && val.length == 1 && _.isObject(template = val[0]);
	}

	// Can't call .slice() on the special 'arguments' variable
	function pickModelsFromArguments(args) {
		var arr = [];
		for(var i = 1; i < args.length; i++) {
			if(_.isObject(args[i]))
				arr.push(args[i]);
		}
		return arr;
	}

	function objectCascade(template, models) {

		if(!_.isObject(template)) {
			return null;
		}

		if(_.isArray(template))
			return [];

		var out = {};

		for(var key in template) {
			var val = template[key];

			if(isPrimitive(val))
				out[key] = pickHighestPrecedencePrimitive(key, template, models);
			else if(isSimpleArray(val))
				out[key] = pickHighestPrecedenceArray(key, template, models);
			else if(isArrayTemplate(val)) {
				var subModels = pickArrayVals(key, models);
				out[key] = arrayCascade(val, subModels);
			}
		}

		return out;
	}

	function pickHighestPrecedencePrimitive(key, template, models) {
		var out, model;

		for (var i = models.length - 1; i >= 0; i--) {
			model = models[i];
			if(_.has(model, key) && isPrimitive(model[key]))
				return model[key];
		};
		return template[key];
	}

	function pickHighestPrecedenceArray(key, template, models) {
		var out;

		for (var i = models.length - 1; i >= 0; i--) {
			if(_.isArray(models[i][key]))
				return models[i][key];
		};
		return template[key];
	}

	function pickArrayVals(key, models) {
		var arr = [];

		for(var i=0; i<models.length; i++) {
			var model = models[i];
			if(_.isArray(model[key])) {
				arr.push(model[key]);
			}
		}
		return arr;
	}

	function arrayCascade() {

	}

}).call(this);