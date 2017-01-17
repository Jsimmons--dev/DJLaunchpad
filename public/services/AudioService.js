
class Pad{
    constructor(){}
}

class Bank{

    constructor(){
        this.soundMap = new Map();
    }

    mapSound(pad,audio){
        this.soundMap.set(pad,audio);
    }

    getSound(pad){
        return this.soundMap.get(pad);
    }
}

class BoardConfig {

    constructor(numOfBanks,numOfPads){
        this.numberOfPads = numOfPads;
        this.pads = new Array();
        for(let i = 0;i<this.numberOfPads;i++){
            this.pads.push(new Pad());
        }

        this.numberOfBanks = numOfBanks;
        this.banks = new Array();
        for(let i = 0;i<this.numberOfBanks;i++){
            this.banks.push(new Bank());
        }
        this.currentBank = this.banks[0];
    }

    mapPadToSound(pad,audio){
        this.currentBank.mapSound(pad,audio);
    }

    getBank(index){
        return this.banks[index];
    }
}

