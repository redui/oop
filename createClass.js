;void(function(factory, root) {
    root._f = factory.call(this);
}(function() {
    var f = {};
    f.createClass = createClass;
    f.inherit = inherit;
    f.mixin = mixin;

    function plain() {}

    function createClass(prototype, initIns, initClass, farther) {
        plain.prototype = farther ? farther.prototype : undefined;
        var type = function() {
            if (!this instanceof type) {
                return new type(arguments);
            }
            if (initIns) {
                initIns.apply(this, arguments);
            }
            if (farther) {
                farther.apply(this, arguments);
            }
            this.initialize && this.initialize.apply(this, arguments);
        };

        if (initClass) {
            type.__initClass__ = initClass;
            initClass(type);
        }
        if (initIns) type.__initIns__ = initIns;



        type.extend = extend;

        var proto = farther ? new plain : {};
        mixin(proto, prototype);
        proto.constructor = type;
        type.prototype = proto;
        return type;
    }

    function inherit(type, seed, initIns, initClass) {
        initIns = initIns || plain;
        initClass = initClass || plain;
        var child = function() {
            if (!this instanceof child) {
                console.log(new child(arguments))
                return new child(arguments);
            }
            type.apply(this, arguments);
            initIns && initIns.apply(this, arguments);
        };
        initClass(child);
        plain.prototype = type.prototype;

        var proto = new plain;
        child.prototype = proto;
        proto.constructor = child;
        mixin(proto, seed);
        return child;
    }

    function mixin(des, src) {
        for (var i in src) {
            if (src.hasOwnProperty(i)) {
                des[i] = src[i];
            }
        }
    }

    function extend(seed, initIns, initClass) {
        return inherit(this, seed || {}, initIns, initClass);
    }
    return f;
}, this));

var Widget = _f.createClass({
    type: 'Widget',
    initialize: function(name) {
        console.log([name, 'widget initialized!'].join(' '));
    }
}, function(name) {
    this.name = name;
    this._name = name;
}, function(Widget) {
    Widget.type = 'Widget';
});

var Lover = Widget.extend({
    type: 'Lover',
    initialize: function(name) {
        console.log([name, 'lover initialized']);
    }
}, function(name) {
    this.name = name;
}, function(Lover) {
    Lover.type = 'Lover';
});


var M = _f.createClass({
        type: 'M',
        initialize: function(name) {
            this.self = name;
        }
    },
    function(name) {
        this.M = name
    },
    function(M) {
        M.self = 'M';
    },
    Widget)
var n=_f.inherit(M,{n:'n'},function(){
    alert(3);
},function(n){
    n.alert=alert;
})