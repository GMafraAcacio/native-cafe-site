var CFG={whats:"5577999665119",addr:"Caetité, BA — número 85 (complete com rua e bairro)",hours:"Complete com os dias e horários de funcionamento"};
var V=[["",13],[" e catupiry",15],[" e mussarela",16],[", mussarela e catupiry",17],[" e banana-da-terra",16],[", banana-da-terra e catupiry",18],[", banana-da-terra e mussarela",19],[", banana-da-terra, mussarela e catupiry",20]];
var S=[],X=[["Carne",5],["Calabresa ou frango",4],["Banana-da-terra",3],["Catupiry ou cheddar",3],["Mussarela",3],["Presunto ou milho",2],["Chocolate / doce de leite",4],["Granulado / coco",3],["Leite condensado",3],["Goiabada",3]];
var D={"Cafés":{"Cafés":[["Espresso",0],["Cappuccino",0],["Latte",0],["Café coado",0]]},Salgadas:{},Doces:{"Tapiocas doces":[["Beijinho (coco e leite condensado)",14],["Brigadeiro (chocolate e granulado)",14],["Brigadeiro com mussarela",15],["Doce de leite",14],["Doce de leite com coco",15],["Doce de leite com mussarela",15],["Leite condensado com mussarela",14],["Leite condensado, mussarela e coco",15],["Prestígio (chocolate e coco)",14],["Romeu e Julieta (goiabada e queijo)",14],["Banana com canela",13]],"Outros doces":[["Bolo de chocolate com morango",0],["Brownie",0]]},
Bebidas:{"Bebidas":[["Água mineral sem gás",3],["Água mineral com gás",5],["Água de coco",8],["H2O",7],["Refrigerante 1 litro",10],["Refrigerante 350 ml",6],["Suco 300 ml",4],["Suco 200 ml",3],["Cerveja lata",6],["Cerveja long neck",10]]}};
["Carne seca","Calabresa","Frango"].forEach(b=>D.Salgadas["Tapiocas de "+b.toLowerCase()]=V.map(v=>[b+v[0],v[1]]));
D.Salgadas["Tapiocas de queijos e clássicas"]=[["Manteiga",7],["Queijo mussarela",10],["Queijo, cheddar, parmesão, catupiry, presunto, milho e orégano",20],["Mussarela, banana e milho",14],["Frango e cheddar",16],["Quatro queijos",17],["Calabresa, barbecue e mussarela",17],["Pizza (queijo, orégano, milho, presunto)",15],["Presunto e queijo",13],["Nordestina (frango, milho, presunto e queijo)",20],["Especial (carne, calabresa, frango, mussarela e catupiry)",27]];
D.Salgadas["Outros salgados"]=[["Pão na chapa",0],["Misto quente",0]];var cats=Object.keys(D),cur="Cafés",C=[],pend=null,$=id=>document.getElementById(id),R=n=>"R$ "+n.toFixed(2).replace(".",","),P=n=>n?R(n):"Consultar";
function esc(s){return s.replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]))}
function tabs(){var t=$("tabs");t.innerHTML="";cats.forEach(c=>{var b=document.createElement("button");b.textContent=c;b.setAttribute("aria-pressed",c==cur&&!$("q").value);b.onclick=()=>{cur=c;$("q").value="";tabs();menu()};t.appendChild(b)})}
function menu(){var m=$("menu"),q=$("q").value.trim().toLowerCase(),h="";
cats.forEach(c=>{if(q?0:c!=cur)return;var g=D[c];for(var k in g){var r=g[k].filter(x=>!q||x[0].toLowerCase().includes(q));if(!r.length)continue;
h+=(c=="Salgadas"||c=="Doces"||q?'<h3 class="grp">'+(q?c+" · ":"")+k+'</h3>':"")+'<div class="list">'+r.map(x=>'<div class="it"><b>'+esc(x[0])+'</b><span>'+P(x[1])+'</span><button class="add" data-c="'+c+'" data-t="'+(k.indexOf("Tapiocas")==0?1:"")+'" data-n="'+esc(x[0])+'" data-p="'+x[1]+'" aria-label="Adicionar '+esc(x[0])+'">+</button></div>').join("")+"</div>"}});
m.innerHTML=h||'<p class="lead">Nada encontrado. Tente outra palavra.</p>';
m.querySelectorAll(".add").forEach(b=>b.onclick=()=>open_(b.dataset.t,b.dataset.n,+b.dataset.p))}
function open_(c,n,p){pend={n:n,p:p,q:1,c:c};$("dn").textContent=n;$("dp").textContent=P(p);$("qt").textContent=1;
var xs=$("xs");xs.innerHTML="";if(c){xs.innerHTML="<b>Acréscimos</b>"+X.map((x,i)=>'<label><span><input type="checkbox" value="'+i+'"> '+x[0]+"</span><span>+ "+R(x[1])+"</span></label>").join("");xs.querySelectorAll("input").forEach(i=>i.onchange=upd)}upd();$("dlg").showModal()}
function xsel(){return[].slice.call($("xs").querySelectorAll("input:checked")).map(i=>X[+i.value])}
function upd(){var u=pend.p+xsel().reduce((a,x)=>a+x[1],0);$("ok").textContent="Adicionar"+(u?" · "+R(u*pend.q):"")}
$("mn").onclick=()=>{pend.q=Math.max(1,pend.q-1);$("qt").textContent=pend.q;upd()};$("pl").onclick=()=>{pend.q++;$("qt").textContent=pend.q;upd()};$("no").onclick=()=>$("dlg").close();
$("ok").onclick=()=>{var x=xsel(),u=pend.p+x.reduce((a,e)=>a+e[1],0),key=pend.n+"|"+x.map(e=>e[0]).join(),l=C.find(e=>e.k==key);if(l)l.q+=pend.q;else C.push({k:key,n:pend.n,x:x.map(e=>e[0]),u:u,q:pend.q});$("dlg").close();draw()};
function tot(){return C.reduce((a,l)=>a+l.u*l.q,0)}
function draw(){var n=C.reduce((a,l)=>a+l.q,0);$("bar").textContent="Ver pedido · "+n+(n==1?" item · ":" itens · ")+R(tot());$("bar").classList.toggle("on",n>0&&!$("cart").classList.contains("on"));
$("ls").innerHTML=C.length?"":'<p class="lead">Seu pedido está vazio. Adicione itens do cardápio.</p>';
C.forEach((l,i)=>{var d=document.createElement("div");d.className="ln";d.innerHTML='<div><b>'+esc(l.n)+'</b>'+(l.x.length?"<small>+ "+esc(l.x.join(", "))+"</small>":"")+"<small>"+(l.u?R(l.u)+" cada":"Preço a confirmar")+'</small></div><div class="q"><button aria-label="Menos">−</button><b>'+l.q+'</b><button aria-label="Mais">+</button></div>';
var b=d.querySelectorAll("button");b[0].onclick=()=>{if(--l.q<1)C.splice(i,1);draw()};b[1].onclick=()=>{l.q++;draw()};$("ls").appendChild(d)});$("tt").textContent=R(tot())}
function cart(o){$("cart").classList.toggle("on",o);$("ov").classList.toggle("on",o);draw()}
$("bar").onclick=()=>cart(true);$("cx").onclick=$("ov").onclick=()=>cart(false);$("q").oninput=()=>{tabs();menu()};
$("tp").onchange=()=>$("ad").style.display=$("tp").value=="Entrega"?"":"none";
$("send").onclick=()=>{if(!C.length)return alert("Adicione ao menos um item ao pedido.");if(!$("nm").value.trim())return $("nm").focus();var e=$("tp").value=="Entrega";if(e&&!$("ad").value.trim())return $("ad").focus();
var m="Olá, Native Café! Quero fazer um pedido:\n\n"+C.map(l=>"• "+l.q+"x "+l.n+(l.x.length?" (+ "+l.x.join(", ")+")":"")+(l.u?" — "+R(l.u*l.q):" — preço a confirmar")).join("\n")+"\n\n*Total: "+R(tot())+"* (sem taxa de entrega"+(C.some(l=>!l.u)?" e sem os itens a confirmar":"")+")\nNome: "+$("nm").value.trim()+"\n"+(e?"Entrega: "+$("ad").value.trim():"Retirada no local")+"\nPagamento: "+$("pg").value+($("ob").value.trim()?"\nObs.: "+$("ob").value.trim():"");
window.open("https://wa.me/"+CFG.whats+"?text="+encodeURIComponent(m),"_blank")};
$("addr").textContent=CFG.addr;$("hours").textContent=CFG.hours;$("wa").href="https://wa.me/"+CFG.whats+"?text="+encodeURIComponent("Olá, Native Café!");
tabs();menu();draw();
