var jsGlobal = (function () {
    return this || (1, eval)('this//# sourceURL=jsGlobal-getter');
})();
var inBrowser = typeof window !== 'undefined' && 'document' in window && 'plugins' in window.document;
var inFirefox = typeof navigator !== 'undefined' && navigator.userAgent.indexOf('Firefox') >= 0;
var release = true;
var profile = false;
function dumpLine(line) {
    if (!release && typeof dump !== "undefined") {
        dump(line + "\n");
    }
}
if (!jsGlobal.performance) {
    jsGlobal.performance = {};
}
if (!jsGlobal.performance.now) {
    jsGlobal.performance.now = typeof dateNow !== 'undefined' ? dateNow : Date.now;
}
function lazyInitializer(obj, propertyName, fn) {
    Object.defineProperty(obj, propertyName, {
        get: function () {
            var value = fn();
            Object.defineProperty(obj, propertyName, {
                value: value,
                configurable: true,
                enumerable: true
            });
            return value;
        },
        configurable: true,
        enumerable: true
    });
}
var START_TIME = performance.now();
var Shumway;
(function (Shumway) {
    (function (CharacterCodes) {
        CharacterCodes[CharacterCodes["_0"] = 48] = "_0";
        CharacterCodes[CharacterCodes["_1"] = 49] = "_1";
        CharacterCodes[CharacterCodes["_2"] = 50] = "_2";
        CharacterCodes[CharacterCodes["_3"] = 51] = "_3";
        CharacterCodes[CharacterCodes["_4"] = 52] = "_4";
        CharacterCodes[CharacterCodes["_5"] = 53] = "_5";
        CharacterCodes[CharacterCodes["_6"] = 54] = "_6";
        CharacterCodes[CharacterCodes["_7"] = 55] = "_7";
        CharacterCodes[CharacterCodes["_8"] = 56] = "_8";
        CharacterCodes[CharacterCodes["_9"] = 57] = "_9";
    })(Shumway.CharacterCodes || (Shumway.CharacterCodes = {}));
    var CharacterCodes = Shumway.CharacterCodes;
    Shumway.UINT32_CHAR_BUFFER_LENGTH = 10;
    Shumway.UINT32_MAX = 0xFFFFFFFF;
    Shumway.UINT32_MAX_DIV_10 = 0x19999999;
    Shumway.UINT32_MAX_MOD_10 = 0x5;
    function isString(value) {
        return typeof value === "string";
    }
    Shumway.isString = isString;
    function isFunction(value) {
        return typeof value === "function";
    }
    Shumway.isFunction = isFunction;
    function isNumber(value) {
        return typeof value === "number";
    }
    Shumway.isNumber = isNumber;
    function isInteger(value) {
        return (value | 0) === value;
    }
    Shumway.isInteger = isInteger;
    function isArray(value) {
        return value instanceof Array;
    }
    Shumway.isArray = isArray;
    function isNumberOrString(value) {
        return typeof value === "number" || typeof value === "string";
    }
    Shumway.isNumberOrString = isNumberOrString;
    function isObject(value) {
        return typeof value === "object" || typeof value === 'function';
    }
    Shumway.isObject = isObject;
    function toNumber(x) {
        return +x;
    }
    Shumway.toNumber = toNumber;
    function isNumericString(value) {
        return String(Number(value)) === value;
    }
    Shumway.isNumericString = isNumericString;
    function isNumeric(value) {
        if (typeof value === "number") {
            return true;
        }
        if (typeof value === "string") {
            var c = value.charCodeAt(0);
            if ((65 <= c && c <= 90) || (97 <= c && c <= 122) || (c === 36) || (c === 95)) {
                return false;
            }
            return isIndex(value) || isNumericString(value);
        }
        return false;
    }
    Shumway.isNumeric = isNumeric;
    function isIndex(value) {
        var index = 0;
        if (typeof value === "number") {
            index = (value | 0);
            if (value === index && index >= 0) {
                return true;
            }
            return value >>> 0 === value;
        }
        if (typeof value !== "string") {
            return false;
        }
        var length = value.length;
        if (length === 0) {
            return false;
        }
        if (value === "0") {
            return true;
        }
        if (length > Shumway.UINT32_CHAR_BUFFER_LENGTH) {
            return false;
        }
        var i = 0;
        index = value.charCodeAt(i++) - 48 /* _0 */;
        if (index < 1 || index > 9) {
            return false;
        }
        var oldIndex = 0;
        var c = 0;
        while (i < length) {
            c = value.charCodeAt(i++) - 48 /* _0 */;
            if (c < 0 || c > 9) {
                return false;
            }
            oldIndex = index;
            index = 10 * index + c;
        }
        if ((oldIndex < Shumway.UINT32_MAX_DIV_10) || (oldIndex === Shumway.UINT32_MAX_DIV_10 && c <= Shumway.UINT32_MAX_MOD_10)) {
            return true;
        }
        return false;
    }
    Shumway.isIndex = isIndex;
    function isNullOrUndefined(value) {
        return value == undefined;
    }
    Shumway.isNullOrUndefined = isNullOrUndefined;
    var Debug;
    (function (Debug) {
        function error(message) {
            console.error(message);
            throw new Error(message);
        }
        Debug.error = error;
        function assert(condition, message) {
            if (message === void 0) { message = "assertion failed"; }
            if (condition === "") {
                condition = true;
            }
            if (!condition) {
                if (typeof console !== 'undefined' && 'assert' in console) {
                    console.assert(false, message);
                    throw new Error(message);
                }
                else {
                    Debug.error(message.toString());
                }
            }
        }
        Debug.assert = assert;
        function assertUnreachable(msg) {
            var location = new Error().stack.split('\n')[1];
            throw new Error("Reached unreachable location " + location + msg);
        }
        Debug.assertUnreachable = assertUnreachable;
        function assertNotImplemented(condition, message) {
            if (!condition) {
                Debug.error("notImplemented: " + message);
            }
        }
        Debug.assertNotImplemented = assertNotImplemented;
        function warning(message, arg1, arg2) {
            release || console.warn.apply(console, arguments);
        }
        Debug.warning = warning;
        function notUsed(message) {
            release || Debug.assert(false, "Not Used " + message);
        }
        Debug.notUsed = notUsed;
        function notImplemented(message) {
            release || Debug.assert(false, "Not Implemented " + message);
        }
        Debug.notImplemented = notImplemented;
        function dummyConstructor(message) {
            release || Debug.assert(false, "Dummy Constructor: " + message);
        }
        Debug.dummyConstructor = dummyConstructor;
        function abstractMethod(message) {
            release || Debug.assert(false, "Abstract Method " + message);
        }
        Debug.abstractMethod = abstractMethod;
        var somewhatImplementedCache = {};
        function somewhatImplemented(message) {
            if (somewhatImplementedCache[message]) {
                return;
            }
            somewhatImplementedCache[message] = true;
            Debug.warning("somewhatImplemented: " + message);
        }
        Debug.somewhatImplemented = somewhatImplemented;
        function unexpected(message) {
            Debug.assert(false, "Unexpected: " + message);
        }
        Debug.unexpected = unexpected;
        function unexpectedCase(message) {
            Debug.assert(false, "Unexpected Case: " + message);
        }
        Debug.unexpectedCase = unexpectedCase;
    })(Debug = Shumway.Debug || (Shumway.Debug = {}));
    function getTicks() {
        return performance.now();
    }
    Shumway.getTicks = getTicks;
    var ArrayUtilities;
    (function (ArrayUtilities) {
        var assert = Shumway.Debug.assert;
        function popManyInto(src, count, dst) {
            release || assert(src.length >= count);
            for (var i = count - 1; i >= 0; i--) {
                dst[i] = src.pop();
            }
            dst.length = count;
        }
        ArrayUtilities.popManyInto = popManyInto;
        function popMany(array, count) {
            release || assert(array.length >= count);
            var start = array.length - count;
            var result = array.slice(start, this.length);
            array.length = start;
            return result;
        }
        ArrayUtilities.popMany = popMany;
        function popManyIntoVoid(array, count) {
            release || assert(array.length >= count);
            array.length = array.length - count;
        }
        ArrayUtilities.popManyIntoVoid = popManyIntoVoid;
        function pushMany(dst, src) {
            for (var i = 0; i < src.length; i++) {
                dst.push(src[i]);
            }
        }
        ArrayUtilities.pushMany = pushMany;
        function top(array) {
            return array.length && array[array.length - 1];
        }
        ArrayUtilities.top = top;
        function last(array) {
            return array.length && array[array.length - 1];
        }
        ArrayUtilities.last = last;
        function peek(array) {
            release || assert(array.length > 0);
            return array[array.length - 1];
        }
        ArrayUtilities.peek = peek;
        function indexOf(array, value) {
            for (var i = 0, j = array.length; i < j; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            return -1;
        }
        ArrayUtilities.indexOf = indexOf;
        function equals(a, b) {
            if (a.length !== b.length) {
                return false;
            }
            for (var i = 0; i < a.length; i++) {
                if (a[i] !== b[i]) {
                    return false;
                }
            }
            return true;
        }
        ArrayUtilities.equals = equals;
        function pushUnique(array, value) {
            for (var i = 0, j = array.length; i < j; i++) {
                if (array[i] === value) {
                    return i;
                }
            }
            array.push(value);
            return array.length - 1;
        }
        ArrayUtilities.pushUnique = pushUnique;
        function unique(array) {
            var result = [];
            for (var i = 0; i < array.length; i++) {
                pushUnique(result, array[i]);
            }
            return result;
        }
        ArrayUtilities.unique = unique;
        function copyFrom(dst, src) {
            dst.length = 0;
            ArrayUtilities.pushMany(dst, src);
        }
        ArrayUtilities.copyFrom = copyFrom;
        function ensureTypedArrayCapacity(array, capacity) {
            if (array.length < capacity) {
                var oldArray = array;
                array = new array.constructor(Shumway.IntegerUtilities.nearestPowerOfTwo(capacity));
                array.set(oldArray, 0);
            }
            return array;
        }
        ArrayUtilities.ensureTypedArrayCapacity = ensureTypedArrayCapacity;
        var ArrayWriter = (function () {
            function ArrayWriter(initialCapacity) {
                if (initialCapacity === void 0) { initialCapacity = 16; }
                this._u8 = null;
                this._u16 = null;
                this._i32 = null;
                this._f32 = null;
                this._offset = 0;
                this.ensureCapacity(initialCapacity);
            }
            ArrayWriter.prototype.reset = function () {
                this._offset = 0;
            };
            Object.defineProperty(ArrayWriter.prototype, "offset", {
                get: function () {
                    return this._offset;
                },
                enumerable: true,
                configurable: true
            });
            ArrayWriter.prototype.getIndex = function (size) {
                release || assert(size === 1 || size === 2 || size === 4 || size === 8 || size === 16);
                var index = this._offset / size;
                release || assert((index | 0) === index);
                return index;
            };
            ArrayWriter.prototype.ensureAdditionalCapacity = function (size) {
                this.ensureCapacity(this._offset + size);
            };
            ArrayWriter.prototype.ensureCapacity = function (minCapacity) {
                if (!this._u8) {
                    this._u8 = new Uint8Array(minCapacity);
                }
                else if (this._u8.length > minCapacity) {
                    return;
                }
                var oldCapacity = this._u8.length;
                var newCapacity = oldCapacity * 2;
                if (newCapacity < minCapacity) {
                    newCapacity = minCapacity;
                }
                var u8 = new Uint8Array(newCapacity);
                u8.set(this._u8, 0);
                this._u8 = u8;
                this._u16 = new Uint16Array(u8.buffer);
                this._i32 = new Int32Array(u8.buffer);
                this._f32 = new Float32Array(u8.buffer);
            };
            ArrayWriter.prototype.writeInt = function (v) {
                release || assert((this._offset & 0x3) === 0);
                this.ensureCapacity(this._offset + 4);
                this.writeIntUnsafe(v);
            };
            ArrayWriter.prototype.writeIntAt = function (v, offset) {
                release || assert(offset >= 0 && offset <= this._offset);
                release || assert((offset & 0x3) === 0);
                this.ensureCapacity(offset + 4);
                var index = offset >> 2;
                this._i32[index] = v;
            };
            ArrayWriter.prototype.writeIntUnsafe = function (v) {
                var index = this._offset >> 2;
                this._i32[index] = v;
                this._offset += 4;
            };
            ArrayWriter.prototype.writeFloat = function (v) {
                release || assert((this._offset & 0x3) === 0);
                this.ensureCapacity(this._offset + 4);
                this.writeFloatUnsafe(v);
            };
            ArrayWriter.prototype.writeFloatUnsafe = function (v) {
                var index = this._offset >> 2;
                this._f32[index] = v;
                this._offset += 4;
            };
            ArrayWriter.prototype.write4Floats = function (a, b, c, d) {
                release || assert((this._offset & 0x3) === 0);
                this.ensureCapacity(this._offset + 16);
                this.write4FloatsUnsafe(a, b, c, d);
            };
            ArrayWriter.prototype.write4FloatsUnsafe = function (a, b, c, d) {
                var index = this._offset >> 2;
                this._f32[index + 0] = a;
                this._f32[index + 1] = b;
                this._f32[index + 2] = c;
                this._f32[index + 3] = d;
                this._offset += 16;
            };
            ArrayWriter.prototype.write6Floats = function (a, b, c, d, e, f) {
                release || assert((this._offset & 0x3) === 0);
                this.ensureCapacity(this._offset + 24);
                this.write6FloatsUnsafe(a, b, c, d, e, f);
            };
            ArrayWriter.prototype.write6FloatsUnsafe = function (a, b, c, d, e, f) {
                var index = this._offset >> 2;
                this._f32[index + 0] = a;
                this._f32[index + 1] = b;
                this._f32[index + 2] = c;
                this._f32[index + 3] = d;
                this._f32[index + 4] = e;
                this._f32[index + 5] = f;
                this._offset += 24;
            };
            ArrayWriter.prototype.subF32View = function () {
                return this._f32.subarray(0, this._offset >> 2);
            };
            ArrayWriter.prototype.subI32View = function () {
                return this._i32.subarray(0, this._offset >> 2);
            };
            ArrayWriter.prototype.subU16View = function () {
                return this._u16.subarray(0, this._offset >> 1);
            };
            ArrayWriter.prototype.subU8View = function () {
                return this._u8.subarray(0, this._offset);
            };
            ArrayWriter.prototype.hashWords = function (hash, offset, length) {
                var i32 = this._i32;
                for (var i = 0; i < length; i++) {
                    hash = (((31 * hash) | 0) + i32[i]) | 0;
                }
                return hash;
            };
            ArrayWriter.prototype.reserve = function (size) {
                size = (size + 3) & ~0x3;
                this.ensureCapacity(this._offset + size);
                this._offset += size;
            };
            return ArrayWriter;
        })();
        ArrayUtilities.ArrayWriter = ArrayWriter;
    })(ArrayUtilities = Shumway.ArrayUtilities || (Shumway.ArrayUtilities = {}));
    var ArrayReader = (function () {
        function ArrayReader(buffer) {
            this._u8 = new Uint8Array(buffer);
            this._u16 = new Uint16Array(buffer);
            this._i32 = new Int32Array(buffer);
            this._f32 = new Float32Array(buffer);
            this._offset = 0;
        }
        Object.defineProperty(ArrayReader.prototype, "offset", {
            get: function () {
                return this._offset;
            },
            enumerable: true,
            configurable: true
        });
        ArrayReader.prototype.isEmpty = function () {
            return this._offset === this._u8.length;
        };
        ArrayReader.prototype.readInt = function () {
            release || Debug.assert((this._offset & 0x3) === 0);
            release || Debug.assert(this._offset <= this._u8.length - 4);
            var v = this._i32[this._offset >> 2];
            this._offset += 4;
            return v;
        };
        ArrayReader.prototype.readFloat = function () {
            release || Debug.assert((this._offset & 0x3) === 0);
            release || Debug.assert(this._offset <= this._u8.length - 4);
            var v = this._f32[this._offset >> 2];
            this._offset += 4;
            return v;
        };
        return ArrayReader;
    })();
    Shumway.ArrayReader = ArrayReader;
    var ObjectUtilities;
    (function (ObjectUtilities) {
        function boxValue(value) {
            if (isNullOrUndefined(value) || isObject(value)) {
                return value;
            }
            return Object(value);
        }
        ObjectUtilities.boxValue = boxValue;
        function toKeyValueArray(object) {
            var hasOwnProperty = Object.prototype.hasOwnProperty;
            var array = [];
            for (var k in object) {
                if (hasOwnProperty.call(object, k)) {
                    array.push([k, object[k]]);
                }
            }
            return array;
        }
        ObjectUtilities.toKeyValueArray = toKeyValueArray;
        function isPrototypeWriteable(object) {
            return Object.getOwnPropertyDescriptor(object, "prototype").writable;
        }
        ObjectUtilities.isPrototypeWriteable = isPrototypeWriteable;
        function hasOwnProperty(object, name) {
            return Object.prototype.hasOwnProperty.call(object, name);
        }
        ObjectUtilities.hasOwnProperty = hasOwnProperty;
        function propertyIsEnumerable(object, name) {
            return Object.prototype.propertyIsEnumerable.call(object, name);
        }
        ObjectUtilities.propertyIsEnumerable = propertyIsEnumerable;
        function getOwnPropertyDescriptor(object, name) {
            return Object.getOwnPropertyDescriptor(object, name);
        }
        ObjectUtilities.getOwnPropertyDescriptor = getOwnPropertyDescriptor;
        function hasOwnGetter(object, name) {
            var d = Object.getOwnPropertyDescriptor(object, name);
            return !!(d && d.get);
        }
        ObjectUtilities.hasOwnGetter = hasOwnGetter;
        function getOwnGetter(object, name) {
            var d = Object.getOwnPropertyDescriptor(object, name);
            return d ? d.get : null;
        }
        ObjectUtilities.getOwnGetter = getOwnGetter;
        function hasOwnSetter(object, name) {
            var d = Object.getOwnPropertyDescriptor(object, name);
            return !!(d && !!d.set);
        }
        ObjectUtilities.hasOwnSetter = hasOwnSetter;
        function createMap() {
            return Object.create(null);
        }
        ObjectUtilities.createMap = createMap;
        function createArrayMap() {
            return [];
        }
        ObjectUtilities.createArrayMap = createArrayMap;
        function defineReadOnlyProperty(object, name, value) {
            Object.defineProperty(object, name, {
                value: value,
                writable: false,
                configurable: true,
                enumerable: false
            });
        }
        ObjectUtilities.defineReadOnlyProperty = defineReadOnlyProperty;
        function getOwnPropertyDescriptors(object) {
            var o = ObjectUtilities.createMap();
            var properties = Object.getOwnPropertyNames(object);
            for (var i = 0; i < properties.length; i++) {
                o[properties[i]] = Object.getOwnPropertyDescriptor(object, properties[i]);
            }
            return o;
        }
        ObjectUtilities.getOwnPropertyDescriptors = getOwnPropertyDescriptors;
        function cloneObject(object) {
            var clone = Object.create(Object.getPrototypeOf(object));
            copyOwnProperties(clone, object);
            return clone;
        }
        ObjectUtilities.cloneObject = cloneObject;
        function copyProperties(object, template) {
            for (var property in template) {
                object[property] = template[property];
            }
        }
        ObjectUtilities.copyProperties = copyProperties;
        function copyOwnProperties(object, template) {
            for (var property in template) {
                if (hasOwnProperty(template, property)) {
                    object[property] = template[property];
                }
            }
        }
        ObjectUtilities.copyOwnProperties = copyOwnProperties;
        function copyOwnPropertyDescriptors(object, template, overwrite) {
            if (overwrite === void 0) { overwrite = true; }
            for (var property in template) {
                if (hasOwnProperty(template, property)) {
                    var descriptor = Object.getOwnPropertyDescriptor(template, property);
                    if (!overwrite && hasOwnProperty(object, property)) {
                        continue;
                    }
                    release || Debug.assert(descriptor);
                    try {
                        Object.defineProperty(object, property, descriptor);
                    }
                    catch (e) {
                    }
                }
            }
        }
        ObjectUtilities.copyOwnPropertyDescriptors = copyOwnPropertyDescriptors;
        function getLatestGetterOrSetterPropertyDescriptor(object, name) {
            var descriptor = {};
            while (object) {
                var tmp = Object.getOwnPropertyDescriptor(object, name);
                if (tmp) {
                    descriptor.get = descriptor.get || tmp.get;
                    descriptor.set = descriptor.set || tmp.set;
                }
                if (descriptor.get && descriptor.set) {
                    break;
                }
                object = Object.getPrototypeOf(object);
            }
            return descriptor;
        }
        ObjectUtilities.getLatestGetterOrSetterPropertyDescriptor = getLatestGetterOrSetterPropertyDescriptor;
        function defineNonEnumerableGetterOrSetter(obj, name, value, isGetter) {
            var descriptor = ObjectUtilities.getLatestGetterOrSetterPropertyDescriptor(obj, name);
            descriptor.configurable = true;
            descriptor.enumerable = false;
            if (isGetter) {
                descriptor.get = value;
            }
            else {
                descriptor.set = value;
            }
            Object.defineProperty(obj, name, descriptor);
        }
        ObjectUtilities.defineNonEnumerableGetterOrSetter = defineNonEnumerableGetterOrSetter;
        function defineNonEnumerableGetter(obj, name, getter) {
            Object.defineProperty(obj, name, { get: getter, configurable: true, enumerable: false });
        }
        ObjectUtilities.defineNonEnumerableGetter = defineNonEnumerableGetter;
        function defineNonEnumerableSetter(obj, name, setter) {
            Object.defineProperty(obj, name, { set: setter, configurable: true, enumerable: false });
        }
        ObjectUtilities.defineNonEnumerableSetter = defineNonEnumerableSetter;
        function defineNonEnumerableProperty(obj, name, value) {
            Object.defineProperty(obj, name, { value: value, writable: true, configurable: true, enumerable: false });
        }
        ObjectUtilities.defineNonEnumerableProperty = defineNonEnumerableProperty;
        function defineNonEnumerableForwardingProperty(obj, name, otherName) {
            Object.defineProperty(obj, name, {
                get: FunctionUtilities.makeForwardingGetter(otherName),
                set: FunctionUtilities.makeForwardingSetter(otherName),
                writable: true,
                configurable: true,
                enumerable: false
            });
        }
        ObjectUtilities.defineNonEnumerableForwardingProperty = defineNonEnumerableForwardingProperty;
        function defineNewNonEnumerableProperty(obj, name, value) {
            release || Debug.assert(!Object.prototype.hasOwnProperty.call(obj, name), "Property: " + name + " already exits.");
            ObjectUtilities.defineNonEnumerableProperty(obj, name, value);
        }
        ObjectUtilities.defineNewNonEnumerableProperty = defineNewNonEnumerableProperty;
        function createPublicAliases(obj, names) {
            var prop = {
                value: null,
                writable: true,
                configurable: true,
                enumerable: false
            };
            for (var i = 0; i < names.length; i++) {
                var name = names[i];
                prop.value = obj[name];
                Object.defineProperty(obj, '$Bg' + name, prop);
            }
        }
        ObjectUtilities.createPublicAliases = createPublicAliases;
    })(ObjectUtilities = Shumway.ObjectUtilities || (Shumway.ObjectUtilities = {}));
    var FunctionUtilities;
    (function (FunctionUtilities) {
        function makeForwardingGetter(target) {
            return new Function("return this[\"" + target + "\"]//# sourceURL=fwd-get-" + target + ".as");
        }
        FunctionUtilities.makeForwardingGetter = makeForwardingGetter;
        function makeForwardingSetter(target) {
            return new Function("value", "this[\"" + target + "\"] = value;" + "//# sourceURL=fwd-set-" + target + ".as");
        }
        FunctionUtilities.makeForwardingSetter = makeForwardingSetter;
        function bindSafely(method, receiver) {
            release || Debug.assert(!method.boundTo);
            release || Debug.assert(receiver);
            function methodClosure() {
                return method.apply(receiver, arguments);
            }
            methodClosure.boundTo = receiver;
            return methodClosure;
        }
        FunctionUtilities.bindSafely = bindSafely;
    })(FunctionUtilities = Shumway.FunctionUtilities || (Shumway.FunctionUtilities = {}));
    var StringUtilities;
    (function (StringUtilities) {
        var assert = Shumway.Debug.assert;
        function repeatString(c, n) {
            var s = "";
            for (var i = 0; i < n; i++) {
                s += c;
            }
            return s;
        }
        StringUtilities.repeatString = repeatString;
        function memorySizeToString(value) {
            value |= 0;
            var K = 1024;
            var M = K * K;
            if (value < K) {
                return value + " B";
            }
            else if (value < M) {
                return (value / K).toFixed(2) + "KB";
            }
            else {
                return (value / M).toFixed(2) + "MB";
            }
        }
        StringUtilities.memorySizeToString = memorySizeToString;
        function toSafeString(value) {
            if (typeof value === "string") {
                return "\"" + value + "\"";
            }
            if (typeof value === "number" || typeof value === "boolean") {
                return String(value);
            }
            if (value instanceof Array) {
                return "[] " + value.length;
            }
            return typeof value;
        }
        StringUtilities.toSafeString = toSafeString;
        function toSafeArrayString(array) {
            var str = [];
            for (var i = 0; i < array.length; i++) {
                str.push(toSafeString(array[i]));
            }
            return str.join(", ");
        }
        StringUtilities.toSafeArrayString = toSafeArrayString;
        function utf8decode(str) {
            var bytes = new Uint8Array(str.length * 4);
            var b = 0;
            for (var i = 0, j = str.length; i < j; i++) {
                var code = str.charCodeAt(i);
                if (code <= 0x7f) {
                    bytes[b++] = code;
                    continue;
                }
                if (0xD800 <= code && code <= 0xDBFF) {
                    var codeLow = str.charCodeAt(i + 1);
                    if (0xDC00 <= codeLow && codeLow <= 0xDFFF) {
                        code = ((code & 0x3FF) << 10) + (codeLow & 0x3FF) + 0x10000;
                        ++i;
                    }
                }
                if ((code & 0xFFE00000) !== 0) {
                    bytes[b++] = 0xF8 | ((code >>> 24) & 0x03);
                    bytes[b++] = 0x80 | ((code >>> 18) & 0x3F);
                    bytes[b++] = 0x80 | ((code >>> 12) & 0x3F);
                    bytes[b++] = 0x80 | ((code >>> 6) & 0x3F);
                    bytes[b++] = 0x80 | (code & 0x3F);
                }
                else if ((code & 0xFFFF0000) !== 0) {
                    bytes[b++] = 0xF0 | ((code >>> 18) & 0x07);
                    bytes[b++] = 0x80 | ((code >>> 12) & 0x3F);
                    bytes[b++] = 0x80 | ((code >>> 6) & 0x3F);
                    bytes[b++] = 0x80 | (code & 0x3F);
                }
                else if ((code & 0xFFFFF800) !== 0) {
                    bytes[b++] = 0xE0 | ((code >>> 12) & 0x0F);
                    bytes[b++] = 0x80 | ((code >>> 6) & 0x3F);
                    bytes[b++] = 0x80 | (code & 0x3F);
                }
                else {
                    bytes[b++] = 0xC0 | ((code >>> 6) & 0x1F);
                    bytes[b++] = 0x80 | (code & 0x3F);
                }
            }
            return bytes.subarray(0, b);
        }
        StringUtilities.utf8decode = utf8decode;
        function utf8encode(bytes) {
            var j = 0, str = "";
            while (j < bytes.length) {
                var b1 = bytes[j++] & 0xFF;
                if (b1 <= 0x7F) {
                    str += String.fromCharCode(b1);
                }
                else {
                    var currentPrefix = 0xC0;
                    var validBits = 5;
                    do {
                        var mask = (currentPrefix >> 1) | 0x80;
                        if ((b1 & mask) === currentPrefix)
                            break;
                        currentPrefix = (currentPrefix >> 1) | 0x80;
                        --validBits;
                    } while (validBits >= 0);
                    if (validBits <= 0) {
                        str += String.fromCharCode(b1);
                        continue;
                    }
                    var code = (b1 & ((1 << validBits) - 1));
                    var invalid = false;
                    for (var i = 5; i >= validBits; --i) {
                        var bi = bytes[j++];
                        if ((bi & 0xC0) != 0x80) {
                            invalid = true;
                            break;
                        }
                        code = (code << 6) | (bi & 0x3F);
                    }
                    if (invalid) {
                        for (var k = j - (7 - i); k < j; ++k) {
                            str += String.fromCharCode(bytes[k] & 255);
                        }
                        continue;
                    }
                    if (code >= 0x10000) {
                        str += String.fromCharCode((((code - 0x10000) >> 10) & 0x3FF) | 0xD800, (code & 0x3FF) | 0xDC00);
                    }
                    else {
                        str += String.fromCharCode(code);
                    }
                }
            }
            return str;
        }
        StringUtilities.utf8encode = utf8encode;
        function base64ArrayBuffer(arrayBuffer) {
            var base64 = '';
            var encodings = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
            var bytes = new Uint8Array(arrayBuffer);
            var byteLength = bytes.byteLength;
            var byteRemainder = byteLength % 3;
            var mainLength = byteLength - byteRemainder;
            var a, b, c, d;
            var chunk;
            for (var i = 0; i < mainLength; i = i + 3) {
                chunk = (bytes[i] << 16) | (bytes[i + 1] << 8) | bytes[i + 2];
                a = (chunk & 16515072) >> 18;
                b = (chunk & 258048) >> 12;
                c = (chunk & 4032) >> 6;
                d = chunk & 63;
                base64 += encodings[a] + encodings[b] + encodings[c] + encodings[d];
            }
            if (byteRemainder == 1) {
                chunk = bytes[mainLength];
                a = (chunk & 252) >> 2;
                b = (chunk & 3) << 4;
                base64 += encodings[a] + encodings[b] + '==';
            }
            else if (byteRemainder == 2) {
                chunk = (bytes[mainLength] << 8) | bytes[mainLength + 1];
                a = (chunk & 64512) >> 10;
                b = (chunk & 1008) >> 4;
                c = (chunk & 15) << 2;
                base64 += encodings[a] + encodings[b] + encodings[c] + '=';
            }
            return base64;
        }
        StringUtilities.base64ArrayBuffer = base64ArrayBuffer;
        function escapeString(str) {
            if (str !== undefined) {
                str = str.replace(/[^\w$]/gi, "$");
                if (/^\d/.test(str)) {
                    str = '$' + str;
                }
            }
            return str;
        }
        StringUtilities.escapeString = escapeString;
        function fromCharCodeArray(buffer) {
            var str = "", SLICE = 1024 * 16;
            for (var i = 0; i < buffer.length; i += SLICE) {
                var chunk = Math.min(buffer.length - i, SLICE);
                str += String.fromCharCode.apply(null, buffer.subarray(i, i + chunk));
            }
            return str;
        }
        StringUtilities.fromCharCodeArray = fromCharCodeArray;
        var _encoding = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$_';
        function variableLengthEncodeInt32(n) {
            var e = _encoding;
            var bitCount = (32 - Math.clz32(n));
            release || assert(bitCount <= 32, bitCount);
            var l = Math.ceil(bitCount / 6);
            var s = e[l];
            for (var i = l - 1; i >= 0; i--) {
                var offset = (i * 6);
                s += e[(n >> offset) & 0x3F];
            }
            release || assert(StringUtilities.variableLengthDecodeInt32(s) === n, n + " : " + s + " - " + l + " bits: " + bitCount);
            return s;
        }
        StringUtilities.variableLengthEncodeInt32 = variableLengthEncodeInt32;
        function toEncoding(n) {
            return _encoding[n];
        }
        StringUtilities.toEncoding = toEncoding;
        function fromEncoding(s) {
            var c = s.charCodeAt(0);
            var e = 0;
            if (c >= 65 && c <= 90) {
                return c - 65;
            }
            else if (c >= 97 && c <= 122) {
                return c - 71;
            }
            else if (c >= 48 && c <= 57) {
                return c + 4;
            }
            else if (c === 36) {
                return 62;
            }
            else if (c === 95) {
                return 63;
            }
            release || assert(false, "Invalid Encoding");
        }
        StringUtilities.fromEncoding = fromEncoding;
        function variableLengthDecodeInt32(s) {
            var l = StringUtilities.fromEncoding(s[0]);
            var n = 0;
            for (var i = 0; i < l; i++) {
                var offset = ((l - i - 1) * 6);
                n |= StringUtilities.fromEncoding(s[1 + i]) << offset;
            }
            return n;
        }
        StringUtilities.variableLengthDecodeInt32 = variableLengthDecodeInt32;
        function trimMiddle(s, maxLength) {
            if (s.length <= maxLength) {
                return s;
            }
            var leftHalf = maxLength >> 1;
            var rightHalf = maxLength - leftHalf - 1;
            return s.substr(0, leftHalf) + "\u2026" + s.substr(s.length - rightHalf, rightHalf);
        }
        StringUtilities.trimMiddle = trimMiddle;
        function multiple(s, count) {
            var o = "";
            for (var i = 0; i < count; i++) {
                o += s;
            }
            return o;
        }
        StringUtilities.multiple = multiple;
        function indexOfAny(s, chars, position) {
            var index = s.length;
            for (var i = 0; i < chars.length; i++) {
                var j = s.indexOf(chars[i], position);
                if (j >= 0) {
                    index = Math.min(index, j);
                }
            }
            return index === s.length ? -1 : index;
        }
        StringUtilities.indexOfAny = indexOfAny;
        var _concat3array = new Array(3);
        var _concat4array = new Array(4);
        var _concat5array = new Array(5);
        var _concat6array = new Array(6);
        var _concat7array = new Array(7);
        var _concat8array = new Array(8);
        var _concat9array = new Array(9);
        function concat3(s0, s1, s2) {
            _concat3array[0] = s0;
            _concat3array[1] = s1;
            _concat3array[2] = s2;
            return _concat3array.join('');
        }
        StringUtilities.concat3 = concat3;
        function concat4(s0, s1, s2, s3) {
            _concat4array[0] = s0;
            _concat4array[1] = s1;
            _concat4array[2] = s2;
            _concat4array[3] = s3;
            return _concat4array.join('');
        }
        StringUtilities.concat4 = concat4;
        function concat5(s0, s1, s2, s3, s4) {
            _concat5array[0] = s0;
            _concat5array[1] = s1;
            _concat5array[2] = s2;
            _concat5array[3] = s3;
            _concat5array[4] = s4;
            return _concat5array.join('');
        }
        StringUtilities.concat5 = concat5;
        function concat6(s0, s1, s2, s3, s4, s5) {
            _concat6array[0] = s0;
            _concat6array[1] = s1;
            _concat6array[2] = s2;
            _concat6array[3] = s3;
            _concat6array[4] = s4;
            _concat6array[5] = s5;
            return _concat6array.join('');
        }
        StringUtilities.concat6 = concat6;
        function concat7(s0, s1, s2, s3, s4, s5, s6) {
            _concat7array[0] = s0;
            _concat7array[1] = s1;
            _concat7array[2] = s2;
            _concat7array[3] = s3;
            _concat7array[4] = s4;
            _concat7array[5] = s5;
            _concat7array[6] = s6;
            return _concat7array.join('');
        }
        StringUtilities.concat7 = concat7;
        function concat8(s0, s1, s2, s3, s4, s5, s6, s7) {
            _concat8array[0] = s0;
            _concat8array[1] = s1;
            _concat8array[2] = s2;
            _concat8array[3] = s3;
            _concat8array[4] = s4;
            _concat8array[5] = s5;
            _concat8array[6] = s6;
            _concat8array[7] = s7;
            return _concat8array.join('');
        }
        StringUtilities.concat8 = concat8;
        function concat9(s0, s1, s2, s3, s4, s5, s6, s7, s8) {
            _concat9array[0] = s0;
            _concat9array[1] = s1;
            _concat9array[2] = s2;
            _concat9array[3] = s3;
            _concat9array[4] = s4;
            _concat9array[5] = s5;
            _concat9array[6] = s6;
            _concat9array[7] = s7;
            _concat9array[8] = s8;
            return _concat9array.join('');
        }
        StringUtilities.concat9 = concat9;
    })(StringUtilities = Shumway.StringUtilities || (Shumway.StringUtilities = {}));
    var HashUtilities;
    (function (HashUtilities) {
        var _md5R = new Uint8Array([
            7,
            12,
            17,
            22,
            7,
            12,
            17,
            22,
            7,
            12,
            17,
            22,
            7,
            12,
            17,
            22,
            5,
            9,
            14,
            20,
            5,
            9,
            14,
            20,
            5,
            9,
            14,
            20,
            5,
            9,
            14,
            20,
            4,
            11,
            16,
            23,
            4,
            11,
            16,
            23,
            4,
            11,
            16,
            23,
            4,
            11,
            16,
            23,
            6,
            10,
            15,
            21,
            6,
            10,
            15,
            21,
            6,
            10,
            15,
            21,
            6,
            10,
            15,
            21
        ]);
        var _md5K = new Int32Array([
            -680876936,
            -389564586,
            606105819,
            -1044525330,
            -176418897,
            1200080426,
            -1473231341,
            -45705983,
            1770035416,
            -1958414417,
            -42063,
            -1990404162,
            1804603682,
            -40341101,
            -1502002290,
            1236535329,
            -165796510,
            -1069501632,
            643717713,
            -373897302,
            -701558691,
            38016083,
            -660478335,
            -405537848,
            568446438,
            -1019803690,
            -187363961,
            1163531501,
            -1444681467,
            -51403784,
            1735328473,
            -1926607734,
            -378558,
            -2022574463,
            1839030562,
            -35309556,
            -1530992060,
            1272893353,
            -155497632,
            -1094730640,
            681279174,
            -358537222,
            -722521979,
            76029189,
            -640364487,
            -421815835,
            530742520,
            -995338651,
            -198630844,
            1126891415,
            -1416354905,
            -57434055,
            1700485571,
            -1894986606,
            -1051523,
            -2054922799,
            1873313359,
            -30611744,
            -1560198380,
            1309151649,
            -145523070,
            -1120210379,
            718787259,
            -343485551
        ]);
        function hashBytesTo32BitsMD5(data, offset, length) {
            var r = _md5R;
            var k = _md5K;
            var h0 = 1732584193, h1 = -271733879, h2 = -1732584194, h3 = 271733878;
            var paddedLength = (length + 72) & ~63;
            var padded = new Uint8Array(paddedLength);
            var i, j, n;
            for (i = 0; i < length; ++i) {
                padded[i] = data[offset++];
            }
            padded[i++] = 0x80;
            n = paddedLength - 8;
            while (i < n) {
                padded[i++] = 0;
            }
            padded[i++] = (length << 3) & 0xFF;
            padded[i++] = (length >> 5) & 0xFF;
            padded[i++] = (length >> 13) & 0xFF;
            padded[i++] = (length >> 21) & 0xFF;
            padded[i++] = (length >>> 29) & 0xFF;
            padded[i++] = 0;
            padded[i++] = 0;
            padded[i++] = 0;
            var w = new Int32Array(16);
            for (i = 0; i < paddedLength;) {
                for (j = 0; j < 16; ++j, i += 4) {
                    w[j] = (padded[i] | (padded[i + 1] << 8) | (padded[i + 2] << 16) | (padded[i + 3] << 24));
                }
                var a = h0, b = h1, c = h2, d = h3, f, g;
                for (j = 0; j < 64; ++j) {
                    if (j < 16) {
                        f = (b & c) | ((~b) & d);
                        g = j;
                    }
                    else if (j < 32) {
                        f = (d & b) | ((~d) & c);
                        g = (5 * j + 1) & 15;
                    }
                    else if (j < 48) {
                        f = b ^ c ^ d;
                        g = (3 * j + 5) & 15;
                    }
                    else {
                        f = c ^ (b | (~d));
                        g = (7 * j) & 15;
                    }
                    var tmp = d, rotateArg = (a + f + k[j] + w[g]) | 0, rotate = r[j];
                    d = c;
                    c = b;
                    b = (b + ((rotateArg << rotate) | (rotateArg >>> (32 - rotate)))) | 0;
                    a = tmp;
                }
                h0 = (h0 + a) | 0;
                h1 = (h1 + b) | 0;
                h2 = (h2 + c) | 0;
                h3 = (h3 + d) | 0;
            }
            return h0;
        }
        HashUtilities.hashBytesTo32BitsMD5 = hashBytesTo32BitsMD5;
        function hashBytesTo32BitsAdler(data, offset, length) {
            var a = 1;
            var b = 0;
            var end = offset + length;
            for (var i = offset; i < end; ++i) {
                a = (a + (data[i] & 0xff)) % 65521;
                b = (b + a) % 65521;
            }
            return (b << 16) | a;
        }
        HashUtilities.hashBytesTo32BitsAdler = hashBytesTo32BitsAdler;
    })(HashUtilities = Shumway.HashUtilities || (Shumway.HashUtilities = {}));
    var Random = (function () {
        function Random() {
        }
        Random.seed = function (seed) {
            Random._state[0] = seed;
            Random._state[1] = seed;
        };
        Random.next = function () {
            var s = this._state;
            var r0 = (Math.imul(18273, s[0] & 0xFFFF) + (s[0] >>> 16)) | 0;
            s[0] = r0;
            var r1 = (Math.imul(36969, s[1] & 0xFFFF) + (s[1] >>> 16)) | 0;
            s[1] = r1;
            var x = ((r0 << 16) + (r1 & 0xFFFF)) | 0;
            return (x < 0 ? (x + 0x100000000) : x) * 2.3283064365386962890625e-10;
        };
        Random._state = new Uint32Array([0xDEAD, 0xBEEF]);
        return Random;
    })();
    Shumway.Random = Random;
    Math.random = function random() {
        return Random.next();
    };
    function polyfillWeakMap() {
        if (typeof jsGlobal.WeakMap === 'function') {
            return;
        }
        var id = 0;
        function WeakMap() {
            this.id = '$weakmap' + (id++);
        }
        ;
        WeakMap.prototype = {
            has: function (obj) {
                return obj.hasOwnProperty(this.id);
            },
            get: function (obj, defaultValue) {
                return obj.hasOwnProperty(this.id) ? obj[this.id] : defaultValue;
            },
            set: function (obj, value) {
                Object.defineProperty(obj, this.id, {
                    value: value,
                    enumerable: false,
                    configurable: true
                });
            }
        };
        jsGlobal.WeakMap = WeakMap;
    }
    polyfillWeakMap();
    var useReferenceCounting = true;
    var WeakList = (function () {
        function WeakList() {
            if (typeof netscape !== "undefined" && netscape.security.PrivilegeManager) {
                this._map = new WeakMap();
            }
            else {
                this._list = [];
            }
        }
        WeakList.prototype.clear = function () {
            if (this._map) {
                this._map.clear();
            }
            else {
                this._list.length = 0;
            }
        };
        WeakList.prototype.push = function (value) {
            if (this._map) {
                release || Debug.assert(!this._map.has(value));
                this._map.set(value, null);
            }
            else {
                release || Debug.assert(this._list.indexOf(value) === -1);
                this._list.push(value);
            }
        };
        WeakList.prototype.remove = function (value) {
            if (this._map) {
                release || Debug.assert(this._map.has(value));
                this._map.delete(value);
            }
            else {
                release || Debug.assert(this._list.indexOf(value) > -1);
                this._list[this._list.indexOf(value)] = null;
                release || Debug.assert(this._list.indexOf(value) === -1);
            }
        };
        WeakList.prototype.forEach = function (callback) {
            if (this._map) {
                if (typeof netscape !== "undefined") {
                    netscape.security.PrivilegeManager.enablePrivilege("UniversalXPConnect");
                }
                Components.utils.nondeterministicGetWeakMapKeys(this._map).forEach(function (value) {
                    if (value._referenceCount !== 0) {
                        callback(value);
                    }
                });
                return;
            }
            var list = this._list;
            var zeroCount = 0;
            for (var i = 0; i < list.length; i++) {
                var value = list[i];
                if (!value) {
                    continue;
                }
                if (useReferenceCounting && value._referenceCount === 0) {
                    list[i] = null;
                    zeroCount++;
                }
                else {
                    callback(value);
                }
            }
            if (zeroCount > 16 && zeroCount > (list.length >> 2)) {
                var newList = [];
                for (var i = 0; i < list.length; i++) {
                    var value = list[i];
                    if (value && value._referenceCount > 0) {
                        newList.push(value);
                    }
                }
                this._list = newList;
            }
        };
        Object.defineProperty(WeakList.prototype, "length", {
            get: function () {
                if (this._map) {
                    return -1;
                }
                else {
                    return this._list.length;
                }
            },
            enumerable: true,
            configurable: true
        });
        return WeakList;
    })();
    Shumway.WeakList = WeakList;
    var NumberUtilities;
    (function (NumberUtilities) {
        function pow2(exponent) {
            if (exponent === (exponent | 0)) {
                if (exponent < 0) {
                    return 1 / (1 << -exponent);
                }
                return 1 << exponent;
            }
            return Math.pow(2, exponent);
        }
        NumberUtilities.pow2 = pow2;
        function clamp(value, min, max) {
            return Math.max(min, Math.min(max, value));
        }
        NumberUtilities.clamp = clamp;
        function roundHalfEven(value) {
            if (Math.abs(value % 1) === 0.5) {
                var floor = Math.floor(value);
                return floor % 2 === 0 ? floor : Math.ceil(value);
            }
            return Math.round(value);
        }
        NumberUtilities.roundHalfEven = roundHalfEven;
        function altTieBreakRound(value, even) {
            if (Math.abs(value % 1) === 0.5 && !even) {
                return value | 0;
            }
            return Math.round(value);
        }
        NumberUtilities.altTieBreakRound = altTieBreakRound;
        function epsilonEquals(value, other) {
            return Math.abs(value - other) < 0.0000001;
        }
        NumberUtilities.epsilonEquals = epsilonEquals;
    })(NumberUtilities = Shumway.NumberUtilities || (Shumway.NumberUtilities = {}));
    (function (Numbers) {
        Numbers[Numbers["MaxU16"] = 0xFFFF] = "MaxU16";
        Numbers[Numbers["MaxI16"] = 0x7FFF] = "MaxI16";
        Numbers[Numbers["MinI16"] = -0x8000] = "MinI16";
    })(Shumway.Numbers || (Shumway.Numbers = {}));
    var Numbers = Shumway.Numbers;
    var IntegerUtilities;
    (function (IntegerUtilities) {
        var sharedBuffer = new ArrayBuffer(8);
        IntegerUtilities.i8 = new Int8Array(sharedBuffer);
        IntegerUtilities.u8 = new Uint8Array(sharedBuffer);
        IntegerUtilities.i32 = new Int32Array(sharedBuffer);
        IntegerUtilities.f32 = new Float32Array(sharedBuffer);
        IntegerUtilities.f64 = new Float64Array(sharedBuffer);
        IntegerUtilities.nativeLittleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1;
        function floatToInt32(v) {
            IntegerUtilities.f32[0] = v;
            return IntegerUtilities.i32[0];
        }
        IntegerUtilities.floatToInt32 = floatToInt32;
        function int32ToFloat(i) {
            IntegerUtilities.i32[0] = i;
            return IntegerUtilities.f32[0];
        }
        IntegerUtilities.int32ToFloat = int32ToFloat;
        function swap16(i) {
            return ((i & 0xFF) << 8) | ((i >> 8) & 0xFF);
        }
        IntegerUtilities.swap16 = swap16;
        function swap32(i) {
            return ((i & 0xFF) << 24) | ((i & 0xFF00) << 8) | ((i >> 8) & 0xFF00) | ((i >> 24) & 0xFF);
        }
        IntegerUtilities.swap32 = swap32;
        function toS8U8(v) {
            return ((v * 256) << 16) >> 16;
        }
        IntegerUtilities.toS8U8 = toS8U8;
        function fromS8U8(i) {
            return i / 256;
        }
        IntegerUtilities.fromS8U8 = fromS8U8;
        function clampS8U8(v) {
            return fromS8U8(toS8U8(v));
        }
        IntegerUtilities.clampS8U8 = clampS8U8;
        function toS16(v) {
            return (v << 16) >> 16;
        }
        IntegerUtilities.toS16 = toS16;
        function bitCount(i) {
            i = i - ((i >> 1) & 0x55555555);
            i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
            return (((i + (i >> 4)) & 0x0F0F0F0F) * 0x01010101) >> 24;
        }
        IntegerUtilities.bitCount = bitCount;
        function ones(i) {
            i = i - ((i >> 1) & 0x55555555);
            i = (i & 0x33333333) + ((i >> 2) & 0x33333333);
            return ((i + (i >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
        }
        IntegerUtilities.ones = ones;
        function trailingZeros(i) {
            return IntegerUtilities.ones((i & -i) - 1);
        }
        IntegerUtilities.trailingZeros = trailingZeros;
        function getFlags(i, flags) {
            var str = "";
            for (var i = 0; i < flags.length; i++) {
                if (i & (1 << i)) {
                    str += flags[i] + " ";
                }
            }
            if (str.length === 0) {
                return "";
            }
            return str.trim();
        }
        IntegerUtilities.getFlags = getFlags;
        function isPowerOfTwo(x) {
            return x && ((x & (x - 1)) === 0);
        }
        IntegerUtilities.isPowerOfTwo = isPowerOfTwo;
        function roundToMultipleOfFour(x) {
            return (x + 3) & ~0x3;
        }
        IntegerUtilities.roundToMultipleOfFour = roundToMultipleOfFour;
        function nearestPowerOfTwo(x) {
            x--;
            x |= x >> 1;
            x |= x >> 2;
            x |= x >> 4;
            x |= x >> 8;
            x |= x >> 16;
            x++;
            return x;
        }
        IntegerUtilities.nearestPowerOfTwo = nearestPowerOfTwo;
        function roundToMultipleOfPowerOfTwo(i, powerOfTwo) {
            var x = (1 << powerOfTwo) - 1;
            return (i + x) & ~x;
        }
        IntegerUtilities.roundToMultipleOfPowerOfTwo = roundToMultipleOfPowerOfTwo;
        if (!Math.imul) {
            Math.imul = function imul(a, b) {
                var ah = (a >>> 16) & 0xffff;
                var al = a & 0xffff;
                var bh = (b >>> 16) & 0xffff;
                var bl = b & 0xffff;
                return ((al * bl) + (((ah * bl + al * bh) << 16) >>> 0) | 0);
            };
        }
        if (!Math.clz32) {
            Math.clz32 = function clz32(i) {
                i |= (i >> 1);
                i |= (i >> 2);
                i |= (i >> 4);
                i |= (i >> 8);
                i |= (i >> 16);
                return 32 - IntegerUtilities.ones(i);
            };
        }
    })(IntegerUtilities = Shumway.IntegerUtilities || (Shumway.IntegerUtilities = {}));
    var GeometricUtilities;
    (function (GeometricUtilities) {
        function pointInPolygon(x, y, polygon) {
            var crosses = 0;
            var n = polygon.length - 2;
            var p = polygon;
            for (var i = 0; i < n; i += 2) {
                var x0 = p[i + 0];
                var y0 = p[i + 1];
                var x1 = p[i + 2];
                var y1 = p[i + 3];
                if (((y0 <= y) && (y1 > y)) || ((y0 > y) && (y1 <= y))) {
                    var t = (y - y0) / (y1 - y0);
                    if (x < x0 + t * (x1 - x0)) {
                        crosses++;
                    }
                }
            }
            return (crosses & 1) === 1;
        }
        GeometricUtilities.pointInPolygon = pointInPolygon;
        function signedArea(x0, y0, x1, y1, x2, y2) {
            return (x1 - x0) * (y2 - y0) - (y1 - y0) * (x2 - x0);
        }
        GeometricUtilities.signedArea = signedArea;
        function counterClockwise(x0, y0, x1, y1, x2, y2) {
            return signedArea(x0, y0, x1, y1, x2, y2) > 0;
        }
        GeometricUtilities.counterClockwise = counterClockwise;
        function clockwise(x0, y0, x1, y1, x2, y2) {
            return signedArea(x0, y0, x1, y1, x2, y2) < 0;
        }
        GeometricUtilities.clockwise = clockwise;
        function pointInPolygonInt32(x, y, polygon) {
            x = x | 0;
            y = y | 0;
            var crosses = 0;
            var n = polygon.length - 2;
            var p = polygon;
            for (var i = 0; i < n; i += 2) {
                var x0 = p[i + 0];
                var y0 = p[i + 1];
                var x1 = p[i + 2];
                var y1 = p[i + 3];
                if (((y0 <= y) && (y1 > y)) || ((y0 > y) && (y1 <= y))) {
                    var t = (y - y0) / (y1 - y0);
                    if (x < x0 + t * (x1 - x0)) {
                        crosses++;
                    }
                }
            }
            return (crosses & 1) === 1;
        }
        GeometricUtilities.pointInPolygonInt32 = pointInPolygonInt32;
    })(GeometricUtilities = Shumway.GeometricUtilities || (Shumway.GeometricUtilities = {}));
    (function (LogLevel) {
        LogLevel[LogLevel["Error"] = 0x1] = "Error";
        LogLevel[LogLevel["Warn"] = 0x2] = "Warn";
        LogLevel[LogLevel["Debug"] = 0x4] = "Debug";
        LogLevel[LogLevel["Log"] = 0x8] = "Log";
        LogLevel[LogLevel["Info"] = 0x10] = "Info";
        LogLevel[LogLevel["All"] = 0x1f] = "All";
    })(Shumway.LogLevel || (Shumway.LogLevel = {}));
    var LogLevel = Shumway.LogLevel;
    var IndentingWriter = (function () {
        function IndentingWriter(suppressOutput, out) {
            if (suppressOutput === void 0) { suppressOutput = false; }
            this._tab = "  ";
            this._padding = "";
            this._suppressOutput = suppressOutput;
            this._out = out || IndentingWriter._consoleOut;
            this._outNoNewline = out || IndentingWriter._consoleOutNoNewline;
        }
        IndentingWriter.prototype.write = function (str, writePadding) {
            if (str === void 0) { str = ""; }
            if (writePadding === void 0) { writePadding = false; }
            if (!this._suppressOutput) {
                this._outNoNewline((writePadding ? this._padding : "") + str);
            }
        };
        IndentingWriter.prototype.writeLn = function (str) {
            if (str === void 0) { str = ""; }
            if (!this._suppressOutput) {
                this._out(this._padding + str);
            }
        };
        IndentingWriter.prototype.writeObject = function (str, object) {
            if (str === void 0) { str = ""; }
            if (!this._suppressOutput) {
                this._out(this._padding + str, object);
            }
        };
        IndentingWriter.prototype.writeTimeLn = function (str) {
            if (str === void 0) { str = ""; }
            if (!this._suppressOutput) {
                this._out(this._padding + performance.now().toFixed(2) + " " + str);
            }
        };
        IndentingWriter.prototype.writeComment = function (str) {
            var lines = str.split("\n");
            if (lines.length === 1) {
                this.writeLn("// " + lines[0]);
            }
            else {
                this.writeLn("/**");
                for (var i = 0; i < lines.length; i++) {
                    this.writeLn(" * " + lines[i]);
                }
                this.writeLn(" */");
            }
        };
        IndentingWriter.prototype.writeLns = function (str) {
            var lines = str.split("\n");
            for (var i = 0; i < lines.length; i++) {
                this.writeLn(lines[i]);
            }
        };
        IndentingWriter.prototype.errorLn = function (str) {
            if (IndentingWriter.logLevel & 1 /* Error */) {
                this.boldRedLn(str);
            }
        };
        IndentingWriter.prototype.warnLn = function (str) {
            if (IndentingWriter.logLevel & 2 /* Warn */) {
                this.yellowLn(str);
            }
        };
        IndentingWriter.prototype.debugLn = function (str) {
            if (IndentingWriter.logLevel & 4 /* Debug */) {
                this.purpleLn(str);
            }
        };
        IndentingWriter.prototype.logLn = function (str) {
            if (IndentingWriter.logLevel & 8 /* Log */) {
                this.writeLn(str);
            }
        };
        IndentingWriter.prototype.infoLn = function (str) {
            if (IndentingWriter.logLevel & 16 /* Info */) {
                this.writeLn(str);
            }
        };
        IndentingWriter.prototype.yellowLn = function (str) {
            this.colorLn(IndentingWriter.YELLOW, str);
        };
        IndentingWriter.prototype.greenLn = function (str) {
            this.colorLn(IndentingWriter.GREEN, str);
        };
        IndentingWriter.prototype.boldRedLn = function (str) {
            this.colorLn(IndentingWriter.BOLD_RED, str);
        };
        IndentingWriter.prototype.redLn = function (str) {
            this.colorLn(IndentingWriter.RED, str);
        };
        IndentingWriter.prototype.purpleLn = function (str) {
            this.colorLn(IndentingWriter.PURPLE, str);
        };
        IndentingWriter.prototype.colorLn = function (color, str) {
            if (!this._suppressOutput) {
                if (!inBrowser) {
                    this._out(this._padding + color + str + IndentingWriter.ENDC);
                }
                else {
                    this._out(this._padding + str);
                }
            }
        };
        IndentingWriter.prototype.redLns = function (str) {
            this.colorLns(IndentingWriter.RED, str);
        };
        IndentingWriter.prototype.colorLns = function (color, str) {
            var lines = str.split("\n");
            for (var i = 0; i < lines.length; i++) {
                this.colorLn(color, lines[i]);
            }
        };
        IndentingWriter.prototype.enter = function (str) {
            if (!this._suppressOutput) {
                this._out(this._padding + str);
            }
            this.indent();
        };
        IndentingWriter.prototype.leaveAndEnter = function (str) {
            this.leave(str);
            this.indent();
        };
        IndentingWriter.prototype.leave = function (str) {
            this.outdent();
            if (!this._suppressOutput && str) {
                this._out(this._padding + str);
            }
        };
        IndentingWriter.prototype.indent = function () {
            this._padding += this._tab;
        };
        IndentingWriter.prototype.outdent = function () {
            if (this._padding.length > 0) {
                this._padding = this._padding.substring(0, this._padding.length - this._tab.length);
            }
        };
        IndentingWriter.prototype.writeArray = function (arr, detailed, noNumbers) {
            if (detailed === void 0) { detailed = false; }
            if (noNumbers === void 0) { noNumbers = false; }
            detailed = detailed || false;
            for (var i = 0, j = arr.length; i < j; i++) {
                var prefix = "";
                if (detailed) {
                    if (arr[i] === null) {
                        prefix = "null";
                    }
                    else if (arr[i] === undefined) {
                        prefix = "undefined";
                    }
                    else {
                        prefix = arr[i].constructor.name;
                    }
                    prefix += " ";
                }
                var number = noNumbers ? "" : ("" + i).padRight(' ', 4);
                this.writeLn(number + prefix + arr[i]);
            }
        };
        IndentingWriter.PURPLE = '\033[94m';
        IndentingWriter.YELLOW = '\033[93m';
        IndentingWriter.GREEN = '\033[92m';
        IndentingWriter.RED = '\033[91m';
        IndentingWriter.BOLD_RED = '\033[1;91m';
        IndentingWriter.ENDC = '\033[0m';
        IndentingWriter.logLevel = 31 /* All */;
        IndentingWriter._consoleOut = console.info.bind(console);
        IndentingWriter._consoleOutNoNewline = console.info.bind(console);
        return IndentingWriter;
    })();
    Shumway.IndentingWriter = IndentingWriter;
    var SortedListNode = (function () {
        function SortedListNode(value, next) {
            this.value = value;
            this.next = next;
        }
        return SortedListNode;
    })();
    var SortedList = (function () {
        function SortedList(compare) {
            release || Debug.assert(compare);
            this._compare = compare;
            this._head = null;
            this._length = 0;
        }
        SortedList.prototype.push = function (value) {
            release || Debug.assert(value !== undefined);
            this._length++;
            if (!this._head) {
                this._head = new SortedListNode(value, null);
                return;
            }
            var curr = this._head;
            var prev = null;
            var node = new SortedListNode(value, null);
            var compare = this._compare;
            while (curr) {
                if (compare(curr.value, node.value) > 0) {
                    if (prev) {
                        node.next = curr;
                        prev.next = node;
                    }
                    else {
                        node.next = this._head;
                        this._head = node;
                    }
                    return;
                }
                prev = curr;
                curr = curr.next;
            }
            prev.next = node;
        };
        SortedList.prototype.forEach = function (visitor) {
            var curr = this._head;
            var last = null;
            while (curr) {
                var result = visitor(curr.value);
                if (result === SortedList.RETURN) {
                    return;
                }
                else if (result === SortedList.DELETE) {
                    if (!last) {
                        curr = this._head = this._head.next;
                    }
                    else {
                        curr = last.next = curr.next;
                    }
                }
                else {
                    last = curr;
                    curr = curr.next;
                }
            }
        };
        SortedList.prototype.isEmpty = function () {
            return !this._head;
        };
        SortedList.prototype.pop = function () {
            if (!this._head) {
                return undefined;
            }
            this._length--;
            var ret = this._head;
            this._head = this._head.next;
            return ret.value;
        };
        SortedList.prototype.contains = function (value) {
            var curr = this._head;
            while (curr) {
                if (curr.value === value) {
                    return true;
                }
                curr = curr.next;
            }
            return false;
        };
        SortedList.prototype.toString = function () {
            var str = "[";
            var curr = this._head;
            while (curr) {
                str += curr.value.toString();
                curr = curr.next;
                if (curr) {
                    str += ",";
                }
            }
            str += "]";
            return str;
        };
        SortedList.RETURN = 1;
        SortedList.DELETE = 2;
        return SortedList;
    })();
    Shumway.SortedList = SortedList;
    var CircularBuffer = (function () {
        function CircularBuffer(Type, sizeInBits) {
            if (sizeInBits === void 0) { sizeInBits = 12; }
            this.index = 0;
            this.start = 0;
            this._size = 1 << sizeInBits;
            this._mask = this._size - 1;
            this.array = new Type(this._size);
        }
        CircularBuffer.prototype.get = function (i) {
            return this.array[i];
        };
        CircularBuffer.prototype.forEachInReverse = function (visitor) {
            if (this.isEmpty()) {
                return;
            }
            var i = this.index === 0 ? this._size - 1 : this.index - 1;
            var end = (this.start - 1) & this._mask;
            while (i !== end) {
                if (visitor(this.array[i], i)) {
                    break;
                }
                i = i === 0 ? this._size - 1 : i - 1;
            }
        };
        CircularBuffer.prototype.write = function (value) {
            this.array[this.index] = value;
            this.index = (this.index + 1) & this._mask;
            if (this.index === this.start) {
                this.start = (this.start + 1) & this._mask;
            }
        };
        CircularBuffer.prototype.isFull = function () {
            return ((this.index + 1) & this._mask) === this.start;
        };
        CircularBuffer.prototype.isEmpty = function () {
            return this.index === this.start;
        };
        CircularBuffer.prototype.reset = function () {
            this.index = 0;
            this.start = 0;
        };
        return CircularBuffer;
    })();
    Shumway.CircularBuffer = CircularBuffer;
    var BitSets;
    (function (BitSets) {
        var assert = Shumway.Debug.assert;
        BitSets.ADDRESS_BITS_PER_WORD = 5;
        BitSets.BITS_PER_WORD = 1 << BitSets.ADDRESS_BITS_PER_WORD;
        BitSets.BIT_INDEX_MASK = BitSets.BITS_PER_WORD - 1;
        function getSize(length) {
            return ((length + (BitSets.BITS_PER_WORD - 1)) >> BitSets.ADDRESS_BITS_PER_WORD) << BitSets.ADDRESS_BITS_PER_WORD;
        }
        function toBitString(on, off) {
            var self = this;
            on = on || "1";
            off = off || "0";
            var str = "";
            for (var i = 0; i < length; i++) {
                str += self.get(i) ? on : off;
            }
            return str;
        }
        function toString(names) {
            var self = this;
            var set = [];
            for (var i = 0; i < length; i++) {
                if (self.get(i)) {
                    set.push(names ? names[i] : i);
                }
            }
            return set.join(", ");
        }
        var Uint32ArrayBitSet = (function () {
            function Uint32ArrayBitSet(length) {
                this.size = getSize(length);
                this.count = 0;
                this.dirty = 0;
                this.length = length;
                this.bits = new Uint32Array(this.size >> BitSets.ADDRESS_BITS_PER_WORD);
            }
            Uint32ArrayBitSet.prototype.recount = function () {
                if (!this.dirty) {
                    return;
                }
                var bits = this.bits;
                var c = 0;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var v = bits[i];
                    v = v - ((v >> 1) & 0x55555555);
                    v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
                    c += ((v + (v >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
                }
                this.count = c;
                this.dirty = 0;
            };
            Uint32ArrayBitSet.prototype.set = function (i) {
                var n = i >> BitSets.ADDRESS_BITS_PER_WORD;
                var old = this.bits[n];
                var b = old | (1 << (i & BitSets.BIT_INDEX_MASK));
                this.bits[n] = b;
                this.dirty |= old ^ b;
            };
            Uint32ArrayBitSet.prototype.setAll = function () {
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    bits[i] = 0xFFFFFFFF;
                }
                this.count = this.size;
                this.dirty = 0;
            };
            Uint32ArrayBitSet.prototype.assign = function (set) {
                this.count = set.count;
                this.dirty = set.dirty;
                this.size = set.size;
                for (var i = 0, j = this.bits.length; i < j; i++) {
                    this.bits[i] = set.bits[i];
                }
            };
            Uint32ArrayBitSet.prototype.clear = function (i) {
                var n = i >> BitSets.ADDRESS_BITS_PER_WORD;
                var old = this.bits[n];
                var b = old & ~(1 << (i & BitSets.BIT_INDEX_MASK));
                this.bits[n] = b;
                this.dirty |= old ^ b;
            };
            Uint32ArrayBitSet.prototype.get = function (i) {
                var word = this.bits[i >> BitSets.ADDRESS_BITS_PER_WORD];
                return ((word & 1 << (i & BitSets.BIT_INDEX_MASK))) !== 0;
            };
            Uint32ArrayBitSet.prototype.clearAll = function () {
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    bits[i] = 0;
                }
                this.count = 0;
                this.dirty = 0;
            };
            Uint32ArrayBitSet.prototype._union = function (other) {
                var dirty = this.dirty;
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var old = bits[i];
                    var b = old | otherBits[i];
                    bits[i] = b;
                    dirty |= old ^ b;
                }
                this.dirty = dirty;
            };
            Uint32ArrayBitSet.prototype.intersect = function (other) {
                var dirty = this.dirty;
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var old = bits[i];
                    var b = old & otherBits[i];
                    bits[i] = b;
                    dirty |= old ^ b;
                }
                this.dirty = dirty;
            };
            Uint32ArrayBitSet.prototype.subtract = function (other) {
                var dirty = this.dirty;
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var old = bits[i];
                    var b = old & ~otherBits[i];
                    bits[i] = b;
                    dirty |= old ^ b;
                }
                this.dirty = dirty;
            };
            Uint32ArrayBitSet.prototype.negate = function () {
                var dirty = this.dirty;
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var old = bits[i];
                    var b = ~old;
                    bits[i] = b;
                    dirty |= old ^ b;
                }
                this.dirty = dirty;
            };
            Uint32ArrayBitSet.prototype.forEach = function (fn) {
                release || assert(fn);
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var word = bits[i];
                    if (word) {
                        for (var k = 0; k < BitSets.BITS_PER_WORD; k++) {
                            if (word & (1 << k)) {
                                fn(i * BitSets.BITS_PER_WORD + k);
                            }
                        }
                    }
                }
            };
            Uint32ArrayBitSet.prototype.toArray = function () {
                var set = [];
                var bits = this.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    var word = bits[i];
                    if (word) {
                        for (var k = 0; k < BitSets.BITS_PER_WORD; k++) {
                            if (word & (1 << k)) {
                                set.push(i * BitSets.BITS_PER_WORD + k);
                            }
                        }
                    }
                }
                return set;
            };
            Uint32ArrayBitSet.prototype.equals = function (other) {
                if (this.size !== other.size) {
                    return false;
                }
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    if (bits[i] !== otherBits[i]) {
                        return false;
                    }
                }
                return true;
            };
            Uint32ArrayBitSet.prototype.contains = function (other) {
                if (this.size !== other.size) {
                    return false;
                }
                var bits = this.bits;
                var otherBits = other.bits;
                for (var i = 0, j = bits.length; i < j; i++) {
                    if ((bits[i] | otherBits[i]) !== bits[i]) {
                        return false;
                    }
                }
                return true;
            };
            Uint32ArrayBitSet.prototype.isEmpty = function () {
                this.recount();
                return this.count === 0;
            };
            Uint32ArrayBitSet.prototype.clone = function () {
                var set = new Uint32ArrayBitSet(this.length);
                set._union(this);
                return set;
            };
            return Uint32ArrayBitSet;
        })();
        BitSets.Uint32ArrayBitSet = Uint32ArrayBitSet;
        var Uint32BitSet = (function () {
            function Uint32BitSet(length) {
                this.count = 0;
                this.dirty = 0;
                this.size = getSize(length);
                this.bits = 0;
                this.singleWord = true;
                this.length = length;
            }
            Uint32BitSet.prototype.recount = function () {
                if (!this.dirty) {
                    return;
                }
                var c = 0;
                var v = this.bits;
                v = v - ((v >> 1) & 0x55555555);
                v = (v & 0x33333333) + ((v >> 2) & 0x33333333);
                c += ((v + (v >> 4) & 0xF0F0F0F) * 0x1010101) >> 24;
                this.count = c;
                this.dirty = 0;
            };
            Uint32BitSet.prototype.set = function (i) {
                var old = this.bits;
                var b = old | (1 << (i & BitSets.BIT_INDEX_MASK));
                this.bits = b;
                this.dirty |= old ^ b;
            };
            Uint32BitSet.prototype.setAll = function () {
                this.bits = 0xFFFFFFFF;
                this.count = this.size;
                this.dirty = 0;
            };
            Uint32BitSet.prototype.assign = function (set) {
                this.count = set.count;
                this.dirty = set.dirty;
                this.size = set.size;
                this.bits = set.bits;
            };
            Uint32BitSet.prototype.clear = function (i) {
                var old = this.bits;
                var b = old & ~(1 << (i & BitSets.BIT_INDEX_MASK));
                this.bits = b;
                this.dirty |= old ^ b;
            };
            Uint32BitSet.prototype.get = function (i) {
                return ((this.bits & 1 << (i & BitSets.BIT_INDEX_MASK))) !== 0;
            };
            Uint32BitSet.prototype.clearAll = function () {
                this.bits = 0;
                this.count = 0;
                this.dirty = 0;
            };
            Uint32BitSet.prototype._union = function (other) {
                var old = this.bits;
                var b = old | other.bits;
                this.bits = b;
                this.dirty = old ^ b;
            };
            Uint32BitSet.prototype.intersect = function (other) {
                var old = this.bits;
                var b = old & other.bits;
                this.bits = b;
                this.dirty = old ^ b;
            };
            Uint32BitSet.prototype.subtract = function (other) {
                var old = this.bits;
                var b = old & ~other.bits;
                this.bits = b;
                this.dirty = old ^ b;
            };
            Uint32BitSet.prototype.negate = function () {
                var old = this.bits;
                var b = ~old;
                this.bits = b;
                this.dirty = old ^ b;
            };
            Uint32BitSet.prototype.forEach = function (fn) {
                release || assert(fn);
                var word = this.bits;
                if (word) {
                    for (var k = 0; k < BitSets.BITS_PER_WORD; k++) {
                        if (word & (1 << k)) {
                            fn(k);
                        }
                    }
                }
            };
            Uint32BitSet.prototype.toArray = function () {
                var set = [];
                var word = this.bits;
                if (word) {
                    for (var k = 0; k < BitSets.BITS_PER_WORD; k++) {
                        if (word & (1 << k)) {
                            set.push(k);
                        }
                    }
                }
                return set;
            };
            Uint32BitSet.prototype.equals = function (other) {
                return this.bits === other.bits;
            };
            Uint32BitSet.prototype.contains = function (other) {
                var bits = this.bits;
                return (bits | other.bits) === bits;
            };
            Uint32BitSet.prototype.isEmpty = function () {
                this.recount();
                return this.count === 0;
            };
            Uint32BitSet.prototype.clone = function () {
                var set = new Uint32BitSet(this.length);
                set._union(this);
                return set;
            };
            return Uint32BitSet;
        })();
        BitSets.Uint32BitSet = Uint32BitSet;
        Uint32BitSet.prototype.toString = toString;
        Uint32BitSet.prototype.toBitString = toBitString;
        Uint32ArrayBitSet.prototype.toString = toString;
        Uint32ArrayBitSet.prototype.toBitString = toBitString;
        function BitSetFunctor(length) {
            var shouldUseSingleWord = (getSize(length) >> BitSets.ADDRESS_BITS_PER_WORD) === 1;
            var type = (shouldUseSingleWord ? Uint32BitSet : Uint32ArrayBitSet);
            return function () {
                return new type(length);
            };
        }
        BitSets.BitSetFunctor = BitSetFunctor;
    })(BitSets = Shumway.BitSets || (Shumway.BitSets = {}));
    var ColorStyle = (function () {
        function ColorStyle() {
        }
        ColorStyle.randomStyle = function () {
            if (!ColorStyle._randomStyleCache) {
                ColorStyle._randomStyleCache = [
                    "#ff5e3a",
                    "#ff9500",
                    "#ffdb4c",
                    "#87fc70",
                    "#52edc7",
                    "#1ad6fd",
                    "#c644fc",
                    "#ef4db6",
                    "#4a4a4a",
                    "#dbddde",
                    "#ff3b30",
                    "#ff9500",
                    "#ffcc00",
                    "#4cd964",
                    "#34aadc",
                    "#007aff",
                    "#5856d6",
                    "#ff2d55",
                    "#8e8e93",
                    "#c7c7cc",
                    "#5ad427",
                    "#c86edf",
                    "#d1eefc",
                    "#e0f8d8",
                    "#fb2b69",
                    "#f7f7f7",
                    "#1d77ef",
                    "#d6cec3",
                    "#55efcb",
                    "#ff4981",
                    "#ffd3e0",
                    "#f7f7f7",
                    "#ff1300",
                    "#1f1f21",
                    "#bdbec2",
                    "#ff3a2d"
                ];
            }
            return ColorStyle._randomStyleCache[(ColorStyle._nextStyle++) % ColorStyle._randomStyleCache.length];
        };
        ColorStyle.gradientColor = function (value) {
            return ColorStyle._gradient[ColorStyle._gradient.length * NumberUtilities.clamp(value, 0, 1) | 0];
        };
        ColorStyle.contrastStyle = function (rgb) {
            var c = parseInt(rgb.substr(1), 16);
            var yiq = (((c >> 16) * 299) + (((c >> 8) & 0xff) * 587) + ((c & 0xff) * 114)) / 1000;
            return (yiq >= 128) ? '#000000' : '#ffffff';
        };
        ColorStyle.reset = function () {
            ColorStyle._nextStyle = 0;
        };
        ColorStyle.TabToolbar = "#252c33";
        ColorStyle.Toolbars = "#343c45";
        ColorStyle.HighlightBlue = "#1d4f73";
        ColorStyle.LightText = "#f5f7fa";
        ColorStyle.ForegroundText = "#b6babf";
        ColorStyle.Black = "#000000";
        ColorStyle.VeryDark = "#14171a";
        ColorStyle.Dark = "#181d20";
        ColorStyle.Light = "#a9bacb";
        ColorStyle.Grey = "#8fa1b2";
        ColorStyle.DarkGrey = "#5f7387";
        ColorStyle.Blue = "#46afe3";
        ColorStyle.Purple = "#6b7abb";
        ColorStyle.Pink = "#df80ff";
        ColorStyle.Red = "#eb5368";
        ColorStyle.Orange = "#d96629";
        ColorStyle.LightOrange = "#d99b28";
        ColorStyle.Green = "#70bf53";
        ColorStyle.BlueGrey = "#5e88b0";
        ColorStyle._nextStyle = 0;
        ColorStyle._gradient = [
            "#FF0000",
            "#FF1100",
            "#FF2300",
            "#FF3400",
            "#FF4600",
            "#FF5700",
            "#FF6900",
            "#FF7B00",
            "#FF8C00",
            "#FF9E00",
            "#FFAF00",
            "#FFC100",
            "#FFD300",
            "#FFE400",
            "#FFF600",
            "#F7FF00",
            "#E5FF00",
            "#D4FF00",
            "#C2FF00",
            "#B0FF00",
            "#9FFF00",
            "#8DFF00",
            "#7CFF00",
            "#6AFF00",
            "#58FF00",
            "#47FF00",
            "#35FF00",
            "#24FF00",
            "#12FF00",
            "#00FF00"
        ];
        return ColorStyle;
    })();
    Shumway.ColorStyle = ColorStyle;
    var Bounds = (function () {
        function Bounds(xMin, yMin, xMax, yMax) {
            this.xMin = xMin | 0;
            this.yMin = yMin | 0;
            this.xMax = xMax | 0;
            this.yMax = yMax | 0;
        }
        Bounds.FromUntyped = function (source) {
            return new Bounds(source.xMin, source.yMin, source.xMax, source.yMax);
        };
        Bounds.FromRectangle = function (source) {
            return new Bounds(source.x * 20 | 0, source.y * 20 | 0, (source.x + source.width) * 20 | 0, (source.y + source.height) * 20 | 0);
        };
        Bounds.prototype.setElements = function (xMin, yMin, xMax, yMax) {
            this.xMin = xMin;
            this.yMin = yMin;
            this.xMax = xMax;
            this.yMax = yMax;
        };
        Bounds.prototype.copyFrom = function (source) {
            this.setElements(source.xMin, source.yMin, source.xMax, source.yMax);
        };
        Bounds.prototype.contains = function (x, y) {
            return x < this.xMin !== x < this.xMax && y < this.yMin !== y < this.yMax;
        };
        Bounds.prototype.unionInPlace = function (other) {
            if (other.isEmpty()) {
                return;
            }
            this.extendByPoint(other.xMin, other.yMin);
            this.extendByPoint(other.xMax, other.yMax);
        };
        Bounds.prototype.extendByPoint = function (x, y) {
            this.extendByX(x);
            this.extendByY(y);
        };
        Bounds.prototype.extendByX = function (x) {
            if (this.xMin === 0x8000000) {
                this.xMin = this.xMax = x;
                return;
            }
            this.xMin = Math.min(this.xMin, x);
            this.xMax = Math.max(this.xMax, x);
        };
        Bounds.prototype.extendByY = function (y) {
            if (this.yMin === 0x8000000) {
                this.yMin = this.yMax = y;
                return;
            }
            this.yMin = Math.min(this.yMin, y);
            this.yMax = Math.max(this.yMax, y);
        };
        Bounds.prototype.intersects = function (toIntersect) {
            return this.contains(toIntersect.xMin, toIntersect.yMin) || this.contains(toIntersect.xMax, toIntersect.yMax);
        };
        Bounds.prototype.isEmpty = function () {
            return this.xMax <= this.xMin || this.yMax <= this.yMin;
        };
        Object.defineProperty(Bounds.prototype, "width", {
            get: function () {
                return this.xMax - this.xMin;
            },
            set: function (value) {
                this.xMax = this.xMin + value;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(Bounds.prototype, "height", {
            get: function () {
                return this.yMax - this.yMin;
            },
            set: function (value) {
                this.yMax = this.yMin + value;
            },
            enumerable: true,
            configurable: true
        });
        Bounds.prototype.getBaseWidth = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * (this.xMax - this.xMin) + v * (this.yMax - this.yMin);
        };
        Bounds.prototype.getBaseHeight = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * (this.xMax - this.xMin) + u * (this.yMax - this.yMin);
        };
        Bounds.prototype.setEmpty = function () {
            this.xMin = this.yMin = this.xMax = this.yMax = 0;
        };
        Bounds.prototype.setToSentinels = function () {
            this.xMin = this.yMin = this.xMax = this.yMax = 0x8000000;
        };
        Bounds.prototype.clone = function () {
            return new Bounds(this.xMin, this.yMin, this.xMax, this.yMax);
        };
        Bounds.prototype.toString = function () {
            return "{ " + "xMin: " + this.xMin + ", " + "xMin: " + this.yMin + ", " + "xMax: " + this.xMax + ", " + "xMax: " + this.yMax + " }";
        };
        return Bounds;
    })();
    Shumway.Bounds = Bounds;
    var DebugBounds = (function () {
        function DebugBounds(xMin, yMin, xMax, yMax) {
            Debug.assert(isInteger(xMin));
            Debug.assert(isInteger(yMin));
            Debug.assert(isInteger(xMax));
            Debug.assert(isInteger(yMax));
            this._xMin = xMin | 0;
            this._yMin = yMin | 0;
            this._xMax = xMax | 0;
            this._yMax = yMax | 0;
            this.assertValid();
        }
        DebugBounds.FromUntyped = function (source) {
            return new DebugBounds(source.xMin, source.yMin, source.xMax, source.yMax);
        };
        DebugBounds.FromRectangle = function (source) {
            return new DebugBounds(source.x * 20 | 0, source.y * 20 | 0, (source.x + source.width) * 20 | 0, (source.y + source.height) * 20 | 0);
        };
        DebugBounds.prototype.setElements = function (xMin, yMin, xMax, yMax) {
            this.xMin = xMin;
            this.yMin = yMin;
            this.xMax = xMax;
            this.yMax = yMax;
        };
        DebugBounds.prototype.copyFrom = function (source) {
            this.setElements(source.xMin, source.yMin, source.xMax, source.yMax);
        };
        DebugBounds.prototype.contains = function (x, y) {
            return x < this.xMin !== x < this.xMax && y < this.yMin !== y < this.yMax;
        };
        DebugBounds.prototype.unionInPlace = function (other) {
            if (other.isEmpty()) {
                return;
            }
            this.extendByPoint(other.xMin, other.yMin);
            this.extendByPoint(other.xMax, other.yMax);
        };
        DebugBounds.prototype.extendByPoint = function (x, y) {
            this.extendByX(x);
            this.extendByY(y);
        };
        DebugBounds.prototype.extendByX = function (x) {
            if (this.xMin === 0x8000000) {
                this.xMin = this.xMax = x;
                return;
            }
            this.xMin = Math.min(this.xMin, x);
            this.xMax = Math.max(this.xMax, x);
        };
        DebugBounds.prototype.extendByY = function (y) {
            if (this.yMin === 0x8000000) {
                this.yMin = this.yMax = y;
                return;
            }
            this.yMin = Math.min(this.yMin, y);
            this.yMax = Math.max(this.yMax, y);
        };
        DebugBounds.prototype.intersects = function (toIntersect) {
            return this.contains(toIntersect._xMin, toIntersect._yMin) || this.contains(toIntersect._xMax, toIntersect._yMax);
        };
        DebugBounds.prototype.isEmpty = function () {
            return this._xMax <= this._xMin || this._yMax <= this._yMin;
        };
        Object.defineProperty(DebugBounds.prototype, "xMin", {
            get: function () {
                return this._xMin;
            },
            set: function (value) {
                Debug.assert(isInteger(value));
                this._xMin = value;
                this.assertValid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "yMin", {
            get: function () {
                return this._yMin;
            },
            set: function (value) {
                Debug.assert(isInteger(value));
                this._yMin = value | 0;
                this.assertValid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "xMax", {
            get: function () {
                return this._xMax;
            },
            set: function (value) {
                Debug.assert(isInteger(value));
                this._xMax = value | 0;
                this.assertValid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "width", {
            get: function () {
                return this._xMax - this._xMin;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "yMax", {
            get: function () {
                return this._yMax;
            },
            set: function (value) {
                Debug.assert(isInteger(value));
                this._yMax = value | 0;
                this.assertValid();
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(DebugBounds.prototype, "height", {
            get: function () {
                return this._yMax - this._yMin;
            },
            enumerable: true,
            configurable: true
        });
        DebugBounds.prototype.getBaseWidth = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return u * (this._xMax - this._xMin) + v * (this._yMax - this._yMin);
        };
        DebugBounds.prototype.getBaseHeight = function (angle) {
            var u = Math.abs(Math.cos(angle));
            var v = Math.abs(Math.sin(angle));
            return v * (this._xMax - this._xMin) + u * (this._yMax - this._yMin);
        };
        DebugBounds.prototype.setEmpty = function () {
            this._xMin = this._yMin = this._xMax = this._yMax = 0;
        };
        DebugBounds.prototype.clone = function () {
            return new DebugBounds(this.xMin, this.yMin, this.xMax, this.yMax);
        };
        DebugBounds.prototype.toString = function () {
            return "{ " + "xMin: " + this._xMin + ", " + "xMin: " + this._yMin + ", " + "xMax: " + this._xMax + ", " + "yMax: " + this._yMax + " }";
        };
        DebugBounds.prototype.assertValid = function () {
        };
        return DebugBounds;
    })();
    Shumway.DebugBounds = DebugBounds;
    var Color = (function () {
        function Color(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        }
        Color.FromARGB = function (argb) {
            return new Color((argb >> 16 & 0xFF) / 255, (argb >> 8 & 0xFF) / 255, (argb >> 0 & 0xFF) / 255, (argb >> 24 & 0xFF) / 255);
        };
        Color.FromRGBA = function (rgba) {
            return Color.FromARGB(ColorUtilities.RGBAToARGB(rgba));
        };
        Color.prototype.toRGBA = function () {
            return (this.r * 255) << 24 | (this.g * 255) << 16 | (this.b * 255) << 8 | (this.a * 255);
        };
        Color.prototype.toCSSStyle = function () {
            return ColorUtilities.rgbaToCSSStyle(this.toRGBA());
        };
        Color.prototype.set = function (other) {
            this.r = other.r;
            this.g = other.g;
            this.b = other.b;
            this.a = other.a;
        };
        Color.randomColor = function (alpha) {
            if (alpha === void 0) { alpha = 1; }
            return new Color(Math.random(), Math.random(), Math.random(), alpha);
        };
        Color.parseColor = function (color) {
            if (!Color.colorCache) {
                Color.colorCache = Object.create(null);
            }
            if (Color.colorCache[color]) {
                return Color.colorCache[color];
            }
            var span = document.createElement('span');
            document.body.appendChild(span);
            span.style.backgroundColor = color;
            var rgb = getComputedStyle(span).backgroundColor;
            document.body.removeChild(span);
            var m = /^rgb\((\d+), (\d+), (\d+)\)$/.exec(rgb);
            if (!m)
                m = /^rgba\((\d+), (\d+), (\d+), ([\d.]+)\)$/.exec(rgb);
            var result = new Color(0, 0, 0, 0);
            result.r = parseFloat(m[1]) / 255;
            result.g = parseFloat(m[2]) / 255;
            result.b = parseFloat(m[3]) / 255;
            result.a = m[4] ? parseFloat(m[4]) / 255 : 1;
            return Color.colorCache[color] = result;
        };
        Color.Red = new Color(1, 0, 0, 1);
        Color.Green = new Color(0, 1, 0, 1);
        Color.Blue = new Color(0, 0, 1, 1);
        Color.None = new Color(0, 0, 0, 0);
        Color.White = new Color(1, 1, 1, 1);
        Color.Black = new Color(0, 0, 0, 1);
        Color.colorCache = {};
        return Color;
    })();
    Shumway.Color = Color;
    var ColorUtilities;
    (function (ColorUtilities) {
        function RGBAToARGB(rgba) {
            return ((rgba >> 8) & 0x00ffffff) | ((rgba & 0xff) << 24);
        }
        ColorUtilities.RGBAToARGB = RGBAToARGB;
        function ARGBToRGBA(argb) {
            return argb << 8 | ((argb >> 24) & 0xff);
        }
        ColorUtilities.ARGBToRGBA = ARGBToRGBA;
        function rgbaToCSSStyle(color) {
            return Shumway.StringUtilities.concat9('rgba(', color >> 24 & 0xff, ',', color >> 16 & 0xff, ',', color >> 8 & 0xff, ',', (color & 0xff) / 0xff, ')');
        }
        ColorUtilities.rgbaToCSSStyle = rgbaToCSSStyle;
        function cssStyleToRGBA(style) {
            if (style[0] === "#") {
                if (style.length === 7) {
                    var value = parseInt(style.substring(1), 16);
                    return (value << 8) | 0xff;
                }
            }
            else if (style[0] === "r") {
                var values = style.substring(5, style.length - 1).split(",");
                var r = parseInt(values[0]);
                var g = parseInt(values[1]);
                var b = parseInt(values[2]);
                var a = parseFloat(values[3]);
                return (r & 0xff) << 24 | (g & 0xff) << 16 | (b & 0xff) << 8 | ((a * 255) & 0xff);
            }
            return 0xff0000ff;
        }
        ColorUtilities.cssStyleToRGBA = cssStyleToRGBA;
        function hexToRGB(color) {
            return parseInt(color.slice(1), 16);
        }
        ColorUtilities.hexToRGB = hexToRGB;
        function rgbToHex(color) {
            return '#' + ('000000' + (color >>> 0).toString(16)).slice(-6);
        }
        ColorUtilities.rgbToHex = rgbToHex;
        function isValidHexColor(value) {
            return /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/.test(value);
        }
        ColorUtilities.isValidHexColor = isValidHexColor;
        function clampByte(value) {
            return Math.max(0, Math.min(255, value));
        }
        ColorUtilities.clampByte = clampByte;
        function unpremultiplyARGB(pARGB) {
            var b = (pARGB >> 0) & 0xff;
            var g = (pARGB >> 8) & 0xff;
            var r = (pARGB >> 16) & 0xff;
            var a = (pARGB >> 24) & 0xff;
            r = Math.imul(255, r) / a & 0xff;
            g = Math.imul(255, g) / a & 0xff;
            b = Math.imul(255, b) / a & 0xff;
            return a << 24 | r << 16 | g << 8 | b;
        }
        ColorUtilities.unpremultiplyARGB = unpremultiplyARGB;
        function premultiplyARGB(uARGB) {
            var b = (uARGB >> 0) & 0xff;
            var g = (uARGB >> 8) & 0xff;
            var r = (uARGB >> 16) & 0xff;
            var a = (uARGB >> 24) & 0xff;
            r = ((Math.imul(r, a) + 127) / 255) | 0;
            g = ((Math.imul(g, a) + 127) / 255) | 0;
            b = ((Math.imul(b, a) + 127) / 255) | 0;
            return a << 24 | r << 16 | g << 8 | b;
        }
        ColorUtilities.premultiplyARGB = premultiplyARGB;
        var premultiplyTable;
        var unpremultiplyTable;
        function ensureUnpremultiplyTable() {
            if (!unpremultiplyTable) {
                unpremultiplyTable = new Uint8Array(256 * 256);
                for (var c = 0; c < 256; c++) {
                    for (var a = 0; a < 256; a++) {
                        unpremultiplyTable[(a << 8) + c] = Math.imul(255, c) / a;
                    }
                }
            }
        }
        ColorUtilities.ensureUnpremultiplyTable = ensureUnpremultiplyTable;
        function tableLookupUnpremultiplyARGB(pARGB) {
            pARGB = pARGB | 0;
            var a = (pARGB >> 24) & 0xff;
            if (a === 0) {
                return 0;
            }
            else if (a === 0xff) {
                return pARGB;
            }
            var b = (pARGB >> 0) & 0xff;
            var g = (pARGB >> 8) & 0xff;
            var r = (pARGB >> 16) & 0xff;
            var o = a << 8;
            var T = unpremultiplyTable;
            r = T[o + r];
            g = T[o + g];
            b = T[o + b];
            return a << 24 | r << 16 | g << 8 | b;
        }
        ColorUtilities.tableLookupUnpremultiplyARGB = tableLookupUnpremultiplyARGB;
        function blendPremultipliedBGRA(tpBGRA, spBGRA) {
            var sA = spBGRA & 0xff;
            var sGA = spBGRA & 0x00ff00ff;
            var sBR = spBGRA >> 8 & 0x00ff00ff;
            var tGA = tpBGRA & 0x00ff00ff;
            var tBR = tpBGRA >> 8 & 0x00ff00ff;
            var A = 256 - sA;
            tGA = Math.imul(tGA, A) >> 8;
            tBR = Math.imul(tBR, A) >> 8;
            return ((sBR + tBR & 0x00ff00ff) << 8) | (sGA + tGA & 0x00ff00ff);
        }
        ColorUtilities.blendPremultipliedBGRA = blendPremultipliedBGRA;
        var swap32 = IntegerUtilities.swap32;
        function convertImage(sourceFormat, targetFormat, source, target) {
            if (source !== target) {
                release || Debug.assert(source.buffer !== target.buffer, "Can't handle overlapping views.");
            }
            var length = source.length;
            if (sourceFormat === targetFormat) {
                if (source === target) {
                    return;
                }
                for (var i = 0; i < length; i++) {
                    target[i] = source[i];
                }
                return;
            }
            if (sourceFormat === 1 /* PremultipliedAlphaARGB */ && targetFormat === 3 /* StraightAlphaRGBA */) {
                Shumway.ColorUtilities.ensureUnpremultiplyTable();
                for (var i = 0; i < length; i++) {
                    var pBGRA = source[i];
                    var a = pBGRA & 0xff;
                    if (a === 0) {
                        target[i] = 0;
                    }
                    else if (a === 0xff) {
                        target[i] = 0xff000000 | ((pBGRA >> 8) & 0x00ffffff);
                    }
                    else {
                        var b = (pBGRA >> 24) & 0xff;
                        var g = (pBGRA >> 16) & 0xff;
                        var r = (pBGRA >> 8) & 0xff;
                        var o = a << 8;
                        var T = unpremultiplyTable;
                        r = T[o + r];
                        g = T[o + g];
                        b = T[o + b];
                        target[i] = a << 24 | b << 16 | g << 8 | r;
                    }
                }
            }
            else if (sourceFormat === 2 /* StraightAlphaARGB */ && targetFormat === 3 /* StraightAlphaRGBA */) {
                for (var i = 0; i < length; i++) {
                    target[i] = swap32(source[i]);
                }
            }
            else if (sourceFormat === 3 /* StraightAlphaRGBA */ && targetFormat === 1 /* PremultipliedAlphaARGB */) {
                for (var i = 0; i < length; i++) {
                    var uABGR = source[i];
                    var uARGB = (uABGR & 0xFF00FF00) | (uABGR >> 16) & 0xff | (uABGR & 0xff) << 16;
                    target[i] = swap32(premultiplyARGB(uARGB));
                }
            }
            else {
                Debug.somewhatImplemented("Image Format Conversion: " + ImageType[sourceFormat] + " -> " + ImageType[targetFormat]);
                for (var i = 0; i < length; i++) {
                    target[i] = source[i];
                }
            }
        }
        ColorUtilities.convertImage = convertImage;
    })(ColorUtilities = Shumway.ColorUtilities || (Shumway.ColorUtilities = {}));
    var ArrayBufferPool = (function () {
        function ArrayBufferPool(maxSize) {
            if (maxSize === void 0) { maxSize = 32; }
            this._list = [];
            this._maxSize = maxSize;
        }
        ArrayBufferPool.prototype.acquire = function (length) {
            if (ArrayBufferPool._enabled) {
                var list = this._list;
                for (var i = 0; i < list.length; i++) {
                    var buffer = list[i];
                    if (buffer.byteLength >= length) {
                        list.splice(i, 1);
                        return buffer;
                    }
                }
            }
            return new ArrayBuffer(length);
        };
        ArrayBufferPool.prototype.release = function (buffer) {
            if (ArrayBufferPool._enabled) {
                var list = this._list;
                release || Debug.assert(ArrayUtilities.indexOf(list, buffer) < 0);
                if (list.length === this._maxSize) {
                    list.shift();
                }
                list.push(buffer);
            }
        };
        ArrayBufferPool.prototype.ensureUint8ArrayLength = function (array, length) {
            if (array.length >= length) {
                return array;
            }
            var newLength = Math.max(array.length + length, ((array.length * 3) >> 1) + 1);
            var newArray = new Uint8Array(this.acquire(newLength), 0, newLength);
            newArray.set(array);
            this.release(array.buffer);
            return newArray;
        };
        ArrayBufferPool.prototype.ensureFloat64ArrayLength = function (array, length) {
            if (array.length >= length) {
                return array;
            }
            var newLength = Math.max(array.length + length, ((array.length * 3) >> 1) + 1);
            var newArray = new Float64Array(this.acquire(newLength * Float64Array.BYTES_PER_ELEMENT), 0, newLength);
            newArray.set(array);
            this.release(array.buffer);
            return newArray;
        };
        ArrayBufferPool._enabled = true;
        return ArrayBufferPool;
    })();
    Shumway.ArrayBufferPool = ArrayBufferPool;
    var Telemetry;
    (function (Telemetry) {
        (function (Feature) {
            Feature[Feature["EXTERNAL_INTERFACE_FEATURE"] = 1] = "EXTERNAL_INTERFACE_FEATURE";
            Feature[Feature["CLIPBOARD_FEATURE"] = 2] = "CLIPBOARD_FEATURE";
            Feature[Feature["SHAREDOBJECT_FEATURE"] = 3] = "SHAREDOBJECT_FEATURE";
            Feature[Feature["VIDEO_FEATURE"] = 4] = "VIDEO_FEATURE";
            Feature[Feature["SOUND_FEATURE"] = 5] = "SOUND_FEATURE";
            Feature[Feature["NETCONNECTION_FEATURE"] = 6] = "NETCONNECTION_FEATURE";
        })(Telemetry.Feature || (Telemetry.Feature = {}));
        var Feature = Telemetry.Feature;
        (function (ErrorTypes) {
            ErrorTypes[ErrorTypes["AVM1_ERROR"] = 1] = "AVM1_ERROR";
            ErrorTypes[ErrorTypes["AVM2_ERROR"] = 2] = "AVM2_ERROR";
        })(Telemetry.ErrorTypes || (Telemetry.ErrorTypes = {}));
        var ErrorTypes = Telemetry.ErrorTypes;
        Telemetry.instance;
    })(Telemetry = Shumway.Telemetry || (Shumway.Telemetry = {}));
    var FileLoadingService;
    (function (FileLoadingService) {
        FileLoadingService.instance;
    })(FileLoadingService = Shumway.FileLoadingService || (Shumway.FileLoadingService = {}));
    function registerCSSFont(id, buffer, forceFontInit) {
        if (!inBrowser) {
            Debug.warning('Cannot register CSS font outside the browser');
            return;
        }
        var head = document.head;
        head.insertBefore(document.createElement('style'), head.firstChild);
        var style = document.styleSheets[0];
        var rule = '@font-face{font-family:swffont' + id + ';src:url(data:font/opentype;base64,' + Shumway.StringUtilities.base64ArrayBuffer(buffer) + ')' + '}';
        style.insertRule(rule, style.cssRules.length);
        if (forceFontInit) {
            var node = document.createElement('div');
            node.style.fontFamily = 'swffont' + id;
            node.innerHTML = 'hello';
            document.body.appendChild(node);
            var dummyHeight = node.clientHeight;
            document.body.removeChild(node);
        }
    }
    Shumway.registerCSSFont = registerCSSFont;
    var ExternalInterfaceService;
    (function (ExternalInterfaceService) {
        ExternalInterfaceService.instance = {
            enabled: false,
            initJS: function (callback) {
            },
            registerCallback: function (functionName) {
            },
            unregisterCallback: function (functionName) {
            },
            eval: function (expression) {
            },
            call: function (request) {
            },
            getId: function () {
                return null;
            }
        };
    })(ExternalInterfaceService = Shumway.ExternalInterfaceService || (Shumway.ExternalInterfaceService = {}));
    var ClipboardService = (function () {
        function ClipboardService() {
        }
        ClipboardService.prototype.setClipboard = function (data) {
            Debug.abstractMethod("public ClipboardService::setClipboard");
        };
        ClipboardService.instance = null;
        return ClipboardService;
    })();
    Shumway.ClipboardService = ClipboardService;
    var Callback = (function () {
        function Callback() {
            this._queues = {};
        }
        Callback.prototype.register = function (type, callback) {
            Debug.assert(type);
            Debug.assert(callback);
            var queue = this._queues[type];
            if (queue) {
                if (queue.indexOf(callback) > -1) {
                    return;
                }
            }
            else {
                queue = this._queues[type] = [];
            }
            queue.push(callback);
        };
        Callback.prototype.unregister = function (type, callback) {
            Debug.assert(type);
            Debug.assert(callback);
            var queue = this._queues[type];
            if (!queue) {
                return;
            }
            var i = queue.indexOf(callback);
            if (i !== -1) {
                queue.splice(i, 1);
            }
            if (queue.length === 0) {
                this._queues[type] = null;
            }
        };
        Callback.prototype.notify = function (type, args) {
            var queue = this._queues[type];
            if (!queue) {
                return;
            }
            queue = queue.slice();
            var args = Array.prototype.slice.call(arguments, 0);
            for (var i = 0; i < queue.length; i++) {
                var callback = queue[i];
                callback.apply(null, args);
            }
        };
        Callback.prototype.notify1 = function (type, value) {
            var queue = this._queues[type];
            if (!queue) {
                return;
            }
            queue = queue.slice();
            for (var i = 0; i < queue.length; i++) {
                var callback = queue[i];
                callback(type, value);
            }
        };
        return Callback;
    })();
    Shumway.Callback = Callback;
    (function (ImageType) {
        ImageType[ImageType["None"] = 0] = "None";
        ImageType[ImageType["PremultipliedAlphaARGB"] = 1] = "PremultipliedAlphaARGB";
        ImageType[ImageType["StraightAlphaARGB"] = 2] = "StraightAlphaARGB";
        ImageType[ImageType["StraightAlphaRGBA"] = 3] = "StraightAlphaRGBA";
        ImageType[ImageType["JPEG"] = 4] = "JPEG";
        ImageType[ImageType["PNG"] = 5] = "PNG";
        ImageType[ImageType["GIF"] = 6] = "GIF";
    })(Shumway.ImageType || (Shumway.ImageType = {}));
    var ImageType = Shumway.ImageType;
    function getMIMETypeForImageType(type) {
        switch (type) {
            case 4 /* JPEG */:
                return "image/jpeg";
            case 5 /* PNG */:
                return "image/png";
            case 6 /* GIF */:
                return "image/gif";
            default:
                return "text/plain";
        }
    }
    Shumway.getMIMETypeForImageType = getMIMETypeForImageType;
    var UI;
    (function (UI) {
        function toCSSCursor(mouseCursor) {
            switch (mouseCursor) {
                case 0:
                    return 'auto';
                case 2:
                    return 'pointer';
                case 3:
                    return 'grab';
                case 4:
                    return 'text';
                case 1:
                default:
                    return 'default';
            }
        }
        UI.toCSSCursor = toCSSCursor;
    })(UI = Shumway.UI || (Shumway.UI = {}));
    var PromiseWrapper = (function () {
        function PromiseWrapper() {
            this.promise = new Promise(function (resolve, reject) {
                this.resolve = resolve;
                this.reject = reject;
            }.bind(this));
        }
        PromiseWrapper.prototype.then = function (onFulfilled, onRejected) {
            return this.promise.then(onFulfilled, onRejected);
        };
        return PromiseWrapper;
    })();
    Shumway.PromiseWrapper = PromiseWrapper;
})(Shumway || (Shumway = {}));
(function PromiseClosure() {
    var global = Function("return this")();
    if (global.Promise) {
        if (typeof global.Promise.all !== 'function') {
            global.Promise.all = function (iterable) {
                var count = 0, results = [], resolve, reject;
                var promise = new global.Promise(function (resolve_, reject_) {
                    resolve = resolve_;
                    reject = reject_;
                });
                iterable.forEach(function (p, i) {
                    count++;
                    p.then(function (result) {
                        results[i] = result;
                        count--;
                        if (count === 0) {
                            resolve(results);
                        }
                    }, reject);
                });
                if (count === 0) {
                    resolve(results);
                }
                return promise;
            };
        }
        if (typeof global.Promise.resolve !== 'function') {
            global.Promise.resolve = function (x) {
                return new global.Promise(function (resolve) {
                    resolve(x);
                });
            };
        }
        return;
    }
    function getDeferred(C) {
        if (typeof C !== 'function') {
            throw new TypeError('Invalid deferred constructor');
        }
        var resolver = createDeferredConstructionFunctions();
        var promise = new C(resolver);
        var resolve = resolver.resolve;
        if (typeof resolve !== 'function') {
            throw new TypeError('Invalid resolve construction function');
        }
        var reject = resolver.reject;
        if (typeof reject !== 'function') {
            throw new TypeError('Invalid reject construction function');
        }
        return { promise: promise, resolve: resolve, reject: reject };
    }
    function updateDeferredFromPotentialThenable(x, deferred) {
        if (typeof x !== 'object' || x === null) {
            return false;
        }
        try {
            var then = x.then;
            if (typeof then !== 'function') {
                return false;
            }
            var thenCallResult = then.call(x, deferred.resolve, deferred.reject);
        }
        catch (e) {
            var reject = deferred.reject;
            reject(e);
        }
        return true;
    }
    function isPromise(x) {
        return typeof x === 'object' && x !== null && typeof x.promiseStatus !== 'undefined';
    }
    function rejectPromise(promise, reason) {
        if (promise.promiseStatus !== 'unresolved') {
            return;
        }
        var reactions = promise.rejectReactions;
        promise.result = reason;
        promise.resolveReactions = undefined;
        promise.rejectReactions = undefined;
        promise.promiseStatus = 'has-rejection';
        triggerPromiseReactions(reactions, reason);
    }
    function resolvePromise(promise, resolution) {
        if (promise.promiseStatus !== 'unresolved') {
            return;
        }
        var reactions = promise.resolveReactions;
        promise.result = resolution;
        promise.resolveReactions = undefined;
        promise.rejectReactions = undefined;
        promise.promiseStatus = 'has-resolution';
        triggerPromiseReactions(reactions, resolution);
    }
    function triggerPromiseReactions(reactions, argument) {
        for (var i = 0; i < reactions.length; i++) {
            queueMicrotask({ reaction: reactions[i], argument: argument });
        }
    }
    function queueMicrotask(task) {
        if (microtasksQueue.length === 0) {
            setTimeout(handleMicrotasksQueue, 0);
        }
        microtasksQueue.push(task);
    }
    function executePromiseReaction(reaction, argument) {
        var deferred = reaction.deferred;
        var handler = reaction.handler;
        var handlerResult, updateResult;
        try {
            handlerResult = handler(argument);
        }
        catch (e) {
            var reject = deferred.reject;
            return reject(e);
        }
        if (handlerResult === deferred.promise) {
            var reject = deferred.reject;
            return reject(new TypeError('Self resolution'));
        }
        try {
            updateResult = updateDeferredFromPotentialThenable(handlerResult, deferred);
            if (!updateResult) {
                var resolve = deferred.resolve;
                return resolve(handlerResult);
            }
        }
        catch (e) {
            var reject = deferred.reject;
            return reject(e);
        }
    }
    var microtasksQueue = [];
    function handleMicrotasksQueue() {
        while (microtasksQueue.length > 0) {
            var task = microtasksQueue[0];
            try {
                executePromiseReaction(task.reaction, task.argument);
            }
            catch (e) {
                if (typeof Promise.onerror === 'function') {
                    Promise.onerror(e);
                }
            }
            microtasksQueue.shift();
        }
    }
    function throwerFunction(e) {
        throw e;
    }
    function identityFunction(x) {
        return x;
    }
    function createRejectPromiseFunction(promise) {
        return function (reason) {
            rejectPromise(promise, reason);
        };
    }
    function createResolvePromiseFunction(promise) {
        return function (resolution) {
            resolvePromise(promise, resolution);
        };
    }
    function createDeferredConstructionFunctions() {
        var fn = function (resolve, reject) {
            fn.resolve = resolve;
            fn.reject = reject;
        };
        return fn;
    }
    function createPromiseResolutionHandlerFunctions(promise, fulfillmentHandler, rejectionHandler) {
        return function (x) {
            if (x === promise) {
                return rejectionHandler(new TypeError('Self resolution'));
            }
            var cstr = promise.promiseConstructor;
            if (isPromise(x)) {
                var xConstructor = x.promiseConstructor;
                if (xConstructor === cstr) {
                    return x.then(fulfillmentHandler, rejectionHandler);
                }
            }
            var deferred = getDeferred(cstr);
            var updateResult = updateDeferredFromPotentialThenable(x, deferred);
            if (updateResult) {
                var deferredPromise = deferred.promise;
                return deferredPromise.then(fulfillmentHandler, rejectionHandler);
            }
            return fulfillmentHandler(x);
        };
    }
    function createPromiseAllCountdownFunction(index, values, deferred, countdownHolder) {
        return function (x) {
            values[index] = x;
            countdownHolder.countdown--;
            if (countdownHolder.countdown === 0) {
                deferred.resolve(values);
            }
        };
    }
    function Promise(resolver) {
        if (typeof resolver !== 'function') {
            throw new TypeError('resolver is not a function');
        }
        var promise = this;
        if (typeof promise !== 'object') {
            throw new TypeError('Promise to initialize is not an object');
        }
        promise.promiseStatus = 'unresolved';
        promise.resolveReactions = [];
        promise.rejectReactions = [];
        promise.result = undefined;
        var resolve = createResolvePromiseFunction(promise);
        var reject = createRejectPromiseFunction(promise);
        try {
            var result = resolver(resolve, reject);
        }
        catch (e) {
            rejectPromise(promise, e);
        }
        promise.promiseConstructor = Promise;
        return promise;
    }
    Promise.all = function (iterable) {
        var deferred = getDeferred(this);
        var values = [];
        var countdownHolder = { countdown: 0 };
        var index = 0;
        iterable.forEach(function (nextValue) {
            var nextPromise = this.cast(nextValue);
            var fn = createPromiseAllCountdownFunction(index, values, deferred, countdownHolder);
            nextPromise.then(fn, deferred.reject);
            index++;
            countdownHolder.countdown++;
        }, this);
        if (index === 0) {
            deferred.resolve(values);
        }
        return deferred.promise;
    };
    Promise.cast = function (x) {
        if (isPromise(x)) {
            return x;
        }
        var deferred = getDeferred(this);
        deferred.resolve(x);
        return deferred.promise;
    };
    Promise.reject = function (r) {
        var deferred = getDeferred(this);
        var rejectResult = deferred.reject(r);
        return deferred.promise;
    };
    Promise.resolve = function (x) {
        var deferred = getDeferred(this);
        var rejectResult = deferred.resolve(x);
        return deferred.promise;
    };
    Promise.prototype = {
        'catch': function (onRejected) {
            this.then(undefined, onRejected);
        },
        then: function (onFulfilled, onRejected) {
            var promise = this;
            if (!isPromise(promise)) {
                throw new TypeError('this is not a Promises');
            }
            var cstr = promise.promiseConstructor;
            var deferred = getDeferred(cstr);
            var rejectionHandler = typeof onRejected === 'function' ? onRejected : throwerFunction;
            var fulfillmentHandler = typeof onFulfilled === 'function' ? onFulfilled : identityFunction;
            var resolutionHandler = createPromiseResolutionHandlerFunctions(promise, fulfillmentHandler, rejectionHandler);
            var resolveReaction = { deferred: deferred, handler: resolutionHandler };
            var rejectReaction = { deferred: deferred, handler: rejectionHandler };
            switch (promise.promiseStatus) {
                case 'unresolved':
                    promise.resolveReactions.push(resolveReaction);
                    promise.rejectReactions.push(rejectReaction);
                    break;
                case 'has-resolution':
                    var resolution = promise.result;
                    queueMicrotask({ reaction: resolveReaction, argument: resolution });
                    break;
                case 'has-rejection':
                    var rejection = promise.result;
                    queueMicrotask({ reaction: rejectReaction, argument: rejection });
                    break;
            }
            return deferred.promise;
        }
    };
    global.Promise = Promise;
})();
if (typeof exports !== "undefined") {
    exports["Shumway"] = Shumway;
}
(function () {
    function extendBuiltin(prototype, property, value) {
        if (!prototype[property]) {
            Object.defineProperty(prototype, property, { value: value, writable: true, configurable: true, enumerable: false });
        }
    }
    function removeColors(s) {
        return s.replace(/\033\[[0-9]*m/g, "");
    }
    extendBuiltin(String.prototype, "padRight", function (c, n) {
        var str = this;
        var length = removeColors(str).length;
        if (!c || length >= n) {
            return str;
        }
        var max = (n - length) / c.length;
        for (var i = 0; i < max; i++) {
            str += c;
        }
        return str;
    });
    extendBuiltin(String.prototype, "padLeft", function (c, n) {
        var str = this;
        var length = str.length;
        if (!c || length >= n) {
            return str;
        }
        var max = (n - length) / c.length;
        for (var i = 0; i < max; i++) {
            str = c + str;
        }
        return str;
    });
    extendBuiltin(String.prototype, "trim", function () {
        return this.replace(/^\s+|\s+$/g, "");
    });
    extendBuiltin(String.prototype, "endsWith", function (str) {
        return this.indexOf(str, this.length - str.length) !== -1;
    });
    extendBuiltin(Array.prototype, "replace", function (x, y) {
        if (x === y) {
            return 0;
        }
        var count = 0;
        for (var i = 0; i < this.length; i++) {
            if (this[i] === x) {
                this[i] = y;
                count++;
            }
        }
        return count;
    });
})();
var Shumway;
(function (Shumway) {
    var Options;
    (function (Options) {
        var isObject = Shumway.isObject;
        var assert = Shumway.Debug.assert;
        var Argument = (function () {
            function Argument(shortName, longName, type, options) {
                this.shortName = shortName;
                this.longName = longName;
                this.type = type;
                options = options || {};
                this.positional = options.positional;
                this.parseFn = options.parse;
                this.value = options.defaultValue;
            }
            Argument.prototype.parse = function (value) {
                if (this.type === "boolean") {
                    release || assert(typeof value === "boolean");
                    this.value = value;
                }
                else if (this.type === "number") {
                    release || assert(!isNaN(value), value + " is not a number");
                    this.value = parseInt(value, 10);
                }
                else {
                    this.value = value;
                }
                if (this.parseFn) {
                    this.parseFn(this.value);
                }
            };
            return Argument;
        })();
        Options.Argument = Argument;
        var ArgumentParser = (function () {
            function ArgumentParser() {
                this.args = [];
            }
            ArgumentParser.prototype.addArgument = function (shortName, longName, type, options) {
                var argument = new Argument(shortName, longName, type, options);
                this.args.push(argument);
                return argument;
            };
            ArgumentParser.prototype.addBoundOption = function (option) {
                var options = { parse: function (x) {
                    option.value = x;
                } };
                this.args.push(new Argument(option.shortName, option.longName, option.type, options));
            };
            ArgumentParser.prototype.addBoundOptionSet = function (optionSet) {
                var self = this;
                optionSet.options.forEach(function (x) {
                    if (x instanceof OptionSet) {
                        self.addBoundOptionSet(x);
                    }
                    else {
                        release || assert(x instanceof Option);
                        self.addBoundOption(x);
                    }
                });
            };
            ArgumentParser.prototype.getUsage = function () {
                var str = "";
                this.args.forEach(function (x) {
                    if (!x.positional) {
                        str += "[-" + x.shortName + "|--" + x.longName + (x.type === "boolean" ? "" : " " + x.type[0].toUpperCase()) + "]";
                    }
                    else {
                        str += x.longName;
                    }
                    str += " ";
                });
                return str;
            };
            ArgumentParser.prototype.parse = function (args) {
                var nonPositionalArgumentMap = {};
                var positionalArgumentList = [];
                this.args.forEach(function (x) {
                    if (x.positional) {
                        positionalArgumentList.push(x);
                    }
                    else {
                        nonPositionalArgumentMap["-" + x.shortName] = x;
                        nonPositionalArgumentMap["--" + x.longName] = x;
                    }
                });
                var leftoverArguments = [];
                while (args.length) {
                    var argString = args.shift();
                    var argument = null, value = argString;
                    if (argString == '--') {
                        leftoverArguments = leftoverArguments.concat(args);
                        break;
                    }
                    else if (argString.slice(0, 1) == '-' || argString.slice(0, 2) == '--') {
                        argument = nonPositionalArgumentMap[argString];
                        if (!argument) {
                            continue;
                        }
                        if (argument.type !== "boolean") {
                            value = args.shift();
                            release || assert(value !== "-" && value !== "--", "Argument " + argString + " must have a value.");
                        }
                        else {
                            value = true;
                        }
                    }
                    else if (positionalArgumentList.length) {
                        argument = positionalArgumentList.shift();
                    }
                    else {
                        leftoverArguments.push(value);
                    }
                    if (argument) {
                        argument.parse(value);
                    }
                }
                release || assert(positionalArgumentList.length === 0, "Missing positional arguments.");
                return leftoverArguments;
            };
            return ArgumentParser;
        })();
        Options.ArgumentParser = ArgumentParser;
        var OptionSet = (function () {
            function OptionSet(name, settings) {
                if (settings === void 0) { settings = null; }
                this.open = false;
                this.name = name;
                this.settings = settings || {};
                this.options = [];
            }
            OptionSet.prototype.register = function (option) {
                if (option instanceof OptionSet) {
                    for (var i = 0; i < this.options.length; i++) {
                        var optionSet = this.options[i];
                        if (optionSet instanceof OptionSet && optionSet.name === option.name) {
                            return optionSet;
                        }
                    }
                }
                this.options.push(option);
                if (this.settings) {
                    if (option instanceof OptionSet) {
                        var optionSettings = this.settings[option.name];
                        if (isObject(optionSettings)) {
                            option.settings = optionSettings.settings;
                            option.open = optionSettings.open;
                        }
                    }
                    else {
                        if (typeof this.settings[option.longName] !== "undefined") {
                            switch (option.type) {
                                case "boolean":
                                    option.value = !!this.settings[option.longName];
                                    break;
                                case "number":
                                    option.value = +this.settings[option.longName];
                                    break;
                                default:
                                    option.value = this.settings[option.longName];
                                    break;
                            }
                        }
                    }
                }
                return option;
            };
            OptionSet.prototype.trace = function (writer) {
                writer.enter(this.name + " {");
                this.options.forEach(function (option) {
                    option.trace(writer);
                });
                writer.leave("}");
            };
            OptionSet.prototype.getSettings = function () {
                var settings = {};
                this.options.forEach(function (option) {
                    if (option instanceof OptionSet) {
                        settings[option.name] = {
                            settings: option.getSettings(),
                            open: option.open
                        };
                    }
                    else {
                        settings[option.longName] = option.value;
                    }
                });
                return settings;
            };
            OptionSet.prototype.setSettings = function (settings) {
                if (!settings) {
                    return;
                }
                this.options.forEach(function (option) {
                    if (option instanceof OptionSet) {
                        if (option.name in settings) {
                            option.setSettings(settings[option.name].settings);
                        }
                    }
                    else {
                        if (option.longName in settings) {
                            option.value = settings[option.longName];
                        }
                    }
                });
            };
            return OptionSet;
        })();
        Options.OptionSet = OptionSet;
        var Option = (function () {
            function Option(shortName, longName, type, defaultValue, description, config) {
                if (config === void 0) { config = null; }
                this.longName = longName;
                this.shortName = shortName;
                this.type = type;
                this.defaultValue = defaultValue;
                this.value = defaultValue;
                this.description = description;
                this.config = config;
            }
            Option.prototype.parse = function (value) {
                this.value = value;
            };
            Option.prototype.trace = function (writer) {
                writer.writeLn(("-" + this.shortName + "|--" + this.longName).padRight(" ", 30) + " = " + this.type + " " + this.value + " [" + this.defaultValue + "]" + " (" + this.description + ")");
            };
            return Option;
        })();
        Options.Option = Option;
    })(Options = Shumway.Options || (Shumway.Options = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Settings;
    (function (Settings) {
        Settings.ROOT = "Shumway Options";
        Settings.shumwayOptions = new Shumway.Options.OptionSet(Settings.ROOT, load());
        function isStorageSupported() {
            try {
                return typeof window !== 'undefined' && "localStorage" in window && window["localStorage"] !== null;
            }
            catch (e) {
                return false;
            }
        }
        Settings.isStorageSupported = isStorageSupported;
        function load(key) {
            if (key === void 0) { key = Settings.ROOT; }
            var settings = {};
            if (isStorageSupported()) {
                var lsValue = window.localStorage[key];
                if (lsValue) {
                    try {
                        settings = JSON.parse(lsValue);
                    }
                    catch (e) {
                    }
                }
            }
            return settings;
        }
        Settings.load = load;
        function save(settings, key) {
            if (settings === void 0) { settings = null; }
            if (key === void 0) { key = Settings.ROOT; }
            if (isStorageSupported()) {
                try {
                    window.localStorage[key] = JSON.stringify(settings ? settings : Settings.shumwayOptions.getSettings());
                }
                catch (e) {
                }
            }
        }
        Settings.save = save;
        function setSettings(settings) {
            Settings.shumwayOptions.setSettings(settings);
        }
        Settings.setSettings = setSettings;
        function getSettings(settings) {
            return Settings.shumwayOptions.getSettings();
        }
        Settings.getSettings = getSettings;
    })(Settings = Shumway.Settings || (Shumway.Settings = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Metrics;
    (function (Metrics) {
        var Timer = (function () {
            function Timer(parent, name) {
                this._parent = parent;
                this._timers = Shumway.ObjectUtilities.createMap();
                this._name = name;
                this._begin = 0;
                this._last = 0;
                this._total = 0;
                this._count = 0;
            }
            Timer.time = function (name, fn) {
                Timer.start(name);
                fn();
                Timer.stop();
            };
            Timer.start = function (name) {
                Timer._top = Timer._top._timers[name] || (Timer._top._timers[name] = new Timer(Timer._top, name));
                Timer._top.start();
                var tmp = Timer._flat._timers[name] || (Timer._flat._timers[name] = new Timer(Timer._flat, name));
                tmp.start();
                Timer._flatStack.push(tmp);
            };
            Timer.stop = function () {
                Timer._top.stop();
                Timer._top = Timer._top._parent;
                Timer._flatStack.pop().stop();
            };
            Timer.stopStart = function (name) {
                Timer.stop();
                Timer.start(name);
            };
            Timer.prototype.start = function () {
                this._begin = Shumway.getTicks();
            };
            Timer.prototype.stop = function () {
                this._last = Shumway.getTicks() - this._begin;
                this._total += this._last;
                this._count += 1;
            };
            Timer.prototype.toJSON = function () {
                return { name: this._name, total: this._total, timers: this._timers };
            };
            Timer.prototype.trace = function (writer) {
                writer.enter(this._name + ": " + this._total.toFixed(2) + " ms" + ", count: " + this._count + ", average: " + (this._total / this._count).toFixed(2) + " ms");
                for (var name in this._timers) {
                    this._timers[name].trace(writer);
                }
                writer.outdent();
            };
            Timer.trace = function (writer) {
                Timer._base.trace(writer);
                Timer._flat.trace(writer);
            };
            Timer._base = new Timer(null, "Total");
            Timer._top = Timer._base;
            Timer._flat = new Timer(null, "Flat");
            Timer._flatStack = [];
            return Timer;
        })();
        Metrics.Timer = Timer;
        var Counter = (function () {
            function Counter(enabled) {
                this._enabled = enabled;
                this.clear();
            }
            Object.defineProperty(Counter.prototype, "counts", {
                get: function () {
                    return this._counts;
                },
                enumerable: true,
                configurable: true
            });
            Counter.prototype.setEnabled = function (enabled) {
                this._enabled = enabled;
            };
            Counter.prototype.clear = function () {
                this._counts = Shumway.ObjectUtilities.createMap();
                this._times = Shumway.ObjectUtilities.createMap();
            };
            Counter.prototype.toJSON = function () {
                return {
                    counts: this._counts,
                    times: this._times
                };
            };
            Counter.prototype.count = function (name, increment, time) {
                if (increment === void 0) { increment = 1; }
                if (time === void 0) { time = 0; }
                if (!this._enabled) {
                    return;
                }
                if (this._counts[name] === undefined) {
                    this._counts[name] = 0;
                    this._times[name] = 0;
                }
                this._counts[name] += increment;
                this._times[name] += time;
                return this._counts[name];
            };
            Counter.prototype.trace = function (writer) {
                for (var name in this._counts) {
                    writer.writeLn(name + ": " + this._counts[name]);
                }
            };
            Counter.prototype._pairToString = function (times, pair) {
                var name = pair[0];
                var count = pair[1];
                var time = times[name];
                var line = name + ": " + count;
                if (time) {
                    line += ", " + time.toFixed(4);
                    if (count > 1) {
                        line += " (" + (time / count).toFixed(4) + ")";
                    }
                }
                return line;
            };
            Counter.prototype.toStringSorted = function () {
                var self = this;
                var times = this._times;
                var pairs = [];
                for (var name in this._counts) {
                    pairs.push([name, this._counts[name]]);
                }
                pairs.sort(function (a, b) {
                    return b[1] - a[1];
                });
                return (pairs.map(function (pair) {
                    return self._pairToString(times, pair);
                }).join(", "));
            };
            Counter.prototype.traceSorted = function (writer, inline) {
                if (inline === void 0) { inline = false; }
                var self = this;
                var times = this._times;
                var pairs = [];
                for (var name in this._counts) {
                    pairs.push([name, this._counts[name]]);
                }
                pairs.sort(function (a, b) {
                    return b[1] - a[1];
                });
                if (inline) {
                    writer.writeLn(pairs.map(function (pair) {
                        return self._pairToString(times, pair);
                    }).join(", "));
                }
                else {
                    pairs.forEach(function (pair) {
                        writer.writeLn(self._pairToString(times, pair));
                    });
                }
            };
            Counter.instance = new Counter(true);
            return Counter;
        })();
        Metrics.Counter = Counter;
        var Average = (function () {
            function Average(max) {
                this._samples = new Float64Array(max);
                this._count = 0;
                this._index = 0;
            }
            Average.prototype.push = function (sample) {
                if (this._count < this._samples.length) {
                    this._count++;
                }
                this._index++;
                this._samples[this._index % this._samples.length] = sample;
            };
            Average.prototype.average = function () {
                var sum = 0;
                for (var i = 0; i < this._count; i++) {
                    sum += this._samples[i];
                }
                return sum / this._count;
            };
            return Average;
        })();
        Metrics.Average = Average;
    })(Metrics = Shumway.Metrics || (Shumway.Metrics = {}));
})(Shumway || (Shumway = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var Shumway;
(function (Shumway) {
    var ArrayUtilities;
    (function (ArrayUtilities) {
        var InflateState;
        (function (InflateState) {
            InflateState[InflateState["INIT"] = 0] = "INIT";
            InflateState[InflateState["BLOCK_0"] = 1] = "BLOCK_0";
            InflateState[InflateState["BLOCK_1"] = 2] = "BLOCK_1";
            InflateState[InflateState["BLOCK_2_PRE"] = 3] = "BLOCK_2_PRE";
            InflateState[InflateState["BLOCK_2"] = 4] = "BLOCK_2";
            InflateState[InflateState["DONE"] = 5] = "DONE";
            InflateState[InflateState["ERROR"] = 6] = "ERROR";
            InflateState[InflateState["VERIFY_HEADER"] = 7] = "VERIFY_HEADER";
        })(InflateState || (InflateState = {}));
        var WINDOW_SIZE = 32768;
        var WINDOW_SHIFT_POSITION = 65536;
        var MAX_WINDOW_SIZE = WINDOW_SHIFT_POSITION + 258;
        var Inflate = (function () {
            function Inflate(verifyHeader) {
            }
            Inflate.prototype.push = function (data) {
                Shumway.Debug.abstractMethod('Inflate.push');
            };
            Inflate.prototype.close = function () {
            };
            Inflate.create = function (verifyHeader) {
                if (typeof SpecialInflate !== 'undefined') {
                    return new SpecialInflateAdapter(verifyHeader);
                }
                return new BasicInflate(verifyHeader);
            };
            Inflate.prototype._processZLibHeader = function (buffer, start, end) {
                var ZLIB_HEADER_SIZE = 2;
                if (start + ZLIB_HEADER_SIZE > end) {
                    return 0;
                }
                var header = (buffer[start] << 8) | buffer[start + 1];
                var error = null;
                if ((header & 0x0f00) !== 0x0800) {
                    error = 'inflate: unknown compression method';
                }
                else if ((header % 31) !== 0) {
                    error = 'inflate: bad FCHECK';
                }
                else if ((header & 0x20) !== 0) {
                    error = 'inflate: FDICT bit set';
                }
                if (error) {
                    if (this.onError) {
                        this.onError(error);
                    }
                    return -1;
                }
                else {
                    return ZLIB_HEADER_SIZE;
                }
            };
            Inflate.inflate = function (data, expectedLength, zlibHeader) {
                var output = new Uint8Array(expectedLength);
                var position = 0;
                var inflate = Inflate.create(zlibHeader);
                inflate.onData = function (data) {
                    output.set(data, position);
                    position += data.length;
                };
                inflate.push(data);
                inflate.close();
                return output;
            };
            return Inflate;
        })();
        ArrayUtilities.Inflate = Inflate;
        var BasicInflate = (function (_super) {
            __extends(BasicInflate, _super);
            function BasicInflate(verifyHeader) {
                _super.call(this, verifyHeader);
                this._buffer = null;
                this._bufferSize = 0;
                this._bufferPosition = 0;
                this._bitBuffer = 0;
                this._bitLength = 0;
                this._window = new Uint8Array(MAX_WINDOW_SIZE);
                this._windowPosition = 0;
                this._state = verifyHeader ? 7 /* VERIFY_HEADER */ : 0 /* INIT */;
                this._isFinalBlock = false;
                this._literalTable = null;
                this._distanceTable = null;
                this._block0Read = 0;
                this._block2State = null;
                this._copyState = {
                    state: 0,
                    len: 0,
                    lenBits: 0,
                    dist: 0,
                    distBits: 0
                };
                if (!areTablesInitialized) {
                    initializeTables();
                    areTablesInitialized = true;
                }
            }
            BasicInflate.prototype.push = function (data) {
                if (!this._buffer || this._buffer.length < this._bufferSize + data.length) {
                    var newBuffer = new Uint8Array(this._bufferSize + data.length);
                    if (this._buffer) {
                        newBuffer.set(this._buffer);
                    }
                    this._buffer = newBuffer;
                }
                this._buffer.set(data, this._bufferSize);
                this._bufferSize += data.length;
                this._bufferPosition = 0;
                var incomplete = false;
                do {
                    var lastPosition = this._windowPosition;
                    if (this._state === 0 /* INIT */) {
                        incomplete = this._decodeInitState();
                        if (incomplete) {
                            break;
                        }
                    }
                    switch (this._state) {
                        case 1 /* BLOCK_0 */:
                            incomplete = this._decodeBlock0();
                            break;
                        case 3 /* BLOCK_2_PRE */:
                            incomplete = this._decodeBlock2Pre();
                            if (incomplete) {
                                break;
                            }
                        case 2 /* BLOCK_1 */:
                        case 4 /* BLOCK_2 */:
                            incomplete = this._decodeBlock();
                            break;
                        case 6 /* ERROR */:
                        case 5 /* DONE */:
                            this._bufferPosition = this._bufferSize;
                            break;
                        case 7 /* VERIFY_HEADER */:
                            var processed = this._processZLibHeader(this._buffer, this._bufferPosition, this._bufferSize);
                            if (processed > 0) {
                                this._bufferPosition += processed;
                                this._state = 0 /* INIT */;
                            }
                            else if (processed === 0) {
                                incomplete = true;
                            }
                            else {
                                this._state = 6 /* ERROR */;
                            }
                            break;
                    }
                    var decoded = this._windowPosition - lastPosition;
                    if (decoded > 0) {
                        this.onData(this._window.subarray(lastPosition, this._windowPosition));
                    }
                    if (this._windowPosition >= WINDOW_SHIFT_POSITION) {
                        if ('copyWithin' in this._buffer) {
                            this._window['copyWithin'](0, this._windowPosition - WINDOW_SIZE, this._windowPosition);
                        }
                        else {
                            this._window.set(this._window.subarray(this._windowPosition - WINDOW_SIZE, this._windowPosition));
                        }
                        this._windowPosition = WINDOW_SIZE;
                    }
                } while (!incomplete && this._bufferPosition < this._bufferSize);
                if (this._bufferPosition < this._bufferSize) {
                    if ('copyWithin' in this._buffer) {
                        this._buffer['copyWithin'](0, this._bufferPosition, this._bufferSize);
                    }
                    else {
                        this._buffer.set(this._buffer.subarray(this._bufferPosition, this._bufferSize));
                    }
                    this._bufferSize -= this._bufferPosition;
                }
                else {
                    this._bufferSize = 0;
                }
            };
            BasicInflate.prototype._decodeInitState = function () {
                if (this._isFinalBlock) {
                    this._state = 5 /* DONE */;
                    return false;
                }
                var buffer = this._buffer, bufferSize = this._bufferSize;
                var bitBuffer = this._bitBuffer, bitLength = this._bitLength;
                var state;
                var position = this._bufferPosition;
                if (((bufferSize - position) << 3) + bitLength < 3) {
                    return true;
                }
                if (bitLength < 3) {
                    bitBuffer |= buffer[position++] << bitLength;
                    bitLength += 8;
                }
                var type = bitBuffer & 7;
                bitBuffer >>= 3;
                bitLength -= 3;
                switch (type >> 1) {
                    case 0:
                        bitBuffer = 0;
                        bitLength = 0;
                        if (bufferSize - position < 4) {
                            return true;
                        }
                        var length = buffer[position] | (buffer[position + 1] << 8);
                        var length2 = buffer[position + 2] | (buffer[position + 3] << 8);
                        position += 4;
                        if ((length ^ length2) !== 0xFFFF) {
                            this._error('inflate: invalid block 0 length');
                            state = 6 /* ERROR */;
                            break;
                        }
                        if (length === 0) {
                            state = 0 /* INIT */;
                        }
                        else {
                            this._block0Read = length;
                            state = 1 /* BLOCK_0 */;
                        }
                        break;
                    case 1:
                        state = 2 /* BLOCK_1 */;
                        this._literalTable = fixedLiteralTable;
                        this._distanceTable = fixedDistanceTable;
                        break;
                    case 2:
                        if (((bufferSize - position) << 3) + bitLength < 14 + 3 * 4) {
                            return true;
                        }
                        while (bitLength < 14) {
                            bitBuffer |= buffer[position++] << bitLength;
                            bitLength += 8;
                        }
                        var numLengthCodes = ((bitBuffer >> 10) & 15) + 4;
                        if (((bufferSize - position) << 3) + bitLength < 14 + 3 * numLengthCodes) {
                            return true;
                        }
                        var block2State = {
                            numLiteralCodes: (bitBuffer & 31) + 257,
                            numDistanceCodes: ((bitBuffer >> 5) & 31) + 1,
                            codeLengthTable: undefined,
                            bitLengths: undefined,
                            codesRead: 0,
                            dupBits: 0
                        };
                        bitBuffer >>= 14;
                        bitLength -= 14;
                        var codeLengths = new Uint8Array(19);
                        for (var i = 0; i < numLengthCodes; ++i) {
                            if (bitLength < 3) {
                                bitBuffer |= buffer[position++] << bitLength;
                                bitLength += 8;
                            }
                            codeLengths[codeLengthOrder[i]] = bitBuffer & 7;
                            bitBuffer >>= 3;
                            bitLength -= 3;
                        }
                        for (; i < 19; i++) {
                            codeLengths[codeLengthOrder[i]] = 0;
                        }
                        block2State.bitLengths = new Uint8Array(block2State.numLiteralCodes + block2State.numDistanceCodes);
                        block2State.codeLengthTable = makeHuffmanTable(codeLengths);
                        this._block2State = block2State;
                        state = 3 /* BLOCK_2_PRE */;
                        break;
                    default:
                        this._error('inflate: unsupported block type');
                        state = 6 /* ERROR */;
                        return false;
                }
                this._isFinalBlock = !!(type & 1);
                this._state = state;
                this._bufferPosition = position;
                this._bitBuffer = bitBuffer;
                this._bitLength = bitLength;
                return false;
            };
            BasicInflate.prototype._error = function (e) {
                if (this.onError) {
                    this.onError(e);
                }
            };
            BasicInflate.prototype._decodeBlock0 = function () {
                var position = this._bufferPosition;
                var windowPosition = this._windowPosition;
                var toRead = this._block0Read;
                var leftInWindow = MAX_WINDOW_SIZE - windowPosition;
                var leftInBuffer = this._bufferSize - position;
                var incomplete = leftInBuffer < toRead;
                var canFit = Math.min(leftInWindow, leftInBuffer, toRead);
                this._window.set(this._buffer.subarray(position, position + canFit), windowPosition);
                this._windowPosition = windowPosition + canFit;
                this._bufferPosition = position + canFit;
                this._block0Read = toRead - canFit;
                if (toRead === canFit) {
                    this._state = 0 /* INIT */;
                    return false;
                }
                return incomplete && leftInWindow < leftInBuffer;
            };
            BasicInflate.prototype._readBits = function (size) {
                var bitBuffer = this._bitBuffer;
                var bitLength = this._bitLength;
                if (size > bitLength) {
                    var pos = this._bufferPosition;
                    var end = this._bufferSize;
                    do {
                        if (pos >= end) {
                            this._bufferPosition = pos;
                            this._bitBuffer = bitBuffer;
                            this._bitLength = bitLength;
                            return -1;
                        }
                        bitBuffer |= this._buffer[pos++] << bitLength;
                        bitLength += 8;
                    } while (size > bitLength);
                    this._bufferPosition = pos;
                }
                this._bitBuffer = bitBuffer >> size;
                this._bitLength = bitLength - size;
                return bitBuffer & ((1 << size) - 1);
            };
            BasicInflate.prototype._readCode = function (codeTable) {
                var bitBuffer = this._bitBuffer;
                var bitLength = this._bitLength;
                var maxBits = codeTable.maxBits;
                if (maxBits > bitLength) {
                    var pos = this._bufferPosition;
                    var end = this._bufferSize;
                    do {
                        if (pos >= end) {
                            this._bufferPosition = pos;
                            this._bitBuffer = bitBuffer;
                            this._bitLength = bitLength;
                            return -1;
                        }
                        bitBuffer |= this._buffer[pos++] << bitLength;
                        bitLength += 8;
                    } while (maxBits > bitLength);
                    this._bufferPosition = pos;
                }
                var code = codeTable.codes[bitBuffer & ((1 << maxBits) - 1)];
                var len = code >> 16;
                if ((code & 0x8000)) {
                    this._error('inflate: invalid encoding');
                    this._state = 6 /* ERROR */;
                    return -1;
                }
                this._bitBuffer = bitBuffer >> len;
                this._bitLength = bitLength - len;
                return code & 0xffff;
            };
            BasicInflate.prototype._decodeBlock2Pre = function () {
                var block2State = this._block2State;
                var numCodes = block2State.numLiteralCodes + block2State.numDistanceCodes;
                var bitLengths = block2State.bitLengths;
                var i = block2State.codesRead;
                var prev = i > 0 ? bitLengths[i - 1] : 0;
                var codeLengthTable = block2State.codeLengthTable;
                var j;
                if (block2State.dupBits > 0) {
                    j = this._readBits(block2State.dupBits);
                    if (j < 0) {
                        return true;
                    }
                    while (j--) {
                        bitLengths[i++] = prev;
                    }
                    block2State.dupBits = 0;
                }
                while (i < numCodes) {
                    var sym = this._readCode(codeLengthTable);
                    if (sym < 0) {
                        block2State.codesRead = i;
                        return true;
                    }
                    else if (sym < 16) {
                        bitLengths[i++] = (prev = sym);
                        continue;
                    }
                    var j, dupBits;
                    switch (sym) {
                        case 16:
                            dupBits = 2;
                            j = 3;
                            sym = prev;
                            break;
                        case 17:
                            dupBits = 3;
                            j = 3;
                            sym = 0;
                            break;
                        case 18:
                            dupBits = 7;
                            j = 11;
                            sym = 0;
                            break;
                    }
                    while (j--) {
                        bitLengths[i++] = sym;
                    }
                    j = this._readBits(dupBits);
                    if (j < 0) {
                        block2State.codesRead = i;
                        block2State.dupBits = dupBits;
                        return true;
                    }
                    while (j--) {
                        bitLengths[i++] = sym;
                    }
                    prev = sym;
                }
                this._literalTable = makeHuffmanTable(bitLengths.subarray(0, block2State.numLiteralCodes));
                this._distanceTable = makeHuffmanTable(bitLengths.subarray(block2State.numLiteralCodes));
                this._state = 4 /* BLOCK_2 */;
                this._block2State = null;
                return false;
            };
            BasicInflate.prototype._decodeBlock = function () {
                var literalTable = this._literalTable, distanceTable = this._distanceTable;
                var output = this._window, pos = this._windowPosition;
                var copyState = this._copyState;
                var i, j, sym;
                var len, lenBits, dist, distBits;
                if (copyState.state !== 0) {
                    switch (copyState.state) {
                        case 1:
                            j = 0;
                            if ((j = this._readBits(copyState.lenBits)) < 0) {
                                return true;
                            }
                            copyState.len += j;
                            copyState.state = 2;
                        case 2:
                            if ((sym = this._readCode(distanceTable)) < 0) {
                                return true;
                            }
                            copyState.distBits = distanceExtraBits[sym];
                            copyState.dist = distanceCodes[sym];
                            copyState.state = 3;
                        case 3:
                            j = 0;
                            if (copyState.distBits > 0 && (j = this._readBits(copyState.distBits)) < 0) {
                                return true;
                            }
                            dist = copyState.dist + j;
                            len = copyState.len;
                            i = pos - dist;
                            while (len--) {
                                output[pos++] = output[i++];
                            }
                            copyState.state = 0;
                            if (pos >= WINDOW_SHIFT_POSITION) {
                                this._windowPosition = pos;
                                return false;
                            }
                            break;
                    }
                }
                do {
                    sym = this._readCode(literalTable);
                    if (sym < 0) {
                        this._windowPosition = pos;
                        return true;
                    }
                    else if (sym < 256) {
                        output[pos++] = sym;
                    }
                    else if (sym > 256) {
                        this._windowPosition = pos;
                        sym -= 257;
                        lenBits = lengthExtraBits[sym];
                        len = lengthCodes[sym];
                        j = lenBits === 0 ? 0 : this._readBits(lenBits);
                        if (j < 0) {
                            copyState.state = 1;
                            copyState.len = len;
                            copyState.lenBits = lenBits;
                            return true;
                        }
                        len += j;
                        sym = this._readCode(distanceTable);
                        if (sym < 0) {
                            copyState.state = 2;
                            copyState.len = len;
                            return true;
                        }
                        distBits = distanceExtraBits[sym];
                        dist = distanceCodes[sym];
                        j = distBits === 0 ? 0 : this._readBits(distBits);
                        if (j < 0) {
                            copyState.state = 3;
                            copyState.len = len;
                            copyState.dist = dist;
                            copyState.distBits = distBits;
                            return true;
                        }
                        dist += j;
                        i = pos - dist;
                        while (len--) {
                            output[pos++] = output[i++];
                        }
                    }
                    else {
                        this._state = 0 /* INIT */;
                        break;
                    }
                } while (pos < WINDOW_SHIFT_POSITION);
                this._windowPosition = pos;
                return false;
            };
            return BasicInflate;
        })(Inflate);
        var codeLengthOrder;
        var distanceCodes;
        var distanceExtraBits;
        var fixedDistanceTable;
        var lengthCodes;
        var lengthExtraBits;
        var fixedLiteralTable;
        var areTablesInitialized = false;
        function initializeTables() {
            codeLengthOrder = new Uint8Array([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
            distanceCodes = new Uint16Array(30);
            distanceExtraBits = new Uint8Array(30);
            for (var i = 0, j = 0, code = 1; i < 30; ++i) {
                distanceCodes[i] = code;
                code += 1 << (distanceExtraBits[i] = ~~((j += (i > 2 ? 1 : 0)) / 2));
            }
            var bitLengths = new Uint8Array(288);
            for (var i = 0; i < 32; ++i) {
                bitLengths[i] = 5;
            }
            fixedDistanceTable = makeHuffmanTable(bitLengths.subarray(0, 32));
            lengthCodes = new Uint16Array(29);
            lengthExtraBits = new Uint8Array(29);
            for (var i = 0, j = 0, code = 3; i < 29; ++i) {
                lengthCodes[i] = code - (i == 28 ? 1 : 0);
                code += 1 << (lengthExtraBits[i] = ~~(((j += (i > 4 ? 1 : 0)) / 4) % 6));
            }
            for (var i = 0; i < 288; ++i) {
                bitLengths[i] = i < 144 || i > 279 ? 8 : (i < 256 ? 9 : 7);
            }
            fixedLiteralTable = makeHuffmanTable(bitLengths);
        }
        function makeHuffmanTable(bitLengths) {
            var maxBits = Math.max.apply(null, bitLengths);
            var numLengths = bitLengths.length;
            var size = 1 << maxBits;
            var codes = new Uint32Array(size);
            var dummyCode = (maxBits << 16) | 0xFFFF;
            for (var j = 0; j < size; j++) {
                codes[j] = dummyCode;
            }
            for (var code = 0, len = 1, skip = 2; len <= maxBits; code <<= 1, ++len, skip <<= 1) {
                for (var val = 0; val < numLengths; ++val) {
                    if (bitLengths[val] === len) {
                        var lsb = 0;
                        for (var i = 0; i < len; ++i)
                            lsb = (lsb * 2) + ((code >> i) & 1);
                        for (var i = lsb; i < size; i += skip)
                            codes[i] = (len << 16) | val;
                        ++code;
                    }
                }
            }
            return { codes: codes, maxBits: maxBits };
        }
        var SpecialInflateAdapter = (function (_super) {
            __extends(SpecialInflateAdapter, _super);
            function SpecialInflateAdapter(verifyHeader) {
                _super.call(this, verifyHeader);
                this._verifyHeader = verifyHeader;
                this._specialInflate = new SpecialInflate();
                this._specialInflate.onData = function (data) {
                    this.onData(data);
                }.bind(this);
            }
            SpecialInflateAdapter.prototype.push = function (data) {
                if (this._verifyHeader) {
                    var buffer;
                    if (this._buffer) {
                        buffer = new Uint8Array(this._buffer.length + data.length);
                        buffer.set(this._buffer);
                        buffer.set(data, this._buffer.length);
                        this._buffer = null;
                    }
                    else {
                        buffer = new Uint8Array(data);
                    }
                    var processed = this._processZLibHeader(buffer, 0, buffer.length);
                    if (processed === 0) {
                        this._buffer = buffer;
                        return;
                    }
                    this._verifyHeader = true;
                    if (processed > 0) {
                        data = buffer.subarray(processed);
                    }
                }
                this._specialInflate.push(data);
            };
            SpecialInflateAdapter.prototype.close = function () {
                if (this._specialInflate) {
                    this._specialInflate.close();
                    this._specialInflate = null;
                }
            };
            return SpecialInflateAdapter;
        })(Inflate);
        var DeflateState;
        (function (DeflateState) {
            DeflateState[DeflateState["WRITE"] = 0] = "WRITE";
            DeflateState[DeflateState["DONE"] = 1] = "DONE";
            DeflateState[DeflateState["ZLIB_HEADER"] = 2] = "ZLIB_HEADER";
        })(DeflateState || (DeflateState = {}));
        var Adler32 = (function () {
            function Adler32() {
                this.a = 1;
                this.b = 0;
            }
            Adler32.prototype.update = function (data, start, end) {
                var a = this.a;
                var b = this.b;
                for (var i = start; i < end; ++i) {
                    a = (a + (data[i] & 0xff)) % 65521;
                    b = (b + a) % 65521;
                }
                this.a = a;
                this.b = b;
            };
            Adler32.prototype.getChecksum = function () {
                return (this.b << 16) | this.a;
            };
            return Adler32;
        })();
        ArrayUtilities.Adler32 = Adler32;
        var Deflate = (function () {
            function Deflate(writeZlibHeader) {
                this._writeZlibHeader = writeZlibHeader;
                this._state = writeZlibHeader ? 2 /* ZLIB_HEADER */ : 0 /* WRITE */;
                this._adler32 = writeZlibHeader ? new Adler32() : null;
            }
            Deflate.prototype.push = function (data) {
                if (this._state === 2 /* ZLIB_HEADER */) {
                    this.onData(new Uint8Array([0x78, 0x9C]));
                    this._state = 0 /* WRITE */;
                }
                var len = data.length;
                var outputSize = len + Math.ceil(len / 0xFFFF) * 5;
                var output = new Uint8Array(outputSize);
                var outputPos = 0;
                var pos = 0;
                while (len > 0xFFFF) {
                    output.set(new Uint8Array([
                        0x00,
                        0xFF,
                        0xFF,
                        0x00,
                        0x00
                    ]), outputPos);
                    outputPos += 5;
                    output.set(data.subarray(pos, pos + 0xFFFF), outputPos);
                    pos += 0xFFFF;
                    outputPos += 0xFFFF;
                    len -= 0xFFFF;
                }
                output.set(new Uint8Array([
                    0x00,
                    (len & 0xff),
                    ((len >> 8) & 0xff),
                    ((~len) & 0xff),
                    (((~len) >> 8) & 0xff)
                ]), outputPos);
                outputPos += 5;
                output.set(data.subarray(pos, len), outputPos);
                this.onData(output);
                if (this._adler32) {
                    this._adler32.update(data, 0, len);
                }
            };
            Deflate.prototype.close = function () {
                this._state = 1 /* DONE */;
                this.onData(new Uint8Array([
                    0x01,
                    0x00,
                    0x00,
                    0xFF,
                    0xFF
                ]));
                if (this._adler32) {
                    var checksum = this._adler32.getChecksum();
                    this.onData(new Uint8Array([
                        checksum & 0xff,
                        (checksum >> 8) & 0xff,
                        (checksum >> 16) & 0xff,
                        (checksum >>> 24) & 0xff
                    ]));
                }
            };
            return Deflate;
        })();
        ArrayUtilities.Deflate = Deflate;
    })(ArrayUtilities = Shumway.ArrayUtilities || (Shumway.ArrayUtilities = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var ArrayUtilities;
    (function (ArrayUtilities) {
        var InputStream = (function () {
            function InputStream() {
                this.available = 0;
                this.pos = 0;
                this.buffer = new Uint8Array(2000);
            }
            InputStream.prototype.append = function (data) {
                var length = this.pos + this.available;
                var needLength = length + data.length;
                if (needLength > this.buffer.length) {
                    var newLength = this.buffer.length * 2;
                    while (newLength < needLength) {
                        newLength *= 2;
                    }
                    var newBuffer = new Uint8Array(newLength);
                    newBuffer.set(this.buffer);
                    this.buffer = newBuffer;
                }
                this.buffer.set(data, length);
                this.available += data.length;
            };
            InputStream.prototype.compact = function () {
                if (this.available === 0) {
                    return;
                }
                this.buffer.set(this.buffer.subarray(this.pos, this.pos + this.available), 0);
                this.pos = 0;
            };
            InputStream.prototype.readByte = function () {
                if (this.available <= 0) {
                    throw new Error("Unexpected end of file");
                }
                this.available--;
                return this.buffer[this.pos++];
            };
            return InputStream;
        })();
        var OutputStream = (function () {
            function OutputStream(onData) {
                this.onData = onData;
                this.processed = 0;
            }
            OutputStream.prototype.writeBytes = function (data) {
                this.onData.call(null, data);
                this.processed += data.length;
            };
            return OutputStream;
        })();
        var OutWindow = (function () {
            function OutWindow(outStream) {
                this.outStream = outStream;
                this.buf = null;
                this.pos = 0;
                this.size = 0;
                this.isFull = false;
                this.writePos = 0;
                this.totalPos = 0;
            }
            OutWindow.prototype.create = function (dictSize) {
                this.buf = new Uint8Array(dictSize);
                this.pos = 0;
                this.size = dictSize;
                this.isFull = false;
                this.writePos = 0;
                this.totalPos = 0;
            };
            OutWindow.prototype.putByte = function (b) {
                this.totalPos++;
                this.buf[this.pos++] = b;
                if (this.pos === this.size) {
                    this.flush();
                    this.pos = 0;
                    this.isFull = true;
                }
            };
            OutWindow.prototype.getByte = function (dist) {
                return this.buf[dist <= this.pos ? this.pos - dist : this.size - dist + this.pos];
            };
            OutWindow.prototype.flush = function () {
                if (this.writePos < this.pos) {
                    this.outStream.writeBytes(this.buf.subarray(this.writePos, this.pos));
                    this.writePos = this.pos === this.size ? 0 : this.pos;
                }
            };
            OutWindow.prototype.copyMatch = function (dist, len) {
                var pos = this.pos;
                var size = this.size;
                var buffer = this.buf;
                var getPos = dist <= pos ? pos - dist : size - dist + pos;
                var left = len;
                while (left > 0) {
                    var chunk = Math.min(Math.min(left, size - pos), size - getPos);
                    for (var i = 0; i < chunk; i++) {
                        var b = buffer[getPos++];
                        buffer[pos++] = b;
                    }
                    if (pos === size) {
                        this.pos = pos;
                        this.flush();
                        pos = 0;
                        this.isFull = true;
                    }
                    if (getPos === size) {
                        getPos = 0;
                    }
                    left -= chunk;
                }
                this.pos = pos;
                this.totalPos += len;
            };
            OutWindow.prototype.checkDistance = function (dist) {
                return dist <= this.pos || this.isFull;
            };
            OutWindow.prototype.isEmpty = function () {
                return this.pos === 0 && !this.isFull;
            };
            return OutWindow;
        })();
        var kNumBitModelTotalBits = 11;
        var kNumMoveBits = 5;
        var PROB_INIT_VAL = ((1 << kNumBitModelTotalBits) >> 1);
        function createProbsArray(length) {
            var p = new Uint16Array(length);
            for (var i = 0; i < length; i++) {
                p[i] = PROB_INIT_VAL;
            }
            return p;
        }
        var kTopValue = 1 << 24;
        var RangeDecoder = (function () {
            function RangeDecoder(inStream) {
                this.inStream = inStream;
                this.range = 0;
                this.code = 0;
                this.corrupted = false;
            }
            RangeDecoder.prototype.init = function () {
                if (this.inStream.readByte() !== 0) {
                    this.corrupted = true;
                }
                this.range = 0xFFFFFFFF | 0;
                var code = 0;
                for (var i = 0; i < 4; i++) {
                    code = (code << 8) | this.inStream.readByte();
                }
                if (code === this.range) {
                    this.corrupted = true;
                }
                this.code = code;
            };
            RangeDecoder.prototype.isFinishedOK = function () {
                return this.code === 0;
            };
            RangeDecoder.prototype.decodeDirectBits = function (numBits) {
                var res = 0;
                var range = this.range;
                var code = this.code;
                do {
                    range = (range >>> 1) | 0;
                    code = (code - range) | 0;
                    var t = code >> 31;
                    code = (code + (range & t)) | 0;
                    if (code === range) {
                        this.corrupted = true;
                    }
                    if (range >= 0 && range < kTopValue) {
                        range = range << 8;
                        code = (code << 8) | this.inStream.readByte();
                    }
                    res = ((res << 1) + t + 1) | 0;
                } while (--numBits);
                this.range = range;
                this.code = code;
                return res;
            };
            RangeDecoder.prototype.decodeBit = function (prob, index) {
                var range = this.range;
                var code = this.code;
                var v = prob[index];
                var bound = (range >>> kNumBitModelTotalBits) * v;
                var symbol;
                if ((code >>> 0) < bound) {
                    v = (v + (((1 << kNumBitModelTotalBits) - v) >> kNumMoveBits)) | 0;
                    range = bound | 0;
                    symbol = 0;
                }
                else {
                    v = (v - (v >> kNumMoveBits)) | 0;
                    code = (code - bound) | 0;
                    range = (range - bound) | 0;
                    symbol = 1;
                }
                prob[index] = v & 0xFFFF;
                if (range >= 0 && range < kTopValue) {
                    range = range << 8;
                    code = (code << 8) | this.inStream.readByte();
                }
                this.range = range;
                this.code = code;
                return symbol;
            };
            return RangeDecoder;
        })();
        function bitTreeReverseDecode(probs, offset, numBits, rc) {
            var m = 1;
            var symbol = 0;
            for (var i = 0; i < numBits; i++) {
                var bit = rc.decodeBit(probs, m + offset);
                m = (m << 1) + bit;
                symbol |= bit << i;
            }
            return symbol;
        }
        var BitTreeDecoder = (function () {
            function BitTreeDecoder(numBits) {
                this.numBits = numBits;
                this.probs = createProbsArray(1 << numBits);
            }
            BitTreeDecoder.prototype.decode = function (rc) {
                var m = 1;
                for (var i = 0; i < this.numBits; i++) {
                    m = (m << 1) + rc.decodeBit(this.probs, m);
                }
                return m - (1 << this.numBits);
            };
            BitTreeDecoder.prototype.reverseDecode = function (rc) {
                return bitTreeReverseDecode(this.probs, 0, this.numBits, rc);
            };
            return BitTreeDecoder;
        })();
        function createBitTreeDecoderArray(numBits, length) {
            var p = [];
            p.length = length;
            for (var i = 0; i < length; i++) {
                p[i] = new BitTreeDecoder(numBits);
            }
            return p;
        }
        var kNumPosBitsMax = 4;
        var kNumStates = 12;
        var kNumLenToPosStates = 4;
        var kNumAlignBits = 4;
        var kStartPosModelIndex = 4;
        var kEndPosModelIndex = 14;
        var kNumFullDistances = 1 << (kEndPosModelIndex >> 1);
        var kMatchMinLen = 2;
        var LenDecoder = (function () {
            function LenDecoder() {
                this.choice = createProbsArray(2);
                this.lowCoder = createBitTreeDecoderArray(3, 1 << kNumPosBitsMax);
                this.midCoder = createBitTreeDecoderArray(3, 1 << kNumPosBitsMax);
                this.highCoder = new BitTreeDecoder(8);
            }
            LenDecoder.prototype.decode = function (rc, posState) {
                if (rc.decodeBit(this.choice, 0) === 0) {
                    return this.lowCoder[posState].decode(rc);
                }
                if (rc.decodeBit(this.choice, 1) === 0) {
                    return 8 + this.midCoder[posState].decode(rc);
                }
                return 16 + this.highCoder.decode(rc);
            };
            return LenDecoder;
        })();
        function updateState_Literal(state) {
            if (state < 4) {
                return 0;
            }
            else if (state < 10) {
                return state - 3;
            }
            else {
                return state - 6;
            }
        }
        function updateState_Match(state) {
            return state < 7 ? 7 : 10;
        }
        function updateState_Rep(state) {
            return state < 7 ? 8 : 11;
        }
        function updateState_ShortRep(state) {
            return state < 7 ? 9 : 11;
        }
        var LZMA_DIC_MIN = 1 << 12;
        var MAX_DECODE_BITS_CALLS = 48;
        var LzmaDecoderInternal = (function () {
            function LzmaDecoderInternal(inStream, outStream) {
                this.rangeDec = new RangeDecoder(inStream);
                this.outWindow = new OutWindow(outStream);
                this.markerIsMandatory = false;
                this.lc = 0;
                this.pb = 0;
                this.lp = 0;
                this.dictSize = 0;
                this.dictSizeInProperties = 0;
                this.unpackSize = undefined;
                this.leftToUnpack = undefined;
                this.reps = new Int32Array(4);
                this.state = 0;
            }
            LzmaDecoderInternal.prototype.decodeProperties = function (properties) {
                var d = properties[0];
                if (d >= (9 * 5 * 5)) {
                    throw new Error("Incorrect LZMA properties");
                }
                this.lc = d % 9;
                d = (d / 9) | 0;
                this.pb = (d / 5) | 0;
                this.lp = d % 5;
                this.dictSizeInProperties = 0;
                for (var i = 0; i < 4; i++) {
                    this.dictSizeInProperties |= properties[i + 1] << (8 * i);
                }
                this.dictSize = this.dictSizeInProperties;
                if (this.dictSize < LZMA_DIC_MIN) {
                    this.dictSize = LZMA_DIC_MIN;
                }
            };
            LzmaDecoderInternal.prototype.create = function () {
                this.outWindow.create(this.dictSize);
                this.init();
                this.rangeDec.init();
                this.reps[0] = 0;
                this.reps[1] = 0;
                this.reps[2] = 0;
                this.reps[3] = 0;
                this.state = 0;
                this.leftToUnpack = this.unpackSize;
            };
            LzmaDecoderInternal.prototype.decodeLiteral = function (state, rep0) {
                var outWindow = this.outWindow;
                var rangeDec = this.rangeDec;
                var prevByte = 0;
                if (!outWindow.isEmpty()) {
                    prevByte = outWindow.getByte(1);
                }
                var symbol = 1;
                var litState = ((outWindow.totalPos & ((1 << this.lp) - 1)) << this.lc) + (prevByte >> (8 - this.lc));
                var probsIndex = 0x300 * litState;
                if (state >= 7) {
                    var matchByte = outWindow.getByte(rep0 + 1);
                    do {
                        var matchBit = (matchByte >> 7) & 1;
                        matchByte <<= 1;
                        var bit = rangeDec.decodeBit(this.litProbs, probsIndex + (((1 + matchBit) << 8) + symbol));
                        symbol = (symbol << 1) | bit;
                        if (matchBit !== bit) {
                            break;
                        }
                    } while (symbol < 0x100);
                }
                while (symbol < 0x100) {
                    symbol = (symbol << 1) | rangeDec.decodeBit(this.litProbs, probsIndex + symbol);
                }
                return (symbol - 0x100) & 0xFF;
            };
            LzmaDecoderInternal.prototype.decodeDistance = function (len) {
                var lenState = len;
                if (lenState > kNumLenToPosStates - 1) {
                    lenState = kNumLenToPosStates - 1;
                }
                var rangeDec = this.rangeDec;
                var posSlot = this.posSlotDecoder[lenState].decode(rangeDec);
                if (posSlot < 4) {
                    return posSlot;
                }
                var numDirectBits = (posSlot >> 1) - 1;
                var dist = (2 | (posSlot & 1)) << numDirectBits;
                if (posSlot < kEndPosModelIndex) {
                    dist = (dist + bitTreeReverseDecode(this.posDecoders, dist - posSlot, numDirectBits, rangeDec)) | 0;
                }
                else {
                    dist = (dist + (rangeDec.decodeDirectBits(numDirectBits - kNumAlignBits) << kNumAlignBits)) | 0;
                    dist = (dist + this.alignDecoder.reverseDecode(rangeDec)) | 0;
                }
                return dist;
            };
            LzmaDecoderInternal.prototype.init = function () {
                this.litProbs = createProbsArray(0x300 << (this.lc + this.lp));
                this.posSlotDecoder = createBitTreeDecoderArray(6, kNumLenToPosStates);
                this.alignDecoder = new BitTreeDecoder(kNumAlignBits);
                this.posDecoders = createProbsArray(1 + kNumFullDistances - kEndPosModelIndex);
                this.isMatch = createProbsArray(kNumStates << kNumPosBitsMax);
                this.isRep = createProbsArray(kNumStates);
                this.isRepG0 = createProbsArray(kNumStates);
                this.isRepG1 = createProbsArray(kNumStates);
                this.isRepG2 = createProbsArray(kNumStates);
                this.isRep0Long = createProbsArray(kNumStates << kNumPosBitsMax);
                this.lenDecoder = new LenDecoder();
                this.repLenDecoder = new LenDecoder();
            };
            LzmaDecoderInternal.prototype.decode = function (notFinal) {
                var rangeDec = this.rangeDec;
                var outWindow = this.outWindow;
                var pb = this.pb;
                var dictSize = this.dictSize;
                var markerIsMandatory = this.markerIsMandatory;
                var leftToUnpack = this.leftToUnpack;
                var isMatch = this.isMatch;
                var isRep = this.isRep;
                var isRepG0 = this.isRepG0;
                var isRepG1 = this.isRepG1;
                var isRepG2 = this.isRepG2;
                var isRep0Long = this.isRep0Long;
                var lenDecoder = this.lenDecoder;
                var repLenDecoder = this.repLenDecoder;
                var rep0 = this.reps[0];
                var rep1 = this.reps[1];
                var rep2 = this.reps[2];
                var rep3 = this.reps[3];
                var state = this.state;
                while (true) {
                    if (notFinal && rangeDec.inStream.available < MAX_DECODE_BITS_CALLS) {
                        this.outWindow.flush();
                        break;
                    }
                    if (leftToUnpack === 0 && !markerIsMandatory) {
                        this.outWindow.flush();
                        if (rangeDec.isFinishedOK()) {
                            return LZMA_RES_FINISHED_WITHOUT_MARKER;
                        }
                    }
                    var posState = outWindow.totalPos & ((1 << pb) - 1);
                    if (rangeDec.decodeBit(isMatch, (state << kNumPosBitsMax) + posState) === 0) {
                        if (leftToUnpack === 0) {
                            return LZMA_RES_ERROR;
                        }
                        outWindow.putByte(this.decodeLiteral(state, rep0));
                        state = updateState_Literal(state);
                        leftToUnpack--;
                        continue;
                    }
                    var len;
                    if (rangeDec.decodeBit(isRep, state) !== 0) {
                        if (leftToUnpack === 0) {
                            return LZMA_RES_ERROR;
                        }
                        if (outWindow.isEmpty()) {
                            return LZMA_RES_ERROR;
                        }
                        if (rangeDec.decodeBit(isRepG0, state) === 0) {
                            if (rangeDec.decodeBit(isRep0Long, (state << kNumPosBitsMax) + posState) === 0) {
                                state = updateState_ShortRep(state);
                                outWindow.putByte(outWindow.getByte(rep0 + 1));
                                leftToUnpack--;
                                continue;
                            }
                        }
                        else {
                            var dist;
                            if (rangeDec.decodeBit(isRepG1, state) === 0) {
                                dist = rep1;
                            }
                            else {
                                if (rangeDec.decodeBit(isRepG2, state) === 0) {
                                    dist = rep2;
                                }
                                else {
                                    dist = rep3;
                                    rep3 = rep2;
                                }
                                rep2 = rep1;
                            }
                            rep1 = rep0;
                            rep0 = dist;
                        }
                        len = repLenDecoder.decode(rangeDec, posState);
                        state = updateState_Rep(state);
                    }
                    else {
                        rep3 = rep2;
                        rep2 = rep1;
                        rep1 = rep0;
                        len = lenDecoder.decode(rangeDec, posState);
                        state = updateState_Match(state);
                        rep0 = this.decodeDistance(len);
                        if (rep0 === -1) {
                            this.outWindow.flush();
                            return rangeDec.isFinishedOK() ? LZMA_RES_FINISHED_WITH_MARKER : LZMA_RES_ERROR;
                        }
                        if (leftToUnpack === 0) {
                            return LZMA_RES_ERROR;
                        }
                        if (rep0 >= dictSize || !outWindow.checkDistance(rep0)) {
                            return LZMA_RES_ERROR;
                        }
                    }
                    len += kMatchMinLen;
                    var isError = false;
                    if (leftToUnpack !== undefined && leftToUnpack < len) {
                        len = leftToUnpack;
                        isError = true;
                    }
                    outWindow.copyMatch(rep0 + 1, len);
                    leftToUnpack -= len;
                    if (isError) {
                        return LZMA_RES_ERROR;
                    }
                }
                this.state = state;
                this.reps[0] = rep0;
                this.reps[1] = rep1;
                this.reps[2] = rep2;
                this.reps[3] = rep3;
                this.leftToUnpack = leftToUnpack;
                return LZMA_RES_NOT_COMPLETE;
            };
            return LzmaDecoderInternal;
        })();
        var LZMA_RES_ERROR = 0;
        var LZMA_RES_FINISHED_WITH_MARKER = 1;
        var LZMA_RES_FINISHED_WITHOUT_MARKER = 2;
        var LZMA_RES_NOT_COMPLETE = 3;
        var SWF_LZMA_HEADER_LENGTH = 17;
        var STANDARD_LZMA_HEADER_LENGTH = 13;
        var EXTRA_LZMA_BYTES_NEEDED = 5;
        var LzmaDecoderState;
        (function (LzmaDecoderState) {
            LzmaDecoderState[LzmaDecoderState["WAIT_FOR_LZMA_HEADER"] = 0] = "WAIT_FOR_LZMA_HEADER";
            LzmaDecoderState[LzmaDecoderState["WAIT_FOR_SWF_HEADER"] = 1] = "WAIT_FOR_SWF_HEADER";
            LzmaDecoderState[LzmaDecoderState["PROCESS_DATA"] = 2] = "PROCESS_DATA";
            LzmaDecoderState[LzmaDecoderState["CLOSED"] = 3] = "CLOSED";
        })(LzmaDecoderState || (LzmaDecoderState = {}));
        var LzmaDecoder = (function () {
            function LzmaDecoder(swfHeader) {
                if (swfHeader === void 0) { swfHeader = false; }
                this._state = swfHeader ? 1 /* WAIT_FOR_SWF_HEADER */ : 0 /* WAIT_FOR_LZMA_HEADER */;
                this.buffer = null;
            }
            LzmaDecoder.prototype.push = function (data) {
                if (this._state < 2 /* PROCESS_DATA */) {
                    var buffered = this.buffer ? this.buffer.length : 0;
                    var headerBytesExpected = (this._state === 1 /* WAIT_FOR_SWF_HEADER */ ? SWF_LZMA_HEADER_LENGTH : STANDARD_LZMA_HEADER_LENGTH) + EXTRA_LZMA_BYTES_NEEDED;
                    if (buffered + data.length < headerBytesExpected) {
                        var newBuffer = new Uint8Array(buffered + data.length);
                        if (buffered > 0) {
                            newBuffer.set(this.buffer);
                        }
                        newBuffer.set(data, buffered);
                        this.buffer = newBuffer;
                        return;
                    }
                    var header = new Uint8Array(headerBytesExpected);
                    if (buffered > 0) {
                        header.set(this.buffer);
                    }
                    header.set(data.subarray(0, headerBytesExpected - buffered), buffered);
                    this._inStream = new InputStream();
                    this._inStream.append(header.subarray(headerBytesExpected - EXTRA_LZMA_BYTES_NEEDED));
                    this._outStream = new OutputStream(function (data) {
                        this.onData.call(null, data);
                    }.bind(this));
                    this._decoder = new LzmaDecoderInternal(this._inStream, this._outStream);
                    if (this._state === 1 /* WAIT_FOR_SWF_HEADER */) {
                        this._decoder.decodeProperties(header.subarray(12, 17));
                        this._decoder.markerIsMandatory = false;
                        this._decoder.unpackSize = ((header[4] | (header[5] << 8) | (header[6] << 16) | (header[7] << 24)) >>> 0) - 8;
                    }
                    else {
                        this._decoder.decodeProperties(header.subarray(0, 5));
                        var unpackSize = 0;
                        var unpackSizeDefined = false;
                        for (var i = 0; i < 8; i++) {
                            var b = header[5 + i];
                            if (b !== 0xFF) {
                                unpackSizeDefined = true;
                            }
                            unpackSize |= b << (8 * i);
                        }
                        this._decoder.markerIsMandatory = !unpackSizeDefined;
                        this._decoder.unpackSize = unpackSizeDefined ? unpackSize : undefined;
                    }
                    this._decoder.create();
                    data = data.subarray(headerBytesExpected);
                    this._state = 2 /* PROCESS_DATA */;
                }
                this._inStream.append(data);
                var res = this._decoder.decode(true);
                this._inStream.compact();
                if (res !== LZMA_RES_NOT_COMPLETE) {
                    this._checkError(res);
                }
            };
            LzmaDecoder.prototype.close = function () {
                this._state = 3 /* CLOSED */;
                var res = this._decoder.decode(false);
                this._checkError(res);
                this._decoder = null;
            };
            LzmaDecoder.prototype._checkError = function (res) {
                var error;
                if (res === LZMA_RES_ERROR) {
                    error = "LZMA decoding error";
                }
                else if (res === LZMA_RES_NOT_COMPLETE) {
                    error = "Decoding is not complete";
                }
                else if (res === LZMA_RES_FINISHED_WITH_MARKER) {
                    if (this._decoder.unpackSize !== undefined && this._decoder.unpackSize !== this._outStream.processed) {
                        error = "Finished with end marker before than specified size";
                    }
                }
                else {
                    error = "Internal LZMA Error";
                }
                if (error && this.onError) {
                    this.onError(error);
                }
            };
            return LzmaDecoder;
        })();
        ArrayUtilities.LzmaDecoder = LzmaDecoder;
    })(ArrayUtilities = Shumway.ArrayUtilities || (Shumway.ArrayUtilities = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var ArrayUtilities;
    (function (ArrayUtilities) {
        var notImplemented = Shumway.Debug.notImplemented;
        var utf8decode = Shumway.StringUtilities.utf8decode;
        var utf8encode = Shumway.StringUtilities.utf8encode;
        var clamp = Shumway.NumberUtilities.clamp;
        function checkRange(x, min, max) {
            if (x !== clamp(x, min, max)) {
                throwError('RangeError', Errors.ParamRangeError);
            }
        }
        function asCoerceString(x) {
            if (typeof x === "string") {
                return x;
            }
            else if (x == undefined) {
                return null;
            }
            return x + '';
        }
        var PlainObjectDataBuffer = (function () {
            function PlainObjectDataBuffer(buffer, length, littleEndian) {
                this.buffer = buffer;
                this.length = length;
                this.littleEndian = littleEndian;
            }
            return PlainObjectDataBuffer;
        })();
        ArrayUtilities.PlainObjectDataBuffer = PlainObjectDataBuffer;
        var bitMasks = new Uint32Array(33);
        for (var i = 1, mask = 0; i <= 32; i++) {
            bitMasks[i] = mask = (mask << 1) | 1;
        }
        var TypedArrayViewFlags;
        (function (TypedArrayViewFlags) {
            TypedArrayViewFlags[TypedArrayViewFlags["U8"] = 1] = "U8";
            TypedArrayViewFlags[TypedArrayViewFlags["I32"] = 2] = "I32";
            TypedArrayViewFlags[TypedArrayViewFlags["F32"] = 4] = "F32";
        })(TypedArrayViewFlags || (TypedArrayViewFlags = {}));
        var DataBuffer = (function () {
            function DataBuffer(initialSize) {
                if (initialSize === void 0) { initialSize = DataBuffer.INITIAL_SIZE; }
                if (this._buffer) {
                    return;
                }
                this._buffer = new ArrayBuffer(initialSize);
                this._length = 0;
                this._position = 0;
                this._resetViews();
                this._littleEndian = DataBuffer._nativeLittleEndian;
                this._bitBuffer = 0;
                this._bitLength = 0;
            }
            DataBuffer.FromArrayBuffer = function (buffer, length) {
                if (length === void 0) { length = -1; }
                var dataBuffer = Object.create(DataBuffer.prototype);
                dataBuffer._buffer = buffer;
                dataBuffer._length = length === -1 ? buffer.byteLength : length;
                dataBuffer._position = 0;
                dataBuffer._resetViews();
                dataBuffer._littleEndian = DataBuffer._nativeLittleEndian;
                dataBuffer._bitBuffer = 0;
                dataBuffer._bitLength = 0;
                return dataBuffer;
            };
            DataBuffer.FromPlainObject = function (source) {
                var dataBuffer = DataBuffer.FromArrayBuffer(source.buffer, source.length);
                dataBuffer._littleEndian = source.littleEndian;
                return dataBuffer;
            };
            DataBuffer.prototype.toPlainObject = function () {
                return new PlainObjectDataBuffer(this._buffer, this._length, this._littleEndian);
            };
            DataBuffer.prototype._resetViews = function () {
                this._u8 = new Uint8Array(this._buffer);
                this._i32 = null;
                this._f32 = null;
            };
            DataBuffer.prototype._requestViews = function (flags) {
                if ((this._buffer.byteLength & 0x3) === 0) {
                    if (this._i32 === null && flags & 2 /* I32 */) {
                        this._i32 = new Int32Array(this._buffer);
                    }
                    if (this._f32 === null && flags & 4 /* F32 */) {
                        this._f32 = new Float32Array(this._buffer);
                    }
                }
            };
            DataBuffer.prototype.getBytes = function () {
                return new Uint8Array(this._buffer, 0, this._length);
            };
            DataBuffer.prototype._ensureCapacity = function (length) {
                var currentBuffer = this._buffer;
                if (currentBuffer.byteLength < length) {
                    var newLength = Math.max(currentBuffer.byteLength, 1);
                    while (newLength < length) {
                        newLength *= 2;
                    }
                    var newBuffer = DataBuffer._arrayBufferPool.acquire(newLength);
                    var curentView = this._u8;
                    this._buffer = newBuffer;
                    this._resetViews();
                    this._u8.set(curentView);
                    DataBuffer._arrayBufferPool.release(currentBuffer);
                }
            };
            DataBuffer.prototype.clear = function () {
                this._length = 0;
                this._position = 0;
            };
            DataBuffer.prototype.readBoolean = function () {
                return this.readUnsignedByte() !== 0;
            };
            DataBuffer.prototype.readByte = function () {
                return this.readUnsignedByte() << 24 >> 24;
            };
            DataBuffer.prototype.readUnsignedByte = function () {
                if (this._position + 1 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                return this._u8[this._position++];
            };
            DataBuffer.prototype.readBytes = function (bytes, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                var position = this._position;
                if (!offset) {
                    offset = 0;
                }
                if (!length) {
                    length = this._length - position;
                }
                if (position + length > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                if (bytes.length < offset + length) {
                    bytes._ensureCapacity(offset + length);
                    bytes.length = offset + length;
                }
                bytes._u8.set(new Uint8Array(this._buffer, position, length), offset);
                this._position += length;
            };
            DataBuffer.prototype.readShort = function () {
                return this.readUnsignedShort() << 16 >> 16;
            };
            DataBuffer.prototype.readUnsignedShort = function () {
                var u8 = this._u8;
                var position = this._position;
                if (position + 2 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                var a = u8[position + 0];
                var b = u8[position + 1];
                this._position = position + 2;
                return this._littleEndian ? (b << 8) | a : (a << 8) | b;
            };
            DataBuffer.prototype.readInt = function () {
                var u8 = this._u8;
                var position = this._position;
                if (position + 4 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                var a = u8[position + 0];
                var b = u8[position + 1];
                var c = u8[position + 2];
                var d = u8[position + 3];
                this._position = position + 4;
                return this._littleEndian ? (d << 24) | (c << 16) | (b << 8) | a : (a << 24) | (b << 16) | (c << 8) | d;
            };
            DataBuffer.prototype.readUnsignedInt = function () {
                return this.readInt() >>> 0;
            };
            DataBuffer.prototype.readFloat = function () {
                var position = this._position;
                if (position + 4 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                this._position = position + 4;
                this._requestViews(4 /* F32 */);
                if (this._littleEndian && (position & 0x3) === 0 && this._f32) {
                    return this._f32[position >> 2];
                }
                else {
                    var u8 = this._u8;
                    var t8 = Shumway.IntegerUtilities.u8;
                    if (this._littleEndian) {
                        t8[0] = u8[position + 0];
                        t8[1] = u8[position + 1];
                        t8[2] = u8[position + 2];
                        t8[3] = u8[position + 3];
                    }
                    else {
                        t8[3] = u8[position + 0];
                        t8[2] = u8[position + 1];
                        t8[1] = u8[position + 2];
                        t8[0] = u8[position + 3];
                    }
                    return Shumway.IntegerUtilities.f32[0];
                }
            };
            DataBuffer.prototype.readDouble = function () {
                var u8 = this._u8;
                var position = this._position;
                if (position + 8 > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                var t8 = Shumway.IntegerUtilities.u8;
                if (this._littleEndian) {
                    t8[0] = u8[position + 0];
                    t8[1] = u8[position + 1];
                    t8[2] = u8[position + 2];
                    t8[3] = u8[position + 3];
                    t8[4] = u8[position + 4];
                    t8[5] = u8[position + 5];
                    t8[6] = u8[position + 6];
                    t8[7] = u8[position + 7];
                }
                else {
                    t8[0] = u8[position + 7];
                    t8[1] = u8[position + 6];
                    t8[2] = u8[position + 5];
                    t8[3] = u8[position + 4];
                    t8[4] = u8[position + 3];
                    t8[5] = u8[position + 2];
                    t8[6] = u8[position + 1];
                    t8[7] = u8[position + 0];
                }
                this._position = position + 8;
                return Shumway.IntegerUtilities.f64[0];
            };
            DataBuffer.prototype.writeBoolean = function (value) {
                this.writeByte(!!value ? 1 : 0);
            };
            DataBuffer.prototype.writeByte = function (value) {
                var length = this._position + 1;
                this._ensureCapacity(length);
                this._u8[this._position++] = value;
                if (length > this._length) {
                    this._length = length;
                }
            };
            DataBuffer.prototype.writeUnsignedByte = function (value) {
                var length = this._position + 1;
                this._ensureCapacity(length);
                this._u8[this._position++] = value;
                if (length > this._length) {
                    this._length = length;
                }
            };
            DataBuffer.prototype.writeRawBytes = function (bytes) {
                var length = this._position + bytes.length;
                this._ensureCapacity(length);
                this._u8.set(bytes, this._position);
                this._position = length;
                if (length > this._length) {
                    this._length = length;
                }
            };
            DataBuffer.prototype.writeBytes = function (bytes, offset, length) {
                if (offset === void 0) { offset = 0; }
                if (length === void 0) { length = 0; }
                if (Shumway.isNullOrUndefined(bytes)) {
                    throwError('TypeError', Errors.NullPointerError, 'bytes');
                }
                if (arguments.length < 2) {
                    offset = 0;
                }
                if (arguments.length < 3) {
                    length = 0;
                }
                checkRange(offset, 0, bytes.length);
                checkRange(offset + length, 0, bytes.length);
                if (length === 0) {
                    length = bytes.length - offset;
                }
                this.writeRawBytes(new Int8Array(bytes._buffer, offset, length));
            };
            DataBuffer.prototype.writeShort = function (value) {
                this.writeUnsignedShort(value);
            };
            DataBuffer.prototype.writeUnsignedShort = function (value) {
                var position = this._position;
                this._ensureCapacity(position + 2);
                var u8 = this._u8;
                if (this._littleEndian) {
                    u8[position + 0] = value;
                    u8[position + 1] = value >> 8;
                }
                else {
                    u8[position + 0] = value >> 8;
                    u8[position + 1] = value;
                }
                position += 2;
                this._position = position;
                if (position > this._length) {
                    this._length = position;
                }
            };
            DataBuffer.prototype.writeInt = function (value) {
                this.writeUnsignedInt(value);
            };
            DataBuffer.prototype.write2Ints = function (a, b) {
                this.write2UnsignedInts(a, b);
            };
            DataBuffer.prototype.write4Ints = function (a, b, c, d) {
                this.write4UnsignedInts(a, b, c, d);
            };
            DataBuffer.prototype.writeUnsignedInt = function (value) {
                var position = this._position;
                this._ensureCapacity(position + 4);
                this._requestViews(2 /* I32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._i32) {
                    this._i32[position >> 2] = value;
                }
                else {
                    var u8 = this._u8;
                    if (this._littleEndian) {
                        u8[position + 0] = value;
                        u8[position + 1] = value >> 8;
                        u8[position + 2] = value >> 16;
                        u8[position + 3] = value >> 24;
                    }
                    else {
                        u8[position + 0] = value >> 24;
                        u8[position + 1] = value >> 16;
                        u8[position + 2] = value >> 8;
                        u8[position + 3] = value;
                    }
                }
                position += 4;
                this._position = position;
                if (position > this._length) {
                    this._length = position;
                }
            };
            DataBuffer.prototype.write2UnsignedInts = function (a, b) {
                var position = this._position;
                this._ensureCapacity(position + 8);
                this._requestViews(2 /* I32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._i32) {
                    this._i32[(position >> 2) + 0] = a;
                    this._i32[(position >> 2) + 1] = b;
                    position += 8;
                    this._position = position;
                    if (position > this._length) {
                        this._length = position;
                    }
                }
                else {
                    this.writeUnsignedInt(a);
                    this.writeUnsignedInt(b);
                }
            };
            DataBuffer.prototype.write4UnsignedInts = function (a, b, c, d) {
                var position = this._position;
                this._ensureCapacity(position + 16);
                this._requestViews(2 /* I32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._i32) {
                    this._i32[(position >> 2) + 0] = a;
                    this._i32[(position >> 2) + 1] = b;
                    this._i32[(position >> 2) + 2] = c;
                    this._i32[(position >> 2) + 3] = d;
                    position += 16;
                    this._position = position;
                    if (position > this._length) {
                        this._length = position;
                    }
                }
                else {
                    this.writeUnsignedInt(a);
                    this.writeUnsignedInt(b);
                    this.writeUnsignedInt(c);
                    this.writeUnsignedInt(d);
                }
            };
            DataBuffer.prototype.writeFloat = function (value) {
                var position = this._position;
                this._ensureCapacity(position + 4);
                this._requestViews(4 /* F32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._f32) {
                    this._f32[position >> 2] = value;
                }
                else {
                    var u8 = this._u8;
                    Shumway.IntegerUtilities.f32[0] = value;
                    var t8 = Shumway.IntegerUtilities.u8;
                    if (this._littleEndian) {
                        u8[position + 0] = t8[0];
                        u8[position + 1] = t8[1];
                        u8[position + 2] = t8[2];
                        u8[position + 3] = t8[3];
                    }
                    else {
                        u8[position + 0] = t8[3];
                        u8[position + 1] = t8[2];
                        u8[position + 2] = t8[1];
                        u8[position + 3] = t8[0];
                    }
                }
                position += 4;
                this._position = position;
                if (position > this._length) {
                    this._length = position;
                }
            };
            DataBuffer.prototype.write6Floats = function (a, b, c, d, e, f) {
                var position = this._position;
                this._ensureCapacity(position + 24);
                this._requestViews(4 /* F32 */);
                if (this._littleEndian === DataBuffer._nativeLittleEndian && (position & 0x3) === 0 && this._f32) {
                    this._f32[(position >> 2) + 0] = a;
                    this._f32[(position >> 2) + 1] = b;
                    this._f32[(position >> 2) + 2] = c;
                    this._f32[(position >> 2) + 3] = d;
                    this._f32[(position >> 2) + 4] = e;
                    this._f32[(position >> 2) + 5] = f;
                    position += 24;
                    this._position = position;
                    if (position > this._length) {
                        this._length = position;
                    }
                }
                else {
                    this.writeFloat(a);
                    this.writeFloat(b);
                    this.writeFloat(c);
                    this.writeFloat(d);
                    this.writeFloat(e);
                    this.writeFloat(f);
                }
            };
            DataBuffer.prototype.writeDouble = function (value) {
                var position = this._position;
                this._ensureCapacity(position + 8);
                var u8 = this._u8;
                Shumway.IntegerUtilities.f64[0] = value;
                var t8 = Shumway.IntegerUtilities.u8;
                if (this._littleEndian) {
                    u8[position + 0] = t8[0];
                    u8[position + 1] = t8[1];
                    u8[position + 2] = t8[2];
                    u8[position + 3] = t8[3];
                    u8[position + 4] = t8[4];
                    u8[position + 5] = t8[5];
                    u8[position + 6] = t8[6];
                    u8[position + 7] = t8[7];
                }
                else {
                    u8[position + 0] = t8[7];
                    u8[position + 1] = t8[6];
                    u8[position + 2] = t8[5];
                    u8[position + 3] = t8[4];
                    u8[position + 4] = t8[3];
                    u8[position + 5] = t8[2];
                    u8[position + 6] = t8[1];
                    u8[position + 7] = t8[0];
                }
                position += 8;
                this._position = position;
                if (position > this._length) {
                    this._length = position;
                }
            };
            DataBuffer.prototype.readRawBytes = function () {
                return new Int8Array(this._buffer, 0, this._length);
            };
            DataBuffer.prototype.writeUTF = function (value) {
                value = asCoerceString(value);
                var bytes = utf8decode(value);
                this.writeShort(bytes.length);
                this.writeRawBytes(bytes);
            };
            DataBuffer.prototype.writeUTFBytes = function (value) {
                value = asCoerceString(value);
                var bytes = utf8decode(value);
                this.writeRawBytes(bytes);
            };
            DataBuffer.prototype.readUTF = function () {
                return this.readUTFBytes(this.readShort());
            };
            DataBuffer.prototype.readUTFBytes = function (length) {
                length = length >>> 0;
                var pos = this._position;
                if (pos + length > this._length) {
                    throwError('EOFError', Errors.EOFError);
                }
                this._position += length;
                return utf8encode(new Int8Array(this._buffer, pos, length));
            };
            Object.defineProperty(DataBuffer.prototype, "length", {
                get: function () {
                    return this._length;
                },
                set: function (value) {
                    value = value >>> 0;
                    var capacity = this._buffer.byteLength;
                    if (value > capacity) {
                        this._ensureCapacity(value);
                    }
                    this._length = value;
                    this._position = clamp(this._position, 0, this._length);
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "bytesAvailable", {
                get: function () {
                    return this._length - this._position;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "position", {
                get: function () {
                    return this._position;
                },
                set: function (position) {
                    this._position = position >>> 0;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "buffer", {
                get: function () {
                    return this._buffer;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "bytes", {
                get: function () {
                    return this._u8;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "ints", {
                get: function () {
                    this._requestViews(2 /* I32 */);
                    return this._i32;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "objectEncoding", {
                get: function () {
                    return this._objectEncoding;
                },
                set: function (version) {
                    version = version >>> 0;
                    this._objectEncoding = version;
                },
                enumerable: true,
                configurable: true
            });
            Object.defineProperty(DataBuffer.prototype, "endian", {
                get: function () {
                    return this._littleEndian ? "littleEndian" : "bigEndian";
                },
                set: function (type) {
                    type = asCoerceString(type);
                    if (type === "auto") {
                        this._littleEndian = DataBuffer._nativeLittleEndian;
                    }
                    else {
                        this._littleEndian = type === "littleEndian";
                    }
                },
                enumerable: true,
                configurable: true
            });
            DataBuffer.prototype.toString = function () {
                return utf8encode(new Int8Array(this._buffer, 0, this._length));
            };
            DataBuffer.prototype.toBlob = function (type) {
                return new Blob([new Int8Array(this._buffer, this._position, this._length)], { type: type });
            };
            DataBuffer.prototype.writeMultiByte = function (value, charSet) {
                value = asCoerceString(value);
                charSet = asCoerceString(charSet);
                notImplemented("packageInternal flash.utils.ObjectOutput::writeMultiByte");
                return;
            };
            DataBuffer.prototype.readMultiByte = function (length, charSet) {
                length = length >>> 0;
                charSet = asCoerceString(charSet);
                notImplemented("packageInternal flash.utils.ObjectInput::readMultiByte");
                return;
            };
            DataBuffer.prototype.getValue = function (name) {
                name = name | 0;
                if (name >= this._length) {
                    return undefined;
                }
                return this._u8[name];
            };
            DataBuffer.prototype.setValue = function (name, value) {
                name = name | 0;
                var length = name + 1;
                this._ensureCapacity(length);
                this._u8[name] = value;
                if (length > this._length) {
                    this._length = length;
                }
            };
            DataBuffer.prototype.readFixed = function () {
                return this.readInt() / 65536;
            };
            DataBuffer.prototype.readFixed8 = function () {
                return this.readShort() / 256;
            };
            DataBuffer.prototype.readFloat16 = function () {
                var uint16 = this.readUnsignedShort();
                var sign = uint16 >> 15 ? -1 : 1;
                var exponent = (uint16 & 0x7c00) >> 10;
                var fraction = uint16 & 0x03ff;
                if (!exponent) {
                    return sign * Math.pow(2, -14) * (fraction / 1024);
                }
                if (exponent === 0x1f) {
                    return fraction ? NaN : sign * Infinity;
                }
                return sign * Math.pow(2, exponent - 15) * (1 + (fraction / 1024));
            };
            DataBuffer.prototype.readEncodedU32 = function () {
                var value = this.readUnsignedByte();
                if (!(value & 0x080)) {
                    return value;
                }
                value = (value & 0x7f) | this.readUnsignedByte() << 7;
                if (!(value & 0x4000)) {
                    return value;
                }
                value = (value & 0x3fff) | this.readUnsignedByte() << 14;
                if (!(value & 0x200000)) {
                    return value;
                }
                value = (value & 0x1FFFFF) | this.readUnsignedByte() << 21;
                if (!(value & 0x10000000)) {
                    return value;
                }
                return (value & 0xFFFFFFF) | (this.readUnsignedByte() << 28);
            };
            DataBuffer.prototype.readBits = function (size) {
                return (this.readUnsignedBits(size) << (32 - size)) >> (32 - size);
            };
            DataBuffer.prototype.readUnsignedBits = function (size) {
                var buffer = this._bitBuffer;
                var length = this._bitLength;
                while (size > length) {
                    buffer = (buffer << 8) | this.readUnsignedByte();
                    length += 8;
                }
                length -= size;
                var value = (buffer >>> length) & bitMasks[size];
                this._bitBuffer = buffer;
                this._bitLength = length;
                return value;
            };
            DataBuffer.prototype.readFixedBits = function (size) {
                return this.readBits(size) / 65536;
            };
            DataBuffer.prototype.readString = function (length) {
                var position = this._position;
                if (length) {
                    if (position + length > this._length) {
                        throwError('EOFError', Errors.EOFError);
                    }
                    this._position += length;
                }
                else {
                    length = 0;
                    for (var i = position; i < this._length && this._u8[i]; i++) {
                        length++;
                    }
                    this._position += length + 1;
                }
                return utf8encode(new Int8Array(this._buffer, position, length));
            };
            DataBuffer.prototype.align = function () {
                this._bitBuffer = 0;
                this._bitLength = 0;
            };
            DataBuffer.prototype._compress = function (algorithm) {
                algorithm = asCoerceString(algorithm);
                var deflate;
                switch (algorithm) {
                    case 'zlib':
                        deflate = new ArrayUtilities.Deflate(true);
                        break;
                    case 'deflate':
                        deflate = new ArrayUtilities.Deflate(false);
                        break;
                    default:
                        return;
                }
                var output = new DataBuffer();
                deflate.onData = output.writeRawBytes.bind(output);
                deflate.push(this._u8.subarray(0, this._length));
                deflate.close();
                this._ensureCapacity(output._u8.length);
                this._u8.set(output._u8);
                this.length = output.length;
                this._position = 0;
            };
            DataBuffer.prototype._uncompress = function (algorithm) {
                algorithm = asCoerceString(algorithm);
                var inflate;
                switch (algorithm) {
                    case 'zlib':
                        inflate = ArrayUtilities.Inflate.create(true);
                        break;
                    case 'deflate':
                        inflate = ArrayUtilities.Inflate.create(false);
                        break;
                    case 'lzma':
                        inflate = new ArrayUtilities.LzmaDecoder(false);
                        break;
                    default:
                        return;
                }
                var output = new DataBuffer();
                var error;
                inflate.onData = output.writeRawBytes.bind(output);
                inflate.onError = function (e) { return error = e; };
                inflate.push(this._u8.subarray(0, this._length));
                if (error) {
                    throwError('IOError', Errors.CompressedDataError);
                }
                inflate.close();
                this._ensureCapacity(output._u8.length);
                this._u8.set(output._u8);
                this.length = output.length;
                this._position = 0;
            };
            DataBuffer._nativeLittleEndian = new Int8Array(new Int32Array([1]).buffer)[0] === 1;
            DataBuffer.INITIAL_SIZE = 128;
            DataBuffer._arrayBufferPool = new Shumway.ArrayBufferPool();
            return DataBuffer;
        })();
        ArrayUtilities.DataBuffer = DataBuffer;
    })(ArrayUtilities = Shumway.ArrayUtilities || (Shumway.ArrayUtilities = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var DataBuffer = Shumway.ArrayUtilities.DataBuffer;
    var ensureTypedArrayCapacity = Shumway.ArrayUtilities.ensureTypedArrayCapacity;
    var assert = Shumway.Debug.assert;
    (function (PathCommand) {
        PathCommand[PathCommand["BeginSolidFill"] = 1] = "BeginSolidFill";
        PathCommand[PathCommand["BeginGradientFill"] = 2] = "BeginGradientFill";
        PathCommand[PathCommand["BeginBitmapFill"] = 3] = "BeginBitmapFill";
        PathCommand[PathCommand["EndFill"] = 4] = "EndFill";
        PathCommand[PathCommand["LineStyleSolid"] = 5] = "LineStyleSolid";
        PathCommand[PathCommand["LineStyleGradient"] = 6] = "LineStyleGradient";
        PathCommand[PathCommand["LineStyleBitmap"] = 7] = "LineStyleBitmap";
        PathCommand[PathCommand["LineEnd"] = 8] = "LineEnd";
        PathCommand[PathCommand["MoveTo"] = 9] = "MoveTo";
        PathCommand[PathCommand["LineTo"] = 10] = "LineTo";
        PathCommand[PathCommand["CurveTo"] = 11] = "CurveTo";
        PathCommand[PathCommand["CubicCurveTo"] = 12] = "CubicCurveTo";
    })(Shumway.PathCommand || (Shumway.PathCommand = {}));
    var PathCommand = Shumway.PathCommand;
    (function (GradientType) {
        GradientType[GradientType["Linear"] = 0x10] = "Linear";
        GradientType[GradientType["Radial"] = 0x12] = "Radial";
    })(Shumway.GradientType || (Shumway.GradientType = {}));
    var GradientType = Shumway.GradientType;
    (function (GradientSpreadMethod) {
        GradientSpreadMethod[GradientSpreadMethod["Pad"] = 0] = "Pad";
        GradientSpreadMethod[GradientSpreadMethod["Reflect"] = 1] = "Reflect";
        GradientSpreadMethod[GradientSpreadMethod["Repeat"] = 2] = "Repeat";
    })(Shumway.GradientSpreadMethod || (Shumway.GradientSpreadMethod = {}));
    var GradientSpreadMethod = Shumway.GradientSpreadMethod;
    (function (GradientInterpolationMethod) {
        GradientInterpolationMethod[GradientInterpolationMethod["RGB"] = 0] = "RGB";
        GradientInterpolationMethod[GradientInterpolationMethod["LinearRGB"] = 1] = "LinearRGB";
    })(Shumway.GradientInterpolationMethod || (Shumway.GradientInterpolationMethod = {}));
    var GradientInterpolationMethod = Shumway.GradientInterpolationMethod;
    (function (LineScaleMode) {
        LineScaleMode[LineScaleMode["None"] = 0] = "None";
        LineScaleMode[LineScaleMode["Normal"] = 1] = "Normal";
        LineScaleMode[LineScaleMode["Vertical"] = 2] = "Vertical";
        LineScaleMode[LineScaleMode["Horizontal"] = 3] = "Horizontal";
    })(Shumway.LineScaleMode || (Shumway.LineScaleMode = {}));
    var LineScaleMode = Shumway.LineScaleMode;
    var PlainObjectShapeData = (function () {
        function PlainObjectShapeData(commands, commandsPosition, coordinates, morphCoordinates, coordinatesPosition, styles, stylesLength, morphStyles, morphStylesLength, hasFills, hasLines) {
            this.commands = commands;
            this.commandsPosition = commandsPosition;
            this.coordinates = coordinates;
            this.morphCoordinates = morphCoordinates;
            this.coordinatesPosition = coordinatesPosition;
            this.styles = styles;
            this.stylesLength = stylesLength;
            this.morphStyles = morphStyles;
            this.morphStylesLength = morphStylesLength;
            this.hasFills = hasFills;
            this.hasLines = hasLines;
        }
        return PlainObjectShapeData;
    })();
    Shumway.PlainObjectShapeData = PlainObjectShapeData;
    var DefaultSize;
    (function (DefaultSize) {
        DefaultSize[DefaultSize["Commands"] = 32] = "Commands";
        DefaultSize[DefaultSize["Coordinates"] = 128] = "Coordinates";
        DefaultSize[DefaultSize["Styles"] = 16] = "Styles";
    })(DefaultSize || (DefaultSize = {}));
    var ShapeData = (function () {
        function ShapeData(initialize) {
            if (initialize === void 0) { initialize = true; }
            if (initialize) {
                this.clear();
            }
        }
        ShapeData.FromPlainObject = function (source) {
            var data = new ShapeData(false);
            data.commands = source.commands;
            data.coordinates = source.coordinates;
            data.morphCoordinates = source.morphCoordinates;
            data.commandsPosition = source.commandsPosition;
            data.coordinatesPosition = source.coordinatesPosition;
            data.styles = DataBuffer.FromArrayBuffer(source.styles, source.stylesLength);
            data.styles.endian = 'auto';
            if (source.morphStyles) {
                data.morphStyles = DataBuffer.FromArrayBuffer(source.morphStyles, source.morphStylesLength);
                data.morphStyles.endian = 'auto';
            }
            data.hasFills = source.hasFills;
            data.hasLines = source.hasLines;
            return data;
        };
        ShapeData.prototype.moveTo = function (x, y) {
            this.ensurePathCapacities(1, 2);
            this.commands[this.commandsPosition++] = 9 /* MoveTo */;
            this.coordinates[this.coordinatesPosition++] = x;
            this.coordinates[this.coordinatesPosition++] = y;
        };
        ShapeData.prototype.lineTo = function (x, y) {
            this.ensurePathCapacities(1, 2);
            this.commands[this.commandsPosition++] = 10 /* LineTo */;
            this.coordinates[this.coordinatesPosition++] = x;
            this.coordinates[this.coordinatesPosition++] = y;
        };
        ShapeData.prototype.curveTo = function (controlX, controlY, anchorX, anchorY) {
            this.ensurePathCapacities(1, 4);
            this.commands[this.commandsPosition++] = 11 /* CurveTo */;
            this.coordinates[this.coordinatesPosition++] = controlX;
            this.coordinates[this.coordinatesPosition++] = controlY;
            this.coordinates[this.coordinatesPosition++] = anchorX;
            this.coordinates[this.coordinatesPosition++] = anchorY;
        };
        ShapeData.prototype.cubicCurveTo = function (controlX1, controlY1, controlX2, controlY2, anchorX, anchorY) {
            this.ensurePathCapacities(1, 6);
            this.commands[this.commandsPosition++] = 12 /* CubicCurveTo */;
            this.coordinates[this.coordinatesPosition++] = controlX1;
            this.coordinates[this.coordinatesPosition++] = controlY1;
            this.coordinates[this.coordinatesPosition++] = controlX2;
            this.coordinates[this.coordinatesPosition++] = controlY2;
            this.coordinates[this.coordinatesPosition++] = anchorX;
            this.coordinates[this.coordinatesPosition++] = anchorY;
        };
        ShapeData.prototype.beginFill = function (color) {
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = 1 /* BeginSolidFill */;
            this.styles.writeUnsignedInt(color);
            this.hasFills = true;
        };
        ShapeData.prototype.writeMorphFill = function (color) {
            this.morphStyles.writeUnsignedInt(color);
        };
        ShapeData.prototype.endFill = function () {
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = 4 /* EndFill */;
        };
        ShapeData.prototype.endLine = function () {
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = 8 /* LineEnd */;
        };
        ShapeData.prototype.lineStyle = function (thickness, color, pixelHinting, scaleMode, caps, joints, miterLimit) {
            release || assert(thickness === (thickness | 0), thickness >= 0 && thickness <= 0xff * 20);
            this.ensurePathCapacities(2, 0);
            this.commands[this.commandsPosition++] = 5 /* LineStyleSolid */;
            this.coordinates[this.coordinatesPosition++] = thickness;
            var styles = this.styles;
            styles.writeUnsignedInt(color);
            styles.writeBoolean(pixelHinting);
            styles.writeUnsignedByte(scaleMode);
            styles.writeUnsignedByte(caps);
            styles.writeUnsignedByte(joints);
            styles.writeUnsignedByte(miterLimit);
            this.hasLines = true;
        };
        ShapeData.prototype.writeMorphLineStyle = function (thickness, color) {
            this.morphCoordinates[this.coordinatesPosition - 1] = thickness;
            this.morphStyles.writeUnsignedInt(color);
        };
        ShapeData.prototype.beginBitmap = function (pathCommand, bitmapId, matrix, repeat, smooth) {
            release || assert(pathCommand === 3 /* BeginBitmapFill */ || pathCommand === 7 /* LineStyleBitmap */);
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = pathCommand;
            var styles = this.styles;
            styles.writeUnsignedInt(bitmapId);
            this._writeStyleMatrix(matrix, false);
            styles.writeBoolean(repeat);
            styles.writeBoolean(smooth);
            this.hasFills = true;
        };
        ShapeData.prototype.writeMorphBitmap = function (matrix) {
            this._writeStyleMatrix(matrix, true);
        };
        ShapeData.prototype.beginGradient = function (pathCommand, colors, ratios, gradientType, matrix, spread, interpolation, focalPointRatio) {
            release || assert(pathCommand === 2 /* BeginGradientFill */ || pathCommand === 6 /* LineStyleGradient */);
            this.ensurePathCapacities(1, 0);
            this.commands[this.commandsPosition++] = pathCommand;
            var styles = this.styles;
            styles.writeUnsignedByte(gradientType);
            release || assert(focalPointRatio === (focalPointRatio | 0));
            styles.writeShort(focalPointRatio);
            this._writeStyleMatrix(matrix, false);
            var colorStops = colors.length;
            styles.writeByte(colorStops);
            for (var i = 0; i < colorStops; i++) {
                styles.writeUnsignedByte(ratios[i]);
                styles.writeUnsignedInt(colors[i]);
            }
            styles.writeUnsignedByte(spread);
            styles.writeUnsignedByte(interpolation);
            this.hasFills = true;
        };
        ShapeData.prototype.writeMorphGradient = function (colors, ratios, matrix) {
            this._writeStyleMatrix(matrix, true);
            var styles = this.morphStyles;
            for (var i = 0; i < colors.length; i++) {
                styles.writeUnsignedByte(ratios[i]);
                styles.writeUnsignedInt(colors[i]);
            }
        };
        ShapeData.prototype.writeCommandAndCoordinates = function (command, x, y) {
            this.ensurePathCapacities(1, 2);
            this.commands[this.commandsPosition++] = command;
            this.coordinates[this.coordinatesPosition++] = x;
            this.coordinates[this.coordinatesPosition++] = y;
        };
        ShapeData.prototype.writeCoordinates = function (x, y) {
            this.ensurePathCapacities(0, 2);
            this.coordinates[this.coordinatesPosition++] = x;
            this.coordinates[this.coordinatesPosition++] = y;
        };
        ShapeData.prototype.writeMorphCoordinates = function (x, y) {
            this.morphCoordinates = ensureTypedArrayCapacity(this.morphCoordinates, this.coordinatesPosition);
            this.morphCoordinates[this.coordinatesPosition - 2] = x;
            this.morphCoordinates[this.coordinatesPosition - 1] = y;
        };
        ShapeData.prototype.clear = function () {
            this.commandsPosition = this.coordinatesPosition = 0;
            this.commands = new Uint8Array(32 /* Commands */);
            this.coordinates = new Int32Array(128 /* Coordinates */);
            this.styles = new DataBuffer(16 /* Styles */);
            this.styles.endian = 'auto';
            this.hasFills = this.hasLines = false;
        };
        ShapeData.prototype.isEmpty = function () {
            return this.commandsPosition === 0;
        };
        ShapeData.prototype.clone = function () {
            var copy = new ShapeData(false);
            copy.commands = new Uint8Array(this.commands);
            copy.commandsPosition = this.commandsPosition;
            copy.coordinates = new Int32Array(this.coordinates);
            copy.coordinatesPosition = this.coordinatesPosition;
            copy.styles = new DataBuffer(this.styles.length);
            copy.styles.writeRawBytes(this.styles.bytes);
            if (this.morphStyles) {
                copy.morphStyles = new DataBuffer(this.morphStyles.length);
                copy.morphStyles.writeRawBytes(this.morphStyles.bytes);
            }
            copy.hasFills = this.hasFills;
            copy.hasLines = this.hasLines;
            return copy;
        };
        ShapeData.prototype.toPlainObject = function () {
            return new PlainObjectShapeData(this.commands, this.commandsPosition, this.coordinates, this.morphCoordinates, this.coordinatesPosition, this.styles.buffer, this.styles.length, this.morphStyles && this.morphStyles.buffer, this.morphStyles ? this.morphStyles.length : 0, this.hasFills, this.hasLines);
        };
        Object.defineProperty(ShapeData.prototype, "buffers", {
            get: function () {
                var buffers = [this.commands.buffer, this.coordinates.buffer, this.styles.buffer];
                if (this.morphCoordinates) {
                    buffers.push(this.morphCoordinates.buffer);
                }
                if (this.morphStyles) {
                    buffers.push(this.morphStyles.buffer);
                }
                return buffers;
            },
            enumerable: true,
            configurable: true
        });
        ShapeData.prototype._writeStyleMatrix = function (matrix, isMorph) {
            var styles = isMorph ? this.morphStyles : this.styles;
            styles.write6Floats(matrix.a, matrix.b, matrix.c, matrix.d, matrix.tx, matrix.ty);
        };
        ShapeData.prototype.ensurePathCapacities = function (numCommands, numCoordinates) {
            this.commands = ensureTypedArrayCapacity(this.commands, this.commandsPosition + numCommands);
            this.coordinates = ensureTypedArrayCapacity(this.coordinates, this.coordinatesPosition + numCoordinates);
        };
        return ShapeData;
    })();
    Shumway.ShapeData = ShapeData;
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var SWF;
    (function (SWF) {
        var Parser;
        (function (Parser) {
            (function (SwfTag) {
                SwfTag[SwfTag["CODE_END"] = 0] = "CODE_END";
                SwfTag[SwfTag["CODE_SHOW_FRAME"] = 1] = "CODE_SHOW_FRAME";
                SwfTag[SwfTag["CODE_DEFINE_SHAPE"] = 2] = "CODE_DEFINE_SHAPE";
                SwfTag[SwfTag["CODE_FREE_CHARACTER"] = 3] = "CODE_FREE_CHARACTER";
                SwfTag[SwfTag["CODE_PLACE_OBJECT"] = 4] = "CODE_PLACE_OBJECT";
                SwfTag[SwfTag["CODE_REMOVE_OBJECT"] = 5] = "CODE_REMOVE_OBJECT";
                SwfTag[SwfTag["CODE_DEFINE_BITS"] = 6] = "CODE_DEFINE_BITS";
                SwfTag[SwfTag["CODE_DEFINE_BUTTON"] = 7] = "CODE_DEFINE_BUTTON";
                SwfTag[SwfTag["CODE_JPEG_TABLES"] = 8] = "CODE_JPEG_TABLES";
                SwfTag[SwfTag["CODE_SET_BACKGROUND_COLOR"] = 9] = "CODE_SET_BACKGROUND_COLOR";
                SwfTag[SwfTag["CODE_DEFINE_FONT"] = 10] = "CODE_DEFINE_FONT";
                SwfTag[SwfTag["CODE_DEFINE_TEXT"] = 11] = "CODE_DEFINE_TEXT";
                SwfTag[SwfTag["CODE_DO_ACTION"] = 12] = "CODE_DO_ACTION";
                SwfTag[SwfTag["CODE_DEFINE_FONT_INFO"] = 13] = "CODE_DEFINE_FONT_INFO";
                SwfTag[SwfTag["CODE_DEFINE_SOUND"] = 14] = "CODE_DEFINE_SOUND";
                SwfTag[SwfTag["CODE_START_SOUND"] = 15] = "CODE_START_SOUND";
                SwfTag[SwfTag["CODE_STOP_SOUND"] = 16] = "CODE_STOP_SOUND";
                SwfTag[SwfTag["CODE_DEFINE_BUTTON_SOUND"] = 17] = "CODE_DEFINE_BUTTON_SOUND";
                SwfTag[SwfTag["CODE_SOUND_STREAM_HEAD"] = 18] = "CODE_SOUND_STREAM_HEAD";
                SwfTag[SwfTag["CODE_SOUND_STREAM_BLOCK"] = 19] = "CODE_SOUND_STREAM_BLOCK";
                SwfTag[SwfTag["CODE_DEFINE_BITS_LOSSLESS"] = 20] = "CODE_DEFINE_BITS_LOSSLESS";
                SwfTag[SwfTag["CODE_DEFINE_BITS_JPEG2"] = 21] = "CODE_DEFINE_BITS_JPEG2";
                SwfTag[SwfTag["CODE_DEFINE_SHAPE2"] = 22] = "CODE_DEFINE_SHAPE2";
                SwfTag[SwfTag["CODE_DEFINE_BUTTON_CXFORM"] = 23] = "CODE_DEFINE_BUTTON_CXFORM";
                SwfTag[SwfTag["CODE_PROTECT"] = 24] = "CODE_PROTECT";
                SwfTag[SwfTag["CODE_PATHS_ARE_POSTSCRIPT"] = 25] = "CODE_PATHS_ARE_POSTSCRIPT";
                SwfTag[SwfTag["CODE_PLACE_OBJECT2"] = 26] = "CODE_PLACE_OBJECT2";
                SwfTag[SwfTag["CODE_REMOVE_OBJECT2"] = 28] = "CODE_REMOVE_OBJECT2";
                SwfTag[SwfTag["CODE_SYNC_FRAME"] = 29] = "CODE_SYNC_FRAME";
                SwfTag[SwfTag["CODE_FREE_ALL"] = 31] = "CODE_FREE_ALL";
                SwfTag[SwfTag["CODE_DEFINE_SHAPE3"] = 32] = "CODE_DEFINE_SHAPE3";
                SwfTag[SwfTag["CODE_DEFINE_TEXT2"] = 33] = "CODE_DEFINE_TEXT2";
                SwfTag[SwfTag["CODE_DEFINE_BUTTON2"] = 34] = "CODE_DEFINE_BUTTON2";
                SwfTag[SwfTag["CODE_DEFINE_BITS_JPEG3"] = 35] = "CODE_DEFINE_BITS_JPEG3";
                SwfTag[SwfTag["CODE_DEFINE_BITS_LOSSLESS2"] = 36] = "CODE_DEFINE_BITS_LOSSLESS2";
                SwfTag[SwfTag["CODE_DEFINE_EDIT_TEXT"] = 37] = "CODE_DEFINE_EDIT_TEXT";
                SwfTag[SwfTag["CODE_DEFINE_VIDEO"] = 38] = "CODE_DEFINE_VIDEO";
                SwfTag[SwfTag["CODE_DEFINE_SPRITE"] = 39] = "CODE_DEFINE_SPRITE";
                SwfTag[SwfTag["CODE_NAME_CHARACTER"] = 40] = "CODE_NAME_CHARACTER";
                SwfTag[SwfTag["CODE_PRODUCT_INFO"] = 41] = "CODE_PRODUCT_INFO";
                SwfTag[SwfTag["CODE_DEFINE_TEXT_FORMAT"] = 42] = "CODE_DEFINE_TEXT_FORMAT";
                SwfTag[SwfTag["CODE_FRAME_LABEL"] = 43] = "CODE_FRAME_LABEL";
                SwfTag[SwfTag["CODE_DEFINE_BEHAVIOUR"] = 44] = "CODE_DEFINE_BEHAVIOUR";
                SwfTag[SwfTag["CODE_SOUND_STREAM_HEAD2"] = 45] = "CODE_SOUND_STREAM_HEAD2";
                SwfTag[SwfTag["CODE_DEFINE_MORPH_SHAPE"] = 46] = "CODE_DEFINE_MORPH_SHAPE";
                SwfTag[SwfTag["CODE_GENERATE_FRAME"] = 47] = "CODE_GENERATE_FRAME";
                SwfTag[SwfTag["CODE_DEFINE_FONT2"] = 48] = "CODE_DEFINE_FONT2";
                SwfTag[SwfTag["CODE_GEN_COMMAND"] = 49] = "CODE_GEN_COMMAND";
                SwfTag[SwfTag["CODE_DEFINE_COMMAND_OBJECT"] = 50] = "CODE_DEFINE_COMMAND_OBJECT";
                SwfTag[SwfTag["CODE_CHARACTER_SET"] = 51] = "CODE_CHARACTER_SET";
                SwfTag[SwfTag["CODE_EXTERNAL_FONT"] = 52] = "CODE_EXTERNAL_FONT";
                SwfTag[SwfTag["CODE_DEFINE_FUNCTION"] = 53] = "CODE_DEFINE_FUNCTION";
                SwfTag[SwfTag["CODE_PLACE_FUNCTION"] = 54] = "CODE_PLACE_FUNCTION";
                SwfTag[SwfTag["CODE_GEN_TAG_OBJECTS"] = 55] = "CODE_GEN_TAG_OBJECTS";
                SwfTag[SwfTag["CODE_EXPORT_ASSETS"] = 56] = "CODE_EXPORT_ASSETS";
                SwfTag[SwfTag["CODE_IMPORT_ASSETS"] = 57] = "CODE_IMPORT_ASSETS";
                SwfTag[SwfTag["CODE_ENABLE_DEBUGGER"] = 58] = "CODE_ENABLE_DEBUGGER";
                SwfTag[SwfTag["CODE_DO_INIT_ACTION"] = 59] = "CODE_DO_INIT_ACTION";
                SwfTag[SwfTag["CODE_DEFINE_VIDEO_STREAM"] = 60] = "CODE_DEFINE_VIDEO_STREAM";
                SwfTag[SwfTag["CODE_VIDEO_FRAME"] = 61] = "CODE_VIDEO_FRAME";
                SwfTag[SwfTag["CODE_DEFINE_FONT_INFO2"] = 62] = "CODE_DEFINE_FONT_INFO2";
                SwfTag[SwfTag["CODE_DEBUG_ID"] = 63] = "CODE_DEBUG_ID";
                SwfTag[SwfTag["CODE_ENABLE_DEBUGGER2"] = 64] = "CODE_ENABLE_DEBUGGER2";
                SwfTag[SwfTag["CODE_SCRIPT_LIMITS"] = 65] = "CODE_SCRIPT_LIMITS";
                SwfTag[SwfTag["CODE_SET_TAB_INDEX"] = 66] = "CODE_SET_TAB_INDEX";
                SwfTag[SwfTag["CODE_FILE_ATTRIBUTES"] = 69] = "CODE_FILE_ATTRIBUTES";
                SwfTag[SwfTag["CODE_PLACE_OBJECT3"] = 70] = "CODE_PLACE_OBJECT3";
                SwfTag[SwfTag["CODE_IMPORT_ASSETS2"] = 71] = "CODE_IMPORT_ASSETS2";
                SwfTag[SwfTag["CODE_DO_ABC_DEFINE"] = 72] = "CODE_DO_ABC_DEFINE";
                SwfTag[SwfTag["CODE_DEFINE_FONT_ALIGN_ZONES"] = 73] = "CODE_DEFINE_FONT_ALIGN_ZONES";
                SwfTag[SwfTag["CODE_CSM_TEXT_SETTINGS"] = 74] = "CODE_CSM_TEXT_SETTINGS";
                SwfTag[SwfTag["CODE_DEFINE_FONT3"] = 75] = "CODE_DEFINE_FONT3";
                SwfTag[SwfTag["CODE_SYMBOL_CLASS"] = 76] = "CODE_SYMBOL_CLASS";
                SwfTag[SwfTag["CODE_METADATA"] = 77] = "CODE_METADATA";
                SwfTag[SwfTag["CODE_DEFINE_SCALING_GRID"] = 78] = "CODE_DEFINE_SCALING_GRID";
                SwfTag[SwfTag["CODE_DO_ABC"] = 82] = "CODE_DO_ABC";
                SwfTag[SwfTag["CODE_DEFINE_SHAPE4"] = 83] = "CODE_DEFINE_SHAPE4";
                SwfTag[SwfTag["CODE_DEFINE_MORPH_SHAPE2"] = 84] = "CODE_DEFINE_MORPH_SHAPE2";
                SwfTag[SwfTag["CODE_DEFINE_SCENE_AND_FRAME_LABEL_DATA"] = 86] = "CODE_DEFINE_SCENE_AND_FRAME_LABEL_DATA";
                SwfTag[SwfTag["CODE_DEFINE_BINARY_DATA"] = 87] = "CODE_DEFINE_BINARY_DATA";
                SwfTag[SwfTag["CODE_DEFINE_FONT_NAME"] = 88] = "CODE_DEFINE_FONT_NAME";
                SwfTag[SwfTag["CODE_START_SOUND2"] = 89] = "CODE_START_SOUND2";
                SwfTag[SwfTag["CODE_DEFINE_BITS_JPEG4"] = 90] = "CODE_DEFINE_BITS_JPEG4";
                SwfTag[SwfTag["CODE_DEFINE_FONT4"] = 91] = "CODE_DEFINE_FONT4";
            })(Parser.SwfTag || (Parser.SwfTag = {}));
            var SwfTag = Parser.SwfTag;
            (function (DefinitionTags) {
                DefinitionTags[DefinitionTags["CODE_DEFINE_SHAPE"] = 2] = "CODE_DEFINE_SHAPE";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS"] = 6] = "CODE_DEFINE_BITS";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BUTTON"] = 7] = "CODE_DEFINE_BUTTON";
                DefinitionTags[DefinitionTags["CODE_DEFINE_FONT"] = 10] = "CODE_DEFINE_FONT";
                DefinitionTags[DefinitionTags["CODE_DEFINE_TEXT"] = 11] = "CODE_DEFINE_TEXT";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SOUND"] = 14] = "CODE_DEFINE_SOUND";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_LOSSLESS"] = 20] = "CODE_DEFINE_BITS_LOSSLESS";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_JPEG2"] = 21] = "CODE_DEFINE_BITS_JPEG2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SHAPE2"] = 22] = "CODE_DEFINE_SHAPE2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SHAPE3"] = 32] = "CODE_DEFINE_SHAPE3";
                DefinitionTags[DefinitionTags["CODE_DEFINE_TEXT2"] = 33] = "CODE_DEFINE_TEXT2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BUTTON2"] = 34] = "CODE_DEFINE_BUTTON2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_JPEG3"] = 35] = "CODE_DEFINE_BITS_JPEG3";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_LOSSLESS2"] = 36] = "CODE_DEFINE_BITS_LOSSLESS2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_EDIT_TEXT"] = 37] = "CODE_DEFINE_EDIT_TEXT";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SPRITE"] = 39] = "CODE_DEFINE_SPRITE";
                DefinitionTags[DefinitionTags["CODE_DEFINE_MORPH_SHAPE"] = 46] = "CODE_DEFINE_MORPH_SHAPE";
                DefinitionTags[DefinitionTags["CODE_DEFINE_FONT2"] = 48] = "CODE_DEFINE_FONT2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_VIDEO_STREAM"] = 60] = "CODE_DEFINE_VIDEO_STREAM";
                DefinitionTags[DefinitionTags["CODE_DEFINE_FONT3"] = 75] = "CODE_DEFINE_FONT3";
                DefinitionTags[DefinitionTags["CODE_DEFINE_SHAPE4"] = 83] = "CODE_DEFINE_SHAPE4";
                DefinitionTags[DefinitionTags["CODE_DEFINE_MORPH_SHAPE2"] = 84] = "CODE_DEFINE_MORPH_SHAPE2";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BINARY_DATA"] = 87] = "CODE_DEFINE_BINARY_DATA";
                DefinitionTags[DefinitionTags["CODE_DEFINE_BITS_JPEG4"] = 90] = "CODE_DEFINE_BITS_JPEG4";
                DefinitionTags[DefinitionTags["CODE_DEFINE_FONT4"] = 91] = "CODE_DEFINE_FONT4";
            })(Parser.DefinitionTags || (Parser.DefinitionTags = {}));
            var DefinitionTags = Parser.DefinitionTags;
            (function (ImageDefinitionTags) {
                ImageDefinitionTags[ImageDefinitionTags["CODE_DEFINE_BITS"] = 6] = "CODE_DEFINE_BITS";
                ImageDefinitionTags[ImageDefinitionTags["CODE_DEFINE_BITS_JPEG2"] = 21] = "CODE_DEFINE_BITS_JPEG2";
                ImageDefinitionTags[ImageDefinitionTags["CODE_DEFINE_BITS_JPEG3"] = 35] = "CODE_DEFINE_BITS_JPEG3";
                ImageDefinitionTags[ImageDefinitionTags["CODE_DEFINE_BITS_JPEG4"] = 90] = "CODE_DEFINE_BITS_JPEG4";
            })(Parser.ImageDefinitionTags || (Parser.ImageDefinitionTags = {}));
            var ImageDefinitionTags = Parser.ImageDefinitionTags;
            (function (FontDefinitionTags) {
                FontDefinitionTags[FontDefinitionTags["CODE_DEFINE_FONT"] = 10] = "CODE_DEFINE_FONT";
                FontDefinitionTags[FontDefinitionTags["CODE_DEFINE_FONT2"] = 48] = "CODE_DEFINE_FONT2";
                FontDefinitionTags[FontDefinitionTags["CODE_DEFINE_FONT3"] = 75] = "CODE_DEFINE_FONT3";
                FontDefinitionTags[FontDefinitionTags["CODE_DEFINE_FONT4"] = 91] = "CODE_DEFINE_FONT4";
            })(Parser.FontDefinitionTags || (Parser.FontDefinitionTags = {}));
            var FontDefinitionTags = Parser.FontDefinitionTags;
            (function (ControlTags) {
                ControlTags[ControlTags["CODE_PLACE_OBJECT"] = 4] = "CODE_PLACE_OBJECT";
                ControlTags[ControlTags["CODE_PLACE_OBJECT2"] = 26] = "CODE_PLACE_OBJECT2";
                ControlTags[ControlTags["CODE_PLACE_OBJECT3"] = 70] = "CODE_PLACE_OBJECT3";
                ControlTags[ControlTags["CODE_REMOVE_OBJECT"] = 5] = "CODE_REMOVE_OBJECT";
                ControlTags[ControlTags["CODE_REMOVE_OBJECT2"] = 28] = "CODE_REMOVE_OBJECT2";
                ControlTags[ControlTags["CODE_START_SOUND"] = 15] = "CODE_START_SOUND";
                ControlTags[ControlTags["CODE_START_SOUND2"] = 89] = "CODE_START_SOUND2";
                ControlTags[ControlTags["CODE_VIDEO_FRAME"] = 61] = "CODE_VIDEO_FRAME";
            })(Parser.ControlTags || (Parser.ControlTags = {}));
            var ControlTags = Parser.ControlTags;
            (function (PlaceObjectFlags) {
                PlaceObjectFlags[PlaceObjectFlags["Move"] = 0x0001] = "Move";
                PlaceObjectFlags[PlaceObjectFlags["HasCharacter"] = 0x0002] = "HasCharacter";
                PlaceObjectFlags[PlaceObjectFlags["HasMatrix"] = 0x0004] = "HasMatrix";
                PlaceObjectFlags[PlaceObjectFlags["HasColorTransform"] = 0x0008] = "HasColorTransform";
                PlaceObjectFlags[PlaceObjectFlags["HasRatio"] = 0x0010] = "HasRatio";
                PlaceObjectFlags[PlaceObjectFlags["HasName"] = 0x0020] = "HasName";
                PlaceObjectFlags[PlaceObjectFlags["HasClipDepth"] = 0x0040] = "HasClipDepth";
                PlaceObjectFlags[PlaceObjectFlags["HasClipActions"] = 0x0080] = "HasClipActions";
                PlaceObjectFlags[PlaceObjectFlags["HasFilterList"] = 0x0100] = "HasFilterList";
                PlaceObjectFlags[PlaceObjectFlags["HasBlendMode"] = 0x0200] = "HasBlendMode";
                PlaceObjectFlags[PlaceObjectFlags["HasCacheAsBitmap"] = 0x0400] = "HasCacheAsBitmap";
                PlaceObjectFlags[PlaceObjectFlags["HasClassName"] = 0x0800] = "HasClassName";
                PlaceObjectFlags[PlaceObjectFlags["HasImage"] = 0x1000] = "HasImage";
                PlaceObjectFlags[PlaceObjectFlags["HasVisible"] = 0x2000] = "HasVisible";
                PlaceObjectFlags[PlaceObjectFlags["OpaqueBackground"] = 0x4000] = "OpaqueBackground";
                PlaceObjectFlags[PlaceObjectFlags["Reserved"] = 0x8000] = "Reserved";
            })(Parser.PlaceObjectFlags || (Parser.PlaceObjectFlags = {}));
            var PlaceObjectFlags = Parser.PlaceObjectFlags;
            (function (AVM1ClipEvents) {
                AVM1ClipEvents[AVM1ClipEvents["Load"] = 0x00001] = "Load";
                AVM1ClipEvents[AVM1ClipEvents["EnterFrame"] = 0x00002] = "EnterFrame";
                AVM1ClipEvents[AVM1ClipEvents["Unload"] = 0x00004] = "Unload";
                AVM1ClipEvents[AVM1ClipEvents["MouseMove"] = 0x00008] = "MouseMove";
                AVM1ClipEvents[AVM1ClipEvents["MouseDown"] = 0x00010] = "MouseDown";
                AVM1ClipEvents[AVM1ClipEvents["MouseUp"] = 0x00020] = "MouseUp";
                AVM1ClipEvents[AVM1ClipEvents["KeyDown"] = 0x00040] = "KeyDown";
                AVM1ClipEvents[AVM1ClipEvents["KeyUp"] = 0x00080] = "KeyUp";
                AVM1ClipEvents[AVM1ClipEvents["Data"] = 0x00100] = "Data";
                AVM1ClipEvents[AVM1ClipEvents["Initialize"] = 0x00200] = "Initialize";
                AVM1ClipEvents[AVM1ClipEvents["Press"] = 0x00400] = "Press";
                AVM1ClipEvents[AVM1ClipEvents["Release"] = 0x00800] = "Release";
                AVM1ClipEvents[AVM1ClipEvents["ReleaseOutside"] = 0x01000] = "ReleaseOutside";
                AVM1ClipEvents[AVM1ClipEvents["RollOver"] = 0x02000] = "RollOver";
                AVM1ClipEvents[AVM1ClipEvents["RollOut"] = 0x04000] = "RollOut";
                AVM1ClipEvents[AVM1ClipEvents["DragOver"] = 0x08000] = "DragOver";
                AVM1ClipEvents[AVM1ClipEvents["DragOut"] = 0x10000] = "DragOut";
                AVM1ClipEvents[AVM1ClipEvents["KeyPress"] = 0x20000] = "KeyPress";
                AVM1ClipEvents[AVM1ClipEvents["Construct"] = 0x40000] = "Construct";
            })(Parser.AVM1ClipEvents || (Parser.AVM1ClipEvents = {}));
            var AVM1ClipEvents = Parser.AVM1ClipEvents;
        })(Parser = SWF.Parser || (SWF.Parser = {}));
    })(SWF = Shumway.SWF || (Shumway.SWF = {}));
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var unexpected = Shumway.Debug.unexpected;
    var BinaryFileReader = (function () {
        function BinaryFileReader(url, method, mimeType, data) {
            this.url = url;
            this.method = method;
            this.mimeType = mimeType;
            this.data = data;
        }
        BinaryFileReader.prototype.readAll = function (progress, complete) {
            var url = this.url;
            var xhr = new XMLHttpRequest({ mozSystem: true });
            var async = true;
            xhr.open(this.method || "GET", this.url, async);
            xhr.responseType = "arraybuffer";
            if (progress) {
                xhr.onprogress = function (event) {
                    progress(xhr.response, event.loaded, event.total);
                };
            }
            xhr.onreadystatechange = function (event) {
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200 && xhr.status !== 0 || xhr.response === null) {
                        unexpected("Path: " + url + " not found.");
                        complete(null, xhr.statusText);
                        return;
                    }
                    complete(xhr.response);
                }
            };
            if (this.mimeType) {
                xhr.setRequestHeader("Content-Type", this.mimeType);
            }
            xhr.send(this.data || null);
        };
        BinaryFileReader.prototype.readChunked = function (chunkSize, ondata, onerror, onopen, oncomplete, onhttpstatus) {
            if (chunkSize <= 0) {
                this.readAsync(ondata, onerror, onopen, oncomplete, onhttpstatus);
                return;
            }
            var position = 0;
            var buffer = new Uint8Array(chunkSize);
            var read = 0, total;
            this.readAsync(function (data, progress) {
                total = progress.total;
                var left = data.length, offset = 0;
                while (position + left >= chunkSize) {
                    var tailSize = chunkSize - position;
                    buffer.set(data.subarray(offset, offset + tailSize), position);
                    offset += tailSize;
                    left -= tailSize;
                    read += chunkSize;
                    ondata(buffer, { loaded: read, total: total });
                    position = 0;
                }
                buffer.set(data.subarray(offset), position);
                position += left;
            }, onerror, onopen, function () {
                if (position > 0) {
                    read += position;
                    ondata(buffer.subarray(0, position), { loaded: read, total: total });
                    position = 0;
                }
                oncomplete && oncomplete();
            }, onhttpstatus);
        };
        BinaryFileReader.prototype.readAsync = function (ondata, onerror, onopen, oncomplete, onhttpstatus) {
            var xhr = new XMLHttpRequest({ mozSystem: true });
            var url = this.url;
            var loaded = 0;
            var total = 0;
            xhr.open(this.method || "GET", url, true);
            xhr.responseType = 'moz-chunked-arraybuffer';
            var isNotProgressive = xhr.responseType !== 'moz-chunked-arraybuffer';
            if (isNotProgressive) {
                xhr.responseType = 'arraybuffer';
            }
            xhr.onprogress = function (e) {
                if (isNotProgressive)
                    return;
                loaded = e.loaded;
                total = e.total;
                ondata(new Uint8Array(xhr.response), { loaded: loaded, total: total });
            };
            xhr.onreadystatechange = function (event) {
                if (xhr.readyState === 2 && onhttpstatus) {
                    onhttpstatus(url, xhr.status, xhr.getAllResponseHeaders());
                }
                if (xhr.readyState === 4) {
                    if (xhr.status !== 200 && xhr.status !== 0 || xhr.response === null && (total === 0 || loaded !== total)) {
                        onerror(xhr.statusText);
                        return;
                    }
                    if (isNotProgressive) {
                        var buffer = xhr.response;
                        ondata(new Uint8Array(buffer), { loaded: 0, total: buffer.byteLength });
                    }
                    if (oncomplete) {
                        oncomplete();
                    }
                }
            };
            if (this.mimeType) {
                xhr.setRequestHeader("Content-Type", this.mimeType);
            }
            xhr.send(this.data || null);
            if (onopen) {
                onopen();
            }
        };
        return BinaryFileReader;
    })();
    Shumway.BinaryFileReader = BinaryFileReader;
})(Shumway || (Shumway = {}));
var Shumway;
(function (Shumway) {
    var Remoting;
    (function (Remoting) {
        (function (RemotingPhase) {
            RemotingPhase[RemotingPhase["Objects"] = 0] = "Objects";
            RemotingPhase[RemotingPhase["References"] = 1] = "References";
        })(Remoting.RemotingPhase || (Remoting.RemotingPhase = {}));
        var RemotingPhase = Remoting.RemotingPhase;
        (function (MessageBits) {
            MessageBits[MessageBits["HasMatrix"] = 0x0001] = "HasMatrix";
            MessageBits[MessageBits["HasBounds"] = 0x0002] = "HasBounds";
            MessageBits[MessageBits["HasChildren"] = 0x0004] = "HasChildren";
            MessageBits[MessageBits["HasColorTransform"] = 0x0008] = "HasColorTransform";
            MessageBits[MessageBits["HasClipRect"] = 0x0010] = "HasClipRect";
            MessageBits[MessageBits["HasMiscellaneousProperties"] = 0x0020] = "HasMiscellaneousProperties";
            MessageBits[MessageBits["HasMask"] = 0x0040] = "HasMask";
            MessageBits[MessageBits["HasClip"] = 0x0080] = "HasClip";
        })(Remoting.MessageBits || (Remoting.MessageBits = {}));
        var MessageBits = Remoting.MessageBits;
        (function (IDMask) {
            IDMask[IDMask["None"] = 0x00000000] = "None";
            IDMask[IDMask["Asset"] = 0x08000000] = "Asset";
        })(Remoting.IDMask || (Remoting.IDMask = {}));
        var IDMask = Remoting.IDMask;
        (function (MessageTag) {
            MessageTag[MessageTag["EOF"] = 0] = "EOF";
            MessageTag[MessageTag["UpdateFrame"] = 100] = "UpdateFrame";
            MessageTag[MessageTag["UpdateGraphics"] = 101] = "UpdateGraphics";
            MessageTag[MessageTag["UpdateBitmapData"] = 102] = "UpdateBitmapData";
            MessageTag[MessageTag["UpdateTextContent"] = 103] = "UpdateTextContent";
            MessageTag[MessageTag["UpdateStage"] = 104] = "UpdateStage";
            MessageTag[MessageTag["UpdateNetStream"] = 105] = "UpdateNetStream";
            MessageTag[MessageTag["RequestBitmapData"] = 106] = "RequestBitmapData";
            MessageTag[MessageTag["DrawToBitmap"] = 200] = "DrawToBitmap";
            MessageTag[MessageTag["MouseEvent"] = 300] = "MouseEvent";
            MessageTag[MessageTag["KeyboardEvent"] = 301] = "KeyboardEvent";
            MessageTag[MessageTag["FocusEvent"] = 302] = "FocusEvent";
        })(Remoting.MessageTag || (Remoting.MessageTag = {}));
        var MessageTag = Remoting.MessageTag;
        (function (FilterType) {
            FilterType[FilterType["Blur"] = 0] = "Blur";
            FilterType[FilterType["DropShadow"] = 1] = "DropShadow";
        })(Remoting.FilterType || (Remoting.FilterType = {}));
        var FilterType = Remoting.FilterType;
        (function (ColorTransformEncoding) {
            ColorTransformEncoding[ColorTransformEncoding["Identity"] = 0] = "Identity";
            ColorTransformEncoding[ColorTransformEncoding["AlphaMultiplierOnly"] = 1] = "AlphaMultiplierOnly";
            ColorTransformEncoding[ColorTransformEncoding["All"] = 2] = "All";
        })(Remoting.ColorTransformEncoding || (Remoting.ColorTransformEncoding = {}));
        var ColorTransformEncoding = Remoting.ColorTransformEncoding;
        (function (VideoPlaybackEvent) {
            VideoPlaybackEvent[VideoPlaybackEvent["Initialized"] = 0] = "Initialized";
            VideoPlaybackEvent[VideoPlaybackEvent["Metadata"] = 1] = "Metadata";
            VideoPlaybackEvent[VideoPlaybackEvent["PlayStart"] = 2] = "PlayStart";
            VideoPlaybackEvent[VideoPlaybackEvent["PlayStop"] = 3] = "PlayStop";
            VideoPlaybackEvent[VideoPlaybackEvent["BufferEmpty"] = 4] = "BufferEmpty";
            VideoPlaybackEvent[VideoPlaybackEvent["BufferFull"] = 5] = "BufferFull";
            VideoPlaybackEvent[VideoPlaybackEvent["Pause"] = 6] = "Pause";
            VideoPlaybackEvent[VideoPlaybackEvent["Unpause"] = 7] = "Unpause";
            VideoPlaybackEvent[VideoPlaybackEvent["Seeking"] = 8] = "Seeking";
            VideoPlaybackEvent[VideoPlaybackEvent["Seeked"] = 9] = "Seeked";
            VideoPlaybackEvent[VideoPlaybackEvent["Progress"] = 10] = "Progress";
            VideoPlaybackEvent[VideoPlaybackEvent["Error"] = 11] = "Error";
        })(Remoting.VideoPlaybackEvent || (Remoting.VideoPlaybackEvent = {}));
        var VideoPlaybackEvent = Remoting.VideoPlaybackEvent;
        (function (VideoControlEvent) {
            VideoControlEvent[VideoControlEvent["Init"] = 1] = "Init";
            VideoControlEvent[VideoControlEvent["Pause"] = 2] = "Pause";
            VideoControlEvent[VideoControlEvent["Seek"] = 3] = "Seek";
            VideoControlEvent[VideoControlEvent["GetTime"] = 4] = "GetTime";
            VideoControlEvent[VideoControlEvent["GetBufferLength"] = 5] = "GetBufferLength";
            VideoControlEvent[VideoControlEvent["SetSoundLevels"] = 6] = "SetSoundLevels";
            VideoControlEvent[VideoControlEvent["GetBytesLoaded"] = 7] = "GetBytesLoaded";
            VideoControlEvent[VideoControlEvent["GetBytesTotal"] = 8] = "GetBytesTotal";
            VideoControlEvent[VideoControlEvent["EnsurePlaying"] = 9] = "EnsurePlaying";
        })(Remoting.VideoControlEvent || (Remoting.VideoControlEvent = {}));
        var VideoControlEvent = Remoting.VideoControlEvent;
        (function (StageScaleMode) {
            StageScaleMode[StageScaleMode["ShowAll"] = 0] = "ShowAll";
            StageScaleMode[StageScaleMode["ExactFit"] = 1] = "ExactFit";
            StageScaleMode[StageScaleMode["NoBorder"] = 2] = "NoBorder";
            StageScaleMode[StageScaleMode["NoScale"] = 4] = "NoScale";
        })(Remoting.StageScaleMode || (Remoting.StageScaleMode = {}));
        var StageScaleMode = Remoting.StageScaleMode;
        (function (StageAlignFlags) {
            StageAlignFlags[StageAlignFlags["None"] = 0] = "None";
            StageAlignFlags[StageAlignFlags["Top"] = 1] = "Top";
            StageAlignFlags[StageAlignFlags["Bottom"] = 2] = "Bottom";
            StageAlignFlags[StageAlignFlags["Left"] = 4] = "Left";
            StageAlignFlags[StageAlignFlags["Right"] = 8] = "Right";
            StageAlignFlags[StageAlignFlags["TopLeft"] = StageAlignFlags.Top | StageAlignFlags.Left] = "TopLeft";
            StageAlignFlags[StageAlignFlags["BottomLeft"] = StageAlignFlags.Bottom | StageAlignFlags.Left] = "BottomLeft";
            StageAlignFlags[StageAlignFlags["BottomRight"] = StageAlignFlags.Bottom | StageAlignFlags.Right] = "BottomRight";
            StageAlignFlags[StageAlignFlags["TopRight"] = StageAlignFlags.Top | StageAlignFlags.Right] = "TopRight";
        })(Remoting.StageAlignFlags || (Remoting.StageAlignFlags = {}));
        var StageAlignFlags = Remoting.StageAlignFlags;
        Remoting.MouseEventNames = [
            'click',
            'dblclick',
            'mousedown',
            'mousemove',
            'mouseup',
            'mouseover',
            'mouseout'
        ];
        Remoting.KeyboardEventNames = [
            'keydown',
            'keypress',
            'keyup'
        ];
        (function (KeyboardEventFlags) {
            KeyboardEventFlags[KeyboardEventFlags["CtrlKey"] = 0x0001] = "CtrlKey";
            KeyboardEventFlags[KeyboardEventFlags["AltKey"] = 0x0002] = "AltKey";
            KeyboardEventFlags[KeyboardEventFlags["ShiftKey"] = 0x0004] = "ShiftKey";
        })(Remoting.KeyboardEventFlags || (Remoting.KeyboardEventFlags = {}));
        var KeyboardEventFlags = Remoting.KeyboardEventFlags;
        (function (FocusEventType) {
            FocusEventType[FocusEventType["DocumentHidden"] = 0] = "DocumentHidden";
            FocusEventType[FocusEventType["DocumentVisible"] = 1] = "DocumentVisible";
            FocusEventType[FocusEventType["WindowBlur"] = 2] = "WindowBlur";
            FocusEventType[FocusEventType["WindowFocus"] = 3] = "WindowFocus";
        })(Remoting.FocusEventType || (Remoting.FocusEventType = {}));
        var FocusEventType = Remoting.FocusEventType;
    })(Remoting = Shumway.Remoting || (Shumway.Remoting = {}));
})(Shumway || (Shumway = {}));
var throwError;
var Errors;
//# sourceMappingURL=base.js.map