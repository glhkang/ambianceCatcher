!function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="/dist/",n(n.s=0)}([function(e,t,n){"use strict";n.r(t);n(1);document.addEventListener("DOMContentLoaded",(function(){var e,t=document.getElementById("file-input"),n=document.getElementById("canvas"),r=document.getElementById("name"),o=document.getElementById("audio"),a=["waveVisual","barVisual","circleVisual"],i=document.querySelector(".modal-background"),c=document.querySelector(".modal-main");i.addEventListener("click",(function(){i.setAttribute("class","modal-bg-fade"),c.setAttribute("class","modal-main-fade")})),document.getElementById("question-icon").addEventListener("click",(function(){i.setAttribute("class","modal-background"),c.setAttribute("class","modal-main")})),document.querySelector("button").addEventListener("click",(function(){e=a[Math.floor(Math.random()*a.length)]})),t.onchange=function(){var t=this.files;o.src=URL.createObjectURL(t[0]);var a=t[0].name;r.innerText="".concat(a.toLowerCase()),n.width=window.innerWidth,n.height=window.innerHeight;var i=n.width,c=n.height,l=n.getContext("2d"),u=new AudioContext,d=u.createMediaElementSource(o),f=u.createAnalyser();d.connect(f),f.connect(u.destination);var s=f.frequencyBinCount,m=new Uint8Array(s);!function t(){requestAnimationFrame(t),f.getByteFrequencyData(m),l.fillStyle="rgba(0,0,0,1)",l.fillRect(0,0,i,c);var r=Math.random;function a(){return 255*r()>>0}if("barVisual"===e){var u,d,g,h,y=i/s*50,b=0,v=[2048];f.fftSize=v[Math.floor(Math.random()*v.length)];for(var p=0;p<200;p++)u=2.5*m[p],m[p]>210?(d=255,g=110,h=199):m[p]>200?(d=a(),g=a(),h=a()):m[p]>190?(d=57,g=255,h=20):(m[p],d=a(),g=a(),h=a()),l.fillStyle="rgb(".concat(d,",").concat(g,",").concat(h,")"),l.fillRect(b,c-u,y,u),b+=y+10}else if("waveVisual"===e){var M=[1024];f.fftSize=M[Math.floor(Math.random()*M.length)],l.lineWidth=2,l.strokeStyle="rgb("+a()+","+a()+","+a()+")",l.beginPath();for(var S=3*i/s,w=0,E=0;E<s;E++){var k=m[E]/128*c/2;0===E?l.moveTo(w,k):l.lineTo(w,k),w+=S}l.lineTo(i,c/2),l.stroke()}else if("circleVisual"===e)if(o.paused)l.fillRect(0,0,i,c);else{var O=.5*i,j=.5*c,q=Math.min(O,j)-20,x=.1*q,A=[128,256];f.fftSize=A[Math.floor(Math.random()*A.length)],l.lineWidth=m[Math.floor(Math.random()*m.length)],l.strokeStyle="rgb(75,"+a()+","+a()+")",function(){f.getByteFrequencyData(m);var e=(m[1]+m[2])/512;l.beginPath(),l.arc(O,j,x+(q-x)*e*e*e*e,0,6.28),l.closePath(),l.stroke(),l.drawImage(n,-8,-8,i+16,c+16)}()}}()}}))},function(e,t,n){}]);
//# sourceMappingURL=main.js.map