/**
 * Created by alexanderyan on 7/28/16.
 */

let COMMODITY_IDS = require('./Commodity').COMMODITY_IDS;
let Commodity = require('./Commodity').Commodity;

const JobIDs = {
	FARM: 0
};

class Job {
	constructor(workerLimit) {
	}
}


const PROCESS_IDS = {
	FARM_APPLE: 0,
	SMELT_IRON: 10
};


class ProcessType {
	constructor(inputs, outputs, time) {
		this.inputs = inputs;
		this.outputs = outputs;
		this.time = time;
	}
}

let PROCESS_CODEX = {};

function addProcess(id, inputs, outputs, time) {
	PROCESS_CODEX[id] = new ProcessType(inputs, outputs, time)
}

function initProcesses() {
	addProcess(PROCESS_IDS.FARM_APPLE, [], [{type: COMMODITY_IDS.APPLE, amount: 10}], 20);
	addProcess(PROCESS_IDS.SMELT_IRON, [{type: COMMODITY_IDS.IRON_ORE, amount: 10}], [{type: COMMODITY_IDS.IRON_INGOT, amount: 5}], 30);
}

const PROCESS_STATE = {
	LOADING_INPUTS: 0,
	READY_TO_START: 1,
	WORKING: 2,
};

class Process {
	constructor(type, inventory) {
		this.type = type;
		this.inventory = inventory;
		this.state = PROCESS_STATE.LOADING_INPUTS;
		this.codexEntry = PROCESS_CODEX[type];
		this.inputsRequired = {};
		for (const input of this.codexEntry.inputs) {
			if (this.inputsRequired[input.type])
				this.inputsRequired[input.type] += input.amount;
			else
				this.inputsRequired[input.type] = input.amount
		}
		this.timeLeft = this.codexEntry.time;
	}

	resetInputs() {
		for (const input of this.codexEntry.inputs) {
			if (this.inputsRequired[input.type])
				this.inputsRequired[input.type] += input.amount;
			else
				this.inputsRequired[input.type] = input.amount
		}
	}

	fetchInputsFromInventory(inventory) {
		let full = true;
		inputLoop:
		for (const inputType in this.inputsRequired) {
			if (this.inputsRequired[inputType] <= 0) 
				continue;
			const comTypes = inventory.commodityTypes[inputType];
			if (comTypes) {
				for (const comKey in comTypes) {
					const com = comTypes[comKey];
					if (com.amount >= this.inputsRequired[inputType]) {
						com.loseAmount(this.inputsRequired[inputType]);
						this.inputsRequired[inputType] = 0;
					}
					else {
						this.inputsRequired[inputType] -= com.amount;
						com.loseAll();
						this.full = false;
					}
				}
			} else {
				full = false;
			}
		}
		if (full) {
			this.state = PROCESS_STATE.WORKING;
		}
	}

	addCommodities(commodities) {
		if (this.inputsRequired[commodities.type]) {
			//this.inputsRequired[commodities.type]
		} else {

		}
	}

	tick(time) {
		if (this.state != PROCESS_STATE.WORKING)
			return false;
		this.timeLeft -= time;
		if (this.timeLeft <= 0) {
			this.finishCycle();
		}
	}

	finishCycle() {
		for (const outputStruct of this.codexEntry.outputs) {
			const newCom = new Commodity({
				type: outputStruct.type,
				amount: outputStruct.amount
			});
			this.inventory.gainCommodities(newCom);
		}
		this.resetInputs();
		this.state = PROCESS_STATE.LOADING_INPUTS;
	}

}

initProcesses();

module.exports = {Job, Process, PROCESS_IDS};
