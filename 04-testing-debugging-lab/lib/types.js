var types = [
    { id: 1, name: 'subscribe',   topic: true, message: false },
    { id: 2, name: 'unsubscribe', topic: true, message: false },
    { id: 3, name: 'publish',     topic: true, message: true  }
];

var typesById = {};

types.forEach(function(type) {
    typesById[type.id] = type;
});

exports.getTypeById = function(id) {
    return typesById[id];
};

var typesByName = {};

types.forEach(function(type) {
    typesByName[type.name] = type;
});

exports.getTypeByName = function(name) {
    return typesByName[name];
};
