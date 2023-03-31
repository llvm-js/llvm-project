class Type {
    constructor(...types) {
        this.types = types;
    }

    new(type) {
        this.types.push({ name: type });
    }

    delete(type) {
        return this.types = this.types.filter(typeInList => typeInList.name === type);
    }
}