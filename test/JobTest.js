/**
 * Created by alexanderyan on 8/26/16.
 */

'use strict';

let test = require('unit.js');

let Com = require('../Commodity');

let Job = require('../Job');
let Commodity = Com.Commodity;
let COMMODITY_IDS = Com.COMMODITY_IDS;
let ITEM_ATTR_ID = Com.ITEM_ATTR_ID;
let Inventory = require('../Inventory').Inventory;

describe('job', () => {
	it('work apples', () => {
		const inventory = new Inventory(0);
		const proc = new Job.Process(Job.PROCESS_IDS.FARM_APPLE, inventory);
		proc.fetchInputsFromInventory(inventory);
		proc.tick(10);
		proc.tick(10);
		console.log(inventory.generateReport())
	});

	it('smelt iron', () => {
		const inventory = new Inventory(0);
		inventory.gainCommodities(new Commodity({type: COMMODITY_IDS.IRON_ORE, amount: 20}));
		const proc = new Job.Process(Job.PROCESS_IDS.SMELT_IRON, inventory);
		proc.fetchInputsFromInventory(inventory);
		proc.tick(10);
		proc.tick(20);
		proc.fetchInputsFromInventory(inventory);
		proc.tick(30);
		console.log(inventory.generateReport())
	});
});
