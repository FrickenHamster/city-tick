/**
 * Created by alexanderyan on 7/18/16.
 */

let Com = require('./Commodity');
let Commodity = Com.Commodity;
let COMMODITY_IDS = Com.COMMODITY_IDS;
let ITEM_ATTR_ID = Com.ITEM_ATTR_ID;


class Inventory
{
	constructor(niche)
	{
		this.foodList = [];
		this.commodityTypes = {};
		this.niche = niche;
	}

	gainCommodities(commodity)
	{
		let key = commodity.getStorageKey();
		let comTypeGroup = this.commodityTypes[commodity.type];

		if (!comTypeGroup)
		{
			comTypeGroup = {};
			this.commodityTypes[key] = comTypeGroup;
		}
		let uniqueCom = comTypeGroup[key];
		if (uniqueCom)
		{
			uniqueCom.gainAmount(commodity.amount);
		}
		else
		{
			comTypeGroup[key] = commodity;
			commodity.inventory = this;
			if (commodity.canBeEatenByNiche(this.niche))
			{
				this.foodList.push(commodity);
			}
		}
	}
	
	loseCommodity(commodity)
	{
		let key = commodity.getStorageKey();
		let comTypeGroup = this.commodityTypes[commodity.type];
		delete comTypeGroup[key];
		if (commodity.canBeEatenByNiche(this.niche));
		{
			this.foodList.splice(this.foodList.indexOf(commodity));
		}
	}
	
	foodAmount()
	{
		let count = 0;
		for (let i = 0; i < this.foodList.length; i++)
		{
			count += this.foodList[i].amount;
		}
		return count;
	}
	
	loseFood(amt)
	{
		let foodamt = this.foodAmount();
		let ratio = amt / foodamt;
		let curTaken = 0;
		for (let i = 0; i < this.foodList.length; i++)
		{
			let com = this.foodList[i];
			let fm = Math.floor(com.amount * ratio);
			com.loseAmount(fm);
			curTaken += fm;
		}
		for (let i = 0; i < this.foodList.length; i++)
		{
			if (curTaken >= amt)
				break;
			let com = this.foodList[i];
			com.loseAmount(1)
		}
	}
	
}

module.exports = {
	Inventory: Inventory
};
