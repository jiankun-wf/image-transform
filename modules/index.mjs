const G=T=>{throw Error(T)};class M{readAsElement(e){const t=document.createElement("canvas");t.width=e.width,t.height=e.height;const n=t.getContext("2d");n.drawImage(e,0,0,t.width,t.height);const a=n.getImageData(0,0,t.width,t.height);return new g(a)}async readAsDataUrl(e){e||G("no url\uFF01");try{const t=await M.resolveWithUrl(e);return Promise.resolve(t)}catch(t){return Promise.reject(t)}}async readAsData(e){e.size||G("no content blob");const t=URL.createObjectURL(e);try{const n=await M.resolveWithUrl(t);return Promise.resolve(n)}catch(n){return Promise.reject(n)}}fade(e,t,n){const r=(t==="in"?1-n:n)*255,o=r,c=r,s=r;switch(t){case"in":e.recycle((u,i,d)=>{const[p,l,h]=u;p+l+h>o+c+s&&(e.update(i,d,"R",255),e.update(i,d,"G",255),e.update(i,d,"B",255))});break;case"out":e.recycle((u,i,d)=>{const[p,l,h]=u;p+l+h<o+c+s&&(e.update(i,d,"R",255),e.update(i,d,"G",255),e.update(i,d,"B",255))});break}}native(e,t="#000000"){const n=t.slice(1),[a,r,o]=[+`0x${n.slice(0,2)}`,+`0x${n.slice(2,4)}`,+`0x${n.slice(4,6)}`];e.recycle((c,s,u)=>{const[i,d,p]=c;(i!==255||d!==255||p!==255)&&(e.update(s,u,"R",a),e.update(s,u,"G",r),e.update(s,u,"B",o))})}nativeRollback(e){const t=[0,0,0,0];e.recycle(n=>{const[a,r,o]=n;if(a!==255||r!==255||o!==255)return t[0]=a,t[1]=r,t[2]=o,"break"}),e.recycle((n,a,r)=>{const[o,c,s]=n;o===t[0]&&c===t[1]&&s===t[2]?(e.update(a,r,"R",255),e.update(a,r,"G",255),e.update(a,r,"B",255)):(e.update(a,r,"R",t[0]),e.update(a,r,"G",t[1]),e.update(a,r,"B",t[2]))})}dropTransparent(e,t="#FFFFFFff"){const n=t.slice(1),[a,r,o,c]=[+`0x${n.slice(0,2)}`,+`0x${n.slice(2,4)}`,+`0x${n.slice(4,6)}`,n.length>=8?+`0x${n.slice(6,8)}`:255];e.recycle((s,u,i)=>{s[3]===0&&(e.update(u,i,"R",a),e.update(u,i,"G",r),e.update(u,i,"B",o),e.update(u,i,"A",c))})}colorRollback(e){e.recycle((t,n,a)=>{const[r,o,c,s]=t;e.update(n,a,"R",255-r),e.update(n,a,"G",255-o),e.update(n,a,"B",255-c),e.update(n,a,"A",255-s)})}gray(e){e.recycle((t,n,a)=>{const[r,o,c]=t,s=Math.floor(M.rgbToGray(r,o,c));e.update(n,a,"R",s),e.update(n,a,"G",s),e.update(n,a,"B",s)})}medianBlur(e,t){t%2!==1&&G("size\u9700\u4E3A\u5947\u6574\u6570\uFF01");const n=-Math.floor(t/2),a=Math.abs(n);e.recycle((r,o,c)=>{const s={R:[],G:[],B:[],A:[]};for(let h=n;h<=a;h++){let R=o+h;if(!(R<0||R>=e.rows))for(let b=n;b<=a;b++){let B=c+b;if(B<0||B>=e.cols)continue;const[f,A,E,y]=e.at(R,B);s.R.push(f),s.G.push(A),s.B.push(E),s.A.push(y)}}s.R.sort((h,R)=>h-R),s.G.sort((h,R)=>h-R),s.B.sort((h,R)=>h-R),s.A.sort((h,R)=>h-R);const u=s.R.length%2!==0;let i,d,p,l;if(u){const{R:h,G:R,B:b,A:B}=s,f=Math.floor(h.length/2);i=h[f],d=R[f],p=b[f],l=B[f]}else{const{R:h,G:R,B:b,A:B}=s,f=h.length/2,A=f-1;i=Math.round((h[f]+h[A])/2),d=Math.round((R[f]+R[A])/2),p=Math.round((b[f]+b[A])/2),l=Math.round((B[f]+B[A])/2)}e.update(o,c,"R",i),e.update(o,c,"G",d),e.update(o,c,"B",p)})}gaussianBlur(e,t,n=0,a=n){t%2===0&&G("size\u9700\u4E3A\u5947\u6574\u6570\uFF01"),(!n||n===0)&&(n=.3*((t-1)/2-1)+.8),(!a||a===0)&&(a=n);const r=M.calcGaussianKernel(t,n,a);if(!r.length)return;const o=Math.floor(t/2);e.recycle((c,s,u)=>{let i=0,d=0,p=0,l=0;for(let h=0;h<t;h++)for(let R=0;R<t;R++){let b=s+h-o,B=u+R-o;b=Math.max(b,0),b=Math.min(b,e.rows-1),B=Math.max(B,0),B=Math.min(B,e.cols-1);const f=r[h][R],[A,E,y,N]=e.at(b,B);i+=A*f,d+=E*f,p+=y*f,l+=N*f}e.update(s,u,"R",Math.round(i)),e.update(s,u,"G",Math.round(d)),e.update(s,u,"B",Math.round(p)),e.update(s,u,"A",Math.round(l))})}meanBlur(e,t){t%2===0&&G("size\u9700\u4E3A\u5947\u6574\u6570\uFF01");const n=Math.floor(t/2),a=Math.pow(t,2);e.recycle((r,o,c)=>{let s=0,u=0,i=0,d=0;for(let p=0;p<t;p++)for(let l=0;l<t;l++){let h=o+p-n,R=c+l-n;h=Math.max(h,0),h=Math.min(h,e.rows-1),R=Math.max(R,0),R=Math.min(R,e.cols-1);const[b,B,f,A]=e.at(h,R);s+=b,u+=B,i+=f,d+=A}e.update(o,c,"R",Math.round(s/a)),e.update(o,c,"G",Math.round(u/a)),e.update(o,c,"B",Math.round(i/a)),e.update(o,c,"A",Math.round(d/a))})}static LINER_CONTRAST=1.5;static BRIGHTNESS_CONTRAST=50;static SATURATION_CONTRAST=1.5;LUT(e,t){if(arguments.length===1||!t?.length){t=new Uint8ClampedArray(256);for(let n=0;n<256;n++)t[n]=Math.min(255,Math.floor(n*M.SATURATION_CONTRAST))}e.recycle((n,a,r)=>{const[o,c,s]=n;e.update(a,r,"R",t[o]),e.update(a,r,"G",t[c]),e.update(a,r,"B",t[s])})}threshold(e,t,n,a=M.THRESH_BINARY,r=M.THRESH_MODE_THRESHOLD){e.recycle((o,c,s)=>{const[u,i,d]=e.at(c,s),p=M.rgbToGray(u,i,d);let l;switch(r){case M.THRESH_MODE_THRESHOLD:l=M.calcThresholdValue(p,t,n,a);break;case M.THRESH_MODE_OTSU:l=M.calcThresholdValue(p,M.calcOtsuThreshold(e),n,a);break;case M.THRESH_MODE_MANUAL:l=M.calcThresholdValue(p,t,n,a);break}e.update(c,s,"R",l),e.update(c,s,"G",l),e.update(c,s,"B",l)})}dropWhite(e){e.recycle((t,n,a)=>{const[r,o,c,s]=t;r===255&&o===255&&c===255&&s!==0&&e.update(n,a,"A",0)})}groundGlassFilter(e,t=5,n=!0){(!t||t<=0)&&G("offset \u9700\u4E3A\u6B63\u6574\u6570\uFF01");const{rows:a,cols:r}=e,o=a-t,c=r-t;for(let s=0;s<o;s++)for(let u=0;u<c;u++){const i=Math.floor(Math.random()*t),d=s+i,p=u+(n?i:Math.floor(Math.random()*t)),[l,h,R,b]=e.at(d,p);e.update(s,u,"R",l),e.update(s,u,"G",h),e.update(s,u,"B",R),e.update(s,u,"A",b)}}nostalgiaFilter(e){e.recycle((t,n,a)=>{const[r,o,c]=t,s=Math.min(.393*r+.769*o+.189*c,255),u=Math.min(.349*r+.686*o+.168*c,255),i=Math.min(.272*r+.534*o+.131*c,255);e.update(n,a,"R",s),e.update(n,a,"G",u),e.update(n,a,"B",i)})}fleetingFilter(e,t=12){t=Math.round(t),t<=0&&G("\u56E0\u5B50\u5FC5\u987B\u5927\u4E8E0"),e.recycle((n,a,r)=>{const o=n[2],c=Math.sqrt(o)*t;e.update(a,r,"B",c)})}sunLightFilter(e,t,n,a,r=150){const{rows:o,cols:c}=e;t=t||Math.floor(o/2),n=n||Math.floor(c/2),a=a||Math.min(o,c),e.recycle((s,u,i)=>{const d=Math.pow(t-u,2)+Math.pow(n-i,2);if(d<Math.pow(a,2)){const[p,l,h]=s,R=Math.round(r*(1-Math.sqrt(d)/a));e.update(u,i,"R",Math.min(255,Math.max(0,p+R))),e.update(u,i,"G",Math.min(255,Math.max(0,l+R))),e.update(u,i,"B",Math.min(255,Math.max(0,h+R)))}})}static GRAY_SCALE_RED=.2989;static GRAY_SCALE_GREEN=.587;static GRAY_SCALE_BLUE=.114;static rgbToGray(e,t,n){return e*M.GRAY_SCALE_RED+t*M.GRAY_SCALE_GREEN+n*M.GRAY_SCALE_BLUE}static resolveWithUrl(e){return new Promise((t,n)=>{const a=new Image;a.addEventListener("load",()=>{const r=document.createElement("canvas");r.width=a.width,r.height=a.height;const o=r.getContext("2d");o.drawImage(a,0,0,r.width,r.height);const c=o.getImageData(0,0,r.width,r.height);t(new g(c)),a.remove(),r.remove()}),a.addEventListener("error",(...r)=>{n(r[1])}),a.setAttribute("src",e)})}static gaussianFunction(e,t,n,a){const r=-(e*e/(2*n*n)),o=-(t*t/(2*a*a));return 1/(2*Math.PI*n*a)*Math.exp(r+o)}static calcGaussianKernel(e,t,n){const a=[],r=Math.floor(e/2);let o=0;for(let c=-r;c<=r;c++){const s=r+c;a[s]=[];for(let u=-r;u<=r;u++){const i=r+u,d=M.gaussianFunction(c,u,t,n);a[s][i]=d,o+=d}}for(let c=0;c<e;c++)for(let s=0;s<e;s++)a[c][s]/=o;return a}static THRESH_BINARY=1;static THRESH_BINARY_INV=2;static THRESH_TRUNC=3;static THRESH_TOZERO=4;static THRESH_TOZERO_INV=5;static THRESH_MODE_THRESHOLD=1;static THRESH_MODE_OTSU=2;static THRESH_MODE_MANUAL=3;static calcThresholdValue(e,t,n,a){let r;switch(a){case M.THRESH_BINARY:r=e<t?0:n;break;case M.THRESH_BINARY_INV:r=e<t?n:0;break;case M.THRESH_TRUNC:r=e<t?e:t;break;case M.THRESH_TOZERO:r=e<t?0:e;break;case M.THRESH_TOZERO_INV:r=e<t?e:0;break}return r}static calcOtsuThreshold(e){const t=new Array(256).fill(0);let n=0;e.recycle((c,s,u)=>{const[i,d,p]=c,l=M.rgbToGray(i,d,p);t[Math.floor(l)]++,n++});let a=t.map(c=>c/n),r=0,o=0;for(let c=0;c<256;c++){let s=a.slice(0,c+1).reduce((l,h)=>l+h,0),u=1-s,i=a.slice(0,c+1).map((l,h)=>h*l).reduce((l,h)=>l+h,0),d=a.slice(c+1).map((l,h)=>h*l).reduce((l,h)=>l+h,0),p=s*u*Math.pow(i/s-d/u,2);p>o&&(o=p,r=c)}return r}}class g{rows;cols;channels;size;data;constructor(e){this.rows=e.height,this.cols=e.width,this.size={width:e.width,height:e.height},this.channels=4,this.data=e.data}clone(){const{data:e,size:{width:t,height:n}}=this,a=new Uint8ClampedArray(e),r=new ImageData(a,t,n);return new g(r)}delete(){this.data=new Uint8ClampedArray(0)}update(e,t,n,a){const{data:r}=this,[o,c,s,u]=this.getAddress(e,t);switch(n){case"R":r[o]=a;break;case"G":r[c]=a;break;case"B":r[s]=a;break;case"A":r[u]=a;break}}getAddress(e,t){const{channels:n,cols:a}=this,r=a*e*n+t*n;return[r,r+1,r+2,r+3]}recycle(e){const{rows:t,cols:n}=this;for(let a=0;a<t;a++)for(let r=0;r<n;r++)e(this.at(a,r),a,r)}at(e,t){const{data:n}=this,[a,r,o,c]=this.getAddress(e,t);return[n[a],n[r],n[o],n[c]]}imgshow(e,t=!1,n=0,a=0){const r=e instanceof HTMLCanvasElement?e:document.querySelector(e);r||G("\u65E0\u6CD5\u627E\u5230canvas\u5F53\u524D\u5143\u7D20\uFF01");const{data:o,size:c}=this,{width:s,height:u}=c,i=new ImageData(o,s,u),d=r.getContext("2d");t?(r.width=n,r.height=a,window.createImageBitmap(i,{resizeHeight:a,resizeWidth:n}).then(p=>{d.drawImage(p,0,0)})):(r.width=s,r.height=u,d.putImageData(i,0,0,0,0,r.width,r.height))}toDataUrl(e,t=1){const n=document.createElement("canvas");return this.imgshow(n),n.toDataURL(e??"image/png",t)}toBlob(e,t=1){return new Promise((n,a)=>{const r=document.createElement("canvas");this.imgshow(r),r.toBlob(o=>{if(!o||!o.size)return a(new Error("\u8F6C\u6362\u5931\u8D25\uFF1A\u4E0D\u5B58\u5728\u7684blob\u6216blob\u5927\u5C0F\u4E3A\u7A7A"));n(o)},e??"image/png",t)})}}const H=new M;export{H as pw};
