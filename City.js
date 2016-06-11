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
	console.log(this.itemAttr.toString())
	return this.itemAttr.toString();
};


var cityManager = new CityManager();
var city = cityManager.createCity('hamsterTown');
var com = new Commodity({
	type: 0,
	amount: 4},
	{quality: 5}
);

city.gainCommodities(com);

var com2 = new Commodity({
		type: 0,
		amount: 2},
	{quality: 5}
);

city.gainCommodities(com2);

console.log(city.commodityTypes);

