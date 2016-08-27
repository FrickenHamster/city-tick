/**
 * Created by alexanderyan on 7/18/16.
 */

const Com = require('./Commodity');
const Commodity = Com.Commodity;
const COMMODITY_IDS = Com.COMMODITY_IDS;
const ITEM_ATTR_ID = Com.ITEM_ATTR_ID;
const COMMODITY_CODEX = Com.COMMODITY_CODEX;
const ITEM_ATTR_CODEX = Com.ITEM_ATTR_CODEX;

class Inventory {
	constructor(niche) {
		this.foodList = [];
		this.commodityTypes = {};
		this.niche = niche;
	}

	gainCommodities(commodity) {
		let storageKey = commodity.getStorageKey();
		let comTypeGroup = this.commodityTypes[commodity.type];

		if (!comTypeGroup) {
			comTypeGroup = {};
			this.commodityTypes[commodity.type] = comTypeGroup;
		}
		let uniqueCom = comTypeGroup[storageKey];
		if (uniqueCom) {
			uniqueCom.gainAmount(commodity.amount);
		}
		else {
			comTypeGroup[storageKey] = commodity;
			commodity.inventory = this;
			if (commodity.canBeEatenByNiche(this.niche)) {
				this.foodList.push(commodity);
			}
		}
	}

	loseCommodity(commodity) {
		let key = commodity.getStorageKey();
		let comTypeGroup = this.commodityTypes[commodity.type];
		delete comTypeGroup[key];
		if (Object.keys(comTypeGroup).length == 0)
			delete this.commodityTypes[commodity.type];
		if (commodity.canBeEatenByNiche(this.niche));
		{
			this.foodList.splice(this.foodList.indexOf(commodity));
		}
	}

	foodAmount() {
		let count = 0;
		for (let i = 0; i < this.foodList.length; i++) {
			count += this.foodList[i].amount;
		}
		return count;
	}

	loseFood(amt) {
		let foodamt = this.foodAmount();
		let ratio = amt / foodamt;
		let curTaken = 0;
		for (let i = 0; i < this.foodList.length; i++) {
			let com = this.foodList[i];
			let fm = Math.floor(com.amount * ratio);
			if (curTaken + fm > amt)
				fm = amt - curTaken;
			com.loseAmount(fm);
			curTaken += fm;
			if (curTaken >= amt)
				return;
		}
		for (let i = 0; i < this.foodList.length; i++) {
			if (curTaken >= amt)
				break;
			let com = this.foodList[i];
			com.loseAmount(1);
			curTaken += 1;
		}
	}

	generateReport() {
		let report = '';
		for (const typeKey in this.commodityTypes) {
			report += `${COMMODITY_CODEX[typeKey].name}\n`;
			const comType = this.commodityTypes[typeKey];
			for (const comKey in comType) {
				const com = comType[comKey];
				for (const attrKey in com.itemAttrs) {
					const attr = com.itemAttrs[attrKey];
					report += `${ITEM_ATTR_CODEX[attrKey].name} ${attr.value}/${attr.maxValue} `;
				}
				report += `| amount ${com.amount}`;
			}
			report += '\n';
		}
		return report;
	}

}

module.exports = {
	Inventory: Inventory
};
