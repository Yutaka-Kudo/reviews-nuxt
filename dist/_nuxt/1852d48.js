(window.webpackJsonp=window.webpackJsonp||[]).push([[17,12],{396:function(e,t,n){var content=n(408);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(14).default)("4a4a2ad0",content,!0,{sourceMap:!1})},397:function(e,t,n){var content=n(410);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(14).default)("e989780e",content,!0,{sourceMap:!1})},404:function(e,t,n){"use strict";n.r(t);n(36);var r={props:{store_name:String},filters:{store_name_view_xs:function(text){return text.length>32?text.slice(0,32)+"...":text},store_name_view_sm:function(text){return text.length>36?text.slice(0,36)+"...":text}}},o=(n(407),n(56)),l=n(63),c=n.n(l),_=n(507),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"tooltip text-center d-flex align-center justify-space-around"},[n("v-tooltip",{attrs:{top:""},scopedSlots:e._u([{key:"activator",fn:function(t){var r=t.on,o=t.attrs;return[n("span",e._g(e._b({staticClass:"store_name d-sm-none"},"span",o,!1),r),[e._v("\n                "+e._s(e._f("store_name_view_xs")(e.store_name))+"\n            ")]),e._v(" "),n("span",e._g(e._b({staticClass:"store_name d-none d-sm-flex"},"span",o,!1),r),[n("span",[e._v("\n                    "+e._s(e.store_name)+"\n                ")])])]}}])},[e._v(" "),n("span",[e._v(e._s(e.store_name))])])],1)}),[],!1,null,"06e8162e",null);t.default=component.exports;c()(component,{VTooltip:_.a})},405:function(e,t,n){var content=n(417);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(14).default)("6053390d",content,!0,{sourceMap:!1})},406:function(e,t,n){var content=n(423);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(14).default)("1e2297d4",content,!0,{sourceMap:!1})},407:function(e,t,n){"use strict";n(396)},408:function(e,t,n){var r=n(13)(!1);r.push([e.i,"span[data-v-06e8162e]{display:inline-block}.store_name[data-v-06e8162e],.tooltip[data-v-06e8162e]{overflow:hidden}@media screen and (min-width:960px){.store_name span[data-v-06e8162e]{word-break:break-word;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}}@media screen and (max-width:960px){.store_name span[data-v-06e8162e]{word-break:break-word}}",""]),e.exports=r},409:function(e,t,n){"use strict";n(397)},410:function(e,t,n){var r=n(13)(!1);r.push([e.i,".rate[data-v-f5f56192]{display:inline-block}",""]),e.exports=r},413:function(e,t,n){"use strict";n.r(t);n(8),n(48),n(36),n(254),n(21),n(88),n(81);var r={components:{Tooltips:n(404).default},data:function(){return{scrollY:0}},props:{media_data_list_by_store:Array,content_list:Array,seen_whole:Boolean},methods:{show_detail:function(content){content.seen=!content.seen;var e=document.getElementsByClassName("rev_head_opened"),t=document.getElementsByClassName("mini_name"),n=document.getElementsByClassName("v-app-bar")[0];setTimeout((function(){new MutationObserver((function(){document.getElementsByClassName("v-app-bar--hide-shadow")[0]?(e.forEach((function(e){e.classList.remove("rev_head_opened_with_header")})),t.forEach((function(e){e.classList.remove("mini_name_with_header")}))):(e.forEach((function(e){e.classList.add("rev_head_opened_with_header")})),t.forEach((function(e){e.classList.add("mini_name_with_header")})))})).observe(n,{attributes:!0})}),5)},close_detail:function(content){content.seen=!content.seen}},computed:{review_obj_list:function(){return console.log("child compu"),this.$store.getters.store_list}},mounted:function(){},filters:{content_view:function(text){return text.length>100?text.slice(0,100)+"...":text},rate_for_star:function(text){return Number(text).toFixed(1)},category_view:function(e){return e.join(" - ")},Ym:function(text){return text.slice(0,-3)},if_zero:function(text){return"0.0"!=text&&text?text:" -"},trim:function(text){return text.trim()}}},o=(n(416),n(56)),l=n(63),c=n.n(l),_=n(400),d=n(395),f=n(455),m=n(456),v=n(97),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.seen_whole,expression:"seen_whole"}]},[e.media_data_list_by_store.length?e._e():n("div",{staticClass:"get_failed"},[e._m(0)]),e._v(" "),e._l(e.media_data_list_by_store,(function(t){return n("v-card",{key:t.id,staticClass:"item mb-15",attrs:{elevation:"3",outlines:"",loading:t.loading}},[n("div",{staticClass:"card_head d-flex flex-column align-center"},[n("span",{staticClass:"area"},[e._v("\n                エリア："+e._s(t[0].store.area.area_name)+"\n            ")]),e._v(" "),n("span",{staticClass:"area"},[e._v("\n                "+e._s(t[0].store.address)+"\n            ")]),e._v(" "),n("div",{staticClass:"\n                    head_top\n                    d-flex\n                    flex-column\n                    align-center\n                    flex-sm-row\n                    justify-sm-center\n                "},[n("v-card-title",{staticClass:"\n                        store_name\n                        text-h5\n                        pb-1 pb-sm-0\n                        d-flex\n                        flex-nowrap\n                    "},[n("span",{class:{uber_limited:t.uber_only}}),e._v(" "),n("Tooltips",{attrs:{store_name:t[0].store.store_name}})],1),e._v(" "),n("span",{staticClass:"\n                        rate_num_total\n                        align-self-sm-end\n                        flex-sm-shrink-0\n                        mr-sm-2\n                    "},[e._v(e._s("0.00"==t[0].store.total_rate?" -":t[0].store.total_rate)+"\n                    "),n("RateStar",{attrs:{value:t[0].store.total_rate}})],1)],1),e._v(" "),n("span",{staticClass:"category"},[e._v("\n                "+e._s(e._f("category_view")(t.category))+"\n            ")])]),e._v(" "),n("div",{staticClass:"d-flex flex-wrap justify-sm-center"},e._l(t,(function(t){return n("v-card-subtitle",{key:t.id,staticClass:"rate_by_media pb-1"},[n("div",{staticClass:"d-flex flex-column"},[n("div",{staticClass:"d-flex justify-center"},["Google"==t.media_type.official_name?n("div",[n("p",{staticClass:"media_link d-sm-none"},[n("a",{attrs:{href:"https://www.google.com/search?tbs=lf:1,lf_ui:9&tbm=lcl&q=千葉県船橋市+飲食店+"+t.store.store_name,target:"_blank"}},[e._v("\n                                    "+e._s(t.media_type.official_name)+"\n                                ")])]),e._v(" "),n("p",{staticClass:"media_link d-none d-sm-flex"},[t.url?n("a",{attrs:{href:t.url,target:"_blank"}},[e._v("\n                                    "+e._s(t.media_type.official_name)+"\n                                ")]):n("span",[e._v("\n                                    "+e._s(t.media_type.official_name)+"\n                                ")])])]):n("div",[n("p",{staticClass:"media_link"},[n("a",{attrs:{href:t.url,target:"_blank"}},[e._v(e._s(t.media_type.official_name))])])]),e._v(" "),n("span",{staticClass:"review_count ml-2"},[e._v(e._s(e._f("if_zero")(t.review_count)))])]),e._v(" "),!t.review_count||"Google"!=t.media_type.official_name&&"食べログ"!=t.media_type.official_name&&"UberEats"!=t.media_type.official_name&&"ぐるなび"!=t.media_type.official_name?e._e():n("span",[n("b",[e._v(e._s(t.rate))]),e._v(" "),n("RateStar",{staticClass:"star",attrs:{value:t.rate}})],1),e._v(" "),t.collected?n("span",{staticClass:"collected_date"},[e._v("\n                        収集日"+e._s(t.collected)+"\n                    ")]):e._e()])])})),1),e._v(" "),e._l(e.content_list,(function(content){return n("div",{key:content.id},[content.store_id===t[0].store.id?n("v-divider",{attrs:{inset:""}}):e._e(),e._v(" "),content.store_id===t[0].store.id?n("v-card-text",{staticClass:"\n                    rev_item\n                    d-flex\n                    flex-column\n                    align-center\n                    flex-sm-row\n                    justify-sm-space-between\n                "},[content.seen?n("span",{staticClass:"mini_name d-sm-none"},[e._v("\n                    "+e._s(t[0].store.store_name)+"\n                ")]):e._e(),e._v(" "),n("v-chip",{staticClass:"rev_head d-sm-none mb-2 align-self-center",class:{rev_head_opened:1==content.seen}},[n("span",{staticClass:"review_date"},[e._v(e._s(e._f("Ym")(content.review_date)))]),e._v(" "),"Google"==content.media_type||"食べログ"==content.media_type||"ぐるなび"==content.media_type?n("span",{staticClass:"rate ml-3"},[n("b",[e._v(e._s(e._f("rate_for_star")(content.review_point)))])]):e._e(),e._v(" "),"Google"==content.media_type||"食べログ"==content.media_type||"ぐるなび"==content.media_type?n("span",{staticClass:"star"},[n("RateStar",{attrs:{value:content.review_point}})],1):e._e()]),e._v(" "),n("v-card",{staticClass:"\n                        rev_head\n                        d-none d-sm-flex\n                        flex-sm-column\n                        align-sm-center align-self-sm-start\n                        mr-3\n                        flex-sm-shrink-0\n                    ",class:{"rev_head_opened mt-6":1==content.seen},attrs:{height:"auto",width:"110",elevation:"5"}},[n("span",{staticClass:"review_date"},[e._v(e._s(e._f("Ym")(content.review_date)))]),e._v(" "),"Google"==content.media_type||"食べログ"==content.media_type||"ぐるなび"==content.media_type?n("span",{staticClass:"rate ml-3"},[n("b",[e._v(e._s(e._f("rate_for_star")(content.review_point)))])]):e._e(),e._v(" "),"Google"==content.media_type||"食べログ"==content.media_type||"ぐるなび"==content.media_type?n("span",{staticClass:"star"},[n("RateStar",{attrs:{value:content.review_point}})],1):e._e()]),e._v(" "),n("div",{staticClass:"rev_content flex-sm-grow-1 flex-sm-shrink-1"},[content.seen?e._e():n("div",{staticClass:"rev_content_text",class:{continue:content.content.length>100},on:{click:function(t){return e.show_detail(content)}}},[e._v("\n                        "+e._s(e._f("content_view")(content.content))+"\n                    ")]),e._v(" "),n("v-expand-transition",[n("div",{directives:[{name:"show",rawName:"v-show",value:content.seen,expression:"content['seen']"}],on:{click:function(t){return e.close_detail(content)}}},[n("div",{staticClass:"\n                                    rev_content_text rev_content_text_detail\n                                "},[e._v("\n                                "+e._s(e._f("trim")(content.content))+"\n                            ")])])])],1),e._v(" "),n("b",{staticClass:"media_type align-self-end flex-sm-shrink-0"},[e._v("\n                    "+e._s("ぐるなび"==content.media_type?"TripAdvisor":content.media_type)+"\n                ")])],1):e._e()],1)}))],2)}))],2)}),[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("b",[e._v("\n            該当する店舗データがありません..."),n("br"),n("br"),e._v("\n            やり直してください"),n("br")])}],!1,null,"18ecb59e",null);t.default=component.exports;c()(component,{Tooltips:n(404).default,RateStar:n(414).default}),c()(component,{VCard:_.a,VCardSubtitle:d.a,VCardText:d.b,VCardTitle:d.c,VChip:f.a,VDivider:m.a,VExpandTransition:v.a})},414:function(e,t,n){"use strict";n.r(t);n(21),n(254);var r={components:{RateStar:d},props:{value:String},filters:{rate_for_star:function(text){return Number(Number(text).toFixed(1))}}},o=(n(409),n(56)),l=n(63),c=n.n(l),_=n(449),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement;return(e._self._c||t)("v-rating",{staticClass:"rate",attrs:{size:"18",dense:"",color:"orange","background-color":"grey","half-increments":"",readonly:"",value:e._f("rate_for_star")(e.value)}})}),[],!1,null,"f5f56192",null),d=t.default=component.exports;c()(component,{VRating:_.a})},416:function(e,t,n){"use strict";n(405)},417:function(e,t,n){var r=n(13)(!1);r.push([e.i,'.v-card__text[data-v-18ecb59e]{background-color:hsla(0,0%,98%,.8)}.head_top[data-v-18ecb59e]{width:100%}.store_name[data-v-18ecb59e]{overflow:hidden}.rate_num_total[data-v-18ecb59e]:before{content:"総合";font-size:13px}.area[data-v-18ecb59e],.category[data-v-18ecb59e]{font-size:13px}.media_link[data-v-18ecb59e]{text-align:center;margin-bottom:0}.rate_by_media[data-v-18ecb59e]{display:inline-block}.item[data-v-18ecb59e]{background-color:hsla(0,0%,100%,.85);-webkit-animation:list-scroll-data-v-18ecb59e .5s;animation:list-scroll-data-v-18ecb59e .5s}@-webkit-keyframes list-scroll-data-v-18ecb59e{0%{opacity:0}to{opacity:1}}@keyframes list-scroll-data-v-18ecb59e{0%{opacity:0}to{opacity:1}}.media_type[data-v-18ecb59e]:before{content:"by ";font-size:13px}.review_date[data-v-18ecb59e]:after{content:"月";font-size:13px}.review_count[data-v-18ecb59e]:after{content:"件";font-size:13px}.mini_name[data-v-18ecb59e]{top:2px;transition:top .2s cubic-bezier(.4,0,.2,1) .2s}.mini_name[data-v-18ecb59e],.mini_name_with_header[data-v-18ecb59e]{background:#e0e0e0;border-radius:8px;position:sticky}.mini_name_with_header[data-v-18ecb59e]{top:82px}.rev_head_opened[data-v-18ecb59e]{position:sticky;top:24px;transition:top .2s cubic-bezier(.4,0,.2,1) .2s}.rev_head_opened_with_header[data-v-18ecb59e]{position:sticky;top:99px}.rev_content_text_detail[data-v-18ecb59e]{white-space:pre-line}.media_type[data-v-18ecb59e]{flex-basis:auto}.continue[data-v-18ecb59e]:after{content:"続き";margin-left:5px}.continue[data-v-18ecb59e]:after,.uber_limited[data-v-18ecb59e]:before{display:inline-block;white-space:pre;font-size:13px;background:#ff9f80;color:#fff;padding:1px 5px;line-height:13px;border-radius:3px}.uber_limited[data-v-18ecb59e]:before{content:"Uber\\A限定";margin:0 5px}@media screen and (max-width:600px){.rate_by_media[data-v-18ecb59e]{width:50%}}.list_scroll-enter-active[data-v-18ecb59e],.list_scroll-leave-active[data-v-18ecb59e]{transition:all 3s}.list_scroll-enter[data-v-18ecb59e],.list_scroll-leave-to[data-v-18ecb59e]{transform:translateX(120%)}',""]),e.exports=r},422:function(e,t,n){"use strict";n(406)},423:function(e,t,n){var r=n(13)(!1);r.push([e.i,".v-pagination>li{align-items:center;display:flex;align-self:flex-end}.v-pagination__more{margin:.3rem;display:inline-flex;align-items:flex-end;justify-content:center;height:13px;width:32px;background:#fff;border-radius:4px}",""]),e.exports=r},431:function(e,t,n){"use strict";n.r(t);n(21);var r={data:function(){return{page:1,lists:[],viewLists:[],pageSize:10}},props:{page_is_disabled:Boolean,page_length:Number},created:function(){console.log(this.page_length)},methods:{page_change:function(e){return this.$emit("page_change",e)}}},o=(n(422),n(56)),l=n(63),c=n.n(l),_=n(457),component=Object(o.a)(r,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"text-center"},[n("v-pagination",{attrs:{length:e.page_length,"total-visible":"8",disabled:e.page_is_disabled},on:{input:e.page_change},model:{value:e.page,callback:function(t){e.page=t},expression:"page"}})],1)}),[],!1,null,null,null);t.default=component.exports;c()(component,{VPagination:_.a})},475:function(e,t,n){var content=n(497);content.__esModule&&(content=content.default),"string"==typeof content&&(content=[[e.i,content,""]]),content.locals&&(e.exports=content.locals);(0,n(14).default)("03ac349c",content,!0,{sourceMap:!1})},496:function(e,t,n){"use strict";n(475)},497:function(e,t,n){var r=n(13)(!1);r.push([e.i,".store_list_wrap[data-v-1726931b]{padding-top:80px}.store_list_wrap[data-v-1726931b]::-webkit-scrollbar{display:none}@media screen and (max-width:600px){.store_list_wrap[data-v-1726931b]{padding-top:80px}}@-webkit-keyframes opaMove-data-v-1726931b{0%{background-color:transparent}to{background-color:rgba(0,0,0,.5)}}@keyframes opaMove-data-v-1726931b{0%{background-color:transparent}to{background-color:rgba(0,0,0,.5)}}.scroll-enter-active[data-v-1726931b]{transition:all 1s}.scroll-leave-active[data-v-1726931b]{transition:all 1s;position:absolute}.scroll-enter[data-v-1726931b],.scroll-leave-to[data-v-1726931b]{transform:translateX(120%)}",""]),e.exports=r},512:function(e,t,n){"use strict";n.r(t);n(25),n(52),n(7),n(50),n(58);var r=n(89),o=n(17);n(60),n(9),n(21),n(36),n(80),n(49),n(144),n(145),n(37),n(39),n(18),n(48);function l(e,t){var n="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(!n){if(Array.isArray(e)||(n=function(e,t){if(!e)return;if("string"==typeof e)return c(e,t);var n=Object.prototype.toString.call(e).slice(8,-1);"Object"===n&&e.constructor&&(n=e.constructor.name);if("Map"===n||"Set"===n)return Array.from(e);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return c(e,t)}(e))||t&&e&&"number"==typeof e.length){n&&(e=n);var i=0,r=function(){};return{s:r,n:function(){return i>=e.length?{done:!0}:{done:!1,value:e[i++]}},e:function(e){throw e},f:r}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}var o,l=!0,_=!1;return{s:function(){n=n.call(e)},n:function(){var e=n.next();return l=e.done,e},e:function(e){_=!0,o=e},f:function(){try{l||null==n.return||n.return()}finally{if(_)throw o}}}}function c(e,t){(null==t||t>e.length)&&(t=e.length);for(var i=0,n=new Array(t);i<t;i++)n[i]=e[i];return n}var _,d,f,m,v={components:{ShowStoreList:n(413).default},data:function(){return{media_data_list_by_store:[],media_data_list_by_store_next:[],content_list:[],content_list_next:[],seen_whole:!0,selected_area:{},pages:{page_size:10,now_page:1,page_length:0},page_is_disabled:!1}},asyncData:function(e){return Object(o.a)(regeneratorRuntime.mark((function t(){var n,r,o,c,_,d,f,m,v,h,y,x,w,k,C,j,S,O,z,R,E,$,M,N,T,V;return regeneratorRuntime.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:if(n=e.$axios,e.store,r=e.route,!(o=e.payload)){t.next=38;break}console.log("payloadldllllllllll"),c=o.area,console.log("slelctlek",c.area_name),_=o.stores,(d=_.filter((function(e){return e.total_review_count>=20&&0!=e.total_rate}))).sort((function(e,t){return Number(e.total_rate)>Number(t.total_rate)?-1:1})),f=d.slice(0,10),m=[],v=[],h=l(f),t.prev=12,h.s();case 14:if((y=h.n()).done){t.next=27;break}return x=y.value,t.next=18,n.get("api/media_data?store=".concat(x.id)).then((function(e){return e.data})).catch((function(e){console.log("axiosエラー ranking.vue 88: ",e)}));case 18:return w=t.sent,m.push(w),t.next=22,n.get("api/reviews?media__store=".concat(x.id)).then((function(e){return e.data})).catch((function(e){console.log("axiosエラー ranking.vue 98: ",e)}));case 22:k=t.sent,v.push(k),console.log("get md & content");case 25:t.next=14;break;case 27:t.next=32;break;case 29:t.prev=29,t.t0=t.catch(12),h.e(t.t0);case 32:return t.prev=32,h.f(),t.finish(32);case 35:return t.abrupt("return",{selected_area:c,basis_store_list:_,store_list:d,md_list:m,rev_list:v});case 38:return t.next=40,n.get("api/area/").then((function(e){return e.data})).catch((function(e){console.log(e)}));case 40:return C=t.sent,j=C.find((function(e){return e.id==r.params.area})),console.log("slelctlek",j),t.next=45,n.get("api/stores?area=".concat(r.params.area)).then((function(e){var t=e.data.filter((function(e){return e.total_review_count>=20&&0!=e.total_rate}));return t.sort((function(e,t){return Number(e.total_rate)>Number(t.total_rate)?-1:1})),{store_list:t,basis_store_list:e.data}}));case 45:S=t.sent,O=S.store_list,z=S.basis_store_list,R=O.slice(0,10),E=[],$=[],M=l(R),t.prev=52,M.s();case 54:if((N=M.n()).done){t.next=67;break}return x=N.value,t.next=58,n.get("api/media_data?store=".concat(x.id)).then((function(e){return e.data})).catch((function(e){console.log("axiosエラー ranking.vue 155: ",e)}));case 58:return T=t.sent,E.push(T),t.next=62,n.get("api/reviews?media__store=".concat(x.id)).then((function(e){return e.data})).catch((function(e){console.log("axiosエラー ranking.vue 165: ",e)}));case 62:V=t.sent,$.push(V),console.log("get md & content");case 65:t.next=54;break;case 67:t.next=72;break;case 69:t.prev=69,t.t1=t.catch(52),M.e(t.t1);case 72:return t.prev=72,M.f(),t.finish(72);case 75:return t.abrupt("return",{selected_area:j,basis_store_list:z,store_list:O,md_list:E,rev_list:$});case 76:case"end":return t.stop()}}),t,null,[[12,29,32,35],[52,69,72,75]])})))()},fetch:function(e){e.$axios,e.store,e.route},created:(m=Object(o.a)(regeneratorRuntime.mark((function e(){var t,n,o,c,_;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("crecre"),this.page_length=Math.ceil(this.store_list.length/this.pages.page_size),this.$store.commit("set_selected_area",this.selected_area),this.$store.commit("set_basis_store_list",this.basis_store_list),o=function(e){var t,n=[],r=l(e);try{var o=function(){(c=t.value).category=[c[0].store.category1,c[0].store.category2,c[0].store.category3],(c=c).uber_only="uber"==c.map((function(e){return e.media_type.media_type}));var e=["google","tb","hp","gn","retty","uber","demaekan","foodpanda"];c.sort((function(t,n){return e.indexOf(t.media_type.media_type)-e.indexOf(n.media_type.media_type)})),n.push(c)};for(r.s();!(t=r.n()).done;){var c;o()}}catch(e){r.e(e)}finally{r.f()}return n},(t=this.media_data_list_by_store).push.apply(t,Object(r.a)(o(this.md_list))),console.log("this.media_data_list_by_store",this.media_data_list_by_store),c=function(e){var t,n=arguments.length>1&&void 0!==arguments[1]&&arguments[1],r=[],o=l(e);try{for(o.s();!(t=o.n()).done;){var c=t.value,_=c.map((function(e){if(e.content)return{store_id:e.media.store.id,store_name:e.media.store.store_name,media_type:e.media.media_type.official_name,review_date:e.review_date,review_point:e.review_point,content:e.content,seen:!1}}));(_=_.flat(1)).sort((function(e,t){return e.review_date>t.review_date?-1:1})),r.push(_.slice(0,6)),r=r.flat(1),n?console.log("next!!!"):console.log("this page!!")}}catch(e){o.e(e)}finally{o.f()}return r},(n=this.content_list).push.apply(n,Object(r.a)(c(this.rev_list))),console.log("media_data_list_by_store",this.media_data_list_by_store),console.log("content_list",this.content_list),_=this.store_list.slice(10,20),e.next=15,this.create_data(_,!0);case 15:case"end":return e.stop()}}),e,this)}))),function(){return m.apply(this,arguments)}),mounted:(f=Object(o.a)(regeneratorRuntime.mark((function e(){return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:console.log("moumoummou"),this.$nuxt.$emit("update_header","store_list"),console.log(this.$route.params);case 3:case"end":return e.stop()}}),e,this)}))),function(){return f.apply(this,arguments)}),methods:{create_data:(d=Object(o.a)(regeneratorRuntime.mark((function e(t){var n,r,i,o,l=this,c=arguments;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:n=c.length>1&&void 0!==c[1]&&c[1],this.page_is_disabled=!0,n?(this.media_data_list_by_store_next.splice(0),this.content_list_next.splice(0)):(this.media_data_list_by_store.splice(0),this.content_list.splice(0)),r=regeneratorRuntime.mark((function e(){var r,c,_,d,f,m;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return o=t[i],r=[],e.next=4,l.$axios.get("api/media_data?store=".concat(o.id)).then((function(e){return e.data})).catch((function(e){console.log(e)}));case 4:return(c=e.sent).category=[c[0].store.category1,c[0].store.category2,c[0].store.category3],c.loading=!0,(r=c).uber_only="uber"==r.map((function(e){return e.media_type.media_type})),_=["google","tb","hp","gn","retty","uber","demaekan","foodpanda"],r.sort((function(e,t){return _.indexOf(e.media_type.media_type)-_.indexOf(t.media_type.media_type)})),n?l.media_data_list_by_store_next.push(r):l.media_data_list_by_store.push(r),d=[],e.next=15,l.$axios.get("api/reviews?media__store=".concat(o.id)).then((function(e){return e.data})).catch((function(e){console.log(e)}));case 15:f=e.sent,m=f.map((function(e){if(e.content)return{store_id:e.media.store.id,store_name:e.media.store.store_name,media_type:e.media.media_type.official_name,review_date:e.review_date,review_point:e.review_point,content:e.content,seen:!1}})),d.push(m),(d=d.flat(1)).sort((function(e,t){return e.review_date>t.review_date?-1:1})),n?(l.content_list_next.push(d.slice(0,6)),l.content_list_next=l.content_list_next.flat(1),console.log("next!!!")):(l.content_list.push(d.slice(0,6)),l.content_list=l.content_list.flat(1),console.log("this page!!")),r.loading=!1;case 22:case"end":return e.stop()}}),e)})),e.t0=regeneratorRuntime.keys(t);case 5:if((e.t1=e.t0()).done){e.next=10;break}return i=e.t1.value,e.delegateYield(r(),"t2",8);case 8:e.next=5;break;case 10:this.page_is_disabled=!1;case 11:case"end":return e.stop()}}),e,this)}))),function(e){return d.apply(this,arguments)}),page_change:(_=Object(o.a)(regeneratorRuntime.mark((function e(t){var n,o,l,c,_;return regeneratorRuntime.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(this.pages.now_page==t){e.next=24;break}if(this.pages.now_page+1!=t){e.next=17;break}return n=function(){o.seen_whole=!0},this.pages.now_page=t,this.seen_whole=!1,o=this,setTimeout(n,500),this.media_data_list_by_store=Object(r.a)(this.media_data_list_by_store_next),this.content_list=Object(r.a)(this.content_list_next),console.log(this.media_data_list_by_store),console.log(this.content_list),console.log(this.media_data_list_by_store==this.media_data_list_by_store_next),l=this.store_list.slice(this.pages.page_size*t,this.pages.page_size*(t+1)),e.next=15,this.create_data(l,!0);case 15:e.next=24;break;case 17:return this.pages.now_page=t,c=this.store_list.slice(this.pages.page_size*(t-1),this.pages.page_size*t),e.next=21,this.create_data(c);case 21:return _=this.store_list.slice(this.pages.page_size*t,this.pages.page_size*(t+1)),e.next=24,this.create_data(_,!0);case 24:case"end":return e.stop()}}),e,this)}))),function(e){return _.apply(this,arguments)})},transition:{name:"scroll",mode:""},head:function(){return{title:"地域別飲食店ランキング ".concat(this.selected_area.area_name),meta:[{hid:"description",name:"description",content:"どの飲食店が人気があるか気になりませんか？".concat(this.selected_area.area_name,"エリアの飲食店のGoogle、食べログ、ぐるなび、ホットペッパー等の口コミ・レビューを集計して独自のアルゴリズムでランキング形式で表示。気になってるレストランの使える情報をさくっとGET！")},{hid:"og:title",property:"og:title",content:"地域別飲食店ランキング ".concat(this.selected_area.area_name)},{hid:"og:description",property:"og:description",content:"どの飲食店が人気があるか気になりませんか？".concat(this.selected_area.area_name,"エリアの飲食店のGoogle、食べログ、ぐるなび、ホットペッパー等の口コミ・レビューを集計して独自のアルゴリズムでランキング形式で表示。気になってるレストランの使える情報をさくっとGET！")}]}}},h=(n(496),n(56)),y=n(63),x=n.n(y),w=n(400),k=n(519),component=Object(h.a)(v,(function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"bg store_list_wrap"},[n("v-container",[n("v-card",{staticClass:"ranking_head mb-10 d-flex justify-center"},[n("h1",[e._v("\n                "+e._s(this.selected_area.area_name)),n("br"),e._v("レビューランキング\n            ")])]),e._v(" "),n("ShowStoreList",{attrs:{media_data_list_by_store:e.media_data_list_by_store,content_list:e.content_list,seen_whole:e.seen_whole}}),e._v(" "),n("Pagination",{attrs:{page_is_disabled:e.page_is_disabled,page_length:e.page_length},on:{page_change:e.page_change}})],1)],1)}),[],!1,null,"1726931b",null);t.default=component.exports;x()(component,{ShowStoreList:n(413).default,Pagination:n(431).default}),x()(component,{VCard:w.a,VContainer:k.a})}}]);