module.exports = function(mongoose) {
    // use mongoose to declare a user schema
    var BillSchema = mongoose.Schema({
        userId: {
            type: String,
            description : "ID of user who created the bill." +
            " Can be used to retrieve the user instance given a bill," +
            " or retrieve all bills for a given user"},
        description: {
            type: String,
            default : "New Form",
            description : ""
        },
        type : {
            type:String,
            default : "Shared Bill",
            description : "Type of the Bill for User"
        },
        date: {
            type: String,
            default: "2016-01-01"
        },
        amount: {
            type: String,
            default: 0
        }
    }, {collection: 'bill'});
    return BillSchema;
};