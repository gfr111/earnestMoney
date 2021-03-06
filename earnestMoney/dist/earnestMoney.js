// { "framework": "Vue"} 

/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*global Vue*/

/* weex initialized here, please do not move this line */
var _require = __webpack_require__(1),
    router = _require.router;

var App = __webpack_require__(19);
/* eslint-disable no-new */
new Vue(Vue.util.extend({ el: '#root', router: router }, App));
router.push('/');

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.router = undefined;

var _vueRouter = __webpack_require__(2);

var _vueRouter2 = _interopRequireDefault(_vueRouter);

var _main = __webpack_require__(3);

var _main2 = _interopRequireDefault(_main);

var _deposit = __webpack_require__(7);

var _deposit2 = _interopRequireDefault(_deposit);

var _depositDetail = __webpack_require__(11);

var _depositDetail2 = _interopRequireDefault(_depositDetail);

var _edit = __webpack_require__(15);

var _edit2 = _interopRequireDefault(_edit);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

Vue.use(_vueRouter2.default); /*global Vue*/
var router = exports.router = new _vueRouter2.default({
  routes: [{
    path: '/',
    name: 'main',
    component: _main2.default
  }, {
    path: '/deposit/:id',
    name: 'deposit',
    component: _deposit2.default
  }, {
    path: '/depositDetail/:id',
    name: 'depositDetail',
    component: _depositDetail2.default
  }, {
    path: '/edit',
    name: 'edit',
    component: _edit2.default
  }]
});

/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/*!
  * vue-router v3.1.1
  * (c) 2019 Evan You
  * @license MIT
  */
/*  */

function assert (condition, message) {
  if (!condition) {
    throw new Error(("[vue-router] " + message))
  }
}

function warn (condition, message) {
  if ("development" !== 'production' && !condition) {
    typeof console !== 'undefined' && console.warn(("[vue-router] " + message));
  }
}

function isError (err) {
  return Object.prototype.toString.call(err).indexOf('Error') > -1
}

function isExtendedError (constructor, err) {
  return (
    err instanceof constructor ||
    // _name is to support IE9 too
    (err && (err.name === constructor.name || err._name === constructor._name))
  )
}

function extend (a, b) {
  for (var key in b) {
    a[key] = b[key];
  }
  return a
}

var View = {
  name: 'RouterView',
  functional: true,
  props: {
    name: {
      type: String,
      default: 'default'
    }
  },
  render: function render (_, ref) {
    var props = ref.props;
    var children = ref.children;
    var parent = ref.parent;
    var data = ref.data;

    // used by devtools to display a router-view badge
    data.routerView = true;

    // directly use parent context's createElement() function
    // so that components rendered by router-view can resolve named slots
    var h = parent.$createElement;
    var name = props.name;
    var route = parent.$route;
    var cache = parent._routerViewCache || (parent._routerViewCache = {});

    // determine current view depth, also check to see if the tree
    // has been toggled inactive but kept-alive.
    var depth = 0;
    var inactive = false;
    while (parent && parent._routerRoot !== parent) {
      var vnodeData = parent.$vnode && parent.$vnode.data;
      if (vnodeData) {
        if (vnodeData.routerView) {
          depth++;
        }
        if (vnodeData.keepAlive && parent._inactive) {
          inactive = true;
        }
      }
      parent = parent.$parent;
    }
    data.routerViewDepth = depth;

    // render previous view if the tree is inactive and kept-alive
    if (inactive) {
      return h(cache[name], data, children)
    }

    var matched = route.matched[depth];
    // render empty node if no matched route
    if (!matched) {
      cache[name] = null;
      return h()
    }

    var component = cache[name] = matched.components[name];

    // attach instance registration hook
    // this will be called in the instance's injected lifecycle hooks
    data.registerRouteInstance = function (vm, val) {
      // val could be undefined for unregistration
      var current = matched.instances[name];
      if (
        (val && current !== vm) ||
        (!val && current === vm)
      ) {
        matched.instances[name] = val;
      }
    }

    // also register instance in prepatch hook
    // in case the same component instance is reused across different routes
    ;(data.hook || (data.hook = {})).prepatch = function (_, vnode) {
      matched.instances[name] = vnode.componentInstance;
    };

    // register instance in init hook
    // in case kept-alive component be actived when routes changed
    data.hook.init = function (vnode) {
      if (vnode.data.keepAlive &&
        vnode.componentInstance &&
        vnode.componentInstance !== matched.instances[name]
      ) {
        matched.instances[name] = vnode.componentInstance;
      }
    };

    // resolve props
    var propsToPass = data.props = resolveProps(route, matched.props && matched.props[name]);
    if (propsToPass) {
      // clone to prevent mutation
      propsToPass = data.props = extend({}, propsToPass);
      // pass non-declared props as attrs
      var attrs = data.attrs = data.attrs || {};
      for (var key in propsToPass) {
        if (!component.props || !(key in component.props)) {
          attrs[key] = propsToPass[key];
          delete propsToPass[key];
        }
      }
    }

    return h(component, data, children)
  }
}

function resolveProps (route, config) {
  switch (typeof config) {
    case 'undefined':
      return
    case 'object':
      return config
    case 'function':
      return config(route)
    case 'boolean':
      return config ? route.params : undefined
    default:
      if (true) {
        warn(
          false,
          "props in \"" + (route.path) + "\" is a " + (typeof config) + ", " +
          "expecting an object, function or boolean."
        );
      }
  }
}

/*  */

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function (c) { return '%' + c.charCodeAt(0).toString(16); };
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function (str) { return encodeURIComponent(str)
  .replace(encodeReserveRE, encodeReserveReplacer)
  .replace(commaRE, ','); };

var decode = decodeURIComponent;

function resolveQuery (
  query,
  extraQuery,
  _parseQuery
) {
  if ( extraQuery === void 0 ) extraQuery = {};

  var parse = _parseQuery || parseQuery;
  var parsedQuery;
  try {
    parsedQuery = parse(query || '');
  } catch (e) {
    "development" !== 'production' && warn(false, e.message);
    parsedQuery = {};
  }
  for (var key in extraQuery) {
    parsedQuery[key] = extraQuery[key];
  }
  return parsedQuery
}

function parseQuery (query) {
  var res = {};

  query = query.trim().replace(/^(\?|#|&)/, '');

  if (!query) {
    return res
  }

  query.split('&').forEach(function (param) {
    var parts = param.replace(/\+/g, ' ').split('=');
    var key = decode(parts.shift());
    var val = parts.length > 0
      ? decode(parts.join('='))
      : null;

    if (res[key] === undefined) {
      res[key] = val;
    } else if (Array.isArray(res[key])) {
      res[key].push(val);
    } else {
      res[key] = [res[key], val];
    }
  });

  return res
}

function stringifyQuery (obj) {
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return ''
    }

    if (val === null) {
      return encode(key)
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return
        }
        if (val2 === null) {
          result.push(encode(key));
        } else {
          result.push(encode(key) + '=' + encode(val2));
        }
      });
      return result.join('&')
    }

    return encode(key) + '=' + encode(val)
  }).filter(function (x) { return x.length > 0; }).join('&') : null;
  return res ? ("?" + res) : ''
}

/*  */

var trailingSlashRE = /\/?$/;

function createRoute (
  record,
  location,
  redirectedFrom,
  router
) {
  var stringifyQuery$$1 = router && router.options.stringifyQuery;

  var query = location.query || {};
  try {
    query = clone(query);
  } catch (e) {}

  var route = {
    name: location.name || (record && record.name),
    meta: (record && record.meta) || {},
    path: location.path || '/',
    hash: location.hash || '',
    query: query,
    params: location.params || {},
    fullPath: getFullPath(location, stringifyQuery$$1),
    matched: record ? formatMatch(record) : []
  };
  if (redirectedFrom) {
    route.redirectedFrom = getFullPath(redirectedFrom, stringifyQuery$$1);
  }
  return Object.freeze(route)
}

function clone (value) {
  if (Array.isArray(value)) {
    return value.map(clone)
  } else if (value && typeof value === 'object') {
    var res = {};
    for (var key in value) {
      res[key] = clone(value[key]);
    }
    return res
  } else {
    return value
  }
}

// the starting route that represents the initial state
var START = createRoute(null, {
  path: '/'
});

function formatMatch (record) {
  var res = [];
  while (record) {
    res.unshift(record);
    record = record.parent;
  }
  return res
}

function getFullPath (
  ref,
  _stringifyQuery
) {
  var path = ref.path;
  var query = ref.query; if ( query === void 0 ) query = {};
  var hash = ref.hash; if ( hash === void 0 ) hash = '';

  var stringify = _stringifyQuery || stringifyQuery;
  return (path || '/') + stringify(query) + hash
}

function isSameRoute (a, b) {
  if (b === START) {
    return a === b
  } else if (!b) {
    return false
  } else if (a.path && b.path) {
    return (
      a.path.replace(trailingSlashRE, '') === b.path.replace(trailingSlashRE, '') &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query)
    )
  } else if (a.name && b.name) {
    return (
      a.name === b.name &&
      a.hash === b.hash &&
      isObjectEqual(a.query, b.query) &&
      isObjectEqual(a.params, b.params)
    )
  } else {
    return false
  }
}

function isObjectEqual (a, b) {
  if ( a === void 0 ) a = {};
  if ( b === void 0 ) b = {};

  // handle null value #1566
  if (!a || !b) { return a === b }
  var aKeys = Object.keys(a);
  var bKeys = Object.keys(b);
  if (aKeys.length !== bKeys.length) {
    return false
  }
  return aKeys.every(function (key) {
    var aVal = a[key];
    var bVal = b[key];
    // check nested equality
    if (typeof aVal === 'object' && typeof bVal === 'object') {
      return isObjectEqual(aVal, bVal)
    }
    return String(aVal) === String(bVal)
  })
}

function isIncludedRoute (current, target) {
  return (
    current.path.replace(trailingSlashRE, '/').indexOf(
      target.path.replace(trailingSlashRE, '/')
    ) === 0 &&
    (!target.hash || current.hash === target.hash) &&
    queryIncludes(current.query, target.query)
  )
}

function queryIncludes (current, target) {
  for (var key in target) {
    if (!(key in current)) {
      return false
    }
  }
  return true
}

/*  */

