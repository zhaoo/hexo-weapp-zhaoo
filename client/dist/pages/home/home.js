(wx["webpackJsonp"]=wx["webpackJsonp"]||[]).push([[18],{228:function(e,t,n){},320:function(e,t,n){"use strict";n.r(t);var a=n(4),c=n(6),s=n(3),o=n.n(s),r=n(1),l=n(8),i=n.n(l),u=n(12),j=n(5),b=n(38),p=function(){var e=Object(j["useState"])([]),t=Object(c["a"])(e,2),n=t[0],a=t[1],o=Object(j["useState"])(1),r=Object(c["a"])(o,2),l=r[0],p=r[1],x=Object(j["useState"])(!0),_=Object(c["a"])(x,2),O=_[0],f=_[1],m=Object(j["useState"])(!1),d=Object(c["a"])(m,2),h=d[0],v=d[1];Object(j["useEffect"])((function(){O&&(v(!0),g())}),[l]),Object(s["useReachBottom"])((function(){S(),Object(s["vibrateShort"])()})),Object(s["usePullDownRefresh"])((function(){w(),Object(s["vibrateShort"])()}));var g=function(){var e=Object(u["a"])(i.a.mark((function e(){var t,c,o;return i.a.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,Object(b["d"])(l);case 2:if(e.t0=e.sent,e.t0){e.next=5;break}e.t0={};case 5:t=e.t0,c=t.data,o=t.pageCount,!c||!o||c.length<o?f(!1):a(n?n.concat(c):c),v(!1),Object(s["stopPullDownRefresh"])();case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),S=function(){return p(l+1)},w=function(){a([]),f(!0),p(1),g()};return[n,O,h]},x=p,_=n(46),O=n.n(_),f=n(0),m=function(e){var t=e.data,n=t.title,a=void 0===n?"":n,c=t.cover,s=t.excerpt,l=void 0===s?"":s,i=t.slug,u=t.top;return Object(f["jsxs"])(r["j"],{className:O.a.postItem,onClick:function(){return o.a.navigateTo({url:"/pages/post/post?slug=".concat(i)})},children:[u?Object(f["jsx"])(r["j"],{className:O.a.top}):null,c?Object(f["jsx"])(r["b"],{className:O.a.cover,src:c,lazyLoad:!0,mode:"aspectFill"}):null,Object(f["jsxs"])(r["j"],{className:O.a.content,children:[Object(f["jsx"])(r["i"],{className:O.a.title,children:a}),Object(f["jsx"])(r["i"],{className:O.a.excerpt,children:l})]})]})},d=m,h=n(27),v=(n(228),function(){var e=x(),t=Object(c["a"])(e,3),n=t[0],a=t[1],o=t[2];return Object(s["useShareAppMessage"])((function(){return{title:"zhaoo"}})),Object(f["jsxs"])(r["f"],{className:"home",scrollY:!0,scrollX:!1,children:[n.length>0?n.map((function(e,t){return Object(f["jsx"])(d,{data:e},t)})):null,o?Object(f["jsx"])(h["a"],{text:"\u6b63\u5728\u52a0\u8f7d...",icon:"jingyu"}):null,a?null:Object(f["jsx"])(h["a"],{text:"\u672c\u6765\u65e0\u4e00\u7269\uff0c\u4f55\u5904\u60f9\u5c18\u57c3 ~"})]})}),g=v,S={navigationBarTitleText:"\u9996\u9875",enableShareTimeline:!0,enableShareAppMessage:!0,enablePullDownRefresh:!0};g.enableShareTimeline=!0,g.enableShareAppMessage=!0;Page(Object(a["createPageConfig"])(g,"pages/home/home",{root:{cn:[]}},S||{}))},46:function(e,t,n){e.exports={postItem:"index-module__postItem___2AtHG",top:"index-module__top___13PCm",cover:"index-module__cover___3sTZi",content:"index-module__content___Wy7af",title:"index-module__title___3-Fxm",excerpt:"index-module__excerpt___VE1pk"}}},[[320,0,1,2,3]]]);