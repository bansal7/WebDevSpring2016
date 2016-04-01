module.exports = function(mongoose) {

    // use mongoose to declare a user schema
    var FieldSchema = mongoose.Schema({
        label: {type : String,
            description: "First Name"},
        type: {type : String,
            enum : [ 'TEXT', 'EMAIL', 'PASSWORD', 'OPTIONS', 'DATE', 'RADIOS', 'CHECKBOXES', 'TEXTAREA' ],
            description: "TEXT"},
        placeholder: {type : String,
            description: "Alice"},
        options: {type :
            [{label:String, value:String}],
            description: [{label:'Male', value:'MALE'}, {label:'Female', value:'FEMALE'}]},
    });
    return FieldSchema;
};