function resolvePath (
  relative,
  base,
  append
) {
  var firstChar = relative.charAt(0);
  if (firstChar === '/') {
    return relative
  }

  if (firstChar === '?' || firstChar === '#') {
    return base + relative
  }

  var stack = base.split('/');

  // remove trailing segment if:
  // - not appending
  // - appending to trailing slash (last segment is empty)
  if (!append || !stack[stack.length - 1]) {
    stack.pop();
  }

  // resolve relative path
  var segments = relative.replace(/^\//, '').split('/');
  for (var i = 0; i < segments.length; i++) {
    var segment = segments[i];
    if (segment === '..') {
      stack.pop();
    } else if (segment !== '.') {
      stack.push(segment);
    }
  }

  // ensure leading slash
  if (stack[0] !== '') {
    stack.unshift('');
  }

  return stack.join('/')
}

function parsePath (path) {
  var hash = '';
  var query = '';

  var hashIndex = path.indexOf('#');
  if (hashIndex >= 0) {
    hash = path.slice(hashIndex);
    path = path.slice(0, hashIndex);
  }

  var queryIndex = path.indexOf('?');
  if (queryIndex >= 0) {
    query = path.slice(queryIndex + 1);
    path = path.slice(0, queryIndex);
  }

  return {
    path: path,
    query: query,
    hash: hash
  }
}

function cleanPath (path) {
  return path.replace(/\/\//g, '/')
}

var isarray = Array.isArray || function (arr) {
  return Object.prototype.toString.call(arr) == '[object Array]';
};

/**
 * Expose `pathToRegexp`.
 */
var pathToRegexp_1 = pathToRegexp;
var parse_1 = parse;
var compile_1 = compile;
var tokensToFunction_1 = tokensToFunction;
var tokensToRegExp_1 = tokensToRegExp;

/**
 * The main path matching regexp utility.
 *
 * @type {RegExp}
 */
var PATH_REGEXP = new RegExp([
  // Match escaped characters that would otherwise appear in future matches.
  // This allows the user to escape special characters that won't transform.
  '(\\\\.)',
  // Match Express-style parameters and un-named parameters with a prefix
  // and optional suffixes. Matches appear as:
  //
  // "/:test(\\d+)?" => ["/", "test", "\d+", undefined, "?", undefined]
  // "/route(\\d+)"  => [undefined, undefined, undefined, "\d+", undefined, undefined]
  // "/*"            => ["/", undefined, undefined, undefined, undefined, "*"]
  '([\\/.])?(?:(?:\\:(\\w+)(?:\\(((?:\\\\.|[^\\\\()])+)\\))?|\\(((?:\\\\.|[^\\\\()])+)\\))([+*?])?|(\\*))'
].join('|'), 'g');

/**
 * Parse a string for the raw tokens.
 *
 * @param  {string}  str
 * @param  {Object=} options
 * @return {!Array}
 */
function parse (str, options) {
  var tokens = [];
  var key = 0;
  var index = 0;
  var path = '';
  var defaultDelimiter = options && options.delimiter || '/';
  var res;

  while ((res = PATH_REGEXP.exec(str)) != null) {
    var m = res[0];
    var escaped = res[1];
    var offset = res.index;
    path += str.slice(index, offset);
    index = offset + m.length;

    // Ignore already escaped sequences.
    if (escaped) {
      path += escaped[1];
      continue
    }

    var next = str[index];
    var prefix = res[2];
    var name = res[3];
    var capture = res[4];
    var group = res[5];
    var modifier = res[6];
    var asterisk = res[7];

    // Push the current path onto the tokens.
    if (path) {
      tokens.push(path);
      path = '';
    }

    var partial = prefix != null && next != null && next !== prefix;
    var repeat = modifier === '+' || modifier === '*';
    var optional = modifier === '?' || modifier === '*';
    var delimiter = res[2] || defaultDelimiter;
    var pattern = capture || group;

    tokens.push({
      name: name || key++,
      prefix: prefix || '',
      delimiter: delimiter,
      optional: optional,
      repeat: repeat,
      partial: partial,
      asterisk: !!asterisk,
      pattern: pattern ? escapeGroup(pattern) : (asterisk ? '.*' : '[^' + escapeString(delimiter) + ']+?')
    });
  }

  // Match any characters still remaining.
  if (index < str.length) {
    path += str.substr(index);
  }

  // If the path exists, push it onto the end.
  if (path) {
    tokens.push(path);
  }

  return tokens
}

/**
 * Compile a string to a template function for the path.
 *
 * @param  {string}             str
 * @param  {Object=}            options
 * @return {!function(Object=, Object=)}
 */
function compile (str, options) {
  return tokensToFunction(parse(str, options))
}

/**
 * Prettier encoding of URI path segments.
 *
 * @param  {string}
 * @return {string}
 */
function encodeURIComponentPretty (str) {
  return encodeURI(str).replace(/[\/?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Encode the asterisk parameter. Similar to `pretty`, but allows slashes.
 *
 * @param  {string}
 * @return {string}
 */
function encodeAsterisk (str) {
  return encodeURI(str).replace(/[?#]/g, function (c) {
    return '%' + c.charCodeAt(0).toString(16).toUpperCase()
  })
}

/**
 * Expose a method for transforming tokens into the path function.
 */
function tokensToFunction (tokens) {
  // Compile all the tokens into regexps.
  var matches = new Array(tokens.length);

  // Compile all the patterns before compilation.
  for (var i = 0; i < tokens.length; i++) {
    if (typeof tokens[i] === 'object') {
      matches[i] = new RegExp('^(?:' + tokens[i].pattern + ')$');
    }
  }

  return function (obj, opts) {
    var path = '';
    var data = obj || {};
    var options = opts || {};
    var encode = options.pretty ? encodeURIComponentPretty : encodeURIComponent;

    for (var i = 0; i < tokens.length; i++) {
      var token = tokens[i];

      if (typeof token === 'string') {
        path += token;

        continue
      }

      var value = data[token.name];
      var segment;

      if (value == null) {
        if (token.optional) {
          // Prepend partial segment prefixes.
          if (token.partial) {
            path += token.prefix;
          }

          continue
        } else {
          throw new TypeError('Expected "' + token.name + '" to be defined')
        }
      }

      if (isarray(value)) {
        if (!token.repeat) {
          throw new TypeError('Expected "' + token.name + '" to not repeat, but received `' + JSON.stringify(value) + '`')
        }

        if (value.length === 0) {
          if (token.optional) {
            continue
          } else {
            throw new TypeError('Expected "' + token.name + '" to not be empty')
          }
        }

        for (var j = 0; j < value.length; j++) {
          segment = encode(value[j]);

          if (!matches[i].test(segment)) {
            throw new TypeError('Expected all "' + token.name + '" to match "' + token.pattern + '", but received `' + JSON.stringify(segment) + '`')
          }

          path += (j === 0 ? token.prefix : token.delimiter) + segment;
        }

        continue
      }

      segment = token.asterisk ? encodeAsterisk(value) : encode(value);

      if (!matches[i].test(segment)) {
        throw new TypeError('Expected "' + token.name + '" to match "' + token.pattern + '", but received "' + segment + '"')
      }

      path += token.prefix + segment;
    }

    return path
  }
}

/**
 * Escape a regular expression string.
 *
 * @param  {string} str
 * @return {string}
 */
function escapeString (str) {
  return str.replace(/([.+*?=^!:${}()[\]|\/\\])/g, '\\$1')
}

/**
 * Escape the capturing group by escaping special characters and meaning.
 *
 * @param  {string} group
 * @return {string}
 */
function escapeGroup (group) {
  return group.replace(/([=!:$\/()])/g, '\\$1')
}

/**
 * Attach the keys as a property of the regexp.
 *
 * @param  {!RegExp} re
 * @param  {Array}   keys
 * @return {!RegExp}
 */
function attachKeys (re, keys) {
  re.keys = keys;
  return re
}

/**
 * Get the flags for a regexp from the options.
 *
 * @param  {Object} options
 * @return {string}
 */
function flags (options) {
  return options.sensitive ? '' : 'i'
}

/**
 * Pull out keys from a regexp.
 *
 * @param  {!RegExp} path
 * @param  {!Array}  keys
 * @return {!RegExp}
 */
function regexpToRegexp (path, keys) {
  // Use a negative lookahead to match only capturing groups.
  var groups = path.source.match(/\((?!\?)/g);

  if (groups) {
    for (var i = 0; i < groups.length; i++) {
      keys.push({
        name: i,
        prefix: null,
        delimiter: null,
        optional: false,
        repeat: false,
        partial: false,
        asterisk: false,
        pattern: null
      });
    }
  }

  return attachKeys(path, keys)
}

/**
 * Transform an array into a regexp.
 *
 * @param  {!Array}  path
 * @param  {Array}   keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function arrayToRegexp (path, keys, options) {
  var parts = [];

  for (var i = 0; i < path.length; i++) {
    parts.push(pathToRegexp(path[i], keys, options).source);
  }

  var regexp = new RegExp('(?:' + parts.join('|') + ')', flags(options));

  return attachKeys(regexp, keys)
}

/**
 * Create a path regexp from string input.
 *
 * @param  {string}  path
 * @param  {!Array}  keys
 * @param  {!Object} options
 * @return {!RegExp}
 */
function stringToRegexp (path, keys, options) {
  return tokensToRegExp(parse(path, options), keys, options)
}

/**
 * Expose a function for taking tokens and returning a RegExp.
 *
 * @param  {!Array}          tokens
 * @param  {(Array|Object)=} keys
 * @param  {Object=}         options
 * @return {!RegExp}
 */
function tokensToRegExp (tokens, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  var strict = options.strict;
  var end = options.end !== false;
  var route = '';

  // Iterate over the tokens and create our regexp string.
  for (var i = 0; i < tokens.length; i++) {
    var token = tokens[i];

    if (typeof token === 'string') {
      route += escapeString(token);
    } else {
      var prefix = escapeString(token.prefix);
      var capture = '(?:' + token.pattern + ')';

      keys.push(token);

      if (token.repeat) {
        capture += '(?:' + prefix + capture + ')*';
      }

      if (token.optional) {
        if (!token.partial) {
          capture = '(?:' + prefix + '(' + capture + '))?';
        } else {
          capture = prefix + '(' + capture + ')?';
        }
      } else {
        capture = prefix + '(' + capture + ')';
      }

      route += capture;
    }
  }

  var delimiter = escapeString(options.delimiter || '/');
  var endsWithDelimiter = route.slice(-delimiter.length) === delimiter;

  // In non-strict mode we allow a slash at the end of match. If the path to
  // match already ends with a slash, we remove it for consistency. The slash
  // is valid at the end of a path match, not in the middle. This is important
  // in non-ending mode, where "/test/" shouldn't match "/test//route".
  if (!strict) {
    route = (endsWithDelimiter ? route.slice(0, -delimiter.length) : route) + '(?:' + delimiter + '(?=$))?';
  }

  if (end) {
    route += '$';
  } else {
    // In non-ending mode, we need the capturing groups to match as much as
    // possible by using a positive lookahead to the end or next path segment.
    route += strict && endsWithDelimiter ? '' : '(?=' + delimiter + '|$)';
  }

  return attachKeys(new RegExp('^' + route, flags(options)), keys)
}

/**
 * Normalize the given path string, returning a regular expression.
 *
 * An empty array can be passed in for the keys, which will hold the
 * placeholder key descriptions. For example, using `/user/:id`, `keys` will
 * contain `[{ name: 'id', delimiter: '/', optional: false, repeat: false }]`.
 *
 * @param  {(string|RegExp|Array)} path
 * @param  {(Array|Object)=}       keys
 * @param  {Object=}               options
 * @return {!RegExp}
 */
function pathToRegexp (path, keys, options) {
  if (!isarray(keys)) {
    options = /** @type {!Object} */ (keys || options);
    keys = [];
  }

  options = options || {};

  if (path instanceof RegExp) {
    return regexpToRegexp(path, /** @type {!Array} */ (keys))
  }

  if (isarray(path)) {
    return arrayToRegexp(/** @type {!Array} */ (path), /** @type {!Array} */ (keys), options)
  }

  return stringToRegexp(/** @type {string} */ (path), /** @type {!Array} */ (keys), options)
}
pathToRegexp_1.parse = parse_1;
pathToRegexp_1.compile = compile_1;
pathToRegexp_1.tokensToFunction = tokensToFunction_1;
pathToRegexp_1.tokensToRegExp = tokensToRegExp_1;

/*  */

// $flow-disable-line
var regexpCompileCache = Object.create(null);

function fillParams (
  path,
  params,
  routeMsg
) {
  params = params || {};
  try {
    var filler =
      regexpCompileCache[path] ||
      (regexpCompileCache[path] = pathToRegexp_1.compile(path));

    // Fix #2505 resolving asterisk routes { name: 'not-found', params: { pathMatch: '/not-found' }}
    if (params.pathMatch) { params[0] = params.pathMatch; }

    return filler(params, { pretty: true })
  } catch (e) {
    if (true) {
      warn(false, ("missing param for " + routeMsg + ": " + (e.message)));
    }
    return ''
  } finally {
    // delete the 0 if it was added
    delete params[0];
  }
}

/*  */

function normalizeLocation (
  raw,
  current,
  append,
  router
) {
  var next = typeof raw === 'string' ? { path: raw } : raw;
  // named target
  if (next._normalized) {
    return next
  } else if (next.name) {
    return extend({}, raw)
  }

  // relative params
  if (!next.path && next.params && current) {
    next = extend({}, next);
    next._normalized = true;
    var params = extend(extend({}, current.params), next.params);
    if (current.name) {
      next.name = current.name;
      next.params = params;
    } else if (current.matched.length) {
      var rawPath = current.matched[current.matched.length - 1].path;
      next.path = fillParams(rawPath, params, ("path " + (current.path)));
    } else if (true) {
      warn(false, "relative params navigation requires a current route.");
    }
    return next
  }

  var parsedPath = parsePath(next.path || '');
  var basePath = (current && current.path) || '/';
  var path = parsedPath.path
    ? resolvePath(parsedPath.path, basePath, append || next.append)
    : basePath;

  var query = resolveQuery(
    parsedPath.query,
    next.query,
    router && router.options.parseQuery
  );

  var hash = next.hash || parsedPath.hash;
  if (hash && hash.charAt(0) !== '#') {
    hash = "#" + hash;
  }

  return {
    _normalized: true,
    path: path,
    query: query,
    hash: hash
  }
}

/*  */

// work around weird flow bug
var toTypes = [String, Object];
var eventTypes = [String, Array];

var noop = function () {};

var Link = {
  name: 'RouterLink',
  props: {
    to: {
      type: toTypes,
      required: true
    },
    tag: {
      type: String,
      default: 'a'
    },
    exact: Boolean,
    append: Boolean,
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    event: {
      type: eventTypes,
      default: 'click'
    }
  },
  render: function render (h) {
    var this$1 = this;

    var router = this.$router;
    var current = this.$route;
    var ref = router.resolve(
      this.to,
      current,
      this.append
    );
    var location = ref.location;
    var route = ref.route;
    var href = ref.href;

    var classes = {};
    var globalActiveClass = router.options.linkActiveClass;
    var globalExactActiveClass = router.options.linkExactActiveClass;
    // Support global empty active class
    var activeClassFallback =
      globalActiveClass == null ? 'router-link-active' : globalActiveClass;
    var exactActiveClassFallback =
      globalExactActiveClass == null
        ? 'router-link-exact-active'
        : globalExactActiveClass;
    var activeClass =
      this.activeClass == null ? activeClassFallback : this.activeClass;
    var exactActiveClass =
      this.exactActiveClass == null
        ? exactActiveClassFallback
        : this.exactActiveClass;

    var compareTarget = route.redirectedFrom
      ? createRoute(null, normalizeLocation(route.redirectedFrom), null, router)
      : route;

    classes[exactActiveClass] = isSameRoute(current, compareTarget);
    classes[activeClass] = this.exact
      ? classes[exactActiveClass]
      : isIncludedRoute(current, compareTarget);

    var handler = function (e) {
      if (guardEvent(e)) {
        if (this$1.replace) {
          router.replace(location, null, noop);
        } else {
          router.push(location, null, noop);
        }
      }
    };

    var on = { click: guardEvent };
    if (Array.isArray(this.event)) {
      this.event.forEach(function (e) {
        on[e] = handler;
      });
    } else {
      on[this.event] = handler;
    }

    var data = { class: classes };

    var scopedSlot =
      !this.$scopedSlots.$hasNormal &&
      this.$scopedSlots.default &&
      this.$scopedSlots.default({
        href: href,
        route: route,
        navigate: handler,
        isActive: classes[activeClass],
        isExactActive: classes[exactActiveClass]
      });

    if (scopedSlot) {
      if (scopedSlot.length === 1) {
        return scopedSlot[0]
      } else if (scopedSlot.length > 1 || !scopedSlot.length) {
        if (true) {
          warn(
            false,
            ("RouterLink with to=\"" + (this.props.to) + "\" is trying to use a scoped slot but it didn't provide exactly one child.")
          );
        }
        return scopedSlot.length === 0 ? h() : h('span', {}, scopedSlot)
      }
    }

    if (this.tag === 'a') {
      data.on = on;
      data.attrs = { href: href };
    } else {
      // find the first <a> child and apply listener and href
      var a = findAnchor(this.$slots.default);
      if (a) {
        // in case the <a> is a static node
        a.isStatic = false;
        var aData = (a.data = extend({}, a.data));
        aData.on = on;
        var aAttrs = (a.data.attrs = extend({}, a.data.attrs));
        aAttrs.href = href;
      } else {
        // doesn't have <a> child, apply listener to self
        data.on = on;
      }
    }

    return h(this.tag, data, this.$slots.default)
  }
}

function guardEvent (e) {
  // don't redirect with control keys
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey) { return }
  // don't redirect when preventDefault called
  if (e.defaultPrevented) { return }
  // don't redirect on right click
  if (e.button !== undefined && e.button !== 0) { return }
  // don't redirect if `target="_blank"`
  if (e.currentTarget && e.currentTarget.getAttribute) {
    var target = e.currentTarget.getAttribute('target');
    if (/\b_blank\b/i.test(target)) { return }
  }
  // this may be a Weex event which doesn't have this method
  if (e.preventDefault) {
    e.preventDefault();
  }
  return true
}

function findAnchor (children) {
  if (children) {
    var child;
    for (var i = 0; i < children.length; i++) {
      child = children[i];
      if (child.tag === 'a') {
        return child
      }
      if (child.children && (child = findAnchor(child.children))) {
        return child
      }
    }
  }
}

var _Vue;

function install (Vue) {
  if (install.installed && _Vue === Vue) { return }
  install.installed = true;

  _Vue = Vue;

  var isDef = function (v) { return v !== undefined; };

  var registerInstance = function (vm, callVal) {
    var i = vm.$options._parentVnode;
    if (isDef(i) && isDef(i = i.data) && isDef(i = i.registerRouteInstance)) {
      i(vm, callVal);
    }
  };

  Vue.mixin({
    beforeCreate: function beforeCreate () {
      if (isDef(this.$options.router)) {
        this._routerRoot = this;
        this._router = this.$options.router;
        this._router.init(this);
        Vue.util.defineReactive(this, '_route', this._router.history.current);
      } else {
        this._routerRoot = (this.$parent && this.$parent._routerRoot) || this;
      }
      registerInstance(this, this);
    },
    destroyed: function destroyed () {
      registerInstance(this);
    }
  });

  Object.defineProperty(Vue.prototype, '$router', {
    get: function get () { return this._routerRoot._router }
  });

  Object.defineProperty(Vue.prototype, '$route', {
    get: function get () { return this._routerRoot._route }
  });

  Vue.component('RouterView', View);
  Vue.component('RouterLink', Link);

  var strats = Vue.config.optionMergeStrategies;
  // use the same hook merging strategy for route hooks
  strats.beforeRouteEnter = strats.beforeRouteLeave = strats.beforeRouteUpdate = strats.created;
}

/*  */

var inBrowser = typeof window !== 'undefined';

/*  */

function createRouteMap (
  routes,
  oldPathList,
  oldPathMap,
  oldNameMap
) {
  // the path list is used to control path matching priority
  var pathList = oldPathList || [];
  // $flow-disable-line
  var pathMap = oldPathMap || Object.create(null);
  // $flow-disable-line
  var nameMap = oldNameMap || Object.create(null);

  routes.forEach(function (route) {
    addRouteRecord(pathList, pathMap, nameMap, route);
  });

  // ensure wildcard routes are always at the end
  for (var i = 0, l = pathList.length; i < l; i++) {
    if (pathList[i] === '*') {
      pathList.push(pathList.splice(i, 1)[0]);
      l--;
      i--;
    }
  }

  return {
    pathList: pathList,
    pathMap: pathMap,
    nameMap: nameMap
  }
}

function addRouteRecord (
  pathList,
  pathMap,
  nameMap,
  route,
  parent,
  matchAs
) {
  var path = route.path;
  var name = route.name;
  if (true) {
    assert(path != null, "\"path\" is required in a route configuration.");
    assert(
      typeof route.component !== 'string',
      "route config \"component\" for path: " + (String(
        path || name
      )) + " cannot be a " + "string id. Use an actual component instead."
    );
  }

  var pathToRegexpOptions =
    route.pathToRegexpOptions || {};
  var normalizedPath = normalizePath(path, parent, pathToRegexpOptions.strict);

  if (typeof route.caseSensitive === 'boolean') {
    pathToRegexpOptions.sensitive = route.caseSensitive;
  }

  var record = {
    path: normalizedPath,
    regex: compileRouteRegex(normalizedPath, pathToRegexpOptions),
    components: route.components || { default: route.component },
    instances: {},
    name: name,
    parent: parent,
    matchAs: matchAs,
    redirect: route.redirect,
    beforeEnter: route.beforeEnter,
    meta: route.meta || {},
    props:
      route.props == null
        ? {}
        : route.components
          ? route.props
          : { default: route.props }
  };

  if (route.children) {
    // Warn if route is named, does not redirect and has a default child route.
    // If users navigate to this route by name, the default child will
    // not be rendered (GH Issue #629)
    if (true) {
      if (
        route.name &&
        !route.redirect &&
        route.children.some(function (child) { return /^\/?$/.test(child.path); })
      ) {
        warn(
          false,
          "Named Route '" + (route.name) + "' has a default child route. " +
            "When navigating to this named route (:to=\"{name: '" + (route.name) + "'\"), " +
            "the default child route will not be rendered. Remove the name from " +
            "this route and use the name of the default child route for named " +
            "links instead."
        );
      }
    }
    route.children.forEach(function (child) {
      var childMatchAs = matchAs
        ? cleanPath((matchAs + "/" + (child.path)))
        : undefined;
      addRouteRecord(pathList, pathMap, nameMap, child, record, childMatchAs);
    });
  }

  if (!pathMap[record.path]) {
    pathList.push(record.path);
    pathMap[record.path] = record;
  }

  if (route.alias !== undefined) {
    var aliases = Array.isArray(route.alias) ? route.alias : [route.alias];
    for (var i = 0; i < aliases.length; ++i) {
      var alias = aliases[i];
      if ("development" !== 'production' && alias === path) {
        warn(
          false,
          ("Found an alias with the same value as the path: \"" + path + "\". You have to remove that alias. It will be ignored in development.")
        );
        // skip in dev to make it work
        continue
      }

      var aliasRoute = {
        path: alias,
        children: route.children
      };
      addRouteRecord(
        pathList,
        pathMap,
        nameMap,
        aliasRoute,
        parent,
        record.path || '/' // matchAs
      );
    }
  }

  if (name) {
    if (!nameMap[name]) {
      nameMap[name] = record;
    } else if ("development" !== 'production' && !matchAs) {
      warn(
        false,
        "Duplicate named routes definition: " +
          "{ name: \"" + name + "\", path: \"" + (record.path) + "\" }"
      );
    }
  }
}

function compileRouteRegex (
  path,
  pathToRegexpOptions
) {
  var regex = pathToRegexp_1(path, [], pathToRegexpOptions);
  if (true) {
    var keys = Object.create(null);
    regex.keys.forEach(function (key) {
      warn(
        !keys[key.name],
        ("Duplicate param keys in route with path: \"" + path + "\"")
      );
      keys[key.name] = true;
    });
  }
  return regex
}

function normalizePath (
  path,
  parent,
  strict
) {
  if (!strict) { path = path.replace(/\/$/, ''); }
  if (path[0] === '/') { return path }
  if (parent == null) { return path }
  return cleanPath(((parent.path) + "/" + path))
}

/*  */



function createMatcher (
  routes,
  router
) {
  var ref = createRouteMap(routes);
  var pathList = ref.pathList;
  var pathMap = ref.pathMap;
  var nameMap = ref.nameMap;

  function addRoutes (routes) {
    createRouteMap(routes, pathList, pathMap, nameMap);
  }

  function match (
    raw,
    currentRoute,
    redirectedFrom
  ) {
    var location = normalizeLocation(raw, currentRoute, false, router);
    var name = location.name;

    if (name) {
      var record = nameMap[name];
      if (true) {
        warn(record, ("Route with name '" + name + "' does not exist"));
      }
      if (!record) { return _createRoute(null, location) }
      var paramNames = record.regex.keys
        .filter(function (key) { return !key.optional; })
        .map(function (key) { return key.name; });

      if (typeof location.params !== 'object') {
        location.params = {};
      }

      if (currentRoute && typeof currentRoute.params === 'object') {
        for (var key in currentRoute.params) {
          if (!(key in location.params) && paramNames.indexOf(key) > -1) {
            location.params[key] = currentRoute.params[key];
          }
        }
      }

      location.path = fillParams(record.path, location.params, ("named route \"" + name + "\""));
      return _createRoute(record, location, redirectedFrom)
    } else if (location.path) {
      location.params = {};
      for (var i = 0; i < pathList.length; i++) {
        var path = pathList[i];
        var record$1 = pathMap[path];
        if (matchRoute(record$1.regex, location.path, location.params)) {
          return _createRoute(record$1, location, redirectedFrom)
        }
      }
    }
    // no match
    return _createRoute(null, location)
  }

  function redirect (
    record,
    location
  ) {
    var originalRedirect = record.redirect;
    var redirect = typeof originalRedirect === 'function'
      ? originalRedirect(createRoute(record, location, null, router))
      : originalRedirect;

    if (typeof redirect === 'string') {
      redirect = { path: redirect };
    }

    if (!redirect || typeof redirect !== 'object') {
      if (true) {
        warn(
          false, ("invalid redirect option: " + (JSON.stringify(redirect)))
        );
      }
      return _createRoute(null, location)
    }

    var re = redirect;
    var name = re.name;
    var path = re.path;
    var query = location.query;
    var hash = location.hash;
    var params = location.params;
    query = re.hasOwnProperty('query') ? re.query : query;
    hash = re.hasOwnProperty('hash') ? re.hash : hash;
    params = re.hasOwnProperty('params') ? re.params : params;

    if (name) {
      // resolved named direct
      var targetRecord = nameMap[name];
      if (true) {
        assert(targetRecord, ("redirect failed: named route \"" + name + "\" not found."));
      }
      return match({
        _normalized: true,
        name: name,
        query: query,
        hash: hash,
        params: params
      }, undefined, location)
    } else if (path) {
      // 1. resolve relative redirect
      var rawPath = resolveRecordPath(path, record);
      // 2. resolve params
      var resolvedPath = fillParams(rawPath, params, ("redirect route with path \"" + rawPath + "\""));
      // 3. rematch with existing query and hash
      return match({
        _normalized: true,
        path: resolvedPath,
        query: query,
        hash: hash
      }, undefined, location)
    } else {
      if (true) {
        warn(false, ("invalid redirect option: " + (JSON.stringify(redirect))));
      }
      return _createRoute(null, location)
    }
  }

  function alias (
    record,
    location,
    matchAs
  ) {
    var aliasedPath = fillParams(matchAs, location.params, ("aliased route with path \"" + matchAs + "\""));
    var aliasedMatch = match({
      _normalized: true,
      path: aliasedPath
    });
    if (aliasedMatch) {
      var matched = aliasedMatch.matched;
      var aliasedRecord = matched[matched.length - 1];
      location.params = aliasedMatch.params;
      return _createRoute(aliasedRecord, location)
    }
    return _createRoute(null, location)
  }

  function _createRoute (
    record,
    location,
    redirectedFrom
  ) {
    if (record && record.redirect) {
      return redirect(record, redirectedFrom || location)
    }
    if (record && record.matchAs) {
      return alias(record, location, record.matchAs)
    }
    return createRoute(record, location, redirectedFrom, router)
  }

  return {
    match: match,
    addRoutes: addRoutes
  }
}

function matchRoute (
  regex,
  path,
  params
) {
  var m = path.match(regex);

  if (!m) {
    return false
  } else if (!params) {
    return true
  }

  for (var i = 1, len = m.length; i < len; ++i) {
    var key = regex.keys[i - 1];
    var val = typeof m[i] === 'string' ? decodeURIComponent(m[i]) : m[i];
    if (key) {
      // Fix #1994: using * with props: true generates a param named 0
      params[key.name || 'pathMatch'] = val;
    }
  }

  return true
}

function resolveRecordPath (path, record) {
  return resolvePath(path, record.parent ? record.parent.path : '/', true)
}

/*  */

var positionStore = Object.create(null);

function setupScroll () {
  // Fix for #1585 for Firefox
  // Fix for #2195 Add optional third attribute to workaround a bug in safari https://bugs.webkit.org/show_bug.cgi?id=182678
  // Fix for #2774 Support for apps loaded from Windows file shares not mapped to network drives: replaced location.origin with
  // window.location.protocol + '//' + window.location.host
  // location.host contains the port and location.hostname doesn't
  var protocolAndPath = window.location.protocol + '//' + window.location.host;
  var absolutePath = window.location.href.replace(protocolAndPath, '');
  window.history.replaceState({ key: getStateKey() }, '', absolutePath);
  window.addEventListener('popstate', function (e) {
    saveScrollPosition();
    if (e.state && e.state.key) {
      setStateKey(e.state.key);
    }
  });
}

function handleScroll (
  router,
  to,
  from,
  isPop
) {
  if (!router.app) {
    return
  }

  var behavior = router.options.scrollBehavior;
  if (!behavior) {
    return
  }

  if (true) {
    assert(typeof behavior === 'function', "scrollBehavior must be a function");
  }

  // wait until re-render finishes before scrolling
  router.app.$nextTick(function () {
    var position = getScrollPosition();
    var shouldScroll = behavior.call(
      router,
      to,
      from,
      isPop ? position : null
    );

    if (!shouldScroll) {
      return
    }

    if (typeof shouldScroll.then === 'function') {
      shouldScroll
        .then(function (shouldScroll) {
          scrollToPosition((shouldScroll), position);
        })
        .catch(function (err) {
          if (true) {
            assert(false, err.toString());
          }
        });
    } else {
      scrollToPosition(shouldScroll, position);
    }
  });
}

function saveScrollPosition () {
  var key = getStateKey();
  if (key) {
    positionStore[key] = {
      x: window.pageXOffset,
      y: window.pageYOffset
    };
  }
}

function getScrollPosition () {
  var key = getStateKey();
  if (key) {
    return positionStore[key]
  }
}

function getElementPosition (el, offset) {
  var docEl = document.documentElement;
  var docRect = docEl.getBoundingClientRect();
  var elRect = el.getBoundingClientRect();
  return {
    x: elRect.left - docRect.left - offset.x,
    y: elRect.top - docRect.top - offset.y
  }
}

function isValidPosition (obj) {
  return isNumber(obj.x) || isNumber(obj.y)
}

function normalizePosition (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : window.pageXOffset,
    y: isNumber(obj.y) ? obj.y : window.pageYOffset
  }
}

function normalizeOffset (obj) {
  return {
    x: isNumber(obj.x) ? obj.x : 0,
    y: isNumber(obj.y) ? obj.y : 0
  }
}

function isNumber (v) {
  return typeof v === 'number'
}

var hashStartsWithNumberRE = /^#\d/;

function scrollToPosition (shouldScroll, position) {
  var isObject = typeof shouldScroll === 'object';
  if (isObject && typeof shouldScroll.selector === 'string') {
    // getElementById would still fail if the selector contains a more complicated query like #main[data-attr]
    // but at the same time, it doesn't make much sense to select an element with an id and an extra selector
    var el = hashStartsWithNumberRE.test(shouldScroll.selector) // $flow-disable-line
      ? document.getElementById(shouldScroll.selector.slice(1)) // $flow-disable-line
      : document.querySelector(shouldScroll.selector);

    if (el) {
      var offset =
        shouldScroll.offset && typeof shouldScroll.offset === 'object'
          ? shouldScroll.offset
          : {};
      offset = normalizeOffset(offset);
      position = getElementPosition(el, offset);
    } else if (isValidPosition(shouldScroll)) {
      position = normalizePosition(shouldScroll);
    }
  } else if (isObject && isValidPosition(shouldScroll)) {
    position = normalizePosition(shouldScroll);
  }

  if (position) {
    window.scrollTo(position.x, position.y);
  }
}

/*  */

var supportsPushState = inBrowser && (function () {
  var ua = window.navigator.userAgent;

  if (
    (ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) &&
    ua.indexOf('Mobile Safari') !== -1 &&
    ua.indexOf('Chrome') === -1 &&
    ua.indexOf('Windows Phone') === -1
  ) {
    return false
  }

  return window.history && 'pushState' in window.history
})();

// use User Timing api (if present) for more accurate key precision
var Time = inBrowser && window.performance && window.performance.now
  ? window.performance
  : Date;

var _key = genKey();

function genKey () {
  return Time.now().toFixed(3)
}

function getStateKey () {
  return _key
}

function setStateKey (key) {
  _key = key;
}

function pushState (url, replace) {
  saveScrollPosition();
  // try...catch the pushState call to get around Safari
  // DOM Exception 18 where it limits to 100 pushState calls
  var history = window.history;
  try {
    if (replace) {
      history.replaceState({ key: _key }, '', url);
    } else {
      _key = genKey();
      history.pushState({ key: _key }, '', url);
    }
  } catch (e) {
    window.location[replace ? 'replace' : 'assign'](url);
  }
}

function replaceState (url) {
  pushState(url, true);
}

/*  */

function runQueue (queue, fn, cb) {
  var step = function (index) {
    if (index >= queue.length) {
      cb();
    } else {
      if (queue[index]) {
        fn(queue[index], function () {
          step(index + 1);
        });
      } else {
        step(index + 1);
      }
    }
  };
  step(0);
}

/*  */

function resolveAsyncComponents (matched) {
  return function (to, from, next) {
    var hasAsync = false;
    var pending = 0;
    var error = null;

    flatMapComponents(matched, function (def, _, match, key) {
      // if it's a function and doesn't have cid attached,
      // assume it's an async component resolve function.
      // we are not using Vue's default async resolving mechanism because
      // we want to halt the navigation until the incoming component has been
      // resolved.
      if (typeof def === 'function' && def.cid === undefined) {
        hasAsync = true;
        pending++;

        var resolve = once(function (resolvedDef) {
          if (isESModule(resolvedDef)) {
            resolvedDef = resolvedDef.default;
          }
          // save resolved on async factory in case it's used elsewhere
          def.resolved = typeof resolvedDef === 'function'
            ? resolvedDef
            : _Vue.extend(resolvedDef);
          match.components[key] = resolvedDef;
          pending--;
          if (pending <= 0) {
            next();
          }
        });

        var reject = once(function (reason) {
          var msg = "Failed to resolve async component " + key + ": " + reason;
          "development" !== 'production' && warn(false, msg);
          if (!error) {
            error = isError(reason)
              ? reason
              : new Error(msg);
            next(error);
          }
        });

        var res;
        try {
          res = def(resolve, reject);
        } catch (e) {
          reject(e);
        }
        if (res) {
          if (typeof res.then === 'function') {
            res.then(resolve, reject);
          } else {
            // new syntax in Vue 2.3
            var comp = res.component;
            if (comp && typeof comp.then === 'function') {
              comp.then(resolve, reject);
            }
          }
        }
      }
    });

    if (!hasAsync) { next(); }
  }
}

function flatMapComponents (
  matched,
  fn
) {
  return flatten(matched.map(function (m) {
    return Object.keys(m.components).map(function (key) { return fn(
      m.components[key],
      m.instances[key],
      m, key
    ); })
  }))
}

function flatten (arr) {
  return Array.prototype.concat.apply([], arr)
}

var hasSymbol =
  typeof Symbol === 'function' &&
  typeof Symbol.toStringTag === 'symbol';

function isESModule (obj) {
  return obj.__esModule || (hasSymbol && obj[Symbol.toStringTag] === 'Module')
}

// in Webpack 2, require.ensure now also returns a Promise
// so the resolve/reject functions may get called an extra time
// if the user uses an arrow function shorthand that happens to
// return that Promise.
function once (fn) {
  var called = false;
  return function () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    if (called) { return }
    called = true;
    return fn.apply(this, args)
  }
}

var NavigationDuplicated = /*@__PURE__*/(function (Error) {
  function NavigationDuplicated () {
    Error.call(this, 'Navigating to current location is not allowed');
    this.name = this._name = 'NavigationDuplicated';
  }

  if ( Error ) NavigationDuplicated.__proto__ = Error;
  NavigationDuplicated.prototype = Object.create( Error && Error.prototype );
  NavigationDuplicated.prototype.constructor = NavigationDuplicated;

  return NavigationDuplicated;
}(Error));

// support IE9
NavigationDuplicated._name = 'NavigationDuplicated';

/*  */

var History = function History (router, base) {
  this.router = router;
  this.base = normalizeBase(base);
  // start with a route object that stands for "nowhere"
  this.current = START;
  this.pending = null;
  this.ready = false;
  this.readyCbs = [];
  this.readyErrorCbs = [];
  this.errorCbs = [];
};

History.prototype.listen = function listen (cb) {
  this.cb = cb;
};

History.prototype.onReady = function onReady (cb, errorCb) {
  if (this.ready) {
    cb();
  } else {
    this.readyCbs.push(cb);
    if (errorCb) {
      this.readyErrorCbs.push(errorCb);
    }
  }
};

History.prototype.onError = function onError (errorCb) {
  this.errorCbs.push(errorCb);
};

History.prototype.transitionTo = function transitionTo (
  location,
  onComplete,
  onAbort
) {
    var this$1 = this;

  var route = this.router.match(location, this.current);
  this.confirmTransition(
    route,
    function () {
      this$1.updateRoute(route);
      onComplete && onComplete(route);
      this$1.ensureURL();

      // fire ready cbs once
      if (!this$1.ready) {
        this$1.ready = true;
        this$1.readyCbs.forEach(function (cb) {
          cb(route);
        });
      }
    },
    function (err) {
      if (onAbort) {
        onAbort(err);
      }
      if (err && !this$1.ready) {
        this$1.ready = true;
        this$1.readyErrorCbs.forEach(function (cb) {
          cb(err);
        });
      }
    }
  );
};

History.prototype.confirmTransition = function confirmTransition (route, onComplete, onAbort) {
    var this$1 = this;

  var current = this.current;
  var abort = function (err) {
    // after merging https://github.com/vuejs/vue-router/pull/2771 we
    // When the user navigates through history through back/forward buttons
    // we do not want to throw the error. We only throw it if directly calling
    // push/replace. That's why it's not included in isError
    if (!isExtendedError(NavigationDuplicated, err) && isError(err)) {
      if (this$1.errorCbs.length) {
        this$1.errorCbs.forEach(function (cb) {
          cb(err);
        });
      } else {
        warn(false, 'uncaught error during route navigation:');
        console.error(err);
      }
    }
    onAbort && onAbort(err);
  };
  if (
    isSameRoute(route, current) &&
    // in the case the route map has been dynamically appended to
    route.matched.length === current.matched.length
  ) {
    this.ensureURL();
    return abort(new NavigationDuplicated(route))
  }

  var ref = resolveQueue(
    this.current.matched,
    route.matched
  );
    var updated = ref.updated;
    var deactivated = ref.deactivated;
    var activated = ref.activated;

  var queue = [].concat(
    // in-component leave guards
    extractLeaveGuards(deactivated),
    // global before hooks
    this.router.beforeHooks,
    // in-component update hooks
    extractUpdateHooks(updated),
    // in-config enter guards
    activated.map(function (m) { return m.beforeEnter; }),
    // async components
    resolveAsyncComponents(activated)
  );

  this.pending = route;
  var iterator = function (hook, next) {
    if (this$1.pending !== route) {
      return abort()
    }
    try {
      hook(route, current, function (to) {
        if (to === false || isError(to)) {
          // next(false) -> abort navigation, ensure current URL
          this$1.ensureURL(true);
          abort(to);
        } else if (
          typeof to === 'string' ||
          (typeof to === 'object' &&
            (typeof to.path === 'string' || typeof to.name === 'string'))
        ) {
          // next('/') or next({ path: '/' }) -> redirect
          abort();
          if (typeof to === 'object' && to.replace) {
            this$1.replace(to);
          } else {
            this$1.push(to);
          }
        } else {
          // confirm transition and pass on the value
          next(to);
        }
      });
    } catch (e) {
      abort(e);
    }
  };

  runQueue(queue, iterator, function () {
    var postEnterCbs = [];
    var isValid = function () { return this$1.current === route; };
    // wait until async components are resolved before
    // extracting in-component enter guards
    var enterGuards = extractEnterGuards(activated, postEnterCbs, isValid);
    var queue = enterGuards.concat(this$1.router.resolveHooks);
    runQueue(queue, iterator, function () {
      if (this$1.pending !== route) {
        return abort()
      }
      this$1.pending = null;
      onComplete(route);
      if (this$1.router.app) {
        this$1.router.app.$nextTick(function () {
          postEnterCbs.forEach(function (cb) {
            cb();
          });
        });
      }
    });
  });
};

History.prototype.updateRoute = function updateRoute (route) {
  var prev = this.current;
  this.current = route;
  this.cb && this.cb(route);
  this.router.afterHooks.forEach(function (hook) {
    hook && hook(route, prev);
  });
};

function normalizeBase (base) {
  if (!base) {
    if (inBrowser) {
      // respect <base> tag
      var baseEl = document.querySelector('base');
      base = (baseEl && baseEl.getAttribute('href')) || '/';
      // strip full URL origin
      base = base.replace(/^https?:\/\/[^\/]+/, '');
    } else {
      base = '/';
    }
  }
  // make sure there's the starting slash
  if (base.charAt(0) !== '/') {
    base = '/' + base;
  }
  // remove trailing slash
  return base.replace(/\/$/, '')
}

function resolveQueue (
  current,
  next
) {
  var i;
  var max = Math.max(current.length, next.length);
  for (i = 0; i < max; i++) {
    if (current[i] !== next[i]) {
      break
    }
  }
  return {
    updated: next.slice(0, i),
    activated: next.slice(i),
    deactivated: current.slice(i)
  }
}

function extractGuards (
  records,
  name,
  bind,
  reverse
) {
  var guards = flatMapComponents(records, function (def, instance, match, key) {
    var guard = extractGuard(def, name);
    if (guard) {
      return Array.isArray(guard)
        ? guard.map(function (guard) { return bind(guard, instance, match, key); })
        : bind(guard, instance, match, key)
    }
  });
  return flatten(reverse ? guards.reverse() : guards)
}

function extractGuard (
  def,
  key
) {
  if (typeof def !== 'function') {
    // extend now so that global mixins are applied.
    def = _Vue.extend(def);
  }
  return def.options[key]
}

function extractLeaveGuards (deactivated) {
  return extractGuards(deactivated, 'beforeRouteLeave', bindGuard, true)
}

function extractUpdateHooks (updated) {
  return extractGuards(updated, 'beforeRouteUpdate', bindGuard)
}

function bindGuard (guard, instance) {
  if (instance) {
    return function boundRouteGuard () {
      return guard.apply(instance, arguments)
    }
  }
}

function extractEnterGuards (
  activated,
  cbs,
  isValid
) {
  return extractGuards(
    activated,
    'beforeRouteEnter',
    function (guard, _, match, key) {
      return bindEnterGuard(guard, match, key, cbs, isValid)
    }
  )
}

function bindEnterGuard (
  guard,
  match,
  key,
  cbs,
  isValid
) {
  return function routeEnterGuard (to, from, next) {
    return guard(to, from, function (cb) {
      if (typeof cb === 'function') {
        cbs.push(function () {
          // #750
          // if a router-view is wrapped with an out-in transition,
          // the instance may not have been registered at this time.
          // we will need to poll for registration until current route
          // is no longer valid.
          poll(cb, match.instances, key, isValid);
        });
      }
      next(cb);
    })
  }
}

function poll (
  cb, // somehow flow cannot infer this is a function
  instances,
  key,
  isValid
) {
  if (
    instances[key] &&
    !instances[key]._isBeingDestroyed // do not reuse being destroyed instance
  ) {
    cb(instances[key]);
  } else if (isValid()) {
    setTimeout(function () {
      poll(cb, instances, key, isValid);
    }, 16);
  }
}

/*  */

var HTML5History = /*@__PURE__*/(function (History$$1) {
  function HTML5History (router, base) {
    var this$1 = this;

    History$$1.call(this, router, base);

    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    var initLocation = getLocation(this.base);
    window.addEventListener('popstate', function (e) {
      var current = this$1.current;

      // Avoiding first `popstate` event dispatched in some browsers but first
      // history route not updated since async guard at the same time.
      var location = getLocation(this$1.base);
      if (this$1.current === START && location === initLocation) {
        return
      }

      this$1.transitionTo(location, function (route) {
        if (supportsScroll) {
          handleScroll(router, route, current, true);
        }
      });
    });
  }

  if ( History$$1 ) HTML5History.__proto__ = History$$1;
  HTML5History.prototype = Object.create( History$$1 && History$$1.prototype );
  HTML5History.prototype.constructor = HTML5History;

  HTML5History.prototype.go = function go (n) {
    window.history.go(n);
  };

  HTML5History.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      pushState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(location, function (route) {
      replaceState(cleanPath(this$1.base + route.fullPath));
      handleScroll(this$1.router, route, fromRoute, false);
      onComplete && onComplete(route);
    }, onAbort);
  };

  HTML5History.prototype.ensureURL = function ensureURL (push) {
    if (getLocation(this.base) !== this.current.fullPath) {
      var current = cleanPath(this.base + this.current.fullPath);
      push ? pushState(current) : replaceState(current);
    }
  };

  HTML5History.prototype.getCurrentLocation = function getCurrentLocation () {
    return getLocation(this.base)
  };

  return HTML5History;
}(History));

function getLocation (base) {
  var path = decodeURI(window.location.pathname);
  if (base && path.indexOf(base) === 0) {
    path = path.slice(base.length);
  }
  return (path || '/') + window.location.search + window.location.hash
}

/*  */

var HashHistory = /*@__PURE__*/(function (History$$1) {
  function HashHistory (router, base, fallback) {
    History$$1.call(this, router, base);
    // check history fallback deeplinking
    if (fallback && checkFallback(this.base)) {
      return
    }
    ensureSlash();
  }

  if ( History$$1 ) HashHistory.__proto__ = History$$1;
  HashHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  HashHistory.prototype.constructor = HashHistory;

  // this is delayed until the app mounts
  // to avoid the hashchange listener being fired too early
  HashHistory.prototype.setupListeners = function setupListeners () {
    var this$1 = this;

    var router = this.router;
    var expectScroll = router.options.scrollBehavior;
    var supportsScroll = supportsPushState && expectScroll;

    if (supportsScroll) {
      setupScroll();
    }

    window.addEventListener(
      supportsPushState ? 'popstate' : 'hashchange',
      function () {
        var current = this$1.current;
        if (!ensureSlash()) {
          return
        }
        this$1.transitionTo(getHash(), function (route) {
          if (supportsScroll) {
            handleScroll(this$1.router, route, current, true);
          }
          if (!supportsPushState) {
            replaceHash(route.fullPath);
          }
        });
      }
    );
  };

  HashHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        pushHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    var ref = this;
    var fromRoute = ref.current;
    this.transitionTo(
      location,
      function (route) {
        replaceHash(route.fullPath);
        handleScroll(this$1.router, route, fromRoute, false);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  HashHistory.prototype.go = function go (n) {
    window.history.go(n);
  };

  HashHistory.prototype.ensureURL = function ensureURL (push) {
    var current = this.current.fullPath;
    if (getHash() !== current) {
      push ? pushHash(current) : replaceHash(current);
    }
  };

  HashHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    return getHash()
  };

  return HashHistory;
}(History));

function checkFallback (base) {
  var location = getLocation(base);
  if (!/^\/#/.test(location)) {
    window.location.replace(cleanPath(base + '/#' + location));
    return true
  }
}

function ensureSlash () {
  var path = getHash();
  if (path.charAt(0) === '/') {
    return true
  }
  replaceHash('/' + path);
  return false
}

function getHash () {
  // We can't use window.location.hash here because it's not
  // consistent across browsers - Firefox will pre-decode it!
  var href = window.location.href;
  var index = href.indexOf('#');
  // empty path
  if (index < 0) { return '' }

  href = href.slice(index + 1);
  // decode the hash but not the search or hash
  // as search(query) is already decoded
  // https://github.com/vuejs/vue-router/issues/2708
  var searchIndex = href.indexOf('?');
  if (searchIndex < 0) {
    var hashIndex = href.indexOf('#');
    if (hashIndex > -1) {
      href = decodeURI(href.slice(0, hashIndex)) + href.slice(hashIndex);
    } else { href = decodeURI(href); }
  } else {
    if (searchIndex > -1) {
      href = decodeURI(href.slice(0, searchIndex)) + href.slice(searchIndex);
    }
  }

  return href
}

function getUrl (path) {
  var href = window.location.href;
  var hashPos = href.indexOf('#');
  var base = hashPos > -1 ? href.slice(0, hashPos) : href;

  var searchPos = base.indexOf('?');
  var query = searchPos > -1 ? base.slice(searchPos) : '';
  base = query ? base.slice(0, searchPos) : base;

  return (base + "#" + (path + query))
}

function pushHash (path) {
  if (supportsPushState) {
    pushState(getUrl(path));
  } else {
    window.location.hash = path;
  }
}

function replaceHash (path) {
  if (supportsPushState) {
    replaceState(getUrl(path));
  } else {
    window.location.replace(getUrl(path));
  }
}

/*  */

var AbstractHistory = /*@__PURE__*/(function (History$$1) {
  function AbstractHistory (router, base) {
    History$$1.call(this, router, base);
    this.stack = [];
    this.index = -1;
  }

  if ( History$$1 ) AbstractHistory.__proto__ = History$$1;
  AbstractHistory.prototype = Object.create( History$$1 && History$$1.prototype );
  AbstractHistory.prototype.constructor = AbstractHistory;

  AbstractHistory.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index + 1).concat(route);
        this$1.index++;
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

    this.transitionTo(
      location,
      function (route) {
        this$1.stack = this$1.stack.slice(0, this$1.index).concat(route);
        onComplete && onComplete(route);
      },
      onAbort
    );
  };

  AbstractHistory.prototype.go = function go (n) {
    var this$1 = this;

    var targetIndex = this.index + n;
    if (targetIndex < 0 || targetIndex >= this.stack.length) {
      return
    }
    var route = this.stack[targetIndex];
    this.confirmTransition(
      route,
      function () {
        this$1.index = targetIndex;
        this$1.updateRoute(route);
      },
      function (err) {
        if (isExtendedError(NavigationDuplicated, err)) {
          this$1.index = targetIndex;
        }
      }
    );
  };

  AbstractHistory.prototype.getCurrentLocation = function getCurrentLocation () {
    var current = this.stack[this.stack.length - 1];
    return current ? current.fullPath : '/'
  };

  AbstractHistory.prototype.ensureURL = function ensureURL () {
    // noop
  };

  return AbstractHistory;
}(History));

/*  */



var VueRouter = function VueRouter (options) {
  if ( options === void 0 ) options = {};

  this.app = null;
  this.apps = [];
  this.options = options;
  this.beforeHooks = [];
  this.resolveHooks = [];
  this.afterHooks = [];
  this.matcher = createMatcher(options.routes || [], this);

  var mode = options.mode || 'hash';
  this.fallback = mode === 'history' && !supportsPushState && options.fallback !== false;
  if (this.fallback) {
    mode = 'hash';
  }
  if (!inBrowser) {
    mode = 'abstract';
  }
  this.mode = mode;

  switch (mode) {
    case 'history':
      this.history = new HTML5History(this, options.base);
      break
    case 'hash':
      this.history = new HashHistory(this, options.base, this.fallback);
      break
    case 'abstract':
      this.history = new AbstractHistory(this, options.base);
      break
    default:
      if (true) {
        assert(false, ("invalid mode: " + mode));
      }
  }
};

var prototypeAccessors = { currentRoute: { configurable: true } };

VueRouter.prototype.match = function match (
  raw,
  current,
  redirectedFrom
) {
  return this.matcher.match(raw, current, redirectedFrom)
};

prototypeAccessors.currentRoute.get = function () {
  return this.history && this.history.current
};

VueRouter.prototype.init = function init (app /* Vue component instance */) {
    var this$1 = this;

  "development" !== 'production' && assert(
    install.installed,
    "not installed. Make sure to call `Vue.use(VueRouter)` " +
    "before creating root instance."
  );

  this.apps.push(app);

  // set up app destroyed handler
  // https://github.com/vuejs/vue-router/issues/2639
  app.$once('hook:destroyed', function () {
    // clean out app from this.apps array once destroyed
    var index = this$1.apps.indexOf(app);
    if (index > -1) { this$1.apps.splice(index, 1); }
    // ensure we still have a main app or null if no apps
    // we do not release the router so it can be reused
    if (this$1.app === app) { this$1.app = this$1.apps[0] || null; }
  });

  // main app previously initialized
  // return as we don't need to set up new history listener
  if (this.app) {
    return
  }

  this.app = app;

  var history = this.history;

  if (history instanceof HTML5History) {
    history.transitionTo(history.getCurrentLocation());
  } else if (history instanceof HashHistory) {
    var setupHashListener = function () {
      history.setupListeners();
    };
    history.transitionTo(
      history.getCurrentLocation(),
      setupHashListener,
      setupHashListener
    );
  }

  history.listen(function (route) {
    this$1.apps.forEach(function (app) {
      app._route = route;
    });
  });
};

VueRouter.prototype.beforeEach = function beforeEach (fn) {
  return registerHook(this.beforeHooks, fn)
};

VueRouter.prototype.beforeResolve = function beforeResolve (fn) {
  return registerHook(this.resolveHooks, fn)
};

VueRouter.prototype.afterEach = function afterEach (fn) {
  return registerHook(this.afterHooks, fn)
};

VueRouter.prototype.onReady = function onReady (cb, errorCb) {
  this.history.onReady(cb, errorCb);
};

VueRouter.prototype.onError = function onError (errorCb) {
  this.history.onError(errorCb);
};

VueRouter.prototype.push = function push (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.push(location, resolve, reject);
    })
  } else {
    this.history.push(location, onComplete, onAbort);
  }
};

