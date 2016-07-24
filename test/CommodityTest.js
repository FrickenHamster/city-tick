'use strict';

let test = require('unit.js');

let Com = require('../Commodity');
let Commodity = Com.Commodity;
let COMMODITY_IDS = Com.COMMODITY_IDS;
let ITEM_ATTR_ID = Com.ITEM_ATTR_ID;
let Inventory = require('../Inventory').Inventory;

describe('commoditiy', () =>
{
	it('gain amount', () =>
	{
		let commodity = new Commodity({type: COMMODITY_IDS.ANIMAL_CARCASS, amount: 10});
		test.number(commodity.amount).isEqualTo(10);
		commodity.gainAmount(34);
		test.number(commodity.amount).isEqualTo(44);

	});

	it('loses amount and dies correctly', () =>
	{
		let commodity = new Commodity({type: COMMODITY_IDS.ANIMAL_CARCASS, amount: 88});
		test.number(commodity.amount).isEqualTo(88);
		commodity.loseAmount(10);
		test.number(commodity.amount).isEqualTo(78);
		let inventory = test.mock(new Inventory());
		inventory.expects('loseCommodity').once().withArgs(commodity);
		commodity.inventory = inventory.object;
		commodity.loseAmount(78);
		inventory.verify();
	});

	it('get storage key', () =>
	{
		let itemAttrs = {};
		itemAttrs[ITEM_ATTR_ID.CONDITION] = {value: 23, max: 34};
		let commodity = new Commodity({type: COMMODITY_IDS.ANIMAL_CARCASS, itemAttrs: itemAttrs});
		let expected = "";
		for (let key in commodity.itemAttrs)
		{
			let attr = commodity.itemAttrs[key];
			expected += key + ':' + attr.value + ':' + attr.maxValue + '|';
		}
		test.string(commodity.getStorageKey()).isEqualTo(expected);
	});

	it('splits', () =>
	{
		let commodity = new Commodity({type: COMMODITY_IDS.ANIMAL_CARCASS, amount: 100});

		let itemAttrs = {};
		itemAttrs[ITEM_ATTR_ID.CONDITION] = {value: 23, max: 34};
		let commodity2 = commodity.splitNew(itemAttrs, 20);
		test.number(commodity.amount).isEqualTo(80);
		test.number(commodity2.amount).isEqualTo(20);

		let inventory = test.mock(new Inventory());
		inventory.expects('loseCommodity').once().withArgs(commodity);
		commodity.inventory = inventory.object;
		commodity.splitNew(itemAttrs, 80);
		inventory.verify();
	})
});
