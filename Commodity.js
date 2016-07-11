/**
 * Created by alexanderyan on 6/28/16.
 */

var initialized = false;

var ITEM_ATTRS =
{
	LEVEL: 0,
	QUALITY: 1,
	CONDITION: 2,
};

var ITEM_ATTR_CODEX = {};

var addItemAttr = function (id, name)
{
	var attr = {
		id: id,
		name: name,
	};
	ITEM_ATTR_CODEX[id] = attr;
	return attr;
};

var COMMODITY_TYPES =
{
	BONE: 0,
	MAMMAL_MEAT: 1
};

var COMMODITY_CODEX = {};

var addCommodityType = function (id, name, itemAttrs)
{
	var com = {
		id: id,
		name: name,
		itemAttrs: itemAttrs
	};
	COMMODITY_CODEX[id] = com;
	return com;
};

var INIT_COMMODITY = function ()
{
	addItemAttr(ITEM_ATTRS.CONDITION, 'Condition');
	addItemAttr(ITEM_ATTRS.LEVEL, "Level");
	addItemAttr(ITEM_ATTRS.QUALITY, "Quality");

	addCommodityType(COMMODITY_TYPES.BONE, 'Bones',
		[ITEM_ATTRS.CONDITION, ITEM_ATTRS.LEVEL, ITEM_ATTRS.QUALITY]
	);
	addCommodityType(COMMODITY_TYPES.MAMMAL_MEAT, 'Mammal Meat',
		[ITEM_ATTRS.CONDITION, ITEM_ATTRS.LEVEL, ITEM_ATTRS.QUALITY]
	);
};

function Commodity(attr, itemAttr)
{
	this.type = attr.type;

	this.itemAttr = {};
	var codexItemAttrs = COMMODITY_CODEX[this.type].itemAttr;

	for (var key in codexItemAttrs)
	{
		var passedAttr = itemAttr.key;
		if (passedAttr)
		{
			var value = passedAttr.value ? passedAttr.value : 0;
			var maxValue = passedAttr.value ? passedAttr.maxValue : 9999;
			this.itemAttr[key] = {
				value: value,
				maxValue: maxValue
			}
		}
		else
		{
			this.itemAttr[key] = {
				value: 0,
				maxValue: 9999
			};
		}
	}

	this.amount = attr.amount;
}

Commodity.prototype.gainAmount = function (amt)
{
	this.amount += amt;
};

Commodity.prototype.getStorageKey = function ()
{
	var key = '';
	for (var i in this.itemAttr)
	{
		var attr = this.itemAttr[i];
		key += i + ':' + attr + ','
	}
	console.log(key);
	return key
};

Commodity.prototype.splitNew = function (newItemAttrs, amount)
{
	if (amount > this.amount)
	{
		amount = this.amount;
	}
	var newCommodity = Commodity({type: this.type, amount: amount}, newItemAttrs);
	this.amount -= amount;
	if (amount <= 0)
	{
		
	}
};


module.exports =
{
	ITEM_ATTRS: ITEM_ATTRS,
	COMMODITY_TYPES: COMMODITY_TYPES,
	Commodity: Commodity
};
