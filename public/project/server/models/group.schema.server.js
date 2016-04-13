module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var GroupSchema = mongoose.Schema({
        name: {
            type: String,
            description : "Name of the group"},
        balance: {
            type: String,
            default : 0,
            description : "User gets this much or owes this amount"
        },
        members : {
            type: [String],
            default : "Alice,Bob",
            description : "Members of the group"
        }
    }, {collection: 'group'});
    return GroupSchema;
};