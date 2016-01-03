
var f={};
f.createClass=createClass;
f.inherit=inherit;
f.mixin=mixin;

function parent(prototype) { //父类的实例存放实例初始化和class初始化属性
    for (var i in prototype) {
        if (prototype.hasOwnProperty(i)) {
            this[i] = prototype[i];
        }
    }
};
function plain() {};
function createClass(prototype, __initIns, __initClass) {

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
    proto=new plain;
    child.prototype=proto;
    mixin(proto,seed);
    return child;
}

function mixin(des,src){
    for(var i in src){
        if(src.hasOwnProperty(i)){
            des[i]=src[i];
        }
    }
}

function extend(seed,initialize){
    return inherit(seed,this,initialize);
}

var View=createClass({
    a:1,
    getA:function(){
        return this.a;
    }
},function(x){
    this.b=x;
},function(_class){
    _class.alert=alert;
});
var View2=View.extend({c:3},function(x){
    this.d=x;
});
