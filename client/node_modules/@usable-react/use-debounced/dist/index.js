var e=require("react");exports.useDebounced=function(t,r){void 0===r&&(r=300);var u=0===r,n=e.useState(void 0),o=n[0],i=n[1];return e.useEffect(function(){var e=setTimeout(function(){i(t)},r);return function(){return clearTimeout(e)}},[r,u,t]),u?t:o};
//# sourceMappingURL=index.js.map
