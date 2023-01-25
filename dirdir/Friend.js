class Friend {
    constructor(id, name, dateOfBirth, married, kids, address, phoneNumber) {
        this.id = id;
        this.name = name;
        this.dateOfBirth = dateOfBirth;
        this.married = married;
        this.kids = kids;
        this.address = address;
        this.phoneNumber = phoneNumber;
    }
}

Friend.prototype = {
    setKids: function(names) {
        names.forEach( name => this.kids.push(name));
    },
    
    setName: function(name){
        this.name = name;
    },

    getID: function() {
        return this.id;
    },

    getName: function() {
        return this.name;
    },

    getDateofBirth: function() {
        return this.dateOfBirth;
    },

    getMarried: function() {
        return this.married;
    },

    getKids: function() {
        return this.kids;
    },

    getAddress: function() {
        return this.address;
    },

    getPhoneNumber: function() {
        return this.phoneNumber;
    }
}

module.exports = Friend;