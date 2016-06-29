/**
 * Created by alexanderyan on 6/28/16.
 */

var initialized = false;

var ITEM_ATTRS =
{
	LEVEL: 0,
	QUALITY: 1,
	CONDITION: 2,
	MAX_CONDITION: 3
};

var ITEM_ATTR_CODEX = {};

var addItemAttr = function()
{
	
}

var COMMODITY_TYPES =
{
	BONE: 0,
	MAMMAL_MEAT: 1
};

var COMMODITY_CODEX = {};

var addCommodityType = function (id, name)
{
	var com = {
		id: id,
		name: name
	};
	COMMODITY_CODEX[id] = com;
	return com;
};

var INIT_COMMODITY = function ()
{
	addCommodityType(COMMODITY_TYPES.BONE, 'Bones');
};

module.exports =
{};


