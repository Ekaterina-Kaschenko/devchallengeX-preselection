webpackJsonp([7,10],{760:function(n,t,e){"use strict";function o(){var n=arguments.length<=0||void 0===arguments[0]?c:arguments[0],t=arguments[1],o=void 0;switch(t.type){case u.a:return n.set("loadError",t.error);case u.b:return n.set("currentPoint",e.i(r.fromJS)(t.point));case u.c:return n.setIn(["currentPoint","name"],t.name);case u.d:return n.setIn(["currentPoint","lat"],t.lat);case u.e:return n.setIn(["currentPoint","lon"],t.lon);case u.f:return n.setIn(["connection","to"],t.to.value).setIn(["connection","name"],t.to.label);case u.g:return n.setIn(["connection","type"],t.newType);case u.h:return n.setIn(["connection","minutes"],t.minutes);case u.i:return n.setIn(["connection","seconds"],t.seconds);case u.j:return n.setIn(["connection","routes"],t.routes);case u.k:return o=n.get("connection").toJS(),o.cost=60*o.minutes+o.seconds,o.routes=o.routes.split(",").filter(function(n){return n}),o.id=o.to+"-"+o.type,n.setIn(["currentPoint","connections"],n.getIn(["currentPoint","connections"]).concat([o])).set("connection",e.i(r.fromJS)({to:"",name:"",type:"bus",minutes:0,seconds:0,routes:""}));default:return n}}var r=e(91),i=r&&r.__esModule?function(){return r["default"]}:function(){return r};e.d(i,"a",i);var u=e(857),c=e.i(r.fromJS)({currentPoint:!1,loadError:"",connection:{to:"",name:"",type:"bus",minutes:0,seconds:0,routes:""}});t["default"]=o},857:function(n,t,e){"use strict";e.d(t,"c",function(){return o}),e.d(t,"d",function(){return r}),e.d(t,"e",function(){return i}),e.d(t,"l",function(){return u}),e.d(t,"b",function(){return c}),e.d(t,"a",function(){return a}),e.d(t,"m",function(){return s}),e.d(t,"n",function(){return d}),e.d(t,"o",function(){return E}),e.d(t,"f",function(){return P}),e.d(t,"g",function(){return p}),e.d(t,"h",function(){return f}),e.d(t,"i",function(){return N}),e.d(t,"j",function(){return _}),e.d(t,"k",function(){return C});var o="app/PointEditPage/CHANGE_NAME",r="app/PointEditPage/CHANGE_LAT",i="app/PointEditPage/CHANGE_LON",u="app/PointEditPage/LOAD_CURRENT_POINT",c="app/PointEditPage/LOAD_CURRENT_POINT_SUCCESS",a="app/PointEditPage/LOAD_CURRENT_POINT_ERROR",s="app/PointEditPage/SAVE_CURRENT_POINT",d="app/PointEditPage/SAVE_CURRENT_POINT_SUCCESS",E="app/PointEditPage/SAVE_CURRENT_POINT_ERROR",P="app/PointEditPage/CHANGE_TO",p="app/PointEditPage/CHANGE_TYPE",f="app/PointEditPage/CHANGE_MINUTES",N="app/PointEditPage/CHANGE_SECONDS",_="app/PointEditPage/CHANGE_ROUTES",C="app/PointEditPage/SAVE_CURRENT_CONNECTION"}});