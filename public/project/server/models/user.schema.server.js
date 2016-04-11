module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var ActorSchema = mongoose.Schema({
        username: {type : String,
            description: "alice"},
        password: {type : String,
            description: "p@ssw0rd"},
        firstName: {type : String,
            description: "Alice"},
        lastName: {type : String,
            description: "Wonderland"},
        email: {type : String,
            description: "alice@wonderland.com"},
        roles: [String],

    }, {collection: 'actor'});
    return ActorSchema;
};