var mongoose = require('mongoose');

// mongoose.connect('localhost/test');
//
// mongoose.connection.on('connected', function() {
//     console.log('connected');
//
//     mongoose.disconnect();
// });

var args = process.argv.slice(2);

var connection = mongoose.createConnection('localhost/test');

require('./person')(connection);

connection.on('connected', function() {
    console.log('connected');

    // connection.db to get the native Node.js driver to MongoDB

    if (args[0] === 'add') {
        // connection.models.Person.create({
        //     name: args[1]
        // }, function(err) {
        //     if (err) {
        //         console.log(err);
        //     }
        //
        //     connection.close();
        // });

        var newPerson = new connection.models.Person({
            name: args[1]
        });

        newPerson.foo();
        connection.models.Person.foo();

        newPerson.save(function(err) {
            if (err) {
                console.log(err);
            }

            connection.close();
        });
    } else {
        connection.models.Person.find({
            // select * from peeps where age >= 18
            // age: { $gte: 18 }
        }, function(err, people) {
            if (err) {
                console.log(err);
            } else {
                console.log(people);
            }

            connection.close();
        });
    }
});
