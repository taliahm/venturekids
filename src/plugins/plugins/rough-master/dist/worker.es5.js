!function(){"use strict";function t(t,e){return t.type===e}var e={A:7,a:7,C:6,c:6,H:1,h:1,L:2,l:2,M:2,m:2,Q:4,q:4,S:4,s:4,T:4,t:2,V:1,v:1,Z:0,z:0},i=function(){function i(t){this.COMMAND=0,this.NUMBER=1,this.EOD=2,this.segments=[],this.parseData(t),this.processPoints()}return i.prototype.tokenize=function(t){for(var e=new Array;""!==t;)if(t.match(/^([ \t\r\n,]+)/))t=t.substr(RegExp.$1.length);else if(t.match(/^([aAcChHlLmMqQsStTvVzZ])/))e[e.length]={type:this.COMMAND,text:RegExp.$1},t=t.substr(RegExp.$1.length);else{if(!t.match(/^(([-+]?[0-9]+(\.[0-9]*)?|[-+]?\.[0-9]+)([eE][-+]?[0-9]+)?)/))return console.error("Unrecognized segment command: "+t),[];e[e.length]={type:this.NUMBER,text:""+parseFloat(RegExp.$1)},t=t.substr(RegExp.$1.length)}return e[e.length]={type:this.EOD,text:""},e},i.prototype.parseData=function(i){var s=this.tokenize(i),a=0,n=s[a],r="BOD";for(this.segments=new Array;!t(n,this.EOD);){var h=void 0,o=new Array;if("BOD"===r){if("M"!==n.text&&"m"!==n.text)return void this.parseData("M0,0"+i);a++,h=e[n.text],r=n.text}else t(n,this.NUMBER)?h=e[r]:(a++,h=e[n.text],r=n.text);if(a+h<s.length){for(var p=a;p<a+h;p++){var c=s[p];if(!t(c,this.NUMBER))return void console.error("Parameter type is not a number: "+r+","+c.text);o[o.length]=+c.text}if("number"!=typeof e[r])return void console.error("Unsupported segment type: "+r);var u={key:r,data:o};this.segments.push(u),n=s[a+=h],"M"===r&&(r="L"),"m"===r&&(r="l")}else console.error("Path data ended before all parameters were found")}},Object.defineProperty(i.prototype,"closed",{get:function(){if(void 0===this._closed){this._closed=!1;for(var t=0,e=this.segments;t<e.length;t++){"z"===e[t].key.toLowerCase()&&(this._closed=!0)}}return this._closed},enumerable:!0,configurable:!0}),i.prototype.processPoints=function(){for(var t=null,e=[0,0],i=0;i<this.segments.length;i++){var s=this.segments[i];switch(s.key){case"M":case"L":case"T":s.point=[s.data[0],s.data[1]];break;case"m":case"l":case"t":s.point=[s.data[0]+e[0],s.data[1]+e[1]];break;case"H":s.point=[s.data[0],e[1]];break;case"h":s.point=[s.data[0]+e[0],e[1]];break;case"V":s.point=[e[0],s.data[0]];break;case"v":s.point=[e[0],s.data[0]+e[1]];break;case"z":case"Z":t&&(s.point=[t[0],t[1]]);break;case"C":s.point=[s.data[4],s.data[5]];break;case"c":s.point=[s.data[4]+e[0],s.data[5]+e[1]];break;case"S":s.point=[s.data[2],s.data[3]];break;case"s":s.point=[s.data[2]+e[0],s.data[3]+e[1]];break;case"Q":s.point=[s.data[2],s.data[3]];break;case"q":s.point=[s.data[2]+e[0],s.data[3]+e[1]];break;case"A":s.point=[s.data[5],s.data[6]];break;case"a":s.point=[s.data[5]+e[0],s.data[6]+e[1]]}"m"!==s.key&&"M"!==s.key||(t=null),s.point&&(e=s.point,t||(t=s.point)),"z"!==s.key&&"Z"!==s.key||(t=null)}},i}(),s=function(){function t(t){this._position=[0,0],this._first=null,this.bezierReflectionPoint=null,this.quadReflectionPoint=null,this.parsed=new i(t)}return Object.defineProperty(t.prototype,"segments",{get:function(){return this.parsed.segments},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"closed",{get:function(){return this.parsed.closed},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"linearPoints",{get:function(){if(!this._linearPoints){for(var t=[],e=[],i=0,s=this.parsed.segments;i<s.length;i++){var a=s[i],n=a.key.toLowerCase();("m"!==n&&"z"!==n||(e.length&&(t.push(e),e=[]),"z"!==n))&&(a.point&&e.push(a.point))}e.length&&(t.push(e),e=[]),this._linearPoints=t}return this._linearPoints},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"first",{get:function(){return this._first},set:function(t){this._first=t},enumerable:!0,configurable:!0}),t.prototype.setPosition=function(t,e){this._position=[t,e],this._first||(this._first=[t,e])},Object.defineProperty(t.prototype,"position",{get:function(){return this._position},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"x",{get:function(){return this._position[0]},enumerable:!0,configurable:!0}),Object.defineProperty(t.prototype,"y",{get:function(){return this._position[1]},enumerable:!0,configurable:!0}),t}(),a=function(){function t(t,e,i,s,a,n){if(this._segIndex=0,this._numSegs=0,this._rx=0,this._ry=0,this._sinPhi=0,this._cosPhi=0,this._C=[0,0],this._theta=0,this._delta=0,this._T=0,this._from=t,t[0]!==e[0]||t[1]!==e[1]){var r=Math.PI/180;this._rx=Math.abs(i[0]),this._ry=Math.abs(i[1]),this._sinPhi=Math.sin(s*r),this._cosPhi=Math.cos(s*r);var h=this._cosPhi*(t[0]-e[0])/2+this._sinPhi*(t[1]-e[1])/2,o=-this._sinPhi*(t[0]-e[0])/2+this._cosPhi*(t[1]-e[1])/2,p=0,c=this._rx*this._rx*this._ry*this._ry-this._rx*this._rx*o*o-this._ry*this._ry*h*h;if(c<0){var u=Math.sqrt(1-c/(this._rx*this._rx*this._ry*this._ry));this._rx=this._rx*u,this._ry=this._ry*u,p=0}else p=(a===n?-1:1)*Math.sqrt(c/(this._rx*this._rx*o*o+this._ry*this._ry*h*h));var l=p*this._rx*o/this._ry,f=-p*this._ry*h/this._rx;this._C=[0,0],this._C[0]=this._cosPhi*l-this._sinPhi*f+(t[0]+e[0])/2,this._C[1]=this._sinPhi*l+this._cosPhi*f+(t[1]+e[1])/2,this._theta=this.calculateVectorAngle(1,0,(h-l)/this._rx,(o-f)/this._ry);var d=this.calculateVectorAngle((h-l)/this._rx,(o-f)/this._ry,(-h-l)/this._rx,(-o-f)/this._ry);!n&&d>0?d-=2*Math.PI:n&&d<0&&(d+=2*Math.PI),this._numSegs=Math.ceil(Math.abs(d/(Math.PI/2))),this._delta=d/this._numSegs,this._T=8/3*Math.sin(this._delta/4)*Math.sin(this._delta/4)/Math.sin(this._delta/2)}}return t.prototype.getNextSegment=function(){if(this._segIndex===this._numSegs)return null;var t=Math.cos(this._theta),e=Math.sin(this._theta),i=this._theta+this._delta,s=Math.cos(i),a=Math.sin(i),n=[this._cosPhi*this._rx*s-this._sinPhi*this._ry*a+this._C[0],this._sinPhi*this._rx*s+this._cosPhi*this._ry*a+this._C[1]],r=[this._from[0]+this._T*(-this._cosPhi*this._rx*e-this._sinPhi*this._ry*t),this._from[1]+this._T*(-this._sinPhi*this._rx*e+this._cosPhi*this._ry*t)],h=[n[0]+this._T*(this._cosPhi*this._rx*a+this._sinPhi*this._ry*s),n[1]+this._T*(this._sinPhi*this._rx*a-this._cosPhi*this._ry*s)];return this._theta=i,this._from=[n[0],n[1]],this._segIndex++,{cp1:r,cp2:h,to:n}},t.prototype.calculateVectorAngle=function(t,e,i,s){var a=Math.atan2(e,t),n=Math.atan2(s,i);return n>=a?n-a:2*Math.PI-(a-n)},t}(),n=function(){function t(t,e){this.sets=t,this.closed=e}return t.prototype.fit=function(t){for(var e=[],i=0,s=this.sets;i<s.length;i++){var a=(p=s[i]).length,n=Math.floor(t*a);if(n<5){if(a<=5)continue;n=5}e.push(this.reduce(p,n))}for(var r="",h=0,o=e;h<o.length;h++){for(var p=o[h],c=0;c<p.length;c++){var u=p[c];r+=0===c?"M"+u[0]+","+u[1]:"L"+u[0]+","+u[1]}this.closed&&(r+="z ")}return r},t.prototype.distance=function(t,e){return Math.sqrt(Math.pow(t[0]-e[0],2)+Math.pow(t[1]-e[1],2))},t.prototype.reduce=function(t,e){if(t.length<=e)return t;for(var i=t.slice(0);i.length>e;){for(var s=[],a=-1,n=-1,r=1;r<i.length-1;r++){var h=this.distance(i[r-1],i[r]),o=this.distance(i[r],i[r+1]),p=this.distance(i[r-1],i[r+1]),c=(h+o+p)/2,u=Math.sqrt(c*(c-h)*(c-o)*(c-p));s.push(u),(a<0||u<a)&&(a=u,n=r)}if(!(n>0))break;i.splice(n,1)}return i},t}(),r=function(){function t(t,e){this.xi=Number.MAX_VALUE,this.yi=Number.MAX_VALUE,this.px1=t[0],this.py1=t[1],this.px2=e[0],this.py2=e[1],this.a=this.py2-this.py1,this.b=this.px1-this.px2,this.c=this.px2*this.py1-this.px1*this.py2,this._undefined=0===this.a&&0===this.b&&0===this.c}return t.prototype.isUndefined=function(){return this._undefined},t.prototype.intersects=function(t){if(this.isUndefined()||t.isUndefined())return!1;var e=Number.MAX_VALUE,i=Number.MAX_VALUE,s=0,a=0,n=this.a,r=this.b,h=this.c;return Math.abs(r)>1e-5&&(e=-n/r,s=-h/r),Math.abs(t.b)>1e-5&&(i=-t.a/t.b,a=-t.c/t.b),e===Number.MAX_VALUE?i===Number.MAX_VALUE?-h/n==-t.c/t.a&&(this.py1>=Math.min(t.py1,t.py2)&&this.py1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.py2>=Math.min(t.py1,t.py2)&&this.py2<=Math.max(t.py1,t.py2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=this.px1,this.yi=i*this.xi+a,!((this.py1-this.yi)*(this.yi-this.py2)<-1e-5||(t.py1-this.yi)*(this.yi-t.py2)<-1e-5)&&(!(Math.abs(t.a)<1e-5)||!((t.px1-this.xi)*(this.xi-t.px2)<-1e-5))):i===Number.MAX_VALUE?(this.xi=t.px1,this.yi=e*this.xi+s,!((t.py1-this.yi)*(this.yi-t.py2)<-1e-5||(this.py1-this.yi)*(this.yi-this.py2)<-1e-5)&&(!(Math.abs(n)<1e-5)||!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5))):e===i?s===a&&(this.px1>=Math.min(t.px1,t.px2)&&this.px1<=Math.max(t.py1,t.py2)?(this.xi=this.px1,this.yi=this.py1,!0):this.px2>=Math.min(t.px1,t.px2)&&this.px2<=Math.max(t.px1,t.px2)&&(this.xi=this.px2,this.yi=this.py2,!0)):(this.xi=(a-s)/(e-i),this.yi=e*this.xi+s,!((this.px1-this.xi)*(this.xi-this.px2)<-1e-5||(t.px1-this.xi)*(this.xi-t.px2)<-1e-5))},t}();var h=function(){function t(t,e,i,s,a,n,h,o){this.deltaX=0,this.hGap=0,this.top=t,this.bottom=e,this.left=i,this.right=s,this.gap=a,this.sinAngle=n,this.tanAngle=o,Math.abs(n)<1e-4?this.pos=i+a:Math.abs(n)>.9999?this.pos=t+a:(this.deltaX=(e-t)*Math.abs(o),this.pos=i-Math.abs(this.deltaX),this.hGap=Math.abs(a/h),this.sLeft=new r([i,e],[i,t]),this.sRight=new r([s,e],[s,t]))}return t.prototype.nextLine=function(){if(Math.abs(this.sinAngle)<1e-4){if(this.pos<this.right){var t=[this.pos,this.top,this.pos,this.bottom];return this.pos+=this.gap,t}}else if(Math.abs(this.sinAngle)>.9999){if(this.pos<this.bottom){t=[this.left,this.pos,this.right,this.pos];return this.pos+=this.gap,t}}else{var e=this.pos-this.deltaX/2,i=this.pos+this.deltaX/2,s=this.bottom,a=this.top;if(this.pos<this.right+this.deltaX){for(;e<this.left&&i<this.left||e>this.right&&i>this.right;)if(this.pos+=this.hGap,e=this.pos-this.deltaX/2,i=this.pos+this.deltaX/2,this.pos>this.right+this.deltaX)return null;var n=new r([e,s],[i,a]);this.sLeft&&n.intersects(this.sLeft)&&(e=n.xi,s=n.yi),this.sRight&&n.intersects(this.sRight)&&(i=n.xi,a=n.yi),this.tanAngle>0&&(e=this.right-(e-this.left),i=this.right-(i-this.left));t=[e,s,i,a];return this.pos+=this.hGap,t}}return null},t}();function o(t){var e=t[0],i=t[1];return Math.sqrt(Math.pow(e[0]-i[0],2)+Math.pow(e[1]-i[1],2))}function p(t,e){for(var i=[],s=new r([t[0],t[1]],[t[2],t[3]]),a=0;a<e.length;a++){var n=new r(e[a],e[(a+1)%e.length]);s.intersects(n)&&i.push([s.xi,s.yi])}return i}function c(t,e,i,s,a,n,r){return[-i*n-s*a+i+n*t+a*e,r*(i*a-s*n)+s+-r*a*t+r*n*e]}function u(t,e){var i=[];if(t&&t.length){for(var s=t[0][0],a=t[0][0],n=t[0][1],r=t[0][1],o=1;o<t.length;o++)s=Math.min(s,t[o][0]),a=Math.max(a,t[o][0]),n=Math.min(n,t[o][1]),r=Math.max(r,t[o][1]);var c=e.hachureAngle,u=e.hachureGap;u<0&&(u=4*e.strokeWidth),u=Math.max(u,.1);for(var l=c%180*(Math.PI/180),f=Math.cos(l),d=Math.sin(l),y=Math.tan(l),g=new h(n-1,r+1,s-1,a+1,u,d,f,y),M=void 0;null!=(M=g.nextLine());){var v=p(M,t);for(o=0;o<v.length;o++)if(o<v.length-1){var _=v[o],x=v[o+1];i.push([_,x])}}}return i}function l(t,e,i,s,a,n){var r=[],h=Math.abs(s/2),o=Math.abs(a/2);h+=t.randOffset(.05*h,n),o+=t.randOffset(.05*o,n);var p=n.hachureAngle,u=n.hachureGap;u<=0&&(u=4*n.strokeWidth);var l=n.fillWeight;l<0&&(l=n.strokeWidth/2);for(var f=p%180*(Math.PI/180),d=Math.tan(f),y=o/h,g=Math.sqrt(y*d*y*d+1),M=y*d/g,v=1/g,_=u/(h*o/Math.sqrt(o*v*(o*v)+h*M*(h*M))/h),x=Math.sqrt(h*h-(e-h+_)*(e-h+_)),b=e-h+_;b<e+h;b+=_){var m=c(b,i-(x=Math.sqrt(h*h-(e-b)*(e-b))),e,i,M,v,y),P=c(b,i+x,e,i,M,v,y);r.push([m,P])}return r}var f=function(){function t(t){this.helper=t}return t.prototype.fillPolygon=function(t,e){return this._fillPolygon(t,e)},t.prototype.fillEllipse=function(t,e,i,s,a){return this._fillEllipse(t,e,i,s,a)},t.prototype.fillArc=function(t,e,i,s,a,n,r){return null},t.prototype._fillPolygon=function(t,e,i){void 0===i&&(i=!1);var s=u(t,e);return{type:"fillSketch",ops:this.renderLines(s,e,i)}},t.prototype._fillEllipse=function(t,e,i,s,a,n){void 0===n&&(n=!1);var r=l(this.helper,t,e,i,s,a);return{type:"fillSketch",ops:this.renderLines(r,a,n)}},t.prototype.renderLines=function(t,e,i){for(var s=[],a=null,n=0,r=t;n<r.length;n++){var h=r[n];s=s.concat(this.helper.doubleLineOps(h[0][0],h[0][1],h[1][0],h[1][1],e)),i&&a&&(s=s.concat(this.helper.doubleLineOps(a[0],a[1],h[0][0],h[0][1],e))),a=h[1]}return s},t}(),d=function(t,e){return(d=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,e){t.__proto__=e}||function(t,e){for(var i in e)e.hasOwnProperty(i)&&(t[i]=e[i])})(t,e)};function y(t,e){function i(){this.constructor=t}d(t,e),t.prototype=null===e?Object.create(e):(i.prototype=e.prototype,new i)}var g=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return y(e,t),e.prototype.fillPolygon=function(t,e){return this._fillPolygon(t,e,!0)},e.prototype.fillEllipse=function(t,e,i,s,a){return this._fillEllipse(t,e,i,s,a,!0)},e}(f),M=function(t){function e(){return null!==t&&t.apply(this,arguments)||this}return y(e,t),e.prototype.fillPolygon=function(t,e){var i=this._fillPolygon(t,e),s=Object.assign({},e,{hachureAngle:e.hachureAngle+90}),a=this._fillPolygon(t,s);return i.ops=i.ops.concat(a.ops),i},e.prototype.fillEllipse=function(t,e,i,s,a){var n=this._fillEllipse(t,e,i,s,a),r=Object.assign({},a,{hachureAngle:a.hachureAngle+90}),h=this._fillEllipse(t,e,i,s,r);return n.ops=n.ops.concat(h.ops),n},e}(f),v=function(){function t(t){this.helper=t}return t.prototype.fillPolygon=function(t,e){var i=u(t,e=Object.assign({},e,{curveStepCount:4,hachureAngle:0}));return this.dotsOnLines(i,e)},t.prototype.fillEllipse=function(t,e,i,s,a){a=Object.assign({},a,{curveStepCount:4,hachureAngle:0});var n=l(this.helper,t,e,i,s,a);return this.dotsOnLines(n,a)},t.prototype.fillArc=function(t,e,i,s,a,n,r){return null},t.prototype.dotsOnLines=function(t,e){var i=[],s=e.hachureGap;s<0&&(s=4*e.strokeWidth),s=Math.max(s,.1);var a=e.fillWeight;a<0&&(a=e.strokeWidth/2);for(var n=0,r=t;n<r.length;n++)for(var h=r[n],p=o(h)/s,c=Math.ceil(p)-1,u=Math.atan((h[1][1]-h[0][1])/(h[1][0]-h[0][0])),l=0;l<c;l++){var f=s*(l+1),d=f*Math.sin(u),y=f*Math.cos(u),g=[h[0][0]-y,h[0][1]+d],M=this.helper.randOffsetWithRange(g[0]-s/4,g[0]+s/4,e),v=this.helper.randOffsetWithRange(g[1]-s/4,g[1]+s/4,e),_=this.helper.ellipse(M,v,a,a,e);i=i.concat(_.ops)}return{type:"fillSketch",ops:i}},t}(),_=function(){function t(t){this.helper=t}return t.prototype.fillPolygon=function(t,e){var i=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER],s=[Number.MAX_SAFE_INTEGER,Number.MIN_SAFE_INTEGER];t.forEach(function(t){i[0]=Math.min(i[0],t[0]),i[1]=Math.max(i[1],t[0]),s[0]=Math.min(s[0],t[1]),s[1]=Math.max(s[1],t[1])});var a=function(t){for(var e=0,i=0,s=0,a=0;a<t.length;a++){var n=t[a],r=a===t.length-1?t[0]:t[a+1];e+=n[0]*r[1]-r[0]*n[1]}for(e/=2,a=0;a<t.length;a++)n=t[a],r=a===t.length-1?t[0]:t[a+1],i+=(n[0]+r[0])*(n[0]*r[1]-r[0]*n[1]),s+=(n[1]+r[1])*(n[0]*r[1]-r[0]*n[1]);return[i/(6*e),s/(6*e)]}(t),n=Math.max(Math.sqrt(Math.pow(a[0]-i[0],2)+Math.pow(a[1]-s[0],2)),Math.sqrt(Math.pow(a[0]-i[1],2)+Math.pow(a[1]-s[1],2))),r=e.hachureGap>0?e.hachureGap:4*e.strokeWidth,h=[];if(t.length>2)for(var o=0;o<t.length;o++)o===t.length-1?h.push([t[o],t[0]]):h.push([t[o],t[o+1]]);var p=[],c=Math.max(1,Math.PI*n/r),u=function(t){var e=t*Math.PI/c,r=[a,[a[0]+n*Math.cos(e),a[1]+n*Math.sin(e)]];h.forEach(function(t){var e,a,n,h,o,c,u,l,f,d=(a=r,n=(e=t)[1][1]-e[0][1],h=e[0][0]-e[1][0],o=n*e[0][0]+h*e[0][1],c=a[1][1]-a[0][1],u=a[0][0]-a[1][0],l=c*a[0][0]+u*a[0][1],(f=n*u-c*h)?[Math.round((u*o-h*l)/f),Math.round((n*l-c*o)/f)]:null);d&&d[0]>=i[0]&&d[0]<=i[1]&&d[1]>=s[0]&&d[1]<=s[1]&&p.push(d)})};for(o=0;o<c;o++)u(o);p=this.removeDuplocatePoints(p);var l=this.createLinesFromCenter(a,p);return{type:"fillSketch",ops:this.drawLines(l,e)}},t.prototype.fillEllipse=function(t,e,i,s,a){return this.fillArcSegment(t,e,i,s,0,2*Math.PI,a)},t.prototype.fillArc=function(t,e,i,s,a,n,r){return this.fillArcSegment(t,e,i,s,a,n,r)},t.prototype.fillArcSegment=function(t,e,i,s,a,n,r){var h=[t,e],o=i/2,p=s/2,c=Math.max(i/2,s/2),u=r.hachureGap;u<0&&(u=4*r.strokeWidth);for(var l=Math.max(1,Math.abs(n-a)*c/u),f=[],d=0;d<l;d++){var y=d*((n-a)/l)+a,g=c*Math.cos(y),M=c*Math.sin(y),v=Math.sqrt(o*o*M*M+p*p*g*g),_=o*p*g/v,x=o*p*M/v;f.push([h[0]+_,h[1]+x])}f=this.removeDuplocatePoints(f);var b=this.createLinesFromCenter(h,f);return{type:"fillSketch",ops:this.drawLines(b,r)}},t.prototype.drawLines=function(t,e){var i=this,s=[];return t.forEach(function(t){var a=t[0],n=t[1];s=s.concat(i.helper.doubleLineOps(a[0],a[1],n[0],n[1],e))}),s},t.prototype.createLinesFromCenter=function(t,e){return e.map(function(e){return[t,e]})},t.prototype.removeDuplocatePoints=function(t){var e=new Set;return t.filter(function(t){var i=t.join(",");return!e.has(i)&&(e.add(i),!0)})},t}(),x=function(){function t(t){this.helper=t}return t.prototype.fillPolygon=function(t,e){var i=u(t,e);return{type:"fillSketch",ops:this.dashedLine(i,e)}},t.prototype.fillEllipse=function(t,e,i,s,a){var n=l(this.helper,t,e,i,s,a);return{type:"fillSketch",ops:this.dashedLine(n,a)}},t.prototype.fillArc=function(t,e,i,s,a,n,r){return null},t.prototype.dashedLine=function(t,e){var i=this,s=e.dashOffset<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashOffset,a=e.dashGap<0?e.hachureGap<0?4*e.strokeWidth:e.hachureGap:e.dashGap,n=[];return t.forEach(function(t){var r=o(t),h=Math.floor(r/(s+a)),p=(r+a-h*(s+a))/2,c=t[0],u=t[1];c[0]>u[0]&&(c=t[1],u=t[0]);for(var l=Math.atan((u[1]-c[1])/(u[0]-c[0])),f=0;f<h;f++){var d=f*(s+a),y=d+s,g=[c[0]+d*Math.cos(l)+p*Math.cos(l),c[1]+d*Math.sin(l)+p*Math.sin(l)],M=[c[0]+y*Math.cos(l)+p*Math.cos(l),c[1]+y*Math.sin(l)+p*Math.sin(l)];n=n.concat(i.helper.doubleLineOps(g[0],g[1],M[0],M[1],e))}}),n},t}(),b=function(){function t(t){this.helper=t}return t.prototype.fillPolygon=function(t,e){var i=e.hachureGap<0?4*e.strokeWidth:e.hachureGap,s=e.zigzagOffset<0?i:e.zigzagOffset,a=u(t,e=Object.assign({},e,{hachureGap:i+s}));return{type:"fillSketch",ops:this.zigzagLines(a,s,e)}},t.prototype.fillEllipse=function(t,e,i,s,a){var n=a.hachureGap<0?4*a.strokeWidth:a.hachureGap,r=a.zigzagOffset<0?n:a.zigzagOffset;a=Object.assign({},a,{hachureGap:n+r});var h=l(this.helper,t,e,i,s,a);return{type:"fillSketch",ops:this.zigzagLines(h,r,a)}},t.prototype.fillArc=function(t,e,i,s,a,n,r){return null},t.prototype.zigzagLines=function(t,e,i){var s=this,a=[];return t.forEach(function(t){var n=o(t),r=Math.round(n/(2*e)),h=t[0],p=t[1];h[0]>p[0]&&(h=t[1],p=t[0]);for(var c=Math.atan((p[1]-h[1])/(p[0]-h[0])),u=0;u<r;u++){var l=2*u*e,f=2*(u+1)*e,d=Math.sqrt(2*Math.pow(e,2)),y=[h[0]+l*Math.cos(c),h[1]+l*Math.sin(c)],g=[h[0]+f*Math.cos(c),h[1]+f*Math.sin(c)],M=[y[0]+d*Math.cos(c+Math.PI/4),y[1]+d*Math.sin(c+Math.PI/4)];a=(a=a.concat(s.helper.doubleLineOps(y[0],y[1],M[0],M[1],i))).concat(s.helper.doubleLineOps(M[0],M[1],g[0],g[1],i))}}),a},t}(),m={};function P(t,e){var i=t.fillStyle||"hachure";if(!m[i])switch(i){case"zigzag":m[i]||(m[i]=new g(e));break;case"cross-hatch":m[i]||(m[i]=new M(e));break;case"dots":m[i]||(m[i]=new v(e));break;case"starburst":m[i]||(m[i]=new _(e));break;case"dashed":m[i]||(m[i]=new x(e));break;case"zigzag-line":m[i]||(m[i]=new b(e));break;case"hachure":default:m[i="hachure"]||(m[i]=new f(e))}return m[i]}var k={randOffset:S,randOffsetWithRange:R,ellipse:w,doubleLineOps:I};function O(t,e,i,s,a){return{type:"path",ops:N(t,e,i,s,a)}}function A(t,e,i){var s=(t||[]).length;if(s>2){for(var a=[],n=0;n<s-1;n++)a=a.concat(N(t[n][0],t[n][1],t[n+1][0],t[n+1][1],i));return e&&(a=a.concat(N(t[s-1][0],t[s-1][1],t[0][0],t[0][1],i))),{type:"path",ops:a}}return 2===s?O(t[0][0],t[0][1],t[1][0],t[1][1],i):{type:"path",ops:[]}}function E(t,e){return A(t,!0,e)}function w(t,e,i,s,a){var n=2*Math.PI/a.curveStepCount,r=Math.abs(i/2),h=Math.abs(s/2),o=X(n,t,e,r+=T(.05*r,a),h+=T(.05*h,a),1,n*z(.1,z(.4,1,a),a),a),p=X(n,t,e,r,h,1.5,0,a);return{type:"path",ops:o.concat(p)}}function L(t,e){return P(e,k).fillPolygon(t,e)}function S(t,e){return T(t,e)}function R(t,e,i){return z(t,e,i)}function I(t,e,i,s,a){return N(t,e,i,s,a)}function z(t,e,i){return i.roughness*(Math.random()*(e-t)+t)}function T(t,e){return z(-t,t,e)}function N(t,e,i,s,a){var n=q(t,e,i,s,a,!0,!1),r=q(t,e,i,s,a,!0,!0);return n.concat(r)}function q(t,e,i,s,a,n,r){var h=Math.pow(t-i,2)+Math.pow(e-s,2),o=a.maxRandomnessOffset||0;o*o*100>h&&(o=Math.sqrt(h)/10);var p=o/2,c=.2+.2*Math.random(),u=a.bowing*a.maxRandomnessOffset*(s-e)/200,l=a.bowing*a.maxRandomnessOffset*(t-i)/200;u=T(u,a),l=T(l,a);var f=[],d=function(){return T(p,a)},y=function(){return T(o,a)};return n&&(r?f.push({op:"move",data:[t+d(),e+d()]}):f.push({op:"move",data:[t+T(o,a),e+T(o,a)]})),r?f.push({op:"bcurveTo",data:[u+t+(i-t)*c+d(),l+e+(s-e)*c+d(),u+t+2*(i-t)*c+d(),l+e+2*(s-e)*c+d(),i+d(),s+d()]}):f.push({op:"bcurveTo",data:[u+t+(i-t)*c+y(),l+e+(s-e)*c+y(),u+t+2*(i-t)*c+y(),l+e+2*(s-e)*c+y(),i+y(),s+y()]}),f}function G(t,e,i){var s=[];s.push([t[0][0]+T(e,i),t[0][1]+T(e,i)]),s.push([t[0][0]+T(e,i),t[0][1]+T(e,i)]);for(var a=1;a<t.length;a++)s.push([t[a][0]+T(e,i),t[a][1]+T(e,i)]),a===t.length-1&&s.push([t[a][0]+T(e,i),t[a][1]+T(e,i)]);return C(s,null,i)}function C(t,e,i){var s=t.length,a=[];if(s>3){var n=[],r=1-i.curveTightness;a.push({op:"move",data:[t[1][0],t[1][1]]});for(var h=1;h+2<s;h++){var o=t[h];n[0]=[o[0],o[1]],n[1]=[o[0]+(r*t[h+1][0]-r*t[h-1][0])/6,o[1]+(r*t[h+1][1]-r*t[h-1][1])/6],n[2]=[t[h+1][0]+(r*t[h][0]-r*t[h+2][0])/6,t[h+1][1]+(r*t[h][1]-r*t[h+2][1])/6],n[3]=[t[h+1][0],t[h+1][1]],a.push({op:"bcurveTo",data:[n[1][0],n[1][1],n[2][0],n[2][1],n[3][0],n[3][1]]})}if(e&&2===e.length){var p=i.maxRandomnessOffset;a.push({op:"lineTo",data:[e[0]+T(p,i),e[1]+T(p,i)]})}}else 3===s?(a.push({op:"move",data:[t[1][0],t[1][1]]}),a.push({op:"bcurveTo",data:[t[1][0],t[1][1],t[2][0],t[2][1],t[2][0],t[2][1]]})):2===s&&(a=a.concat(N(t[0][0],t[0][1],t[1][0],t[1][1],i)));return a}function X(t,e,i,s,a,n,r,h){var o=T(.5,h)-Math.PI/2,p=[];p.push([T(n,h)+e+.9*s*Math.cos(o-t),T(n,h)+i+.9*a*Math.sin(o-t)]);for(var c=o;c<2*Math.PI+o-.01;c+=t)p.push([T(n,h)+e+s*Math.cos(c),T(n,h)+i+a*Math.sin(c)]);return p.push([T(n,h)+e+s*Math.cos(o+2*Math.PI+.5*r),T(n,h)+i+a*Math.sin(o+2*Math.PI+.5*r)]),p.push([T(n,h)+e+.98*s*Math.cos(o+r),T(n,h)+i+.98*a*Math.sin(o+r)]),p.push([T(n,h)+e+.9*s*Math.cos(o+.5*r),T(n,h)+i+.9*a*Math.sin(o+.5*r)]),C(p,null,h)}function j(t,e,i,s,a,n,r,h,o){var p=n+T(.1,o),c=[];c.push([T(h,o)+e+.9*s*Math.cos(p-t),T(h,o)+i+.9*a*Math.sin(p-t)]);for(var u=p;u<=r;u+=t)c.push([T(h,o)+e+s*Math.cos(u),T(h,o)+i+a*Math.sin(u)]);return c.push([e+s*Math.cos(r),i+a*Math.sin(r)]),c.push([e+s*Math.cos(r),i+a*Math.sin(r)]),C(c,null,o)}function U(t,e,i,s,a,n,r,h){for(var o=[],p=[h.maxRandomnessOffset||1,(h.maxRandomnessOffset||1)+.5],c=[0,0],u=0;u<2;u++)0===u?o.push({op:"move",data:[r.x,r.y]}):o.push({op:"move",data:[r.x+T(p[0],h),r.y+T(p[0],h)]}),c=[a+T(p[u],h),n+T(p[u],h)],o.push({op:"bcurveTo",data:[t+T(p[u],h),e+T(p[u],h),i+T(p[u],h),s+T(p[u],h),c[0],c[1]]});return r.setPosition(c[0],c[1]),o}function W(t,e,i,s){var n=[];switch(e.key){case"M":case"m":var r="m"===e.key;if(e.data.length>=2){var h=+e.data[0],o=+e.data[1];r&&(h+=t.x,o+=t.y);var p=1*(s.maxRandomnessOffset||0);h+=T(p,s),o+=T(p,s),t.setPosition(h,o),n.push({op:"move",data:[h,o]})}break;case"L":case"l":r="l"===e.key;if(e.data.length>=2){h=+e.data[0],o=+e.data[1];r&&(h+=t.x,o+=t.y),n=n.concat(N(t.x,t.y,h,o,s)),t.setPosition(h,o)}break;case"H":case"h":r="h"===e.key;if(e.data.length){h=+e.data[0];r&&(h+=t.x),n=n.concat(N(t.x,t.y,h,t.y,s)),t.setPosition(h,t.y)}break;case"V":case"v":r="v"===e.key;if(e.data.length){o=+e.data[0];r&&(o+=t.y),n=n.concat(N(t.x,t.y,t.x,o,s)),t.setPosition(t.x,o)}break;case"Z":case"z":t.first&&(n=n.concat(N(t.x,t.y,t.first[0],t.first[1],s)),t.setPosition(t.first[0],t.first[1]),t.first=null);break;case"C":case"c":r="c"===e.key;if(e.data.length>=6){var c=+e.data[0],u=+e.data[1],l=+e.data[2],f=+e.data[3];h=+e.data[4],o=+e.data[5];r&&(c+=t.x,l+=t.x,h+=t.x,u+=t.y,f+=t.y,o+=t.y);var d=U(c,u,l,f,h,o,t,s);n=n.concat(d),t.bezierReflectionPoint=[h+(h-l),o+(o-f)]}break;case"S":case"s":r="s"===e.key;if(e.data.length>=4){l=+e.data[0],f=+e.data[1],h=+e.data[2],o=+e.data[3];r&&(l+=t.x,h+=t.x,f+=t.y,o+=t.y);c=l,u=f;var y=null;"c"!==(_=i?i.key:"")&&"C"!==_&&"s"!==_&&"S"!==_||(y=t.bezierReflectionPoint),y&&(c=y[0],u=y[1]);d=U(c,u,l,f,h,o,t,s);n=n.concat(d),t.bezierReflectionPoint=[h+(h-l),o+(o-f)]}break;case"Q":case"q":r="q"===e.key;if(e.data.length>=4){c=+e.data[0],u=+e.data[1],h=+e.data[2],o=+e.data[3];r&&(c+=t.x,h+=t.x,u+=t.y,o+=t.y);var g=1*(1+.2*s.roughness),M=1.5*(1+.22*s.roughness);n.push({op:"move",data:[t.x+T(g,s),t.y+T(g,s)]});var v=[h+T(g,s),o+T(g,s)];n.push({op:"qcurveTo",data:[c+T(g,s),u+T(g,s),v[0],v[1]]}),n.push({op:"move",data:[t.x+T(M,s),t.y+T(M,s)]}),v=[h+T(M,s),o+T(M,s)],n.push({op:"qcurveTo",data:[c+T(M,s),u+T(M,s),v[0],v[1]]}),t.setPosition(v[0],v[1]),t.quadReflectionPoint=[h+(h-c),o+(o-u)]}break;case"T":case"t":r="t"===e.key;if(e.data.length>=2){h=+e.data[0],o=+e.data[1];r&&(h+=t.x,o+=t.y);var _;c=h,u=o,y=null;"q"!==(_=i?i.key:"")&&"Q"!==_&&"t"!==_&&"T"!==_||(y=t.quadReflectionPoint),y&&(c=y[0],u=y[1]);g=1*(1+.2*s.roughness),M=1.5*(1+.22*s.roughness);n.push({op:"move",data:[t.x+T(g,s),t.y+T(g,s)]});v=[h+T(g,s),o+T(g,s)];n.push({op:"qcurveTo",data:[c+T(g,s),u+T(g,s),v[0],v[1]]}),n.push({op:"move",data:[t.x+T(M,s),t.y+T(M,s)]}),v=[h+T(M,s),o+T(M,s)],n.push({op:"qcurveTo",data:[c+T(M,s),u+T(M,s),v[0],v[1]]}),t.setPosition(v[0],v[1]),t.quadReflectionPoint=[h+(h-c),o+(o-u)]}break;case"A":case"a":r="a"===e.key;if(e.data.length>=7){var x=+e.data[0],b=+e.data[1],m=+e.data[2],P=+e.data[3],k=+e.data[4];h=+e.data[5],o=+e.data[6];if(r&&(h+=t.x,o+=t.y),h===t.x&&o===t.y)break;if(0===x||0===b)n=n.concat(N(t.x,t.y,h,o,s)),t.setPosition(h,o);else for(var O=0;O<1;O++)for(var A=new a([t.x,t.y],[h,o],[x,b],m,!!P,!!k),E=A.getNextSegment();E;){d=U(E.cp1[0],E.cp1[1],E.cp2[0],E.cp2[1],E.to[0],E.to[1],t,s);n=n.concat(d),E=A.getNextSegment()}}}return n}!function(t){const e=t,i={},s=t=>{const e=`${Date.now()}-${Math.floor(Math.random()*Number.MAX_SAFE_INTEGER)}`;return i[e]=t,e};self.addEventListener("message",async t=>{let a=t.data||{};a.path=a.path||[];let n=a.target&&i[a.target]||e;const r=t=>t.reduce((t,e)=>t?t[e]:t,n),h=a&&a.id;if(h&&a.type){const t={id:h},e=r(a.path),i=r(a.path.slice(0,-1));switch(a.type){case"GET":t.value=e;break;case"SET":let n=a.path.length&&a.path[a.path.length-1];n&&(i[n]=a.value),t.value=!!n;break;case"APPLY":try{t.value=await e.apply(i,a.args||[])}catch(e){t.error=e.toString()}break;case"CONSTRUCT":try{t.value=new e(...a.args),t.targetId=s(t.value)}catch(e){t.error=e.toString()}}self.postMessage(t)}})}(Object.freeze({line:O,linearPath:A,polygon:E,rectangle:function(t,e,i,s,a){return E([[t,e],[t+i,e],[t+i,e+s],[t,e+s]],a)},curve:function(t,e){var i=G(t,1*(1+.2*e.roughness),e),s=G(t,1.5*(1+.22*e.roughness),e);return{type:"path",ops:i.concat(s)}},ellipse:w,arc:function(t,e,i,s,a,n,r,h,o){var p=t,c=e,u=Math.abs(i/2),l=Math.abs(s/2);u+=T(.01*u,o),l+=T(.01*l,o);for(var f=a,d=n;f<0;)f+=2*Math.PI,d+=2*Math.PI;d-f>2*Math.PI&&(f=0,d=2*Math.PI);var y=2*Math.PI/o.curveStepCount,g=Math.min(y/2,(d-f)/2),M=j(g,p,c,u,l,f,d,1,o),v=j(g,p,c,u,l,f,d,1.5,o),_=M.concat(v);return r&&(h?_=(_=_.concat(N(p,c,p+u*Math.cos(f),c+l*Math.sin(f),o))).concat(N(p,c,p+u*Math.cos(d),c+l*Math.sin(d),o)):(_.push({op:"lineTo",data:[p,c]}),_.push({op:"lineTo",data:[p+u*Math.cos(f),c+l*Math.sin(f)]}))),{type:"path",ops:_}},svgPath:function(t,e){t=(t||"").replace(/\n/g," ").replace(/(-\s)/g,"-").replace("/(ss)/g"," ");var i=new s(t);if(e.simplification){var a=new n(i.linearPoints,i.closed).fit(e.simplification);i=new s(a)}for(var r=[],h=i.segments||[],o=0;o<h.length;o++){var p=W(i,h[o],o>0?h[o-1]:null,e);p&&p.length&&(r=r.concat(p))}return{type:"path",ops:r}},solidFillPolygon:function(t,e){var i=[];if(t.length){var s=e.maxRandomnessOffset||0,a=t.length;if(a>2){i.push({op:"move",data:[t[0][0]+T(s,e),t[0][1]+T(s,e)]});for(var n=1;n<a;n++)i.push({op:"lineTo",data:[t[n][0]+T(s,e),t[n][1]+T(s,e)]})}}return{type:"fillPath",ops:i}},patternFillPolygon:L,patternFillEllipse:function(t,e,i,s,a){return P(a,k).fillEllipse(t,e,i,s,a)},patternFillArc:function(t,e,i,s,a,n,r){var h=P(r,k).fillArc(t,e,i,s,a,n,r);if(h)return h;var o=t,p=e,c=Math.abs(i/2),u=Math.abs(s/2);c+=T(.01*c,r),u+=T(.01*u,r);for(var l=a,f=n;l<0;)l+=2*Math.PI,f+=2*Math.PI;f-l>2*Math.PI&&(l=0,f=2*Math.PI);for(var d=(f-l)/r.curveStepCount,y=[],g=l;g<=f;g+=d)y.push([o+c*Math.cos(g),p+u*Math.sin(g)]);return y.push([o+c*Math.cos(f),p+u*Math.sin(f)]),y.push([o,p]),L(y,r)},randOffset:S,randOffsetWithRange:R,doubleLineOps:I}))}();
