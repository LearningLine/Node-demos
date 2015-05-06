var types = require('./types');

exports.parse = function(buf) {
    var pos = 0;

    if (buf.length < 1) {
        return null;
    }

    var type = types.getTypeById(buf.readUInt8(pos++));

    if (!type) {
        throw new Error('unknown type');
    }

    var packet = {
        type: type.name,
    };

    if (type.topic) {
        if ((packet.topic = readString()) === null) {
            return null;
        }
    }

    if (type.message) {
        if ((packet.message = readString()) === null) {
            return null;
        }
    }

    packet.length = pos;

    return packet;

    function readString() {
        // make sure the buffer is big enough to read the next byte
        if (pos >= buf.length) { return null; }

        // now read it
        var length = buf.readUInt8(pos++);

        // make sure the buffer is big enough to read the string
        if (pos + length > buf.length) { return null; }

        // now read it
        var str = buf.toString('utf8', pos, pos + length);
        pos += length;

        return str;
    }
};
