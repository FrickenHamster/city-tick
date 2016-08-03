/**
 * Created by alexanderyan on 7/28/16.
 */

let COMMODITY_IDS = require('./Commodity').COMMODITY_IDS;

const JobIDs = {
	FARM: 0
};

class Job
{
	constructor(workerLimit)
	{
	}
}


const PROCESS_IDS = {
	FARM_APPLE: 0
};


class ProcessType
{
	constructor(inputs, outputs, time)
	{
		this.inputs = inputs;
		this.outputs = outputs;
		this.time = time;
	}
}

let PROCESS_CODEX = {};

function addProcess(id, inputs, outputs, time)
{
	PROCESS_CODEX[id] = new ProcessType(inputs, outputs, time)
}

function initProcesses()
{
	addProcess(PROCESS_IDS.FARM_APPLE, [], [COMMODITY_IDS.APPLE], 20);
}

const PROCESS_STATE = {
	LOADING_INPUTS: 0,
	READY_TO_START: 1,
	WORKING: 2,
};

class Process
{
	constructor(type)
	{
		this.type = type;
		this.state = PROCESS_STATE.LOADING_INPUTS;
	}
}


module.exports = Job;
