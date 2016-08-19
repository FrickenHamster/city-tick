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
	FARM_APPLE: 0
};


class ProcessType {
	constructor(inputs, outputs, work) {
		this.inputs = inputs;
		this.outputs = outputs;
		this.work = work;
	}
}

let PROCESS_CODEX = {};

function addProcess(id, inputs, outputs, work) {
	PROCESS_CODEX[id] = new ProcessType(inputs, outputs, work)
}

function initProcesses() {
	addProcess(PROCESS_IDS.FARM_APPLE, [], [{type: COMMODITY_IDS.APPLE, amount: 10}], 20);
}

const PROCESS_STATE = {
	LOADING_INPUTS: 0,
	READY_TO_START: 1,
	WORKING: 2,
};

class Process {
	constructor(type, city) {
		this.type = type;
		this.city = city;
		this.state = PROCESS_STATE.LOADING_INPUTS;
		this.codexEntry = PROCESS_CODEX[type];
		this.inputsRequired = {};
		for (const input of this.codexEntry.inputs.length) {
			if (this.inputsRequired[input.type])
				this.inputsRequired[input.type] = input.amount;
			else
				this.inputsRequired[input.type] += input.amount
		}
		this.workLeft = this.codexEntry.work;
	}

	resetInputs() {
		
	}

	addCommodities(commodities) {

	}
	
	work(){
		
	}

	finishCycle() {
		for (const outputStruct of this.codexEntry.outputs) {
			const newCom = new Commodity({
				type: outputStruct.type,
				amount: outputStruct.amount
			},);
			this.city.addCommodities(newCom);
		}
	}

}


module.exports = Job;
