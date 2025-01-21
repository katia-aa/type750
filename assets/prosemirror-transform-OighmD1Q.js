import{R as se,S as w,F as g,M as oe,d as le}from"./prosemirror-model-m3iZ3_G7.js";const Q=65535,U=Math.pow(2,16);function ae(s,e){return s+e*U}function H(s){return s&Q}function he(s){return(s-(s&Q))/U}const V=1,X=2,A=4,Y=8;class L{constructor(e,t,r){this.pos=e,this.delInfo=t,this.recover=r}get deleted(){return(this.delInfo&Y)>0}get deletedBefore(){return(this.delInfo&(V|A))>0}get deletedAfter(){return(this.delInfo&(X|A))>0}get deletedAcross(){return(this.delInfo&A)>0}}class S{constructor(e,t=!1){if(this.ranges=e,this.inverted=t,!e.length&&S.empty)return S.empty}recover(e){let t=0,r=H(e);if(!this.inverted)for(let n=0;n<r;n++)t+=this.ranges[n*3+2]-this.ranges[n*3+1];return this.ranges[r*3]+t+he(e)}mapResult(e,t=1){return this._map(e,t,!1)}map(e,t=1){return this._map(e,t,!0)}_map(e,t,r){let n=0,i=this.inverted?2:1,o=this.inverted?1:2;for(let l=0;l<this.ranges.length;l+=3){let a=this.ranges[l]-(this.inverted?n:0);if(a>e)break;let h=this.ranges[l+i],p=this.ranges[l+o],c=a+h;if(e<=c){let f=h?e==a?-1:e==c?1:t:t,d=a+n+(f<0?0:p);if(r)return d;let u=e==(t<0?a:c)?null:ae(l/3,e-a),m=e==a?X:e==c?V:A;return(t<0?e!=a:e!=c)&&(m|=Y),new L(d,m,u)}n+=p-h}return r?e+n:new L(e+n,0,null)}touches(e,t){let r=0,n=H(t),i=this.inverted?2:1,o=this.inverted?1:2;for(let l=0;l<this.ranges.length;l+=3){let a=this.ranges[l]-(this.inverted?r:0);if(a>e)break;let h=this.ranges[l+i],p=a+h;if(e<=p&&l==n*3)return!0;r+=this.ranges[l+o]-h}return!1}forEach(e){let t=this.inverted?2:1,r=this.inverted?1:2;for(let n=0,i=0;n<this.ranges.length;n+=3){let o=this.ranges[n],l=o-(this.inverted?i:0),a=o+(this.inverted?0:i),h=this.ranges[n+t],p=this.ranges[n+r];e(l,l+h,a,a+p),i+=p-h}}invert(){return new S(this.ranges,!this.inverted)}toString(){return(this.inverted?"-":"")+JSON.stringify(this.ranges)}static offset(e){return e==0?S.empty:new S(e<0?[0,-e,0]:[0,0,e])}}S.empty=new S([]);class z{constructor(e=[],t,r=0,n=e.length){this.maps=e,this.mirror=t,this.from=r,this.to=n}slice(e=0,t=this.maps.length){return new z(this.maps,this.mirror,e,t)}copy(){return new z(this.maps.slice(),this.mirror&&this.mirror.slice(),this.from,this.to)}appendMap(e,t){this.to=this.maps.push(e),t!=null&&this.setMirror(this.maps.length-1,t)}appendMapping(e){for(let t=0,r=this.maps.length;t<e.maps.length;t++){let n=e.getMirror(t);this.appendMap(e.maps[t],n!=null&&n<t?r+n:void 0)}}getMirror(e){if(this.mirror){for(let t=0;t<this.mirror.length;t++)if(this.mirror[t]==e)return this.mirror[t+(t%2?-1:1)]}}setMirror(e,t){this.mirror||(this.mirror=[]),this.mirror.push(e,t)}appendMappingInverted(e){for(let t=e.maps.length-1,r=this.maps.length+e.maps.length;t>=0;t--){let n=e.getMirror(t);this.appendMap(e.maps[t].invert(),n!=null&&n>t?r-n-1:void 0)}}invert(){let e=new z;return e.appendMappingInverted(this),e}map(e,t=1){if(this.mirror)return this._map(e,t,!0);for(let r=this.from;r<this.to;r++)e=this.maps[r].map(e,t);return e}mapResult(e,t=1){return this._map(e,t,!1)}_map(e,t,r){let n=0;for(let i=this.from;i<this.to;i++){let o=this.maps[i],l=o.mapResult(e,t);if(l.recover!=null){let a=this.getMirror(i);if(a!=null&&a>i&&a<this.to){i=a,e=this.maps[a].recover(l.recover);continue}}n|=l.delInfo,e=l.pos}return r?e:new L(e,n,null)}}const B=Object.create(null);class k{getMap(){return S.empty}merge(e){return null}static fromJSON(e,t){if(!t||!t.stepType)throw new RangeError("Invalid input for Step.fromJSON");let r=B[t.stepType];if(!r)throw new RangeError(`No step type ${t.stepType} defined`);return r.fromJSON(e,t)}static jsonID(e,t){if(e in B)throw new RangeError("Duplicate use of step JSON ID "+e);return B[e]=t,t.prototype.jsonID=e,t}}class y{constructor(e,t){this.doc=e,this.failed=t}static ok(e){return new y(e,null)}static fail(e){return new y(null,e)}static fromReplace(e,t,r,n){try{return y.ok(e.replace(t,r,n))}catch(i){if(i instanceof se)return y.fail(i.message);throw i}}}function P(s,e,t){let r=[];for(let n=0;n<s.childCount;n++){let i=s.child(n);i.content.size&&(i=i.copy(P(i.content,e,i))),i.isInline&&(i=e(i,t,n)),r.push(i)}return g.fromArray(r)}class C extends k{constructor(e,t,r){super(),this.from=e,this.to=t,this.mark=r}apply(e){let t=e.slice(this.from,this.to),r=e.resolve(this.from),n=r.node(r.sharedDepth(this.to)),i=new w(P(t.content,(o,l)=>!o.isAtom||!l.type.allowsMarkType(this.mark.type)?o:o.mark(this.mark.addToSet(o.marks)),n),t.openStart,t.openEnd);return y.fromReplace(e,this.from,this.to,i)}invert(){return new b(this.from,this.to,this.mark)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deleted&&r.deleted||t.pos>=r.pos?null:new C(t.pos,r.pos,this.mark)}merge(e){return e instanceof C&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new C(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}toJSON(){return{stepType:"addMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for AddMarkStep.fromJSON");return new C(t.from,t.to,e.markFromJSON(t.mark))}}k.jsonID("addMark",C);class b extends k{constructor(e,t,r){super(),this.from=e,this.to=t,this.mark=r}apply(e){let t=e.slice(this.from,this.to),r=new w(P(t.content,n=>n.mark(this.mark.removeFromSet(n.marks)),e),t.openStart,t.openEnd);return y.fromReplace(e,this.from,this.to,r)}invert(){return new C(this.from,this.to,this.mark)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deleted&&r.deleted||t.pos>=r.pos?null:new b(t.pos,r.pos,this.mark)}merge(e){return e instanceof b&&e.mark.eq(this.mark)&&this.from<=e.to&&this.to>=e.from?new b(Math.min(this.from,e.from),Math.max(this.to,e.to),this.mark):null}toJSON(){return{stepType:"removeMark",mark:this.mark.toJSON(),from:this.from,to:this.to}}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for RemoveMarkStep.fromJSON");return new b(t.from,t.to,e.markFromJSON(t.mark))}}k.jsonID("removeMark",b);class N extends k{constructor(e,t){super(),this.pos=e,this.mark=t}apply(e){let t=e.nodeAt(this.pos);if(!t)return y.fail("No node at mark step's position");let r=t.type.create(t.attrs,null,this.mark.addToSet(t.marks));return y.fromReplace(e,this.pos,this.pos+1,new w(g.from(r),0,t.isLeaf?0:1))}invert(e){let t=e.nodeAt(this.pos);if(t){let r=this.mark.addToSet(t.marks);if(r.length==t.marks.length){for(let n=0;n<t.marks.length;n++)if(!t.marks[n].isInSet(r))return new N(this.pos,t.marks[n]);return new N(this.pos,this.mark)}}return new T(this.pos,this.mark)}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new N(t.pos,this.mark)}toJSON(){return{stepType:"addNodeMark",pos:this.pos,mark:this.mark.toJSON()}}static fromJSON(e,t){if(typeof t.pos!="number")throw new RangeError("Invalid input for AddNodeMarkStep.fromJSON");return new N(t.pos,e.markFromJSON(t.mark))}}k.jsonID("addNodeMark",N);class T extends k{constructor(e,t){super(),this.pos=e,this.mark=t}apply(e){let t=e.nodeAt(this.pos);if(!t)return y.fail("No node at mark step's position");let r=t.type.create(t.attrs,null,this.mark.removeFromSet(t.marks));return y.fromReplace(e,this.pos,this.pos+1,new w(g.from(r),0,t.isLeaf?0:1))}invert(e){let t=e.nodeAt(this.pos);return!t||!this.mark.isInSet(t.marks)?this:new N(this.pos,this.mark)}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new T(t.pos,this.mark)}toJSON(){return{stepType:"removeNodeMark",pos:this.pos,mark:this.mark.toJSON()}}static fromJSON(e,t){if(typeof t.pos!="number")throw new RangeError("Invalid input for RemoveNodeMarkStep.fromJSON");return new T(t.pos,e.markFromJSON(t.mark))}}k.jsonID("removeNodeMark",T);class v extends k{constructor(e,t,r,n=!1){super(),this.from=e,this.to=t,this.slice=r,this.structure=n}apply(e){return this.structure&&q(e,this.from,this.to)?y.fail("Structure replace would overwrite content"):y.fromReplace(e,this.from,this.to,this.slice)}getMap(){return new S([this.from,this.to-this.from,this.slice.size])}invert(e){return new v(this.from,this.from+this.slice.size,e.slice(this.from,this.to))}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1);return t.deletedAcross&&r.deletedAcross?null:new v(t.pos,Math.max(t.pos,r.pos),this.slice)}merge(e){if(!(e instanceof v)||e.structure||this.structure)return null;if(this.from+this.slice.size==e.from&&!this.slice.openEnd&&!e.slice.openStart){let t=this.slice.size+e.slice.size==0?w.empty:new w(this.slice.content.append(e.slice.content),this.slice.openStart,e.slice.openEnd);return new v(this.from,this.to+(e.to-e.from),t,this.structure)}else if(e.to==this.from&&!this.slice.openStart&&!e.slice.openEnd){let t=this.slice.size+e.slice.size==0?w.empty:new w(e.slice.content.append(this.slice.content),e.slice.openStart,this.slice.openEnd);return new v(e.from,this.to,t,this.structure)}else return null}toJSON(){let e={stepType:"replace",from:this.from,to:this.to};return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number")throw new RangeError("Invalid input for ReplaceStep.fromJSON");return new v(t.from,t.to,w.fromJSON(e,t.slice),!!t.structure)}}k.jsonID("replace",v);class M extends k{constructor(e,t,r,n,i,o,l=!1){super(),this.from=e,this.to=t,this.gapFrom=r,this.gapTo=n,this.slice=i,this.insert=o,this.structure=l}apply(e){if(this.structure&&(q(e,this.from,this.gapFrom)||q(e,this.gapTo,this.to)))return y.fail("Structure gap-replace would overwrite content");let t=e.slice(this.gapFrom,this.gapTo);if(t.openStart||t.openEnd)return y.fail("Gap is not a flat range");let r=this.slice.insertAt(this.insert,t.content);return r?y.fromReplace(e,this.from,this.to,r):y.fail("Content does not fit in gap")}getMap(){return new S([this.from,this.gapFrom-this.from,this.insert,this.gapTo,this.to-this.gapTo,this.slice.size-this.insert])}invert(e){let t=this.gapTo-this.gapFrom;return new M(this.from,this.from+this.slice.size+t,this.from+this.insert,this.from+this.insert+t,e.slice(this.from,this.to).removeBetween(this.gapFrom-this.from,this.gapTo-this.from),this.gapFrom-this.from,this.structure)}map(e){let t=e.mapResult(this.from,1),r=e.mapResult(this.to,-1),n=this.from==this.gapFrom?t.pos:e.map(this.gapFrom,-1),i=this.to==this.gapTo?r.pos:e.map(this.gapTo,1);return t.deletedAcross&&r.deletedAcross||n<t.pos||i>r.pos?null:new M(t.pos,r.pos,n,i,this.slice,this.insert,this.structure)}toJSON(){let e={stepType:"replaceAround",from:this.from,to:this.to,gapFrom:this.gapFrom,gapTo:this.gapTo,insert:this.insert};return this.slice.size&&(e.slice=this.slice.toJSON()),this.structure&&(e.structure=!0),e}static fromJSON(e,t){if(typeof t.from!="number"||typeof t.to!="number"||typeof t.gapFrom!="number"||typeof t.gapTo!="number"||typeof t.insert!="number")throw new RangeError("Invalid input for ReplaceAroundStep.fromJSON");return new M(t.from,t.to,t.gapFrom,t.gapTo,w.fromJSON(e,t.slice),t.insert,!!t.structure)}}k.jsonID("replaceAround",M);function q(s,e,t){let r=s.resolve(e),n=t-e,i=r.depth;for(;n>0&&i>0&&r.indexAfter(i)==r.node(i).childCount;)i--,n--;if(n>0){let o=r.node(i).maybeChild(r.indexAfter(i));for(;n>0;){if(!o||o.isLeaf)return!0;o=o.firstChild,n--}}return!1}function pe(s,e,t,r){let n=[],i=[],o,l;s.doc.nodesBetween(e,t,(a,h,p)=>{if(!a.isInline)return;let c=a.marks;if(!r.isInSet(c)&&p.type.allowsMarkType(r.type)){let f=Math.max(h,e),d=Math.min(h+a.nodeSize,t),u=r.addToSet(c);for(let m=0;m<c.length;m++)c[m].isInSet(u)||(o&&o.to==f&&o.mark.eq(c[m])?o.to=d:n.push(o=new b(f,d,c[m])));l&&l.to==f?l.to=d:i.push(l=new C(f,d,r))}}),n.forEach(a=>s.step(a)),i.forEach(a=>s.step(a))}function fe(s,e,t,r){let n=[],i=0;s.doc.nodesBetween(e,t,(o,l)=>{if(!o.isInline)return;i++;let a=null;if(r instanceof le){let h=o.marks,p;for(;p=r.isInSet(h);)(a||(a=[])).push(p),h=p.removeFromSet(h)}else r?r.isInSet(o.marks)&&(a=[r]):a=o.marks;if(a&&a.length){let h=Math.min(l+o.nodeSize,t);for(let p=0;p<a.length;p++){let c=a[p],f;for(let d=0;d<n.length;d++){let u=n[d];u.step==i-1&&c.eq(n[d].style)&&(f=u)}f?(f.to=h,f.step=i):n.push({style:c,from:Math.max(l,e),to:h,step:i})}}}),n.forEach(o=>s.step(new b(o.from,o.to,o.style)))}function $(s,e,t,r=t.contentMatch,n=!0){let i=s.doc.nodeAt(e),o=[],l=e+1;for(let a=0;a<i.childCount;a++){let h=i.child(a),p=l+h.nodeSize,c=r.matchType(h.type);if(!c)o.push(new v(l,p,w.empty));else{r=c;for(let f=0;f<h.marks.length;f++)t.allowsMarkType(h.marks[f].type)||s.step(new b(l,p,h.marks[f]));if(n&&h.isText&&t.whitespace!="pre"){let f,d=/\r?\n|\r/g,u;for(;f=d.exec(h.text);)u||(u=new w(g.from(t.schema.text(" ",t.allowedMarks(h.marks))),0,0)),o.push(new v(l+f.index,l+f.index+f[0].length,u))}}l=p}if(!r.validEnd){let a=r.fillBefore(g.empty,!0);s.replace(l,l,new w(a,0,0))}for(let a=o.length-1;a>=0;a--)s.step(o[a])}function ce(s,e,t){return(e==0||s.canReplace(e,s.childCount))&&(t==s.childCount||s.canReplace(0,t))}function Fe(s){let t=s.parent.content.cutByIndex(s.startIndex,s.endIndex);for(let r=s.depth;;--r){let n=s.$from.node(r),i=s.$from.index(r),o=s.$to.indexAfter(r);if(r<s.depth&&n.canReplace(i,o,t))return r;if(r==0||n.type.spec.isolating||!ce(n,i,o))break}return null}function de(s,e,t){let{$from:r,$to:n,depth:i}=e,o=r.before(i+1),l=n.after(i+1),a=o,h=l,p=g.empty,c=0;for(let u=i,m=!1;u>t;u--)m||r.index(u)>0?(m=!0,p=g.from(r.node(u).copy(p)),c++):a--;let f=g.empty,d=0;for(let u=i,m=!1;u>t;u--)m||n.after(u+1)<n.end(u)?(m=!0,f=g.from(n.node(u).copy(f)),d++):h++;s.step(new M(a,h,o,l,new w(p.append(f),c,d),p.size-c,!0))}function ze(s,e,t=null,r=s){let n=ue(s,e),i=n&&me(r,e);return i?n.map(K).concat({type:e,attrs:t}).concat(i.map(K)):null}function K(s){return{type:s,attrs:null}}function ue(s,e){let{parent:t,startIndex:r,endIndex:n}=s,i=t.contentMatchAt(r).findWrapping(e);if(!i)return null;let o=i.length?i[0]:e;return t.canReplaceWith(r,n,o)?i:null}function me(s,e){let{parent:t,startIndex:r,endIndex:n}=s,i=t.child(r),o=e.contentMatch.findWrapping(i.type);if(!o)return null;let a=(o.length?o[o.length-1]:e).contentMatch;for(let h=r;a&&h<n;h++)a=a.matchType(t.child(h).type);return!a||!a.validEnd?null:o}function we(s,e,t){let r=g.empty;for(let o=t.length-1;o>=0;o--){if(r.size){let l=t[o].type.contentMatch.matchFragment(r);if(!l||!l.validEnd)throw new RangeError("Wrapper type given to Transform.wrap does not form valid content of its parent wrapper")}r=g.from(t[o].type.create(t[o].attrs,r))}let n=e.start,i=e.end;s.step(new M(n,i,n,i,new w(r,0,0),t.length,!0))}function ge(s,e,t,r,n){if(!r.isTextblock)throw new RangeError("Type given to setBlockType should be a textblock");let i=s.steps.length;s.doc.nodesBetween(e,t,(o,l)=>{let a=typeof n=="function"?n(o):n;if(o.isTextblock&&!o.hasMarkup(r,a)&&ye(s.doc,s.mapping.slice(i).map(l),r)){let h=null;if(r.schema.linebreakReplacement){let d=r.whitespace=="pre",u=!!r.contentMatch.matchType(r.schema.linebreakReplacement);d&&!u?h=!1:!d&&u&&(h=!0)}h===!1&&j(s,o,l,i),$(s,s.mapping.slice(i).map(l,1),r,void 0,h===null);let p=s.mapping.slice(i),c=p.map(l,1),f=p.map(l+o.nodeSize,1);return s.step(new M(c,f,c+1,f-1,new w(g.from(r.create(a,null,o.marks)),0,0),1,!0)),h===!0&&Z(s,o,l,i),!1}})}function Z(s,e,t,r){e.forEach((n,i)=>{if(n.isText){let o,l=/\r?\n|\r/g;for(;o=l.exec(n.text);){let a=s.mapping.slice(r).map(t+1+i+o.index);s.replaceWith(a,a+1,e.type.schema.linebreakReplacement.create())}}})}function j(s,e,t,r){e.forEach((n,i)=>{if(n.type==n.type.schema.linebreakReplacement){let o=s.mapping.slice(r).map(t+1+i);s.replaceWith(o,o+1,e.type.schema.text(`
`))}})}function ye(s,e,t){let r=s.resolve(e),n=r.index();return r.parent.canReplaceWith(n,n+1,t)}function ke(s,e,t,r,n){let i=s.doc.nodeAt(e);if(!i)throw new RangeError("No node at given position");t||(t=i.type);let o=t.create(r,null,n||i.marks);if(i.isLeaf)return s.replaceWith(e,e+i.nodeSize,o);if(!t.validContent(i.content))throw new RangeError("Invalid content for node type "+t.name);s.step(new M(e,e+i.nodeSize,e+1,e+i.nodeSize-1,new w(g.from(o),0,0),1,!0))}function Je(s,e,t=1,r){let n=s.resolve(e),i=n.depth-t,o=r&&r[r.length-1]||n.parent;if(i<0||n.parent.type.spec.isolating||!n.parent.canReplace(n.index(),n.parent.childCount)||!o.type.validContent(n.parent.content.cutByIndex(n.index(),n.parent.childCount)))return!1;for(let h=n.depth-1,p=t-2;h>i;h--,p--){let c=n.node(h),f=n.index(h);if(c.type.spec.isolating)return!1;let d=c.content.cutByIndex(f,c.childCount),u=r&&r[p+1];u&&(d=d.replaceChild(0,u.type.create(u.attrs)));let m=r&&r[p]||c;if(!c.canReplace(f+1,c.childCount)||!m.type.validContent(d))return!1}let l=n.indexAfter(i),a=r&&r[0];return n.node(i).canReplaceWith(l,l,a?a.type:n.node(i+1).type)}function ve(s,e,t=1,r){let n=s.doc.resolve(e),i=g.empty,o=g.empty;for(let l=n.depth,a=n.depth-t,h=t-1;l>a;l--,h--){i=g.from(n.node(l).copy(i));let p=r&&r[h];o=g.from(p?p.type.create(p.attrs,o):n.node(l).copy(o))}s.step(new v(e,e,new w(i.append(o),t,t),!0))}function Ae(s,e){let t=s.resolve(e),r=t.index();return _(t.nodeBefore,t.nodeAfter)&&t.parent.canReplace(r,r+1)}function xe(s,e){e.content.size||s.type.compatibleContent(e.type);let t=s.contentMatchAt(s.childCount),{linebreakReplacement:r}=s.type.schema;for(let n=0;n<e.childCount;n++){let i=e.child(n),o=i.type==r?s.type.schema.nodes.text:i.type;if(t=t.matchType(o),!t||!s.type.allowsMarks(i.marks))return!1}return t.validEnd}function _(s,e){return!!(s&&e&&!s.isLeaf&&xe(s,e))}function Be(s,e,t=-1){let r=s.resolve(e);for(let n=r.depth;;n--){let i,o,l=r.index(n);if(n==r.depth?(i=r.nodeBefore,o=r.nodeAfter):t>0?(i=r.node(n+1),l++,o=r.node(n).maybeChild(l)):(i=r.node(n).maybeChild(l-1),o=r.node(n+1)),i&&!i.isTextblock&&_(i,o)&&r.node(n).canReplace(l,l+1))return e;if(n==0)break;e=t<0?r.before(n):r.after(n)}}function Se(s,e,t){let r=null,{linebreakReplacement:n}=s.doc.type.schema,i=s.doc.resolve(e-t),o=i.node().type;if(n&&o.inlineContent){let p=o.whitespace=="pre",c=!!o.contentMatch.matchType(n);p&&!c?r=!1:!p&&c&&(r=!0)}let l=s.steps.length;if(r===!1){let p=s.doc.resolve(e+t);j(s,p.node(),p.before(),l)}o.inlineContent&&$(s,e+t-1,o,i.node().contentMatchAt(i.index()),r==null);let a=s.mapping.slice(l),h=a.map(e-t);if(s.step(new v(h,a.map(e+t,-1),w.empty,!0)),r===!0){let p=s.doc.resolve(h);Z(s,p.node(),p.before(),s.steps.length)}return s}function be(s,e,t){let r=s.resolve(e);if(r.parent.canReplaceWith(r.index(),r.index(),t))return e;if(r.parentOffset==0)for(let n=r.depth-1;n>=0;n--){let i=r.index(n);if(r.node(n).canReplaceWith(i,i,t))return r.before(n+1);if(i>0)return null}if(r.parentOffset==r.parent.content.size)for(let n=r.depth-1;n>=0;n--){let i=r.indexAfter(n);if(r.node(n).canReplaceWith(i,i,t))return r.after(n+1);if(i<r.node(n).childCount)return null}return null}function We(s,e,t){let r=s.resolve(e);if(!t.content.size)return e;let n=t.content;for(let i=0;i<t.openStart;i++)n=n.firstChild.content;for(let i=1;i<=(t.openStart==0&&t.size?2:1);i++)for(let o=r.depth;o>=0;o--){let l=o==r.depth?0:r.pos<=(r.start(o+1)+r.end(o+1))/2?-1:1,a=r.index(o)+(l>0?1:0),h=r.node(o),p=!1;if(i==1)p=h.canReplace(a,a,n);else{let c=h.contentMatchAt(a).findWrapping(n.firstChild.type);p=c&&h.canReplaceWith(a,a,c[0])}if(p)return l==0?r.pos:l<0?r.before(o+1):r.after(o+1)}return null}function Me(s,e,t=e,r=w.empty){if(e==t&&!r.size)return null;let n=s.resolve(e),i=s.resolve(t);return ee(n,i,r)?new v(e,t,r):new Ce(n,i,r).fit()}function ee(s,e,t){return!t.openStart&&!t.openEnd&&s.start()==e.start()&&s.parent.canReplace(s.index(),e.index(),t.content)}class Ce{constructor(e,t,r){this.$from=e,this.$to=t,this.unplaced=r,this.frontier=[],this.placed=g.empty;for(let n=0;n<=e.depth;n++){let i=e.node(n);this.frontier.push({type:i.type,match:i.contentMatchAt(e.indexAfter(n))})}for(let n=e.depth;n>0;n--)this.placed=g.from(e.node(n).copy(this.placed))}get depth(){return this.frontier.length-1}fit(){for(;this.unplaced.size;){let h=this.findFittable();h?this.placeNodes(h):this.openMore()||this.dropNode()}let e=this.mustMoveInline(),t=this.placed.size-this.depth-this.$from.depth,r=this.$from,n=this.close(e<0?this.$to:r.doc.resolve(e));if(!n)return null;let i=this.placed,o=r.depth,l=n.depth;for(;o&&l&&i.childCount==1;)i=i.firstChild.content,o--,l--;let a=new w(i,o,l);return e>-1?new M(r.pos,e,this.$to.pos,this.$to.end(),a,t):a.size||r.pos!=this.$to.pos?new v(r.pos,n.pos,a):null}findFittable(){let e=this.unplaced.openStart;for(let t=this.unplaced.content,r=0,n=this.unplaced.openEnd;r<e;r++){let i=t.firstChild;if(t.childCount>1&&(n=0),i.type.spec.isolating&&n<=r){e=r;break}t=i.content}for(let t=1;t<=2;t++)for(let r=t==1?e:this.unplaced.openStart;r>=0;r--){let n,i=null;r?(i=W(this.unplaced.content,r-1).firstChild,n=i.content):n=this.unplaced.content;let o=n.firstChild;for(let l=this.depth;l>=0;l--){let{type:a,match:h}=this.frontier[l],p,c=null;if(t==1&&(o?h.matchType(o.type)||(c=h.fillBefore(g.from(o),!1)):i&&a.compatibleContent(i.type)))return{sliceDepth:r,frontierDepth:l,parent:i,inject:c};if(t==2&&o&&(p=h.findWrapping(o.type)))return{sliceDepth:r,frontierDepth:l,parent:i,wrap:p};if(i&&h.matchType(i.type))break}}}openMore(){let{content:e,openStart:t,openEnd:r}=this.unplaced,n=W(e,t);return!n.childCount||n.firstChild.isLeaf?!1:(this.unplaced=new w(e,t+1,Math.max(r,n.size+t>=e.size-r?t+1:0)),!0)}dropNode(){let{content:e,openStart:t,openEnd:r}=this.unplaced,n=W(e,t);if(n.childCount<=1&&t>0){let i=e.size-t<=t+n.size;this.unplaced=new w(O(e,t-1,1),t-1,i?t-1:r)}else this.unplaced=new w(O(e,t,1),t,r)}placeNodes({sliceDepth:e,frontierDepth:t,parent:r,inject:n,wrap:i}){for(;this.depth>t;)this.closeFrontierNode();if(i)for(let m=0;m<i.length;m++)this.openFrontierNode(i[m]);let o=this.unplaced,l=r?r.content:o.content,a=o.openStart-e,h=0,p=[],{match:c,type:f}=this.frontier[t];if(n){for(let m=0;m<n.childCount;m++)p.push(n.child(m));c=c.matchFragment(n)}let d=l.size+e-(o.content.size-o.openEnd);for(;h<l.childCount;){let m=l.child(h),x=c.matchType(m.type);if(!x)break;h++,(h>1||a==0||m.content.size)&&(c=x,p.push(te(m.mark(f.allowedMarks(m.marks)),h==1?a:0,h==l.childCount?d:-1)))}let u=h==l.childCount;u||(d=-1),this.placed=F(this.placed,t,g.from(p)),this.frontier[t].match=c,u&&d<0&&r&&r.type==this.frontier[this.depth].type&&this.frontier.length>1&&this.closeFrontierNode();for(let m=0,x=l;m<d;m++){let R=x.lastChild;this.frontier.push({type:R.type,match:R.contentMatchAt(R.childCount)}),x=R.content}this.unplaced=u?e==0?w.empty:new w(O(o.content,e-1,1),e-1,d<0?o.openEnd:e-1):new w(O(o.content,e,h),o.openStart,o.openEnd)}mustMoveInline(){if(!this.$to.parent.isTextblock)return-1;let e=this.frontier[this.depth],t;if(!e.type.isTextblock||!D(this.$to,this.$to.depth,e.type,e.match,!1)||this.$to.depth==this.depth&&(t=this.findCloseLevel(this.$to))&&t.depth==this.depth)return-1;let{depth:r}=this.$to,n=this.$to.after(r);for(;r>1&&n==this.$to.end(--r);)++n;return n}findCloseLevel(e){e:for(let t=Math.min(this.depth,e.depth);t>=0;t--){let{match:r,type:n}=this.frontier[t],i=t<e.depth&&e.end(t+1)==e.pos+(e.depth-(t+1)),o=D(e,t,n,r,i);if(o){for(let l=t-1;l>=0;l--){let{match:a,type:h}=this.frontier[l],p=D(e,l,h,a,!0);if(!p||p.childCount)continue e}return{depth:t,fit:o,move:i?e.doc.resolve(e.after(t+1)):e}}}}close(e){let t=this.findCloseLevel(e);if(!t)return null;for(;this.depth>t.depth;)this.closeFrontierNode();t.fit.childCount&&(this.placed=F(this.placed,t.depth,t.fit)),e=t.move;for(let r=t.depth+1;r<=e.depth;r++){let n=e.node(r),i=n.type.contentMatch.fillBefore(n.content,!0,e.index(r));this.openFrontierNode(n.type,n.attrs,i)}return e}openFrontierNode(e,t=null,r){let n=this.frontier[this.depth];n.match=n.match.matchType(e),this.placed=F(this.placed,this.depth,g.from(e.create(t,r))),this.frontier.push({type:e,match:e.contentMatch})}closeFrontierNode(){let t=this.frontier.pop().match.fillBefore(g.empty,!0);t.childCount&&(this.placed=F(this.placed,this.frontier.length,t))}}function O(s,e,t){return e==0?s.cutByIndex(t,s.childCount):s.replaceChild(0,s.firstChild.copy(O(s.firstChild.content,e-1,t)))}function F(s,e,t){return e==0?s.append(t):s.replaceChild(s.childCount-1,s.lastChild.copy(F(s.lastChild.content,e-1,t)))}function W(s,e){for(let t=0;t<e;t++)s=s.firstChild.content;return s}function te(s,e,t){if(e<=0)return s;let r=s.content;return e>1&&(r=r.replaceChild(0,te(r.firstChild,e-1,r.childCount==1?t-1:0))),e>0&&(r=s.type.contentMatch.fillBefore(r).append(r),t<=0&&(r=r.append(s.type.contentMatch.matchFragment(r).fillBefore(g.empty,!0)))),s.copy(r)}function D(s,e,t,r,n){let i=s.node(e),o=n?s.indexAfter(e):s.index(e);if(o==i.childCount&&!t.compatibleContent(i.type))return null;let l=r.fillBefore(i.content,!0,o);return l&&!Ne(t,i.content,o)?l:null}function Ne(s,e,t){for(let r=t;r<e.childCount;r++)if(!s.allowsMarks(e.child(r).marks))return!0;return!1}function Re(s){return s.spec.defining||s.spec.definingForContent}function Ie(s,e,t,r){if(!r.size)return s.deleteRange(e,t);let n=s.doc.resolve(e),i=s.doc.resolve(t);if(ee(n,i,r))return s.step(new v(e,t,r));let o=ne(n,s.doc.resolve(t));o[o.length-1]==0&&o.pop();let l=-(n.depth+1);o.unshift(l);for(let f=n.depth,d=n.pos-1;f>0;f--,d--){let u=n.node(f).type.spec;if(u.defining||u.definingAsContext||u.isolating)break;o.indexOf(f)>-1?l=f:n.before(f)==d&&o.splice(1,0,-f)}let a=o.indexOf(l),h=[],p=r.openStart;for(let f=r.content,d=0;;d++){let u=f.firstChild;if(h.push(u),d==r.openStart)break;f=u.content}for(let f=p-1;f>=0;f--){let d=h[f],u=Re(d.type);if(u&&!d.sameMarkup(n.node(Math.abs(l)-1)))p=f;else if(u||!d.type.isTextblock)break}for(let f=r.openStart;f>=0;f--){let d=(f+p+1)%(r.openStart+1),u=h[d];if(u)for(let m=0;m<o.length;m++){let x=o[(m+a)%o.length],R=!0;x<0&&(R=!1,x=-x);let ie=n.node(x-1),G=n.index(x-1);if(ie.canReplaceWith(G,G,u.type,u.marks))return s.replace(n.before(x),R?i.after(x):t,new w(re(r.content,0,r.openStart,d),d,r.openEnd))}}let c=s.steps.length;for(let f=o.length-1;f>=0&&(s.replace(e,t,r),!(s.steps.length>c));f--){let d=o[f];d<0||(e=n.before(d),t=i.after(d))}}function re(s,e,t,r,n){if(e<t){let i=s.firstChild;s=s.replaceChild(0,i.copy(re(i.content,e+1,t,r,i)))}if(e>r){let i=n.contentMatchAt(0),o=i.fillBefore(s).append(s);s=o.append(i.matchFragment(o).fillBefore(g.empty,!0))}return s}function Te(s,e,t,r){if(!r.isInline&&e==t&&s.doc.resolve(e).parent.content.size){let n=be(s.doc,e,r.type);n!=null&&(e=t=n)}s.replaceRange(e,t,new w(g.from(r),0,0))}function Ee(s,e,t){let r=s.doc.resolve(e),n=s.doc.resolve(t),i=ne(r,n);for(let o=0;o<i.length;o++){let l=i[o],a=o==i.length-1;if(a&&l==0||r.node(l).type.contentMatch.validEnd)return s.delete(r.start(l),n.end(l));if(l>0&&(a||r.node(l-1).canReplace(r.index(l-1),n.indexAfter(l-1))))return s.delete(r.before(l),n.after(l))}for(let o=1;o<=r.depth&&o<=n.depth;o++)if(e-r.start(o)==r.depth-o&&t>r.end(o)&&n.end(o)-t!=n.depth-o&&r.start(o-1)==n.start(o-1)&&r.node(o-1).canReplace(r.index(o-1),n.index(o-1)))return s.delete(r.before(o),t);s.delete(e,t)}function ne(s,e){let t=[],r=Math.min(s.depth,e.depth);for(let n=r;n>=0;n--){let i=s.start(n);if(i<s.pos-(s.depth-n)||e.end(n)>e.pos+(e.depth-n)||s.node(n).type.spec.isolating||e.node(n).type.spec.isolating)break;(i==e.start(n)||n==s.depth&&n==e.depth&&s.parent.inlineContent&&e.parent.inlineContent&&n&&e.start(n-1)==i-1)&&t.push(n)}return t}class I extends k{constructor(e,t,r){super(),this.pos=e,this.attr=t,this.value=r}apply(e){let t=e.nodeAt(this.pos);if(!t)return y.fail("No node at attribute step's position");let r=Object.create(null);for(let i in t.attrs)r[i]=t.attrs[i];r[this.attr]=this.value;let n=t.type.create(r,null,t.marks);return y.fromReplace(e,this.pos,this.pos+1,new w(g.from(n),0,t.isLeaf?0:1))}getMap(){return S.empty}invert(e){return new I(this.pos,this.attr,e.nodeAt(this.pos).attrs[this.attr])}map(e){let t=e.mapResult(this.pos,1);return t.deletedAfter?null:new I(t.pos,this.attr,this.value)}toJSON(){return{stepType:"attr",pos:this.pos,attr:this.attr,value:this.value}}static fromJSON(e,t){if(typeof t.pos!="number"||typeof t.attr!="string")throw new RangeError("Invalid input for AttrStep.fromJSON");return new I(t.pos,t.attr,t.value)}}k.jsonID("attr",I);class J extends k{constructor(e,t){super(),this.attr=e,this.value=t}apply(e){let t=Object.create(null);for(let n in e.attrs)t[n]=e.attrs[n];t[this.attr]=this.value;let r=e.type.create(t,e.content,e.marks);return y.ok(r)}getMap(){return S.empty}invert(e){return new J(this.attr,e.attrs[this.attr])}map(e){return this}toJSON(){return{stepType:"docAttr",attr:this.attr,value:this.value}}static fromJSON(e,t){if(typeof t.attr!="string")throw new RangeError("Invalid input for DocAttrStep.fromJSON");return new J(t.attr,t.value)}}k.jsonID("docAttr",J);let E=class extends Error{};E=function s(e){let t=Error.call(this,e);return t.__proto__=s.prototype,t};E.prototype=Object.create(Error.prototype);E.prototype.constructor=E;E.prototype.name="TransformError";class De{constructor(e){this.doc=e,this.steps=[],this.docs=[],this.mapping=new z}get before(){return this.docs.length?this.docs[0]:this.doc}step(e){let t=this.maybeStep(e);if(t.failed)throw new E(t.failed);return this}maybeStep(e){let t=e.apply(this.doc);return t.failed||this.addStep(e,t.doc),t}get docChanged(){return this.steps.length>0}addStep(e,t){this.docs.push(this.doc),this.steps.push(e),this.mapping.appendMap(e.getMap()),this.doc=t}replace(e,t=e,r=w.empty){let n=Me(this.doc,e,t,r);return n&&this.step(n),this}replaceWith(e,t,r){return this.replace(e,t,new w(g.from(r),0,0))}delete(e,t){return this.replace(e,t,w.empty)}insert(e,t){return this.replaceWith(e,e,t)}replaceRange(e,t,r){return Ie(this,e,t,r),this}replaceRangeWith(e,t,r){return Te(this,e,t,r),this}deleteRange(e,t){return Ee(this,e,t),this}lift(e,t){return de(this,e,t),this}join(e,t=1){return Se(this,e,t),this}wrap(e,t){return we(this,e,t),this}setBlockType(e,t=e,r,n=null){return ge(this,e,t,r,n),this}setNodeMarkup(e,t,r=null,n){return ke(this,e,t,r,n),this}setNodeAttribute(e,t,r){return this.step(new I(e,t,r)),this}setDocAttribute(e,t){return this.step(new J(e,t)),this}addNodeMark(e,t){return this.step(new N(e,t)),this}removeNodeMark(e,t){if(!(t instanceof oe)){let r=this.doc.nodeAt(e);if(!r)throw new RangeError("No node at position "+e);if(t=t.isInSet(r.marks),!t)return this}return this.step(new T(e,t)),this}split(e,t=1,r){return ve(this,e,t,r),this}addMark(e,t,r){return pe(this,e,t,r),this}removeMark(e,t,r){return fe(this,e,t,r),this}clearIncompatible(e,t,r){return $(this,e,t,r),this}}export{z as M,v as R,De as T,Je as a,M as b,Ae as c,We as d,ze as f,Be as j,Fe as l,Me as r};
