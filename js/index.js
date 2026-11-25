(function(){
"use strict";
var bar=document.getElementById("read-progress");
var top=document.createElement("button");top.id="to-top";top.type="button";top.setAttribute("aria-label","العودة للأعلى");top.textContent="\u2191";document.body.appendChild(top);
function onScroll(){var h=document.documentElement,max=h.scrollHeight-h.clientHeight,y=window.scrollY||h.scrollTop;
if(bar)bar.style.transform="scaleX("+(max>0?Math.min(1,y/max):0)+")";top.classList.toggle("show",y>600)}
window.addEventListener("scroll",onScroll,{passive:true});onScroll();
top.addEventListener("click",function(){window.scrollTo({top:0,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth"})});
var Q=[
{q:"ماذا يعني الاختصار AI؟",a:["Artificial Intelligence","Automatic Internet","Advanced Input"],c:0},
{q:"في أي عام استخدم جون مكارثي مصطلح الذكاء الاصطناعي لأول مرة؟",a:["1956","1985","2010"],c:0},
{q:"ما الذي تتعلم منه أنظمة التعلم الآلي؟",a:["البيانات","الألوان فقط","الكهرباء"],c:0},
{q:"أي مما يلي مثال على الذكاء الاصطناعي؟",a:["مساعد محادثة ذكي","مسطرة","قلم رصاص"],c:0},
{q:"أي من هذه عيب محتمل للذكاء الاصطناعي؟",a:["قد يخطئ أو يتحيز","يعمل دائما بلا أخطاء","لا يحتاج بيانات"],c:0}];
var box=document.getElementById("quiz-box");if(!box)return;
var i=0,score=0,order;
function shuffle(a){a=a.slice();for(var k=a.length-1;k>0;k--){var j=Math.floor(Math.random()*(k+1)),t=a[k];a[k]=a[j];a[j]=t}return a}
function render(){
if(i>=Q.length){var best=Math.max(score,+(localStorage.getItem("foda_best")||0));try{localStorage.setItem("foda_best",best)}catch(e){}
box.innerHTML="";var d=document.createElement("div");d.className="quiz-result";
d.innerHTML="<strong>نتيجتك: "+score+" / "+Q.length+"</strong><span>أفضل نتيجة: "+best+" / "+Q.length+"</span>";
var b=document.createElement("button");b.type="button";b.className="quiz-btn";b.textContent="إعادة الاختبار";b.onclick=function(){i=0;score=0;render()};d.appendChild(b);box.appendChild(d);return}
var it=Q[i];order=shuffle(it.a.map(function(t,idx){return{t:t,ok:idx===it.c}}));
box.innerHTML="";var h=document.createElement("p");h.className="quiz-q";h.textContent=(i+1)+". "+it.q;box.appendChild(h);
var list=document.createElement("div");list.className="quiz-opts";
order.forEach(function(o){var b=document.createElement("button");b.type="button";b.className="quiz-btn";b.textContent=o.t;
b.onclick=function(){var all=list.querySelectorAll("button");all.forEach(function(x,n){x.disabled=true;if(order[n].ok)x.classList.add("ok")});
if(o.ok)score++;else b.classList.add("bad");
var nx=document.createElement("button");nx.type="button";nx.className="quiz-btn next";nx.textContent=i===Q.length-1?"عرض النتيجة":"السؤال التالي";nx.onclick=function(){i++;render()};box.appendChild(nx);nx.focus()};
list.appendChild(b)});box.appendChild(list)}
render();
})();
