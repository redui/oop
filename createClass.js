var parent = function(prototype) { //父类的实例存放实例初始化和class初始化属性
    for (var i in prototype) {
        if (prototype.hasOwnProperty(i)) {
            this[i] = prototype[i];
        }
    }
};
var plain = function() {};
var createClass = function(prototype, __initIns, __initClass) {

    __initIns = __initIns || plain;
    __initClass = __initClass || plain;
    var parentProto = {
        __initIns__: __initIns,
        __initClass__: __initClass
    };
    parent.prototype = parentProto;
    var f = function() {
        this.__initIns__.apply(this, arguments);
        this.initialize && this.initialize.apply(this,arguments);
    };

    f.__initClass__ = __initClass;
    __initClass(f);
    f.__initIns__ = __initIns;
    f.extend=extend;

    var fProto = new parent(prototype);
    fProto.constructor = f;
    f.prototype = fProto;
    return f;
};

function inherit(seed,another,initialize){
    var child= function(){
        another.apply(this,arguments);
        initialize&&initialize.apply(this,arguments);
    };
    plain.prototype=another.prototype;

    var proto=new plain;
    plain.prototype=proto;
    child.prototype=new plain;
    for(var i in seed){
        if(seed.hasOwnProperty(i)){
            child[i]=seed[i];
        }
    }
    return child;
}

function extend(seed,initialize){
    return inherit(seed,this,initialize);
}
var View=createClass({
    a:1,
    getA:function(){
        return this.a;
    }
},function(){
    this.b=2;
},function(_class){
    _class.alert=alert;
});
var View2=View.extend({c:3},function(){
    this.d=4;
});
