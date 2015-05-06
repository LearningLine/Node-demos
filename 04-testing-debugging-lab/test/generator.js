var generator = require('../lib/generator');

describe('generator', function() {
    it('should generate publish packets correctly', function() {
        var buf = generator.generate({
            type: 'publish',
            topic: 'foo',
            message: 'bar!'
        });

        buf.toJSON().should.deep.equal([
            0x03, // type
            0x03, // topic length
            0x66, // f
            0x6f, // o
            0x6f, // o
            0x04, // message length
            0x62, // b
            0x61, // a
            0x72, // r
            0x21  // !
        ]);
    });
});
