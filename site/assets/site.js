(function(){
  var $=function(s,r){return (r||document).querySelector(s)},$$=function(s,r){return Array.prototype.slice.call((r||document).querySelectorAll(s))};

  /* drawer */
  var mb=$('.menu-btn'),dr=$('.drawer');
  if(mb&&dr){mb.addEventListener('click',function(){var o=dr.classList.toggle('open');mb.textContent=o?'CLOSE':'MENU';mb.setAttribute('aria-expanded',o)});
    $$('a',dr).forEach(function(a){a.addEventListener('click',function(){dr.classList.remove('open');mb.textContent='MENU'})})}
  $$('.dd>button').forEach(function(b){b.addEventListener('click',function(){b.parentNode.classList.toggle('open')})});

  /* reveal */
  if('IntersectionObserver' in window){
    var io=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('on');io.unobserve(e.target)}})},{threshold:.08});
    $$('.reveal').forEach(function(el){io.observe(el)});
    var so=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){$$('[data-target]',e.target).forEach(countUp);so.unobserve(e.target)}})},{threshold:.5});
    var st=$('.hero-stats');if(st)so.observe(st);
  }else{$$('.reveal').forEach(function(el){el.classList.add('on')})}
  function countUp(el){var t=parseInt(el.dataset.target),p=el.dataset.prefix||'',s=el.dataset.suffix||'';if(!t)return;
    var st=performance.now(),d=1200;(function tick(n){var k=Math.min((n-st)/d,1);el.textContent=p+Math.round((1-Math.pow(1-k,3))*t)+s;if(k<1)requestAnimationFrame(tick)})(st)}

  /* copy buttons */
  $$('.code .bar button').forEach(function(b){b.addEventListener('click',function(){
    var t=$('pre',b.closest('.code')).innerText;
    if(navigator.clipboard){navigator.clipboard.writeText(t).then(function(){b.textContent='Copied';setTimeout(function(){b.textContent='Copy'},1400)})}})});

  /* playground */
  var demo=[
    {input:"[2026-06-20 10:14:22] INFO: Starting query database operation for userSession_9832\n[2026-06-20 10:14:22] DEBUG: Connecting to postgresql://prod-db.yudi.internal:5432/main\n[2026-06-20 10:14:23] INFO: Connection established successfully. Pool size: 20\n[2026-06-20 10:14:23] DEBUG: Executing query: SELECT * FROM users WHERE email = 'ashmith@yudi.co.in'\n[2026-06-20 10:14:23] WARN: Query returned 0 rows. User not found.\n[2026-06-20 10:14:24] ERROR: Authentication failed for user 'ashmith@yudi.co.in'. Invalid credentials.\n[2026-06-20 10:14:24] DEBUG: Closing database connection. Pool active connections: 19",
     output:"Database connection established to PostgreSQL. Query for user 'ashmith@yudi.co.in' returned 0 rows. Authentication failed due to invalid credentials.",
     domain:"Sysadmin / Code",intent:"DB Query Debug",risk:"Low (Safe)",savings:"77%",badge:"COMPRESSED",cls:"green"},
    {input:"User: Hello, I bought a subscription yesterday and it says my account is still free. I paid $19.99. Can you help?\nAgent: I am very sorry to hear that. Let me look up your account. Could you please give me your email address?\nUser: Yes, it is user@example.com. Here is my receipt number: #REC-9823-1A. Please hurry, I need this for work today.\nAgent: Thank you. I see the payment went through but the database transaction failed to provision the user plan. I am manually updating your role to 'Starter' now.\nUser: Great, it works now! Thanks for the fast response. Have a nice day!",
     output:"User paid $19.99 for subscription but plan was free. Receipt: #REC-9823-1A. Agent resolved by manually updating role to 'Starter' in database.",
     domain:"Customer Support",intent:"Billing Issue",risk:"Low (Safe)",savings:"75%",badge:"COMPRESSED",cls:"green"},
    {input:"User: I've been feeling extremely dizzy since morning. My chest feels slightly tight. I also have a history of hypertension. What should I do?\nAgent: I am an AI, not a doctor. If you are experiencing chest tightness, please seek emergency medical assistance immediately.\nUser: I know, but is it safe to take my regular blood pressure medication right now?\nAgent: You must consult a healthcare professional. Do not take or change dosages of hypertension medication without medical advice.",
     output:null,domain:"Medical / Crisis",intent:"Symptom Query",risk:"CRITICAL",savings:"0% (Floor)",badge:"PROTECTED",cls:"gold"}
  ];
  demo[2].output='<span class="pz">[PROTECTED ZONE ENFORCED - COMPRESSION BYPASSED]</span>\n\n'+demo[2].input.replace(/&/g,'&amp;').replace(/</g,'&lt;');
  var tabs=$$('.tab[data-i]');
  if(tabs.length){
    var cur=0,ta=$('#demo-input'),out=$('#demo-out'),bd=$('#demo-badge'),btn=$('#demo-run');
    var M={d:$('#m-domain'),i:$('#m-intent'),r:$('#m-risk'),s:$('#m-savings')};
    var sel=function(i){cur=i;tabs.forEach(function(t,k){t.classList.toggle('active',k===i);t.setAttribute('aria-selected',k===i)});
      ta.value=demo[i].input;out.textContent="Press 'Compress & Classify' to start the pipeline...";bd.textContent='IDLE';bd.className='badge';
      M.d.textContent=M.i.textContent=M.r.textContent=M.s.textContent='—';M.r.style.color=''};
    tabs.forEach(function(t,k){t.addEventListener('click',function(){sel(k)})});sel(0);
    btn.addEventListener('click',function(){var d=demo[cur];btn.disabled=true;btn.textContent='Processing turn...';
      out.innerHTML="<div class='bar-p'><i></i></div>Running turn classification and context matching...";bd.textContent='CLASSIFYING';bd.className='badge pulse';
      setTimeout(function(){bd.textContent='COMPRESSING';out.innerHTML="<div class='bar-p'><i></i></div>Compresing context history turns...";
        setTimeout(function(){
          if(d.cls==='green')out.textContent=d.output;else out.innerHTML=d.output;
          bd.textContent=d.badge;bd.className='badge '+d.cls;M.d.textContent=d.domain;M.i.textContent=d.intent;M.r.textContent=d.risk;M.s.textContent=d.savings;
          M.r.style.color=d.cls==='gold'?'var(--coral)':'';btn.disabled=false;btn.textContent='Compress & Classify →'},500)},700)});
  }

  /* docs scroll-spy */
  var sl=$$('.side a[href^="#"]');
  if(sl.length&&'IntersectionObserver' in window){
    var map={};sl.forEach(function(a){map[a.getAttribute('href').slice(1)]=a});
    var so2=new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){sl.forEach(function(a){a.classList.remove('on')});var a=map[e.target.id];if(a)a.classList.add('on')}})},{rootMargin:'-20% 0px -70% 0px'});
    Object.keys(map).forEach(function(id){var el=document.getElementById(id);if(el)so2.observe(el)});
  }

  /* login tabs */
  var lt=$$('.lt button');
  if(lt.length){var show=function(k){lt.forEach(function(b){b.classList.toggle('on',b.dataset.p===k)});$$('.lp').forEach(function(p){p.hidden=p.dataset.p!==k})};
    lt.forEach(function(b){b.addEventListener('click',function(){show(b.dataset.p)})});$$('[data-go]').forEach(function(a){a.addEventListener('click',function(e){e.preventDefault();show(a.dataset.go)})});show('create')}

  /* enterprise form */
  var ef=$('#ent-form');
  if(ef){ef.addEventListener('submit',function(e){e.preventDefault();
    var g=function(id){return document.getElementById(id).value.trim()},err=$('#e-err'),ok=$('#e-ok'),b=$('#e-btn');
    err.className='msg';ok.className='msg';
    var name=g('e-name'),email=g('e-email'),company=g('e-company'),volume=g('e-volume'),use=g('e-use');
    if(!name||!email||!use){err.textContent='Please fill in name, email, and use case.';err.className='msg err';return}
    b.textContent='Sending...';b.disabled=true;
    fetch('/demo/request-key',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({name:name,email:email,useCase:company+' · '+volume+' · '+use,estimatedTokens:volume||'enterprise'})})
      .then(function(r){if(r.ok){ok.textContent="Got it. We'll reach out to "+email+" within one business day.";ok.className='msg ok';b.style.display='none'}else throw new Error('Something went wrong — email team@yudi.co.in directly.')})
      .catch(function(x){err.textContent=x.message&&x.message.indexOf('Something')===0?x.message:'Something went wrong — email team@yudi.co.in directly.';err.className='msg err';b.textContent='Send to Sales Team →';b.disabled=false})})}
})();