VueRouter.prototype.replace = function replace (location, onComplete, onAbort) {
    var this$1 = this;

  // $flow-disable-line
  if (!onComplete && !onAbort && typeof Promise !== 'undefined') {
    return new Promise(function (resolve, reject) {
      this$1.history.replace(location, resolve, reject);
    })
  } else {
    this.history.replace(location, onComplete, onAbort);
  }
};

VueRouter.prototype.go = function go (n) {
  this.history.go(n);
};

VueRouter.prototype.back = function back () {
  this.go(-1);
};

VueRouter.prototype.forward = function forward () {
  this.go(1);
};

VueRouter.prototype.getMatchedComponents = function getMatchedComponents (to) {
  var route = to
    ? to.matched
      ? to
      : this.resolve(to).route
    : this.currentRoute;
  if (!route) {
    return []
  }
  return [].concat.apply([], route.matched.map(function (m) {
    return Object.keys(m.components).map(function (key) {
      return m.components[key]
    })
  }))
};

VueRouter.prototype.resolve = function resolve (
  to,
  current,
  append
) {
  current = current || this.history.current;
  var location = normalizeLocation(
    to,
    current,
    append,
    this
  );
  var route = this.match(location, current);
  var fullPath = route.redirectedFrom || route.fullPath;
  var base = this.history.base;
  var href = createHref(base, fullPath, this.mode);
  return {
    location: location,
    route: route,
    href: href,
    // for backwards compat
    normalizedTo: location,
    resolved: route
  }
};

