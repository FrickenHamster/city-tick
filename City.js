/**
 * Created by alexanderyan on 6/6/16.
 */

"use strict";


var Com = require('./Commodity');
var Commodity = Com.Commodity;
var COMMODITY_IDS = Com.COMMODITY_IDS;
var ITEM_ATTR_ID = Com.ITEM_ATTR_ID;

function CityManager()
{
	this.cities = [];
}

CityManager.prototype.createCity = function (name)
{
	var city = new City(name);
	this.cities.push(city);
	return city;
};

function City(name)
{
	this.name = name;

	this.commodityTypes = {};

	this.population = 0;
	this.growthRate = 1;
}

City.prototype.cityTick = function ()
{
	this.population += this.growthRate;
};


City.prototype.gainCommodities = function (commodity)
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
	}
};



var cityManager = new CityManager();
var city = cityManager.createCity('hamsterTown');

var com = new Commodity({type: COMMODITY_IDS.BONE, amount: 100});
console.log(com.getStorageKey());

var attr = {};
attr[ITEM_ATTR_ID.LEVEL] = {value: 10, maxValue: 100};
var com2 = com.splitNew(attr, 5);
console.log(com2.getStorageKey());

