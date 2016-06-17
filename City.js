/**
 * Created by alexanderyan on 6/6/16.
 */

function CityManager()
{
	this.cities = [];
}

CityManager.prototype.createCity = function(name)
{
	var city = new City(name);
	this.cities.push(city);
	return city;
};

function City(name)
{
	this.name = name;
	
	this.commodityTypes = {};
}

var ITEM_ATTRS =
{
	LEVEL: 0,
	QUALITY: 1,
	CONDITION: 2,
	MAX_CONDITION: 3
};

City.prototype.gainCommodities = function(commodity)
{
	var key = commodity.getStorageKey();
	var cityComType = this.commodityTypes[commodity.type];
	
	if (!cityComType)
	{
		cityComType = {};
		this.commodityTypes[key] = cityComType
	}
	var uniqueCom = cityComType[key];
	console.log(uniqueCom);
	if (uniqueCom)
	{
		uniqueCom.gainAmount(commodity.amount);
	}
	else 
	{
		cityComType[key] = commodity;
		console.log(cityComType[key])
	}
};


function Commodity(attr, itemAttr)
{
	this.type = attr.type;
	
	this.itemAttr = itemAttr;
	
	this.amount = attr.amount;
}

Commodity.prototype.gainAmount = function(amt)
{
	this.amount += amt;
};

Commodity.prototype.getStorageKey = function()
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


var cityManager = new CityManager();
var city = cityManager.createCity('hamsterTown');
var itemAttrs = {};
itemAttrs[ITEM_ATTRS.QUALITY] = 15;
itemAttrs[ITEM_ATTRS.LEVEL] = 5;
var com = new Commodity({
	type: 0,
	amount: 4},
	itemAttrs
);

city.gainCommodities(com);

var itemAttrs2 = {};
itemAttrs2[ITEM_ATTRS.QUALITY] = 11;
itemAttrs2[ITEM_ATTRS.LEVEL] = 8;
var com2 = new Commodity({
		type: 0,
		amount: 2},
	itemAttrs2
);

city.gainCommodities(com2);

console.log(city.commodityTypes);

