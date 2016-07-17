/**
 * Created by Hamster on 7/17/2016.
 */


const Niche = {
	CARNIVORE: 0,
	HERBIVORE: 1,
	OMNIVORE: 2,
	SCAVENGER: 3,
};

class Species
{
	constructor(niche)
	{
		this.niche = niche;
	}
}

module.exports = {
	Species: Species,
	Niche: Niche
}
;