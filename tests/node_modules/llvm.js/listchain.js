class ListChain {
    constructor(data) {
        this.chain = {};

        if (Array.isArray(data)) {
            for (const item_t of data) 
                if (typeof item_t === 'string') this.chain[item_t] = item_t;
        } else if (data instanceof Object) {
            this.chain = data;
        }
    }


    get(data_t) {
        if (typeof data_t == 'string') {
            if (this.chain) {
                if (Reflect.ownKeys(this.chain).includes(data_t)) return this.chain[data_t];
                else if (Object.values(this.chain).includes(data_t)) {
                    let keys = Reflect.ownKeys(this.chain);
                    let values = Object.values(this.chain);
                    return keys[values.indexOf(data_t)];
                }
            }
        }
    }


    set(data_t, value_t) {
        if (typeof data_t == 'string') {
            if (data_t) this.chain[data_t] = value_t ? value_t : data_t;
        }
    }


    equal(data_t, checkData_t) {
        if (typeof data_t == 'string') {
            if (this.chain) {
                let key, value;

                if (Reflect.ownKeys(this.chain).includes(data_t)) {
                    value = this.chain[data_t];
                    key = data_t;
                }

                else if (Object.values(this.chain).includes(data_t)) {
                    let keys = Reflect.ownKeys(this.chain);
                    let values = Object.values(this.chain);
                    key = keys[values.indexOf(data_t)];
                    value = data_t;
                }

                return [key, value].includes(checkData_t);
            }
        }
    }
}

module.exports = ListChain;