VueRouter.prototype.addRoutes = function addRoutes (routes) {
  this.matcher.addRoutes(routes);
  if (this.history.current !== START) {
    this.history.transitionTo(this.history.getCurrentLocation());
  }
};

Object.defineProperties( VueRouter.prototype, prototypeAccessors );

function registerHook (list, fn) {
  list.push(fn);
  return function () {
    var i = list.indexOf(fn);
    if (i > -1) { list.splice(i, 1); }
  }
}

function createHref (base, fullPath, mode) {
  var path = mode === 'hash' ? '#' + fullPath : fullPath;
  return base ? cleanPath(base + '/' + path) : path
}

VueRouter.install = install;
VueRouter.version = '3.1.1';

if (inBrowser && window.Vue) {
  window.Vue.use(VueRouter);
}

/* harmony default export */ __webpack_exports__["default"] = (VueRouter);


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(4)
)

/* script */
__vue_exports__ = __webpack_require__(5)

/* template */
var __vue_template__ = __webpack_require__(6)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\办理定金\\earnestMoney\\src\\components\\main.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-cd9409ae"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 4 */
/***/ (function(module, exports) {

module.exports = {
  "supportPayBox": {
    "alignItems": "center",
    "justifyContent": "center"
  },
  "supportTxt": {
    "color": "#323232",
    "fontSize": "28",
    "marginBottom": 20
  },
  "payMethodsIcon": {
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "marginBottom": 40
  },
  "textarea": {
    "height": "200"
  },
  "headers": {
    "width": "750",
    "height": "88",
    "paddingLeft": "30",
    "paddingRight": "40",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#ffffff"
  },
  "returnImg": {
    "width": "100",
    "height": "80",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "title": {
    "fontSize": "34",
    "color": "#53575A"
  },
  "nullBox": {
    "fontSize": "34",
    "color": "#ffffff"
  },
  "beforePage": {
    "width": "48",
    "height": "48"
  },
  "addContent": {
    "borderTopColor": "#F6F6F6",
    "borderTopStyle": "solid",
    "borderTopWidth": "1"
  },
  "addContentTop": {
    "marginLeft": "20"
  },
  "addItemBox": {
    "height": "96",
    "alignItems": "center",
    "flexDirection": "row"
  },
  "leftBox": {
    "alignItems": "center",
    "flexDirection": "row"
  },
  "rightBox": {
    "alignItems": "center",
    "flexDirection": "row",
    "marginRight": "40"
  },
  "courseType": {
    "color": "#2E3D50",
    "fontSize": "30",
    "marginRight": "10"
  },
  "rightIcon": {
    "width": "32",
    "height": "32"
  },
  "warning": {
    "color": "#FB6666",
    "fontSize": "30",
    "marginRight": "12",
    "marginLeft": "10"
  },
  "leftTxt": {
    "color": "#2E3D50",
    "fontSize": "30"
  },
  "moneyInput": {
    "width": "210",
    "fontSize": "30",
    "textAlign": "right",
    "alignItems": "center",
    "paddingRight": "2",
    "height": "90",
    "textIndent": "6"
  },
  "cancel": {
    "width": "30",
    "height": "30",
    "position": "absolute",
    "top": "-1",
    "right": "-1"
  },
  "messCon": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "borderBottomColor": "#E1E1E1",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "width": "700",
    "height": "96"
  },
  "bg": {
    "backgroundColor": "rgba(0,0,0,0.6)",
    "position": "absolute",
    "left": 0,
    "top": 0,
    "width": "750"
  },
  "centerBg": {
    "alignItems": "center",
    "justifyContent": "center"
  },
  "selectBox": {
    "width": "750",
    "backgroundColor": "#ffffff",
    "position": "absolute",
    "bottom": 0
  },
  "selectHeader": {
    "paddingLeft": "20",
    "width": "730",
    "height": "100",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginBottom": "20",
    "backgroundColor": "#ffffff",
    "borderBottomColor": "#E7E7E7",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1"
  },
  "dispire": {
    "fontSize": "32",
    "color": "#828282"
  },
  "finish": {
    "fontSize": "32",
    "color": "#12C48B"
  },
  "titles": {
    "fontSize": "32",
    "color": "#2A3E49"
  },
  "lists": {
    "width": "750",
    "height": "80",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "contents": {
    "fontSize": "30",
    "color": "#CCCCD1",
    "borderBottomColor": "#E7E7E7",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1"
  },
  "select": {
    "fontSize": "34",
    "color": "#575757",
    "borderBottomColor": "#E7E7E7",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1"
  },
  "scrollers": {
    "width": "750",
    "height": "400",
    "paddingTop": "80",
    "backgroundColor": "#ffffff"
  },
  "imgBox": {
    "flexDirection": "row"
  },
  "imgAdds": {
    "marginBottom": "20",
    "alignItems": "center",
    "flexDirection": "row",
    "width": "180",
    "height": "180",
    "marginRight": "40"
  },
  "showPhoto": {
    "width": "160",
    "height": "160"
  },
  "addPhoto": {
    "width": "160",
    "height": "160"
  },
  "protocolBox": {
    "borderBottomColor": "#E7E7E7",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "paddingTop": "18",
    "paddingBottom": "48",
    "marginLeft": "40"
  },
  "protocolTitle": {
    "color": "#2E3D50",
    "fontSize": "30",
    "marginBottom": "20"
  },
  "postBox": {
    "height": "88",
    "width": "750",
    "backgroundColor": "#12C48B",
    "position": "absolute",
    "bottom": 0,
    "alignItems": "center",
    "justifyContent": "center"
  },
  "postBtn": {
    "color": "#ffffff",
    "fontSize": "30"
  },
  "noteBox": {
    "paddingTop": "28",
    "paddingLeft": "45"
  },
  "noteTitle": {
    "color": "#2E3D50",
    "fontSize": "30",
    "marginBottom": "8"
  },
  "eidtPros": {
    "width": "40",
    "height": "40"
  },
  "traineeMess": {
    "height": "180",
    "alignItems": "center",
    "flexDirection": "row"
  },
  "traineeImg": {
    "width": "140",
    "height": "140",
    "marginRight": "20",
    "marginLeft": "46"
  },
  "rightItem": {
    "marginBottom": "10",
    "color": "#464646",
    "fontSize": "28"
  },
  "messItem": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "height": "96",
    "marginLeft": "50",
    "width": "700",
    "borderTopColor": "#E1E1E1",
    "borderTopStyle": "solid",
    "borderTopWidth": "1",
    "paddingRight": "40"
  },
  "messItems": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "height": "96",
    "marginLeft": "50",
    "width": "700",
    "paddingRight": "40"
  },
  "messName": {
    "color": "#2E3D50",
    "fontSize": "30"
  },
  "messContent": {
    "color": "#2E3D50",
    "fontSize": "30"
  },
  "procotolMess": {
    "borderTopColor": "#E1E1E1",
    "borderTopStyle": "solid",
    "borderTopWidth": "1",
    "marginLeft": "50",
    "width": "700",
    "paddingTop": "20",
    "paddingBottom": "48"
  },
  "procotolTitle": {
    "color": "#2E3D50",
    "fontSize": "30",
    "marginBottom": "12"
  },
  "noteMess": {
    "borderTopColor": "#E1E1E1",
    "borderTopStyle": "solid",
    "borderTopWidth": "1",
    "marginLeft": "50",
    "width": "700",
    "paddingTop": "20"
  },
  "noteCon": {
    "color": "#2E3D50",
    "fontSize": "30"
  },
  "payMethodBox": {
    "backgroundColor": "#ffffff",
    "paddingTop": "40",
    "paddingBottom": "80",
    "position": "absolute",
    "bottom": 0,
    "opacity": 1,
    "width": "750"
  },
  "payMethodTitle": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginBottom": "60",
    "paddingRight": "40"
  },
  "codeTitle": {
    "width": "570",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginTop": "20",
    "paddingRight": "40",
    "paddingLeft": "40"
  },
  "qrCodeTop": {
    "backgroundColor": "#F5F5F5",
    "borderTopLeftRadius": "8",
    "borderTopRightRadius": "8"
  },
  "codeBox": {
    "backgroundColor": "#ffffff",
    "width": "570",
    "borderRadius": "8"
  },
  "payTitle": {
    "color": "#323232",
    "fontSize": "32",
    "marginLeft": "40"
  },
  "hidePayBtn": {
    "width": "32",
    "height": "32"
  },
  "payBox": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "paddingLeft": "40",
    "paddingRight": "40"
  },
  "methodStyle": {
    "width": "320",
    "height": "140",
    "backgroundColor": "#F6F6F6",
    "borderRadius": "16",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center"
  },
  "payIcon": {
    "width": "80",
    "height": "80"
  },
  "parRight": {
    "height": "80",
    "justifyContent": "space-between"
  },
  "payName": {
    "color": "#323232",
    "fontSize": "32"
  },
  "scanCode": {
    "color": "#ABA7AA",
    "fontSize": "26"
  },
  "qrCodeBox": {
    "width": "570",
    "height": "290",
    "marginTop": "60",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "qrCode": {
    "width": "290",
    "height": "290",
    "marginBottom": 20
  },
  "codePriceBox": {
    "flexDirection": "row",
    "justifyContent": "center",
    "alignItems": "center",
    "marginBottom": "16",
    "marginTop": "20"
  },
  "buttonBox": {
    "flexDirection": "row",
    "borderTopWidth": "1",
    "borderTopStyle": "solid",
    "borderTopColor": "#E9E9E9",
    "width": "570"
  },
  "dispireBtn": {
    "width": "286",
    "lineHeight": "100",
    "textAlign": "center",
    "color": "#A3A3A3",
    "fontSize": "32",
    "borderRightWidth": "1",
    "borderRightStyle": "solid",
    "borderRightColor": "#E9E9E9",
    "borderBottomLeftRadius": "16"
  },
  "payFinish": {
    "width": "286",
    "lineHeight": "100",
    "textAlign": "center",
    "color": "#0279FF",
    "fontSize": "32",
    "borderBottomRightRadius": "16"
  }
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var imageModule = weex.requireModule('image');
var uploadModule = weex.requireModule('transfer');
var nativeMoudle = weex.requireModule('nativeModule');
var storage = weex.requireModule("storage");
var modal = weex.requireModule("modal");
var stream = weex.requireModule('stream');
exports.default = {
    data: function data() {
        return {
            isShow: false,
            height: '',
            list: [],
            depositMess: '',
            //   webHost:'http://10.0.0.12:8080',
            webHost: 'https://www.forzadata.cn',
            traineeId: '1529520',
            photoArray: [],
            isUploading: false,
            centerId: 269,
            isFocus: '',
            token: 'eyJuYW1lIjoi5qKB5pWZ57uDIiwicGhvbmUiOiIxNTg4ODgzMDg0OCIsImFjY291bnRJZCI6NTMxNDM0LCJpbXBlcnNvbmF0ZWQiOmZhbHNlfQ==.ditfYWGgTu0/eoSa7Da/b8eKihB7qttr9qQGA10Ok/A=',
            addPhoto: "",
            rigthPhoto: '',
            clearPhoto: '',
            hasHandsels: null,
            isPay: false,
            componentVisibility: 'visible',
            showPayCode: false,
            coachAPP: true,
            depositMoney: '',
            depositDay: '',
            note: '',
            usedType: '',
            payMess: '',
            isFinish: false,
            qrCodeLink: '',
            isStudio: null
        };
    },
    created: function created() {
        var that = this;
        nativeMoudle.getMetaData(function (map) {
            that.traineeId = map.traineeId;
            that.centerId = map.centerId;
            that.token = map.token;
            that.coachAPP = map.coachAPP;
            that.isStudio = map.isStudio;
            that.height = map.isPhoneBangseries ? 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 118 : 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 50;
            if (map.allowTrainingCourse) {
                that.list = [{ title: '私教课', value: 2, checked: true }, { title: '培训课', value: 3, checked: false }, { title: '会员卡', value: 1, checked: false }];
            } else {
                that.list = [{ title: '私教课', value: 2, checked: true }, { title: '会员卡', value: 1, checked: false }];
            }
            if (map.serverUrl == '' || map.serverUrl == null || map.serverUrl == undefined) {
                that.webHost = 'https://www.forzadata.cn';
            } else {
                that.webHost = map.serverUrl;
            }
        });
        if (that.isStudio) {
            that.usedType = 1;
        }
        nativeMoudle.showProgressDialog();
        //  if(weex.config.env.platform=='iOS'){

        //  }else{
        //        that.height = 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight-50;
        //  }


        setTimeout(function () {
            that.getmess();
        }, 50);
        weex.requireModule('globalEvent').addEventListener('androidback', function (e) {
            nativeMoudle.close();
        });
    },

    methods: {
        emptyClick: function emptyClick() {},
        beforePage: function beforePage() {
            if (!this.hasHandsels) {
                this.$refs.inputText.blur();
            }
            setTimeout(function () {
                nativeMoudle.close();
            }, 50);
        },
        edit: function edit() {
            this.$router.push('edit');
        },
        sunmitChange: function sunmitChange() {
            var that = this;
            if (!that.depositMoney) {
                return nativeMoudle.toast('请输入定金金额！');
            }
            if (!that.depositDay) {
                return nativeMoudle.toast('请输入有效天数！');
            }
            nativeMoudle.showProgressDialog();
            var URL = that.webHost + '/api/weex/deposit/' + that.centerId + '/' + that.traineeId;
            var arr = JSON.stringify({
                orderSource: that.coachAPP ? '4' : '2',
                duration: that.depositDay,
                amount: that.depositMoney,
                usedType: that.usedType,
                photos: that.photoArray,
                id: that.hasHandsels ? that.depositMess.id : '',
                comment: that.note
            });
            stream.fetch({
                method: 'POST',
                url: URL,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: arr
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        nativeMoudle.toast('提交成功！');
                        setTimeout(function () {
                            that.getmess();
                        }, 500);
                    } else {
                        nativeMoudle.toast(ret.data.message);
                    }
                } else {
                    nativeMoudle.toast('网络错误！');
                }
            }, function (response) {});
        },
        getmess: function getmess() {
            var me = this;
            var GET_URL = me.webHost + '/api/weex/deposit/' + me.centerId + '/' + me.traineeId;
            stream.fetch({
                method: 'GET',
                url: GET_URL,
                type: 'json',
                headers: {
                    'X-AUTH-TOKEN': me.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        if (ret.data.data == null) {
                            me.hasHandsels = false;
                            if (me.coachAPP) {
                                if (me.isStudio) {
                                    me.usedType = 1;
                                } else {
                                    me.usedType = 2;
                                }
                            } else {
                                me.usedType = 1;
                            }
                        } else {
                            me.hasHandsels = true;
                            me.depositMess = ret.data.data;
                            me.usedType = ret.data.data.usedType;
                        }
                    } else {
                        nativeMoudle.toast(ret.data.message);
                    }
                } else {
                    nativeMoudle.toast('网络错误！');
                }
            }, function (response) {});
        },
        pickImg: function pickImg() {
            this.$refs.inputText.blur();
            var that = this;
            var length = 3 - that.photoArray.length;
            imageModule.pickImage({
                limit: length,
                showCamera: false
            }, function (ret) {
                if (ret.paths.length == 0) {
                    return;
                }
                var item = ret.paths.pop();
                that.uploadImg(item, ret.paths);
                weex.requireModule('nativeModule').toast("上传中");
            });
        },
        uploadImg: function uploadImg(item, paths) {
            var that = this;
            var URL = that.webHost + '/api/fitnessCenter/' + that.centerId + '/image';
            var requestData = {
                url: URL,
                path: item,
                method: 'POST',
                header: { 'X-AUTH-TOKEN': that.token },
                headers: { 'X-AUTH-TOKEN': that.token },
                formData: { file: item, keyword: "center-deposit" }
            };
            uploadModule.upload(JSON.stringify(requestData), function (ret) {
                if (JSON.parse(ret.data).status == 0) {
                    var a = JSON.parse(ret.data).data.url;
                    that.photoArray.push(a);
                    if (paths.length == 0) {
                        return;
                    }
                    item = paths.pop();
                    that.uploadImg(item, paths);
                } else {
                    weex.requireModule('nativeModule').toast(JSON.parse(ret.data).message);
                }
            });
        },
        selectCourseStyle: function selectCourseStyle() {
            this.isShow = !this.isShow;
            this.componentVisibility = 'hidden';
            this.$refs.inputText.blur();
            if (this.usedType == 2) {
                this.list[0].checked = true;
                this.list[1].checked = false;
                this.list[2].checked = false;
            } else if (this.usedType == 3) {
                this.list[1].checked = true;
                this.list[0].checked = false;
                this.list[2].checked = false;
            } else if (this.usedType == 1) {
                this.list[2].checked = true;
                this.list[0].checked = false;
                this.list[1].checked = false;
            }
        },
        hideList: function hideList() {
            this.isShow = !this.isShow;
            this.componentVisibility = 'visible';
        },
        getItem: function getItem() {
            var that = this;
            for (var i = 0, len = that.list.length; i < len; i++) {
                if (that.list[i].checked) {
                    that.usedType = that.list[i].value;
                }
            }
            that.isShow = !that.isShow;
            that.componentVisibility = 'visible';
        },
        chooseItem: function chooseItem(id) {
            var that = this;
            for (var i = 0, len = that.list.length; i < len; i++) {
                if (that.list[i].value == id) {
                    that.list[i].checked = true;
                } else {
                    that.list[i].checked = false;
                }
            }
        },
        oninput: function oninput(event) {
            this.note = event.value;
        },
        sumbitRecord: function sumbitRecord() {
            this.$refs.inputText.blur();
            var me = this;
            var GET_URL;
            var arr;
            GET_URL = me.webHost + '/api/saleConsultant/member/' + me.centerId + '/followup/add';
            arr = JSON.stringify({
                type: me.followId,
                dialStatus: me.phoneId,
                photos: me.photoArray,
                serviceType: me.relationId,
                content: me.content,
                traineeId: me.traineeId,
                dialReserve: false
            });
            me.sumbit(GET_URL, arr);
        },
        sumbit: function sumbit(GET_URL, arr) {
            var that = this;
            stream.fetch({
                method: 'POST',
                url: GET_URL,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: arr
            }, function (ret) {
                if (ret.data.status == 0) {
                    modal.toast({
                        'message': "添加成功",
                        'duration': 0.2
                    });
                    that.$router.push('/');
                } else {
                    modal.toast({
                        'message': "请输入内容！",
                        'duration': 1
                    });
                }
            }, function (response) {});
        },
        clearImg: function clearImg(index) {
            this.photoArray.splice(index, 1);
        },
        toPay: function toPay() {
            //    this.isPay=true;
            this.showPayCode = true;
            this.componentVisibility = 'hidden';
            nativeMoudle.showProgressDialog();
            this.pay(1);
        },
        hidePay: function hidePay() {
            //    this.isPay=false;
            this.showPayCode = false;
            this.componentVisibility = 'visible';
        },
        pay: function pay(payMethod) {
            var me = this;
            var payNum = payMethod == 1 ? '010' : '020';
            var GET_URL = me.webHost + '/api/weex/deposit/' + me.centerId + '/getPreDepositPayOrder/' + me.depositMess.id + '/' + payNum;
            stream.fetch({
                method: 'GET',
                url: GET_URL,
                type: 'json',
                headers: {
                    'X-AUTH-TOKEN': me.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        me.isPay = false;
                        me.showPayCode = true;
                        // if(payMethod=='1'){
                        // me.payStyle='微信支付';    
                        // }else{
                        // me.payStyle='支付宝支付';    
                        // }   
                        //  nativeMoudle.toast(ret.data.data.qrCodeLink);                 
                        if (ret.data.data.depositId != '' && ret.data.data.depositId != null && ret.data.data.depositId != undefined) {
                            me.$router.push({ name: 'deposit', query: { id: ret.data.data.depositId } });
                        } else {
                            me.payMess = ret.data.data;
                            me.qrCodeLink = ret.data.data.qrCodeLink.replace(/\s*/g, "");
                        }
                    } else {
                        nativeMoudle.toast(ret.data.message);
                    }
                } else {
                    nativeMoudle.toast('网络错误！');
                }
            }, function (response) {});
        },
        hidePaycode: function hidePaycode() {
            this.componentVisibility = 'visible';
            this.showPayCode = false;
        },

        //查询支付结果
        payResults: function payResults() {
            nativeMoudle.showProgressDialog();
            this.loader(0);
            //    this.$router.push({name:'deposit',query:{id:71125}});
        },
        loader: function loader(i) {
            i++;
            var that = this;
            stream.fetch({
                method: "GET",
                type: 'json',
                url: that.webHost + '/api/weex/deposit/' + that.centerId + '/order/' + that.payMess.orderId + '/status',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (!ret.ok) {
                    nativeMoudle.toast('请求失败');
                } else {
                    if (ret.data.status == 0) {
                        if (ret.data.data.paid) {
                            nativeMoudle.progressDialogDismiss();
                            setTimeout(function () {
                                //    that.$router.push({name:'deposit',query:{id:ret.data.data.depositId}});
                                that.$router.push({ name: 'depositDetail', query: { id: ret.data.data.depositId } });
                            }, 1000);
                        } else {
                            nativeMoudle.progressDialogDismiss();
                            nativeMoudle.toast('支付失败，请重新支付！');
                            that.componentVisibility = 'visible';
                            that.showPayCode = false;
                        }
                    } else {
                        if (i > 15) {
                            nativeMoudle.progressDialogDismiss();
                            nativeMoudle.toast('支付超时');
                            that.componentVisibility = 'visible';
                            that.showPayCode = false;
                            return;
                        } else {
                            setTimeout(function () {
                                that.loader(i);
                            }, 1000);
                        }
                    }
                }
            });
        }
    },
    watch: {
        '$route': function $route() {
            this.created();
        }
    }
};

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["addBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headers"]
  }, [_c('div', {
    staticClass: ["returnImg"],
    on: {
      "click": _vm.beforePage
    }
  }, [_c('image', {
    staticClass: ["beforePage"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png"
    }
  })]), _c('text', {
    staticClass: ["title"]
  }, [_vm._v("办理定金")]), (!_vm.hasHandsels) ? _c('text', {
    staticStyle: {
      fontSize: "34px",
      color: "#ffffff"
    }
  }, [_vm._v("保存")]) : _c('image', {
    staticClass: ["eidtPros"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/editPro.png"
    },
    on: {
      "click": _vm.edit
    }
  })]), (!_vm.hasHandsels) ? _c('div', {
    staticClass: ["addContent"]
  }, [_c('div', {
    staticClass: ["addContentTop"]
  }, [_c('div', {
    staticClass: ["addItemBox"],
    staticStyle: {
      borderTopWidth: "0"
    }
  }, [_c('text', {
    staticClass: ["warning"]
  }, [_vm._v("*")]), _c('div', {
    staticClass: ["messCon"]
  }, [_c('text', {
    staticClass: ["leftTxt"]
  }, [_vm._v("定金金额（元）")]), _c('div', {
    staticClass: ["rightBox"]
  }, [_c('input', {
    ref: "inputText",
    staticClass: ["moneyInput"],
    attrs: {
      "placeholder": "请输入定金金额",
      "type": "number",
      "placeholderColor": "#A3A3A3;",
      "value": (_vm.depositMoney)
    },
    on: {
      "input": function($event) {
        _vm.depositMoney = $event.target.attr.value
      }
    }
  })])])]), _c('div', {
    staticClass: ["addItemBox"]
  }, [_c('text', {
    staticClass: ["warning"]
  }, [_vm._v("*")]), _c('div', {
    staticClass: ["messCon"]
  }, [_c('text', {
    staticClass: ["leftTxt"]
  }, [_vm._v("定金类型")]), (!_vm.isStudio) ? _c('div', {
    staticClass: ["rightBox"],
    on: {
      "click": _vm.selectCourseStyle
    }
  }, [_c('text', {
    staticClass: ["courseType"]
  }, [_vm._v(_vm._s(_vm.usedType == 1 ? '会员卡' : _vm.usedType == 2 ? '私教课' : '培训课'))]), _c('image', {
    staticClass: ["rightIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/blackRight.png"
    }
  })]) : _vm._e(), (_vm.isStudio) ? _c('div', {
    staticClass: ["rightBox"]
  }, [_c('text', {
    staticClass: ["courseType"]
  }, [_vm._v("会员卡")]), _c('image', {
    staticClass: ["rightIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/blackRight.png"
    }
  })]) : _vm._e()])]), _c('div', {
    staticClass: ["addItemBox"]
  }, [_c('text', {
    staticClass: ["warning"]
  }, [_vm._v("*")]), _c('div', {
    staticClass: ["messCon"]
  }, [_c('text', {
    staticClass: ["leftTxt"]
  }, [_vm._v("有效天数（天）")]), _c('div', {
    staticClass: ["rightBox"]
  }, [_c('input', {
    ref: "inputText",
    staticClass: ["moneyInput"],
    attrs: {
      "placeholder": "请输入有效天数",
      "type": "number",
      "placeholderColor": "#A3A3A3;",
      "value": (_vm.depositDay)
    },
    on: {
      "input": function($event) {
        _vm.depositDay = $event.target.attr.value
      }
    }
  })])])]), _c('div', {
    staticClass: ["protocolBox"]
  }, [_c('text', {
    staticClass: ["protocolTitle"]
  }, [_vm._v("协议")]), _c('div', {
    staticClass: ["imgBox"]
  }, [_vm._l((_vm.photoArray), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["imgAdds"]
    }, [_c('image', {
      staticClass: ["showPhoto"],
      attrs: {
        "src": item + '?x-oss-process=image/resize,h_200'
      }
    }), _c('image', {
      staticClass: ["cancel"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/deletePro.png"
      },
      on: {
        "click": function($event) {
          _vm.clearImg(index)
        }
      }
    })])
  }), (_vm.photoArray.length < 3) ? _c('div', {
    staticClass: ["imgAdds"],
    on: {
      "click": _vm.pickImg
    }
  }, [_c('image', {
    staticClass: ["addPhoto"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/icon_plus.png"
    }
  })]) : _vm._e()], 2)]), _c('div', {
    staticClass: ["noteBox"]
  }, [_c('text', {
    staticClass: ["noteTitle"]
  }, [_vm._v("备注")]), _c('textarea', {
    ref: "inputText",
    staticClass: ["textarea"],
    attrs: {
      "placeholderColor": "#A3A3A3;",
      "placeholder": "请输入备注内容",
      "maxlength": "100",
      "value": (_vm.note)
    },
    on: {
      "input": [function($event) {
        _vm.note = $event.target.attr.value
      }, _vm.oninput]
    }
  })])])]) : _c('div', {
    staticClass: ["hasHandsel"]
  }, [_c('div', {
    staticClass: ["messItems"]
  }, [_c('text', {
    staticClass: ["messName"]
  }, [_vm._v("定金金额（元）")]), _c('text', {
    staticClass: ["messContent"]
  }, [_vm._v(_vm._s(_vm.depositMess.amount || '--') + "元")])]), _c('div', {
    staticClass: ["messItem"]
  }, [_c('text', {
    staticClass: ["messName"]
  }, [_vm._v("定金类型")]), _c('text', {
    staticClass: ["messContent"]
  }, [_vm._v(_vm._s(_vm.depositMess.usedType == 1 ? '会员卡' : _vm.depositMess.usedType == 2 ? '私教课' : '培训课'))])]), _c('div', {
    staticClass: ["messItem"]
  }, [_c('text', {
    staticClass: ["messName"]
  }, [_vm._v("有效天数（天）")]), _c('text', {
    staticClass: ["messContent"]
  }, [_vm._v(_vm._s(_vm.depositMess.duration) + "天")])]), (_vm.depositMess.photos.length != 0) ? _c('div', {
    staticClass: ["procotolMess"]
  }, [_c('text', {
    staticClass: ["procotolTitle"]
  }, [_vm._v("协议")]), _c('div', {
    staticClass: ["imgBox"]
  }, _vm._l((_vm.depositMess.photos), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["imgAdds"]
    }, [_c('image', {
      staticClass: ["showPhoto"],
      attrs: {
        "src": item
      }
    })])
  }))]) : _vm._e(), _c('div', {
    staticClass: ["noteMess"]
  }, [_c('text', {
    staticClass: ["procotolTitle"]
  }, [_vm._v("备注")]), _c('text', {
    staticClass: ["noteCon"]
  }, [_vm._v(_vm._s(_vm.depositMess.comment || '无'))])])]), (_vm.isShow) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.emptyClick
    }
  }, [_c('div', {
    staticClass: ["selectBox"]
  }, [_c('div', {
    staticClass: ["selectHeader"]
  }, [_c('text', {
    staticClass: ["dispire"],
    on: {
      "click": _vm.hideList
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["titles"]
  }, [_vm._v("定金类型")]), _c('text', {
    staticClass: ["finish"],
    on: {
      "click": _vm.getItem
    }
  }, [_vm._v("完成")])]), _c('list', {
    staticClass: ["scrollers"]
  }, [((_vm.isShow)) ? _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["lists"],
      on: {
        "click": function($event) {
          _vm.chooseItem(item.value)
        }
      }
    }, [_c('text', {
      class: [item.checked ? 'select' : 'contents']
    }, [_vm._v(_vm._s(item.title))])])
  })) : _vm._e()])])]) : _vm._e(), (_vm.isPay) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.emptyClick
    }
  }, [_c('div', {
    staticClass: ["payMethodBox"]
  }, [_c('div', {
    staticClass: ["payMethodTitle"]
  }, [_c('text', {
    staticClass: ["payTitle"],
    staticStyle: {
      fontWeight: "600"
    }
  }, [_vm._v("请选择支付方式")]), _c('image', {
    staticClass: ["hidePayBtn"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png"
    },
    on: {
      "click": _vm.hidePay
    }
  })]), _c('div', {
    staticClass: ["payMethodTitle"]
  }, [_c('text', {
    staticClass: ["payTitle"]
  }, [_vm._v("支付金额")]), _c('text', {
    staticClass: ["payTitle"],
    staticStyle: {
      color: "#FD5000"
    }
  }, [_vm._v("¥" + _vm._s(_vm.depositMess.amount))])]), _c('div', {
    staticClass: ["payBox"]
  }, [_c('div', {
    staticClass: ["methodStyle"],
    on: {
      "click": function($event) {
        _vm.pay(1)
      }
    }
  }, [_c('image', {
    staticClass: ["payIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/wechat.png"
    }
  }), _vm._m(0)]), _c('div', {
    staticClass: ["methodStyle"],
    on: {
      "click": function($event) {
        _vm.pay(2)
      }
    }
  }, [_c('image', {
    staticClass: ["payIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/alipay.png"
    }
  }), _vm._m(1)])])])]) : _vm._e(), (_vm.showPayCode) ? _c('div', {
    staticClass: ["bg", "centerBg"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.emptyClick
    }
  }, [_c('div', {
    staticClass: ["codeBox"]
  }, [_c('div', {
    staticClass: ["qrCodeTop"]
  }, [_c('div', {
    staticClass: ["codeTitle"]
  }, [_c('text', {
    staticStyle: {
      width: "32px",
      color: "F5F5F5"
    }
  }, [_vm._v("12")]), _c('text', {
    staticClass: ["payName"],
    staticStyle: {
      fontSize: "36px"
    }
  }, [_vm._v("扫码支付")]), _c('image', {
    staticClass: ["hidePayBtn"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/greyCancel.png"
    },
    on: {
      "click": _vm.hidePaycode
    }
  })]), _c('div', {
    staticClass: ["codePriceBox"]
  }, [_c('text', {
    staticStyle: {
      color: "#323232",
      fontSize: "32px"
    }
  }, [_vm._v("支付：")]), _c('text', {
    staticStyle: {
      color: "#FD5000",
      fontSize: "36px"
    }
  }, [_vm._v("¥" + _vm._s(_vm.depositMess.amount))])])]), _c('div', {
    staticClass: ["qrCodeBox"]
  }, [_c('image', {
    staticClass: ["qrCode"],
    attrs: {
      "src": _vm.qrCodeLink
    }
  })]), _vm._m(2), _c('div', {
    staticClass: ["buttonBox"]
  }, [_c('text', {
    staticClass: ["dispireBtn"],
    on: {
      "click": _vm.hidePaycode
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["payFinish"],
    on: {
      "click": _vm.payResults
    }
  }, [_vm._v("已支付")])])])]) : _vm._e(), (!_vm.hasHandsels) ? _c('div', {
    staticClass: ["postBox"],
    style: {
      visibility: _vm.componentVisibility
    },
    on: {
      "click": _vm.sunmitChange
    }
  }, [_c('text', {
    staticClass: ["postBtn"]
  }, [_vm._v("提交")])]) : _vm._e(), (!_vm.isFinish && _vm.hasHandsels) ? _c('div', {
    staticClass: ["postBox"],
    style: {
      visibility: _vm.componentVisibility
    },
    on: {
      "click": _vm.toPay
    }
  }, [_c('text', {
    staticClass: ["postBtn"]
  }, [_vm._v("发起付款")])]) : _vm._e()])
},staticRenderFns: [function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["parRight"]
  }, [_c('text', {
    staticClass: ["payName"]
  }, [_vm._v("微信")]), _c('text', {
    staticClass: ["scanCode"]
  }, [_vm._v("扫码支付")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["parRight"]
  }, [_c('text', {
    staticClass: ["payName"]
  }, [_vm._v("支付宝")]), _c('text', {
    staticClass: ["scanCode"]
  }, [_vm._v("扫码支付")])])
},function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["supportPayBox"]
  }, [_c('text', {
    staticClass: ["supportTxt"]
  }, [_vm._v("支持以下方式")]), _c('view', {
    staticClass: ["payMethodsIcon"]
  }, [_c('image', {
    staticClass: ["payIcon"],
    staticStyle: {
      marginRight: "30px"
    },
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/wechat.png"
    }
  }), _c('image', {
    staticClass: ["payIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/alipay.png"
    }
  })])])
}]}
module.exports.render._withStripped = true

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(8)
)

