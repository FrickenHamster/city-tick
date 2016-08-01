/**
 * Created by alexanderyan on 7/28/16.
 */

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
	
}


module.exports = Job;
