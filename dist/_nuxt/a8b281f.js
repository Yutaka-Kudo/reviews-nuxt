(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{429:function(t,e,n){var content=n(452);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[t.i,content,""]]),content.locals&&(t.exports=content.locals);(0,n(16).default)("17bb9a9c",content,!0,{sourceMap:!1})},451:function(t,e,n){"use strict";n(429)},452:function(t,e,n){var r=n(15)(!1);r.push([t.i,".scroll-enter-active[data-v-6be01184]{transform-origin:left;transition:all 1s 1s}.scroll-enter[data-v-6be01184]{transform:translateX(100%)}.scroll-enter-to[data-v-6be01184]{transform:translateX(0)}.scroll-leave-active[data-v-6be01184]{transform-origin:left;transition:all 1s;position:absolute}.scroll-leave-to[data-v-6be01184]{transform:translateX(-100%)}",""]),t.exports=r},491:function(t,e,n){"use strict";n.r(e);var r={transition:{name:"scroll",mode:""}},o=(n(451),n(64)),l=n(80),c=n.n(l),f=n(484),d=(n(5),n(10),n(11),n(12),n(2)),v=(n(48),n(54),n(29),n(9),n(35),n(65),n(430),n(17),n(36),n(431),n(432),n(433),n(434),n(435),n(436),n(437),n(438),n(439),n(440),n(441),n(442),n(443),n(39),n(8),n(396),n(1)),y=n(95),j=n(0);function O(object,t){var e=Object.keys(object);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(object);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(object,t).enumerable}))),e.push.apply(e,n)}return e}function w(t){for(var i=1;i<arguments.length;i++){var source=null!=arguments[i]?arguments[i]:{};i%2?O(Object(source),!0).forEach((function(e){Object(d.a)(t,e,source[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(source)):O(Object(source)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(source,e))}))}return t}var m=["sm","md","lg","xl"],h=["start","end","center"];function C(t,e){return m.reduce((function(n,r){return n[t+Object(j.v)(r)]=e(),n}),{})}var S=function(t){return[].concat(h,["baseline","stretch"]).includes(t)},k=C("align",(function(){return{type:String,default:null,validator:S}})),P=function(t){return[].concat(h,["space-between","space-around"]).includes(t)},_=C("justify",(function(){return{type:String,default:null,validator:P}})),x=function(t){return[].concat(h,["space-between","space-around","stretch"]).includes(t)},D=C("alignContent",(function(){return{type:String,default:null,validator:x}})),E={align:Object.keys(k),justify:Object.keys(_),alignContent:Object.keys(D)},J={align:"align",justify:"justify",alignContent:"align-content"};function M(t,e,n){var r=J[t];if(null!=n){if(e){var o=e.replace(t,"");r+="-".concat(o)}return(r+="-".concat(n)).toLowerCase()}}var V=new Map,X=v.a.extend({name:"v-row",functional:!0,props:w(w(w({tag:{type:String,default:"div"},dense:Boolean,noGutters:Boolean,align:{type:String,default:null,validator:S}},k),{},{justify:{type:String,default:null,validator:P}},_),{},{alignContent:{type:String,default:null,validator:x}},D),render:function(t,e){var n=e.props,data=e.data,r=e.children,o="";for(var l in n)o+=String(n[l]);var c=V.get(o);return c||function(){var t,e;for(e in c=[],E)E[e].forEach((function(t){var r=n[t],o=M(e,t,r);o&&c.push(o)}));c.push((t={"no-gutters":n.noGutters,"row--dense":n.dense},Object(d.a)(t,"align-".concat(n.align),n.align),Object(d.a)(t,"justify-".concat(n.justify),n.justify),Object(d.a)(t,"align-content-".concat(n.alignContent),n.alignContent),t)),V.set(o,c)}(),t(n.tag,Object(y.a)(data,{staticClass:"row",class:c}),r)}}),component=Object(o.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("v-row",[n("v-col",{staticClass:"text-center"},[n("img",{staticClass:"mb-5",attrs:{src:"/v.png",alt:"Vuetify.js"}}),t._v(" "),n("blockquote",{staticClass:"blockquote"},[t._v("\n            “First, solve the problem. Then, write the code.”\n            "),n("footer",[n("small",[n("em",[t._v("—John Johnson")])])])])])],1)}),[],!1,null,"6be01184",null);e.default=component.exports;c()(component,{VCol:f.a,VRow:X})}}]);