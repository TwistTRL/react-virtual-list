(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{10:function(e,t,a){e.exports=a(23)},22:function(e,t,a){},23:function(e,t,a){"use strict";a.r(t);var r=a(1),n=a(2),l=a(4),i=a(3),c=a(5),o=a(0),s=a.n(o),h=a(8),d=a.n(h),p=a(9),u=a.n(p),m=(a(22),["white","#f0f0f0"]),v=function(e){function t(e){var a;return Object(r.a)(this,t),(a=Object(l.a)(this,Object(i.a)(t).call(this,e))).handleScrollStartUpdate=function(e){e=a.capScrollStart(e),a.setState({scrollStart:e})},a.handleScroll=function(e){e.preventDefault(),e.stopPropagation();var t=a.state.scrollStart;e.deltaY<0?a.handleScrollStartUpdate(t-10):a.handleScrollStartUpdate(t+10)},a.state={scrollStart:0},a.renderedItems=new Set,a}return Object(c.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){var e=this,t=this.props,a=t.width,r=t.height,n=t.rowHeight,l=t.scrollbarColor,i=t.children,c=this.state.scrollStart,h=this.renderedItems,d=n*s.a.Children.count(i),p=null,v=a;r<d&&(p=s.a.createElement(u.a,{width:10,height:r,color:l,realHeight:d,realRange:r,scrollStart:c,updateScrollStartHandler:this.handleScrollStartUpdate}),v-=10);var y=new Set(s.a.Children.map(i,function(e){return e.key})),S=!0,k=!1,f=void 0;try{for(var g,w=h[Symbol.iterator]();!(S=(g=w.next()).done);S=!0){var E=g.value;y.has(E)||h.delete(E)}}catch(C){k=!0,f=C}finally{try{S||null==w.return||w.return()}finally{if(k)throw f}}var b=s.a.Children.map(i,function(t,a){return!e.renderedItems.has(t.key)&&(a*n+n<=c||a*n>=c+r)?null:(h.add(t.key),s.a.createElement("div",{key:t.key,className:"VirtualList-rowContainer",style:{height:n,top:a*n,backgroundColor:m[a%m.length]}},t))});return s.a.createElement(o.Fragment,null,s.a.createElement("div",{className:"VirtualList-masterContainer",style:{width:a,height:r},onWheel:this.handleScroll},p,s.a.createElement("div",{className:"VirtualList-mainContainer",style:{height:r,width:v,top:-c}},b)))}},{key:"capScrollStart",value:function(e){var t=this.props,a=t.height,r=t.children,n=t.rowHeight*s.a.Children.count(r);return n<a?0:Math.max(0,Math.min(n-a,e))}}],[{key:"getDerivedStateFromProps",value:function(e,t){var a=e.children,r=e.height,n=e.rowHeight;return t.scrollStart>s.a.Children.count(a)*n-r?{scrollStart:Math.max(0,s.a.Children.count(a)*n-r)}:null}}]),t}(o.Component),y=function(e){function t(){return Object(r.a)(this,t),Object(l.a)(this,Object(i.a)(t).apply(this,arguments))}return Object(c.a)(t,e),Object(n.a)(t,[{key:"render",value:function(){return s.a.createElement(v,{width:200,height:200,rowHeight:40,scrollbarColor:"green"},s.a.createElement("p",{key:"p1"},"a p"),s.a.createElement("p",{key:"p2"},"a p"),s.a.createElement("div",{key:"div1"},"a div"),s.a.createElement("span",{key:"span1"},"a span"),s.a.createElement("p",{key:"p3"},"a p"),s.a.createElement("span",{key:"span2"},"a span"),s.a.createElement("div",{key:"div2"},"a div"),s.a.createElement("div",{key:"div3"},"a div"),s.a.createElement("p",{key:"p4"},"a p"),s.a.createElement("div",{key:"div4"},"a div"),s.a.createElement("span",{key:"span3"},"a span"),s.a.createElement("span",{key:"span4"},"a span"))}}]),t}(o.Component);d.a.render(s.a.createElement(y,null),document.getElementById("root"))}},[[10,1,2]]]);
//# sourceMappingURL=main.d7afd1ff.chunk.js.map