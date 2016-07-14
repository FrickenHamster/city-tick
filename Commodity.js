/**
 * Created by alexanderyan on 6/28/16.
 */

var initialized = false;

var ITEM_ATTR_ID =
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

var addCommodityType = function (id, name, props, itemAttrs)
{
	var com = {
		id: id,
		name: name,
		itemAttrs: itemAttrs
	};
	this.edible = props.edible
	COMMODITY_CODEX[id] = com;
	return com;
};

var INIT_COMMODITY = function ()
{
	addItemAttr(ITEM_ATTR_ID.CONDITION, 'Condition');
	addItemAttr(ITEM_ATTR_ID.LEVEL, "Level");
	addItemAttr(ITEM_ATTR_ID.QUALITY, "Quality");

	addCommodityType(COMMODITY_IDS.BONE, 'Bones',
		[ITEM_ATTR_ID.CONDITION, ITEM_ATTR_ID.LEVEL, ITEM_ATTR_ID.QUALITY]
	);
	addCommodityType(COMMODITY_IDS.MAMMAL_MEAT, 'Mammal Meat',
		[ITEM_ATTR_ID.CONDITION, ITEM_ATTR_ID.LEVEL, ITEM_ATTR_ID.QUALITY]
	);
};

INIT_COMMODITY();

function Commodity(passed)
{
	this.type = passed.type;
	this.itemAttrs = {};
	var codexItemAttrs = COMMODITY_CODEX[this.type].itemAttrs;
	for (var key in codexItemAttrs)
	{
		let passedAttr = passed.itemAttrs ? passed.itemAttrs[key] : null;
		if (passedAttr)
		{
			var value = passedAttr.value ? passedAttr.value : 0;
			var maxValue = passedAttr.value ? passedAttr.maxValue : 9999;
			this.itemAttrs[key] = {
				value: value,
				maxValue: maxValue
			}
		}
		else
		{
			this.itemAttrs[key] = {
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
	for (var i in this.itemAttrs)
	{
		var attr = this.itemAttrs[i];
		key += i + ':' + attr.value + ':' + attr.maxValue;
	}
	return key
};

Commodity.prototype.splitNew = function (newItemAttrs, amount)
{
	if (amount > this.amount)
	{
		amount = this.amount;
	}
	var newCommodity = new Commodity({type: this.type, amount: amount, itemAttrs: newItemAttrs});
	this.amount -= amount;
	if (amount <= 0)
	{
		//die
	}
	console.log(newItemAttrs);
	return newCommodity;
};



module.exports =
{
	ITEM_ATTR_ID: ITEM_ATTR_ID,
	COMMODITY_IDS: COMMODITY_IDS,
	Commodity: Commodity
};
