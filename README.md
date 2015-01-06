# json-cascade

json-cascade is a pure json template(ish) library for browser or node.js. It takes several json objects and combines them to produce a single output. Like CSS, it uses cascading and precedence to determine which fields get output.

```javascript
jsonCascade(template [, diff1] [, diffN])
```

## Usage nodejs
```javascript
jsonCascade = require('json-cascade');
out = jsonCascade(template [, diff1] [, diffN]);
```

## Usage browser
```html
<script src="underscore.js"></script>
<script src="json-cascade.js"></script>

out = jsonCascade(template [, diff1] [, diffN]);
```

## Template
The template object defines the structure of the output json. Only fields that appear in the template will be part of the output.

## Diffs
Each diff (aka model) is then applied to the template with the last diff having highest precedence.


## Simple Example

### Template
```javascript
{
	customerId : null,
	firstname : "",
	lastname : "",
	age : -1
}
```

### Diff One
```json
{
	"firstname" : "John",
	"age" : 32
}
```


### Diff Two
```json
	{
		"lastname" : "Smith",
		"age" : 48
	}
```

### Output
	{
		customerId : null,
		firstname : "John",
		lastname : "Smith",
		age : 48
	}

## Arrays
To output an array of objects, the template should contain an array with exactly **one object** (not a primitive). The equivalent array in the diff may then have multiple objects which will be applied in a loop. If the template array does not contain exactly one object, the array will be overridden as if it were a primitive.



## Complex Example

### Template
	{
		customerId : null,
		firstname : "",
		lastname : "",
		age : -1,
		address : {
			line1 : "",
			line2 : "",
			line3 : "",
			country : ""
		},
		relatedCustomers : [],
		products : [
			{
				productId : -1,
				title : "",
				price : -1
			}
		]
	}

### Diff One

	{
		firstname : "John",
		age : 32,
		address : {
			line1 : "Aras An Uachtairain",
		},
		relatedCustomers : [2000005],
		products : [
			{
				productId : 1000005,
				title : "The Mythical Man Month",
				price : 50
			},
			{
				productId : 1000006,
				title : "Effective Java",
				price : 40
			}
		]
	}


### Diff Two
	{
		lastname : "Smith",
		age : 48,
		address : {
			line2 : "Phoenix Park",
			country : "Ireland"
		},
		relatedCustomers : [2000008, 2000009],
		products : [
			{
			},
			{
				title : "Clean Code",
				price : 100
			},
			{
				productId : 1000009
			}
		]
	}


### Output
	{
		customerId : null,
		firstname : "John",
		lastname : "Smith",
		age : 48,
		address : {
			line1 : "Aras An Uachtairain",
			line2 : "Phoenix Park",
			line3 : "",
			country : "Ireland"
		},
		relatedCustomers : [2000008, 2000009],
		products : [
			{
				productId : -1,
				title : "",
				price : -1
			},
			{
				productId : 1000006,
				title : "Clean Code",
				price : 100
			},
			{
				productId : 1000009,
				title : "",
				price : -1
			}
		]
	}
