/**
 * @license RequireJS order 1.0.5 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
/*!
 * jQuery JavaScript Library v1.7.1
 * http://jquery.com/
 *
 * Copyright 2011, John Resig
 * Dual licensed under the MIT or GPL Version 2 licenses.
 * http://jquery.org/license
 *
 * Includes Sizzle.js
 * http://sizzlejs.com/
 * Copyright 2011, The Dojo Foundation
 * Released under the MIT, BSD, and GPL Licenses.
 *
 * Date: Mon Nov 21 21:11:03 2011 -0500
 */
/*!
 * Sizzle CSS Selector Engine
 *  Copyright 2011, The Dojo Foundation
 *  Released under the MIT, BSD, and GPL Licenses.
 *  More information: http://sizzlejs.com/
 */
/*!
 * jLayout Border Layout - JavaScript Layout Algorithms v0.4
 *
 * Licensed under the new BSD License.
 * Copyright 2008-2009, Bram Stein
 * All rights reserved.
 */
/*!
 * jLayout JQuery Plugin v0.17
 *
 * Licensed under the new BSD License.
 * Copyright 2008-2009 Bram Stein
 * All rights reserved.
 */
/**
 * @license RequireJS text 1.0.2 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */
(function() {
    function i(a) {
        var b = a.currentTarget || a.srcElement, c, g, h;
        if (a.type === "load" || d.test(b.readyState)) {
            g = b.getAttribute("data-requiremodule"), f[g] = !0;
            for (c = 0; h = e[c]; c++) if (f[h.name]) h.req([ h.name ], h.onLoad); else break;
            c > 0 && e.splice(0, c), setTimeout(function() {
                b.parentNode.removeChild(b);
            }, 15);
        }
    }
    function j(a) {
        var b, c, d;
        a.setAttribute("data-orderloaded", "loaded");
        for (b = 0; d = h[b]; b++) {
            c = g[d];
            if (c && c.getAttribute("data-orderloaded") === "loaded") delete g[d], require.addScriptToDom(c); else break;
        }
        b > 0 && h.splice(0, b);
    }
    var a = typeof document != "undefined" && typeof window != "undefined" && document.createElement("script"), b = a && (a.async || window.opera && Object.prototype.toString.call(window.opera) === "[object Opera]" || "MozAppearance" in document.documentElement.style), c = a && a.readyState === "uninitialized", d = /^(complete|loaded)$/, e = [], f = {}, g = {}, h = [];
    a = null, define("order", {
        version: "1.0.5",
        load: function(a, d, f, k) {
            var l = !!d.nameToUrl, m, n, o;
            if (!l) {
                d([ a ], f);
                return;
            }
            m = d.nameToUrl(a, null), require.s.skipAsync[m] = !0, b || k.isBuild ? d([ a ], f) : c ? (o = require.s.contexts._, !o.urlFetched[m] && !o.loaded[a] && (o.urlFetched[m] = !0, require.resourcesReady(!1), o.scriptCount += 1, n = require.attach(m, o, a, null, null, j), g[a] = n, h.push(a)), d([ a ], f)) : d.specified(a) ? d([ a ], f) : (e.push({
                name: a,
                req: d,
                onLoad: f
            }), require.attach(m, null, a, i, "script/cache"));
        }
    });
})(), function(a, b) {
    function h(a) {
        var b = g[a] = {}, c, d;
        a = a.split(/\s+/);
        for (c = 0, d = a.length; c < d; c++) b[a[c]] = !0;
        return b;
    }
    function l(a, c, d) {
        if (d === b && a.nodeType === 1) {
            var e = "data-" + c.replace(k, "-$1").toLowerCase();
            d = a.getAttribute(e);
            if (typeof d == "string") {
                try {
                    d = d === "true" ? !0 : d === "false" ? !1 : d === "null" ? null : f.isNumeric(d) ? parseFloat(d) : j.test(d) ? f.parseJSON(d) : d;
                } catch (g) {}
                f.data(a, c, d);
            } else d = b;
        }
        return d;
    }
    function m(a) {
        for (var b in a) {
            if (b === "data" && f.isEmptyObject(a[b])) continue;
            if (b !== "toJSON") return !1;
        }
        return !0;
    }
    function n(a, b, c) {
        var d = b + "defer", e = b + "queue", g = b + "mark", h = f._data(a, d);
        h && (c === "queue" || !f._data(a, e)) && (c === "mark" || !f._data(a, g)) && setTimeout(function() {
            !f._data(a, e) && !f._data(a, g) && (f.removeData(a, d, !0), h.fire());
        }, 0);
    }
    function J() {
        return !1;
    }
    function K() {
        return !0;
    }
    function S(a) {
        return !a || !a.parentNode || a.parentNode.nodeType === 11;
    }
    function T(a, b, c) {
        b = b || 0;
        if (f.isFunction(b)) return f.grep(a, function(a, d) {
            var e = !!b.call(a, d, a);
            return e === c;
        });
        if (b.nodeType) return f.grep(a, function(a, d) {
            return a === b === c;
        });
        if (typeof b == "string") {
            var d = f.grep(a, function(a) {
                return a.nodeType === 1;
            });
            if (O.test(b)) return f.filter(b, d, !c);
            b = f.filter(b, d);
        }
        return f.grep(a, function(a, d) {
            return f.inArray(a, b) >= 0 === c;
        });
    }
    function U(a) {
        var b = V.split("|"), c = a.createDocumentFragment();
        if (c.createElement) while (b.length) c.createElement(b.pop());
        return c;
    }
    function bi(a, b) {
        return f.nodeName(a, "table") ? a.getElementsByTagName("tbody")[0] || a.appendChild(a.ownerDocument.createElement("tbody")) : a;
    }
    function bj(a, b) {
        if (b.nodeType !== 1 || !f.hasData(a)) return;
        var c, d, e, g = f._data(a), h = f._data(b, g), i = g.events;
        if (i) {
            delete h.handle, h.events = {};
            for (c in i) for (d = 0, e = i[c].length; d < e; d++) f.event.add(b, c + (i[c][d].namespace ? "." : "") + i[c][d].namespace, i[c][d], i[c][d].data);
        }
        h.data && (h.data = f.extend({}, h.data));
    }
    function bk(a, b) {
        var c;
        if (b.nodeType !== 1) return;
        b.clearAttributes && b.clearAttributes(), b.mergeAttributes && b.mergeAttributes(a), c = b.nodeName.toLowerCase();
        if (c === "object") b.outerHTML = a.outerHTML; else if (c !== "input" || a.type !== "checkbox" && a.type !== "radio") {
            if (c === "option") b.selected = a.defaultSelected; else if (c === "input" || c === "textarea") b.defaultValue = a.defaultValue;
        } else a.checked && (b.defaultChecked = b.checked = a.checked), b.value !== a.value && (b.value = a.value);
        b.removeAttribute(f.expando);
    }
    function bl(a) {
        return typeof a.getElementsByTagName != "undefined" ? a.getElementsByTagName("*") : typeof a.querySelectorAll != "undefined" ? a.querySelectorAll("*") : [];
    }
    function bm(a) {
        if (a.type === "checkbox" || a.type === "radio") a.defaultChecked = a.checked;
    }
    function bn(a) {
        var b = (a.nodeName || "").toLowerCase();
        b === "input" ? bm(a) : b !== "script" && typeof a.getElementsByTagName != "undefined" && f.grep(a.getElementsByTagName("input"), bm);
    }
    function bo(a) {
        var b = c.createElement("div");
        return bh.appendChild(b), b.innerHTML = a.outerHTML, b.firstChild;
    }
    function bp(a, b) {
        b.src ? f.ajax({
            url: b.src,
            async: !1,
            dataType: "script"
        }) : f.globalEval((b.text || b.textContent || b.innerHTML || "").replace(bf, "/*$0*/")), b.parentNode && b.parentNode.removeChild(b);
    }
    function bC(a, b, c) {
        var d = b === "width" ? a.offsetWidth : a.offsetHeight, e = b === "width" ? bx : by, g = 0, h = e.length;
        if (d > 0) {
            if (c !== "border") for (; g < h; g++) c || (d -= parseFloat(f.css(a, "padding" + e[g])) || 0), c === "margin" ? d += parseFloat(f.css(a, c + e[g])) || 0 : d -= parseFloat(f.css(a, "border" + e[g] + "Width")) || 0;
            return d + "px";
        }
        d = bz(a, b, b);
        if (d < 0 || d == null) d = a.style[b] || 0;
        d = parseFloat(d) || 0;
        if (c) for (; g < h; g++) d += parseFloat(f.css(a, "padding" + e[g])) || 0, c !== "padding" && (d += parseFloat(f.css(a, "border" + e[g] + "Width")) || 0), c === "margin" && (d += parseFloat(f.css(a, c + e[g])) || 0);
        return d + "px";
    }
    function bZ(a) {
        return function(b, c) {
            typeof b != "string" && (c = b, b = "*");
            if (f.isFunction(c)) {
                var d = b.toLowerCase().split(bP), e = 0, g = d.length, h, i, j;
                for (; e < g; e++) h = d[e], j = /^\+/.test(h), j && (h = h.substr(1) || "*"), i = a[h] = a[h] || [], i[j ? "unshift" : "push"](c);
            }
        };
    }
    function b$(a, c, d, e, f, g) {
        f = f || c.dataTypes[0], g = g || {}, g[f] = !0;
        var h = a[f], i = 0, j = h ? h.length : 0, k = a === bT, l;
        for (; i < j && (k || !l); i++) l = h[i](c, d, e), typeof l == "string" && (!k || g[l] ? l = b : (c.dataTypes.unshift(l), l = b$(a, c, d, e, l, g)));
        return (k || !l) && !g["*"] && (l = b$(a, c, d, e, "*", g)), l;
    }
    function b_(a, c) {
        var d, e, g = f.ajaxSettings.flatOptions || {};
        for (d in c) c[d] !== b && ((g[d] ? a : e || (e = {}))[d] = c[d]);
        e && f.extend(!0, a, e);
    }
    function ca(a, b, c, d) {
        if (f.isArray(b)) f.each(b, function(b, e) {
            c || bE.test(a) ? d(a, e) : ca(a + "[" + (typeof e == "object" || f.isArray(e) ? b : "") + "]", e, c, d);
        }); else if (!c && b != null && typeof b == "object") for (var e in b) ca(a + "[" + e + "]", b[e], c, d); else d(a, b);
    }
    function cb(a, c, d) {
        var e = a.contents, f = a.dataTypes, g = a.responseFields, h, i, j, k;
        for (i in g) i in d && (c[g[i]] = d[i]);
        while (f[0] === "*") f.shift(), h === b && (h = a.mimeType || c.getResponseHeader("content-type"));
        if (h) for (i in e) if (e[i] && e[i].test(h)) {
            f.unshift(i);
            break;
        }
        if (f[0] in d) j = f[0]; else {
            for (i in d) {
                if (!f[0] || a.converters[i + " " + f[0]]) {
                    j = i;
                    break;
                }
                k || (k = i);
            }
            j = j || k;
        }
        if (j) return j !== f[0] && f.unshift(j), d[j];
    }
    function cc(a, c) {
        a.dataFilter && (c = a.dataFilter(c, a.dataType));
        var d = a.dataTypes, e = {}, g, h, i = d.length, j, k = d[0], l, m, n, o, p;
        for (g = 1; g < i; g++) {
            if (g === 1) for (h in a.converters) typeof h == "string" && (e[h.toLowerCase()] = a.converters[h]);
            l = k, k = d[g];
            if (k === "*") k = l; else if (l !== "*" && l !== k) {
                m = l + " " + k, n = e[m] || e["* " + k];
                if (!n) {
                    p = b;
                    for (o in e) {
                        j = o.split(" ");
                        if (j[0] === l || j[0] === "*") {
                            p = e[j[1] + " " + k];
                            if (p) {
                                o = e[o], o === !0 ? n = p : p === !0 && (n = o);
                                break;
                            }
                        }
                    }
                }
                !n && !p && f.error("No conversion from " + m.replace(" ", " to ")), n !== !0 && (c = n ? n(c) : p(o(c)));
            }
        }
        return c;
    }
    function ci() {
        try {
            return new a.XMLHttpRequest;
        } catch (b) {}
    }
    function cj() {
        try {
            return new a.ActiveXObject("Microsoft.XMLHTTP");
        } catch (b) {}
    }
    function cs() {
        return setTimeout(ct, 0), cr = f.now();
    }
    function ct() {
        cr = b;
    }
    function cu(a, b) {
        var c = {};
        return f.each(cq.concat.apply([], cq.slice(0, b)), function() {
            c[this] = a;
        }), c;
    }
    function cv(a) {
        if (!ck[a]) {
            var b = c.body, d = f("<" + a + ">").appendTo(b), e = d.css("display");
            d.remove();
            if (e === "none" || e === "") {
                cl || (cl = c.createElement("iframe"), cl.frameBorder = cl.width = cl.height = 0), b.appendChild(cl);
                if (!cm || !cl.createElement) cm = (cl.contentWindow || cl.contentDocument).document, cm.write((c.compatMode === "CSS1Compat" ? "<!doctype html>" : "") + "<html><body>"), cm.close();
                d = cm.createElement(a), cm.body.appendChild(d), e = f.css(d, "display"), b.removeChild(cl);
            }
            ck[a] = e;
        }
        return ck[a];
    }
    function cy(a) {
        return f.isWindow(a) ? a : a.nodeType === 9 ? a.defaultView || a.parentWindow : !1;
    }
    var c = a.document, d = a.navigator, e = a.location, f = function() {
        function J() {
            if (e.isReady) return;
            try {
                c.documentElement.doScroll("left");
            } catch (a) {
                setTimeout(J, 1);
                return;
            }
            e.ready();
        }
        var e = function(a, b) {
            return new e.fn.init(a, b, h);
        }, f = a.jQuery, g = a.$, h, i = /^(?:[^#<]*(<[\w\W]+>)[^>]*$|#([\w\-]*)$)/, j = /\S/, k = /^\s+/, l = /\s+$/, m = /^<(\w+)\s*\/?>(?:<\/\1>)?$/, n = /^[\],:{}\s]*$/, o = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, p = /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, q = /(?:^|:|,)(?:\s*\[)+/g, r = /(webkit)[ \/]([\w.]+)/, s = /(opera)(?:.*version)?[ \/]([\w.]+)/, t = /(msie) ([\w.]+)/, u = /(mozilla)(?:.*? rv:([\w.]+))?/, v = /-([a-z]|[0-9])/ig, w = /^-ms-/, x = function(a, b) {
            return (b + "").toUpperCase();
        }, y = d.userAgent, z, A, B, C = Object.prototype.toString, D = Object.prototype.hasOwnProperty, E = Array.prototype.push, F = Array.prototype.slice, G = String.prototype.trim, H = Array.prototype.indexOf, I = {};
        return e.fn = e.prototype = {
            constructor: e,
            init: function(a, d, f) {
                var g, h, j, k;
                if (!a) return this;
                if (a.nodeType) return this.context = this[0] = a, this.length = 1, this;
                if (a === "body" && !d && c.body) return this.context = c, this[0] = c.body, this.selector = a, this.length = 1, this;
                if (typeof a == "string") {
                    a.charAt(0) === "<" && a.charAt(a.length - 1) === ">" && a.length >= 3 ? g = [ null, a, null ] : g = i.exec(a);
                    if (g && (g[1] || !d)) {
                        if (g[1]) return d = d instanceof e ? d[0] : d, k = d ? d.ownerDocument || d : c, j = m.exec(a), j ? e.isPlainObject(d) ? (a = [ c.createElement(j[1]) ], e.fn.attr.call(a, d, !0)) : a = [ k.createElement(j[1]) ] : (j = e.buildFragment([ g[1] ], [ k ]), a = (j.cacheable ? e.clone(j.fragment) : j.fragment).childNodes), e.merge(this, a);
                        h = c.getElementById(g[2]);
                        if (h && h.parentNode) {
                            if (h.id !== g[2]) return f.find(a);
                            this.length = 1, this[0] = h;
                        }
                        return this.context = c, this.selector = a, this;
                    }
                    return !d || d.jquery ? (d || f).find(a) : this.constructor(d).find(a);
                }
                return e.isFunction(a) ? f.ready(a) : (a.selector !== b && (this.selector = a.selector, this.context = a.context), e.makeArray(a, this));
            },
            selector: "",
            jquery: "1.7.1",
            length: 0,
            size: function() {
                return this.length;
            },
            toArray: function() {
                return F.call(this, 0);
            },
            get: function(a) {
                return a == null ? this.toArray() : a < 0 ? this[this.length + a] : this[a];
            },
            pushStack: function(a, b, c) {
                var d = this.constructor();
                return e.isArray(a) ? E.apply(d, a) : e.merge(d, a), d.prevObject = this, d.context = this.context, b === "find" ? d.selector = this.selector + (this.selector ? " " : "") + c : b && (d.selector = this.selector + "." + b + "(" + c + ")"), d;
            },
            each: function(a, b) {
                return e.each(this, a, b);
            },
            ready: function(a) {
                return e.bindReady(), A.add(a), this;
            },
            eq: function(a) {
                return a = +a, a === -1 ? this.slice(a) : this.slice(a, a + 1);
            },
            first: function() {
                return this.eq(0);
            },
            last: function() {
                return this.eq(-1);
            },
            slice: function() {
                return this.pushStack(F.apply(this, arguments), "slice", F.call(arguments).join(","));
            },
            map: function(a) {
                return this.pushStack(e.map(this, function(b, c) {
                    return a.call(b, c, b);
                }));
            },
            end: function() {
                return this.prevObject || this.constructor(null);
            },
            push: E,
            sort: [].sort,
            splice: [].splice
        }, e.fn.init.prototype = e.fn, e.extend = e.fn.extend = function() {
            var a, c, d, f, g, h, i = arguments[0] || {}, j = 1, k = arguments.length, l = !1;
            typeof i == "boolean" && (l = i, i = arguments[1] || {}, j = 2), typeof i != "object" && !e.isFunction(i) && (i = {}), k === j && (i = this, --j);
            for (; j < k; j++) if ((a = arguments[j]) != null) for (c in a) {
                d = i[c], f = a[c];
                if (i === f) continue;
                l && f && (e.isPlainObject(f) || (g = e.isArray(f))) ? (g ? (g = !1, h = d && e.isArray(d) ? d : []) : h = d && e.isPlainObject(d) ? d : {}, i[c] = e.extend(l, h, f)) : f !== b && (i[c] = f);
            }
            return i;
        }, e.extend({
            noConflict: function(b) {
                return a.$ === e && (a.$ = g), b && a.jQuery === e && (a.jQuery = f), e;
            },
            isReady: !1,
            readyWait: 1,
            holdReady: function(a) {
                a ? e.readyWait++ : e.ready(!0);
            },
            ready: function(a) {
                if (a === !0 && !--e.readyWait || a !== !0 && !e.isReady) {
                    if (!c.body) return setTimeout(e.ready, 1);
                    e.isReady = !0;
                    if (a !== !0 && --e.readyWait > 0) return;
                    A.fireWith(c, [ e ]), e.fn.trigger && e(c).trigger("ready").off("ready");
                }
            },
            bindReady: function() {
                if (A) return;
                A = e.Callbacks("once memory");
                if (c.readyState === "complete") return setTimeout(e.ready, 1);
                if (c.addEventListener) c.addEventListener("DOMContentLoaded", B, !1), a.addEventListener("load", e.ready, !1); else if (c.attachEvent) {
                    c.attachEvent("onreadystatechange", B), a.attachEvent("onload", e.ready);
                    var b = !1;
                    try {
                        b = a.frameElement == null;
                    } catch (d) {}
                    c.documentElement.doScroll && b && J();
                }
            },
            isFunction: function(a) {
                return e.type(a) === "function";
            },
            isArray: Array.isArray || function(a) {
                return e.type(a) === "array";
            },
            isWindow: function(a) {
                return a && typeof a == "object" && "setInterval" in a;
            },
            isNumeric: function(a) {
                return !isNaN(parseFloat(a)) && isFinite(a);
            },
            type: function(a) {
                return a == null ? String(a) : I[C.call(a)] || "object";
            },
            isPlainObject: function(a) {
                if (!a || e.type(a) !== "object" || a.nodeType || e.isWindow(a)) return !1;
                try {
                    if (a.constructor && !D.call(a, "constructor") && !D.call(a.constructor.prototype, "isPrototypeOf")) return !1;
                } catch (c) {
                    return !1;
                }
                var d;
                for (d in a) ;
                return d === b || D.call(a, d);
            },
            isEmptyObject: function(a) {
                for (var b in a) return !1;
                return !0;
            },
            error: function(a) {
                throw new Error(a);
            },
            parseJSON: function(b) {
                if (typeof b != "string" || !b) return null;
                b = e.trim(b);
                if (a.JSON && a.JSON.parse) return a.JSON.parse(b);
                if (n.test(b.replace(o, "@").replace(p, "]").replace(q, ""))) return (new Function("return " + b))();
                e.error("Invalid JSON: " + b);
            },
            parseXML: function(c) {
                var d, f;
                try {
                    a.DOMParser ? (f = new DOMParser, d = f.parseFromString(c, "text/xml")) : (d = new ActiveXObject("Microsoft.XMLDOM"), d.async = "false", d.loadXML(c));
                } catch (g) {
                    d = b;
                }
                return (!d || !d.documentElement || d.getElementsByTagName("parsererror").length) && e.error("Invalid XML: " + c), d;
            },
            noop: function() {},
            globalEval: function(b) {
                b && j.test(b) && (a.execScript || function(b) {
                    a.eval.call(a, b);
                })(b);
            },
            camelCase: function(a) {
                return a.replace(w, "ms-").replace(v, x);
            },
            nodeName: function(a, b) {
                return a.nodeName && a.nodeName.toUpperCase() === b.toUpperCase();
            },
            each: function(a, c, d) {
                var f, g = 0, h = a.length, i = h === b || e.isFunction(a);
                if (d) {
                    if (i) {
                        for (f in a) if (c.apply(a[f], d) === !1) break;
                    } else for (; g < h; ) if (c.apply(a[g++], d) === !1) break;
                } else if (i) {
                    for (f in a) if (c.call(a[f], f, a[f]) === !1) break;
                } else for (; g < h; ) if (c.call(a[g], g, a[g++]) === !1) break;
                return a;
            },
            trim: G ? function(a) {
                return a == null ? "" : G.call(a);
            } : function(a) {
                return a == null ? "" : a.toString().replace(k, "").replace(l, "");
            },
            makeArray: function(a, b) {
                var c = b || [];
                if (a != null) {
                    var d = e.type(a);
                    a.length == null || d === "string" || d === "function" || d === "regexp" || e.isWindow(a) ? E.call(c, a) : e.merge(c, a);
                }
                return c;
            },
            inArray: function(a, b, c) {
                var d;
                if (b) {
                    if (H) return H.call(b, a, c);
                    d = b.length, c = c ? c < 0 ? Math.max(0, d + c) : c : 0;
                    for (; c < d; c++) if (c in b && b[c] === a) return c;
                }
                return -1;
            },
            merge: function(a, c) {
                var d = a.length, e = 0;
                if (typeof c.length == "number") for (var f = c.length; e < f; e++) a[d++] = c[e]; else while (c[e] !== b) a[d++] = c[e++];
                return a.length = d, a;
            },
            grep: function(a, b, c) {
                var d = [], e;
                c = !!c;
                for (var f = 0, g = a.length; f < g; f++) e = !!b(a[f], f), c !== e && d.push(a[f]);
                return d;
            },
            map: function(a, c, d) {
                var f, g, h = [], i = 0, j = a.length, k = a instanceof e || j !== b && typeof j == "number" && (j > 0 && a[0] && a[j - 1] || j === 0 || e.isArray(a));
                if (k) for (; i < j; i++) f = c(a[i], i, d), f != null && (h[h.length] = f); else for (g in a) f = c(a[g], g, d), f != null && (h[h.length] = f);
                return h.concat.apply([], h);
            },
            guid: 1,
            proxy: function(a, c) {
                if (typeof c == "string") {
                    var d = a[c];
                    c = a, a = d;
                }
                if (!e.isFunction(a)) return b;
                var f = F.call(arguments, 2), g = function() {
                    return a.apply(c, f.concat(F.call(arguments)));
                };
                return g.guid = a.guid = a.guid || g.guid || e.guid++, g;
            },
            access: function(a, c, d, f, g, h) {
                var i = a.length;
                if (typeof c == "object") {
                    for (var j in c) e.access(a, j, c[j], f, g, d);
                    return a;
                }
                if (d !== b) {
                    f = !h && f && e.isFunction(d);
                    for (var k = 0; k < i; k++) g(a[k], c, f ? d.call(a[k], k, g(a[k], c)) : d, h);
                    return a;
                }
                return i ? g(a[0], c) : b;
            },
            now: function() {
                return (new Date).getTime();
            },
            uaMatch: function(a) {
                a = a.toLowerCase();
                var b = r.exec(a) || s.exec(a) || t.exec(a) || a.indexOf("compatible") < 0 && u.exec(a) || [];
                return {
                    browser: b[1] || "",
                    version: b[2] || "0"
                };
            },
            sub: function() {
                function a(b, c) {
                    return new a.fn.init(b, c);
                }
                e.extend(!0, a, this), a.superclass = this, a.fn = a.prototype = this(), a.fn.constructor = a, a.sub = this.sub, a.fn.init = function(d, f) {
                    return f && f instanceof e && !(f instanceof a) && (f = a(f)), e.fn.init.call(this, d, f, b);
                }, a.fn.init.prototype = a.fn;
                var b = a(c);
                return a;
            },
            browser: {}
        }), e.each("Boolean Number String Function Array Date RegExp Object".split(" "), function(a, b) {
            I["[object " + b + "]"] = b.toLowerCase();
        }), z = e.uaMatch(y), z.browser && (e.browser[z.browser] = !0, e.browser.version = z.version), e.browser.webkit && (e.browser.safari = !0), j.test(" ") && (k = /^[\s\xA0]+/, l = /[\s\xA0]+$/), h = e(c), c.addEventListener ? B = function() {
            c.removeEventListener("DOMContentLoaded", B, !1), e.ready();
        } : c.attachEvent && (B = function() {
            c.readyState === "complete" && (c.detachEvent("onreadystatechange", B), e.ready());
        }), e;
    }(), g = {};
    f.Callbacks = function(a) {
        a = a ? g[a] || h(a) : {};
        var c = [], d = [], e, i, j, k, l, m = function(b) {
            var d, e, g, h, i;
            for (d = 0, e = b.length; d < e; d++) g = b[d], h = f.type(g), h === "array" ? m(g) : h === "function" && (!a.unique || !o.has(g)) && c.push(g);
        }, n = function(b, f) {
            f = f || [], e = !a.memory || [ b, f ], i = !0, l = j || 0, j = 0, k = c.length;
            for (; c && l < k; l++) if (c[l].apply(b, f) === !1 && a.stopOnFalse) {
                e = !0;
                break;
            }
            i = !1, c && (a.once ? e === !0 ? o.disable() : c = [] : d && d.length && (e = d.shift(), o.fireWith(e[0], e[1])));
        }, o = {
            add: function() {
                if (c) {
                    var a = c.length;
                    m(arguments), i ? k = c.length : e && e !== !0 && (j = a, n(e[0], e[1]));
                }
                return this;
            },
            remove: function() {
                if (c) {
                    var b = arguments, d = 0, e = b.length;
                    for (; d < e; d++) for (var f = 0; f < c.length; f++) if (b[d] === c[f]) {
                        i && f <= k && (k--, f <= l && l--), c.splice(f--, 1);
                        if (a.unique) break;
                    }
                }
                return this;
            },
            has: function(a) {
                if (c) {
                    var b = 0, d = c.length;
                    for (; b < d; b++) if (a === c[b]) return !0;
                }
                return !1;
            },
            empty: function() {
                return c = [], this;
            },
            disable: function() {
                return c = d = e = b, this;
            },
            disabled: function() {
                return !c;
            },
            lock: function() {
                return d = b, (!e || e === !0) && o.disable(), this;
            },
            locked: function() {
                return !d;
            },
            fireWith: function(b, c) {
                return d && (i ? a.once || d.push([ b, c ]) : (!a.once || !e) && n(b, c)), this;
            },
            fire: function() {
                return o.fireWith(this, arguments), this;
            },
            fired: function() {
                return !!e;
            }
        };
        return o;
    };
    var i = [].slice;
    f.extend({
        Deferred: function(a) {
            var b = f.Callbacks("once memory"), c = f.Callbacks("once memory"), d = f.Callbacks("memory"), e = "pending", g = {
                resolve: b,
                reject: c,
                notify: d
            }, h = {
                done: b.add,
                fail: c.add,
                progress: d.add,
                state: function() {
                    return e;
                },
                isResolved: b.fired,
                isRejected: c.fired,
                then: function(a, b, c) {
                    return i.done(a).fail(b).progress(c), this;
                },
                always: function() {
                    return i.done.apply(i, arguments).fail.apply(i, arguments), this;
                },
                pipe: function(a, b, c) {
                    return f.Deferred(function(d) {
                        f.each({
                            done: [ a, "resolve" ],
                            fail: [ b, "reject" ],
                            progress: [ c, "notify" ]
                        }, function(a, b) {
                            var c = b[0], e = b[1], g;
                            f.isFunction(c) ? i[a](function() {
                                g = c.apply(this, arguments), g && f.isFunction(g.promise) ? g.promise().then(d.resolve, d.reject, d.notify) : d[e + "With"](this === i ? d : this, [ g ]);
                            }) : i[a](d[e]);
                        });
                    }).promise();
                },
                promise: function(a) {
                    if (a == null) a = h; else for (var b in h) a[b] = h[b];
                    return a;
                }
            }, i = h.promise({}), j;
            for (j in g) i[j] = g[j].fire, i[j + "With"] = g[j].fireWith;
            return i.done(function() {
                e = "resolved";
            }, c.disable, d.lock).fail(function() {
                e = "rejected";
            }, b.disable, d.lock), a && a.call(i, i), i;
        },
        when: function(a) {
            function l(a) {
                return function(c) {
                    b[a] = arguments.length > 1 ? i.call(arguments, 0) : c, --g || j.resolveWith(j, b);
                };
            }
            function m(a) {
                return function(b) {
                    e[a] = arguments.length > 1 ? i.call(arguments, 0) : b, j.notifyWith(k, e);
                };
            }
            var b = i.call(arguments, 0), c = 0, d = b.length, e = new Array(d), g = d, h = d, j = d <= 1 && a && f.isFunction(a.promise) ? a : f.Deferred(), k = j.promise();
            if (d > 1) {
                for (; c < d; c++) b[c] && b[c].promise && f.isFunction(b[c].promise) ? b[c].promise().then(l(c), j.reject, m(c)) : --g;
                g || j.resolveWith(j, b);
            } else j !== a && j.resolveWith(j, d ? [ a ] : []);
            return k;
        }
    }), f.support = function() {
        var b, d, e, g, h, i, j, k, l, m, n, o, p, q = c.createElement("div"), r = c.documentElement;
        q.setAttribute("className", "t"), q.innerHTML = "   <link/><table></table><a href='/a' style='top:1px;float:left;opacity:.55;'>a</a><input type='checkbox'/>", d = q.getElementsByTagName("*"), e = q.getElementsByTagName("a")[0];
        if (!d || !d.length || !e) return {};
        g = c.createElement("select"), h = g.appendChild(c.createElement("option")), i = q.getElementsByTagName("input")[0], b = {
            leadingWhitespace: q.firstChild.nodeType === 3,
            tbody: !q.getElementsByTagName("tbody").length,
            htmlSerialize: !!q.getElementsByTagName("link").length,
            style: /top/.test(e.getAttribute("style")),
            hrefNormalized: e.getAttribute("href") === "/a",
            opacity: /^0.55/.test(e.style.opacity),
            cssFloat: !!e.style.cssFloat,
            checkOn: i.value === "on",
            optSelected: h.selected,
            getSetAttribute: q.className !== "t",
            enctype: !!c.createElement("form").enctype,
            html5Clone: c.createElement("nav").cloneNode(!0).outerHTML !== "<:nav></:nav>",
            submitBubbles: !0,
            changeBubbles: !0,
            focusinBubbles: !1,
            deleteExpando: !0,
            noCloneEvent: !0,
            inlineBlockNeedsLayout: !1,
            shrinkWrapBlocks: !1,
            reliableMarginRight: !0
        }, i.checked = !0, b.noCloneChecked = i.cloneNode(!0).checked, g.disabled = !0, b.optDisabled = !h.disabled;
        try {
            delete q.test;
        } catch (s) {
            b.deleteExpando = !1;
        }
        !q.addEventListener && q.attachEvent && q.fireEvent && (q.attachEvent("onclick", function() {
            b.noCloneEvent = !1;
        }), q.cloneNode(!0).fireEvent("onclick")), i = c.createElement("input"), i.value = "t", i.setAttribute("type", "radio"), b.radioValue = i.value === "t", i.setAttribute("checked", "checked"), q.appendChild(i), k = c.createDocumentFragment(), k.appendChild(q.lastChild), b.checkClone = k.cloneNode(!0).cloneNode(!0).lastChild.checked, b.appendChecked = i.checked, k.removeChild(i), k.appendChild(q), q.innerHTML = "", a.getComputedStyle && (j = c.createElement("div"), j.style.width = "0", j.style.marginRight = "0", q.style.width = "2px", q.appendChild(j), b.reliableMarginRight = (parseInt((a.getComputedStyle(j, null) || {
            marginRight: 0
        }).marginRight, 10) || 0) === 0);
        if (q.attachEvent) for (o in {
            submit: 1,
            change: 1,
            focusin: 1
        }) n = "on" + o, p = n in q, p || (q.setAttribute(n, "return;"), p = typeof q[n] == "function"), b[o + "Bubbles"] = p;
        return k.removeChild(q), k = g = h = j = q = i = null, f(function() {
            var a, d, e, g, h, i, j, k, m, n, o, r = c.getElementsByTagName("body")[0];
            if (!r) return;
            j = 1, k = "position:absolute;top:0;left:0;width:1px;height:1px;margin:0;", m = "visibility:hidden;border:0;", n = "style='" + k + "border:5px solid #000;padding:0;'", o = "<div " + n + "><div></div></div>" + "<table " + n + " cellpadding='0' cellspacing='0'>" + "<tr><td></td></tr></table>", a = c.createElement("div"), a.style.cssText = m + "width:0;height:0;position:static;top:0;margin-top:" + j + "px", r.insertBefore(a, r.firstChild), q = c.createElement("div"), a.appendChild(q), q.innerHTML = "<table><tr><td style='padding:0;border:0;display:none'></td><td>t</td></tr></table>", l = q.getElementsByTagName("td"), p = l[0].offsetHeight === 0, l[0].style.display = "", l[1].style.display = "none", b.reliableHiddenOffsets = p && l[0].offsetHeight === 0, q.innerHTML = "", q.style.width = q.style.paddingLeft = "1px", f.boxModel = b.boxModel = q.offsetWidth === 2, typeof q.style.zoom != "undefined" && (q.style.display = "inline", q.style.zoom = 1, b.inlineBlockNeedsLayout = q.offsetWidth === 2, q.style.display = "", q.innerHTML = "<div style='width:4px;'></div>", b.shrinkWrapBlocks = q.offsetWidth !== 2), q.style.cssText = k + m, q.innerHTML = o, d = q.firstChild, e = d.firstChild, h = d.nextSibling.firstChild.firstChild, i = {
                doesNotAddBorder: e.offsetTop !== 5,
                doesAddBorderForTableAndCells: h.offsetTop === 5
            }, e.style.position = "fixed", e.style.top = "20px", i.fixedPosition = e.offsetTop === 20 || e.offsetTop === 15, e.style.position = e.style.top = "", d.style.overflow = "hidden", d.style.position = "relative", i.subtractsBorderForOverflowNotVisible = e.offsetTop === -5, i.doesNotIncludeMarginInBodyOffset = r.offsetTop !== j, r.removeChild(a), q = a = null, f.extend(b, i);
        }), b;
    }();
    var j = /^(?:\{.*\}|\[.*\])$/, k = /([A-Z])/g;
    f.extend({
        cache: {},
        uuid: 0,
        expando: "jQuery" + (f.fn.jquery + Math.random()).replace(/\D/g, ""),
        noData: {
            embed: !0,
            object: "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000",
            applet: !0
        },
        hasData: function(a) {
            return a = a.nodeType ? f.cache[a[f.expando]] : a[f.expando], !!a && !m(a);
        },
        data: function(a, c, d, e) {
            if (!f.acceptData(a)) return;
            var g, h, i, j = f.expando, k = typeof c == "string", l = a.nodeType, m = l ? f.cache : a, n = l ? a[j] : a[j] && j, o = c === "events";
            if ((!n || !m[n] || !o && !e && !m[n].data) && k && d === b) return;
            n || (l ? a[j] = n = ++f.uuid : n = j), m[n] || (m[n] = {}, l || (m[n].toJSON = f.noop));
            if (typeof c == "object" || typeof c == "function") e ? m[n] = f.extend(m[n], c) : m[n].data = f.extend(m[n].data, c);
            return g = h = m[n], e || (h.data || (h.data = {}), h = h.data), d !== b && (h[f.camelCase(c)] = d), o && !h[c] ? g.events : (k ? (i = h[c], i == null && (i = h[f.camelCase(c)])) : i = h, i);
        },
        removeData: function(a, b, c) {
            if (!f.acceptData(a)) return;
            var d, e, g, h = f.expando, i = a.nodeType, j = i ? f.cache : a, k = i ? a[h] : h;
            if (!j[k]) return;
            if (b) {
                d = c ? j[k] : j[k].data;
                if (d) {
                    f.isArray(b) || (b in d ? b = [ b ] : (b = f.camelCase(b), b in d ? b = [ b ] : b = b.split(" ")));
                    for (e = 0, g = b.length; e < g; e++) delete d[b[e]];
                    if (!(c ? m : f.isEmptyObject)(d)) return;
                }
            }
            if (!c) {
                delete j[k].data;
                if (!m(j[k])) return;
            }
            f.support.deleteExpando || !j.setInterval ? delete j[k] : j[k] = null, i && (f.support.deleteExpando ? delete a[h] : a.removeAttribute ? a.removeAttribute(h) : a[h] = null);
        },
        _data: function(a, b, c) {
            return f.data(a, b, c, !0);
        },
        acceptData: function(a) {
            if (a.nodeName) {
                var b = f.noData[a.nodeName.toLowerCase()];
                if (b) return b !== !0 && a.getAttribute("classid") === b;
            }
            return !0;
        }
    }), f.fn.extend({
        data: function(a, c) {
            var d, e, g, h = null;
            if (typeof a == "undefined") {
                if (this.length) {
                    h = f.data(this[0]);
                    if (this[0].nodeType === 1 && !f._data(this[0], "parsedAttrs")) {
                        e = this[0].attributes;
                        for (var i = 0, j = e.length; i < j; i++) g = e[i].name, g.indexOf("data-") === 0 && (g = f.camelCase(g.substring(5)), l(this[0], g, h[g]));
                        f._data(this[0], "parsedAttrs", !0);
                    }
                }
                return h;
            }
            return typeof a == "object" ? this.each(function() {
                f.data(this, a);
            }) : (d = a.split("."), d[1] = d[1] ? "." + d[1] : "", c === b ? (h = this.triggerHandler("getData" + d[1] + "!", [ d[0] ]), h === b && this.length && (h = f.data(this[0], a), h = l(this[0], a, h)), h === b && d[1] ? this.data(d[0]) : h) : this.each(function() {
                var b = f(this), e = [ d[0], c ];
                b.triggerHandler("setData" + d[1] + "!", e), f.data(this, a, c), b.triggerHandler("changeData" + d[1] + "!", e);
            }));
        },
        removeData: function(a) {
            return this.each(function() {
                f.removeData(this, a);
            });
        }
    }), f.extend({
        _mark: function(a, b) {
            a && (b = (b || "fx") + "mark", f._data(a, b, (f._data(a, b) || 0) + 1));
        },
        _unmark: function(a, b, c) {
            a !== !0 && (c = b, b = a, a = !1);
            if (b) {
                c = c || "fx";
                var d = c + "mark", e = a ? 0 : (f._data(b, d) || 1) - 1;
                e ? f._data(b, d, e) : (f.removeData(b, d, !0), n(b, c, "mark"));
            }
        },
        queue: function(a, b, c) {
            var d;
            if (a) return b = (b || "fx") + "queue", d = f._data(a, b), c && (!d || f.isArray(c) ? d = f._data(a, b, f.makeArray(c)) : d.push(c)), d || [];
        },
        dequeue: function(a, b) {
            b = b || "fx";
            var c = f.queue(a, b), d = c.shift(), e = {};
            d === "inprogress" && (d = c.shift()), d && (b === "fx" && c.unshift("inprogress"), f._data(a, b + ".run", e), d.call(a, function() {
                f.dequeue(a, b);
            }, e)), c.length || (f.removeData(a, b + "queue " + b + ".run", !0), n(a, b, "queue"));
        }
    }), f.fn.extend({
        queue: function(a, c) {
            return typeof a != "string" && (c = a, a = "fx"), c === b ? f.queue(this[0], a) : this.each(function() {
                var b = f.queue(this, a, c);
                a === "fx" && b[0] !== "inprogress" && f.dequeue(this, a);
            });
        },
        dequeue: function(a) {
            return this.each(function() {
                f.dequeue(this, a);
            });
        },
        delay: function(a, b) {
            return a = f.fx ? f.fx.speeds[a] || a : a, b = b || "fx", this.queue(b, function(b, c) {
                var d = setTimeout(b, a);
                c.stop = function() {
                    clearTimeout(d);
                };
            });
        },
        clearQueue: function(a) {
            return this.queue(a || "fx", []);
        },
        promise: function(a, c) {
            function m() {
                --h || d.resolveWith(e, [ e ]);
            }
            typeof a != "string" && (c = a, a = b), a = a || "fx";
            var d = f.Deferred(), e = this, g = e.length, h = 1, i = a + "defer", j = a + "queue", k = a + "mark", l;
            while (g--) if (l = f.data(e[g], i, b, !0) || (f.data(e[g], j, b, !0) || f.data(e[g], k, b, !0)) && f.data(e[g], i, f.Callbacks("once memory"), !0)) h++, l.add(m);
            return m(), d.promise();
        }
    });
    var o = /[\n\t\r]/g, p = /\s+/, q = /\r/g, r = /^(?:button|input)$/i, s = /^(?:button|input|object|select|textarea)$/i, t = /^a(?:rea)?$/i, u = /^(?:autofocus|autoplay|async|checked|controls|defer|disabled|hidden|loop|multiple|open|readonly|required|scoped|selected)$/i, v = f.support.getSetAttribute, w, x, y;
    f.fn.extend({
        attr: function(a, b) {
            return f.access(this, a, b, !0, f.attr);
        },
        removeAttr: function(a) {
            return this.each(function() {
                f.removeAttr(this, a);
            });
        },
        prop: function(a, b) {
            return f.access(this, a, b, !0, f.prop);
        },
        removeProp: function(a) {
            return a = f.propFix[a] || a, this.each(function() {
                try {
                    this[a] = b, delete this[a];
                } catch (c) {}
            });
        },
        addClass: function(a) {
            var b, c, d, e, g, h, i;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).addClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string") {
                b = a.split(p);
                for (c = 0, d = this.length; c < d; c++) {
                    e = this[c];
                    if (e.nodeType === 1) if (!e.className && b.length === 1) e.className = a; else {
                        g = " " + e.className + " ";
                        for (h = 0, i = b.length; h < i; h++) ~g.indexOf(" " + b[h] + " ") || (g += b[h] + " ");
                        e.className = f.trim(g);
                    }
                }
            }
            return this;
        },
        removeClass: function(a) {
            var c, d, e, g, h, i, j;
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).removeClass(a.call(this, b, this.className));
            });
            if (a && typeof a == "string" || a === b) {
                c = (a || "").split(p);
                for (d = 0, e = this.length; d < e; d++) {
                    g = this[d];
                    if (g.nodeType === 1 && g.className) if (a) {
                        h = (" " + g.className + " ").replace(o, " ");
                        for (i = 0, j = c.length; i < j; i++) h = h.replace(" " + c[i] + " ", " ");
                        g.className = f.trim(h);
                    } else g.className = "";
                }
            }
            return this;
        },
        toggleClass: function(a, b) {
            var c = typeof a, d = typeof b == "boolean";
            return f.isFunction(a) ? this.each(function(c) {
                f(this).toggleClass(a.call(this, c, this.className, b), b);
            }) : this.each(function() {
                if (c === "string") {
                    var e, g = 0, h = f(this), i = b, j = a.split(p);
                    while (e = j[g++]) i = d ? i : !h.hasClass(e), h[i ? "addClass" : "removeClass"](e);
                } else if (c === "undefined" || c === "boolean") this.className && f._data(this, "__className__", this.className), this.className = this.className || a === !1 ? "" : f._data(this, "__className__") || "";
            });
        },
        hasClass: function(a) {
            var b = " " + a + " ", c = 0, d = this.length;
            for (; c < d; c++) if (this[c].nodeType === 1 && (" " + this[c].className + " ").replace(o, " ").indexOf(b) > -1) return !0;
            return !1;
        },
        val: function(a) {
            var c, d, e, g = this[0];
            if (!arguments.length) {
                if (g) return c = f.valHooks[g.nodeName.toLowerCase()] || f.valHooks[g.type], c && "get" in c && (d = c.get(g, "value")) !== b ? d : (d = g.value, typeof d == "string" ? d.replace(q, "") : d == null ? "" : d);
                return;
            }
            return e = f.isFunction(a), this.each(function(d) {
                var g = f(this), h;
                if (this.nodeType !== 1) return;
                e ? h = a.call(this, d, g.val()) : h = a, h == null ? h = "" : typeof h == "number" ? h += "" : f.isArray(h) && (h = f.map(h, function(a) {
                    return a == null ? "" : a + "";
                })), c = f.valHooks[this.nodeName.toLowerCase()] || f.valHooks[this.type];
                if (!c || !("set" in c) || c.set(this, h, "value") === b) this.value = h;
            });
        }
    }), f.extend({
        valHooks: {
            option: {
                get: function(a) {
                    var b = a.attributes.value;
                    return !b || b.specified ? a.value : a.text;
                }
            },
            select: {
                get: function(a) {
                    var b, c, d, e, g = a.selectedIndex, h = [], i = a.options, j = a.type === "select-one";
                    if (g < 0) return null;
                    c = j ? g : 0, d = j ? g + 1 : i.length;
                    for (; c < d; c++) {
                        e = i[c];
                        if (e.selected && (f.support.optDisabled ? !e.disabled : e.getAttribute("disabled") === null) && (!e.parentNode.disabled || !f.nodeName(e.parentNode, "optgroup"))) {
                            b = f(e).val();
                            if (j) return b;
                            h.push(b);
                        }
                    }
                    return j && !h.length && i.length ? f(i[g]).val() : h;
                },
                set: function(a, b) {
                    var c = f.makeArray(b);
                    return f(a).find("option").each(function() {
                        this.selected = f.inArray(f(this).val(), c) >= 0;
                    }), c.length || (a.selectedIndex = -1), c;
                }
            }
        },
        attrFn: {
            val: !0,
            css: !0,
            html: !0,
            text: !0,
            data: !0,
            width: !0,
            height: !0,
            offset: !0
        },
        attr: function(a, c, d, e) {
            var g, h, i, j = a.nodeType;
            if (!a || j === 3 || j === 8 || j === 2) return;
            if (e && c in f.attrFn) return f(a)[c](d);
            if (typeof a.getAttribute == "undefined") return f.prop(a, c, d);
            i = j !== 1 || !f.isXMLDoc(a), i && (c = c.toLowerCase(), h = f.attrHooks[c] || (u.test(c) ? x : w));
            if (d !== b) {
                if (d === null) {
                    f.removeAttr(a, c);
                    return;
                }
                return h && "set" in h && i && (g = h.set(a, d, c)) !== b ? g : (a.setAttribute(c, "" + d), d);
            }
            return h && "get" in h && i && (g = h.get(a, c)) !== null ? g : (g = a.getAttribute(c), g === null ? b : g);
        },
        removeAttr: function(a, b) {
            var c, d, e, g, h = 0;
            if (b && a.nodeType === 1) {
                d = b.toLowerCase().split(p), g = d.length;
                for (; h < g; h++) e = d[h], e && (c = f.propFix[e] || e, f.attr(a, e, ""), a.removeAttribute(v ? e : c), u.test(e) && c in a && (a[c] = !1));
            }
        },
        attrHooks: {
            type: {
                set: function(a, b) {
                    if (r.test(a.nodeName) && a.parentNode) f.error("type property can't be changed"); else if (!f.support.radioValue && b === "radio" && f.nodeName(a, "input")) {
                        var c = a.value;
                        return a.setAttribute("type", b), c && (a.value = c), b;
                    }
                }
            },
            value: {
                get: function(a, b) {
                    return w && f.nodeName(a, "button") ? w.get(a, b) : b in a ? a.value : null;
                },
                set: function(a, b, c) {
                    if (w && f.nodeName(a, "button")) return w.set(a, b, c);
                    a.value = b;
                }
            }
        },
        propFix: {
            tabindex: "tabIndex",
            readonly: "readOnly",
            "for": "htmlFor",
            "class": "className",
            maxlength: "maxLength",
            cellspacing: "cellSpacing",
            cellpadding: "cellPadding",
            rowspan: "rowSpan",
            colspan: "colSpan",
            usemap: "useMap",
            frameborder: "frameBorder",
            contenteditable: "contentEditable"
        },
        prop: function(a, c, d) {
            var e, g, h, i = a.nodeType;
            if (!a || i === 3 || i === 8 || i === 2) return;
            return h = i !== 1 || !f.isXMLDoc(a), h && (c = f.propFix[c] || c, g = f.propHooks[c]), d !== b ? g && "set" in g && (e = g.set(a, d, c)) !== b ? e : a[c] = d : g && "get" in g && (e = g.get(a, c)) !== null ? e : a[c];
        },
        propHooks: {
            tabIndex: {
                get: function(a) {
                    var c = a.getAttributeNode("tabindex");
                    return c && c.specified ? parseInt(c.value, 10) : s.test(a.nodeName) || t.test(a.nodeName) && a.href ? 0 : b;
                }
            }
        }
    }), f.attrHooks.tabindex = f.propHooks.tabIndex, x = {
        get: function(a, c) {
            var d, e = f.prop(a, c);
            return e === !0 || typeof e != "boolean" && (d = a.getAttributeNode(c)) && d.nodeValue !== !1 ? c.toLowerCase() : b;
        },
        set: function(a, b, c) {
            var d;
            return b === !1 ? f.removeAttr(a, c) : (d = f.propFix[c] || c, d in a && (a[d] = !0), a.setAttribute(c, c.toLowerCase())), c;
        }
    }, v || (y = {
        name: !0,
        id: !0
    }, w = f.valHooks.button = {
        get: function(a, c) {
            var d;
            return d = a.getAttributeNode(c), d && (y[c] ? d.nodeValue !== "" : d.specified) ? d.nodeValue : b;
        },
        set: function(a, b, d) {
            var e = a.getAttributeNode(d);
            return e || (e = c.createAttribute(d), a.setAttributeNode(e)), e.nodeValue = b + "";
        }
    }, f.attrHooks.tabindex.set = w.set, f.each([ "width", "height" ], function(a, b) {
        f.attrHooks[b] = f.extend(f.attrHooks[b], {
            set: function(a, c) {
                if (c === "") return a.setAttribute(b, "auto"), c;
            }
        });
    }), f.attrHooks.contenteditable = {
        get: w.get,
        set: function(a, b, c) {
            b === "" && (b = "false"), w.set(a, b, c);
        }
    }), f.support.hrefNormalized || f.each([ "href", "src", "width", "height" ], function(a, c) {
        f.attrHooks[c] = f.extend(f.attrHooks[c], {
            get: function(a) {
                var d = a.getAttribute(c, 2);
                return d === null ? b : d;
            }
        });
    }), f.support.style || (f.attrHooks.style = {
        get: function(a) {
            return a.style.cssText.toLowerCase() || b;
        },
        set: function(a, b) {
            return a.style.cssText = "" + b;
        }
    }), f.support.optSelected || (f.propHooks.selected = f.extend(f.propHooks.selected, {
        get: function(a) {
            var b = a.parentNode;
            return b && (b.selectedIndex, b.parentNode && b.parentNode.selectedIndex), null;
        }
    })), f.support.enctype || (f.propFix.enctype = "encoding"), f.support.checkOn || f.each([ "radio", "checkbox" ], function() {
        f.valHooks[this] = {
            get: function(a) {
                return a.getAttribute("value") === null ? "on" : a.value;
            }
        };
    }), f.each([ "radio", "checkbox" ], function() {
        f.valHooks[this] = f.extend(f.valHooks[this], {
            set: function(a, b) {
                if (f.isArray(b)) return a.checked = f.inArray(f(a).val(), b) >= 0;
            }
        });
    });
    var z = /^(?:textarea|input|select)$/i, A = /^([^\.]*)?(?:\.(.+))?$/, B = /\bhover(\.\S+)?\b/, C = /^key/, D = /^(?:mouse|contextmenu)|click/, E = /^(?:focusinfocus|focusoutblur)$/, F = /^(\w*)(?:#([\w\-]+))?(?:\.([\w\-]+))?$/, G = function(a) {
        var b = F.exec(a);
        return b && (b[1] = (b[1] || "").toLowerCase(), b[3] = b[3] && new RegExp("(?:^|\\s)" + b[3] + "(?:\\s|$)")), b;
    }, H = function(a, b) {
        var c = a.attributes || {};
        return (!b[1] || a.nodeName.toLowerCase() === b[1]) && (!b[2] || (c.id || {}).value === b[2]) && (!b[3] || b[3].test((c["class"] || {}).value));
    }, I = function(a) {
        return f.event.special.hover ? a : a.replace(B, "mouseenter$1 mouseleave$1");
    };
    f.event = {
        add: function(a, c, d, e, g) {
            var h, i, j, k, l, m, n, o, p, q, r, s;
            if (a.nodeType === 3 || a.nodeType === 8 || !c || !d || !(h = f._data(a))) return;
            d.handler && (p = d, d = p.handler), d.guid || (d.guid = f.guid++), j = h.events, j || (h.events = j = {}), i = h.handle, i || (h.handle = i = function(a) {
                return typeof f == "undefined" || !!a && f.event.triggered === a.type ? b : f.event.dispatch.apply(i.elem, arguments);
            }, i.elem = a), c = f.trim(I(c)).split(" ");
            for (k = 0; k < c.length; k++) {
                l = A.exec(c[k]) || [], m = l[1], n = (l[2] || "").split(".").sort(), s = f.event.special[m] || {}, m = (g ? s.delegateType : s.bindType) || m, s = f.event.special[m] || {}, o = f.extend({
                    type: m,
                    origType: l[1],
                    data: e,
                    handler: d,
                    guid: d.guid,
                    selector: g,
                    quick: G(g),
                    namespace: n.join(".")
                }, p), r = j[m];
                if (!r) {
                    r = j[m] = [], r.delegateCount = 0;
                    if (!s.setup || s.setup.call(a, e, n, i) === !1) a.addEventListener ? a.addEventListener(m, i, !1) : a.attachEvent && a.attachEvent("on" + m, i);
                }
                s.add && (s.add.call(a, o), o.handler.guid || (o.handler.guid = d.guid)), g ? r.splice(r.delegateCount++, 0, o) : r.push(o), f.event.global[m] = !0;
            }
            a = null;
        },
        global: {},
        remove: function(a, b, c, d, e) {
            var g = f.hasData(a) && f._data(a), h, i, j, k, l, m, n, o, p, q, r, s;
            if (!g || !(o = g.events)) return;
            b = f.trim(I(b || "")).split(" ");
            for (h = 0; h < b.length; h++) {
                i = A.exec(b[h]) || [], j = k = i[1], l = i[2];
                if (!j) {
                    for (j in o) f.event.remove(a, j + b[h], c, d, !0);
                    continue;
                }
                p = f.event.special[j] || {}, j = (d ? p.delegateType : p.bindType) || j, r = o[j] || [], m = r.length, l = l ? new RegExp("(^|\\.)" + l.split(".").sort().join("\\.(?:.*\\.)?") + "(\\.|$)") : null;
                for (n = 0; n < r.length; n++) s = r[n], (e || k === s.origType) && (!c || c.guid === s.guid) && (!l || l.test(s.namespace)) && (!d || d === s.selector || d === "**" && s.selector) && (r.splice(n--, 1), s.selector && r.delegateCount--, p.remove && p.remove.call(a, s));
                r.length === 0 && m !== r.length && ((!p.teardown || p.teardown.call(a, l) === !1) && f.removeEvent(a, j, g.handle), delete o[j]);
            }
            f.isEmptyObject(o) && (q = g.handle, q && (q.elem = null), f.removeData(a, [ "events", "handle" ], !0));
        },
        customEvent: {
            getData: !0,
            setData: !0,
            changeData: !0
        },
        trigger: function(c, d, e, g) {
            if (!e || e.nodeType !== 3 && e.nodeType !== 8) {
                var h = c.type || c, i = [], j, k, l, m, n, o, p, q, r, s;
                if (E.test(h + f.event.triggered)) return;
                h.indexOf("!") >= 0 && (h = h.slice(0, -1), k = !0), h.indexOf(".") >= 0 && (i = h.split("."), h = i.shift(), i.sort());
                if ((!e || f.event.customEvent[h]) && !f.event.global[h]) return;
                c = typeof c == "object" ? c[f.expando] ? c : new f.Event(h, c) : new f.Event(h), c.type = h, c.isTrigger = !0, c.exclusive = k, c.namespace = i.join("."), c.namespace_re = c.namespace ? new RegExp("(^|\\.)" + i.join("\\.(?:.*\\.)?") + "(\\.|$)") : null, o = h.indexOf(":") < 0 ? "on" + h : "";
                if (!e) {
                    j = f.cache;
                    for (l in j) j[l].events && j[l].events[h] && f.event.trigger(c, d, j[l].handle.elem, !0);
                    return;
                }
                c.result = b, c.target || (c.target = e), d = d != null ? f.makeArray(d) : [], d.unshift(c), p = f.event.special[h] || {};
                if (p.trigger && p.trigger.apply(e, d) === !1) return;
                r = [ [ e, p.bindType || h ] ];
                if (!g && !p.noBubble && !f.isWindow(e)) {
                    s = p.delegateType || h, m = E.test(s + h) ? e : e.parentNode, n = null;
                    for (; m; m = m.parentNode) r.push([ m, s ]), n = m;
                    n && n === e.ownerDocument && r.push([ n.defaultView || n.parentWindow || a, s ]);
                }
                for (l = 0; l < r.length && !c.isPropagationStopped(); l++) m = r[l][0], c.type = r[l][1], q = (f._data(m, "events") || {})[c.type] && f._data(m, "handle"), q && q.apply(m, d), q = o && m[o], q && f.acceptData(m) && q.apply(m, d) === !1 && c.preventDefault();
                return c.type = h, !g && !c.isDefaultPrevented() && (!p._default || p._default.apply(e.ownerDocument, d) === !1) && (h !== "click" || !f.nodeName(e, "a")) && f.acceptData(e) && o && e[h] && (h !== "focus" && h !== "blur" || c.target.offsetWidth !== 0) && !f.isWindow(e) && (n = e[o], n && (e[o] = null), f.event.triggered = h, e[h](), f.event.triggered = b, n && (e[o] = n)), c.result;
            }
            return;
        },
        dispatch: function(c) {
            c = f.event.fix(c || a.event);
            var d = (f._data(this, "events") || {})[c.type] || [], e = d.delegateCount, g = [].slice.call(arguments, 0), h = !c.exclusive && !c.namespace, i = [], j, k, l, m, n, o, p, q, r, s, t;
            g[0] = c, c.delegateTarget = this;
            if (e && !c.target.disabled && (!c.button || c.type !== "click")) {
                m = f(this), m.context = this.ownerDocument || this;
                for (l = c.target; l != this; l = l.parentNode || this) {
                    o = {}, q = [], m[0] = l;
                    for (j = 0; j < e; j++) r = d[j], s = r.selector, o[s] === b && (o[s] = r.quick ? H(l, r.quick) : m.is(s)), o[s] && q.push(r);
                    q.length && i.push({
                        elem: l,
                        matches: q
                    });
                }
            }
            d.length > e && i.push({
                elem: this,
                matches: d.slice(e)
            });
            for (j = 0; j < i.length && !c.isPropagationStopped(); j++) {
                p = i[j], c.currentTarget = p.elem;
                for (k = 0; k < p.matches.length && !c.isImmediatePropagationStopped(); k++) {
                    r = p.matches[k];
                    if (h || !c.namespace && !r.namespace || c.namespace_re && c.namespace_re.test(r.namespace)) c.data = r.data, c.handleObj = r, n = ((f.event.special[r.origType] || {}).handle || r.handler).apply(p.elem, g), n !== b && (c.result = n, n === !1 && (c.preventDefault(), c.stopPropagation()));
                }
            }
            return c.result;
        },
        props: "attrChange attrName relatedNode srcElement altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function(a, b) {
                return a.which == null && (a.which = b.charCode != null ? b.charCode : b.keyCode), a;
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function(a, d) {
                var e, f, g, h = d.button, i = d.fromElement;
                return a.pageX == null && d.clientX != null && (e = a.target.ownerDocument || c, f = e.documentElement, g = e.body, a.pageX = d.clientX + (f && f.scrollLeft || g && g.scrollLeft || 0) - (f && f.clientLeft || g && g.clientLeft || 0), a.pageY = d.clientY + (f && f.scrollTop || g && g.scrollTop || 0) - (f && f.clientTop || g && g.clientTop || 0)), !a.relatedTarget && i && (a.relatedTarget = i === a.target ? d.toElement : i), !a.which && h !== b && (a.which = h & 1 ? 1 : h & 2 ? 3 : h & 4 ? 2 : 0), a;
            }
        },
        fix: function(a) {
            if (a[f.expando]) return a;
            var d, e, g = a, h = f.event.fixHooks[a.type] || {}, i = h.props ? this.props.concat(h.props) : this.props;
            a = f.Event(g);
            for (d = i.length; d; ) e = i[--d], a[e] = g[e];
            return a.target || (a.target = g.srcElement || c), a.target.nodeType === 3 && (a.target = a.target.parentNode), a.metaKey === b && (a.metaKey = a.ctrlKey), h.filter ? h.filter(a, g) : a;
        },
        special: {
            ready: {
                setup: f.bindReady
            },
            load: {
                noBubble: !0
            },
            focus: {
                delegateType: "focusin"
            },
            blur: {
                delegateType: "focusout"
            },
            beforeunload: {
                setup: function(a, b, c) {
                    f.isWindow(this) && (this.onbeforeunload = c);
                },
                teardown: function(a, b) {
                    this.onbeforeunload === b && (this.onbeforeunload = null);
                }
            }
        },
        simulate: function(a, b, c, d) {
            var e = f.extend(new f.Event, c, {
                type: a,
                isSimulated: !0,
                originalEvent: {}
            });
            d ? f.event.trigger(e, null, b) : f.event.dispatch.call(b, e), e.isDefaultPrevented() && c.preventDefault();
        }
    }, f.event.handle = f.event.dispatch, f.removeEvent = c.removeEventListener ? function(a, b, c) {
        a.removeEventListener && a.removeEventListener(b, c, !1);
    } : function(a, b, c) {
        a.detachEvent && a.detachEvent("on" + b, c);
    }, f.Event = function(a, b) {
        if (this instanceof f.Event) a && a.type ? (this.originalEvent = a, this.type = a.type, this.isDefaultPrevented = a.defaultPrevented || a.returnValue === !1 || a.getPreventDefault && a.getPreventDefault() ? K : J) : this.type = a, b && f.extend(this, b), this.timeStamp = a && a.timeStamp || f.now(), this[f.expando] = !0; else return new f.Event(a, b);
    }, f.Event.prototype = {
        preventDefault: function() {
            this.isDefaultPrevented = K;
            var a = this.originalEvent;
            if (!a) return;
            a.preventDefault ? a.preventDefault() : a.returnValue = !1;
        },
        stopPropagation: function() {
            this.isPropagationStopped = K;
            var a = this.originalEvent;
            if (!a) return;
            a.stopPropagation && a.stopPropagation(), a.cancelBubble = !0;
        },
        stopImmediatePropagation: function() {
            this.isImmediatePropagationStopped = K, this.stopPropagation();
        },
        isDefaultPrevented: J,
        isPropagationStopped: J,
        isImmediatePropagationStopped: J
    }, f.each({
        mouseenter: "mouseover",
        mouseleave: "mouseout"
    }, function(a, b) {
        f.event.special[a] = {
            delegateType: b,
            bindType: b,
            handle: function(a) {
                var c = this, d = a.relatedTarget, e = a.handleObj, g = e.selector, h;
                if (!d || d !== c && !f.contains(c, d)) a.type = e.origType, h = e.handler.apply(this, arguments), a.type = b;
                return h;
            }
        };
    }), f.support.submitBubbles || (f.event.special.submit = {
        setup: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.add(this, "click._submit keypress._submit", function(a) {
                var c = a.target, d = f.nodeName(c, "input") || f.nodeName(c, "button") ? c.form : b;
                d && !d._submit_attached && (f.event.add(d, "submit._submit", function(a) {
                    this.parentNode && !a.isTrigger && f.event.simulate("submit", this.parentNode, a, !0);
                }), d._submit_attached = !0);
            });
        },
        teardown: function() {
            if (f.nodeName(this, "form")) return !1;
            f.event.remove(this, "._submit");
        }
    }), f.support.changeBubbles || (f.event.special.change = {
        setup: function() {
            if (z.test(this.nodeName)) {
                if (this.type === "checkbox" || this.type === "radio") f.event.add(this, "propertychange._change", function(a) {
                    a.originalEvent.propertyName === "checked" && (this._just_changed = !0);
                }), f.event.add(this, "click._change", function(a) {
                    this._just_changed && !a.isTrigger && (this._just_changed = !1, f.event.simulate("change", this, a, !0));
                });
                return !1;
            }
            f.event.add(this, "beforeactivate._change", function(a) {
                var b = a.target;
                z.test(b.nodeName) && !b._change_attached && (f.event.add(b, "change._change", function(a) {
                    this.parentNode && !a.isSimulated && !a.isTrigger && f.event.simulate("change", this.parentNode, a, !0);
                }), b._change_attached = !0);
            });
        },
        handle: function(a) {
            var b = a.target;
            if (this !== b || a.isSimulated || a.isTrigger || b.type !== "radio" && b.type !== "checkbox") return a.handleObj.handler.apply(this, arguments);
        },
        teardown: function() {
            return f.event.remove(this, "._change"), z.test(this.nodeName);
        }
    }), f.support.focusinBubbles || f.each({
        focus: "focusin",
        blur: "focusout"
    }, function(a, b) {
        var d = 0, e = function(a) {
            f.event.simulate(b, a.target, f.event.fix(a), !0);
        };
        f.event.special[b] = {
            setup: function() {
                d++ === 0 && c.addEventListener(a, e, !0);
            },
            teardown: function() {
                --d === 0 && c.removeEventListener(a, e, !0);
            }
        };
    }), f.fn.extend({
        on: function(a, c, d, e, g) {
            var h, i;
            if (typeof a == "object") {
                typeof c != "string" && (d = c, c = b);
                for (i in a) this.on(i, c, d, a[i], g);
                return this;
            }
            d == null && e == null ? (e = c, d = c = b) : e == null && (typeof c == "string" ? (e = d, d = b) : (e = d, d = c, c = b));
            if (e === !1) e = J; else if (!e) return this;
            return g === 1 && (h = e, e = function(a) {
                return f().off(a), h.apply(this, arguments);
            }, e.guid = h.guid || (h.guid = f.guid++)), this.each(function() {
                f.event.add(this, a, e, d, c);
            });
        },
        one: function(a, b, c, d) {
            return this.on.call(this, a, b, c, d, 1);
        },
        off: function(a, c, d) {
            if (a && a.preventDefault && a.handleObj) {
                var e = a.handleObj;
                return f(a.delegateTarget).off(e.namespace ? e.type + "." + e.namespace : e.type, e.selector, e.handler), this;
            }
            if (typeof a == "object") {
                for (var g in a) this.off(g, c, a[g]);
                return this;
            }
            if (c === !1 || typeof c == "function") d = c, c = b;
            return d === !1 && (d = J), this.each(function() {
                f.event.remove(this, a, d, c);
            });
        },
        bind: function(a, b, c) {
            return this.on(a, null, b, c);
        },
        unbind: function(a, b) {
            return this.off(a, null, b);
        },
        live: function(a, b, c) {
            return f(this.context).on(a, this.selector, b, c), this;
        },
        die: function(a, b) {
            return f(this.context).off(a, this.selector || "**", b), this;
        },
        delegate: function(a, b, c, d) {
            return this.on(b, a, c, d);
        },
        undelegate: function(a, b, c) {
            return arguments.length == 1 ? this.off(a, "**") : this.off(b, a, c);
        },
        trigger: function(a, b) {
            return this.each(function() {
                f.event.trigger(a, b, this);
            });
        },
        triggerHandler: function(a, b) {
            if (this[0]) return f.event.trigger(a, b, this[0], !0);
        },
        toggle: function(a) {
            var b = arguments, c = a.guid || f.guid++, d = 0, e = function(c) {
                var e = (f._data(this, "lastToggle" + a.guid) || 0) % d;
                return f._data(this, "lastToggle" + a.guid, e + 1), c.preventDefault(), b[e].apply(this, arguments) || !1;
            };
            e.guid = c;
            while (d < b.length) b[d++].guid = c;
            return this.click(e);
        },
        hover: function(a, b) {
            return this.mouseenter(a).mouseleave(b || a);
        }
    }), f.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), function(a, b) {
        f.fn[b] = function(a, c) {
            return c == null && (c = a, a = null), arguments.length > 0 ? this.on(b, null, a, c) : this.trigger(b);
        }, f.attrFn && (f.attrFn[b] = !0), C.test(b) && (f.event.fixHooks[b] = f.event.keyHooks), D.test(b) && (f.event.fixHooks[b] = f.event.mouseHooks);
    }), function() {
        function w(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break;
                        }
                        j.nodeType === 1 && !g && (j[d] = c, j.sizset = h);
                        if (j.nodeName.toLowerCase() === b) {
                            k = j;
                            break;
                        }
                        j = j[a];
                    }
                    e[h] = k;
                }
            }
        }
        function x(a, b, c, e, f, g) {
            for (var h = 0, i = e.length; h < i; h++) {
                var j = e[h];
                if (j) {
                    var k = !1;
                    j = j[a];
                    while (j) {
                        if (j[d] === c) {
                            k = e[j.sizset];
                            break;
                        }
                        if (j.nodeType === 1) {
                            g || (j[d] = c, j.sizset = h);
                            if (typeof b != "string") {
                                if (j === b) {
                                    k = !0;
                                    break;
                                }
                            } else if (m.filter(b, [ j ]).length > 0) {
                                k = j;
                                break;
                            }
                        }
                        j = j[a];
                    }
                    e[h] = k;
                }
            }
        }
        var a = /((?:\((?:\([^()]+\)|[^()]+)+\)|\[(?:\[[^\[\]]*\]|['"][^'"]*['"]|[^\[\]'"]+)+\]|\\.|[^ >+~,(\[\\]+)+|[>+~])(\s*,\s*)?((?:.|\r|\n)*)/g, d = "sizcache" + (Math.random() + "").replace(".", ""), e = 0, g = Object.prototype.toString, h = !1, i = !0, j = /\\/g, k = /\r\n/g, l = /\W/;
        [ 0, 0 ].sort(function() {
            return i = !1, 0;
        });
        var m = function(b, d, e, f) {
            e = e || [], d = d || c;
            var h = d;
            if (d.nodeType !== 1 && d.nodeType !== 9) return [];
            if (!b || typeof b != "string") return e;
            var i, j, k, l, n, q, r, t, u = !0, v = m.isXML(d), w = [], x = b;
            do {
                a.exec(""), i = a.exec(x);
                if (i) {
                    x = i[3], w.push(i[1]);
                    if (i[2]) {
                        l = i[3];
                        break;
                    }
                }
            } while (i);
            if (w.length > 1 && p.exec(b)) if (w.length === 2 && o.relative[w[0]]) j = y(w[0] + w[1], d, f); else {
                j = o.relative[w[0]] ? [ d ] : m(w.shift(), d);
                while (w.length) b = w.shift(), o.relative[b] && (b += w.shift()), j = y(b, j, f);
            } else {
                !f && w.length > 1 && d.nodeType === 9 && !v && o.match.ID.test(w[0]) && !o.match.ID.test(w[w.length - 1]) && (n = m.find(w.shift(), d, v), d = n.expr ? m.filter(n.expr, n.set)[0] : n.set[0]);
                if (d) {
                    n = f ? {
                        expr: w.pop(),
                        set: s(f)
                    } : m.find(w.pop(), w.length !== 1 || w[0] !== "~" && w[0] !== "+" || !d.parentNode ? d : d.parentNode, v), j = n.expr ? m.filter(n.expr, n.set) : n.set, w.length > 0 ? k = s(j) : u = !1;
                    while (w.length) q = w.pop(), r = q, o.relative[q] ? r = w.pop() : q = "", r == null && (r = d), o.relative[q](k, r, v);
                } else k = w = [];
            }
            k || (k = j), k || m.error(q || b);
            if (g.call(k) === "[object Array]") if (!u) e.push.apply(e, k); else if (d && d.nodeType === 1) for (t = 0; k[t] != null; t++) k[t] && (k[t] === !0 || k[t].nodeType === 1 && m.contains(d, k[t])) && e.push(j[t]); else for (t = 0; k[t] != null; t++) k[t] && k[t].nodeType === 1 && e.push(j[t]); else s(k, e);
            return l && (m(l, h, e, f), m.uniqueSort(e)), e;
        };
        m.uniqueSort = function(a) {
            if (u) {
                h = i, a.sort(u);
                if (h) for (var b = 1; b < a.length; b++) a[b] === a[b - 1] && a.splice(b--, 1);
            }
            return a;
        }, m.matches = function(a, b) {
            return m(a, null, null, b);
        }, m.matchesSelector = function(a, b) {
            return m(b, null, null, [ a ]).length > 0;
        }, m.find = function(a, b, c) {
            var d, e, f, g, h, i;
            if (!a) return [];
            for (e = 0, f = o.order.length; e < f; e++) {
                h = o.order[e];
                if (g = o.leftMatch[h].exec(a)) {
                    i = g[1], g.splice(1, 1);
                    if (i.substr(i.length - 1) !== "\\") {
                        g[1] = (g[1] || "").replace(j, ""), d = o.find[h](g, b, c);
                        if (d != null) {
                            a = a.replace(o.match[h], "");
                            break;
                        }
                    }
                }
            }
            return d || (d = typeof b.getElementsByTagName != "undefined" ? b.getElementsByTagName("*") : []), {
                set: d,
                expr: a
            };
        }, m.filter = function(a, c, d, e) {
            var f, g, h, i, j, k, l, n, p, q = a, r = [], s = c, t = c && c[0] && m.isXML(c[0]);
            while (a && c.length) {
                for (h in o.filter) if ((f = o.leftMatch[h].exec(a)) != null && f[2]) {
                    k = o.filter[h], l = f[1], g = !1, f.splice(1, 1);
                    if (l.substr(l.length - 1) === "\\") continue;
                    s === r && (r = []);
                    if (o.preFilter[h]) {
                        f = o.preFilter[h](f, s, d, r, e, t);
                        if (!f) g = i = !0; else if (f === !0) continue;
                    }
                    if (f) for (n = 0; (j = s[n]) != null; n++) j && (i = k(j, f, n, s), p = e ^ i, d && i != null ? p ? g = !0 : s[n] = !1 : p && (r.push(j), g = !0));
                    if (i !== b) {
                        d || (s = r), a = a.replace(o.match[h], "");
                        if (!g) return [];
                        break;
                    }
                }
                if (a === q) if (g == null) m.error(a); else break;
                q = a;
            }
            return s;
        }, m.error = function(a) {
            throw new Error("Syntax error, unrecognized expression: " + a);
        };
        var n = m.getText = function(a) {
            var b, c, d = a.nodeType, e = "";
            if (d) {
                if (d === 1 || d === 9) {
                    if (typeof a.textContent == "string") return a.textContent;
                    if (typeof a.innerText == "string") return a.innerText.replace(k, "");
                    for (a = a.firstChild; a; a = a.nextSibling) e += n(a);
                } else if (d === 3 || d === 4) return a.nodeValue;
            } else for (b = 0; c = a[b]; b++) c.nodeType !== 8 && (e += n(c));
            return e;
        }, o = m.selectors = {
            order: [ "ID", "NAME", "TAG" ],
            match: {
                ID: /#((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                CLASS: /\.((?:[\w\u00c0-\uFFFF\-]|\\.)+)/,
                NAME: /\[name=['"]*((?:[\w\u00c0-\uFFFF\-]|\\.)+)['"]*\]/,
                ATTR: /\[\s*((?:[\w\u00c0-\uFFFF\-]|\\.)+)\s*(?:(\S?=)\s*(?:(['"])(.*?)\3|(#?(?:[\w\u00c0-\uFFFF\-]|\\.)*)|)|)\s*\]/,
                TAG: /^((?:[\w\u00c0-\uFFFF\*\-]|\\.)+)/,
                CHILD: /:(only|nth|last|first)-child(?:\(\s*(even|odd|(?:[+\-]?\d+|(?:[+\-]?\d*)?n\s*(?:[+\-]\s*\d+)?))\s*\))?/,
                POS: /:(nth|eq|gt|lt|first|last|even|odd)(?:\((\d*)\))?(?=[^\-]|$)/,
                PSEUDO: /:((?:[\w\u00c0-\uFFFF\-]|\\.)+)(?:\((['"]?)((?:\([^\)]+\)|[^\(\)]*)+)\2\))?/
            },
            leftMatch: {},
            attrMap: {
                "class": "className",
                "for": "htmlFor"
            },
            attrHandle: {
                href: function(a) {
                    return a.getAttribute("href");
                },
                type: function(a) {
                    return a.getAttribute("type");
                }
            },
            relative: {
                "+": function(a, b) {
                    var c = typeof b == "string", d = c && !l.test(b), e = c && !d;
                    d && (b = b.toLowerCase());
                    for (var f = 0, g = a.length, h; f < g; f++) if (h = a[f]) {
                        while ((h = h.previousSibling) && h.nodeType !== 1) ;
                        a[f] = e || h && h.nodeName.toLowerCase() === b ? h || !1 : h === b;
                    }
                    e && m.filter(b, a, !0);
                },
                ">": function(a, b) {
                    var c, d = typeof b == "string", e = 0, f = a.length;
                    if (d && !l.test(b)) {
                        b = b.toLowerCase();
                        for (; e < f; e++) {
                            c = a[e];
                            if (c) {
                                var g = c.parentNode;
                                a[e] = g.nodeName.toLowerCase() === b ? g : !1;
                            }
                        }
                    } else {
                        for (; e < f; e++) c = a[e], c && (a[e] = d ? c.parentNode : c.parentNode === b);
                        d && m.filter(b, a, !0);
                    }
                },
                "": function(a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("parentNode", b, f, a, d, c);
                },
                "~": function(a, b, c) {
                    var d, f = e++, g = x;
                    typeof b == "string" && !l.test(b) && (b = b.toLowerCase(), d = b, g = w), g("previousSibling", b, f, a, d, c);
                }
            },
            find: {
                ID: function(a, b, c) {
                    if (typeof b.getElementById != "undefined" && !c) {
                        var d = b.getElementById(a[1]);
                        return d && d.parentNode ? [ d ] : [];
                    }
                },
                NAME: function(a, b) {
                    if (typeof b.getElementsByName != "undefined") {
                        var c = [], d = b.getElementsByName(a[1]);
                        for (var e = 0, f = d.length; e < f; e++) d[e].getAttribute("name") === a[1] && c.push(d[e]);
                        return c.length === 0 ? null : c;
                    }
                },
                TAG: function(a, b) {
                    if (typeof b.getElementsByTagName != "undefined") return b.getElementsByTagName(a[1]);
                }
            },
            preFilter: {
                CLASS: function(a, b, c, d, e, f) {
                    a = " " + a[1].replace(j, "") + " ";
                    if (f) return a;
                    for (var g = 0, h; (h = b[g]) != null; g++) h && (e ^ (h.className && (" " + h.className + " ").replace(/[\t\n\r]/g, " ").indexOf(a) >= 0) ? c || d.push(h) : c && (b[g] = !1));
                    return !1;
                },
                ID: function(a) {
                    return a[1].replace(j, "");
                },
                TAG: function(a, b) {
                    return a[1].replace(j, "").toLowerCase();
                },
                CHILD: function(a) {
                    if (a[1] === "nth") {
                        a[2] || m.error(a[0]), a[2] = a[2].replace(/^\+|\s*/g, "");
                        var b = /(-?)(\d*)(?:n([+\-]?\d*))?/.exec(a[2] === "even" && "2n" || a[2] === "odd" && "2n+1" || !/\D/.test(a[2]) && "0n+" + a[2] || a[2]);
                        a[2] = b[1] + (b[2] || 1) - 0, a[3] = b[3] - 0;
                    } else a[2] && m.error(a[0]);
                    return a[0] = e++, a;
                },
                ATTR: function(a, b, c, d, e, f) {
                    var g = a[1] = a[1].replace(j, "");
                    return !f && o.attrMap[g] && (a[1] = o.attrMap[g]), a[4] = (a[4] || a[5] || "").replace(j, ""), a[2] === "~=" && (a[4] = " " + a[4] + " "), a;
                },
                PSEUDO: function(b, c, d, e, f) {
                    if (b[1] === "not") if ((a.exec(b[3]) || "").length > 1 || /^\w/.test(b[3])) b[3] = m(b[3], null, null, c); else {
                        var g = m.filter(b[3], c, d, !0 ^ f);
                        return d || e.push.apply(e, g), !1;
                    } else if (o.match.POS.test(b[0]) || o.match.CHILD.test(b[0])) return !0;
                    return b;
                },
                POS: function(a) {
                    return a.unshift(!0), a;
                }
            },
            filters: {
                enabled: function(a) {
                    return a.disabled === !1 && a.type !== "hidden";
                },
                disabled: function(a) {
                    return a.disabled === !0;
                },
                checked: function(a) {
                    return a.checked === !0;
                },
                selected: function(a) {
                    return a.parentNode && a.parentNode.selectedIndex, a.selected === !0;
                },
                parent: function(a) {
                    return !!a.firstChild;
                },
                empty: function(a) {
                    return !a.firstChild;
                },
                has: function(a, b, c) {
                    return !!m(c[3], a).length;
                },
                header: function(a) {
                    return /h\d/i.test(a.nodeName);
                },
                text: function(a) {
                    var b = a.getAttribute("type"), c = a.type;
                    return a.nodeName.toLowerCase() === "input" && "text" === c && (b === c || b === null);
                },
                radio: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "radio" === a.type;
                },
                checkbox: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "checkbox" === a.type;
                },
                file: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "file" === a.type;
                },
                password: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "password" === a.type;
                },
                submit: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "submit" === a.type;
                },
                image: function(a) {
                    return a.nodeName.toLowerCase() === "input" && "image" === a.type;
                },
                reset: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return (b === "input" || b === "button") && "reset" === a.type;
                },
                button: function(a) {
                    var b = a.nodeName.toLowerCase();
                    return b === "input" && "button" === a.type || b === "button";
                },
                input: function(a) {
                    return /input|select|textarea|button/i.test(a.nodeName);
                },
                focus: function(a) {
                    return a === a.ownerDocument.activeElement;
                }
            },
            setFilters: {
                first: function(a, b) {
                    return b === 0;
                },
                last: function(a, b, c, d) {
                    return b === d.length - 1;
                },
                even: function(a, b) {
                    return b % 2 === 0;
                },
                odd: function(a, b) {
                    return b % 2 === 1;
                },
                lt: function(a, b, c) {
                    return b < c[3] - 0;
                },
                gt: function(a, b, c) {
                    return b > c[3] - 0;
                },
                nth: function(a, b, c) {
                    return c[3] - 0 === b;
                },
                eq: function(a, b, c) {
                    return c[3] - 0 === b;
                }
            },
            filter: {
                PSEUDO: function(a, b, c, d) {
                    var e = b[1], f = o.filters[e];
                    if (f) return f(a, c, b, d);
                    if (e === "contains") return (a.textContent || a.innerText || n([ a ]) || "").indexOf(b[3]) >= 0;
                    if (e === "not") {
                        var g = b[3];
                        for (var h = 0, i = g.length; h < i; h++) if (g[h] === a) return !1;
                        return !0;
                    }
                    m.error(e);
                },
                CHILD: function(a, b) {
                    var c, e, f, g, h, i, j, k = b[1], l = a;
                    switch (k) {
                      case "only":
                      case "first":
                        while (l = l.previousSibling) if (l.nodeType === 1) return !1;
                        if (k === "first") return !0;
                        l = a;
                      case "last":
                        while (l = l.nextSibling) if (l.nodeType === 1) return !1;
                        return !0;
                      case "nth":
                        c = b[2], e = b[3];
                        if (c === 1 && e === 0) return !0;
                        f = b[0], g = a.parentNode;
                        if (g && (g[d] !== f || !a.nodeIndex)) {
                            i = 0;
                            for (l = g.firstChild; l; l = l.nextSibling) l.nodeType === 1 && (l.nodeIndex = ++i);
                            g[d] = f;
                        }
                        return j = a.nodeIndex - e, c === 0 ? j === 0 : j % c === 0 && j / c >= 0;
                    }
                },
                ID: function(a, b) {
                    return a.nodeType === 1 && a.getAttribute("id") === b;
                },
                TAG: function(a, b) {
                    return b === "*" && a.nodeType === 1 || !!a.nodeName && a.nodeName.toLowerCase() === b;
                },
                CLASS: function(a, b) {
                    return (" " + (a.className || a.getAttribute("class")) + " ").indexOf(b) > -1;
                },
                ATTR: function(a, b) {
                    var c = b[1], d = m.attr ? m.attr(a, c) : o.attrHandle[c] ? o.attrHandle[c](a) : a[c] != null ? a[c] : a.getAttribute(c), e = d + "", f = b[2], g = b[4];
                    return d == null ? f === "!=" : !f && m.attr ? d != null : f === "=" ? e === g : f === "*=" ? e.indexOf(g) >= 0 : f === "~=" ? (" " + e + " ").indexOf(g) >= 0 : g ? f === "!=" ? e !== g : f === "^=" ? e.indexOf(g) === 0 : f === "$=" ? e.substr(e.length - g.length) === g : f === "|=" ? e === g || e.substr(0, g.length + 1) === g + "-" : !1 : e && d !== !1;
                },
                POS: function(a, b, c, d) {
                    var e = b[2], f = o.setFilters[e];
                    if (f) return f(a, c, b, d);
                }
            }
        }, p = o.match.POS, q = function(a, b) {
            return "\\" + (b - 0 + 1);
        };
        for (var r in o.match) o.match[r] = new RegExp(o.match[r].source + /(?![^\[]*\])(?![^\(]*\))/.source), o.leftMatch[r] = new RegExp(/(^(?:.|\r|\n)*?)/.source + o.match[r].source.replace(/\\(\d+)/g, q));
        var s = function(a, b) {
            return a = Array.prototype.slice.call(a, 0), b ? (b.push.apply(b, a), b) : a;
        };
        try {
            Array.prototype.slice.call(c.documentElement.childNodes, 0)[0].nodeType;
        } catch (t) {
            s = function(a, b) {
                var c = 0, d = b || [];
                if (g.call(a) === "[object Array]") Array.prototype.push.apply(d, a); else if (typeof a.length == "number") for (var e = a.length; c < e; c++) d.push(a[c]); else for (; a[c]; c++) d.push(a[c]);
                return d;
            };
        }
        var u, v;
        c.documentElement.compareDocumentPosition ? u = function(a, b) {
            return a === b ? (h = !0, 0) : !a.compareDocumentPosition || !b.compareDocumentPosition ? a.compareDocumentPosition ? -1 : 1 : a.compareDocumentPosition(b) & 4 ? -1 : 1;
        } : (u = function(a, b) {
            if (a === b) return h = !0, 0;
            if (a.sourceIndex && b.sourceIndex) return a.sourceIndex - b.sourceIndex;
            var c, d, e = [], f = [], g = a.parentNode, i = b.parentNode, j = g;
            if (g === i) return v(a, b);
            if (!g) return -1;
            if (!i) return 1;
            while (j) e.unshift(j), j = j.parentNode;
            j = i;
            while (j) f.unshift(j), j = j.parentNode;
            c = e.length, d = f.length;
            for (var k = 0; k < c && k < d; k++) if (e[k] !== f[k]) return v(e[k], f[k]);
            return k === c ? v(a, f[k], -1) : v(e[k], b, 1);
        }, v = function(a, b, c) {
            if (a === b) return c;
            var d = a.nextSibling;
            while (d) {
                if (d === b) return -1;
                d = d.nextSibling;
            }
            return 1;
        }), function() {
            var a = c.createElement("div"), d = "script" + (new Date).getTime(), e = c.documentElement;
            a.innerHTML = "<a name='" + d + "'/>", e.insertBefore(a, e.firstChild), c.getElementById(d) && (o.find.ID = function(a, c, d) {
                if (typeof c.getElementById != "undefined" && !d) {
                    var e = c.getElementById(a[1]);
                    return e ? e.id === a[1] || typeof e.getAttributeNode != "undefined" && e.getAttributeNode("id").nodeValue === a[1] ? [ e ] : b : [];
                }
            }, o.filter.ID = function(a, b) {
                var c = typeof a.getAttributeNode != "undefined" && a.getAttributeNode("id");
                return a.nodeType === 1 && c && c.nodeValue === b;
            }), e.removeChild(a), e = a = null;
        }(), function() {
            var a = c.createElement("div");
            a.appendChild(c.createComment("")), a.getElementsByTagName("*").length > 0 && (o.find.TAG = function(a, b) {
                var c = b.getElementsByTagName(a[1]);
                if (a[1] === "*") {
                    var d = [];
                    for (var e = 0; c[e]; e++) c[e].nodeType === 1 && d.push(c[e]);
                    c = d;
                }
                return c;
            }), a.innerHTML = "<a href='#'></a>", a.firstChild && typeof a.firstChild.getAttribute != "undefined" && a.firstChild.getAttribute("href") !== "#" && (o.attrHandle.href = function(a) {
                return a.getAttribute("href", 2);
            }), a = null;
        }(), c.querySelectorAll && function() {
            var a = m, b = c.createElement("div"), d = "__sizzle__";
            b.innerHTML = "<p class='TEST'></p>";
            if (b.querySelectorAll && b.querySelectorAll(".TEST").length === 0) return;
            m = function(b, e, f, g) {
                e = e || c;
                if (!g && !m.isXML(e)) {
                    var h = /^(\w+$)|^\.([\w\-]+$)|^#([\w\-]+$)/.exec(b);
                    if (h && (e.nodeType === 1 || e.nodeType === 9)) {
                        if (h[1]) return s(e.getElementsByTagName(b), f);
                        if (h[2] && o.find.CLASS && e.getElementsByClassName) return s(e.getElementsByClassName(h[2]), f);
                    }
                    if (e.nodeType === 9) {
                        if (b === "body" && e.body) return s([ e.body ], f);
                        if (h && h[3]) {
                            var i = e.getElementById(h[3]);
                            if (!i || !i.parentNode) return s([], f);
                            if (i.id === h[3]) return s([ i ], f);
                        }
                        try {
                            return s(e.querySelectorAll(b), f);
                        } catch (j) {}
                    } else if (e.nodeType === 1 && e.nodeName.toLowerCase() !== "object") {
                        var k = e, l = e.getAttribute("id"), n = l || d, p = e.parentNode, q = /^\s*[+~]/.test(b);
                        l ? n = n.replace(/'/g, "\\$&") : e.setAttribute("id", n), q && p && (e = e.parentNode);
                        try {
                            if (!q || p) return s(e.querySelectorAll("[id='" + n + "'] " + b), f);
                        } catch (r) {} finally {
                            l || k.removeAttribute("id");
                        }
                    }
                }
                return a(b, e, f, g);
            };
            for (var e in a) m[e] = a[e];
            b = null;
        }(), function() {
            var a = c.documentElement, b = a.matchesSelector || a.mozMatchesSelector || a.webkitMatchesSelector || a.msMatchesSelector;
            if (b) {
                var d = !b.call(c.createElement("div"), "div"), e = !1;
                try {
                    b.call(c.documentElement, "[test!='']:sizzle");
                } catch (f) {
                    e = !0;
                }
                m.matchesSelector = function(a, c) {
                    c = c.replace(/\=\s*([^'"\]]*)\s*\]/g, "='$1']");
                    if (!m.isXML(a)) try {
                        if (e || !o.match.PSEUDO.test(c) && !/!=/.test(c)) {
                            var f = b.call(a, c);
                            if (f || !d || a.document && a.document.nodeType !== 11) return f;
                        }
                    } catch (g) {}
                    return m(c, null, null, [ a ]).length > 0;
                };
            }
        }(), function() {
            var a = c.createElement("div");
            a.innerHTML = "<div class='test e'></div><div class='test'></div>";
            if (!a.getElementsByClassName || a.getElementsByClassName("e").length === 0) return;
            a.lastChild.className = "e";
            if (a.getElementsByClassName("e").length === 1) return;
            o.order.splice(1, 0, "CLASS"), o.find.CLASS = function(a, b, c) {
                if (typeof b.getElementsByClassName != "undefined" && !c) return b.getElementsByClassName(a[1]);
            }, a = null;
        }(), c.documentElement.contains ? m.contains = function(a, b) {
            return a !== b && (a.contains ? a.contains(b) : !0);
        } : c.documentElement.compareDocumentPosition ? m.contains = function(a, b) {
            return !!(a.compareDocumentPosition(b) & 16);
        } : m.contains = function() {
            return !1;
        }, m.isXML = function(a) {
            var b = (a ? a.ownerDocument || a : 0).documentElement;
            return b ? b.nodeName !== "HTML" : !1;
        };
        var y = function(a, b, c) {
            var d, e = [], f = "", g = b.nodeType ? [ b ] : b;
            while (d = o.match.PSEUDO.exec(a)) f += d[0], a = a.replace(o.match.PSEUDO, "");
            a = o.relative[a] ? a + "*" : a;
            for (var h = 0, i = g.length; h < i; h++) m(a, g[h], e, c);
            return m.filter(f, e);
        };
        m.attr = f.attr, m.selectors.attrMap = {}, f.find = m, f.expr = m.selectors, f.expr[":"] = f.expr.filters, f.unique = m.uniqueSort, f.text = m.getText, f.isXMLDoc = m.isXML, f.contains = m.contains;
    }();
    var L = /Until$/, M = /^(?:parents|prevUntil|prevAll)/, N = /,/, O = /^.[^:#\[\.,]*$/, P = Array.prototype.slice, Q = f.expr.match.POS, R = {
        children: !0,
        contents: !0,
        next: !0,
        prev: !0
    };
    f.fn.extend({
        find: function(a) {
            var b = this, c, d;
            if (typeof a != "string") return f(a).filter(function() {
                for (c = 0, d = b.length; c < d; c++) if (f.contains(b[c], this)) return !0;
            });
            var e = this.pushStack("", "find", a), g, h, i;
            for (c = 0, d = this.length; c < d; c++) {
                g = e.length, f.find(a, this[c], e);
                if (c > 0) for (h = g; h < e.length; h++) for (i = 0; i < g; i++) if (e[i] === e[h]) {
                    e.splice(h--, 1);
                    break;
                }
            }
            return e;
        },
        has: function(a) {
            var b = f(a);
            return this.filter(function() {
                for (var a = 0, c = b.length; a < c; a++) if (f.contains(this, b[a])) return !0;
            });
        },
        not: function(a) {
            return this.pushStack(T(this, a, !1), "not", a);
        },
        filter: function(a) {
            return this.pushStack(T(this, a, !0), "filter", a);
        },
        is: function(a) {
            return !!a && (typeof a == "string" ? Q.test(a) ? f(a, this.context).index(this[0]) >= 0 : f.filter(a, this).length > 0 : this.filter(a).length > 0);
        },
        closest: function(a, b) {
            var c = [], d, e, g = this[0];
            if (f.isArray(a)) {
                var h = 1;
                while (g && g.ownerDocument && g !== b) {
                    for (d = 0; d < a.length; d++) f(g).is(a[d]) && c.push({
                        selector: a[d],
                        elem: g,
                        level: h
                    });
                    g = g.parentNode, h++;
                }
                return c;
            }
            var i = Q.test(a) || typeof a != "string" ? f(a, b || this.context) : 0;
            for (d = 0, e = this.length; d < e; d++) {
                g = this[d];
                while (g) {
                    if (i ? i.index(g) > -1 : f.find.matchesSelector(g, a)) {
                        c.push(g);
                        break;
                    }
                    g = g.parentNode;
                    if (!g || !g.ownerDocument || g === b || g.nodeType === 11) break;
                }
            }
            return c = c.length > 1 ? f.unique(c) : c, this.pushStack(c, "closest", a);
        },
        index: function(a) {
            return a ? typeof a == "string" ? f.inArray(this[0], f(a)) : f.inArray(a.jquery ? a[0] : a, this) : this[0] && this[0].parentNode ? this.prevAll().length : -1;
        },
        add: function(a, b) {
            var c = typeof a == "string" ? f(a, b) : f.makeArray(a && a.nodeType ? [ a ] : a), d = f.merge(this.get(), c);
            return this.pushStack(S(c[0]) || S(d[0]) ? d : f.unique(d));
        },
        andSelf: function() {
            return this.add(this.prevObject);
        }
    }), f.each({
        parent: function(a) {
            var b = a.parentNode;
            return b && b.nodeType !== 11 ? b : null;
        },
        parents: function(a) {
            return f.dir(a, "parentNode");
        },
        parentsUntil: function(a, b, c) {
            return f.dir(a, "parentNode", c);
        },
        next: function(a) {
            return f.nth(a, 2, "nextSibling");
        },
        prev: function(a) {
            return f.nth(a, 2, "previousSibling");
        },
        nextAll: function(a) {
            return f.dir(a, "nextSibling");
        },
        prevAll: function(a) {
            return f.dir(a, "previousSibling");
        },
        nextUntil: function(a, b, c) {
            return f.dir(a, "nextSibling", c);
        },
        prevUntil: function(a, b, c) {
            return f.dir(a, "previousSibling", c);
        },
        siblings: function(a) {
            return f.sibling(a.parentNode.firstChild, a);
        },
        children: function(a) {
            return f.sibling(a.firstChild);
        },
        contents: function(a) {
            return f.nodeName(a, "iframe") ? a.contentDocument || a.contentWindow.document : f.makeArray(a.childNodes);
        }
    }, function(a, b) {
        f.fn[a] = function(c, d) {
            var e = f.map(this, b, c);
            return L.test(a) || (d = c), d && typeof d == "string" && (e = f.filter(d, e)), e = this.length > 1 && !R[a] ? f.unique(e) : e, (this.length > 1 || N.test(d)) && M.test(a) && (e = e.reverse()), this.pushStack(e, a, P.call(arguments).join(","));
        };
    }), f.extend({
        filter: function(a, b, c) {
            return c && (a = ":not(" + a + ")"), b.length === 1 ? f.find.matchesSelector(b[0], a) ? [ b[0] ] : [] : f.find.matches(a, b);
        },
        dir: function(a, c, d) {
            var e = [], g = a[c];
            while (g && g.nodeType !== 9 && (d === b || g.nodeType !== 1 || !f(g).is(d))) g.nodeType === 1 && e.push(g), g = g[c];
            return e;
        },
        nth: function(a, b, c, d) {
            b = b || 1;
            var e = 0;
            for (; a; a = a[c]) if (a.nodeType === 1 && ++e === b) break;
            return a;
        },
        sibling: function(a, b) {
            var c = [];
            for (; a; a = a.nextSibling) a.nodeType === 1 && a !== b && c.push(a);
            return c;
        }
    });
    var V = "abbr|article|aside|audio|canvas|datalist|details|figcaption|figure|footer|header|hgroup|mark|meter|nav|output|progress|section|summary|time|video", W = / jQuery\d+="(?:\d+|null)"/g, X = /^\s+/, Y = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/ig, Z = /<([\w:]+)/, $ = /<tbody/i, _ = /<|&#?\w+;/, ba = /<(?:script|style)/i, bb = /<(?:script|object|embed|option|style)/i, bc = new RegExp("<(?:" + V + ")", "i"), bd = /checked\s*(?:[^=]|=\s*.checked.)/i, be = /\/(java|ecma)script/i, bf = /^\s*<!(?:\[CDATA\[|\-\-)/, bg = {
        option: [ 1, "<select multiple='multiple'>", "</select>" ],
        legend: [ 1, "<fieldset>", "</fieldset>" ],
        thead: [ 1, "<table>", "</table>" ],
        tr: [ 2, "<table><tbody>", "</tbody></table>" ],
        td: [ 3, "<table><tbody><tr>", "</tr></tbody></table>" ],
        col: [ 2, "<table><tbody></tbody><colgroup>", "</colgroup></table>" ],
        area: [ 1, "<map>", "</map>" ],
        _default: [ 0, "", "" ]
    }, bh = U(c);
    bg.optgroup = bg.option, bg.tbody = bg.tfoot = bg.colgroup = bg.caption = bg.thead, bg.th = bg.td, f.support.htmlSerialize || (bg._default = [ 1, "div<div>", "</div>" ]), f.fn.extend({
        text: function(a) {
            return f.isFunction(a) ? this.each(function(b) {
                var c = f(this);
                c.text(a.call(this, b, c.text()));
            }) : typeof a != "object" && a !== b ? this.empty().append((this[0] && this[0].ownerDocument || c).createTextNode(a)) : f.text(this);
        },
        wrapAll: function(a) {
            if (f.isFunction(a)) return this.each(function(b) {
                f(this).wrapAll(a.call(this, b));
            });
            if (this[0]) {
                var b = f(a, this[0].ownerDocument).eq(0).clone(!0);
                this[0].parentNode && b.insertBefore(this[0]), b.map(function() {
                    var a = this;
                    while (a.firstChild && a.firstChild.nodeType === 1) a = a.firstChild;
                    return a;
                }).append(this);
            }
            return this;
        },
        wrapInner: function(a) {
            return f.isFunction(a) ? this.each(function(b) {
                f(this).wrapInner(a.call(this, b));
            }) : this.each(function() {
                var b = f(this), c = b.contents();
                c.length ? c.wrapAll(a) : b.append(a);
            });
        },
        wrap: function(a) {
            var b = f.isFunction(a);
            return this.each(function(c) {
                f(this).wrapAll(b ? a.call(this, c) : a);
            });
        },
        unwrap: function() {
            return this.parent().each(function() {
                f.nodeName(this, "body") || f(this).replaceWith(this.childNodes);
            }).end();
        },
        append: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.appendChild(a);
            });
        },
        prepend: function() {
            return this.domManip(arguments, !0, function(a) {
                this.nodeType === 1 && this.insertBefore(a, this.firstChild);
            });
        },
        before: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this);
            });
            if (arguments.length) {
                var a = f.clean(arguments);
                return a.push.apply(a, this.toArray()), this.pushStack(a, "before", arguments);
            }
        },
        after: function() {
            if (this[0] && this[0].parentNode) return this.domManip(arguments, !1, function(a) {
                this.parentNode.insertBefore(a, this.nextSibling);
            });
            if (arguments.length) {
                var a = this.pushStack(this, "after", arguments);
                return a.push.apply(a, f.clean(arguments)), a;
            }
        },
        remove: function(a, b) {
            for (var c = 0, d; (d = this[c]) != null; c++) if (!a || f.filter(a, [ d ]).length) !b && d.nodeType === 1 && (f.cleanData(d.getElementsByTagName("*")), f.cleanData([ d ])), d.parentNode && d.parentNode.removeChild(d);
            return this;
        },
        empty: function() {
            for (var a = 0, b; (b = this[a]) != null; a++) {
                b.nodeType === 1 && f.cleanData(b.getElementsByTagName("*"));
                while (b.firstChild) b.removeChild(b.firstChild);
            }
            return this;
        },
        clone: function(a, b) {
            return a = a == null ? !1 : a, b = b == null ? a : b, this.map(function() {
                return f.clone(this, a, b);
            });
        },
        html: function(a) {
            if (a === b) return this[0] && this[0].nodeType === 1 ? this[0].innerHTML.replace(W, "") : null;
            if (typeof a == "string" && !ba.test(a) && (f.support.leadingWhitespace || !X.test(a)) && !bg[(Z.exec(a) || [ "", "" ])[1].toLowerCase()]) {
                a = a.replace(Y, "<$1></$2>");
                try {
                    for (var c = 0, d = this.length; c < d; c++) this[c].nodeType === 1 && (f.cleanData(this[c].getElementsByTagName("*")), this[c].innerHTML = a);
                } catch (e) {
                    this.empty().append(a);
                }
            } else f.isFunction(a) ? this.each(function(b) {
                var c = f(this);
                c.html(a.call(this, b, c.html()));
            }) : this.empty().append(a);
            return this;
        },
        replaceWith: function(a) {
            return this[0] && this[0].parentNode ? f.isFunction(a) ? this.each(function(b) {
                var c = f(this), d = c.html();
                c.replaceWith(a.call(this, b, d));
            }) : (typeof a != "string" && (a = f(a).detach()), this.each(function() {
                var b = this.nextSibling, c = this.parentNode;
                f(this).remove(), b ? f(b).before(a) : f(c).append(a);
            })) : this.length ? this.pushStack(f(f.isFunction(a) ? a() : a), "replaceWith", a) : this;
        },
        detach: function(a) {
            return this.remove(a, !0);
        },
        domManip: function(a, c, d) {
            var e, g, h, i, j = a[0], k = [];
            if (!f.support.checkClone && arguments.length === 3 && typeof j == "string" && bd.test(j)) return this.each(function() {
                f(this).domManip(a, c, d, !0);
            });
            if (f.isFunction(j)) return this.each(function(e) {
                var g = f(this);
                a[0] = j.call(this, e, c ? g.html() : b), g.domManip(a, c, d);
            });
            if (this[0]) {
                i = j && j.parentNode, f.support.parentNode && i && i.nodeType === 11 && i.childNodes.length === this.length ? e = {
                    fragment: i
                } : e = f.buildFragment(a, this, k), h = e.fragment, h.childNodes.length === 1 ? g = h = h.firstChild : g = h.firstChild;
                if (g) {
                    c = c && f.nodeName(g, "tr");
                    for (var l = 0, m = this.length, n = m - 1; l < m; l++) d.call(c ? bi(this[l], g) : this[l], e.cacheable || m > 1 && l < n ? f.clone(h, !0, !0) : h);
                }
                k.length && f.each(k, bp);
            }
            return this;
        }
    }), f.buildFragment = function(a, b, d) {
        var e, g, h, i, j = a[0];
        return b && b[0] && (i = b[0].ownerDocument || b[0]), i.createDocumentFragment || (i = c), a.length === 1 && typeof j == "string" && j.length < 512 && i === c && j.charAt(0) === "<" && !bb.test(j) && (f.support.checkClone || !bd.test(j)) && (f.support.html5Clone || !bc.test(j)) && (g = !0, h = f.fragments[j], h && h !== 1 && (e = h)), e || (e = i.createDocumentFragment(), f.clean(a, i, e, d)), g && (f.fragments[j] = h ? e : 1), {
            fragment: e,
            cacheable: g
        };
    }, f.fragments = {}, f.each({
        appendTo: "append",
        prependTo: "prepend",
        insertBefore: "before",
        insertAfter: "after",
        replaceAll: "replaceWith"
    }, function(a, b) {
        f.fn[a] = function(c) {
            var d = [], e = f(c), g = this.length === 1 && this[0].parentNode;
            if (g && g.nodeType === 11 && g.childNodes.length === 1 && e.length === 1) return e[b](this[0]), this;
            for (var h = 0, i = e.length; h < i; h++) {
                var j = (h > 0 ? this.clone(!0) : this).get();
                f(e[h])[b](j), d = d.concat(j);
            }
            return this.pushStack(d, a, e.selector);
        };
    }), f.extend({
        clone: function(a, b, c) {
            var d, e, g, h = f.support.html5Clone || !bc.test("<" + a.nodeName) ? a.cloneNode(!0) : bo(a);
            if ((!f.support.noCloneEvent || !f.support.noCloneChecked) && (a.nodeType === 1 || a.nodeType === 11) && !f.isXMLDoc(a)) {
                bk(a, h), d = bl(a), e = bl(h);
                for (g = 0; d[g]; ++g) e[g] && bk(d[g], e[g]);
            }
            if (b) {
                bj(a, h);
                if (c) {
                    d = bl(a), e = bl(h);
                    for (g = 0; d[g]; ++g) bj(d[g], e[g]);
                }
            }
            return d = e = null, h;
        },
        clean: function(a, b, d, e) {
            var g;
            b = b || c, typeof b.createElement == "undefined" && (b = b.ownerDocument || b[0] && b[0].ownerDocument || c);
            var h = [], i;
            for (var j = 0, k; (k = a[j]) != null; j++) {
                typeof k == "number" && (k += "");
                if (!k) continue;
                if (typeof k == "string") if (!_.test(k)) k = b.createTextNode(k); else {
                    k = k.replace(Y, "<$1></$2>");
                    var l = (Z.exec(k) || [ "", "" ])[1].toLowerCase(), m = bg[l] || bg._default, n = m[0], o = b.createElement("div");
                    b === c ? bh.appendChild(o) : U(b).appendChild(o), o.innerHTML = m[1] + k + m[2];
                    while (n--) o = o.lastChild;
                    if (!f.support.tbody) {
                        var p = $.test(k), q = l === "table" && !p ? o.firstChild && o.firstChild.childNodes : m[1] === "<table>" && !p ? o.childNodes : [];
                        for (i = q.length - 1; i >= 0; --i) f.nodeName(q[i], "tbody") && !q[i].childNodes.length && q[i].parentNode.removeChild(q[i]);
                    }
                    !f.support.leadingWhitespace && X.test(k) && o.insertBefore(b.createTextNode(X.exec(k)[0]), o.firstChild), k = o.childNodes;
                }
                var r;
                if (!f.support.appendChecked) if (k[0] && typeof (r = k.length) == "number") for (i = 0; i < r; i++) bn(k[i]); else bn(k);
                k.nodeType ? h.push(k) : h = f.merge(h, k);
            }
            if (d) {
                g = function(a) {
                    return !a.type || be.test(a.type);
                };
                for (j = 0; h[j]; j++) if (e && f.nodeName(h[j], "script") && (!h[j].type || h[j].type.toLowerCase() === "text/javascript")) e.push(h[j].parentNode ? h[j].parentNode.removeChild(h[j]) : h[j]); else {
                    if (h[j].nodeType === 1) {
                        var s = f.grep(h[j].getElementsByTagName("script"), g);
                        h.splice.apply(h, [ j + 1, 0 ].concat(s));
                    }
                    d.appendChild(h[j]);
                }
            }
            return h;
        },
        cleanData: function(a) {
            var b, c, d = f.cache, e = f.event.special, g = f.support.deleteExpando;
            for (var h = 0, i; (i = a[h]) != null; h++) {
                if (i.nodeName && f.noData[i.nodeName.toLowerCase()]) continue;
                c = i[f.expando];
                if (c) {
                    b = d[c];
                    if (b && b.events) {
                        for (var j in b.events) e[j] ? f.event.remove(i, j) : f.removeEvent(i, j, b.handle);
                        b.handle && (b.handle.elem = null);
                    }
                    g ? delete i[f.expando] : i.removeAttribute && i.removeAttribute(f.expando), delete d[c];
                }
            }
        }
    });
    var bq = /alpha\([^)]*\)/i, br = /opacity=([^)]*)/, bs = /([A-Z]|^ms)/g, bt = /^-?\d+(?:px)?$/i, bu = /^-?\d/, bv = /^([\-+])=([\-+.\de]+)/, bw = {
        position: "absolute",
        visibility: "hidden",
        display: "block"
    }, bx = [ "Left", "Right" ], by = [ "Top", "Bottom" ], bz, bA, bB;
    f.fn.css = function(a, c) {
        return arguments.length === 2 && c === b ? this : f.access(this, a, c, !0, function(a, c, d) {
            return d !== b ? f.style(a, c, d) : f.css(a, c);
        });
    }, f.extend({
        cssHooks: {
            opacity: {
                get: function(a, b) {
                    if (b) {
                        var c = bz(a, "opacity", "opacity");
                        return c === "" ? "1" : c;
                    }
                    return a.style.opacity;
                }
            }
        },
        cssNumber: {
            fillOpacity: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            "float": f.support.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function(a, c, d, e) {
            if (!a || a.nodeType === 3 || a.nodeType === 8 || !a.style) return;
            var g, h, i = f.camelCase(c), j = a.style, k = f.cssHooks[i];
            c = f.cssProps[i] || i;
            if (d === b) return k && "get" in k && (g = k.get(a, !1, e)) !== b ? g : j[c];
            h = typeof d, h === "string" && (g = bv.exec(d)) && (d = +(g[1] + 1) * +g[2] + parseFloat(f.css(a, c)), h = "number");
            if (d == null || h === "number" && isNaN(d)) return;
            h === "number" && !f.cssNumber[i] && (d += "px");
            if (!k || !("set" in k) || (d = k.set(a, d)) !== b) try {
                j[c] = d;
            } catch (l) {}
        },
        css: function(a, c, d) {
            var e, g;
            c = f.camelCase(c), g = f.cssHooks[c], c = f.cssProps[c] || c, c === "cssFloat" && (c = "float");
            if (g && "get" in g && (e = g.get(a, !0, d)) !== b) return e;
            if (bz) return bz(a, c);
        },
        swap: function(a, b, c) {
            var d = {};
            for (var e in b) d[e] = a.style[e], a.style[e] = b[e];
            c.call(a);
            for (e in b) a.style[e] = d[e];
        }
    }), f.curCSS = f.css, f.each([ "height", "width" ], function(a, b) {
        f.cssHooks[b] = {
            get: function(a, c, d) {
                var e;
                if (c) return a.offsetWidth !== 0 ? bC(a, b, d) : (f.swap(a, bw, function() {
                    e = bC(a, b, d);
                }), e);
            },
            set: function(a, b) {
                if (!bt.test(b)) return b;
                b = parseFloat(b);
                if (b >= 0) return b + "px";
            }
        };
    }), f.support.opacity || (f.cssHooks.opacity = {
        get: function(a, b) {
            return br.test((b && a.currentStyle ? a.currentStyle.filter : a.style.filter) || "") ? parseFloat(RegExp.$1) / 100 + "" : b ? "1" : "";
        },
        set: function(a, b) {
            var c = a.style, d = a.currentStyle, e = f.isNumeric(b) ? "alpha(opacity=" + b * 100 + ")" : "", g = d && d.filter || c.filter || "";
            c.zoom = 1;
            if (b >= 1 && f.trim(g.replace(bq, "")) === "") {
                c.removeAttribute("filter");
                if (d && !d.filter) return;
            }
            c.filter = bq.test(g) ? g.replace(bq, e) : g + " " + e;
        }
    }), f(function() {
        f.support.reliableMarginRight || (f.cssHooks.marginRight = {
            get: function(a, b) {
                var c;
                return f.swap(a, {
                    display: "inline-block"
                }, function() {
                    b ? c = bz(a, "margin-right", "marginRight") : c = a.style.marginRight;
                }), c;
            }
        });
    }), c.defaultView && c.defaultView.getComputedStyle && (bA = function(a, b) {
        var c, d, e;
        return b = b.replace(bs, "-$1").toLowerCase(), (d = a.ownerDocument.defaultView) && (e = d.getComputedStyle(a, null)) && (c = e.getPropertyValue(b), c === "" && !f.contains(a.ownerDocument.documentElement, a) && (c = f.style(a, b))), c;
    }), c.documentElement.currentStyle && (bB = function(a, b) {
        var c, d, e, f = a.currentStyle && a.currentStyle[b], g = a.style;
        return f === null && g && (e = g[b]) && (f = e), !bt.test(f) && bu.test(f) && (c = g.left, d = a.runtimeStyle && a.runtimeStyle.left, d && (a.runtimeStyle.left = a.currentStyle.left), g.left = b === "fontSize" ? "1em" : f || 0, f = g.pixelLeft + "px", g.left = c, d && (a.runtimeStyle.left = d)), f === "" ? "auto" : f;
    }), bz = bA || bB, f.expr && f.expr.filters && (f.expr.filters.hidden = function(a) {
        var b = a.offsetWidth, c = a.offsetHeight;
        return b === 0 && c === 0 || !f.support.reliableHiddenOffsets && (a.style && a.style.display || f.css(a, "display")) === "none";
    }, f.expr.filters.visible = function(a) {
        return !f.expr.filters.hidden(a);
    });
    var bD = /%20/g, bE = /\[\]$/, bF = /\r?\n/g, bG = /#.*$/, bH = /^(.*?):[ \t]*([^\r\n]*)\r?$/mg, bI = /^(?:color|date|datetime|datetime-local|email|hidden|month|number|password|range|search|tel|text|time|url|week)$/i, bJ = /^(?:about|app|app\-storage|.+\-extension|file|res|widget):$/, bK = /^(?:GET|HEAD)$/, bL = /^\/\//, bM = /\?/, bN = /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, bO = /^(?:select|textarea)/i, bP = /\s+/, bQ = /([?&])_=[^&]*/, bR = /^([\w\+\.\-]+:)(?:\/\/([^\/?#:]*)(?::(\d+))?)?/, bS = f.fn.load, bT = {}, bU = {}, bV, bW, bX = [ "*/" ] + [ "*" ];
    try {
        bV = e.href;
    } catch (bY) {
        bV = c.createElement("a"), bV.href = "", bV = bV.href;
    }
    bW = bR.exec(bV.toLowerCase()) || [], f.fn.extend({
        load: function(a, c, d) {
            if (typeof a != "string" && bS) return bS.apply(this, arguments);
            if (!this.length) return this;
            var e = a.indexOf(" ");
            if (e >= 0) {
                var g = a.slice(e, a.length);
                a = a.slice(0, e);
            }
            var h = "GET";
            c && (f.isFunction(c) ? (d = c, c = b) : typeof c == "object" && (c = f.param(c, f.ajaxSettings.traditional), h = "POST"));
            var i = this;
            return f.ajax({
                url: a,
                type: h,
                dataType: "html",
                data: c,
                complete: function(a, b, c) {
                    c = a.responseText, a.isResolved() && (a.done(function(a) {
                        c = a;
                    }), i.html(g ? f("<div>").append(c.replace(bN, "")).find(g) : c)), d && i.each(d, [ c, b, a ]);
                }
            }), this;
        },
        serialize: function() {
            return f.param(this.serializeArray());
        },
        serializeArray: function() {
            return this.map(function() {
                return this.elements ? f.makeArray(this.elements) : this;
            }).filter(function() {
                return this.name && !this.disabled && (this.checked || bO.test(this.nodeName) || bI.test(this.type));
            }).map(function(a, b) {
                var c = f(this).val();
                return c == null ? null : f.isArray(c) ? f.map(c, function(a, c) {
                    return {
                        name: b.name,
                        value: a.replace(bF, "\r\n")
                    };
                }) : {
                    name: b.name,
                    value: c.replace(bF, "\r\n")
                };
            }).get();
        }
    }), f.each("ajaxStart ajaxStop ajaxComplete ajaxError ajaxSuccess ajaxSend".split(" "), function(a, b) {
        f.fn[b] = function(a) {
            return this.on(b, a);
        };
    }), f.each([ "get", "post" ], function(a, c) {
        f[c] = function(a, d, e, g) {
            return f.isFunction(d) && (g = g || e, e = d, d = b), f.ajax({
                type: c,
                url: a,
                data: d,
                success: e,
                dataType: g
            });
        };
    }), f.extend({
        getScript: function(a, c) {
            return f.get(a, b, c, "script");
        },
        getJSON: function(a, b, c) {
            return f.get(a, b, c, "json");
        },
        ajaxSetup: function(a, b) {
            return b ? b_(a, f.ajaxSettings) : (b = a, a = f.ajaxSettings), b_(a, b), a;
        },
        ajaxSettings: {
            url: bV,
            isLocal: bJ.test(bW[1]),
            global: !0,
            type: "GET",
            contentType: "application/x-www-form-urlencoded",
            processData: !0,
            async: !0,
            accepts: {
                xml: "application/xml, text/xml",
                html: "text/html",
                text: "text/plain",
                json: "application/json, text/javascript",
                "*": bX
            },
            contents: {
                xml: /xml/,
                html: /html/,
                json: /json/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText"
            },
            converters: {
                "* text": a.String,
                "text html": !0,
                "text json": f.parseJSON,
                "text xml": f.parseXML
            },
            flatOptions: {
                context: !0,
                url: !0
            }
        },
        ajaxPrefilter: bZ(bT),
        ajaxTransport: bZ(bU),
        ajax: function(a, c) {
            function w(a, c, l, m) {
                if (s === 2) return;
                s = 2, q && clearTimeout(q), p = b, n = m || "", v.readyState = a > 0 ? 4 : 0;
                var o, r, u, w = c, x = l ? cb(d, v, l) : b, y, z;
                if (a >= 200 && a < 300 || a === 304) {
                    if (d.ifModified) {
                        if (y = v.getResponseHeader("Last-Modified")) f.lastModified[k] = y;
                        if (z = v.getResponseHeader("Etag")) f.etag[k] = z;
                    }
                    if (a === 304) w = "notmodified", o = !0; else try {
                        r = cc(d, x), w = "success", o = !0;
                    } catch (A) {
                        w = "parsererror", u = A;
                    }
                } else {
                    u = w;
                    if (!w || a) w = "error", a < 0 && (a = 0);
                }
                v.status = a, v.statusText = "" + (c || w), o ? h.resolveWith(e, [ r, w, v ]) : h.rejectWith(e, [ v, w, u ]), v.statusCode(j), j = b, t && g.trigger("ajax" + (o ? "Success" : "Error"), [ v, d, o ? r : u ]), i.fireWith(e, [ v, w ]), t && (g.trigger("ajaxComplete", [ v, d ]), --f.active || f.event.trigger("ajaxStop"));
            }
            typeof a == "object" && (c = a, a = b), c = c || {};
            var d = f.ajaxSetup({}, c), e = d.context || d, g = e !== d && (e.nodeType || e instanceof f) ? f(e) : f.event, h = f.Deferred(), i = f.Callbacks("once memory"), j = d.statusCode || {}, k, l = {}, m = {}, n, o, p, q, r, s = 0, t, u, v = {
                readyState: 0,
                setRequestHeader: function(a, b) {
                    if (!s) {
                        var c = a.toLowerCase();
                        a = m[c] = m[c] || a, l[a] = b;
                    }
                    return this;
                },
                getAllResponseHeaders: function() {
                    return s === 2 ? n : null;
                },
                getResponseHeader: function(a) {
                    var c;
                    if (s === 2) {
                        if (!o) {
                            o = {};
                            while (c = bH.exec(n)) o[c[1].toLowerCase()] = c[2];
                        }
                        c = o[a.toLowerCase()];
                    }
                    return c === b ? null : c;
                },
                overrideMimeType: function(a) {
                    return s || (d.mimeType = a), this;
                },
                abort: function(a) {
                    return a = a || "abort", p && p.abort(a), w(0, a), this;
                }
            };
            h.promise(v), v.success = v.done, v.error = v.fail, v.complete = i.add, v.statusCode = function(a) {
                if (a) {
                    var b;
                    if (s < 2) for (b in a) j[b] = [ j[b], a[b] ]; else b = a[v.status], v.then(b, b);
                }
                return this;
            }, d.url = ((a || d.url) + "").replace(bG, "").replace(bL, bW[1] + "//"), d.dataTypes = f.trim(d.dataType || "*").toLowerCase().split(bP), d.crossDomain == null && (r = bR.exec(d.url.toLowerCase()), d.crossDomain = !(!r || r[1] == bW[1] && r[2] == bW[2] && (r[3] || (r[1] === "http:" ? 80 : 443)) == (bW[3] || (bW[1] === "http:" ? 80 : 443)))), d.data && d.processData && typeof d.data != "string" && (d.data = f.param(d.data, d.traditional)), b$(bT, d, c, v);
            if (s === 2) return !1;
            t = d.global, d.type = d.type.toUpperCase(), d.hasContent = !bK.test(d.type), t && f.active++ === 0 && f.event.trigger("ajaxStart");
            if (!d.hasContent) {
                d.data && (d.url += (bM.test(d.url) ? "&" : "?") + d.data, delete d.data), k = d.url;
                if (d.cache === !1) {
                    var x = f.now(), y = d.url.replace(bQ, "$1_=" + x);
                    d.url = y + (y === d.url ? (bM.test(d.url) ? "&" : "?") + "_=" + x : "");
                }
            }
            (d.data && d.hasContent && d.contentType !== !1 || c.contentType) && v.setRequestHeader("Content-Type", d.contentType), d.ifModified && (k = k || d.url, f.lastModified[k] && v.setRequestHeader("If-Modified-Since", f.lastModified[k]), f.etag[k] && v.setRequestHeader("If-None-Match", f.etag[k])), v.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + (d.dataTypes[0] !== "*" ? ", " + bX + "; q=0.01" : "") : d.accepts["*"]);
            for (u in d.headers) v.setRequestHeader(u, d.headers[u]);
            if (!d.beforeSend || d.beforeSend.call(e, v, d) !== !1 && s !== 2) {
                for (u in {
                    success: 1,
                    error: 1,
                    complete: 1
                }) v[u](d[u]);
                p = b$(bU, d, c, v);
                if (!p) w(-1, "No Transport"); else {
                    v.readyState = 1, t && g.trigger("ajaxSend", [ v, d ]), d.async && d.timeout > 0 && (q = setTimeout(function() {
                        v.abort("timeout");
                    }, d.timeout));
                    try {
                        s = 1, p.send(l, w);
                    } catch (z) {
                        if (s < 2) w(-1, z); else throw z;
                    }
                }
                return v;
            }
            return v.abort(), !1;
        },
        param: function(a, c) {
            var d = [], e = function(a, b) {
                b = f.isFunction(b) ? b() : b, d[d.length] = encodeURIComponent(a) + "=" + encodeURIComponent(b);
            };
            c === b && (c = f.ajaxSettings.traditional);
            if (f.isArray(a) || a.jquery && !f.isPlainObject(a)) f.each(a, function() {
                e(this.name, this.value);
            }); else for (var g in a) ca(g, a[g], c, e);
            return d.join("&").replace(bD, "+");
        }
    }), f.extend({
        active: 0,
        lastModified: {},
        etag: {}
    });
    var cd = f.now(), ce = /(\=)\?(&|$)|\?\?/i;
    f.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function() {
            return f.expando + "_" + cd++;
        }
    }), f.ajaxPrefilter("json jsonp", function(b, c, d) {
        var e = b.contentType === "application/x-www-form-urlencoded" && typeof b.data == "string";
        if (b.dataTypes[0] === "jsonp" || b.jsonp !== !1 && (ce.test(b.url) || e && ce.test(b.data))) {
            var g, h = b.jsonpCallback = f.isFunction(b.jsonpCallback) ? b.jsonpCallback() : b.jsonpCallback, i = a[h], j = b.url, k = b.data, l = "$1" + h + "$2";
            return b.jsonp !== !1 && (j = j.replace(ce, l), b.url === j && (e && (k = k.replace(ce, l)), b.data === k && (j += (/\?/.test(j) ? "&" : "?") + b.jsonp + "=" + h))), b.url = j, b.data = k, a[h] = function(a) {
                g = [ a ];
            }, d.always(function() {
                a[h] = i, g && f.isFunction(i) && a[h](g[0]);
            }), b.converters["script json"] = function() {
                return g || f.error(h + " was not called"), g[0];
            }, b.dataTypes[0] = "json", "script";
        }
    }), f.ajaxSetup({
        accepts: {
            script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        },
        contents: {
            script: /javascript|ecmascript/
        },
        converters: {
            "text script": function(a) {
                return f.globalEval(a), a;
            }
        }
    }), f.ajaxPrefilter("script", function(a) {
        a.cache === b && (a.cache = !1), a.crossDomain && (a.type = "GET", a.global = !1);
    }), f.ajaxTransport("script", function(a) {
        if (a.crossDomain) {
            var d, e = c.head || c.getElementsByTagName("head")[0] || c.documentElement;
            return {
                send: function(f, g) {
                    d = c.createElement("script"), d.async = "async", a.scriptCharset && (d.charset = a.scriptCharset), d.src = a.url, d.onload = d.onreadystatechange = function(a, c) {
                        if (c || !d.readyState || /loaded|complete/.test(d.readyState)) d.onload = d.onreadystatechange = null, e && d.parentNode && e.removeChild(d), d = b, c || g(200, "success");
                    }, e.insertBefore(d, e.firstChild);
                },
                abort: function() {
                    d && d.onload(0, 1);
                }
            };
        }
    });
    var cf = a.ActiveXObject ? function() {
        for (var a in ch) ch[a](0, 1);
    } : !1, cg = 0, ch;
    f.ajaxSettings.xhr = a.ActiveXObject ? function() {
        return !this.isLocal && ci() || cj();
    } : ci, function(a) {
        f.extend(f.support, {
            ajax: !!a,
            cors: !!a && "withCredentials" in a
        });
    }(f.ajaxSettings.xhr()), f.support.ajax && f.ajaxTransport(function(c) {
        if (!c.crossDomain || f.support.cors) {
            var d;
            return {
                send: function(e, g) {
                    var h = c.xhr(), i, j;
                    c.username ? h.open(c.type, c.url, c.async, c.username, c.password) : h.open(c.type, c.url, c.async);
                    if (c.xhrFields) for (j in c.xhrFields) h[j] = c.xhrFields[j];
                    c.mimeType && h.overrideMimeType && h.overrideMimeType(c.mimeType), !c.crossDomain && !e["X-Requested-With"] && (e["X-Requested-With"] = "XMLHttpRequest");
                    try {
                        for (j in e) h.setRequestHeader(j, e[j]);
                    } catch (k) {}
                    h.send(c.hasContent && c.data || null), d = function(a, e) {
                        var j, k, l, m, n;
                        try {
                            if (d && (e || h.readyState === 4)) {
                                d = b, i && (h.onreadystatechange = f.noop, cf && delete ch[i]);
                                if (e) h.readyState !== 4 && h.abort(); else {
                                    j = h.status, l = h.getAllResponseHeaders(), m = {}, n = h.responseXML, n && n.documentElement && (m.xml = n), m.text = h.responseText;
                                    try {
                                        k = h.statusText;
                                    } catch (o) {
                                        k = "";
                                    }
                                    !j && c.isLocal && !c.crossDomain ? j = m.text ? 200 : 404 : j === 1223 && (j = 204);
                                }
                            }
                        } catch (p) {
                            e || g(-1, p);
                        }
                        m && g(j, k, m, l);
                    }, !c.async || h.readyState === 4 ? d() : (i = ++cg, cf && (ch || (ch = {}, f(a).unload(cf)), ch[i] = d), h.onreadystatechange = d);
                },
                abort: function() {
                    d && d(0, 1);
                }
            };
        }
    });
    var ck = {}, cl, cm, cn = /^(?:toggle|show|hide)$/, co = /^([+\-]=)?([\d+.\-]+)([a-z%]*)$/i, cp, cq = [ [ "height", "marginTop", "marginBottom", "paddingTop", "paddingBottom" ], [ "width", "marginLeft", "marginRight", "paddingLeft", "paddingRight" ], [ "opacity" ] ], cr;
    f.fn.extend({
        show: function(a, b, c) {
            var d, e;
            if (a || a === 0) return this.animate(cu("show", 3), a, b, c);
            for (var g = 0, h = this.length; g < h; g++) d = this[g], d.style && (e = d.style.display, !f._data(d, "olddisplay") && e === "none" && (e = d.style.display = ""), e === "" && f.css(d, "display") === "none" && f._data(d, "olddisplay", cv(d.nodeName)));
            for (g = 0; g < h; g++) {
                d = this[g];
                if (d.style) {
                    e = d.style.display;
                    if (e === "" || e === "none") d.style.display = f._data(d, "olddisplay") || "";
                }
            }
            return this;
        },
        hide: function(a, b, c) {
            if (a || a === 0) return this.animate(cu("hide", 3), a, b, c);
            var d, e, g = 0, h = this.length;
            for (; g < h; g++) d = this[g], d.style && (e = f.css(d, "display"), e !== "none" && !f._data(d, "olddisplay") && f._data(d, "olddisplay", e));
            for (g = 0; g < h; g++) this[g].style && (this[g].style.display = "none");
            return this;
        },
        _toggle: f.fn.toggle,
        toggle: function(a, b, c) {
            var d = typeof a == "boolean";
            return f.isFunction(a) && f.isFunction(b) ? this._toggle.apply(this, arguments) : a == null || d ? this.each(function() {
                var b = d ? a : f(this).is(":hidden");
                f(this)[b ? "show" : "hide"]();
            }) : this.animate(cu("toggle", 3), a, b, c), this;
        },
        fadeTo: function(a, b, c, d) {
            return this.filter(":hidden").css("opacity", 0).show().end().animate({
                opacity: b
            }, a, c, d);
        },
        animate: function(a, b, c, d) {
            function g() {
                e.queue === !1 && f._mark(this);
                var b = f.extend({}, e), c = this.nodeType === 1, d = c && f(this).is(":hidden"), g, h, i, j, k, l, m, n, o;
                b.animatedProperties = {};
                for (i in a) {
                    g = f.camelCase(i), i !== g && (a[g] = a[i], delete a[i]), h = a[g], f.isArray(h) ? (b.animatedProperties[g] = h[1], h = a[g] = h[0]) : b.animatedProperties[g] = b.specialEasing && b.specialEasing[g] || b.easing || "swing";
                    if (h === "hide" && d || h === "show" && !d) return b.complete.call(this);
                    c && (g === "height" || g === "width") && (b.overflow = [ this.style.overflow, this.style.overflowX, this.style.overflowY ], f.css(this, "display") === "inline" && f.css(this, "float") === "none" && (!f.support.inlineBlockNeedsLayout || cv(this.nodeName) === "inline" ? this.style.display = "inline-block" : this.style.zoom = 1));
                }
                b.overflow != null && (this.style.overflow = "hidden");
                for (i in a) j = new f.fx(this, b, i), h = a[i], cn.test(h) ? (o = f._data(this, "toggle" + i) || (h === "toggle" ? d ? "show" : "hide" : 0), o ? (f._data(this, "toggle" + i, o === "show" ? "hide" : "show"), j[o]()) : j[h]()) : (k = co.exec(h), l = j.cur(), k ? (m = parseFloat(k[2]), n = k[3] || (f.cssNumber[i] ? "" : "px"), n !== "px" && (f.style(this, i, (m || 1) + n), l = (m || 1) / j.cur() * l, f.style(this, i, l + n)), k[1] && (m = (k[1] === "-=" ? -1 : 1) * m + l), j.custom(l, m, n)) : j.custom(l, h, ""));
                return !0;
            }
            var e = f.speed(b, c, d);
            return f.isEmptyObject(a) ? this.each(e.complete, [ !1 ]) : (a = f.extend({}, a), e.queue === !1 ? this.each(g) : this.queue(e.queue, g));
        },
        stop: function(a, c, d) {
            return typeof a != "string" && (d = c, c = a, a = b), c && a !== !1 && this.queue(a || "fx", []), this.each(function() {
                function h(a, b, c) {
                    var e = b[c];
                    f.removeData(a, c, !0), e.stop(d);
                }
                var b, c = !1, e = f.timers, g = f._data(this);
                d || f._unmark(!0, this);
                if (a == null) for (b in g) g[b] && g[b].stop && b.indexOf(".run") === b.length - 4 && h(this, g, b); else g[b = a + ".run"] && g[b].stop && h(this, g, b);
                for (b = e.length; b--; ) e[b].elem === this && (a == null || e[b].queue === a) && (d ? e[b](!0) : e[b].saveState(), c = !0, e.splice(b, 1));
                (!d || !c) && f.dequeue(this, a);
            });
        }
    }), f.each({
        slideDown: cu("show", 1),
        slideUp: cu("hide", 1),
        slideToggle: cu("toggle", 1),
        fadeIn: {
            opacity: "show"
        },
        fadeOut: {
            opacity: "hide"
        },
        fadeToggle: {
            opacity: "toggle"
        }
    }, function(a, b) {
        f.fn[a] = function(a, c, d) {
            return this.animate(b, a, c, d);
        };
    }), f.extend({
        speed: function(a, b, c) {
            var d = a && typeof a == "object" ? f.extend({}, a) : {
                complete: c || !c && b || f.isFunction(a) && a,
                duration: a,
                easing: c && b || b && !f.isFunction(b) && b
            };
            d.duration = f.fx.off ? 0 : typeof d.duration == "number" ? d.duration : d.duration in f.fx.speeds ? f.fx.speeds[d.duration] : f.fx.speeds._default;
            if (d.queue == null || d.queue === !0) d.queue = "fx";
            return d.old = d.complete, d.complete = function(a) {
                f.isFunction(d.old) && d.old.call(this), d.queue ? f.dequeue(this, d.queue) : a !== !1 && f._unmark(this);
            }, d;
        },
        easing: {
            linear: function(a, b, c, d) {
                return c + d * a;
            },
            swing: function(a, b, c, d) {
                return (-Math.cos(a * Math.PI) / 2 + .5) * d + c;
            }
        },
        timers: [],
        fx: function(a, b, c) {
            this.options = b, this.elem = a, this.prop = c, b.orig = b.orig || {};
        }
    }), f.fx.prototype = {
        update: function() {
            this.options.step && this.options.step.call(this.elem, this.now, this), (f.fx.step[this.prop] || f.fx.step._default)(this);
        },
        cur: function() {
            if (this.elem[this.prop] == null || !!this.elem.style && this.elem.style[this.prop] != null) {
                var a, b = f.css(this.elem, this.prop);
                return isNaN(a = parseFloat(b)) ? !b || b === "auto" ? 0 : b : a;
            }
            return this.elem[this.prop];
        },
        custom: function(a, c, d) {
            function h(a) {
                return e.step(a);
            }
            var e = this, g = f.fx;
            this.startTime = cr || cs(), this.end = c, this.now = this.start = a, this.pos = this.state = 0, this.unit = d || this.unit || (f.cssNumber[this.prop] ? "" : "px"), h.queue = this.options.queue, h.elem = this.elem, h.saveState = function() {
                e.options.hide && f._data(e.elem, "fxshow" + e.prop) === b && f._data(e.elem, "fxshow" + e.prop, e.start);
            }, h() && f.timers.push(h) && !cp && (cp = setInterval(g.tick, g.interval));
        },
        show: function() {
            var a = f._data(this.elem, "fxshow" + this.prop);
            this.options.orig[this.prop] = a || f.style(this.elem, this.prop), this.options.show = !0, a !== b ? this.custom(this.cur(), a) : this.custom(this.prop === "width" || this.prop === "height" ? 1 : 0, this.cur()), f(this.elem).show();
        },
        hide: function() {
            this.options.orig[this.prop] = f._data(this.elem, "fxshow" + this.prop) || f.style(this.elem, this.prop), this.options.hide = !0, this.custom(this.cur(), 0);
        },
        step: function(a) {
            var b, c, d, e = cr || cs(), g = !0, h = this.elem, i = this.options;
            if (a || e >= i.duration + this.startTime) {
                this.now = this.end, this.pos = this.state = 1, this.update(), i.animatedProperties[this.prop] = !0;
                for (b in i.animatedProperties) i.animatedProperties[b] !== !0 && (g = !1);
                if (g) {
                    i.overflow != null && !f.support.shrinkWrapBlocks && f.each([ "", "X", "Y" ], function(a, b) {
                        h.style["overflow" + b] = i.overflow[a];
                    }), i.hide && f(h).hide();
                    if (i.hide || i.show) for (b in i.animatedProperties) f.style(h, b, i.orig[b]), f.removeData(h, "fxshow" + b, !0), f.removeData(h, "toggle" + b, !0);
                    d = i.complete, d && (i.complete = !1, d.call(h));
                }
                return !1;
            }
            return i.duration == Infinity ? this.now = e : (c = e - this.startTime, this.state = c / i.duration, this.pos = f.easing[i.animatedProperties[this.prop]](this.state, c, 0, 1, i.duration), this.now = this.start + (this.end - this.start) * this.pos), this.update(), !0;
        }
    }, f.extend(f.fx, {
        tick: function() {
            var a, b = f.timers, c = 0;
            for (; c < b.length; c++) a = b[c], !a() && b[c] === a && b.splice(c--, 1);
            b.length || f.fx.stop();
        },
        interval: 13,
        stop: function() {
            clearInterval(cp), cp = null;
        },
        speeds: {
            slow: 600,
            fast: 200,
            _default: 400
        },
        step: {
            opacity: function(a) {
                f.style(a.elem, "opacity", a.now);
            },
            _default: function(a) {
                a.elem.style && a.elem.style[a.prop] != null ? a.elem.style[a.prop] = a.now + a.unit : a.elem[a.prop] = a.now;
            }
        }
    }), f.each([ "width", "height" ], function(a, b) {
        f.fx.step[b] = function(a) {
            f.style(a.elem, b, Math.max(0, a.now) + a.unit);
        };
    }), f.expr && f.expr.filters && (f.expr.filters.animated = function(a) {
        return f.grep(f.timers, function(b) {
            return a === b.elem;
        }).length;
    });
    var cw = /^t(?:able|d|h)$/i, cx = /^(?:body|html)$/i;
    "getBoundingClientRect" in c.documentElement ? f.fn.offset = function(a) {
        var b = this[0], c;
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b);
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        try {
            c = b.getBoundingClientRect();
        } catch (d) {}
        var e = b.ownerDocument, g = e.documentElement;
        if (!c || !f.contains(g, b)) return c ? {
            top: c.top,
            left: c.left
        } : {
            top: 0,
            left: 0
        };
        var h = e.body, i = cy(e), j = g.clientTop || h.clientTop || 0, k = g.clientLeft || h.clientLeft || 0, l = i.pageYOffset || f.support.boxModel && g.scrollTop || h.scrollTop, m = i.pageXOffset || f.support.boxModel && g.scrollLeft || h.scrollLeft, n = c.top + l - j, o = c.left + m - k;
        return {
            top: n,
            left: o
        };
    } : f.fn.offset = function(a) {
        var b = this[0];
        if (a) return this.each(function(b) {
            f.offset.setOffset(this, a, b);
        });
        if (!b || !b.ownerDocument) return null;
        if (b === b.ownerDocument.body) return f.offset.bodyOffset(b);
        var c, d = b.offsetParent, e = b, g = b.ownerDocument, h = g.documentElement, i = g.body, j = g.defaultView, k = j ? j.getComputedStyle(b, null) : b.currentStyle, l = b.offsetTop, m = b.offsetLeft;
        while ((b = b.parentNode) && b !== i && b !== h) {
            if (f.support.fixedPosition && k.position === "fixed") break;
            c = j ? j.getComputedStyle(b, null) : b.currentStyle, l -= b.scrollTop, m -= b.scrollLeft, b === d && (l += b.offsetTop, m += b.offsetLeft, f.support.doesNotAddBorder && (!f.support.doesAddBorderForTableAndCells || !cw.test(b.nodeName)) && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), e = d, d = b.offsetParent), f.support.subtractsBorderForOverflowNotVisible && c.overflow !== "visible" && (l += parseFloat(c.borderTopWidth) || 0, m += parseFloat(c.borderLeftWidth) || 0), k = c;
        }
        if (k.position === "relative" || k.position === "static") l += i.offsetTop, m += i.offsetLeft;
        return f.support.fixedPosition && k.position === "fixed" && (l += Math.max(h.scrollTop, i.scrollTop), m += Math.max(h.scrollLeft, i.scrollLeft)), {
            top: l,
            left: m
        };
    }, f.offset = {
        bodyOffset: function(a) {
            var b = a.offsetTop, c = a.offsetLeft;
            return f.support.doesNotIncludeMarginInBodyOffset && (b += parseFloat(f.css(a, "marginTop")) || 0, c += parseFloat(f.css(a, "marginLeft")) || 0), {
                top: b,
                left: c
            };
        },
        setOffset: function(a, b, c) {
            var d = f.css(a, "position");
            d === "static" && (a.style.position = "relative");
            var e = f(a), g = e.offset(), h = f.css(a, "top"), i = f.css(a, "left"), j = (d === "absolute" || d === "fixed") && f.inArray("auto", [ h, i ]) > -1, k = {}, l = {}, m, n;
            j ? (l = e.position(), m = l.top, n = l.left) : (m = parseFloat(h) || 0, n = parseFloat(i) || 0), f.isFunction(b) && (b = b.call(a, c, g)), b.top != null && (k.top = b.top - g.top + m), b.left != null && (k.left = b.left - g.left + n), "using" in b ? b.using.call(a, k) : e.css(k);
        }
    }, f.fn.extend({
        position: function() {
            if (!this[0]) return null;
            var a = this[0], b = this.offsetParent(), c = this.offset(), d = cx.test(b[0].nodeName) ? {
                top: 0,
                left: 0
            } : b.offset();
            return c.top -= parseFloat(f.css(a, "marginTop")) || 0, c.left -= parseFloat(f.css(a, "marginLeft")) || 0, d.top += parseFloat(f.css(b[0], "borderTopWidth")) || 0, d.left += parseFloat(f.css(b[0], "borderLeftWidth")) || 0, {
                top: c.top - d.top,
                left: c.left - d.left
            };
        },
        offsetParent: function() {
            return this.map(function() {
                var a = this.offsetParent || c.body;
                while (a && !cx.test(a.nodeName) && f.css(a, "position") === "static") a = a.offsetParent;
                return a;
            });
        }
    }), f.each([ "Left", "Top" ], function(a, c) {
        var d = "scroll" + c;
        f.fn[d] = function(c) {
            var e, g;
            return c === b ? (e = this[0], e ? (g = cy(e), g ? "pageXOffset" in g ? g[a ? "pageYOffset" : "pageXOffset"] : f.support.boxModel && g.document.documentElement[d] || g.document.body[d] : e[d]) : null) : this.each(function() {
                g = cy(this), g ? g.scrollTo(a ? f(g).scrollLeft() : c, a ? c : f(g).scrollTop()) : this[d] = c;
            });
        };
    }), f.each([ "Height", "Width" ], function(a, c) {
        var d = c.toLowerCase();
        f.fn["inner" + c] = function() {
            var a = this[0];
            return a ? a.style ? parseFloat(f.css(a, d, "padding")) : this[d]() : null;
        }, f.fn["outer" + c] = function(a) {
            var b = this[0];
            return b ? b.style ? parseFloat(f.css(b, d, a ? "margin" : "border")) : this[d]() : null;
        }, f.fn[d] = function(a) {
            var e = this[0];
            if (!e) return a == null ? null : this;
            if (f.isFunction(a)) return this.each(function(b) {
                var c = f(this);
                c[d](a.call(this, b, c[d]()));
            });
            if (f.isWindow(e)) {
                var g = e.document.documentElement["client" + c], h = e.document.body;
                return e.document.compatMode === "CSS1Compat" && g || h && h["client" + c] || g;
            }
            if (e.nodeType === 9) return Math.max(e.documentElement["client" + c], e.body["scroll" + c], e.documentElement["scroll" + c], e.body["offset" + c], e.documentElement["offset" + c]);
            if (a === b) {
                var i = f.css(e, d), j = parseFloat(i);
                return f.isNumeric(j) ? j : i;
            }
            return this.css(d, typeof a == "string" ? a : a + "px");
        };
    }), a.jQuery = a.$ = f, typeof define == "function" && define.amd && define.amd.jQuery && define("jquery", [], function() {
        return f;
    });
}(window), define("libs/jquery/jquery", function() {}), function() {
    jLayout = typeof jLayout == "undefined" ? {} : jLayout, jLayout.border = function(a) {
        function i(a) {
            return function(c) {
                var i = c.insets(), j = 0, k = 0, l;
                return d && d.isVisible() && (l = d[a + "Size"](), j += l.width + b.hgap, k = l.height), e && e.isVisible() && (l = e[a + "Size"](), j += l.width + b.hgap, k = Math.max(l.height, k)), h && h.isVisible() && (l = h[a + "Size"](), j += l.width, k = Math.max(l.height, k)), f && f.isVisible() && (l = f[a + "Size"](), j = Math.max(l.width, j), k += l.height + b.vgap), g && g.isVisible() && (l = g[a + "Size"](), j = Math.max(l.width, j), k += l.height + b.vgap), {
                    width: j + i.left + i.right,
                    height: k + i.top + i.bottom
                };
            };
        }
        var b = {}, c = {}, d = a.east, e = a.west, f = a.north, g = a.south, h = a.center;
        return b.hgap = a.hgap || 0, b.vgap = a.vgap || 0, c.items = function() {
            var a = [];
            return d && a.push(d), e && a.push(e), f && a.push(f), g && a.push(g), h && a.push(h), a;
        }, c.layout = function(a) {
            var c = a.bounds(), i = a.insets(), j = i.top, k = c.height - i.bottom, l = i.left, m = c.width - i.right, n;
            return f && f.isVisible() && (n = f.preferredSize(), f.bounds({
                x: l,
                y: j,
                width: m - l,
                height: n.height
            }), f.doLayout(), j += n.height + b.vgap), g && g.isVisible() && (n = g.preferredSize(), g.bounds({
                x: l,
                y: k - n.height,
                width: m - l,
                height: n.height
            }), g.doLayout(), k -= n.height + b.vgap), d && d.isVisible() && (n = d.preferredSize(), d.bounds({
                x: m - n.width,
                y: j,
                width: n.width,
                height: k - j
            }), d.doLayout(), m -= n.width + b.hgap), e && e.isVisible() && (n = e.preferredSize(), e.bounds({
                x: l,
                y: j,
                width: n.width,
                height: k - j
            }), e.doLayout(), l += n.width + b.hgap), h && h.isVisible() && (h.bounds({
                x: l,
                y: j,
                width: m - l,
                height: k - j
            }), h.doLayout()), a;
        }, c.preferred = i("preferred"), c.minimum = i("minimum"), c.maximum = i("maximum"), c;
    };
}(), define("libs/jquery/jlayout.border", function() {}), jQuery && jLayout && function(a) {
    function b(b, c) {
        var d = {};
        return a.each([ "min", "max" ], function(a, c) {
            d[c + "imumSize"] = function(a) {
                var e = b.data("jlayout");
                return e ? e[c + "imum"](d) : b[c + "Size"](a);
            };
        }), a.extend(d, {
            doLayout: function() {
                var a = b.data("jlayout");
                a && a.layout(d), b.css({
                    position: "absolute"
                });
            },
            isVisible: function() {
                return b.isVisible();
            },
            insets: function() {
                var a = b.padding(), c = b.border();
                return {
                    top: a.top,
                    bottom: a.bottom + c.bottom + c.top,
                    left: a.left,
                    right: a.right + c.right + c.left
                };
            },
            bounds: function(a) {
                var c = {};
                return a ? (typeof a.x == "number" && (c.left = a.x), typeof a.y == "number" && (c.top = a.y), typeof a.width == "number" && (c.width = a.width - (b.outerWidth(!0) - b.width()), c.width = c.width >= 0 ? c.width : 0), typeof a.height == "number" && (c.height = a.height - (b.outerHeight(!0) - b.height()), c.height = c.height >= 0 ? c.height : 0), b.css(c), b) : (c = b.position(), {
                    x: c.left,
                    y: c.top,
                    width: b.outerWidth(!1),
                    height: b.outerHeight(!1)
                });
            },
            preferredSize: function() {
                var a, e, f = b.margin(), g = {
                    width: 0,
                    height: 0
                }, h = b.data("jlayout");
                if (h && c) {
                    g = h.preferred(d), a = d.minimumSize(), e = d.maximumSize(), g.width += f.left + f.right, g.height += f.top + f.bottom;
                    if (g.width < a.width || g.height < a.height) g.width = Math.max(g.width, a.width), g.height = Math.max(g.height, a.height); else if (g.width > e.width || g.height > e.height) g.width = Math.min(g.width, e.width), g.height = Math.min(g.height, e.height);
                } else g = d.bounds(), g.width += f.left + f.right, g.height += f.top + f.bottom;
                return g;
            }
        }), d;
    }
    a.fn.layout = function(c) {
        var d = a.extend({}, a.fn.layout.defaults, c);
        return a.each(this, function() {
            var c = a(this), e = a.metadata && c.metadata().layout ? a.extend(d, c.metadata().layout) : d, f = b(c, e.resize);
            e.type === "border" && typeof jLayout.border != "undefined" ? (a.each([ "north", "south", "west", "east", "center" ], function(a, d) {
                c.children().hasClass(d) && (e[d] = b(c.children("." + d + ":first")));
            }), c.data("jlayout", jLayout.border(e))) : e.type === "grid" && typeof jLayout.grid != "undefined" ? (e.items = [], c.children().each(function(c) {
                a(this).hasClass("ui-resizable-handle") || (e.items[c] = b(a(this)));
            }), c.data("jlayout", jLayout.grid(e))) : e.type === "flexGrid" && typeof jLayout.flexGrid != "undefined" ? (e.items = [], c.children().each(function(c) {
                a(this).hasClass("ui-resizable-handle") || (e.items[c] = b(a(this)));
            }), c.data("jlayout", jLayout.flexGrid(e))) : e.type === "column" && typeof jLayout.column != "undefined" ? (e.items = [], c.children().each(function(c) {
                a(this).hasClass("ui-resizable-handle") || (e.items[c] = b(a(this)));
            }), c.data("jlayout", jLayout.column(e))) : e.type === "flow" && typeof jLayout.flow != "undefined" && (e.items = [], c.children().each(function(c) {
                a(this).hasClass("ui-resizable-handle") || (e.items[c] = b(a(this)));
            }), c.data("jlayout", jLayout.flow(e))), e.resize && f.bounds(f.preferredSize()), f.doLayout(), c.css({
                position: "relative"
            }), a.ui !== undefined && c.addClass("ui-widget");
        });
    }, a.fn.layout.defaults = {
        resize: !0,
        type: "grid"
    };
}(jQuery), define("libs/jquery/jquery.jlayout", function() {}), function(a) {
    a.fn.UItoTop = function(b) {
        var c = {
            text: "To Top",
            min: 200,
            inDelay: 600,
            outDelay: 400,
            containerID: "toTop",
            containerHoverID: "toTopHover",
            scrollSpeed: 1200,
            easingType: "linear"
        }, d = a.extend(c, b), e = "#" + d.containerID, f = "#" + d.containerHoverID;
        a("body").append('<a href="#" id="' + d.containerID + '">' + d.text + "</a>"), a(e).hide().click(function() {
            return a("html, body").animate({
                scrollTop: 0
            }, d.scrollSpeed, d.easingType), a("#" + d.containerHoverID, this).stop().animate({
                opacity: 0
            }, d.inDelay, d.easingType), !1;
        }).prepend('<span id="' + d.containerHoverID + '"></span>').hover(function() {
            a(f, this).stop().animate({
                opacity: 1
            }, 600, "linear");
        }, function() {
            a(f, this).stop().animate({
                opacity: 0
            }, 700, "linear");
        }), a(window).scroll(function() {
            var b = a(window).scrollTop();
            typeof document.body.style.maxHeight == "undefined" && a(e).css({
                position: "absolute",
                top: a(window).scrollTop() + a(window).height() - 50
            }), b > d.min ? a(e).fadeIn(d.inDelay) : a(e).fadeOut(d.Outdelay);
        });
    };
}(jQuery), define("libs/jquery/jquery.ui.totop", function() {}), jQuery.extend(jQuery.easing, {
    easeInQuad: function(a, b, c, d, e) {
        return d * (b /= e) * b + c;
    },
    easeOutQuad: function(a, b, c, d, e) {
        return -d * (b /= e) * (b - 2) + c;
    },
    easeInOutQuad: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b + c : -d / 2 * (--b * (b - 2) - 1) + c;
    },
    easeInCubic: function(a, b, c, d, e) {
        return d * (b /= e) * b * b + c;
    },
    easeOutCubic: function(a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b + 1) + c;
    },
    easeInOutCubic: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b + c : d / 2 * ((b -= 2) * b * b + 2) + c;
    },
    easeInQuart: function(a, b, c, d, e) {
        return d * (b /= e) * b * b * b + c;
    },
    easeOutQuart: function(a, b, c, d, e) {
        return -d * ((b = b / e - 1) * b * b * b - 1) + c;
    },
    easeInOutQuart: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b + c : -d / 2 * ((b -= 2) * b * b * b - 2) + c;
    },
    easeInQuint: function(a, b, c, d, e) {
        return d * (b /= e) * b * b * b * b + c;
    },
    easeOutQuint: function(a, b, c, d, e) {
        return d * ((b = b / e - 1) * b * b * b * b + 1) + c;
    },
    easeInOutQuint: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? d / 2 * b * b * b * b * b + c : d / 2 * ((b -= 2) * b * b * b * b + 2) + c;
    },
    easeInSine: function(a, b, c, d, e) {
        return -d * Math.cos(b / e * (Math.PI / 2)) + d + c;
    },
    easeOutSine: function(a, b, c, d, e) {
        return d * Math.sin(b / e * (Math.PI / 2)) + c;
    },
    easeInOutSine: function(a, b, c, d, e) {
        return -d / 2 * (Math.cos(Math.PI * b / e) - 1) + c;
    },
    easeInExpo: function(a, b, c, d, e) {
        return b == 0 ? c : d * Math.pow(2, 10 * (b / e - 1)) + c;
    },
    easeOutExpo: function(a, b, c, d, e) {
        return b == e ? c + d : d * (-Math.pow(2, -10 * b / e) + 1) + c;
    },
    easeInOutExpo: function(a, b, c, d, e) {
        return b == 0 ? c : b == e ? c + d : (b /= e / 2) < 1 ? d / 2 * Math.pow(2, 10 * (b - 1)) + c : d / 2 * (-Math.pow(2, -10 * --b) + 2) + c;
    },
    easeInCirc: function(a, b, c, d, e) {
        return -d * (Math.sqrt(1 - (b /= e) * b) - 1) + c;
    },
    easeOutCirc: function(a, b, c, d, e) {
        return d * Math.sqrt(1 - (b = b / e - 1) * b) + c;
    },
    easeInOutCirc: function(a, b, c, d, e) {
        return (b /= e / 2) < 1 ? -d / 2 * (Math.sqrt(1 - b * b) - 1) + c : d / 2 * (Math.sqrt(1 - (b -= 2) * b) + 1) + c;
    },
    easeInElastic: function(a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (b == 0) return c;
        if ((b /= e) == 1) return c + d;
        g || (g = e * .3);
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4;
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return -(h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g)) + c;
    },
    easeOutElastic: function(a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (b == 0) return c;
        if ((b /= e) == 1) return c + d;
        g || (g = e * .3);
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4;
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return h * Math.pow(2, -10 * b) * Math.sin((b * e - f) * 2 * Math.PI / g) + d + c;
    },
    easeInOutElastic: function(a, b, c, d, e) {
        var f = 1.70158, g = 0, h = d;
        if (b == 0) return c;
        if ((b /= e / 2) == 2) return c + d;
        g || (g = e * .3 * 1.5);
        if (h < Math.abs(d)) {
            h = d;
            var f = g / 4;
        } else var f = g / (2 * Math.PI) * Math.asin(d / h);
        return b < 1 ? -0.5 * h * Math.pow(2, 10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) + c : h * Math.pow(2, -10 * (b -= 1)) * Math.sin((b * e - f) * 2 * Math.PI / g) * .5 + d + c;
    },
    easeInBack: function(a, b, c, d, e, f) {
        return f == undefined && (f = 1.70158), d * (b /= e) * b * ((f + 1) * b - f) + c;
    },
    easeOutBack: function(a, b, c, d, e, f) {
        return f == undefined && (f = 1.70158), d * ((b = b / e - 1) * b * ((f + 1) * b + f) + 1) + c;
    },
    easeInOutBack: function(a, b, c, d, e, f) {
        return f == undefined && (f = 1.70158), (b /= e / 2) < 1 ? d / 2 * b * b * (((f *= 1.525) + 1) * b - f) + c : d / 2 * ((b -= 2) * b * (((f *= 1.525) + 1) * b + f) + 2) + c;
    },
    easeInBounce: function(a, b, c, d, e) {
        return d - jQuery.easing.easeOutBounce(a, e - b, 0, d, e) + c;
    },
    easeOutBounce: function(a, b, c, d, e) {
        return (b /= e) < 1 / 2.75 ? d * 7.5625 * b * b + c : b < 2 / 2.75 ? d * (7.5625 * (b -= 1.5 / 2.75) * b + .75) + c : b < 2.5 / 2.75 ? d * (7.5625 * (b -= 2.25 / 2.75) * b + .9375) + c : d * (7.5625 * (b -= 2.625 / 2.75) * b + .984375) + c;
    },
    easeInOutBounce: function(a, b, c, d, e) {
        return b < e / 2 ? jQuery.easing.easeInBounce(a, b * 2, 0, d, e) * .5 + c : jQuery.easing.easeOutBounce(a, b * 2 - e, 0, d, e) * .5 + d * .5 + c;
    }
}), define("libs/jquery/jquery.easing", function() {}), function(a, b, c) {
    function j(a) {
        return a = a || location.href, "#" + a.replace(/^[^#]*#?(.*)$/, "$1");
    }
    var d = "hashchange", e = document, f, g = a.event.special, h = e.documentMode, i = "on" + d in b && (h === c || h > 7);
    a.fn[d] = function(a) {
        return a ? this.bind(d, a) : this.trigger(d);
    }, a.fn[d].delay = 50, g[d] = a.extend(g[d], {
        setup: function() {
            if (i) return !1;
            a(f.start);
        },
        teardown: function() {
            if (i) return !1;
            a(f.stop);
        }
    }), f = function() {
        function n() {
            var c = j(), e = m(h);
            c !== h ? (l(h = c, e), a(b).trigger(d)) : e !== h && (location.href = location.href.replace(/#.*/, "") + e), g = setTimeout(n, a.fn[d].delay);
        }
        var f = {}, g, h = j(), k = function(a) {
            return a;
        }, l = k, m = k;
        return f.start = function() {
            g || n();
        }, f.stop = function() {
            g && clearTimeout(g), g = c;
        }, a.browser.msie && !i && function() {
            var b, c;
            f.start = function() {
                b || (c = a.fn[d].src, c = c && c + j(), b = a('<iframe tabindex="-1" title="empty"/>').hide().one("load", function() {
                    c || l(j()), n();
                }).attr("src", c || "javascript:0").insertAfter("body")[0].contentWindow, e.onpropertychange = function() {
                    try {
                        event.propertyName === "title" && (b.document.title = e.title);
                    } catch (a) {}
                });
            }, f.stop = k, m = function() {
                return j(b.location.href);
            }, l = function(c, f) {
                var g = b.document, h = a.fn[d].domain;
                c !== f && (g.title = e.title, g.open(), h && g.write('<script>document.domain="' + h + '"</script>'), g.close(), b.location.hash = c);
            };
        }(), f;
    }();
}(jQuery, this), define("libs/jquery/jquery.hashchange.min", function() {}), function(a) {
    a.drillDownMenu = function(b, c) {
        var d = this;
        d.$el = a(b), d.el = b;
        var e = a("> ul:first", d.$el), f = a("> h1:first", d.$el), g = a("#searchform", d.$el);
        d.$el.data("drillDownMenu", d), d.init = function() {
            d.options = a.extend({}, a.drillDownMenu.defaultOptions, c), a(".title", d.$el).html(d.options.title), f.hide(), d._initUl(e), a("ul", e).hide(), a("ul > li", d.$el).removeClass("current"), h = location.hash, h = h.split("/").slice(0, 2).join("/");
            var b = a('ul > li > a[href="' + h + '"]', d.$el).parent().addClass("current").parentsUntil(d.$el, "li"), g;
            b = a.makeArray(b);
            while (g = b.pop()) a(">a", g).click();
            a(".back", d.$el).bind("click.drillDownMenu", a.proxy(function(a) {
                var b = d.$el.data("currentMenu");
                b.length && b.trigger("goback"), a.preventDefault();
            }, d.$el));
        }, d._initUl = function(b) {
            return a("> li:not(:has(ul))", b).click(function() {
                a(" > ul li", d.$el).removeClass("current"), a(this).addClass("current");
            }), a("> li:has(ul)", b).each(function() {
                var b = a(this), c = a("> a:first", b), h = a("> ul:first", b);
                h.css({
                    top: -b.position().top - 1
                }), d._initUl(h), h.bind("goback.drillDownMenu", function(b) {
                    var c = a(this), h = a(this).parent().closest("ul");
                    return h.length && (e.stop(!1, !0).animate({
                        left: "+=100%"
                    }, 300, "easeInOutQuart", function() {
                        c.hide();
                    }), d.$el.data("currentMenu", h), h.hasClass("tlm") && (f.hide(), g.show())), a(".title", d.$el).stop().fadeTo(150, 0, function() {
                        a(".title", d.$el).html(h.length && h[0] != e[0] ? a("> a > span", h.parent()).html() : d.options.title);
                    }).fadeTo(150, 1), b.preventDefault(), !1;
                }), c.bind("click.drillDownMenu", a.proxy(function(b) {
                    var c = a(this).parent().closest("ul"), h = this, i = a("> ul:first", this);
                    i.show(), e.stop(!1, !0).animate({
                        left: "-=100%"
                    }, 300, "easeInOutQuart"), d.$el.data("currentMenu", i), f.is(":hidden") && (f.show(), g.hide()), a(".title", d.$el).stop().fadeTo(150, 0, function() {
                        a(".title", d.$el).html(a("> a > span", h).html());
                    }).fadeTo(150, 1), b.preventDefault();
                }, b));
            }), d;
        }, d.init();
    }, a.drillDownMenu.defaultOptions = {
        title: "Main Menu",
        target: "#main-content",
        pageDownloaded: function(a, b) {}
    }, a.fn.drillDownMenu = function(b) {
        return this.each(function() {
            new a.drillDownMenu(this, b);
        });
    }, a.fn.getdrillDownMenu = function() {
        this.data("drillDownMenu");
    };
}(jQuery), define("libs/jquery/jquery.drilldownmenu", function() {}), function() {
    function A(a, b, c) {
        if (a === b) return a !== 0 || 1 / a == 1 / b;
        if (a == null || b == null) return a === b;
        a._chain && (a = a._wrapped), b._chain && (b = b._wrapped);
        if (a.isEqual && w.isFunction(a.isEqual)) return a.isEqual(b);
        if (b.isEqual && w.isFunction(b.isEqual)) return b.isEqual(a);
        var d = i.call(a);
        if (d != i.call(b)) return !1;
        switch (d) {
          case "[object String]":
            return a == String(b);
          case "[object Number]":
            return a != +a ? b != +b : a == 0 ? 1 / a == 1 / b : a == +b;
          case "[object Date]":
          case "[object Boolean]":
            return +a == +b;
          case "[object RegExp]":
            return a.source == b.source && a.global == b.global && a.multiline == b.multiline && a.ignoreCase == b.ignoreCase;
        }
        if (typeof a != "object" || typeof b != "object") return !1;
        var e = c.length;
        while (e--) if (c[e] == a) return !0;
        c.push(a);
        var f = 0, g = !0;
        if (d == "[object Array]") {
            f = a.length, g = f == b.length;
            if (g) while (f--) if (!(g = f in a == f in b && A(a[f], b[f], c))) break;
        } else {
            if ("constructor" in a != "constructor" in b || a.constructor != b.constructor) return !1;
            for (var h in a) if (w.has(a, h)) {
                f++;
                if (!(g = w.has(b, h) && A(a[h], b[h], c))) break;
            }
            if (g) {
                for (h in b) if (w.has(b, h) && !(f--)) break;
                g = !f;
            }
        }
        return c.pop(), g;
    }
    var a = this, b = a._, c = {}, d = Array.prototype, e = Object.prototype, f = Function.prototype, g = d.slice, h = d.unshift, i = e.toString, j = e.hasOwnProperty, k = d.forEach, l = d.map, m = d.reduce, n = d.reduceRight, o = d.filter, p = d.every, q = d.some, r = d.indexOf, s = d.lastIndexOf, t = Array.isArray, u = Object.keys, v = f.bind, w = function(a) {
        return new I(a);
    };
    typeof exports != "undefined" ? (typeof module != "undefined" && module.exports && (exports = module.exports = w), exports._ = w) : a._ = w, w.VERSION = "1.3.3";
    var x = w.each = w.forEach = function(a, b, d) {
        if (a == null) return;
        if (k && a.forEach === k) a.forEach(b, d); else if (a.length === +a.length) {
            for (var e = 0, f = a.length; e < f; e++) if (e in a && b.call(d, a[e], e, a) === c) return;
        } else for (var g in a) if (w.has(a, g) && b.call(d, a[g], g, a) === c) return;
    };
    w.map = w.collect = function(a, b, c) {
        var d = [];
        return a == null ? d : l && a.map === l ? a.map(b, c) : (x(a, function(a, e, f) {
            d[d.length] = b.call(c, a, e, f);
        }), a.length === +a.length && (d.length = a.length), d);
    }, w.reduce = w.foldl = w.inject = function(a, b, c, d) {
        var e = arguments.length > 2;
        a == null && (a = []);
        if (m && a.reduce === m) return d && (b = w.bind(b, d)), e ? a.reduce(b, c) : a.reduce(b);
        x(a, function(a, f, g) {
            e ? c = b.call(d, c, a, f, g) : (c = a, e = !0);
        });
        if (!e) throw new TypeError("Reduce of empty array with no initial value");
        return c;
    }, w.reduceRight = w.foldr = function(a, b, c, d) {
        var e = arguments.length > 2;
        a == null && (a = []);
        if (n && a.reduceRight === n) return d && (b = w.bind(b, d)), e ? a.reduceRight(b, c) : a.reduceRight(b);
        var f = w.toArray(a).reverse();
        return d && !e && (b = w.bind(b, d)), e ? w.reduce(f, b, c, d) : w.reduce(f, b);
    }, w.find = w.detect = function(a, b, c) {
        var d;
        return y(a, function(a, e, f) {
            if (b.call(c, a, e, f)) return d = a, !0;
        }), d;
    }, w.filter = w.select = function(a, b, c) {
        var d = [];
        return a == null ? d : o && a.filter === o ? a.filter(b, c) : (x(a, function(a, e, f) {
            b.call(c, a, e, f) && (d[d.length] = a);
        }), d);
    }, w.reject = function(a, b, c) {
        var d = [];
        return a == null ? d : (x(a, function(a, e, f) {
            b.call(c, a, e, f) || (d[d.length] = a);
        }), d);
    }, w.every = w.all = function(a, b, d) {
        var e = !0;
        return a == null ? e : p && a.every === p ? a.every(b, d) : (x(a, function(a, f, g) {
            if (!(e = e && b.call(d, a, f, g))) return c;
        }), !!e);
    };
    var y = w.some = w.any = function(a, b, d) {
        b || (b = w.identity);
        var e = !1;
        return a == null ? e : q && a.some === q ? a.some(b, d) : (x(a, function(a, f, g) {
            if (e || (e = b.call(d, a, f, g))) return c;
        }), !!e);
    };
    w.include = w.contains = function(a, b) {
        var c = !1;
        return a == null ? c : r && a.indexOf === r ? a.indexOf(b) != -1 : (c = y(a, function(a) {
            return a === b;
        }), c);
    }, w.invoke = function(a, b) {
        var c = g.call(arguments, 2);
        return w.map(a, function(a) {
            return (w.isFunction(b) ? b || a : a[b]).apply(a, c);
        });
    }, w.pluck = function(a, b) {
        return w.map(a, function(a) {
            return a[b];
        });
    }, w.max = function(a, b, c) {
        if (!b && w.isArray(a) && a[0] === +a[0]) return Math.max.apply(Math, a);
        if (!b && w.isEmpty(a)) return -Infinity;
        var d = {
            computed: -Infinity
        };
        return x(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g >= d.computed && (d = {
                value: a,
                computed: g
            });
        }), d.value;
    }, w.min = function(a, b, c) {
        if (!b && w.isArray(a) && a[0] === +a[0]) return Math.min.apply(Math, a);
        if (!b && w.isEmpty(a)) return Infinity;
        var d = {
            computed: Infinity
        };
        return x(a, function(a, e, f) {
            var g = b ? b.call(c, a, e, f) : a;
            g < d.computed && (d = {
                value: a,
                computed: g
            });
        }), d.value;
    }, w.shuffle = function(a) {
        var b = [], c;
        return x(a, function(a, d, e) {
            c = Math.floor(Math.random() * (d + 1)), b[d] = b[c], b[c] = a;
        }), b;
    }, w.sortBy = function(a, b, c) {
        var d = w.isFunction(b) ? b : function(a) {
            return a[b];
        };
        return w.pluck(w.map(a, function(a, b, e) {
            return {
                value: a,
                criteria: d.call(c, a, b, e)
            };
        }).sort(function(a, b) {
            var c = a.criteria, d = b.criteria;
            return c === void 0 ? 1 : d === void 0 ? -1 : c < d ? -1 : c > d ? 1 : 0;
        }), "value");
    }, w.groupBy = function(a, b) {
        var c = {}, d = w.isFunction(b) ? b : function(a) {
            return a[b];
        };
        return x(a, function(a, b) {
            var e = d(a, b);
            (c[e] || (c[e] = [])).push(a);
        }), c;
    }, w.sortedIndex = function(a, b, c) {
        c || (c = w.identity);
        var d = 0, e = a.length;
        while (d < e) {
            var f = d + e >> 1;
            c(a[f]) < c(b) ? d = f + 1 : e = f;
        }
        return d;
    }, w.toArray = function(a) {
        return a ? w.isArray(a) ? g.call(a) : w.isArguments(a) ? g.call(a) : a.toArray && w.isFunction(a.toArray) ? a.toArray() : w.values(a) : [];
    }, w.size = function(a) {
        return w.isArray(a) ? a.length : w.keys(a).length;
    }, w.first = w.head = w.take = function(a, b, c) {
        return b != null && !c ? g.call(a, 0, b) : a[0];
    }, w.initial = function(a, b, c) {
        return g.call(a, 0, a.length - (b == null || c ? 1 : b));
    }, w.last = function(a, b, c) {
        return b != null && !c ? g.call(a, Math.max(a.length - b, 0)) : a[a.length - 1];
    }, w.rest = w.tail = function(a, b, c) {
        return g.call(a, b == null || c ? 1 : b);
    }, w.compact = function(a) {
        return w.filter(a, function(a) {
            return !!a;
        });
    }, w.flatten = function(a, b) {
        return w.reduce(a, function(a, c) {
            return w.isArray(c) ? a.concat(b ? c : w.flatten(c)) : (a[a.length] = c, a);
        }, []);
    }, w.without = function(a) {
        return w.difference(a, g.call(arguments, 1));
    }, w.uniq = w.unique = function(a, b, c) {
        var d = c ? w.map(a, c) : a, e = [];
        return a.length < 3 && (b = !0), w.reduce(d, function(c, d, f) {
            if (b ? w.last(c) !== d || !c.length : !w.include(c, d)) c.push(d), e.push(a[f]);
            return c;
        }, []), e;
    }, w.union = function() {
        return w.uniq(w.flatten(arguments, !0));
    }, w.intersection = w.intersect = function(a) {
        var b = g.call(arguments, 1);
        return w.filter(w.uniq(a), function(a) {
            return w.every(b, function(b) {
                return w.indexOf(b, a) >= 0;
            });
        });
    }, w.difference = function(a) {
        var b = w.flatten(g.call(arguments, 1), !0);
        return w.filter(a, function(a) {
            return !w.include(b, a);
        });
    }, w.zip = function() {
        var a = g.call(arguments), b = w.max(w.pluck(a, "length")), c = new Array(b);
        for (var d = 0; d < b; d++) c[d] = w.pluck(a, "" + d);
        return c;
    }, w.indexOf = function(a, b, c) {
        if (a == null) return -1;
        var d, e;
        if (c) return d = w.sortedIndex(a, b), a[d] === b ? d : -1;
        if (r && a.indexOf === r) return a.indexOf(b);
        for (d = 0, e = a.length; d < e; d++) if (d in a && a[d] === b) return d;
        return -1;
    }, w.lastIndexOf = function(a, b) {
        if (a == null) return -1;
        if (s && a.lastIndexOf === s) return a.lastIndexOf(b);
        var c = a.length;
        while (c--) if (c in a && a[c] === b) return c;
        return -1;
    }, w.range = function(a, b, c) {
        arguments.length <= 1 && (b = a || 0, a = 0), c = arguments[2] || 1;
        var d = Math.max(Math.ceil((b - a) / c), 0), e = 0, f = new Array(d);
        while (e < d) f[e++] = a, a += c;
        return f;
    };
    var z = function() {};
    w.bind = function(b, c) {
        var d, e;
        if (b.bind === v && v) return v.apply(b, g.call(arguments, 1));
        if (!w.isFunction(b)) throw new TypeError;
        return e = g.call(arguments, 2), d = function() {
            if (this instanceof d) {
                z.prototype = b.prototype;
                var a = new z, f = b.apply(a, e.concat(g.call(arguments)));
                return Object(f) === f ? f : a;
            }
            return b.apply(c, e.concat(g.call(arguments)));
        };
    }, w.bindAll = function(a) {
        var b = g.call(arguments, 1);
        return b.length == 0 && (b = w.functions(a)), x(b, function(b) {
            a[b] = w.bind(a[b], a);
        }), a;
    }, w.memoize = function(a, b) {
        var c = {};
        return b || (b = w.identity), function() {
            var d = b.apply(this, arguments);
            return w.has(c, d) ? c[d] : c[d] = a.apply(this, arguments);
        };
    }, w.delay = function(a, b) {
        var c = g.call(arguments, 2);
        return setTimeout(function() {
            return a.apply(null, c);
        }, b);
    }, w.defer = function(a) {
        return w.delay.apply(w, [ a, 1 ].concat(g.call(arguments, 1)));
    }, w.throttle = function(a, b) {
        var c, d, e, f, g, h, i = w.debounce(function() {
            g = f = !1;
        }, b);
        return function() {
            c = this, d = arguments;
            var j = function() {
                e = null, g && a.apply(c, d), i();
            };
            return e || (e = setTimeout(j, b)), f ? g = !0 : h = a.apply(c, d), i(), f = !0, h;
        };
    }, w.debounce = function(a, b, c) {
        var d;
        return function() {
            var e = this, f = arguments, g = function() {
                d = null, c || a.apply(e, f);
            };
            c && !d && a.apply(e, f), clearTimeout(d), d = setTimeout(g, b);
        };
    }, w.once = function(a) {
        var b = !1, c;
        return function() {
            return b ? c : (b = !0, c = a.apply(this, arguments));
        };
    }, w.wrap = function(a, b) {
        return function() {
            var c = [ a ].concat(g.call(arguments, 0));
            return b.apply(this, c);
        };
    }, w.compose = function() {
        var a = arguments;
        return function() {
            var b = arguments;
            for (var c = a.length - 1; c >= 0; c--) b = [ a[c].apply(this, b) ];
            return b[0];
        };
    }, w.after = function(a, b) {
        return a <= 0 ? b() : function() {
            if (--a < 1) return b.apply(this, arguments);
        };
    }, w.keys = u || function(a) {
        if (a !== Object(a)) throw new TypeError("Invalid object");
        var b = [];
        for (var c in a) w.has(a, c) && (b[b.length] = c);
        return b;
    }, w.values = function(a) {
        return w.map(a, w.identity);
    }, w.functions = w.methods = function(a) {
        var b = [];
        for (var c in a) w.isFunction(a[c]) && b.push(c);
        return b.sort();
    }, w.extend = function(a) {
        return x(g.call(arguments, 1), function(b) {
            for (var c in b) a[c] = b[c];
        }), a;
    }, w.pick = function(a) {
        var b = {};
        return x(w.flatten(g.call(arguments, 1)), function(c) {
            c in a && (b[c] = a[c]);
        }), b;
    }, w.defaults = function(a) {
        return x(g.call(arguments, 1), function(b) {
            for (var c in b) a[c] == null && (a[c] = b[c]);
        }), a;
    }, w.clone = function(a) {
        return w.isObject(a) ? w.isArray(a) ? a.slice() : w.extend({}, a) : a;
    }, w.tap = function(a, b) {
        return b(a), a;
    }, w.isEqual = function(a, b) {
        return A(a, b, []);
    }, w.isEmpty = function(a) {
        if (a == null) return !0;
        if (w.isArray(a) || w.isString(a)) return a.length === 0;
        for (var b in a) if (w.has(a, b)) return !1;
        return !0;
    }, w.isElement = function(a) {
        return !!a && a.nodeType == 1;
    }, w.isArray = t || function(a) {
        return i.call(a) == "[object Array]";
    }, w.isObject = function(a) {
        return a === Object(a);
    }, w.isArguments = function(a) {
        return i.call(a) == "[object Arguments]";
    }, w.isArguments(arguments) || (w.isArguments = function(a) {
        return !!a && !!w.has(a, "callee");
    }), w.isFunction = function(a) {
        return i.call(a) == "[object Function]";
    }, w.isString = function(a) {
        return i.call(a) == "[object String]";
    }, w.isNumber = function(a) {
        return i.call(a) == "[object Number]";
    }, w.isFinite = function(a) {
        return w.isNumber(a) && isFinite(a);
    }, w.isNaN = function(a) {
        return a !== a;
    }, w.isBoolean = function(a) {
        return a === !0 || a === !1 || i.call(a) == "[object Boolean]";
    }, w.isDate = function(a) {
        return i.call(a) == "[object Date]";
    }, w.isRegExp = function(a) {
        return i.call(a) == "[object RegExp]";
    }, w.isNull = function(a) {
        return a === null;
    }, w.isUndefined = function(a) {
        return a === void 0;
    }, w.has = function(a, b) {
        return j.call(a, b);
    }, w.noConflict = function() {
        return a._ = b, this;
    }, w.identity = function(a) {
        return a;
    }, w.times = function(a, b, c) {
        for (var d = 0; d < a; d++) b.call(c, d);
    }, w.escape = function(a) {
        return ("" + a).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#x27;").replace(/\//g, "&#x2F;");
    }, w.result = function(a, b) {
        if (a == null) return null;
        var c = a[b];
        return w.isFunction(c) ? c.call(a) : c;
    }, w.mixin = function(a) {
        x(w.functions(a), function(b) {
            K(b, w[b] = a[b]);
        });
    };
    var B = 0;
    w.uniqueId = function(a) {
        var b = B++;
        return a ? a + b : b;
    }, w.templateSettings = {
        evaluate: /<%([\s\S]+?)%>/g,
        interpolate: /<%=([\s\S]+?)%>/g,
        escape: /<%-([\s\S]+?)%>/g
    };
    var C = /.^/, D = {
        "\\": "\\",
        "'": "'",
        r: "\r",
        n: "\n",
        t: "\t",
        u2028: "\u2028",
        u2029: "\u2029"
    };
    for (var E in D) D[D[E]] = E;
    var F = /\\|'|\r|\n|\t|\u2028|\u2029/g, G = /\\(\\|'|r|n|t|u2028|u2029)/g, H = function(a) {
        return a.replace(G, function(a, b) {
            return D[b];
        });
    };
    w.template = function(a, b, c) {
        c = w.defaults(c || {}, w.templateSettings);
        var d = "__p+='" + a.replace(F, function(a) {
            return "\\" + D[a];
        }).replace(c.escape || C, function(a, b) {
            return "'+\n_.escape(" + H(b) + ")+\n'";
        }).replace(c.interpolate || C, function(a, b) {
            return "'+\n(" + H(b) + ")+\n'";
        }).replace(c.evaluate || C, function(a, b) {
            return "';\n" + H(b) + "\n;__p+='";
        }) + "';\n";
        c.variable || (d = "with(obj||{}){\n" + d + "}\n"), d = "var __p='';var print=function(){__p+=Array.prototype.join.call(arguments, '')};\n" + d + "return __p;\n";
        var e = new Function(c.variable || "obj", "_", d);
        if (b) return e(b, w);
        var f = function(a) {
            return e.call(this, a, w);
        };
        return f.source = "function(" + (c.variable || "obj") + "){\n" + d + "}", f;
    }, w.chain = function(a) {
        return w(a).chain();
    };
    var I = function(a) {
        this._wrapped = a;
    };
    w.prototype = I.prototype;
    var J = function(a, b) {
        return b ? w(a).chain() : a;
    }, K = function(a, b) {
        I.prototype[a] = function() {
            var a = g.call(arguments);
            return h.call(a, this._wrapped), J(b.apply(w, a), this._chain);
        };
    };
    w.mixin(w), x([ "pop", "push", "reverse", "shift", "sort", "splice", "unshift" ], function(a) {
        var b = d[a];
        I.prototype[a] = function() {
            var c = this._wrapped;
            b.apply(c, arguments);
            var d = c.length;
            return (a == "shift" || a == "splice") && d === 0 && delete c[0], J(c, this._chain);
        };
    }), x([ "concat", "join", "slice" ], function(a) {
        var b = d[a];
        I.prototype[a] = function() {
            return J(b.apply(this._wrapped, arguments), this._chain);
        };
    }), I.prototype.chain = function() {
        return this._chain = !0, this;
    }, I.prototype.value = function() {
        return this._wrapped;
    };
}.call(this), define("libs/underscore/underscore", function() {}), function() {
    var a = this, b = a.Backbone, c = Array.prototype.slice, d = Array.prototype.splice, e;
    typeof exports != "undefined" ? e = exports : e = a.Backbone = {}, e.VERSION = "0.9.1";
    var f = a._;
    !f && typeof require != "undefined" && (f = require("underscore"));
    var g = a.jQuery || a.Zepto || a.ender;
    e.setDomLibrary = function(a) {
        g = a;
    }, e.noConflict = function() {
        return a.Backbone = b, this;
    }, e.emulateHTTP = !1, e.emulateJSON = !1, e.Events = {
        on: function(a, b, c) {
            var d;
            a = a.split(/\s+/);
            var e = this._callbacks || (this._callbacks = {});
            while (d = a.shift()) {
                var f = e[d] || (e[d] = {}), g = f.tail || (f.tail = f.next = {});
                g.callback = b, g.context = c, f.tail = g.next = {};
            }
            return this;
        },
        off: function(a, b, c) {
            var d, e, f;
            if (!a) delete this._callbacks; else if (e = this._callbacks) {
                a = a.split(/\s+/);
                while (d = a.shift()) {
                    f = e[d], delete e[d];
                    if (!b || !f) continue;
                    while ((f = f.next) && f.next) if (f.callback !== b || !!c && f.context !== c) this.on(d, f.callback, f.context); else continue;
                }
            }
            return this;
        },
        trigger: function(a) {
            var b, d, e, f, g, h, i;
            if (!(e = this._callbacks)) return this;
            h = e.all, (a = a.split(/\s+/)).push(null);
            while (b = a.shift()) {
                h && a.push({
                    next: h.next,
                    tail: h.tail,
                    event: b
                });
                if (!(d = e[b])) continue;
                a.push({
                    next: d.next,
                    tail: d.tail
                });
            }
            i = c.call(arguments, 1);
            while (d = a.pop()) {
                f = d.tail, g = d.event ? [ d.event ].concat(i) : i;
                while ((d = d.next) !== f) d.callback.apply(d.context || this, g);
            }
            return this;
        }
    }, e.Events.bind = e.Events.on, e.Events.unbind = e.Events.off, e.Model = function(a, b) {
        var c;
        a || (a = {}), b && b.parse && (a = this.parse(a));
        if (c = u(this, "defaults")) a = f.extend({}, c, a);
        b && b.collection && (this.collection = b.collection), this.attributes = {}, this._escapedAttributes = {}, this.cid = f.uniqueId("c");
        if (!this.set(a, {
            silent: !0
        })) throw new Error("Can't create an invalid model");
        delete this._changed, this._previousAttributes = f.clone(this.attributes), this.initialize.apply(this, arguments);
    }, f.extend(e.Model.prototype, e.Events, {
        idAttribute: "id",
        initialize: function() {},
        toJSON: function() {
            return f.clone(this.attributes);
        },
        get: function(a) {
            return this.attributes[a];
        },
        escape: function(a) {
            var b;
            if (b = this._escapedAttributes[a]) return b;
            var c = this.attributes[a];
            return this._escapedAttributes[a] = f.escape(c == null ? "" : "" + c);
        },
        has: function(a) {
            return this.attributes[a] != null;
        },
        set: function(a, b, c) {
            var d, g, h;
            f.isObject(a) || a == null ? (d = a, c = b) : (d = {}, d[a] = b), c || (c = {});
            if (!d) return this;
            d instanceof e.Model && (d = d.attributes);
            if (c.unset) for (g in d) d[g] = void 0;
            if (!this._validate(d, c)) return !1;
            this.idAttribute in d && (this.id = d[this.idAttribute]);
            var i = this.attributes, j = this._escapedAttributes, k = this._previousAttributes || {}, l = this._setting;
            this._changed || (this._changed = {}), this._setting = !0;
            for (g in d) {
                h = d[g], f.isEqual(i[g], h) || delete j[g], c.unset ? delete i[g] : i[g] = h, this._changing && !f.isEqual(this._changed[g], h) && (this.trigger("change:" + g, this, h, c), this._moreChanges = !0), delete this._changed[g];
                if (!f.isEqual(k[g], h) || f.has(i, g) != f.has(k, g)) this._changed[g] = h;
            }
            return l || (!c.silent && this.hasChanged() && this.change(c), this._setting = !1), this;
        },
        unset: function(a, b) {
            return (b || (b = {})).unset = !0, this.set(a, null, b);
        },
        clear: function(a) {
            return (a || (a = {})).unset = !0, this.set(f.clone(this.attributes), a);
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {};
            var b = this, c = a.success;
            return a.success = function(d, e, f) {
                if (!b.set(b.parse(d, f), a)) return !1;
                c && c(b, d);
            }, a.error = e.wrapError(a.error, b, a), (this.sync || e.sync).call(this, "read", this, a);
        },
        save: function(a, b, c) {
            var d, g;
            f.isObject(a) || a == null ? (d = a, c = b) : (d = {}, d[a] = b), c = c ? f.clone(c) : {}, c.wait && (g = f.clone(this.attributes));
            var h = f.extend({}, c, {
                silent: !0
            });
            if (d && !this.set(d, c.wait ? h : c)) return !1;
            var i = this, j = c.success;
            c.success = function(a, b, e) {
                var g = i.parse(a, e);
                c.wait && (g = f.extend(d || {}, g));
                if (!i.set(g, c)) return !1;
                j ? j(i, a) : i.trigger("sync", i, a, c);
            }, c.error = e.wrapError(c.error, i, c);
            var k = this.isNew() ? "create" : "update", l = (this.sync || e.sync).call(this, k, this, c);
            return c.wait && this.set(g, h), l;
        },
        destroy: function(a) {
            a = a ? f.clone(a) : {};
            var b = this, c = a.success, d = function() {
                b.trigger("destroy", b, b.collection, a);
            };
            if (this.isNew()) return d();
            a.success = function(e) {
                a.wait && d(), c ? c(b, e) : b.trigger("sync", b, e, a);
            }, a.error = e.wrapError(a.error, b, a);
            var g = (this.sync || e.sync).call(this, "delete", this, a);
            return a.wait || d(), g;
        },
        url: function() {
            var a = u(this.collection, "url") || u(this, "urlRoot") || v();
            return this.isNew() ? a : a + (a.charAt(a.length - 1) == "/" ? "" : "/") + encodeURIComponent(this.id);
        },
        parse: function(a, b) {
            return a;
        },
        clone: function() {
            return new this.constructor(this.attributes);
        },
        isNew: function() {
            return this.id == null;
        },
        change: function(a) {
            if (this._changing || !this.hasChanged()) return this;
            this._changing = !0, this._moreChanges = !0;
            for (var b in this._changed) this.trigger("change:" + b, this, this._changed[b], a);
            while (this._moreChanges) this._moreChanges = !1, this.trigger("change", this, a);
            return this._previousAttributes = f.clone(this.attributes), delete this._changed, this._changing = !1, this;
        },
        hasChanged: function(a) {
            return arguments.length ? this._changed && f.has(this._changed, a) : !f.isEmpty(this._changed);
        },
        changedAttributes: function(a) {
            if (!a) return this.hasChanged() ? f.clone(this._changed) : !1;
            var b, c = !1, d = this._previousAttributes;
            for (var e in a) {
                if (f.isEqual(d[e], b = a[e])) continue;
                (c || (c = {}))[e] = b;
            }
            return c;
        },
        previous: function(a) {
            return !arguments.length || !this._previousAttributes ? null : this._previousAttributes[a];
        },
        previousAttributes: function() {
            return f.clone(this._previousAttributes);
        },
        isValid: function() {
            return !this.validate(this.attributes);
        },
        _validate: function(a, b) {
            if (b.silent || !this.validate) return !0;
            a = f.extend({}, this.attributes, a);
            var c = this.validate(a, b);
            return c ? (b && b.error ? b.error(this, c, b) : this.trigger("error", this, c, b), !1) : !0;
        }
    }), e.Collection = function(a, b) {
        b || (b = {}), b.comparator && (this.comparator = b.comparator), this._reset(), this.initialize.apply(this, arguments), a && this.reset(a, {
            silent: !0,
            parse: b.parse
        });
    }, f.extend(e.Collection.prototype, e.Events, {
        model: e.Model,
        initialize: function() {},
        toJSON: function() {
            return this.map(function(a) {
                return a.toJSON();
            });
        },
        add: function(a, b) {
            var c, e, g, h, i, j, k = {}, l = {};
            b || (b = {}), a = f.isArray(a) ? a.slice() : [ a ];
            for (c = 0, g = a.length; c < g; c++) {
                if (!(h = a[c] = this._prepareModel(a[c], b))) throw new Error("Can't add an invalid model to a collection");
                if (k[i = h.cid] || this._byCid[i] || (j = h.id) != null && (l[j] || this._byId[j])) throw new Error("Can't add the same model to a collection twice");
                k[i] = l[j] = h;
            }
            for (c = 0; c < g; c++) (h = a[c]).on("all", this._onModelEvent, this), this._byCid[h.cid] = h, h.id != null && (this._byId[h.id] = h);
            this.length += g, e = b.at != null ? b.at : this.models.length, d.apply(this.models, [ e, 0 ].concat(a)), this.comparator && this.sort({
                silent: !0
            });
            if (b.silent) return this;
            for (c = 0, g = this.models.length; c < g; c++) {
                if (!k[(h = this.models[c]).cid]) continue;
                b.index = c, h.trigger("add", h, this, b);
            }
            return this;
        },
        remove: function(a, b) {
            var c, d, e, g;
            b || (b = {}), a = f.isArray(a) ? a.slice() : [ a ];
            for (c = 0, d = a.length; c < d; c++) {
                g = this.getByCid(a[c]) || this.get(a[c]);
                if (!g) continue;
                delete this._byId[g.id], delete this._byCid[g.cid], e = this.indexOf(g), this.models.splice(e, 1), this.length--, b.silent || (b.index = e, g.trigger("remove", g, this, b)), this._removeReference(g);
            }
            return this;
        },
        get: function(a) {
            return a == null ? null : this._byId[a.id != null ? a.id : a];
        },
        getByCid: function(a) {
            return a && this._byCid[a.cid || a];
        },
        at: function(a) {
            return this.models[a];
        },
        sort: function(a) {
            a || (a = {});
            if (!this.comparator) throw new Error("Cannot sort a set without a comparator");
            var b = f.bind(this.comparator, this);
            return this.comparator.length == 1 ? this.models = this.sortBy(b) : this.models.sort(b), a.silent || this.trigger("reset", this, a), this;
        },
        pluck: function(a) {
            return f.map(this.models, function(b) {
                return b.get(a);
            });
        },
        reset: function(a, b) {
            a || (a = []), b || (b = {});
            for (var c = 0, d = this.models.length; c < d; c++) this._removeReference(this.models[c]);
            return this._reset(), this.add(a, {
                silent: !0,
                parse: b.parse
            }), b.silent || this.trigger("reset", this, b), this;
        },
        fetch: function(a) {
            a = a ? f.clone(a) : {}, a.parse === undefined && (a.parse = !0);
            var b = this, c = a.success;
            return a.success = function(d, e, f) {
                b[a.add ? "add" : "reset"](b.parse(d, f), a), c && c(b, d);
            }, a.error = e.wrapError(a.error, b, a), (this.sync || e.sync).call(this, "read", this, a);
        },
        create: function(a, b) {
            var c = this;
            b = b ? f.clone(b) : {}, a = this._prepareModel(a, b);
            if (!a) return !1;
            b.wait || c.add(a, b);
            var d = b.success;
            return b.success = function(e, f, g) {
                b.wait && c.add(e, b), d ? d(e, f) : e.trigger("sync", a, f, b);
            }, a.save(null, b), a;
        },
        parse: function(a, b) {
            return a;
        },
        chain: function() {
            return f(this.models).chain();
        },
        _reset: function(a) {
            this.length = 0, this.models = [], this._byId = {}, this._byCid = {};
        },
        _prepareModel: function(a, b) {
            if (a instanceof e.Model) a.collection || (a.collection = this); else {
                var c = a;
                b.collection = this, a = new this.model(c, b), a._validate(a.attributes, b) || (a = !1);
            }
            return a;
        },
        _removeReference: function(a) {
            this == a.collection && delete a.collection, a.off("all", this._onModelEvent, this);
        },
        _onModelEvent: function(a, b, c, d) {
            if (a != "add" && a != "remove" || c == this) a == "destroy" && this.remove(b, d), b && a === "change:" + b.idAttribute && (delete this._byId[b.previous(b.idAttribute)], this._byId[b.id] = b), this.trigger.apply(this, arguments); else return;
        }
    });
    var h = [ "forEach", "each", "map", "reduce", "reduceRight", "find", "detect", "filter", "select", "reject", "every", "all", "some", "any", "include", "contains", "invoke", "max", "min", "sortBy", "sortedIndex", "toArray", "size", "first", "initial", "rest", "last", "without", "indexOf", "shuffle", "lastIndexOf", "isEmpty", "groupBy" ];
    f.each(h, function(a) {
        e.Collection.prototype[a] = function() {
            return f[a].apply(f, [ this.models ].concat(f.toArray(arguments)));
        };
    }), e.Router = function(a) {
        a || (a = {}), a.routes && (this.routes = a.routes), this._bindRoutes(), this.initialize.apply(this, arguments);
    };
    var i = /:\w+/g, j = /\*\w+/g, k = /[-[\]{}()+?.,\\^$|#\s]/g;
    f.extend(e.Router.prototype, e.Events, {
        initialize: function() {},
        route: function(a, b, c) {
            return e.history || (e.history = new e.History), f.isRegExp(a) || (a = this._routeToRegExp(a)), c || (c = this[b]), e.history.route(a, f.bind(function(d) {
                var f = this._extractParameters(a, d);
                c && c.apply(this, f), this.trigger.apply(this, [ "route:" + b ].concat(f)), e.history.trigger("route", this, b, f);
            }, this)), this;
        },
        navigate: function(a, b) {
            e.history.navigate(a, b);
        },
        _bindRoutes: function() {
            if (!this.routes) return;
            var a = [];
            for (var b in this.routes) a.unshift([ b, this.routes[b] ]);
            for (var c = 0, d = a.length; c < d; c++) this.route(a[c][0], a[c][1], this[a[c][1]]);
        },
        _routeToRegExp: function(a) {
            return a = a.replace(k, "\\$&").replace(i, "([^/]+)").replace(j, "(.*?)"), new RegExp("^" + a + "$");
        },
        _extractParameters: function(a, b) {
            return a.exec(b).slice(1);
        }
    }), e.History = function() {
        this.handlers = [], f.bindAll(this, "checkUrl");
    };
    var l = /^[#\/]/, m = /msie [\w.]+/, n = !1;
    f.extend(e.History.prototype, e.Events, {
        interval: 50,
        getFragment: function(a, b) {
            if (a == null) if (this._hasPushState || b) {
                a = window.location.pathname;
                var c = window.location.search;
                c && (a += c);
            } else a = window.location.hash;
            return a = decodeURIComponent(a), a.indexOf(this.options.root) || (a = a.substr(this.options.root.length)), a.replace(l, "");
        },
        start: function(a) {
            if (n) throw new Error("Backbone.history has already been started");
            this.options = f.extend({}, {
                root: "/"
            }, this.options, a), this._wantsHashChange = this.options.hashChange !== !1, this._wantsPushState = !!this.options.pushState, this._hasPushState = !!(this.options.pushState && window.history && window.history.pushState);
            var b = this.getFragment(), c = document.documentMode, d = m.exec(navigator.userAgent.toLowerCase()) && (!c || c <= 7);
            d && (this.iframe = g('<iframe src="javascript:0" tabindex="-1" />').hide().appendTo("body")[0].contentWindow, this.navigate(b)), this._hasPushState ? g(window).bind("popstate", this.checkUrl) : this._wantsHashChange && "onhashchange" in window && !d ? g(window).bind("hashchange", this.checkUrl) : this._wantsHashChange && (this._checkUrlInterval = setInterval(this.checkUrl, this.interval)), this.fragment = b, n = !0;
            var e = window.location, h = e.pathname == this.options.root;
            if (this._wantsHashChange && this._wantsPushState && !this._hasPushState && !h) return this.fragment = this.getFragment(null, !0), window.location.replace(this.options.root + "#" + this.fragment), !0;
            this._wantsPushState && this._hasPushState && h && e.hash && (this.fragment = e.hash.replace(l, ""), window.history.replaceState({}, document.title, e.protocol + "//" + e.host + this.options.root + this.fragment));
            if (!this.options.silent) return this.loadUrl();
        },
        stop: function() {
            g(window).unbind("popstate", this.checkUrl).unbind("hashchange", this.checkUrl), clearInterval(this._checkUrlInterval), n = !1;
        },
        route: function(a, b) {
            this.handlers.unshift({
                route: a,
                callback: b
            });
        },
        checkUrl: function(a) {
            var b = this.getFragment();
            b == this.fragment && this.iframe && (b = this.getFragment(this.iframe.location.hash));
            if (b == this.fragment || b == decodeURIComponent(this.fragment)) return !1;
            this.iframe && this.navigate(b), this.loadUrl() || this.loadUrl(window.location.hash);
        },
        loadUrl: function(a) {
            var b = this.fragment = this.getFragment(a), c = f.any(this.handlers, function(a) {
                if (a.route.test(b)) return a.callback(b), !0;
            });
            return c;
        },
        navigate: function(a, b) {
            if (!n) return !1;
            if (!b || b === !0) b = {
                trigger: b
            };
            var c = (a || "").replace(l, "");
            if (this.fragment == c || this.fragment == decodeURIComponent(c)) return;
            this._hasPushState ? (c.indexOf(this.options.root) != 0 && (c = this.options.root + c), this.fragment = c, window.history[b.replace ? "replaceState" : "pushState"]({}, document.title, c)) : this._wantsHashChange ? (this.fragment = c, this._updateHash(window.location, c, b.replace), this.iframe && c != this.getFragment(this.iframe.location.hash) && (b.replace || this.iframe.document.open().close(), this._updateHash(this.iframe.location, c, b.replace))) : window.location.assign(this.options.root + a), b.trigger && this.loadUrl(a);
        },
        _updateHash: function(a, b, c) {
            c ? a.replace(a.toString().replace(/(javascript:|#).*$/, "") + "#" + b) : a.hash = b;
        }
    }), e.View = function(a) {
        this.cid = f.uniqueId("view"), this._configure(a || {}), this._ensureElement(), this.initialize.apply(this, arguments), this.delegateEvents();
    };
    var o = /^(\S+)\s*(.*)$/, p = [ "model", "collection", "el", "id", "attributes", "className", "tagName" ];
    f.extend(e.View.prototype, e.Events, {
        tagName: "div",
        $: function(a) {
            return this.$el.find(a);
        },
        initialize: function() {},
        render: function() {
            return this;
        },
        remove: function() {
            return this.$el.remove(), this;
        },
        make: function(a, b, c) {
            var d = document.createElement(a);
            return b && g(d).attr(b), c && g(d).html(c), d;
        },
        setElement: function(a, b) {
            return this.$el = g(a), this.el = this.$el[0], b !== !1 && this.delegateEvents(), this;
        },
        delegateEvents: function(a) {
            if (!a && !(a = u(this, "events"))) return;
            this.undelegateEvents();
            for (var b in a) {
                var c = a[b];
                f.isFunction(c) || (c = this[a[b]]);
                if (!c) throw new Error('Event "' + a[b] + '" does not exist');
                var d = b.match(o), e = d[1], g = d[2];
                c = f.bind(c, this), e += ".delegateEvents" + this.cid, g === "" ? this.$el.bind(e, c) : this.$el.delegate(g, e, c);
            }
        },
        undelegateEvents: function() {
            this.$el.unbind(".delegateEvents" + this.cid);
        },
        _configure: function(a) {
            this.options && (a = f.extend({}, this.options, a));
            for (var b = 0, c = p.length; b < c; b++) {
                var d = p[b];
                a[d] && (this[d] = a[d]);
            }
            this.options = a;
        },
        _ensureElement: function() {
            if (!this.el) {
                var a = u(this, "attributes") || {};
                this.id && (a.id = this.id), this.className && (a["class"] = this.className), this.setElement(this.make(this.tagName, a), !1);
            } else this.setElement(this.el, !1);
        }
    });
    var q = function(a, b) {
        var c = t(this, a, b);
        return c.extend = this.extend, c;
    };
    e.Model.extend = e.Collection.extend = e.Router.extend = e.View.extend = q;
    var r = {
        create: "POST",
        update: "PUT",
        "delete": "DELETE",
        read: "GET"
    };
    e.sync = function(a, b, c) {
        var d = r[a], h = {
            type: d,
            dataType: "json"
        };
        return c.url || (h.url = u(b, "url") || v()), !c.data && b && (a == "create" || a == "update") && (h.contentType = "application/json", h.data = JSON.stringify(b.toJSON())), e.emulateJSON && (h.contentType = "application/x-www-form-urlencoded", h.data = h.data ? {
            model: h.data
        } : {}), e.emulateHTTP && (d === "PUT" || d === "DELETE") && (e.emulateJSON && (h.data._method = d), h.type = "POST", h.beforeSend = function(a) {
            a.setRequestHeader("X-HTTP-Method-Override", d);
        }), h.type !== "GET" && !e.emulateJSON && (h.processData = !1), g.ajax(f.extend(h, c));
    }, e.wrapError = function(a, b, c) {
        return function(d, e) {
            e = d === b ? e : d, a ? a(b, e, c) : b.trigger("error", b, e, c);
        };
    };
    var s = function() {}, t = function(a, b, c) {
        var d;
        return b && b.hasOwnProperty("constructor") ? d = b.constructor : d = function() {
            a.apply(this, arguments);
        }, f.extend(d, a), s.prototype = a.prototype, d.prototype = new s, b && f.extend(d.prototype, b), c && f.extend(d, c), d.prototype.constructor = d, d.__super__ = a.prototype, d;
    }, u = function(a, b) {
        return !a || !a[b] ? null : f.isFunction(a[b]) ? a[b]() : a[b];
    }, v = function() {
        throw new Error('A "url" property or function must be specified');
    };
}.call(this), define("libs/backbone/backbone", function() {}), !function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.typeahead.defaults, c), this.matcher = this.options.matcher || this.matcher, this.sorter = this.options.sorter || this.sorter, this.highlighter = this.options.highlighter || this.highlighter, this.$menu = a(this.options.menu).appendTo("body"), this.source = this.options.source, this.shown = !1, this.listen();
    };
    b.prototype = {
        constructor: b,
        select: function() {
            var a = this.$menu.find(".active").attr("data-value");
            return this.$element.val(a), this.hide();
        },
        show: function() {
            var b = a.extend({}, this.$element.offset(), {
                height: this.$element[0].offsetHeight
            });
            return this.$menu.css({
                top: b.top + b.height,
                left: b.left
            }), this.$menu.show(), this.shown = !0, this;
        },
        hide: function() {
            return this.$menu.hide(), this.shown = !1, this;
        },
        lookup: function(b) {
            var c = this, d, e;
            return this.query = this.$element.val(), this.query ? (d = a.grep(this.source, function(a) {
                if (c.matcher(a)) return a;
            }), d = this.sorter(d), d.length ? this.render(d.slice(0, this.options.items)).show() : this.shown ? this.hide() : this) : this.shown ? this.hide() : this;
        },
        matcher: function(a) {
            return ~a.toLowerCase().indexOf(this.query.toLowerCase());
        },
        sorter: function(a) {
            var b = [], c = [], d = [], e;
            while (e = a.shift()) e.toLowerCase().indexOf(this.query.toLowerCase()) ? ~e.indexOf(this.query) ? c.push(e) : d.push(e) : b.push(e);
            return b.concat(c, d);
        },
        highlighter: function(a) {
            return a.replace(new RegExp("(" + this.query + ")", "ig"), function(a, b) {
                return "<strong>" + b + "</strong>";
            });
        },
        render: function(b) {
            var c = this;
            return b = a(b).map(function(b, d) {
                return b = a(c.options.item).attr("data-value", d), b.find("a").html(c.highlighter(d)), b[0];
            }), b.first().addClass("active"), this.$menu.html(b), this;
        },
        next: function(b) {
            var c = this.$menu.find(".active").removeClass("active"), d = c.next();
            d.length || (d = a(this.$menu.find("li")[0])), d.addClass("active");
        },
        prev: function(a) {
            var b = this.$menu.find(".active").removeClass("active"), c = b.prev();
            c.length || (c = this.$menu.find("li").last()), c.addClass("active");
        },
        listen: function() {
            this.$element.on("blur", a.proxy(this.blur, this)).on("keypress", a.proxy(this.keypress, this)).on("keyup", a.proxy(this.keyup, this)), (a.browser.webkit || a.browser.msie) && this.$element.on("keydown", a.proxy(this.keypress, this)), this.$menu.on("click", a.proxy(this.click, this)).on("mouseenter", "li", a.proxy(this.mouseenter, this));
        },
        keyup: function(a) {
            a.stopPropagation(), a.preventDefault();
            switch (a.keyCode) {
              case 40:
              case 38:
                break;
              case 9:
              case 13:
                if (!this.shown) return;
                this.select();
                break;
              case 27:
                this.hide();
                break;
              default:
                this.lookup();
            }
        },
        keypress: function(a) {
            a.stopPropagation();
            if (!this.shown) return;
            switch (a.keyCode) {
              case 9:
              case 13:
              case 27:
                a.preventDefault();
                break;
              case 38:
                a.preventDefault(), this.prev();
                break;
              case 40:
                a.preventDefault(), this.next();
            }
        },
        blur: function(a) {
            var b = this;
            a.stopPropagation(), a.preventDefault(), setTimeout(function() {
                b.hide();
            }, 150);
        },
        click: function(a) {
            a.stopPropagation(), a.preventDefault(), this.select();
        },
        mouseenter: function(b) {
            this.$menu.find(".active").removeClass("active"), a(b.currentTarget).addClass("active");
        }
    }, a.fn.typeahead = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("typeahead"), f = typeof c == "object" && c;
            e || d.data("typeahead", e = new b(this, f)), typeof c == "string" && e[c]();
        });
    }, a.fn.typeahead.defaults = {
        source: [],
        items: 8,
        menu: '<ul class="typeahead dropdown-menu"></ul>',
        item: '<li><a href="#"></a></li>'
    }, a.fn.typeahead.Constructor = b, a(function() {
        a("body").on("focus.typeahead.data-api", '[data-provide="typeahead"]', function(b) {
            var c = a(this);
            if (c.data("typeahead")) return;
            b.preventDefault(), c.typeahead(c.data());
        });
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-typeahead", function() {}), !function(a) {
    "use strict";
    var b = function(b) {
        this.element = a(b);
    };
    b.prototype = {
        constructor: b,
        show: function() {
            var b = this.element, c = b.closest("ul:not(.dropdown-menu)"), d = b.attr("data-target"), e, f;
            d || (d = b.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, ""));
            if (b.parent("li").hasClass("active")) return;
            e = c.find(".active a").last()[0], b.trigger({
                type: "show",
                relatedTarget: e
            }), f = a(d), this.activate(b.parent("li"), c), this.activate(f, f.parent(), function() {
                b.trigger({
                    type: "shown",
                    relatedTarget: e
                });
            });
        },
        activate: function(b, c, d) {
            function g() {
                e.removeClass("active").find("> .dropdown-menu > .active").removeClass("active"), b.addClass("active"), f ? (b[0].offsetWidth, b.addClass("in")) : b.removeClass("fade"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active"), d && d();
            }
            var e = c.find("> .active"), f = d && a.support.transition && e.hasClass("fade");
            f ? e.one(a.support.transition.end, g) : g(), e.removeClass("in");
        }
    }, a.fn.tab = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("tab");
            e || d.data("tab", e = new b(this)), typeof c == "string" && e[c]();
        });
    }, a.fn.tab.Constructor = b, a(function() {
        a("body").on("click.tab.data-api", '[data-toggle="tab"], [data-toggle="pill"]', function(b) {
            b.preventDefault(), a(this).tab("show");
        });
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-tab", function() {}), !function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("tooltip", a, b);
    };
    b.prototype = {
        constructor: b,
        init: function(b, c, d) {
            var e, f;
            this.type = b, this.$element = a(c), this.options = this.getOptions(d), this.enabled = !0, this.options.trigger != "manual" && (e = this.options.trigger == "hover" ? "mouseenter" : "focus", f = this.options.trigger == "hover" ? "mouseleave" : "blur", this.$element.on(e, this.options.selector, a.proxy(this.enter, this)), this.$element.on(f, this.options.selector, a.proxy(this.leave, this))), this.options.selector ? this._options = a.extend({}, this.options, {
                trigger: "manual",
                selector: ""
            }) : this.fixTitle();
        },
        getOptions: function(b) {
            return b = a.extend({}, a.fn[this.type].defaults, b, this.$element.data()), b.delay && typeof b.delay == "number" && (b.delay = {
                show: b.delay,
                hide: b.delay
            }), b;
        },
        enter: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            !c.options.delay || !c.options.delay.show ? c.show() : (c.hoverState = "in", setTimeout(function() {
                c.hoverState == "in" && c.show();
            }, c.options.delay.show));
        },
        leave: function(b) {
            var c = a(b.currentTarget)[this.type](this._options).data(this.type);
            !c.options.delay || !c.options.delay.hide ? c.hide() : (c.hoverState = "out", setTimeout(function() {
                c.hoverState == "out" && c.hide();
            }, c.options.delay.hide));
        },
        show: function() {
            var a, b, c, d, e, f, g;
            if (this.hasContent() && this.enabled) {
                a = this.tip(), this.setContent(), this.options.animation && a.addClass("fade"), f = typeof this.options.placement == "function" ? this.options.placement.call(this, a[0], this.$element[0]) : this.options.placement, b = /in/.test(f), a.remove().css({
                    top: 0,
                    left: 0,
                    display: "block"
                }).appendTo(b ? this.$element : document.body), c = this.getPosition(b), d = a[0].offsetWidth, e = a[0].offsetHeight;
                switch (b ? f.split(" ")[1] : f) {
                  case "bottom":
                    g = {
                        top: c.top + c.height,
                        left: c.left + c.width / 2 - d / 2
                    };
                    break;
                  case "top":
                    g = {
                        top: c.top - e,
                        left: c.left + c.width / 2 - d / 2
                    };
                    break;
                  case "left":
                    g = {
                        top: c.top + c.height / 2 - e / 2,
                        left: c.left - d
                    };
                    break;
                  case "right":
                    g = {
                        top: c.top + c.height / 2 - e / 2,
                        left: c.left + c.width
                    };
                }
                a.css(g).addClass(f).addClass("in");
            }
        },
        setContent: function() {
            var a = this.tip();
            a.find(".tooltip-inner").html(this.getTitle()), a.removeClass("fade in top bottom left right");
        },
        hide: function() {
            function d() {
                var b = setTimeout(function() {
                    c.off(a.support.transition.end).remove();
                }, 500);
                c.one(a.support.transition.end, function() {
                    clearTimeout(b), c.remove();
                });
            }
            var b = this, c = this.tip();
            c.removeClass("in"), a.support.transition && this.$tip.hasClass("fade") ? d() : c.remove();
        },
        fixTitle: function() {
            var a = this.$element;
            (a.attr("title") || typeof a.attr("data-original-title") != "string") && a.attr("data-original-title", a.attr("title") || "").removeAttr("title");
        },
        hasContent: function() {
            return this.getTitle();
        },
        getPosition: function(b) {
            return a.extend({}, b ? {
                top: 0,
                left: 0
            } : this.$element.offset(), {
                width: this.$element[0].offsetWidth,
                height: this.$element[0].offsetHeight
            });
        },
        getTitle: function() {
            var a, b = this.$element, c = this.options;
            return a = b.attr("data-original-title") || (typeof c.title == "function" ? c.title.call(b[0]) : c.title), a = a.toString().replace(/(^\s*|\s*$)/, ""), a;
        },
        tip: function() {
            return this.$tip = this.$tip || a(this.options.template);
        },
        validate: function() {
            this.$element[0].parentNode || (this.hide(), this.$element = null, this.options = null);
        },
        enable: function() {
            this.enabled = !0;
        },
        disable: function() {
            this.enabled = !1;
        },
        toggleEnabled: function() {
            this.enabled = !this.enabled;
        },
        toggle: function() {
            this[this.tip().hasClass("in") ? "hide" : "show"]();
        }
    }, a.fn.tooltip = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("tooltip"), f = typeof c == "object" && c;
            e || d.data("tooltip", e = new b(this, f)), typeof c == "string" && e[c]();
        });
    }, a.fn.tooltip.Constructor = b, a.fn.tooltip.defaults = {
        animation: !0,
        delay: 0,
        selector: !1,
        placement: "top",
        trigger: "hover",
        title: "",
        template: '<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'
    };
}(window.jQuery), define("libs/bootstrap/bootstrap-tooltip", function() {}), !function(a) {
    function b(b, c) {
        var d = a.proxy(this.process, this), e = a(b).is("body") ? a(window) : a(b), f;
        this.options = a.extend({}, a.fn.scrollspy.defaults, c), this.$scrollElement = e.on("scroll.scroll.data-api", d), this.selector = (this.options.target || (f = a(b).attr("href")) && f.replace(/.*(?=#[^\s]+$)/, "") || "") + " .nav li > a", this.$body = a("body").on("click.scroll.data-api", this.selector, d), this.refresh(), this.process();
    }
    "use strict", b.prototype = {
        constructor: b,
        refresh: function() {
            this.targets = this.$body.find(this.selector).map(function() {
                var b = a(this).attr("href");
                return /^#\w/.test(b) && a(b).length ? b : null;
            }), this.offsets = a.map(this.targets, function(b) {
                return a(b).position().top;
            });
        },
        process: function() {
            var a = this.$scrollElement.scrollTop() + this.options.offset, b = this.offsets, c = this.targets, d = this.activeTarget, e;
            for (e = b.length; e--; ) d != c[e] && a >= b[e] && (!b[e + 1] || a <= b[e + 1]) && this.activate(c[e]);
        },
        activate: function(a) {
            var b;
            this.activeTarget = a, this.$body.find(this.selector).parent(".active").removeClass("active"), b = this.$body.find(this.selector + '[href="' + a + '"]').parent("li").addClass("active"), b.parent(".dropdown-menu") && b.closest("li.dropdown").addClass("active");
        }
    }, a.fn.scrollspy = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("scrollspy"), f = typeof c == "object" && c;
            e || d.data("scrollspy", e = new b(this, f)), typeof c == "string" && e[c]();
        });
    }, a.fn.scrollspy.Constructor = b, a.fn.scrollspy.defaults = {
        offset: 10
    }, a(function() {
        a('[data-spy="scroll"]').each(function() {
            var b = a(this);
            b.scrollspy(b.data());
        });
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-scrollspy", function() {}), !function(a) {
    "use strict";
    var b = function(a, b) {
        this.init("popover", a, b);
    };
    b.prototype = a.extend({}, a.fn.tooltip.Constructor.prototype, {
        constructor: b,
        setContent: function() {
            var b = this.tip(), c = this.getTitle(), d = this.getContent();
            b.find(".popover-title")[a.type(c) == "object" ? "append" : "html"](c), b.find(".popover-content > *")[a.type(d) == "object" ? "append" : "html"](d), b.removeClass("fade top bottom left right in");
        },
        hasContent: function() {
            return this.getTitle() || this.getContent();
        },
        getContent: function() {
            var a, b = this.$element, c = this.options;
            return a = b.attr("data-content") || (typeof c.content == "function" ? c.content.call(b[0]) : c.content), a = a.toString().replace(/(^\s*|\s*$)/, ""), a;
        },
        tip: function() {
            return this.$tip || (this.$tip = a(this.options.template)), this.$tip;
        }
    }), a.fn.popover = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("popover"), f = typeof c == "object" && c;
            e || d.data("popover", e = new b(this, f)), typeof c == "string" && e[c]();
        });
    }, a.fn.popover.Constructor = b, a.fn.popover.defaults = a.extend({}, a.fn.tooltip.defaults, {
        placement: "right",
        content: "",
        template: '<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-popover", function() {}), !function(a) {
    function c() {
        var b = this, c = setTimeout(function() {
            b.$element.off(a.support.transition.end), d.call(b);
        }, 500);
        this.$element.one(a.support.transition.end, function() {
            clearTimeout(c), d.call(b);
        });
    }
    function d(a) {
        this.$element.hide().trigger("hidden"), e.call(this);
    }
    function e(b) {
        var c = this, d = this.$element.hasClass("fade") ? "fade" : "";
        if (this.isShown && this.options.backdrop) {
            var e = a.support.transition && d;
            this.$backdrop = a('<div class="modal-backdrop ' + d + '" />').appendTo(document.body), this.options.backdrop != "static" && this.$backdrop.click(a.proxy(this.hide, this)), e && this.$backdrop[0].offsetWidth, this.$backdrop.addClass("in"), e ? this.$backdrop.one(a.support.transition.end, b) : b();
        } else !this.isShown && this.$backdrop ? (this.$backdrop.removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? this.$backdrop.one(a.support.transition.end, a.proxy(f, this)) : f.call(this)) : b && b();
    }
    function f() {
        this.$backdrop.remove(), this.$backdrop = null;
    }
    function g() {
        var b = this;
        this.isShown && this.options.keyboard ? a(document).on("keyup.dismiss.modal", function(a) {
            a.which == 27 && b.hide();
        }) : this.isShown || a(document).off("keyup.dismiss.modal");
    }
    "use strict";
    var b = function(b, c) {
        this.options = c, this.$element = a(b).delegate('[data-dismiss="modal"]', "click.dismiss.modal", a.proxy(this.hide, this));
    };
    b.prototype = {
        constructor: b,
        toggle: function() {
            return this[this.isShown ? "hide" : "show"]();
        },
        show: function() {
            var b = this;
            if (this.isShown) return;
            a("body").addClass("modal-open"), this.isShown = !0, this.$element.trigger("show"), g.call(this), e.call(this, function() {
                var c = a.support.transition && b.$element.hasClass("fade");
                !b.$element.parent().length && b.$element.appendTo(document.body), b.$element.show(), c && b.$element[0].offsetWidth, b.$element.addClass("in"), c ? b.$element.one(a.support.transition.end, function() {
                    b.$element.trigger("shown");
                }) : b.$element.trigger("shown");
            });
        },
        hide: function(b) {
            b && b.preventDefault();
            if (!this.isShown) return;
            var e = this;
            this.isShown = !1, a("body").removeClass("modal-open"), g.call(this), this.$element.trigger("hide").removeClass("in"), a.support.transition && this.$element.hasClass("fade") ? c.call(this) : d.call(this);
        }
    }, a.fn.modal = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("modal"), f = a.extend({}, a.fn.modal.defaults, d.data(), typeof c == "object" && c);
            e || d.data("modal", e = new b(this, f)), typeof c == "string" ? e[c]() : f.show && e.show();
        });
    }, a.fn.modal.defaults = {
        backdrop: !0,
        keyboard: !0,
        show: !0
    }, a.fn.modal.Constructor = b, a(function() {
        a("body").on("click.modal.data-api", '[data-toggle="modal"]', function(b) {
            var c = a(this), d, e = a(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")), f = e.data("modal") ? "toggle" : a.extend({}, e.data(), c.data());
            b.preventDefault(), e.modal(f);
        });
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-modal", function() {}), !function(a) {
    function d() {
        a(b).parent().removeClass("open");
    }
    "use strict";
    var b = '[data-toggle="dropdown"]', c = function(b) {
        var c = a(b).on("click.dropdown.data-api", this.toggle);
        a("html").on("click.dropdown.data-api", function() {
            c.parent().removeClass("open");
        });
    };
    c.prototype = {
        constructor: c,
        toggle: function(b) {
            var c = a(this), e = c.attr("data-target"), f, g;
            return e || (e = c.attr("href"), e = e && e.replace(/.*(?=#[^\s]*$)/, "")), f = a(e), f.length || (f = c.parent()), g = f.hasClass("open"), d(), !g && f.toggleClass("open"), !1;
        }
    }, a.fn.dropdown = function(b) {
        return this.each(function() {
            var d = a(this), e = d.data("dropdown");
            e || d.data("dropdown", e = new c(this)), typeof b == "string" && e[b].call(d);
        });
    }, a.fn.dropdown.Constructor = c, a(function() {
        a("html").on("click.dropdown.data-api", d), a("body").on("click.dropdown.data-api", b, c.prototype.toggle);
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-dropdown", function() {}), !function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.collapse.defaults, c), this.options.parent && (this.$parent = a(this.options.parent)), this.options.toggle && this.toggle();
    };
    b.prototype = {
        constructor: b,
        dimension: function() {
            var a = this.$element.hasClass("width");
            return a ? "width" : "height";
        },
        show: function() {
            var b = this.dimension(), c = a.camelCase([ "scroll", b ].join("-")), d = this.$parent && this.$parent.find(".in"), e;
            d && d.length && (e = d.data("collapse"), d.collapse("hide"), e || d.data("collapse", null)), this.$element[b](0), this.transition("addClass", "show", "shown"), this.$element[b](this.$element[0][c]);
        },
        hide: function() {
            var a = this.dimension();
            this.reset(this.$element[a]()), this.transition("removeClass", "hide", "hidden"), this.$element[a](0);
        },
        reset: function(a) {
            var b = this.dimension();
            this.$element.removeClass("collapse")[b](a || "auto")[0].offsetWidth, this.$element.addClass("collapse");
        },
        transition: function(b, c, d) {
            var e = this, f = function() {
                c == "show" && e.reset(), e.$element.trigger(d);
            };
            this.$element.trigger(c)[b]("in"), a.support.transition && this.$element.hasClass("collapse") ? this.$element.one(a.support.transition.end, f) : f();
        },
        toggle: function() {
            this[this.$element.hasClass("in") ? "hide" : "show"]();
        }
    }, a.fn.collapse = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("collapse"), f = typeof c == "object" && c;
            e || d.data("collapse", e = new b(this, f)), typeof c == "string" && e[c]();
        });
    }, a.fn.collapse.defaults = {
        toggle: !0
    }, a.fn.collapse.Constructor = b, a(function() {
        a("body").on("click.collapse.data-api", "[data-toggle=collapse]", function(b) {
            var c = a(this), d, e = c.attr("data-target") || b.preventDefault() || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, ""), f = a(e).data("collapse") ? "toggle" : c.data();
            a(e).collapse(f);
        });
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-collapse", function() {}), !function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.carousel.defaults, c), this.options.slide && this.slide(this.options.slide);
    };
    b.prototype = {
        cycle: function() {
            return this.interval = setInterval(a.proxy(this.next, this), this.options.interval), this;
        },
        to: function(b) {
            var c = this.$element.find(".active"), d = c.parent().children(), e = d.index(c), f = this;
            if (b > d.length - 1 || b < 0) return;
            return this.sliding ? this.$element.one("slid", function() {
                f.to(b);
            }) : e == b ? this.pause().cycle() : this.slide(b > e ? "next" : "prev", a(d[b]));
        },
        pause: function() {
            return clearInterval(this.interval), this.interval = null, this;
        },
        next: function() {
            if (this.sliding) return;
            return this.slide("next");
        },
        prev: function() {
            if (this.sliding) return;
            return this.slide("prev");
        },
        slide: function(b, c) {
            var d = this.$element.find(".active"), e = c || d[b](), f = this.interval, g = b == "next" ? "left" : "right", h = b == "next" ? "first" : "last", i = this;
            if (!e.length) return;
            return this.sliding = !0, f && this.pause(), e = e.length ? e : this.$element.find(".item")[h](), !a.support.transition && this.$element.hasClass("slide") ? (this.$element.trigger("slide"), d.removeClass("active"), e.addClass("active"), this.sliding = !1, this.$element.trigger("slid")) : (e.addClass(b), e[0].offsetWidth, d.addClass(g), e.addClass(g), this.$element.trigger("slide"), this.$element.one(a.support.transition.end, function() {
                e.removeClass([ b, g ].join(" ")).addClass("active"), d.removeClass([ "active", g ].join(" ")), i.sliding = !1, setTimeout(function() {
                    i.$element.trigger("slid");
                }, 0);
            })), f && this.cycle(), this;
        }
    }, a.fn.carousel = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("carousel"), f = typeof c == "object" && c;
            e || d.data("carousel", e = new b(this, f)), typeof c == "number" ? e.to(c) : typeof c == "string" || (c = f.slide) ? e[c]() : e.cycle();
        });
    }, a.fn.carousel.defaults = {
        interval: 5e3
    }, a.fn.carousel.Constructor = b, a(function() {
        a("body").on("click.carousel.data-api", "[data-slide]", function(b) {
            var c = a(this), d, e = a(c.attr("data-target") || (d = c.attr("href")) && d.replace(/.*(?=#[^\s]+$)/, "")), f = !e.data("modal") && a.extend({}, e.data(), c.data());
            e.carousel(f), b.preventDefault();
        });
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-carousel", function() {}), !function(a) {
    "use strict";
    var b = function(b, c) {
        this.$element = a(b), this.options = a.extend({}, a.fn.button.defaults, c);
    };
    b.prototype = {
        constructor: b,
        setState: function(a) {
            var b = "disabled", c = this.$element, d = c.data(), e = c.is("input") ? "val" : "html";
            a += "Text", d.resetText || c.data("resetText", c[e]()), c[e](d[a] || this.options[a]), setTimeout(function() {
                a == "loadingText" ? c.addClass(b).attr(b, b) : c.removeClass(b).removeAttr(b);
            }, 0);
        },
        toggle: function() {
            var a = this.$element.parent('[data-toggle="buttons-radio"]');
            a && a.find(".active").removeClass("active"), this.$element.toggleClass("active");
        }
    }, a.fn.button = function(c) {
        return this.each(function() {
            var d = a(this), e = d.data("button"), f = typeof c == "object" && c;
            e || d.data("button", e = new b(this, f)), c == "toggle" ? e.toggle() : c && e.setState(c);
        });
    }, a.fn.button.defaults = {
        loadingText: "loading..."
    }, a.fn.button.Constructor = b, a(function() {
        a("body").on("click.button.data-api", "[data-toggle^=button]", function(b) {
            var c = a(b.target);
            c.hasClass("btn") || (c = c.closest(".btn")), c.button("toggle");
        });
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-button", function() {}), !function(a) {
    "use strict";
    var b = '[data-dismiss="alert"]', c = function(c) {
        a(c).on("click", b, this.close);
    };
    c.prototype = {
        constructor: c,
        close: function(b) {
            function f() {
                e.trigger("closed").remove();
            }
            var c = a(this), d = c.attr("data-target"), e;
            d || (d = c.attr("href"), d = d && d.replace(/.*(?=#[^\s]*$)/, "")), e = a(d), e.trigger("close"), b && b.preventDefault(), e.length || (e = c.hasClass("alert") ? c : c.parent()), e.trigger("close").removeClass("in"), a.support.transition && e.hasClass("fade") ? e.on(a.support.transition.end, f) : f();
        }
    }, a.fn.alert = function(b) {
        return this.each(function() {
            var d = a(this), e = d.data("alert");
            e || d.data("alert", e = new c(this)), typeof b == "string" && e[b].call(d);
        });
    }, a.fn.alert.Constructor = c, a(function() {
        a("body").on("click.alert.data-api", b, c.prototype.close);
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-alert", function() {}), !function(a) {
    a(function() {
        "use strict", a.support.transition = function() {
            var b = document.body || document.documentElement, c = b.style, d = c.transition !== undefined || c.WebkitTransition !== undefined || c.MozTransition !== undefined || c.MsTransition !== undefined || c.OTransition !== undefined;
            return d && {
                end: function() {
                    var b = "TransitionEnd";
                    return a.browser.webkit ? b = "webkitTransitionEnd" : a.browser.mozilla ? b = "transitionend" : a.browser.opera && (b = "oTransitionEnd"), b;
                }()
            };
        }();
    });
}(window.jQuery), define("libs/bootstrap/bootstrap-transition", function() {}), !function(a) {
    var b = function(b, d) {
        this.element = a(b), this.format = c.parseFormat(d.format || this.element.data("date-format") || "mm/dd/yyyy"), this.picker = a(c.template).appendTo("body").on({
            click: a.proxy(this.click, this),
            mousedown: a.proxy(this.mousedown, this)
        }), this.isInput = this.element.is("input"), this.component = this.element.is(".date") ? this.element.find(".add-on") : !1, this.isInput ? this.element.on({
            focus: a.proxy(this.show, this),
            blur: a.proxy(this.hide, this),
            keyup: a.proxy(this.update, this)
        }) : this.component ? this.component.on("click", a.proxy(this.show, this)) : this.element.on("click", a.proxy(this.show, this)), this.minViewMode = d.minViewMode || this.element.data("date-minviewmode") || 0;
        if (typeof this.minViewMode == "string") switch (this.minViewMode) {
          case "months":
            this.minViewMode = 1;
            break;
          case "years":
            this.minViewMode = 2;
            break;
          default:
            this.minViewMode = 0;
        }
        this.viewMode = d.viewMode || this.element.data("date-viewmode") || 0;
        if (typeof this.viewMode == "string") switch (this.viewMode) {
          case "months":
            this.viewMode = 1;
            break;
          case "years":
            this.viewMode = 2;
            break;
          default:
            this.viewMode = 0;
        }
        this.startViewMode = this.viewMode, this.weekStart = d.weekStart || this.element.data("date-weekstart") || 0, this.weekEnd = this.weekStart === 0 ? 6 : this.weekStart - 1, this.fillDow(), this.fillMonths(), this.update(), this.showMode();
    };
    b.prototype = {
        constructor: b,
        show: function(b) {
            this.picker.show(), this.height = this.component ? this.component.outerHeight() : this.element.outerHeight(), this.place(), a(window).on("resize", a.proxy(this.place, this)), b && (b.stopPropagation(), b.preventDefault()), this.isInput || a(document).on("mousedown", a.proxy(this.hide, this)), this.element.trigger({
                type: "show",
                date: this.date
            });
        },
        hide: function() {
            this.picker.hide(), a(window).off("resize", this.place), this.viewMode = this.startViewMode, this.showMode(), this.isInput || a(document).off("mousedown", this.hide), this.set(), this.element.trigger({
                type: "hide",
                date: this.date
            });
        },
        set: function() {
            var a = c.formatDate(this.date, this.format);
            this.isInput ? this.element.prop("value", a) : (this.component && this.element.find("input").prop("value", a), this.element.data("date", a));
        },
        setValue: function(a) {
            typeof a == "string" ? this.date = c.parseDate(a, this.format) : this.date = new Date(a), this.set(), this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0), this.fill();
        },
        place: function() {
            var a = this.component ? this.component.offset() : this.element.offset();
            this.picker.css({
                top: a.top + this.height,
                left: a.left
            });
        },
        update: function(a) {
            this.date = c.parseDate(typeof a == "string" ? a : this.isInput ? this.element.prop("value") : this.element.data("date"), this.format), this.viewDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1, 0, 0, 0, 0), this.fill();
        },
        fillDow: function() {
            var a = this.weekStart, b = "<tr>";
            while (a < this.weekStart + 7) b += '<th class="dow">' + c.dates.daysMin[a++ % 7] + "</th>";
            b += "</tr>", this.picker.find(".datepicker-days thead").append(b);
        },
        fillMonths: function() {
            var a = "", b = 0;
            while (b < 12) a += '<span class="month">' + c.dates.monthsShort[b++] + "</span>";
            this.picker.find(".datepicker-months td").append(a);
        },
        fill: function() {
            var a = new Date(this.viewDate), b = a.getFullYear(), d = a.getMonth(), e = this.date.valueOf();
            this.picker.find(".datepicker-days th:eq(1)").text(c.dates.months[d] + " " + b);
            var f = new Date(b, d - 1, 28, 0, 0, 0, 0), g = c.getDaysInMonth(f.getFullYear(), f.getMonth());
            f.setDate(g), f.setDate(g - (f.getDay() - this.weekStart + 7) % 7);
            var h = new Date(f);
            h.setDate(h.getDate() + 42), h = h.valueOf(), html = [];
            var i;
            while (f.valueOf() < h) f.getDay() === this.weekStart && html.push("<tr>"), i = "", f.getMonth() < d ? i += " old" : f.getMonth() > d && (i += " new"), f.valueOf() === e && (i += " active"), html.push('<td class="day' + i + '">' + f.getDate() + "</td>"), f.getDay() === this.weekEnd && html.push("</tr>"), f.setDate(f.getDate() + 1);
            this.picker.find(".datepicker-days tbody").empty().append(html.join(""));
            var j = this.date.getFullYear(), k = this.picker.find(".datepicker-months").find("th:eq(1)").text(b).end().find("span").removeClass("active");
            j === b && k.eq(this.date.getMonth()).addClass("active"), html = "", b = parseInt(b / 10, 10) * 10;
            var l = this.picker.find(".datepicker-years").find("th:eq(1)").text(b + "-" + (b + 9)).end().find("td");
            b -= 1;
            for (var m = -1; m < 11; m++) html += '<span class="year' + (m === -1 || m === 10 ? " old" : "") + (j === b ? " active" : "") + '">' + b + "</span>", b += 1;
            l.html(html);
        },
        click: function(b) {
            b.stopPropagation(), b.preventDefault();
            var d = a(b.target).closest("span, td, th");
            if (d.length === 1) switch (d[0].nodeName.toLowerCase()) {
              case "th":
                switch (d[0].className) {
                  case "switch":
                    this.showMode(1);
                    break;
                  case "prev":
                  case "next":
                    this.viewDate["set" + c.modes[this.viewMode].navFnc].call(this.viewDate, this.viewDate["get" + c.modes[this.viewMode].navFnc].call(this.viewDate) + c.modes[this.viewMode].navStep * (d[0].className === "prev" ? -1 : 1)), this.fill(), this.set();
                }
                break;
              case "span":
                if (d.is(".month")) {
                    var e = d.parent().find("span").index(d);
                    this.viewDate.setMonth(e);
                } else {
                    var f = parseInt(d.text(), 10) || 0;
                    this.viewDate.setFullYear(f);
                }
                this.viewMode !== 0 && (this.date = new Date(this.viewDate), this.element.trigger({
                    type: "changeDate",
                    date: this.date,
                    viewMode: c.modes[this.viewMode].clsName
                })), this.showMode(-1), this.fill(), this.set();
                break;
              case "td":
                if (d.is(".day")) {
                    var g = parseInt(d.text(), 10) || 1, e = this.viewDate.getMonth();
                    d.is(".old") ? e -= 1 : d.is(".new") && (e += 1);
                    var f = this.viewDate.getFullYear();
                    this.date = new Date(f, e, g, 0, 0, 0, 0), this.viewDate = new Date(f, e, Math.min(28, g), 0, 0, 0, 0), this.fill(), this.set(), this.element.trigger({
                        type: "changeDate",
                        date: this.date,
                        viewMode: c.modes[this.viewMode].clsName
                    });
                }
            }
        },
        mousedown: function(a) {
            a.stopPropagation(), a.preventDefault();
        },
        showMode: function(a) {
            a && (this.viewMode = Math.max(this.minViewMode, Math.min(2, this.viewMode + a))), this.picker.find(">div").hide().filter(".datepicker-" + c.modes[this.viewMode].clsName).show();
        }
    }, a.fn.datepicker = function(c, d) {
        return this.each(function() {
            var e = a(this), f = e.data("datepicker"), g = typeof c == "object" && c;
            f || e.data("datepicker", f = new b(this, a.extend({}, a.fn.datepicker.defaults, g))), typeof c == "string" && f[c](d);
        });
    }, a.fn.datepicker.defaults = {}, a.fn.datepicker.Constructor = b;
    var c = {
        modes: [ {
            clsName: "days",
            navFnc: "Month",
            navStep: 1
        }, {
            clsName: "months",
            navFnc: "FullYear",
            navStep: 1
        }, {
            clsName: "years",
            navFnc: "FullYear",
            navStep: 10
        } ],
        dates: {
            days: [ "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ],
            daysShort: [ "Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun" ],
            daysMin: [ "Su", "Mo", "Tu", "We", "Th", "Fr", "Sa", "Su" ],
            months: [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
            monthsShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
        },
        isLeapYear: function(a) {
            return a % 4 === 0 && a % 100 !== 0 || a % 400 === 0;
        },
        getDaysInMonth: function(a, b) {
            return [ 31, c.isLeapYear(a) ? 29 : 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31 ][b];
        },
        parseFormat: function(a) {
            var b = a.match(/[.\/\-\s].*?/), c = a.split(/\W+/);
            if (!b || !c || c.length === 0) throw new Error("Invalid date format.");
            return {
                separator: b,
                parts: c
            };
        },
        parseDate: function(a, b) {
            var c = a.split(b.separator), a = new Date, d;
            a.setHours(0), a.setMinutes(0), a.setSeconds(0), a.setMilliseconds(0);
            if (c.length === b.parts.length) for (var e = 0, f = b.parts.length; e < f; e++) {
                d = parseInt(c[e], 10) || 1;
                switch (b.parts[e]) {
                  case "dd":
                  case "d":
                    a.setDate(d);
                    break;
                  case "mm":
                  case "m":
                    a.setMonth(d - 1);
                    break;
                  case "yy":
                    a.setFullYear(2e3 + d);
                    break;
                  case "yyyy":
                    a.setFullYear(d);
                }
            }
            return a;
        },
        formatDate: function(a, b) {
            var c = {
                d: a.getDate(),
                m: a.getMonth() + 1,
                yy: a.getFullYear().toString().substring(2),
                yyyy: a.getFullYear()
            };
            c.dd = (c.d < 10 ? "0" : "") + c.d, c.mm = (c.m < 10 ? "0" : "") + c.m;
            var a = [];
            for (var d = 0, e = b.parts.length; d < e; d++) a.push(c[b.parts[d]]);
            return a.join(b.separator);
        },
        headTemplate: '<thead><tr><th class="prev">&lsaquo;</th><th colspan="5" class="switch"></th><th class="next">&rsaquo;</th></tr></thead>',
        contTemplate: '<tbody><tr><td colspan="7"></td></tr></tbody>'
    };
    c.template = '<div class="datepicker dropdown-menu"><div class="datepicker-days"><table class=" table-condensed">' + c.headTemplate + "<tbody></tbody>" + "</table>" + "</div>" + '<div class="datepicker-months">' + '<table class="table-condensed">' + c.headTemplate + c.contTemplate + "</table>" + "</div>" + '<div class="datepicker-years">' + '<table class="table-condensed">' + c.headTemplate + c.contTemplate + "</table>" + "</div>" + "</div>";
}(window.jQuery), define("libs/bootstrap/bootstrap-datepicker", function() {}), define("loader", [ "order!libs/jquery/jquery", "order!libs/jquery/jlayout.border", "order!libs/jquery/jquery.jlayout", "order!libs/jquery/jquery.ui.totop", "order!libs/jquery/jquery.easing", "order!libs/jquery/jquery.hashchange.min", "order!libs/jquery/jquery.drilldownmenu", "order!libs/underscore/underscore", "order!libs/backbone/backbone", "order!libs/bootstrap/bootstrap-typeahead", "order!libs/bootstrap/bootstrap-tab", "order!libs/bootstrap/bootstrap-tooltip", "order!libs/bootstrap/bootstrap-scrollspy", "order!libs/bootstrap/bootstrap-popover", "order!libs/bootstrap/bootstrap-modal", "order!libs/bootstrap/bootstrap-dropdown", "order!libs/bootstrap/bootstrap-collapse", "order!libs/bootstrap/bootstrap-carousel", "order!libs/bootstrap/bootstrap-button", "order!libs/bootstrap/bootstrap-alert", "order!libs/bootstrap/bootstrap-transition", "order!libs/bootstrap/bootstrap-datepicker" ], function() {
    return {
        Backbone: Backbone.noConflict(),
        _: _.noConflict(),
        $: jQuery.noConflict()
    };
}), define("jQuery", [ "loader" ], function(a) {
    return a.$;
}), define("Underscore", [ "loader" ], function(a) {
    return a._;
}), define("Backbone", [ "loader" ], function(a) {
    return a.Backbone;
}), define("models/home", [ "Underscore", "Backbone" ], function(a, b) {
    var c = b.Model.extend({
        defaults: {
            default_data: "ok"
        },
        initialize: function() {}
    });
    return c;
}), define("collections/home", [ "jQuery", "Underscore", "Backbone", "models/home" ], function(a, b, c, d) {
    var e = c.Collection.extend({
        model: d,
        initialize: function() {}
    });
    return new e;
}), function() {
    var a = [ "Msxml2.XMLHTTP", "Microsoft.XMLHTTP", "Msxml2.XMLHTTP.4.0" ], b = /^\s*<\?xml(\s)+version=[\'\"](\d)*.(\d)*[\'\"](\s)*\?>/im, c = /<body[^>]*>\s*([\s\S]+)\s*<\/body>/im, d = typeof location != "undefined" && location.href, e = d && location.protocol && location.protocol.replace(/\:/, ""), f = d && location.hostname, g = d && (location.port || undefined), h = [];
    define("text", [], function() {
        var i, j, k;
        return typeof window != "undefined" && window.navigator && window.document ? j = function(a, b) {
            var c = i.createXhr();
            c.open("GET", a, !0), c.onreadystatechange = function(a) {
                c.readyState === 4 && b(c.responseText);
            }, c.send(null);
        } : typeof process != "undefined" && process.versions && !!process.versions.node ? (k = require.nodeRequire("fs"), j = function(a, b) {
            b(k.readFileSync(a, "utf8"));
        }) : typeof Packages != "undefined" && (j = function(a, b) {
            var c = "utf-8", d = new java.io.File(a), e = java.lang.System.getProperty("line.separator"), f = new java.io.BufferedReader(new java.io.InputStreamReader(new java.io.FileInputStream(d), c)), g, h, i = "";
            try {
                g = new java.lang.StringBuffer, h = f.readLine(), h && h.length() && h.charAt(0) === 65279 && (h = h.substring(1)), g.append(h);
                while ((h = f.readLine()) !== null) g.append(e), g.append(h);
                i = String(g.toString());
            } finally {
                f.close();
            }
            b(i);
        }), i = {
            version: "1.0.2",
            strip: function(a) {
                if (a) {
                    a = a.replace(b, "");
                    var d = a.match(c);
                    d && (a = d[1]);
                } else a = "";
                return a;
            },
            jsEscape: function(a) {
                return a.replace(/(['\\])/g, "\\$1").replace(/[\f]/g, "\\f").replace(/[\b]/g, "\\b").replace(/[\n]/g, "\\n").replace(/[\t]/g, "\\t").replace(/[\r]/g, "\\r");
            },
            createXhr: function() {
                var b, c, d;
                if (typeof XMLHttpRequest != "undefined") return new XMLHttpRequest;
                for (c = 0; c < 3; c++) {
                    d = a[c];
                    try {
                        b = new ActiveXObject(d);
                    } catch (e) {}
                    if (b) {
                        a = [ d ];
                        break;
                    }
                }
                if (!b) throw new Error("createXhr(): XMLHttpRequest not available");
                return b;
            },
            get: j,
            parseName: function(a) {
                var b = !1, c = a.indexOf("."), d = a.substring(0, c), e = a.substring(c + 1, a.length);
                return c = e.indexOf("!"), c !== -1 && (b = e.substring(c + 1, e.length), b = b === "strip", e = e.substring(0, c)), {
                    moduleName: d,
                    ext: e,
                    strip: b
                };
            },
            xdRegExp: /^((\w+)\:)?\/\/([^\/\\]+)/,
            useXhr: function(a, b, c, d) {
                var e = i.xdRegExp.exec(a), f, g, h;
                return e ? (f = e[2], g = e[3], g = g.split(":"), h = g[1], g = g[0], (!f || f === b) && (!g || g === c) && (!h && !g || h === d)) : !0;
            },
            finishLoad: function(a, b, c, d, e) {
                c = b ? i.strip(c) : c, e.isBuild && (h[a] = c), d(c);
            },
            load: function(a, b, c, h) {
                if (h.isBuild && !h.inlineText) {
                    c();
                    return;
                }
                var j = i.parseName(a), k = j.moduleName + "." + j.ext, l = b.toUrl(k), m = h && h.text && h.text.useXhr || i.useXhr;
                !d || m(l, e, f, g) ? i.get(l, function(b) {
                    i.finishLoad(a, j.strip, b, c, h);
                }) : b([ k ], function(a) {
                    i.finishLoad(j.moduleName + "." + j.ext, j.strip, a, c, h);
                });
            },
            write: function(a, b, c, d) {
                if (b in h) {
                    var e = i.jsEscape(h[b]);
                    c.asModule(a + "!" + b, "define(function () { return '" + e + "';});\n");
                }
            },
            writeFile: function(a, b, c, d, e) {
                var f = i.parseName(b), g = f.moduleName + "." + f.ext, h = c.toUrl(f.moduleName + "." + f.ext) + ".js";
                i.load(g, c, function(b) {
                    var c = function(a) {
                        return d(h, a);
                    };
                    c.asModule = function(a, b) {
                        return d.asModule(a, h, b);
                    }, i.write(a, g, c, e);
                }, e);
            }
        }, i;
    });
}(), define("text!templates/home/main.html", [], function() {
    return 'Welcome to the Modular Backbone homepage.\r\n\r\n<ul>\r\n  <% _.each(arr, function(row){ %>\r\n   <li><%= row.get("name") %> - <%= row.get("score") %> - <%= row.get("default_data") %></li> \r\n  <% }); %>\r\n</ul>\r\n';
}), define("views/home/main", [ "jQuery", "Underscore", "Backbone", "collections/home", "text!templates/home/main.html" ], function(a, b, c, d, e) {
    var f = c.View.extend({
        el: a("#main-content"),
        initialize: function() {
            this.collection = d, this.collection.bind("add", this.exampleBind), this.collection = d.add({
                name: "Twitter"
            }), this.collection = d.add({
                name: "Facebook",
                score: 20
            }), this.relayout(), a().UItoTop({
                easingType: "easeOutQuart"
            }), a(".show-menubar").click(function() {
                var b = a("#left_menu").width();
                a(this).hasClass("hide1") ? (a(this).removeClass("hide1"), a("#center_content").animate({
                    "margin-left": b
                }, "slow"), a("#left_menu").animate({
                    left: "0"
                }, "slow")) : (a(this).addClass("hide1"), a("#left_menu").animate({
                    left: -b
                }, "slow"), a("#center_content").animate({
                    "margin-left": "0"
                }, "slow"));
            });
            var b = a(".current");
            a("#wrapper > section > aside > nav").length && a("#wrapper > section > aside > nav").each(function() {
                var b = a(this);
                a(this).drillDownMenu();
            }), location.hash || b.addClass("current");
        },
        relayout: function() {
            var b = a(".layout");
            b.layout({
                resize: !1
            });
            var c = a(".layout").css("width"), d = a("#left_menu").css("width");
            a(".center").css("margin-left", d);
        },
        exampleBind: function(a) {},
        render: function(a) {
            var c = {
                arr: this.collection.models,
                _: b
            }, d = b.template(e, c);
            a(d, function() {});
        }
    });
    return new f;
}), define("models/options", [ "Underscore", "Backbone" ], function(a, b) {
    var c = b.Model.extend({
        defaults: {
            continue_enable: "0",
            auto_get_content: "0",
            download_twitter_enable: "0",
            download_twitter_tabs: "",
            download_twitter_ports: "",
            download_twitter_cdate: "",
            download_oschina_enable: "0",
            download_oschina_tabs: "",
            download_oschina_ports: "",
            download_oschina_cdate: "",
            go2simple_weibo_enable: "0",
            go2simple_weibo_tabs: "",
            go2simple_weibo_ports: "",
            go2simple_weibo_cdate: "",
            tool_route: "",
            time_up: "0"
        },
        store: function(a, b) {
            var c = {};
            localStorage.options ? c = JSON.parse(localStorage.options) || {} : localStorage.setItem("options", "{}"), c[a] = b, this.set(a, b), localStorage.options ? localStorage.options = JSON.stringify(c) : console.log(JSON.stringify(c));
        },
        initialize: function() {
            var a = {
                continue_enable: 1,
                auto_get_content: "1",
                download_twitter_enable: "1",
                download_oschina_enable: "1",
                go2simple_weibo_enable: "1"
            };
            localStorage.options && (a = JSON.parse(localStorage.options) || {});
            for (var b in a) this.has(b) && this.set(b, a[b]);
        }
    });
    return c;
});

var home_optionsTemplate = function(obj) {
    var __p = "", print = function() {
        __p += Array.prototype.join.call(arguments, "");
    };
    with (obj || {}) __p += '\n    \t<div class="container_12 leading">\n\t\t<section class="portlet">\n\t\t\t<header>\n\t\t\t\t<h2>设置参数</h2>\n\t\t\t</header>\n\t\t\t<section>\n\t\t    \t\t<form id="sc_form" class="form-horizontal">\n\t\t    \t\t\t<fieldset>\n\t\t\t\t\t\t<legend>公共参数</legend>\n\t\t\t\t\t\t<div class="row-fluid">\n\t\t\t\t\t\t\t<div class="control-group span6">\n\t\t\t\t\t\t\t\t<label class="control-label" for="continue_enable">开启</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<label class="checkbox">\n\t\t\t\t\t\t\t\t\t<input type="checkbox" id="continue_enable" name="continue_enable" value="1" ', options.continue_enable == 1 ? print('checked="true"') : 0, __p += ' />是否继续启用当前所有配置\n\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="control-group span6">\n\t\t\t\t\t\t\t\t<label class="control-label" for="auto_get_content">手动采集页面数据</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<label class="checkbox">\n\t\t\t\t\t\t\t\t\t<input type="checkbox" id="auto_get_content" name="auto_get_content" value="1" ', options.auto_get_content == 1 ? print('checked="true"') : 0, __p += ' />是否启用手动输入xpath来采集数据\n\t\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="control-group span6">\n\t\t\t\t\t\t\t\t<label class="control-label" for="tool_route">选择Chrome小工具</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<select id="tool_route" name="tool_route">\n\t\t\t\t\t\t\t\t\t\t<option>请选择</option>\n\t\t\t\t\t\t\t\t\t\t<option ', options.tool_route == "taobaoTopView_1" ? print('selected="true"') : "", __p += " >taobaoTopView_1</option>\n\t\t\t\t\t\t\t\t\t\t<option ", options.tool_route == "alexaTopView_1" ? print('selected="true"') : "", __p += ' >alexaTopView_1</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="control-group span6">\n\t\t\t\t\t\t\t\t<label class="control-label" for="time_up">闹钟</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<input type="text" id="time_up" name="time_up" value="', print(parseInt(options.time_up)), __p += '" style="width:50px" />\n\t\t\t\t\t\t\t\t\t<a id="set_time_up" class="btn btn-success" href="javascript:void(0);">设置时间(分钟)</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="row-fluid">\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label" for="tabs_route">页面标签选择</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<select id="tabs_route" name="tabs_route">\n\t\t\t\t\t\t\t\t\t\t<option selected="selected">download_twitter_tabs</option>\n\t\t\t\t\t\t\t\t\t\t<option>download_oschina_tabs</option>\n\t\t\t\t\t\t\t\t\t\t<option>go2simple_weibo_tabs</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t<input type="text" id="tab_filter_url" name="tab_filter_url" value="" />\n\t\t\t\t\t\t\t\t\t<a id="get_tabs" class="btn btn-success" href="javascript:void(0);">查询</a>\n\t\t\t\t\t\t\t\t\t<a id="get_tabs2" class="btn btn-success" href="javascript:void(0);">打开</a>\n\t\t\t\t\t\t\t\t\t<span class="help-inline" id="tabs"></span>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="row-fluid">\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label" for="ports_route">数据端口选择</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<select id="ports_route" name="ports_route">\n\t\t\t\t\t\t\t\t\t\t<option>download_twitter_ports</option>\n\t\t\t\t\t\t\t\t\t\t<option>download_oschina_ports</option>\n\t\t\t\t\t\t\t\t\t\t<option>go2simple_weibo_ports</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t<input type="text" id="ports_zmq" name="ports_zmq" value="5500,5501" />\n\t\t\t\t\t\t\t\t\t<a id="get_ports" class="btn btn-success" href="javascript:void(0);">设置</a>\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="row-fluid">\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label" for="cdate_route">设置时间</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<select id="cdate_route" name="cdate_route">\n\t\t\t\t\t\t\t\t\t\t<option>download_twitter_cdate</option>\n\t\t\t\t\t\t\t\t\t\t<option>download_oschina_cdate</option>\n\t\t\t\t\t\t\t\t\t\t<option>go2simple_weibo_cdate</option>\n\t\t\t\t\t\t\t\t\t</select>\n\t\t\t\t\t\t\t\t\t<input type="text" id="cdate" name="cdate" value="2012/03/01" />\n\t\t\t\t\t\t\t\t\t<a id="get_cdate" class="btn btn-success" href="javascript:void(0);">设置</a>\t\t\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\n\n\t\t\t\t\t</fieldset>\n\t\t\t\t\t<fieldset>\n\t\t\t\t\t\t<legend>个性参数</legend>\n\t\t\t\t\t\t<div class="row-fluid">\n\t\t\t\t\t\t\t<table class="table table-bordered">\n\t\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t\t  <tr>\n\t\t\t\t\t\t\t\t\t  \t<th>#</th>\n\t\t\t\t\t\t\t\t\t  \t<th>操作名称</th>\n\t\t\t\t\t\t\t\t\t    \t<th>是否开启</th>\n\t\t\t\t\t\t\t\t\t    \t<th>备注</th>\n\t\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t\t  <tr>\n\t\t\t\t\t\t\t\t\t    \t<td rowspan="3">微博</td>\n\t\t\t\t\t\t\t\t\t    \t<td>新浪个人微博</td>\n\t\t\t\t\t\t\t\t\t    \t<td><input type="checkbox" id="download_twitter_enable" name="download_twitter_enable" value="1" ', options.download_twitter_enable == 1 ? print('checked="true"') : 0, __p += ' /></td>\n\t\t\t\t\t\t\t\t\t    \t<td><span id="download_twitter_tabs_url">http://weibo.com/</span></td>\n\t\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t\t\t\t  <tr>\n\t\t\t\t\t\t\t\t\t    \t<td>新浪企业微博</td>\n\t\t\t\t\t\t\t\t\t    \t<td></td>\n\t\t\t\t\t\t\t\t\t    \t<td>http://weibo.com/</td>\n\t\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t\t\t\t  <tr>\n\t\t\t\t\t\t\t\t\t    \t<td>go2simple新浪微博</td>\n\t\t\t\t\t\t\t\t\t    \t<td><input type="checkbox" id="go2simple_weibo_enable" name="go2simple_weibo_enable" value="1" ', options.go2simple_weibo_enable == 1 ? print('checked="true"') : 0, __p += ' /></td>\n\t\t\t\t\t\t\t\t\t    \t<td><span id="go2simple_weibo_tabs_url">http://weibo.com/1826787742/follow</span></td>\n\t\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t\t\t\t  <tr>\n\t\t\t\t\t\t\t\t\t    \t<td>开源中国</td>\n\t\t\t\t\t\t\t\t\t    \t<td>最新资讯</td>\n\t\t\t\t\t\t\t\t\t    \t<td><input type="checkbox" id="download_oschina_enable" name="download_oschina_enable" value="1" ', options.download_oschina_enable == 1 ? print('checked="true"') : 0, __p += ' /></td>\n\t\t\t\t\t\t\t\t\t    \t<td><span id="download_oschina_tabs_url">http://www.oschina.net/news/list<span></td>\n\t\t\t\t\t\t\t\t\t  </tr>\n\n\t\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t\t</table>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</fieldset>\n\t\t\t\t</form>\n\t\t\t\t<form class="form-horizontal">\n\t\t\t\t\t<fieldset>\n\t\t\t\t\t\t<legend>其他</legend>\n\t\t\t\t\t\t<div class="row-fluid">\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label" for="cookies_url">导出指定Cookies</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<input type="text" id="cookies_url" name="cookies_url" value="" />\n\t\t\t\t\t\t\t\t\t<a id="get_cookies" class="btn btn-success" href="javascript:void(0);">导出</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label">清空或显示临时数据</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<a id="clear_temp_data" class="btn btn-success" href="javascript:void(0);">清空</a>\n\t\t\t\t\t\t\t\t\t<a id="show_temp_data" class="btn btn-success" href="javascript:void(0);">显示</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label" for="short_url">获取新浪短地址</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<input type="text" id="short_url" name="short_url" value="" />\n\t\t\t\t\t\t\t\t\t<a id="get_short_url" class="btn btn-success" href="javascript:void(0);">获取</a>\n\t\t\t\t\t\t\t\t\t<p class="help-block" id="short_url_result"></p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label" for="short_url">获取淘宝买家信用</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<input type="text" id="taobao_nick" name="taobao_nick" value="" />\n\t\t\t\t\t\t\t\t\t<a id="get_taobao_rate" class="btn btn-success" href="javascript:void(0);">获取</a>\n\t\t\t\t\t\t\t\t\t<p class="help-block" id="taobao_rate_result"></p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</fieldset>\n\t\t\t\t</form>\n\t\t\t\t\n\t\t\t\t<form class="form-horizontal">\n\t\t\t\t\t<fieldset>\n\t\t\t\t\t\t<legend>消息通知设置</legend>\n\t\t\t\t\t\t<div class="row-fluid">\t\t\t\t\t\t\t\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label" for="notice_content">测试内容</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<input type="text" id="notice_content" name="notice_content" value="" />\n\t\t\t\t\t\t\t\t\t<a id="send_notice_content" class="btn btn-success" href="javascript:void(0);">发送</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="control-group span6">\n\t\t\t\t\t\t\t\t<label class="control-label" for="phantom_url">网址</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<input type="text" id="phantom_url" name="phantom_url" value=\'', print(options.phantomjs_url), __p += '\' />\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t<div class="control-group span6">\n\t\t\t\t\t\t\t\t<label class="control-label" for="phantom_opt">参数</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<input type="text" id="phantom_opt" name="phantom_opt" value=\'', print(options.phantomjs_opt), __p += '\' />\n\t\t\t\t\t\t\t\t\t<a id="run_phantom" class="btn btn-success" href="javascript:void(0);">确定</a>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</fieldset>\n\t\t\t\t</form>\n\n\t\t\t</section>\n\t\t</section>\n\t</div>\n\n\n';
    return __p;
};

define("templates/home/options.compiled", function() {}), define("views/home/options", [ "jQuery", "Underscore", "Backbone", "models/options", "templates/home/options.compiled" ], function(a, b, c, d) {
    var e = c.View.extend({
        el: "",
        initialize: function() {
            this.model = new d;
        },
        bindEvents: function() {
            _this = this, _this.el = a("#sc_form"), _this.el.bind("change", function(a) {
                _this.changed(a.target.id);
            }), a("#tab_filter_url").val(a("#" + a("#tabs_route").val() + "_url").text()), a("#tabs_route").bind("change", function(b) {
                a("#tab_filter_url").val(a("#" + a("#tabs_route").val() + "_url").text());
            }), a("#get_tabs").bind("click", function() {
                _this.setTabs();
            }), a("#get_tabs2").bind("click", function() {
                _this.setTabs2();
            }), a("#get_ports").bind("click", function() {
                _this.setPorts();
            }), a("#get_cdate").bind("click", function() {
                _this.setCdate();
            }), a("#get_cookies").bind("click", function() {
                _this.getCookies();
            }), a("#clear_temp_data").bind("click", function() {
                typeof chrome != "undefined" && (chrome.extension.sendRequest({
                    type: "set_temp_data",
                    temp_data: []
                }, function(a) {
                    console.log(a.result);
                }), chrome.extension.sendRequest({
                    type: "set_temp_flag",
                    temp_flag: "0"
                }, function(a) {
                    console.log(a.result);
                }), chrome.extension.sendRequest({
                    type: "set_mem_phantomjs_opt",
                    url: ""
                }, function(a) {}));
            }), a("#show_temp_data").bind("click", function() {
                typeof chrome != "undefined" && (chrome.extension.sendRequest({
                    type: "get_temp_data"
                }, function(a) {
                    console.log("temp_data:" + a.result.length), console.log(a.result);
                }), chrome.extension.sendRequest({
                    type: "get_temp_flag"
                }, function(a) {
                    console.log("temp_flag:" + a.result);
                }));
            }), a("#get_short_url").bind("click", function() {
                a.ajax({
                    url: "http://127.0.0.1/taobaoke/sinaurl.php",
                    type: "POST",
                    data: {
                        url: a("#short_url").val()
                    },
                    dataType: "html",
                    success: function(b) {
                        a("#short_url_result").html(b);
                    }
                });
            }), a("#set_time_up").bind("click", function() {
                chrome.extension.sendRequest({
                    type: "set_time_up"
                }, function() {});
            }), a("#send_notice_content").bind("click", function() {
                chrome.extension.sendRequest({
                    type: "notice",
                    title: "通知标题",
                    msg: a("#notice_content").val()
                }, function(a) {
                    console.log("content sent!");
                });
            }), a("#run_phantom").bind("click", function() {
                var b = {};
                b.url = JSON.parse(a("#phantom_url").val()), b.option = JSON.parse(a("#phantom_opt").val()), chrome.extension.sendRequest({
                    type: "phantom",
                    opt: b
                }, function(a) {
                    console.log("result:" + a.result);
                });
            }), a("#get_taobao_rate").bind("click", function() {
                chrome.extension.sendRequest({
                    type: "taobao",
                    act: "get_rate",
                    nick: a("#taobao_nick").val()
                }, function(a) {
                    console.log("result:" + a.result);
                });
            });
        },
        setTabs: function() {
            typeof chrome != "undefined" && (_this = this, chrome.windows.getCurrent(function(b) {
                chrome.tabs.getAllInWindow(b.id, function(b) {
                    var c = [], d = "";
                    for (var e = 0; e < b.length; e++) b[e].url.indexOf(a("#tab_filter_url").val()) != -1 && (c[c.length] = b[e].id, d = d + b[e].id + ",");
                    a("#tabs").html(d), a("#tabs_route").val() != "" && _this.model.store(a("#tabs_route").val(), c);
                });
            }));
        },
        setTabs2: function() {
            typeof chrome != "undefined" && (_this = this, chrome.tabs.create({
                url: a("#tab_filter_url").val(),
                selected: !1
            }, function(b) {
                var c = [];
                c[c.length] = b.id, a("#tabs_route").val() != "" && _this.model.store(a("#tabs_route").val(), c);
            }));
        },
        setPorts: function() {
            var b = [], c = a("#ports_zmq").val().split(",");
            for (var d = 0; d < c.length; d++) c[d] != "" && (b[b.length] = c[d]);
            a("#ports_route").val() != "" && this.model.store(a("#ports_route").val(), b);
        },
        setCdate: function() {
            var b = a("#cdate").val();
            a("#cdate_route").val() != "" && this.model.store(a("#cdate_route").val(), b);
        },
        getCookies: function() {
            url = a("#cookies_url").val(), url != "" && (server = url.match(/:\/\/(.[^/:#?]+)/)[1], parts = server.split("."), domain = parts[parts.length - 2] + "." + parts[parts.length - 1], typeof chrome != "undefined" && chrome.cookies.getAll({}, function(a) {
                var b = "";
                b += "[" + domain + "]\n";
                for (var c in a) cookie = a[c], cookie.domain.indexOf(domain) != -1 && (b += cookie.name + "=" + cookie.value + "\n");
                console.log(b), chrome.extension.sendRequest({
                    type: "send_cookies",
                    data: b
                }, function(a) {});
            }));
        },
        changed: function(a) {
            var b = this.el.serialize().split("&"), c = {};
            for (var d = 0, e = b.length; d < e; d++) {
                var f = b[d].split("=");
                c[f[0]] = unescape(f[1]);
            }
            var g = !1;
            for (var h in c) h == a && this.model.has(h) && (this.model.store(h, c[h]), g = !0);
            g || this.model.store(a, this.model.defaults[a]), console.log(JSON.stringify(this.model.attributes));
        },
        render: function(a) {
            _this = this;
            var b = _this.model.attributes;
            chrome.extension.sendRequest({
                type: "get_mem_phantomjs_opt"
            }, function(c) {
                var d = c.result;
                d != "" ? (b.phantomjs_url = JSON.stringify(d.url), b.phantomjs_opt = JSON.stringify(d.opt.option)) : (b.phantomjs_url = '["http://www.baidu.com"]', b.phantomjs_opt = '{"port":"9080","route":"other.tool","type":"action","result_type":"file","actions":[{"action":"auto_get_content","row_xpath":"//title","cols":"","attr":"textContent"},{"action":"auto_click","xpath":"//p[@id=\'nv\']/a[3]"}]}'), b.phantomjs_url = b.phantomjs_url.replace(/\'/g, "&#039;"), b.phantomjs_opt = b.phantomjs_opt.replace(/\'/g, "&#039;");
                var e = home_optionsTemplate({
                    options: b
                });
                a(e, function() {
                    _this.bindEvents();
                });
            });
        }
    });
    return new e;
}), define("models/log", [ "Underscore", "Backbone" ], function(a, b) {
    var c = b.Model.extend({
        initialize: function() {}
    });
    return c;
}), define("collections/log", [ "jQuery", "Underscore", "Backbone", "models/log" ], function(a, b, c, d) {
    var e = c.Collection.extend({
        url: "http://127.0.0.1/slim/feeds",
        model: d,
        findLog: function(a, b) {
            var c = this, d = "";
            typeof b != "undefined" && (d += " AND url_title='" + b + "'"), typeof chrome.extension != "undefined" ? chrome.extension.sendRequest({
                type: "read",
                sql: "SELECT * FROM home_logs WHERE state=1 AND content like '%" + a + "%'  " + d + " order by id desc LIMIT 0,30 "
            }, function(a) {
                var b = a.data;
                c.reset(b), c.trigger("find");
            }) : c.trigger("find");
        },
        filterLog: function(a, b) {
            var c = this, d = "";
            typeof b != "undefined" && (d += " AND url_title='" + b + "'");
            if (typeof chrome.extension != "undefined") {
                var e = this.getTime();
                chrome.extension.sendRequest({
                    type: "read",
                    sql: "UPDATE home_logs SET state=-1,mdate='" + e + "' WHERE state=1 AND content like '%" + a + "%' " + d + " "
                }, function(a) {
                    chrome.extension.sendRequest({
                        type: "read",
                        sql: "SELECT * FROM home_logs WHERE state=1 " + d + " order by id desc LIMIT 0,30"
                    }, function(a) {
                        var b = a.data;
                        c.reset(b), c.trigger("find");
                    });
                });
            }
        },
        getLogs: function(a) {
            var b = this, c = "0,30", d = "init";
            typeof a != "undefined" && (c = a + ",30", d = "find"), typeof chrome.extension != "undefined" ? chrome.extension.sendRequest({
                type: "read",
                sql: "SELECT * FROM home_logs WHERE state=1 order by id desc LIMIT " + c
            }, function(a) {
                var c = a.data;
                b.reset(c), b.trigger(d);
            }) : b.trigger(d);
        },
        updateLog: function(a) {
            if (typeof chrome.extension != "undefined") {
                var b = a.length, c = this.getTime();
                for (var d = 0; d < b; d++) chrome.extension.sendRequest({
                    type: "exec",
                    sql: "UPDATE home_logs SET state=-1,mdate='" + c + "' WHERE id='" + a[d] + "'"
                }, function(a) {});
            }
            var e = this;
        },
        fillZero: function(a) {
            return a < 10 && (a = "0" + a), a;
        },
        getTime: function() {
            var a = new Date, b = a.getFullYear() + "-" + this.fillZero(a.getMonth() + 1) + "-" + this.fillZero(a.getDate()) + " " + this.fillZero(a.getHours()) + ":" + this.fillZero(a.getMinutes()) + ":" + this.fillZero(a.getSeconds());
            return b;
        },
        initialize: function() {}
    });
    return new e;
});

var home_logTemplate = function(obj) {
    var __p = "", print = function() {
        __p += Array.prototype.join.call(arguments, "");
    };
    with (obj || {}) __p += '\n    \t<div class="container_12 leading">\n\t\t<section class="portlet">\n\t\t\t<header>\n\t\t\t\t<h2>日志记录</h2>\n\t\t\t</header>\n\t\t\t<section>\n\t    \t\t<div class="row-fluid">\n\t    \t\t\t<div class="well">\n\t    \t\t\t\t<input id="query_text" type="text" class="input-medium search-query" placeholder="输入关键字">\n\t\t\t\t\t\t<select id="searchtype" class="span1 btn input-small">\n\t\t\t\t\t\t  <option value="1">查询</option>\n\t\t\t\t\t\t  <option value="2">过滤</option>\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<select id="source" class="span1 btn input-small">\n\t\t\t\t\t\t  ' + source + '\n\t\t\t\t\t\t</select>\n\t\t\t\t\t\t<button id="gosubmit" class="btn" type="button">提交</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t\t<form id="sc_form">\n\t\t\t\t\t\t<table id="table_result" class="table table-bordered">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t  <tr>\n\t\t\t\t\t\t\t\t  \t<th width="10%"><input type="checkbox" id="checkall" />全选</th>\n\t\t\t\t\t\t\t\t  \t<th width="65%">内容</th>\n\t\t\t\t\t\t\t\t  \t<th width="10%">类型</th>\n\t\t\t\t\t\t\t    \t<th width="15%">时间</th>\n\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t' + content + '\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t\t<div class="well">\n\t\t\t\t\t\t\t<button id="act_del" class="btn" type="button">删除</button>\n\t\t\t\t\t\t\t<input id="cur_page" type="hidden" value="1" >\n\t\t\t\t\t\t\t<ul class="pager">\n\t\t\t\t\t\t\t  <li><a id="previous">上一页</a></li>\n\t\t\t\t\t\t\t  <li><a id="next">下一页</a></li>\n\t\t\t\t\t\t\t</ul>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</div>\n\n\t\t\t</section>\n\t\t</section>\n\t</div>\n\n\n';
    return __p;
};

define("templates/home/log.compiled", function() {});

var home_logItemTemplate = function(obj) {
    var __p = "", print = function() {
        __p += Array.prototype.join.call(arguments, "");
    };
    with (obj || {}) __p += '\n\t\t\t\t\t\t\t\t  <tr id="tr_' + row.id + '">\n\t\t\t\t\t\t\t\t    \t<td><input type="checkbox" value="' + row.id + '" name="logs" /></td>\n\t\t\t\t\t\t\t\t    \t<td><a target="_blank" href="' + row.url + '">' + row.content + '</a></td>\n\t\t\t\t\t\t\t\t    \t<td><a target="_blank" href="' + row.url + '">' + row.url_title + "</a></td>\n\t\t\t\t\t\t\t\t    \t<td>" + row.cdate + "</td>\n\t\t\t\t\t\t\t\t  </tr>\n\n";
    return __p;
};

define("templates/home/logitem.compiled", function() {}), define("views/home/log", [ "jQuery", "Underscore", "Backbone", "collections/log", "templates/home/log.compiled", "templates/home/logitem.compiled" ], function(a, b, c, d) {
    var e = c.View.extend({
        el: "",
        fn: "",
        initialize: function() {
            this.collection = d, this.collection = d.add({
                id: 1,
                content: "Facebook",
                cdate: 20,
                url: 123,
                img: ""
            }), this.collection.bind("init", this.getData, this), this.collection.bind("find", this.getDataBySearch, this), this.collection.bind("update", this.collection.getLogs, this);
        },
        bindEvents: function() {
            _this = this, _this.el = a("#sc_form"), a("#previous").bind("click", function() {
                var b = a("#cur_page").val(), c = Number(b) - 1;
                c = c < 1 ? 1 : c, _this.collection.getLogs((c - 1) * 30), a("#cur_page").val(c);
            }), a("#next").bind("click", function() {
                var b = a("#cur_page").val(), c = Number(b) + 1;
                c = c < 1 ? 1 : c, _this.collection.getLogs((c - 1) * 30), a("#cur_page").val(c);
            }), a("#gosubmit").bind("click", function() {
                var b = a("#source").val();
                a("#searchtype").val() == 1 && _this.collection.findLog(a("#query_text").val(), b), a("#query_text").val() != "" && a("#searchtype").val() == 2 && _this.collection.filterLog(a("#query_text").val(), b);
            }), a("#act_del").bind("click", function() {
                var b = [];
                a("input[name=logs]").each(function() {
                    this.checked && (a("#tr_" + a(this).val()).remove(), b[b.length] = a(this).val());
                }), b.length != 0 && _this.collection.updateLog(b);
            }), a("#checkall").bind("click", function() {
                var b = this.checked;
                a("input[name=logs]").each(function() {
                    this.checked = b;
                });
            });
        },
        render: function(a) {
            this.fn = a, this.collection.getLogs();
        },
        findLog: function(a, b) {
            this.collection.findLog(a), this.fn = b;
        },
        getDataBySearch: function() {
            if (a("#table_result").length > 0) {
                var c = "";
                b.each(this.collection.toJSON(), function(a) {
                    c += home_logItemTemplate({
                        row: a
                    });
                }), a("#table_result > tbody").html(c);
            } else this.getData();
        },
        getData: function() {
            _this = this;
            var a = "";
            b.each(this.collection.toJSON(), function(b) {
                a += home_logItemTemplate({
                    row: b
                });
            });
            var c = [ "51job", "zhaopin", "job58", "house58", "soufun" ], d = "";
            for (i = 0, n = c.length; i < n; i++) d += '<option value="' + c[i] + '">' + c[i] + "</option>";
            var e = home_logTemplate({
                content: a,
                source: d
            });
            this.fn(e, function() {
                _this.bindEvents();
            });
        }
    });
    return new e;
}), define("models/feed", [ "Underscore", "Backbone" ], function(a, b) {
    var c = b.Model.extend({
        initialize: function() {}
    });
    return c;
}), define("collections/feed", [ "jQuery", "Underscore", "Backbone", "models/feed" ], function(a, b, c, d) {
    var e = c.Collection.extend({
        url: "http://127.0.0.1/slim/feeds",
        model: d,
        findFeed: function(b) {
            var c = this, d = b == "" ? c.url : "http://127.0.0.1/slim/feeds/search/" + b;
            a.ajax({
                url: d,
                dataType: "json",
                success: function(a) {
                    c.reset(a), c.trigger("find");
                }
            });
        },
        getFeeds: function() {
            var b = this;
            a.ajax({
                url: b.url,
                dataType: "json",
                success: function(a) {
                    b.reset(a), b.trigger("init");
                }
            });
        },
        updateFeed: function(b) {
            var c = this, d = "http://127.0.0.1/slim/updatefeed";
            a.ajax({
                url: d,
                type: "POST",
                data: b,
                dataType: "json",
                success: function() {
                    c.trigger("update");
                }
            });
        },
        initialize: function() {}
    });
    return new e;
}), define("text!templates/home/feed.html", [], function() {
    return '\n    \t<div class="container_12 leading">\n\t\t<section class="portlet">\n\t\t\t<header>\n\t\t\t\t<h2>个人数据</h2>\n\t\t\t</header>\n\t\t\t<section>\n\t    \t\t<div class="row-fluid">\n\t    \t\t\t<div class="well">\n\t\t\t\t\t\t<input id="query_text" type="text" class="input-medium search-query">\n\t\t\t\t\t\t<button id="search" class="btn" type="button">查询</button>\n\t\t\t\t\t\t<button id="next" class="btn" type="button">此页数据已看</button>\n\t\t\t\t\t</div>\n\t\t\t\t\t\t<form id="sc_form">\n\t\t\t\t\t\t<table id="table_result" class="table table-bordered">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t  <tr>\n\t\t\t\t\t\t\t\t  \t<th width="5%">#</th>\n\t\t\t\t\t\t\t\t  \t<th width="35%">内容</th>\n\t\t\t\t\t\t\t    \t<th width="35%">来源</th>\n\t\t\t\t\t\t\t    \t<th width="12%">时间</th>\n\t\t\t\t\t\t\t    \t<th width="13%">操作</th>\n\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<%=content%>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\n\t\t\t</section>\n\t\t</section>\n\t</div>\n\n\n';
}), define("text!templates/home/feeditem.html", [], function() {
    return '\n\t\t\t\t\t\t\t<% _.each(feeds, function(feed){ %>\n\t\t\t\t\t\t\t\t  <tr id="tr_<%=feed.id%>">\n\t\t\t\t\t\t\t\t    \t<td><%=feed.id%></td>\n\t\t\t\t\t\t\t\t    \t<td><%=feed.content%></td>\n\t\t\t\t\t\t\t\t    \t<td><a target="_blank" href="<%=feed.from_url%>"><%=feed.from_url%></a></td>\n\t\t\t\t\t\t\t\t    \t<td><%=feed.cdate%></td>\n\t\t\t\t\t\t\t\t    \t<td>\n\t\t\t\t\t\t\t\t    \t<label class="radio"><input type="radio" checked="true" value="1" name="action_<%=feed.id%>" />飘过\n\t\t\t\t\t\t\t\t    \t</label>\n\t\t\t\t\t\t\t\t    \t<label class="radio"><input type="radio" value="2" name="action_<%=feed.id%>" />给力\n\t\t\t\t\t\t\t\t    \t</label>\n\t\t\t\t\t\t\t\t    \t</td>\n\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t   <%  }); %>\n\n';
}), define("views/home/feed", [ "jQuery", "Underscore", "Backbone", "collections/feed", "text!templates/home/feed.html", "text!templates/home/feeditem.html" ], function(a, b, c, d, e, f) {
    var g = c.View.extend({
        el: "",
        fn: "",
        initialize: function() {
            this.collection = d, this.collection = d.add({
                id: 1,
                content: "Facebook",
                cdate: 20,
                from_url: 123
            }), this.collection.bind("init", this.getData, this), this.collection.bind("find", this.getDataBySearch, this), this.collection.bind("update", this.collection.getFeeds, this);
        },
        bindEvents: function() {
            _this = this, _this.el = a("#sc_form"), a("#search").bind("click", function() {
                a("#query_text").val() != "" && (location.hash = "#!/feed/" + a("#query_text").val());
            }), a("#next").bind("click", function() {
                _this.collection.updateFeed(_this.el.serialize());
            });
        },
        render: function(a) {
            this.fn = a, this.collection.getFeeds();
        },
        findFeed: function(a, b) {
            this.collection.findFeed(a), this.fn = b;
        },
        getDataBySearch: function() {
            if (a("#table_result").length > 0) {
                var c = b.template(f, {
                    feeds: this.collection.toJSON()
                });
                a("#table_result > tbody").html(c);
            } else this.getData();
        },
        getData: function() {
            _this = this;
            var a = b.template(f, {
                feeds: this.collection.toJSON()
            }), c = b.template(e, {
                content: a
            });
            this.fn(c, function() {
                _this.bindEvents();
            });
        }
    });
    return new g;
});

var taobao_optionsTemplate = function(obj) {
    var __p = "", print = function() {
        __p += Array.prototype.join.call(arguments, "");
    };
    with (obj || {}) __p += '\n    <div class="container_12 leading"><section id="result" class="bs-docs-result"></section>\n\t\t<section class="portlet">\n\t\t\t<header>\n\t\t\t\t<h2>淘宝卖家工具</h2>\n\t\t\t</header>\n\t\t\t<section>\n\t\t\t\t<div class="form-horizontal">\n\t\t\t\t\t<fieldset>\n\t\t\t\t\t\t<legend>信用评价</legend>\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="control-label" for="short_url">淘宝帐号</label>\n\t\t\t\t\t\t\t\t<div class="controls">\n\t\t\t\t\t\t\t\t\t<input type="text" id="taobao_nick" name="taobao_nick" value="" />\n\t\t\t\t\t\t\t\t\t<button id="get_taobao_rate" class="btn btn-success">查询买家信用</button>\n\t\t\t\t\t\t\t\t\t<p class="help-block" id="taobao_rate_result"></p>\n\t\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t\t\t\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</fieldset>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t</section>\n\t\t\n\t</div>\n\n';
    return __p;
};

define("templates/taobao/options.compiled", function() {}), define("views/taobao/options", [ "jQuery", "Underscore", "Backbone", "templates/taobao/options.compiled" ], function(a, b, c) {
    var d = c.View.extend({
        el: "",
        initialize: function() {},
        bindEvents: function() {
            _this = this, a("#get_taobao_rate").bind("click", function() {
                chrome.extension.sendRequest({
                    type: "taobao",
                    act: "get_rate",
                    nick: a("#taobao_nick").val()
                }, function(b) {
                    b.append ? a("#result").html(a("#result").html() + b.result) : a("#result").html(b.result);
                });
            });
        },
        render: function(a) {
            _this = this, a(taobao_optionsTemplate({}), function() {
                _this.bindEvents();
            });
        }
    });
    return new d;
}), define("collections/taobao", [ "jQuery", "Underscore", "Backbone", "models/feed" ], function(a, b, c, d) {
    var e = c.Collection.extend({
        url: "http://127.0.0.1/slim/taobao/top/goods",
        model: d,
        findGoods: function(b) {
            var c = this, d = b == "" ? c.url : "http://127.0.0.1/slim/taobao/top/goods/search/" + b;
            a.ajax({
                url: d,
                dataType: "json",
                success: function(a) {
                    c.reset(a), c.trigger("find");
                }
            });
        },
        moreGoods: function(b) {
            var c = this, d = "http://127.0.0.1/slim/taobao/top/goods/page/" + b;
            a.ajax({
                url: d,
                dataType: "json",
                success: function(a) {
                    c.reset(a), c.trigger("more");
                }
            });
        },
        getGoods: function() {
            var b = this;
            a.ajax({
                url: b.url,
                dataType: "json",
                success: function(a) {
                    b.reset(a), b.trigger("init");
                }
            });
        },
        initialize: function() {}
    });
    return new e;
}), define("text!templates/taobao/top_goods.html", [], function() {
    return '\n    \t<div class="container_12 leading">\n\t\t<section class="portlet">\n\t\t\t<header>\n\t\t\t\t<h2>淘宝数据</h2>\n\t\t\t</header>\n\t\t\t<section>\n\t    \t\t<div class="row-fluid">\n\t    \t\t\t<div class="well">\n\t\t\t\t\t\t<input id="query_text" type="text" class="input-medium search-query">\n\t\t\t\t\t\t<button id="search" class="btn" type="button">查询</button>\n\t\t\t\t\t\t<button id="more" class="btn" type="button">more...</button>\n\t\t\t\t\t\t<span id="page">2</span>\n\t\t\t\t\t\thttp://top.taobao.com/level3.php?cat=16&level3=1623&show=sell&up=false&offset=0\n\t\t\t\t\t</div>\n\t\t\t\t\t\t<form id="sc_form">\n\t\t\t\t\t\t<table id="table_result" class="table table-bordered">\n\t\t\t\t\t\t\t<thead>\n\t\t\t\t\t\t\t\t<tr>\n\t\t\t\t\t\t\t\t\t<th width="10px">#</th>\n\t\t\t\t\t\t\t\t\t<th width="100px">时间</th>\n\t\t\t\t\t\t\t\t\t<th width="100px">商品名称</th>\n\t\t\t\t\t\t\t\t\t<th width="100px">来源</th>\n\t\t\t\t\t\t\t\t\t<th width="100px">图片</th>\n\t\t\t\t\t\t\t\t\t<th width="100px">价格</th>\n\t\t\t\t\t\t\t\t\t<th width="100px">销量</th>\n\t\t\t\t\t\t\t\t\t<th width="100px">升降幅度</th>\n\t\t\t\t\t\t\t\t</tr>\n\t\t\t\t\t\t\t</thead>\n\t\t\t\t\t\t\t<tbody>\n\t\t\t\t\t\t\t\t<%=content%>\n\t\t\t\t\t\t\t</tbody>\n\t\t\t\t\t\t</table>\n\t\t\t\t\t\t</form>\n\t\t\t\t\t</div>\n\n\t\t\t</section>\n\t\t</section>\n\t</div>\n\n\n';
}), define("text!templates/taobao/top_good_item.html", [], function() {
    return '\n\t\t\t\t\t\t\t<% _.each(rows, function(item){ %>\n\t\t\t\t\t\t\t\t  <tr id="tr_<%=item.id%>">\n\t\t\t\t\t\t\t\t    \t<td><%=item.id%></td>\n\t\t\t\t\t\t\t\t    \t<td><%=item.cdate%></td>\n\t\t\t\t\t\t\t\t    \t<td><%=item.goodname%></td>\n\t\t\t\t\t\t\t\t    \t<td><a target="_blank" href="<%=item.goodurl%>"><%=item.goodurl%></a></td>\n\t\t\t\t\t\t\t\t    \t<td><img src="<%=item.goodimg%>" width="100px" height="100px" /></td>\n\t\t\t\t\t\t\t\t    \t<td><%=item.goodprice%></td>\n\t\t\t\t\t\t\t\t    \t<td><%=item.sale%></td>\n\t\t\t\t\t\t\t\t    \t<td><%=item.upgrade%></td>\n\t\t\t\t\t\t\t\t  </tr>\n\t\t\t\t\t\t   <%  }); %>\n\n';
}), define("views/taobao/top", [ "jQuery", "Underscore", "Backbone", "collections/taobao", "text!templates/taobao/top_goods.html", "text!templates/taobao/top_good_item.html" ], function(a, b, c, d, e, f) {
    var g = c.View.extend({
        el: "",
        fn: "",
        initialize: function() {
            this.collection = d, this.collection = d.add({
                id: 1,
                content: "Facebook",
                cdate: 20,
                from_url: 123
            }), this.collection.bind("init", this.getData, this), this.collection.bind("find", this.getDataBySearch, this), this.collection.bind("more", this.getDataByMore, this);
        },
        bindEvents: function() {
            _this = this, _this.el = a("#sc_form"), a("#search").bind("click", function() {
                a("#query_text").val() != "" && (location.hash = "#!/taobao_top_goods/" + a("#query_text").val());
            }), a("#more").bind("click", function() {
                a("#page").text() != "" && (location.hash = "#!/taobao_top_goods/page/" + a("#page").text());
            });
        },
        render: function(a) {
            this.fn = a, this.collection.getGoods();
        },
        find: function(a, b) {
            this.collection.findGoods(a), this.fn = b;
        },
        more: function(a, b) {
            this.collection.moreGoods(a), this.fn = b;
        },
        getDataBySearch: function() {
            if (a("#table_result").length > 0) {
                var c = b.template(f, {
                    rows: this.collection.toJSON()
                });
                a("#table_result > tbody").html(c);
            } else this.getData();
        },
        getDataByMore: function() {
            if (a("#table_result").length > 0) {
                var c = b.template(f, {
                    rows: this.collection.toJSON()
                });
                a("#table_result > tbody").append(c);
            } else this.getData();
            a("#page").text(parseInt(a("#page").text()) + 1);
        },
        getData: function() {
            _this = this;
            var a = b.template(f, {
                rows: this.collection.toJSON()
            }), c = b.template(e, {
                content: a
            });
            this.fn(c, function() {
                _this.bindEvents();
            });
        }
    });
    return new g;
});

var job_optionsTemplate = function(obj) {
    var __p = "", print = function() {
        __p += Array.prototype.join.call(arguments, "");
    };
    with (obj || {}) __p += '\n    <div class="container_12 leading">\n\t\t<section class="portlet">\n\t\t\t<header>\n\t\t\t\t<h2>信息源</h2>\n\t\t\t</header>\n\t\t\t<section>\n\t\t\t\t<div class="form-horizontal">\n\t\t\t\t\t<fieldset>\n\t\t\t\t\t\t<legend>招聘网站</legend>\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="checkbox inline">\n\t\t\t\t\t\t\t\t\t<input type="checkbox" name="wb" value="get_58job" checked=true />58job\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t<label class="checkbox inline">\n\t\t\t\t\t\t\t\t\t<input type="checkbox" name="wb" value="get_zhaopin" checked=true />zhaopin\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t<label class="checkbox inline">\n\t\t\t\t\t\t\t\t\t<input type="checkbox" name="wb" value="get_51job" checked=true />51job\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t<button id="get_job" class="btn btn-success">查询</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</fieldset>\n\t\t\t\t\t<fieldset>\n\t\t\t\t\t\t<legend>房产网站</legend>\n\t\t\t\t\t\t\t<div class="control-group span12">\n\t\t\t\t\t\t\t\t<label class="checkbox inline">\n\t\t\t\t\t\t\t\t\t<input type="checkbox" name="hs" value="get_58house" checked=true />58house\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t<label class="checkbox inline">\n\t\t\t\t\t\t\t\t\t<input type="checkbox" name="hs" value="get_soufun" checked=true />soufun\n\t\t\t\t\t\t\t\t</label>\n\t\t\t\t\t\t\t\t\t<button id="get_house" class="btn btn-success">查询</button>\n\t\t\t\t\t\t\t</div>\n\t\t\t\t\t</fieldset>\n\t\t\t\t</div>\n\t\t\t</section>\n\t\t</section>\n\t\t\n\t</div>\n\n';
    return __p;
};

define("templates/job/options.compiled", function() {}), define("views/job/options", [ "jQuery", "Underscore", "Backbone", "templates/job/options.compiled" ], function(a, b, c) {
    var d = c.View.extend({
        el: "",
        initialize: function() {},
        bindEvents: function() {
            _this = this, a("#get_job").bind("click", function() {
                var b = [];
                a("input[name='wb']:checked").each(function() {
                    b[b.length] = this.value;
                });
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c];
                    chrome.extension.sendRequest({
                        type: "job",
                        act: e
                    }, function(a) {
                        console.log(e);
                    });
                }
            }), a("#get_house").bind("click", function() {
                var b = [];
                a("input[name='hs']:checked").each(function() {
                    b[b.length] = this.value;
                });
                for (var c = 0, d = b.length; c < d; c++) {
                    var e = b[c];
                    chrome.extension.sendRequest({
                        type: "house",
                        act: e
                    }, function(a) {
                        console.log(e);
                    });
                }
            });
        },
        render: function(a) {
            _this = this, a(job_optionsTemplate({}), function() {
                _this.bindEvents();
            });
        }
    });
    return new d;
}), define("router", [ "jQuery", "Underscore", "Backbone", "views/home/main", "views/home/options", "views/home/log", "views/home/feed", "views/taobao/options", "views/taobao/top", "views/job/options" ], function(a, b, c, d, e, f, g, h, i, j) {
    var k = function(b, c) {
        var d = a("#main-content"), e = location.hash;
        e || (e = "#!/taobao_options"), e = e.split("/").slice(0, 2).join("/");
        var f = a("a[href!=#]").filter(function() {
            var b = a(this).attr("href");
            return b == e || b == e.replace("#", "");
        }), g = "empty title";
        f.length > 0 && (g = f.attr("title"));
        var h = e.replace("#!/", "");
        a("#wrapper > section > section > header h1").html(g), location.hash ? (a('<div style="left: 100%" id="' + h + '-html">' + b + "</div>").appendTo(d), a("#wrapper > section > section").css("position") == "absolute" ? (a("> div:last", d).css({
            left: 0,
            position: "relative"
        }).siblings().remove(), a("#wrapper > section > section").show().animate({
            left: 0
        }, 300, "easeInOutQuart", function() {
            a(this).css("left", 0);
        })) : a("> div", d).animate({
            left: "-=100%"
        }, "slow", "easeInOutQuart", function() {
            a(this).css("left", 0), a("> div:last", d).css({
                position: "relative"
            }).siblings().remove();
        })) : a('<div style="position:relative;" id="' + h + '-html">' + b + "</div>").appendTo(d), c();
    }, l = function() {
        var b = a("#main-content"), c = location.hash;
        c || (c = "#!/taobao_options"), c = c.split("/").slice(0, 2).join("/");
        var d = a("a[href!=#]").filter(function() {
            var b = a(this).attr("href");
            return b == c || b == c.replace("#", "");
        }), e = "empty title";
        d.length > 0 && (e = d.attr("title"));
        var f = c.replace("#!/", "");
        a("#wrapper > section > section > header h1").html(e);
        if (a("#" + f).length > 0 || a(b).html().replace(/\s/g, "") == "") a(b).html(""), a("<div id='loading-container'><p id='loading-content'><img id='loading-graphic'  src='/images/ajax-loader-trans.gif' />  Loading...</p></div>").appendTo(b);
    }, m = c.Router.extend({
        routes: {
            "!/taobao_options": "taobao_optionsAction",
            "!/job_options": "job_optionsAction",
            "!/options": "optionsAction",
            "!/log": "logAction",
            "!/log/:query": "logSearchAction",
            "!/feed": "feedAction",
            "!/feed/:query": "feedSearchAction",
            "!/taobao_top_goods": "taobaoTopGoodAction",
            "!/taobao_top_goods/:query": "taobaoTopGoodSearchAction",
            "!/taobao_top_goods/page/:page": "taobaoTopGoodMoreAction",
            "!/test": "test",
            "*actions": "defaultAction"
        },
        optionsAction: function() {
            this.render(e);
        },
        logAction: function() {
            this.render(f);
        },
        taobao_optionsAction: function() {
            this.render(h);
        },
        job_optionsAction: function() {
            this.render(j);
        },
        feedAction: function() {
            this.render(g);
        },
        taobaoTopGoodAction: function() {
            this.render(i);
        },
        taobaoTopGoodSearchAction: function(a) {
            i.find(a, k);
        },
        taobaoTopGoodMoreAction: function(a) {
            i.more(a, k);
        },
        feedSearchAction: function(a) {
            g.findFeed(a, k);
        },
        test: function() {
            this.render(d);
        },
        defaultAction: function(a) {
            this.render(h);
        },
        render: function(b) {
            a("#main-content").html(""), setTimeout(l, 100), b.render(k);
        }
    }), n = function() {
        var a = new m;
        c.history.start();
    };
    return {
        initialize: n
    };
}), define("app", [ "jQuery", "Underscore", "Backbone", "router" ], function(a, b, c, d) {
    var e = function() {
        d.initialize();
    };
    return {
        initialize: e
    };
}), require.config({
    paths: {
        loader: "libs/loader",
        jQuery: "libs/jquery/loader",
        Underscore: "libs/underscore/loader",
        Backbone: "libs/backbone/loader",
        templates: "../templates"
    }
}), require([ "app" ], function(a) {
    a.initialize();
}), define("main", function() {});