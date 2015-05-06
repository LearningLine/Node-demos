var types = require('./types');

exports.generate = function(msg) {
    var type = types.getTypeByName(msg.type);

    if (!type) {
        throw new Error('unknown type');
    }

    var length = 1;
    var topic = null;
    var message = null;

    if (type.topic) {
        topic = new Buffer(msg.topic, 'utf8');
        length += 1 + topic.length;
    }

    if (type.message) {
        message = new Buffer(msg.message, 'utf8');
        length += 1 + message.length;
    }

    var buf = new Buffer(length);
    var pos = 0;

    buf.writeUInt8(type.id, pos++);

    if (topic) {
        buf.writeUInt8(topic.length, pos++);
        topic.copy(buf, pos);
        pos += topic.length;
    }

    if (message) {
        buf.writeUInt8(topic.length, pos++); // bug?
        message.copy(buf, pos);
        pos += message.length;
    }

    return buf;
};
