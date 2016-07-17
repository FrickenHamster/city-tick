/**
 * Created by alexanderyan on 6/6/16.
 */

"use strict";


let Com = require('./Commodity');
let Commodity = Com.Commodity;
let COMMODITY_IDS = Com.COMMODITY_IDS;
let ITEM_ATTR_ID = Com.ITEM_ATTR_ID;

let BankAccount = require('./Economy').BankAccount;

let SpeciesMod = require('./Species');
let Species = SpeciesMod.Species;
let Niche = SpeciesMod.Niche;

class CityManager
{
	constructor()
	{
		this.cities = [];

	}
	
	createCity(name)
	{
		var city = new City(name);
		this.cities.push(city);
		return city;
	}
	
	

}


class City
{
	
	constructor(name)
	{
		this.name = name;

		this.commodityTypes = {};

		this.population = 0;
		this.growthRate = 1;
		this.species = new Species(Niche.OMNIVORE);
	}
	
	cityTick()
	{
		this.population += this.growthRate;

	}
	
	gainCommidities()
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
	}
	
}





var cityManager = new CityManager();
var city = cityManager.createCity('hamsterTown');

var com = new Commodity({type: COMMODITY_IDS.BONE, amount: 100});
console.log(com.getStorageKey());

var attr = {};
attr[ITEM_ATTR_ID.LEVEL] = {value: 10, maxValue: 100};
var com2 = com.splitNew(attr, 5);
console.log(com2.getStorageKey());