/* script */
__vue_exports__ = __webpack_require__(9)

/* template */
var __vue_template__ = __webpack_require__(10)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\办理定金\\earnestMoney\\src\\components\\deposit.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-f127b844"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 8 */
/***/ (function(module, exports) {

module.exports = {
  "headers": {
    "width": "750",
    "height": "88",
    "paddingLeft": "30",
    "paddingRight": "40",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#ffffff"
  },
  "returnImg": {
    "width": "100",
    "height": "80",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "title": {
    "fontSize": "34",
    "color": "#53575A"
  },
  "nullBox": {
    "fontSize": "34",
    "color": "#ffffff"
  },
  "returnIcon": {
    "width": "48",
    "height": "48"
  },
  "depositBox": {
    "paddingLeft": "60",
    "paddingRight": "60",
    "borderTopWidth": "20",
    "borderTopStyle": "solid",
    "borderTopColor": "#F5F4F9"
  },
  "centerMess": {
    "paddingBottom": "28",
    "borderBottomColor": "#E1E1E1",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1"
  },
  "centerNameBox": {
    "marginTop": "40",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "centerIcon": {
    "width": "56",
    "height": "56"
  },
  "centerName": {
    "color": "#000000",
    "fontSize": "32"
  },
  "priceBox": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center"
  },
  "price": {
    "color": "#000000",
    "fontSize": "52",
    "fontWeight": "600",
    "marginTop": "60"
  },
  "depositLogo": {
    "width": "142",
    "height": "142"
  },
  "depositItem": {
    "flexDirection": "row",
    "alignItems": "center",
    "marginBottom": "20"
  },
  "depositMess": {
    "paddingBottom": "28",
    "borderBottomColor": "#E1E1E1",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "paddingTop": "46"
  },
  "depositNote": {
    "flexDirection": "row",
    "marginBottom": "20"
  },
  "depositMessName": {
    "width": "112",
    "marginRight": "52",
    "color": "#888888",
    "fontSize": "28"
  },
  "depositMessContent": {
    "color": "#2E3D50",
    "fontSize": "28",
    "width": "460",
    "flexWrap": "wrap"
  },
  "codeBox": {
    "flexDirection": "column",
    "alignItems": "center",
    "paddingTop": "34"
  },
  "barCode": {
    "width": "506",
    "height": "120",
    "backgroundColor": "#888888",
    "marginBottom": "10"
  },
  "codeTxt": {
    "color": "#2E3D50",
    "fontSize": "28",
    "marginBottom": "44"
  },
  "checkCode": {
    "width": "630",
    "height": "100",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "center",
    "backgroundColor": "#474F60",
    "boxShadow": "0px 2px 6px 0px rgba(0,0,0,0.2)",
    "borderRadius": "60",
    "position": "absolute",
    "bottom": "40",
    "left": "60"
  },
  "codeIcon": {
    "width": "36",
    "height": "36",
    "marginRight": "18"
  },
  "checkCodeTxt": {
    "color": "#ffffff",
    "fontSize": "32"
  }
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var nativeMoudle = weex.requireModule('nativeModule');
var storage = weex.requireModule("storage");
var modal = weex.requireModule("modal");
var stream = weex.requireModule('stream');
exports.default = {
    data: function data() {
        return {
            height: '',
            orderMess: '',
            traineeId: '',
            centerId: '',
            token: '',
            //  webHost:'http://10.0.0.12:8080',
            webHost: 'https://www.forzadata.cn',
            traineePhone: '',
            serialNumBarCode: ''
        };
    },
    created: function created() {
        var that = this;
        nativeMoudle.getMetaData(function (map) {
            that.traineeId = map.traineeId;
            that.centerId = map.centerId;
            that.token = map.token;
            that.height = map.isPhoneBangseries ? 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 118 : 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 50;
            if (map.serverUrl == '' || map.serverUrl == null || map.serverUrl == undefined) {
                that.webHost = 'https://www.forzadata.cn';
            } else {
                that.webHost = map.serverUrl;
            }
        });
        nativeMoudle.showProgressDialog();
        // nativeMoudle.toast(that.$route.query.depositId);

        setTimeout(function () {
            that.getmess(that.$route.query.depositId);
        }, 100);
        weex.requireModule('globalEvent').addEventListener('androidback', function (e) {
            nativeMoudle.close();
        });
    },

    methods: {
        returnPage: function returnPage() {
            nativeMoudle.close();
            this.$refs.inputText.blur();
        },
        getmess: function getmess(id) {
            var me = this;
            var GET_URL = me.webHost + '/api/weex/deposit/' + me.centerId + '/' + id + '/receipt';
            stream.fetch({
                method: 'GET',
                url: GET_URL,
                type: 'json',
                headers: {
                    'X-AUTH-TOKEN': me.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        var traineePhone = ret.data.data.traineePhone + '';
                        me.orderMess = ret.data.data;
                        me.serialNumBarCode = ret.data.data.serialNumBarCode.replace(/\s*/g, "");
                        if (ret.data.data.traineePhone != '' && ret.data.data.traineePhone != null && ret.data.data.traineePhone != undefined && ret.data.data.traineePhone.indexOf('T') == -1) {
                            me.traineePhone = traineePhone.replace(traineePhone.substring(3, 7), "****");
                        } else {
                            me.traineePhone = traineePhone;
                        }
                    } else {
                        nativeMoudle.toast(ret.data.message);
                    }
                } else {
                    nativeMoudle.toast('网络错误！');
                }
            }, function (response) {});
        },
        showCode: function showCode() {
            nativeMoudle.showQrCode(this.orderMess.h5);
        }
    }
};

/***/ }),
/* 10 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["addBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headers"]
  }, [_c('div', {
    staticClass: ["returnImg"],
    on: {
      "click": _vm.returnPage
    }
  }, [_c('image', {
    staticClass: ["returnIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png"
    }
  })]), _c('text', {
    staticClass: ["title"]
  }, [_vm._v("定金收据")]), _c('text', {
    staticStyle: {
      fontSize: "34px",
      color: "#ffffff"
    }
  }, [_vm._v("保存")])]), _c('div', {
    staticClass: ["depositBox"]
  }, [_c('div', {
    staticClass: ["centerMess"]
  }, [_c('div', {
    staticClass: ["centerNameBox"]
  }, [_c('div', {
    staticStyle: {
      width: "56px",
      height: "56px",
      borderRadius: "100px",
      marginRight: "30px"
    }
  }, [_c('image', {
    staticClass: ["centerIcon"],
    attrs: {
      "src": _vm.orderMess.centerReceiptLogo || "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/centerIcon.png"
    }
  })]), _c('text', {
    staticClass: ["centerName"]
  }, [_vm._v(_vm._s(_vm.orderMess.centerName))])]), _c('div', {
    staticClass: ["priceBox"]
  }, [_c('text', {
    staticClass: ["price"]
  }, [_vm._v("¥" + _vm._s(_vm.orderMess.amount))]), (_vm.orderMess.centerReceiptSign != '' && _vm.orderMess.centerReceiptSign != null && _vm.orderMess.centerReceiptSign != _vm.undefiend) ? _c('image', {
    staticClass: ["depositLogo"],
    attrs: {
      "src": _vm.orderMess.centerReceiptSign
    }
  }) : _vm._e()])]), _c('div', {
    staticClass: ["depositMess"]
  }, [_c('div', {
    staticClass: ["depositItem"]
  }, [_c('text', {
    staticClass: ["depositMessName"]
  }, [_vm._v("会员")]), _c('text', {
    staticClass: ["depositMessContent"]
  }, [_vm._v(_vm._s(_vm.orderMess.traineeName) + "（" + _vm._s(_vm.orderMess.traineePhone) + "）")])]), _c('div', {
    staticClass: ["depositItem"]
  }, [_c('text', {
    staticClass: ["depositMessName"]
  }, [_vm._v("定金类型")]), _c('text', {
    staticClass: ["depositMessContent"]
  }, [_vm._v(_vm._s(_vm.orderMess.depositType))])]), _c('div', {
    staticClass: ["depositItem"]
  }, [_c('text', {
    staticClass: ["depositMessName"]
  }, [_vm._v("有效天数")]), _c('text', {
    staticClass: ["depositMessContent"]
  }, [_vm._v(_vm._s(_vm.orderMess.duration) + "天")])]), _c('div', {
    staticClass: ["depositItem"]
  }, [_c('text', {
    staticClass: ["depositMessName"]
  }, [_vm._v("支付方式")]), _c('text', {
    staticClass: ["depositMessContent"]
  }, [_vm._v(_vm._s(_vm.orderMess.payMethod))])]), _c('div', {
    staticClass: ["depositItem"]
  }, [_c('text', {
    staticClass: ["depositMessName"]
  }, [_vm._v("支付时间")]), _c('text', {
    staticClass: ["depositMessContent"]
  }, [_vm._v(_vm._s(_vm.orderMess.paidTime))])]), _c('div', {
    staticClass: ["depositItem"]
  }, [_c('text', {
    staticClass: ["depositMessName"]
  }, [_vm._v("收款人")]), _c('text', {
    staticClass: ["depositMessContent"]
  }, [_vm._v(_vm._s(_vm.orderMess.sellerName))])]), _c('div', {
    staticClass: ["depositNote"]
  }, [_c('text', {
    staticClass: ["depositMessName"]
  }, [_vm._v("备注")]), _c('text', {
    staticClass: ["depositMessContent"]
  }, [_vm._v(_vm._s(_vm.orderMess.comment || '无'))])])]), _c('div', {
    staticClass: ["codeBox"]
  }, [_c('image', {
    staticClass: ["barCode"],
    attrs: {
      "src": _vm.serialNumBarCode
    }
  }), _c('text', {
    staticClass: ["codeTxt"]
  }, [_vm._v(_vm._s(_vm.orderMess.serialNum))])])]), _c('div', {
    staticClass: ["checkCode"],
    on: {
      "click": _vm.showCode
    }
  }, [_c('image', {
    staticClass: ["codeIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/checkCode.png"
    }
  }), _c('text', {
    staticClass: ["checkCodeTxt"]
  }, [_vm._v("扫码查看")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(12)
)

/* script */
__vue_exports__ = __webpack_require__(13)

/* template */
var __vue_template__ = __webpack_require__(14)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\办理定金\\earnestMoney\\src\\components\\depositDetail.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-43acfb4f"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 12 */
/***/ (function(module, exports) {

module.exports = {
  "bg": {
    "backgroundColor": "rgba(0,0,0,0.6)",
    "position": "absolute",
    "left": 0,
    "top": 0,
    "width": "750",
    "alignContent": "center",
    "justifyContent": "center"
  },
  "previewPic": {
    "width": "680",
    "height": "650",
    "marginLeft": "35"
  },
  "listBox": {
    "backgroundColor": "#ffffff"
  },
  "headers": {
    "width": "750",
    "height": "88",
    "paddingLeft": "30",
    "paddingRight": "40",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#ffffff",
    "borderBottomColor": "#f6f6ff",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1"
  },
  "returnImg": {
    "width": "100",
    "height": "80",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "title": {
    "fontSize": "34",
    "color": "#53575A"
  },
  "nullBox": {
    "fontSize": "34",
    "color": "#ffffff"
  },
  "beforePage": {
    "width": "48",
    "height": "48"
  },
  "detailBox": {
    "paddingLeft": "30",
    "paddingRight": "30"
  },
  "memberMess": {
    "height": "180",
    "flexDirection": "row",
    "alignItems": "center",
    "borderBottomColor": "#f6f6ff",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "marginBottom": "40"
  },
  "avatar": {
    "width": "80",
    "marginRight": "20",
    "height": "80",
    "borderRadius": "100"
  },
  "avatarIcon": {
    "width": "80",
    "height": "80",
    "borderRadius": "100"
  },
  "messBox": {
    "width": "590",
    "flexDirection": "row",
    "alignItems": "center",
    "justifyContent": "space-between"
  },
  "name": {
    "color": "#303030",
    "fontSize": "30"
  },
  "phone": {
    "color": "#303030",
    "fontSize": "28"
  },
  "price": {
    "flexDirection": "row",
    "alignItems": "center"
  },
  "detailItem": {
    "flexDirection": "row",
    "marginBottom": "20"
  },
  "itemName": {
    "color": "#888888",
    "fontSize": "28",
    "marginRight": "42",
    "width": "120"
  },
  "itemContent": {
    "color": "#2E3D50",
    "fontSize": "28",
    "width": "460"
  },
  "protocolBox": {
    "borderTopColor": "#f6f6ff",
    "borderTopStyle": "solid",
    "borderTopWidth": "1",
    "marginTop": "20",
    "paddingTop": "40"
  },
  "protocolTitle": {
    "color": "#888888",
    "fontSize": "28",
    "marginBottom": "20"
  },
  "imgBox": {
    "flexDirection": "row",
    "alignItems": "center"
  },
  "protocolImg": {
    "width": "160",
    "height": "160",
    "marginRight": "20"
  },
  "checkOrder": {
    "width": "750",
    "height": "88",
    "textAlign": "center",
    "lineHeight": "88",
    "backgroundColor": "#12C48B",
    "color": "#ffffff",
    "fontSize": "30",
    "position": "absolute",
    "bottom": 0
  }
}

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var nativeMoudle = weex.requireModule('nativeModule');
var storage = weex.requireModule("storage");
var stream = weex.requireModule('stream');
exports.default = {
    data: function data() {
        return {
            height: '',
            depositId: '',
            //   webHost:'http://10.0.0.12:8080',
            webHost: 'https://www.forzadata.cn',
            token: 'eyJuYW1lIjoi546L6JaHIiwicGhvbmUiOiIxNzY4MjMwNjYwMSIsImFjY291bnRJZCI6Nzk4MzksImltcGVyc29uYXRlZCI6ZmFsc2V9./820YzcQ7Eqx6EEnYAngCzuQjr3gtRjOzXtxb1tzXaA=',
            traineePhoto: '',
            traineeName: '',
            traineePhone: '',
            amount: '',
            status: '',
            usedType: '',
            contractSerialNum: '',
            payDate: '',
            expireDate: '',
            protocolPhotos: [],
            comment: '',
            payMethod: '',
            payMethod2: '',
            receiptUrl: '',
            duration: '',
            centerId: '',
            isPreview: false,
            previewImg: '',
            traineeId: ''
        };
    },
    created: function created() {
        var that = this;

        that.depositId = JSON.stringify(that.$route.query.id);
        nativeMoudle.getMetaData(function (map) {
            that.centerId = map.centerId;
            that.token = map.token;
            if (map.serverUrl == '' || map.serverUrl == null || map.serverUrl == undefined) {
                that.webHost = 'https://www.forzadata.cn';
            } else {
                that.webHost = map.serverUrl;
            }
            that.height = map.isPhoneBangseries ? 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 118 : 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 50;
        });
        nativeMoudle.showProgressDialog();

        setTimeout(function () {
            that.getDetail();
        }, 50);
        weex.requireModule('globalEvent').addEventListener('androidback', function (e) {
            this.$router.go(-1);
        });
    },

    methods: {
        enlargePic: function enlargePic(item) {
            // nativeMoudle.toast('pic')
            this.isPreview = true;
            this.previewImg = item;
        },
        hidePreview: function hidePreview() {
            this.isPreview = false;
        },
        beforePage: function beforePage() {
            this.$router.go(-1);
        },
        getDetail: function getDetail() {
            var that = this;
            stream.fetch({
                method: 'GET',
                url: that.webHost + '/api/weex/deposit/' + that.centerId + '/' + that.depositId + '/detail',
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    if (ret.data.status == 0) {
                        that.traineeId = ret.data.data.traineeId;
                        that.traineePhoto = ret.data.data.traineePhoto;
                        that.traineeName = ret.data.data.traineeName;
                        that.traineePhone = ret.data.data.traineePhone;
                        that.amount = ret.data.data.amount;
                        that.status = ret.data.data.status;
                        that.usedType = ret.data.data.usedType;
                        that.contractSerialNum = ret.data.data.serialNum;
                        that.payDate = ret.data.data.payDate;
                        that.expireDate = ret.data.data.expireDate;
                        that.receiptUrl = ret.data.data.receiptUrl;
                        if (ret.data.data.protocolPhotos) {
                            that.protocolPhotos = ret.data.data.protocolPhotos;
                        }
                        if (ret.data.data.payMethod) {
                            that.payMethod = ret.data.data.payMethod;
                        }
                        if (ret.data.data.payMethod2) {
                            that.payMethod2 = ret.data.data.payMethod2;
                        }
                        that.comment = ret.data.data.comment;
                        that.duration = ret.data.data.duration;
                    } else {
                        nativeMoudle.toast(ret.data.message);
                    }
                    nativeMoudle.progressDialogDismiss();
                } else {
                    nativeMoudle.toast('网络错误！');
                }
            }, function (response) {});
        },
        toDetail: function toDetail() {
            var that = this;
            //   nativeMoudle.toast(that.depositId);
            that.$router.push({ name: 'deposit', query: { depositId: that.depositId } });
        },
        showMember: function showMember() {
            nativeMoudle.goToTraineeDetail(this.traineeId);
        }
    }
};

/***/ }),
/* 14 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["listBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headers"]
  }, [_c('div', {
    staticClass: ["returnImg"],
    on: {
      "click": _vm.beforePage
    }
  }, [_c('image', {
    staticClass: ["beforePage"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png"
    }
  })]), _c('text', {
    staticClass: ["title"]
  }, [_vm._v("定金详情")]), _c('text', {
    staticStyle: {
      fontSize: "34px",
      color: "#ffffff"
    }
  }, [_vm._v("保存")])]), _c('list', {
    staticClass: ["listBox"],
    style: {
      height: _vm.height - 180
    }
  }, [_c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, [_c('div', {
    staticClass: ["detailBox"]
  }, [_c('div', {
    staticClass: ["memberMess"],
    on: {
      "click": _vm.showMember
    }
  }, [_c('div', {
    staticClass: ["avatar"]
  }, [_c('image', {
    staticClass: ["avatarIcon"],
    attrs: {
      "src": _vm.traineePhoto ? _vm.traineePhoto : 'https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/defaultAvata.png'
    }
  })]), _c('div', {
    staticClass: ["messBox"]
  }, [_c('div', {
    staticClass: ["leftBox"]
  }, [_c('text', {
    staticClass: ["name"]
  }, [_vm._v(_vm._s(_vm.traineeName))]), _c('text', {
    staticClass: ["phone"]
  }, [_vm._v(_vm._s(_vm.traineePhone))])]), _c('div', {
    staticClass: ["price"]
  }, [_c('text', {
    staticStyle: {
      color: "#E7541E",
      fontSize: "28px"
    }
  }, [_vm._v("¥ ")]), _c('text', {
    staticStyle: {
      color: "#E7541E",
      fontSize: "36px"
    }
  }, [_vm._v(_vm._s(_vm.amount))])])])]), _c('div', {
    staticClass: ["detailItem"]
  }, [_c('text', {
    staticClass: ["itemName"]
  }, [_vm._v("当前状态")]), _c('text', {
    staticClass: ["itemContent"]
  }, [_vm._v(_vm._s(_vm.status))])]), _c('div', {
    staticClass: ["detailItem"]
  }, [_c('text', {
    staticClass: ["itemName"]
  }, [_vm._v("定金类型")]), _c('text', {
    staticClass: ["itemContent"]
  }, [_vm._v(_vm._s(_vm.usedType) + "定金")])]), _c('div', {
    staticClass: ["detailItem"]
  }, [_c('text', {
    staticClass: ["itemName"]
  }, [_vm._v("定金编号")]), _c('text', {
    staticClass: ["itemContent"]
  }, [_vm._v(_vm._s(_vm.contractSerialNum))])]), _c('div', {
    staticClass: ["detailItem"]
  }, [_c('text', {
    staticClass: ["itemName"]
  }, [_vm._v("收款时间")]), _c('text', {
    staticClass: ["itemContent"]
  }, [_vm._v(_vm._s(_vm.payDate))])]), _c('div', {
    staticClass: ["detailItem"]
  }, [_c('text', {
    staticClass: ["itemName"]
  }, [_vm._v("支付方式")]), _c('text', {
    staticClass: ["itemContent"]
  }, [_vm._v(_vm._s(_vm.payMethod ? _vm.payMethod : '') + _vm._s(_vm.payMethod2 ? '、' + _vm.payMethod2 : ''))])]), _c('div', {
    staticClass: ["detailItem"]
  }, [_c('text', {
    staticClass: ["itemName"]
  }, [_vm._v("有效天数")]), _c('text', {
    staticClass: ["itemContent"]
  }, [_vm._v(_vm._s(_vm.duration) + "天")])]), _c('div', {
    staticClass: ["detailItem"]
  }, [_c('text', {
    staticClass: ["itemName"]
  }, [_vm._v("到期日")]), _c('text', {
    staticClass: ["itemContent"]
  }, [_vm._v(_vm._s(_vm.expireDate))])]), _c('div', {
    staticClass: ["detailItem"]
  }, [_c('text', {
    staticClass: ["itemName"]
  }, [_vm._v("备注")]), _c('text', {
    staticClass: ["itemContent"]
  }, [_vm._v(_vm._s(_vm.comment || '暂无备注'))])]), _c('div', {
    staticClass: ["protocolBox"]
  }, [_c('text', {
    staticClass: ["protocolTitle"]
  }, [_vm._v("定金协议")]), (_vm.protocolPhotos.length != 0) ? _c('div', {
    staticClass: ["imgBox"]
  }, _vm._l((_vm.protocolPhotos), function(item, index) {
    return _c('image', {
      key: index,
      staticClass: ["protocolImg"],
      attrs: {
        "src": item
      },
      on: {
        "click": function($event) {
          _vm.enlargePic(item)
        }
      }
    })
  })) : _c('text', {
    staticClass: ["protocolTitle"],
    staticStyle: {
      marginLeft: "30px"
    }
  }, [_vm._v("暂无协议图片")])])])])]), _c('text', {
    staticClass: ["checkOrder"],
    on: {
      "click": _vm.toDetail
    }
  }, [_vm._v("查看收据")]), (_vm.isPreview) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.hidePreview
    }
  }, [_c('image', {
    staticClass: ["previewPic"],
    attrs: {
      "src": _vm.previewImg
    }
  })]) : _vm._e()])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(16)
)

/* script */
__vue_exports__ = __webpack_require__(17)

/* template */
var __vue_template__ = __webpack_require__(18)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\办理定金\\earnestMoney\\src\\components\\edit.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-0d985a0c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 16 */
/***/ (function(module, exports) {

module.exports = {
  "textarea": {
    "height": "200"
  },
  "headers": {
    "width": "750",
    "height": "88",
    "paddingLeft": "30",
    "paddingRight": "40",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "backgroundColor": "#ffffff"
  },
  "returnImg": {
    "width": "100",
    "height": "80",
    "flexDirection": "row",
    "alignItems": "center"
  },
  "title": {
    "fontSize": "34",
    "color": "#53575A"
  },
  "nullBox": {
    "fontSize": "34",
    "color": "#ffffff"
  },
  "returnIcon": {
    "width": "48",
    "height": "48"
  },
  "addContent": {
    "borderTopColor": "#F6F6F6",
    "borderTopStyle": "solid",
    "borderTopWidth": "1"
  },
  "addContentTop": {
    "marginLeft": "20"
  },
  "addItemBox": {
    "height": "96",
    "alignItems": "center",
    "flexDirection": "row"
  },
  "leftBox": {
    "alignItems": "center",
    "flexDirection": "row"
  },
  "rightBox": {
    "alignItems": "center",
    "flexDirection": "row",
    "marginRight": "40"
  },
  "courseType": {
    "color": "#2E3D50",
    "fontSize": "30",
    "marginRight": "10"
  },
  "rightIcon": {
    "width": "32",
    "height": "32"
  },
  "warning": {
    "color": "#FB6666",
    "fontSize": "30",
    "marginRight": "12",
    "marginLeft": "10"
  },
  "leftTxt": {
    "color": "#2E3D50",
    "fontSize": "30"
  },
  "moneyInput": {
    "width": "210",
    "fontSize": "30",
    "textAlign": "right",
    "alignItems": "center",
    "paddingRight": "2",
    "height": "90",
    "textIndent": "6"
  },
  "messCon": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "borderBottomColor": "#E1E1E1",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "width": "700",
    "height": "96"
  },
  "bg": {
    "backgroundColor": "rgba(0,0,0,0.6)",
    "position": "absolute",
    "left": 0,
    "top": 0,
    "width": "750"
  },
  "selectBox": {
    "width": "750",
    "backgroundColor": "#ffffff",
    "position": "absolute",
    "bottom": 0
  },
  "selectHeader": {
    "paddingLeft": "20",
    "width": "730",
    "height": "100",
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "marginBottom": "20",
    "backgroundColor": "#ffffff",
    "borderBottomColor": "#E7E7E7",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1"
  },
  "dispire": {
    "fontSize": "32",
    "color": "#828282"
  },
  "finish": {
    "fontSize": "32",
    "color": "#12C48B"
  },
  "titles": {
    "fontSize": "32",
    "color": "#2A3E49"
  },
  "lists": {
    "width": "750",
    "height": "80",
    "justifyContent": "center",
    "alignItems": "center"
  },
  "contents": {
    "fontSize": "30",
    "color": "#CCCCD1",
    "borderBottomColor": "#E7E7E7",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1"
  },
  "select": {
    "fontSize": "34",
    "color": "#575757",
    "borderBottomColor": "#E7E7E7",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1"
  },
  "scrollers": {
    "width": "750",
    "height": "400",
    "paddingTop": "80",
    "backgroundColor": "#ffffff"
  },
  "imgBox": {
    "flexDirection": "row"
  },
  "imgAdds": {
    "marginBottom": "20",
    "alignItems": "center",
    "flexDirection": "row",
    "width": "180",
    "height": "180",
    "marginRight": "40"
  },
  "showPhoto": {
    "width": "160",
    "height": "160"
  },
  "addPhoto": {
    "width": "160",
    "height": "160"
  },
  "protocolBox": {
    "borderBottomColor": "#E7E7E7",
    "borderBottomStyle": "solid",
    "borderBottomWidth": "1",
    "paddingTop": "18",
    "paddingBottom": "48",
    "marginLeft": "40"
  },
  "protocolTitle": {
    "color": "#2E3D50",
    "fontSize": "30",
    "marginBottom": "20"
  },
  "postBox": {
    "height": "88",
    "width": "750",
    "backgroundColor": "#12C48B",
    "position": "absolute",
    "bottom": 0,
    "alignItems": "center",
    "justifyContent": "center"
  },
  "postBtn": {
    "color": "#ffffff",
    "fontSize": "30"
  },
  "noteBox": {
    "paddingTop": "28",
    "paddingLeft": "45"
  },
  "noteTitle": {
    "color": "#2E3D50",
    "fontSize": "30",
    "marginBottom": "8"
  },
  "eidtPros": {
    "width": "40",
    "height": "40"
  },
  "traineeMess": {
    "height": "180",
    "alignItems": "center",
    "flexDirection": "row"
  },
  "traineeImg": {
    "width": "140",
    "height": "140",
    "marginRight": "20",
    "marginLeft": "46"
  },
  "rightItem": {
    "marginBottom": "10",
    "color": "#464646",
    "fontSize": "28"
  },
  "messItem": {
    "flexDirection": "row",
    "justifyContent": "space-between",
    "alignItems": "center",
    "height": "96",
    "marginLeft": "50",
    "width": "700",
    "borderTopColor": "#E1E1E1",
    "borderTopStyle": "solid",
    "borderTopWidth": "1",
    "paddingRight": "40"
  },
  "messName": {
    "color": "#2E3D50",
    "fontSize": "30"
  },
  "messContent": {
    "color": "#2E3D50",
    "fontSize": "30"
  },
  "procotolMess": {
    "borderTopColor": "#E1E1E1",
    "borderTopStyle": "solid",
    "borderTopWidth": "1",
    "marginLeft": "50",
    "width": "700",
    "paddingTop": "20",
    "paddingBottom": "48"
  },
  "procotolTitle": {
    "color": "#2E3D50",
    "fontSize": "30",
    "marginBottom": "12"
  },
  "noteMess": {
    "borderTopColor": "#E1E1E1",
    "borderTopStyle": "solid",
    "borderTopWidth": "1",
    "marginLeft": "50",
    "width": "700",
    "paddingTop": "20"
  },
  "noteCon": {
    "color": "#A3A3A3",
    "fontSize": "30"
  },
  "deletePop": {
    "justifyContent": "center",
    "alignContent": "center"
  },
  "deletePopBox": {
    "width": "620",
    "height": "320",
    "borderRadius": "16",
    "backgroundColor": "#ffffff",
    "alignItems": "center",
    "justifyContent": "center",
    "opacity": 1,
    "flexDirection": "column",
    "marginLeft": "64"
  },
  "deleteBtnBox": {
    "flexDirection": "row",
    "justifyContent": "flex-start",
    "backgroundColor": "#ffffff",
    "borderTopColor": "#E9E9E9",
    "borderTopStyle": "solid",
    "borderTopWidth": "1",
    "width": "620",
    "borderBottomLeftRadius": "16",
    "borderBottomRightRadius": "16"
  },
  "cancelDelete": {
    "width": "310",
    "height": "90",
    "lineHeight": "90",
    "borderRightColor": "#E9E9E9",
    "borderRightStyle": "solid",
    "borderRightWidth": "1",
    "color": "#A3A3A3",
    "fontSize": "32",
    "backgroundColor": "#ffffff",
    "alignItems": "center",
    "justifyContent": "center",
    "textAlign": "center",
    "flexDirection": "column",
    "borderBottomLeftRadius": "16"
  },
  "submitDelete": {
    "width": "309",
    "height": "90",
    "lineHeight": "90",
    "backgroundColor": "#ffffff",
    "alignItems": "center",
    "justifyContent": "center",
    "color": "#13C38C",
    "textAlign": "center",
    "fontSize": "32",
    "flexDirection": "column",
    "borderBottomRightRadius": "16"
  },
  "deletePopTitle": {
    "color": "#323232",
    "width": "620",
    "fontSize": "36",
    "marginTop": "30",
    "marginBottom": "40",
    "backgroundColor": "#ffffff",
    "fontWeight": "600",
    "textAlign": "center"
  },
  "deletePopContent": {
    "marginBottom": "60",
    "textAlign": "center",
    "width": "620",
    "color": "#323232",
    "fontSize": "36",
    "backgroundColor": "#ffffff"
  },
  "cancel": {
    "width": "30",
    "height": "30",
    "position": "absolute",
    "top": "-1",
    "right": "-1"
  }
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

var imageModule = weex.requireModule('image');
var uploadModule = weex.requireModule('transfer');
var nativeMoudle = weex.requireModule('nativeModule');
var storage = weex.requireModule("storage");
var modal = weex.requireModule("modal");
var stream = weex.requireModule('stream');
exports.default = {
    data: function data() {
        return {
            isShow: false,
            height: '',
            list: [{ title: '私教课', value: 2, checked: false }, { title: '培训课', value: 3, checked: false }, { title: '会员卡', value: 1, checked: false }],
            //  webHost:'http://10.0.0.12:8080',
            webHost: 'https://www.forzadata.cn',
            traineeId: '1529520',
            photoArray: [],
            isUploading: false,
            centerId: 269,
            content: null,
            isFocus: '',
            token: 'eyJuYW1lIjoi5qKB5pWZ57uDIiwicGhvbmUiOiIxNTg4ODgzMDg0OCIsImFjY291bnRJZCI6NTMxNDM0LCJpbXBlcnNvbmF0ZWQiOmZhbHNlfQ==.ditfYWGgTu0/eoSa7Da/b8eKihB7qttr9qQGA10Ok/A=',
            addPhoto: "",
            rigthPhoto: '',
            clearPhoto: '',
            depositPrice: '',
            depositDay: '',
            usedType: null,
            componentVisibility: 'visible',
            depositId: null,
            isDelete: false,
            coachAPP: true,
            isStudio: true,
            isPhoneBangseries: false

        };
    },
    created: function created() {
        var that = this;
        nativeMoudle.getMetaData(function (map) {
            that.traineeId = map.traineeId;
            that.centerId = map.centerId;
            that.token = map.token;
            that.coachAPP = map.coachAPP;
            that.isStudio = map.isStudio;
            that.height = map.isPhoneBangseries ? 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 118 : 750 / weex.config.env.deviceWidth * weex.config.env.deviceHeight - 50;
            if (map.allowTrainingCourse) {
                that.list = [{ title: '私教课', value: 2, checked: true }, { title: '培训课', value: 3, checked: false }, { title: '会员卡', value: 1, checked: false }];
            } else {
                that.list = [{ title: '私教课', value: 2, checked: true }, { title: '会员卡', value: 1, checked: false }];
            }
            if (map.serverUrl == '' || map.serverUrl == null || map.serverUrl == undefined) {
                that.webHost = 'https://www.forzadata.cn';
            } else {
                that.webHost = map.serverUrl;
            }
        });
        if (that.isStudio) {
            that.usedType = 1;
        }

        setTimeout(function () {
            that.getmess();
        }, 50);
        weex.requireModule('globalEvent').addEventListener('androidback', function (e) {
            that.$router.go(-1);
        });
    },

    methods: {
        emptyClick: function emptyClick() {},
        returnPage: function returnPage() {
            this.$router.go(-1);
            this.$refs.inputText.blur();
        },
        getmess: function getmess() {
            var me = this;
            var GET_URL = me.webHost + '/api/weex/deposit/' + me.centerId + '/' + me.traineeId;
            stream.fetch({
                method: 'GET',
                url: GET_URL,
                type: 'json',
                headers: {
                    'X-AUTH-TOKEN': me.token
                }
            }, function (ret) {
                if (ret.ok) {
                    if (ret.data.status == 0) {
                        me.content = ret.data.data.comment == null ? '' : ret.data.data.comment;
                        me.depositPrice = ret.data.data.amount;
                        me.depositDay = ret.data.data.duration;
                        me.usedType = ret.data.data.usedType;
                        me.photoArray = ret.data.data.photos;
                        me.depositId = ret.data.data.id;
                        if (me.usedType == 2) {
                            me.list[0].checked = true;
                        } else if (me.usedType == 3) {
                            me.list[1].checked = true;
                        } else if (me.usedType == 1) {
                            me.list[2].checked = true;
                        }
                    } else {
                        nativeMoudle.toast(ret.data.message);
                    }
                } else {
                    nativeMoudle.toast('网络错误！');
                }
            }, function (response) {});
        },
        deleteOrder: function deleteOrder() {
            this.isDelete = true;
            this.componentVisibility = 'hidden';
        },
        cancelDeleteEvent: function cancelDeleteEvent() {
            this.isDelete = false;
            this.componentVisibility = 'visible';
        },
        submitCancelEvent: function submitCancelEvent() {
            var that = this;
            nativeMoudle.showProgressDialog();
            stream.fetch({
                method: "DELETE",
                type: 'json',
                url: that.webHost + '/api/weex/deposit/' + that.centerId + '/preDeposit/' + that.depositId,
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                }
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        that.isDelete = false;
                        nativeMoudle.toast('删除成功');
                        setTimeout(function () {
                            that.$router.go(-1);
                        }, 1000);
                    } else {
                        that.isDelete = false;
                        nativeMoudle.toast(ret.data.message);
                    }
                } else {
                    that.isDelete = false;
                    nativeMoudle.toast('网络错误！');
                }
            });
        },
        sunmitChange: function sunmitChange() {
            var that = this;
            if (!that.depositPrice) {
                return nativeMoudle.toast('请输入定金金额！');
            }
            if (!that.depositDay) {
                return nativeMoudle.toast('请输入有效天数！');
            }
            nativeMoudle.showProgressDialog();
            var URL = that.webHost + '/api/weex/deposit/' + that.centerId + '/' + that.traineeId;
            var arr = JSON.stringify({
                orderSource: that.coachAPP ? '4' : '2',
                duration: that.depositDay,
                amount: that.depositPrice,
                usedType: that.usedType,
                photos: that.photoArray,
                id: that.depositId,
                comment: that.content
            });
            stream.fetch({
                method: 'POST',
                url: URL,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: arr
            }, function (ret) {
                if (ret.ok) {
                    nativeMoudle.progressDialogDismiss();
                    if (ret.data.status == 0) {
                        nativeMoudle.toast('提交成功！');
                        setTimeout(function () {
                            that.$router.go(-1);
                        }, 1000);
                    } else {
                        nativeMoudle.toast(ret.data.message);
                    }
                } else {
                    nativeMoudle.toast('网络错误！');
                }
            }, function (response) {});
        },
        pickImg: function pickImg() {
            this.$refs.inputText.blur();
            var that = this;
            var length = 3 - that.photoArray.length;
            imageModule.pickImage({
                limit: length,
                showCamera: false
            }, function (ret) {
                if (ret.paths.length == 0) {
                    return;
                }
                var item = ret.paths.pop();
                that.uploadImg(item, ret.paths);
                weex.requireModule('nativeModule').toast("上传中");
            });
        },
        uploadImg: function uploadImg(item, paths) {
            var that = this;
            var GET_URL = that.webHost + '/api/center/trainee/' + that.traineeId + '/followUp/image';
            var requestData = {
                url: GET_URL,
                path: item,
                method: 'POST',
                header: { 'X-AUTH-TOKEN': that.token },
                headers: { 'X-AUTH-TOKEN': that.token },
                formData: { file: item, keyword: "center-deposit" }
            };
            uploadModule.upload(JSON.stringify(requestData), function (ret) {
                if (JSON.parse(ret.data).status == 0) {
                    var a = JSON.parse(ret.data).data.url;
                    that.photoArray.push(a);
                    if (paths.length == 0) {
                        return;
                    }
                    item = paths.pop();
                    that.uploadImg(item, paths);
                } else {
                    weex.requireModule('nativeModule').toast(JSON.parse(ret.data).message);
                }
            });
        },
        selectCourseStyle: function selectCourseStyle() {
            this.isShow = !this.isShow;
            this.componentVisibility = 'hidden';
            this.$refs.inputText.blur();
            if (this.usedType == 2) {
                this.list[0].checked = true;
                this.list[1].checked = false;
                this.list[2].checked = false;
            } else if (this.usedType == 3) {
                this.list[1].checked = true;
                this.list[0].checked = false;
                this.list[2].checked = false;
            } else if (this.usedType == 1) {
                this.list[2].checked = true;
                this.list[0].checked = false;
                this.list[1].checked = false;
            }
        },
        hideList: function hideList() {
            this.isShow = !this.isShow;
            this.componentVisibility = 'visible';
        },
        chooseItem: function chooseItem(id) {
            var that = this;
            for (var i = 0, len = that.list.length; i < len; i++) {
                if (that.list[i].value == id) {
                    that.list[i].checked = true;
                } else {
                    that.list[i].checked = false;
                }
            }
        },
        getItem: function getItem() {
            var that = this;
            for (var i = 0, len = that.list.length; i < len; i++) {
                if (that.list[i].checked) {
                    that.usedType = that.list[i].value;
                }
            }
            that.isShow = !that.isShow;
            that.componentVisibility = 'visible';
        },
        oninput: function oninput(event) {
            this.content = event.value;
        },
        getDepositPrice: function getDepositPrice(event) {
            this.depositPrice = event.value;
        },
        getDepositDay: function getDepositDay(event) {
            this.depositDay = event.value;
        },
        sumbitRecord: function sumbitRecord() {
            this.$refs.inputText.blur();
            var me = this;
            var GET_URL;
            var arr;
            GET_URL = me.webHost + '/api/saleConsultant/member/' + me.centerId + '/followup/add';
            arr = JSON.stringify({
                type: me.followId,
                dialStatus: me.phoneId,
                photos: me.photoArray,
                serviceType: me.relationId,
                content: me.content,
                traineeId: me.traineeId,
                dialReserve: false
            });
            me.sumbit(GET_URL, arr);
        },
        sumbit: function sumbit(GET_URL, arr) {
            var that = this;
            stream.fetch({
                method: 'POST',
                url: GET_URL,
                type: 'json',
                headers: {
                    "Content-Type": 'application/json',
                    'X-AUTH-TOKEN': that.token
                },
                body: arr
            }, function (ret) {
                if (ret.data.status == 0) {
                    modal.toast({
                        'message': "添加成功",
                        'duration': 0.2
                    });
                    that.$router.push('/');
                } else {
                    modal.toast({
                        'message': "请输入内容！",
                        'duration': 1
                    });
                }
            }, function (response) {});
        },
        clearImg: function clearImg(index) {
            this.photoArray.splice(index, 1);
        }
    }
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["addBox"],
    style: {
      height: _vm.height
    }
  }, [_c('div', {
    staticClass: ["headers"]
  }, [_c('div', {
    staticClass: ["returnImg"],
    on: {
      "click": _vm.returnPage
    }
  }, [_c('image', {
    staticClass: ["returnIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/return.png"
    }
  })]), _c('text', {
    staticClass: ["title"]
  }, [_vm._v("办理定金")]), _c('image', {
    staticClass: ["eidtPros"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/delete.png"
    },
    on: {
      "click": _vm.deleteOrder
    }
  })]), _c('div', {
    staticClass: ["addContent"]
  }, [_c('div', {
    staticClass: ["addContentTop"]
  }, [_c('div', {
    staticClass: ["addItemBox"]
  }, [_c('text', {
    staticClass: ["warning"]
  }, [_vm._v("*")]), _c('div', {
    staticClass: ["messCon"]
  }, [_c('text', {
    staticClass: ["leftTxt"]
  }, [_vm._v("定金金额（元）")]), _c('div', {
    staticClass: ["rightBox"]
  }, [_c('input', {
    staticClass: ["moneyInput"],
    attrs: {
      "placeholder": "请输入定金金额",
      "type": "number",
      "placeholderColor": "#A3A3A3;",
      "value": (_vm.depositPrice)
    },
    on: {
      "focus": function($event) {
        _vm.isShow = false
      },
      "change": _vm.getDepositPrice,
      "input": function($event) {
        _vm.depositPrice = $event.target.attr.value
      }
    }
  }), _c('text', {
    staticClass: ["courseType"]
  }, [_vm._v("元")])])])]), _c('div', {
    staticClass: ["addItemBox"]
  }, [_c('text', {
    staticClass: ["warning"]
  }, [_vm._v("*")]), _c('div', {
    staticClass: ["messCon"]
  }, [_c('text', {
    staticClass: ["leftTxt"]
  }, [_vm._v("定金类型")]), (!_vm.isStudio) ? _c('div', {
    staticClass: ["rightBox"],
    on: {
      "click": _vm.selectCourseStyle
    }
  }, [_c('text', {
    staticClass: ["courseType"]
  }, [_vm._v(_vm._s(_vm.usedType == 1 ? '会员卡' : _vm.usedType == 2 ? '私教课' : '培训课'))]), _c('image', {
    staticClass: ["rightIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/blackRight.png"
    }
  })]) : _vm._e(), (_vm.isStudio) ? _c('div', {
    staticClass: ["rightBox"]
  }, [_c('text', {
    staticClass: ["courseType"]
  }, [_vm._v("会员卡")]), _c('image', {
    staticClass: ["rightIcon"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/blackRight.png"
    }
  })]) : _vm._e()])]), _c('div', {
    staticClass: ["addItemBox"]
  }, [_c('text', {
    staticClass: ["warning"]
  }, [_vm._v("*")]), _c('div', {
    staticClass: ["messCon"]
  }, [_c('text', {
    staticClass: ["leftTxt"]
  }, [_vm._v("有效天数（天）")]), _c('div', {
    staticClass: ["rightBox"]
  }, [_c('input', {
    staticClass: ["moneyInput"],
    attrs: {
      "placeholder": "请输入有效天数",
      "type": "number",
      "placeholderColor": "#A3A3A3;",
      "value": (_vm.depositDay)
    },
    on: {
      "focus": function($event) {
        _vm.isShow = false
      },
      "change": _vm.getDepositDay,
      "input": function($event) {
        _vm.depositDay = $event.target.attr.value
      }
    }
  }), _c('text', {
    staticClass: ["courseType"]
  }, [_vm._v("天")])])])]), _c('div', {
    staticClass: ["protocolBox"]
  }, [_c('text', {
    staticClass: ["protocolTitle"]
  }, [_vm._v("协议")]), _c('div', {
    staticClass: ["imgBox"]
  }, [_vm._l((_vm.photoArray), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["imgAdds"]
    }, [_c('image', {
      staticClass: ["showPhoto"],
      attrs: {
        "src": item + '?x-oss-process=image/resize,h_200'
      }
    }), _c('image', {
      staticClass: ["cancel"],
      attrs: {
        "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/deletePro.png"
      },
      on: {
        "click": function($event) {
          _vm.clearImg(index)
        }
      }
    })])
  }), (_vm.photoArray.length < 3) ? _c('div', {
    staticClass: ["imgAdds"],
    on: {
      "click": _vm.pickImg
    }
  }, [_c('image', {
    staticClass: ["addPhoto"],
    attrs: {
      "src": "https://bocai-center.oss-cn-hangzhou.aliyuncs.com/center_manager/static_img/icon_plus.png"
    }
  })]) : _vm._e()], 2)]), _c('div', {
    staticClass: ["noteBox"]
  }, [_c('text', {
    staticClass: ["noteTitle"]
  }, [_vm._v("备注")]), _c('textarea', {
    ref: "inputText",
    staticClass: ["textarea"],
    attrs: {
      "placeholder": "请输入备注内容",
      "maxlength": "100",
      "value": (_vm.content)
    },
    on: {
      "focus": function($event) {
        _vm.isShow = false
      },
      "input": [function($event) {
        _vm.content = $event.target.attr.value
      }, _vm.oninput]
    }
  })])])]), (_vm.isShow) ? _c('div', {
    staticClass: ["bg"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.emptyClick
    }
  }, [_c('div', {
    staticClass: ["selectBox"]
  }, [_c('div', {
    staticClass: ["selectHeader"]
  }, [_c('text', {
    staticClass: ["dispire"],
    on: {
      "click": _vm.hideList
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["titles"]
  }, [_vm._v("定金类型")]), _c('text', {
    staticClass: ["finish"],
    on: {
      "click": _vm.getItem
    }
  }, [_vm._v("完成")])]), _c('list', {
    staticClass: ["scrollers"]
  }, [((_vm.isShow)) ? _c('cell', {
    appendAsTree: true,
    attrs: {
      "append": "tree"
    }
  }, _vm._l((_vm.list), function(item, index) {
    return _c('div', {
      key: index,
      staticClass: ["lists"],
      on: {
        "click": function($event) {
          _vm.chooseItem(item.value)
        }
      }
    }, [_c('text', {
      class: [item.checked ? 'select' : 'contents']
    }, [_vm._v(_vm._s(item.title))])])
  })) : _vm._e()])])]) : _vm._e(), ((_vm.isDelete)) ? _c('div', {
    staticClass: ["bg", "deletePop"],
    style: {
      height: _vm.height
    },
    on: {
      "click": _vm.emptyClick
    }
  }, [_c('div', {
    staticClass: ["deletePopBox"]
  }, [_c('text', {
    staticClass: ["deletePopTitle"]
  }, [_vm._v("提示")]), _c('text', {
    staticClass: ["deletePopContent"]
  }, [_vm._v("· 确认要删除该订单？")]), _c('div', {
    staticClass: ["deleteBtnBox"]
  }, [_c('text', {
    staticClass: ["cancelDelete"],
    on: {
      "click": _vm.cancelDeleteEvent
    }
  }, [_vm._v("取消")]), _c('text', {
    staticClass: ["submitDelete"],
    on: {
      "click": _vm.submitCancelEvent
    }
  }, [_vm._v("确定")])])])]) : _vm._e(), _c('div', {
    staticClass: ["postBox"],
    style: {
      visibility: _vm.componentVisibility
    },
    on: {
      "click": _vm.sunmitChange
    }
  }, [_c('text', {
    staticClass: ["postBtn"]
  }, [_vm._v("提交")])])])
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var __vue_exports__, __vue_options__
var __vue_styles__ = []

