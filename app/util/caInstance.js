
class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
            this.array = [];
        }
        return Singleton.instance;
    }

    getArray() {
        return this.array;
    }
    addItem(item) {
        this.array.push(item);
    }
    updateItem() {
        let copy=[];
        let now=Date.now();
        for(let each of this.array){
            if(now-each.time<600){
                copy.push(each);
            }
        }
        this.array=copy;
    }
    cleanItem(){
        this.array = [];
    }
}

const instance = new Singleton();

module.exports = instance;
