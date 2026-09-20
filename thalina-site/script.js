const menuToggle=document.querySelector('.menu-toggle');
const nav=document.querySelector('.nav');
menuToggle?.addEventListener('click',()=>{
  const open=nav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded',open);
});
document.querySelectorAll('.nav a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));

const tabs=document.querySelectorAll('.tab');
const cards=document.querySelectorAll('.product-card');
tabs.forEach(tab=>tab.addEventListener('click',()=>{
  tabs.forEach(t=>t.classList.remove('active'));
  tab.classList.add('active');
  const filter=tab.dataset.filter;
  cards.forEach(card=>{
    card.classList.toggle('hidden',filter!=='all' && card.dataset.category!==filter);
  });
}));

const modal=document.querySelector('#productModal');
const title=document.querySelector('#modalTitle');
const info=document.querySelector('#modalInfo');
document.querySelectorAll('.details').forEach(btn=>btn.addEventListener('click',()=>{
  title.textContent=btn.dataset.title;
  info.textContent=btn.dataset.info;
  modal.classList.add('open');
  modal.setAttribute('aria-hidden','false');
}));
const closeModal=()=>{modal.classList.remove('open');modal.setAttribute('aria-hidden','true')};
document.querySelector('.modal-close')?.addEventListener('click',closeModal);
document.querySelector('.modal-backdrop')?.addEventListener('click',closeModal);
document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModal()});

const observer=new IntersectionObserver(entries=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add('visible')});
},{threshold:.08});
document.querySelectorAll('.feature,.land-card,.product-card,.production-item,.business-list div,.contact-list>div').forEach(el=>{
  el.classList.add('reveal');observer.observe(el);
});

document.querySelector('#cooperationForm')?.addEventListener('submit',e=>{
  e.preventDefault();
  const data=new FormData(e.currentTarget);
  const subject=encodeURIComponent(`Запрос о сотрудничестве — ${data.get('company')||data.get('name')}`);
  const body=encodeURIComponent(
`Имя: ${data.get('name')}
Компания: ${data.get('company')}
Email: ${data.get('email')}
Телефон: ${data.get('phone')}
Направление: ${data.get('direction')}

Сообщение:
${data.get('message')||''}`);
  window.location.href=`mailto:corporate@thalina.ru?subject=${subject}&body=${body}`;
});
