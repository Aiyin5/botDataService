
class SingletonPhone {
    constructor() {
        if (!SingletonPhone.instance) {
            SingletonPhone.instance = this;
            this.map = new Map();
        }
        return SingletonPhone.instance;
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

const phoneInstance = new SingletonPhone();

module.exports = phoneInstance;
