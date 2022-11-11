(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[405],{8312:function(n,t,r){(window.__NEXT_P=window.__NEXT_P||[]).push(["/",function(){return r(9571)}])},9571:function(n,t,r){"use strict";r.r(t),r.d(t,{default:function(){return k}});var i,e=r(5893),o=r(9008),c=r.n(o),d=r(214),a=r.n(d),u=r(1799),s=r(9396),l=r(7294),f=r(9436),p=r.n(f),h=r(4285),_=r(887),m=r(5587),w=r(828),b=r(9815),x=(i=0,function(){return i+=1}),j=[{id:"r"+x(),label:"Big bug"},{id:"r"+x(),label:"Medium bug"},{id:"r"+x(),label:"Small bug"},],y=[{id:"p"+x(),name:"Impact",rowIds:[j[0].id,j[1].id,j[2].id]},{id:"p"+x(),name:"Difficulty",rowIds:[j[2].id,j[1].id,j[0].id]}],v=r(3454),g="[object process]"===Object.prototype.toString.call(void 0!==v?v:0);function N(n){var t=n.row,r=n.index,i=n.ranks,o=n.isLastMoved,c=n.onUpdateOrderClick,d=(0,m.nB)({id:t.id}),a=d.attributes,l=d.listeners,f=d.setNodeRef,_=d.transform,w=d.transition,b={transform:h.ux.Transform.toString(_),transition:w},x=(0,e.jsxs)("td",{className:p().dragHandle,children:[(0,e.jsx)("button",{type:"button",className:p().buttonUp,onClick:function(){console.log("button click up"),c("Up")},children:"+"}),(0,e.jsx)("button",{type:"button",className:p().buttonDown,onClick:function(){return c("Down")},children:"-"}),(0,e.jsx)("button",(0,s.Z)((0,u.Z)({type:"button"},l),{children:"#"}))]},"draghandle"),j=(0,e.jsx)("td",{children:r+1},"N"),y=(0,e.jsx)("td",{children:t.label},"label"),v=i.map(function(n){return(0,e.jsx)("td",{children:n.rank},n.priorityId)}),g=o?p().highlightedTr:"";return(0,e.jsxs)("tr",(0,s.Z)((0,u.Z)({className:g,ref:f,style:b},a),{children:[x,j,y,v,(0,e.jsx)("td",{},"input-column")]}),t.id)}function I(n){var t=n.onAddNewColumn,r=(0,l.useRef)(null),i=function(){if(null==r?void 0:r.current){var n=r.current.value;r.current.value="",t(n)}},o=function(n){"Enter"===n.key&&i()};return(0,e.jsxs)(e.Fragment,{children:[(0,e.jsx)("input",{className:p().newColumnInput,ref:r,onKeyPress:o,type:"text",placeholder:"New column"}),(0,e.jsx)("button",{type:"button",onClick:i,children:"+"})]})}var C=function(){var n,t,r,i,o,c,d,a,f,h=(0,_.Dy)((0,_.VT)(_.we),(0,_.VT)(_.Lg,{coordinateGetter:m.is})),v=(0,l.useId)(),C=(t=(n=(0,l.useState)(y))[0],r=n[1],o=(i=(0,l.useState)(j))[0],c=i[1],d=function(n){var r=t.find(function(t){return t.id===n});if(!r)throw Error("Can't find a priority with id=".concat(n));return r},a=function(n,t){var r=n.rowIds.findIndex(function(n){return n===t});if(-1===r)throw Error("Can't find a row rowId=".concat(t));return r},f=function(n){var t={id:"p"+x(),name:n,rowIds:o.map(function(n){return n.id})};r(function(n){return n.concat(t)})},{rows:o,priorities:t,addPriority:f,addRow:function(n){var t="r"+x(),i={id:t,label:n};c(function(n){return n.concat(i)}),r(function(n){return n.map(function(n){return(0,s.Z)((0,u.Z)({},n),{rowIds:n.rowIds.concat(t)})})})},updateOrder:function(n,t,i){var e=d(t),o=a(e,n);e.rowIds.splice(o,1),e.rowIds.splice("Up"===i?o-1:o+1,0,n),r(function(n){return(0,b.Z)(n)})},switchRows:function(n,t,i){if(t!==i){var e=d(n),o=a(e,t),c=a(e,i),u=(0,w.Z)(e.rowIds.splice(o,1),1)[0];e.rowIds.splice(c,0,u),r(function(n){return(0,b.Z)(n)})}}}),k=C.rows,E=C.priorities,P=C.addPriority,T=C.addRow,H=C.updateOrder,D=C.switchRows,S=(0,l.useState)(E[0].id),L=S[0],O=S[1],Z=E.find(function(n){return n.id===L});if(!Z)throw Error("Cant find current priority id=".concat(L));var R=(0,l.useState)(k[0].id),A=R[0],B=R[1],U=Z.rowIds.map(function(n){var t=k.find(function(t){return t.id===n});if(t)return t;throw Error("Cannot find row "+n)}),F=function(n,t,r){0===n&&"Up"===r||n===k.length-1&&"Down"===r||(H(t,L,r),B(t))},M=(0,l.useRef)(null),V=function(n){var t=M.current;if(t){var r=t.value;t.value="",T(r)}},z=function(n){n.clipboardData.items[0].getAsString(function(t){t.split("\n").forEach(function(n){T(n)}),n.target.value=""})},G=E.map(function(n){return(0,e.jsx)("th",{className:n.id===L?p().currentPriorityTh:"",children:(0,e.jsx)("button",{type:"button",className:p().selectPriorityButton,onClick:function(){return O(n.id)},children:n.name})},n.id)});return(0,e.jsxs)("table",{className:p().table,children:[(0,e.jsx)("thead",{children:(0,e.jsxs)("tr",{children:[(0,e.jsx)("th",{className:p().zhColumn,children:"Ж"},"draghandle"),(0,e.jsx)("th",{children:"№"},"N"),(0,e.jsx)("th",{children:"Label"},"label"),G,(0,e.jsx)("th",{children:(0,e.jsx)(I,{onAddNewColumn:function(n){return P(n)}})})]})}),(0,e.jsxs)("tbody",{children:[(0,e.jsx)(_.LB,{sensors:h,accessibility:{container:g?void 0:document.body},id:v,collisionDetection:_.pE,onDragStart:function(n){n.active&&B(n.active.id)},onDragEnd:function(n){n.over&&D(L,n.active.id,n.over.id)},children:(0,e.jsx)(m.Fo,{items:U,strategy:m.qw,children:U.map(function(n,t){var r,i,o=(r=n.id,E.map(function(n){var t=n.rowIds.findIndex(function(n){return n===r});if(-1!==t){var i=n.rowIds.length-t;return{priorityId:n.id,rank:i}}throw Error("Cant find a rowId=".concat(r," within priority.rowIds priorityId=").concat(n.id," "))})),c=A===n.id;return(0,e.jsx)(N,{index:t,isLastMoved:c,row:n,ranks:o,onUpdateOrderClick:function(r){return F(t,n.id,r)}},n.id)})})}),(0,e.jsx)("tr",{children:(0,e.jsxs)("td",{colSpan:3,children:[(0,e.jsx)("input",{type:"text",placeholder:"New row",ref:M,onPaste:function(n){return z(n)}}),(0,e.jsx)("button",{type:"button",onClick:function(n){return V(n)},children:"+"})]})},"input-tr")]})]})},k=function(){return(0,e.jsxs)("div",{className:a().container,children:[(0,e.jsxs)(c(),{children:[(0,e.jsx)("title",{children:"Create Next App"}),(0,e.jsx)("meta",{name:"description",content:"Generated by create next app"}),(0,e.jsx)("link",{rel:"icon",href:"/favicon.ico"})]}),(0,e.jsx)("main",{className:a().main,children:(0,e.jsx)(C,{})})]})}},9436:function(n){n.exports={dragHandle:"priority-table_dragHandle__xjVrs",currentPriorityTh:"priority-table_currentPriorityTh__F4ywp",selectPriorityButton:"priority-table_selectPriorityButton__cAmqD",table:"priority-table_table__NrXrN",highlightedTr:"priority-table_highlightedTr__rkLtb",zhColumn:"priority-table_zhColumn__VQAMF",newColumnInput:"priority-table_newColumnInput__j1NA5"}},214:function(n){n.exports={container:"Home_container__bCOhY",main:"Home_main__nLjiQ",footer:"Home_footer____T7K",title:"Home_title__T09hD",description:"Home_description__41Owk",code:"Home_code__suPER",grid:"Home_grid__GxQ85",card:"Home_card___LpL1",logo:"Home_logo__27_tb"}}},function(n){n.O(0,[88,774,888,179],function(){return n(n.s=8312)}),_N_E=n.O()}]);