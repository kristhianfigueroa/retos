﻿/*
 Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
 For licensing, see LICENSE.html or http://ckeditor.com/license
 */

(function () {
    if (window.CKEDITOR && window.CKEDITOR.dom)return;
    if (!window.CKEDITOR)window.CKEDITOR = (function () {
        var a = {timestamp: 'B8DJ5M3', version: '3.6.2', revision: '7275', _: {}, status: 'unloaded', basePath: (function () {
            var d = window.CKEDITOR_BASEPATH || '';
            if (!d) {
                var e = document.getElementsByTagName('script');
                for (var f = 0; f < e.length; f++) {
                    var g = e[f].src.match(/(^|.*[\\\/])ckeditor(?:_basic)?(?:_source)?.js(?:\?.*)?$/i);
                    if (g) {
                        d = g[1];
                        break;
                    }
                }
            }
            if (d.indexOf(':/') == -1)if (d.indexOf('/') === 0)d = location.href.match(/^.*?:\/\/[^\/]*/)[0] + d; else d = location.href.match(/^[^\?]*\/(?:)/)[0] + d;
            if (!d)throw 'The CKEditor installation path could not be automatically detected. Please set the global variable "CKEDITOR_BASEPATH" before creating editor instances.';
            return d;
        })(), getUrl: function (d) {
            if (d.indexOf(':/') == -1 && d.indexOf('/') !== 0)d = this.basePath + d;
            if (this.timestamp && d.charAt(d.length - 1) != '/' && !/[&?]t=/.test(d))d += (d.indexOf('?') >= 0 ? '&' : '?') + 't=' + this.timestamp;
            return d;
        }}, b = window.CKEDITOR_GETURL;
        if (b) {
            var c = a.getUrl;
            a.getUrl = function (d) {
                return b.call(a, d) || c.call(a, d);
            };
        }
        return a;
    })();
    var a = CKEDITOR;
    if (!a.event) {
        a.event = function () {
        };
        a.event.implementOn = function (b) {
            var c = a.event.prototype;
            for (var d in c) {
                if (b[d] == undefined)b[d] = c[d];
            }
        };
        a.event.prototype = (function () {
            var b = function (d) {
                var e = d.getPrivate && d.getPrivate() || d._ || (d._ = {});
                return e.events || (e.events = {});
            }, c = function (d) {
                this.name = d;
                this.listeners = [];
            };
            c.prototype = {getListenerIndex: function (d) {
                for (var e = 0, f = this.listeners; e < f.length; e++) {
                    if (f[e].fn == d)return e;
                }
                return-1;
            }};
            return{on: function (d, e, f, g, h) {
                var i = b(this), j = i[d] || (i[d] = new c(d));
                if (j.getListenerIndex(e) < 0) {
                    var k = j.listeners;
                    if (!f)f = this;
                    if (isNaN(h))h = 10;
                    var l = this, m = function (o, p, q, r) {
                        var s = {name: d, sender: this, editor: o, data: p, listenerData: g, stop: q, cancel: r, removeListener: function () {
                            l.removeListener(d, e);
                        }};
                        e.call(f, s);
                        return s.data;
                    };
                    m.fn = e;
                    m.priority = h;
                    for (var n = k.length - 1; n >= 0; n--) {
                        if (k[n].priority <= h) {
                            k.splice(n + 1, 0, m);
                            return;
                        }
                    }
                    k.unshift(m);
                }
            }, fire: (function () {
                var d = false, e = function () {
                    d = true;
                }, f = false, g = function () {
                    f = true;
                };
                return function (h, i, j) {
                    var k = b(this)[h], l = d, m = f;
                    d = f = false;
                    if (k) {
                        var n = k.listeners;
                        if (n.length) {
                            n = n.slice(0);
                            for (var o = 0; o < n.length; o++) {
                                var p = n[o].call(this, j, i, e, g);
                                if (typeof p != 'undefined')i = p;
                                if (d || f)break;
                            }
                        }
                    }
                    var q = f || (typeof i == 'undefined' ? false : i);
                    d = l;
                    f = m;
                    return q;
                };
            })(), fireOnce: function (d, e, f) {
                var g = this.fire(d, e, f);
                delete b(this)[d];
                return g;
            }, removeListener: function (d, e) {
                var f = b(this)[d];
                if (f) {
                    var g = f.getListenerIndex(e);
                    if (g >= 0)f.listeners.splice(g, 1);
                }
            }, hasListeners: function (d) {
                var e = b(this)[d];
                return e && e.listeners.length > 0;
            }};
        })();
    }
    if (!a.editor) {
        a.ELEMENT_MODE_NONE = 0;
        a.ELEMENT_MODE_REPLACE = 1;
        a.ELEMENT_MODE_APPENDTO = 2;
        a.editor = function (b, c, d, e) {
            var f = this;
            f._ = {instanceConfig: b, element: c, data: e};
            f.elementMode = d || 0;
            a.event.call(f);
            f._init();
        };
        a.editor.replace = function (b, c) {
            var d = b;
            if (typeof d != 'object') {
                d = document.getElementById(b);
                if (d && d.tagName.toLowerCase() in {style: 1, script: 1, base: 1, link: 1, meta: 1, title: 1})d = null;
                if (!d) {
                    var e = 0, f = document.getElementsByName(b);
                    while ((d = f[e++]) && d.tagName.toLowerCase() != 'textarea') {
                    }
                }
                if (!d)throw '[CKEDITOR.editor.replace] The element with id or name "' + b + '" was not found.';
            }
            d.style.visibility = 'hidden';
            return new a.editor(c, d, 1);
        };
        a.editor.appendTo = function (b, c, d) {
            var e = b;
            if (typeof e != 'object') {
                e = document.getElementById(b);
                if (!e)throw '[CKEDITOR.editor.appendTo] The element with id "' + b + '" was not found.';
            }
            return new a.editor(c, e, 2, d);
        };
        a.editor.prototype = {_init: function () {
            var b = a.editor._pending || (a.editor._pending = []);
            b.push(this);
        }, fire: function (b, c) {
            return a.event.prototype.fire.call(this, b, c, this);
        }, fireOnce: function (b, c) {
            return a.event.prototype.fireOnce.call(this, b, c, this);
        }};
        a.event.implementOn(a.editor.prototype, true);
    }
    if (!a.env)a.env = (function () {
        var b = navigator.userAgent.toLowerCase(), c = window.opera, d = {ie: /*@cc_on!@*/false, opera: !!c && c.version, webkit: b.indexOf(' applewebkit/') > -1, air: b.indexOf(' adobeair/') > -1, mac: b.indexOf('macintosh') > -1, quirks: document.compatMode == 'BackCompat', mobile: b.indexOf('mobile') > -1, iOS: /(ipad|iphone|ipod)/.test(b), isCustomDomain: function () {
            if (!this.ie)return false;
            var g = document.domain, h = window.location.hostname;
            return g != h && g != '[' + h + ']';
        }, secure: location.protocol == 'https:'};
        d.gecko = navigator.product == 'Gecko' && !d.webkit && !d.opera;
        var e = 0;
        if (d.ie) {
            e = parseFloat(b.match(/msie (\d+)/)[1]);
            d.ie8 = !!document.documentMode;
            d.ie8Compat = document.documentMode == 8;
            d.ie9Compat = document.documentMode == 9;
            d.ie7Compat = e == 7 && !document.documentMode || document.documentMode == 7;
            d.ie6Compat = e < 7 || d.quirks;
        }
        if (d.gecko) {
            var f = b.match(/rv:([\d\.]+)/);
            if (f) {
                f = f[1].split('.');
                e = f[0] * 10000 + (f[1] || 0) * 100 + +(f[2] || 0);
            }
        }
        if (d.opera)e = parseFloat(c.version());
        if (d.air)e = parseFloat(b.match(/ adobeair\/(\d+)/)[1]);
        if (d.webkit)e = parseFloat(b.match(/ applewebkit\/(\d+)/)[1]);
        d.version = e;
        d.isCompatible = d.iOS && e >= 534 || !d.mobile && (d.ie && e >= 6 || d.gecko && e >= 10801 || d.opera && e >= 9.5 || d.air && e >= 1 || d.webkit && e >= 522 || false);
        d.cssClass = 'cke_browser_' + (d.ie ? 'ie' : d.gecko ? 'gecko' : d.opera ? 'opera' : d.webkit ? 'webkit' : 'unknown');
        if (d.quirks)d.cssClass += ' cke_browser_quirks';
        if (d.ie) {
            d.cssClass += ' cke_browser_ie' + (d.version < 7 ? '6' : d.version >= 8 ? document.documentMode : '7');
            if (d.quirks)d.cssClass += ' cke_browser_iequirks';
        }
        if (d.gecko && e < 10900)d.cssClass += ' cke_browser_gecko18';
        if (d.air)d.cssClass += ' cke_browser_air';
        return d;
    })();
    var b = a.env;
    var c = b.ie;
    if (a.status == 'unloaded')(function () {
        a.event.implementOn(a);
        a.loadFullCore = function () {
            if (a.status != 'basic_ready') {
                a.loadFullCore._load = 1;
                return;
            }
            delete a.loadFullCore;
            var e = document.createElement('script');
            e.type = 'text/javascript';
            e.src = a.basePath + 'ckeditor.js';
            document.getElementsByTagName('head')[0].appendChild(e);
        };
        a.loadFullCoreTimeout = 0;
        a.replaceClass = 'ckeditor';
        a.replaceByClassEnabled = 1;
        var d = function (e, f, g, h) {
            if (b.isCompatible) {
                if (a.loadFullCore)a.loadFullCore();
                var i = g(e, f, h);
                a.add(i);
                return i;
            }
            return null;
        };
        a.replace = function (e, f) {
            return d(e, f, a.editor.replace);
        };
        a.appendTo = function (e, f, g) {
            return d(e, f, a.editor.appendTo, g);
        };
        a.add = function (e) {
            var f = this._.pending || (this._.pending = []);
            f.push(e);
        };
        a.replaceAll = function () {
            var e = document.getElementsByTagName('textarea');
            for (var f = 0; f < e.length; f++) {
                var g = null, h = e[f];
                if (!h.name && !h.id)continue;
                if (typeof arguments[0] == 'string') {
                    var i = new RegExp('(?:^|\\s)' + arguments[0] + '(?:$|\\s)');
                    if (!i.test(h.className))continue;
                } else if (typeof arguments[0] == 'function') {
                    g = {};
                    if (arguments[0](h, g) === false)continue;
                }
                this.replace(h, g);
            }
        };
        (function () {
            var e = function () {
                var f = a.loadFullCore, g = a.loadFullCoreTimeout;
                if (a.replaceByClassEnabled)a.replaceAll(a.replaceClass);
                a.status = 'basic_ready';
                if (f && f._load)f(); else if (g)setTimeout(function () {
                    if (a.loadFullCore)a.loadFullCore();
                }, g * 1000);
            };
            if (window.addEventListener)window.addEventListener('load', e, false); else if (window.attachEvent)window.attachEvent('onload', e);
        })();
        a.status = 'basic_loaded';
    })();
    a.dom = {};
    var d = a.dom;
    (function () {
        var e = [];
        a.on('reset', function () {
            e = [];
        });
        a.tools = {arrayCompare: function (f, g) {
            if (!f && !g)return true;
            if (!f || !g || f.length != g.length)return false;
            for (var h = 0; h < f.length; h++) {
                if (f[h] != g[h])return false;
            }
            return true;
        }, clone: function (f) {
            var g;
            if (f && f instanceof Array) {
                g = [];
                for (var h = 0; h < f.length; h++)g[h] = this.clone(f[h]);
                return g;
            }
            if (f === null || typeof f != 'object' || f instanceof String || f instanceof Number || f instanceof Boolean || f instanceof Date || f instanceof RegExp)return f;
            g = new f.constructor();
            for (var i in f) {
                var j = f[i];
                g[i] = this.clone(j);
            }
            return g;
        }, capitalize: function (f) {
            return f.charAt(0).toUpperCase() + f.substring(1).toLowerCase();
        }, extend: function (f) {
            var g = arguments.length, h, i;
            if (typeof (h = arguments[g - 1]) == 'boolean')g--; else if (typeof (h = arguments[g - 2]) == 'boolean') {
                i = arguments[g - 1];
                g -= 2;
            }
            for (var j = 1; j < g; j++) {
                var k = arguments[j];
                for (var l in k) {
                    if (h === true || f[l] == undefined)if (!i || l in i)f[l] = k[l];
                }
            }
            return f;
        }, prototypedCopy: function (f) {
            var g = function () {
            };
            g.prototype = f;
            return new g();
        }, isArray: function (f) {
            return!!f && f instanceof Array;
        }, isEmpty: function (f) {
            for (var g in f) {
                if (f.hasOwnProperty(g))return false;
            }
            return true;
        }, cssStyleToDomStyle: (function () {
            var f = document.createElement('div').style, g = typeof f.cssFloat != 'undefined' ? 'cssFloat' : typeof f.styleFloat != 'undefined' ? 'styleFloat' : 'float';
            return function (h) {
                if (h == 'float')return g; else return h.replace(/-./g, function (i) {
                    return i.substr(1).toUpperCase();
                });
            };
        })(), buildStyleHtml: function (f) {
            f = [].concat(f);
            var g, h = [];
            for (var i = 0; i < f.length; i++) {
                g = f[i];
                if (/@import|[{}]/.test(g))h.push('<style>' + g + '</style>'); else h.push('<link type="text/css" rel=stylesheet href="' + g + '">');
            }
            return h.join('');
        }, htmlEncode: function (f) {
            var g = function (k) {
                var l = new d.element('span');
                l.setText(k);
                return l.getHtml();
            }, h = g('\n').toLowerCase() == '<br>' ? function (k) {
                return g(k).replace(/<br>/gi, '\n');
            } : g, i = g('>') == '>' ? function (k) {
                return h(k).replace(/>/g, '&gt;');
            } : h, j = g('  ') == '&nbsp; ' ? function (k) {
                return i(k).replace(/&nbsp;/g, ' ');
            } : i;
            this.htmlEncode = j;
            return this.htmlEncode(f);
        }, htmlEncodeAttr: function (f) {
            return f.replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }, getNextNumber: (function () {
            var f = 0;
            return function () {
                return++f;
            };
        })(), getNextId: function () {
            return 'cke_' + this.getNextNumber();
        }, override: function (f, g) {
            return g(f);
        }, setTimeout: function (f, g, h, i, j) {
            if (!j)j = window;
            if (!h)h = j;
            return j.setTimeout(function () {
                if (i)f.apply(h, [].concat(i)); else f.apply(h);
            }, g || 0);
        }, trim: (function () {
            var f = /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g;
            return function (g) {
                return g.replace(f, '');
            };
        })(), ltrim: (function () {
            var f = /^[ \t\n\r]+/g;
            return function (g) {
                return g.replace(f, '');
            };
        })(), rtrim: (function () {
            var f = /[ \t\n\r]+$/g;
            return function (g) {
                return g.replace(f, '');
            };
        })(), indexOf: Array.prototype.indexOf ? function (f, g) {
            return f.indexOf(g);
        } : function (f, g) {
            for (var h = 0, i = f.length; h < i; h++) {
                if (f[h] === g)return h;
            }
            return-1;
        }, bind: function (f, g) {
            return function () {
                return f.apply(g, arguments);
            };
        }, createClass: function (f) {
            var g = f.$, h = f.base, i = f.privates || f._, j = f.proto, k = f.statics;
            if (i) {
                var l = g;
                g = function () {
                    var p = this;
                    var m = p._ || (p._ = {});
                    for (var n in i) {
                        var o = i[n];
                        m[n] = typeof o == 'function' ? a.tools.bind(o, p) : o;
                    }
                    l.apply(p, arguments);
                };
            }
            if (h) {
                g.prototype = this.prototypedCopy(h.prototype);
                g.prototype['constructor'] = g;
                g.prototype.base = function () {
                    this.base = h.prototype.base;
                    h.apply(this, arguments);
                    this.base = arguments.callee;
                };
            }
            if (j)this.extend(g.prototype, j, true);
            if (k)this.extend(g, k, true);
            return g;
        }, addFunction: function (f, g) {
            return e.push(function () {
                return f.apply(g || this, arguments);
            }) - 1;
        }, removeFunction: function (f) {
            e[f] = null;
        }, callFunction: function (f) {
            var g = e[f];
            return g && g.apply(window, Array.prototype.slice.call(arguments, 1));
        }, cssLength: (function () {
            return function (f) {
                return f + (!f || isNaN(Number(f)) ? '' : 'px');
            };
        })(), convertToPx: (function () {
            var f;
            return function (g) {
                if (!f) {
                    f = d.element.createFromHtml('<div style="position:absolute;left:-9999px;top:-9999px;margin:0px;padding:0px;border:0px;"></div>', a.document);
                    a.document.getBody().append(f);
                }
                if (!/%$/.test(g)) {
                    f.setStyle('width', g);
                    return f.$.clientWidth;
                }
                return g;
            };
        })(), repeat: function (f, g) {
            return new Array(g + 1).join(f);
        }, tryThese: function () {
            var f;
            for (var g = 0, h = arguments.length; g < h; g++) {
                var i = arguments[g];
                try {
                    f = i();
                    break;
                } catch (j) {
                }
            }
            return f;
        }, genKey: function () {
            return Array.prototype.slice.call(arguments).join('-');
        }};
    })();
    var e = a.tools;
    a.dtd = (function () {
        var f = e.extend, g = {isindex: 1, fieldset: 1}, h = {input: 1, button: 1, select: 1, textarea: 1, label: 1}, i = f({a: 1}, h), j = f({iframe: 1}, i), k = {hr: 1, ul: 1, menu: 1, div: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, mark: 1, time: 1, meter: 1, command: 1, keygen: 1, output: 1, progress: 1, audio: 1, video: 1, details: 1, datagrid: 1, datalist: 1, blockquote: 1, noscript: 1, table: 1, center: 1, address: 1, dir: 1, pre: 1, h5: 1, dl: 1, h4: 1, noframes: 1, h6: 1, ol: 1, h1: 1, h3: 1, h2: 1}, l = {ins: 1, del: 1, script: 1, style: 1}, m = f({b: 1, acronym: 1, bdo: 1, 'var': 1, '#': 1, abbr: 1, code: 1, br: 1, i: 1, cite: 1, kbd: 1, u: 1, strike: 1, s: 1, tt: 1, strong: 1, q: 1, samp: 1, em: 1, dfn: 1, span: 1, wbr: 1}, l), n = f({sub: 1, img: 1, object: 1, sup: 1, basefont: 1, map: 1, applet: 1, font: 1, big: 1, small: 1, mark: 1}, m), o = f({p: 1}, n), p = f({iframe: 1}, n, h), q = {img: 1, noscript: 1, br: 1, kbd: 1, center: 1, button: 1, basefont: 1, h5: 1, h4: 1, samp: 1, h6: 1, ol: 1, h1: 1, h3: 1, h2: 1, form: 1, font: 1, '#': 1, select: 1, menu: 1, ins: 1, abbr: 1, label: 1, code: 1, table: 1, script: 1, cite: 1, input: 1, iframe: 1, strong: 1, textarea: 1, noframes: 1, big: 1, small: 1, span: 1, hr: 1, sub: 1, bdo: 1, 'var': 1, div: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, mark: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, audio: 1, video: 1, details: 1, datagrid: 1, datalist: 1, object: 1, sup: 1, strike: 1, dir: 1, map: 1, dl: 1, applet: 1, del: 1, isindex: 1, fieldset: 1, ul: 1, b: 1, acronym: 1, a: 1, blockquote: 1, i: 1, u: 1, s: 1, tt: 1, address: 1, q: 1, pre: 1, p: 1, em: 1, dfn: 1}, r = f({a: 1}, p), s = {tr: 1}, t = {'#': 1}, u = f({param: 1}, q), v = f({form: 1}, g, j, k, o), w = {li: 1}, x = {style: 1, script: 1}, y = {base: 1, link: 1, meta: 1, title: 1}, z = f(y, x), A = {head: 1, body: 1}, B = {html: 1}, C = {address: 1, blockquote: 1, center: 1, dir: 1, div: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, audio: 1, video: 1, details: 1, datagrid: 1, datalist: 1, dl: 1, fieldset: 1, form: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, hr: 1, isindex: 1, noframes: 1, ol: 1, p: 1, pre: 1, table: 1, ul: 1};
        return{$nonBodyContent: f(B, A, y), $block: C, $blockLimit: {body: 1, div: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, audio: 1, video: 1, details: 1, datagrid: 1, datalist: 1, td: 1, th: 1, caption: 1, form: 1}, $inline: r, $body: f({script: 1, style: 1}, C), $cdata: {script: 1, style: 1}, $empty: {area: 1, base: 1, br: 1, col: 1, hr: 1, img: 1, input: 1, link: 1, meta: 1, param: 1, wbr: 1}, $listItem: {dd: 1, dt: 1, li: 1}, $list: {ul: 1, ol: 1, dl: 1}, $nonEditable: {applet: 1, button: 1, embed: 1, iframe: 1, map: 1, object: 1, option: 1, script: 1, textarea: 1, param: 1, audio: 1, video: 1}, $captionBlock: {caption: 1, legend: 1}, $removeEmpty: {abbr: 1, acronym: 1, address: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, s: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, 'var': 1, mark: 1}, $tabIndex: {a: 1, area: 1, button: 1, input: 1, object: 1, select: 1, textarea: 1}, $tableContent: {caption: 1, col: 1, colgroup: 1, tbody: 1, td: 1, tfoot: 1, th: 1, thead: 1, tr: 1}, html: A, head: z, style: t, script: t, body: v, base: {}, link: {}, meta: {}, title: t, col: {}, tr: {td: 1, th: 1}, img: {}, colgroup: {col: 1}, noscript: v, td: v, br: {}, wbr: {}, th: v, center: v, kbd: r, button: f(o, k), basefont: {}, h5: r, h4: r, samp: r, h6: r, ol: w, h1: r, h3: r, option: t, h2: r, form: f(g, j, k, o), select: {optgroup: 1, option: 1}, font: r, ins: r, menu: w, abbr: r, label: r, table: {thead: 1, col: 1, tbody: 1, tr: 1, colgroup: 1, caption: 1, tfoot: 1}, code: r, tfoot: s, cite: r, li: v, input: {}, iframe: v, strong: r, textarea: t, noframes: v, big: r, small: r, span: r, hr: {}, dt: r, sub: r, optgroup: {option: 1}, param: {}, bdo: r, 'var': r, div: v, object: u, sup: r, dd: v, strike: r, area: {}, dir: w, map: f({area: 1, form: 1, p: 1}, g, l, k), applet: u, dl: {dt: 1, dd: 1}, del: r, isindex: {}, fieldset: f({legend: 1}, q), thead: s, ul: w, acronym: r, b: r, a: p, blockquote: v, caption: r, i: r, u: r, tbody: s, s: r, address: f(j, o), tt: r, legend: r, q: r, pre: f(m, i), p: r, em: r, dfn: r, section: v, header: v, footer: v, nav: v, article: v, aside: v, figure: v, dialog: v, hgroup: v, mark: r, time: r, meter: r, menu: r, command: r, keygen: r, output: r, progress: u, audio: u, video: u, details: u, datagrid: u, datalist: u};
    })();
    var f = a.dtd;
    d.event = function (g) {
        this.$ = g;
    };
    d.event.prototype = {getKey: function () {
        return this.$.keyCode || this.$.which;
    }, getKeystroke: function () {
        var h = this;
        var g = h.getKey();
        if (h.$.ctrlKey || h.$.metaKey)g += 1114112;
        if (h.$.shiftKey)g += 2228224;
        if (h.$.altKey)g += 4456448;
        return g;
    }, preventDefault: function (g) {
        var h = this.$;
        if (h.preventDefault)h.preventDefault(); else h.returnValue = false;
        if (g)this.stopPropagation();
    }, stopPropagation: function () {
        var g = this.$;
        if (g.stopPropagation)g.stopPropagation(); else g.cancelBubble = true;
    }, getTarget: function () {
        var g = this.$.target || this.$.srcElement;
        return g ? new d.node(g) : null;
    }};
    a.CTRL = 1114112;
    a.SHIFT = 2228224;
    a.ALT = 4456448;
    d.domObject = function (g) {
        if (g)this.$ = g;
    };
    d.domObject.prototype = (function () {
        var g = function (h, i) {
            return function (j) {
                if (typeof a != 'undefined')h.fire(i, new d.event(j));
            };
        };
        return{getPrivate: function () {
            var h;
            if (!(h = this.getCustomData('_')))this.setCustomData('_', h = {});
            return h;
        }, on: function (h) {
            var k = this;
            var i = k.getCustomData('_cke_nativeListeners');
            if (!i) {
                i = {};
                k.setCustomData('_cke_nativeListeners', i);
            }
            if (!i[h]) {
                var j = i[h] = g(k, h);
                if (k.$.attachEvent)k.$.attachEvent('on' + h, j); else if (k.$.addEventListener)k.$.addEventListener(h, j, !!a.event.useCapture);
            }
            return a.event.prototype.on.apply(k, arguments);
        }, removeListener: function (h) {
            var k = this;
            a.event.prototype.removeListener.apply(k, arguments);
            if (!k.hasListeners(h)) {
                var i = k.getCustomData('_cke_nativeListeners'), j = i && i[h];
                if (j) {
                    if (k.$.detachEvent)k.$.detachEvent('on' + h, j); else if (k.$.removeEventListener)k.$.removeEventListener(h, j, false);
                    delete i[h];
                }
            }
        }, removeAllListeners: function () {
            var k = this;
            var h = k.getCustomData('_cke_nativeListeners');
            for (var i in h) {
                var j = h[i];
                if (k.$.detachEvent)k.$.detachEvent('on' + i, j); else if (k.$.removeEventListener)k.$.removeEventListener(i, j, false);
                delete h[i];
            }
        }};
    })();
    (function (g) {
        var h = {};
        a.on('reset', function () {
            h = {};
        });
        g.equals = function (i) {
            return i && i.$ === this.$;
        };
        g.setCustomData = function (i, j) {
            var k = this.getUniqueId(), l = h[k] || (h[k] = {});
            l[i] = j;
            return this;
        };
        g.getCustomData = function (i) {
            var j = this.$['data-cke-expando'], k = j && h[j];
            return k && k[i];
        };
        g.removeCustomData = function (i) {
            var j = this.$['data-cke-expando'], k = j && h[j], l = k && k[i];
            if (typeof l != 'undefined')delete k[i];
            return l || null;
        };
        g.clearCustomData = function () {
            this.removeAllListeners();
            var i = this.$['data-cke-expando'];
            i && delete h[i];
        };
        g.getUniqueId = function () {
            return this.$['data-cke-expando'] || (this.$['data-cke-expando'] = e.getNextNumber());
        };
        a.event.implementOn(g);
    })(d.domObject.prototype);
    d.window = function (g) {
        d.domObject.call(this, g);
    };
    d.window.prototype = new d.domObject();
    e.extend(d.window.prototype, {focus: function () {
        if (b.webkit && this.$.parent)this.$.parent.focus();
        this.$.focus();
    }, getViewPaneSize: function () {
        var g = this.$.document, h = g.compatMode == 'CSS1Compat';
        return{width: (h ? g.documentElement.clientWidth : g.body.clientWidth) || 0, height: (h ? g.documentElement.clientHeight : g.body.clientHeight) || 0};
    }, getScrollPosition: function () {
        var g = this.$;
        if ('pageXOffset' in g)return{x: g.pageXOffset || 0, y: g.pageYOffset || 0}; else {
            var h = g.document;
            return{x: h.documentElement.scrollLeft || h.body.scrollLeft || 0, y: h.documentElement.scrollTop || h.body.scrollTop || 0};
        }
    }});
    d.document = function (g) {
        d.domObject.call(this, g);
    };
    var g = d.document;
    g.prototype = new d.domObject();
    e.extend(g.prototype, {appendStyleSheet: function (h) {
        if (this.$.createStyleSheet)this.$.createStyleSheet(h); else {
            var i = new d.element('link');
            i.setAttributes({rel: 'stylesheet', type: 'text/css', href: h});
            this.getHead().append(i);
        }
    }, appendStyleText: function (h) {
        var k = this;
        if (k.$.createStyleSheet) {
            var i = k.$.createStyleSheet('');
            i.cssText = h;
        } else {
            var j = new d.element('style', k);
            j.append(new d.text(h, k));
            k.getHead().append(j);
        }
    }, createElement: function (h, i) {
        var j = new d.element(h, this);
        if (i) {
            if (i.attributes)j.setAttributes(i.attributes);
            if (i.styles)j.setStyles(i.styles);
        }
        return j;
    }, createText: function (h) {
        return new d.text(h, this);
    }, focus: function () {
        this.getWindow().focus();
    }, getById: function (h) {
        var i = this.$.getElementById(h);
        return i ? new d.element(i) : null;
    }, getByAddress: function (h, i) {
        var j = this.$.documentElement;
        for (var k = 0; j && k < h.length; k++) {
            var l = h[k];
            if (!i) {
                j = j.childNodes[l];
                continue;
            }
            var m = -1;
            for (var n = 0; n < j.childNodes.length; n++) {
                var o = j.childNodes[n];
                if (i === true && o.nodeType == 3 && o.previousSibling && o.previousSibling.nodeType == 3)continue;
                m++;
                if (m == l) {
                    j = o;
                    break;
                }
            }
        }
        return j ? new d.node(j) : null;
    }, getElementsByTag: function (h, i) {
        if (!(c && !(document.documentMode > 8)) && i)h = i + ':' + h;
        return new d.nodeList(this.$.getElementsByTagName(h));
    }, getHead: function () {
        var h = this.$.getElementsByTagName('head')[0];
        if (!h)h = this.getDocumentElement().append(new d.element('head'), true); else h = new d.element(h);
        return(this.getHead = function () {
            return h;
        })();
    }, getBody: function () {
        var h = new d.element(this.$.body);
        return(this.getBody = function () {
            return h;
        })();
    }, getDocumentElement: function () {
        var h = new d.element(this.$.documentElement);
        return(this.getDocumentElement = function () {
            return h;
        })();
    }, getWindow: function () {
        var h = new d.window(this.$.parentWindow || this.$.defaultView);
        return(this.getWindow = function () {
            return h;
        })();
    }, write: function (h) {
        var i = this;
        i.$.open('text/html', 'replace');
        b.isCustomDomain() && (i.$.domain = document.domain);
        i.$.write(h);
        i.$.close();
    }});
    d.node = function (h) {
        if (h) {
            switch (h.nodeType) {
                case 9:
                    return new g(h);
                case 1:
                    return new d.element(h);
                case 3:
                    return new d.text(h);
            }
            d.domObject.call(this, h);
        }
        return this;
    };
    d.node.prototype = new d.domObject();
    a.NODE_ELEMENT = 1;
    a.NODE_DOCUMENT = 9;
    a.NODE_TEXT = 3;
    a.NODE_COMMENT = 8;
    a.NODE_DOCUMENT_FRAGMENT = 11;
    a.POSITION_IDENTICAL = 0;
    a.POSITION_DISCONNECTED = 1;
    a.POSITION_FOLLOWING = 2;
    a.POSITION_PRECEDING = 4;
    a.POSITION_IS_CONTAINED = 8;
    a.POSITION_CONTAINS = 16;
    e.extend(d.node.prototype, {appendTo: function (h, i) {
        h.append(this, i);
        return h;
    }, clone: function (h, i) {
        var j = this.$.cloneNode(h), k = function (l) {
            if (l.nodeType != 1)return;
            if (!i)l.removeAttribute('id', false);
            l.removeAttribute('data-cke-expando', false);
            if (h) {
                var m = l.childNodes;
                for (var n = 0; n < m.length; n++)k(m[n]);
            }
        };
        k(j);
        return new d.node(j);
    }, hasPrevious: function () {
        return!!this.$.previousSibling;
    }, hasNext: function () {
        return!!this.$.nextSibling;
    }, insertAfter: function (h) {
        h.$.parentNode.insertBefore(this.$, h.$.nextSibling);
        return h;
    }, insertBefore: function (h) {
        h.$.parentNode.insertBefore(this.$, h.$);
        return h;
    }, insertBeforeMe: function (h) {
        this.$.parentNode.insertBefore(h.$, this.$);
        return h;
    }, getAddress: function (h) {
        var i = [], j = this.getDocument().$.documentElement, k = this.$;
        while (k && k != j) {
            var l = k.parentNode;
            if (l)i.unshift(this.getIndex.call({$: k}, h));
            k = l;
        }
        return i;
    }, getDocument: function () {
        return new g(this.$.ownerDocument || this.$.parentNode.ownerDocument);
    }, getIndex: function (h) {
        var i = this.$, j = 0;
        while (i = i.previousSibling) {
            if (h && i.nodeType == 3 && (!i.nodeValue.length || i.previousSibling && i.previousSibling.nodeType == 3))continue;
            j++;
        }
        return j;
    }, getNextSourceNode: function (h, i, j) {
        if (j && !j.call) {
            var k = j;
            j = function (n) {
                return!n.equals(k);
            };
        }
        var l = !h && this.getFirst && this.getFirst(), m;
        if (!l) {
            if (this.type == 1 && j && j(this, true) === false)return null;
            l = this.getNext();
        }
        while (!l && (m = (m || this).getParent())) {
            if (j && j(m, true) === false)return null;
            l = m.getNext();
        }
        if (!l)return null;
        if (j && j(l) === false)return null;
        if (i && i != l.type)return l.getNextSourceNode(false, i, j);
        return l;
    }, getPreviousSourceNode: function (h, i, j) {
        if (j && !j.call) {
            var k = j;
            j = function (n) {
                return!n.equals(k);
            };
        }
        var l = !h && this.getLast && this.getLast(), m;
        if (!l) {
            if (this.type == 1 && j && j(this, true) === false)return null;
            l = this.getPrevious();
        }
        while (!l && (m = (m || this).getParent())) {
            if (j && j(m, true) === false)return null;
            l = m.getPrevious();
        }
        if (!l)return null;
        if (j && j(l) === false)return null;
        if (i && l.type != i)return l.getPreviousSourceNode(false, i, j);
        return l;
    }, getPrevious: function (h) {
        var i = this.$, j;
        do {
            i = i.previousSibling;
            j = i && new d.node(i);
        } while (j && h && !h(j));
        return j;
    }, getNext: function (h) {
        var i = this.$, j;
        do {
            i = i.nextSibling;
            j = i && new d.node(i);
        } while (j && h && !h(j));
        return j;
    }, getParent: function () {
        var h = this.$.parentNode;
        return h && h.nodeType == 1 ? new d.node(h) : null;
    }, getParents: function (h) {
        var i = this, j = [];
        do j[h ? 'push' : 'unshift'](i); while (i = i.getParent());
        return j;
    }, getCommonAncestor: function (h) {
        var j = this;
        if (h.equals(j))return j;
        if (h.contains && h.contains(j))return h;
        var i = j.contains ? j : j.getParent();
        do {
            if (i.contains(h))return i;
        } while (i = i.getParent());
        return null;
    }, getPosition: function (h) {
        var i = this.$, j = h.$;
        if (i.compareDocumentPosition)return i.compareDocumentPosition(j);
        if (i == j)return 0;
        if (this.type == 1 && h.type == 1) {
            if (i.contains) {
                if (i.contains(j))return 16 + 4;
                if (j.contains(i))return 8 + 2;
            }
            if ('sourceIndex' in i)return i.sourceIndex < 0 || j.sourceIndex < 0 ? 1 : i.sourceIndex < j.sourceIndex ? 4 : 2;
        }
        var k = this.getAddress(), l = h.getAddress(), m = Math.min(k.length, l.length);
        for (var n = 0; n <= m - 1; n++) {
            if (k[n] != l[n]) {
                if (n < m)return k[n] < l[n] ? 4 : 2;
                break;
            }
        }
        return k.length < l.length ? 16 + 4 : 8 + 2;
    }, getAscendant: function (h, i) {
        var j = this.$, k;
        if (!i)j = j.parentNode;
        while (j) {
            if (j.nodeName && (k = j.nodeName.toLowerCase(), typeof h == 'string' ? k == h : k in h))return new d.node(j);
            j = j.parentNode;
        }
        return null;
    }, hasAscendant: function (h, i) {
        var j = this.$;
        if (!i)j = j.parentNode;
        while (j) {
            if (j.nodeName && j.nodeName.toLowerCase() == h)return true;
            j = j.parentNode;
        }
        return false;
    }, move: function (h, i) {
        h.append(this.remove(), i);
    }, remove: function (h) {
        var i = this.$, j = i.parentNode;
        if (j) {
            if (h)for (var k; k = i.firstChild;)j.insertBefore(i.removeChild(k), i);
            j.removeChild(i);
        }
        return this;
    }, replace: function (h) {
        this.insertBefore(h);
        h.remove();
    }, trim: function () {
        this.ltrim();
        this.rtrim();
    }, ltrim: function () {
        var k = this;
        var h;
        while (k.getFirst && (h = k.getFirst())) {
            if (h.type == 3) {
                var i = e.ltrim(h.getText()), j = h.getLength();
                if (!i) {
                    h.remove();
                    continue;
                } else if (i.length < j) {
                    h.split(j - i.length);
                    k.$.removeChild(k.$.firstChild);
                }
            }
            break;
        }
    }, rtrim: function () {
        var k = this;
        var h;
        while (k.getLast && (h = k.getLast())) {
            if (h.type == 3) {
                var i = e.rtrim(h.getText()), j = h.getLength();
                if (!i) {
                    h.remove();
                    continue;
                } else if (i.length < j) {
                    h.split(i.length);
                    k.$.lastChild.parentNode.removeChild(k.$.lastChild);
                }
            }
            break;
        }
        if (!c && !b.opera) {
            h = k.$.lastChild;
            if (h && h.type == 1 && h.nodeName.toLowerCase() == 'br')h.parentNode.removeChild(h);
        }
    }, isReadOnly: function () {
        var h = this;
        if (this.type != 1)h = this.getParent();
        if (h && typeof h.$.isContentEditable != 'undefined')return!(h.$.isContentEditable || h.data('cke-editable')); else {
            var i = h;
            while (i) {
                if (i.is('body') || !!i.data('cke-editable'))break;
                if (i.getAttribute('contentEditable') == 'false')return true; else if (i.getAttribute('contentEditable') == 'true')break;
                i = i.getParent();
            }
            return false;
        }
    }});
    d.nodeList = function (h) {
        this.$ = h;
    };
    d.nodeList.prototype = {count: function () {
        return this.$.length;
    }, getItem: function (h) {
        var i = this.$[h];
        return i ? new d.node(i) : null;
    }};
    d.element = function (h, i) {
        if (typeof h == 'string')h = (i ? i.$ : document).createElement(h);
        d.domObject.call(this, h);
    };
    var h = d.element;
    h.get = function (i) {
        return i && (i.$ ? i : new h(i));
    };
    h.prototype = new d.node();
    h.createFromHtml = function (i, j) {
        var k = new h('div', j);
        k.setHtml(i);
        return k.getFirst().remove();
    };
    h.setMarker = function (i, j, k, l) {
        var m = j.getCustomData('list_marker_id') || j.setCustomData('list_marker_id', e.getNextNumber()).getCustomData('list_marker_id'), n = j.getCustomData('list_marker_names') || j.setCustomData('list_marker_names', {}).getCustomData('list_marker_names');
        i[m] = j;
        n[k] = 1;
        return j.setCustomData(k, l);
    };
    h.clearAllMarkers = function (i) {
        for (var j in i)h.clearMarkers(i, i[j], 1);
    };
    h.clearMarkers = function (i, j, k) {
        var l = j.getCustomData('list_marker_names'), m = j.getCustomData('list_marker_id');
        for (var n in l)j.removeCustomData(n);
        j.removeCustomData('list_marker_names');
        if (k) {
            j.removeCustomData('list_marker_id');
            delete i[m];
        }
    };
    e.extend(h.prototype, {type: 1, addClass: function (i) {
        var j = this.$.className;
        if (j) {
            var k = new RegExp('(?:^|\\s)' + i + '(?:\\s|$)', '');
            if (!k.test(j))j += ' ' + i;
        }
        this.$.className = j || i;
    }, removeClass: function (i) {
        var j = this.getAttribute('class');
        if (j) {
            var k = new RegExp('(?:^|\\s+)' + i + '(?=\\s|$)', 'i');
            if (k.test(j)) {
                j = j.replace(k, '').replace(/^\s+/, '');
                if (j)this.setAttribute('class', j); else this.removeAttribute('class');
            }
        }
    }, hasClass: function (i) {
        var j = new RegExp('(?:^|\\s+)' + i + '(?=\\s|$)', '');
        return j.test(this.getAttribute('class'));
    }, append: function (i, j) {
        var k = this;
        if (typeof i == 'string')i = k.getDocument().createElement(i);
        if (j)k.$.insertBefore(i.$, k.$.firstChild); else k.$.appendChild(i.$);
        return i;
    }, appendHtml: function (i) {
        var k = this;
        if (!k.$.childNodes.length)k.setHtml(i); else {
            var j = new h('div', k.getDocument());
            j.setHtml(i);
            j.moveChildren(k);
        }
    }, appendText: function (i) {
        if (this.$.text != undefined)this.$.text += i; else this.append(new d.text(i));
    }, appendBogus: function () {
        var k = this;
        var i = k.getLast();
        while (i && i.type == 3 && !e.rtrim(i.getText()))i = i.getPrevious();
        if (!i || !i.is || !i.is('br')) {
            var j = b.opera ? k.getDocument().createText('') : k.getDocument().createElement('br');
            b.gecko && j.setAttribute('type', '_moz');
            k.append(j);
        }
    }, breakParent: function (i) {
        var l = this;
        var j = new d.range(l.getDocument());
        j.setStartAfter(l);
        j.setEndAfter(i);
        var k = j.extractContents();
        j.insertNode(l.remove());
        k.insertAfterNode(l);
    }, contains: c || b.webkit ? function (i) {
        var j = this.$;
        return i.type != 1 ? j.contains(i.getParent().$) : j != i.$ && j.contains(i.$);
    } : function (i) {
        return!!(this.$.compareDocumentPosition(i.$) & 16);
    }, focus: (function () {
        function i() {
            try {
                this.$.focus();
            } catch (j) {
            }
        };
        return function (j) {
            if (j)e.setTimeout(i, 100, this);
            else i.call(this);
        };
    })(), getHtml: function () {
        var i = this.$.innerHTML;
        return c ? i.replace(/<\?[^>]*>/g, '') : i;
    }, getOuterHtml: function () {
        var j = this;
        if (j.$.outerHTML)return j.$.outerHTML.replace(/<\?[^>]*>/, '');
        var i = j.$.ownerDocument.createElement('div');
        i.appendChild(j.$.cloneNode(true));
        return i.innerHTML;
    }, setHtml: function (i) {
        return this.$.innerHTML = i;
    }, setText: function (i) {
        h.prototype.setText = this.$.innerText != undefined ? function (j) {
            return this.$.innerText = j;
        } : function (j) {
            return this.$.textContent = j;
        };
        return this.setText(i);
    }, getAttribute: (function () {
        var i = function (j) {
            return this.$.getAttribute(j, 2);
        };
        if (c && (b.ie7Compat || b.ie6Compat))return function (j) {
            var n = this;
            switch (j) {
                case 'class':
                    j = 'className';
                    break;
                case 'http-equiv':
                    j = 'httpEquiv';
                    break;
                case 'name':
                    return n.$.name;
                case 'tabindex':
                    var k = i.call(n, j);
                    if (k !== 0 && n.$.tabIndex === 0)k = null;
                    return k;
                    break;
                case 'checked':
                    var l = n.$.attributes.getNamedItem(j), m = l.specified ? l.nodeValue : n.$.checked;
                    return m ? 'checked' : null;
                case 'hspace':
                case 'value':
                    return n.$[j];
                case 'style':
                    return n.$.style.cssText;
            }
            return i.call(n, j);
        }; else return i;
    })(), getChildren: function () {
        return new d.nodeList(this.$.childNodes);
    }, getComputedStyle: c ? function (i) {
        return this.$.currentStyle[e.cssStyleToDomStyle(i)];
    } : function (i) {
        return this.getWindow().$.getComputedStyle(this.$, '').getPropertyValue(i);
    }, getDtd: function () {
        var i = f[this.getName()];
        this.getDtd = function () {
            return i;
        };
        return i;
    }, getElementsByTag: g.prototype.getElementsByTag, getTabIndex: c ? function () {
        var i = this.$.tabIndex;
        if (i === 0 && !f.$tabIndex[this.getName()] && parseInt(this.getAttribute('tabindex'), 10) !== 0)i = -1;
        return i;
    } : b.webkit ? function () {
        var i = this.$.tabIndex;
        if (i == undefined) {
            i = parseInt(this.getAttribute('tabindex'), 10);
            if (isNaN(i))i = -1;
        }
        return i;
    } : function () {
        return this.$.tabIndex;
    }, getText: function () {
        return this.$.textContent || this.$.innerText || '';
    }, getWindow: function () {
        return this.getDocument().getWindow();
    }, getId: function () {
        return this.$.id || null;
    }, getNameAtt: function () {
        return this.$.name || null;
    }, getName: function () {
        var i = this.$.nodeName.toLowerCase();
        if (c && !(document.documentMode > 8)) {
            var j = this.$.scopeName;
            if (j != 'HTML')i = j.toLowerCase() + ':' + i;
        }
        return(this.getName = function () {
            return i;
        })();
    }, getValue: function () {
        return this.$.value;
    }, getFirst: function (i) {
        var j = this.$.firstChild, k = j && new d.node(j);
        if (k && i && !i(k))k = k.getNext(i);
        return k;
    }, getLast: function (i) {
        var j = this.$.lastChild, k = j && new d.node(j);
        if (k && i && !i(k))k = k.getPrevious(i);
        return k;
    }, getStyle: function (i) {
        return this.$.style[e.cssStyleToDomStyle(i)];
    }, is: function () {
        var i = this.getName();
        for (var j = 0; j < arguments.length; j++) {
            if (arguments[j] == i)return true;
        }
        return false;
    }, isEditable: function (i) {
        var l = this;
        var j = l.getName();
        if (l.isReadOnly() || l.getComputedStyle('display') == 'none' || l.getComputedStyle('visibility') == 'hidden' || f.$nonEditable[j])return false;
        if (i !== false) {
            var k = f[j] || f.span;
            return k && k['#'];
        }
        return true;
    }, isIdentical: function (i) {
        if (this.getName() != i.getName())return false;
        var j = this.$.attributes, k = i.$.attributes, l = j.length, m = k.length;
        for (var n = 0; n < l; n++) {
            var o = j[n];
            if (o.nodeName == '_moz_dirty')continue;
            if ((!c || o.specified && o.nodeName != 'data-cke-expando') && o.nodeValue != i.getAttribute(o.nodeName))return false;
        }
        if (c)for (n = 0; n < m; n++) {
            o = k[n];
            if (o.specified && o.nodeName != 'data-cke-expando' && o.nodeValue != this.getAttribute(o.nodeName))return false;
        }
        return true;
    }, isVisible: function () {
        var l = this;
        var i = (l.$.offsetHeight || l.$.offsetWidth) && l.getComputedStyle('visibility') != 'hidden', j, k;
        if (i && (b.webkit || b.opera)) {
            j = l.getWindow();
            if (!j.equals(a.document.getWindow()) && (k = j.$.frameElement))i = new h(k).isVisible();
        }
        return!!i;
    }, isEmptyInlineRemoveable: function () {
        if (!f.$removeEmpty[this.getName()])return false;
        var i = this.getChildren();
        for (var j = 0, k = i.count(); j < k; j++) {
            var l = i.getItem(j);
            if (l.type == 1 && l.data('cke-bookmark'))continue;
            if (l.type == 1 && !l.isEmptyInlineRemoveable() || l.type == 3 && e.trim(l.getText()))return false;
        }
        return true;
    }, hasAttributes: c && (b.ie7Compat || b.ie6Compat) ? function () {
        var i = this.$.attributes;
        for (var j = 0; j < i.length; j++) {
            var k = i[j];
            switch (k.nodeName) {
                case 'class':
                    if (this.getAttribute('class'))return true;
                case 'data-cke-expando':
                    continue;
                default:
                    if (k.specified)return true;
            }
        }
        return false;
    } : function () {
        var i = this.$.attributes, j = i.length, k = {'data-cke-expando': 1, _moz_dirty: 1};
        return j > 0 && (j > 2 || !k[i[0].nodeName] || j == 2 && !k[i[1].nodeName]);
    }, hasAttribute: (function () {
        function i(j) {
            var k = this.$.attributes.getNamedItem(j);
            return!!(k && k.specified);
        };
        return c && b.version < 8 ? function (j) {
            if (j == 'name')return!!this.$.name;
            return i.call(this, j);
        } : i;
    })(), hide: function () {
        this.setStyle('display', 'none');
    }, moveChildren: function (i, j) {
        var k = this.$;
        i = i.$;
        if (k == i)return;
        var l;
        if (j)while (l = k.lastChild)i.insertBefore(k.removeChild(l), i.firstChild); else while (l = k.firstChild)i.appendChild(k.removeChild(l));
    }, mergeSiblings: (function () {
        function i(j, k, l) {
            if (k && k.type == 1) {
                var m = [];
                while (k.data('cke-bookmark') || k.isEmptyInlineRemoveable()) {
                    m.push(k);
                    k = l ? k.getNext() : k.getPrevious();
                    if (!k || k.type != 1)return;
                }
                if (j.isIdentical(k)) {
                    var n = l ? j.getLast() : j.getFirst();
                    while (m.length)m.shift().move(j, !l);
                    k.moveChildren(j, !l);
                    k.remove();
                    if (n && n.type == 1)n.mergeSiblings();
                }
            }
        };
        return function (j) {
            var k = this;
            if (!(j === false || f.$removeEmpty[k.getName()] || k.is('a')))return;
            i(k, k.getNext(), true);
            i(k, k.getPrevious());
        };
    })(), show: function () {
        this.setStyles({display: '', visibility: ''});
    }, setAttribute: (function () {
        var i = function (j, k) {
            this.$.setAttribute(j, k);
            return this;
        };
        if (c && (b.ie7Compat || b.ie6Compat))return function (j, k) {
            var l = this;
            if (j == 'class')l.$.className = k; else if (j == 'style')l.$.style.cssText = k; else if (j == 'tabindex')l.$.tabIndex = k; else if (j == 'checked')l.$.checked = k; else i.apply(l, arguments);
            return l;
        }; else if (b.ie8Compat && b.secure)return function (j, k) {
            if (j == 'src' && k.match(/^http:\/\//))try {
                i.apply(this, arguments);
            } catch (l) {
            } else i.apply(this, arguments);
            return this;
        }; else return i;
    })(), setAttributes: function (i) {
        for (var j in i)this.setAttribute(j, i[j]);
        return this;
    }, setValue: function (i) {
        this.$.value = i;
        return this;
    }, removeAttribute: (function () {
        var i = function (j) {
            this.$.removeAttribute(j);
        };
        if (c && (b.ie7Compat || b.ie6Compat))return function (j) {
            if (j == 'class')j = 'className'; else if (j == 'tabindex')j = 'tabIndex';
            i.call(this, j);
        }; else return i;
    })(), removeAttributes: function (i) {
        if (e.isArray(i))for (var j = 0; j < i.length; j++)this.removeAttribute(i[j]); else for (var k in i)i.hasOwnProperty(k) && this.removeAttribute(k);
    }, removeStyle: function (i) {
        var j = this;
        j.setStyle(i, '');
        if (j.$.style.removeAttribute)j.$.style.removeAttribute(e.cssStyleToDomStyle(i));
        if (!j.$.style.cssText)j.removeAttribute('style');
    }, setStyle: function (i, j) {
        this.$.style[e.cssStyleToDomStyle(i)] = j;
        return this;
    }, setStyles: function (i) {
        for (var j in i)this.setStyle(j, i[j]);
        return this;
    }, setOpacity: function (i) {
        if (c) {
            i = Math.round(i * 100);
            this.setStyle('filter', i >= 100 ? '' : 'progid:DXImageTransform.Microsoft.Alpha(opacity=' + i + ')');
        } else this.setStyle('opacity', i);
    }, unselectable: b.gecko ? function () {
        this.$.style.MozUserSelect = 'none';
        this.on('dragstart', function (i) {
            i.data.preventDefault();
        });
    } : b.webkit ? function () {
        this.$.style.KhtmlUserSelect = 'none';
        this.on('dragstart', function (i) {
            i.data.preventDefault();
        });
    } : function () {
        if (c || b.opera) {
            var i = this.$, j, k = 0;
            i.unselectable = 'on';
            while (j = i.all[k++])switch (j.tagName.toLowerCase()) {
                case 'iframe':
                case 'textarea':
                case 'input':
                case 'select':
                    break;
                default:
                    j.unselectable = 'on';
            }
        }
    }, getPositionedAncestor: function () {
        var i = this;
        while (i.getName() != 'html') {
            if (i.getComputedStyle('position') != 'static')return i;
            i = i.getParent();
        }
        return null;
    }, getDocumentPosition: function (i) {
        var D = this;
        var j = 0, k = 0, l = D.getDocument(), m = l.getBody(), n = l.$.compatMode == 'BackCompat';
        if (document.documentElement.getBoundingClientRect) {
            var o = D.$.getBoundingClientRect(), p = l.$, q = p.documentElement, r = q.clientTop || m.$.clientTop || 0, s = q.clientLeft || m.$.clientLeft || 0, t = true;
            if (c) {
                var u = l.getDocumentElement().contains(D), v = l.getBody().contains(D);
                t = n && v || !n && u;
            }
            if (t) {
                j = o.left + (!n && q.scrollLeft || m.$.scrollLeft);
                j -= s;
                k = o.top + (!n && q.scrollTop || m.$.scrollTop);
                k -= r;
            }
        } else {
            var w = D, x = null, y;
            while (w && !(w.getName() == 'body' || w.getName() == 'html')) {
                j += w.$.offsetLeft - w.$.scrollLeft;
                k += w.$.offsetTop - w.$.scrollTop;
                if (!w.equals(D)) {
                    j += w.$.clientLeft || 0;
                    k += w.$.clientTop || 0;
                }
                var z = x;
                while (z && !z.equals(w)) {
                    j -= z.$.scrollLeft;
                    k -= z.$.scrollTop;
                    z = z.getParent();
                }
                x = w;
                w = (y = w.$.offsetParent) ? new h(y) : null;
            }
        }
        if (i) {
            var A = D.getWindow(), B = i.getWindow();
            if (!A.equals(B) && A.$.frameElement) {
                var C = new h(A.$.frameElement).getDocumentPosition(i);
                j += C.x;
                k += C.y;
            }
        }
        if (!document.documentElement.getBoundingClientRect)if (b.gecko && !n) {
            j += D.$.clientLeft ? 1 : 0;
            k += D.$.clientTop ? 1 : 0;
        }
        return{x: j, y: k};
    }, scrollIntoView: function (i) {
        var o = this;
        var j = o.getWindow(), k = j.getViewPaneSize().height, l = k * -1;
        if (i)l += k; else {
            l += o.$.offsetHeight || 0;
            l += parseInt(o.getComputedStyle('marginBottom') || 0, 10) || 0;
        }
        var m = o.getDocumentPosition();
        l += m.y;
        l = l < 0 ? 0 : l;
        var n = j.getScrollPosition().y;
        if (l > n || l < n - k)j.$.scrollTo(0, l);
    }, setState: function (i) {
        var j = this;
        switch (i) {
            case 1:
                j.addClass('cke_on');
                j.removeClass('cke_off');
                j.removeClass('cke_disabled');
                break;
            case 0:
                j.addClass('cke_disabled');
                j.removeClass('cke_off');
                j.removeClass('cke_on');
                break;
            default:
                j.addClass('cke_off');
                j.removeClass('cke_on');
                j.removeClass('cke_disabled');
                break;
        }
    }, getFrameDocument: function () {
        var i = this.$;
        try {
            i.contentWindow.document;
        } catch (j) {
            i.src = i.src;
            if (c && b.version < 7)window.showModalDialog('javascript:document.write("<script>window.setTimeout(function(){window.close();},50);</script>")');
        }
        return i && new g(i.contentWindow.document);
    }, copyAttributes: function (i, j) {
        var p = this;
        var k = p.$.attributes;
        j = j || {};
        for (var l = 0; l < k.length; l++) {
            var m = k[l], n = m.nodeName.toLowerCase(), o;
            if (n in j)continue;
            if (n == 'checked' && (o = p.getAttribute(n)))i.setAttribute(n, o); else if (m.specified || c && m.nodeValue && n == 'value') {
                o = p.getAttribute(n);
                if (o === null)o = m.nodeValue;
                i.setAttribute(n, o);
            }
        }
        if (p.$.style.cssText !== '')i.$.style.cssText = p.$.style.cssText;
    }, renameNode: function (i) {
        var l = this;
        if (l.getName() == i)return;
        var j = l.getDocument(), k = new h(i, j);
        l.copyAttributes(k);
        l.moveChildren(k);
        l.getParent() && l.$.parentNode.replaceChild(k.$, l.$);
        k.$['data-cke-expando'] = l.$['data-cke-expando'];
        l.$ = k.$;
    }, getChild: function (i) {
        var j = this.$;
        if (!i.slice)j = j.childNodes[i]; else while (i.length > 0 && j)j = j.childNodes[i.shift()];
        return j ? new d.node(j) : null;
    }, getChildCount: function () {
        return this.$.childNodes.length;
    }, disableContextMenu: function () {
        this.on('contextmenu', function (i) {
            if (!i.data.getTarget().hasClass('cke_enable_context_menu'))i.data.preventDefault();
        });
    }, getDirection: function (i) {
        var j = this;
        return i ? j.getComputedStyle('direction') || j.getDirection() || j.getDocument().$.dir || j.getDocument().getBody().getDirection(1) : j.getStyle('direction') || j.getAttribute('dir');
    }, data: function (i, j) {
        i = 'data-' + i;
        if (j === undefined)return this.getAttribute(i); else if (j === false)this.removeAttribute(i); else this.setAttribute(i, j);
        return null;
    }});
    (function () {
        var i = {width: ['border-left-width', 'border-right-width', 'padding-left', 'padding-right'], height: ['border-top-width', 'border-bottom-width', 'padding-top', 'padding-bottom']};

        function j(k) {
            var l = 0;
            for (var m = 0, n = i[k].length; m < n; m++)l += parseInt(this.getComputedStyle(i[k][m]) || 0, 10) || 0;
            return l;
        };
        h.prototype.setSize = function (k, l, m) {
            if (typeof l == 'number') {
                if (m && !(c && b.quirks))l -= j.call(this, k);
                this.setStyle(k, l + 'px');
            }
        };
        h.prototype.getSize = function (k, l) {
            var m = Math.max(this.$['offset' + e.capitalize(k)], this.$['client' + e.capitalize(k)]) || 0;
            if (l)m -= j.call(this, k);
            return m;
        };
    })();
    a.command = function (i, j) {
        this.uiItems = [];
        this.exec = function (k) {
            if (this.state == 0)return false;
            if (this.editorFocus)i.focus();
            return j.exec.call(this, i, k) !== false;
        };
        e.extend(this, j, {modes: {wysiwyg: 1}, editorFocus: 1, state: 2});
        a.event.call(this);
    };
    a.command.prototype = {enable: function () {
        var i = this;
        if (i.state == 0)i.setState(!i.preserveState || typeof i.previousState == 'undefined' ? 2 : i.previousState);
    }, disable: function () {
        this.setState(0);
    }, setState: function (i) {
        var j = this;
        if (j.state == i)return false;
        j.previousState = j.state;
        j.state = i;
        j.fire('state');
        return true;
    }, toggleState: function () {
        var i = this;
        if (i.state == 2)i.setState(1); else if (i.state == 1)i.setState(2);
    }};
    a.event.implementOn(a.command.prototype, true);
    a.ENTER_P = 1;
    a.ENTER_BR = 2;
    a.ENTER_DIV = 3;
    a.config = {customConfig: 'config.js', autoUpdateElement: true, baseHref: '', contentsCss: a.basePath + 'contents.css', contentsLangDirection: 'ui', contentsLanguage: '', language: '', defaultLanguage: 'en', enterMode: 1, forceEnterMode: false, shiftEnterMode: 2, corePlugins: '', docType: '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">', bodyId: '', bodyClass: '', fullPage: false, height: 200, plugins: 'about,a11yhelp,basicstyles,bidi,blockquote,button,clipboard,colorbutton,colordialog,contextmenu,dialogadvtab,div,elementspath,enterkey,entities,filebrowser,find,flash,font,format,forms,horizontalrule,htmldataprocessor,iframe,image,indent,justify,keystrokes,link,list,liststyle,maximize,newpage,pagebreak,pastefromword,pastetext,popup,preview,print,removeformat,resize,save,scayt,smiley,showblocks,showborders,sourcearea,stylescombo,table,tabletools,specialchar,tab,templates,toolbar,undo,wysiwygarea,wsc', extraPlugins: '', removePlugins: '', protectedSource: [], tabIndex: 0, theme: 'default', skin: 'kama', width: '', baseFloatZIndex: 10000};
    var i = a.config;
    a.focusManager = function (j) {
        if (j.focusManager)return j.focusManager;
        this.hasFocus = false;
        this._ = {editor: j};
        return this;
    };
    a.focusManager.prototype = {focus: function () {
        var k = this;
        if (k._.timer)clearTimeout(k._.timer);
        if (!k.hasFocus) {
            if (a.currentInstance)a.currentInstance.focusManager.forceBlur();
            var j = k._.editor;
            j.container.getChild(1).addClass('cke_focus');
            k.hasFocus = true;
            j.fire('focus');
        }
    }, blur: function () {
        var j = this;
        if (j._.timer)clearTimeout(j._.timer);
        j._.timer = setTimeout(function () {
            delete j._.timer;
            j.forceBlur();
        }, 100);
    }, forceBlur: function () {
        if (this.hasFocus) {
            var j = this._.editor;
            j.container.getChild(1).removeClass('cke_focus');
            this.hasFocus = false;
            j.fire('blur');
        }
    }};
    (function () {
        var j = {};
        a.lang = {languages: {af: 1, ar: 1, bg: 1, bn: 1, bs: 1, ca: 1, cs: 1, cy: 1, da: 1, de: 1, el: 1, 'en-au': 1, 'en-ca': 1, 'en-gb': 1, en: 1, eo: 1, es: 1, et: 1, eu: 1, fa: 1, fi: 1, fo: 1, 'fr-ca': 1, fr: 1, gl: 1, gu: 1, he: 1, hi: 1, hr: 1, hu: 1, is: 1, it: 1, ja: 1, ka: 1, km: 1, ko: 1, lt: 1, lv: 1, mn: 1, ms: 1, nb: 1, nl: 1, no: 1, pl: 1, 'pt-br': 1, pt: 1, ro: 1, ru: 1, sk: 1, sl: 1, 'sr-latn': 1, sr: 1, sv: 1, th: 1, tr: 1, uk: 1, vi: 1, 'zh-cn': 1, zh: 1}, load: function (k, l, m) {
            if (!k || !a.lang.languages[k])k = this.detect(l, k);
            if (!this[k])a.scriptLoader.load(a.getUrl('lang/' + k + '.js'), function () {
                m(k, this[k]);
            }, this); else m(k, this[k]);
        }, detect: function (k, l) {
            var m = this.languages;
            l = l || navigator.userLanguage || navigator.language || k;
            var n = l.toLowerCase().match(/([a-z]+)(?:-([a-z]+))?/), o = n[1], p = n[2];
            if (m[o + '-' + p])o = o + '-' + p; else if (!m[o])o = null;
            a.lang.detect = o ? function () {
                return o;
            } : function (q) {
                return q;
            };
            return o || k;
        }};
    })();
    a.scriptLoader = (function () {
        var j = {}, k = {};
        return{load: function (l, m, n, o) {
            var p = typeof l == 'string';
            if (p)l = [l];
            if (!n)n = a;
            var q = l.length, r = [], s = [], t = function (y) {
                if (m)if (p)m.call(n, y); else m.call(n, r, s);
            };
            if (q === 0) {
                t(true);
                return;
            }
            var u = function (y, z) {
                (z ? r : s).push(y);
                if (--q <= 0) {
                    o && a.document.getDocumentElement().removeStyle('cursor');
                    t(z);
                }
            }, v = function (y, z) {
                j[y] = 1;
                var A = k[y];
                delete k[y];
                for (var B = 0; B < A.length; B++)A[B](y, z);
            }, w = function (y) {
                if (j[y]) {
                    u(y, true);
                    return;
                }
                var z = k[y] || (k[y] = []);
                z.push(u);
                if (z.length > 1)return;
                var A = new h('script');
                A.setAttributes({type: 'text/javascript', src: y});
                if (m)if (c)A.$.onreadystatechange = function () {
                    if (A.$.readyState == 'loaded' || A.$.readyState == 'complete') {
                        A.$.onreadystatechange = null;
                        v(y, true);
                    }
                }; else {
                    A.$.onload = function () {
                        setTimeout(function () {
                            v(y, true);
                        }, 0);
                    };
                    A.$.onerror = function () {
                        v(y, false);
                    };
                }
                A.appendTo(a.document.getHead());
            };
            o && a.document.getDocumentElement().setStyle('cursor', 'wait');
            for (var x = 0; x < q; x++)w(l[x]);
        }};
    })();
    a.resourceManager = function (j, k) {
        var l = this;
        l.basePath = j;
        l.fileName = k;
        l.registered = {};
        l.loaded = {};
        l.externals = {};
        l._ = {waitingList: {}};
    };
    a.resourceManager.prototype = {add: function (j, k) {
        if (this.registered[j])throw '[CKEDITOR.resourceManager.add] The resource name "' + j + '" is already registered.';
        a.fire(j + e.capitalize(this.fileName) + 'Ready', this.registered[j] = k || {});
    }, get: function (j) {
        return this.registered[j] || null;
    }, getPath: function (j) {
        var k = this.externals[j];
        return a.getUrl(k && k.dir || this.basePath + j + '/');
    }, getFilePath: function (j) {
        var k = this.externals[j];
        return a.getUrl(this.getPath(j) + (k && typeof k.file == 'string' ? k.file : this.fileName + '.js'));
    }, addExternal: function (j, k, l) {
        j = j.split(',');
        for (var m = 0; m < j.length; m++) {
            var n = j[m];
            this.externals[n] = {dir: k, file: l};
        }
    }, load: function (j, k, l) {
        if (!e.isArray(j))j = j ? [j] : [];
        var m = this.loaded, n = this.registered, o = [], p = {}, q = {};
        for (var r = 0; r < j.length; r++) {
            var s = j[r];
            if (!s)continue;
            if (!m[s] && !n[s]) {
                var t = this.getFilePath(s);
                o.push(t);
                if (!(t in p))p[t] = [];
                p[t].push(s);
            } else q[s] = this.get(s);
        }
        a.scriptLoader.load(o, function (u, v) {
            if (v.length)throw '[CKEDITOR.resourceManager.load] Resource name "' + p[v[0]].join(',') + '" was not found at "' + v[0] + '".';
            for (var w = 0; w < u.length; w++) {
                var x = p[u[w]];
                for (var y = 0; y < x.length; y++) {
                    var z = x[y];
                    q[z] = this.get(z);
                    m[z] = 1;
                }
            }
            k.call(l, q);
        }, this);
    }};
    a.plugins = new a.resourceManager('plugins/', 'plugin');
    var j = a.plugins;
    j.load = e.override(j.load, function (k) {
        return function (l, m, n) {
            var o = {}, p = function (q) {
                k.call(this, q, function (r) {
                    e.extend(o, r);
                    var s = [];
                    for (var t in r) {
                        var u = r[t], v = u && u.requires;
                        if (v)for (var w = 0; w < v.length; w++) {
                            if (!o[v[w]])s.push(v[w]);
                        }
                    }
                    if (s.length)p.call(this, s); else {
                        for (t in o) {
                            u = o[t];
                            if (u.onLoad && !u.onLoad._called) {
                                u.onLoad();
                                u.onLoad._called = 1;
                            }
                        }
                        if (m)m.call(n || window, o);
                    }
                }, this);
            };
            p.call(this, l);
        };
    });
    j.setLang = function (k, l, m) {
        var n = this.get(k), o = n.langEntries || (n.langEntries = {}), p = n.lang || (n.lang = []);
        if (e.indexOf(p, l) == -1)p.push(l);
        o[l] = m;
    };
    a.skins = (function () {
        var k = {}, l = {}, m = function (n, o, p, q) {
            var r = k[o];
            if (!n.skin) {
                n.skin = r;
                if (r.init)r.init(n);
            }
            var s = function (B) {
                for (var C = 0; C < B.length; C++)B[C] = a.getUrl(l[o] + B[C]);
            };

            function t(B, C) {
                return B.replace(/url\s*\(([\s'"]*)(.*?)([\s"']*)\)/g, function (D, E, F, G) {
                    if (/^\/|^\w?:/.test(F))return D; else return 'url(' + C + E + F + G + ')';
                });
            };
            p = r[p];
            var u = !p || !!p._isLoaded;
            if (u)q && q(); else {
                var v = p._pending || (p._pending = []);
                v.push(q);
                if (v.length > 1)return;
                var w = !p.css || !p.css.length, x = !p.js || !p.js.length, y = function () {
                    if (w && x) {
                        p._isLoaded = 1;
                        for (var B = 0; B < v.length; B++) {
                            if (v[B])v[B]();
                        }
                    }
                };
                if (!w) {
                    var z = p.css;
                    if (e.isArray(z)) {
                        s(z);
                        for (var A = 0; A < z.length; A++)a.document.appendStyleSheet(z[A]);
                    } else {
                        z = t(z, a.getUrl(l[o]));
                        a.document.appendStyleText(z);
                    }
                    p.css = z;
                    w = 1;
                }
                if (!x) {
                    s(p.js);
                    a.scriptLoader.load(p.js, function () {
                        x = 1;
                        y();
                    });
                }
                y();
            }
        };
        return{add: function (n, o) {
            k[n] = o;
            o.skinPath = l[n] || (l[n] = a.getUrl('skins/' + n + '/'));
        }, load: function (n, o, p) {
            var q = n.skinName, r = n.skinPath;
            if (k[q])m(n, q, o, p); else {
                l[q] = r;
                a.scriptLoader.load(a.getUrl(r + 'skin.js'), function () {
                    m(n, q, o, p);
                });
            }
        }};
    })();
    a.themes = new a.resourceManager('themes/', 'theme');
    a.ui = function (k) {
        if (k.ui)return k.ui;
        this._ = {handlers: {}, items: {}, editor: k};
        return this;
    };
    var k = a.ui;
    k.prototype = {add: function (l, m, n) {
        this._.items[l] = {type: m, command: n.command || null, args: Array.prototype.slice.call(arguments, 2)};
    }, create: function (l) {
        var q = this;
        var m = q._.items[l], n = m && q._.handlers[m.type], o = m && m.command && q._.editor.getCommand(m.command), p = n && n.create.apply(q, m.args);
        m && (p = e.extend(p, q._.editor.skin[m.type], true));
        if (o)o.uiItems.push(p);
        return p;
    }, addHandler: function (l, m) {
        this._.handlers[l] = m;
    }};
    a.event.implementOn(k);
    (function () {
        var l = 0, m = function () {
            var x = 'editor' + ++l;
            return a.instances && a.instances[x] ? m() : x;
        }, n = {}, o = function (x) {
            var y = x.config.customConfig;
            if (!y)return false;
            y = a.getUrl(y);
            var z = n[y] || (n[y] = {});
            if (z.fn) {
                z.fn.call(x, x.config);
                if (a.getUrl(x.config.customConfig) == y || !o(x))x.fireOnce('customConfigLoaded');
            } else a.scriptLoader.load(y, function () {
                if (a.editorConfig)z.fn = a.editorConfig; else z.fn = function () {
                };
                o(x);
            });
            return true;
        }, p = function (x, y) {
            x.on('customConfigLoaded', function () {
                if (y) {
                    if (y.on)for (var z in y.on)x.on(z, y.on[z]);
                    e.extend(x.config, y, true);
                    delete x.config.on;
                }
                q(x);
            });
            if (y && y.customConfig != undefined)x.config.customConfig = y.customConfig;
            if (!o(x))x.fireOnce('customConfigLoaded');
        }, q = function (x) {
            var y = x.config.skin.split(','), z = y[0], A = a.getUrl(y[1] || 'skins/' + z + '/');
            x.skinName = z;
            x.skinPath = A;
            x.skinClass = 'cke_skin_' + z;
            x.tabIndex = x.config.tabIndex || x.element.getAttribute('tabindex') || 0;
            x.readOnly = !!(x.config.readOnly || x.element.getAttribute('disabled'));
            x.fireOnce('configLoaded');
            t(x);
        }, r = function (x) {
            a.lang.load(x.config.language, x.config.defaultLanguage, function (y, z) {
                x.langCode = y;
                x.lang = e.prototypedCopy(z);
                if (b.gecko && b.version < 10900 && x.lang.dir == 'rtl')x.lang.dir = 'ltr';
                x.fire('langLoaded');
                var A = x.config;
                A.contentsLangDirection == 'ui' && (A.contentsLangDirection = x.lang.dir);
                s(x);
            });
        }, s = function (x) {
            var y = x.config, z = y.plugins, A = y.extraPlugins, B = y.removePlugins;
            if (A) {
                var C = new RegExp('(?:^|,)(?:' + A.replace(/\s*,\s*/g, '|') + ')(?=,|$)', 'g');
                z = z.replace(C, '');
                z += ',' + A;
            }
            if (B) {
                C = new RegExp('(?:^|,)(?:' + B.replace(/\s*,\s*/g, '|') + ')(?=,|$)', 'g');
                z = z.replace(C, '');
            }
            b.air && (z += ',adobeair');
            j.load(z.split(','), function (D) {
                var E = [], F = [], G = [];
                x.plugins = D;
                for (var H in D) {
                    var I = D[H], J = I.lang, K = j.getPath(H), L = null;
                    I.path = K;
                    if (J) {
                        L = e.indexOf(J, x.langCode) >= 0 ? x.langCode : J[0];
                        if (!I.langEntries || !I.langEntries[L])G.push(a.getUrl(K + 'lang/' + L + '.js')); else {
                            e.extend(x.lang, I.langEntries[L]);
                            L = null;
                        }
                    }
                    F.push(L);
                    E.push(I);
                }
                a.scriptLoader.load(G, function () {
                    var M = ['beforeInit', 'init', 'afterInit'];
                    for (var N = 0; N < M.length; N++)for (var O = 0; O < E.length; O++) {
                        var P = E[O];
                        if (N === 0 && F[O] && P.lang)e.extend(x.lang, P.langEntries[F[O]]);
                        if (P[M[N]])P[M[N]](x);
                    }
                    x.fire('pluginsLoaded');
                    u(x);
                });
            });
        }, t = function (x) {
            a.skins.load(x, 'editor', function () {
                r(x);
            });
        }, u = function (x) {
            var y = x.config.theme;
            a.themes.load(y, function () {
                var z = x.theme = a.themes.get(y);
                z.path = a.themes.getPath(y);
                z.build(x);
                if (x.config.autoUpdateElement)v(x);
            });
        }, v = function (x) {
            var y = x.element;
            if (x.elementMode == 1 && y.is('textarea')) {
                var z = y.$.form && new h(y.$.form);
                if (z) {
                    function A() {
                        x.updateElement();
                    };
                    z.on('submit', A);
                    if (!z.$.submit.nodeName && !z.$.submit.length)z.$.submit = e.override(z.$.submit, function (B) {
                        return function () {
                            x.updateElement();
                            if (B.apply)B.apply(this, arguments); else B();
                        };
                    });
                    x.on('destroy', function () {
                        z.removeListener('submit', A);
                    });
                }
            }
        };

        function w() {
            var x, y = this._.commands, z = this.mode;
            if (!z)return;
            for (var A in y) {
                x = y[A];
                x[x.startDisabled ? 'disable' : this.readOnly && !x.readOnly ? 'disable' : x.modes[z] ? 'enable' : 'disable']();
            }
        };
        a.editor.prototype._init = function () {
            var z = this;
            var x = h.get(z._.element), y = z._.instanceConfig;
            delete z._.element;
            delete z._.instanceConfig;
            z._.commands = {};
            z._.styles = [];
            z.element = x;
            z.name = x && z.elementMode == 1 && (x.getId() || x.getNameAtt()) || m();
            if (z.name in a.instances)throw '[CKEDITOR.editor] The instance "' + z.name + '" already exists.';
            z.id = e.getNextId();
            z.config = e.prototypedCopy(i);
            z.ui = new k(z);
            z.focusManager = new a.focusManager(z);
            a.fire('instanceCreated', null, z);
            z.on('mode', w, null, null, 1);
            z.on('readOnly', w, null, null, 1);
            p(z, y);
        };
    })();
    e.extend(a.editor.prototype, {addCommand: function (l, m) {
        return this._.commands[l] = new a.command(this, m);
    }, addCss: function (l) {
        this._.styles.push(l);
    }, destroy: function (l) {
        var m = this;
        if (!l)m.updateElement();
        m.fire('destroy');
        m.theme && m.theme.destroy(m);
        a.remove(m);
        a.fire('instanceDestroyed', null, m);
    }, execCommand: function (l, m) {
        var n = this.getCommand(l), o = {name: l, commandData: m, command: n};
        if (n && n.state != 0)if (this.fire('beforeCommandExec', o) !== true) {
            o.returnValue = n.exec(o.commandData);
            if (!n.async && this.fire('afterCommandExec', o) !== true)return o.returnValue;
        }
        return false;
    }, getCommand: function (l) {
        return this._.commands[l];
    }, getData: function () {
        var n = this;
        n.fire('beforeGetData');
        var l = n._.data;
        if (typeof l != 'string') {
            var m = n.element;
            if (m && n.elementMode == 1)l = m.is('textarea') ? m.getValue() : m.getHtml(); else l = '';
        }
        l = {dataValue: l};
        n.fire('getData', l);
        return l.dataValue;
    }, getSnapshot: function () {
        var l = this.fire('getSnapshot');
        if (typeof l != 'string') {
            var m = this.element;
            if (m && this.elementMode == 1)l = m.is('textarea') ? m.getValue() : m.getHtml();
        }
        return l;
    }, loadSnapshot: function (l) {
        this.fire('loadSnapshot', l);
    }, setData: function (l, m, n) {
        if (m)this.on('dataReady', function (p) {
            p.removeListener();
            m.call(p.editor);
        });
        var o = {dataValue: l};
        !n && this.fire('setData', o);
        this._.data = o.dataValue;
        !n && this.fire('afterSetData', o);
    }, setReadOnly: function (l) {
        l = l == undefined || l;
        if (this.readOnly != l) {
            this.readOnly = l;
            this.fire('readOnly');
        }
    }, insertHtml: function (l) {
        this.fire('insertHtml', l);
    }, insertText: function (l) {
        this.fire('insertText', l);
    }, insertElement: function (l) {
        this.fire('insertElement', l);
    }, checkDirty: function () {
        return this.mayBeDirty && this._.previousValue !== this.getSnapshot();
    }, resetDirty: function () {
        if (this.mayBeDirty)this._.previousValue = this.getSnapshot();
    }, updateElement: function () {
        var n = this;
        var l = n.element;
        if (l && n.elementMode == 1) {
            var m = n.getData();
            if (n.config.htmlEncodeOutput)m = e.htmlEncode(m);
            if (l.is('textarea'))l.setValue(m); else l.setHtml(m);
        }
    }});
    a.on('loaded', function () {
        var l = a.editor._pending;
        if (l) {
            delete a.editor._pending;
            for (var m = 0; m < l.length; m++)l[m]._init();
        }
    });
    a.htmlParser = function () {
        this._ = {htmlPartsRegex: new RegExp("<(?:(?:\\/([^>]+)>)|(?:!--([\\S|\\s]*?)-->)|(?:([^\\s>]+)\\s*((?:(?:\"[^\"]*\")|(?:'[^']*')|[^\"'>])*)\\/?>))", 'g')};
    };
    (function () {
        var l = /([\w\-:.]+)(?:(?:\s*=\s*(?:(?:"([^"]*)")|(?:'([^']*)')|([^\s>]+)))|(?=\s|$))/g, m = {checked: 1, compact: 1, declare: 1, defer: 1, disabled: 1, ismap: 1, multiple: 1, nohref: 1, noresize: 1, noshade: 1, nowrap: 1, readonly: 1, selected: 1};
        a.htmlParser.prototype = {onTagOpen: function () {
        }, onTagClose: function () {
        }, onText: function () {
        }, onCDATA: function () {
        }, onComment: function () {
        }, parse: function (n) {
            var A = this;
            var o, p, q = 0, r;
            while (o = A._.htmlPartsRegex.exec(n)) {
                var s = o.index;
                if (s > q) {
                    var t = n.substring(q, s);
                    if (r)r.push(t); else A.onText(t);
                }
                q = A._.htmlPartsRegex.lastIndex;
                if (p = o[1]) {
                    p = p.toLowerCase();
                    if (r && f.$cdata[p]) {
                        A.onCDATA(r.join(''));
                        r = null;
                    }
                    if (!r) {
                        A.onTagClose(p);
                        continue;
                    }
                }
                if (r) {
                    r.push(o[0]);
                    continue;
                }
                if (p = o[3]) {
                    p = p.toLowerCase();
                    if (/="/.test(p))continue;
                    var u = {}, v, w = o[4], x = !!(w && w.charAt(w.length - 1) == '/');
                    if (w)while (v = l.exec(w)) {
                        var y = v[1].toLowerCase(), z = v[2] || v[3] || v[4] || '';
                        if (!z && m[y])u[y] = y; else u[y] = z;
                    }
                    A.onTagOpen(p, u, x);
                    if (!r && f.$cdata[p])r = [];
                    continue;
                }
                if (p = o[2])A.onComment(p);
            }
            if (n.length > q)A.onText(n.substring(q, n.length));
        }};
    })();
    a.htmlParser.comment = function (l) {
        this.value = l;
        this._ = {isBlockLike: false};
    };
    a.htmlParser.comment.prototype = {type: 8, writeHtml: function (l, m) {
        var n = this.value;
        if (m) {
            if (!(n = m.onComment(n, this)))return;
            if (typeof n != 'string') {
                n.parent = this.parent;
                n.writeHtml(l, m);
                return;
            }
        }
        l.comment(n);
    }};
    (function () {
        a.htmlParser.text = function (l) {
            this.value = l;
            this._ = {isBlockLike: false};
        };
        a.htmlParser.text.prototype = {type: 3, writeHtml: function (l, m) {
            var n = this.value;
            if (m && !(n = m.onText(n, this)))return;
            l.text(n);
        }};
    })();
    (function () {
        a.htmlParser.cdata = function (l) {
            this.value = l;
        };
        a.htmlParser.cdata.prototype = {type: 3, writeHtml: function (l) {
            l.write(this.value);
        }};
    })();
    a.htmlParser.fragment = function () {
        this.children = [];
        this.parent = null;
        this._ = {isBlockLike: true, hasInlineStarted: false};
    };
    (function () {
        var l = e.extend({table: 1, ul: 1, ol: 1, dl: 1}, f.table, f.ul, f.ol, f.dl), m = c && b.version < 8 ? {dd: 1, dt: 1} : {}, n = {ol: 1, ul: 1}, o = e.extend({}, {html: 1}, f.html, f.body, f.head, {style: 1, script: 1});

        function p(q) {
            return q.name == 'a' && q.attributes.href || f.$removeEmpty[q.name];
        };
        a.htmlParser.fragment.fromHtml = function (q, r, s) {
            var t = new a.htmlParser(), u = s || new a.htmlParser.fragment(), v = [], w = [], x = u, y = false, z = false;

            function A(D) {
                var E;
                if (v.length > 0)for (var F = 0; F < v.length; F++) {
                    var G = v[F], H = G.name, I = f[H], J = x.name && f[x.name];
                    if ((!J || J[H]) && (!D || !I || I[D] || !f[D])) {
                        if (!E) {
                            B();
                            E = 1;
                        }
                        G = G.clone();
                        G.parent = x;
                        x = G;
                        v.splice(F, 1);
                        F--;
                    } else if (H == x.name)C(x, x.parent, 1), F--;
                }
            };
            function B() {
                while (w.length)x.add(w.shift());
            };
            function C(D, E, F) {
                if (D.previous !== undefined)return;
                E = E || x || u;
                var G = x;
                if (r && (!E.type || E.name == 'body')) {
                    var H, I;
                    if (D.attributes && (I = D.attributes['data-cke-real-element-type']))H = I; else H = D.name;
                    if (H && !(H in f.$body || H == 'body' || D.isOrphan)) {
                        x = E;
                        t.onTagOpen(r, {});
                        D.returnPoint = E = x;
                    }
                }
                if (D._.isBlockLike && D.name != 'pre' && D.name != 'textarea') {
                    var J = D.children.length, K = D.children[J - 1], L;
                    if (K && K.type == 3)if (!(L = e.rtrim(K.value)))D.children.length = J - 1; else K.value = L;
                }
                E.add(D);
                if (D.returnPoint) {
                    x = D.returnPoint;
                    delete D.returnPoint;
                } else x = F ? E : G;
            };
            t.onTagOpen = function (D, E, F, G) {
                var H = new a.htmlParser.element(D, E);
                if (H.isUnknown && F)H.isEmpty = true;
                H.isOptionalClose = D in m || G;
                if (p(H)) {
                    v.push(H);
                    return;
                } else if (D == 'pre')z = true; else if (D == 'br' && z) {
                    x.add(new a.htmlParser.text('\n'));
                    return;
                } else if (D == 'textarea')y = true;
                if (D == 'br') {
                    w.push(H);
                    return;
                }
                while (1) {
                    var I = x.name, J = I ? f[I] || (x._.isBlockLike ? f.div : f.span) : o;
                    if (!H.isUnknown && !x.isUnknown && !J[D]) {
                        if (x.isOptionalClose)t.onTagClose(I); else if (D in n && I in n) {
                            var K = x.children, L = K[K.length - 1];
                            if (!(L && L.name == 'li'))C(L = new a.htmlParser.element('li'), x);
                            !H.returnPoint && (H.returnPoint = x);
                            x = L;
                        } else if (D in f.$listItem && I != D)t.onTagOpen(D == 'li' ? 'ul' : 'dl', {}, 0, 1); else if (I in l && I != D) {
                            !H.returnPoint && (H.returnPoint = x);
                            x = x.parent;
                        } else {
                            if (I in f.$inline)v.unshift(x);
                            if (x.parent)C(x, x.parent, 1); else {
                                H.isOrphan = 1;
                                break;
                            }
                        }
                    } else break;
                }
                A(D);
                B();
                H.parent = x;
                if (H.isEmpty)C(H); else x = H;
            };
            t.onTagClose = function (D) {
                for (var E = v.length - 1; E >= 0; E--) {
                    if (D == v[E].name) {
                        v.splice(E, 1);
                        return;
                    }
                }
                var F = [], G = [], H = x;
                while (H != u && H.name != D) {
                    if (!H._.isBlockLike)G.unshift(H);
                    F.push(H);
                    H = H.returnPoint || H.parent;
                }
                if (H != u) {
                    for (E = 0; E < F.length; E++) {
                        var I = F[E];
                        C(I, I.parent);
                    }
                    x = H;
                    if (x.name == 'pre')z = false;
                    if (x.name == 'textarea')y = false;
                    if (H._.isBlockLike)B();
                    C(H, H.parent);
                    if (H == x)x = x.parent;
                    v = v.concat(G);
                }
                if (D == 'body')r = false;
            };
            t.onText = function (D) {
                if ((!x._.hasInlineStarted || w.length) && !z && !y) {
                    D = e.ltrim(D);
                    if (D.length === 0)return;
                }
                B();
                A();
                if (r && (!x.type || x.name == 'body') && e.trim(D))this.onTagOpen(r, {}, 0, 1);
                if (!z && !y)D = D.replace(/[\t\r\n ]{2,}|[\t\r\n]/g, ' ');
                x.add(new a.htmlParser.text(D));
            };
            t.onCDATA = function (D) {
                x.add(new a.htmlParser.cdata(D));
            };
            t.onComment = function (D) {
                B();
                A();
                x.add(new a.htmlParser.comment(D));
            };
            t.parse(q);
            B(!c && 1);
            while (x != u)C(x, x.parent, 1);
            return u;
        };
        a.htmlParser.fragment.prototype = {add: function (q, r) {
            var t = this;
            isNaN(r) && (r = t.children.length);
            var s = r > 0 ? t.children[r - 1] : null;
            if (s) {
                if (q._.isBlockLike && s.type == 3) {
                    s.value = e.rtrim(s.value);
                    if (s.value.length === 0) {
                        t.children.pop();
                        t.add(q);
                        return;
                    }
                }
                s.next = q;
            }
            q.previous = s;
            q.parent = t;
            t.children.splice(r, 0, q);
            t._.hasInlineStarted = q.type == 3 || q.type == 1 && !q._.isBlockLike;
        }, writeHtml: function (q, r) {
            var s;
            this.filterChildren = function () {
                var t = new a.htmlParser.basicWriter();
                this.writeChildrenHtml.call(this, t, r, true);
                var u = t.getHtml();
                this.children = new a.htmlParser.fragment.fromHtml(u).children;
                s = 1;
            };
            !this.name && r && r.onFragment(this);
            this.writeChildrenHtml(q, s ? null : r);
        }, writeChildrenHtml: function (q, r) {
            for (var s = 0; s < this.children.length; s++)this.children[s].writeHtml(q, r);
        }};
    })();
    a.htmlParser.element = function (l, m) {
        var s = this;
        s.name = l;
        s.attributes = m || (m = {});
        s.children = [];
        var n = m['data-cke-real-element-type'] || l || '', o = n.match(/^cke:(.*)/);
        o && (n = o[1]);
        var p = f, q = !!(p.$nonBodyContent[n] || p.$block[n] || p.$listItem[n] || p.$tableContent[n] || p.$nonEditable[n] || n == 'br'), r = !!p.$empty[l];
        s.isEmpty = r;
        s.isUnknown = !p[l];
        s._ = {isBlockLike: q, hasInlineStarted: r || !q};
    };
    a.htmlParser.cssStyle = function () {
        var l, m = arguments[0], n = {};
        l = m instanceof a.htmlParser.element ? m.attributes.style : m;
        (l || '').replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (o, p, q) {
            p == 'font-family' && (q = q.replace(/["']/g, ''));
            n[p.toLowerCase()] = q;
        });
        return{rules: n, populate: function (o) {
            var p = this.toString();
            if (p)o instanceof h ? o.setAttribute('style', p) : o instanceof a.htmlParser.element ? o.attributes.style = p : o.style = p;
        }, 'toString': function () {
            var o = [];
            for (var p in n)n[p] && o.push(p, ':', n[p], ';');
            return o.join('');
        }};
    };
    (function () {
        var l = function (m, n) {
            m = m[0];
            n = n[0];
            return m < n ? -1 : m > n ? 1 : 0;
        };
        a.htmlParser.element.prototype = {type: 1, add: a.htmlParser.fragment.prototype.add, clone: function () {
            return new a.htmlParser.element(this.name, this.attributes);
        }, writeHtml: function (m, n) {
            var o = this.attributes, p = this, q = p.name, r, s, t, u;
            p.filterChildren = function () {
                if (!u) {
                    var B = new a.htmlParser.basicWriter();
                    a.htmlParser.fragment.prototype.writeChildrenHtml.call(p, B, n);
                    p.children = new a.htmlParser.fragment.fromHtml(B.getHtml(), 0, p.clone()).children;
                    u = 1;
                }
            };
            if (n) {
                for (; ;) {
                    if (!(q = n.onElementName(q)))return;
                    p.name = q;
                    if (!(p = n.onElement(p)))return;
                    p.parent = this.parent;
                    if (p.name == q)break;
                    if (p.type != 1) {
                        p.writeHtml(m, n);
                        return;
                    }
                    q = p.name;
                    if (!q) {
                        for (var v = 0, w = this.children.length; v < w; v++)this.children[v].parent = p.parent;
                        this.writeChildrenHtml.call(p, m, u ? null : n);
                        return;
                    }
                }
                o = p.attributes;
            }
            m.openTag(q, o);
            var x = [];
            for (var y = 0; y < 2; y++)for (r in o) {
                s = r;
                t = o[r];
                if (y == 1)x.push([r, t]); else if (n) {
                    for (; ;) {
                        if (!(s = n.onAttributeName(r))) {
                            delete o[r];
                            break;
                        } else if (s != r) {
                            delete o[r];
                            r = s;
                            continue;
                        } else break;
                    }
                    if (s)if ((t = n.onAttribute(p, s, t)) === false)delete o[s]; else o[s] = t;
                }
            }
            if (m.sortAttributes)x.sort(l);
            var z = x.length;
            for (y = 0; y < z; y++) {
                var A = x[y];
                m.attribute(A[0], A[1]);
            }
            m.openTagClose(q, p.isEmpty);
            if (!p.isEmpty) {
                this.writeChildrenHtml.call(p, m, u ? null : n);
                m.closeTag(q);
            }
        }, writeChildrenHtml: function (m, n) {
            a.htmlParser.fragment.prototype.writeChildrenHtml.apply(this, arguments);
        }};
    })();
    (function () {
        a.htmlParser.filter = e.createClass({$: function (q) {
            this._ = {elementNames: [], attributeNames: [], elements: {$length: 0}, attributes: {$length: 0}};
            if (q)this.addRules(q, 10);
        }, proto: {addRules: function (q, r) {
            var s = this;
            if (typeof r != 'number')r = 10;
            m(s._.elementNames, q.elementNames, r);
            m(s._.attributeNames, q.attributeNames, r);
            n(s._.elements, q.elements, r);
            n(s._.attributes, q.attributes, r);
            s._.text = o(s._.text, q.text, r) || s._.text;
            s._.comment = o(s._.comment, q.comment, r) || s._.comment;
            s._.root = o(s._.root, q.root, r) || s._.root;
        }, onElementName: function (q) {
            return l(q, this._.elementNames);
        }, onAttributeName: function (q) {
            return l(q, this._.attributeNames);
        }, onText: function (q) {
            var r = this._.text;
            return r ? r.filter(q) : q;
        }, onComment: function (q, r) {
            var s = this._.comment;
            return s ? s.filter(q, r) : q;
        }, onFragment: function (q) {
            var r = this._.root;
            return r ? r.filter(q) : q;
        }, onElement: function (q) {
            var v = this;
            var r = [v._.elements['^'], v._.elements[q.name], v._.elements.$], s, t;
            for (var u = 0; u < 3; u++) {
                s = r[u];
                if (s) {
                    t = s.filter(q, v);
                    if (t === false)return null;
                    if (t && t != q)return v.onNode(t);
                    if (q.parent && !q.name)break;
                }
            }
            return q;
        }, onNode: function (q) {
            var r = q.type;
            return r == 1 ? this.onElement(q) : r == 3 ? new a.htmlParser.text(this.onText(q.value)) : r == 8 ? new a.htmlParser.comment(this.onComment(q.value)) : null;
        }, onAttribute: function (q, r, s) {
            var t = this._.attributes[r];
            if (t) {
                var u = t.filter(s, q, this);
                if (u === false)return false;
                if (typeof u != 'undefined')return u;
            }
            return s;
        }}});
        function l(q, r) {
            for (var s = 0; q && s < r.length; s++) {
                var t = r[s];
                q = q.replace(t[0], t[1]);
            }
            return q;
        };
        function m(q, r, s) {
            if (typeof r == 'function')r = [r];
            var t, u, v = q.length, w = r && r.length;
            if (w) {
                for (t = 0; t < v && q[t].pri < s; t++) {
                }
                for (u = w - 1; u >= 0; u--) {
                    var x = r[u];
                    if (x) {
                        x.pri = s;
                        q.splice(t, 0, x);
                    }
                }
            }
        };
        function n(q, r, s) {
            if (r)for (var t in r) {
                var u = q[t];
                q[t] = o(u, r[t], s);
                if (!u)q.$length++;
            }
        };
        function o(q, r, s) {
            if (r) {
                r.pri = s;
                if (q) {
                    if (!q.splice) {
                        if (q.pri > s)q = [r, q]; else q = [q, r];
                        q.filter = p;
                    } else m(q, r, s);
                    return q;
                } else {
                    r.filter = r;
                    return r;
                }
            }
        };
        function p(q) {
            var r = q.type || q instanceof a.htmlParser.fragment;
            for (var s = 0; s < this.length; s++) {
                if (r)var t = q.type, u = q.name;
                var v = this[s], w = v.apply(window, arguments);
                if (w === false)return w;
                if (r) {
                    if (w && (w.name != u || w.type != t))return w;
                } else if (typeof w != 'string')return w;
                w != undefined && (q = w);
            }
            return q;
        };
    })();
    a.htmlParser.basicWriter = e.createClass({$: function () {
        this._ = {output: []};
    }, proto: {openTag: function (l, m) {
        this._.output.push('<', l);
    }, openTagClose: function (l, m) {
        if (m)this._.output.push(' />'); else this._.output.push('>');
    }, attribute: function (l, m) {
        if (typeof m == 'string')m = e.htmlEncodeAttr(m);
        this._.output.push(' ', l, '="', m, '"');
    }, closeTag: function (l) {
        this._.output.push('</', l, '>');
    }, text: function (l) {
        this._.output.push(l);
    }, comment: function (l) {
        this._.output.push('<!--', l, '-->');
    }, write: function (l) {
        this._.output.push(l);
    }, reset: function () {
        this._.output = [];
        this._.indent = false;
    }, getHtml: function (l) {
        var m = this._.output.join('');
        if (l)this.reset();
        return m;
    }}});
    delete a.loadFullCore;
    a.instances = {};
    a.document = new g(document);
    a.add = function (l) {
        a.instances[l.name] = l;
        l.on('focus', function () {
            if (a.currentInstance != l) {
                a.currentInstance = l;
                a.fire('currentInstance');
            }
        });
        l.on('blur', function () {
            if (a.currentInstance == l) {
                a.currentInstance = null;
                a.fire('currentInstance');
            }
        });
    };
    a.remove = function (l) {
        delete a.instances[l.name];
    };
    a.on('instanceDestroyed', function () {
        if (e.isEmpty(this.instances))a.fire('reset');
    });
    a.TRISTATE_ON = 1;
    a.TRISTATE_OFF = 2;
    a.TRISTATE_DISABLED = 0;
    d.comment = e.createClass({base: d.node, $: function (l, m) {
        if (typeof l == 'string')l = (m ? m.$ : document).createComment(l);
        this.base(l);
    }, proto: {type: 8, getOuterHtml: function () {
        return '<!--' + this.$.nodeValue + '-->';
    }}});
    (function () {
        var l = {address: 1, blockquote: 1, dl: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, li: 1, dt: 1, dd: 1, legend: 1, caption: 1}, m = {body: 1, div: 1, table: 1, tbody: 1, tr: 1, td: 1, th: 1, form: 1, fieldset: 1}, n = function (o) {
            var p = o.getChildren();
            for (var q = 0, r = p.count(); q < r; q++) {
                var s = p.getItem(q);
                if (s.type == 1 && f.$block[s.getName()])return true;
            }
            return false;
        };
        d.elementPath = function (o) {
            var u = this;
            var p = null, q = null, r = [], s = o;
            while (s) {
                if (s.type == 1) {
                    if (!u.lastElement)u.lastElement = s;
                    var t = s.getName();
                    if (c && s.$.scopeName != 'HTML')t = s.$.scopeName.toLowerCase() + ':' + t;
                    if (!q) {
                        if (!p && l[t])p = s;
                        if (m[t])if (!p && t == 'div' && !n(s))p = s; else q = s;
                    }
                    r.push(s);
                    if (t == 'body')break;
                }
                s = s.getParent();
            }
            u.block = p;
            u.blockLimit = q;
            u.elements = r;
        };
    })();
    d.elementPath.prototype = {compare: function (l) {
        var m = this.elements, n = l && l.elements;
        if (!n || m.length != n.length)return false;
        for (var o = 0; o < m.length; o++) {
            if (!m[o].equals(n[o]))return false;
        }
        return true;
    }, contains: function (l) {
        var m = this.elements;
        for (var n = 0; n < m.length; n++) {
            if (m[n].getName() in l)return m[n];
        }
        return null;
    }};
    d.text = function (l, m) {
        if (typeof l == 'string')l = (m ? m.$ : document).createTextNode(l);
        this.$ = l;
    };
    d.text.prototype = new d.node();
    e.extend(d.text.prototype, {type: 3, getLength: function () {
        return this.$.nodeValue.length;
    }, getText: function () {
        return this.$.nodeValue;
    }, setText: function (l) {
        this.$.nodeValue = l;
    }, split: function (l) {
        var q = this;
        if (c && l == q.getLength()) {
            var m = q.getDocument().createText('');
            m.insertAfter(q);
            return m;
        }
        var n = q.getDocument(), o = new d.text(q.$.splitText(l), n);
        if (b.ie8) {
            var p = new d.text('', n);
            p.insertAfter(o);
            p.remove();
        }
        return o;
    }, substring: function (l, m) {
        if (typeof m != 'number')return this.$.nodeValue.substr(l); else return this.$.nodeValue.substring(l, m);
    }});
    d.documentFragment = function (l) {
        l = l || a.document;
        this.$ = l.$.createDocumentFragment();
    };
    e.extend(d.documentFragment.prototype, h.prototype, {type: 11, insertAfterNode: function (l) {
        l = l.$;
        l.parentNode.insertBefore(this.$, l.nextSibling);
    }}, true, {append: 1, appendBogus: 1, getFirst: 1, getLast: 1, appendTo: 1, moveChildren: 1, insertBefore: 1, insertAfterNode: 1, replace: 1, trim: 1, type: 1, ltrim: 1, rtrim: 1, getDocument: 1, getChildCount: 1, getChild: 1, getChildren: 1});
    (function () {
        function l(s, t) {
            if (this._.end)return null;
            var u, v = this.range, w, x = this.guard, y = this.type, z = s ? 'getPreviousSourceNode' : 'getNextSourceNode';
            if (!this._.start) {
                this._.start = 1;
                v.trim();
                if (v.collapsed) {
                    this.end();
                    return null;
                }
            }
            if (!s && !this._.guardLTR) {
                var A = v.endContainer, B = A.getChild(v.endOffset);
                this._.guardLTR = function (F, G) {
                    return(!G || !A.equals(F)) && (!B || !F.equals(B)) && (F.type != 1 || !G || F.getName() != 'body');
                };
            }
            if (s && !this._.guardRTL) {
                var C = v.startContainer, D = v.startOffset > 0 && C.getChild(v.startOffset - 1);
                this._.guardRTL = function (F, G) {
                    return(!G || !C.equals(F)) && (!D || !F.equals(D)) && (F.type != 1 || !G || F.getName() != 'body');
                };
            }
            var E = s ? this._.guardRTL : this._.guardLTR;
            if (x)w = function (F, G) {
                if (E(F, G) === false)return false;
                return x(F, G);
            }; else w = E;
            if (this.current)u = this.current[z](false, y, w); else if (s) {
                u = v.endContainer;
                if (v.endOffset > 0) {
                    u = u.getChild(v.endOffset - 1);
                    if (w(u) === false)u = null;
                } else u = w(u, true) === false ? null : u.getPreviousSourceNode(true, y, w);
            } else {
                u = v.startContainer;
                u = u.getChild(v.startOffset);
                if (u) {
                    if (w(u) === false)u = null;
                } else u = w(v.startContainer, true) === false ? null : v.startContainer.getNextSourceNode(true, y, w);
            }
            while (u && !this._.end) {
                this.current = u;
                if (!this.evaluator || this.evaluator(u) !== false) {
                    if (!t)return u;
                } else if (t && this.evaluator)return false;
                u = u[z](false, y, w);
            }
            this.end();
            return this.current = null;
        };
        function m(s) {
            var t, u = null;
            while (t = l.call(this, s))u = t;
            return u;
        };
        d.walker = e.createClass({$: function (s) {
            this.range = s;
            this._ = {};
        }, proto: {end: function () {
            this._.end = 1;
        }, next: function () {
            return l.call(this);
        }, previous: function () {
            return l.call(this, 1);
        }, checkForward: function () {
            return l.call(this, 0, 1) !== false;
        }, checkBackward: function () {
            return l.call(this, 1, 1) !== false;
        }, lastForward: function () {
            return m.call(this);
        }, lastBackward: function () {
            return m.call(this, 1);
        }, reset: function () {
            delete this.current;
            this._ = {};
        }}});
        var n = {block: 1, 'list-item': 1, table: 1, 'table-row-group': 1, 'table-header-group': 1, 'table-footer-group': 1, 'table-row': 1, 'table-column-group': 1, 'table-column': 1, 'table-cell': 1, 'table-caption': 1};
        h.prototype.isBlockBoundary = function (s) {
            var t = s ? e.extend({}, f.$block, s || {}) : f.$block;
            return this.getComputedStyle('float') == 'none' && n[this.getComputedStyle('display')] || t[this.getName()];
        };
        d.walker.blockBoundary = function (s) {
            return function (t, u) {
                return!(t.type == 1 && t.isBlockBoundary(s));
            };
        };
        d.walker.listItemBoundary = function () {
            return this.blockBoundary({br: 1});
        };
        d.walker.bookmark = function (s, t) {
            function u(v) {
                return v && v.getName && v.getName() == 'span' && v.data('cke-bookmark');
            };
            return function (v) {
                var w, x;
                w = v && !v.getName && (x = v.getParent()) && u(x);
                w = s ? w : w || u(v);
                return!!(t ^ w);
            };
        };
        d.walker.whitespaces = function (s) {
            return function (t) {
                var u = t && t.type == 3 && !e.trim(t.getText());
                return!!(s ^ u);
            };
        };
        d.walker.invisible = function (s) {
            var t = d.walker.whitespaces();
            return function (u) {
                var v = t(u) || u.is && !u.$.offsetHeight;
                return!!(s ^ v);
            };
        };
        d.walker.nodeType = function (s, t) {
            return function (u) {
                return!!(t ^ u.type == s);
            };
        };
        var o = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, p = d.walker.whitespaces(), q = d.walker.bookmark(), r = function (s) {
            return q(s) || p(s) || s.type == 1 && s.getName() in f.$inline && !(s.getName() in f.$empty);
        };
        h.prototype.getBogus = function () {
            var s = this;
            do s = s.getPreviousSourceNode(); while (r(s));
            if (s && (!c ? s.is && s.is('br') : s.getText && o.test(s.getText())))return s;
            return false;
        };
    })();
    d.range = function (l) {
        var m = this;
        m.startContainer = null;
        m.startOffset = null;
        m.endContainer = null;
        m.endOffset = null;
        m.collapsed = true;
        m.document = l;
    };
    (function () {
        var l = function (t) {
            t.collapsed = t.startContainer && t.endContainer && t.startContainer.equals(t.endContainer) && t.startOffset == t.endOffset;
        }, m = function (t, u, v, w) {
            t.optimizeBookmark();
            var x = t.startContainer, y = t.endContainer, z = t.startOffset, A = t.endOffset, B, C;
            if (y.type == 3)y = y.split(A); else if (y.getChildCount() > 0)if (A >= y.getChildCount()) {
                y = y.append(t.document.createText(''));
                C = true;
            } else y = y.getChild(A);
            if (x.type == 3) {
                x.split(z);
                if (x.equals(y))y = x.getNext();
            } else if (!z) {
                x = x.getFirst().insertBeforeMe(t.document.createText(''));
                B = true;
            } else if (z >= x.getChildCount()) {
                x = x.append(t.document.createText(''));
                B = true;
            } else x = x.getChild(z).getPrevious();
            var D = x.getParents(), E = y.getParents(), F, G, H;
            for (F = 0; F < D.length; F++) {
                G = D[F];
                H = E[F];
                if (!G.equals(H))break;
            }
            var I = v, J, K, L, M;
            for (var N = F; N < D.length; N++) {
                J = D[N];
                if (I && !J.equals(x))K = I.append(J.clone());
                L = J.getNext();
                while (L) {
                    if (L.equals(E[N]) || L.equals(y))break;
                    M = L.getNext();
                    if (u == 2)I.append(L.clone(true)); else {
                        L.remove();
                        if (u == 1)I.append(L);
                    }
                    L = M;
                }
                if (I)I = K;
            }
            I = v;
            for (var O = F; O < E.length; O++) {
                J = E[O];
                if (u > 0 && !J.equals(y))K = I.append(J.clone());
                if (!D[O] || J.$.parentNode != D[O].$.parentNode) {
                    L = J.getPrevious();
                    while (L) {
                        if (L.equals(D[O]) || L.equals(x))break;
                        M = L.getPrevious();
                        if (u == 2)I.$.insertBefore(L.$.cloneNode(true), I.$.firstChild); else {
                            L.remove();
                            if (u == 1)I.$.insertBefore(L.$, I.$.firstChild);
                        }
                        L = M;
                    }
                }
                if (I)I = K;
            }
            if (u == 2) {
                var P = t.startContainer;
                if (P.type == 3) {
                    P.$.data += P.$.nextSibling.data;
                    P.$.parentNode.removeChild(P.$.nextSibling);
                }
                var Q = t.endContainer;
                if (Q.type == 3 && Q.$.nextSibling) {
                    Q.$.data += Q.$.nextSibling.data;
                    Q.$.parentNode.removeChild(Q.$.nextSibling);
                }
            } else {
                if (G && H && (x.$.parentNode != G.$.parentNode || y.$.parentNode != H.$.parentNode)) {
                    var R = H.getIndex();
                    if (B && H.$.parentNode == x.$.parentNode)R--;
                    if (w && G.type == 1) {
                        var S = h.createFromHtml('<span data-cke-bookmark="1" style="display:none">&nbsp;</span>', t.document);
                        S.insertAfter(G);
                        G.mergeSiblings(false);
                        t.moveToBookmark({startNode: S});
                    } else t.setStart(H.getParent(), R);
                }
                t.collapse(true);
            }
            if (B)x.remove();
            if (C && y.$.parentNode)y.remove();
        }, n = {abbr: 1, acronym: 1, b: 1, bdo: 1, big: 1, cite: 1, code: 1, del: 1, dfn: 1, em: 1, font: 1, i: 1, ins: 1, label: 1, kbd: 1, q: 1, samp: 1, small: 1, span: 1, strike: 1, strong: 1, sub: 1, sup: 1, tt: 1, u: 1, 'var': 1};

        function o(t) {
            var u = false, v = d.walker.bookmark(true);
            return function (w) {
                if (v(w))return true;
                if (w.type == 3) {
                    if (w.hasAscendant('pre') || e.trim(w.getText()).length)return false;
                } else if (w.type == 1)if (!n[w.getName()])if (!t && !c && w.getName() == 'br' && !u)u = true; else return false;
                return true;
            };
        };
        function p(t) {
            return t.type != 3 && t.getName() in f.$removeEmpty || !e.trim(t.getText()) || !!t.getParent().data('cke-bookmark');
        };
        var q = new d.walker.whitespaces(), r = new d.walker.bookmark();

        function s(t) {
            return!q(t) && !r(t);
        };
        d.range.prototype = {clone: function () {
            var u = this;
            var t = new d.range(u.document);
            t.startContainer = u.startContainer;
            t.startOffset = u.startOffset;
            t.endContainer = u.endContainer;
            t.endOffset = u.endOffset;
            t.collapsed = u.collapsed;
            return t;
        }, collapse: function (t) {
            var u = this;
            if (t) {
                u.endContainer = u.startContainer;
                u.endOffset = u.startOffset;
            } else {
                u.startContainer = u.endContainer;
                u.startOffset = u.endOffset;
            }
            u.collapsed = true;
        }, cloneContents: function () {
            var t = new d.documentFragment(this.document);
            if (!this.collapsed)m(this, 2, t);
            return t;
        }, deleteContents: function (t) {
            if (this.collapsed)return;
            m(this, 0, null, t);
        }, extractContents: function (t) {
            var u = new d.documentFragment(this.document);
            if (!this.collapsed)m(this, 1, u, t);
            return u;
        }, createBookmark: function (t) {
            var z = this;
            var u, v, w, x, y = z.collapsed;
            u = z.document.createElement('span');
            u.data('cke-bookmark', 1);
            u.setStyle('display', 'none');
            u.setHtml('&nbsp;');
            if (t) {
                w = 'cke_bm_' + e.getNextNumber();
                u.setAttribute('id', w + 'S');
            }
            if (!y) {
                v = u.clone();
                v.setHtml('&nbsp;');
                if (t)v.setAttribute('id', w + 'E');
                x = z.clone();
                x.collapse();
                x.insertNode(v);
            }
            x = z.clone();
            x.collapse(true);
            x.insertNode(u);
            if (v) {
                z.setStartAfter(u);
                z.setEndBefore(v);
            } else z.moveToPosition(u, 4);
            return{startNode: t ? w + 'S' : u, endNode: t ? w + 'E' : v, serializable: t, collapsed: y};
        }, createBookmark2: function (t) {
            var B = this;
            var u = B.startContainer, v = B.endContainer, w = B.startOffset, x = B.endOffset, y = B.collapsed, z, A;
            if (!u || !v)return{start: 0, end: 0};
            if (t) {
                if (u.type == 1) {
                    z = u.getChild(w);
                    if (z && z.type == 3 && w > 0 && z.getPrevious().type == 3) {
                        u = z;
                        w = 0;
                    }
                    if (z && z.type == 1)w = z.getIndex(1);
                }
                while (u.type == 3 && (A = u.getPrevious()) && A.type == 3) {
                    u = A;
                    w += A.getLength();
                }
                if (!y) {
                    if (v.type == 1) {
                        z = v.getChild(x);
                        if (z && z.type == 3 && x > 0 && z.getPrevious().type == 3) {
                            v = z;
                            x = 0;
                        }
                        if (z && z.type == 1)x = z.getIndex(1);
                    }
                    while (v.type == 3 && (A = v.getPrevious()) && A.type == 3) {
                        v = A;
                        x += A.getLength();
                    }
                }
            }
            return{start: u.getAddress(t), end: y ? null : v.getAddress(t), startOffset: w, endOffset: x, normalized: t, collapsed: y, is2: true};
        }, moveToBookmark: function (t) {
            var B = this;
            if (t.is2) {
                var u = B.document.getByAddress(t.start, t.normalized), v = t.startOffset, w = t.end && B.document.getByAddress(t.end, t.normalized), x = t.endOffset;
                B.setStart(u, v);
                if (w)B.setEnd(w, x); else B.collapse(true);
            } else {
                var y = t.serializable, z = y ? B.document.getById(t.startNode) : t.startNode, A = y ? B.document.getById(t.endNode) : t.endNode;
                B.setStartBefore(z);
                z.remove();
                if (A) {
                    B.setEndBefore(A);
                    A.remove();
                } else B.collapse(true);
            }
        }, getBoundaryNodes: function () {
            var y = this;
            var t = y.startContainer, u = y.endContainer, v = y.startOffset, w = y.endOffset, x;
            if (t.type == 1) {
                x = t.getChildCount();
                if (x > v)t = t.getChild(v); else if (x < 1)t = t.getPreviousSourceNode(); else {
                    t = t.$;
                    while (t.lastChild)t = t.lastChild;
                    t = new d.node(t);
                    t = t.getNextSourceNode() || t;
                }
            }
            if (u.type == 1) {
                x = u.getChildCount();
                if (x > w)u = u.getChild(w).getPreviousSourceNode(true); else if (x < 1)u = u.getPreviousSourceNode(); else {
                    u = u.$;
                    while (u.lastChild)u = u.lastChild;
                    u = new d.node(u);
                }
            }
            if (t.getPosition(u) & 2)t = u;
            return{startNode: t, endNode: u};
        }, getCommonAncestor: function (t, u) {
            var y = this;
            var v = y.startContainer, w = y.endContainer, x;
            if (v.equals(w)) {
                if (t && v.type == 1 && y.startOffset == y.endOffset - 1)x = v.getChild(y.startOffset); else x = v;
            } else x = v.getCommonAncestor(w);
            return u && !x.is ? x.getParent() : x;
        }, optimize: function () {
            var v = this;
            var t = v.startContainer, u = v.startOffset;
            if (t.type != 1)if (!u)v.setStartBefore(t); else if (u >= t.getLength())v.setStartAfter(t);
            t = v.endContainer;
            u = v.endOffset;
            if (t.type != 1)if (!u)v.setEndBefore(t); else if (u >= t.getLength())v.setEndAfter(t);
        }, optimizeBookmark: function () {
            var v = this;
            var t = v.startContainer, u = v.endContainer;
            if (t.is && t.is('span') && t.data('cke-bookmark'))v.setStartAt(t, 3);
            if (u && u.is && u.is('span') && u.data('cke-bookmark'))v.setEndAt(u, 4);
        }, trim: function (t, u) {
            var B = this;
            var v = B.startContainer, w = B.startOffset, x = B.collapsed;
            if ((!t || x) && v && v.type == 3) {
                if (!w) {
                    w = v.getIndex();
                    v = v.getParent();
                } else if (w >= v.getLength()) {
                    w = v.getIndex() + 1;
                    v = v.getParent();
                } else {
                    var y = v.split(w);
                    w = v.getIndex() + 1;
                    v = v.getParent();
                    if (B.startContainer.equals(B.endContainer))B.setEnd(y, B.endOffset - B.startOffset); else if (v.equals(B.endContainer))B.endOffset += 1;
                }
                B.setStart(v, w);
                if (x) {
                    B.collapse(true);
                    return;
                }
            }
            var z = B.endContainer, A = B.endOffset;
            if (!(u || x) && z && z.type == 3) {
                if (!A) {
                    A = z.getIndex();
                    z = z.getParent();
                } else if (A >= z.getLength()) {
                    A = z.getIndex() + 1;
                    z = z.getParent();
                } else {
                    z.split(A);
                    A = z.getIndex() + 1;
                    z = z.getParent();
                }
                B.setEnd(z, A);
            }
        }, enlarge: function (t, u) {
            switch (t) {
                case 1:
                    if (this.collapsed)return;
                    var v = this.getCommonAncestor(), w = this.document.getBody(), x, y, z, A, B, C = false, D, E, F = this.startContainer, G = this.startOffset;
                    if (F.type == 3) {
                        if (G) {
                            F = !e.trim(F.substring(0, G)).length && F;
                            C = !!F;
                        }
                        if (F)if (!(A = F.getPrevious()))z = F.getParent();
                    } else {
                        if (G)A = F.getChild(G - 1) || F.getLast();
                        if (!A)z = F;
                    }
                    while (z || A) {
                        if (z && !A) {
                            if (!B && z.equals(v))B = true;
                            if (!w.contains(z))break;
                            if (!C || z.getComputedStyle('display') != 'inline') {
                                C = false;
                                if (B)x = z; else this.setStartBefore(z);
                            }
                            A = z.getPrevious();
                        }
                        while (A) {
                            D = false;
                            if (A.type == 3) {
                                E = A.getText();
                                if (/[^\s\ufeff]/.test(E))A = null;
                                D = /[\s\ufeff]$/.test(E);
                            } else if ((A.$.offsetWidth > 0 || u && A.is('br')) && !A.data('cke-bookmark'))if (C && f.$removeEmpty[A.getName()]) {
                                E = A.getText();
                                if (/[^\s\ufeff]/.test(E))A = null; else {
                                    var H = A.$.all || A.$.getElementsByTagName('*');
                                    for (var I = 0, J; J = H[I++];) {
                                        if (!f.$removeEmpty[J.nodeName.toLowerCase()]) {
                                            A = null;
                                            break;
                                        }
                                    }
                                }
                                if (A)D = !!E.length;
                            } else A = null;
                            if (D)if (C) {
                                if (B)x = z; else if (z)this.setStartBefore(z);
                            } else C = true;
                            if (A) {
                                var K = A.getPrevious();
                                if (!z && !K) {
                                    z = A;
                                    A = null;
                                    break;
                                }
                                A = K;
                            } else z = null;
                        }
                        if (z)z = z.getParent();
                    }
                    F = this.endContainer;
                    G = this.endOffset;
                    z = A = null;
                    B = C = false;
                    if (F.type == 3) {
                        F = !e.trim(F.substring(G)).length && F;
                        C = !(F && F.getLength());
                        if (F)if (!(A = F.getNext()))z = F.getParent();
                    } else {
                        A = F.getChild(G);
                        if (!A)z = F;
                    }
                    while (z || A) {
                        if (z && !A) {
                            if (!B && z.equals(v))B = true;
                            if (!w.contains(z))break;
                            if (!C || z.getComputedStyle('display') != 'inline') {
                                C = false;
                                if (B)y = z; else if (z)this.setEndAfter(z);
                            }
                            A = z.getNext();
                        }
                        while (A) {
                            D = false;
                            if (A.type == 3) {
                                E = A.getText();
                                if (/[^\s\ufeff]/.test(E))A = null;
                                D = /^[\s\ufeff]/.test(E);
                            } else if ((A.$.offsetWidth > 0 || u && A.is('br')) && !A.data('cke-bookmark'))if (C && f.$removeEmpty[A.getName()]) {
                                E = A.getText();
                                if (/[^\s\ufeff]/.test(E))A = null; else {
                                    H = A.$.all || A.$.getElementsByTagName('*');
                                    for (I = 0; J = H[I++];) {
                                        if (!f.$removeEmpty[J.nodeName.toLowerCase()]) {
                                            A = null;
                                            break;
                                        }
                                    }
                                }
                                if (A)D = !!E.length;
                            } else A = null;
                            if (D)if (C)if (B)y = z; else this.setEndAfter(z);
                            if (A) {
                                K = A.getNext();
                                if (!z && !K) {
                                    z = A;
                                    A = null;
                                    break;
                                }
                                A = K;
                            } else z = null;
                        }
                        if (z)z = z.getParent();
                    }
                    if (x && y) {
                        v = x.contains(y) ? y : x;
                        this.setStartBefore(v);
                        this.setEndAfter(v);
                    }
                    break;
                case 2:
                case 3:
                    var L = new d.range(this.document);
                    w = this.document.getBody();
                    L.setStartAt(w, 1);
                    L.setEnd(this.startContainer, this.startOffset);
                    var M = new d.walker(L), N, O, P = d.walker.blockBoundary(t == 3 ? {br: 1} : null), Q = function (W) {
                        var X = P(W);
                        if (!X)N = W;
                        return X;
                    }, R = function (W) {
                        var X = Q(W);
                        if (!X && W.is && W.is('br'))O = W;
                        return X;
                    };
                    M.guard = Q;
                    z = M.lastBackward();
                    N = N || w;
                    this.setStartAt(N, !N.is('br') && (!z && this.checkStartOfBlock() || z && N.contains(z)) ? 1 : 4);
                    if (t == 3) {
                        var S = this.clone();
                        M = new d.walker(S);
                        var T = d.walker.whitespaces(), U = d.walker.bookmark();
                        M.evaluator = function (W) {
                            return!T(W) && !U(W);
                        };
                        var V = M.previous();
                        if (V && V.type == 1 && V.is('br'))return;
                    }
                    L = this.clone();
                    L.collapse();
                    L.setEndAt(w, 2);
                    M = new d.walker(L);
                    M.guard = t == 3 ? R : Q;
                    N = null;
                    z = M.lastForward();
                    N = N || w;
                    this.setEndAt(N, !z && this.checkEndOfBlock() || z && N.contains(z) ? 2 : 3);
                    if (O)this.setEndAfter(O);
            }
        }, shrink: function (t, u) {
            if (!this.collapsed) {
                t = t || 2;
                var v = this.clone(), w = this.startContainer, x = this.endContainer, y = this.startOffset, z = this.endOffset, A = this.collapsed, B = 1, C = 1;
                if (w && w.type == 3)if (!y)v.setStartBefore(w); else if (y >= w.getLength())v.setStartAfter(w); else {
                    v.setStartBefore(w);
                    B = 0;
                }
                if (x && x.type == 3)if (!z)v.setEndBefore(x); else if (z >= x.getLength())v.setEndAfter(x); else {
                    v.setEndAfter(x);
                    C = 0;
                }
                var D = new d.walker(v), E = d.walker.bookmark();
                D.evaluator = function (I) {
                    return I.type == (t == 1 ? 1 : 3);
                };
                var F;
                D.guard = function (I, J) {
                    if (E(I))return true;
                    if (t == 1 && I.type == 3)return false;
                    if (J && I.equals(F))return false;
                    if (!J && I.type == 1)F = I;
                    return true;
                };
                if (B) {
                    var G = D[t == 1 ? 'lastForward' : 'next']();
                    G && this.setStartAt(G, u ? 1 : 3);
                }
                if (C) {
                    D.reset();
                    var H = D[t == 1 ? 'lastBackward' : 'previous']();
                    H && this.setEndAt(H, u ? 2 : 4);
                }
                return!!(B || C);
            }
        }, insertNode: function (t) {
            var x = this;
            x.optimizeBookmark();
            x.trim(false, true);
            var u = x.startContainer, v = x.startOffset, w = u.getChild(v);
            if (w)t.insertBefore(w); else u.append(t);
            if (t.getParent().equals(x.endContainer))x.endOffset++;
            x.setStartBefore(t);
        }, moveToPosition: function (t, u) {
            this.setStartAt(t, u);
            this.collapse(true);
        }, selectNodeContents: function (t) {
            this.setStart(t, 0);
            this.setEnd(t, t.type == 3 ? t.getLength() : t.getChildCount());
        }, setStart: function (t, u) {
            var v = this;
            if (t.type == 1 && f.$empty[t.getName()])u = t.getIndex(), t = t.getParent();
            v.startContainer = t;
            v.startOffset = u;
            if (!v.endContainer) {
                v.endContainer = t;
                v.endOffset = u;
            }
            l(v);
        }, setEnd: function (t, u) {
            var v = this;
            if (t.type == 1 && f.$empty[t.getName()])u = t.getIndex() + 1, t = t.getParent();
            v.endContainer = t;
            v.endOffset = u;
            if (!v.startContainer) {
                v.startContainer = t;
                v.startOffset = u;
            }
            l(v);
        }, setStartAfter: function (t) {
            this.setStart(t.getParent(), t.getIndex() + 1);
        }, setStartBefore: function (t) {
            this.setStart(t.getParent(), t.getIndex());
        }, setEndAfter: function (t) {
            this.setEnd(t.getParent(), t.getIndex() + 1);
        }, setEndBefore: function (t) {
            this.setEnd(t.getParent(), t.getIndex());
        }, setStartAt: function (t, u) {
            var v = this;
            switch (u) {
                case 1:
                    v.setStart(t, 0);
                    break;
                case 2:
                    if (t.type == 3)v.setStart(t, t.getLength()); else v.setStart(t, t.getChildCount());
                    break;
                case 3:
                    v.setStartBefore(t);
                    break;
                case 4:
                    v.setStartAfter(t);
            }
            l(v);
        }, setEndAt: function (t, u) {
            var v = this;
            switch (u) {
                case 1:
                    v.setEnd(t, 0);
                    break;
                case 2:
                    if (t.type == 3)v.setEnd(t, t.getLength()); else v.setEnd(t, t.getChildCount());
                    break;
                case 3:
                    v.setEndBefore(t);
                    break;
                case 4:
                    v.setEndAfter(t);
            }
            l(v);
        }, fixBlock: function (t, u) {
            var x = this;
            var v = x.createBookmark(), w = x.document.createElement(u);
            x.collapse(t);
            x.enlarge(2);
            x.extractContents().appendTo(w);
            w.trim();
            if (!c)w.appendBogus();
            x.insertNode(w);
            x.moveToBookmark(v);
            return w;
        }, splitBlock: function (t) {
            var D = this;
            var u = new d.elementPath(D.startContainer), v = new d.elementPath(D.endContainer), w = u.blockLimit, x = v.blockLimit, y = u.block, z = v.block, A = null;
            if (!w.equals(x))return null;
            if (t != 'br') {
                if (!y) {
                    y = D.fixBlock(true, t);
                    z = new d.elementPath(D.endContainer).block;
                }
                if (!z)z = D.fixBlock(false, t);
            }
            var B = y && D.checkStartOfBlock(), C = z && D.checkEndOfBlock();
            D.deleteContents();
            if (y && y.equals(z))if (C) {
                A = new d.elementPath(D.startContainer);
                D.moveToPosition(z, 4);
                z = null;
            } else if (B) {
                A = new d.elementPath(D.startContainer);
                D.moveToPosition(y, 3);
                y = null;
            } else {
                z = D.splitElement(y);
                if (!c && !y.is('ul', 'ol'))y.appendBogus();
            }
            return{previousBlock: y, nextBlock: z, wasStartOfBlock: B, wasEndOfBlock: C, elementPath: A};
        }, splitElement: function (t) {
            var w = this;
            if (!w.collapsed)return null;
            w.setEndAt(t, 2);
            var u = w.extractContents(), v = t.clone(false);
            u.appendTo(v);
            v.insertAfter(t);
            w.moveToPosition(t, 4);
            return v;
        }, checkBoundaryOfElement: function (t, u) {
            var v = u == 1, w = this.clone();
            w.collapse(v);
            w[v ? 'setStartAt' : 'setEndAt'](t, v ? 1 : 2);
            var x = new d.walker(w);
            x.evaluator = p;
            return x[v ? 'checkBackward' : 'checkForward']();
        }, checkStartOfBlock: function () {
            var z = this;
            var t = z.startContainer, u = z.startOffset;
            if (u && t.type == 3) {
                var v = e.ltrim(t.substring(0, u));
                if (v.length)return false;
            }
            z.trim();
            var w = new d.elementPath(z.startContainer), x = z.clone();
            x.collapse(true);
            x.setStartAt(w.block || w.blockLimit, 1);
            var y = new d.walker(x);
            y.evaluator = o(true);
            return y.checkBackward();
        }, checkEndOfBlock: function () {
            var z = this;
            var t = z.endContainer, u = z.endOffset;
            if (t.type == 3) {
                var v = e.rtrim(t.substring(u));
                if (v.length)return false;
            }
            z.trim();
            var w = new d.elementPath(z.endContainer), x = z.clone();
            x.collapse(false);
            x.setEndAt(w.block || w.blockLimit, 2);
            var y = new d.walker(x);
            y.evaluator = o(false);
            return y.checkForward();
        }, checkReadOnly: (function () {
            function t(u, v) {
                while (u) {
                    if (u.type == 1)if (u.getAttribute('contentEditable') == 'false' && !u.data('cke-editable'))return 0; else if (u.is('html') || u.getAttribute('contentEditable') == 'true' && (u.contains(v) || u.equals(v)))break;
                    u = u.getParent();
                }
                return 1;
            };
            return function () {
                var u = this.startContainer, v = this.endContainer;
                return!(t(u, v) && t(v, u));
            };
        })(), moveToElementEditablePosition: function (t, u) {
            function v(x, y) {
                var z;
                if (x.type == 1 && x.isEditable(false) && !f.$nonEditable[x.getName()])z = x[u ? 'getLast' : 'getFirst'](s);
                if (!y && !z)z = x[u ? 'getPrevious' : 'getNext'](s);
                return z;
            };
            var w = 0;
            while (t) {
                if (t.type == 3) {
                    this.moveToPosition(t, u ? 4 : 3);
                    w = 1;
                    break;
                }
                if (t.type == 1)if (t.isEditable()) {
                    this.moveToPosition(t, u ? 2 : 1);
                    w = 1;
                }
                t = v(t, w);
            }
            return!!w;
        }, moveToElementEditStart: function (t) {
            return this.moveToElementEditablePosition(t);
        }, moveToElementEditEnd: function (t) {
            return this.moveToElementEditablePosition(t, true);
        }, getEnclosedNode: function () {
            var t = this.clone();
            t.optimize();
            if (t.startContainer.type != 1 || t.endContainer.type != 1)return null;
            var u = new d.walker(t), v = d.walker.bookmark(true), w = d.walker.whitespaces(true), x = function (z) {
                return w(z) && v(z);
            };
            t.evaluator = x;
            var y = u.next();
            u.reset();
            return y && y.equals(u.previous()) ? y : null;
        }, getTouchedStartNode: function () {
            var t = this.startContainer;
            if (this.collapsed || t.type != 1)return t;
            return t.getChild(this.startOffset) || t;
        }, getTouchedEndNode: function () {
            var t = this.endContainer;
            if (this.collapsed || t.type != 1)return t;
            return t.getChild(this.endOffset - 1) || t;
        }};
    })();
    a.POSITION_AFTER_START = 1;
    a.POSITION_BEFORE_END = 2;
    a.POSITION_BEFORE_START = 3;
    a.POSITION_AFTER_END = 4;
    a.ENLARGE_ELEMENT = 1;
    a.ENLARGE_BLOCK_CONTENTS = 2;
    a.ENLARGE_LIST_ITEM_CONTENTS = 3;
    a.START = 1;
    a.END = 2;
    a.STARTEND = 3;
    a.SHRINK_ELEMENT = 1;
    a.SHRINK_TEXT = 2;
    (function () {
        d.rangeList = function (n) {
            if (n instanceof d.rangeList)return n;
            if (!n)n = []; else if (n instanceof d.range)n = [n];
            return e.extend(n, l);
        };
        var l = {createIterator: function () {
            var n = this, o = d.walker.bookmark(), p = function (s) {
                return!(s.is && s.is('tr'));
            }, q = [], r;
            return{getNextRange: function (s) {
                r = r == undefined ? 0 : r + 1;
                var t = n[r];
                if (t && n.length > 1) {
                    if (!r)for (var u = n.length - 1; u >= 0; u--)q.unshift(n[u].createBookmark(true));
                    if (s) {
                        var v = 0;
                        while (n[r + v + 1]) {
                            var w = t.document, x = 0, y = w.getById(q[v].endNode), z = w.getById(q[v + 1].startNode), A;
                            while (1) {
                                A = y.getNextSourceNode(false);
                                if (!z.equals(A)) {
                                    if (o(A) || A.type == 1 && A.isBlockBoundary()) {
                                        y = A;
                                        continue;
                                    }
                                } else x = 1;
                                break;
                            }
                            if (!x)break;
                            v++;
                        }
                    }
                    t.moveToBookmark(q.shift());
                    while (v--) {
                        A = n[++r];
                        A.moveToBookmark(q.shift());
                        t.setEnd(A.endContainer, A.endOffset);
                    }
                }
                return t;
            }};
        }, createBookmarks: function (n) {
            var s = this;
            var o = [], p;
            for (var q = 0; q < s.length; q++) {
                o.push(p = s[q].createBookmark(n, true));
                for (var r = q + 1; r < s.length; r++) {
                    s[r] = m(p, s[r]);
                    s[r] = m(p, s[r], true);
                }
            }
            return o;
        }, createBookmarks2: function (n) {
            var o = [];
            for (var p = 0; p < this.length; p++)o.push(this[p].createBookmark2(n));
            return o;
        }, moveToBookmarks: function (n) {
            for (var o = 0; o < this.length; o++)this[o].moveToBookmark(n[o]);
        }};

        function m(n, o, p) {
            var q = n.serializable, r = o[p ? 'endContainer' : 'startContainer'], s = p ? 'endOffset' : 'startOffset', t = q ? o.document.getById(n.startNode) : n.startNode, u = q ? o.document.getById(n.endNode) : n.endNode;
            if (r.equals(t.getPrevious())) {
                o.startOffset = o.startOffset - r.getLength() - u.getPrevious().getLength();
                r = u.getNext();
            } else if (r.equals(u.getPrevious())) {
                o.startOffset = o.startOffset - r.getLength();
                r = u.getNext();
            }
            r.equals(t.getParent()) && o[s]++;
            r.equals(u.getParent()) && o[s]++;
            o[p ? 'endContainer' : 'startContainer'] = r;
            return o;
        };
    })();
    (function () {
        if (b.webkit) {
            b.hc = false;
            return;
        }
        var l = h.createFromHtml('<div style="width:0px;height:0px;position:absolute;left:-10000px;border: 1px solid;border-color: red blue;"></div>', a.document);
        l.appendTo(a.document.getHead());
        try {
            b.hc = l.getComputedStyle('border-top-color') == l.getComputedStyle('border-right-color');
        } catch (m) {
            b.hc = false;
        }
        if (b.hc)b.cssClass += ' cke_hc';
        l.remove();
    })();
    j.load(i.corePlugins.split(','), function () {
        a.status = 'loaded';
        a.fire('loaded');
        var l = a._.pending;
        if (l) {
            delete a._.pending;
            for (var m = 0; m < l.length; m++)a.add(l[m]);
        }
    });
    if (c)try {
        document.execCommand('BackgroundImageCache', false, true);
    } catch (l) {
    }
    a.skins.add('kama', (function () {
        var m = 'cke_ui_color';
        return{editor: {css: ['editor.css']}, dialog: {css: ['dialog.css']}, richcombo: {canGroup: false}, templates: {css: ['templates.css']}, margins: [0, 0, 0, 0], init: function (n) {
            if (n.config.width && !isNaN(n.config.width))n.config.width -= 12;
            var o = [], p = /\$color/g, q = '/* UI Color Support */.cke_skin_kama .cke_menuitem .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a:active .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover .cke_label,.cke_skin_kama .cke_menuitem a:focus .cke_label,.cke_skin_kama .cke_menuitem a:active .cke_label{\tbackground-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_label,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_label{\tbackground-color: transparent !important;}.cke_skin_kama .cke_menuitem a.cke_disabled:hover .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:focus .cke_icon_wrapper,.cke_skin_kama .cke_menuitem a.cke_disabled:active .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuitem a.cke_disabled .cke_icon_wrapper{\tbackground-color: $color !important;\tborder-color: $color !important;}.cke_skin_kama .cke_menuseparator{\tbackground-color: $color !important;}.cke_skin_kama .cke_menuitem a:hover,.cke_skin_kama .cke_menuitem a:focus,.cke_skin_kama .cke_menuitem a:active{\tbackground-color: $color !important;}';
            if (b.webkit) {
                q = q.split('}').slice(0, -1);
                for (var r = 0; r < q.length; r++)q[r] = q[r].split('{');
            }
            function s(v) {
                var w = v.getById(m);
                if (!w) {
                    w = v.getHead().append('style');
                    w.setAttribute('id', m);
                    w.setAttribute('type', 'text/css');
                }
                return w;
            };
            function t(v, w, x) {
                var y, z, A;
                for (var B = 0; B < v.length; B++) {
                    if (b.webkit)for (z = 0; z < w.length; z++) {
                        A = w[z][1];
                        for (y = 0; y < x.length; y++)A = A.replace(x[y][0], x[y][1]);
                        v[B].$.sheet.addRule(w[z][0], A);
                    } else {
                        A = w;
                        for (y = 0; y < x.length; y++)A = A.replace(x[y][0], x[y][1]);
                        if (c)v[B].$.styleSheet.cssText += A; else v[B].$.innerHTML += A;
                    }
                }
            };
            var u = /\$color/g;
            e.extend(n, {uiColor: null, getUiColor: function () {
                return this.uiColor;
            }, setUiColor: function (v) {
                var w, x = s(a.document), y = '.' + n.id, z = [y + ' .cke_wrapper', y + '_dialog .cke_dialog_contents', y + '_dialog a.cke_dialog_tab', y + '_dialog .cke_dialog_footer'].join(','), A = 'background-color: $color !important;';
                if (b.webkit)w = [
                    [z, A]
                ]; else w = z + '{' + A + '}';
                return(this.setUiColor = function (B) {
                    var C = [
                        [u, B]
                    ];
                    n.uiColor = B;
                    t([x], w, C);
                    t(o, q, C);
                })(v);
            }});
            n.on('menuShow', function (v) {
                var w = v.data[0], x = w.element.getElementsByTag('iframe').getItem(0).getFrameDocument();
                if (!x.getById('cke_ui_color')) {
                    var y = s(x);
                    o.push(y);
                    var z = n.getUiColor();
                    if (z)t([y], q, [
                        [u, z]
                    ]);
                }
            });
            if (n.config.uiColor)n.setUiColor(n.config.uiColor);
        }};
    })());
    (function () {
        a.dialog ? m() : a.on('dialogPluginReady', m);
        function m() {
            a.dialog.on('resize', function (n) {
                var o = n.data, p = o.width, q = o.height, r = o.dialog, s = r.parts.contents;
                if (o.skin != 'kama')return;
                s.setStyles({width: p + 'px', height: q + 'px'});
            });
        };
    })();
    j.add('about', {requires: ['dialog'], init: function (m) {
        var n = m.addCommand('about', new a.dialogCommand('about'));
        n.modes = {wysiwyg: 1, source: 1};
        n.canUndo = false;
        n.readOnly = 1;
        m.ui.addButton('About', {label: m.lang.about.title, command: 'about'});
        a.dialog.add('about', this.path + 'dialogs/about.js');
    }});
    (function () {
        var m = 'a11yhelp', n = 'a11yHelp';
        j.add(m, {availableLangs: {en: 1, he: 1}, init: function (o) {
            var p = this;
            o.addCommand(n, {exec: function () {
                var q = o.langCode;
                q = p.availableLangs[q] ? q : 'en';
                a.scriptLoader.load(a.getUrl(p.path + 'lang/' + q + '.js'), function () {
                    e.extend(o.lang, p.langEntries[q]);
                    o.openDialog(n);
                });
            }, modes: {wysiwyg: 1, source: 1}, readOnly: 1, canUndo: false});
            a.dialog.add(n, this.path + 'dialogs/a11yhelp.js');
        }});
    })();
    j.add('basicstyles', {requires: ['styles', 'button'], init: function (m) {
        var n = function (q, r, s, t) {
            var u = new a.style(t);
            m.attachStyleStateChange(u, function (v) {
                !m.readOnly && m.getCommand(s).setState(v);
            });
            m.addCommand(s, new a.styleCommand(u));
            m.ui.addButton(q, {label: r, command: s});
        }, o = m.config, p = m.lang;
        n('Bold', p.bold, 'bold', o.coreStyles_bold);
        n('Italic', p.italic, 'italic', o.coreStyles_italic);
        n('Underline', p.underline, 'underline', o.coreStyles_underline);
        n('Strike', p.strike, 'strike', o.coreStyles_strike);
        n('Subscript', p.subscript, 'subscript', o.coreStyles_subscript);
        n('Superscript', p.superscript, 'superscript', o.coreStyles_superscript);
    }});
    i.coreStyles_bold = {element: 'strong', overrides: 'b'};
    i.coreStyles_italic = {element: 'em', overrides: 'i'};
    i.coreStyles_underline = {element: 'u'};
    i.coreStyles_strike = {element: 'strike'};
    i.coreStyles_subscript = {element: 'sub'};
    i.coreStyles_superscript = {element: 'sup'};
    (function () {
        var m = {table: 1, ul: 1, ol: 1, blockquote: 1, div: 1}, n = {}, o = {};
        e.extend(n, m, {tr: 1, p: 1, div: 1, li: 1});
        e.extend(o, n, {td: 1});
        function p(B) {
            q(B);
            r(B);
        };
        function q(B) {
            var C = B.editor, D = B.data.path;
            if (C.readOnly)return;
            var E = C.config.useComputedState, F;
            E = E === undefined || E;
            if (!E)F = s(D.lastElement);
            F = F || D.block || D.blockLimit;
            if (F.is('body')) {
                var G = C.getSelection().getRanges()[0].getEnclosedNode();
                G && G.type == 1 && (F = G);
            }
            if (!F)return;
            var H = E ? F.getComputedStyle('direction') : F.getStyle('direction') || F.getAttribute('dir');
            C.getCommand('bidirtl').setState(H == 'rtl' ? 1 : 2);
            C.getCommand('bidiltr').setState(H == 'ltr' ? 1 : 2);
        };
        function r(B) {
            var C = B.editor, D = B.data.path.block || B.data.path.blockLimit;
            C.fire('contentDirChanged', D ? D.getComputedStyle('direction') : C.lang.dir);
        };
        function s(B) {
            while (B && !(B.getName() in o || B.is('body'))) {
                var C = B.getParent();
                if (!C)break;
                B = C;
            }
            return B;
        };
        function t(B, C, D, E) {
            if (B.isReadOnly())return;
            h.setMarker(E, B, 'bidi_processed', 1);
            var F = B;
            while ((F = F.getParent()) && !F.is('body')) {
                if (F.getCustomData('bidi_processed')) {
                    B.removeStyle('direction');
                    B.removeAttribute('dir');
                    return;
                }
            }
            var G = 'useComputedState' in D.config ? D.config.useComputedState : 1, H = G ? B.getComputedStyle('direction') : B.getStyle('direction') || B.hasAttribute('dir');
            if (H == C)return;
            B.removeStyle('direction');
            if (G) {
                B.removeAttribute('dir');
                if (C != B.getComputedStyle('direction'))B.setAttribute('dir', C);
            } else B.setAttribute('dir', C);
            D.forceNextSelectionCheck();
        };
        function u(B, C, D) {
            var E = B.getCommonAncestor(false, true);
            B = B.clone();
            B.enlarge(D == 2 ? 3 : 2);
            if (B.checkBoundaryOfElement(E, 1) && B.checkBoundaryOfElement(E, 2)) {
                var F;
                while (E && E.type == 1 && (F = E.getParent()) && F.getChildCount() == 1 && !(E.getName() in C))E = F;
                return E.type == 1 && E.getName() in C && E;
            }
        };
        function v(B) {
            return function (C) {
                var D = C.getSelection(), E = C.config.enterMode, F = D.getRanges();
                if (F && F.length) {
                    var G = {}, H = D.createBookmarks(), I = F.createIterator(), J, K = 0;
                    while (J = I.getNextRange(1)) {
                        var L = J.getEnclosedNode();
                        if (!L || L && !(L.type == 1 && L.getName() in n))L = u(J, m, E);
                        L && t(L, B, C, G);
                        var M, N, O = new d.walker(J), P = H[K].startNode, Q = H[K++].endNode;
                        O.evaluator = function (R) {
                            return!!(R.type == 1 && R.getName() in m && !(R.getName() == (E == 1 ? 'p' : 'div') && R.getParent().type == 1 && R.getParent().getName() == 'blockquote') && R.getPosition(P) & 2 && (R.getPosition(Q) & 4 + 16) == 4);
                        };
                        while (N = O.next())t(N, B, C, G);
                        M = J.createIterator();
                        M.enlargeBr = E != 2;
                        while (N = M.getNextParagraph(E == 1 ? 'p' : 'div'))t(N, B, C, G);
                    }
                    h.clearAllMarkers(G);
                    C.forceNextSelectionCheck();
                    D.selectBookmarks(H);
                    C.focus();
                }
            };
        };
        j.add('bidi', {requires: ['styles', 'button'], init: function (B) {
            var C = function (E, F, G, H) {
                B.addCommand(G, new a.command(B, {exec: H}));
                B.ui.addButton(E, {label: F, command: G});
            }, D = B.lang.bidi;
            C('BidiLtr', D.ltr, 'bidiltr', v('ltr'));
            C('BidiRtl', D.rtl, 'bidirtl', v('rtl'));
            B.on('selectionChange', p);
            B.on('contentDom', function () {
                B.document.on('dirChanged', function (E) {
                    B.fire('dirChanged', {node: E.data, dir: E.data.getDirection(1)});
                });
            });
        }});
        function w(B) {
            var C = B.getDocument().getBody().getParent();
            while (B) {
                if (B.equals(C))return false;
                B = B.getParent();
            }
            return true;
        };
        function x(B) {
            var C = B == y.setAttribute, D = B == y.removeAttribute, E = /\bdirection\s*:\s*(.*?)\s*(:?$|;)/;
            return function (F, G) {
                var J = this;
                if (!J.getDocument().equals(a.document)) {
                    var H;
                    if ((F == (C || D ? 'dir' : 'direction') || F == 'style' && (D || E.test(G))) && !w(J)) {
                        H = J.getDirection(1);
                        var I = B.apply(J, arguments);
                        if (H != J.getDirection(1)) {
                            J.getDocument().fire('dirChanged', J);
                            return I;
                        }
                    }
                }
                return B.apply(J, arguments);
            };
        };
        var y = h.prototype, z = ['setStyle', 'removeStyle', 'setAttribute', 'removeAttribute'];
        for (var A = 0; A < z.length; A++)y[z[A]] = e.override(y[z[A]], x);
    })();
    (function () {
        function m(q, r) {
            var s = r.block || r.blockLimit;
            if (!s || s.getName() == 'body')return 2;
            if (s.getAscendant('blockquote', true))return 1;
            return 2;
        };
        function n(q) {
            var r = q.editor;
            if (r.readOnly)return;
            var s = r.getCommand('blockquote');
            s.state = m(r, q.data.path);
            s.fire('state');
        };
        function o(q) {
            for (var r = 0, s = q.getChildCount(), t; r < s && (t = q.getChild(r)); r++) {
                if (t.type == 1 && t.isBlockBoundary())return false;
            }
            return true;
        };
        var p = {exec: function (q) {
            var r = q.getCommand('blockquote').state, s = q.getSelection(), t = s && s.getRanges(true)[0];
            if (!t)return;
            var u = s.createBookmarks();
            if (c) {
                var v = u[0].startNode, w = u[0].endNode, x;
                if (v && v.getParent().getName() == 'blockquote') {
                    x = v;
                    while (x = x.getNext()) {
                        if (x.type == 1 && x.isBlockBoundary()) {
                            v.move(x, true);
                            break;
                        }
                    }
                }
                if (w && w.getParent().getName() == 'blockquote') {
                    x = w;
                    while (x = x.getPrevious()) {
                        if (x.type == 1 && x.isBlockBoundary()) {
                            w.move(x);
                            break;
                        }
                    }
                }
            }
            var y = t.createIterator(), z;
            y.enlargeBr = q.config.enterMode != 2;
            if (r == 2) {
                var A = [];
                while (z = y.getNextParagraph())A.push(z);
                if (A.length < 1) {
                    var B = q.document.createElement(q.config.enterMode == 1 ? 'p' : 'div'), C = u.shift();
                    t.insertNode(B);
                    B.append(new d.text('\ufeff', q.document));
                    t.moveToBookmark(C);
                    t.selectNodeContents(B);
                    t.collapse(true);
                    C = t.createBookmark();
                    A.push(B);
                    u.unshift(C);
                }
                var D = A[0].getParent(), E = [];
                for (var F = 0; F < A.length; F++) {
                    z = A[F];
                    D = D.getCommonAncestor(z.getParent());
                }
                var G = {table: 1, tbody: 1, tr: 1, ol: 1, ul: 1};
                while (G[D.getName()])D = D.getParent();
                var H = null;
                while (A.length > 0) {
                    z = A.shift();
                    while (!z.getParent().equals(D))z = z.getParent();
                    if (!z.equals(H))E.push(z);
                    H = z;
                }
                while (E.length > 0) {
                    z = E.shift();
                    if (z.getName() == 'blockquote') {
                        var I = new d.documentFragment(q.document);
                        while (z.getFirst()) {
                            I.append(z.getFirst().remove());
                            A.push(I.getLast());
                        }
                        I.replace(z);
                    } else A.push(z);
                }
                var J = q.document.createElement('blockquote');
                J.insertBefore(A[0]);
                while (A.length > 0) {
                    z = A.shift();
                    J.append(z);
                }
            } else if (r == 1) {
                var K = [], L = {};
                while (z = y.getNextParagraph()) {
                    var M = null, N = null;
                    while (z.getParent()) {
                        if (z.getParent().getName() == 'blockquote') {
                            M = z.getParent();
                            N = z;
                            break;
                        }
                        z = z.getParent();
                    }
                    if (M && N && !N.getCustomData('blockquote_moveout')) {
                        K.push(N);
                        h.setMarker(L, N, 'blockquote_moveout', true);
                    }
                }
                h.clearAllMarkers(L);
                var O = [], P = [];
                L = {};
                while (K.length > 0) {
                    var Q = K.shift();
                    J = Q.getParent();
                    if (!Q.getPrevious())Q.remove().insertBefore(J); else if (!Q.getNext())Q.remove().insertAfter(J); else {
                        Q.breakParent(Q.getParent());
                        P.push(Q.getNext());
                    }
                    if (!J.getCustomData('blockquote_processed')) {
                        P.push(J);
                        h.setMarker(L, J, 'blockquote_processed', true);
                    }
                    O.push(Q);
                }
                h.clearAllMarkers(L);
                for (F = P.length - 1; F >= 0; F--) {
                    J = P[F];
                    if (o(J))J.remove();
                }
                if (q.config.enterMode == 2) {
                    var R = true;
                    while (O.length) {
                        Q = O.shift();
                        if (Q.getName() == 'div') {
                            I = new d.documentFragment(q.document);
                            var S = R && Q.getPrevious() && !(Q.getPrevious().type == 1 && Q.getPrevious().isBlockBoundary());
                            if (S)I.append(q.document.createElement('br'));
                            var T = Q.getNext() && !(Q.getNext().type == 1 && Q.getNext().isBlockBoundary());
                            while (Q.getFirst())Q.getFirst().remove().appendTo(I);
                            if (T)I.append(q.document.createElement('br'));
                            I.replace(Q);
                            R = false;
                        }
                    }
                }
            }
            s.selectBookmarks(u);
            q.focus();
        }};
        j.add('blockquote', {init: function (q) {
            q.addCommand('blockquote', p);
            q.ui.addButton('Blockquote', {label: q.lang.blockquote, command: 'blockquote'});
            q.on('selectionChange', n);
        }, requires: ['domiterator']});
    })();
    j.add('button', {beforeInit: function (m) {
        m.ui.addHandler('button', k.button.handler);
    }});
    a.UI_BUTTON = 'button';
    k.button = function (m) {
        e.extend(this, m, {title: m.label, className: m.className || m.command && 'cke_button_' + m.command || '', click: m.click || (function (n) {
            n.execCommand(m.command);
        })});
        this._ = {};
    };
    k.button.handler = {create: function (m) {
        return new k.button(m);
    }};
    (function () {
        k.button.prototype = {render: function (m, n) {
            var o = b, p = this._.id = e.getNextId(), q = '', r = this.command, s;
            this._.editor = m;
            var t = {id: p, button: this, editor: m, focus: function () {
                var z = a.document.getById(p);
                z.focus();
            }, execute: function () {
                if (c && b.version < 7)e.setTimeout(function () {
                    this.button.click(m);
                }, 0, this); else this.button.click(m);
            }}, u = e.addFunction(function (z) {
                if (t.onkey) {
                    z = new d.event(z);
                    return t.onkey(t, z.getKeystroke()) !== false;
                }
            }), v = e.addFunction(function (z) {
                var A;
                if (t.onfocus)A = t.onfocus(t, new d.event(z)) !== false;
                if (b.gecko && b.version < 10900)z.preventBubble();
                return A;
            });
            t.clickFn = s = e.addFunction(t.execute, t);
            if (this.modes) {
                var w = {};

                function x() {
                    var z = m.mode;
                    if (z) {
                        var A = this.modes[z] ? w[z] != undefined ? w[z] : 2 : 0;
                        this.setState(m.readOnly && !this.readOnly ? 0 : A);
                    }
                };
                m.on('beforeModeUnload', function () {
                    if (m.mode && this._.state != 0)w[m.mode] = this._.state;
                }, this);
                m.on('mode', x, this);
                !this.readOnly && m.on('readOnly', x, this);
            } else if (r) {
                r = m.getCommand(r);
                if (r) {
                    r.on('state', function () {
                        this.setState(r.state);
                    }, this);
                    q += 'cke_' + (r.state == 1 ? 'on' : r.state == 0 ? 'disabled' : 'off');
                }
            }
            if (!r)q += 'cke_off';
            if (this.className)q += ' ' + this.className;
            n.push('<span class="cke_button' + (this.icon && this.icon.indexOf('.png') == -1 ? ' cke_noalphafix' : '') + '">', '<a id="', p, '" class="', q, '"', o.gecko && o.version >= 10900 && !o.hc ? '' : '" href="javascript:void(\'' + (this.title || '').replace("'", '') + "')\"", ' title="', this.title, '" tabindex="-1" hidefocus="true" role="button" aria-labelledby="' + p + '_label"' + (this.hasArrow ? ' aria-haspopup="true"' : ''));
            if (o.opera || o.gecko && o.mac)n.push(' onkeypress="return false;"');
            if (o.gecko)n.push(' onblur="this.style.cssText = this.style.cssText;"');
            n.push(' onkeydown="return CKEDITOR.tools.callFunction(', u, ', event);" onfocus="return CKEDITOR.tools.callFunction(', v, ', event);" ' + (c ? 'onclick="return false;" onmouseup' : 'onclick') + '="CKEDITOR.tools.callFunction(', s, ', this); return false;"><span class="cke_icon"');
            if (this.icon) {
                var y = (this.iconOffset || 0) * -16;
                n.push(' style="background-image:url(', a.getUrl(this.icon), ');background-position:0 ' + y + 'px;"');
            }
            n.push('>&nbsp;</span><span id="', p, '_label" class="cke_label">', this.label, '</span>');
            if (this.hasArrow)n.push('<span class="cke_buttonarrow">' + (b.hc ? '&#9660;' : '&nbsp;') + '</span>');
            n.push('</a>', '</span>');
            if (this.onRender)this.onRender();
            return t;
        }, setState: function (m) {
            if (this._.state == m)return false;
            this._.state = m;
            var n = a.document.getById(this._.id);
            if (n) {
                n.setState(m);
                m == 0 ? n.setAttribute('aria-disabled', true) : n.removeAttribute('aria-disabled');
                m == 1 ? n.setAttribute('aria-pressed', true) : n.removeAttribute('aria-pressed');
                return true;
            } else return false;
        }};
    })();
    k.prototype.addButton = function (m, n) {
        this.add(m, 'button', n);
    };
    (function () {
        var m = function (y, z) {
            var A = y.document, B = A.getBody(), C = 0, D = function () {
                C = 1;
            };
            B.on(z, D);
            (b.version > 7 ? A.$ : A.$.selection.createRange()).execCommand(z);
            B.removeListener(z, D);
            return C;
        }, n = c ? function (y, z) {
            return m(y, z);
        } : function (y, z) {
            try {
                return y.document.$.execCommand(z, false, null);
            } catch (A) {
                return false;
            }
        }, o = function (y) {
            var z = this;
            z.type = y;
            z.canUndo = z.type == 'cut';
            z.startDisabled = true;
        };
        o.prototype = {exec: function (y, z) {
            this.type == 'cut' && t(y);
            var A = n(y, this.type);
            if (!A)alert(y.lang.clipboard[this.type + 'Error']);
            return A;
        }};
        var p = {canUndo: false, exec: c ? function (y) {
            y.focus();
            if (!y.document.getBody().fire('beforepaste') && !m(y, 'paste')) {
                y.fire('pasteDialog');
                return false;
            }
        } : function (y) {
            try {
                if (!y.document.getBody().fire('beforepaste') && !y.document.$.execCommand('Paste', false, null))throw 0;
            } catch (z) {
                setTimeout(function () {
                    y.fire('pasteDialog');
                }, 0);
                return false;
            }
        }}, q = function (y) {
            if (this.mode != 'wysiwyg')return;
            switch (y.data.keyCode) {
                case 1114112 + 86:
                case 2228224 + 45:
                    var z = this.document.getBody();
                    if (!c && z.fire('beforepaste'))y.cancel(); else if (b.opera || b.gecko && b.version < 10900)z.fire('paste');
                    return;
                case 1114112 + 88:
                case 2228224 + 46:
                    var A = this;
                    this.fire('saveSnapshot');
                    setTimeout(function () {
                        A.fire('saveSnapshot');
                    }, 0);
            }
        };

        function r(y) {
            y.cancel();
        };
        function s(y, z, A) {
            var B = this.document;
            if (B.getById('cke_pastebin'))return;
            if (z == 'text' && y.data && y.data.$.clipboardData) {
                var C = y.data.$.clipboardData.getData('text/plain');
                if (C) {
                    y.data.preventDefault();
                    A(C);
                    return;
                }
            }
            var D = this.getSelection(), E = new d.range(B), F = new h(z == 'text' ? 'textarea' : b.webkit ? 'body' : 'div', B);
            F.setAttribute('id', 'cke_pastebin');
            b.webkit && F.append(B.createText('\xa0'));
            B.getBody().append(F);
            F.setStyles({position: 'absolute', top: D.getStartElement().getDocumentPosition().y + 'px', width: '1px', height: '1px', overflow: 'hidden'});
            F.setStyle(this.config.contentsLangDirection == 'ltr' ? 'left' : 'right', '-1000px');
            var G = D.createBookmarks();
            this.on('selectionChange', r, null, null, 0);
            if (z == 'text')F.$.focus(); else {
                E.setStartAt(F, 1);
                E.setEndAt(F, 2);
                E.select(true);
            }
            var H = this;
            window.setTimeout(function () {
                z == 'text' && b.gecko && H.focusGrabber.focus();
                F.remove();
                H.removeListener('selectionChange', r);
                var I;
                F = b.webkit && (I = F.getFirst()) && I.is && I.hasClass('Apple-style-span') ? I : F;
                D.selectBookmarks(G);
                A(F['get' + (z == 'text' ? 'Value' : 'Html')]());
            }, 0);
        };
        function t(y) {
            if (!c || b.quirks)return;
            var z = y.getSelection(), A;
            if (z.getType() == 3 && (A = z.getSelectedElement())) {
                var B = z.getRanges()[0], C = y.document.createText('');
                C.insertBefore(A);
                B.setStartBefore(C);
                B.setEndAfter(A);
                z.selectRanges([B]);
                setTimeout(function () {
                    if (A.getParent()) {
                        C.remove();
                        z.selectElement(A);
                    }
                }, 0);
            }
        };
        var u;

        function v(y, z) {
            c && (u = 1);
            var A = 2;
            try {
                A = z.document.$.queryCommandEnabled(y) ? 2 : 0;
            } catch (B) {
            }
            u = 0;
            return A;
        };
        var w;

        function x() {
            var z = this;
            if (z.mode != 'wysiwyg')return;
            z.getCommand('cut').setState(w ? 0 : v('Cut', z));
            z.getCommand('copy').setState(v('Copy', z));
            var y = w ? 0 : b.webkit ? 2 : v('Paste', z);
            z.fire('pasteState', y);
        };
        j.add('clipboard', {requires: ['dialog', 'htmldataprocessor'], init: function (y) {
            y.on('paste', function (A) {
                var B = A.data;
                if (B.html)y.insertHtml(B.html); else if (B.text)y.insertText(B.text);
                setTimeout(function () {
                    y.fire('afterPaste');
                }, 0);
            }, null, null, 1000);
            y.on('pasteDialog', function (A) {
                setTimeout(function () {
                    y.openDialog('paste');
                }, 0);
            });
            y.on('pasteState', function (A) {
                y.getCommand('paste').setState(A.data);
            });
            function z(A, B, C, D) {
                var E = y.lang[B];
                y.addCommand(B, C);
                y.ui.addButton(A, {label: E, command: B});
                if (y.addMenuItems)y.addMenuItem(B, {label: E, command: B, group: 'clipboard', order: D});
            };
            z('Cut', 'cut', new o('cut'), 1);
            z('Copy', 'copy', new o('copy'), 4);
            z('Paste', 'paste', p, 8);
            a.dialog.add('paste', a.getUrl(this.path + 'dialogs/paste.js'));
            y.on('key', q, y);
            y.on('contentDom', function () {
                var A = y.document.getBody();
                A.on(b.webkit ? 'paste' : 'beforepaste', function (B) {
                    if (u)return;
                    var C = {mode: 'html'};
                    y.fire('beforePaste', C);
                    s.call(y, B, C.mode, function (D) {
                        if (!(D = e.trim(D.replace(/<span[^>]+data-cke-bookmark[^<]*?<\/span>/ig, ''))))return;
                        var E = {};
                        E[C.mode] = D;
                        y.fire('paste', E);
                    });
                });
                A.on('contextmenu', function () {
                    u = 1;
                    setTimeout(function () {
                        u = 0;
                    }, 10);
                });
                A.on('beforecut', function () {
                    !u && t(y);
                });
                A.on('mouseup', function () {
                    setTimeout(function () {
                        x.call(y);
                    }, 0);
                }, y);
                A.on('keyup', x, y);
            });
            y.on('selectionChange', function (A) {
                w = A.data.selection.getRanges()[0].checkReadOnly();
                x.call(y);
            });
            if (y.contextMenu)y.contextMenu.addListener(function (A, B) {
                var C = B.getRanges()[0].checkReadOnly();
                return{cut: !C && v('Cut', y), copy: v('Copy', y), paste: !C && (b.webkit ? 2 : v('Paste', y))};
            });
        }});
    })();
    j.add('colorbutton', {requires: ['panelbutton', 'floatpanel', 'styles'], init: function (m) {
        var n = m.config, o = m.lang.colorButton, p;
        if (!b.hc) {
            q('TextColor', 'fore', o.textColorTitle);
            q('BGColor', 'back', o.bgColorTitle);
        }
        function q(t, u, v) {
            var w = e.getNextId() + '_colorBox';
            m.ui.add(t, 'panelbutton', {label: v, title: v, className: 'cke_button_' + t.toLowerCase(), modes: {wysiwyg: 1}, panel: {css: m.skin.editor.css, attributes: {role: 'listbox', 'aria-label': o.panelTitle}}, onBlock: function (x, y) {
                y.autoSize = true;
                y.element.addClass('cke_colorblock');
                y.element.setHtml(r(x, u, w));
                y.element.getDocument().getBody().setStyle('overflow', 'hidden');
                k.fire('ready', this);
                var z = y.keys, A = m.lang.dir == 'rtl';
                z[A ? 37 : 39] = 'next';
                z[40] = 'next';
                z[9] = 'next';
                z[A ? 39 : 37] = 'prev';
                z[38] = 'prev';
                z[2228224 + 9] = 'prev';
                z[32] = 'click';
            }, onOpen: function () {
                var x = m.getSelection(), y = x && x.getStartElement(), z = new d.elementPath(y), A;
                y = z.block || z.blockLimit || m.document.getBody();
                do A = y && y.getComputedStyle(u == 'back' ? 'background-color' : 'color') || 'transparent'; while (u == 'back' && A == 'transparent' && y && (y = y.getParent()));
                if (!A || A == 'transparent')A = '#ffffff';
                this._.panel._.iframe.getFrameDocument().getById(w).setStyle('background-color', A);
            }});
        };
        function r(t, u, v) {
            var w = [], x = n.colorButton_colors.split(','), y = x.length + (n.colorButton_enableMore ? 2 : 1), z = e.addFunction(function (F, G) {
                if (F == '?') {
                    var H = arguments.callee;

                    function I(K) {
                        this.removeListener('ok', I);
                        this.removeListener('cancel', I);
                        K.name == 'ok' && H(this.getContentElement('picker', 'selectedColor').getValue(), G);
                    };
                    m.openDialog('colordialog', function () {
                        this.on('ok', I);
                        this.on('cancel', I);
                    });
                    return;
                }
                m.focus();
                t.hide(false);
                m.fire('saveSnapshot');
                new a.style(n['colorButton_' + G + 'Style'], {color: 'inherit'}).remove(m.document);
                if (F) {
                    var J = n['colorButton_' + G + 'Style'];
                    J.childRule = G == 'back' ? function (K) {
                        return s(K);
                    } : function (K) {
                        return!(K.is('a') || K.getElementsByTag('a').count()) || s(K);
                    };
                    new a.style(J, {color: F}).apply(m.document);
                }
                m.fire('saveSnapshot');
            });
            w.push('<a class="cke_colorauto" _cke_focus=1 hidefocus=true title="', o.auto, '" onclick="CKEDITOR.tools.callFunction(', z, ",null,'", u, "');return false;\" href=\"javascript:void('", o.auto, '\')" role="option" aria-posinset="1" aria-setsize="', y, '"><table role="presentation" cellspacing=0 cellpadding=0 width="100%"><tr><td><span class="cke_colorbox" id="', v, '"></span></td><td colspan=7 align=center>', o.auto, '</td></tr></table></a><table role="presentation" cellspacing=0 cellpadding=0 width="100%">');
            for (var A = 0; A < x.length; A++) {
                if (A % 8 === 0)w.push('</tr><tr>');
                var B = x[A].split('/'), C = B[0], D = B[1] || C;
                if (!B[1])C = '#' + C.replace(/^(.)(.)(.)$/, '$1$1$2$2$3$3');
                var E = m.lang.colors[D] || D;
                w.push('<td><a class="cke_colorbox" _cke_focus=1 hidefocus=true title="', E, '" onclick="CKEDITOR.tools.callFunction(', z, ",'", C, "','", u, "'); return false;\" href=\"javascript:void('", E, '\')" role="option" aria-posinset="', A + 2, '" aria-setsize="', y, '"><span class="cke_colorbox" style="background-color:#', D, '"></span></a></td>');
            }
            if (n.colorButton_enableMore === undefined || n.colorButton_enableMore)w.push('</tr><tr><td colspan=8 align=center><a class="cke_colormore" _cke_focus=1 hidefocus=true title="', o.more, '" onclick="CKEDITOR.tools.callFunction(', z, ",'?','", u, "');return false;\" href=\"javascript:void('", o.more, "')\"", ' role="option" aria-posinset="', y, '" aria-setsize="', y, '">', o.more, '</a></td>');
            w.push('</tr></table>');
            return w.join('');
        };
        function s(t) {
            return t.getAttribute('contentEditable') == 'false' || t.getAttribute('data-nostyle');
        };
    }});
    i.colorButton_colors = '000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF';
    i.colorButton_foreStyle = {element: 'span', styles: {color: '#(color)'}, overrides: [
        {element: 'font', attributes: {color: null}}
    ]};
    i.colorButton_backStyle = {element: 'span', styles: {'background-color': '#(color)'}};
    j.colordialog = {init: function (m) {
        m.addCommand('colordialog', new a.dialogCommand('colordialog'));
        a.dialog.add('colordialog', this.path + 'dialogs/colordialog.js');
    }};
    j.add('colordialog', j.colordialog);
    j.add('contextmenu', {requires: ['menu'], onLoad: function () {
        j.contextMenu = e.createClass({base: a.menu, $: function (m) {
            this.base.call(this, m, {panel: {className: m.skinClass + ' cke_contextmenu', attributes: {'aria-label': m.lang.contextmenu.options}}});
        }, proto: {addTarget: function (m, n) {
            if (b.opera && !('oncontextmenu' in document.body)) {
                var o;
                m.on('mousedown', function (s) {
                    s = s.data;
                    if (s.$.button != 2) {
                        if (s.getKeystroke() == 1114112 + 1)m.fire('contextmenu', s);
                        return;
                    }
                    if (n && (b.mac ? s.$.metaKey : s.$.ctrlKey))return;
                    var t = s.getTarget();
                    if (!o) {
                        var u = t.getDocument();
                        o = u.createElement('input');
                        o.$.type = 'button';
                        u.getBody().append(o);
                    }
                    o.setAttribute('style', 'position:absolute;top:' + (s.$.clientY - 2) + 'px;left:' + (s.$.clientX - 2) + 'px;width:5px;height:5px;opacity:0.01');
                });
                m.on('mouseup', function (s) {
                    if (o) {
                        o.remove();
                        o = undefined;
                        m.fire('contextmenu', s.data);
                    }
                });
            }
            m.on('contextmenu', function (s) {
                var t = s.data;
                if (n && (b.webkit ? p : b.mac ? t.$.metaKey : t.$.ctrlKey))return;
                t.preventDefault();
                var u = t.getTarget().getDocument().getDocumentElement(), v = t.$.clientX, w = t.$.clientY;
                e.setTimeout(function () {
                    this.open(u, null, v, w);
                }, c ? 200 : 0, this);
            }, this);
            if (b.opera)m.on('keypress', function (s) {
                var t = s.data;
                if (t.$.keyCode === 0)t.preventDefault();
            });
            if (b.webkit) {
                var p, q = function (s) {
                    p = b.mac ? s.data.$.metaKey : s.data.$.ctrlKey;
                }, r = function () {
                    p = 0;
                };
                m.on('keydown', q);
                m.on('keyup', r);
                m.on('contextmenu', r);
            }
        }, open: function (m, n, o, p) {
            this.editor.focus();
            m = m || a.document.getDocumentElement();
            this.show(m, n, o, p);
        }}});
    }, beforeInit: function (m) {
        m.contextMenu = new j.contextMenu(m);
        m.addCommand('contextMenu', {exec: function () {
            m.contextMenu.open(m.document.getBody());
        }});
    }});
    (function () {
        function m(o) {
            var p = this.att, q = o && o.hasAttribute(p) && o.getAttribute(p) || '';
            if (q !== undefined)this.setValue(q);
        };
        function n() {
            var o;
            for (var p = 0; p < arguments.length; p++) {
                if (arguments[p] instanceof h) {
                    o = arguments[p];
                    break;
                }
            }
            if (o) {
                var q = this.att, r = this.getValue();
                if (r)o.setAttribute(q, r); else o.removeAttribute(q, r);
            }
        };
        j.add('dialogadvtab', {createAdvancedTab: function (o, p) {
            if (!p)p = {id: 1, dir: 1, classes: 1, styles: 1};
            var q = o.lang.common, r = {id: 'advanced', label: q.advancedTab, title: q.advancedTab, elements: [
                {type: 'vbox', padding: 1, children: []}
            ]}, s = [];
            if (p.id || p.dir) {
                if (p.id)s.push({id: 'advId', att: 'id', type: 'text', label: q.id, setup: m, commit: n});
                if (p.dir)s.push({id: 'advLangDir', att: 'dir', type: 'select', label: q.langDir, 'default': '', style: 'width:100%', items: [
                    [q.notSet, ''],
                    [q.langDirLTR, 'ltr'],
                    [q.langDirRTL, 'rtl']
                ], setup: m, commit: n});
                r.elements[0].children.push({type: 'hbox', widths: ['50%', '50%'], children: [].concat(s)});
            }
            if (p.styles || p.classes) {
                s = [];
                if (p.styles)s.push({id: 'advStyles', att: 'style', type: 'text', label: q.styles, 'default': '', validate: a.dialog.validate.inlineStyle(q.invalidInlineStyle), onChange: function () {
                }, getStyle: function (t, u) {
                    var v = this.getValue().match(new RegExp(t + '\\s*:\\s*([^;]*)', 'i'));
                    return v ? v[1] : u;
                }, updateStyle: function (t, u) {
                    var v = this.getValue();
                    if (v)v = v.replace(new RegExp('\\s*' + t + 's*:[^;]*(?:$|;s*)', 'i'), '').replace(/^[;\s]+/, '').replace(/\s+$/, '');
                    if (u) {
                        v && !/;\s*$/.test(v) && (v += '; ');
                        v += t + ': ' + u;
                    }
                    this.setValue(v, 1);
                }, setup: m, commit: n});
                if (p.classes)s.push({type: 'hbox', widths: ['45%', '55%'], children: [
                    {id: 'advCSSClasses', att: 'class', type: 'text', label: q.cssClasses, 'default': '', setup: m, commit: n}
                ]});
                r.elements[0].children.push({type: 'hbox', widths: ['50%', '50%'], children: [].concat(s)});
            }
            return r;
        }});
    })();
    (function () {
        j.add('div', {requires: ['editingblock', 'domiterator', 'styles'], init: function (m) {
            var n = m.lang.div;
            m.addCommand('creatediv', new a.dialogCommand('creatediv'));
            m.addCommand('editdiv', new a.dialogCommand('editdiv'));
            m.addCommand('removediv', {exec: function (o) {
                var p = o.getSelection(), q = p && p.getRanges(), r, s = p.createBookmarks(), t, u = [];

                function v(x) {
                    var y = new d.elementPath(x), z = y.blockLimit, A = z.is('div') && z;
                    if (A && !A.data('cke-div-added')) {
                        u.push(A);
                        A.data('cke-div-added');
                    }
                };
                for (var w = 0; w < q.length; w++) {
                    r = q[w];
                    if (r.collapsed)v(p.getStartElement()); else {
                        t = new d.walker(r);
                        t.evaluator = v;
                        t.lastForward();
                    }
                }
                for (w = 0; w < u.length; w++)u[w].remove(true);
                p.selectBookmarks(s);
            }});
            m.ui.addButton('CreateDiv', {label: n.toolbar, command: 'creatediv'});
            if (m.addMenuItems) {
                m.addMenuItems({editdiv: {label: n.edit, command: 'editdiv', group: 'div', order: 1}, removediv: {label: n.remove, command: 'removediv', group: 'div', order: 5}});
                if (m.contextMenu)m.contextMenu.addListener(function (o, p) {
                    if (!o || o.isReadOnly())return null;
                    var q = new d.elementPath(o), r = q.blockLimit;
                    if (r && r.getAscendant('div', true))return{editdiv: 2, removediv: 2};
                    return null;
                });
            }
            a.dialog.add('creatediv', this.path + 'dialogs/div.js');
            a.dialog.add('editdiv', this.path + 'dialogs/div.js');
        }});
    })();
    (function () {
        var m = {toolbarFocus: {editorFocus: false, readOnly: 1, exec: function (o) {
            var p = o._.elementsPath.idBase, q = a.document.getById(p + '0');
            q && q.focus(c || b.air);
        }}}, n = '<span class="cke_empty">&nbsp;</span>';
        j.add('elementspath', {requires: ['selection'], init: function (o) {
            var p = 'cke_path_' + o.name, q, r = function () {
                if (!q)q = a.document.getById(p);
                return q;
            }, s = 'cke_elementspath_' + e.getNextNumber() + '_';
            o._.elementsPath = {idBase: s, filters: []};
            o.on('themeSpace', function (x) {
                if (x.data.space == 'bottom')x.data.html += '<span id="' + p + '_label" class="cke_voice_label">' + o.lang.elementsPath.eleLabel + '</span>' + '<div id="' + p + '" class="cke_path" role="group" aria-labelledby="' + p + '_label">' + n + '</div>';
            });
            function t(x) {
                o.focus();
                var y = o._.elementsPath.list[x];
                if (y.is('body')) {
                    var z = new d.range(o.document);
                    z.selectNodeContents(y);
                    z.select();
                } else o.getSelection().selectElement(y);
            };
            var u = e.addFunction(t), v = e.addFunction(function (x, y) {
                var z = o._.elementsPath.idBase, A;
                y = new d.event(y);
                var B = o.lang.dir == 'rtl';
                switch (y.getKeystroke()) {
                    case B ? 39 : 37:
                    case 9:
                        A = a.document.getById(z + (x + 1));
                        if (!A)A = a.document.getById(z + '0');
                        A.focus();
                        return false;
                    case B ? 37 : 39:
                    case 2228224 + 9:
                        A = a.document.getById(z + (x - 1));
                        if (!A)A = a.document.getById(z + (o._.elementsPath.list.length - 1));
                        A.focus();
                        return false;
                    case 27:
                        o.focus();
                        return false;
                    case 13:
                    case 32:
                        t(x);
                        return false;
                }
                return true;
            });
            o.on('selectionChange', function (x) {
                var y = b, z = x.data.selection, A = z.getStartElement(), B = [], C = x.editor, D = C._.elementsPath.list = [], E = C._.elementsPath.filters;
                while (A) {
                    var F = 0, G;
                    if (A.data('cke-display-name'))G = A.data('cke-display-name'); else if (A.data('cke-real-element-type'))G = A.data('cke-real-element-type'); else G = A.getName();
                    for (var H = 0; H < E.length; H++) {
                        var I = E[H](A, G);
                        if (I === false) {
                            F = 1;
                            break;
                        }
                        G = I || G;
                    }
                    if (!F) {
                        var J = D.push(A) - 1, K = '';
                        if (y.opera || y.gecko && y.mac)K += ' onkeypress="return false;"';
                        if (y.gecko)K += ' onblur="this.style.cssText = this.style.cssText;"';
                        var L = C.lang.elementsPath.eleTitle.replace(/%1/, G);
                        B.unshift('<a id="', s, J, '" href="javascript:void(\'', G, '\')" tabindex="-1" title="', L, '"' + (b.gecko && b.version < 10900 ? ' onfocus="event.preventBubble();"' : '') + ' hidefocus="true" ' + ' onkeydown="return CKEDITOR.tools.callFunction(', v, ',', J, ', event );"' + K, ' onclick="CKEDITOR.tools.callFunction(' + u, ',', J, '); return false;"', ' role="button" aria-labelledby="' + s + J + '_label">', G, '<span id="', s, J, '_label" class="cke_label">' + L + '</span>', '</a>');
                    }
                    if (G == 'body')break;
                    A = A.getParent();
                }
                var M = r();
                M.setHtml(B.join('') + n);
                C.fire('elementsPathUpdate', {space: M});
            });
            function w() {
                q && q.setHtml(n);
                delete o._.elementsPath.list;
            };
            o.on('readOnly', w);
            o.on('contentDomUnload', w);
            o.addCommand('elementsPathFocus', m.toolbarFocus);
        }});
    })();
    (function () {
        j.add('enterkey', {requires: ['keystrokes', 'indent'], init: function (t) {
            t.addCommand('enter', {modes: {wysiwyg: 1}, editorFocus: false, exec: function (v) {
                r(v);
            }});
            t.addCommand('shiftEnter', {modes: {wysiwyg: 1}, editorFocus: false, exec: function (v) {
                q(v);
            }});
            var u = t.keystrokeHandler.keystrokes;
            u[13] = 'enter';
            u[2228224 + 13] = 'shiftEnter';
        }});
        j.enterkey = {enterBlock: function (t, u, v, w) {
            v = v || s(t);
            if (!v)return;
            var x = v.document, y = v.checkStartOfBlock(), z = v.checkEndOfBlock(), A = new d.elementPath(v.startContainer), B = A.block;
            if (y && z) {
                if (B && (B.is('li') || B.getParent().is('li'))) {
                    t.execCommand('outdent');
                    return;
                }
                if (B && B.getParent().is('blockquote')) {
                    B.breakParent(B.getParent());
                    if (!B.getPrevious().getFirst(d.walker.invisible(1)))B.getPrevious().remove();
                    if (!B.getNext().getFirst(d.walker.invisible(1)))B.getNext().remove();
                    v.moveToElementEditStart(B);
                    v.select();
                    return;
                }
            } else if (B && B.is('pre')) {
                if (!z) {
                    n(t, u, v, w);
                    return;
                }
            } else if (B && f.$captionBlock[B.getName()]) {
                n(t, u, v, w);
                return;
            }
            var C = u == 3 ? 'div' : 'p', D = v.splitBlock(C);
            if (!D)return;
            var E = D.previousBlock, F = D.nextBlock, G = D.wasStartOfBlock, H = D.wasEndOfBlock, I;
            if (F) {
                I = F.getParent();
                if (I.is('li')) {
                    F.breakParent(I);
                    F.move(F.getNext(), 1);
                }
            } else if (E && (I = E.getParent()) && I.is('li')) {
                E.breakParent(I);
                I = E.getNext();
                v.moveToElementEditStart(I);
                E.move(E.getPrevious());
            }
            if (!G && !H) {
                if (F.is('li') && (I = F.getFirst(d.walker.invisible(true))) && I.is && I.is('ul', 'ol'))(c ? x.createText('\xa0') : x.createElement('br')).insertBefore(I);
                if (F)v.moveToElementEditStart(F);
            } else {
                var J, K;
                if (E) {
                    if (E.is('li') || !(p.test(E.getName()) || E.is('pre')))J = E.clone();
                } else if (F)J = F.clone();
                if (!J) {
                    if (I && I.is('li'))J = I; else {
                        J = x.createElement(C);
                        if (E && (K = E.getDirection()))J.setAttribute('dir', K);
                    }
                } else if (w && !J.is('li'))J.renameNode(C);
                var L = D.elementPath;
                if (L)for (var M = 0, N = L.elements.length; M < N; M++) {
                    var O = L.elements[M];
                    if (O.equals(L.block) || O.equals(L.blockLimit))break;
                    if (f.$removeEmpty[O.getName()]) {
                        O = O.clone();
                        J.moveChildren(O);
                        J.append(O);
                    }
                }
                if (!c)J.appendBogus();
                if (!J.getParent())v.insertNode(J);
                J.is('li') && J.removeAttribute('value');
                if (c && G && (!H || !E.getChildCount())) {
                    v.moveToElementEditStart(H ? E : J);
                    v.select();
                }
                v.moveToElementEditStart(G && !H ? F : J);
            }
            if (!c)if (F) {
                var P = x.createElement('span');
                P.setHtml('&nbsp;');
                v.insertNode(P);
                P.scrollIntoView();
                v.deleteContents();
            } else J.scrollIntoView();
            v.select();
        }, enterBr: function (t, u, v, w) {
            v = v || s(t);
            if (!v)return;
            var x = v.document, y = u == 3 ? 'div' : 'p', z = v.checkEndOfBlock(), A = new d.elementPath(t.getSelection().getStartElement()), B = A.block, C = B && A.block.getName(), D = false;
            if (!w && C == 'li') {
                o(t, u, v, w);
                return;
            }
            if (!w && z && p.test(C)) {
                var E, F;
                if (F = B.getDirection()) {
                    E = x.createElement('div');
                    E.setAttribute('dir', F);
                    E.insertAfter(B);
                    v.setStart(E, 0);
                } else {
                    x.createElement('br').insertAfter(B);
                    if (b.gecko)x.createText('').insertAfter(B);
                    v.setStartAt(B.getNext(), c ? 3 : 1);
                }
            } else {
                var G;
                D = C == 'pre';
                if (D && !b.gecko)G = x.createText(c ? '\r' : '\n'); else G = x.createElement('br');
                v.deleteContents();
                v.insertNode(G);
                if (c)v.setStartAt(G, 4); else {
                    x.createText('\ufeff').insertAfter(G);
                    if (z)G.getParent().appendBogus();
                    G.getNext().$.nodeValue = '';
                    v.setStartAt(G.getNext(), 1);
                    var H = null;
                    if (!b.gecko) {
                        H = x.createElement('span');
                        H.setHtml('&nbsp;');
                    } else H = x.createElement('br');
                    H.insertBefore(G.getNext());
                    H.scrollIntoView();
                    H.remove();
                }
            }
            v.collapse(true);
            v.select(D);
        }};
        var m = j.enterkey, n = m.enterBr, o = m.enterBlock, p = /^h[1-6]$/;

        function q(t) {
            if (t.mode != 'wysiwyg')return false;
            return r(t, t.config.shiftEnterMode, 1);
        };
        function r(t, u, v) {
            v = t.config.forceEnterMode || v;
            if (t.mode != 'wysiwyg')return false;
            if (!u)u = t.config.enterMode;
            setTimeout(function () {
                t.fire('saveSnapshot');
                if (u == 2)n(t, u, null, v); else o(t, u, null, v);
                t.fire('saveSnapshot');
            }, 0);
            return true;
        };
        function s(t) {
            var u = t.getSelection().getRanges(true);
            for (var v = u.length - 1; v > 0; v--)u[v].deleteContents();
            return u[0];
        };
    })();
    (function () {
        var m = 'nbsp,gt,lt,amp', n = 'quot,iexcl,cent,pound,curren,yen,brvbar,sect,uml,copy,ordf,laquo,not,shy,reg,macr,deg,plusmn,sup2,sup3,acute,micro,para,middot,cedil,sup1,ordm,raquo,frac14,frac12,frac34,iquest,times,divide,fnof,bull,hellip,prime,Prime,oline,frasl,weierp,image,real,trade,alefsym,larr,uarr,rarr,darr,harr,crarr,lArr,uArr,rArr,dArr,hArr,forall,part,exist,empty,nabla,isin,notin,ni,prod,sum,minus,lowast,radic,prop,infin,ang,and,or,cap,cup,int,there4,sim,cong,asymp,ne,equiv,le,ge,sub,sup,nsub,sube,supe,oplus,otimes,perp,sdot,lceil,rceil,lfloor,rfloor,lang,rang,loz,spades,clubs,hearts,diams,circ,tilde,ensp,emsp,thinsp,zwnj,zwj,lrm,rlm,ndash,mdash,lsquo,rsquo,sbquo,ldquo,rdquo,bdquo,dagger,Dagger,permil,lsaquo,rsaquo,euro', o = 'Agrave,Aacute,Acirc,Atilde,Auml,Aring,AElig,Ccedil,Egrave,Eacute,Ecirc,Euml,Igrave,Iacute,Icirc,Iuml,ETH,Ntilde,Ograve,Oacute,Ocirc,Otilde,Ouml,Oslash,Ugrave,Uacute,Ucirc,Uuml,Yacute,THORN,szlig,agrave,aacute,acirc,atilde,auml,aring,aelig,ccedil,egrave,eacute,ecirc,euml,igrave,iacute,icirc,iuml,eth,ntilde,ograve,oacute,ocirc,otilde,ouml,oslash,ugrave,uacute,ucirc,uuml,yacute,thorn,yuml,OElig,oelig,Scaron,scaron,Yuml', p = 'Alpha,Beta,Gamma,Delta,Epsilon,Zeta,Eta,Theta,Iota,Kappa,Lambda,Mu,Nu,Xi,Omicron,Pi,Rho,Sigma,Tau,Upsilon,Phi,Chi,Psi,Omega,alpha,beta,gamma,delta,epsilon,zeta,eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigmaf,sigma,tau,upsilon,phi,chi,psi,omega,thetasym,upsih,piv';

        function q(r, s) {
            var t = {}, u = [], v = {nbsp: '\xa0', shy: '­', gt: '>', lt: '<', amp: '&'};
            r = r.replace(/\b(nbsp|shy|gt|lt|amp)(?:,|$)/g, function (A, B) {
                var C = s ? '&' + B + ';' : v[B], D = s ? v[B] : '&' + B + ';';
                t[C] = D;
                u.push(C);
                return '';
            });
            if (!s && r) {
                r = r.split(',');
                var w = document.createElement('div'), x;
                w.innerHTML = '&' + r.join(';&') + ';';
                x = w.innerHTML;
                w = null;
                for (var y = 0; y < x.length; y++) {
                    var z = x.charAt(y);
                    t[z] = '&' + r[y] + ';';
                    u.push(z);
                }
            }
            t.regex = u.join(s ? '|' : '');
            return t;
        };
        j.add('entities', {afterInit: function (r) {
            var s = r.config, t = r.dataProcessor, u = t && t.htmlFilter;
            if (u) {
                var v = '';
                if (s.basicEntities !== false)v += m;
                if (s.entities) {
                    v += ',' + n;
                    if (s.entities_latin)v += ',' + o;
                    if (s.entities_greek)v += ',' + p;
                    if (s.entities_additional)v += ',' + s.entities_additional;
                }
                var w = q(v), x = w.regex ? '[' + w.regex + ']' : 'a^';
                delete w.regex;
                if (s.entities && s.entities_processNumerical)x = '[^ -~]|' + x;
                x = new RegExp(x, 'g');
                function y(C) {
                    return s.entities_processNumerical == 'force' || !w[C] ? '&#' + C.charCodeAt(0) + ';' : w[C];
                };
                var z = q([m, 'shy'].join(','), true), A = new RegExp(z.regex, 'g');

                function B(C) {
                    return z[C];
                };
                u.addRules({text: function (C) {
                    return C.replace(A, B).replace(x, y);
                }});
            }
        }});
    })();
    i.basicEntities = true;
    i.entities = true;
    i.entities_latin = true;
    i.entities_greek = true;
    i.entities_additional = '#39';
    (function () {
        function m(v, w) {
            var x = [];
            if (!w)return v; else for (var y in w)x.push(y + '=' + encodeURIComponent(w[y]));
            return v + (v.indexOf('?') != -1 ? '&' : '?') + x.join('&');
        };
        function n(v) {
            v += '';
            var w = v.charAt(0).toUpperCase();
            return w + v.substr(1);
        };
        function o(v) {
            var C = this;
            var w = C.getDialog(), x = w.getParentEditor();
            x._.filebrowserSe = C;
            var y = x.config['filebrowser' + n(w.getName()) + 'WindowWidth'] || x.config.filebrowserWindowWidth || '80%', z = x.config['filebrowser' + n(w.getName()) + 'WindowHeight'] || x.config.filebrowserWindowHeight || '70%', A = C.filebrowser.params || {};
            A.CKEditor = x.name;
            A.CKEditorFuncNum = x._.filebrowserFn;
            if (!A.langCode)A.langCode = x.langCode;
            var B = m(C.filebrowser.url, A);
            x.popup(B, y, z, x.config.filebrowserWindowFeatures || x.config.fileBrowserWindowFeatures);
        };
        function p(v) {
            var y = this;
            var w = y.getDialog(), x = w.getParentEditor();
            x._.filebrowserSe = y;
            if (!w.getContentElement(y['for'][0], y['for'][1]).getInputElement().$.value)return false;
            if (!w.getContentElement(y['for'][0], y['for'][1]).getAction())return false;
            return true;
        };
        function q(v, w, x) {
            var y = x.params || {};
            y.CKEditor = v.name;
            y.CKEditorFuncNum = v._.filebrowserFn;
            if (!y.langCode)y.langCode = v.langCode;
            w.action = m(x.url, y);
            w.filebrowser = x;
        };
        function r(v, w, x, y) {
            var z, A;
            for (var B in y) {
                z = y[B];
                if (z.type == 'hbox' || z.type == 'vbox')r(v, w, x, z.children);
                if (!z.filebrowser)continue;
                if (typeof z.filebrowser == 'string') {
                    var C = {action: z.type == 'fileButton' ? 'QuickUpload' : 'Browse', target: z.filebrowser};
                    z.filebrowser = C;
                }
                if (z.filebrowser.action == 'Browse') {
                    var D = z.filebrowser.url;
                    if (D === undefined) {
                        D = v.config['filebrowser' + n(w) + 'BrowseUrl'];
                        if (D === undefined)D = v.config.filebrowserBrowseUrl;
                    }
                    if (D) {
                        z.onClick = o;
                        z.filebrowser.url = D;
                        z.hidden = false;
                    }
                } else if (z.filebrowser.action == 'QuickUpload' && z['for']) {
                    D = z.filebrowser.url;
                    if (D === undefined) {
                        D = v.config['filebrowser' + n(w) + 'UploadUrl'];
                        if (D === undefined)D = v.config.filebrowserUploadUrl;
                    }
                    if (D) {
                        var E = z.onClick;
                        z.onClick = function (F) {
                            var G = F.sender;
                            if (E && E.call(G, F) === false)return false;
                            return p.call(G, F);
                        };
                        z.filebrowser.url = D;
                        z.hidden = false;
                        q(v, x.getContents(z['for'][0]).get(z['for'][1]), z.filebrowser);
                    }
                }
            }
        };
        function s(v, w) {
            var x = w.getDialog(), y = w.filebrowser.target || null;
            v = v.replace(/#/g, '%23');
            if (y) {
                var z = y.split(':'), A = x.getContentElement(z[0], z[1]);
                if (A) {
                    A.setValue(v);
                    x.selectPage(z[0]);
                }
            }
        };
        function t(v, w, x) {
            if (x.indexOf(';') !== -1) {
                var y = x.split(';');
                for (var z = 0; z < y.length; z++) {
                    if (t(v, w, y[z]))return true;
                }
                return false;
            }
            var A = v.getContents(w).get(x).filebrowser;
            return A && A.url;
        };
        function u(v, w) {
            var A = this;
            var x = A._.filebrowserSe.getDialog(), y = A._.filebrowserSe['for'], z = A._.filebrowserSe.filebrowser.onSelect;
            if (y)x.getContentElement(y[0], y[1]).reset();
            if (typeof w == 'function' && w.call(A._.filebrowserSe) === false)return;
            if (z && z.call(A._.filebrowserSe, v, w) === false)return;
            if (typeof w == 'string' && w)alert(w);
            if (v)s(v, A._.filebrowserSe);
        };
        j.add('filebrowser', {init: function (v, w) {
            v._.filebrowserFn = e.addFunction(u, v);
            v.on('destroy', function () {
                e.removeFunction(this._.filebrowserFn);
            });
        }});
        a.on('dialogDefinition', function (v) {
            var w = v.data.definition, x;
            for (var y in w.contents) {
                if (x = w.contents[y]) {
                    r(v.editor, v.data.name, w, x.elements);
                    if (x.hidden && x.filebrowser)x.hidden = !t(w, x.id, x.filebrowser);
                }
            }
        });
    })();
    j.add('find', {init: function (m) {
        var n = j.find;
        m.ui.addButton('Find', {label: m.lang.findAndReplace.find, command: 'find'});
        var o = m.addCommand('find', new a.dialogCommand('find'));
        o.canUndo = false;
        o.readOnly = 1;
        m.ui.addButton('Replace', {label: m.lang.findAndReplace.replace, command: 'replace'});
        var p = m.addCommand('replace', new a.dialogCommand('replace'));
        p.canUndo = false;
        a.dialog.add('find', this.path + 'dialogs/find.js');
        a.dialog.add('replace', this.path + 'dialogs/find.js');
    }, requires: ['styles']});
    i.find_highlight = {element: 'span', styles: {'background-color': '#004', color: '#fff'}};
    (function () {
        var m = /\.swf(?:$|\?)/i;

        function n(p) {
            var q = p.attributes;
            return q.type == 'application/x-shockwave-flash' || m.test(q.src || '');
        };
        function o(p, q) {
            return p.createFakeParserElement(q, 'cke_flash', 'flash', true);
        };
        j.add('flash', {init: function (p) {
            p.addCommand('flash', new a.dialogCommand('flash'));
            p.ui.addButton('Flash', {label: p.lang.common.flash, command: 'flash'});
            a.dialog.add('flash', this.path + 'dialogs/flash.js');
            p.addCss('img.cke_flash{background-image: url(' + a.getUrl(this.path + 'images/placeholder.png') + ');' + 'background-position: center center;' + 'background-repeat: no-repeat;' + 'border: 1px solid #a9a9a9;' + 'width: 80px;' + 'height: 80px;' + '}');
            if (p.addMenuItems)p.addMenuItems({flash: {label: p.lang.flash.properties, command: 'flash', group: 'flash'}});
            p.on('doubleclick', function (q) {
                var r = q.data.element;
                if (r.is('img') && r.data('cke-real-element-type') == 'flash')q.data.dialog = 'flash';
            });
            if (p.contextMenu)p.contextMenu.addListener(function (q, r) {
                if (q && q.is('img') && !q.isReadOnly() && q.data('cke-real-element-type') == 'flash')return{flash: 2};
            });
        }, afterInit: function (p) {
            var q = p.dataProcessor, r = q && q.dataFilter;
            if (r)r.addRules({elements: {'cke:object': function (s) {
                var t = s.attributes, u = t.classid && String(t.classid).toLowerCase();
                if (!u && !n(s)) {
                    for (var v = 0; v < s.children.length; v++) {
                        if (s.children[v].name == 'cke:embed') {
                            if (!n(s.children[v]))return null;
                            return o(p, s);
                        }
                    }
                    return null;
                }
                return o(p, s);
            }, 'cke:embed': function (s) {
                if (!n(s))return null;
                return o(p, s);
            }}}, 5);
        }, requires: ['fakeobjects']});
    })();
    e.extend(i, {flashEmbedTagOnly: false, flashAddEmbedTag: true, flashConvertOnEdit: false});
    (function () {
        function m(n, o, p, q, r, s, t) {
            var u = n.config, v = r.split(';'), w = [], x = {};
            for (var y = 0; y < v.length; y++) {
                var z = v[y];
                if (z) {
                    z = z.split('/');
                    var A = {}, B = v[y] = z[0];
                    A[p] = w[y] = z[1] || B;
                    x[B] = new a.style(t, A);
                    x[B]._.definition.name = B;
                } else v.splice(y--, 1);
            }
            n.ui.addRichCombo(o, {label: q.label, title: q.panelTitle, className: 'cke_' + (p == 'size' ? 'fontSize' : 'font'), panel: {css: n.skin.editor.css.concat(u.contentsCss), multiSelect: false, attributes: {'aria-label': q.panelTitle}}, init: function () {
                this.startGroup(q.panelTitle);
                for (var C = 0; C < v.length; C++) {
                    var D = v[C];
                    this.add(D, x[D].buildPreview(), D);
                }
            }, onClick: function (C) {
                n.focus();
                n.fire('saveSnapshot');
                var D = x[C];
                if (this.getValue() == C)D.remove(n.document); else D.apply(n.document);
                n.fire('saveSnapshot');
            }, onRender: function () {
                n.on('selectionChange', function (C) {
                    var D = this.getValue(), E = C.data.path, F = E.elements;
                    for (var G = 0, H; G < F.length; G++) {
                        H = F[G];
                        for (var I in x) {
                            if (x[I].checkElementRemovable(H, true)) {
                                if (I != D)this.setValue(I);
                                return;
                            }
                        }
                    }
                    this.setValue('', s);
                }, this);
            }});
        };
        j.add('font', {requires: ['richcombo', 'styles'], init: function (n) {
            var o = n.config;
            m(n, 'Font', 'family', n.lang.font, o.font_names, o.font_defaultLabel, o.font_style);
            m(n, 'FontSize', 'size', n.lang.fontSize, o.fontSize_sizes, o.fontSize_defaultLabel, o.fontSize_style);
        }});
    })();
    i.font_names = 'Arial/Arial, Helvetica, sans-serif;Comic Sans MS/Comic Sans MS, cursive;Courier New/Courier New, Courier, monospace;Georgia/Georgia, serif;Lucida Sans Unicode/Lucida Sans Unicode, Lucida Grande, sans-serif;Tahoma/Tahoma, Geneva, sans-serif;Times New Roman/Times New Roman, Times, serif;Trebuchet MS/Trebuchet MS, Helvetica, sans-serif;Verdana/Verdana, Geneva, sans-serif';
    i.font_defaultLabel = '';
    i.font_style = {element: 'span', styles: {'font-family': '#(family)'}, overrides: [
        {element: 'font', attributes: {face: null}}
    ]};
    i.fontSize_sizes = '8/8px;9/9px;10/10px;11/11px;12/12px;14/14px;16/16px;18/18px;20/20px;22/22px;24/24px;26/26px;28/28px;36/36px;48/48px;72/72px';
    i.fontSize_defaultLabel = '';
    i.fontSize_style = {element: 'span', styles: {'font-size': '#(size)'}, overrides: [
        {element: 'font', attributes: {size: null}}
    ]};
    j.add('format', {requires: ['richcombo', 'styles'], init: function (m) {
        var n = m.config, o = m.lang.format, p = n.format_tags.split(';'), q = {};
        for (var r = 0; r < p.length; r++) {
            var s = p[r];
            q[s] = new a.style(n['format_' + s]);
            q[s]._.enterMode = m.config.enterMode;
        }
        m.ui.addRichCombo('Format', {label: o.label, title: o.panelTitle, className: 'cke_format', panel: {css: m.skin.editor.css.concat(n.contentsCss), multiSelect: false, attributes: {'aria-label': o.panelTitle}}, init: function () {
            this.startGroup(o.panelTitle);
            for (var t in q) {
                var u = o['tag_' + t];
                this.add(t, q[t].buildPreview(u), u);
            }
        }, onClick: function (t) {
            m.focus();
            m.fire('saveSnapshot');
            var u = q[t], v = new d.elementPath(m.getSelection().getStartElement());
            u[u.checkActive(v) ? 'remove' : 'apply'](m.document);
            setTimeout(function () {
                m.fire('saveSnapshot');
            }, 0);
        }, onRender: function () {
            m.on('selectionChange', function (t) {
                var u = this.getValue(), v = t.data.path;
                for (var w in q) {
                    if (q[w].checkActive(v)) {
                        if (w != u)this.setValue(w, m.lang.format['tag_' + w]);
                        return;
                    }
                }
                this.setValue('');
            }, this);
        }});
    }});
    i.format_tags = 'p;h1;h2;h3;h4;h5;h6;pre;address;div';
    i.format_p = {element: 'p'};
    i.format_div = {element: 'div'};
    i.format_pre = {element: 'pre'};
    i.format_address = {element: 'address'};
    i.format_h1 = {element: 'h1'};
    i.format_h2 = {element: 'h2'};
    i.format_h3 = {element: 'h3'};
    i.format_h4 = {element: 'h4'};
    i.format_h5 = {element: 'h5'};
    i.format_h6 = {element: 'h6'};
    j.add('forms', {init: function (m) {
        var n = m.lang;
        m.addCss('form{border: 1px dotted #FF0000;padding: 2px;}\n');
        m.addCss('img.cke_hidden{background-image: url(' + a.getUrl(this.path + 'images/hiddenfield.gif') + ');' + 'background-position: center center;' + 'background-repeat: no-repeat;' + 'border: 1px solid #a9a9a9;' + 'width: 16px !important;' + 'height: 16px !important;' + '}');
        var o = function (q, r, s) {
            m.addCommand(r, new a.dialogCommand(r));
            m.ui.addButton(q, {label: n.common[q.charAt(0).toLowerCase() + q.slice(1)], command: r});
            a.dialog.add(r, s);
        }, p = this.path + 'dialogs/';
        o('Form', 'form', p + 'form.js');
        o('Checkbox', 'checkbox', p + 'checkbox.js');
        o('Radio', 'radio', p + 'radio.js');
        o('TextField', 'textfield', p + 'textfield.js');
        o('Textarea', 'textarea', p + 'textarea.js');
        o('Select', 'select', p + 'select.js');
        o('Button', 'button', p + 'button.js');
        o('ImageButton', 'imagebutton', j.getPath('image') + 'dialogs/image.js');
        o('HiddenField', 'hiddenfield', p + 'hiddenfield.js');
        if (m.addMenuItems)m.addMenuItems({form: {label: n.form.menu, command: 'form', group: 'form'}, checkbox: {label: n.checkboxAndRadio.checkboxTitle, command: 'checkbox', group: 'checkbox'}, radio: {label: n.checkboxAndRadio.radioTitle, command: 'radio', group: 'radio'}, textfield: {label: n.textfield.title, command: 'textfield', group: 'textfield'}, hiddenfield: {label: n.hidden.title, command: 'hiddenfield', group: 'hiddenfield'}, imagebutton: {label: n.image.titleButton, command: 'imagebutton', group: 'imagebutton'}, button: {label: n.button.title, command: 'button', group: 'button'}, select: {label: n.select.title, command: 'select', group: 'select'}, textarea: {label: n.textarea.title, command: 'textarea', group: 'textarea'}});
        if (m.contextMenu) {
            m.contextMenu.addListener(function (q) {
                if (q && q.hasAscendant('form', true) && !q.isReadOnly())return{form: 2};
            });
            m.contextMenu.addListener(function (q) {
                if (q && !q.isReadOnly()) {
                    var r = q.getName();
                    if (r == 'select')return{select: 2};
                    if (r == 'textarea')return{textarea: 2};
                    if (r == 'input')switch (q.getAttribute('type')) {
                        case 'button':
                        case 'submit':
                        case 'reset':
                            return{button: 2};
                        case 'checkbox':
                            return{checkbox: 2};
                        case 'radio':
                            return{radio: 2};
                        case 'image':
                            return{imagebutton: 2};
                        default:
                            return{textfield: 2};
                    }
                    if (r == 'img' && q.data('cke-real-element-type') == 'hiddenfield')return{hiddenfield: 2};
                }
            });
        }
        m.on('doubleclick', function (q) {
            var r = q.data.element;
            if (r.is('form'))q.data.dialog = 'form'; else if (r.is('select'))q.data.dialog = 'select'; else if (r.is('textarea'))q.data.dialog = 'textarea'; else if (r.is('img') && r.data('cke-real-element-type') == 'hiddenfield')q.data.dialog = 'hiddenfield'; else if (r.is('input'))switch (r.getAttribute('type')) {
                case 'button':
                case 'submit':
                case 'reset':
                    q.data.dialog = 'button';
                    break;
                case 'checkbox':
                    q.data.dialog = 'checkbox';
                    break;
                case 'radio':
                    q.data.dialog = 'radio';
                    break;
                case 'image':
                    q.data.dialog = 'imagebutton';
                    break;
                default:
                    q.data.dialog = 'textfield';
                    break;
            }
        });
    }, afterInit: function (m) {
        var n = m.dataProcessor, o = n && n.htmlFilter, p = n && n.dataFilter;
        if (c)o && o.addRules({elements: {input: function (q) {
            var r = q.attributes, s = r.type;
            if (!s)r.type = 'text';
            if (s == 'checkbox' || s == 'radio')r.value == 'on' && delete r.value;
        }}});
        if (p)p.addRules({elements: {input: function (q) {
            if (q.attributes.type == 'hidden')return m.createFakeParserElement(q, 'cke_hidden', 'hiddenfield');
        }}});
    }, requires: ['image', 'fakeobjects']});
    if (c)h.prototype.hasAttribute = e.override(h.prototype.hasAttribute, function (m) {
        return function (n) {
            var q = this;
            var o = q.$.attributes.getNamedItem(n);
            if (q.getName() == 'input')switch (n) {
                case 'class':
                    return q.$.className.length > 0;
                case 'checked':
                    return!!q.$.checked;
                case 'value':
                    var p = q.getAttribute('type');
                    return p == 'checkbox' || p == 'radio' ? q.$.value != 'on' : q.$.value;
            }
            return m.apply(q, arguments);
        };
    });
    (function () {
        var m = {canUndo: false, exec: function (o) {
            var p = o.document.createElement('hr'), q = new d.range(o.document);
            o.insertElement(p);
            q.moveToPosition(p, 4);
            var r = p.getNext();
            if (!r || r.type == 1 && !r.isEditable())q.fixBlock(true, o.config.enterMode == 3 ? 'div' : 'p');
            q.select();
        }}, n = 'horizontalrule';
        j.add(n, {init: function (o) {
            o.addCommand(n, m);
            o.ui.addButton('HorizontalRule', {label: o.lang.horizontalrule, command: n});
        }});
    })();
    (function () {
        var m = /^[\t\r\n ]*(?:&nbsp;|\xa0)$/, n = '{cke_protected}';

        function o(T) {
            var U = T.children.length, V = T.children[U - 1];
            while (V && V.type == 3 && !e.trim(V.value))V = T.children[--U];
            return V;
        };
        function p(T, U) {
            var V = T.children, W = o(T);
            if (W) {
                if ((U || !c) && W.type == 1 && W.name == 'br')V.pop();
                if (W.type == 3 && m.test(W.value))V.pop();
            }
        };
        function q(T, U, V) {
            if (!U && (!V || typeof V == 'function' && V(T) === false))return false;
            if (U && c && (document.documentMode > 7 || T.name in f.tr || T.name in f.$listItem))return false;
            var W = o(T);
            return!W || W && (W.type == 1 && W.name == 'br' || T.name == 'form' && W.name == 'input');
        };
        function r(T, U) {
            return function (V) {
                p(V, !T);
                if (q(V, !T, U))if (T || c)V.add(new a.htmlParser.text('\xa0')); else V.add(new a.htmlParser.element('br', {}));
            };
        };
        var s = f, t = ['caption', 'colgroup', 'col', 'thead', 'tfoot', 'tbody'], u = e.extend({}, s.$block, s.$listItem, s.$tableContent);
        for (var v in u) {
            if (!('br' in s[v]))delete u[v];
        }
        delete u.pre;
        var w = {elements: {}, attributeNames: [
            [/^on/, 'data-cke-pa-on']
        ]}, x = {elements: {}};
        for (v in u)x.elements[v] = r();
        var y = {elementNames: [
            [/^cke:/, ''],
            [/^\?xml:namespace$/, '']
        ], attributeNames: [
            [/^data-cke-(saved|pa)-/, ''],
            [/^data-cke-.*/, ''],
            ['hidefocus', '']
        ], elements: {$: function (T) {
            var U = T.attributes;
            if (U) {
                if (U['data-cke-temp'])return false;
                var V = ['name', 'href', 'src'], W;
                for (var X = 0; X < V.length; X++) {
                    W = 'data-cke-saved-' + V[X];
                    W in U && delete U[V[X]];
                }
            }
            return T;
        }, table: function (T) {
            var U = T.children;
            U.sort(function (V, W) {
                return V.type == 1 && W.type == V.type ? e.indexOf(t, V.name) > e.indexOf(t, W.name) ? 1 : -1 : 0;
            });
        }, embed: function (T) {
            var U = T.parent;
            if (U && U.name == 'object') {
                var V = U.attributes.width, W = U.attributes.height;
                V && (T.attributes.width = V);
                W && (T.attributes.height = W);
            }
        }, param: function (T) {
            T.children = [];
            T.isEmpty = true;
            return T;
        }, a: function (T) {
            if (!(T.children.length || T.attributes.name || T.attributes['data-cke-saved-name']))return false;
        }, span: function (T) {
            if (T.attributes['class'] == 'Apple-style-span')delete T.name;
        }, pre: function (T) {
            c && p(T);
        }, html: function (T) {
            delete T.attributes.contenteditable;
            delete T.attributes['class'];
        }, body: function (T) {
            delete T.attributes.spellcheck;
            delete T.attributes.contenteditable;
        }, style: function (T) {
            var U = T.children[0];
            U && U.value && (U.value = e.trim(U.value));
            if (!T.attributes.type)T.attributes.type = 'text/css';
        }, title: function (T) {
            var U = T.children[0];
            U && (U.value = T.attributes['data-cke-title'] || '');
        }}, attributes: {'class': function (T, U) {
            return e.ltrim(T.replace(/(?:^|\s+)cke_[^\s]*/g, '')) || false;
        }}};
        if (c)y.attributes.style = function (T, U) {
            return T.replace(/(^|;)([^\:]+)/g, function (V) {
                return V.toLowerCase();
            });
        };
        function z(T) {
            var U = T.attributes;
            if (U.contenteditable != 'false')U['data-cke-editable'] = U.contenteditable ? 'true' : 1;
            U.contenteditable = 'false';
        };
        function A(T) {
            var U = T.attributes;
            switch (U['data-cke-editable']) {
                case 'true':
                    U.contenteditable = 'true';
                    break;
                case '1':
                    delete U.contenteditable;
                    break;
            }
        };
        for (v in {input: 1, textarea: 1}) {
            w.elements[v] = z;
            y.elements[v] = A;
        }
        var B = /<(a|area|img|input)\b([^>]*)>/gi, C = /\b(on\w+|href|src|name)\s*=\s*(?:(?:"[^"]*")|(?:'[^']*')|(?:[^ "'>]+))/gi, D = /(?:<style(?=[ >])[^>]*>[\s\S]*<\/style>)|(?:<(:?link|meta|base)[^>]*>)/gi, E = /<cke:encoded>([^<]*)<\/cke:encoded>/gi, F = /(<\/?)((?:object|embed|param|html|body|head|title)[^>]*>)/gi, G = /(<\/?)cke:((?:html|body|head|title)[^>]*>)/gi, H = /<cke:(param|embed)([^>]*?)\/?>(?!\s*<\/cke:\1)/gi;

        function I(T) {
            return T.replace(B, function (U, V, W) {
                return '<' + V + W.replace(C, function (X, Y) {
                    if (!/^on/.test(Y) && W.indexOf('data-cke-saved-' + Y) == -1)return ' data-cke-saved-' + X + ' ' + X;
                    return X;
                }) + '>';
            });
        };
        function J(T) {
            return T.replace(D, function (U) {
                return '<cke:encoded>' + encodeURIComponent(U) + '</cke:encoded>';
            });
        };
        function K(T) {
            return T.replace(E, function (U, V) {
                return decodeURIComponent(V);
            });
        };
        function L(T) {
            return T.replace(F, '$1cke:$2');
        };
        function M(T) {
            return T.replace(G, '$1$2');
        };
        function N(T) {
            return T.replace(H, '<cke:$1$2></cke:$1>');
        };
        function O(T) {
            return T.replace(/(<pre\b[^>]*>)(\r\n|\n)/g, '$1$2$2');
        };
        function P(T) {
            return T.replace(/<!--(?!{cke_protected})[\s\S]+?-->/g, function (U) {
                return '<!--' + n + '{C}' + encodeURIComponent(U).replace(/--/g, '%2D%2D') + '-->';
            });
        };
        function Q(T) {
            return T.replace(/<!--\{cke_protected\}\{C\}([\s\S]+?)-->/g, function (U, V) {
                return decodeURIComponent(V);
            });
        };
        function R(T, U) {
            var V = U._.dataStore;
            return T.replace(/<!--\{cke_protected\}([\s\S]+?)-->/g,function (W, X) {
                return decodeURIComponent(X);
            }).replace(/\{cke_protected_(\d+)\}/g, function (W, X) {
                return V && V[X] || '';
            });
        };
        function S(T, U) {
            var V = [], W = U.config.protectedSource, X = U._.dataStore || (U._.dataStore = {id: 1}), Y = /<\!--\{cke_temp(comment)?\}(\d*?)-->/g, Z = [/<script[\s\S]*?<\/script>/gi, /<noscript[\s\S]*?<\/noscript>/gi].concat(W);
            T = T.replace(/<!--[\s\S]*?-->/g, function (ab) {
                return '<!--{cke_tempcomment}' + (V.push(ab) - 1) + '-->';
            });
            for (var aa = 0; aa < Z.length; aa++)T = T.replace(Z[aa], function (ab) {
                ab = ab.replace(Y, function (ac, ad, ae) {
                    return V[ae];
                });
                return/cke_temp(comment)?/.test(ab) ? ab : '<!--{cke_temp}' + (V.push(ab) - 1) + '-->';
            });
            T = T.replace(Y, function (ab, ac, ad) {
                return '<!--' + n + (ac ? '{C}' : '') + encodeURIComponent(V[ad]).replace(/--/g, '%2D%2D') + '-->';
            });
            return T.replace(/(['"]).*?\1/g, function (ab) {
                return ab.replace(/<!--\{cke_protected\}([\s\S]+?)-->/g, function (ac, ad) {
                    X[X.id] = decodeURIComponent(ad);
                    return '{cke_protected_' + X.id++ + '}';
                });
            });
        };
        j.add('htmldataprocessor', {requires: ['htmlwriter'], init: function (T) {
            var U = T.dataProcessor = new a.htmlDataProcessor(T);
            U.writer.forceSimpleAmpersand = T.config.forceSimpleAmpersand;
            U.dataFilter.addRules(w);
            U.dataFilter.addRules(x);
            U.htmlFilter.addRules(y);
            var V = {elements: {}};
            for (v in u)V.elements[v] = r(true, T.config.fillEmptyBlocks);
            U.htmlFilter.addRules(V);
        }, onLoad: function () {
            !('fillEmptyBlocks' in i) && (i.fillEmptyBlocks = 1);
        }});
        a.htmlDataProcessor = function (T) {
            var U = this;
            U.editor = T;
            U.writer = new a.htmlWriter();
            U.dataFilter = new a.htmlParser.filter();
            U.htmlFilter = new a.htmlParser.filter();
        };
        a.htmlDataProcessor.prototype = {toHtml: function (T, U) {
            T = S(T, this.editor);
            T = I(T);
            T = J(T);
            T = L(T);
            T = N(T);
            T = O(T);
            var V = new h('div');
            V.setHtml('a' + T);
            T = V.getHtml().substr(1);
            T = M(T);
            T = K(T);
            T = Q(T);
            var W = a.htmlParser.fragment.fromHtml(T, U), X = new a.htmlParser.basicWriter();
            W.writeHtml(X, this.dataFilter);
            T = X.getHtml(true);
            T = P(T);
            return T;
        }, toDataFormat: function (T, U) {
            var V = this.writer, W = a.htmlParser.fragment.fromHtml(T, U);
            V.reset();
            W.writeHtml(V, this.htmlFilter);
            var X = V.getHtml(true);
            X = Q(X);
            X = R(X, this.editor);
            return X;
        }};
    })();
    (function () {
        j.add('iframe', {requires: ['dialog', 'fakeobjects'], init: function (m) {
            var n = 'iframe', o = m.lang.iframe;
            a.dialog.add(n, this.path + 'dialogs/iframe.js');
            m.addCommand(n, new a.dialogCommand(n));
            m.addCss('img.cke_iframe{background-image: url(' + a.getUrl(this.path + 'images/placeholder.png') + ');' + 'background-position: center center;' + 'background-repeat: no-repeat;' + 'border: 1px solid #a9a9a9;' + 'width: 80px;' + 'height: 80px;' + '}');
            m.ui.addButton('Iframe', {label: o.toolbar, command: n});
            m.on('doubleclick', function (p) {
                var q = p.data.element;
                if (q.is('img') && q.data('cke-real-element-type') == 'iframe')p.data.dialog = 'iframe';
            });
            if (m.addMenuItems)m.addMenuItems({iframe: {label: o.title, command: 'iframe', group: 'image'}});
            if (m.contextMenu)m.contextMenu.addListener(function (p, q) {
                if (p && p.is('img') && p.data('cke-real-element-type') == 'iframe')return{iframe: 2};
            });
        }, afterInit: function (m) {
            var n = m.dataProcessor, o = n && n.dataFilter;
            if (o)o.addRules({elements: {iframe: function (p) {
                return m.createFakeParserElement(p, 'cke_iframe', 'iframe', true);
            }}});
        }});
    })();
    j.add('image', {init: function (m) {
        var n = 'image';
        a.dialog.add(n, this.path + 'dialogs/image.js');
        m.addCommand(n, new a.dialogCommand(n));
        m.ui.addButton('Image', {label: m.lang.common.image, command: n});
        m.on('doubleclick', function (o) {
            var p = o.data.element;
            if (p.is('img') && !p.data('cke-realelement') && !p.isReadOnly())o.data.dialog = 'image';
        });
        if (m.addMenuItems)m.addMenuItems({image: {label: m.lang.image.menu, command: 'image', group: 'image'}});
        if (m.contextMenu)m.contextMenu.addListener(function (o, p) {
            if (!o || !o.is('img') || o.data('cke-realelement') || o.isReadOnly())return null;
            return{image: 2};
        });
    }});
    i.image_removeLinkByEmptyURL = true;
    (function () {
        var m = {ol: 1, ul: 1}, n = d.walker.whitespaces(true), o = d.walker.bookmark(false, true);

        function p(t) {
            var B = this;
            if (t.editor.readOnly)return null;
            var u = t.editor, v = t.data.path, w = v && v.contains(m), x = v.block || v.blockLimit;
            if (w)return B.setState(2);
            if (!B.useIndentClasses && B.name == 'indent')return B.setState(2);
            if (!x)return B.setState(0);
            if (B.useIndentClasses) {
                var y = x.$.className.match(B.classNameRegex), z = 0;
                if (y) {
                    y = y[1];
                    z = B.indentClassMap[y];
                }
                if (B.name == 'outdent' && !z || B.name == 'indent' && z == u.config.indentClasses.length)return B.setState(0);
                return B.setState(2);
            } else {
                var A = parseInt(x.getStyle(r(x)), 10);
                if (isNaN(A))A = 0;
                if (A <= 0)return B.setState(0);
                return B.setState(2);
            }
        };
        function q(t, u) {
            var w = this;
            w.name = u;
            w.useIndentClasses = t.config.indentClasses && t.config.indentClasses.length > 0;
            if (w.useIndentClasses) {
                w.classNameRegex = new RegExp('(?:^|\\s+)(' + t.config.indentClasses.join('|') + ')(?=$|\\s)');
                w.indentClassMap = {};
                for (var v = 0; v < t.config.indentClasses.length; v++)w.indentClassMap[t.config.indentClasses[v]] = v + 1;
            }
            w.startDisabled = u == 'outdent';
        };
        function r(t, u) {
            return(u || t.getComputedStyle('direction')) == 'ltr' ? 'margin-left' : 'margin-right';
        };
        function s(t) {
            return t.type == 1 && t.is('li');
        };
        q.prototype = {exec: function (t) {
            var u = this, v = {};

            function w(M) {
                var N = C.startContainer, O = C.endContainer;
                while (N && !N.getParent().equals(M))N = N.getParent();
                while (O && !O.getParent().equals(M))O = O.getParent();
                if (!N || !O)return;
                var P = N, Q = [], R = false;
                while (!R) {
                    if (P.equals(O))R = true;
                    Q.push(P);
                    P = P.getNext();
                }
                if (Q.length < 1)return;
                var S = M.getParents(true);
                for (var T = 0; T < S.length; T++) {
                    if (S[T].getName && m[S[T].getName()]) {
                        M = S[T];
                        break;
                    }
                }
                var U = u.name == 'indent' ? 1 : -1, V = Q[0], W = Q[Q.length - 1], X = j.list.listToArray(M, v), Y = X[W.getCustomData('listarray_index')].indent;
                for (T = V.getCustomData('listarray_index'); T <= W.getCustomData('listarray_index'); T++) {
                    X[T].indent += U;
                    var Z = X[T].parent;
                    X[T].parent = new h(Z.getName(), Z.getDocument());
                }
                for (T = W.getCustomData('listarray_index') + 1; T < X.length && X[T].indent > Y; T++)X[T].indent += U;
                var aa = j.list.arrayToList(X, v, null, t.config.enterMode, M.getDirection());
                if (u.name == 'outdent') {
                    var ab;
                    if ((ab = M.getParent()) && ab.is('li')) {
                        var ac = aa.listNode.getChildren(), ad = [], ae = ac.count(), af;
                        for (T = ae - 1; T >= 0; T--) {
                            if ((af = ac.getItem(T)) && af.is && af.is('li'))ad.push(af);
                        }
                    }
                }
                if (aa)aa.listNode.replace(M);
                if (ad && ad.length)for (T = 0; T < ad.length; T++) {
                    var ag = ad[T], ah = ag;
                    while ((ah = ah.getNext()) && ah.is && ah.getName() in m) {
                        if (c && !ag.getFirst(function (ai) {
                            return n(ai) && o(ai);
                        }))ag.append(C.document.createText('\xa0'));
                        ag.append(ah);
                    }
                    ag.insertAfter(ab);
                }
            };
            function x() {
                var M = C.createIterator(), N = t.config.enterMode;
                M.enforceRealBlocks = true;
                M.enlargeBr = N != 2;
                var O;
                while (O = M.getNextParagraph(N == 1 ? 'p' : 'div'))y(O);
            };
            function y(M, N) {
                if (M.getCustomData('indent_processed'))return false;
                if (u.useIndentClasses) {
                    var O = M.$.className.match(u.classNameRegex), P = 0;
                    if (O) {
                        O = O[1];
                        P = u.indentClassMap[O];
                    }
                    if (u.name == 'outdent')P--; else P++;
                    if (P < 0)return false;
                    P = Math.min(P, t.config.indentClasses.length);
                    P = Math.max(P, 0);
                    M.$.className = e.ltrim(M.$.className.replace(u.classNameRegex, ''));
                    if (P > 0)M.addClass(t.config.indentClasses[P - 1]);
                } else {
                    var Q = r(M, N), R = parseInt(M.getStyle(Q), 10);
                    if (isNaN(R))R = 0;
                    var S = t.config.indentOffset || 40;
                    R += (u.name == 'indent' ? 1 : -1) * S;
                    if (R < 0)return false;
                    R = Math.max(R, 0);
                    R = Math.ceil(R / S) * S;
                    M.setStyle(Q, R ? R + (t.config.indentUnit || 'px') : '');
                    if (M.getAttribute('style') === '')M.removeAttribute('style');
                }
                h.setMarker(v, M, 'indent_processed', 1);
                return true;
            };
            var z = t.getSelection(), A = z.createBookmarks(1), B = z && z.getRanges(1), C, D = B.createIterator();
            while (C = D.getNextRange()) {
                var E = C.getCommonAncestor(), F = E;
                while (F && !(F.type == 1 && m[F.getName()]))F = F.getParent();
                if (!F) {
                    var G = C.getEnclosedNode();
                    if (G && G.type == 1 && G.getName() in m) {
                        C.setStartAt(G, 1);
                        C.setEndAt(G, 2);
                        F = G;
                    }
                }
                if (F && C.startContainer.type == 1 && C.startContainer.getName() in m) {
                    var H = new d.walker(C);
                    H.evaluator = s;
                    C.startContainer = H.next();
                }
                if (F && C.endContainer.type == 1 && C.endContainer.getName() in m) {
                    H = new d.walker(C);
                    H.evaluator = s;
                    C.endContainer = H.previous();
                }
                if (F) {
                    var I = F.getFirst(s), J = !!I.getNext(s), K = C.startContainer, L = I.equals(K) || I.contains(K);
                    if (!(L && (u.name == 'indent' || u.useIndentClasses || parseInt(F.getStyle(r(F)), 10)) && y(F, !J && I.getDirection())))w(F);
                } else x();
            }
            h.clearAllMarkers(v);
            t.forceNextSelectionCheck();
            z.selectBookmarks(A);
        }};
        j.add('indent', {init: function (t) {
            var u = t.addCommand('indent', new q(t, 'indent')), v = t.addCommand('outdent', new q(t, 'outdent'));
            t.ui.addButton('Indent', {label: t.lang.indent, command: 'indent'});
            t.ui.addButton('Outdent', {label: t.lang.outdent, command: 'outdent'});
            t.on('selectionChange', e.bind(p, u));
            t.on('selectionChange', e.bind(p, v));
            if (b.ie6Compat || b.ie7Compat)t.addCss('ul,ol{\tmargin-left: 0px;\tpadding-left: 40px;}');
            t.on('dirChanged', function (w) {
                var x = new d.range(t.document);
                x.setStartBefore(w.data.node);
                x.setEndAfter(w.data.node);
                var y = new d.walker(x), z;
                while (z = y.next()) {
                    if (z.type == 1) {
                        if (!z.equals(w.data.node) && z.getDirection()) {
                            x.setStartAfter(z);
                            y = new d.walker(x);
                            continue;
                        }
                        var A = t.config.indentClasses;
                        if (A) {
                            var B = w.data.dir == 'ltr' ? ['_rtl', ''] : ['', '_rtl'];
                            for (var C = 0; C < A.length; C++) {
                                if (z.hasClass(A[C] + B[0])) {
                                    z.removeClass(A[C] + B[0]);
                                    z.addClass(A[C] + B[1]);
                                }
                            }
                        }
                        var D = z.getStyle('margin-right'), E = z.getStyle('margin-left');
                        D ? z.setStyle('margin-left', D) : z.removeStyle('margin-left');
                        E ? z.setStyle('margin-right', E) : z.removeStyle('margin-right');
                    }
                }
            });
        }, requires: ['domiterator', 'list']});
    })();
    (function () {
        function m(r, s) {
            var t = s.block || s.blockLimit;
            if (!t || t.getName() == 'body')return 2;
            return n(t, r.config.useComputedState) == this.value ? 1 : 2;
        };
        function n(r, s) {
            s = s === undefined || s;
            var t;
            if (s)t = r.getComputedStyle('text-align'); else {
                while (!r.hasAttribute || !(r.hasAttribute('align') || r.getStyle('text-align'))) {
                    var u = r.getParent();
                    if (!u)break;
                    r = u;
                }
                t = r.getStyle('text-align') || r.getAttribute('align') || '';
            }
            t && (t = t.replace(/-moz-|-webkit-|start|auto/i, ''));
            !t && s && (t = r.getComputedStyle('direction') == 'rtl' ? 'right' : 'left');
            return t;
        };
        function o(r) {
            if (r.editor.readOnly)return;
            var s = r.editor.getCommand(this.name);
            s.state = m.call(this, r.editor, r.data.path);
            s.fire('state');
        };
        function p(r, s, t) {
            var v = this;
            v.name = s;
            v.value = t;
            var u = r.config.justifyClasses;
            if (u) {
                switch (t) {
                    case 'left':
                        v.cssClassName = u[0];
                        break;
                    case 'center':
                        v.cssClassName = u[1];
                        break;
                    case 'right':
                        v.cssClassName = u[2];
                        break;
                    case 'justify':
                        v.cssClassName = u[3];
                        break;
                }
                v.cssClassRegex = new RegExp('(?:^|\\s+)(?:' + u.join('|') + ')(?=$|\\s)');
            }
        };
        function q(r) {
            var s = r.editor, t = new d.range(s.document);
            t.setStartBefore(r.data.node);
            t.setEndAfter(r.data.node);
            var u = new d.walker(t), v;
            while (v = u.next()) {
                if (v.type == 1) {
                    if (!v.equals(r.data.node) && v.getDirection()) {
                        t.setStartAfter(v);
                        u = new d.walker(t);
                        continue;
                    }
                    var w = s.config.justifyClasses;
                    if (w)if (v.hasClass(w[0])) {
                        v.removeClass(w[0]);
                        v.addClass(w[2]);
                    } else if (v.hasClass(w[2])) {
                        v.removeClass(w[2]);
                        v.addClass(w[0]);
                    }
                    var x = 'text-align', y = v.getStyle(x);
                    if (y == 'left')v.setStyle(x, 'right'); else if (y == 'right')v.setStyle(x, 'left');
                }
            }
        };
        p.prototype = {exec: function (r) {
            var D = this;
            var s = r.getSelection(), t = r.config.enterMode;
            if (!s)return;
            var u = s.createBookmarks(), v = s.getRanges(true), w = D.cssClassName, x, y, z = r.config.useComputedState;
            z = z === undefined || z;
            for (var A = v.length - 1; A >= 0; A--) {
                x = v[A].createIterator();
                x.enlargeBr = t != 2;
                while (y = x.getNextParagraph(t == 1 ? 'p' : 'div')) {
                    y.removeAttribute('align');
                    y.removeStyle('text-align');
                    var B = w && (y.$.className = e.ltrim(y.$.className.replace(D.cssClassRegex, ''))), C = D.state == 2 && (!z || n(y, true) != D.value);
                    if (w) {
                        if (C)y.addClass(w); else if (!B)y.removeAttribute('class');
                    } else if (C)y.setStyle('text-align', D.value);
                }
            }
            r.focus();
            r.forceNextSelectionCheck();
            s.selectBookmarks(u);
        }};
        j.add('justify', {init: function (r) {
            var s = new p(r, 'justifyleft', 'left'), t = new p(r, 'justifycenter', 'center'), u = new p(r, 'justifyright', 'right'), v = new p(r, 'justifyblock', 'justify');
            r.addCommand('justifyleft', s);
            r.addCommand('justifycenter', t);
            r.addCommand('justifyright', u);
            r.addCommand('justifyblock', v);
            r.ui.addButton('JustifyLeft', {label: r.lang.justify.left, command: 'justifyleft'});
            r.ui.addButton('JustifyCenter', {label: r.lang.justify.center, command: 'justifycenter'});
            r.ui.addButton('JustifyRight', {label: r.lang.justify.right, command: 'justifyright'});
            r.ui.addButton('JustifyBlock', {label: r.lang.justify.block, command: 'justifyblock'});
            r.on('selectionChange', e.bind(o, s));
            r.on('selectionChange', e.bind(o, u));
            r.on('selectionChange', e.bind(o, t));
            r.on('selectionChange', e.bind(o, v));
            r.on('dirChanged', q);
        }, requires: ['domiterator']});
    })();
    j.add('keystrokes', {beforeInit: function (m) {
        m.keystrokeHandler = new a.keystrokeHandler(m);
        m.specialKeys = {};
    }, init: function (m) {
        var n = m.config.keystrokes, o = m.config.blockedKeystrokes, p = m.keystrokeHandler.keystrokes, q = m.keystrokeHandler.blockedKeystrokes;
        for (var r = 0; r < n.length; r++)p[n[r][0]] = n[r][1];
        for (r = 0; r < o.length; r++)q[o[r]] = 1;
    }});
    a.keystrokeHandler = function (m) {
        var n = this;
        if (m.keystrokeHandler)return m.keystrokeHandler;
        n.keystrokes = {};
        n.blockedKeystrokes = {};
        n._ = {editor: m};
        return n;
    };
    (function () {
        var m, n = function (p) {
            p = p.data;
            var q = p.getKeystroke(), r = this.keystrokes[q], s = this._.editor;
            m = s.fire('key', {keyCode: q}) === true;
            if (!m) {
                if (r) {
                    var t = {from: 'keystrokeHandler'};
                    m = s.execCommand(r, t) !== false;
                }
                if (!m) {
                    var u = s.specialKeys[q];
                    m = u && u(s) === true;
                    if (!m)m = !!this.blockedKeystrokes[q];
                }
            }
            if (m)p.preventDefault(true);
            return!m;
        }, o = function (p) {
            if (m) {
                m = false;
                p.data.preventDefault(true);
            }
        };
        a.keystrokeHandler.prototype = {attach: function (p) {
            p.on('keydown', n, this);
            if (b.opera || b.gecko && b.mac)p.on('keypress', o, this);
        }};
    })();
    i.blockedKeystrokes = [1114112 + 66, 1114112 + 73, 1114112 + 85];
    i.keystrokes = [
        [4456448 + 121, 'toolbarFocus'],
        [4456448 + 122, 'elementsPathFocus'],
        [2228224 + 121, 'contextMenu'],
        [1114112 + 2228224 + 121, 'contextMenu'],
        [1114112 + 90, 'undo'],
        [1114112 + 89, 'redo'],
        [1114112 + 2228224 + 90, 'redo'],
        [1114112 + 76, 'link'],
        [1114112 + 66, 'bold'],
        [1114112 + 73, 'italic'],
        [1114112 + 85, 'underline'],
        [4456448 + (c || b.webkit ? 189 : 109), 'toolbarCollapse'],
        [4456448 + 48, 'a11yHelp']
    ];
    j.add('link', {init: function (m) {
        m.addCommand('link', new a.dialogCommand('link'));
        m.addCommand('anchor', new a.dialogCommand('anchor'));
        m.addCommand('unlink', new a.unlinkCommand());
        m.addCommand('removeAnchor', new a.removeAnchorCommand());
        m.ui.addButton('Link', {label: m.lang.link.toolbar, command: 'link'});
        m.ui.addButton('Unlink', {label: m.lang.unlink, command: 'unlink'});
        m.ui.addButton('Anchor', {label: m.lang.anchor.toolbar, command: 'anchor'});
        a.dialog.add('link', this.path + 'dialogs/link.js');
        a.dialog.add('anchor', this.path + 'dialogs/anchor.js');
        var n = m.lang.dir == 'rtl' ? 'right' : 'left', o = 'background:url(' + a.getUrl(this.path + 'images/anchor.gif') + ') no-repeat ' + n + ' center;' + 'border:1px dotted #00f;';
        m.addCss('a.cke_anchor,a.cke_anchor_empty' + (c && b.version < 7 ? '' : ',a[name],a[data-cke-saved-name]') + '{' + o + 'padding-' + n + ':18px;' + 'cursor:auto;' + '}' + (c ? 'a.cke_anchor_empty{display:inline-block;}' : '') + 'img.cke_anchor' + '{' + o + 'width:16px;' + 'min-height:15px;' + 'height:1.15em;' + 'vertical-align:' + (b.opera ? 'middle' : 'text-bottom') + ';' + '}');
        m.on('selectionChange', function (p) {
            if (m.readOnly)return;
            var q = m.getCommand('unlink'), r = p.data.path.lastElement && p.data.path.lastElement.getAscendant('a', true);
            if (r && r.getName() == 'a' && r.getAttribute('href') && r.getChildCount())q.setState(2); else q.setState(0);
        });
        m.on('doubleclick', function (p) {
            var q = j.link.getSelectedLink(m) || p.data.element;
            if (!q.isReadOnly())if (q.is('a')) {
                p.data.dialog = q.getAttribute('name') && (!q.getAttribute('href') || !q.getChildCount()) ? 'anchor' : 'link';
                m.getSelection().selectElement(q);
            } else if (j.link.tryRestoreFakeAnchor(m, q))p.data.dialog = 'anchor';
        });
        if (m.addMenuItems)m.addMenuItems({anchor: {label: m.lang.anchor.menu, command: 'anchor', group: 'anchor', order: 1}, removeAnchor: {label: m.lang.anchor.remove, command: 'removeAnchor', group: 'anchor', order: 5}, link: {label: m.lang.link.menu, command: 'link', group: 'link', order: 1}, unlink: {label: m.lang.unlink, command: 'unlink', group: 'link', order: 5}});
        if (m.contextMenu)m.contextMenu.addListener(function (p, q) {
            if (!p || p.isReadOnly())return null;
            var r = j.link.tryRestoreFakeAnchor(m, p);
            if (!r && !(r = j.link.getSelectedLink(m)))return null;
            var s = {};
            if (r.getAttribute('href') && r.getChildCount())s = {link: 2, unlink: 2};
            if (r && r.hasAttribute('name'))s.anchor = s.removeAnchor = 2;
            return s;
        });
    }, afterInit: function (m) {
        var n = m.dataProcessor, o = n && n.dataFilter, p = n && n.htmlFilter, q = m._.elementsPath && m._.elementsPath.filters;
        if (o)o.addRules({elements: {a: function (r) {
            var s = r.attributes;
            if (!s.name)return null;
            var t = !r.children.length;
            if (j.link.synAnchorSelector) {
                var u = t ? 'cke_anchor_empty' : 'cke_anchor', v = s['class'];
                if (s.name && (!v || v.indexOf(u) < 0))s['class'] = (v || '') + ' ' + u;
                if (t && j.link.emptyAnchorFix) {
                    s.contenteditable = 'false';
                    s['data-cke-editable'] = 1;
                }
            } else if (j.link.fakeAnchor && t)return m.createFakeParserElement(r, 'cke_anchor', 'anchor');
            return null;
        }}});
        if (j.link.emptyAnchorFix && p)p.addRules({elements: {a: function (r) {
            delete r.attributes.contenteditable;
        }}});
        if (q)q.push(function (r, s) {
            if (s == 'a')if (j.link.tryRestoreFakeAnchor(m, r) || r.getAttribute('name') && (!r.getAttribute('href') || !r.getChildCount()))return 'anchor';
        });
    }, requires: ['fakeobjects']});
    j.link = {getSelectedLink: function (m) {
        try {
            var n = m.getSelection();
            if (n.getType() == 3) {
                var o = n.getSelectedElement();
                if (o.is('a'))return o;
            }
            var p = n.getRanges(true)[0];
            p.shrink(2);
            var q = p.getCommonAncestor();
            return q.getAscendant('a', true);
        } catch (r) {
            return null;
        }
    }, fakeAnchor: b.opera || b.webkit, synAnchorSelector: c, emptyAnchorFix: c && b.version < 8, tryRestoreFakeAnchor: function (m, n) {
        if (n && n.data('cke-real-element-type') && n.data('cke-real-element-type') == 'anchor') {
            var o = m.restoreRealElement(n);
            if (o.data('cke-saved-name'))return o;
        }
    }};
    a.unlinkCommand = function () {
    };
    a.unlinkCommand.prototype = {exec: function (m) {
        var n = m.getSelection(), o = n.createBookmarks(), p = n.getRanges(), q, r;
        for (var s = 0; s < p.length; s++) {
            q = p[s].getCommonAncestor(true);
            r = q.getAscendant('a', true);
            if (!r)continue;
            p[s].selectNodeContents(r);
        }
        n.selectRanges(p);
        m.document.$.execCommand('unlink', false, null);
        n.selectBookmarks(o);
    }, startDisabled: true};
    a.removeAnchorCommand = function () {
    };
    a.removeAnchorCommand.prototype = {exec: function (m) {
        var n = m.getSelection(), o = n.createBookmarks(), p;
        if (n && (p = n.getSelectedElement()) && (j.link.fakeAnchor && !p.getChildCount() ? j.link.tryRestoreFakeAnchor(m, p) : p.is('a')))p.remove(1); else if (p = j.link.getSelectedLink(m))if (p.hasAttribute('href')) {
            p.removeAttributes({name: 1, 'data-cke-saved-name': 1});
            p.removeClass('cke_anchor');
        } else p.remove(1);
        n.selectBookmarks(o);
    }};
    e.extend(i, {linkShowAdvancedTab: true, linkShowTargetTab: true});
    (function () {
        var m = {ol: 1, ul: 1}, n = /^[\n\r\t ]*$/, o = d.walker.whitespaces(), p = d.walker.bookmark(), q = function (G) {
            return!(o(G) || p(G));
        };

        function r(G) {
            var H, I, J;
            if (H = G.getDirection()) {
                I = G.getParent();
                while (I && !(J = I.getDirection()))I = I.getParent();
                if (H == J)G.removeAttribute('dir');
            }
        };
        j.list = {listToArray: function (G, H, I, J, K) {
            if (!m[G.getName()])return[];
            if (!J)J = 0;
            if (!I)I = [];
            for (var L = 0, M = G.getChildCount(); L < M; L++) {
                var N = G.getChild(L);
                if (N.type == 1 && N.getName() in f.$list)j.list.listToArray(N, H, I, J + 1);
                if (N.$.nodeName.toLowerCase() != 'li')continue;
                var O = {parent: G, indent: J, element: N, contents: []};
                if (!K) {
                    O.grandparent = G.getParent();
                    if (O.grandparent && O.grandparent.$.nodeName.toLowerCase() == 'li')O.grandparent = O.grandparent.getParent();
                } else O.grandparent = K;
                if (H)h.setMarker(H, N, 'listarray_index', I.length);
                I.push(O);
                for (var P = 0, Q = N.getChildCount(), R; P < Q; P++) {
                    R = N.getChild(P);
                    if (R.type == 1 && m[R.getName()])j.list.listToArray(R, H, I, J + 1, O.grandparent); else O.contents.push(R);
                }
            }
            return I;
        }, arrayToList: function (G, H, I, J, K) {
            if (!I)I = 0;
            if (!G || G.length < I + 1)return null;
            var L = G[I].parent.getDocument(), M = new d.documentFragment(L), N = null, O = I, P = Math.max(G[I].indent, 0), Q = null, R, S = J == 1 ? 'p' : 'div';
            while (1) {
                var T = G[O];
                R = T.element.getDirection(1);
                if (T.indent == P) {
                    if (!N || G[O].parent.getName() != N.getName()) {
                        N = G[O].parent.clone(false, 1);
                        K && N.setAttribute('dir', K);
                        M.append(N);
                    }
                    Q = N.append(T.element.clone(0, 1));
                    if (R != N.getDirection(1))Q.setAttribute('dir', R);
                    for (var U = 0; U < T.contents.length; U++)Q.append(T.contents[U].clone(1, 1));
                    O++;
                } else if (T.indent == Math.max(P, 0) + 1) {
                    var V = G[O - 1].element.getDirection(1), W = j.list.arrayToList(G, null, O, J, V != R ? R : null);
                    if (!Q.getChildCount() && c && !(L.$.documentMode > 7))Q.append(L.createText('\xa0'));
                    Q.append(W.listNode);
                    O = W.nextIndex;
                } else if (T.indent == -1 && !I && T.grandparent) {
                    if (m[T.grandparent.getName()])Q = T.element.clone(false, true);
                    else if (K || T.element.hasAttributes() || J != 2) {
                        Q = L.createElement(S);
                        T.element.copyAttributes(Q, {type: 1, value: 1});
                        if (!K && J == 2 && !Q.hasAttributes())Q = new d.documentFragment(L);
                    } else Q = new d.documentFragment(L);
                    if (Q.type == 1)if (T.grandparent.getDirection(1) != R)Q.setAttribute('dir', R);
                    for (U = 0; U < T.contents.length; U++)Q.append(T.contents[U].clone(1, 1));
                    if (Q.type == 11 && O != G.length - 1) {
                        var X = Q.getLast();
                        if (X && X.type == 1 && X.getAttribute('type') == '_moz')X.remove();
                        if (!(X = Q.getLast(q) && X.type == 1 && X.getName() in f.$block))Q.append(L.createElement('br'));
                    }
                    if (Q.type == 1 && Q.getName() == S && Q.$.firstChild) {
                        Q.trim();
                        var Y = Q.getFirst();
                        if (Y.type == 1 && Y.isBlockBoundary()) {
                            var Z = new d.documentFragment(L);
                            Q.moveChildren(Z);
                            Q = Z;
                        }
                    }
                    var aa = Q.$.nodeName.toLowerCase();
                    if (!c && (aa == 'div' || aa == 'p'))Q.appendBogus();
                    M.append(Q);
                    N = null;
                    O++;
                } else return null;
                if (G.length <= O || Math.max(G[O].indent, 0) < P)break;
            }
            if (H) {
                var ab = M.getFirst(), ac = G[0].parent;
                while (ab) {
                    if (ab.type == 1) {
                        h.clearMarkers(H, ab);
                        if (ab.getName() in f.$listItem)r(ab);
                    }
                    ab = ab.getNextSourceNode();
                }
            }
            return{listNode: M, nextIndex: O};
        }};
        function s(G) {
            if (G.editor.readOnly)return null;
            var H = G.data.path, I = H.blockLimit, J = H.elements, K, L;
            for (L = 0; L < J.length && (K = J[L]) && !K.equals(I); L++) {
                if (m[J[L].getName()])return this.setState(this.type == J[L].getName() ? 1 : 2);
            }
            return this.setState(2);
        };
        function t(G, H, I, J) {
            var K = j.list.listToArray(H.root, I), L = [];
            for (var M = 0; M < H.contents.length; M++) {
                var N = H.contents[M];
                N = N.getAscendant('li', true);
                if (!N || N.getCustomData('list_item_processed'))continue;
                L.push(N);
                h.setMarker(I, N, 'list_item_processed', true);
            }
            var O = H.root, P = O.getDocument().createElement(this.type);
            O.copyAttributes(P, {start: 1, type: 1});
            P.removeStyle('list-style-type');
            for (M = 0; M < L.length; M++) {
                var Q = L[M].getCustomData('listarray_index');
                K[Q].parent = P;
            }
            var R = j.list.arrayToList(K, I, null, G.config.enterMode), S, T = R.listNode.getChildCount();
            for (M = 0; M < T && (S = R.listNode.getChild(M)); M++) {
                if (S.getName() == this.type)J.push(S);
            }
            R.listNode.replace(H.root);
        };
        var u = /^h[1-6]$/;

        function v(G, H, I) {
            var J = H.contents, K = H.root.getDocument(), L = [];
            if (J.length == 1 && J[0].equals(H.root)) {
                var M = K.createElement('div');
                J[0].moveChildren && J[0].moveChildren(M);
                J[0].append(M);
                J[0] = M;
            }
            var N = H.contents[0].getParent();
            for (var O = 0; O < J.length; O++)N = N.getCommonAncestor(J[O].getParent());
            var P = G.config.useComputedState, Q, R;
            P = P === undefined || P;
            for (O = 0; O < J.length; O++) {
                var S = J[O], T;
                while (T = S.getParent()) {
                    if (T.equals(N)) {
                        L.push(S);
                        if (!R && S.getDirection())R = 1;
                        var U = S.getDirection(P);
                        if (Q !== null)if (Q && Q != U)Q = null; else Q = U;
                        break;
                    }
                    S = T;
                }
            }
            if (L.length < 1)return;
            var V = L[L.length - 1].getNext(), W = K.createElement(this.type);
            I.push(W);
            var X, Y;
            while (L.length) {
                X = L.shift();
                Y = K.createElement('li');
                if (X.is('pre') || u.test(X.getName()))X.appendTo(Y); else {
                    X.copyAttributes(Y);
                    if (Q && X.getDirection()) {
                        Y.removeStyle('direction');
                        Y.removeAttribute('dir');
                    }
                    X.moveChildren(Y);
                    X.remove();
                }
                Y.appendTo(W);
            }
            if (Q && R)W.setAttribute('dir', Q);
            if (V)W.insertBefore(V); else W.appendTo(N);
        };
        function w(G, H, I) {
            var J = j.list.listToArray(H.root, I), K = [];
            for (var L = 0; L < H.contents.length; L++) {
                var M = H.contents[L];
                M = M.getAscendant('li', true);
                if (!M || M.getCustomData('list_item_processed'))continue;
                K.push(M);
                h.setMarker(I, M, 'list_item_processed', true);
            }
            var N = null;
            for (L = 0; L < K.length; L++) {
                var O = K[L].getCustomData('listarray_index');
                J[O].indent = -1;
                N = O;
            }
            for (L = N + 1; L < J.length; L++) {
                if (J[L].indent > J[L - 1].indent + 1) {
                    var P = J[L - 1].indent + 1 - J[L].indent, Q = J[L].indent;
                    while (J[L] && J[L].indent >= Q) {
                        J[L].indent += P;
                        L++;
                    }
                    L--;
                }
            }
            var R = j.list.arrayToList(J, I, null, G.config.enterMode, H.root.getAttribute('dir')), S = R.listNode, T, U;

            function V(W) {
                if ((T = S[W ? 'getFirst' : 'getLast']()) && !(T.is && T.isBlockBoundary()) && (U = H.root[W ? 'getPrevious' : 'getNext'](d.walker.whitespaces(true))) && !(U.is && U.isBlockBoundary({br: 1})))G.document.createElement('br')[W ? 'insertBefore' : 'insertAfter'](T);
            };
            V(true);
            V();
            S.replace(H.root);
        };
        function x(G, H) {
            this.name = G;
            this.type = H;
        };
        function y(G) {
            var H = G.getDirection();
            if (H) {
                for (var I = 0, J = G.getChildren(), K; K = J.getItem(I), I < J.count(); I++) {
                    if (K.type == 1 && K.is('li') && !K.getDirection())K.setAttribute('dir', H);
                }
                G.removeAttribute('dir');
            }
        };
        x.prototype = {exec: function (G) {
            var H = G.document, I = G.config, J = G.getSelection(), K = J && J.getRanges(true);
            if (!K || K.length < 1)return;
            if (this.state == 2) {
                var L = H.getBody();
                if (!L.getFirst(q)) {
                    I.enterMode == 2 ? L.appendBogus() : K[0].fixBlock(1, I.enterMode == 1 ? 'p' : 'div');
                    J.selectRanges(K);
                } else {
                    var M = K.length == 1 && K[0], N = M && M.getEnclosedNode();
                    if (N && N.is && this.type == N.getName())this.setState(1);
                }
            }
            var O = J.createBookmarks(true), P = [], Q = {}, R = K.createIterator(), S = 0;
            while ((M = R.getNextRange()) && ++S) {
                var T = M.getBoundaryNodes(), U = T.startNode, V = T.endNode;
                if (U.type == 1 && U.getName() == 'td')M.setStartAt(T.startNode, 1);
                if (V.type == 1 && V.getName() == 'td')M.setEndAt(T.endNode, 2);
                var W = M.createIterator(), X;
                W.forceBrBreak = this.state == 2;
                while (X = W.getNextParagraph()) {
                    if (X.getCustomData('list_block'))continue; else h.setMarker(Q, X, 'list_block', 1);
                    var Y = new d.elementPath(X), Z = Y.elements, aa = Z.length, ab = null, ac = 0, ad = Y.blockLimit, ae;
                    for (var af = aa - 1; af >= 0 && (ae = Z[af]);
                         af--) {
                        if (m[ae.getName()] && ad.contains(ae)) {
                            ad.removeCustomData('list_group_object_' + S);
                            var ag = ae.getCustomData('list_group_object');
                            if (ag)ag.contents.push(X); else {
                                ag = {root: ae, contents: [X]};
                                P.push(ag);
                                h.setMarker(Q, ae, 'list_group_object', ag);
                            }
                            ac = 1;
                            break;
                        }
                    }
                    if (ac)continue;
                    var ah = ad;
                    if (ah.getCustomData('list_group_object_' + S))ah.getCustomData('list_group_object_' + S).contents.push(X); else {
                        ag = {root: ah, contents: [X]};
                        h.setMarker(Q, ah, 'list_group_object_' + S, ag);
                        P.push(ag);
                    }
                }
            }
            var ai = [];
            while (P.length > 0) {
                ag = P.shift();
                if (this.state == 2) {
                    if (m[ag.root.getName()])t.call(this, G, ag, Q, ai); else v.call(this, G, ag, ai);
                } else if (this.state == 1 && m[ag.root.getName()])w.call(this, G, ag, Q);
            }
            for (af = 0; af < ai.length; af++) {
                ab = ai[af];
                var aj, ak = this;
                (aj = function (al) {
                    var am = ab[al ? 'getPrevious' : 'getNext'](d.walker.whitespaces(true));
                    if (am && am.getName && am.getName() == ak.type) {
                        if (am.getDirection(1) != ab.getDirection(1))y(ab.getDirection() ? ab : am);
                        am.remove();
                        am.moveChildren(ab, al);
                    }
                })();
                aj(1);
            }
            h.clearAllMarkers(Q);
            J.selectBookmarks(O);
            G.focus();
        }};
        var z = f, A = /[\t\r\n ]*(?:&nbsp;|\xa0)$/;

        function B(G, H) {
            var I, J = G.children, K = J.length;
            for (var L = 0; L < K; L++) {
                I = J[L];
                if (I.name && I.name in H)return L;
            }
            return K;
        };
        function C(G) {
            return function (H) {
                var I = H.children, J = B(H, z.$list), K = I[J], L = K && K.previous, M;
                if (L && (L.name && L.name == 'br' || L.value && (M = L.value.match(A)))) {
                    var N = L;
                    if (!(M && M.index) && N == I[0])I[0] = G || c ? new a.htmlParser.text('\xa0') : new a.htmlParser.element('br', {}); else if (N.name == 'br')I.splice(J - 1, 1); else N.value = N.value.replace(A, '');
                }
            };
        };
        var D = {elements: {}};
        for (var E in z.$listItem)D.elements[E] = C();
        var F = {elements: {}};
        for (E in z.$listItem)F.elements[E] = C(true);
        j.add('list', {init: function (G) {
            var H = G.addCommand('numberedlist', new x('numberedlist', 'ol')), I = G.addCommand('bulletedlist', new x('bulletedlist', 'ul'));
            G.ui.addButton('NumberedList', {label: G.lang.numberedlist, command: 'numberedlist'});
            G.ui.addButton('BulletedList', {label: G.lang.bulletedlist, command: 'bulletedlist'});
            G.on('selectionChange', e.bind(s, H));
            G.on('selectionChange', e.bind(s, I));
        }, afterInit: function (G) {
            var H = G.dataProcessor;
            if (H) {
                H.dataFilter.addRules(D);
                H.htmlFilter.addRules(F);
            }
        }, requires: ['domiterator']});
    })();
    (function () {
        j.liststyle = {requires: ['dialog'], init: function (m) {
            m.addCommand('numberedListStyle', new a.dialogCommand('numberedListStyle'));
            a.dialog.add('numberedListStyle', this.path + 'dialogs/liststyle.js');
            m.addCommand('bulletedListStyle', new a.dialogCommand('bulletedListStyle'));
            a.dialog.add('bulletedListStyle', this.path + 'dialogs/liststyle.js');
            if (m.addMenuItems) {
                m.addMenuGroup('list', 108);
                m.addMenuItems({numberedlist: {label: m.lang.list.numberedTitle, group: 'list', command: 'numberedListStyle'}, bulletedlist: {label: m.lang.list.bulletedTitle, group: 'list', command: 'bulletedListStyle'}});
            }
            if (m.contextMenu)m.contextMenu.addListener(function (n, o) {
                if (!n || n.isReadOnly())return null;
                while (n) {
                    var p = n.getName();
                    if (p == 'ol')return{numberedlist: 2}; else if (p == 'ul')return{bulletedlist: 2};
                    n = n.getParent();
                }
                return null;
            });
        }};
        j.add('liststyle', j.liststyle);
    })();
    (function () {
        function m(s) {
            if (!s || s.type != 1 || s.getName() != 'form')return[];
            var t = [], u = ['style', 'className'];
            for (var v = 0; v < u.length; v++) {
                var w = u[v], x = s.$.elements.namedItem(w);
                if (x) {
                    var y = new h(x);
                    t.push([y, y.nextSibling]);
                    y.remove();
                }
            }
            return t;
        };
        function n(s, t) {
            if (!s || s.type != 1 || s.getName() != 'form')return;
            if (t.length > 0)for (var u = t.length - 1; u >= 0; u--) {
                var v = t[u][0], w = t[u][1];
                if (w)v.insertBefore(w); else v.appendTo(s);
            }
        };
        function o(s, t) {
            var u = m(s), v = {}, w = s.$;
            if (!t) {
                v['class'] = w.className || '';
                w.className = '';
            }
            v.inline = w.style.cssText || '';
            if (!t)w.style.cssText = 'position: static; overflow: visible';
            n(u);
            return v;
        };
        function p(s, t) {
            var u = m(s), v = s.$;
            if ('class' in t)v.className = t['class'];
            if ('inline' in t)v.style.cssText = t.inline;
            n(u);
        };
        function q(s) {
            var t = a.instances;
            for (var u in t) {
                var v = t[u];
                if (v.mode == 'wysiwyg' && !v.readOnly) {
                    var w = v.document.getBody();
                    w.setAttribute('contentEditable', false);
                    w.setAttribute('contentEditable', true);
                }
            }
            if (s.focusManager.hasFocus) {
                s.toolbox.focus();
                s.focus();
            }
        };
        function r(s) {
            if (!c || b.version > 6)return null;
            var t = h.createFromHtml('<iframe frameborder="0" tabindex="-1" src="javascript:void((function(){document.open();' + (b.isCustomDomain() ? "document.domain='" + this.getDocument().$.domain + "';" : '') + 'document.close();' + '})())"' + ' style="display:block;position:absolute;z-index:-1;' + 'progid:DXImageTransform.Microsoft.Alpha(opacity=0);' + '"></iframe>');
            return s.append(t, true);
        };
        j.add('maximize', {init: function (s) {
            var t = s.lang, u = a.document, v = u.getWindow(), w, x, y, z;

            function A() {
                var C = v.getViewPaneSize();
                z && z.setStyles({width: C.width + 'px', height: C.height + 'px'});
                s.resize(C.width, C.height, null, true);
            };
            var B = 2;
            s.addCommand('maximize', {modes: {wysiwyg: !b.iOS, source: !b.iOS}, readOnly: 1, editorFocus: false, exec: function () {
                var C = s.container.getChild(1), D = s.getThemeSpace('contents');
                if (s.mode == 'wysiwyg') {
                    var E = s.getSelection();
                    w = E && E.getRanges();
                    x = v.getScrollPosition();
                } else {
                    var F = s.textarea.$;
                    w = !c && [F.selectionStart, F.selectionEnd];
                    x = [F.scrollLeft, F.scrollTop];
                }
                if (this.state == 2) {
                    v.on('resize', A);
                    y = v.getScrollPosition();
                    var G = s.container;
                    while (G = G.getParent()) {
                        G.setCustomData('maximize_saved_styles', o(G));
                        G.setStyle('z-index', s.config.baseFloatZIndex - 1);
                    }
                    D.setCustomData('maximize_saved_styles', o(D, true));
                    C.setCustomData('maximize_saved_styles', o(C, true));
                    var H = {overflow: b.webkit ? '' : 'hidden', width: 0, height: 0};
                    u.getDocumentElement().setStyles(H);
                    !b.gecko && u.getDocumentElement().setStyle('position', 'fixed');
                    !(b.gecko && b.quirks) && u.getBody().setStyles(H);
                    c ? setTimeout(function () {
                        v.$.scrollTo(0, 0);
                    }, 0) : v.$.scrollTo(0, 0);
                    C.setStyle('position', b.gecko && b.quirks ? 'fixed' : 'absolute');
                    C.$.offsetLeft;
                    C.setStyles({'z-index': s.config.baseFloatZIndex - 1, left: '0px', top: '0px'});
                    z = r(C);
                    C.addClass('cke_maximized');
                    A();
                    var I = C.getDocumentPosition();
                    C.setStyles({left: -1 * I.x + 'px', top: -1 * I.y + 'px'});
                    b.gecko && q(s);
                } else if (this.state == 1) {
                    v.removeListener('resize', A);
                    var J = [D, C];
                    for (var K = 0; K < J.length; K++) {
                        p(J[K], J[K].getCustomData('maximize_saved_styles'));
                        J[K].removeCustomData('maximize_saved_styles');
                    }
                    G = s.container;
                    while (G = G.getParent()) {
                        p(G, G.getCustomData('maximize_saved_styles'));
                        G.removeCustomData('maximize_saved_styles');
                    }
                    c ? setTimeout(function () {
                        v.$.scrollTo(y.x, y.y);
                    }, 0) : v.$.scrollTo(y.x, y.y);
                    C.removeClass('cke_maximized');
                    if (b.webkit) {
                        C.setStyle('display', 'inline');
                        setTimeout(function () {
                            C.setStyle('display', 'block');
                        }, 0);
                    }
                    if (z) {
                        z.remove();
                        z = null;
                    }
                    s.fire('resize');
                }
                this.toggleState();
                var L = this.uiItems[0];
                if (L) {
                    var M = this.state == 2 ? t.maximize : t.minimize, N = s.element.getDocument().getById(L._.id);
                    N.getChild(1).setHtml(M);
                    N.setAttribute('title', M);
                    N.setAttribute('href', 'javascript:void("' + M + '");');
                }
                if (s.mode == 'wysiwyg') {
                    if (w) {
                        b.gecko && q(s);
                        s.getSelection().selectRanges(w);
                        var O = s.getSelection().getStartElement();
                        O && O.scrollIntoView(true);
                    } else v.$.scrollTo(x.x, x.y);
                } else {
                    if (w) {
                        F.selectionStart = w[0];
                        F.selectionEnd = w[1];
                    }
                    F.scrollLeft = x[0];
                    F.scrollTop = x[1];
                }
                w = x = null;
                B = this.state;
            }, canUndo: false});
            s.ui.addButton('Maximize', {label: t.maximize, command: 'maximize'});
            s.on('mode', function () {
                var C = s.getCommand('maximize');
                C.setState(C.state == 0 ? 0 : B);
            }, null, null, 100);
        }});
    })();
    j.add('newpage', {init: function (m) {
        m.addCommand('newpage', {modes: {wysiwyg: 1, source: 1}, exec: function (n) {
            var o = this;
            n.setData(n.config.newpage_html || '', function () {
                setTimeout(function () {
                    n.fire('afterCommandExec', {name: o.name, command: o});
                    n.selectionChange();
                }, 200);
            });
            n.focus();
        }, async: true});
        m.ui.addButton('NewPage', {label: m.lang.newPage, command: 'newpage'});
    }});
    j.add('pagebreak', {init: function (m) {
        m.addCommand('pagebreak', j.pagebreakCmd);
        m.ui.addButton('PageBreak', {label: m.lang.pagebreak, command: 'pagebreak'});
        var n = ['{', 'background: url(' + a.getUrl(this.path + 'images/pagebreak.gif') + ') no-repeat center center;', 'clear: both;', 'width:100%; _width:99.9%;', 'border-top: #999999 1px dotted;', 'border-bottom: #999999 1px dotted;', 'padding:0;', 'height: 5px;', 'cursor: default;', '}'].join('').replace(/;/g, ' !important;');
        m.addCss('div.cke_pagebreak' + n);
        b.opera && m.on('contentDom', function () {
            m.document.on('click', function (o) {
                var p = o.data.getTarget();
                if (p.is('div') && p.hasClass('cke_pagebreak'))m.getSelection().selectElement(p);
            });
        });
    }, afterInit: function (m) {
        var n = m.lang.pagebreakAlt, o = m.dataProcessor, p = o && o.dataFilter, q = o && o.htmlFilter;
        if (q)q.addRules({attributes: {'class': function (r, s) {
            var t = r.replace('cke_pagebreak', '');
            if (t != r) {
                var u = a.htmlParser.fragment.fromHtml('<span style="display: none;">&nbsp;</span>');
                s.children.length = 0;
                s.add(u);
                var v = s.attributes;
                delete v['aria-label'];
                delete v.contenteditable;
                delete v.title;
            }
            return t;
        }}}, 5);
        if (p)p.addRules({elements: {div: function (r) {
            var s = r.attributes, t = s && s.style, u = t && r.children.length == 1 && r.children[0], v = u && u.name == 'span' && u.attributes.style;
            if (v && /page-break-after\s*:\s*always/i.test(t) && /display\s*:\s*none/i.test(v)) {
                s.contenteditable = 'false';
                s['class'] = 'cke_pagebreak';
                s['data-cke-display-name'] = 'pagebreak';
                s['aria-label'] = n;
                s.title = n;
                r.children.length = 0;
            }
        }}});
    }, requires: ['fakeobjects']});
    j.pagebreakCmd = {exec: function (m) {
        var n = m.lang.pagebreakAlt, o = h.createFromHtml('<div style="page-break-after: always;"contenteditable="false" title="' + n + '" ' + 'aria-label="' + n + '" ' + 'data-cke-display-name="pagebreak" ' + 'class="cke_pagebreak">' + '</div>', m.document), p = m.getSelection().getRanges(true);
        m.fire('saveSnapshot');
        for (var q, r = p.length - 1; r >= 0; r--) {
            q = p[r];
            if (r < p.length - 1)o = o.clone(true);
            q.splitBlock('p');
            q.insertNode(o);
            if (r == p.length - 1) {
                var s = o.getNext();
                q.moveToPosition(o, 4);
                if (!s || s.type == 1 && !s.isEditable())q.fixBlock(true, m.config.enterMode == 3 ? 'div' : 'p');
                q.select();
            }
        }
        m.fire('saveSnapshot');
    }};
    (function () {
        function m(n) {
            n.data.mode = 'html';
        };
        j.add('pastefromword', {init: function (n) {
            var o = 0, p = function (q) {
                q && q.removeListener();
                n.removeListener('beforePaste', m);
                o && setTimeout(function () {
                    o = 0;
                }, 0);
            };
            n.addCommand('pastefromword', {canUndo: false, exec: function () {
                o = 1;
                n.on('beforePaste', m);
                if (n.execCommand('paste', 'html') === false) {
                    n.on('dialogShow', function (q) {
                        q.removeListener();
                        q.data.on('cancel', p);
                    });
                    n.on('dialogHide', function (q) {
                        q.data.removeListener('cancel', p);
                    });
                }
                n.on('afterPaste', p);
            }});
            n.ui.addButton('PasteFromWord', {label: n.lang.pastefromword.toolbar, command: 'pastefromword'});
            n.on('pasteState', function (q) {
                n.getCommand('pastefromword').setState(q.data);
            });
            n.on('paste', function (q) {
                var r = q.data, s;
                if ((s = r.html) && (o || /(class=\"?Mso|style=\"[^\"]*\bmso\-|w:WordDocument)/.test(s))) {
                    var t = this.loadFilterRules(function () {
                        if (t)n.fire('paste', r); else if (!n.config.pasteFromWordPromptCleanup || o || confirm(n.lang.pastefromword.confirmCleanup))r.html = a.cleanWord(s, n);
                    });
                    t && q.cancel();
                }
            }, this);
        }, loadFilterRules: function (n) {
            var o = a.cleanWord;
            if (o)n(); else {
                var p = a.getUrl(i.pasteFromWordCleanupFile || this.path + 'filter/default.js');
                a.scriptLoader.load(p, n, null, true);
            }
            return!o;
        }, requires: ['clipboard']});
    })();
    (function () {
        var m = {exec: function (n) {
            var o = e.tryThese(function () {
                var p = window.clipboardData.getData('Text');
                if (!p)throw 0;
                return p;
            });
            if (!o) {
                n.openDialog('pastetext');
                return false;
            } else n.fire('paste', {text: o});
            return true;
        }};
        j.add('pastetext', {init: function (n) {
            var o = 'pastetext', p = n.addCommand(o, m);
            n.ui.addButton('PasteText', {label: n.lang.pasteText.button, command: o});
            a.dialog.add(o, a.getUrl(this.path + 'dialogs/pastetext.js'));
            if (n.config.forcePasteAsPlainText) {
                n.on('beforeCommandExec', function (q) {
                    var r = q.data.commandData;
                    if (q.data.name == 'paste' && r != 'html') {
                        n.execCommand('pastetext');
                        q.cancel();
                    }
                }, null, null, 0);
                n.on('beforePaste', function (q) {
                    q.data.mode = 'text';
                });
            }
            n.on('pasteState', function (q) {
                n.getCommand('pastetext').setState(q.data);
            });
        }, requires: ['clipboard']});
    })();
    j.add('popup');
    e.extend(a.editor.prototype, {popup: function (m, n, o, p) {
        n = n || '80%';
        o = o || '70%';
        if (typeof n == 'string' && n.length > 1 && n.substr(n.length - 1, 1) == '%')n = parseInt(window.screen.width * parseInt(n, 10) / 100, 10);
        if (typeof o == 'string' && o.length > 1 && o.substr(o.length - 1, 1) == '%')o = parseInt(window.screen.height * parseInt(o, 10) / 100, 10);
        if (n < 640)n = 640;
        if (o < 420)o = 420;
        var q = parseInt((window.screen.height - o) / 2, 10), r = parseInt((window.screen.width - n) / 2, 10);
        p = (p || 'location=no,menubar=no,toolbar=no,dependent=yes,minimizable=no,modal=yes,alwaysRaised=yes,resizable=yes,scrollbars=yes') + ',width=' + n + ',height=' + o + ',top=' + q + ',left=' + r;
        var s = window.open('', null, p, true);
        if (!s)return false;
        try {
            s.moveTo(r, q);
            s.resizeTo(n, o);
            s.focus();
            s.location.href = m;
        } catch (t) {
            s = window.open(m, null, p, true);
        }
        return true;
    }});
    (function () {
        var m = {modes: {wysiwyg: 1, source: 1}, canUndo: false, readOnly: 1, exec: function (o) {
            var p, q = o.config, r = q.baseHref ? '<base href="' + q.baseHref + '"/>' : '', s = b.isCustomDomain();
            if (q.fullPage)p = o.getData().replace(/<head>/, '$&' + r).replace(/[^>]*(?=<\/title>)/, '$& &mdash; ' + o.lang.preview);
            else {
                var t = '<body ', u = o.document && o.document.getBody();
                if (u) {
                    if (u.getAttribute('id'))t += 'id="' + u.getAttribute('id') + '" ';
                    if (u.getAttribute('class'))t += 'class="' + u.getAttribute('class') + '" ';
                }
                t += '>';
                p = o.config.docType + '<html dir="' + o.config.contentsLangDirection + '">' + '<head>' + r + '<title>' + o.lang.preview + '</title>' + e.buildStyleHtml(o.config.contentsCss) + '</head>' + t + o.getData() + '</body></html>';
            }
            var v = 640, w = 420, x = 80;
            try {
                var y = window.screen;
                v = Math.round(y.width * 0.8);
                w = Math.round(y.height * 0.7);
                x = Math.round(y.width * 0.1);
            } catch (C) {
            }
            var z = '';
            if (s) {
                window._cke_htmlToLoad = p;
                z = 'javascript:void( (function(){document.open();document.domain="' + document.domain + '";' + 'document.write( window.opener._cke_htmlToLoad );' + 'document.close();' + 'window.opener._cke_htmlToLoad = null;' + '})() )';
            }
            var A = window.open(z, null, 'toolbar=yes,location=no,status=yes,menubar=yes,scrollbars=yes,resizable=yes,width=' + v + ',height=' + w + ',left=' + x);
            if (!s) {
                var B = A.document;
                B.open();
                B.write(p);
                B.close();
                b.webkit && setTimeout(function () {
                    B.body.innerHTML += '';
                }, 0);
            }
        }}, n = 'preview';
        j.add(n, {init: function (o) {
            o.addCommand(n, m);
            o.ui.addButton('Preview', {label: o.lang.preview, command: n});
        }});
    })();
    j.add('print', {init: function (m) {
        var n = 'print', o = m.addCommand(n, j.print);
        m.ui.addButton('Print', {label: m.lang.print, command: n});
    }});
    j.print = {exec: function (m) {
        if (b.opera)return; else if (b.gecko)m.window.$.print(); else m.document.$.execCommand('Print');
    }, canUndo: false, readOnly: 1, modes: {wysiwyg: !b.opera}};
    j.add('removeformat', {requires: ['selection'], init: function (m) {
        m.addCommand('removeFormat', j.removeformat.commands.removeformat);
        m.ui.addButton('RemoveFormat', {label: m.lang.removeFormat, command: 'removeFormat'});
        m._.removeFormat = {filters: []};
    }});
    j.removeformat = {commands: {removeformat: {exec: function (m) {
        var n = m._.removeFormatRegex || (m._.removeFormatRegex = new RegExp('^(?:' + m.config.removeFormatTags.replace(/,/g, '|') + ')$', 'i')), o = m._.removeAttributes || (m._.removeAttributes = m.config.removeFormatAttributes.split(',')), p = j.removeformat.filter, q = m.getSelection().getRanges(1), r = q.createIterator(), s;
        while (s = r.getNextRange()) {
            if (!s.collapsed)s.enlarge(1);
            var t = s.createBookmark(), u = t.startNode, v = t.endNode, w, x = function (z) {
                var A = new d.elementPath(z), B = A.elements;
                for (var C = 1, D; D = B[C]; C++) {
                    if (D.equals(A.block) || D.equals(A.blockLimit))break;
                    if (n.test(D.getName()) && p(m, D))z.breakParent(D);
                }
            };
            x(u);
            if (v) {
                x(v);
                w = u.getNextSourceNode(true, 1);
                while (w) {
                    if (w.equals(v))break;
                    var y = w.getNextSourceNode(false, 1);
                    if (!(w.getName() == 'img' && w.data('cke-realelement')) && p(m, w))if (n.test(w.getName()))w.remove(1);
                    else {
                        w.removeAttributes(o);
                        m.fire('removeFormatCleanup', w);
                    }
                    w = y;
                }
            }
            s.moveToBookmark(t);
        }
        m.getSelection().selectRanges(q);
    }}}, filter: function (m, n) {
        var o = m._.removeFormat.filters;
        for (var p = 0; p < o.length; p++) {
            if (o[p](n) === false)return false;
        }
        return true;
    }};
    a.editor.prototype.addRemoveFormatFilter = function (m) {
        this._.removeFormat.filters.push(m);
    };
    i.removeFormatTags = 'b,big,code,del,dfn,em,font,i,ins,kbd,q,samp,small,span,strike,strong,sub,sup,tt,u,var';
    i.removeFormatAttributes = 'class,style,lang,width,height,align,hspace,valign';
    j.add('resize', {init: function (m) {
        var n = m.config, o = m.element.getDirection(1);
        !n.resize_dir && (n.resize_dir = 'both');
        n.resize_maxWidth == undefined && (n.resize_maxWidth = 3000);
        n.resize_maxHeight == undefined && (n.resize_maxHeight = 3000);
        n.resize_minWidth == undefined && (n.resize_minWidth = 750);
        n.resize_minHeight == undefined && (n.resize_minHeight = 250);
        if (n.resize_enabled !== false) {
            var p = null, q, r, s = (n.resize_dir == 'both' || n.resize_dir == 'horizontal') && n.resize_minWidth != n.resize_maxWidth, t = (n.resize_dir == 'both' || n.resize_dir == 'vertical') && n.resize_minHeight != n.resize_maxHeight;

            function u(x) {
                var y = x.data.$.screenX - q.x, z = x.data.$.screenY - q.y, A = r.width, B = r.height, C = A + y * (o == 'rtl' ? -1 : 1), D = B + z;
                if (s)A = Math.max(n.resize_minWidth, Math.min(C, n.resize_maxWidth));
                if (t)B = Math.max(n.resize_minHeight, Math.min(D, n.resize_maxHeight));
                m.resize(A, B);
            };
            function v(x) {
                a.document.removeListener('mousemove', u);
                a.document.removeListener('mouseup', v);
                if (m.document) {
                    m.document.removeListener('mousemove', u);
                    m.document.removeListener('mouseup', v);
                }
            };
            var w = e.addFunction(function (x) {
                if (!p)p = m.getResizable();
                r = {width: p.$.offsetWidth || 0, height: p.$.offsetHeight || 0};
                q = {x: x.screenX, y: x.screenY};
                n.resize_minWidth > r.width && (n.resize_minWidth = r.width);
                n.resize_minHeight > r.height && (n.resize_minHeight = r.height);
                a.document.on('mousemove', u);
                a.document.on('mouseup', v);
                if (m.document) {
                    m.document.on('mousemove', u);
                    m.document.on('mouseup', v);
                }
            });
            m.on('destroy', function () {
                e.removeFunction(w);
            });
            m.on('themeSpace', function (x) {
                if (x.data.space == 'bottom') {
                    var y = '';
                    if (s && !t)y = ' cke_resizer_horizontal';
                    if (!s && t)y = ' cke_resizer_vertical';
                    var z = '<div class="cke_resizer' + y + ' cke_resizer_' + o + '"' + ' title="' + e.htmlEncode(m.lang.resize) + '"' + ' onmousedown="CKEDITOR.tools.callFunction(' + w + ', event)"' + '></div>';
                    o == 'ltr' && y == 'ltr' ? x.data.html += z : x.data.html = z + x.data.html;
                }
            }, m, null, 100);
        }
    }});
    (function () {
        var m = {modes: {wysiwyg: 1, source: 1}, readOnly: 1, exec: function (o) {
            var p = o.element.$.form;
            if (p)try {
                p.submit();
            } catch (q) {
                if (p.submit.click)p.submit.click();
            }
        }}, n = 'save';
        j.add(n, {init: function (o) {
            var p = o.addCommand(n, m);
            p.modes = {wysiwyg: !!o.element.$.form};
            o.ui.addButton('Save', {label: o.lang.save, command: n});
        }});
    })();
    (function () {
        var m = 'scaytcheck', n = '';

        function o(t, u) {
            var v = 0, w;
            for (w in u) {
                if (u[w] == t) {
                    v = 1;
                    break;
                }
            }
            return v;
        };
        var p = function () {
            var t = this, u = function () {
                var y = t.config, z = {};
                z.srcNodeRef = t.document.getWindow().$.frameElement;
                z.assocApp = 'CKEDITOR.' + a.version + '@' + a.revision;
                z.customerid = y.scayt_customerid || '1:WvF0D4-UtPqN1-43nkD4-NKvUm2-daQqk3-LmNiI-z7Ysb4-mwry24-T8YrS3-Q2tpq2';
                z.customDictionaryIds = y.scayt_customDictionaryIds || '';
                z.userDictionaryName = y.scayt_userDictionaryName || '';
                z.sLang = y.scayt_sLang || 'en_US';
                z.onLoad = function () {
                    if (!(c && b.version < 8))this.addStyle(this.selectorCss(), 'padding-bottom: 2px !important;');
                    if (t.focusManager.hasFocus && !q.isControlRestored(t))this.focus();
                };
                z.onBeforeChange = function () {
                    if (q.getScayt(t) && !t.checkDirty())setTimeout(function () {
                        t.resetDirty();
                    }, 0);
                };
                var A = window.scayt_custom_params;
                if (typeof A == 'object')for (var B in A)z[B] = A[B];
                if (q.getControlId(t))z.id = q.getControlId(t);
                var C = new window.scayt(z);
                C.afterMarkupRemove.push(function (E) {
                    new h(E, C.document).mergeSiblings();
                });
                var D = q.instances[t.name];
                if (D) {
                    C.sLang = D.sLang;
                    C.option(D.option());
                    C.paused = D.paused;
                }
                q.instances[t.name] = C;
                try {
                    C.setDisabled(q.isPaused(t) === false);
                } catch (E) {
                }
                t.fire('showScaytState');
            };
            t.on('contentDom', u);
            t.on('contentDomUnload', function () {
                var y = a.document.getElementsByTag('script'), z = /^dojoIoScript(\d+)$/i, A = /^https?:\/\/svc\.webspellchecker\.net\/spellcheck\/script\/ssrv\.cgi/i;
                for (var B = 0; B < y.count(); B++) {
                    var C = y.getItem(B), D = C.getId(), E = C.getAttribute('src');
                    if (D && E && D.match(z) && E.match(A))C.remove();
                }
            });
            t.on('beforeCommandExec', function (y) {
                if ((y.data.name == 'source' || y.data.name == 'newpage') && t.mode == 'wysiwyg') {
                    var z = q.getScayt(t);
                    if (z) {
                        q.setPaused(t, !z.disabled);
                        q.setControlId(t, z.id);
                        z.destroy(true);
                        delete q.instances[t.name];
                    }
                } else if (y.data.name == 'source' && t.mode == 'source')q.markControlRestore(t);
            });
            t.on('afterCommandExec', function (y) {
                if (!q.isScaytEnabled(t))return;
                if (t.mode == 'wysiwyg' && (y.data.name == 'undo' || y.data.name == 'redo'))window.setTimeout(function () {
                    q.getScayt(t).refresh();
                }, 10);
            });
            t.on('destroy', function (y) {
                var z = y.editor, A = q.getScayt(z);
                if (!A)return;
                delete q.instances[z.name];
                q.setControlId(z, A.id);
                A.destroy(true);
            });
            t.on('afterSetData', function () {
                if (q.isScaytEnabled(t))window.setTimeout(function () {
                    var y = q.getScayt(t);
                    y && y.refresh();
                }, 10);
            });
            t.on('insertElement', function () {
                var y = q.getScayt(t);
                if (q.isScaytEnabled(t)) {
                    if (c)t.getSelection().unlock(true);
                    window.setTimeout(function () {
                        y.focus();
                        y.refresh();
                    }, 10);
                }
            }, this, null, 50);
            t.on('insertHtml', function () {
                var y = q.getScayt(t);
                if (q.isScaytEnabled(t)) {
                    if (c)t.getSelection().unlock(true);
                    window.setTimeout(function () {
                        y.focus();
                        y.refresh();
                    }, 10);
                }
            }, this, null, 50);
            t.on('scaytDialog', function (y) {
                y.data.djConfig = window.djConfig;
                y.data.scayt_control = q.getScayt(t);
                y.data.tab = n;
                y.data.scayt = window.scayt;
            });
            var v = t.dataProcessor, w = v && v.htmlFilter;
            if (w)w.addRules({elements: {span: function (y) {
                if (y.attributes['data-scayt_word'] && y.attributes['data-scaytid']) {
                    delete y.name;
                    return y;
                }
            }}});
            var x = j.undo.Image.prototype;
            x.equals = e.override(x.equals, function (y) {
                return function (z) {
                    var E = this;
                    var A = E.contents, B = z.contents, C = q.getScayt(E.editor);
                    if (C && q.isScaytReady(E.editor)) {
                        E.contents = C.reset(A) || '';
                        z.contents = C.reset(B) || '';
                    }
                    var D = y.apply(E, arguments);
                    E.contents = A;
                    z.contents = B;
                    return D;
                };
            });
            if (t.document)u();
        };
        j.scayt = {engineLoaded: false, instances: {}, controlInfo: {}, setControlInfo: function (t, u) {
            if (t && t.name && typeof this.controlInfo[t.name] != 'object')this.controlInfo[t.name] = {};
            for (var v in u)this.controlInfo[t.name][v] = u[v];
        }, isControlRestored: function (t) {
            if (t && t.name && this.controlInfo[t.name])return this.controlInfo[t.name].restored;
            return false;
        }, markControlRestore: function (t) {
            this.setControlInfo(t, {restored: true});
        }, setControlId: function (t, u) {
            this.setControlInfo(t, {id: u});
        }, getControlId: function (t) {
            if (t && t.name && this.controlInfo[t.name] && this.controlInfo[t.name].id)return this.controlInfo[t.name].id;
            return null;
        }, setPaused: function (t, u) {
            this.setControlInfo(t, {paused: u});
        }, isPaused: function (t) {
            if (t && t.name && this.controlInfo[t.name])return this.controlInfo[t.name].paused;
            return undefined;
        }, getScayt: function (t) {
            return this.instances[t.name];
        }, isScaytReady: function (t) {
            return this.engineLoaded === true && 'undefined' !== typeof window.scayt && this.getScayt(t);
        }, isScaytEnabled: function (t) {
            var u = this.getScayt(t);
            return u ? u.disabled === false : false;
        }, getUiTabs: function (t) {
            var u = [], v = t.config.scayt_uiTabs || '1,1,1';
            v = v.split(',');
            v[3] = '1';
            for (var w = 0; w < 4; w++)u[w] = typeof window.scayt != 'undefined' && typeof window.scayt.uiTags != 'undefined' ? parseInt(v[w], 10) && window.scayt.uiTags[w] : parseInt(v[w], 10);
            return u;
        }, loadEngine: function (t) {
            if (b.gecko && b.version < 10900 || b.opera || b.air)return t.fire('showScaytState');
            if (this.engineLoaded === true)return p.apply(t); else if (this.engineLoaded == -1)return a.on('scaytReady', function () {
                p.apply(t);
            });
            a.on('scaytReady', p, t);
            a.on('scaytReady', function () {
                this.engineLoaded = true;
            }, this, null, 0);
            this.engineLoaded = -1;
            var u = document.location.protocol;
            u = u.search(/https?:/) != -1 ? u : 'http:';
            var v = 'svc.webspellchecker.net/scayt26/loader__base.js', w = t.config.scayt_srcUrl || u + '//' + v, x = q.parseUrl(w).path + '/';
            if (window.scayt == undefined) {
                a._djScaytConfig = {baseUrl: x, addOnLoad: [function () {
                    a.fireOnce('scaytReady');
                }], isDebug: false};
                a.document.getHead().append(a.document.createElement('script', {attributes: {type: 'text/javascript', async: 'true', src: w}}));
            } else a.fireOnce('scaytReady');
            return null;
        }, parseUrl: function (t) {
            var u;
            if (t.match && (u = t.match(/(.*)[\/\\](.*?\.\w+)$/)))return{path: u[1], file: u[2]}; else return t;
        }};
        var q = j.scayt, r = function (t, u, v, w, x, y, z) {
            t.addCommand(w, x);
            t.addMenuItem(w, {label: v, command: w, group: y, order: z});
        }, s = {preserveState: true, editorFocus: false, canUndo: false, exec: function (t) {
            if (q.isScaytReady(t)) {
                var u = q.isScaytEnabled(t);
                this.setState(u ? 2 : 1);
                var v = q.getScayt(t);
                v.focus();
                v.setDisabled(u);
            } else if (!t.config.scayt_autoStartup && q.engineLoaded >= 0) {
                this.setState(0);
                q.loadEngine(t);
            }
        }};
        j.add('scayt', {requires: ['menubutton'], beforeInit: function (t) {
            var u = t.config.scayt_contextMenuItemsOrder || 'suggest|moresuggest|control', v = '';
            u = u.split('|');
            if (u && u.length)for (var w = 0; w < u.length; w++)v += 'scayt_' + u[w] + (u.length != parseInt(w, 10) + 1 ? ',' : '');
            t.config.menu_groups = v + ',' + t.config.menu_groups;
        }, init: function (t) {
            var u = t.dataProcessor && t.dataProcessor.dataFilter, v = {elements: {span: function (E) {
                var F = E.attributes;
                if (F && F['data-scaytid'])delete E.name;
            }}};
            u && u.addRules(v);
            var w = {}, x = {}, y = t.addCommand(m, s);
            a.dialog.add(m, a.getUrl(this.path + 'dialogs/options.js'));
            var z = q.getUiTabs(t), A = 'scaytButton';
            t.addMenuGroup(A);
            var B = {}, C = t.lang.scayt;
            B.scaytToggle = {label: C.enable, command: m, group: A};
            if (z[0] == 1)B.scaytOptions = {label: C.options, group: A, onClick: function () {
                n = 'options';
                t.openDialog(m);
            }};
            if (z[1] == 1)B.scaytLangs = {label: C.langs, group: A, onClick: function () {
                n = 'langs';
                t.openDialog(m);
            }};
            if (z[2] == 1)B.scaytDict = {label: C.dictionariesTab, group: A, onClick: function () {
                n = 'dictionaries';
                t.openDialog(m);
            }};
            B.scaytAbout = {label: t.lang.scayt.about, group: A, onClick: function () {
                n = 'about';
                t.openDialog(m);
            }};
            t.addMenuItems(B);
            t.ui.add('Scayt', 'menubutton', {label: C.title, title: b.opera ? C.opera_title : C.title, className: 'cke_button_scayt', modes: {wysiwyg: 1}, onRender: function () {
                y.on('state', function () {
                    this.setState(y.state);
                }, this);
            }, onMenu: function () {
                var E = q.isScaytEnabled(t);
                t.getMenuItem('scaytToggle').label = C[E ? 'disable' : 'enable'];
                var F = q.getUiTabs(t);
                return{scaytToggle: 2, scaytOptions: E && F[0] ? 2 : 0, scaytLangs: E && F[1] ? 2 : 0, scaytDict: E && F[2] ? 2 : 0, scaytAbout: E && F[3] ? 2 : 0};
            }});
            if (t.contextMenu && t.addMenuItems)t.contextMenu.addListener(function (E, F) {
                if (!q.isScaytEnabled(t) || F.getRanges()[0].checkReadOnly())return null;
                var G = q.getScayt(t), H = G.getScaytNode();
                if (!H)return null;
                var I = G.getWord(H);
                if (!I)return null;
                var J = G.getLang(), K = {}, L = window.scayt.getSuggestion(I, J);
                if (!L || !L.length)return null;
                for (var M in w) {
                    delete t._.menuItems[M];
                    delete t._.commands[M];
                }
                for (M in x) {
                    delete t._.menuItems[M];
                    delete t._.commands[M];
                }
                w = {};
                x = {};
                var N = t.config.scayt_moreSuggestions || 'on', O = false, P = t.config.scayt_maxSuggestions;
                typeof P != 'number' && (P = 5);
                !P && (P = L.length);
                var Q = t.config.scayt_contextCommands || 'all';
                Q = Q.split('|');
                for (var R = 0, S = L.length; R < S; R += 1) {
                    var T = 'scayt_suggestion_' + L[R].replace(' ', '_'), U = (function (Y, Z) {
                        return{exec: function () {
                            G.replace(Y, Z);
                        }};
                    })(H, L[R]);
                    if (R < P) {
                        r(t, 'button_' + T, L[R], T, U, 'scayt_suggest', R + 1);
                        K[T] = 2;
                        x[T] = 2;
                    } else if (N == 'on') {
                        r(t, 'button_' + T, L[R], T, U, 'scayt_moresuggest', R + 1);
                        w[T] = 2;
                        O = true;
                    }
                }
                if (O) {
                    t.addMenuItem('scayt_moresuggest', {label: C.moreSuggestions, group: 'scayt_moresuggest', order: 10, getItems: function () {
                        return w;
                    }});
                    x.scayt_moresuggest = 2;
                }
                if (o('all', Q) || o('ignore', Q)) {
                    var V = {exec: function () {
                        G.ignore(H);
                    }};
                    r(t, 'ignore', C.ignore, 'scayt_ignore', V, 'scayt_control', 1);
                    x.scayt_ignore = 2;
                }
                if (o('all', Q) || o('ignoreall', Q)) {
                    var W = {exec: function () {
                        G.ignoreAll(H);
                    }};
                    r(t, 'ignore_all', C.ignoreAll, 'scayt_ignore_all', W, 'scayt_control', 2);
                    x.scayt_ignore_all = 2;
                }
                if (o('all', Q) || o('add', Q)) {
                    var X = {exec: function () {
                        window.scayt.addWordToUserDictionary(H);
                    }};
                    r(t, 'add_word', C.addWord, 'scayt_add_word', X, 'scayt_control', 3);
                    x.scayt_add_word = 2;
                }
                if (G.fireOnContextMenu)G.fireOnContextMenu(t);
                return x;
            });
            var D = function () {
                t.removeListener('showScaytState', D);
                if (!b.opera && !b.air)y.setState(q.isScaytEnabled(t) ? 1 : 2); else y.setState(0);
            };
            t.on('showScaytState', D);
            if (b.opera || b.air)t.on('instanceReady', function () {
                D();
            });
            if (t.config.scayt_autoStartup)t.on('instanceReady', function () {
                q.loadEngine(t);
            });
        }, afterInit: function (t) {
            var u, v = function (w) {
                if (w.hasAttribute('data-scaytid'))return false;
            };
            if (t._.elementsPath && (u = t._.elementsPath.filters))u.push(v);
            t.addRemoveFormatFilter && t.addRemoveFormatFilter(v);
        }});
    })();
    j.add('smiley', {requires: ['dialog'], init: function (m) {
        m.config.smiley_path = m.config.smiley_path || this.path + 'images/';
        m.addCommand('smiley', new a.dialogCommand('smiley'));
        m.ui.addButton('Smiley', {label: m.lang.smiley.toolbar, command: 'smiley'});
        a.dialog.add('smiley', this.path + 'dialogs/smiley.js');
    }});
    i.smiley_images = ['regular_smile.gif', 'sad_smile.gif', 'wink_smile.gif', 'teeth_smile.gif', 'confused_smile.gif', 'tounge_smile.gif', 'embaressed_smile.gif', 'omg_smile.gif', 'whatchutalkingabout_smile.gif', 'angry_smile.gif', 'angel_smile.gif', 'shades_smile.gif', 'devil_smile.gif', 'cry_smile.gif', 'lightbulb.gif', 'thumbs_down.gif', 'thumbs_up.gif', 'heart.gif', 'broken_heart.gif', 'kiss.gif', 'envelope.gif'];
    i.smiley_descriptions = ['smiley', 'sad', 'wink', 'laugh', 'frown', 'cheeky', 'blush', 'surprise', 'indecision', 'angry', 'angel', 'cool', 'devil', 'crying', 'enlightened', 'no', 'yes', 'heart', 'broken heart', 'kiss', 'mail'];
    (function () {
        var m = '.%2 p,.%2 div,.%2 pre,.%2 address,.%2 blockquote,.%2 h1,.%2 h2,.%2 h3,.%2 h4,.%2 h5,.%2 h6{background-repeat: no-repeat;background-position: top %3;border: 1px dotted gray;padding-top: 8px;padding-%3: 8px;}.%2 p{%1p.png);}.%2 div{%1div.png);}.%2 pre{%1pre.png);}.%2 address{%1address.png);}.%2 blockquote{%1blockquote.png);}.%2 h1{%1h1.png);}.%2 h2{%1h2.png);}.%2 h3{%1h3.png);}.%2 h4{%1h4.png);}.%2 h5{%1h5.png);}.%2 h6{%1h6.png);}', n = /%1/g, o = /%2/g, p = /%3/g, q = {readOnly: 1, preserveState: true, editorFocus: false, exec: function (r) {
            this.toggleState();
            this.refresh(r);
        }, refresh: function (r) {
            if (r.document) {
                var s = this.state == 1 ? 'addClass' : 'removeClass';
                r.document.getBody()[s]('cke_show_blocks');
            }
        }};
        j.add('showblocks', {requires: ['wysiwygarea'], init: function (r) {
            var s = r.addCommand('showblocks', q);
            s.canUndo = false;
            if (r.config.startupOutlineBlocks)s.setState(1);
            r.addCss(m.replace(n, 'background-image: url(' + a.getUrl(this.path) + 'images/block_').replace(o, 'cke_show_blocks ').replace(p, r.lang.dir == 'rtl' ? 'right' : 'left'));
            r.ui.addButton('ShowBlocks', {label: r.lang.showBlocks, command: 'showblocks'});
            r.on('mode', function () {
                if (s.state != 0)s.refresh(r);
            });
            r.on('contentDom', function () {
                if (s.state != 0)s.refresh(r);
            });
        }});
    })();
    (function () {
        var m = 'cke_show_border', n, o = (b.ie6Compat ? ['.%1 table.%2,', '.%1 table.%2 td, .%1 table.%2 th', '{', 'border : #d3d3d3 1px dotted', '}'] : ['.%1 table.%2,', '.%1 table.%2 > tr > td, .%1 table.%2 > tr > th,', '.%1 table.%2 > tbody > tr > td, .%1 table.%2 > tbody > tr > th,', '.%1 table.%2 > thead > tr > td, .%1 table.%2 > thead > tr > th,', '.%1 table.%2 > tfoot > tr > td, .%1 table.%2 > tfoot > tr > th', '{', 'border : #d3d3d3 1px dotted', '}']).join('');
        n = o.replace(/%2/g, m).replace(/%1/g, 'cke_show_borders ');
        var p = {preserveState: true, editorFocus: false, readOnly: 1, exec: function (q) {
            this.toggleState();
            this.refresh(q);
        }, refresh: function (q) {
            if (q.document) {
                var r = this.state == 1 ? 'addClass' : 'removeClass';
                q.document.getBody()[r]('cke_show_borders');
            }
        }};
        j.add('showborders', {requires: ['wysiwygarea'], modes: {wysiwyg: 1}, init: function (q) {
            var r = q.addCommand('showborders', p);
            r.canUndo = false;
            if (q.config.startupShowBorders !== false)r.setState(1);
            q.addCss(n);
            q.on('mode', function () {
                if (r.state != 0)r.refresh(q);
            }, null, null, 100);
            q.on('contentDom', function () {
                if (r.state != 0)r.refresh(q);
            });
            q.on('removeFormatCleanup', function (s) {
                var t = s.data;
                if (q.getCommand('showborders').state == 1 && t.is('table') && (!t.hasAttribute('border') || parseInt(t.getAttribute('border'), 10) <= 0))t.addClass(m);
            });
        }, afterInit: function (q) {
            var r = q.dataProcessor, s = r && r.dataFilter, t = r && r.htmlFilter;
            if (s)s.addRules({elements: {table: function (u) {
                var v = u.attributes, w = v['class'], x = parseInt(v.border, 10);
                if ((!x || x <= 0) && (!w || w.indexOf(m) == -1))v['class'] = (w || '') + ' ' + m;
            }}});
            if (t)t.addRules({elements: {table: function (u) {
                var v = u.attributes, w = v['class'];
                w && (v['class'] = w.replace(m, '').replace(/\s{2}/, ' ').replace(/^\s+|\s+$/, ''));
            }}});
        }});
        a.on('dialogDefinition', function (q) {
            var r = q.data.name;
            if (r == 'table' || r == 'tableProperties') {
                var s = q.data.definition, t = s.getContents('info'), u = t.get('txtBorder'), v = u.commit;
                u.commit = e.override(v, function (y) {
                    return function (z, A) {
                        y.apply(this, arguments);
                        var B = parseInt(this.getValue(), 10);
                        A[!B || B <= 0 ? 'addClass' : 'removeClass'](m);
                    };
                });
                var w = s.getContents('advanced'), x = w && w.get('advCSSClasses');
                if (x) {
                    x.setup = e.override(x.setup, function (y) {
                        return function () {
                            y.apply(this, arguments);
                            this.setValue(this.getValue().replace(/cke_show_border/, ''));
                        };
                    });
                    x.commit = e.override(x.commit, function (y) {
                        return function (z, A) {
                            y.apply(this, arguments);
                            if (!parseInt(A.getAttribute('border'), 10))A.addClass('cke_show_border');
                        };
                    });
                }
            }
        });
    })();
    j.add('sourcearea', {requires: ['editingblock'], init: function (m) {
        var n = j.sourcearea, o = a.document.getWindow();
        m.on('editingBlockReady', function () {
            var p, q;
            m.addMode('source', {load: function (r, s) {
                if (c && b.version < 8)r.setStyle('position', 'relative');
                m.textarea = p = new h('textarea');
                p.setAttributes({dir: 'ltr', tabIndex: b.webkit ? -1 : m.tabIndex, role: 'textbox', 'aria-label': m.lang.editorTitle.replace('%1', m.name)});
                p.addClass('cke_source');
                p.addClass('cke_enable_context_menu');
                m.readOnly && p.setAttribute('readOnly', 'readonly');
                var t = {width: b.ie7Compat ? '99%' : '100%', height: '100%', resize: 'none', outline: 'none', 'text-align': 'left'};
                if (c) {
                    q = function () {
                        p.hide();
                        p.setStyle('height', r.$.clientHeight + 'px');
                        p.setStyle('width', r.$.clientWidth + 'px');
                        p.show();
                    };
                    m.on('resize', q);
                    o.on('resize', q);
                    setTimeout(q, 0);
                }
                r.setHtml('');
                r.append(p);
                p.setStyles(t);
                m.fire('ariaWidget', p);
                p.on('blur', function () {
                    m.focusManager.blur();
                });
                p.on('focus', function () {
                    m.focusManager.focus();
                });
                m.mayBeDirty = true;
                this.loadData(s);
                var u = m.keystrokeHandler;
                if (u)u.attach(p);
                setTimeout(function () {
                    m.mode = 'source';
                    m.fire('mode', {previousMode: m._.previousMode});
                }, b.gecko || b.webkit ? 100 : 0);
            }, loadData: function (r) {
                p.setValue(r);
                m.fire('dataReady');
            }, getData: function () {
                return p.getValue();
            }, getSnapshotData: function () {
                return p.getValue();
            }, unload: function (r) {
                p.clearCustomData();
                m.textarea = p = null;
                if (q) {
                    m.removeListener('resize', q);
                    o.removeListener('resize', q);
                }
                if (c && b.version < 8)r.removeStyle('position');
            }, focus: function () {
                p.focus();
            }});
        });
        m.on('readOnly', function () {
            if (m.mode == 'source')if (m.readOnly)m.textarea.setAttribute('readOnly', 'readonly'); else m.textarea.removeAttribute('readOnly');
        });
        m.addCommand('source', n.commands.source);
        if (m.ui.addButton)m.ui.addButton('Source', {label: m.lang.source, command: 'source'});
        m.on('mode', function () {
            m.getCommand('source').setState(m.mode == 'source' ? 1 : 2);
        });
    }});
    j.sourcearea = {commands: {source: {modes: {wysiwyg: 1, source: 1}, editorFocus: false, readOnly: 1, exec: function (m) {
        if (m.mode == 'wysiwyg')m.fire('saveSnapshot');
        m.getCommand('source').setState(0);
        m.setMode(m.mode == 'source' ? 'wysiwyg' : 'source');
    }, canUndo: false}}};
    (function () {
        j.add('stylescombo', {requires: ['richcombo', 'styles'], init: function (n) {
            var o = n.config, p = n.lang.stylesCombo, q = {}, r = [], s;

            function t(u) {
                n.getStylesSet(function (v) {
                    if (!r.length) {
                        var w, x;
                        for (var y = 0, z = v.length; y < z; y++) {
                            var A = v[y];
                            x = A.name;
                            w = q[x] = new a.style(A);
                            w._name = x;
                            w._.enterMode = o.enterMode;
                            r.push(w);
                        }
                        r.sort(m);
                    }
                    u && u();
                });
            };
            n.ui.addRichCombo('Styles', {label: p.label, title: p.panelTitle, className: 'cke_styles', panel: {css: n.skin.editor.css.concat(o.contentsCss), multiSelect: true, attributes: {'aria-label': p.panelTitle}}, init: function () {
                s = this;
                t(function () {
                    var u, v, w, x, y, z;
                    for (y = 0, z = r.length; y < z; y++) {
                        u = r[y];
                        v = u._name;
                        x = u.type;
                        if (x != w) {
                            s.startGroup(p['panelTitle' + String(x)]);
                            w = x;
                        }
                        s.add(v, u.type == 3 ? v : u.buildPreview(), v);
                    }
                    s.commit();
                });
            }, onClick: function (u) {
                n.focus();
                n.fire('saveSnapshot');
                var v = q[u], w = n.getSelection(), x = new d.elementPath(w.getStartElement());
                v[v.checkActive(x) ? 'remove' : 'apply'](n.document);
                n.fire('saveSnapshot');
            }, onRender: function () {
                n.on('selectionChange', function (u) {
                    var v = this.getValue(), w = u.data.path, x = w.elements;
                    for (var y = 0, z = x.length, A; y < z; y++) {
                        A = x[y];
                        for (var B in q) {
                            if (q[B].checkElementRemovable(A, true)) {
                                if (B != v)this.setValue(B);
                                return;
                            }
                        }
                    }
                    this.setValue('');
                }, this);
            }, onOpen: function () {
                var B = this;
                if (c || b.webkit)n.focus();
                var u = n.getSelection(), v = u.getSelectedElement(), w = new d.elementPath(v || u.getStartElement()), x = [0, 0, 0, 0];
                B.showAll();
                B.unmarkAll();
                for (var y in q) {
                    var z = q[y], A = z.type;
                    if (z.checkActive(w))B.mark(y); else if (A == 3 && !z.checkApplicable(w)) {
                        B.hideItem(y);
                        x[A]--;
                    }
                    x[A]++;
                }
                if (!x[1])B.hideGroup(p['panelTitle' + String(1)]);
                if (!x[2])B.hideGroup(p['panelTitle' + String(2)]);
                if (!x[3])B.hideGroup(p['panelTitle' + String(3)]);
            }, reset: function () {
                if (s) {
                    delete s._.panel;
                    delete s._.list;
                    s._.committed = 0;
                    s._.items = {};
                    s._.state = 2;
                }
                q = {};
                r = [];
                t();
            }});
            n.on('instanceReady', function () {
                t();
            });
        }});
        function m(n, o) {
            var p = n.type, q = o.type;
            return p == q ? 0 : p == 3 ? -1 : q == 3 ? 1 : q == 1 ? 1 : -1;
        };
    })();
    j.add('table', {init: function (m) {
        var n = j.table, o = m.lang.table;
        m.addCommand('table', new a.dialogCommand('table'));
        m.addCommand('tableProperties', new a.dialogCommand('tableProperties'));
        m.ui.addButton('Table', {label: o.toolbar, command: 'table'});
        a.dialog.add('table', this.path + 'dialogs/table.js');
        a.dialog.add('tableProperties', this.path + 'dialogs/table.js');
        if (m.addMenuItems)m.addMenuItems({table: {label: o.menu, command: 'tableProperties', group: 'table', order: 5}, tabledelete: {label: o.deleteTable, command: 'tableDelete', group: 'table', order: 1}});
        m.on('doubleclick', function (p) {
            var q = p.data.element;
            if (q.is('table'))p.data.dialog = 'tableProperties';
        });
        if (m.contextMenu)m.contextMenu.addListener(function (p, q) {
            if (!p || p.isReadOnly())return null;
            var r = p.hasAscendant('table', 1);
            if (r)return{tabledelete: 2, table: 2};
            return null;
        });
    }});
    (function () {
        var m = /^(?:td|th)$/;

        function n(G) {
            var H = G.createBookmarks(), I = G.getRanges(), J = [], K = {};

            function L(T) {
                if (J.length > 0)return;
                if (T.type == 1 && m.test(T.getName()) && !T.getCustomData('selected_cell')) {
                    h.setMarker(K, T, 'selected_cell', true);
                    J.push(T);
                }
            };
            for (var M = 0; M < I.length; M++) {
                var N = I[M];
                if (N.collapsed) {
                    var O = N.getCommonAncestor(), P = O.getAscendant('td', true) || O.getAscendant('th', true);
                    if (P)J.push(P);
                } else {
                    var Q = new d.walker(N), R;
                    Q.guard = L;
                    while (R = Q.next()) {
                        var S = R.getAscendant('td') || R.getAscendant('th');
                        if (S && !S.getCustomData('selected_cell')) {
                            h.setMarker(K, S, 'selected_cell', true);
                            J.push(S);
                        }
                    }
                }
            }
            h.clearAllMarkers(K);
            G.selectBookmarks(H);
            return J;
        };
        function o(G) {
            var H = 0, I = G.length - 1, J = {}, K, L, M;
            while (K = G[H++])h.setMarker(J, K, 'delete_cell', true);
            H = 0;
            while (K = G[H++]) {
                if ((L = K.getPrevious()) && !L.getCustomData('delete_cell') || (L = K.getNext()) && !L.getCustomData('delete_cell')) {
                    h.clearAllMarkers(J);
                    return L;
                }
            }
            h.clearAllMarkers(J);
            M = G[0].getParent();
            if (M = M.getPrevious())return M.getLast();
            M = G[I].getParent();
            if (M = M.getNext())return M.getChild(0);
            return null;
        };
        function p(G, H) {
            var I = n(G), J = I[0], K = J.getAscendant('table'), L = J.getDocument(), M = I[0].getParent(), N = M.$.rowIndex, O = I[I.length - 1], P = O.getParent().$.rowIndex + O.$.rowSpan - 1, Q = new h(K.$.rows[P]), R = H ? N : P, S = H ? M : Q, T = e.buildTableMap(K), U = T[R], V = H ? T[R - 1] : T[R + 1], W = T[0].length, X = L.createElement('tr');
            for (var Y = 0; U[Y] && Y < W; Y++) {
                var Z;
                if (U[Y].rowSpan > 1 && V && U[Y] == V[Y]) {
                    Z = U[Y];
                    Z.rowSpan += 1;
                } else {
                    Z = new h(U[Y]).clone();
                    Z.removeAttribute('rowSpan');
                    !c && Z.appendBogus();
                    X.append(Z);
                    Z = Z.$;
                }
                Y += Z.colSpan - 1;
            }
            H ? X.insertBefore(S) : X.insertAfter(S);
        };
        function q(G) {
            if (G instanceof d.selection) {
                var H = n(G), I = H[0], J = I.getAscendant('table'), K = e.buildTableMap(J), L = H[0].getParent(), M = L.$.rowIndex, N = H[H.length - 1], O = N.getParent().$.rowIndex + N.$.rowSpan - 1, P = [];
                for (var Q = M; Q <= O; Q++) {
                    var R = K[Q], S = new h(J.$.rows[Q]);
                    for (var T = 0; T < R.length; T++) {
                        var U = new h(R[T]), V = U.getParent().$.rowIndex;
                        if (U.$.rowSpan == 1)U.remove(); else {
                            U.$.rowSpan -= 1;
                            if (V == Q) {
                                var W = K[Q + 1];
                                W[T - 1] ? U.insertAfter(new h(W[T - 1])) : new h(J.$.rows[Q + 1]).append(U, 1);
                            }
                        }
                        T += U.$.colSpan - 1;
                    }
                    P.push(S);
                }
                var X = J.$.rows, Y = new h(X[O + 1] || (M > 0 ? X[M - 1] : null) || J.$.parentNode);
                for (Q = P.length; Q >= 0; Q--)q(P[Q]);
                return Y;
            } else if (G instanceof h) {
                J = G.getAscendant('table');
                if (J.$.rows.length == 1)J.remove(); else G.remove();
            }
            return null;
        };
        function r(G, H) {
            var I = G.getParent(), J = I.$.cells, K = 0;
            for (var L = 0; L < J.length; L++) {
                var M = J[L];
                K += H ? 1 : M.colSpan;
                if (M == G.$)break;
            }
            return K - 1;
        };
        function s(G, H) {
            var I = H ? Infinity : 0;
            for (var J = 0; J < G.length; J++) {
                var K = r(G[J], H);
                if (H ? K < I : K > I)I = K;
            }
            return I;
        };
        function t(G, H) {
            var I = n(G), J = I[0], K = J.getAscendant('table'), L = s(I, 1), M = s(I), N = H ? L : M, O = e.buildTableMap(K), P = [], Q = [], R = O.length;
            for (var S = 0; S < R; S++) {
                P.push(O[S][N]);
                var T = H ? O[S][N - 1] : O[S][N + 1];
                T && Q.push(T);
            }
            for (S = 0; S < R; S++) {
                var U;
                if (P[S].colSpan > 1 && Q.length && Q[S] == P[S]) {
                    U = P[S];
                    U.colSpan += 1;
                } else {
                    U = new h(P[S]).clone();
                    U.removeAttribute('colSpan');
                    !c && U.appendBogus();
                    U[H ? 'insertBefore' : 'insertAfter'].call(U, new h(P[S]));
                    U = U.$;
                }
                S += U.rowSpan - 1;
            }
        };
        function u(G) {
            var H = n(G), I = H[0], J = H[H.length - 1], K = I.getAscendant('table'), L = e.buildTableMap(K), M, N, O = [];
            for (var P = 0, Q = L.length; P < Q; P++)for (var R = 0, S = L[P].length; R < S; R++) {
                if (L[P][R] == I.$)M = R;
                if (L[P][R] == J.$)N = R;
            }
            for (P = M; P <= N; P++)for (R = 0; R < L.length; R++) {
                var T = L[R], U = new h(K.$.rows[R]), V = new h(T[P]);
                if (V.$) {
                    if (V.$.colSpan == 1)V.remove(); else V.$.colSpan -= 1;
                    R += V.$.rowSpan - 1;
                    if (!U.$.cells.length)O.push(U);
                }
            }
            var W = K.$.rows[0] && K.$.rows[0].cells, X = new h(W[M] || (M ? W[M - 1] : K.$.parentNode));
            if (O.length == Q)K.remove();
            return X;
        };
        function v(G) {
            var H = [], I = G[0] && G[0].getAscendant('table'), J, K, L, M;
            for (J = 0, K = G.length; J < K; J++)H.push(G[J].$.cellIndex);
            H.sort();
            for (J = 1, K = H.length; J < K; J++) {
                if (H[J] - H[J - 1] > 1) {
                    L = H[J - 1] + 1;
                    break;
                }
            }
            if (!L)L = H[0] > 0 ? H[0] - 1 : H[H.length - 1] + 1;
            var N = I.$.rows;
            for (J = 0, K = N.length; J < K; J++) {
                M = N[J].cells[L];
                if (M)break;
            }
            return M ? new h(M) : I.getPrevious();
        };
        function w(G, H) {
            var I = G.getStartElement(), J = I.getAscendant('td', 1) || I.getAscendant('th', 1);
            if (!J)return;
            var K = J.clone();
            if (!c)K.appendBogus();
            if (H)K.insertBefore(J); else K.insertAfter(J);
        };
        function x(G) {
            if (G instanceof d.selection) {
                var H = n(G), I = H[0] && H[0].getAscendant('table'), J = o(H);
                for (var K = H.length - 1; K >= 0; K--)x(H[K]);
                if (J)z(J, true); else if (I)I.remove();
            } else if (G instanceof h) {
                var L = G.getParent();
                if (L.getChildCount() == 1)L.remove(); else G.remove();
            }
        };
        function y(G) {
            var H = G.getBogus();
            H && H.remove();
            G.trim();
        };
        function z(G, H) {
            var I = new d.range(G.getDocument());
            if (!I['moveToElementEdit' + (H ? 'End' : 'Start')](G)) {
                I.selectNodeContents(G);
                I.collapse(H ? false : true);
            }
            I.select(true);
        };
        function A(G, H, I) {
            var J = G[H];
            if (typeof I == 'undefined')return J;
            for (var K = 0; J && K < J.length; K++) {
                if (I.is && J[K] == I.$)return K; else if (K == I)return new h(J[K]);
            }
            return I.is ? -1 : null;
        };
        function B(G, H, I) {
            var J = [];
            for (var K = 0; K < G.length; K++) {
                var L = G[K];
                if (typeof I == 'undefined')J.push(L[H]); else if (I.is && L[H] == I.$)return K; else if (K == I)return new h(L[H]);
            }
            return typeof I == 'undefined' ? J : I.is ? -1 : null;
        };
        function C(G, H, I) {
            var J = n(G), K;
            if ((H ? J.length != 1 : J.length < 2) || (K = G.getCommonAncestor()) && K.type == 1 && K.is('table'))return false;
            var L, M = J[0], N = M.getAscendant('table'), O = e.buildTableMap(N), P = O.length, Q = O[0].length, R = M.getParent().$.rowIndex, S = A(O, R, M);
            if (H) {
                var T;
                try {
                    var U = parseInt(M.getAttribute('rowspan'), 10) || 1, V = parseInt(M.getAttribute('colspan'), 10) || 1;
                    T = O[H == 'up' ? R - U : H == 'down' ? R + U : R][H == 'left' ? S - V : H == 'right' ? S + V : S];
                } catch (an) {
                    return false;
                }
                if (!T || M.$ == T)return false;
                J[H == 'up' || H == 'left' ? 'unshift' : 'push'](new h(T));
            }
            var W = M.getDocument(), X = R, Y = 0, Z = 0, aa = !I && new d.documentFragment(W), ab = 0;
            for (var ac = 0; ac < J.length; ac++) {
                L = J[ac];
                var ad = L.getParent(), ae = L.getFirst(), af = L.$.colSpan, ag = L.$.rowSpan, ah = ad.$.rowIndex, ai = A(O, ah, L);
                ab += af * ag;
                Z = Math.max(Z, ai - S + af);
                Y = Math.max(Y, ah - R + ag);
                if (!I) {
                    if (y(L), L.getChildren().count()) {
                        if (ah != X && ae && !(ae.isBlockBoundary && ae.isBlockBoundary({br: 1}))) {
                            var aj = aa.getLast(d.walker.whitespaces(true));
                            if (aj && !(aj.is && aj.is('br')))aa.append('br');
                        }
                        L.moveChildren(aa);
                    }
                    ac ? L.remove() : L.setHtml('');
                }
                X = ah;
            }
            if (!I) {
                aa.moveChildren(M);
                if (!c)M.appendBogus();
                if (Z >= Q)M.removeAttribute('rowSpan'); else M.$.rowSpan = Y;
                if (Y >= P)M.removeAttribute('colSpan'); else M.$.colSpan = Z;
                var ak = new d.nodeList(N.$.rows), al = ak.count();
                for (ac = al - 1; ac >= 0; ac--) {
                    var am = ak.getItem(ac);
                    if (!am.$.cells.length) {
                        am.remove();
                        al++;
                        continue;
                    }
                }
                return M;
            } else return Y * Z == ab;
        };
        function D(G, H) {
            var I = n(G);
            if (I.length > 1)return false; else if (H)return true;
            var J = I[0], K = J.getParent(), L = K.getAscendant('table'), M = e.buildTableMap(L), N = K.$.rowIndex, O = A(M, N, J), P = J.$.rowSpan, Q, R, S, T;
            if (P > 1) {
                R = Math.ceil(P / 2);
                S = Math.floor(P / 2);
                T = N + R;
                var U = new h(L.$.rows[T]), V = A(M, T), W;
                Q = J.clone();
                for (var X = 0; X < V.length; X++) {
                    W = V[X];
                    if (W.parentNode == U.$ && X > O) {
                        Q.insertBefore(new h(W));
                        break;
                    } else W = null;
                }
                if (!W)U.append(Q, true);
            } else {
                S = R = 1;
                U = K.clone();
                U.insertAfter(K);
                U.append(Q = J.clone());
                var Y = A(M, N);
                for (var Z = 0; Z < Y.length; Z++)Y[Z].rowSpan++;
            }
            if (!c)Q.appendBogus();
            J.$.rowSpan = R;
            Q.$.rowSpan = S;
            if (R == 1)J.removeAttribute('rowSpan');
            if (S == 1)Q.removeAttribute('rowSpan');
            return Q;
        };
        function E(G, H) {
            var I = n(G);
            if (I.length > 1)return false; else if (H)return true;
            var J = I[0], K = J.getParent(), L = K.getAscendant('table'), M = e.buildTableMap(L), N = K.$.rowIndex, O = A(M, N, J), P = J.$.colSpan, Q, R, S;
            if (P > 1) {
                R = Math.ceil(P / 2);
                S = Math.floor(P / 2);
            } else {
                S = R = 1;
                var T = B(M, O);
                for (var U = 0; U < T.length; U++)T[U].colSpan++;
            }
            Q = J.clone();
            Q.insertAfter(J);
            if (!c)Q.appendBogus();
            J.$.colSpan = R;
            Q.$.colSpan = S;
            if (R == 1)J.removeAttribute('colSpan');
            if (S == 1)Q.removeAttribute('colSpan');
            return Q;
        };
        var F = {thead: 1, tbody: 1, tfoot: 1, td: 1, tr: 1, th: 1};
        j.tabletools = {init: function (G) {
            var H = G.lang.table;
            G.addCommand('cellProperties', new a.dialogCommand('cellProperties'));
            a.dialog.add('cellProperties', this.path + 'dialogs/tableCell.js');
            G.addCommand('tableDelete', {exec: function (I) {
                var J = I.getSelection(), K = J && J.getStartElement(), L = K && K.getAscendant('table', 1);
                if (!L)return;
                var M = L.getParent();
                if (M.getChildCount() == 1 && !M.is('body', 'td', 'th'))L = M;
                var N = new d.range(I.document);
                N.moveToPosition(L, 3);
                L.remove();
                N.select();
            }});
            G.addCommand('rowDelete', {exec: function (I) {
                var J = I.getSelection();
                z(q(J));
            }});
            G.addCommand('rowInsertBefore', {exec: function (I) {
                var J = I.getSelection();
                p(J, true);
            }});
            G.addCommand('rowInsertAfter', {exec: function (I) {
                var J = I.getSelection();
                p(J);
            }});
            G.addCommand('columnDelete', {exec: function (I) {
                var J = I.getSelection(), K = u(J);
                K && z(K, true);
            }});
            G.addCommand('columnInsertBefore', {exec: function (I) {
                var J = I.getSelection();
                t(J, true);
            }});
            G.addCommand('columnInsertAfter', {exec: function (I) {
                var J = I.getSelection();
                t(J);
            }});
            G.addCommand('cellDelete', {exec: function (I) {
                var J = I.getSelection();
                x(J);
            }});
            G.addCommand('cellMerge', {exec: function (I) {
                z(C(I.getSelection()), true);
            }});
            G.addCommand('cellMergeRight', {exec: function (I) {
                z(C(I.getSelection(), 'right'), true);
            }});
            G.addCommand('cellMergeDown', {exec: function (I) {
                z(C(I.getSelection(), 'down'), true);
            }});
            G.addCommand('cellVerticalSplit', {exec: function (I) {
                z(D(I.getSelection()));
            }});
            G.addCommand('cellHorizontalSplit', {exec: function (I) {
                z(E(I.getSelection()));
            }});
            G.addCommand('cellInsertBefore', {exec: function (I) {
                var J = I.getSelection();
                w(J, true);
            }});
            G.addCommand('cellInsertAfter', {exec: function (I) {
                var J = I.getSelection();
                w(J);
            }});
            if (G.addMenuItems)G.addMenuItems({tablecell: {label: H.cell.menu, group: 'tablecell', order: 1, getItems: function () {
                var I = G.getSelection(), J = n(I);
                return{tablecell_insertBefore: 2, tablecell_insertAfter: 2, tablecell_delete: 2, tablecell_merge: C(I, null, true) ? 2 : 0, tablecell_merge_right: C(I, 'right', true) ? 2 : 0, tablecell_merge_down: C(I, 'down', true) ? 2 : 0, tablecell_split_vertical: D(I, true) ? 2 : 0, tablecell_split_horizontal: E(I, true) ? 2 : 0, tablecell_properties: J.length > 0 ? 2 : 0};
            }}, tablecell_insertBefore: {label: H.cell.insertBefore, group: 'tablecell', command: 'cellInsertBefore', order: 5}, tablecell_insertAfter: {label: H.cell.insertAfter, group: 'tablecell', command: 'cellInsertAfter', order: 10}, tablecell_delete: {label: H.cell.deleteCell, group: 'tablecell', command: 'cellDelete', order: 15}, tablecell_merge: {label: H.cell.merge, group: 'tablecell', command: 'cellMerge', order: 16}, tablecell_merge_right: {label: H.cell.mergeRight, group: 'tablecell', command: 'cellMergeRight', order: 17}, tablecell_merge_down: {label: H.cell.mergeDown, group: 'tablecell', command: 'cellMergeDown', order: 18}, tablecell_split_horizontal: {label: H.cell.splitHorizontal, group: 'tablecell', command: 'cellHorizontalSplit', order: 19}, tablecell_split_vertical: {label: H.cell.splitVertical, group: 'tablecell', command: 'cellVerticalSplit', order: 20}, tablecell_properties: {label: H.cell.title, group: 'tablecellproperties', command: 'cellProperties', order: 21}, tablerow: {label: H.row.menu, group: 'tablerow', order: 1, getItems: function () {
                return{tablerow_insertBefore: 2, tablerow_insertAfter: 2, tablerow_delete: 2};
            }}, tablerow_insertBefore: {label: H.row.insertBefore, group: 'tablerow', command: 'rowInsertBefore', order: 5}, tablerow_insertAfter: {label: H.row.insertAfter, group: 'tablerow', command: 'rowInsertAfter', order: 10}, tablerow_delete: {label: H.row.deleteRow, group: 'tablerow', command: 'rowDelete', order: 15}, tablecolumn: {label: H.column.menu, group: 'tablecolumn', order: 1, getItems: function () {
                return{tablecolumn_insertBefore: 2, tablecolumn_insertAfter: 2, tablecolumn_delete: 2};
            }}, tablecolumn_insertBefore: {label: H.column.insertBefore, group: 'tablecolumn', command: 'columnInsertBefore', order: 5}, tablecolumn_insertAfter: {label: H.column.insertAfter, group: 'tablecolumn', command: 'columnInsertAfter', order: 10}, tablecolumn_delete: {label: H.column.deleteColumn, group: 'tablecolumn', command: 'columnDelete', order: 15}});
            if (G.contextMenu)G.contextMenu.addListener(function (I, J) {
                if (!I || I.isReadOnly())return null;
                while (I) {
                    if (I.getName() in F)return{tablecell: 2, tablerow: 2, tablecolumn: 2};
                    I = I.getParent();
                }
                return null;
            });
        }, getSelectedCells: n};
        j.add('tabletools', j.tabletools);
    })();
    e.buildTableMap = function (m) {
        var n = m.$.rows, o = -1, p = [];
        for (var q = 0; q < n.length; q++) {
            o++;
            !p[o] && (p[o] = []);
            var r = -1;
            for (var s = 0; s < n[q].cells.length; s++) {
                var t = n[q].cells[s];
                r++;
                while (p[o][r])r++;
                var u = isNaN(t.colSpan) ? 1 : t.colSpan, v = isNaN(t.rowSpan) ? 1 : t.rowSpan;
                for (var w = 0; w < v; w++) {
                    if (!p[o + w])p[o + w] = [];
                    for (var x = 0; x < u; x++)p[o + w][r + x] = n[q].cells[s];
                }
                r += u - 1;
            }
        }
        return p;
    };
    j.add('specialchar', {availableLangs: {en: 1}, init: function (m) {
        var n = 'specialchar', o = this;
        a.dialog.add(n, this.path + 'dialogs/specialchar.js');
        m.addCommand(n, {exec: function () {
            var p = m.langCode;
            p = o.availableLangs[p] ? p : 'en';
            a.scriptLoader.load(a.getUrl(o.path + 'lang/' + p + '.js'), function () {
                e.extend(m.lang.specialChar, o.langEntries[p]);
                m.openDialog(n);
            });
        }, modes: {wysiwyg: 1}, canUndo: false});
        m.ui.addButton('SpecialChar', {label: m.lang.specialChar.toolbar, command: n});
    }});
    i.specialChars = ['!', '&quot;', '#', '$', '%', '&amp;', "'", '(', ')', '*', '+', '-', '.', '/', '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', ':', ';', '&lt;', '=', '&gt;', '?', '@', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z', '[', ']', '^', '_', '`', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '{', '|', '}', '~', '&euro;', '&lsquo;', '&rsquo;', '&ldquo;', '&rdquo;', '&ndash;', '&mdash;', '&iexcl;', '&cent;', '&pound;', '&curren;', '&yen;', '&brvbar;', '&sect;', '&uml;', '&copy;', '&ordf;', '&laquo;', '&not;', '&reg;', '&macr;', '&deg;', '&sup2;', '&sup3;', '&acute;', '&micro;', '&para;', '&middot;', '&cedil;', '&sup1;', '&ordm;', '&raquo;', '&frac14;', '&frac12;', '&frac34;', '&iquest;', '&Agrave;', '&Aacute;', '&Acirc;', '&Atilde;', '&Auml;', '&Aring;', '&AElig;', '&Ccedil;', '&Egrave;', '&Eacute;', '&Ecirc;', '&Euml;', '&Igrave;', '&Iacute;', '&Icirc;', '&Iuml;', '&ETH;', '&Ntilde;', '&Ograve;', '&Oacute;', '&Ocirc;', '&Otilde;', '&Ouml;', '&times;', '&Oslash;', '&Ugrave;', '&Uacute;', '&Ucirc;', '&Uuml;', '&Yacute;', '&THORN;', '&szlig;', '&agrave;', '&aacute;', '&acirc;', '&atilde;', '&auml;', '&aring;', '&aelig;', '&ccedil;', '&egrave;', '&eacute;', '&ecirc;', '&euml;', '&igrave;', '&iacute;', '&icirc;', '&iuml;', '&eth;', '&ntilde;', '&ograve;', '&oacute;', '&ocirc;', '&otilde;', '&ouml;', '&divide;', '&oslash;', '&ugrave;', '&uacute;', '&ucirc;', '&uuml;', '&yacute;', '&thorn;', '&yuml;', '&OElig;', '&oelig;', '&#372;', '&#374', '&#373', '&#375;', '&sbquo;', '&#8219;', '&bdquo;', '&hellip;', '&trade;', '&#9658;', '&bull;', '&rarr;', '&rArr;', '&hArr;', '&diams;', '&asymp;'];
    (function () {
        var m = {editorFocus: false, modes: {wysiwyg: 1, source: 1}}, n = {exec: function (q) {
            q.container.focusNext(true, q.tabIndex);
        }}, o = {exec: function (q) {
            q.container.focusPrevious(true, q.tabIndex);
        }};

        function p(q) {
            return{editorFocus: false, canUndo: false, modes: {wysiwyg: 1}, exec: function (r) {
                if (r.focusManager.hasFocus) {
                    var s = r.getSelection(), t = s.getCommonAncestor(), u;
                    if (u = t.getAscendant('td', true) || t.getAscendant('th', true)) {
                        var v = new d.range(r.document), w = e.tryThese(function () {
                            var D = u.getParent(), E = D.$.cells[u.$.cellIndex + (q ? -1 : 1)];
                            E.parentNode.parentNode;
                            return E;
                        }, function () {
                            var D = u.getParent(), E = D.getAscendant('table'), F = E.$.rows[D.$.rowIndex + (q ? -1 : 1)];
                            return F.cells[q ? F.cells.length - 1 : 0];
                        });
                        if (!(w || q)) {
                            var x = u.getAscendant('table').$, y = u.getParent().$.cells, z = new h(x.insertRow(-1), r.document);
                            for (var A = 0, B = y.length; A < B; A++) {
                                var C = z.append(new h(y[A], r.document).clone(false, false));
                                !c && C.appendBogus();
                            }
                            v.moveToElementEditStart(z);
                        } else if (w) {
                            w = new h(w);
                            v.moveToElementEditStart(w);
                            if (!(v.checkStartOfBlock() && v.checkEndOfBlock()))v.selectNodeContents(w);
                        } else return true;
                        v.select(true);
                        return true;
                    }
                }
                return false;
            }};
        };
        j.add('tab', {requires: ['keystrokes'], init: function (q) {
            var r = q.config.enableTabKeyTools !== false, s = q.config.tabSpaces || 0, t = '';
            while (s--)t += '\xa0';
            if (t)q.on('key', function (u) {
                if (u.data.keyCode == 9) {
                    q.insertHtml(t);
                    u.cancel();
                }
            });
            if (r)q.on('key', function (u) {
                if (u.data.keyCode == 9 && q.execCommand('selectNextCell') || u.data.keyCode == 2228224 + 9 && q.execCommand('selectPreviousCell'))u.cancel();
            });
            if (b.webkit || b.gecko)q.on('key', function (u) {
                var v = u.data.keyCode;
                if (v == 9 && !t) {
                    u.cancel();
                    q.execCommand('blur');
                }
                if (v == 2228224 + 9) {
                    q.execCommand('blurBack');
                    u.cancel();
                }
            });
            q.addCommand('blur', e.extend(n, m));
            q.addCommand('blurBack', e.extend(o, m));
            q.addCommand('selectNextCell', p());
            q.addCommand('selectPreviousCell', p(true));
        }});
    })();
    h.prototype.focusNext = function (m, n) {
        var w = this;
        var o = w.$, p = n === undefined ? w.getTabIndex() : n, q, r, s, t, u, v;
        if (p <= 0) {
            u = w.getNextSourceNode(m, 1);
            while (u) {
                if (u.isVisible() && u.getTabIndex() === 0) {
                    s = u;
                    break;
                }
                u = u.getNextSourceNode(false, 1);
            }
        } else {
            u = w.getDocument().getBody().getFirst();
            while (u = u.getNextSourceNode(false, 1)) {
                if (!q)if (!r && u.equals(w)) {
                    r = true;
                    if (m) {
                        if (!(u = u.getNextSourceNode(true, 1)))break;
                        q = 1;
                    }
                } else if (r && !w.contains(u))q = 1;
                if (!u.isVisible() || (v = u.getTabIndex()) < 0)continue;
                if (q && v == p) {
                    s = u;
                    break;
                }
                if (v > p && (!s || !t || v < t)) {
                    s = u;
                    t = v;
                } else if (!s && v === 0) {
                    s = u;
                    t = v;
                }
            }
        }
        if (s)s.focus();
    };
    h.prototype.focusPrevious = function (m, n) {
        var w = this;
        var o = w.$, p = n === undefined ? w.getTabIndex() : n, q, r, s, t = 0, u, v = w.getDocument().getBody().getLast();
        while (v = v.getPreviousSourceNode(false, 1)) {
            if (!q)if (!r && v.equals(w)) {
                r = true;
                if (m) {
                    if (!(v = v.getPreviousSourceNode(true, 1)))break;
                    q = 1;
                }
            } else if (r && !w.contains(v))q = 1;
            if (!v.isVisible() || (u = v.getTabIndex()) < 0)continue;
            if (p <= 0) {
                if (q && u === 0) {
                    s = v;
                    break;
                }
                if (u > t) {
                    s = v;
                    t = u;
                }
            } else {
                if (q && u == p) {
                    s = v;
                    break;
                }
                if (u < p && (!s || u > t)) {
                    s = v;
                    t = u;
                }
            }
        }
        if (s)s.focus();
    };
    (function () {
        j.add('templates', {requires: ['dialog'], init: function (o) {
            a.dialog.add('templates', a.getUrl(this.path + 'dialogs/templates.js'));
            o.addCommand('templates', new a.dialogCommand('templates'));
            o.ui.addButton('Templates', {label: o.lang.templates.button, command: 'templates'});
        }});
        var m = {}, n = {};
        a.addTemplates = function (o, p) {
            m[o] = p;
        };
        a.getTemplates = function (o) {
            return m[o];
        };
        a.loadTemplates = function (o, p) {
            var q = [];
            for (var r = 0, s = o.length; r < s; r++) {
                if (!n[o[r]]) {
                    q.push(o[r]);
                    n[o[r]] = 1;
                }
            }
            if (q.length)a.scriptLoader.load(q, p); else setTimeout(p, 0);
        };
    })();
    i.templates_files = [a.getUrl('plugins/templates/templates/default.js')];
    i.templates_replaceContent = true;
    (function () {
        var m = function () {
            this.toolbars = [];
            this.focusCommandExecuted = false;
        };
        m.prototype.focus = function () {
            for (var o = 0, p; p = this.toolbars[o++];)for (var q = 0, r; r = p.items[q++];) {
                if (r.focus) {
                    r.focus();
                    return;
                }
            }
        };
        var n = {toolbarFocus: {modes: {wysiwyg: 1, source: 1}, readOnly: 1, exec: function (o) {
            if (o.toolbox) {
                o.toolbox.focusCommandExecuted = true;
                if (c || b.air)setTimeout(function () {
                    o.toolbox.focus();
                }, 100); else o.toolbox.focus();
            }
        }}};
        j.add('toolbar', {init: function (o) {
            var p, q = function (r, s) {
                var t, u, v = o.lang.dir == 'rtl', w = o.config.toolbarGroupCycling;
                w = w === undefined || w;
                switch (s) {
                    case 9:
                    case 2228224 + 9:
                        while (!u || !u.items.length) {
                            u = s == 9 ? (u ? u.next : r.toolbar.next) || o.toolbox.toolbars[0] : (u ? u.previous : r.toolbar.previous) || o.toolbox.toolbars[o.toolbox.toolbars.length - 1];
                            if (u.items.length) {
                                r = u.items[p ? u.items.length - 1 : 0];
                                while (r && !r.focus) {
                                    r = p ? r.previous : r.next;
                                    if (!r)u = 0;
                                }
                            }
                        }
                        if (r)r.focus();
                        return false;
                    case v ? 37 : 39:
                    case 40:
                        t = r;
                        do {
                            t = t.next;
                            if (!t && w)t = r.toolbar.items[0];
                        } while (t && !t.focus);
                        if (t)t.focus(); else q(r, 9);
                        return false;
                    case v ? 39 : 37:
                    case 38:
                        t = r;
                        do {
                            t = t.previous;
                            if (!t && w)t = r.toolbar.items[r.toolbar.items.length - 1];
                        } while (t && !t.focus);
                        if (t)t.focus(); else {
                            p = 1;
                            q(r, 2228224 + 9);
                            p = 0;
                        }
                        return false;
                    case 27:
                        o.focus();
                        return false;
                    case 13:
                    case 32:
                        r.execute();
                        return false;
                }
                return true;
            };
            o.on('themeSpace', function (r) {
                if (r.data.space == o.config.toolbarLocation) {
                    o.toolbox = new m();
                    var s = e.getNextId(), t = ['<div class="cke_toolbox" role="group" aria-labelledby="', s, '" onmousedown="return false;"'], u = o.config.toolbarStartupExpanded !== false, v;
                    t.push(u ? '>' : ' style="display:none">');
                    t.push('<span id="', s, '" class="cke_voice_label">', o.lang.toolbars, '</span>');
                    var w = o.toolbox.toolbars, x = o.config.toolbar instanceof Array ? o.config.toolbar : o.config['toolbar_' + o.config.toolbar];
                    for (var y = 0; y < x.length; y++) {
                        var z, A = 0, B, C = x[y], D;
                        if (!C)continue;
                        if (v) {
                            t.push('</div>');
                            v = 0;
                        }
                        if (C === '/') {
                            t.push('<div class="cke_break"></div>');
                            continue;
                        }
                        D = C.items || C;
                        for (var E = 0; E < D.length; E++) {
                            var F, G = D[E], H;
                            F = o.ui.create(G);
                            if (F) {
                                H = F.canGroup !== false;
                                if (!A) {
                                    z = e.getNextId();
                                    A = {id: z, items: []};
                                    B = C.name && (o.lang.toolbarGroups[C.name] || C.name);
                                    t.push('<span id="', z, '" class="cke_toolbar"', B ? ' aria-labelledby="' + z + '_label"' : '', ' role="toolbar">');
                                    B && t.push('<span id="', z, '_label" class="cke_voice_label">', B, '</span>');
                                    t.push('<span class="cke_toolbar_start"></span>');
                                    var I = w.push(A) - 1;
                                    if (I > 0) {
                                        A.previous = w[I - 1];
                                        A.previous.next = A;
                                    }
                                }
                                if (H) {
                                    if (!v) {
                                        t.push('<span class="cke_toolgroup" role="presentation">');
                                        v = 1;
                                    }
                                } else if (v) {
                                    t.push('</span>');
                                    v = 0;
                                }
                                var J = F.render(o, t);
                                I = A.items.push(J) - 1;
                                if (I > 0) {
                                    J.previous = A.items[I - 1];
                                    J.previous.next = J;
                                }
                                J.toolbar = A;
                                J.onkey = q;
                                J.onfocus = function () {
                                    if (!o.toolbox.focusCommandExecuted)o.focus();
                                };
                            }
                        }
                        if (v) {
                            t.push('</span>');
                            v = 0;
                        }
                        if (A)t.push('<span class="cke_toolbar_end"></span></span>');
                    }
                    t.push('</div>');
                    if (o.config.toolbarCanCollapse) {
                        var K = e.addFunction(function () {
                            o.execCommand('toolbarCollapse');
                        });
                        o.on('destroy', function () {
                            e.removeFunction(K);
                        });
                        var L = e.getNextId();
                        o.addCommand('toolbarCollapse', {readOnly: 1, exec: function (M) {
                            var N = a.document.getById(L), O = N.getPrevious(), P = M.getThemeSpace('contents'), Q = O.getParent(), R = parseInt(P.$.style.height, 10), S = Q.$.offsetHeight, T = !O.isVisible();
                            if (!T) {
                                O.hide();
                                N.addClass('cke_toolbox_collapser_min');
                                N.setAttribute('title', M.lang.toolbarExpand);
                            } else {
                                O.show();
                                N.removeClass('cke_toolbox_collapser_min');
                                N.setAttribute('title', M.lang.toolbarCollapse);
                            }
                            N.getFirst().setText(T ? '▲' : '◀');
                            var U = Q.$.offsetHeight - S;
                            P.setStyle('height', R - U + 'px');
                            M.fire('resize');
                        }, modes: {wysiwyg: 1, source: 1}});
                        t.push('<a title="' + (u ? o.lang.toolbarCollapse : o.lang.toolbarExpand) + '" id="' + L + '" tabIndex="-1" class="cke_toolbox_collapser');
                        if (!u)t.push(' cke_toolbox_collapser_min');
                        t.push('" onclick="CKEDITOR.tools.callFunction(' + K + ')">', '<span>&#9650;</span>', '</a>');
                    }
                    r.data.html += t.join('');
                }
            });
            o.on('destroy', function () {
                var r, s = 0, t, u, v;
                r = this.toolbox.toolbars;
                for (; s < r.length; s++) {
                    u = r[s].items;
                    for (t = 0; t < u.length; t++) {
                        v = u[t];
                        if (v.clickFn)e.removeFunction(v.clickFn);
                        if (v.keyDownFn)e.removeFunction(v.keyDownFn);
                    }
                }
            });
            o.addCommand('toolbarFocus', n.toolbarFocus);
            o.ui.add('-', a.UI_SEPARATOR, {});
            o.ui.addHandler(a.UI_SEPARATOR, {create: function () {
                return{render: function (r, s) {
                    s.push('<span class="cke_separator" role="separator"></span>');
                    return{};
                }};
            }});
        }});
    })();
    a.UI_SEPARATOR = 'separator';
    i.toolbarLocation = 'top';
    i.toolbar_Basic = [
        ['Bold', 'Italic', '-', 'NumberedList', 'BulletedList', '-', 'Link', 'Unlink', '-', 'About']
    ];
    i.toolbar_Full = [
        {name: 'document', items: ['Source', '-', 'Save', 'NewPage', 'DocProps', 'Preview', 'Print', '-', 'Templates']},
        {name: 'clipboard', items: ['Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo']},
        {name: 'editing', items: ['Find', 'Replace', '-', 'SelectAll', '-', 'SpellChecker', 'Scayt']},
        {name: 'forms', items: ['Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField']},
        '/',
        {name: 'basicstyles', items: ['Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'RemoveFormat']},
        {name: 'paragraph', items: ['NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl']},
        {name: 'links', items: ['Link', 'Unlink', 'Anchor']},
        {name: 'insert', items: ['Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe']},
        '/',
        {name: 'styles', items: ['Styles', 'Format', 'Font', 'FontSize']},
        {name: 'colors', items: ['TextColor', 'BGColor']},
        {name: 'tools', items: ['Maximize', 'ShowBlocks', '-', 'About']}
    ];
    i.toolbar = 'Full';
    i.toolbarCanCollapse = true;
    (function () {
        j.add('undo', {requires: ['selection', 'wysiwygarea'], init: function (s) {
            var t = new o(s), u = s.addCommand('undo', {exec: function () {
                if (t.undo()) {
                    s.selectionChange();
                    this.fire('afterUndo');
                }
            }, state: 0, canUndo: false}), v = s.addCommand('redo', {exec: function () {
                if (t.redo()) {
                    s.selectionChange();
                    this.fire('afterRedo');
                }
            }, state: 0, canUndo: false});
            t.onChange = function () {
                u.setState(t.undoable() ? 2 : 0);
                v.setState(t.redoable() ? 2 : 0);
            };
            function w(x) {
                if (t.enabled && x.data.command.canUndo !== false)t.save();
            };
            s.on('beforeCommandExec', w);
            s.on('afterCommandExec', w);
            s.on('saveSnapshot', function (x) {
                t.save(x.data && x.data.contentOnly);
            });
            s.on('contentDom', function () {
                s.document.on('keydown', function (x) {
                    if (!x.data.$.ctrlKey && !x.data.$.metaKey)t.type(x);
                });
            });
            s.on('beforeModeUnload', function () {
                s.mode == 'wysiwyg' && t.save(true);
            });
            s.on('mode', function () {
                t.enabled = s.readOnly ? false : s.mode == 'wysiwyg';
                t.onChange();
            });
            s.ui.addButton('Undo', {label: s.lang.undo, command: 'undo'});
            s.ui.addButton('Redo', {label: s.lang.redo, command: 'redo'});
            s.resetUndo = function () {
                t.reset();
                s.fire('saveSnapshot');
            };
            s.on('updateSnapshot', function () {
                if (t.currentImage)t.update();
            });
        }});
        j.undo = {};
        var m = j.undo.Image = function (s) {
            this.editor = s;
            s.fire('beforeUndoImage');
            var t = s.getSnapshot(), u = t && s.getSelection();
            c && t && (t = t.replace(/\s+data-cke-expando=".*?"/g, ''));
            this.contents = t;
            this.bookmarks = u && u.createBookmarks2(true);
            s.fire('afterUndoImage');
        }, n = /\b(?:href|src|name)="[^"]*?"/gi;
        m.prototype = {equals: function (s, t) {
            var u = this.contents, v = s.contents;
            if (c && (b.ie7Compat || b.ie6Compat)) {
                u = u.replace(n, '');
                v = v.replace(n, '');
            }
            if (u != v)return false;
            if (t)return true;
            var w = this.bookmarks, x = s.bookmarks;
            if (w || x) {
                if (!w || !x || w.length != x.length)return false;
                for (var y = 0; y < w.length; y++) {
                    var z = w[y], A = x[y];
                    if (z.startOffset != A.startOffset || z.endOffset != A.endOffset || !e.arrayCompare(z.start, A.start) || !e.arrayCompare(z.end, A.end))return false;
                }
            }
            return true;
        }};
        function o(s) {
            this.editor = s;
            this.reset();
        };
        var p = {8: 1, 46: 1}, q = {16: 1, 17: 1, 18: 1}, r = {37: 1, 38: 1, 39: 1, 40: 1};
        o.prototype = {type: function (s) {
            var t = s && s.data.getKey(), u = t in q, v = t in p, w = this.lastKeystroke in p, x = v && t == this.lastKeystroke, y = t in r, z = this.lastKeystroke in r, A = !v && !y, B = v && !x, C = !(u || this.typing) || A && (w || z);
            if (C || B) {
                var D = new m(this.editor);
                e.setTimeout(function () {
                    var F = this;
                    var E = F.editor.getSnapshot();
                    if (c)E = E.replace(/\s+data-cke-expando=".*?"/g, '');
                    if (D.contents != E) {
                        F.typing = true;
                        if (!F.save(false, D, false))F.snapshots.splice(F.index + 1, F.snapshots.length - F.index - 1);
                        F.hasUndo = true;
                        F.hasRedo = false;
                        F.typesCount = 1;
                        F.modifiersCount = 1;
                        F.onChange();
                    }
                }, 0, this);
            }
            this.lastKeystroke = t;
            if (v) {
                this.typesCount = 0;
                this.modifiersCount++;
                if (this.modifiersCount > 25) {
                    this.save(false, null, false);
                    this.modifiersCount = 1;
                }
            } else if (!y) {
                this.modifiersCount = 0;
                this.typesCount++;
                if (this.typesCount > 25) {
                    this.save(false, null, false);
                    this.typesCount = 1;
                }
            }
        }, reset: function () {
            var s = this;
            s.lastKeystroke = 0;
            s.snapshots = [];
            s.index = -1;
            s.limit = s.editor.config.undoStackSize || 20;
            s.currentImage = null;
            s.hasUndo = false;
            s.hasRedo = false;
            s.resetType();
        }, resetType: function () {
            var s = this;
            s.typing = false;
            delete s.lastKeystroke;
            s.typesCount = 0;
            s.modifiersCount = 0;
        }, fireChange: function () {
            var s = this;
            s.hasUndo = !!s.getNextImage(true);
            s.hasRedo = !!s.getNextImage(false);
            s.resetType();
            s.onChange();
        }, save: function (s, t, u) {
            var w = this;
            var v = w.snapshots;
            if (!t)t = new m(w.editor);
            if (t.contents === false)return false;
            if (w.currentImage && t.equals(w.currentImage, s))return false;
            v.splice(w.index + 1, v.length - w.index - 1);
            if (v.length == w.limit)v.shift();
            w.index = v.push(t) - 1;
            w.currentImage = t;
            if (u !== false)w.fireChange();
            return true;
        }, restoreImage: function (s) {
            var u = this;
            u.editor.loadSnapshot(s.contents);
            if (s.bookmarks)u.editor.getSelection().selectBookmarks(s.bookmarks); else if (c) {
                var t = u.editor.document.getBody().$.createTextRange();
                t.collapse(true);
                t.select();
            }
            u.index = s.index;
            u.update();
            u.fireChange();
        }, getNextImage: function (s) {
            var x = this;
            var t = x.snapshots, u = x.currentImage, v, w;
            if (u)if (s)for (w = x.index - 1; w >= 0; w--) {
                v = t[w];
                if (!u.equals(v, true)) {
                    v.index = w;
                    return v;
                }
            } else for (w = x.index + 1; w < t.length; w++) {
                v = t[w];
                if (!u.equals(v, true)) {
                    v.index = w;
                    return v;
                }
            }
            return null;
        }, redoable: function () {
            return this.enabled && this.hasRedo;
        }, undoable: function () {
            return this.enabled && this.hasUndo;
        }, undo: function () {
            var t = this;
            if (t.undoable()) {
                t.save(true);
                var s = t.getNextImage(true);
                if (s)return t.restoreImage(s), true;
            }
            return false;
        }, redo: function () {
            var t = this;
            if (t.redoable()) {
                t.save(true);
                if (t.redoable()) {
                    var s = t.getNextImage(false);
                    if (s)return t.restoreImage(s), true;
                }
            }
            return false;
        }, update: function () {
            var s = this;
            s.snapshots.splice(s.index, 1, s.currentImage = new m(s.editor));
        }};
    })();
    (function () {
        var m = /(^|<body\b[^>]*>)\s*<(p|div|address|h\d|center|pre)[^>]*>\s*(?:<br[^>]*>|&nbsp;|\u00A0|&#160;)?\s*(:?<\/\2>)?\s*(?=$|<\/body>)/gi, n = d.walker.whitespaces(true);

        function o(C) {
            return C.isBlockBoundary() && f.$empty[C.getName()];
        };
        function p(C) {
            return function (D) {
                if (this.mode == 'wysiwyg') {
                    this.focus();
                    this.fire('saveSnapshot');
                    C.call(this, D.data);
                    e.setTimeout(function () {
                        this.fire('saveSnapshot');
                    }, 0, this);
                }
            };
        };
        function q(C) {
            var M = this;
            if (M.dataProcessor)C = M.dataProcessor.toHtml(C);
            if (!C)return;
            var D = M.getSelection(), E = D.getRanges()[0];
            if (E.checkReadOnly())return;
            if (b.opera) {
                var F = new d.elementPath(E.startContainer);
                if (F.block) {
                    var G = a.htmlParser.fragment.fromHtml(C, false).children;
                    for (var H = 0, I = G.length; H < I; H++) {
                        if (G[H]._.isBlockLike) {
                            E.splitBlock(M.enterMode == 3 ? 'div' : 'p');
                            E.insertNode(E.document.createText(''));
                            E.select();
                            break;
                        }
                    }
                }
            }
            if (c) {
                var J = D.isLocked;
                if (J)D.unlock();
                var K = D.getNative();
                if (K.type == 'Control')K.clear(); else if (D.getType() == 2) {
                    E = D.getRanges()[0];
                    var L = E && E.endContainer;
                    if (L && L.type == 1 && L.getAttribute('contenteditable') == 'false' && E.checkBoundaryOfElement(L, 2)) {
                        E.setEndAfter(E.endContainer);
                        E.deleteContents();
                    }
                }
                K.createRange().pasteHTML(C);
                if (J)M.getSelection().lock();
            } else M.document.$.execCommand('inserthtml', false, C);
            if (b.webkit) {
                D = M.getSelection();
                D.scrollIntoView();
            }
        };
        function r(C) {
            var D = this.getSelection(), E = D.getStartElement().hasAscendant('pre', true) ? 2 : this.config.enterMode, F = E == 2, G = e.htmlEncode(C.replace(/\r\n|\r/g, '\n'));
            G = G.replace(/^[ \t]+|[ \t]+$/g, function (M, N, O) {
                if (M.length == 1)return '&nbsp;'; else if (!N)return e.repeat('&nbsp;', M.length - 1) + ' '; else return ' ' + e.repeat('&nbsp;', M.length - 1);
            });
            G = G.replace(/[ \t]{2,}/g, function (M) {
                return e.repeat('&nbsp;', M.length - 1) + ' ';
            });
            var H = E == 1 ? 'p' : 'div';
            if (!F)G = G.replace(/(\n{2})([\s\S]*?)(?:$|\1)/g, function (M, N, O) {
                return '<' + H + '>' + O + '</' + H + '>';
            });
            G = G.replace(/\n/g, '<br>');
            if (!(F || c))G = G.replace(new RegExp('<br>(?=</' + H + '>)'), function (M) {
                return e.repeat(M, 2);
            });
            if (b.gecko || b.webkit) {
                var I = new d.elementPath(D.getStartElement()), J = [];
                for (var K = 0; K < I.elements.length; K++) {
                    var L = I.elements[K].getName();
                    if (L in f.$inline)J.unshift(I.elements[K].getOuterHtml().match(/^<.*?>/)); else if (L in f.$block)break;
                }
                G = J.join('') + G;
            }
            q.call(this, G);
        };
        function s(C) {
            var D = this.getSelection(), E = D.getRanges(), F = C.getName(), G = f.$block[F], H = D.isLocked;
            if (H)D.unlock();
            var I, J, K, L;
            for (var M = E.length - 1; M >= 0; M--) {
                I = E[M];
                if (!I.checkReadOnly()) {
                    I.deleteContents(1);
                    J = !M && C || C.clone(1);
                    var N, O;
                    if (G)while ((N = I.getCommonAncestor(0, 1)) && (O = f[N.getName()]) && !(O && O[F])) {
                        if (N.getName() in f.span)I.splitElement(N); else if (I.checkStartOfBlock() && I.checkEndOfBlock()) {
                            I.setStartBefore(N);
                            I.collapse(true);
                            N.remove();
                        } else I.splitBlock();
                    }
                    I.insertNode(J);
                    if (!K)K = J;
                }
            }
            if (K) {
                I.moveToPosition(K, 4);
                if (G) {
                    var P = K.getNext(n), Q = P && P.type == 1 && P.getName();
                    if (Q && f.$block[Q] && f[Q]['#'])I.moveToElementEditStart(P);
                }
            }
            D.selectRanges([I]);
            if (H)this.getSelection().lock();
        };
        function t(C) {
            if (!C.checkDirty())setTimeout(function () {
                C.resetDirty();
            }, 0);
        };
        var u = d.walker.whitespaces(true), v = d.walker.bookmark(false, true);

        function w(C) {
            return u(C) && v(C);
        };
        function x(C) {
            return C.type == 3 && e.trim(C.getText()).match(/^(?:&nbsp;|\xa0)$/);
        };
        function y(C) {
            if (C.isLocked) {
                C.unlock();
                setTimeout(function () {
                    C.lock();
                }, 0);
            }
        };
        function z(C) {
            return C.getOuterHtml().match(m);
        };
        u = d.walker.whitespaces(true);
        function A(C) {
            var D = C.window, E = C.document, F = C.document.getBody(), G = F.getFirst(), H = F.getChildren().count();
            if (!H || H == 1 && G.type == 1 && G.hasAttribute('_moz_editor_bogus_node')) {
                t(C);
                var I = C.element.getDocument(), J = I.getDocumentElement(), K = J.$.scrollTop, L = J.$.scrollLeft, M = E.$.createEvent('KeyEvents');
                M.initKeyEvent('keypress', true, true, D.$, false, false, false, false, 0, 32);
                E.$.dispatchEvent(M);
                if (K != J.$.scrollTop || L != J.$.scrollLeft)I.getWindow().$.scrollTo(L, K);
                H && F.getFirst().remove();
                E.getBody().appendBogus();
                var N = new d.range(E);
                N.setStartAt(F, 1);
                N.select();
            }
        };
        function B(C) {
            var D = C.editor, E = C.data.path, F = E.blockLimit, G = C.data.selection, H = G.getRanges()[0], I = D.document.getBody(), J = D.config.enterMode;
            if (b.gecko) {
                A(D);
                var K = E.block || E.blockLimit, L = K && K.getLast(w);
                if (K && K.isBlockBoundary() && !(L && L.type == 1 && L.isBlockBoundary()) && !K.is('pre') && !K.getBogus())K.appendBogus();
            }
            if (D.config.autoParagraph !== false && J != 2 && H.collapsed && F.getName() == 'body' && !E.block) {
                var M = H.fixBlock(true, D.config.enterMode == 3 ? 'div' : 'p');
                if (c) {
                    var N = M.getFirst(w);
                    N && x(N) && N.remove();
                }
                if (z(M)) {
                    var O = M.getNext(u);
                    if (O && O.type == 1 && !o(O)) {
                        H.moveToElementEditStart(O);
                        M.remove();
                    } else {
                        O = M.getPrevious(u);
                        if (O && O.type == 1 && !o(O)) {
                            H.moveToElementEditEnd(O);
                            M.remove();
                        }
                    }
                }
                H.select();
                C.cancel();
            }
            var P = new d.range(D.document);
            P.moveToElementEditEnd(D.document.getBody());
            var Q = new d.elementPath(P.startContainer);
            if (!Q.blockLimit.is('body')) {
                var R;
                if (J != 2)R = I.append(D.document.createElement(J == 1 ? 'p' : 'div')); else R = I;
                if (!c)R.appendBogus();
            }
        };
        j.add('wysiwygarea', {requires: ['editingblock'], init: function (C) {
            var D = C.config.enterMode != 2 && C.config.autoParagraph !== false ? C.config.enterMode == 3 ? 'div' : 'p' : false, E = C.lang.editorTitle.replace('%1', C.name), F;
            C.on('editingBlockReady', function () {
                var L, M, N, O, P, Q, R = b.isCustomDomain(), S = function (V) {
                    if (M)M.remove();
                    var W = 'document.open();' + (R ? 'document.domain="' + document.domain + '";' : '') + 'document.close();';
                    W = b.air ? 'javascript:void(0)' : c ? 'javascript:void(function(){' + encodeURIComponent(W) + '}())' : '';
                    M = h.createFromHtml('<iframe style="width:100%;height:100%" frameBorder="0" title="' + E + '"' + ' src="' + W + '"' + ' tabIndex="' + (b.webkit ? -1 : C.tabIndex) + '"' + ' allowTransparency="true"' + '></iframe>');
                    if (document.location.protocol == 'chrome:')a.event.useCapture = true;
                    M.on('load', function (X) {
                        P = 1;
                        X.removeListener();
                        var Y = M.getFrameDocument();
                        Y.write(V);
                        b.air && U(Y.getWindow().$);
                    });
                    if (document.location.protocol == 'chrome:')a.event.useCapture = false;
                    L.append(M);
                };
                F = e.addFunction(U);
                var T = '<script id="cke_actscrpt" type="text/javascript" data-cke-temp="1">' + (R ? 'document.domain="' + document.domain + '";' : '') + 'window.parent.CKEDITOR.tools.callFunction( ' + F + ', window );' + '</script>';

                function U(V) {
                    if (!P)return;
                    P = 0;
                    C.fire('ariaWidget', M);
                    var W = V.document, X = W.body, Y = W.getElementById('cke_actscrpt');
                    Y && Y.parentNode.removeChild(Y);
                    X.spellcheck = !C.config.disableNativeSpellChecker;
                    var Z = !C.readOnly;
                    if (c) {
                        X.hideFocus = true;
                        X.disabled = true;
                        X.contentEditable = Z;
                        X.removeAttribute('disabled');
                    } else setTimeout(function () {
                        if (b.gecko && b.version >= 10900 || b.opera)W.$.body.contentEditable = Z; else if (b.webkit)W.$.body.parentNode.contentEditable = Z; else W.$.designMode = Z ? 'off' : 'on';
                    }, 0);
                    Z && b.gecko && e.setTimeout(A, 0, null, C);
                    V = C.window = new d.window(V);
                    W = C.document = new g(W);
                    Z && W.on('dblclick', function (af) {
                        var ag = af.data.getTarget(), ah = {element: ag, dialog: ''};
                        C.fire('doubleclick', ah);
                        ah.dialog && C.openDialog(ah.dialog);
                    });
                    c && W.on('click', function (af) {
                        var ag = af.data.getTarget();
                        if (ag.is('input')) {
                            var ah = ag.getAttribute('type');
                            if (ah == 'submit' || ah == 'reset')af.data.preventDefault();
                        }
                    });
                    if (!(c || b.opera))W.on('mousedown', function (af) {
                        var ag = af.data.getTarget();
                        if (ag.is('img', 'hr', 'input', 'textarea', 'select'))C.getSelection().selectElement(ag);
                    });
                    if (b.gecko)W.on('mouseup', function (af) {
                        if (af.data.$.button == 2) {
                            var ag = af.data.getTarget();
                            if (!ag.getOuterHtml().replace(m, '')) {
                                var ah = new d.range(W);
                                ah.moveToElementEditStart(ag);
                                ah.select(true);
                            }
                        }
                    });
                    W.on('click', function (af) {
                        af = af.data;
                        if (af.getTarget().is('a') && af.$.button != 2)af.preventDefault();
                    });
                    if (b.webkit) {
                        W.on('mousedown', function () {
                            ac = 1;
                        });
                        W.on('click', function (af) {
                            if (af.data.getTarget().is('input', 'select'))af.data.preventDefault();
                        });
                        W.on('mouseup', function (af) {
                            if (af.data.getTarget().is('input', 'textarea'))af.data.preventDefault();
                        });
                    }
                    if (Z && c && W.$.compatMode == 'CSS1Compat' || b.gecko || b.opera) {
                        var aa = W.getDocumentElement();
                        aa.on('mousedown', function (af) {
                            if (af.data.getTarget().equals(aa)) {
                                if (b.gecko && b.version >= 10900)J();
                                K.focus();
                            }
                        });
                    }
                    var ab = c ? M : V;
                    ab.on('blur', function () {
                        C.focusManager.blur();
                    });
                    var ac;
                    ab.on('focus', function () {
                        var af = C.document;
                        if (Z && b.gecko && b.version >= 10900)J(); else if (b.opera)af.getBody().focus(); else if (b.webkit)if (!ac) {
                            C.document.getDocumentElement().focus();
                            ac = 1;
                        }
                        C.focusManager.focus();
                    });
                    var ad = C.keystrokeHandler;
                    ad.blockedKeystrokes[8] = !Z;
                    ad.attach(W);
                    W.getDocumentElement().addClass(W.$.compatMode);
                    Z && W.on('keydown', function (af) {
                        var ag = af.data.getKeystroke();
                        if (ag in {8: 1, 46: 1}) {
                            var ah = C.getSelection(), ai = ah.getSelectedElement(), aj = ah.getRanges()[0];
                            if (ai) {
                                C.fire('saveSnapshot');
                                aj.moveToPosition(ai, 3);
                                ai.remove();
                                aj.select();
                                C.fire('saveSnapshot');
                                af.data.preventDefault();
                                return;
                            }
                        }
                    });
                    if (c && W.$.compatMode == 'CSS1Compat') {
                        var ae = {33: 1, 34: 1};
                        W.on('keydown', function (af) {
                            if (af.data.getKeystroke() in ae)setTimeout(function () {
                                C.getSelection().scrollIntoView();
                            }, 0);
                        });
                    }
                    if (c && C.config.enterMode != 1)W.on('selectionchange', function () {
                        var af = W.getBody(), ag = C.getSelection().getRanges()[0];
                        if (af.getHtml().match(/^<p>&nbsp;<\/p>$/i) && ag.startContainer.equals(af))setTimeout(function () {
                            ag = C.getSelection().getRanges()[0];
                            if (!ag.startContainer.equals('body')) {
                                af.getFirst().remove(1);
                                ag.moveToElementEditEnd(af);
                                ag.select(1);
                            }
                        }, 0);
                    });
                    if (C.contextMenu)C.contextMenu.addTarget(W, C.config.browserContextMenuOnCtrl !== false);
                    setTimeout(function () {
                        C.fire('contentDom');
                        if (Q) {
                            C.mode = 'wysiwyg';
                            C.fire('mode', {previousMode: C._.previousMode});
                            Q = false;
                        }
                        N = false;
                        if (O) {
                            C.focus();
                            O = false;
                        }
                        setTimeout(function () {
                            C.fire('dataReady');
                        }, 0);
                        try {
                            C.document.$.execCommand('enableInlineTableEditing', false, !C.config.disableNativeTableHandles);
                        } catch (af) {
                        }
                        if (C.config.disableObjectResizing)try {
                            C.document.$.execCommand('enableObjectResizing', false, false);
                        } catch (ag) {
                            C.document.getBody().on(c ? 'resizestart' : 'resize', function (ah) {
                                ah.data.preventDefault();
                            });
                        }
                        if (c)setTimeout(function () {
                            if (C.document) {
                                var ah = C.document.$.body;
                                ah.runtimeStyle.marginBottom = '0px';
                                ah.runtimeStyle.marginBottom = '';
                            }
                        }, 1000);
                    }, 0);
                };
                C.addMode('wysiwyg', {load: function (V, W, X) {
                    L = V;
                    if (c && b.quirks)V.setStyle('position', 'relative');
                    C.mayBeDirty = true;
                    Q = true;
                    if (X)this.loadSnapshotData(W); else this.loadData(W);
                }, loadData: function (V) {
                    N = true;
                    C._.dataStore = {id: 1};
                    var W = C.config, X = W.fullPage, Y = W.docType, Z = '<style type="text/css" data-cke-temp="1">' + C._.styles.join('\n') + '</style>';
                    !X && (Z = e.buildStyleHtml(C.config.contentsCss) + Z);
                    var aa = W.baseHref ? '<base href="' + W.baseHref + '" data-cke-temp="1" />' : '';
                    if (X)V = V.replace(/<!DOCTYPE[^>]*>/i,function (ab) {
                        C.docType = Y = ab;
                        return '';
                    }).replace(/<\?xml\s[^\?]*\?>/i, function (ab) {
                        C.xmlDeclaration = ab;
                        return '';
                    });
                    if (C.dataProcessor)V = C.dataProcessor.toHtml(V, D);
                    if (X) {
                        if (!/<body[\s|>]/.test(V))V = '<body>' + V;
                        if (!/<html[\s|>]/.test(V))V = '<html>' + V + '</html>';
                        if (!/<head[\s|>]/.test(V))V = V.replace(/<html[^>]*>/, '$&<head><title></title></head>'); else if (!/<title[\s|>]/.test(V))V = V.replace(/<head[^>]*>/, '$&<title></title>');
                        aa && (V = V.replace(/<head>/, '$&' + aa));
                        V = V.replace(/<\/head\s*>/, Z + '$&');
                        V = Y + V;
                    } else V = W.docType + '<html dir="' + W.contentsLangDirection + '"' + ' lang="' + (W.contentsLanguage || C.langCode) + '">' + '<head>' + '<title>' + E + '</title>' + aa + Z + '</head>' + '<body' + (W.bodyId ? ' id="' + W.bodyId + '"' : '') + (W.bodyClass ? ' class="' + W.bodyClass + '"' : '') + '>' + V + '</html>';
                    if (b.gecko)V = V.replace(/<br \/>(?=\s*<\/(:?html|body)>)/, '$&<br type="_moz" />');
                    V += T;
                    this.onDispose();
                    S(V);
                }, getData: function () {
                    var V = C.config, W = V.fullPage, X = W && C.docType, Y = W && C.xmlDeclaration, Z = M.getFrameDocument(), aa = W ? Z.getDocumentElement().getOuterHtml() : Z.getBody().getHtml();
                    if (b.gecko)aa = aa.replace(/<br>(?=\s*(:?$|<\/body>))/, '');
                    if (C.dataProcessor)aa = C.dataProcessor.toDataFormat(aa, D);
                    if (V.ignoreEmptyParagraph)aa = aa.replace(m, function (ab, ac) {
                        return ac;
                    });
                    if (Y)aa = Y + '\n' + aa;
                    if (X)aa = X + '\n' + aa;
                    return aa;
                }, getSnapshotData: function () {
                    return M.getFrameDocument().getBody().getHtml();
                }, loadSnapshotData: function (V) {
                    M.getFrameDocument().getBody().setHtml(V);
                }, onDispose: function () {
                    if (!C.document)return;
                    C.document.getDocumentElement().clearCustomData();
                    C.document.getBody().clearCustomData();
                    C.window.clearCustomData();
                    C.document.clearCustomData();
                    M.clearCustomData();
                    M.remove();
                }, unload: function (V) {
                    this.onDispose();
                    C.window = C.document = M = L = O = null;
                    C.fire('contentDomUnload');
                }, focus: function () {
                    var V = C.window;
                    if (N)O = true; else if (V) {
                        b.air ? setTimeout(function () {
                            V.focus();
                        }, 0) : V.focus();
                        C.selectionChange();
                    }
                }});
                C.on('insertHtml', p(q), null, null, 20);
                C.on('insertElement', p(s), null, null, 20);
                C.on('insertText', p(r), null, null, 20);
                C.on('selectionChange', function (V) {
                    if (C.readOnly)return;
                    var W = C.getSelection();
                    if (W && !W.isLocked) {
                        var X = C.checkDirty();
                        C.fire('saveSnapshot', {contentOnly: 1});
                        B.call(this, V);
                        C.fire('updateSnapshot');
                        !X && C.resetDirty();
                    }
                }, null, null, 1);
            });
            var G;
            C.on('contentDom', function () {
                var L = C.document.getElementsByTag('title').getItem(0);
                L.data('cke-title', C.document.$.title);
                C.document.$.title = E;
            });
            C.on('readOnly', function () {
                if (C.mode == 'wysiwyg') {
                    var L = C.getMode();
                    L.loadData(L.getData());
                }
            });
            if (a.document.$.documentMode >= 8) {
                C.addCss('html.CSS1Compat [contenteditable=false]{ min-height:0 !important;}');
                var H = [];
                for (var I in f.$removeEmpty)H.push('html.CSS1Compat ' + I + '[contenteditable=false]');
                C.addCss(H.join(',') + '{ display:inline-block;}');
            } else if (b.gecko) {
                C.addCss('html { height: 100% !important; }');
                C.addCss('img:-moz-broken { -moz-force-broken-image-icons : 1;\twidth : 24px; height : 24px; }');
            }
            C.addCss('html {\t_overflow-y: scroll; cursor: text;\t*cursor:auto;}');
            C.addCss('img, input, textarea { cursor: default;}');
            function J(L) {
                if (C.readOnly)return;
                e.tryThese(function () {
                    C.document.$.designMode = 'on';
                    setTimeout(function () {
                        C.document.$.designMode = 'off';
                        if (a.currentInstance == C)C.document.getBody().focus();
                    }, 50);
                }, function () {
                    C.document.$.designMode = 'off';
                    var M = C.document.getBody();
                    M.setAttribute('contentEditable', false);
                    M.setAttribute('contentEditable', true);
                    !L && J(1);
                });
            };
            if (b.gecko || c || b.opera) {
                var K;
                C.on('uiReady', function () {
                    K = C.container.append(h.createFromHtml('<span tabindex="-1" style="position:absolute;" role="presentation"></span>'));
                    K.on('focus', function () {
                        C.focus();
                    });
                    C.focusGrabber = K;
                });
                C.on('destroy', function () {
                    e.removeFunction(F);
                    K.clearCustomData();
                    delete C.focusGrabber;
                });
            }
            C.on('insertElement', function (L) {
                var M = L.data;
                if (M.type == 1 && (M.is('input') || M.is('textarea'))) {
                    var N = M.getAttribute('contenteditable') == 'false';
                    if (!N) {
                        M.data('cke-editable', M.hasAttribute('contenteditable') ? 'true' : '1');
                        M.setAttribute('contenteditable', false);
                    }
                }
            });
        }});
        if (b.gecko)(function () {
            var C = document.body;
            if (!C)window.addEventListener('load', arguments.callee, false); else {
                var D = C.getAttribute('onpageshow');
                C.setAttribute('onpageshow', (D ? D + ';' : '') + 'event.persisted && (function(){' + 'var allInstances = CKEDITOR.instances, editor, doc;' + 'for ( var i in allInstances )' + '{' + '\teditor = allInstances[ i ];' + '\tdoc = editor.document;' + '\tif ( doc )' + '\t{' + '\t\tdoc.$.designMode = "off";' + '\t\tdoc.$.designMode = "on";' + '\t}' + '}' + '})();');
            }
        })();
    })();
    i.disableObjectResizing = false;
    i.disableNativeTableHandles = true;
    i.disableNativeSpellChecker = true;
    i.ignoreEmptyParagraph = true;
    j.add('wsc', {requires: ['dialog'], init: function (m) {
        var n = 'checkspell', o = m.addCommand(n, new a.dialogCommand(n));
        o.modes = {wysiwyg: !b.opera && !b.air && document.domain == window.location.hostname};
        m.ui.addButton('SpellChecker', {label: m.lang.spellCheck.toolbar, command: n});
        a.dialog.add(n, this.path + 'dialogs/wsc.js');
    }});
    i.wsc_customerId = i.wsc_customerId || '1:ua3xw1-2XyGJ3-GWruD3-6OFNT1-oXcuB1-nR6Bp4-hgQHc-EcYng3-sdRXG3-NOfFk';
    i.wsc_customLoaderScript = i.wsc_customLoaderScript || null;
    a.DIALOG_RESIZE_NONE = 0;
    a.DIALOG_RESIZE_WIDTH = 1;
    a.DIALOG_RESIZE_HEIGHT = 2;
    a.DIALOG_RESIZE_BOTH = 3;
    (function () {
        var m = e.cssLength;

        function n(S) {
            return!!this._.tabs[S][0].$.offsetHeight;
        };
        function o() {
            var W = this;
            var S = W._.currentTabId, T = W._.tabIdList.length, U = e.indexOf(W._.tabIdList, S) + T;
            for (var V = U - 1; V > U - T; V--) {
                if (n.call(W, W._.tabIdList[V % T]))return W._.tabIdList[V % T];
            }
            return null;
        };
        function p() {
            var W = this;
            var S = W._.currentTabId, T = W._.tabIdList.length, U = e.indexOf(W._.tabIdList, S);
            for (var V = U + 1; V < U + T; V++) {
                if (n.call(W, W._.tabIdList[V % T]))return W._.tabIdList[V % T];
            }
            return null;
        };
        function q(S, T) {
            var U = S.$.getElementsByTagName('input');
            for (var V = 0, W = U.length; V < W; V++) {
                var X = new h(U[V]);
                if (X.getAttribute('type').toLowerCase() == 'text')if (T) {
                    X.setAttribute('value', X.getCustomData('fake_value') || '');
                    X.removeCustomData('fake_value');
                } else {
                    X.setCustomData('fake_value', X.getAttribute('value'));
                    X.setAttribute('value', '');
                }
            }
        };
        function r(S, T) {
            var V = this;
            var U = V.getInputElement();
            if (U)S ? U.removeAttribute('aria-invalid') : U.setAttribute('aria-invalid', true);
            if (!S)if (V.select)V.select(); else V.focus();
            T && alert(T);
            V.fire('validated', {valid: S, msg: T});
        };
        function s() {
            var S = this.getInputElement();
            S && S.removeAttribute('aria-invalid');
        };
        a.dialog = function (S, T) {
            var U = a.dialog._.dialogDefinitions[T], V = e.clone(u), W = S.config.dialog_buttonsOrder || 'OS', X = S.lang.dir;
            if (W == 'OS' && b.mac || W == 'rtl' && X == 'ltr' || W == 'ltr' && X == 'rtl')V.buttons.reverse();
            U = e.extend(U(S), V);
            U = e.clone(U);
            U = new y(this, U);
            var Y = a.document, Z = S.theme.buildDialog(S);
            this._ = {editor: S, element: Z.element, name: T, contentSize: {width: 0, height: 0}, size: {width: 0, height: 0}, contents: {}, buttons: {}, accessKeyMap: {}, tabs: {}, tabIdList: [], currentTabId: null, currentTabIndex: null, pageCount: 0, lastTab: null, tabBarMode: false, focusList: [], currentFocusIndex: 0, hasFocus: false};
            this.parts = Z.parts;
            e.setTimeout(function () {
                S.fire('ariaWidget', this.parts.contents);
            }, 0, this);
            var aa = {position: b.ie6Compat ? 'absolute' : 'fixed', top: 0, visibility: 'hidden'};
            aa[X == 'rtl' ? 'right' : 'left'] = 0;
            this.parts.dialog.setStyles(aa);
            a.event.call(this);
            this.definition = U = a.fire('dialogDefinition', {name: T, definition: U}, S).definition;
            var ab = {};
            if (!('removeDialogTabs' in S._) && S.config.removeDialogTabs) {
                var ac = S.config.removeDialogTabs.split(';');
                for (i = 0; i < ac.length; i++) {
                    var ad = ac[i].split(':');
                    if (ad.length == 2) {
                        var ae = ad[0];
                        if (!ab[ae])ab[ae] = [];
                        ab[ae].push(ad[1]);
                    }
                }
                S._.removeDialogTabs = ab;
            }
            if (S._.removeDialogTabs && (ab = S._.removeDialogTabs[T]))for (i = 0; i < ab.length; i++)U.removeContents(ab[i]);
            if (U.onLoad)this.on('load', U.onLoad);
            if (U.onShow)this.on('show', U.onShow);
            if (U.onHide)this.on('hide', U.onHide);
            if (U.onOk)this.on('ok', function (ar) {
                S.fire('saveSnapshot');
                setTimeout(function () {
                    S.fire('saveSnapshot');
                }, 0);
                if (U.onOk.call(this, ar) === false)ar.data.hide = false;
            });
            if (U.onCancel)this.on('cancel', function (ar) {
                if (U.onCancel.call(this, ar) === false)ar.data.hide = false;
            });
            var af = this, ag = function (ar) {
                var as = af._.contents, at = false;
                for (var au in as)for (var av in as[au]) {
                    at = ar.call(this, as[au][av]);
                    if (at)return;
                }
            };
            this.on('ok', function (ar) {
                ag(function (as) {
                    if (as.validate) {
                        var at = as.validate(this), au = typeof at == 'string' || at === false;
                        if (au) {
                            ar.data.hide = false;
                            ar.stop();
                        }
                        r.call(as, !au, typeof at == 'string' ? at : undefined);
                        return au;
                    }
                });
            }, this, null, 0);
            this.on('cancel', function (ar) {
                ag(function (as) {
                    if (as.isChanged()) {
                        if (!confirm(S.lang.common.confirmCancel))ar.data.hide = false;
                        return true;
                    }
                });
            }, this, null, 0);
            this.parts.close.on('click', function (ar) {
                if (this.fire('cancel', {hide: true}).hide !== false)this.hide();
                ar.data.preventDefault();
            }, this);
            function ah() {
                var ar = af._.focusList;
                ar.sort(function (au, av) {
                    if (au.tabIndex != av.tabIndex)return av.tabIndex - au.tabIndex; else return au.focusIndex - av.focusIndex;
                });
                var as = ar.length;
                for (var at = 0; at < as; at++)ar[at].focusIndex = at;
            };
            function ai(ar) {
                var as = af._.focusList, at = ar ? 1 : -1;
                if (as.length < 1)return;
                var au = af._.currentFocusIndex;
                try {
                    as[au].getInputElement().$.blur();
                } catch (ax) {
                }
                var av = (au + at + as.length) % as.length, aw = av;
                while (!as[aw].isFocusable()) {
                    aw = (aw + at + as.length) % as.length;
                    if (aw == av)break;
                }
                as[aw].focus();
                if (as[aw].type == 'text')as[aw].select();
            };
            this.changeFocus = ai;
            var aj;

            function ak(ar) {
                var aw = this;
                if (af != a.dialog._.currentTop)return;
                var as = ar.data.getKeystroke(), at = S.lang.dir == 'rtl';
                aj = 0;
                if (as == 9 || as == 2228224 + 9) {
                    var au = as == 2228224 + 9;
                    if (af._.tabBarMode) {
                        var av = au ? o.call(af) : p.call(af);
                        af.selectPage(av);
                        af._.tabs[av][0].focus();
                    } else ai(!au);
                    aj = 1;
                } else if (as == 4456448 + 121 && !af._.tabBarMode && af.getPageCount() > 1) {
                    af._.tabBarMode = true;
                    af._.tabs[af._.currentTabId][0].focus();
                    aj = 1;
                } else if ((as == 37 || as == 39) && af._.tabBarMode) {
                    av = as == (at ? 39 : 37) ? o.call(af) : p.call(af);
                    af.selectPage(av);
                    af._.tabs[av][0].focus();
                    aj = 1;
                } else if ((as == 13 || as == 32) && af._.tabBarMode) {
                    aw.selectPage(aw._.currentTabId);
                    aw._.tabBarMode = false;
                    aw._.currentFocusIndex = -1;
                    ai(true);
                    aj = 1;
                }
                if (aj) {
                    ar.stop();
                    ar.data.preventDefault();
                }
            };
            function al(ar) {
                aj && ar.data.preventDefault();
            };
            var am = this._.element;
            this.on('show', function () {
                am.on('keydown', ak, this, null, 0);
                if (b.opera || b.gecko && b.mac)am.on('keypress', al, this);
            });
            this.on('hide', function () {
                am.removeListener('keydown', ak);
                if (b.opera || b.gecko && b.mac)am.removeListener('keypress', al);
                ag(function (ar) {
                    s.apply(ar);
                });
            });
            this.on('iframeAdded', function (ar) {
                var as = new g(ar.data.iframe.$.contentWindow.document);
                as.on('keydown', ak, this, null, 0);
            });
            this.on('show', function () {
                var av = this;
                ah();
                if (S.config.dialog_startupFocusTab && af._.pageCount > 1) {
                    af._.tabBarMode = true;
                    af._.tabs[af._.currentTabId][0].focus();
                } else if (!av._.hasFocus) {
                    av._.currentFocusIndex = -1;
                    if (U.onFocus) {
                        var ar = U.onFocus.call(av);
                        ar && ar.focus();
                    } else ai(true);
                    if (av._.editor.mode == 'wysiwyg' && c) {
                        var as = S.document.$.selection, at = as.createRange();
                        if (at)if (at.parentElement && at.parentElement().ownerDocument == S.document.$ || at.item && at.item(0).ownerDocument == S.document.$) {
                            var au = document.body.createTextRange();
                            au.moveToElementText(av.getElement().getFirst().$);
                            au.collapse(true);
                            au.select();
                        }
                    }
                }
            }, this, null, 4294967295);
            if (b.ie6Compat)this.on('load', function (ar) {
                var as = this.getElement(), at = as.getFirst();
                at.remove();
                at.appendTo(as);
            }, this);
            A(this);
            B(this);
            new d.text(U.title, a.document).appendTo(this.parts.title);
            for (var an = 0; an < U.contents.length; an++) {
                var ao = U.contents[an];
                ao && this.addPage(ao);
            }
            this.parts.tabs.on('click', function (ar) {
                var au = this;
                var as = ar.data.getTarget();
                if (as.hasClass('cke_dialog_tab')) {
                    var at = as.$.id;
                    au.selectPage(at.substring(4, at.lastIndexOf('_')));
                    if (au._.tabBarMode) {
                        au._.tabBarMode = false;
                        au._.currentFocusIndex = -1;
                        ai(true);
                    }
                    ar.data.preventDefault();
                }
            }, this);
            var ap = [], aq = a.dialog._.uiElementBuilders.hbox.build(this, {type: 'hbox', className: 'cke_dialog_footer_buttons', widths: [], children: U.buttons}, ap).getChild();
            this.parts.footer.setHtml(ap.join(''));
            for (an = 0; an < aq.length; an++)this._.buttons[aq[an].id] = aq[an];
        };
        function t(S, T, U) {
            this.element = T;
            this.focusIndex = U;
            this.tabIndex = 0;
            this.isFocusable = function () {
                return!T.getAttribute('disabled') && T.isVisible();
            };
            this.focus = function () {
                S._.currentFocusIndex = this.focusIndex;
                this.element.focus();
            };
            T.on('keydown', function (V) {
                if (V.data.getKeystroke() in {32: 1, 13: 1})this.fire('click');
            });
            T.on('focus', function () {
                this.fire('mouseover');
            });
            T.on('blur', function () {
                this.fire('mouseout');
            });
        };
        a.dialog.prototype = {destroy: function () {
            this.hide();
            this._.element.remove();
        }, resize: (function () {
            return function (S, T) {
                var U = this;
                if (U._.contentSize && U._.contentSize.width == S && U._.contentSize.height == T)return;
                a.dialog.fire('resize', {dialog: U, skin: U._.editor.skinName, width: S, height: T}, U._.editor);
                U.fire('resize', {skin: U._.editor.skinName, width: S, height: T}, U._.editor);
                if (U._.editor.lang.dir == 'rtl' && U._.position)U._.position.x = a.document.getWindow().getViewPaneSize().width - U._.contentSize.width - parseInt(U._.element.getFirst().getStyle('right'), 10);
                U._.contentSize = {width: S, height: T};
            };
        })(), getSize: function () {
            var S = this._.element.getFirst();
            return{width: S.$.offsetWidth || 0, height: S.$.offsetHeight || 0};
        }, move: (function () {
            var S;
            return function (T, U, V) {
                var ac = this;
                var W = ac._.element.getFirst(), X = ac._.editor.lang.dir == 'rtl';
                if (S === undefined)S = W.getComputedStyle('position') == 'fixed';
                if (S && ac._.position && ac._.position.x == T && ac._.position.y == U)return;
                ac._.position = {x: T, y: U};
                if (!S) {
                    var Y = a.document.getWindow().getScrollPosition();
                    T += Y.x;
                    U += Y.y;
                }
                if (X) {
                    var Z = ac.getSize(), aa = a.document.getWindow().getViewPaneSize();
                    T = aa.width - Z.width - T;
                }
                var ab = {top: (U > 0 ? U : 0) + 'px'};
                ab[X ? 'right' : 'left'] = (T > 0 ? T : 0) + 'px';
                W.setStyles(ab);
                V && (ac._.moved = 1);
            };
        })(), getPosition: function () {
            return e.extend({}, this._.position);
        }, show: function () {
            var S = this._.element, T = this.definition;
            if (!(S.getParent() && S.getParent().equals(a.document.getBody())))S.appendTo(a.document.getBody()); else S.setStyle('display', 'block');
            if (b.gecko && b.version < 10900) {
                var U = this.parts.dialog;
                U.setStyle('position', 'absolute');
                setTimeout(function () {
                    U.setStyle('position', 'fixed');
                }, 0);
            }
            this.resize(this._.contentSize && this._.contentSize.width || T.width || T.minWidth, this._.contentSize && this._.contentSize.height || T.height || T.minHeight);
            this.reset();
            this.selectPage(this.definition.contents[0].id);
            if (a.dialog._.currentZIndex === null)a.dialog._.currentZIndex = this._.editor.config.baseFloatZIndex;
            this._.element.getFirst().setStyle('z-index', a.dialog._.currentZIndex += 10);
            if (a.dialog._.currentTop === null) {
                a.dialog._.currentTop = this;
                this._.parentDialog = null;
                G(this._.editor);
                S.on('keydown', K);
                S.on(b.opera ? 'keypress' : 'keyup', L);
                for (var V in {keyup: 1, keydown: 1, keypress: 1})S.on(V, R);
            } else {
                this._.parentDialog = a.dialog._.currentTop;
                var W = this._.parentDialog.getElement().getFirst();
                W.$.style.zIndex -= Math.floor(this._.editor.config.baseFloatZIndex / 2);
                a.dialog._.currentTop = this;
            }
            M(this, this, '\x1b', null, function () {
                this.getButton('cancel') && this.getButton('cancel').click();
            });
            this._.hasFocus = false;
            e.setTimeout(function () {
                this.layout();
                this.parts.dialog.setStyle('visibility', '');
                this.fireOnce('load', {});
                k.fire('ready', this);
                this.fire('show', {});
                this._.editor.fire('dialogShow', this);
                this.foreach(function (X) {
                    X.setInitValue && X.setInitValue();
                });
            }, 100, this);
        }, layout: function () {
            var U = this;
            var S = a.document.getWindow().getViewPaneSize(), T = U.getSize();
            U.move(U._.moved ? U._.position.x : (S.width - T.width) / 2, U._.moved ? U._.position.y : (S.height - T.height) / 2);
        }, foreach: function (S) {
            var V = this;
            for (var T in V._.contents)for (var U in V._.contents[T])S.call(V, V._.contents[T][U]);
            return V;
        }, reset: (function () {
            var S = function (T) {
                if (T.reset)T.reset(1);
            };
            return function () {
                this.foreach(S);
                return this;
            };
        })(), setupContent: function () {
            var S = arguments;
            this.foreach(function (T) {
                if (T.setup)T.setup.apply(T, S);
            });
        }, commitContent: function () {
            var S = arguments;
            this.foreach(function (T) {
                if (c && this._.currentFocusIndex == T.focusIndex)T.getInputElement().$.blur();
                if (T.commit)T.commit.apply(T, S);
            });
        }, hide: function () {
            if (!this.parts.dialog.isVisible())return;
            this.fire('hide', {});
            this._.editor.fire('dialogHide', this);
            var S = this._.element;
            S.setStyle('display', 'none');
            this.parts.dialog.setStyle('visibility', 'hidden');
            N(this);
            while (a.dialog._.currentTop != this)a.dialog._.currentTop.hide();
            if (!this._.parentDialog)H(); else {
                var T = this._.parentDialog.getElement().getFirst();
                T.setStyle('z-index', parseInt(T.$.style.zIndex, 10) + Math.floor(this._.editor.config.baseFloatZIndex / 2));
            }
            a.dialog._.currentTop = this._.parentDialog;
            if (!this._.parentDialog) {
                a.dialog._.currentZIndex = null;
                S.removeListener('keydown', K);
                S.removeListener(b.opera ? 'keypress' : 'keyup', L);
                for (var U in {keyup: 1, keydown: 1, keypress: 1})S.removeListener(U, R);
                var V = this._.editor;
                V.focus();
                if (V.mode == 'wysiwyg' && c) {
                    var W = V.getSelection();
                    W && W.unlock(true);
                }
            } else a.dialog._.currentZIndex -= 10;
            delete this._.parentDialog;
            this.foreach(function (X) {
                X.resetInitValue && X.resetInitValue();
            });
        }, addPage: function (S) {
            var ae = this;
            var T = [], U = S.label ? ' title="' + e.htmlEncode(S.label) + '"' : '', V = S.elements, W = a.dialog._.uiElementBuilders.vbox.build(ae, {type: 'vbox', className: 'cke_dialog_page_contents', children: S.elements, expand: !!S.expand, padding: S.padding, style: S.style || 'width: 100%;height:100%'}, T), X = h.createFromHtml(T.join(''));
            X.setAttribute('role', 'tabpanel');
            var Y = b, Z = 'cke_' + S.id + '_' + e.getNextNumber(), aa = h.createFromHtml(['<a class="cke_dialog_tab"', ae._.pageCount > 0 ? ' cke_last' : 'cke_first', U, !!S.hidden ? ' style="display:none"' : '', ' id="', Z, '"', Y.gecko && Y.version >= 10900 && !Y.hc ? '' : ' href="javascript:void(0)"', ' tabIndex="-1"', ' hidefocus="true"', ' role="tab">', S.label, '</a>'].join(''));
            X.setAttribute('aria-labelledby', Z);
            ae._.tabs[S.id] = [aa, X];
            ae._.tabIdList.push(S.id);
            !S.hidden && ae._.pageCount++;
            ae._.lastTab = aa;
            ae.updateStyle();
            var ab = ae._.contents[S.id] = {}, ac, ad = W.getChild();
            while (ac = ad.shift()) {
                ab[ac.id] = ac;
                if (typeof ac.getChild == 'function')ad.push.apply(ad, ac.getChild());
            }
            X.setAttribute('name', S.id);
            X.appendTo(ae.parts.contents);
            aa.unselectable();
            ae.parts.tabs.append(aa);
            if (S.accessKey) {
                M(ae, ae, 'CTRL+' + S.accessKey, P, O);
                ae._.accessKeyMap['CTRL+' + S.accessKey] = S.id;
            }
        }, selectPage: function (S) {
            if (this._.currentTabId == S)return;
            if (this.fire('selectPage', {page: S, currentPage: this._.currentTabId}) === true)return;
            for (var T in this._.tabs) {
                var U = this._.tabs[T][0], V = this._.tabs[T][1];
                if (T != S) {
                    U.removeClass('cke_dialog_tab_selected');
                    V.hide();
                }
                V.setAttribute('aria-hidden', T != S);
            }
            var W = this._.tabs[S];
            W[0].addClass('cke_dialog_tab_selected');
            if (b.ie6Compat || b.ie7Compat) {
                q(W[1]);
                W[1].show();
                setTimeout(function () {
                    q(W[1], 1);
                }, 0);
            } else W[1].show();
            this._.currentTabId = S;
            this._.currentTabIndex = e.indexOf(this._.tabIdList, S);
        }, updateStyle: function () {
            this.parts.dialog[(this._.pageCount === 1 ? 'add' : 'remove') + 'Class']('cke_single_page');
        }, hidePage: function (S) {
            var U = this;
            var T = U._.tabs[S] && U._.tabs[S][0];
            if (!T || U._.pageCount == 1 || !T.isVisible())return; else if (S == U._.currentTabId)U.selectPage(o.call(U));
            T.hide();
            U._.pageCount--;
            U.updateStyle();
        }, showPage: function (S) {
            var U = this;
            var T = U._.tabs[S] && U._.tabs[S][0];
            if (!T)return;
            T.show();
            U._.pageCount++;
            U.updateStyle();
        }, getElement: function () {
            return this._.element;
        }, getName: function () {
            return this._.name;
        }, getContentElement: function (S, T) {
            var U = this._.contents[S];
            return U && U[T];
        }, getValueOf: function (S, T) {
            return this.getContentElement(S, T).getValue();
        }, setValueOf: function (S, T, U) {
            return this.getContentElement(S, T).setValue(U);
        }, getButton: function (S) {
            return this._.buttons[S];
        }, click: function (S) {
            return this._.buttons[S].click();
        }, disableButton: function (S) {
            return this._.buttons[S].disable();
        }, enableButton: function (S) {
            return this._.buttons[S].enable();
        }, getPageCount: function () {
            return this._.pageCount;
        }, getParentEditor: function () {
            return this._.editor;
        }, getSelectedElement: function () {
            return this.getParentEditor().getSelection().getSelectedElement();
        }, addFocusable: function (S, T) {
            var V = this;
            if (typeof T == 'undefined') {
                T = V._.focusList.length;
                V._.focusList.push(new t(V, S, T));
            } else {
                V._.focusList.splice(T, 0, new t(V, S, T));
                for (var U = T + 1; U < V._.focusList.length; U++)V._.focusList[U].focusIndex++;
            }
        }};
        e.extend(a.dialog, {add: function (S, T) {
            if (!this._.dialogDefinitions[S] || typeof T == 'function')this._.dialogDefinitions[S] = T;
        }, exists: function (S) {
            return!!this._.dialogDefinitions[S];
        }, getCurrent: function () {
            return a.dialog._.currentTop;
        }, okButton: (function () {
            var S = function (T, U) {
                U = U || {};
                return e.extend({id: 'ok', type: 'button', label: T.lang.common.ok, 'class': 'cke_dialog_ui_button_ok', onClick: function (V) {
                    var W = V.data.dialog;
                    if (W.fire('ok', {hide: true}).hide !== false)W.hide();
                }}, U, true);
            };
            S.type = 'button';
            S.override = function (T) {
                return e.extend(function (U) {
                    return S(U, T);
                }, {type: 'button'}, true);
            };
            return S;
        })(), cancelButton: (function () {
            var S = function (T, U) {
                U = U || {};
                return e.extend({id: 'cancel', type: 'button', label: T.lang.common.cancel, 'class': 'cke_dialog_ui_button_cancel', onClick: function (V) {
                    var W = V.data.dialog;
                    if (W.fire('cancel', {hide: true}).hide !== false)W.hide();
                }}, U, true);
            };
            S.type = 'button';
            S.override = function (T) {
                return e.extend(function (U) {
                    return S(U, T);
                }, {type: 'button'}, true);
            };
            return S;
        })(), addUIElement: function (S, T) {
            this._.uiElementBuilders[S] = T;
        }});
        a.dialog._ = {uiElementBuilders: {}, dialogDefinitions: {}, currentTop: null, currentZIndex: null};
        a.event.implementOn(a.dialog);
        a.event.implementOn(a.dialog.prototype, true);
        var u = {resizable: 3, minWidth: 600, minHeight: 400, buttons: [a.dialog.okButton, a.dialog.cancelButton]}, v = function (S, T, U) {
            for (var V = 0, W; W = S[V]; V++) {
                if (W.id == T)return W;
                if (U && W[U]) {
                    var X = v(W[U], T, U);
                    if (X)return X;
                }
            }
            return null;
        }, w = function (S, T, U, V, W) {
            if (U) {
                for (var X = 0, Y; Y = S[X]; X++) {
                    if (Y.id == U) {
                        S.splice(X, 0, T);
                        return T;
                    }
                    if (V && Y[V]) {
                        var Z = w(Y[V], T, U, V, true);
                        if (Z)return Z;
                    }
                }
                if (W)return null;
            }
            S.push(T);
            return T;
        }, x = function (S, T, U) {
            for (var V = 0, W; W = S[V]; V++) {
                if (W.id == T)return S.splice(V, 1);
                if (U && W[U]) {
                    var X = x(W[U], T, U);
                    if (X)return X;
                }
            }
            return null;
        }, y = function (S, T) {
            this.dialog = S;
            var U = T.contents;
            for (var V = 0, W; W = U[V]; V++)U[V] = W && new z(S, W);
            e.extend(this, T);
        };
        y.prototype = {getContents: function (S) {
            return v(this.contents, S);
        }, getButton: function (S) {
            return v(this.buttons, S);
        }, addContents: function (S, T) {
            return w(this.contents, S, T);
        }, addButton: function (S, T) {
            return w(this.buttons, S, T);
        }, removeContents: function (S) {
            x(this.contents, S);
        }, removeButton: function (S) {
            x(this.buttons, S);
        }};
        function z(S, T) {
            this._ = {dialog: S};
            e.extend(this, T);
        };
        z.prototype = {get: function (S) {
            return v(this.elements, S, 'children');
        }, add: function (S, T) {
            return w(this.elements, S, T, 'children');
        }, remove: function (S) {
            x(this.elements, S, 'children');
        }};
        function A(S) {
            var T = null, U = null, V = S.getElement().getFirst(), W = S.getParentEditor(), X = W.config.dialog_magnetDistance, Y = W.skin.margins || [0, 0, 0, 0];
            if (typeof X == 'undefined')X = 20;
            function Z(ab) {
                var ac = S.getSize(), ad = a.document.getWindow().getViewPaneSize(), ae = ab.data.$.screenX, af = ab.data.$.screenY, ag = ae - T.x, ah = af - T.y, ai, aj;
                T = {x: ae, y: af};
                U.x += ag;
                U.y += ah;
                if (U.x + Y[3] < X)ai = -Y[3]; else if (U.x - Y[1] > ad.width - ac.width - X)ai = ad.width - ac.width + (W.lang.dir == 'rtl' ? 0 : Y[1]); else ai = U.x;
                if (U.y + Y[0] < X)aj = -Y[0]; else if (U.y - Y[2] > ad.height - ac.height - X)aj = ad.height - ac.height + Y[2]; else aj = U.y;
                S.move(ai, aj, 1);
                ab.data.preventDefault();
            };
            function aa(ab) {
                a.document.removeListener('mousemove', Z);
                a.document.removeListener('mouseup', aa);
                if (b.ie6Compat) {
                    var ac = E.getChild(0).getFrameDocument();
                    ac.removeListener('mousemove', Z);
                    ac.removeListener('mouseup', aa);
                }
            };
            S.parts.title.on('mousedown', function (ab) {
                T = {x: ab.data.$.screenX, y: ab.data.$.screenY};
                a.document.on('mousemove', Z);
                a.document.on('mouseup', aa);
                U = S.getPosition();
                if (b.ie6Compat) {
                    var ac = E.getChild(0).getFrameDocument();
                    ac.on('mousemove', Z);
                    ac.on('mouseup', aa);
                }
                ab.data.preventDefault();
            }, S);
        };
        function B(S) {
            var T = S.definition, U = T.resizable;
            if (U == 0)return;
            var V = S.getParentEditor(), W, X, Y, Z, aa, ab, ac = e.addFunction(function (af) {
                aa = S.getSize();
                var ag = S.parts.contents, ah = ag.$.getElementsByTagName('iframe').length;
                if (ah) {
                    ab = h.createFromHtml('<div class="cke_dialog_resize_cover" style="height: 100%; position: absolute; width: 100%;"></div>');
                    ag.append(ab);
                }
                X = aa.height - S.parts.contents.getSize('height', !(b.gecko || b.opera || c && b.quirks));
                W = aa.width - S.parts.contents.getSize('width', 1);
                Z = {x: af.screenX, y: af.screenY};
                Y = a.document.getWindow().getViewPaneSize();
                a.document.on('mousemove', ad);
                a.document.on('mouseup', ae);
                if (b.ie6Compat) {
                    var ai = E.getChild(0).getFrameDocument();
                    ai.on('mousemove', ad);
                    ai.on('mouseup', ae);
                }
                af.preventDefault && af.preventDefault();
            });
            S.on('load', function () {
                var af = '';
                if (U == 1)af = ' cke_resizer_horizontal'; else if (U == 2)af = ' cke_resizer_vertical';
                var ag = h.createFromHtml('<div class="cke_resizer' + af + ' cke_resizer_' + V.lang.dir + '"' + ' title="' + e.htmlEncode(V.lang.resize) + '"' + ' onmousedown="CKEDITOR.tools.callFunction(' + ac + ', event )"></div>');
                S.parts.footer.append(ag, 1);
            });
            V.on('destroy', function () {
                e.removeFunction(ac);
            });
            function ad(af) {
                var ag = V.lang.dir == 'rtl', ah = (af.data.$.screenX - Z.x) * (ag ? -1 : 1), ai = af.data.$.screenY - Z.y, aj = aa.width, ak = aa.height, al = aj + ah * (S._.moved ? 1 : 2), am = ak + ai * (S._.moved ? 1 : 2), an = S._.element.getFirst(), ao = ag && an.getComputedStyle('right'), ap = S.getPosition();
                if (ap.y + am > Y.height)am = Y.height - ap.y;
                if ((ag ? ao : ap.x) + al > Y.width)al = Y.width - (ag ? ao : ap.x);
                if (U == 1 || U == 3)aj = Math.max(T.minWidth || 0, al - W);
                if (U == 2 || U == 3)ak = Math.max(T.minHeight || 0, am - X);
                S.resize(aj, ak);
                if (!S._.moved)S.layout();
                af.data.preventDefault();
            };
            function ae() {
                a.document.removeListener('mouseup', ae);
                a.document.removeListener('mousemove', ad);
                if (ab) {
                    ab.remove();
                    ab = null;
                }
                if (b.ie6Compat) {
                    var af = E.getChild(0).getFrameDocument();
                    af.removeListener('mouseup', ae);
                    af.removeListener('mousemove', ad);
                }
            };
        };
        var C, D = {}, E;

        function F(S) {
            S.data.preventDefault(1);
        };
        function G(S) {
            var T = a.document.getWindow(), U = S.config, V = U.dialog_backgroundCoverColor || 'white', W = U.dialog_backgroundCoverOpacity, X = U.baseFloatZIndex, Y = e.genKey(V, W, X), Z = D[Y];
            if (!Z) {
                var aa = ['<div tabIndex="-1" style="position: ', b.ie6Compat ? 'absolute' : 'fixed', '; z-index: ', X, '; top: 0px; left: 0px; ', !b.ie6Compat ? 'background-color: ' + V : '', '" class="cke_dialog_background_cover">'];
                if (b.ie6Compat) {
                    var ab = b.isCustomDomain(), ac = "<html><body style=\\'background-color:" + V + ";\\'></body></html>";
                    aa.push('<iframe hidefocus="true" frameborder="0" id="cke_dialog_background_iframe" src="javascript:');
                    aa.push('void((function(){document.open();' + (ab ? "document.domain='" + document.domain + "';" : '') + "document.write( '" + ac + "' );" + 'document.close();' + '})())');
                    aa.push('" style="position:absolute;left:0;top:0;width:100%;height: 100%;progid:DXImageTransform.Microsoft.Alpha(opacity=0)"></iframe>');
                }
                aa.push('</div>');
                Z = h.createFromHtml(aa.join(''));
                Z.setOpacity(W != undefined ? W : 0.5);
                Z.on('keydown', F);
                Z.on('keypress', F);
                Z.on('keyup', F);
                Z.appendTo(a.document.getBody());
                D[Y] = Z;
            } else Z.show();
            E = Z;
            var ad = function () {
                var ag = T.getViewPaneSize();
                Z.setStyles({width: ag.width + 'px', height: ag.height + 'px'});
            }, ae = function () {
                var ag = T.getScrollPosition(), ah = a.dialog._.currentTop;
                Z.setStyles({left: ag.x + 'px', top: ag.y + 'px'});
                if (ah)do {
                    var ai = ah.getPosition();
                    ah.move(ai.x, ai.y);
                } while (ah = ah._.parentDialog)
            };
            C = ad;
            T.on('resize', ad);
            ad();
            if (!(b.mac && b.webkit))Z.focus();
            if (b.ie6Compat) {
                var af = function () {
                    ae();
                    arguments.callee.prevScrollHandler.apply(this, arguments);
                };
                T.$.setTimeout(function () {
                    af.prevScrollHandler = window.onscroll || (function () {
                    });
                    window.onscroll = af;
                }, 0);
                ae();
            }
        };
        function H() {
            if (!E)return;
            var S = a.document.getWindow();
            E.hide();
            S.removeListener('resize', C);
            if (b.ie6Compat)S.$.setTimeout(function () {
                var T = window.onscroll && window.onscroll.prevScrollHandler;
                window.onscroll = T || null;
            }, 0);
            C = null;
        };
        function I() {
            for (var S in D)D[S].remove();
            D = {};
        };
        var J = {}, K = function (S) {
            var T = S.data.$.ctrlKey || S.data.$.metaKey, U = S.data.$.altKey, V = S.data.$.shiftKey, W = String.fromCharCode(S.data.$.keyCode), X = J[(T ? 'CTRL+' : '') + (U ? 'ALT+' : '') + (V ? 'SHIFT+' : '') + W];
            if (!X || !X.length)return;
            X = X[X.length - 1];
            X.keydown && X.keydown.call(X.uiElement, X.dialog, X.key);
            S.data.preventDefault();
        }, L = function (S) {
            var T = S.data.$.ctrlKey || S.data.$.metaKey, U = S.data.$.altKey, V = S.data.$.shiftKey, W = String.fromCharCode(S.data.$.keyCode), X = J[(T ? 'CTRL+' : '') + (U ? 'ALT+' : '') + (V ? 'SHIFT+' : '') + W];
            if (!X || !X.length)return;
            X = X[X.length - 1];
            if (X.keyup) {
                X.keyup.call(X.uiElement, X.dialog, X.key);
                S.data.preventDefault();
            }
        }, M = function (S, T, U, V, W) {
            var X = J[U] || (J[U] = []);
            X.push({uiElement: S, dialog: T, key: U, keyup: W || S.accessKeyUp, keydown: V || S.accessKeyDown});
        }, N = function (S) {
            for (var T in J) {
                var U = J[T];
                for (var V = U.length - 1; V >= 0; V--) {
                    if (U[V].dialog == S || U[V].uiElement == S)U.splice(V, 1);
                }
                if (U.length === 0)delete J[T];
            }
        }, O = function (S, T) {
            if (S._.accessKeyMap[T])S.selectPage(S._.accessKeyMap[T]);
        }, P = function (S, T) {
        }, Q = {27: 1, 13: 1}, R = function (S) {
            if (S.data.getKeystroke() in Q)S.data.stopPropagation();
        };
        (function () {
            k.dialog = {uiElement: function (S, T, U, V, W, X, Y) {
                if (arguments.length < 4)return;
                var Z = (V.call ? V(T) : V) || 'div', aa = ['<', Z, ' '], ab = (W && W.call ? W(T) : W) || {}, ac = (X && X.call ? X(T) : X) || {}, ad = (Y && Y.call ? Y.call(this, S, T) : Y) || '', ae = this.domId = ac.id || e.getNextId() + '_uiElement', af = this.id = T.id, ag;
                ac.id = ae;
                var ah = {};
                if (T.type)ah['cke_dialog_ui_' + T.type] = 1;
                if (T.className)ah[T.className] = 1;
                if (T.disabled)ah.cke_disabled = 1;
                var ai = ac['class'] && ac['class'].split ? ac['class'].split(' ') : [];
                for (ag = 0; ag < ai.length; ag++) {
                    if (ai[ag])ah[ai[ag]] = 1;
                }
                var aj = [];
                for (ag in ah)aj.push(ag);
                ac['class'] = aj.join(' ');
                if (T.title)ac.title = T.title;
                var ak = (T.style || '').split(';');
                if (T.align) {
                    var al = T.align;
                    ab['margin-left'] = al == 'left' ? 0 : 'auto';
                    ab['margin-right'] = al == 'right' ? 0 : 'auto';
                }
                for (ag in ab)ak.push(ag + ':' + ab[ag]);
                if (T.hidden)ak.push('display:none');
                for (ag = ak.length - 1; ag >= 0; ag--) {
                    if (ak[ag] === '')ak.splice(ag, 1);
                }
                if (ak.length > 0)ac.style = (ac.style ? ac.style + '; ' : '') + ak.join('; ');
                for (ag in ac)aa.push(ag + '="' + e.htmlEncode(ac[ag]) + '" ');
                aa.push('>', ad, '</', Z, '>');
                U.push(aa.join(''));
                (this._ || (this._ = {})).dialog = S;
                if (typeof T.isChanged == 'boolean')this.isChanged = function () {
                    return T.isChanged;
                };
                if (typeof T.isChanged == 'function')this.isChanged = T.isChanged;
                if (typeof T.setValue == 'function')this.setValue = e.override(this.setValue, function (an) {
                    return function (ao) {
                        an.call(this, T.setValue.call(this, ao));
                    };
                });
                if (typeof T.getValue == 'function')this.getValue = e.override(this.getValue, function (an) {
                    return function () {
                        return T.getValue.call(this, an.call(this));
                    };
                });
                a.event.implementOn(this);
                this.registerEvents(T);
                if (this.accessKeyUp && this.accessKeyDown && T.accessKey)M(this, S, 'CTRL+' + T.accessKey);
                var am = this;
                S.on('load', function () {
                    var an = am.getInputElement();
                    if (an) {
                        var ao = am.type in {checkbox: 1, ratio: 1} && c && b.version < 8 ? 'cke_dialog_ui_focused' : '';
                        an.on('focus', function () {
                            S._.tabBarMode = false;
                            S._.hasFocus = true;
                            am.fire('focus');
                            ao && this.addClass(ao);
                        });
                        an.on('blur', function () {
                            am.fire('blur');
                            ao && this.removeClass(ao);
                        });
                    }
                });
                if (this.keyboardFocusable) {
                    this.tabIndex = T.tabIndex || 0;
                    this.focusIndex = S._.focusList.push(this) - 1;
                    this.on('focus', function () {
                        S._.currentFocusIndex = am.focusIndex;
                    });
                }
                e.extend(this, T);
            }, hbox: function (S, T, U, V, W) {
                if (arguments.length < 4)return;
                this._ || (this._ = {});
                var X = this._.children = T, Y = W && W.widths || null, Z = W && W.height || null, aa = {}, ab, ac = function () {
                    var ae = ['<tbody><tr class="cke_dialog_ui_hbox">'];
                    for (ab = 0; ab < U.length; ab++) {
                        var af = 'cke_dialog_ui_hbox_child', ag = [];
                        if (ab === 0)af = 'cke_dialog_ui_hbox_first';
                        if (ab == U.length - 1)af = 'cke_dialog_ui_hbox_last';
                        ae.push('<td class="', af, '" role="presentation" ');
                        if (Y) {
                            if (Y[ab])ag.push('width:' + m(Y[ab]));
                        } else ag.push('width:' + Math.floor(100 / U.length) + '%');
                        if (Z)ag.push('height:' + m(Z));
                        if (W && W.padding != undefined)ag.push('padding:' + m(W.padding));
                        if (c && b.quirks && X[ab].align)ag.push('text-align:' + X[ab].align);
                        if (ag.length > 0)ae.push('style="' + ag.join('; ') + '" ');
                        ae.push('>', U[ab], '</td>');
                    }
                    ae.push('</tr></tbody>');
                    return ae.join('');
                }, ad = {role: 'presentation'};
                W && W.align && (ad.align = W.align);
                k.dialog.uiElement.call(this, S, W || {type: 'hbox'}, V, 'table', aa, ad, ac);
            }, vbox: function (S, T, U, V, W) {
                if (arguments.length < 3)return;
                this._ || (this._ = {});
                var X = this._.children = T, Y = W && W.width || null, Z = W && W.heights || null, aa = function () {
                    var ab = ['<table role="presentation" cellspacing="0" border="0" '];
                    ab.push('style="');
                    if (W && W.expand)ab.push('height:100%;');
                    ab.push('width:' + m(Y || '100%'), ';');
                    ab.push('"');
                    ab.push('align="', e.htmlEncode(W && W.align || (S.getParentEditor().lang.dir == 'ltr' ? 'left' : 'right')), '" ');
                    ab.push('><tbody>');
                    for (var ac = 0; ac < U.length; ac++) {
                        var ad = [];
                        ab.push('<tr><td role="presentation" ');
                        if (Y)ad.push('width:' + m(Y || '100%'));
                        if (Z)ad.push('height:' + m(Z[ac])); else if (W && W.expand)ad.push('height:' + Math.floor(100 / U.length) + '%');
                        if (W && W.padding != undefined)ad.push('padding:' + m(W.padding));
                        if (c && b.quirks && X[ac].align)ad.push('text-align:' + X[ac].align);
                        if (ad.length > 0)ab.push('style="', ad.join('; '), '" ');
                        ab.push(' class="cke_dialog_ui_vbox_child">', U[ac], '</td></tr>');
                    }
                    ab.push('</tbody></table>');
                    return ab.join('');
                };
                k.dialog.uiElement.call(this, S, W || {type: 'vbox'}, V, 'div', null, {role: 'presentation'}, aa);
            }};
        })();
        k.dialog.uiElement.prototype = {getElement: function () {
            return a.document.getById(this.domId);
        }, getInputElement: function () {
            return this.getElement();
        }, getDialog: function () {
            return this._.dialog;
        }, setValue: function (S, T) {
            this.getInputElement().setValue(S);
            !T && this.fire('change', {value: S});
            return this;
        }, getValue: function () {
            return this.getInputElement().getValue();
        }, isChanged: function () {
            return false;
        }, selectParentTab: function () {
            var V = this;
            var S = V.getInputElement(), T = S, U;
            while ((T = T.getParent()) && T.$.className.search('cke_dialog_page_contents') == -1) {
            }
            if (!T)return V;
            U = T.getAttribute('name');
            if (V._.dialog._.currentTabId != U)V._.dialog.selectPage(U);
            return V;
        }, focus: function () {
            this.selectParentTab().getInputElement().focus();
            return this;
        }, registerEvents: function (S) {
            var T = /^on([A-Z]\w+)/, U, V = function (X, Y, Z, aa) {
                Y.on('load', function () {
                    X.getInputElement().on(Z, aa, X);
                });
            };
            for (var W in S) {
                if (!(U = W.match(T)))continue;
                if (this.eventProcessors[W])this.eventProcessors[W].call(this, this._.dialog, S[W]); else V(this, this._.dialog, U[1].toLowerCase(), S[W]);
            }
            return this;
        }, eventProcessors: {onLoad: function (S, T) {
            S.on('load', T, this);
        }, onShow: function (S, T) {
            S.on('show', T, this);
        }, onHide: function (S, T) {
            S.on('hide', T, this);
        }}, accessKeyDown: function (S, T) {
            this.focus();
        }, accessKeyUp: function (S, T) {
        }, disable: function () {
            var S = this.getElement(), T = this.getInputElement();
            T.setAttribute('disabled', 'true');
            S.addClass('cke_disabled');
        }, enable: function () {
            var S = this.getElement(), T = this.getInputElement();
            T.removeAttribute('disabled');
            S.removeClass('cke_disabled');
        }, isEnabled: function () {
            return!this.getElement().hasClass('cke_disabled');
        }, isVisible: function () {
            return this.getInputElement().isVisible();
        }, isFocusable: function () {
            if (!this.isEnabled() || !this.isVisible())return false;
            return true;
        }};
        k.dialog.hbox.prototype = e.extend(new k.dialog.uiElement(), {getChild: function (S) {
            var T = this;
            if (arguments.length < 1)return T._.children.concat();
            if (!S.splice)S = [S];
            if (S.length < 2)return T._.children[S[0]]; else return T._.children[S[0]] && T._.children[S[0]].getChild ? T._.children[S[0]].getChild(S.slice(1, S.length)) : null;
        }}, true);
        k.dialog.vbox.prototype = new k.dialog.hbox();
        (function () {
            var S = {build: function (T, U, V) {
                var W = U.children, X, Y = [], Z = [];
                for (var aa = 0; aa < W.length && (X = W[aa]); aa++) {
                    var ab = [];
                    Y.push(ab);
                    Z.push(a.dialog._.uiElementBuilders[X.type].build(T, X, ab));
                }
                return new k.dialog[U.type](T, Z, Y, V, U);
            }};
            a.dialog.addUIElement('hbox', S);
            a.dialog.addUIElement('vbox', S);
        })();
        a.dialogCommand = function (S) {
            this.dialogName = S;
        };
        a.dialogCommand.prototype = {exec: function (S) {
            b.opera ? e.setTimeout(function () {
                S.openDialog(this.dialogName);
            }, 0, this) : S.openDialog(this.dialogName);
        }, canUndo: false, editorFocus: c || b.webkit};
        (function () {
            var S = /^([a]|[^a])+$/, T = /^\d*$/, U = /^\d*(?:\.\d+)?$/, V = /^(((\d*(\.\d+))|(\d*))(px|\%)?)?$/, W = /^(((\d*(\.\d+))|(\d*))(px|em|ex|in|cm|mm|pt|pc|\%)?)?$/i, X = /^(\s*[\w-]+\s*:\s*[^:;]+(?:;|$))*$/;
            a.VALIDATE_OR = 1;
            a.VALIDATE_AND = 2;
            a.dialog.validate = {functions: function () {
                var Y = arguments;
                return function () {
                    var Z = this && this.getValue ? this.getValue() : Y[0], aa = undefined, ab = 2, ac = [], ad;
                    for (ad = 0; ad < Y.length; ad++) {
                        if (typeof Y[ad] == 'function')ac.push(Y[ad]); else break;
                    }
                    if (ad < Y.length && typeof Y[ad] == 'string') {
                        aa = Y[ad];
                        ad++;
                    }
                    if (ad < Y.length && typeof Y[ad] == 'number')ab = Y[ad];
                    var ae = ab == 2 ? true : false;
                    for (ad = 0; ad < ac.length; ad++) {
                        if (ab == 2)ae = ae && ac[ad](Z); else ae = ae || ac[ad](Z);
                    }
                    return!ae ? aa : true;
                };
            }, regex: function (Y, Z) {
                return function () {
                    var aa = this && this.getValue ? this.getValue() : arguments[0];
                    return!Y.test(aa) ? Z : true;
                };
            }, notEmpty: function (Y) {
                return this.regex(S, Y);
            }, integer: function (Y) {
                return this.regex(T, Y);
            }, number: function (Y) {
                return this.regex(U, Y);
            }, cssLength: function (Y) {
                return this.functions(function (Z) {
                    return W.test(e.trim(Z));
                }, Y);
            }, htmlLength: function (Y) {
                return this.functions(function (Z) {
                    return V.test(e.trim(Z));
                }, Y);
            }, inlineStyle: function (Y) {
                return this.functions(function (Z) {
                    return X.test(e.trim(Z));
                }, Y);
            }, equals: function (Y, Z) {
                return this.functions(function (aa) {
                    return aa == Y;
                }, Z);
            }, notEqual: function (Y, Z) {
                return this.functions(function (aa) {
                    return aa != Y;
                }, Z);
            }};
            a.on('instanceDestroyed', function (Y) {
                if (e.isEmpty(a.instances)) {
                    var Z;
                    while (Z = a.dialog._.currentTop)Z.hide();
                    I();
                }
                var aa = Y.editor._.storedDialogs;
                for (var ab in aa)aa[ab].destroy();
            });
        })();
        e.extend(a.editor.prototype, {openDialog: function (S, T) {
            if (this.mode == 'wysiwyg' && c) {
                var U = this.getSelection();
                U && U.lock();
            }
            var V = a.dialog._.dialogDefinitions[S], W = this.skin.dialog;
            if (a.dialog._.currentTop === null)G(this);
            if (typeof V == 'function' && W._isLoaded) {
                var X = this._.storedDialogs || (this._.storedDialogs = {}), Y = X[S] || (X[S] = new a.dialog(this, S));
                T && T.call(Y, Y);
                Y.show();
                return Y;
            } else if (V == 'failed') {
                H();
                throw new Error('[CKEDITOR.dialog.openDialog] Dialog "' + S + '" failed when loading definition.');
            }
            var Z = this;

            function aa(ac) {
                var ad = a.dialog._.dialogDefinitions[S], ae = Z.skin.dialog;
                if (!ae._isLoaded || ab && typeof ac == 'undefined')return;
                if (typeof ad != 'function')a.dialog._.dialogDefinitions[S] = 'failed';
                Z.openDialog(S, T);
            };
            if (typeof V == 'string') {
                var ab = 1;
                a.scriptLoader.load(a.getUrl(V), aa, null, 0, 1);
            }
            a.skins.load(this, 'dialog', aa);
            return null;
        }});
    })();
    j.add('dialog', {requires: ['dialogui']});
    j.add('styles', {requires: ['selection'], init: function (m) {
        m.on('contentDom', function () {
            m.document.setCustomData('cke_includeReadonly', !m.config.disableReadonlyStyling);
        });
    }});
    a.editor.prototype.attachStyleStateChange = function (m, n) {
        var o = this._.styleStateChangeCallbacks;
        if (!o) {
            o = this._.styleStateChangeCallbacks = [];
            this.on('selectionChange', function (p) {
                for (var q = 0; q < o.length; q++) {
                    var r = o[q], s = r.style.checkActive(p.data.path) ? 1 : 2;
                    r.fn.call(this, s);
                }
            });
        }
        o.push({style: m, fn: n});
    };
    a.STYLE_BLOCK = 1;
    a.STYLE_INLINE = 2;
    a.STYLE_OBJECT = 3;
    (function () {
        var m = {address: 1, div: 1, h1: 1, h2: 1, h3: 1, h4: 1, h5: 1, h6: 1, p: 1, pre: 1, section: 1, header: 1, footer: 1, nav: 1, article: 1, aside: 1, figure: 1, dialog: 1, hgroup: 1, time: 1, meter: 1, menu: 1, command: 1, keygen: 1, output: 1, progress: 1, details: 1, datagrid: 1, datalist: 1}, n = {a: 1, embed: 1, hr: 1, img: 1, li: 1, object: 1, ol: 1, table: 1, td: 1, tr: 1, th: 1, ul: 1, dl: 1, dt: 1, dd: 1, form: 1, audio: 1, video: 1}, o = /\s*(?:;\s*|$)/, p = /#\((.+?)\)/g, q = d.walker.bookmark(0, 1), r = d.walker.whitespaces(1);
        a.style = function (T, U) {
            var W = this;
            if (U) {
                T = e.clone(T);
                L(T.attributes, U);
                L(T.styles, U);
            }
            var V = W.element = T.element ? typeof T.element == 'string' ? T.element.toLowerCase() : T.element : '*';
            W.type = m[V] ? 1 : n[V] ? 3 : 2;
            if (typeof W.element == 'object')W.type = 3;
            W._ = {definition: T};
        };
        a.style.prototype = {apply: function (T) {
            S.call(this, T, false);
        }, remove: function (T) {
            S.call(this, T, true);
        }, applyToRange: function (T) {
            var U = this;
            return(U.applyToRange = U.type == 2 ? t : U.type == 1 ? x : U.type == 3 ? v : null).call(U, T);
        }, removeFromRange: function (T) {
            var U = this;
            return(U.removeFromRange = U.type == 2 ? u : U.type == 1 ? y : U.type == 3 ? w : null).call(U, T);
        }, applyToObject: function (T) {
            K(T, this);
        }, checkActive: function (T) {
            var Y = this;
            switch (Y.type) {
                case 1:
                    return Y.checkElementRemovable(T.block || T.blockLimit, true);
                case 3:
                case 2:
                    var U = T.elements;
                    for (var V = 0, W; V < U.length; V++) {
                        W = U[V];
                        if (Y.type == 2 && (W == T.block || W == T.blockLimit))continue;
                        if (Y.type == 3) {
                            var X = W.getName();
                            if (!(typeof Y.element == 'string' ? X == Y.element : X in Y.element))continue;
                        }
                        if (Y.checkElementRemovable(W, true))return true;
                    }
            }
            return false;
        }, checkApplicable: function (T) {
            switch (this.type) {
                case 2:
                case 1:
                    break;
                case 3:
                    return T.lastElement.getAscendant(this.element, true);
            }
            return true;
        }, checkElementRemovable: function (T, U) {
            var ae = this;
            var V = ae._.definition;
            if (!T || !V.ignoreReadonly && T.isReadOnly())return false;
            var W, X = T.getName();
            if (typeof ae.element == 'string' ? X == ae.element : X in ae.element) {
                if (!U && !T.hasAttributes())return true;
                W = M(V);
                if (W._length) {
                    for (var Y in W) {
                        if (Y == '_length')continue;
                        var Z = T.getAttribute(Y) || '';
                        if (Y == 'style' ? R(W[Y], P(Z, false)) : W[Y] == Z) {
                            if (!U)return true;
                        } else if (U)return false;
                    }
                    if (U)return true;
                } else return true;
            }
            var aa = N(ae)[T.getName()];
            if (aa) {
                if (!(W = aa.attributes))return true;
                for (var ab = 0; ab < W.length; ab++) {
                    Y = W[ab][0];
                    var ac = T.getAttribute(Y);
                    if (ac) {
                        var ad = W[ab][1];
                        if (ad === null || typeof ad == 'string' && ac == ad || ad.test(ac))return true;
                    }
                }
            }
            return false;
        }, buildPreview: function (T) {
            var U = this._.definition, V = [], W = U.element;
            if (W == 'bdo')W = 'span';
            V = ['<', W];
            var X = U.attributes;
            if (X)for (var Y in X)V.push(' ', Y, '="', X[Y], '"');
            var Z = a.style.getStyleText(U);
            if (Z)V.push(' style="', Z, '"');
            V.push('>', T || U.name, '</', W, '>');
            return V.join('');
        }};
        a.style.getStyleText = function (T) {
            var U = T._ST;
            if (U)return U;
            U = T.styles;
            var V = T.attributes && T.attributes.style || '', W = '';
            if (V.length)V = V.replace(o, ';');
            for (var X in U) {
                var Y = U[X], Z = (X + ':' + Y).replace(o, ';');
                if (Y == 'inherit')W += Z; else V += Z;
            }
            if (V.length)V = P(V);
            V += W;
            return T._ST = V;
        };
        function s(T) {
            var U, V;
            while (T = T.getParent()) {
                if (T.getName() == 'body')break;
                if (T.getAttribute('data-nostyle'))U = T; else if (!V) {
                    var W = T.getAttribute('contentEditable');
                    if (W == 'false')U = T; else if (W == 'true')V = 1;
                }
            }
            return U;
        };
        function t(T) {
            var ay = this;
            var U = T.document;
            if (T.collapsed) {
                var V = J(ay, U);
                T.insertNode(V);
                T.moveToPosition(V, 2);
                return;
            }
            var W = ay.element, X = ay._.definition, Y, Z = X.ignoreReadonly, aa = Z || X.includeReadonly;
            if (aa == undefined)aa = U.getCustomData('cke_includeReadonly');
            var ab = f[W] || (Y = true, f.span);
            T.enlarge(1, 1);
            T.trim();
            var ac = T.createBookmark(), ad = ac.startNode, ae = ac.endNode, af = ad, ag;
            if (!Z) {
                var ah = s(ad), ai = s(ae);
                if (ah)af = ah.getNextSourceNode(true);
                if (ai)ae = ai;
            }
            if (af.getPosition(ae) == 2)af = 0;
            while (af) {
                var aj = false;
                if (af.equals(ae)) {
                    af = null;
                    aj = true;
                } else {
                    var ak = af.type, al = ak == 1 ? af.getName() : null, am = al && af.getAttribute('contentEditable') == 'false', an = al && af.getAttribute('data-nostyle');
                    if (al && af.data('cke-bookmark')) {
                        af = af.getNextSourceNode(true);
                        continue;
                    }
                    if (!al || ab[al] && !an && (!am || aa) && (af.getPosition(ae) | 4 | 0 | 8) == 4 + 0 + 8 && (!X.childRule || X.childRule(af))) {
                        var ao = af.getParent();
                        if (ao && ((ao.getDtd() || f.span)[W] || Y) && (!X.parentRule || X.parentRule(ao))) {
                            if (!ag && (!al || !f.$removeEmpty[al] || (af.getPosition(ae) | 4 | 0 | 8) == 4 + 0 + 8)) {
                                ag = new d.range(U);
                                ag.setStartBefore(af);
                            }
                            if (ak == 3 || am || ak == 1 && !af.getChildCount()) {
                                var ap = af, aq;
                                while ((aj = !ap.getNext(q)) && (aq = ap.getParent(), ab[aq.getName()]) && (aq.getPosition(ad) | 2 | 0 | 8) == 2 + 0 + 8 && (!X.childRule || X.childRule(aq)))ap = aq;
                                ag.setEndAfter(ap);
                            }
                        } else aj = true;
                    } else aj = true;
                    af = af.getNextSourceNode(an || am);
                }
                if (aj && ag && !ag.collapsed) {
                    var ar = J(ay, U), as = ar.hasAttributes(), at = ag.getCommonAncestor(), au = {styles: {}, attrs: {}, blockedStyles: {}, blockedAttrs: {}}, av, aw, ax;
                    while (ar && at) {
                        if (at.getName() == W) {
                            for (av in X.attributes) {
                                if (au.blockedAttrs[av] || !(ax = at.getAttribute(aw)))continue;
                                if (ar.getAttribute(av) == ax)au.attrs[av] = 1; else au.blockedAttrs[av] = 1;
                            }
                            for (aw in X.styles) {
                                if (au.blockedStyles[aw] || !(ax = at.getStyle(aw)))continue;
                                if (ar.getStyle(aw) == ax)au.styles[aw] = 1; else au.blockedStyles[aw] = 1;
                            }
                        }
                        at = at.getParent();
                    }
                    for (av in au.attrs)ar.removeAttribute(av);
                    for (aw in au.styles)ar.removeStyle(aw);
                    if (as && !ar.hasAttributes())ar = null;
                    if (ar) {
                        ag.extractContents().appendTo(ar);
                        G(ay, ar);
                        ag.insertNode(ar);
                        ar.mergeSiblings();
                        if (!c)ar.$.normalize();
                    } else {
                        ar = new h('span');
                        ag.extractContents().appendTo(ar);
                        ag.insertNode(ar);
                        G(ay, ar);
                        ar.remove(true);
                    }
                    ag = null;
                }
            }
            T.moveToBookmark(ac);
            T.shrink(2);
        };
        function u(T) {
            T.enlarge(1, 1);
            var U = T.createBookmark(), V = U.startNode;
            if (T.collapsed) {
                var W = new d.elementPath(V.getParent()), X;
                for (var Y = 0, Z; Y < W.elements.length && (Z = W.elements[Y]); Y++) {
                    if (Z == W.block || Z == W.blockLimit)break;
                    if (this.checkElementRemovable(Z)) {
                        var aa;
                        if (T.collapsed && (T.checkBoundaryOfElement(Z, 2) || (aa = T.checkBoundaryOfElement(Z, 1)))) {
                            X = Z;
                            X.match = aa ? 'start' : 'end';
                        } else {
                            Z.mergeSiblings();
                            if (Z.getName() == this.element)F(this, Z); else H(Z, N(this)[Z.getName()]);
                        }
                    }
                }
                if (X) {
                    var ab = V;
                    for (Y = 0; true; Y++) {
                        var ac = W.elements[Y];
                        if (ac.equals(X))break; else if (ac.match)continue; else ac = ac.clone();
                        ac.append(ab);
                        ab = ac;
                    }
                    ab[X.match == 'start' ? 'insertBefore' : 'insertAfter'](X);
                }
            } else {
                var ad = U.endNode, ae = this;

                function af() {
                    var ai = new d.elementPath(V.getParent()), aj = new d.elementPath(ad.getParent()), ak = null, al = null;
                    for (var am = 0; am < ai.elements.length; am++) {
                        var an = ai.elements[am];
                        if (an == ai.block || an == ai.blockLimit)break;
                        if (ae.checkElementRemovable(an))ak = an;
                    }
                    for (am = 0; am < aj.elements.length;
                         am++) {
                        an = aj.elements[am];
                        if (an == aj.block || an == aj.blockLimit)break;
                        if (ae.checkElementRemovable(an))al = an;
                    }
                    if (al)ad.breakParent(al);
                    if (ak)V.breakParent(ak);
                };
                af();
                var ag = V;
                while (!ag.equals(ad)) {
                    var ah = ag.getNextSourceNode();
                    if (ag.type == 1 && this.checkElementRemovable(ag)) {
                        if (ag.getName() == this.element)F(this, ag); else H(ag, N(this)[ag.getName()]);
                        if (ah.type == 1 && ah.contains(V)) {
                            af();
                            ah = V.getNext();
                        }
                    }
                    ag = ah;
                }
            }
            T.moveToBookmark(U);
        };
        function v(T) {
            var U = T.getCommonAncestor(true, true), V = U.getAscendant(this.element, true);
            V && !V.isReadOnly() && K(V, this);
        };
        function w(T) {
            var U = T.getCommonAncestor(true, true), V = U.getAscendant(this.element, true);
            if (!V)return;
            var W = this, X = W._.definition, Y = X.attributes;
            if (Y)for (var Z in Y)V.removeAttribute(Z, Y[Z]);
            if (X.styles)for (var aa in X.styles) {
                if (!X.styles.hasOwnProperty(aa))continue;
                V.removeStyle(aa);
            }
        };
        function x(T) {
            var U = T.createBookmark(true), V = T.createIterator();
            V.enforceRealBlocks = true;
            if (this._.enterMode)V.enlargeBr = this._.enterMode != 2;
            var W, X = T.document, Y;
            while (W = V.getNextParagraph()) {
                if (!W.isReadOnly()) {
                    var Z = J(this, X, W);
                    z(W, Z);
                }
            }
            T.moveToBookmark(U);
        };
        function y(T) {
            var Y = this;
            var U = T.createBookmark(1), V = T.createIterator();
            V.enforceRealBlocks = true;
            V.enlargeBr = Y._.enterMode != 2;
            var W;
            while (W = V.getNextParagraph()) {
                if (Y.checkElementRemovable(W))if (W.is('pre')) {
                    var X = Y._.enterMode == 2 ? null : T.document.createElement(Y._.enterMode == 1 ? 'p' : 'div');
                    X && W.copyAttributes(X);
                    z(W, X);
                } else F(Y, W, 1);
            }
            T.moveToBookmark(U);
        };
        function z(T, U) {
            var V = !U;
            if (V) {
                U = T.getDocument().createElement('div');
                T.copyAttributes(U);
            }
            var W = U && U.is('pre'), X = T.is('pre'), Y = W && !X, Z = !W && X;
            if (Y)U = E(T, U); else if (Z)U = D(V ? [T.getHtml()] : B(T), U); else T.moveChildren(U);
            U.replace(T);
            if (W)A(U); else if (V)I(U);
        };
        function A(T) {
            var U;
            if (!((U = T.getPrevious(r)) && U.is && U.is('pre')))return;
            var V = C(U.getHtml(), /\n$/, '') + '\n\n' + C(T.getHtml(), /^\n/, '');
            if (c)T.$.outerHTML = '<pre>' + V + '</pre>'; else T.setHtml(V);
            U.remove();
        };
        function B(T) {
            var U = /(\S\s*)\n(?:\s|(<span[^>]+data-cke-bookmark.*?\/span>))*\n(?!$)/gi, V = T.getName(), W = C(T.getOuterHtml(), U, function (Y, Z, aa) {
                return Z + '</pre>' + aa + '<pre>';
            }), X = [];
            W.replace(/<pre\b.*?>([\s\S]*?)<\/pre>/gi, function (Y, Z) {
                X.push(Z);
            });
            return X;
        };
        function C(T, U, V) {
            var W = '', X = '';
            T = T.replace(/(^<span[^>]+data-cke-bookmark.*?\/span>)|(<span[^>]+data-cke-bookmark.*?\/span>$)/gi, function (Y, Z, aa) {
                Z && (W = Z);
                aa && (X = aa);
                return '';
            });
            return W + T.replace(U, V) + X;
        };
        function D(T, U) {
            var V;
            if (T.length > 1)V = new d.documentFragment(U.getDocument());
            for (var W = 0; W < T.length; W++) {
                var X = T[W];
                X = X.replace(/(\r\n|\r)/g, '\n');
                X = C(X, /^[ \t]*\n/, '');
                X = C(X, /\n$/, '');
                X = C(X, /^[ \t]+|[ \t]+$/g, function (Z, aa, ab) {
                    if (Z.length == 1)return '&nbsp;'; else if (!aa)return e.repeat('&nbsp;', Z.length - 1) + ' '; else return ' ' + e.repeat('&nbsp;', Z.length - 1);
                });
                X = X.replace(/\n/g, '<br>');
                X = X.replace(/[ \t]{2,}/g, function (Z) {
                    return e.repeat('&nbsp;', Z.length - 1) + ' ';
                });
                if (V) {
                    var Y = U.clone();
                    Y.setHtml(X);
                    V.append(Y);
                } else U.setHtml(X);
            }
            return V || U;
        };
        function E(T, U) {
            var V = T.getBogus();
            V && V.remove();
            var W = T.getHtml();
            W = C(W, /(?:^[ \t\n\r]+)|(?:[ \t\n\r]+$)/g, '');
            W = W.replace(/[ \t\r\n]*(<br[^>]*>)[ \t\r\n]*/gi, '$1');
            W = W.replace(/([ \t\n\r]+|&nbsp;)/g, ' ');
            W = W.replace(/<br\b[^>]*>/gi, '\n');
            if (c) {
                var X = T.getDocument().createElement('div');
                X.append(U);
                U.$.outerHTML = '<pre>' + W + '</pre>';
                U.copyAttributes(X.getFirst());
                U = X.getFirst().remove();
            } else U.setHtml(W);
            return U;
        };
        function F(T, U) {
            var V = T._.definition, W = e.extend({}, V.attributes, N(T)[U.getName()]), X = V.styles, Y = e.isEmpty(W) && e.isEmpty(X);
            for (var Z in W) {
                if ((Z == 'class' || T._.definition.fullMatch) && U.getAttribute(Z) != O(Z, W[Z]))continue;
                Y = U.hasAttribute(Z);
                U.removeAttribute(Z);
            }
            for (var aa in X) {
                if (T._.definition.fullMatch && U.getStyle(aa) != O(aa, X[aa], true))continue;
                Y = Y || !!U.getStyle(aa);
                U.removeStyle(aa);
            }
            if (Y)!f.$block[U.getName()] || T._.enterMode == 2 && !U.hasAttributes() ? I(U) : U.renameNode(T._.enterMode == 1 ? 'p' : 'div');
        };
        function G(T, U) {
            var V = T._.definition, W = V.attributes, X = V.styles, Y = N(T), Z = U.getElementsByTag(T.element);
            for (var aa = Z.count(); --aa >= 0;)F(T, Z.getItem(aa));
            for (var ab in Y) {
                if (ab != T.element) {
                    Z = U.getElementsByTag(ab);
                    for (aa = Z.count() - 1; aa >= 0; aa--) {
                        var ac = Z.getItem(aa);
                        H(ac, Y[ab]);
                    }
                }
            }
        };
        function H(T, U) {
            var V = U && U.attributes;
            if (V)for (var W = 0; W < V.length; W++) {
                var X = V[W][0], Y;
                if (Y = T.getAttribute(X)) {
                    var Z = V[W][1];
                    if (Z === null || Z.test && Z.test(Y) || typeof Z == 'string' && Y == Z)T.removeAttribute(X);
                }
            }
            I(T);
        };
        function I(T) {
            if (!T.hasAttributes())if (f.$block[T.getName()]) {
                var U = T.getPrevious(r), V = T.getNext(r);
                if (U && (U.type == 3 || !U.isBlockBoundary({br: 1})))T.append('br', 1);
                if (V && (V.type == 3 || !V.isBlockBoundary({br: 1})))T.append('br');
                T.remove(true);
            } else {
                var W = T.getFirst(), X = T.getLast();
                T.remove(true);
                if (W) {
                    W.type == 1 && W.mergeSiblings();
                    if (X && !W.equals(X) && X.type == 1)X.mergeSiblings();
                }
            }
        };
        function J(T, U, V) {
            var W, X = T._.definition, Y = T.element;
            if (Y == '*')Y = 'span';
            W = new h(Y, U);
            if (V)V.copyAttributes(W);
            W = K(W, T);
            if (U.getCustomData('doc_processing_style') && W.hasAttribute('id'))W.removeAttribute('id'); else U.setCustomData('doc_processing_style', 1);
            return W;
        };
        function K(T, U) {
            var V = U._.definition, W = V.attributes, X = a.style.getStyleText(V);
            if (W)for (var Y in W)T.setAttribute(Y, W[Y]);
            if (X)T.setAttribute('style', X);
            return T;
        };
        function L(T, U) {
            for (var V in T)T[V] = T[V].replace(p, function (W, X) {
                return U[X];
            });
        };
        function M(T) {
            var U = T._AC;
            if (U)return U;
            U = {};
            var V = 0, W = T.attributes;
            if (W)for (var X in W) {
                V++;
                U[X] = W[X];
            }
            var Y = a.style.getStyleText(T);
            if (Y) {
                if (!U.style)V++;
                U.style = Y;
            }
            U._length = V;
            return T._AC = U;
        };
        function N(T) {
            if (T._.overrides)return T._.overrides;
            var U = T._.overrides = {}, V = T._.definition.overrides;
            if (V) {
                if (!e.isArray(V))V = [V];
                for (var W = 0; W < V.length; W++) {
                    var X = V[W], Y, Z, aa;
                    if (typeof X == 'string')Y = X.toLowerCase(); else {
                        Y = X.element ? X.element.toLowerCase() : T.element;
                        aa = X.attributes;
                    }
                    Z = U[Y] || (U[Y] = {});
                    if (aa) {
                        var ab = Z.attributes = Z.attributes || [];
                        for (var ac in aa)ab.push([ac.toLowerCase(), aa[ac]]);
                    }
                }
            }
            return U;
        };
        function O(T, U, V) {
            var W = new h('span');
            W[V ? 'setStyle' : 'setAttribute'](T, U);
            return W[V ? 'getStyle' : 'getAttribute'](T);
        };
        function P(T, U) {
            var V;
            if (U !== false) {
                var W = new h('span');
                W.setAttribute('style', T);
                V = W.getAttribute('style') || '';
            } else V = T;
            V = V.replace(/(font-family:)(.*?)(?=;|$)/, function (X, Y, Z) {
                var aa = Z.split(',');
                for (var ab = 0; ab < aa.length; ab++)aa[ab] = e.trim(aa[ab].replace(/["']/g, ''));
                return Y + aa.join(',');
            });
            return V.replace(/\s*([;:])\s*/, '$1').replace(/([^\s;])$/, '$1;').replace(/,\s+/g, ',').replace(/\"/g, '').toLowerCase();
        };
        function Q(T) {
            var U = {};
            T.replace(/&quot;/g, '"').replace(/\s*([^ :;]+)\s*:\s*([^;]+)\s*(?=;|$)/g, function (V, W, X) {
                U[W] = X;
            });
            return U;
        };
        function R(T, U) {
            typeof T == 'string' && (T = Q(T));
            typeof U == 'string' && (U = Q(U));
            for (var V in T) {
                if (!(V in U && (U[V] == T[V] || T[V] == 'inherit' || U[V] == 'inherit')))return false;
            }
            return true;
        };
        function S(T, U) {
            var V = T.getSelection(), W = V.createBookmarks(1), X = V.getRanges(), Y = U ? this.removeFromRange : this.applyToRange, Z, aa = X.createIterator();
            while (Z = aa.getNextRange())Y.call(this, Z);
            if (W.length == 1 && W[0].collapsed) {
                V.selectRanges(X);
                T.getById(W[0].startNode).remove();
            } else V.selectBookmarks(W);
            T.removeCustomData('doc_processing_style');
        };
    })();
    a.styleCommand = function (m) {
        this.style = m;
    };
    a.styleCommand.prototype.exec = function (m) {
        var o = this;
        m.focus();
        var n = m.document;
        if (n)if (o.state == 2)o.style.apply(n); else if (o.state == 1)o.style.remove(n);
        return!!n;
    };
    a.stylesSet = new a.resourceManager('', 'stylesSet');
    a.addStylesSet = e.bind(a.stylesSet.add, a.stylesSet);
    a.loadStylesSet = function (m, n, o) {
        a.stylesSet.addExternal(m, n, '');
        a.stylesSet.load(m, o);
    };
    a.editor.prototype.getStylesSet = function (m) {
        if (!this._.stylesDefinitions) {
            var n = this, o = n.config.stylesCombo_stylesSet || n.config.stylesSet || 'default';
            if (o instanceof Array) {
                n._.stylesDefinitions = o;
                m(o);
                return;
            }
            var p = o.split(':'), q = p[0], r = p[1], s = j.registered.styles.path;
            a.stylesSet.addExternal(q, r ? p.slice(1).join(':') : s + 'styles/' + q + '.js', '');
            a.stylesSet.load(q, function (t) {
                n._.stylesDefinitions = t[q];
                m(n._.stylesDefinitions);
            });
        } else m(this._.stylesDefinitions);
    };
    j.add('domiterator');
    (function () {
        function m(s) {
            var t = this;
            if (arguments.length < 1)return;
            t.range = s;
            t.forceBrBreak = 0;
            t.enlargeBr = 1;
            t.enforceRealBlocks = 0;
            t._ || (t._ = {});
        };
        var n = /^[\r\n\t ]+$/, o = d.walker.bookmark(false, true), p = d.walker.whitespaces(true), q = function (s) {
            return o(s) && p(s);
        };

        function r(s, t, u) {
            var v = s.getNextSourceNode(t, null, u);
            while (!o(v))v = v.getNextSourceNode(t, null, u);
            return v;
        };
        m.prototype = {getNextParagraph: function (s) {
            var S = this;
            var t, u, v, w, x, y;
            if (!S._.lastNode) {
                u = S.range.clone();
                u.shrink(1, true);
                w = u.endContainer.hasAscendant('pre', true) || u.startContainer.hasAscendant('pre', true);
                u.enlarge(S.forceBrBreak && !w || !S.enlargeBr ? 3 : 2);
                var z = new d.walker(u), A = d.walker.bookmark(true, true);
                z.evaluator = A;
                S._.nextNode = z.next();
                z = new d.walker(u);
                z.evaluator = A;
                var B = z.previous();
                S._.lastNode = B.getNextSourceNode(true);
                if (S._.lastNode && S._.lastNode.type == 3 && !e.trim(S._.lastNode.getText()) && S._.lastNode.getParent().isBlockBoundary()) {
                    var C = new d.range(u.document);
                    C.moveToPosition(S._.lastNode, 4);
                    if (C.checkEndOfBlock()) {
                        var D = new d.elementPath(C.endContainer), E = D.block || D.blockLimit;
                        S._.lastNode = E.getNextSourceNode(true);
                    }
                }
                if (!S._.lastNode) {
                    S._.lastNode = S._.docEndMarker = u.document.createText('');
                    S._.lastNode.insertAfter(B);
                }
                u = null;
            }
            var F = S._.nextNode;
            B = S._.lastNode;
            S._.nextNode = null;
            while (F) {
                var G = 0, H = F.hasAscendant('pre'), I = F.type != 1, J = 0;
                if (!I) {
                    var K = F.getName();
                    if (F.isBlockBoundary(S.forceBrBreak && !H && {br: 1})) {
                        if (K == 'br')I = 1; else if (!u && !F.getChildCount() && K != 'hr') {
                            t = F;
                            v = F.equals(B);
                            break;
                        }
                        if (u) {
                            u.setEndAt(F, 3);
                            if (K != 'br')S._.nextNode = F;
                        }
                        G = 1;
                    } else {
                        if (F.getFirst()) {
                            if (!u) {
                                u = new d.range(S.range.document);
                                u.setStartAt(F, 3);
                            }
                            F = F.getFirst();
                            continue;
                        }
                        I = 1;
                    }
                } else if (F.type == 3)if (n.test(F.getText()))I = 0;
                if (I && !u) {
                    u = new d.range(S.range.document);
                    u.setStartAt(F, 3);
                }
                v = (!G || I) && F.equals(B);
                if (u && !G)while (!F.getNext(q) && !v) {
                    var L = F.getParent();
                    if (L.isBlockBoundary(S.forceBrBreak && !H && {br: 1})) {
                        G = 1;
                        I = 0;
                        v = v || L.equals(B);
                        u.setEndAt(L, 2);
                        break;
                    }
                    F = L;
                    I = 1;
                    v = F.equals(B);
                    J = 1;
                }
                if (I)u.setEndAt(F, 4);
                F = r(F, J, B);
                v = !F;
                if (v || G && u)break;
            }
            if (!t) {
                if (!u) {
                    S._.docEndMarker && S._.docEndMarker.remove();
                    S._.nextNode = null;
                    return null;
                }
                var M = new d.elementPath(u.startContainer), N = M.blockLimit, O = {div: 1, th: 1, td: 1};
                t = M.block;
                if (!t && !S.enforceRealBlocks && O[N.getName()] && u.checkStartOfBlock() && u.checkEndOfBlock())t = N; else if (!t || S.enforceRealBlocks && t.getName() == 'li') {
                    t = S.range.document.createElement(s || 'p');
                    u.extractContents().appendTo(t);
                    t.trim();
                    u.insertNode(t);
                    x = y = true;
                } else if (t.getName() != 'li') {
                    if (!u.checkStartOfBlock() || !u.checkEndOfBlock()) {
                        t = t.clone(false);
                        u.extractContents().appendTo(t);
                        t.trim();
                        var P = u.splitBlock();
                        x = !P.wasStartOfBlock;
                        y = !P.wasEndOfBlock;
                        u.insertNode(t);
                    }
                } else if (!v)S._.nextNode = t.equals(B) ? null : r(u.getBoundaryNodes().endNode, 1, B);
            }
            if (x) {
                var Q = t.getPrevious();
                if (Q && Q.type == 1)if (Q.getName() == 'br')Q.remove(); else if (Q.getLast() && Q.getLast().$.nodeName.toLowerCase() == 'br')Q.getLast().remove();
            }
            if (y) {
                var R = t.getLast();
                if (R && R.type == 1 && R.getName() == 'br')if (c || R.getPrevious(o) || R.getNext(o))R.remove();
            }
            if (!S._.nextNode)S._.nextNode = v || t.equals(B) ? null : r(t, 1, B);
            return t;
        }};
        d.range.prototype.createIterator = function () {
            return new m(this);
        };
    })();
    j.add('panelbutton', {requires: ['button'], onLoad: function () {
        function m(n) {
            var p = this;
            var o = p._;
            if (o.state == 0)return;
            p.createPanel(n);
            if (o.on) {
                o.panel.hide();
                return;
            }
            o.panel.showBlock(p._.id, p.document.getById(p._.id), 4);
        };
        k.panelButton = e.createClass({base: k.button, $: function (n) {
            var p = this;
            var o = n.panel;
            delete n.panel;
            p.base(n);
            p.document = o && o.parent && o.parent.getDocument() || a.document;
            o.block = {attributes: o.attributes};
            p.hasArrow = true;
            p.click = m;
            p._ = {panelDefinition: o};
        }, statics: {handler: {create: function (n) {
            return new k.panelButton(n);
        }}}, proto: {createPanel: function (n) {
            var o = this._;
            if (o.panel)return;
            var p = this._.panelDefinition || {}, q = this._.panelDefinition.block, r = p.parent || a.document.getBody(), s = this._.panel = new k.floatPanel(n, r, p), t = s.addBlock(o.id, q), u = this;
            s.onShow = function () {
                if (u.className)this.element.getFirst().addClass(u.className + '_panel');
                u.setState(1);
                o.on = 1;
                if (u.onOpen)u.onOpen();
            };
            s.onHide = function (v) {
                if (u.className)this.element.getFirst().removeClass(u.className + '_panel');
                u.setState(u.modes && u.modes[n.mode] ? 2 : 0);
                o.on = 0;
                if (!v && u.onClose)u.onClose();
            };
            s.onEscape = function () {
                s.hide();
                u.document.getById(o.id).focus();
            };
            if (this.onBlock)this.onBlock(s, t);
            t.onHide = function () {
                o.on = 0;
                u.setState(2);
            };
        }}});
    }, beforeInit: function (m) {
        m.ui.addHandler('panelbutton', k.panelButton.handler);
    }});
    a.UI_PANELBUTTON = 'panelbutton';
    j.add('floatpanel', {requires: ['panel']});
    (function () {
        var m = {}, n = false;

        function o(p, q, r, s, t) {
            var u = e.genKey(q.getUniqueId(), r.getUniqueId(), p.skinName, p.lang.dir, p.uiColor || '', s.css || '', t || ''), v = m[u];
            if (!v) {
                v = m[u] = new k.panel(q, s);
                v.element = r.append(h.createFromHtml(v.renderHtml(p), q));
                v.element.setStyles({display: 'none', position: 'absolute'});
            }
            return v;
        };
        k.floatPanel = e.createClass({$: function (p, q, r, s) {
            r.forceIFrame = 1;
            var t = q.getDocument(), u = o(p, t, q, r, s || 0), v = u.element, w = v.getFirst().getFirst();
            this.element = v;
            this._ = {editor: p, panel: u, parentElement: q, definition: r, document: t, iframe: w, children: [], dir: p.lang.dir};
            p.on('mode', function () {
                this.hide();
            }, this);
        }, proto: {addBlock: function (p, q) {
            return this._.panel.addBlock(p, q);
        }, addListBlock: function (p, q) {
            return this._.panel.addListBlock(p, q);
        }, getBlock: function (p) {
            return this._.panel.getBlock(p);
        }, showBlock: function (p, q, r, s, t) {
            var u = this._.panel, v = u.showBlock(p);
            this.allowBlur(false);
            n = 1;
            this._.returnFocus = this._.editor.focusManager.hasFocus ? this._.editor : new h(a.document.$.activeElement);
            var w = this.element, x = this._.iframe, y = this._.definition, z = q.getDocumentPosition(w.getDocument()), A = this._.dir == 'rtl', B = z.x + (s || 0), C = z.y + (t || 0);
            if (A && (r == 1 || r == 4))B += q.$.offsetWidth; else if (!A && (r == 2 || r == 3))B += q.$.offsetWidth - 1;
            if (r == 3 || r == 4)C += q.$.offsetHeight - 1;
            this._.panel._.offsetParentId = q.getId();
            w.setStyles({top: C + 'px', left: 0, display: ''});
            w.setOpacity(0);
            w.getFirst().removeStyle('width');
            if (!this._.blurSet) {
                var D = c ? x : new d.window(x.$.contentWindow);
                a.event.useCapture = true;
                D.on('blur', function (E) {
                    var G = this;
                    if (!G.allowBlur())return;
                    var F = E.data.getTarget();
                    if (F.getName && F.getName() != 'iframe')return;
                    if (G.visible && !G._.activeChild && !n) {
                        delete G._.returnFocus;
                        G.hide();
                    }
                }, this);
                D.on('focus', function () {
                    this._.focused = true;
                    this.hideChild();
                    this.allowBlur(true);
                }, this);
                a.event.useCapture = false;
                this._.blurSet = 1;
            }
            u.onEscape = e.bind(function (E) {
                if (this.onEscape && this.onEscape(E) === false)return false;
            }, this);
            e.setTimeout(function () {
                if (A)B -= w.$.offsetWidth;
                var E = e.bind(function () {
                    var F = w.getFirst();
                    if (v.autoSize) {
                        var G = v.element.$;
                        if (b.gecko || b.opera)G = G.parentNode;
                        if (c)G = G.document.body;
                        var H = G.scrollWidth;
                        if (c && b.quirks && H > 0)H += (F.$.offsetWidth || 0) - (F.$.clientWidth || 0) + 3;
                        H += 4;
                        F.setStyle('width', H + 'px');
                        v.element.addClass('cke_frameLoaded');
                        var I = v.element.$.scrollHeight;
                        if (c && b.quirks && I > 0)I += (F.$.offsetHeight || 0) - (F.$.clientHeight || 0) + 3;
                        F.setStyle('height', I + 'px');
                        u._.currentBlock.element.setStyle('display', 'none').removeStyle('display');
                    } else F.removeStyle('height');
                    var J = u.element, K = J.getWindow(), L = K.getScrollPosition(), M = K.getViewPaneSize(), N = {height: J.$.offsetHeight, width: J.$.offsetWidth};
                    if (A ? B < 0 : B + N.width > M.width + L.x)B += N.width * (A ? 1 : -1);
                    if (C + N.height > M.height + L.y)C -= N.height;
                    if (c) {
                        var O = new h(w.$.offsetParent), P = O;
                        if (P.getName() == 'html')P = P.getDocument().getBody();
                        if (P.getComputedStyle('direction') == 'rtl')if (b.ie8Compat)B -= w.getDocument().getDocumentElement().$.scrollLeft * 2; else B -= O.$.scrollWidth - O.$.clientWidth;
                    }
                    var Q = w.getFirst(), R;
                    if (R = Q.getCustomData('activePanel'))R.onHide && R.onHide.call(this, 1);
                    Q.setCustomData('activePanel', this);
                    w.setStyles({top: C + 'px', left: B + 'px'});
                    w.setOpacity(1);
                }, this);
                u.isLoaded ? E() : u.onLoad = E;
                e.setTimeout(function () {
                    x.$.contentWindow.focus();
                    this.allowBlur(true);
                }, 0, this);
            }, b.air ? 200 : 0, this);
            this.visible = 1;
            if (this.onShow)this.onShow.call(this);
            n = 0;
        }, hide: function (p) {
            var r = this;
            if (r.visible && (!r.onHide || r.onHide.call(r) !== true)) {
                r.hideChild();
                b.gecko && r._.iframe.getFrameDocument().$.activeElement.blur();
                r.element.setStyle('display', 'none');
                r.visible = 0;
                r.element.getFirst().removeCustomData('activePanel');
                var q = p !== false && r._.returnFocus;
                if (q) {
                    if (b.webkit && q.type)q.getWindow().$.focus();
                    q.focus();
                }
            }
        }, allowBlur: function (p) {
            var q = this._.panel;
            if (p != undefined)q.allowBlur = p;
            return q.allowBlur;
        }, showAsChild: function (p, q, r, s, t, u) {
            if (this._.activeChild == p && p._.panel._.offsetParentId == r.getId())return;
            this.hideChild();
            p.onHide = e.bind(function () {
                e.setTimeout(function () {
                    if (!this._.focused)this.hide();
                }, 0, this);
            }, this);
            this._.activeChild = p;
            this._.focused = false;
            p.showBlock(q, r, s, t, u);
            if (b.ie7Compat || b.ie8 && b.ie6Compat)setTimeout(function () {
                p.element.getChild(0).$.style.cssText += '';
            }, 100);
        }, hideChild: function () {
            var p = this._.activeChild;
            if (p) {
                delete p.onHide;
                delete p._.returnFocus;
                delete this._.activeChild;
                p.hide();
            }
        }}});
        a.on('instanceDestroyed', function () {
            var p = e.isEmpty(a.instances);
            for (var q in m) {
                var r = m[q];
                if (p)r.destroy(); else r.element.hide();
            }
            p && (m = {});
        });
    })();
    j.add('menu', {beforeInit: function (m) {
        var n = m.config.menu_groups.split(','), o = m._.menuGroups = {}, p = m._.menuItems = {};
        for (var q = 0; q < n.length; q++)o[n[q]] = q + 1;
        m.addMenuGroup = function (r, s) {
            o[r] = s || 100;
        };
        m.addMenuItem = function (r, s) {
            if (o[s.group])p[r] = new a.menuItem(this, r, s);
        };
        m.addMenuItems = function (r) {
            for (var s in r)this.addMenuItem(s, r[s]);
        };
        m.getMenuItem = function (r) {
            return p[r];
        };
        m.removeMenuItem = function (r) {
            delete p[r];
        };
    }, requires: ['floatpanel']});
    (function () {
        a.menu = e.createClass({$: function (n, o) {
            var r = this;
            o = r._.definition = o || {};
            r.id = e.getNextId();
            r.editor = n;
            r.items = [];
            r._.listeners = [];
            r._.level = o.level || 1;
            var p = e.extend({}, o.panel, {css: n.skin.editor.css, level: r._.level - 1, block: {}}), q = p.block.attributes = p.attributes || {};
            !q.role && (q.role = 'menu');
            r._.panelDefinition = p;
        }, _: {onShow: function () {
            var v = this;
            var n = v.editor.getSelection();
            if (c)n && n.lock();
            var o = n && n.getStartElement(), p = v._.listeners, q = [];
            v.removeAll();
            for (var r = 0; r < p.length; r++) {
                var s = p[r](o, n);
                if (s)for (var t in s) {
                    var u = v.editor.getMenuItem(t);
                    if (u && (!u.command || v.editor.getCommand(u.command).state)) {
                        u.state = s[t];
                        v.add(u);
                    }
                }
            }
        }, onClick: function (n) {
            this.hide(false);
            if (n.onClick)n.onClick(); else if (n.command)this.editor.execCommand(n.command);
        }, onEscape: function (n) {
            var o = this.parent;
            if (o) {
                o._.panel.hideChild();
                var p = o._.panel._.panel._.currentBlock, q = p._.focusIndex;
                p._.markItem(q);
            } else if (n == 27)this.hide();
            return false;
        }, onHide: function () {
            if (c) {
                var n = this.editor.getSelection();
                n && n.unlock();
            }
            this.onHide && this.onHide();
        }, showSubMenu: function (n) {
            var v = this;
            var o = v._.subMenu, p = v.items[n], q = p.getItems && p.getItems();
            if (!q) {
                v._.panel.hideChild();
                return;
            }
            var r = v._.panel.getBlock(v.id);
            r._.focusIndex = n;
            if (o)o.removeAll(); else {
                o = v._.subMenu = new a.menu(v.editor, e.extend({}, v._.definition, {level: v._.level + 1}, true));
                o.parent = v;
                o._.onClick = e.bind(v._.onClick, v);
            }
            for (var s in q) {
                var t = v.editor.getMenuItem(s);
                if (t) {
                    t.state = q[s];
                    o.add(t);
                }
            }
            var u = v._.panel.getBlock(v.id).element.getDocument().getById(v.id + String(n));
            o.show(u, 2);
        }}, proto: {add: function (n) {
            if (!n.order)n.order = this.items.length;
            this.items.push(n);
        }, removeAll: function () {
            this.items = [];
        }, show: function (n, o, p, q) {
            if (!this.parent) {
                this._.onShow();
                if (!this.items.length)return;
            }
            o = o || (this.editor.lang.dir == 'rtl' ? 2 : 1);
            var r = this.items, s = this.editor, t = this._.panel, u = this._.element;
            if (!t) {
                t = this._.panel = new k.floatPanel(this.editor, a.document.getBody(), this._.panelDefinition, this._.level);
                t.onEscape = e.bind(function (F) {
                    if (this._.onEscape(F) === false)return false;
                }, this);
                t.onHide = e.bind(function () {
                    this._.onHide && this._.onHide();
                }, this);
                var v = t.addBlock(this.id, this._.panelDefinition.block);
                v.autoSize = true;
                var w = v.keys;
                w[40] = 'next';
                w[9] = 'next';
                w[38] = 'prev';
                w[2228224 + 9] = 'prev';
                w[s.lang.dir == 'rtl' ? 37 : 39] = c ? 'mouseup' : 'click';
                w[32] = c ? 'mouseup' : 'click';
                c && (w[13] = 'mouseup');
                u = this._.element = v.element;
                u.addClass(s.skinClass);
                var x = u.getDocument();
                x.getBody().setStyle('overflow', 'hidden');
                x.getElementsByTag('html').getItem(0).setStyle('overflow', 'hidden');
                this._.itemOverFn = e.addFunction(function (F) {
                    var G = this;
                    clearTimeout(G._.showSubTimeout);
                    G._.showSubTimeout = e.setTimeout(G._.showSubMenu, s.config.menu_subMenuDelay || 400, G, [F]);
                }, this);
                this._.itemOutFn = e.addFunction(function (F) {
                    clearTimeout(this._.showSubTimeout);
                }, this);
                this._.itemClickFn = e.addFunction(function (F) {
                    var H = this;
                    var G = H.items[F];
                    if (G.state == 0) {
                        H.hide();
                        return;
                    }
                    if (G.getItems)H._.showSubMenu(F); else H._.onClick(G);
                }, this);
            }
            m(r);
            var y = s.container.getChild(1), z = y.hasClass('cke_mixed_dir_content') ? ' cke_mixed_dir_content' : '', A = ['<div class="cke_menu' + z + '" role="presentation">'], B = r.length, C = B && r[0].group;
            for (var D = 0; D < B; D++) {
                var E = r[D];
                if (C != E.group) {
                    A.push('<div class="cke_menuseparator" role="separator"></div>');
                    C = E.group;
                }
                E.render(this, D, A);
            }
            A.push('</div>');
            u.setHtml(A.join(''));
            k.fire('ready', this);
            if (this.parent)this.parent._.panel.showAsChild(t, this.id, n, o, p, q); else t.showBlock(this.id, n, o, p, q);
            s.fire('menuShow', [t]);
        }, addListener: function (n) {
            this._.listeners.push(n);
        }, hide: function (n) {
            var o = this;
            o._.onHide && o._.onHide();
            o._.panel && o._.panel.hide(n);
        }}});
        function m(n) {
            n.sort(function (o, p) {
                if (o.group < p.group)return-1; else if (o.group > p.group)return 1;
                return o.order < p.order ? -1 : o.order > p.order ? 1 : 0;
            });
        };
        a.menuItem = e.createClass({$: function (n, o, p) {
            var q = this;
            e.extend(q, p, {order: 0, className: 'cke_button_' + o});
            q.group = n._.menuGroups[q.group];
            q.editor = n;
            q.name = o;
        }, proto: {render: function (n, o, p) {
            var w = this;
            var q = n.id + String(o), r = typeof w.state == 'undefined' ? 2 : w.state, s = ' cke_' + (r == 1 ? 'on' : r == 0 ? 'disabled' : 'off'), t = w.label;
            if (w.className)s += ' ' + w.className;
            var u = w.getItems;
            p.push('<span class="cke_menuitem' + (w.icon && w.icon.indexOf('.png') == -1 ? ' cke_noalphafix' : '') + '">' + '<a id="', q, '" class="', s, '" href="javascript:void(\'', (w.label || '').replace("'", ''), '\')" title="', w.label, '" tabindex="-1"_cke_focus=1 hidefocus="true" role="menuitem"' + (u ? 'aria-haspopup="true"' : '') + (r == 0 ? 'aria-disabled="true"' : '') + (r == 1 ? 'aria-pressed="true"' : ''));
            if (b.opera || b.gecko && b.mac)p.push(' onkeypress="return false;"');
            if (b.gecko)p.push(' onblur="this.style.cssText = this.style.cssText;"');
            var v = (w.iconOffset || 0) * -16;
            p.push(' onmouseover="CKEDITOR.tools.callFunction(', n._.itemOverFn, ',', o, ');" onmouseout="CKEDITOR.tools.callFunction(', n._.itemOutFn, ',', o, ');" ' + (c ? 'onclick="return false;" onmouseup' : 'onclick') + '="CKEDITOR.tools.callFunction(', n._.itemClickFn, ',', o, '); return false;"><span class="cke_icon_wrapper"><span class="cke_icon"' + (w.icon ? ' style="background-image:url(' + a.getUrl(w.icon) + ');background-position:0 ' + v + 'px;"' : '') + '></span></span>' + '<span class="cke_label">');
            if (u)p.push('<span class="cke_menuarrow">', '<span>&#', w.editor.lang.dir == 'rtl' ? '9668' : '9658', ';</span>', '</span>');
            p.push(t, '</span></a></span>');
        }}});
    })();
    i.menu_groups = 'clipboard,form,tablecell,tablecellproperties,tablerow,tablecolumn,table,anchor,link,image,flash,checkbox,radio,textfield,hiddenfield,imagebutton,button,select,textarea,div';
    (function () {
        var m;
        j.add('editingblock', {init: function (n) {
            if (!n.config.editingBlock)return;
            n.on('themeSpace', function (o) {
                if (o.data.space == 'contents')o.data.html += '<br>';
            });
            n.on('themeLoaded', function () {
                n.fireOnce('editingBlockReady');
            });
            n.on('uiReady', function () {
                n.setMode(n.config.startupMode);
            });
            n.on('afterSetData', function () {
                if (!m) {
                    function o() {
                        m = true;
                        n.getMode().loadData(n.getData());
                        m = false;
                    };
                    if (n.mode)o(); else n.on('mode', function () {
                        if (n.mode) {
                            o();
                            n.removeListener('mode', arguments.callee);
                        }
                    });
                }
            });
            n.on('beforeGetData', function () {
                if (!m && n.mode) {
                    m = true;
                    n.setData(n.getMode().getData(), null, 1);
                    m = false;
                }
            });
            n.on('getSnapshot', function (o) {
                if (n.mode)o.data = n.getMode().getSnapshotData();
            });
            n.on('loadSnapshot', function (o) {
                if (n.mode)n.getMode().loadSnapshotData(o.data);
            });
            n.on('mode', function (o) {
                o.removeListener();
                b.webkit && n.container.on('focus', function () {
                    n.focus();
                });
                if (n.config.startupFocus)n.focus();
                setTimeout(function () {
                    n.fireOnce('instanceReady');
                    a.fire('instanceReady', null, n);
                }, 0);
            });
            n.on('destroy', function () {
                var o = this;
                if (o.mode)o._.modes[o.mode].unload(o.getThemeSpace('contents'));
            });
        }});
        a.editor.prototype.mode = '';
        a.editor.prototype.addMode = function (n, o) {
            o.name = n;
            (this._.modes || (this._.modes = {}))[n] = o;
        };
        a.editor.prototype.setMode = function (n) {
            this.fire('beforeSetMode', {newMode: n});
            var o, p = this.getThemeSpace('contents'), q = this.checkDirty();
            if (this.mode) {
                if (n == this.mode)return;
                this._.previousMode = this.mode;
                this.fire('beforeModeUnload');
                var r = this.getMode();
                o = r.getData();
                r.unload(p);
                this.mode = '';
            }
            p.setHtml('');
            var s = this.getMode(n);
            if (!s)throw '[CKEDITOR.editor.setMode] Unknown mode "' + n + '".';
            if (!q)this.on('mode', function () {
                this.resetDirty();
                this.removeListener('mode', arguments.callee);
            });
            s.load(p, typeof o != 'string' ? this.getData() : o);
        };
        a.editor.prototype.getMode = function (n) {
            return this._.modes && this._.modes[n || this.mode];
        };
        a.editor.prototype.focus = function () {
            this.forceNextSelectionCheck();
            var n = this.getMode();
            if (n)n.focus();
        };
    })();
    i.startupMode = 'wysiwyg';
    i.editingBlock = true;
    (function () {
        function m() {
            var B = this;
            try {
                var y = B.getSelection();
                if (!y || !y.document.getWindow().$)return;
                var z = y.getStartElement(), A = new d.elementPath(z);
                if (!A.compare(B._.selectionPreviousPath)) {
                    B._.selectionPreviousPath = A;
                    B.fire('selectionChange', {selection: y, path: A, element: z});
                }
            } catch (C) {
            }
        };
        var n, o;

        function p() {
            o = true;
            if (n)return;
            q.call(this);
            n = e.setTimeout(q, 200, this);
        };
        function q() {
            n = null;
            if (o) {
                e.setTimeout(m, 0, this);
                o = false;
            }
        };
        function r(y) {
            function z(D) {
                return D && D.type == 1 && D.getName() in f.$removeEmpty;
            };
            function A(D) {
                var E = y.document.getBody();
                return!D.is('body') && E.getChildCount() == 1;
            };
            var B = y.startContainer, C = y.startOffset;
            if (B.type == 3)return false;
            return!e.trim(B.getHtml()) ? z(B) || A(B) : z(B.getChild(C - 1)) || z(B.getChild(C));
        };
        var s = {modes: {wysiwyg: 1, source: 1}, readOnly: c || b.webkit, exec: function (y) {
            switch (y.mode) {
                case 'wysiwyg':
                    y.document.$.execCommand('SelectAll', false, null);
                    y.forceNextSelectionCheck();
                    y.selectionChange();
                    break;
                case 'source':
                    var z = y.textarea.$;
                    if (c)z.createTextRange().execCommand('SelectAll'); else {
                        z.selectionStart = 0;
                        z.selectionEnd = z.value.length;
                    }
                    z.focus();
            }
        }, canUndo: false};

        function t(y) {
            w(y);
            var z = y.createText('​');
            y.setCustomData('cke-fillingChar', z);
            return z;
        };
        function u(y) {
            return y && y.getCustomData('cke-fillingChar');
        };
        function v(y) {
            var z = y && u(y);
            if (z)if (z.getCustomData('ready'))w(y); else z.setCustomData('ready', 1);
        };
        function w(y) {
            var z = y && y.removeCustomData('cke-fillingChar');
            if (z) {
                z.setText(z.getText().replace(/\u200B/g, ''));
                z = 0;
            }
        };
        j.add('selection', {init: function (y) {
            if (b.webkit) {
                y.on('selectionChange', function () {
                    v(y.document);
                });
                y.on('beforeSetMode', function () {
                    w(y.document);
                });
                y.on('key', function (D) {
                    switch (D.data.keyCode) {
                        case 13:
                        case 2228224 + 13:
                        case 37:
                        case 39:
                        case 8:
                            w(y.document);
                    }
                }, null, null, 10);
                var z, A;

                function B() {
                    var D = y.document, E = u(D);
                    if (E) {
                        var F = D.$.defaultView.getSelection();
                        if (F.type == 'Caret' && F.anchorNode == E.$)A = 1;
                        z = E.getText();
                        E.setText(z.replace(/\u200B/g, ''));
                    }
                };
                function C() {
                    var D = y.document, E = u(D);
                    if (E) {
                        E.setText(z);
                        if (A) {
                            D.$.defaultView.getSelection().setPosition(E.$, E.getLength());
                            A = 0;
                        }
                    }
                };
                y.on('beforeUndoImage', B);
                y.on('afterUndoImage', C);
                y.on('beforeGetData', B, null, null, 0);
                y.on('getData', C);
            }
            y.on('contentDom', function () {
                var D = y.document, E = D.getBody(), F = D.getDocumentElement();
                if (c) {
                    var G, H, I = 1;
                    E.on('focusin', function (M) {
                        if (M.data.$.srcElement.nodeName != 'BODY')return;
                        if (G) {
                            if (I) {
                                try {
                                    G.select();
                                } catch (O) {
                                }
                                var N = D.getCustomData('cke_locked_selection');
                                if (N) {
                                    N.unlock();
                                    N.lock();
                                }
                            }
                            G = null;
                        }
                    });
                    E.on('focus', function () {
                        H = 1;
                        L();
                    });
                    E.on('beforedeactivate', function (M) {
                        if (M.data.$.toElement)return;
                        H = 0;
                        I = 1;
                    });
                    if (c && b.version < 8)y.on('blur', function (M) {
                        try {
                            y.document && y.document.$.selection.empty();
                        } catch (N) {
                        }
                    });
                    F.on('mousedown', function () {
                        I = 0;
                    });
                    F.on('mouseup', function () {
                        I = 1;
                    });
                    if (c && (b.ie7Compat || b.version < 8 || b.quirks))F.on('click', function (M) {
                        if (M.data.getTarget().getName() == 'html')y.getSelection().getRanges()[0].select();
                    });
                    var J;
                    E.on('mousedown', function (M) {
                        if (M.data.$.button == 2) {
                            var N = y.document.$.selection;
                            if (N.type == 'None')J = y.window.getScrollPosition();
                        }
                        K();
                    });
                    E.on('mouseup', function (M) {
                        if (M.data.$.button == 2 && J) {
                            y.document.$.documentElement.scrollLeft = J.x;
                            y.document.$.documentElement.scrollTop = J.y;
                        }
                        J = null;
                        H = 1;
                        setTimeout(function () {
                            L(true);
                        }, 0);
                    });
                    E.on('keydown', K);
                    E.on('keyup', function () {
                        H = 1;
                        L();
                    });
                    D.on('selectionchange', L);
                    function K() {
                        H = 0;
                    };
                    function L(M) {
                        if (H) {
                            var N = y.document, O = y.getSelection(), P = O && O.getNative();
                            if (M && P && P.type == 'None')if (!N.$.queryCommandEnabled('InsertImage')) {
                                e.setTimeout(L, 50, this, true);
                                return;
                            }
                            var Q;
                            if (P && P.type && P.type != 'Control' && (Q = P.createRange()) && (Q = Q.parentElement()) && (Q = Q.nodeName) && Q.toLowerCase() in {input: 1, textarea: 1})return;
                            G = P && O.getRanges()[0];
                            p.call(y);
                        }
                    };
                } else {
                    D.on('mouseup', p, y);
                    D.on('keyup', p, y);
                    D.on('selectionchange', p, y);
                }
            });
            y.on('contentDomUnload', y.forceNextSelectionCheck, y);
            y.addCommand('selectAll', s);
            y.ui.addButton('SelectAll', {label: y.lang.selectAll, command: 'selectAll'});
            y.selectionChange = p;
            b.ie9Compat && y.on('destroy', function () {
                var D = y.getSelection();
                D && D.getNative().clear();
            }, null, null, 9);
        }});
        a.editor.prototype.getSelection = function () {
            return this.document && this.document.getSelection();
        };
        a.editor.prototype.forceNextSelectionCheck = function () {
            delete this._.selectionPreviousPath;
        };
        g.prototype.getSelection = function () {
            var y = new d.selection(this);
            return!y || y.isInvalid ? null : y;
        };
        a.SELECTION_NONE = 1;
        a.SELECTION_TEXT = 2;
        a.SELECTION_ELEMENT = 3;
        d.selection = function (y) {
            var B = this;
            var z = y.getCustomData('cke_locked_selection');
            if (z)return z;
            B.document = y;
            B.isLocked = 0;
            B._ = {cache: {}};
            if (c) {
                var A = B.getNative().createRange();
                if (!A || A.item && A.item(0).ownerDocument != B.document.$ || A.parentElement && A.parentElement().ownerDocument != B.document.$)B.isInvalid = true;
            }
            return B;
        };
        var x = {img: 1, hr: 1, li: 1, table: 1, tr: 1, td: 1, th: 1, embed: 1, object: 1, ol: 1, ul: 1, a: 1, input: 1, form: 1, select: 1, textarea: 1, button: 1, fieldset: 1, thead: 1, tfoot: 1};
        d.selection.prototype = {getNative: c ? function () {
            return this._.cache.nativeSel || (this._.cache.nativeSel = this.document.$.selection);
        } : function () {
            return this._.cache.nativeSel || (this._.cache.nativeSel = this.document.getWindow().$.getSelection());
        }, getType: c ? function () {
            var y = this._.cache;
            if (y.type)return y.type;
            var z = 1;
            try {
                var A = this.getNative(), B = A.type;
                if (B == 'Text')z = 2;
                if (B == 'Control')z = 3;
                if (A.createRange().parentElement)z = 2;
            } catch (C) {
            }
            return y.type = z;
        } : function () {
            var y = this._.cache;
            if (y.type)return y.type;
            var z = 2, A = this.getNative();
            if (!A)z = 1; else if (A.rangeCount == 1) {
                var B = A.getRangeAt(0), C = B.startContainer;
                if (C == B.endContainer && C.nodeType == 1 && B.endOffset - B.startOffset == 1 && x[C.childNodes[B.startOffset].nodeName.toLowerCase()])z = 3;
            }
            return y.type = z;
        }, getRanges: (function () {
            var y = c ? (function () {
                function z(B) {
                    return new d.node(B).getIndex();
                };
                var A = function (B, C) {
                    B = B.duplicate();
                    B.collapse(C);
                    var D = B.parentElement(), E = D.ownerDocument;
                    if (!D.hasChildNodes())return{container: D, offset: 0};
                    var F = D.children, G, H, I = B.duplicate(), J = 0, K = F.length - 1, L = -1, M, N;
                    while (J <= K) {
                        L = Math.floor((J + K) / 2);
                        G = F[L];
                        I.moveToElementText(G);
                        M = I.compareEndPoints('StartToStart', B);
                        if (M > 0)K = L - 1; else if (M < 0)J = L + 1; else if (b.ie9Compat && G.tagName == 'BR') {
                            var O = 'cke_range_marker';
                            B.execCommand('CreateBookmark', false, O);
                            G = E.getElementsByName(O)[0];
                            var P = z(G);
                            D.removeChild(G);
                            return{container: D, offset: P};
                        } else return{container: D, offset: z(G)};
                    }
                    if (L == -1 || L == F.length - 1 && M < 0) {
                        I.moveToElementText(D);
                        I.setEndPoint('StartToStart', B);
                        N = I.text.replace(/(\r\n|\r)/g, '\n').length;
                        F = D.childNodes;
                        if (!N) {
                            G = F[F.length - 1];
                            if (G.nodeType == 1)return{container: D, offset: F.length}; else return{container: G, offset: G.nodeValue.length};
                        }
                        var Q = F.length;
                        while (N > 0)N -= F[--Q].nodeValue.length;
                        return{container: F[Q], offset: -N};
                    } else {
                        I.collapse(M > 0 ? true : false);
                        I.setEndPoint(M > 0 ? 'StartToStart' : 'EndToStart', B);
                        N = I.text.replace(/(\r\n|\r)/g, '\n').length;
                        if (!N)return{container: D, offset: z(G) + (M > 0 ? 0 : 1)};
                        while (N > 0)try {
                            H = G[M > 0 ? 'previousSibling' : 'nextSibling'];
                            N -= H.nodeValue.length;
                            G = H;
                        } catch (R) {
                            return{container: D, offset: z(G)};
                        }
                        return{container: G, offset: M > 0 ? -N : G.nodeValue.length + N};
                    }
                };
                return function () {
                    var L = this;
                    var B = L.getNative(), C = B && B.createRange(), D = L.getType(), E;
                    if (!B)return[];
                    if (D == 2) {
                        E = new d.range(L.document);
                        var F = A(C, true);
                        E.setStart(new d.node(F.container), F.offset);
                        F = A(C);
                        E.setEnd(new d.node(F.container), F.offset);
                        if (E.endContainer.getPosition(E.startContainer) & 4 && E.endOffset <= E.startContainer.getIndex())E.collapse();
                        return[E];
                    } else if (D == 3) {
                        var G = [];
                        for (var H = 0; H < C.length; H++) {
                            var I = C.item(H), J = I.parentNode, K = 0;
                            E = new d.range(L.document);
                            for (; K < J.childNodes.length && J.childNodes[K] != I; K++) {
                            }
                            E.setStart(new d.node(J), K);
                            E.setEnd(new d.node(J), K + 1);
                            G.push(E);
                        }
                        return G;
                    }
                    return[];
                };
            })() : function () {
                var z = [], A, B = this.document, C = this.getNative();
                if (!C)return z;
                if (!C.rangeCount) {
                    A = new d.range(B);
                    A.moveToElementEditStart(B.getBody());
                    z.push(A);
                }
                for (var D = 0; D < C.rangeCount; D++) {
                    var E = C.getRangeAt(D);
                    A = new d.range(B);
                    A.setStart(new d.node(E.startContainer), E.startOffset);
                    A.setEnd(new d.node(E.endContainer), E.endOffset);
                    z.push(A);
                }
                return z;
            };
            return function (z) {
                var A = this._.cache;
                if (A.ranges && !z)return A.ranges; else if (!A.ranges)A.ranges = new d.rangeList(y.call(this));
                if (z) {
                    var B = A.ranges;
                    for (var C = 0; C < B.length; C++) {
                        var D = B[C], E = D.getCommonAncestor();
                        if (E.isReadOnly())B.splice(C, 1);
                        if (D.collapsed)continue;
                        if (D.startContainer.isReadOnly()) {
                            var F = D.startContainer;
                            while (F) {
                                if (F.is('body') || !F.isReadOnly())break;
                                if (F.type == 1 && F.getAttribute('contentEditable') == 'false')D.setStartAfter(F);
                                F = F.getParent();
                            }
                        }
                        var G = D.startContainer, H = D.endContainer, I = D.startOffset, J = D.endOffset, K = D.clone();
                        if (G && G.type == 3)if (I >= G.getLength())K.setStartAfter(G); else K.setStartBefore(G);
                        if (H && H.type == 3)if (!J)K.setEndBefore(H); else K.setEndAfter(H);
                        var L = new d.walker(K);
                        L.evaluator = function (M) {
                            if (M.type == 1 && M.isReadOnly()) {
                                var N = D.clone();
                                D.setEndBefore(M);
                                if (D.collapsed)B.splice(C--, 1);
                                if (!(M.getPosition(K.endContainer) & 16)) {
                                    N.setStartAfter(M);
                                    if (!N.collapsed)B.splice(C + 1, 0, N);
                                }
                                return true;
                            }
                            return false;
                        };
                        L.next();
                    }
                }
                return A.ranges;
            };
        })(), getStartElement: function () {
            var F = this;
            var y = F._.cache;
            if (y.startElement !== undefined)return y.startElement;
            var z, A = F.getNative();
            switch (F.getType()) {
                case 3:
                    return F.getSelectedElement();
                case 2:
                    var B = F.getRanges()[0];
                    if (B) {
                        if (!B.collapsed) {
                            B.optimize();
                            while (1) {
                                var C = B.startContainer, D = B.startOffset;
                                if (D == (C.getChildCount ? C.getChildCount() : C.getLength()) && !C.isBlockBoundary())B.setStartAfter(C); else break;
                            }
                            z = B.startContainer;
                            if (z.type != 1)return z.getParent();
                            z = z.getChild(B.startOffset);
                            if (!z || z.type != 1)z = B.startContainer; else {
                                var E = z.getFirst();
                                while (E && E.type == 1) {
                                    z = E;
                                    E = E.getFirst();
                                }
                            }
                        } else {
                            z = B.startContainer;
                            if (z.type != 1)z = z.getParent();
                        }
                        z = z.$;
                    }
            }
            return y.startElement = z ? new h(z) : null;
        }, getSelectedElement: function () {
            var y = this._.cache;
            if (y.selectedElement !== undefined)return y.selectedElement;
            var z = this, A = e.tryThese(function () {
                return z.getNative().createRange().item(0);
            }, function () {
                var B, C, D = z.getRanges()[0], E = D.getCommonAncestor(1, 1), F = {table: 1, ul: 1, ol: 1, dl: 1};
                for (var G in F) {
                    if (B = E.getAscendant(G, 1))break;
                }
                if (B) {
                    var H = new d.range(this.document);
                    H.setStartAt(B, 1);
                    H.setEnd(D.startContainer, D.startOffset);
                    var I = e.extend(F, f.$listItem, f.$tableContent), J = new d.walker(H), K = function (L, M) {
                        return function (N, O) {
                            if (N.type == 3 && (!e.trim(N.getText()) || N.getParent().data('cke-bookmark')))return true;
                            var P;
                            if (N.type == 1) {
                                P = N.getName();
                                if (P == 'br' && M && N.equals(N.getParent().getBogus()))return true;
                                if (O && P in I || P in f.$removeEmpty)return true;
                            }
                            L.halted = 1;
                            return false;
                        };
                    };
                    J.guard = K(J);
                    if (J.checkBackward() && !J.halted) {
                        J = new d.walker(H);
                        H.setStart(D.endContainer, D.endOffset);
                        H.setEndAt(B, 2);
                        J.guard = K(J, 1);
                        if (J.checkForward() && !J.halted)C = B.$;
                    }
                }
                if (!C)throw 0;
                return C;
            }, function () {
                var B = z.getRanges()[0], C, D;
                for (var E = 2; E && !((C = B.getEnclosedNode()) && C.type == 1 && x[C.getName()] && (D = C)); E--)B.shrink(1);
                return D.$;
            });
            return y.selectedElement = A ? new h(A) : null;
        }, getSelectedText: function () {
            var y = this._.cache;
            if (y.selectedText !== undefined)return y.selectedText;
            var z = '', A = this.getNative();
            if (this.getType() == 2)z = c ? A.createRange().text : A.toString();
            return y.selectedText = z;
        }, lock: function () {
            var y = this;
            y.getRanges();
            y.getStartElement();
            y.getSelectedElement();
            y.getSelectedText();
            y._.cache.nativeSel = {};
            y.isLocked = 1;
            y.document.setCustomData('cke_locked_selection', y);
        }, unlock: function (y) {
            var D = this;
            var z = D.document, A = z.getCustomData('cke_locked_selection');
            if (A) {
                z.setCustomData('cke_locked_selection', null);
                if (y) {
                    var B = A.getSelectedElement(), C = !B && A.getRanges();
                    D.isLocked = 0;
                    D.reset();
                    z.getBody().focus();
                    if (B)D.selectElement(B); else D.selectRanges(C);
                }
            }
            if (!A || !y) {
                D.isLocked = 0;
                D.reset();
            }
        }, reset: function () {
            this._.cache = {};
        }, selectElement: function (y) {
            var A = this;
            if (A.isLocked) {
                var z = new d.range(A.document);
                z.setStartBefore(y);
                z.setEndAfter(y);
                A._.cache.selectedElement = y;
                A._.cache.startElement = y;
                A._.cache.ranges = new d.rangeList(z);
                A._.cache.type = 3;
                return;
            }
            z = new d.range(y.getDocument());
            z.setStartBefore(y);
            z.setEndAfter(y);
            z.select();
            A.document.fire('selectionchange');
            A.reset();
        }, selectRanges: function (y) {
            var M = this;
            if (M.isLocked) {
                M._.cache.selectedElement = null;
                M._.cache.startElement = y[0] && y[0].getTouchedStartNode();
                M._.cache.ranges = new d.rangeList(y);
                M._.cache.type = 2;
                return;
            }
            if (c) {
                if (y.length > 1) {
                    var z = y[y.length - 1];
                    y[0].setEnd(z.endContainer, z.endOffset);
                    y.length = 1;
                }
                if (y[0])y[0].select();
                M.reset();
            } else {
                var A = M.getNative();
                if (!A)return;
                if (y.length) {
                    A.removeAllRanges();
                    b.webkit && w(M.document);
                }
                for (var B = 0; B < y.length; B++) {
                    if (B < y.length - 1) {
                        var C = y[B], D = y[B + 1], E = C.clone();
                        E.setStart(C.endContainer, C.endOffset);
                        E.setEnd(D.startContainer, D.startOffset);
                        if (!E.collapsed) {
                            E.shrink(1, true);
                            var F = E.getCommonAncestor(), G = E.getEnclosedNode();
                            if (F.isReadOnly() || G && G.isReadOnly()) {
                                D.setStart(C.startContainer, C.startOffset);
                                y.splice(B--, 1);
                                continue;
                            }
                        }
                    }
                    var H = y[B], I = M.document.$.createRange(), J = H.startContainer;
                    if (H.collapsed && (b.opera || b.gecko && b.version < 10900) && J.type == 1 && !J.getChildCount())J.appendText('');
                    if (H.collapsed && b.webkit && r(H)) {
                        var K = t(M.document);
                        H.insertNode(K);
                        var L = K.getNext();
                        if (L && !K.getPrevious() && L.type == 1 && L.getName() == 'br') {
                            w(M.document);
                            H.moveToPosition(L, 3);
                        } else H.moveToPosition(K, 4);
                    }
                    I.setStart(H.startContainer.$, H.startOffset);
                    try {
                        I.setEnd(H.endContainer.$, H.endOffset);
                    } catch (N) {
                        if (N.toString().indexOf('NS_ERROR_ILLEGAL_VALUE') >= 0) {
                            H.collapse(1);
                            I.setEnd(H.endContainer.$, H.endOffset);
                        } else throw N;
                    }
                    A.addRange(I);
                }
                M.document.fire('selectionchange');
                M.reset();
            }
        }, createBookmarks: function (y) {
            return this.getRanges().createBookmarks(y);
        }, createBookmarks2: function (y) {
            return this.getRanges().createBookmarks2(y);
        }, selectBookmarks: function (y) {
            var z = [];
            for (var A = 0; A < y.length; A++) {
                var B = new d.range(this.document);
                B.moveToBookmark(y[A]);
                z.push(B);
            }
            this.selectRanges(z);
            return this;
        }, getCommonAncestor: function () {
            var y = this.getRanges(), z = y[0].startContainer, A = y[y.length - 1].endContainer;
            return z.getCommonAncestor(A);
        }, scrollIntoView: function () {
            var y = this.getStartElement();
            y.scrollIntoView();
        }};
    })();
    (function () {
        var m = d.walker.whitespaces(true), n = /\ufeff|\u00a0/, o = {table: 1, tbody: 1, tr: 1};
        d.range.prototype.select = c ? function (p) {
            var A = this;
            var q = A.collapsed, r, s, t, u = A.getEnclosedNode();
            if (u)try {
                t = A.document.$.body.createControlRange();
                t.addElement(u.$);
                t.select();
                return;
            } catch (B) {
            }
            if (A.startContainer.type == 1 && A.startContainer.getName() in o || A.endContainer.type == 1 && A.endContainer.getName() in o)A.shrink(1, true);
            var v = A.createBookmark(), w = v.startNode, x;
            if (!q)x = v.endNode;
            t = A.document.$.body.createTextRange();
            t.moveToElementText(w.$);
            t.moveStart('character', 1);
            if (x) {
                var y = A.document.$.body.createTextRange();
                y.moveToElementText(x.$);
                t.setEndPoint('EndToEnd', y);
                t.moveEnd('character', -1);
            } else {
                var z = w.getNext(m);
                r = !(z && z.getText && z.getText().match(n)) && (p || !w.hasPrevious() || w.getPrevious().is && w.getPrevious().is('br'));
                s = A.document.createElement('span');
                s.setHtml('&#65279;');
                s.insertBefore(w);
                if (r)A.document.createText('\ufeff').insertBefore(w);
            }
            A.setStartBefore(w);
            w.remove();
            if (q) {
                if (r) {
                    t.moveStart('character', -1);
                    t.select();
                    A.document.$.selection.clear();
                } else t.select();
                A.moveToPosition(s, 3);
                s.remove();
            } else {
                A.setEndBefore(x);
                x.remove();
                t.select();
            }
            A.document.fire('selectionchange');
        } : function () {
            this.document.getSelection().selectRanges([this]);
        };
    })();
    (function () {
        var m = a.htmlParser.cssStyle, n = e.cssLength, o = /^((?:\d*(?:\.\d+))|(?:\d+))(.*)?$/i;

        function p(r, s) {
            var t = o.exec(r), u = o.exec(s);
            if (t) {
                if (!t[2] && u[2] == 'px')return u[1];
                if (t[2] == 'px' && !u[2])return u[1] + 'px';
            }
            return s;
        };
        var q = {elements: {$: function (r) {
            var s = r.attributes, t = s && s['data-cke-realelement'], u = t && new a.htmlParser.fragment.fromHtml(decodeURIComponent(t)), v = u && u.children[0];
            if (v && r.attributes['data-cke-resizable']) {
                var w = new m(r).rules, x = v.attributes, y = w.width, z = w.height;
                y && (x.width = p(x.width, y));
                z && (x.height = p(x.height, z));
            }
            return v;
        }}};
        j.add('fakeobjects', {requires: ['htmlwriter'], afterInit: function (r) {
            var s = r.dataProcessor, t = s && s.htmlFilter;
            if (t)t.addRules(q);
        }});
        a.editor.prototype.createFakeElement = function (r, s, t, u) {
            var v = this.lang.fakeobjects, w = v[t] || v.unknown, x = {'class': s, src: a.getUrl('images/spacer.gif'), 'data-cke-realelement': encodeURIComponent(r.getOuterHtml()), 'data-cke-real-node-type': r.type, alt: w, title: w, align: r.getAttribute('align') || ''};
            if (t)x['data-cke-real-element-type'] = t;
            if (u) {
                x['data-cke-resizable'] = u;
                var y = new m(), z = r.getAttribute('width'), A = r.getAttribute('height');
                z && (y.rules.width = n(z));
                A && (y.rules.height = n(A));
                y.populate(x);
            }
            return this.document.createElement('img', {attributes: x});
        };
        a.editor.prototype.createFakeParserElement = function (r, s, t, u) {
            var v = this.lang.fakeobjects, w = v[t] || v.unknown, x, y = new a.htmlParser.basicWriter();
            r.writeHtml(y);
            x = y.getHtml();
            var z = {'class': s, src: a.getUrl('images/spacer.gif'), 'data-cke-realelement': encodeURIComponent(x), 'data-cke-real-node-type': r.type, alt: w, title: w, align: r.attributes.align || ''};
            if (t)z['data-cke-real-element-type'] = t;
            if (u) {
                z['data-cke-resizable'] = u;
                var A = r.attributes, B = new m(), C = A.width, D = A.height;
                C != undefined && (B.rules.width = n(C));
                D != undefined && (B.rules.height = n(D));
                B.populate(z);
            }
            return new a.htmlParser.element('img', z);
        };
        a.editor.prototype.restoreRealElement = function (r) {
            if (r.data('cke-real-node-type') != 1)return null;
            var s = h.createFromHtml(decodeURIComponent(r.data('cke-realelement')), this.document);
            if (r.data('cke-resizable')) {
                var t = r.getStyle('width'), u = r.getStyle('height');
                t && s.setAttribute('width', p(s.getAttribute('width'), t));
                u && s.setAttribute('height', p(s.getAttribute('height'), u));
            }
            return s;
        };
    })();
    j.add('richcombo', {requires: ['floatpanel', 'listblock', 'button'], beforeInit: function (m) {
        m.ui.addHandler('richcombo', k.richCombo.handler);
    }});
    a.UI_RICHCOMBO = 'richcombo';
    k.richCombo = e.createClass({$: function (m) {
        var o = this;
        e.extend(o, m, {title: m.label, modes: {wysiwyg: 1}});
        var n = o.panel || {};
        delete o.panel;
        o.id = e.getNextNumber();
        o.document = n && n.parent && n.parent.getDocument() || a.document;
        n.className = (n.className || '') + ' cke_rcombopanel';
        n.block = {multiSelect: n.multiSelect, attributes: n.attributes};
        o._ = {panelDefinition: n, items: {}, state: 2};
    }, statics: {handler: {create: function (m) {
        return new k.richCombo(m);
    }}}, proto: {renderHtml: function (m) {
        var n = [];
        this.render(m, n);
        return n.join('');
    }, render: function (m, n) {
        var o = b, p = 'cke_' + this.id, q = e.addFunction(function (v) {
            var y = this;
            var w = y._;
            if (w.state == 0)return;
            y.createPanel(m);
            if (w.on) {
                w.panel.hide();
                return;
            }
            y.commit();
            var x = y.getValue();
            if (x)w.list.mark(x); else w.list.unmarkAll();
            w.panel.showBlock(y.id, new h(v), 4);
        }, this), r = {id: p, combo: this, focus: function () {
            var v = a.document.getById(p).getChild(1);
            v.focus();
        }, clickFn: q};

        function s() {
            var w = this;
            var v = w.modes[m.mode] ? 2 : 0;
            w.setState(m.readOnly && !w.readOnly ? 0 : v);
            w.setValue('');
        };
        m.on('mode', s, this);
        !this.readOnly && m.on('readOnly', s, this);
        var t = e.addFunction(function (v, w) {
            v = new d.event(v);
            var x = v.getKeystroke();
            switch (x) {
                case 13:
                case 32:
                case 40:
                    e.callFunction(q, w);
                    break;
                default:
                    r.onkey(r, x);
            }
            v.preventDefault();
        }), u = e.addFunction(function () {
            r.onfocus && r.onfocus();
        });
        r.keyDownFn = t;
        n.push('<span class="cke_rcombo" role="presentation">', '<span id=', p);
        if (this.className)n.push(' class="', this.className, ' cke_off"');
        n.push(' role="presentation">', '<span id="' + p + '_label" class=cke_label>', this.label, '</span>', '<a hidefocus=true title="', this.title, '" tabindex="-1"', o.gecko && o.version >= 10900 && !o.hc ? '' : " href=\"javascript:void('" + this.label + "')\"", ' role="button" aria-labelledby="', p, '_label" aria-describedby="', p, '_text" aria-haspopup="true"');
        if (b.opera || b.gecko && b.mac)n.push(' onkeypress="return false;"');
        if (b.gecko)n.push(' onblur="this.style.cssText = this.style.cssText;"');
        n.push(' onkeydown="CKEDITOR.tools.callFunction( ', t, ', event, this );" onfocus="return CKEDITOR.tools.callFunction(', u, ', event);" ' + (c ? 'onclick="return false;" onmouseup' : 'onclick') + '="CKEDITOR.tools.callFunction(', q, ', this); return false;"><span><span id="' + p + '_text" class="cke_text cke_inline_label">' + this.label + '</span>' + '</span>' + '<span class=cke_openbutton><span class=cke_icon>' + (b.hc ? '&#9660;' : b.air ? '&nbsp;' : '') + '</span></span>' + '</a>' + '</span>' + '</span>');
        if (this.onRender)this.onRender();
        return r;
    }, createPanel: function (m) {
        if (this._.panel)return;
        var n = this._.panelDefinition, o = this._.panelDefinition.block, p = n.parent || a.document.getBody(), q = new k.floatPanel(m, p, n), r = q.addListBlock(this.id, o), s = this;
        q.onShow = function () {
            if (s.className)this.element.getFirst().addClass(s.className + '_panel');
            s.setState(1);
            r.focus(!s.multiSelect && s.getValue());
            s._.on = 1;
            if (s.onOpen)s.onOpen();
        };
        q.onHide = function (t) {
            if (s.className)this.element.getFirst().removeClass(s.className + '_panel');
            s.setState(s.modes && s.modes[m.mode] ? 2 : 0);
            s._.on = 0;
            if (!t && s.onClose)s.onClose();
        };
        q.onEscape = function () {
            q.hide();
        };
        r.onClick = function (t, u) {
            s.document.getWindow().focus();
            if (s.onClick)s.onClick.call(s, t, u);
            if (u)s.setValue(t, s._.items[t]); else s.setValue('');
            q.hide(false);
        };
        this._.panel = q;
        this._.list = r;
        q.getBlock(this.id).onHide = function () {
            s._.on = 0;
            s.setState(2);
        };
        if (this.init)this.init();
    }, setValue: function (m, n) {
        var p = this;
        p._.value = m;
        var o = p.document.getById('cke_' + p.id + '_text');
        if (o) {
            if (!(m || n)) {
                n = p.label;
                o.addClass('cke_inline_label');
            } else o.removeClass('cke_inline_label');
            o.setHtml(typeof n != 'undefined' ? n : m);
        }
    }, getValue: function () {
        return this._.value || '';
    }, unmarkAll: function () {
        this._.list.unmarkAll();
    }, mark: function (m) {
        this._.list.mark(m);
    }, hideItem: function (m) {
        this._.list.hideItem(m);
    }, hideGroup: function (m) {
        this._.list.hideGroup(m);
    }, showAll: function () {
        this._.list.showAll();
    }, add: function (m, n, o) {
        this._.items[m] = o || m;
        this._.list.add(m, n, o);
    }, startGroup: function (m) {
        this._.list.startGroup(m);
    }, commit: function () {
        var m = this;
        if (!m._.committed) {
            m._.list.commit();
            m._.committed = 1;
            k.fire('ready', m);
        }
        m._.committed = 1;
    }, setState: function (m) {
        var n = this;
        if (n._.state == m)return;
        n.document.getById('cke_' + n.id).setState(m);
        n._.state = m;
    }}});
    k.prototype.addRichCombo = function (m, n) {
        this.add(m, 'richcombo', n);
    };
    j.add('htmlwriter');
    a.htmlWriter = e.createClass({base: a.htmlParser.basicWriter, $: function () {
        var o = this;
        o.base();
        o.indentationChars = '\t';
        o.selfClosingEnd = ' />';
        o.lineBreakChars = '\n';
        o.forceSimpleAmpersand = 0;
        o.sortAttributes = 1;
        o._.indent = 0;
        o._.indentation = '';
        o._.inPre = 0;
        o._.rules = {};
        var m = f;
        for (var n in e.extend({}, m.$nonBodyContent, m.$block, m.$listItem, m.$tableContent))o.setRules(n, {indent: 1, breakBeforeOpen: 1, breakAfterOpen: 1, breakBeforeClose: !m[n]['#'], breakAfterClose: 1});
        o.setRules('br', {breakAfterOpen: 1});
        o.setRules('title', {indent: 0, breakAfterOpen: 0});
        o.setRules('style', {indent: 0, breakBeforeClose: 1});
        o.setRules('pre', {indent: 0});
    }, proto: {openTag: function (m, n) {
        var p = this;
        var o = p._.rules[m];
        if (p._.indent)p.indentation(); else if (o && o.breakBeforeOpen) {
            p.lineBreak();
            p.indentation();
        }
        p._.output.push('<', m);
    }, openTagClose: function (m, n) {
        var p = this;
        var o = p._.rules[m];
        if (n)p._.output.push(p.selfClosingEnd); else {
            p._.output.push('>');
            if (o && o.indent)p._.indentation += p.indentationChars;
        }
        if (o && o.breakAfterOpen)p.lineBreak();
        m == 'pre' && (p._.inPre = 1);
    }, attribute: function (m, n) {
        if (typeof n == 'string') {
            this.forceSimpleAmpersand && (n = n.replace(/&amp;/g, '&'));
            n = e.htmlEncodeAttr(n);
        }
        this._.output.push(' ', m, '="', n, '"');
    }, closeTag: function (m) {
        var o = this;
        var n = o._.rules[m];
        if (n && n.indent)o._.indentation = o._.indentation.substr(o.indentationChars.length);
        if (o._.indent)o.indentation(); else if (n && n.breakBeforeClose) {
            o.lineBreak();
            o.indentation();
        }
        o._.output.push('</', m, '>');
        m == 'pre' && (o._.inPre = 0);
        if (n && n.breakAfterClose)o.lineBreak();
    }, text: function (m) {
        var n = this;
        if (n._.indent) {
            n.indentation();
            !n._.inPre && (m = e.ltrim(m));
        }
        n._.output.push(m);
    }, comment: function (m) {
        if (this._.indent)this.indentation();
        this._.output.push('<!--', m, '-->');
    }, lineBreak: function () {
        var m = this;
        if (!m._.inPre && m._.output.length > 0)m._.output.push(m.lineBreakChars);
        m._.indent = 1;
    }, indentation: function () {
        var m = this;
        if (!m._.inPre)m._.output.push(m._.indentation);
        m._.indent = 0;
    }, setRules: function (m, n) {
        var o = this._.rules[m];
        if (o)e.extend(o, n, true); else this._.rules[m] = n;
    }}});
    j.add('menubutton', {requires: ['button', 'menu'], beforeInit: function (m) {
        m.ui.addHandler('menubutton', k.menuButton.handler);
    }});
    a.UI_MENUBUTTON = 'menubutton';
    (function () {
        var m = function (n) {
            var o = this._;
            if (o.state === 0)return;
            o.previousState = o.state;
            var p = o.menu;
            if (!p) {
                p = o.menu = new a.menu(n, {panel: {className: n.skinClass + ' cke_contextmenu', attributes: {'aria-label': n.lang.common.options}}});
                p.onHide = e.bind(function () {
                    this.setState(this.modes && this.modes[n.mode] ? o.previousState : 0);
                }, this);
                if (this.onMenu)p.addListener(this.onMenu);
            }
            if (o.on) {
                p.hide();
                return;
            }
            this.setState(1);
            p.show(a.document.getById(this._.id), 4);
        };
        k.menuButton = e.createClass({base: k.button, $: function (n) {
            var o = n.panel;
            delete n.panel;
            this.base(n);
            this.hasArrow = true;
            this.click = m;
        }, statics: {handler: {create: function (n) {
            return new k.menuButton(n);
        }}}});
    })();
    j.add('dialogui');
    (function () {
        var m = function (u) {
            var x = this;
            x._ || (x._ = {});
            x._['default'] = x._.initValue = u['default'] || '';
            x._.required = u.required || false;
            var v = [x._];
            for (var w = 1; w < arguments.length; w++)v.push(arguments[w]);
            v.push(true);
            e.extend.apply(e, v);
            return x._;
        }, n = {build: function (u, v, w) {
            return new k.dialog.textInput(u, v, w);
        }}, o = {build: function (u, v, w) {
            return new k.dialog[v.type](u, v, w);
        }}, p = {build: function (u, v, w) {
            var x = v.children, y, z = [], A = [];
            for (var B = 0; B < x.length && (y = x[B]); B++) {
                var C = [];
                z.push(C);
                A.push(a.dialog._.uiElementBuilders[y.type].build(u, y, C));
            }
            return new k.dialog[v.type](u, A, z, w, v);
        }}, q = {isChanged: function () {
            return this.getValue() != this.getInitValue();
        }, reset: function (u) {
            this.setValue(this.getInitValue(), u);
        }, setInitValue: function () {
            this._.initValue = this.getValue();
        }, resetInitValue: function () {
            this._.initValue = this._['default'];
        }, getInitValue: function () {
            return this._.initValue;
        }}, r = e.extend({}, k.dialog.uiElement.prototype.eventProcessors, {onChange: function (u, v) {
            if (!this._.domOnChangeRegistered) {
                u.on('load', function () {
                    this.getInputElement().on('change', function () {
                        if (!u.parts.dialog.isVisible())return;
                        this.fire('change', {value: this.getValue()});
                    }, this);
                }, this);
                this._.domOnChangeRegistered = true;
            }
            this.on('change', v);
        }}, true), s = /^on([A-Z]\w+)/, t = function (u) {
            for (var v in u) {
                if (s.test(v) || v == 'title' || v == 'type')delete u[v];
            }
            return u;
        };
        e.extend(k.dialog, {labeledElement: function (u, v, w, x) {
            if (arguments.length < 4)return;
            var y = m.call(this, v);
            y.labelId = e.getNextId() + '_label';
            var z = this._.children = [], A = function () {
                var B = [], C = v.required ? ' cke_required' : '';
                if (v.labelLayout != 'horizontal')B.push('<label class="cke_dialog_ui_labeled_label' + C + '" ', ' id="' + y.labelId + '"', ' for="' + y.inputId + '"', (v.labelStyle ? ' style="' + v.labelStyle + '"' : '') + '>', v.label, '</label>', '<div class="cke_dialog_ui_labeled_content"' + (v.controlStyle ? ' style="' + v.controlStyle + '"' : '') + ' role="presentation">', x.call(this, u, v), '</div>'); else {
                    var D = {type: 'hbox', widths: v.widths, padding: 0, children: [
                        {type: 'html', html: '<label class="cke_dialog_ui_labeled_label' + C + '"' + ' id="' + y.labelId + '"' + ' for="' + y.inputId + '"' + (v.labelStyle ? ' style="' + v.labelStyle + '"' : '') + '>' + e.htmlEncode(v.label) + '</span>'},
                        {type: 'html', html: '<span class="cke_dialog_ui_labeled_content"' + (v.controlStyle ? ' style="' + v.controlStyle + '"' : '') + '>' + x.call(this, u, v) + '</span>'}
                    ]};
                    a.dialog._.uiElementBuilders.hbox.build(u, D, B);
                }
                return B.join('');
            };
            k.dialog.uiElement.call(this, u, v, w, 'div', null, {role: 'presentation'}, A);
        }, textInput: function (u, v, w) {
            if (arguments.length < 3)return;
            m.call(this, v);
            var x = this._.inputId = e.getNextId() + '_textInput', y = {'class': 'cke_dialog_ui_input_' + v.type, id: x, type: 'text'}, z;
            if (v.validate)this.validate = v.validate;
            if (v.maxLength)y.maxlength = v.maxLength;
            if (v.size)y.size = v.size;
            if (v.inputStyle)y.style = v.inputStyle;
            var A = this, B = false;
            u.on('load', function () {
                A.getInputElement().on('keydown', function (D) {
                    if (D.data.getKeystroke() == 13)B = true;
                });
                A.getInputElement().on('keyup', function (D) {
                    if (D.data.getKeystroke() == 13 && B) {
                        u.getButton('ok') && setTimeout(function () {
                            u.getButton('ok').click();
                        }, 0);
                        B = false;
                    }
                }, null, null, 1000);
            });
            var C = function () {
                var D = ['<div class="cke_dialog_ui_input_', v.type, '" role="presentation"'];
                if (v.width)D.push('style="width:' + v.width + '" ');
                D.push('><input ');
                y['aria-labelledby'] = this._.labelId;
                this._.required && (y['aria-required'] = this._.required);
                for (var E in y)D.push(E + '="' + y[E] + '" ');
                D.push(' /></div>');
                return D.join('');
            };
            k.dialog.labeledElement.call(this, u, v, w, C);
        }, textarea: function (u, v, w) {
            if (arguments.length < 3)return;
            m.call(this, v);
            var x = this, y = this._.inputId = e.getNextId() + '_textarea', z = {};
            if (v.validate)this.validate = v.validate;
            z.rows = v.rows || 5;
            z.cols = v.cols || 20;
            if (typeof v.inputStyle != 'undefined')z.style = v.inputStyle;
            var A = function () {
                z['aria-labelledby'] = this._.labelId;
                this._.required && (z['aria-required'] = this._.required);
                var B = ['<div class="cke_dialog_ui_input_textarea" role="presentation"><textarea class="cke_dialog_ui_input_textarea" id="', y, '" '];
                for (var C in z)B.push(C + '="' + e.htmlEncode(z[C]) + '" ');
                B.push('>', e.htmlEncode(x._['default']), '</textarea></div>');
                return B.join('');
            };
            k.dialog.labeledElement.call(this, u, v, w, A);
        }, checkbox: function (u, v, w) {
            if (arguments.length < 3)return;
            var x = m.call(this, v, {'default': !!v['default']});
            if (v.validate)this.validate = v.validate;
            var y = function () {
                var z = e.extend({}, v, {id: v.id ? v.id + '_checkbox' : e.getNextId() + '_checkbox'}, true), A = [], B = e.getNextId() + '_label', C = {'class': 'cke_dialog_ui_checkbox_input', type: 'checkbox', 'aria-labelledby': B};
                t(z);
                if (v['default'])C.checked = 'checked';
                if (typeof z.inputStyle != 'undefined')z.style = z.inputStyle;
                x.checkbox = new k.dialog.uiElement(u, z, A, 'input', null, C);
                A.push(' <label id="', B, '" for="', C.id, '"' + (v.labelStyle ? ' style="' + v.labelStyle + '"' : '') + '>', e.htmlEncode(v.label), '</label>');
                return A.join('');
            };
            k.dialog.uiElement.call(this, u, v, w, 'span', null, null, y);
        }, radio: function (u, v, w) {
            if (arguments.length < 3)return;
            m.call(this, v);
            if (!this._['default'])this._['default'] = this._.initValue = v.items[0][1];
            if (v.validate)this.validate = v.valdiate;
            var x = [], y = this, z = function () {
                var A = [], B = [], C = {'class': 'cke_dialog_ui_radio_item', 'aria-labelledby': this._.labelId}, D = v.id ? v.id + '_radio' : e.getNextId() + '_radio';
                for (var E = 0; E < v.items.length; E++) {
                    var F = v.items[E], G = F[2] !== undefined ? F[2] : F[0], H = F[1] !== undefined ? F[1] : F[0], I = e.getNextId() + '_radio_input', J = I + '_label', K = e.extend({}, v, {id: I, title: null, type: null}, true), L = e.extend({}, K, {title: G}, true), M = {type: 'radio', 'class': 'cke_dialog_ui_radio_input', name: D, value: H, 'aria-labelledby': J}, N = [];
                    if (y._['default'] == H)M.checked = 'checked';
                    t(K);
                    t(L);
                    if (typeof K.inputStyle != 'undefined')K.style = K.inputStyle;
                    x.push(new k.dialog.uiElement(u, K, N, 'input', null, M));
                    N.push(' ');
                    new k.dialog.uiElement(u, L, N, 'label', null, {id: J, 'for': M.id}, F[0]);
                    A.push(N.join(''));
                }
                new k.dialog.hbox(u, x, A, B);
                return B.join('');
            };
            k.dialog.labeledElement.call(this, u, v, w, z);
            this._.children = x;
        }, button: function (u, v, w) {
            if (!arguments.length)return;
            if (typeof v == 'function')v = v(u.getParentEditor());
            m.call(this, v, {disabled: v.disabled || false});
            a.event.implementOn(this);
            var x = this;
            u.on('load', function (A) {
                var B = this.getElement();
                (function () {
                    B.on('click', function (C) {
                        x.fire('click', {dialog: x.getDialog()});
                        C.data.preventDefault();
                    });
                    B.on('keydown', function (C) {
                        if (C.data.getKeystroke() in {32: 1}) {
                            x.click();
                            C.data.preventDefault();
                        }
                    });
                })();
                B.unselectable();
            }, this);
            var y = e.extend({}, v);
            delete y.style;
            var z = e.getNextId() + '_label';
            k.dialog.uiElement.call(this, u, y, w, 'a', null, {style: v.style, href: 'javascript:void(0)', title: v.label, hidefocus: 'true', 'class': v['class'], role: 'button', 'aria-labelledby': z}, '<span id="' + z + '" class="cke_dialog_ui_button">' + e.htmlEncode(v.label) + '</span>');
        }, select: function (u, v, w) {
            if (arguments.length < 3)return;
            var x = m.call(this, v);
            if (v.validate)this.validate = v.validate;
            x.inputId = e.getNextId() + '_select';
            var y = function () {
                var z = e.extend({}, v, {id: v.id ? v.id + '_select' : e.getNextId() + '_select'}, true), A = [], B = [], C = {id: x.inputId, 'class': 'cke_dialog_ui_input_select', 'aria-labelledby': this._.labelId};
                if (v.size != undefined)C.size = v.size;
                if (v.multiple != undefined)C.multiple = v.multiple;
                t(z);
                for (var D = 0, E; D < v.items.length && (E = v.items[D]); D++)B.push('<option value="', e.htmlEncode(E[1] !== undefined ? E[1] : E[0]).replace(/"/g, '&quot;'), '" /> ', e.htmlEncode(E[0]));
                if (typeof z.inputStyle != 'undefined')z.style = z.inputStyle;
                x.select = new k.dialog.uiElement(u, z, A, 'select', null, C, B.join(''));
                return A.join('');
            };
            k.dialog.labeledElement.call(this, u, v, w, y);
        }, file: function (u, v, w) {
            if (arguments.length < 3)return;
            if (v['default'] === undefined)v['default'] = '';
            var x = e.extend(m.call(this, v), {definition: v, buttons: []});
            if (v.validate)this.validate = v.validate;
            var y = function () {
                x.frameId = e.getNextId() + '_fileInput';
                var z = b.isCustomDomain(), A = ['<iframe frameborder="0" allowtransparency="0" class="cke_dialog_ui_input_file" id="', x.frameId, '" title="', v.label, '" src="javascript:void('];
                A.push(z ? "(function(){document.open();document.domain='" + document.domain + "';" + 'document.close();' + '})()' : '0');
                A.push(')"></iframe>');
                return A.join('');
            };
            u.on('load', function () {
                var z = a.document.getById(x.frameId), A = z.getParent();
                A.addClass('cke_dialog_ui_input_file');
            });
            k.dialog.labeledElement.call(this, u, v, w, y);
        }, fileButton: function (u, v, w) {
            if (arguments.length < 3)return;
            var x = m.call(this, v), y = this;
            if (v.validate)this.validate = v.validate;
            var z = e.extend({}, v), A = z.onClick;
            z.className = (z.className ? z.className + ' ' : '') + 'cke_dialog_ui_button';
            z.onClick = function (B) {
                var C = v['for'];
                if (!A || A.call(this, B) !== false) {
                    u.getContentElement(C[0], C[1]).submit();
                    this.disable();
                }
            };
            u.on('load', function () {
                u.getContentElement(v['for'][0], v['for'][1])._.buttons.push(y);
            });
            k.dialog.button.call(this, u, z, w);
        }, html: (function () {
            var u = /^\s*<[\w:]+\s+([^>]*)?>/, v = /^(\s*<[\w:]+(?:\s+[^>]*)?)((?:.|\r|\n)+)$/, w = /\/$/;
            return function (x, y, z) {
                if (arguments.length < 3)return;
                var A = [], B, C = y.html, D, E;
                if (C.charAt(0) != '<')C = '<span>' + C + '</span>';
                var F = y.focus;
                if (F) {
                    var G = this.focus;
                    this.focus = function () {
                        G.call(this);
                        typeof F == 'function' && F.call(this);
                        this.fire('focus');
                    };
                    if (y.isFocusable) {
                        var H = this.isFocusable;
                        this.isFocusable = H;
                    }
                    this.keyboardFocusable = true;
                }
                k.dialog.uiElement.call(this, x, y, A, 'span', null, null, '');
                B = A.join('');
                D = B.match(u);
                E = C.match(v) || ['', '', ''];
                if (w.test(E[1])) {
                    E[1] = E[1].slice(0, -1);
                    E[2] = '/' + E[2];
                }
                z.push([E[1], ' ', D[1] || '', E[2]].join(''));
            };
        })(), fieldset: function (u, v, w, x, y) {
            var z = y.label, A = function () {
                var B = [];
                z && B.push('<legend>' + z + '</legend>');
                for (var C = 0; C < w.length; C++)B.push(w[C]);
                return B.join('');
            };
            this._ = {children: v};
            k.dialog.uiElement.call(this, u, y, x, 'fieldset', null, null, A);
        }}, true);
        k.dialog.html.prototype = new k.dialog.uiElement();
        k.dialog.labeledElement.prototype = e.extend(new k.dialog.uiElement(), {setLabel: function (u) {
            var v = a.document.getById(this._.labelId);
            if (v.getChildCount() < 1)new d.text(u, a.document).appendTo(v); else v.getChild(0).$.nodeValue = u;
            return this;
        }, getLabel: function () {
            var u = a.document.getById(this._.labelId);
            if (!u || u.getChildCount() < 1)return ''; else return u.getChild(0).getText();
        }, eventProcessors: r}, true);
        k.dialog.button.prototype = e.extend(new k.dialog.uiElement(), {click: function () {
            var u = this;
            if (!u._.disabled)return u.fire('click', {dialog: u._.dialog});
            u.getElement().$.blur();
            return false;
        }, enable: function () {
            this._.disabled = false;
            var u = this.getElement();
            u && u.removeClass('cke_disabled');
        }, disable: function () {
            this._.disabled = true;
            this.getElement().addClass('cke_disabled');
        }, isVisible: function () {
            return this.getElement().getFirst().isVisible();
        }, isEnabled: function () {
            return!this._.disabled;
        }, eventProcessors: e.extend({}, k.dialog.uiElement.prototype.eventProcessors, {onClick: function (u, v) {
            this.on('click', v);
        }}, true), accessKeyUp: function () {
            this.click();
        }, accessKeyDown: function () {
            this.focus();
        }, keyboardFocusable: true}, true);
        k.dialog.textInput.prototype = e.extend(new k.dialog.labeledElement(), {getInputElement: function () {
            return a.document.getById(this._.inputId);
        }, focus: function () {
            var u = this.selectParentTab();
            setTimeout(function () {
                var v = u.getInputElement();
                v && v.$.focus();
            }, 0);
        }, select: function () {
            var u = this.selectParentTab();
            setTimeout(function () {
                var v = u.getInputElement();
                if (v) {
                    v.$.focus();
                    v.$.select();
                }
            }, 0);
        }, accessKeyUp: function () {
            this.select();
        }, setValue: function (u) {
            !u && (u = '');
            return k.dialog.uiElement.prototype.setValue.apply(this, arguments);
        }, keyboardFocusable: true}, q, true);
        k.dialog.textarea.prototype = new k.dialog.textInput();
        k.dialog.select.prototype = e.extend(new k.dialog.labeledElement(), {getInputElement: function () {
            return this._.select.getElement();
        }, add: function (u, v, w) {
            var x = new h('option', this.getDialog().getParentEditor().document), y = this.getInputElement().$;
            x.$.text = u;
            x.$.value = v === undefined || v === null ? u : v;
            if (w === undefined || w === null) {
                if (c)y.add(x.$); else y.add(x.$, null);
            } else y.add(x.$, w);
            return this;
        }, remove: function (u) {
            var v = this.getInputElement().$;
            v.remove(u);
            return this;
        }, clear: function () {
            var u = this.getInputElement().$;
            while (u.length > 0)u.remove(0);
            return this;
        }, keyboardFocusable: true}, q, true);
        k.dialog.checkbox.prototype = e.extend(new k.dialog.uiElement(), {getInputElement: function () {
            return this._.checkbox.getElement();
        }, setValue: function (u, v) {
            this.getInputElement().$.checked = u;
            !v && this.fire('change', {value: u});
        }, getValue: function () {
            return this.getInputElement().$.checked;
        }, accessKeyUp: function () {
            this.setValue(!this.getValue());
        }, eventProcessors: {onChange: function (u, v) {
            if (!c)return r.onChange.apply(this, arguments); else {
                u.on('load', function () {
                    var w = this._.checkbox.getElement();
                    w.on('propertychange', function (x) {
                        x = x.data.$;
                        if (x.propertyName == 'checked')this.fire('change', {value: w.$.checked});
                    }, this);
                }, this);
                this.on('change', v);
            }
            return null;
        }}, keyboardFocusable: true}, q, true);
        k.dialog.radio.prototype = e.extend(new k.dialog.uiElement(), {setValue: function (u, v) {
            var w = this._.children, x;
            for (var y = 0; y < w.length && (x = w[y]); y++)x.getElement().$.checked = x.getValue() == u;
            !v && this.fire('change', {value: u});
        }, getValue: function () {
            var u = this._.children;
            for (var v = 0; v < u.length; v++) {
                if (u[v].getElement().$.checked)return u[v].getValue();
            }
            return null;
        }, accessKeyUp: function () {
            var u = this._.children, v;
            for (v = 0; v < u.length; v++) {
                if (u[v].getElement().$.checked) {
                    u[v].getElement().focus();
                    return;
                }
            }
            u[0].getElement().focus();
        }, eventProcessors: {onChange: function (u, v) {
            if (!c)return r.onChange.apply(this, arguments); else {
                u.on('load', function () {
                    var w = this._.children, x = this;
                    for (var y = 0; y < w.length; y++) {
                        var z = w[y].getElement();
                        z.on('propertychange', function (A) {
                            A = A.data.$;
                            if (A.propertyName == 'checked' && this.$.checked)x.fire('change', {value: this.getAttribute('value')});
                        });
                    }
                }, this);
                this.on('change', v);
            }
            return null;
        }}, keyboardFocusable: true}, q, true);
        k.dialog.file.prototype = e.extend(new k.dialog.labeledElement(), q, {getInputElement: function () {
            var u = a.document.getById(this._.frameId).getFrameDocument();
            return u.$.forms.length > 0 ? new h(u.$.forms[0].elements[0]) : this.getElement();
        }, submit: function () {
            this.getInputElement().getParent().$.submit();
            return this;
        }, getAction: function () {
            return this.getInputElement().getParent().$.action;
        }, registerEvents: function (u) {
            var v = /^on([A-Z]\w+)/, w, x = function (z, A, B, C) {
                z.on('formLoaded', function () {
                    z.getInputElement().on(B, C, z);
                });
            };
            for (var y in u) {
                if (!(w = y.match(v)))continue;
                if (this.eventProcessors[y])this.eventProcessors[y].call(this, this._.dialog, u[y]); else x(this, this._.dialog, w[1].toLowerCase(), u[y]);
            }
            return this;
        }, reset: function () {
            var u = this._, v = a.document.getById(u.frameId), w = v.getFrameDocument(), x = u.definition, y = u.buttons, z = this.formLoadedNumber, A = this.formUnloadNumber, B = u.dialog._.editor.lang.dir, C = u.dialog._.editor.langCode;
            if (!z) {
                z = this.formLoadedNumber = e.addFunction(function () {
                    this.fire('formLoaded');
                }, this);
                A = this.formUnloadNumber = e.addFunction(function () {
                    this.getInputElement().clearCustomData();
                }, this);
                this.getDialog()._.editor.on('destroy', function () {
                    e.removeFunction(z);
                    e.removeFunction(A);
                });
            }
            function D() {
                w.$.open();
                if (b.isCustomDomain())w.$.domain = document.domain;
                var E = '';
                if (x.size)E = x.size - (c ? 7 : 0);
                w.$.write(['<html dir="' + B + '" lang="' + C + '"><head><title></title></head><body style="margin: 0; overflow: hidden; background: transparent;">', '<form enctype="multipart/form-data" method="POST" dir="' + B + '" lang="' + C + '" action="', e.htmlEncode(x.action), '">', '<input type="file" name="', e.htmlEncode(x.id || 'cke_upload'), '" size="', e.htmlEncode(E > 0 ? E : ''), '" />', '</form>', '</body></html>', '<script>window.parent.CKEDITOR.tools.callFunction(' + z + ');', 'window.onbeforeunload = function() {window.parent.CKEDITOR.tools.callFunction(' + A + ')}</script>'].join(''));
                w.$.close();
                for (var F = 0; F < y.length; F++)y[F].enable();
            };
            if (b.gecko)setTimeout(D, 500); else D();
        }, getValue: function () {
            return this.getInputElement().$.value || '';
        }, setInitValue: function () {
            this._.initValue = '';
        }, eventProcessors: {onChange: function (u, v) {
            if (!this._.domOnChangeRegistered) {
                this.on('formLoaded', function () {
                    this.getInputElement().on('change', function () {
                        this.fire('change', {value: this.getValue()});
                    }, this);
                }, this);
                this._.domOnChangeRegistered = true;
            }
            this.on('change', v);
        }}, keyboardFocusable: true}, true);
        k.dialog.fileButton.prototype = new k.dialog.button();
        k.dialog.fieldset.prototype = e.clone(k.dialog.hbox.prototype);
        a.dialog.addUIElement('text', n);
        a.dialog.addUIElement('password', n);
        a.dialog.addUIElement('textarea', o);
        a.dialog.addUIElement('checkbox', o);
        a.dialog.addUIElement('radio', o);
        a.dialog.addUIElement('button', o);
        a.dialog.addUIElement('select', o);
        a.dialog.addUIElement('file', o);
        a.dialog.addUIElement('fileButton', o);
        a.dialog.addUIElement('html', o);
        a.dialog.addUIElement('fieldset', p);
    })();
    j.add('panel', {beforeInit: function (m) {
        m.ui.addHandler('panel', k.panel.handler);
    }});
    a.UI_PANEL = 'panel';
    k.panel = function (m, n) {
        var o = this;
        if (n)e.extend(o, n);
        e.extend(o, {className: '', css: []});
        o.id = e.getNextId();
        o.document = m;
        o._ = {blocks: {}};
    };
    k.panel.handler = {create: function (m) {
        return new k.panel(m);
    }};
    k.panel.prototype = {renderHtml: function (m) {
        var n = [];
        this.render(m, n);
        return n.join('');
    }, render: function (m, n) {
        var p = this;
        var o = p.id;
        n.push('<div class="', m.skinClass, '" lang="', m.langCode, '" role="presentation" style="display:none;z-index:' + (m.config.baseFloatZIndex + 1) + '">' + '<div' + ' id=', o, ' dir=', m.lang.dir, ' role="presentation" class="cke_panel cke_', m.lang.dir);
        if (p.className)n.push(' ', p.className);
        n.push('">');
        if (p.forceIFrame || p.css.length) {
            n.push('<iframe id="', o, '_frame" frameborder="0" role="application" src="javascript:void(');
            n.push(b.isCustomDomain() ? "(function(){document.open();document.domain='" + document.domain + "';" + 'document.close();' + '})()' : '0');
            n.push(')"></iframe>');
        }
        n.push('</div></div>');
        return o;
    }, getHolderElement: function () {
        var m = this._.holder;
        if (!m) {
            if (this.forceIFrame || this.css.length) {
                var n = this.document.getById(this.id + '_frame'), o = n.getParent(), p = o.getAttribute('dir'), q = o.getParent().getAttribute('class'), r = o.getParent().getAttribute('lang'), s = n.getFrameDocument();
                b.iOS && o.setStyles({overflow: 'scroll', '-webkit-overflow-scrolling': 'touch'});
                var t = e.addFunction(e.bind(function (w) {
                    this.isLoaded = true;
                    if (this.onLoad)this.onLoad();
                }, this)), u = '<!DOCTYPE html><html dir="' + p + '" class="' + q + '_container" lang="' + r + '">' + '<head>' + '<style>.' + q + '_container{visibility:hidden}</style>' + '</head>' + '<body class="cke_' + p + ' cke_panel_frame ' + b.cssClass + '" style="margin:0;padding:0"' + ' onload="( window.CKEDITOR || window.parent.CKEDITOR ).tools.callFunction(' + t + ');"></body>' + e.buildStyleHtml(this.css) + '</html>';
                s.write(u);
                var v = s.getWindow();
                v.$.CKEDITOR = a;
                s.on('key' + (b.opera ? 'press' : 'down'), function (w) {
                    var z = this;
                    var x = w.data.getKeystroke(), y = z.document.getById(z.id).getAttribute('dir');
                    if (z._.onKeyDown && z._.onKeyDown(x) === false) {
                        w.data.preventDefault();
                        return;
                    }
                    if (x == 27 || x == (y == 'rtl' ? 39 : 37))if (z.onEscape && z.onEscape(x) === false)w.data.preventDefault();
                }, this);
                m = s.getBody();
                m.unselectable();
                b.air && e.callFunction(t);
            } else m = this.document.getById(this.id);
            this._.holder = m;
        }
        return m;
    }, addBlock: function (m, n) {
        var o = this;
        n = o._.blocks[m] = n instanceof k.panel.block ? n : new k.panel.block(o.getHolderElement(), n);
        if (!o._.currentBlock)o.showBlock(m);
        return n;
    }, getBlock: function (m) {
        return this._.blocks[m];
    }, showBlock: function (m) {
        var r = this;
        var n = r._.blocks, o = n[m], p = r._.currentBlock, q = r.forceIFrame ? r.document.getById(r.id + '_frame') : r._.holder;
        q.getParent().getParent().disableContextMenu();
        if (p) {
            q.removeAttributes(p.attributes);
            p.hide();
        }
        r._.currentBlock = o;
        q.setAttributes(o.attributes);
        a.fire('ariaWidget', q);
        o._.focusIndex = -1;
        r._.onKeyDown = o.onKeyDown && e.bind(o.onKeyDown, o);
        o.show();
        return o;
    }, destroy: function () {
        this.element && this.element.remove();
    }};
    k.panel.block = e.createClass({$: function (m, n) {
        var o = this;
        o.element = m.append(m.getDocument().createElement('div', {attributes: {tabIndex: -1, 'class': 'cke_panel_block', role: 'presentation'}, styles: {display: 'none'}}));
        if (n)e.extend(o, n);
        if (!o.attributes.title)o.attributes.title = o.attributes['aria-label'];
        o.keys = {};
        o._.focusIndex = -1;
        o.element.disableContextMenu();
    }, _: {markItem: function (m) {
        var p = this;
        if (m == -1)return;
        var n = p.element.getElementsByTag('a'), o = n.getItem(p._.focusIndex = m);
        if (b.webkit || b.opera)o.getDocument().getWindow().focus();
        o.focus();
        p.onMark && p.onMark(o);
    }}, proto: {show: function () {
        this.element.setStyle('display', '');
    }, hide: function () {
        var m = this;
        if (!m.onHide || m.onHide.call(m) !== true)m.element.setStyle('display', 'none');
    }, onKeyDown: function (m) {
        var r = this;
        var n = r.keys[m];
        switch (n) {
            case 'next':
                var o = r._.focusIndex, p = r.element.getElementsByTag('a'), q;
                while (q = p.getItem(++o)) {
                    if (q.getAttribute('_cke_focus') && q.$.offsetWidth) {
                        r._.focusIndex = o;
                        q.focus();
                        break;
                    }
                }
                return false;
            case 'prev':
                o = r._.focusIndex;
                p = r.element.getElementsByTag('a');
                while (o > 0 && (q = p.getItem(--o))) {
                    if (q.getAttribute('_cke_focus') && q.$.offsetWidth) {
                        r._.focusIndex = o;
                        q.focus();
                        break;
                    }
                }
                return false;
            case 'click':
            case 'mouseup':
                o = r._.focusIndex;
                q = o >= 0 && r.element.getElementsByTag('a').getItem(o);
                if (q)q.$[n] ? q.$[n]() : q.$['on' + n]();
                return false;
        }
        return true;
    }}});
    j.add('listblock', {requires: ['panel'], onLoad: function () {
        k.panel.prototype.addListBlock = function (m, n) {
            return this.addBlock(m, new k.listBlock(this.getHolderElement(), n));
        };
        k.listBlock = e.createClass({base: k.panel.block, $: function (m, n) {
            var q = this;
            n = n || {};
            var o = n.attributes || (n.attributes = {});
            (q.multiSelect = !!n.multiSelect) && (o['aria-multiselectable'] = true);
            !o.role && (o.role = 'listbox');
            q.base.apply(q, arguments);
            var p = q.keys;
            p[40] = 'next';
            p[9] = 'next';
            p[38] = 'prev';
            p[2228224 + 9] = 'prev';
            p[32] = c ? 'mouseup' : 'click';
            c && (p[13] = 'mouseup');
            q._.pendingHtml = [];
            q._.items = {};
            q._.groups = {};
        }, _: {close: function () {
            if (this._.started) {
                this._.pendingHtml.push('</ul>');
                delete this._.started;
            }
        }, getClick: function () {
            if (!this._.click)this._.click = e.addFunction(function (m) {
                var o = this;
                var n = true;
                if (o.multiSelect)n = o.toggle(m); else o.mark(m);
                if (o.onClick)o.onClick(m, n);
            }, this);
            return this._.click;
        }}, proto: {add: function (m, n, o) {
            var r = this;
            var p = r._.pendingHtml, q = e.getNextId();
            if (!r._.started) {
                p.push('<ul role="presentation" class=cke_panel_list>');
                r._.started = 1;
                r._.size = r._.size || 0;
            }
            r._.items[m] = q;
            p.push('<li id=', q, ' class=cke_panel_listItem role=presentation><a id="', q, '_option" _cke_focus=1 hidefocus=true title="', o || m, '" href="javascript:void(\'', m, "')\" " + (c ? 'onclick="return false;" onmouseup' : 'onclick') + '="CKEDITOR.tools.callFunction(', r._.getClick(), ",'", m, "'); return false;\"", ' role="option" aria-posinset="' + ++r._.size + '">', n || m, '</a></li>');
        }, startGroup: function (m) {
            this._.close();
            var n = e.getNextId();
            this._.groups[m] = n;
            this._.pendingHtml.push('<h1 role="presentation" id=', n, ' class=cke_panel_grouptitle>', m, '</h1>');
        }, commit: function () {
            var p = this;
            p._.close();
            p.element.appendHtml(p._.pendingHtml.join(''));
            var m = p._.items, n = p.element.getDocument();
            for (var o in m)n.getById(m[o] + '_option').setAttribute('aria-setsize', p._.size);
            delete p._.size;
            p._.pendingHtml = [];
        }, toggle: function (m) {
            var n = this.isMarked(m);
            if (n)this.unmark(m); else this.mark(m);
            return!n;
        }, hideGroup: function (m) {
            var n = this.element.getDocument().getById(this._.groups[m]), o = n && n.getNext();
            if (n) {
                n.setStyle('display', 'none');
                if (o && o.getName() == 'ul')o.setStyle('display', 'none');
            }
        }, hideItem: function (m) {
            this.element.getDocument().getById(this._.items[m]).setStyle('display', 'none');
        }, showAll: function () {
            var m = this._.items, n = this._.groups, o = this.element.getDocument();
            for (var p in m)o.getById(m[p]).setStyle('display', '');
            for (var q in n) {
                var r = o.getById(n[q]), s = r.getNext();
                r.setStyle('display', '');
                if (s && s.getName() == 'ul')s.setStyle('display', '');
            }
        }, mark: function (m) {
            var p = this;
            if (!p.multiSelect)p.unmarkAll();
            var n = p._.items[m], o = p.element.getDocument().getById(n);
            o.addClass('cke_selected');
            p.element.getDocument().getById(n + '_option').setAttribute('aria-selected', true);
            p.onMark && p.onMark(o);
        }, unmark: function (m) {
            var q = this;
            var n = q.element.getDocument(), o = q._.items[m], p = n.getById(o);
            p.removeClass('cke_selected');
            n.getById(o + '_option').removeAttribute('aria-selected');
            q.onUnmark && q.onUnmark(p);
        }, unmarkAll: function () {
            var q = this;
            var m = q._.items, n = q.element.getDocument();
            for (var o in m) {
                var p = m[o];
                n.getById(p).removeClass('cke_selected');
                n.getById(p + '_option').removeAttribute('aria-selected');
            }
            q.onUnmark && q.onUnmark();
        }, isMarked: function (m) {
            return this.element.getDocument().getById(this._.items[m]).hasClass('cke_selected');
        }, focus: function (m) {
            this._.focusIndex = -1;
            if (m) {
                var n = this.element.getDocument().getById(this._.items[m]).getFirst(), o = this.element.getElementsByTag('a'), p, q = -1;
                while (p = o.getItem(++q)) {
                    if (p.equals(n)) {
                        this._.focusIndex = q;
                        break;
                    }
                }
                setTimeout(function () {
                    n.focus();
                }, 0);
            }
        }}});
    }});
    a.themes.add('default', (function () {
        var m = {};

        function n(o, p) {
            var q, r;
            r = o.config.sharedSpaces;
            r = r && r[p];
            r = r && a.document.getById(r);
            if (r) {
                var s = '<span class="cke_shared " dir="' + o.lang.dir + '"' + '>' + '<span class="' + o.skinClass + ' ' + o.id + ' cke_editor_' + o.name + '">' + '<span class="' + b.cssClass + '">' + '<span class="cke_wrapper cke_' + o.lang.dir + '">' + '<span class="cke_editor">' + '<div class="cke_' + p + '">' + '</div></span></span></span></span></span>', t = r.append(h.createFromHtml(s, r.getDocument()));
                if (r.getCustomData('cke_hasshared'))t.hide(); else r.setCustomData('cke_hasshared', 1);
                q = t.getChild([0, 0, 0, 0]);
                !o.sharedSpaces && (o.sharedSpaces = {});
                o.sharedSpaces[p] = q;
                o.on('focus', function () {
                    for (var u = 0, v, w = r.getChildren(); v = w.getItem(u); u++) {
                        if (v.type == 1 && !v.equals(t) && v.hasClass('cke_shared'))v.hide();
                    }
                    t.show();
                });
                o.on('destroy', function () {
                    t.remove();
                });
            }
            return q;
        };
        return{build: function (o, p) {
            var q = o.name, r = o.element, s = o.elementMode;
            if (!r || s == 0)return;
            if (s == 1)r.hide();
            var t = o.fire('themeSpace', {space: 'top', html: ''}).html, u = o.fire('themeSpace', {space: 'contents', html: ''}).html, v = o.fireOnce('themeSpace', {space: 'bottom', html: ''}).html, w = u && o.config.height, x = o.config.tabIndex || o.element.getAttribute('tabindex') || 0;
            if (!u)w = 'auto'; else if (!isNaN(w))w += 'px';
            var y = '', z = o.config.width;
            if (z) {
                if (!isNaN(z))z += 'px';
                y += 'width: ' + z + ';';
            }
            var A = t && n(o, 'top'), B = n(o, 'bottom');
            A && (A.setHtml(t), t = '');
            B && (B.setHtml(v), v = '');
            var C = '<style>.' + o.skinClass + '{visibility:hidden;}</style>';
            if (m[o.skinClass])C = ''; else m[o.skinClass] = 1;
            var D = h.createFromHtml(['<span id="cke_', q, '" class="', o.skinClass, ' ', o.id, ' cke_editor_', q, '" dir="', o.lang.dir, '" title="', b.gecko ? ' ' : '', '" lang="', o.langCode, '"' + (b.webkit ? ' tabindex="' + x + '"' : '') + ' role="application"' + ' aria-labelledby="cke_', q, '_arialbl"' + (y ? ' style="' + y + '"' : '') + '>' + '<span id="cke_', q, '_arialbl" class="cke_voice_label">' + o.lang.editor + '</span>' + '<span class="', b.cssClass, '" role="presentation"><span class="cke_wrapper cke_', o.lang.dir, '" role="presentation"><table class="cke_editor" border="0" cellspacing="0" cellpadding="0" role="presentation"><tbody><tr', t ? '' : ' style="display:none"', ' role="presentation"><td id="cke_top_', q, '" class="cke_top" role="presentation">', t, '</td></tr><tr', u ? '' : ' style="display:none"', ' role="presentation"><td id="cke_contents_', q, '" class="cke_contents" style="height:', w, '" role="presentation">', u, '</td></tr><tr', v ? '' : ' style="display:none"', ' role="presentation"><td id="cke_bottom_', q, '" class="cke_bottom" role="presentation">', v, '</td></tr></tbody></table>' + C + '</span>' + '</span>' + '</span>'].join(''));
            D.getChild([1, 0, 0, 0, 0]).unselectable();
            D.getChild([1, 0, 0, 0, 2]).unselectable();
            if (s == 1)D.insertAfter(r); else r.append(D);
            o.container = D;
            D.disableContextMenu();
            o.on('contentDirChanged', function (E) {
                var F = (o.lang.dir != E.data ? 'add' : 'remove') + 'Class';
                D.getChild(1)[F]('cke_mixed_dir_content');
                var G = this.sharedSpaces && this.sharedSpaces[this.config.toolbarLocation];
                G && G.getParent().getParent()[F]('cke_mixed_dir_content');
            });
            o.fireOnce('themeLoaded');
            o.fireOnce('uiReady');
        }, buildDialog: function (o) {
            var p = e.getNextNumber(), q = h.createFromHtml(['<div class="', o.id, '_dialog cke_editor_', o.name.replace('.', '\\.'), '_dialog cke_skin_', o.skinName, '" dir="', o.lang.dir, '" lang="', o.langCode, '" role="dialog" aria-labelledby="%title#"><table class="cke_dialog', ' ' + b.cssClass, ' cke_', o.lang.dir, '" style="position:absolute" role="presentation"><tr><td role="presentation"><div class="%body" role="presentation"><div id="%title#" class="%title" role="presentation"></div><a id="%close_button#" class="%close_button" href="javascript:void(0)" title="' + o.lang.common.close + '" role="button"><span class="cke_label">X</span></a>' + '<div id="%tabs#" class="%tabs" role="tablist"></div>' + '<table class="%contents" role="presentation">' + '<tr>' + '<td id="%contents#" class="%contents" role="presentation"></td>' + '</tr>' + '<tr>' + '<td id="%footer#" class="%footer" role="presentation"></td>' + '</tr>' + '</table>' + '</div>' + '<div id="%tl#" class="%tl"></div>' + '<div id="%tc#" class="%tc"></div>' + '<div id="%tr#" class="%tr"></div>' + '<div id="%ml#" class="%ml"></div>' + '<div id="%mr#" class="%mr"></div>' + '<div id="%bl#" class="%bl"></div>' + '<div id="%bc#" class="%bc"></div>' + '<div id="%br#" class="%br"></div>' + '</td></tr>' + '</table>', c ? '' : '<style>.cke_dialog{visibility:hidden;}</style>', '</div>'].join('').replace(/#/g, '_' + p).replace(/%/g, 'cke_dialog_')), r = q.getChild([0, 0, 0, 0, 0]), s = r.getChild(0), t = r.getChild(1);
            if (c && !b.ie6Compat) {
                var u = b.isCustomDomain(), v = 'javascript:void(function(){' + encodeURIComponent('document.open();' + (u ? 'document.domain="' + document.domain + '";' : '') + 'document.close();') + '}())', w = h.createFromHtml('<iframe frameBorder="0" class="cke_iframe_shim" src="' + v + '"' + ' tabIndex="-1"' + '></iframe>');
                w.appendTo(r.getParent());
            }
            s.unselectable();
            t.unselectable();
            return{element: q, parts: {dialog: q.getChild(0), title: s, close: t, tabs: r.getChild(2), contents: r.getChild([3, 0, 0, 0]), footer: r.getChild([3, 0, 1, 0])}};
        }, destroy: function (o) {
            var p = o.container, q = o.element;
            if (p) {
                p.clearCustomData();
                p.remove();
            }
            if (q) {
                q.clearCustomData();
                o.elementMode == 1 && q.show();
                delete o.element;
            }
        }};
    })());
    a.editor.prototype.getThemeSpace = function (m) {
        var n = 'cke_' + m, o = this._[n] || (this._[n] = a.document.getById(n + '_' + this.name));
        return o;
    };
    a.editor.prototype.resize = function (m, n, o, p) {
        var v = this;
        var q = v.container, r = a.document.getById('cke_contents_' + v.name), s = b.webkit && v.document && v.document.getWindow().$.frameElement, t = p ? q.getChild(1) : q;
        t.setSize('width', m, true);
        s && (s.style.width = '1%');
        var u = o ? 0 : (t.$.offsetHeight || 0) - (r.$.clientHeight || 0);
        r.setStyle('height', Math.max(n - u, 0) + 'px');
        s && (s.style.width = '100%');
        v.fire('resize');
    };
    a.editor.prototype.getResizable = function (m) {
        return m ? a.document.getById('cke_contents_' + this.name) : this.container;
    };
})();
