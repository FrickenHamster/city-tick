/**
 * Created by alexanderyan on 6/6/16.
 */

"use strict";


let Com = require('./Commodity');
let Commodity = Com.Commodity;
let COMMODITY_IDS = Com.COMMODITY_IDS;
let ITEM_ATTR_ID = Com.ITEM_ATTR_ID;

let BankAccount = require('./Economy').BankAccount;

let Inventory = require('./Inventory').Inventory;

let SpeciesMod = require('./Species');
let Species = SpeciesMod.Species;
let Niche = SpeciesMod.Niche;

class CityManager
{
	constructor()
	{
		this.cities = [];
		this.inventory = new Inventory(Niche.OMNIVORE);
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


		this.population = 0;
		this.growthRate = 1;
		this.species = new Species(Niche.OMNIVORE);
		
		this.inventory = new Inventory(this.species.niche);
	}
	
	cityTick()
	{
		let growth = this.growthRate;
		
		this.inventory.loseFood(this.population);
		this.population += this.growthRate;
		this.printInfo();
	}
	
	printInfo()
	{
		console.log("Population:" + this.population);
		console.log("Food Supplies:" + this.inventory.foodAmount());
		
	}
	
}
