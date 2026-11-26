(() => {
  const $ = (s, root=document) => root.querySelector(s);
  const $$ = (s, root=document) => [...root.querySelectorAll(s)];
  const config = window.UT_CONFIG || {};

  // Theme is persistent and respects the operating-system preference on first visit.
  const savedTheme = localStorage.getItem('ut-theme');
  const preferredTheme = window.matchMedia?.('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  document.documentElement.dataset.theme = savedTheme || preferredTheme;
  $('#theme-toggle')?.addEventListener('click', () => {
    const next = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    document.documentElement.dataset.theme = next;
    localStorage.setItem('ut-theme', next);
    $('#theme-toggle').setAttribute('aria-label', next === 'dark' ? 'Switch to light appearance' : 'Switch to dark appearance');
  });

  // Navigation and mobile menu.
  const menu = $('#mobile-menu'), menuBtn = $('#menu-toggle');
  menuBtn?.addEventListener('click', () => {
    const open = menu.classList.toggle('open');
    menuBtn.setAttribute('aria-expanded', String(open));
    menuBtn.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
  });
  $$('#mobile-menu a').forEach(a => a.addEventListener('click', () => {
    menu?.classList.remove('open'); menuBtn?.setAttribute('aria-expanded','false');
  }));

  // Small site-wide English / Hindi dictionary. Content blocks opt in using data-en/data-hi.
  let language = localStorage.getItem('ut-language') || 'en';
  const applyLanguage = () => {
    document.documentElement.lang = language === 'hi' ? 'hi' : 'en';
    $$('[data-en][data-hi]').forEach(node => {
      const value = node.dataset[language];
      if (value !== undefined) node.innerHTML = value;
    });
    $$('.lang-button').forEach(btn => {
      btn.textContent = language === 'en' ? 'हिन्दी' : 'English';
      btn.setAttribute('aria-label', language === 'en' ? 'Switch language to Hindi' : 'Switch language to English');
    });
  };
  $$('.lang-button').forEach(btn => btn.addEventListener('click', () => {
    language = language === 'en' ? 'hi' : 'en'; localStorage.setItem('ut-language', language); applyLanguage();
  }));
  applyLanguage();

  // Accessible global search, scoped to known pages and sections.
  const searchPanel = $('#search-panel'), searchInput = $('#site-search'), resultBox = $('#search-results');
  const searchable = [
    ['Design studio','Brand identity, graphic design, packaging, UI and UX design','/services/design.html'],
    ['Digital development','Websites, ecommerce, web applications and software development','/services/build.html'],
    ['Growth and marketing','SEO, content strategy, social media and performance marketing','/services/grow.html'],
    ['Work and concepts','Selected creative directions and illustrative concept work','/work/'],
    ['Packages and pricing','Starter, Business and Custom Scale packages','/packages/'],
    ['Industries','Retail, hospitality, professional services, manufacturing and startups','/industries/'],
    ['About Udta Teer','Our point of view, approach and Jaipur roots','/about/'],
    ['Contact','Start a project conversation','/contact/'],
    ['Free website audit','Request a structured website review','/free-website-audit/'],
    ['Insights','Practical digital guidance for ambitious businesses','/insights/']
  ];
  const closeSearch = () => { searchPanel?.classList.remove('open'); searchPanel?.setAttribute('aria-hidden','true'); document.body.style.overflow=''; };
  const renderSearch = query => {
    if (!resultBox) return;
    const q = query.trim().toLowerCase();
    const matches = searchable.filter(item => !q || item.join(' ').toLowerCase().includes(q));
    resultBox.innerHTML = matches.length ? matches.map(item => `<a href="${item[2]}"><strong>${item[0]}</strong><br><span>${item[1]}</span></a>`).join('') : '<p>No matching pages. Try “design”, “website” or “pricing”.</p>';
  };
  $('#search-toggle')?.addEventListener('click', () => { searchPanel.classList.add('open'); searchPanel.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden'; renderSearch(''); setTimeout(()=>searchInput?.focus(),40); });
  $('#search-close')?.addEventListener('click', closeSearch);
  searchPanel?.addEventListener('click', e => { if (e.target === searchPanel) closeSearch(); });
  searchInput?.addEventListener('input', e => renderSearch(e.target.value));
  document.addEventListener('keydown', e => {
    if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase()==='k') { e.preventDefault(); $('#search-toggle')?.click(); }
    if (e.key === 'Escape') { closeSearch(); closePlanner(); }
  });

  // Planner modal: a three-step, validated client-side brief. No external endpoint is assumed.
  const planner = $('#planner-dialog'); let plannerStep = 1;
  const showPlannerStep = step => {
    plannerStep = Math.max(1,Math.min(3,step));
    $$('.planner-step').forEach(el => el.hidden = Number(el.dataset.step) !== plannerStep);
    $$('.form-steps span').forEach((el,i) => el.classList.toggle('active',i < plannerStep));
    $('#planner-prev')?.toggleAttribute('hidden',plannerStep===1);
    $('#planner-next')?.toggleAttribute('hidden',plannerStep===3);
    $('#planner-submit')?.toggleAttribute('hidden',plannerStep!==3);
    $('#planner-step-label') && ($('#planner-step-label').textContent = `STEP 0${plannerStep} / 03`);
  };
  function openPlanner(prefill='') {
    if (!planner) return;
    planner.classList.add('open'); planner.setAttribute('aria-hidden','false'); document.body.style.overflow='hidden';
    if (prefill && $('#planner-service')) $('#planner-service').value = prefill;
    showPlannerStep(1); setTimeout(()=>$('#planner-name')?.focus(),80);
  }
  function closePlanner() { if (!planner) return; planner.classList.remove('open'); planner.setAttribute('aria-hidden','true'); document.body.style.overflow=''; }
  $$('#open-planner').forEach(btn => btn.addEventListener('click',()=>openPlanner(btn.dataset.service || '')));
  $$('[data-open-planner]').forEach(btn => btn.addEventListener('click',()=>openPlanner(btn.dataset.service || '')));
  $('#planner-close')?.addEventListener('click',closePlanner);
  planner?.addEventListener('click',e=>{if(e.target===planner)closePlanner();});
  $('#planner-next')?.addEventListener('click',()=>{
    const current = $(`.planner-step[data-step="${plannerStep}"]`);
    const required = $$('input[required],select[required]',current);
    const valid = required.every(field => field.reportValidity());
    if (valid) showPlannerStep(plannerStep+1);
  });
  $('#planner-prev')?.addEventListener('click',()=>showPlannerStep(plannerStep-1));
  const makeBrief = form => {
    const values = Object.fromEntries(new FormData(form).entries());
    return [
      'UDTA TEER — PROJECT BRIEF',
      `Name: ${values.name || '—'}`,
      `Email: ${values.email || '—'}`,
      `Business: ${values.business || '—'}`,
      `Service: ${values.service || '—'}`,
      `Budget: ${values.budget || '—'}`,
      `Timeline: ${values.timeline || '—'}`,
      `Website: ${values.website || '—'}`,
      `Project details: ${values.details || '—'}`,
      `Prepared: ${new Date().toLocaleString()}`,
      '',
      'Note: This brief was prepared in the browser. It has not been transmitted to Udta Teer.'
    ].join('\n');
  };
  const downloadText = (filename, text) => {
    const blob = new Blob([text],{type:'text/plain;charset=utf-8'}), url = URL.createObjectURL(blob);
    const a=document.createElement('a'); a.href=url; a.download=filename; a.click(); URL.revokeObjectURL(url);
  };
  $('#planner-form')?.addEventListener('submit',e=>{
    e.preventDefault(); if(!e.currentTarget.reportValidity()) return;
    const brief = makeBrief(e.currentTarget); downloadText('udta-teer-project-brief.txt',brief);
    const message=$('#planner-status'); if(message) message.textContent='Your project brief is ready and has been downloaded. It has not been sent; use the Contact page to share it with the team.';
    $('#planner-submit').textContent='Brief downloaded ✓';
  });

  // Website audit form uses the same transparent local-first behaviour.
  $('#audit-form')?.addEventListener('submit',e=>{
    e.preventDefault(); if(!e.currentTarget.reportValidity()) return;
    const values=Object.fromEntries(new FormData(e.currentTarget).entries());
    const brief=['UDTA TEER — WEBSITE AUDIT REQUEST',...Object.entries(values).map(([k,v])=>`${k}: ${v}`),'','This request was prepared locally and has not been submitted.'].join('\n');
    downloadText('udta-teer-website-audit-request.txt',brief);
    $('#audit-status').textContent='Your audit request has been downloaded. It has not been sent to Udta Teer because a verified submission address is not configured yet.';
  });

  // Industry selector.
  const industryCopy={
    'Retail & D2C':'Build a recognisable storefront, clearer product discovery and a connected route from attention to enquiry or purchase.',
    'Hospitality':'Bring the experience, location, menu or offering to life with thoughtful storytelling and useful digital touchpoints.',
    'Professional services':'Make expertise easier to understand and trust through clear positioning, credible content and a focused enquiry journey.',
    'Manufacturing':'Translate capability, processes and product strengths into a confident digital presence for buyers and partners.',
    'Startups':'Turn a promising idea into a coherent brand, usable product experience and measurable path to market.',
    'Education':'Help learners and families understand programmes, outcomes and next steps through clear information architecture.',
    'Local businesses':'Connect local reputation with a more discoverable, useful and consistent online experience.'
  };
  $$('[data-industry]').forEach(btn=>btn.addEventListener('click',()=>{
    $$('[data-industry]').forEach(b=>b.setAttribute('aria-pressed',String(b===btn)));
    const title=$('#industry-title'), desc=$('#industry-description');
    if(title) title.textContent=btn.dataset.industry;
    if(desc) desc.textContent=industryCopy[btn.dataset.industry] || 'Tell us about your business and we can shape an approach around the people you serve.';
  }));

  // Contact-page brief download. This intentionally stays local until a verified endpoint is configured.
  $('#contact-download')?.addEventListener('click',()=>{
    const form=$('#planner-form-contact'); if(!form || !form.reportValidity()) return;
    const values=Object.fromEntries(new FormData(form).entries());
    const brief=['UDTA TEER — PROJECT ENQUIRY',...Object.entries(values).map(([k,v])=>`${k}: ${v}`),'','This brief was prepared in the browser. It has not been transmitted to Udta Teer.'].join('\n');
    downloadText('udta-teer-project-enquiry.txt',brief);
    $('#contact-status').textContent='Your project brief has been downloaded. It has not been sent to Udta Teer.';
  });

  // Current year and active navigation state.
  $$('[data-year]').forEach(el=>el.textContent=String(new Date().getFullYear()));
  const path=location.pathname.replace(/index\.html$/,'');
  $$('[data-nav]').forEach(a=>{if(a.getAttribute('href')===path) a.setAttribute('aria-current','page');});
  // Small hover-free focus support for interactive visual cards.
  $$('[data-card-link]').forEach(card=>card.addEventListener('keydown',e=>{if(e.key==='Enter') location.href=card.dataset.cardLink;}));
})();
