var sinon = require('sinon');

var Calculator = require('../calculator');

// var chai = require('chai');
// var expect = chai.expect;
// chai.should();

describe('calculator', function() {
    var calc;
    var db;

    beforeEach(function() {
        db = {
            write: sinon.stub().callsArg(1)
        };

        calc = new Calculator(function(cb, ms) {
            // setTimeout(cb, ms);
            cb();
        }, db);
    });

    it('should add 2 numbers correctly', function() {
        var sum = calc.add(1, 2);

        // console.assert(sum === 4);
        // expect(sum).to.equal(3);
        sum.should.equal(3);
    });

    it('can factor primes', function(done) {
        // this.timeout(5000);

        calc.factorPrimes(function(err, prime) {
            if (err) { return done(err); }

            prime.should.equal(17);

            done();
        });
    });

    it('can wait for promises', function() {
        return calc.factorPrimesAsync().then(function(prime) {
            prime.should.equal(17);
        });
    });

    it('can write to a DB', function(done) {
        calc.useDB(function() {
            db.write.callCount.should.equal(1);
            db.write.firstCall.args[0].should.deep.equal({ data: 123 });

            done();
        });
    });
});
