(function(e){function t(t){for(var r,a,i=t[0],s=t[1],c=t[2],d=0,l=[];d<i.length;d++)a=i[d],Object.prototype.hasOwnProperty.call(o,a)&&o[a]&&l.push(o[a][0]),o[a]=0;for(r in s)Object.prototype.hasOwnProperty.call(s,r)&&(e[r]=s[r]);p&&p(t);while(l.length)l.shift()();return u.push.apply(u,c||[]),n()}function n(){for(var e,t=0;t<u.length;t++){for(var n=u[t],r=!0,a=1;a<n.length;a++){var i=n[a];0!==o[i]&&(r=!1)}r&&(u.splice(t--,1),e=s(s.s=n[0]))}return e}var r={},a={app:0},o={app:0},u=[];function i(e){return s.p+"js/"+({admin:"admin","change-password":"change-password",demo:"demo",home:"home"}[e]||e)+"."+{admin:"8721dee1","change-password":"517d50c1",demo:"b6e40079",home:"5e753c14"}[e]+".js"}function s(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={admin:1,"change-password":1,demo:1,home:1};a[e]?t.push(a[e]):0!==a[e]&&n[e]&&t.push(a[e]=new Promise((function(t,n){for(var r="css/"+({admin:"admin","change-password":"change-password",demo:"demo",home:"home"}[e]||e)+"."+{admin:"ff0081ee","change-password":"56e8950f",demo:"445ac625",home:"b19a6f36"}[e]+".css",o=s.p+r,u=document.getElementsByTagName("link"),i=0;i<u.length;i++){var c=u[i],d=c.getAttribute("data-href")||c.getAttribute("href");if("stylesheet"===c.rel&&(d===r||d===o))return t()}var l=document.getElementsByTagName("style");for(i=0;i<l.length;i++){c=l[i],d=c.getAttribute("data-href");if(d===r||d===o)return t()}var p=document.createElement("link");p.rel="stylesheet",p.type="text/css",p.onload=t,p.onerror=function(t){var r=t&&t.target&&t.target.src||o,u=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");u.code="CSS_CHUNK_LOAD_FAILED",u.request=r,delete a[e],p.parentNode.removeChild(p),n(u)},p.href=o;var f=document.getElementsByTagName("head")[0];f.appendChild(p)})).then((function(){a[e]=0})));var r=o[e];if(0!==r)if(r)t.push(r[2]);else{var u=new Promise((function(t,n){r=o[e]=[t,n]}));t.push(r[2]=u);var c,d=document.createElement("script");d.charset="utf-8",d.timeout=120,s.nc&&d.setAttribute("nonce",s.nc),d.src=i(e);var l=new Error;c=function(t){d.onerror=d.onload=null,clearTimeout(p);var n=o[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),a=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+a+")",l.name="ChunkLoadError",l.type=r,l.request=a,n[1](l)}o[e]=void 0}};var p=setTimeout((function(){c({type:"timeout",target:d})}),12e4);d.onerror=d.onload=c,document.head.appendChild(d)}return Promise.all(t)},s.m=e,s.c=r,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)s.d(n,r,function(t){return e[t]}.bind(null,r));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/",s.oe=function(e){throw console.error(e),e};var c=window["webpackJsonp"]=window["webpackJsonp"]||[],d=c.push.bind(c);c.push=t,c=c.slice();for(var l=0;l<c.length;l++)t(c[l]);var p=d;u.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("cd49")},1:function(e,t){},"7bc0":function(e,t,n){"use strict";n("da9e")},"7dfa":function(e,t,n){"use strict";n("8009")},8009:function(e,t,n){},cd49:function(e,t,n){"use strict";n.r(t);n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("2b0e"),a=n("ee98"),o=n.n(a),u=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"app",attrs:{id:"app"}},[n("notifications"),n("router-view")],1)},i=[],s=r["default"].extend({name:"App",mounted:function(){document.documentElement.style.setProperty("--vh","".concat(window.innerHeight,"px")),window.addEventListener("resize",(function(){document.documentElement.style.setProperty("--vh","".concat(window.innerHeight,"px"))})),this.$store.dispatch("login")}}),c=s,d=(n("7bc0"),n("7dfa"),n("2877")),l=Object(d["a"])(c,u,i,!1,null,"5ba625af",null),p=l.exports,f=(n("d3b7"),n("3ca3"),n("ddb0"),n("8c4f"));r["default"].use(f["a"]);var m=[{path:"/",name:"home",component:function(){return n.e("home").then(n.bind(null,"bb51"))}},{path:"/demo",name:"demo",component:function(){return n.e("demo").then(n.bind(null,"680c"))}},{path:"/change-password",name:"change-password",component:function(){return n.e("change-password").then(n.bind(null,"0060"))}},{path:"/admin",name:"admin",component:function(){return n.e("admin").then(n.bind(null,"3530"))}}],h=new f["a"]({mode:"history",base:"/",routes:m}),g=h,v=n("5530"),b=n("1da1"),w=(n("96cf"),n("2f62")),y=n("d106");r["default"].use(w["b"]);var x=5e3,O=new w["a"]({state:{id:null,isLoading:!0,username:null,client:y["a"]},mutations:{setLoading:function(e){var t=!(arguments.length>1&&void 0!==arguments[1])||arguments[1];e.isLoading=t},setUser:function(e,t){var n,r;e.isLoading=!1,e.username=null!==(n=null===t||void 0===t?void 0:t.username)&&void 0!==n?n:null,e.id=null!==(r=null===t||void 0===t?void 0:t._id)&&void 0!==r?r:null}},getters:{isLoggedin:function(e){return null!==e.username}},actions:{login:function(e,t){return Object(b["a"])(regeneratorRuntime.mark((function n(){var a,o,u,i,s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:if(a=e.commit,n.prev=1,t){n.next=10;break}return n.next=5,y["a"].reAuthenticate();case 5:o=n.sent,u=o.user,a("setUser",u),n.next=16;break;case 10:return a("setLoading"),n.next=13,y["a"].authenticate(Object(v["a"])({strategy:"local"},t));case 13:i=n.sent,s=i.user,setTimeout((function(){return a("setUser",s)}),100);case 16:return n.abrupt("return",!0);case 19:return n.prev=19,n.t0=n["catch"](1),t?(a("setUser",null),r["default"].notify({title:"Failed to login",text:n.t0.message,type:"error",duration:x})):a("setLoading",!1),n.abrupt("return",!1);case 23:case"end":return n.stop()}}),n,null,[[1,19]])})))()},signup:function(e,t){return Object(b["a"])(regeneratorRuntime.mark((function n(){var a,o,u,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.commit,o=t.credentials,u=t.otp,a("setLoading"),n.prev=3,n.next=6,y["a"].service("users").create(o,{query:{otp:u}});case 6:return i=n.sent,setTimeout((function(){return a("setUser",i)}),100),n.abrupt("return",!0);case 11:return n.prev=11,n.t0=n["catch"](3),console.error(n.t0),a("setUser",null),r["default"].notify({title:"Failed to sign up",text:n.t0.message,type:"error",duration:x}),n.abrupt("return",!1);case 17:case"end":return n.stop()}}),n,null,[[3,11]])})))()},logout:function(e){return Object(b["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return n=e.commit,t.prev=1,t.next=4,y["a"].logout();case 4:return setTimeout((function(){return n("setUser",null)}),100),t.abrupt("return",!0);case 8:return t.prev=8,t.t0=t["catch"](1),console.error(t.t0),r["default"].notify({title:"Failed to logout",text:t.t0.message,type:"error",duration:x}),t.abrupt("return",!1);case 13:case"end":return t.stop()}}),t,null,[[1,8]])})))()},changePassword:function(e,t){return Object(b["a"])(regeneratorRuntime.mark((function n(){var a,o,u,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return a=e.state,o=e.dispatch,n.prev=1,i=null!==(u=a.username)&&void 0!==u?u:"",n.next=5,y["a"].service("users").update(a.id,{username:i,password:t});case 5:return n.next=7,o("login",{username:i,password:t});case 7:return r["default"].notify("Sucesfully changed password"),n.abrupt("return",!0);case 11:return n.prev=11,n.t0=n["catch"](1),console.error(n.t0),r["default"].notify({title:"Failed to change password",text:n.t0.message,type:"error",duration:x}),n.abrupt("return",!1);case 16:case"end":return n.stop()}}),n,null,[[1,11]])})))()}}});r["default"].config.productionTip=!1,r["default"].use(o.a),new r["default"]({router:g,store:O,render:function(e){return e(p)}}).$mount("#app")},d106:function(e,t,n){"use strict";n("d3b7");var r=n("0330"),a=n.n(r),o=n("8af1"),u=n.n(o),i=n("3390"),s=n.n(i),c=a()(),d=!window.webpackHotUpdate,l=d?s()():s()("http://localhost:5000");c.configure(u()()),c.configure(l.fetch(fetch)),t["a"]=c},da9e:function(e,t,n){}});
//# sourceMappingURL=app.314d0c26.js.map