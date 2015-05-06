var mongoose = require('mongoose');

var personSchema = new mongoose.Schema({
    name: { type: String, index: true, unique: true, required: true, minlength: 3, maxlength: 100 },
    // name: {
    //     first: String,
    //     last: String
    // },
    age: Number,
    birthDate: Date,
    spouse: { type: mongoose.Schema.Types.ObjectId, ref: 'people' },
    children: [ { type: mongoose.Schema.Types.ObjectId, ref: 'people' } ],
    lastModified: Date
}, {
    autoIndex: true,
    collection: 'peeps'
});

personSchema.methods.foo = function() {
    console.log('foo');
};

personSchema.statics.foo = function() {
    console.log('static foo');
};

personSchema.index({
    age: -1,
    name: 1
});

personSchema.pre('validate', function(next) {
    if (this.name.charAt(0) !== this.name.charAt(0).toUpperCase()) {
        next(new Error('first letter must be upper case!'));
    } else {
        next();
    }
});

personSchema.pre('save', function(next) {
    this.lastModified = new Date();
    next();
});

// mongoose.model('Person', personSchema);

module.exports = function(connection) {
    connection.model('Person', personSchema);
};
