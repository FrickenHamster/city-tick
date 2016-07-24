'use strict';

let test = require('unit.js');
let Inventory = require('../Inventory').Inventory;
let Com = require('../Commodity');
let Commodity = Com.Commodity;
let COMMODITY_IDS = Com.COMMODITY_IDS;
let ITEM_ATTR_ID = Com.ITEM_ATTR_ID;
let SpeciesMod = require('../Species');
let Niche = SpeciesMod.Niche;

describe('inventory', () =>
{
	it('gains commodities', ()=>
	{
		let inventory = new Inventory(Niche.OMNIVORE);
		test.object(inventory.commodityTypes).is({});
		let com = new Commodity({type: COMMODITY_IDS.BONE, amount: 12});
		inventory.gainCommodities(com);
		test.number(Object.keys(inventory.commodityTypes[com.type]).length).is(1);
		test.number(inventory.commodityTypes[com.type][com.getStorageKey()].amount).is(12);

		let itemAttrs = {};
		itemAttrs[ITEM_ATTR_ID.CONDITION] = {value: 10, maxValue: 40};
		let com2 = new Commodity({type: COMMODITY_IDS.BONE, amount: 5, itemAttrs});
		inventory.gainCommodities(com2);
		test.number(inventory.commodityTypes[com.type][com.getStorageKey()].amount).is(12);
		test.number(inventory.commodityTypes[com.type][com2.getStorageKey()].amount).is(5);
		
		let com3 = new Commodity({type: COMMODITY_IDS.BONE, amount: 5});
		inventory.gainCommodities(com3);
		test.number(inventory.commodityTypes[com.type][com.getStorageKey()].amount).is(17);
		
	});
	
	it('adds food',() =>
	{
		let inventory = new Inventory(Niche.OMNIVORE);
		test.number(inventory.foodAmount()).isEqualTo(0);
		let com = new Commodity({type: COMMODITY_IDS.APPLE, amount: 130});
		inventory.gainCommodities(com);
		test.number(inventory.foodAmount()).isEqualTo(130);
		let attr = {};
		attr[ITEM_ATTR_ID.QUALITY] = {value: 56, maxValue: 100};
		attr[ITEM_ATTR_ID.LEVEL] = {value: 4, maxValue: 100};
		com = new Commodity({type: COMMODITY_IDS.APPLE, amount: 32, itemAttrs: attr});
		inventory.gainCommodities(com);
		test.number(inventory.foodAmount()).isEqualTo(162);
		com = new Commodity({type: COMMODITY_IDS.ANIMAL_CARCASS, itemAttrs: attr,  amount: 40});
		inventory.gainCommodities(com);
	});

	it('lose food',() =>
	{
		let inventory = setupInventory();
		test.number(inventory.foodAmount()).isEqualTo(212);
		inventory.loseFood(10);
		test.number(inventory.foodAmount()).isEqualTo(202);
	})
	
	
});


function setupInventory()
{
	let inventory = new Inventory(Niche.OMNIVORE);
	let com = new Commodity({type: COMMODITY_IDS.BONE, amount: 12});
	inventory.gainCommodities(com);

	let attr;
	com = new Commodity({type: COMMODITY_IDS.APPLE, amount: 130});
	inventory.gainCommodities(com);

	attr = {};
	attr[ITEM_ATTR_ID.QUALITY] = {value: 56, maxValue: 100};
	attr[ITEM_ATTR_ID.LEVEL] = {value: 4, maxValue: 100};
	com = new Commodity({type: COMMODITY_IDS.APPLE, amount: 32, itemAttrs: attr});
	inventory.gainCommodities(com);

	com = new Commodity({type: COMMODITY_IDS.ANIMAL_MEAT, amount: 10});
	inventory.gainCommodities(com);

	attr = {};
	attr[ITEM_ATTR_ID.LEVEL] = {value: 1, maxValue: 100};
	com = new Commodity({type: COMMODITY_IDS.ANIMAL_CARCASS, itemAttrs: attr,  amount: 40});
	inventory.gainCommodities(com);

	return inventory;
}
