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

var COMMODITY_IDS =
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

	addCommodityType(COMMODITY_IDS.BONE, 'Bones',
		[ITEM_ATTRS.CONDITION, ITEM_ATTRS.LEVEL, ITEM_ATTRS.QUALITY]
	);
	addCommodityType(COMMODITY_IDS.MAMMAL_MEAT, 'Mammal Meat',
		[ITEM_ATTRS.CONDITION, ITEM_ATTRS.LEVEL, ITEM_ATTRS.QUALITY]
	);
};

INIT_COMMODITY();

function Commodity(passed)
{
	this.type = passed.type;

	this.itemAttr = {};
	var codexItemAttrs = COMMODITY_CODEX[this.type].itemAttr;

	for (var key in codexItemAttrs)
	{
		console.log(key)
		var passedAttr = passed.itemAttr ? passed.itemAttr.key : null;
		console.log(passedAttr)
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

	this.amount = passed.amount;
}

Commodity.prototype.gainAmount = function (amt)
{
	this.amount += amt;
};

Commodity.prototype.getStorageKey = function ()
{
	var key = '';
	console.log(this.itemAttr)
	for (var i in this.itemAttr)
	{
		var attr = this.itemAttr[i];
		key += i + ':' + attr + ','
	}
	return key
};

Commodity.prototype.splitNew = function (newItemAttrs, amount)
{
	if (amount > this.amount)
	{
		amount = this.amount;
	}
	var newCommodity = Commodity({type: this.type, amount: amount, itemAttrs: newItemAttrs});
	this.amount -= amount;
	if (amount <= 0)
	{
		//die
	}
	return newCommodity;
};



module.exports =
{
	ITEM_ATTRS: ITEM_ATTRS,
	COMMODITY_IDS: COMMODITY_IDS,
	Commodity: Commodity
};