/* styles */
__vue_styles__.push(__webpack_require__(20)
)

/* script */
__vue_exports__ = __webpack_require__(21)

/* template */
var __vue_template__ = __webpack_require__(22)
__vue_options__ = __vue_exports__ = __vue_exports__ || {}
if (
  typeof __vue_exports__.default === "object" ||
  typeof __vue_exports__.default === "function"
) {
if (Object.keys(__vue_exports__).some(function (key) { return key !== "default" && key !== "__esModule" })) {console.error("named exports are not supported in *.vue files.")}
__vue_options__ = __vue_exports__ = __vue_exports__.default
}
if (typeof __vue_options__ === "function") {
  __vue_options__ = __vue_options__.options
}
__vue_options__.__file = "F:\\weex项目\\办理定金\\earnestMoney\\src\\index.vue"
__vue_options__.render = __vue_template__.render
__vue_options__.staticRenderFns = __vue_template__.staticRenderFns
__vue_options__._scopeId = "data-v-1a4d8e3c"
__vue_options__.style = __vue_options__.style || {}
__vue_styles__.forEach(function (module) {
  for (var name in module) {
    __vue_options__.style[name] = module[name]
  }
})
if (typeof __register_static_styles__ === "function") {
  __register_static_styles__(__vue_options__._scopeId, __vue_styles__)
}

module.exports = __vue_exports__


/***/ }),
/* 20 */
/***/ (function(module, exports) {

module.exports = {}

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
//
//
//
//
//
//

exports.default = {
  name: 'App',
  data: function data() {
    return {
      logo: 'https://gw.alicdn.com/tfs/TB1yopEdgoQMeJjy1XaXXcSsFXa-640-302.png'
    };
  }
};

/***/ }),
/* 22 */
/***/ (function(module, exports) {

module.exports={render:function (){var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;
  return _c('div', {
    staticClass: ["wrapper"]
  }, [_c('router-view')], 1)
},staticRenderFns: []}
module.exports.render._withStripped = true

/***/ })
/******/ ]);