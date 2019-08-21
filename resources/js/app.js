/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */
if (typeof Object.assign != "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "assign", {
        value: function assign(target, varArgs) {
            // .length of function is 2
            "use strict";
            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError(
                    "Cannot convert undefined or null to object"
                );
            }

            var to = Object(target);

            for (var index = 1; index < arguments.length; index++) {
                var nextSource = arguments[index];

                if (nextSource != null) {
                    // Skip over if undefined or null
                    for (var nextKey in nextSource) {
                        // Avoid bugs when hasOwnProperty is shadowed
                        if (
                            Object.prototype.hasOwnProperty.call(
                                nextSource,
                                nextKey
                            )
                        ) {
                            to[nextKey] = nextSource[nextKey];
                        }
                    }
                }
            }
            return to;
        },
        writable: true,
        configurable: true
    });
}
if (typeof Object.values != "function") {
    // Must be writable: true, enumerable: false, configurable: true
    Object.defineProperty(Object, "values", {
        value: function values(target, varArgs) {
            // .length of function is 2
            "use strict";
            if (target == null) {
                // TypeError if undefined or null
                throw new TypeError(
                    "Cannot convert undefined or null to object"
                );
            }

            // 1. Let obj be ? ToObject(O).
            var obj = target;
            // 2. Let nameList be ? EnumerableOwnProperties(obj, "value").
            var nameList = Object.keys(obj).map(function(key) {
                return obj[key];
            });
            // 3. Return CreateArrayFromList(nameList).
            // Polyfill.io - nameList is already an array.
            return nameList;
        },
        writable: true,
        configurable: true
    });
}
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, "includes", {
        value: function(searchElement, fromIndex) {
            // 1. Let O be ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }

            var o = Object(this);

            // 2. Let len be ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;

            // 3. If len is 0, return false.
            if (len === 0) {
                return false;
            }

            // 4. Let n be ? ToInteger(fromIndex).
            //    (If fromIndex is undefined, this step produces the value 0.)
            var n = fromIndex | 0;

            // 5. If n ≥ 0, then
            //  a. Let k be n.
            // 6. Else n < 0,
            //  a. Let k be len + n.
            //  b. If k < 0, let k be 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);

            function sameValueZero(x, y) {
                return (
                    x === y ||
                    (typeof x === "number" &&
                        typeof y === "number" &&
                        isNaN(x) &&
                        isNaN(y))
                );
            }

            // 7. Repeat, while k < len
            while (k < len) {
                // a. Let elementK be the result of ? Get(O, ! ToString(k)).
                // b. If SameValueZero(searchElement, elementK) is true, return true.
                // c. Increase k by 1.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }

            // 8. Return false
            return false;
        }
    });
}

/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require("./bootstrap");

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */
require("./index.js");
// require("./components/components/App");
// require("./components/Pages/Registro");
// require("./components/Pages/Login");
// require("./components/Pages/Ingreso");
// require("./components/Pages/Inicio");
// require("./components/components/Menu");
// require("./components/Index");
// require("./components/Pages/QuestionEvent");
// require("./components/components/MenuApps/CambiarClave");
// require("./components/components/MenuApps/CambiarDatos");
// require("./components/components/MenuApps/Invitacion");
// require("./cache");
