;
(function(ROOT) {
    var jQuery = function(selector) {

        // 在jQuery中直接返回new过的实例，这里的init是jQuery的真正构造函数
        return new jQuery.fn.init(selector)
    }

    jQuery.fn = jQuery.prototype = {
        constructor: jQuery,

        version: '1.0.0',

        init: function(selector) {
            // 在jquery中这里有一个复杂的判断，但是这里我做了简化
            var elem, selector;
             elem = document.querySelector(selector);
            this[0] = elem;

            // 在jquery中返回一个由所有原型属性方法组成的数组，我们这里简化，直接返回this即可
            // return jQuery.makeArray(selector, this);
            return this;
        },

        // 在原型上添加一堆方法
        toArray: function() {},
        get: function() {},
        each: function() {},
        ready: function() {},
        first: function() {},
        slice: function() {}
        // ... ...
    }

    jQuery.fn.init.prototype = jQuery.fn;

    // 实现jQuery的两种扩展方式
    jQuery.extend = jQuery.fn.extend = function(options) {

        // 在jquery源码中会根据参数不同进行很多判断，我们这里就直接走一种方式，所以就不用判断了
        var target = this;
        var copy;

        for(name in options) {
            copy = options[name];
            target[name] = copy;
        }
        return target;
    }

    // jQuery中利用上面实现的扩展机制，添加了许多方法，其中

    // 直接添加在构造函数上，被称为工具方法
    jQuery.extend({
        isFunction: function() {},
        type: function() {},
        parseHTML: function() {},
        parseJSON: function() {},
        ajax: function() {}
        // ...
    })

    // 添加到原型上
    jQuery.fn.extend({
        queue: function() {},
        promise: function() {},
        attr: function() {},
        prop: function() {},
        addClass: function() {},
        removeClass: function() {},
        val: function() {},
        css: function() {}
        // ...
    })

    // $符号的由来，实际上它就是jQuery，一个简化的写法，在这里我们还可以替换成其他可用字符
    ROOT.jQuery = ROOT.$ = jQuery;

})(window);
