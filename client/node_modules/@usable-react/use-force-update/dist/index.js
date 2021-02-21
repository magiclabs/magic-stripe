var e=require("react");exports.useForceUpdate=function(){var r=e.useState(0),t=r[0],u=r[1];return e.useCallback(function(){return u(t+1)},[t])};
//# sourceMappingURL=index.js.map
