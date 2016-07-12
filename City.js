/**
 * Created by alexanderyan on 6/6/16.
 */

var Com = require('./Commodity');
var Commodity = Com.Commodity;
var COMMODITY_IDS = Com.COMMODITY_IDS;

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


var cityManager = new CityManager();
var city = cityManager.createCity('hamsterTown');

var com = new Commodity({type: COMMODITY_IDS.BONE, amount: 100});
console.log(com, com.getStorageKey());


console.log(city.commodityTypes);

