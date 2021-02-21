import{useState as r,useEffect as t}from"react";function n(n,o){void 0===o&&(o=300);var e=0===o,i=r(void 0),u=i[0],c=i[1];return t(function(){var r=setTimeout(function(){c(n)},o);return function(){return clearTimeout(r)}},[o,e,n]),e?n:u}export{n as useDebounced};
//# sourceMappingURL=index.m.js.map
