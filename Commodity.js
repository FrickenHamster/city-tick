/**
 * Created by alexanderyan on 6/28/16.
 */

let Niche = require("./Species").Niche;

let initialized = false;

let ITEM_ATTR_ID =
{
	LEVEL: 0,
	QUALITY: 1,
	CONDITION: 2,
};

let ITEM_ATTR_CODEX = {};

let addItemAttr = function (id, name)
{
	let attr = {
		id: id,
		name: name,
	};
	ITEM_ATTR_CODEX[id] = attr;
	return attr;
};

let COMMODITY_IDS =
{
	BONE: 0,
	MAMMAL_MEAT: 1,
	APPLE: 10,
	STONE: 50,
};

let COMMODITY_CODEX = {};

let addCommodityType = function (id, name, props, itemAttrs)
{
	let com = {
		id: id,
		name: name,
		itemAttrs: itemAttrs
	};
	if (props.niches)
	{
		com.edibility = {};
		for (let i in props.niches)
		{
			let niche = props.niches[i];
			com.edibility[niche] = true;
		}
		com.isFood = true;
	}
	else
	{
		com.isFood = false;
	}
	console.log(com.edibility);

	COMMODITY_CODEX[id] = com;
	return com;
};

let INIT_COMMODITY = function ()
{
	addItemAttr(ITEM_ATTR_ID.CONDITION, 'Condition');
	addItemAttr(ITEM_ATTR_ID.LEVEL, "Level");
	addItemAttr(ITEM_ATTR_ID.QUALITY, "Quality");

	addCommodityType(COMMODITY_IDS.BONE, 'Bones', {
			niches: [
				Niche.SCAVENGER
			]
		},
		[ITEM_ATTR_ID.CONDITION, ITEM_ATTR_ID.LEVEL, ITEM_ATTR_ID.QUALITY]
	);
	addCommodityType(COMMODITY_IDS.MAMMAL_MEAT, 'Mammal Meat', {
			niches: [
				Niche.CARNIVORE,
				Niche.OMNIVORE,
				Niche.SCAVENGER
			]
		},
		[ITEM_ATTR_ID.CONDITION, ITEM_ATTR_ID.LEVEL, ITEM_ATTR_ID.QUALITY]
	);
	addCommodityType(COMMODITY_IDS.APPLE, 'Apple', {
			niches: [
				Niche.OMNIVORE,
				Niche.HERBIVORE
			]
		},
		[ITEM_ATTR_ID.CONDITION, ITEM_ATTR_ID.LEVEL, ITEM_ATTR_ID.QUALITY]
	);
	addCommodityType(COMMODITY_IDS.STONE, 'Stone', {
		},
		[ITEM_ATTR_ID.CONDITION, ITEM_ATTR_ID.LEVEL, ITEM_ATTR_ID.QUALITY]
	);
	
};

INIT_COMMODITY();

class Commodity {
	constructor(passed)
	{
		this.type = passed.type;
		this.itemAttrs = {};
		this.codexEntry = COMMODITY_CODEX[this.type];
		let codexItemAttrs = COMMODITY_CODEX[this.type].itemAttrs;
		for (let key in codexItemAttrs)
		{
			let passedAttr = passed.itemAttrs ? passed.itemAttrs[key] : null;
			if (passedAttr)
			{
				let value = passedAttr.value ? passedAttr.value : 0;
				let maxValue = passedAttr.value ? passedAttr.maxValue : 9999;
				this.itemAttrs[key] = {
					value: value,
					maxValue: maxValue
				}
			}
			else
			{
				this.itemAttrs[key] = {
					value: 0,
					maxValue: 9999
				};
			}
		}
		this.amount = passed.amount;
		this.inventory = passed.inventory;
	}

	gainAmount(amt)
	{
		this.amount += amt;
	};

	loseAmount(amt)
	{
		this.amount -= amt;
		if (this.amount <= 0)
		{
			die();
		}
		return this.amount;
	}

	getStorageKey()
	{
		let key = '';
		for (let i in this.itemAttrs)
		{
			let attr = this.itemAttrs[i];
			key += i + ':' + attr.value + ':' + attr.maxValue;
		}
		return key
	};

	splitNew(newItemAttrs, amount)
	{
		if (amount > this.amount)
		{
			amount = this.amount;
		}
		let newCommodity = new Commodity({type: this.type, amount: amount, itemAttrs: newItemAttrs});
		this.amount -= amount;
		if (amount <= 0)
		{
			this.die();
		}
		return newCommodity;
	};
	
	die()
	{
		if (this.inventory)
		{
			this.inventory.loseCommodity(this);
		}
	}

	canBeEatenByNiche(niche)
	{
		return this.codexEntry.edibility[niche];
	}

}

module.exports =
{
	ITEM_ATTR_ID: ITEM_ATTR_ID,
	COMMODITY_IDS: COMMODITY_IDS,
	Commodity: Commodity
};
