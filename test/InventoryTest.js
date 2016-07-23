'use strict';

let test = require('unit.js');
let Inventory = require('../Inventory').Inventory;
let Com = require('../Commodity');
let Commodity = Com.Commodity;
let COMMODITY_IDS = Com.COMMODITY_IDS;
let ITEM_ATTR_ID = Com.ITEM_ATTR_ID;
let SpeciesMod = require('../Species');
let Niche = SpeciesMod.Niche;

describe('hamsters', () =>
{
	it('flies',() =>
	{
		test.string(3)
	})
});


function setup()
{
	let inventory = new Inventory(Niche.OMNIVORE);
	var com = new Commodity({type: COMMODITY_IDS.BONE, amount: 100});

	var attr = {};
	attr[ITEM_ATTR_ID.LEVEL] = {value: 10, maxValue: 100};
	var com2 = com.splitNew(attr, 5);
	console.log(com2.getStorageKey());
	inventory.gainCommodities(com);

	com = new Commodity({type: COMMODITY_IDS.APPLE, amount: 100});
	inventory.gainCommodities(com);

	com = new Commodity({type: COMMODITY_IDS.MAMMAL_MEAT, amount: 120});
	inventory.gainCommodities(com);
	console.log(city.inventory.foodList);

	attr = {};
	attr[ITEM_ATTR_ID.LEVEL] = {value: 1, maxValue: 100};
	com = new Commodity({type: COMMODITY_IDS.MAMMAL_MEAT, itemAttrs: attr,  amount: 120});
	inventory.gainCommodities(com);
}
