class Friend {
    constructor(name, dateOfBirth, married, kids, address, phoneNumber) {
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.married = married;
        this.kids = kids;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }

    setKids(names) {
        names.forEach( name => this.kids.push(name));
    }
    
    setName(name){
        this.name = name;
    }

    getName() {
        return this.name;
    }

    getDateofBirth() {
        return this.dateOfBirth;
    }

    getMarried() {
        return this.married;
    }


    getKids() {
        return this.kids;
    }

    getAddress() {
        return this.address;
    }

    getPhoneNumber() {
        return this.phoneNumber;
    }
}

module.exports = Friend;