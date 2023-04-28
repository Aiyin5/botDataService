
class Singleton {
    constructor() {
        if (!Singleton.instance) {
            Singleton.instance = this;
            this.map = new Map();
        }
        return Singleton.instance;
    }
    getMap() {
        return this.map;
    }
    addItem(key,value) {
        this.map.set(key,value);
    }
   deleteItem(key){
       this.map.delete(key)
   }
    cleanItem(){
        this.map.clear();
    }
}

const instance = new Singleton();

module.exports = instance;
