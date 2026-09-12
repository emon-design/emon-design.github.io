
if(typeof pdfjsLib !== 'undefined'){
  pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
}
// ---- Tabs ----
document.querySelectorAll('.tab-btn').forEach(btn=>{
  btn.addEventListener('click',()=>{
    document.querySelectorAll('.tab-btn').forEach(b=>b.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p=>p.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.panel).classList.add('active');
    if(typeof updateFieldVisibility==='function') updateFieldVisibility();
  });
});

// ---- Resume builder ----
let expCount=0, eduCount=0;
function addExp(data){
  expCount++;
  const id='exp'+expCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderPreview();">remove</button>
    <div class="row2">
      <div><label>Role</label><input type="text" class="exp-role" oninput="renderPreview()" placeholder="Software Engineer"></div>
      <div><label>Company</label><input type="text" class="exp-company" oninput="renderPreview()" placeholder="Acme Inc."></div>
    </div>
    <div class="row2">
      <div><label>Dates</label><input type="text" class="exp-dates" oninput="renderPreview()" placeholder="2022 – Present"></div>
      <div><label>Location</label><input type="text" class="exp-loc" oninput="renderPreview()" placeholder="Remote"></div>
    </div>
    <label>Description</label>
    <textarea class="exp-desc" oninput="renderPreview()" placeholder="What did you do / achieve?"></textarea>
  `;
  document.getElementById('exp-list').appendChild(div);
}
function addEdu(){
  eduCount++;
  const id='edu'+eduCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderPreview();">remove</button>
    <div class="row2">
      <div><label>Degree</label><input type="text" class="edu-degree" oninput="renderPreview()" placeholder="B.Sc. Computer Science"></div>
      <div><label>Institution</label><input type="text" class="edu-inst" oninput="renderPreview()" placeholder="State University"></div>
    </div>
    <label>Dates</label>
    <input type="text" class="edu-dates" oninput="renderPreview()" placeholder="2020 – 2024">
    <div class="row2">
      <div><label>Scale</label>
        <select class="edu-scale" onchange="onEduScaleChange(this)">
          <option value="5">GPA (out of 5.00)</option>
          <option value="4">CGPA (out of 4.00)</option>
        </select>
      </div>
      <div><label>Result</label><input type="number" class="edu-gpa" min="0" max="5" step="0.01" placeholder="e.g. 4.83" oninput="onEduGpaInput(this)"></div>
    </div>
    <div class="edu-extra-fields">
      <label>Class/Division <span style="font-weight:400;color:var(--ink-soft);">(optional — e.g. "1st Class", used by Bangladesh templates)</span></label>
      <input type="text" class="edu-class" oninput="renderPreview()" placeholder="1st Class">
      <div class="row2">
        <div><label>Group/Major <span style="font-weight:400;color:var(--ink-soft);">(optional)</span></label><input type="text" class="edu-group" oninput="renderPreview()" placeholder="Science"></div>
        <div><label>Board <span style="font-weight:400;color:var(--ink-soft);">(optional)</span></label><input type="text" class="edu-board" oninput="renderPreview()" placeholder="Dhaka"></div>
      </div>
      <label>Achievement/Note <span style="font-weight:400;color:var(--ink-soft);">(optional — e.g. thesis title, honors, merit list)</span></label>
      <input type="text" class="edu-note" oninput="renderPreview()" placeholder="Thesis on rural distribution reach for packaged foods">
    </div>
    <div class="edu-loc-field">
      <label>Institution Location <span style="font-weight:400;color:var(--ink-soft);">(optional — e.g. city/state)</span></label>
      <input type="text" class="edu-loc" oninput="renderPreview()" placeholder="Sydney, NSW">
    </div>
  `;
  document.getElementById('edu-list').appendChild(div);
  updateFieldVisibility();
}

// ---- Japan format repeatable rows ----
let jpEduCount=0, jpWorkCount=0, jpFamilyCount=0;
function addJpEdu(){
  jpEduCount++;
  const id='jpedu'+jpEduCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderJapan();">remove</button>
    <div class="row2">
      <div><label>Start year</label><input type="text" class="jp-edu-start" oninput="renderJapan()" placeholder="2018"></div>
      <div><label>End year</label><input type="text" class="jp-edu-end" oninput="renderJapan()" placeholder="2020"></div>
    </div>
    <label>School name</label>
    <input type="text" class="jp-edu-school" oninput="renderJapan()" placeholder="Muslim Nagar K. M. High School">
    <div class="row2">
      <div><label>Specialty</label><input type="text" class="jp-edu-specialty" oninput="renderJapan()" placeholder="Science"></div>
      <div><label>License/Qualification</label><input type="text" class="jp-edu-license" oninput="renderJapan()" placeholder="SSC"></div>
    </div>
    <label>Result <span style="font-weight:400;color:var(--ink-soft);">(optional)</span></label>
    <div class="row2">
      <div><input type="text" class="jp-edu-result" oninput="renderJapan()" placeholder="e.g. 3.62"></div>
      <div><select class="jp-edu-result-scale" onchange="renderJapan()">
        <option value="4">Out of CGPA 4.00</option>
        <option value="5">Out of GPA 5.00</option>
        <option value="running">Running (not finished yet)</option>
      </select></div>
    </div>
  `;
  document.getElementById('jp-edu-list').appendChild(div);
}
let jpLangCertCount=0;
function addJpLangCert(){
  jpLangCertCount++;
  const id='jplangcert'+jpLangCertCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderJapan();">remove</button>
    <label>Test</label>
    <select class="jp-langcert-test" onchange="renderJapan()">
      <option value="JLPT N5">JLPT N5</option>
      <option value="JLPT N4">JLPT N4</option>
      <option value="JLPT N3">JLPT N3</option>
      <option value="JLPT N2">JLPT N2</option>
      <option value="JLPT N1">JLPT N1</option>
      <option value="JFT-Basic">JFT-Basic</option>
      <option value="JPT Test">JPT Test</option>
      <option value="NAT Test">NAT Test</option>
      <option value="J-Test">J-Test</option>
    </select>
    <label>Result <span style="font-weight:400;color:var(--ink-soft);">(optional, e.g. 250 out of 300)</span></label>
    <div class="row2">
      <div><input type="text" class="jp-langcert-value" oninput="renderJapan()" placeholder="e.g. 250"></div>
      <div><input type="text" class="jp-langcert-max" oninput="renderJapan()" placeholder="out of e.g. 300"></div>
    </div>
  `;
  document.getElementById('jp-lang-cert-list').appendChild(div);
}
function addJpWork(){
  jpWorkCount++;
  const id='jpwork'+jpWorkCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderJapan();">remove</button>
    <div class="row2">
      <div><label>Start year</label><input type="text" class="jp-work-start" oninput="renderJapan()" placeholder="2025"></div>
      <div><label>End year</label><input type="text" class="jp-work-end" oninput="renderJapan()" placeholder="2026 or Running"></div>
    </div>
    <label>Company name</label>
    <input type="text" class="jp-work-company" oninput="renderJapan()" placeholder="Shanti Care Hospital">
    <label>Role / Work history</label>
    <input type="text" class="jp-work-role" oninput="renderJapan()" placeholder="Reception duties">
  `;
  document.getElementById('jp-work-list').appendChild(div);
}
function addJpFamily(){
  jpFamilyCount++;
  const id='jpfam'+jpFamilyCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderJapan();">remove</button>
    <div class="row2">
      <div><label>Name</label><input type="text" class="jp-fam-name" oninput="renderJapan()" placeholder="MAHABUB ALOM"></div>
      <div><label>Relationship</label><input type="text" class="jp-fam-relation" oninput="renderJapan()" placeholder="Father"></div>
    </div>
    <div class="row2">
      <div><label>Age</label><input type="text" class="jp-fam-age" oninput="renderJapan()" placeholder="58"></div>
      <div><label>Occupation</label><input type="text" class="jp-fam-occupation" oninput="renderJapan()" placeholder="Retired"></div>
    </div>
    <label>Living together?</label>
    <select class="jp-fam-living" onchange="renderJapan()"><option value="Yes">Yes</option><option value="No">No</option></select>
  `;
  document.getElementById('jp-family-list').appendChild(div);
}

// ---- Language proficiency table (Bangladesh Classic) ----
let langCount=0;
function addLangRow(){
  langCount++;
  const id='lang'+langCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  const levelOpts='<option value="Excellent">Excellent</option><option value="Good">Good</option><option value="Fair">Fair</option><option value="Beginner">Beginner</option>';
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderPreview();">remove</button>
    <label>Language</label>
    <input type="text" class="lang-name" oninput="renderPreview()" placeholder="Bangla">
    <div class="row2">
      <div><label>Reading</label><select class="lang-reading" onchange="renderPreview()">${levelOpts}</select></div>
      <div><label>Writing</label><select class="lang-writing" onchange="renderPreview()">${levelOpts}</select></div>
    </div>
    <label>Speaking</label>
    <select class="lang-speaking" onchange="renderPreview()">${levelOpts}</select>
  `;
  document.getElementById('lang-list').appendChild(div);
}

// ---- Academic: publications & conferences ----
let pubCount=0, confCount=0;
function addPubRow(){
  pubCount++;
  const id='pub'+pubCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderPreview();">remove</button>
    <label>Publication title</label>
    <input type="text" class="pub-title" oninput="renderPreview()" placeholder="Title of the paper">
    <div class="row2">
      <div><label>Journal/Venue</label><input type="text" class="pub-venue" oninput="renderPreview()" placeholder="Journal name"></div>
      <div><label>Year</label><input type="text" class="pub-year" oninput="renderPreview()" placeholder="2024"></div>
    </div>
  `;
  document.getElementById('pub-list').appendChild(div);
}
function addConfRow(){
  confCount++;
  const id='conf'+confCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderPreview();">remove</button>
    <label>Presentation/Talk title</label>
    <input type="text" class="conf-title" oninput="renderPreview()" placeholder="Title of talk or poster">
    <div class="row2">
      <div><label>Conference</label><input type="text" class="conf-venue" oninput="renderPreview()" placeholder="Conference name"></div>
      <div><label>Year</label><input type="text" class="conf-year" oninput="renderPreview()" placeholder="2024"></div>
    </div>
  `;
  document.getElementById('conf-list').appendChild(div);
}

// ---- Gulf template: rated skills/languages ----
let swSkillCount=0, gulfLangCount=0;
function levelSelectOptions(){
  return '<option value="6">6/6</option><option value="5">5/6</option><option value="4">4/6</option><option value="3">3/6</option><option value="2">2/6</option><option value="1">1/6</option>';
}
function addSwSkillRow(){
  swSkillCount++;
  const id='swskill'+swSkillCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderPreview();">remove</button>
    <div class="row2">
      <div><label>Skill</label><input type="text" class="sw-name" oninput="renderPreview()" placeholder="Microsoft Word"></div>
      <div><label>Level</label><select class="sw-level" onchange="renderPreview()">${levelSelectOptions()}</select></div>
    </div>
  `;
  document.getElementById('sw-skill-list').appendChild(div);
}
function addGulfLangRow(){
  gulfLangCount++;
  const id='gulflang'+gulfLangCount;
  const div=document.createElement('div');
  div.className='repeat-block';
  div.id=id;
  div.innerHTML=`
    <button class="remove" onclick="document.getElementById('${id}').remove();renderPreview();">remove</button>
    <div class="row2">
      <div><label>Language</label><input type="text" class="glang-name" oninput="renderPreview()" placeholder="English"></div>
      <div><label>Level</label><select class="glang-level" onchange="renderPreview()">${levelSelectOptions()}</select></div>
    </div>
  `;
  document.getElementById('gulf-lang-list').appendChild(div);
}
function onEduScaleChange(sel){
  const block=sel.closest('.repeat-block');
  const gpaInput=block.querySelector('.edu-gpa');
  const max=parseFloat(sel.value);
  gpaInput.max=sel.value;
  gpaInput.placeholder = sel.value==='4' ? 'e.g. 3.75' : 'e.g. 4.83';
  if(gpaInput.value && parseFloat(gpaInput.value)>max){
    gpaInput.value=max.toFixed(2);
    showToast(`Adjusted — max for this scale is ${max.toFixed(2)}.`);
  }
  renderPreview();
}
function onEduGpaInput(inp){
  const max=parseFloat(inp.max)||5;
  const v=parseFloat(inp.value);
  if(!isNaN(v) && v>max){
    inp.value=max.toFixed(2);
    showToast(`Max for this scale is ${max.toFixed(2)}.`);
  }
  renderPreview();
}
function renderAll(){ renderPreview(); renderJapan(); }
['r-name','r-email','r-phone','r-location','r-summary','r-skills','r-dob','r-nationality','r-father','r-mother','r-marital','r-religion','r-nid','r-languages','r-references','r-present-addr','r-permanent-addr','r-gender','r-computing-os','r-computing-software','r-strengths','r-passport','r-visa-status','r-research-interests','r-awards','r-linkedin','r-training','r-title','r-hobbies'].forEach(id=>{
  document.getElementById(id).addEventListener('input', renderAll);
});
document.getElementById('r-driving-license').addEventListener('change', renderAll);
['jp-fullname','jp-furigana','jp-dob','jp-permanent-addr','jp-age','jp-height','jp-weight','jp-eye-left','jp-eye-right','jp-other-qual','jp-personality','jp-hobby','jp-favorite-subject','jp-dietary','jp-worship','jp-remittance','jp-longterm','jp-residence-detail','jp-relatives-who'].forEach(id=>{
  document.getElementById(id).addEventListener('input', renderJapan);
});
['jp-marriage','jp-hand','jp-blood','jp-tattoo','jp-colorblind','jp-smoking','jp-drinking','jp-medical','jp-driving-license','jp-english','jp-group-living','jp-cooking','jp-fasting','jp-residence-applied','jp-relatives-japan','jp-family-opinion'].forEach(id=>{
  document.getElementById(id).addEventListener('change', renderJapan);
});
document.getElementById('jp-photo').addEventListener('change', e=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{ jpPhotoDataUrl=ev.target.result; renderJapan(); };
  reader.readAsDataURL(file);
});
let photoDataUrl=null;
document.getElementById('r-photo').addEventListener('change', e=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{ photoDataUrl=ev.target.result; renderAll(); };
  reader.readAsDataURL(file);
});
let signatureDataUrl=null;
document.getElementById('r-signature').addEventListener('change', e=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{ signatureDataUrl=ev.target.result; renderAll(); };
  reader.readAsDataURL(file);
});
let resumeTemplate='classic';
function setTemplate(t){
  resumeTemplate=t;
  document.querySelectorAll('.tmpl-btn').forEach(b=>b.classList.toggle('active', b.dataset.tmpl===t));
  updateFieldVisibility();
  renderPreview();
}
function updateFieldVisibility(){
  const relevantMap = {
    'bd-fields-section': ['bd','bd2'],
    'gulf-fields-section': ['gulf'],
    'skills-langs-hobbies-section': ['gulf','intl'],
    'academic-fields-section': ['academic'],
    'langskills-section': ['bd2','europass'],
    'training-section': ['bd','gulf','compact'],
    'signature-section': ['bd','bd2'],
    'photo-section': ['intl','bd','bd2','gulf','sidebar','europass'],
    'dob-nat-section': ['bd','bd2','gulf','europass']
  };
  const japanPanel=document.getElementById('japan');
  const japanTabActive = japanPanel && japanPanel.classList.contains('active');
  const japanDependent = ['bd-fields-section'];
  Object.keys(relevantMap).forEach(id=>{
    const el=document.getElementById(id);
    if(!el) return;
    const shouldShow = relevantMap[id].includes(resumeTemplate) || (japanDependent.includes(id) && japanTabActive);
    el.style.display = shouldShow ? '' : 'none';
  });
  const eduExtraShow = ['bd','bd2'].includes(resumeTemplate);
  document.querySelectorAll('.edu-extra-fields').forEach(el=>{ el.style.display = eduExtraShow ? '' : 'none'; });
  const eduLocShow = resumeTemplate==='compact';
  document.querySelectorAll('.edu-loc-field').forEach(el=>{ el.style.display = eduLocShow ? '' : 'none'; });
}
function renderPreview(){
  const name=val('r-name')||'Your Name';
  const email=val('r-email'), phone=val('r-phone'), loc=val('r-location');
  const contact=[email,phone,loc].filter(Boolean).join(' · ');
  const summary=val('r-summary');
  const skills=val('r-skills');

  let expHtml='';
  document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
    const role=b.querySelector('.exp-role').value;
    const company=b.querySelector('.exp-company').value;
    const dates=b.querySelector('.exp-dates').value;
    const locv=b.querySelector('.exp-loc').value;
    const desc=b.querySelector('.exp-desc').value;
    if(!role && !company) return;
    expHtml+=`<div class="entry"><div class="top"><span>${esc(role)}${company?' · '+esc(company):''}</span><span>${esc(dates)}</span></div>
      <div class="sub">${esc(locv)}</div><p>${esc(desc)}</p></div>`;
  });

  let eduHtml='';
  document.querySelectorAll('#edu-list .repeat-block').forEach(b=>{
    const degree=b.querySelector('.edu-degree').value;
    const inst=b.querySelector('.edu-inst').value;
    const dates=b.querySelector('.edu-dates').value;
    const gpa=b.querySelector('.edu-gpa').value;
    const scale=b.querySelector('.edu-scale').value;
    const classDiv=b.querySelector('.edu-class').value;
    if(!degree && !inst) return;
    let gpaLine='';
    if(gpa){
      const label = scale==='4' ? 'CGPA' : 'GPA';
      gpaLine = ` — ${label}: ${esc(gpa)}/${parseFloat(scale||5).toFixed(2)}`;
      if(classDiv) gpaLine += ` (${esc(classDiv)})`;
    }
    eduHtml+=`<div class="entry"><div class="top"><span>${esc(degree)}${gpaLine}</span><span>${esc(dates)}</span></div>
      <div class="sub">${esc(inst)}</div></div>`;
  });

  let bodyHtml=`<h3>${esc(name)}</h3><div class="contact">${esc(contact)}</div>`;
  if(summary) bodyHtml+=`<div class="section-title">Summary</div><p>${esc(summary)}</p>`;
  if(expHtml) bodyHtml+=`<div class="section-title">Experience</div>${expHtml}`;
  if(eduHtml) bodyHtml+=`<div class="section-title">Education</div>${eduHtml}`;
  if(skills) bodyHtml+=`<div class="section-title">Skills</div><div class="skills-list">${esc(skills)}</div>`;

  const preview=document.getElementById('preview');
  preview.className='resume-preview tmpl-'+resumeTemplate;

  if(resumeTemplate==='intl'){
    const linkedinI=val('r-linkedin');
    const titleI=val('r-title');
    const photoHtmlI = photoDataUrl
      ? `<img class="i2-photo" src="${photoDataUrl}">`
      : `<div class="i2-photo placeholder">Photo</div>`;

    let sideHtml = `<div class="i2-photo-wrap">${photoHtmlI}</div>`;
    sideHtml += `<div class="i2-side-heading">Contact</div>`;
    if(email) sideHtml += `<div class="i2-contact-row">✉ ${esc(email)}</div>`;
    if(phone) sideHtml += `<div class="i2-contact-row">☎ ${esc(phone)}</div>`;
    if(loc) sideHtml += `<div class="i2-contact-row">📍 ${esc(loc)}</div>`;
    if(linkedinI) sideHtml += `<div class="i2-contact-row">in ${esc(linkedinI)}</div>`;

    let skillBars='';
    document.querySelectorAll('#sw-skill-list .repeat-block').forEach(b=>{
      const nm=b.querySelector('.sw-name').value;
      if(!nm) return;
      const lvl=parseInt(b.querySelector('.sw-level').value)||0;
      const pct=Math.round(lvl/6*100);
      skillBars += `<div class="i2-skill-item"><div class="i2-skill-name">${esc(nm)}</div><div class="i2-bar-track"><div class="i2-bar-fill" style="width:${pct}%;"></div></div></div>`;
    });
    if(skillBars) sideHtml += `<div class="i2-side-heading">Skills</div>${skillBars}`;

    let langDots='';
    document.querySelectorAll('#gulf-lang-list .repeat-block').forEach(b=>{
      const nm=b.querySelector('.glang-name').value;
      if(!nm) return;
      const lvl=parseInt(b.querySelector('.glang-level').value)||0;
      let dots='';
      for(let i=1;i<=6;i++) dots += `<span class="${i<=lvl?'filled':''}"></span>`;
      langDots += `<div class="i2-lang-item"><span class="i2-lang-name">${esc(nm)}</span><div class="i2-dot-row">${dots}</div></div>`;
    });
    if(langDots) sideHtml += `<div class="i2-side-heading">Languages</div>${langDots}`;

    const hobbiesI=val('r-hobbies');
    if(hobbiesI){
      const items=hobbiesI.split(',').map(s=>s.trim()).filter(Boolean);
      sideHtml += `<div class="i2-side-heading">Hobbies</div>` + items.map(i=>`<div class="i2-hobby-item">${esc(i)}</div>`).join('');
    }

    let mainI = `<div class="i2-header"><h3>${esc(name)}</h3><div class="i2-header-rule"></div>${titleI?`<div class="i2-subtitle">${esc(titleI)}</div>`:''}</div><div class="i2-body">`;

    if(summary) mainI += `<div class="i2-sec-title">Summary</div><p style="font-size:.82rem;">${esc(summary)}</p>`;

    let expHtmlI='';
    document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
      const role=b.querySelector('.exp-role').value;
      const company=b.querySelector('.exp-company').value;
      const dates=b.querySelector('.exp-dates').value;
      const desc=b.querySelector('.exp-desc').value;
      if(!role && !company) return;
      const bullets = desc ? desc.split('\n').map(s=>s.trim()).filter(Boolean) : [];
      expHtmlI += `<div class="i2-exp-entry">
        <div class="i2-exp-top"><span>${esc(role)}</span><span>${esc(dates)}</span></div>
        <div class="i2-exp-sub">${esc(company)}</div>
        ${bullets.length?'<ul>'+bullets.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':''}
      </div>`;
    });
    if(expHtmlI) mainI += `<div class="i2-sec-title">Experience</div>${expHtmlI}`;

    let eduHtmlI='';
    document.querySelectorAll('#edu-list .repeat-block').forEach(b=>{
      const degree=b.querySelector('.edu-degree').value;
      const inst=b.querySelector('.edu-inst').value;
      const dates=b.querySelector('.edu-dates').value;
      const gpa=b.querySelector('.edu-gpa').value;
      const scale=b.querySelector('.edu-scale').value;
      if(!degree && !inst) return;
      const label = scale==='4' ? 'CGPA' : 'GPA';
      const gpaTxt = gpa ? ` — ${label} ${esc(gpa)}/${parseFloat(scale||5).toFixed(2)}` : '';
      eduHtmlI += `<div class="i2-exp-entry">
        <div class="i2-exp-top"><span>${esc(degree)}${gpaTxt}</span><span>${esc(dates)}</span></div>
        <div class="i2-exp-sub">${esc(inst)}</div>
      </div>`;
    });
    if(eduHtmlI) mainI += `<div class="i2-sec-title">Education</div>${eduHtmlI}`;

    const achievementsI=val('r-awards');
    if(achievementsI){
      const items=achievementsI.split('\n').map(s=>s.trim()).filter(Boolean);
      mainI += `<div class="i2-sec-title">Achievements</div><ul style="margin:4px 0 0 0;padding-left:18px;font-size:.82rem;">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
    }

    mainI += `</div>`;
    preview.innerHTML = `<div class="i2-sidebar">${sideHtml}</div><div class="i2-main">${mainI}</div>`;
  } else if(resumeTemplate==='bd'){
    const dob=val('r-dob'), nat=val('r-nationality')||'Bangladeshi (by birth)';
    const father=val('r-father'), mother=val('r-mother'), marital=document.getElementById('r-marital').value;
    const nid=val('r-nid'), presentAddr=val('r-present-addr'), permanentAddr=val('r-permanent-addr');
    const linkedin=val('r-linkedin');
    const contactLine=[loc,phone,email,linkedin].filter(Boolean).join(' · ');

    const photoHtml = photoDataUrl
      ? `<img src="${photoDataUrl}">`
      : `Passport-size photo`;

    let html = `<div class="bd-top">
      <div><h3>${esc(name)}</h3><div class="bd-contact">${esc(contactLine)}</div></div>
      <div class="bd-photo-box">${photoHtml}</div>
    </div>`;

    if(summary) html += `<div class="bd-sec-title">Career Objective</div><p style="font-size:.82rem;">${esc(summary)}</p>`;

    let personalKvBd='';
    if(father) personalKvBd += `<div class="bd-kv"><span class="k">Father's Name</span><span class="v">${esc(father)}</span></div>`;
    if(mother) personalKvBd += `<div class="bd-kv"><span class="k">Mother's Name</span><span class="v">${esc(mother)}</span></div>`;
    if(dob) personalKvBd += `<div class="bd-kv"><span class="k">Date of Birth</span><span class="v">${esc(dob)}</span></div>`;
    personalKvBd += `<div class="bd-kv"><span class="k">Nationality</span><span class="v">${esc(nat)}</span></div>`;
    if(marital) personalKvBd += `<div class="bd-kv"><span class="k">Marital Status</span><span class="v">${esc(marital)}</span></div>`;
    if(nid) personalKvBd += `<div class="bd-kv"><span class="k">NID No.</span><span class="v">${esc(nid)}</span></div>`;
    if(presentAddr) personalKvBd += `<div class="bd-kv"><span class="k">Present Address</span><span class="v">${esc(presentAddr)}</span></div>`;
    if(permanentAddr) personalKvBd += `<div class="bd-kv"><span class="k">Permanent Address</span><span class="v">${esc(permanentAddr)}</span></div>`;
    if(personalKvBd) html += `<div class="bd-sec-title">Personal Details</div>${personalKvBd}`;

    let eduHtmlBd='';
    document.querySelectorAll('#edu-list .repeat-block').forEach(b=>{
      const degree=b.querySelector('.edu-degree').value;
      const inst=b.querySelector('.edu-inst').value;
      const dates=b.querySelector('.edu-dates').value;
      const gpa=b.querySelector('.edu-gpa').value;
      const scale=b.querySelector('.edu-scale').value;
      const classDiv=b.querySelector('.edu-class').value;
      const group=b.querySelector('.edu-group').value;
      const board=b.querySelector('.edu-board').value;
      const note=b.querySelector('.edu-note').value;
      if(!degree && !inst) return;
      const label = scale==='4' ? 'CGPA' : 'GPA';
      const gpaTxt = gpa ? ` (${label} ${esc(gpa)} out of ${parseFloat(scale||5).toFixed(2)})` : '';
      const majorTxt = group ? ` — Major in ${esc(group)}` : '';
      const instLine = board ? `${esc(inst)} — ${esc(board)} Board` : esc(inst);
      const noteBits=[classDiv,note].filter(Boolean).map(esc);
      eduHtmlBd += `<div class="bd-entry">
        <div class="bd-entry-top"><span>${esc(degree)}${majorTxt}${gpaTxt}</span><span>${esc(dates)}</span></div>
        <div class="bd-entry-sub">${instLine}</div>
        ${noteBits.length?'<ul><li>'+noteBits.join(' · ')+'</li></ul>':''}
      </div>`;
    });
    if(eduHtmlBd) html += `<div class="bd-sec-title">Educational Qualifications</div>${eduHtmlBd}`;

    let expHtmlBd='';
    document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
      const role=b.querySelector('.exp-role').value;
      const company=b.querySelector('.exp-company').value;
      const locv=b.querySelector('.exp-loc').value;
      const dates=b.querySelector('.exp-dates').value;
      const desc=b.querySelector('.exp-desc').value;
      if(!role && !company) return;
      const companyLine = locv ? `${esc(company)} — ${esc(locv)}` : esc(company);
      const bullets = desc ? desc.split('\n').map(s=>s.trim()).filter(Boolean) : [];
      expHtmlBd += `<div class="bd-entry">
        <div class="bd-entry-top"><span>${esc(role)}</span><span>${esc(dates)}</span></div>
        <div class="bd-entry-sub">${companyLine}</div>
        ${bullets.length?'<ul>'+bullets.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':''}
      </div>`;
    });
    if(expHtmlBd) html += `<div class="bd-sec-title">Employment History</div>${expHtmlBd}`;

    const training=val('r-training');
    if(training){
      const items=training.split('\n').map(s=>s.trim()).filter(Boolean);
      html += `<div class="bd-sec-title">Training & Certifications</div><ul class="bd-plain-list">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
    }

    preview.innerHTML = html;
  } else if(resumeTemplate==='bd2'){
    const email2=val('r-email'), phone2=val('r-phone'), presentAddr2=val('r-present-addr')||val('r-location');
    const dob2=val('r-dob'), religion2=val('r-religion'), nat2=val('r-nationality')||'Bangladeshi';
    const father2=val('r-father'), mother2=val('r-mother'), gender2=document.getElementById('r-gender').value;
    const permanentAddr2=val('r-permanent-addr');

    const photoHtml2 = photoDataUrl
      ? `<img class="bd2-photo" src="${photoDataUrl}">`
      : `<div class="bd2-photo placeholder">Photo</div>`;

    let html = `<div class="bd2-title">Resume</div>`;
    html += `<div class="bd2-top">
      <div class="bd2-contact">
        <strong>Contact Address:</strong>
        ${presentAddr2?esc(presentAddr2)+'<br>':''}
        ${email2?'Email: '+esc(email2)+'<br>':''}
        ${phone2?'Mobile: '+esc(phone2):''}
      </div>
      <div class="bd2-photo-wrap"><div class="bd2-photo-accent"></div>${photoHtml2}</div>
    </div>`;
    html += `<div class="bd2-name">${esc(name)}</div>`;

    if(summary) html += `<div class="bd2-bar">Career Objective</div><p style="font-size:.8rem;">${esc(summary)}</p>`;

    let eduHtml2='';
    document.querySelectorAll('#edu-list .repeat-block').forEach(b=>{
      const degree=b.querySelector('.edu-degree').value;
      const inst=b.querySelector('.edu-inst').value;
      const dates=b.querySelector('.edu-dates').value;
      const gpa=b.querySelector('.edu-gpa').value;
      const scale=b.querySelector('.edu-scale').value;
      const classDiv=b.querySelector('.edu-class').value;
      const group=b.querySelector('.edu-group').value;
      const board=b.querySelector('.edu-board').value;
      if(!degree && !inst) return;
      const label = scale==='4' ? 'CGPA' : 'GPA';
      eduHtml2 += `<div class="bd2-degree-title">${esc(degree)}</div>`;
      if(inst) eduHtml2 += `<div class="bd2-kv"><span class="k">Name of the Institute</span><span class="v">: ${esc(inst)}</span></div>`;
      if(group) eduHtml2 += `<div class="bd2-kv"><span class="k">Group/Major</span><span class="v">: ${esc(group)}</span></div>`;
      if(board) eduHtml2 += `<div class="bd2-kv"><span class="k">Board</span><span class="v">: ${esc(board)}</span></div>`;
      if(gpa) eduHtml2 += `<div class="bd2-kv"><span class="k">${label}</span><span class="v">: ${esc(gpa)} (out of ${parseFloat(scale||5).toFixed(2)})${classDiv?' — '+esc(classDiv):''}</span></div>`;
      if(dates) eduHtml2 += `<div class="bd2-kv"><span class="k">Year of Completion</span><span class="v">: ${esc(dates)}</span></div>`;
    });
    if(eduHtml2) html += `<div class="bd2-bar">Educational Background</div>${eduHtml2}`;

    let expHtml2='';
    document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
      const role=b.querySelector('.exp-role').value;
      const company=b.querySelector('.exp-company').value;
      const locv=b.querySelector('.exp-loc').value;
      const dates=b.querySelector('.exp-dates').value;
      const desc=b.querySelector('.exp-desc').value;
      if(!role && !company) return;
      expHtml2 += `<div class="bd2-exp-entry"><div class="role">${esc(role)}</div>${company?esc(company)+'<br>':''}${locv?esc(locv)+'<br>':''}${dates?'Duration: '+esc(dates):''}${desc?'<p style="margin:4px 0 0 0;">'+esc(desc)+'</p>':''}</div>`;
    });
    if(expHtml2) html += `<div class="bd2-bar">Experience</div>${expHtml2}`;

    let langRows='';
    document.querySelectorAll('#lang-list .repeat-block').forEach(b=>{
      const lname=b.querySelector('.lang-name').value;
      if(!lname) return;
      const r=b.querySelector('.lang-reading').value, w=b.querySelector('.lang-writing').value, s=b.querySelector('.lang-speaking').value;
      langRows += `<tr><td>${esc(lname)}</td><td>${esc(r)}</td><td>${esc(w)}</td><td>${esc(s)}</td></tr>`;
    });
    const computingOs=val('r-computing-os'), computingSw=val('r-computing-software');
    if(langRows || skills || computingOs || computingSw){
      html += `<div class="bd2-bar">Skills</div>`;
      if(langRows) html += `<table class="bd2-lang"><tr><th>Language</th><th>Reading</th><th>Writing</th><th>Speaking</th></tr>${langRows}</table>`;
      if(skills) html += `<p style="font-size:.8rem;"><strong>Skills:</strong> ${esc(skills)}</p>`;
      if(computingOs) html += `<p style="font-size:.8rem;"><strong>Operating skills:</strong> ${esc(computingOs)}</p>`;
      if(computingSw) html += `<p style="font-size:.8rem;"><strong>Application software:</strong> ${esc(computingSw)}</p>`;
    }

    const strengths=val('r-strengths');
    if(strengths){
      const items=strengths.split('\n').map(s=>s.trim()).filter(Boolean);
      html += `<div class="bd2-bar">Capabilities and Interests</div><ul class="bd2-bullets">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
    }

    let personalKv='';
    if(father2) personalKv += `<div class="bd2-kv"><span class="k">Father Name</span><span class="v">: ${esc(father2)}</span></div>`;
    if(mother2) personalKv += `<div class="bd2-kv"><span class="k">Mother Name</span><span class="v">: ${esc(mother2)}</span></div>`;
    if(dob2) personalKv += `<div class="bd2-kv"><span class="k">Date of Birth</span><span class="v">: ${esc(dob2)}</span></div>`;
    if(religion2) personalKv += `<div class="bd2-kv"><span class="k">Religion</span><span class="v">: ${esc(religion2)}</span></div>`;
    if(gender2) personalKv += `<div class="bd2-kv"><span class="k">Sex</span><span class="v">: ${esc(gender2)}</span></div>`;
    if(nat2) personalKv += `<div class="bd2-kv"><span class="k">Nationality</span><span class="v">: ${esc(nat2)}</span></div>`;
    if(permanentAddr2) personalKv += `<div class="bd2-kv"><span class="k">Permanent Address</span><span class="v">: ${esc(permanentAddr2)}</span></div>`;
    if(personalKv) html += `<div class="bd2-bar">Personal Information</div>${personalKv}`;

    const sigInner = signatureDataUrl
      ? `<img class="bd2-sig-img" src="${signatureDataUrl}">`
      : `<div style="height:30px;"></div>`;
    html += `<div class="bd2-bar">Declaration</div>
      <p style="font-size:.8rem;">I hereby declare that all the information given above is absolutely true and correct.</p>
      <div class="bd2-declaration-sig">${sigInner}<div class="bd2-sig-line">${esc(name)}</div></div>`;

    preview.innerHTML = html;
  } else if(resumeTemplate==='sidebar'){
    const photoHtml = photoDataUrl ? `<img class="intl-photo" src="${photoDataUrl}">` : `<div class="intl-photo placeholder">Photo</div>`;
    const skillItems = skills ? skills.split(',').map(s=>s.trim()).filter(Boolean) : [];
    const langsRaw = val('r-languages');
    const langItems = langsRaw ? langsRaw.split(',').map(s=>s.trim()).filter(Boolean) : [];
    let sideHtml = `${photoHtml}<h3>${esc(name)}</h3><div class="sb-contact">${esc(contact)}</div>`;
    if(skillItems.length){
      sideHtml += `<div class="sb-heading">Skills</div>`;
      skillItems.forEach(s=> sideHtml += `<div class="sb-skill-item">• ${esc(s)}</div>`);
    }
    if(langItems.length){
      sideHtml += `<div class="sb-heading">Languages</div>`;
      langItems.forEach(l=> sideHtml += `<div class="sb-skill-item">• ${esc(l)}</div>`);
    }
    let mainHtml='';
    if(summary) mainHtml += `<div class="section-title">Summary</div><p>${esc(summary)}</p>`;
    if(expHtml) mainHtml += `<div class="section-title">Experience</div>${expHtml}`;
    if(eduHtml) mainHtml += `<div class="section-title">Education</div>${eduHtml}`;
    preview.innerHTML = `<div class="sb-side">${sideHtml}</div><div class="sb-main">${mainHtml}</div>`;
  } else if(resumeTemplate==='europass'){
    const email3=val('r-email'), phone3=val('r-phone');
    const dob3=val('r-dob'), nat3=val('r-nationality'), gender3=document.getElementById('r-gender').value;
    const addr3=val('r-present-addr')||val('r-location');
    const photoHtml3 = photoDataUrl ? `<img class="intl-photo" src="${photoDataUrl}">` : '';
    let htmlEp = `<div class="ep-header"><h3>${esc(name)}</h3>${photoHtml3}</div><div class="ep-body">`;
    htmlEp += `<div class="ep-bar">Personal Information</div>`;
    if(addr3) htmlEp += `<div class="ep-row"><span class="ep-label">Address</span><span>${esc(addr3)}</span></div>`;
    if(phone3) htmlEp += `<div class="ep-row"><span class="ep-label">Telephone</span><span>${esc(phone3)}</span></div>`;
    if(email3) htmlEp += `<div class="ep-row"><span class="ep-label">Email</span><span>${esc(email3)}</span></div>`;
    if(nat3) htmlEp += `<div class="ep-row"><span class="ep-label">Nationality</span><span>${esc(nat3)}</span></div>`;
    if(dob3) htmlEp += `<div class="ep-row"><span class="ep-label">Date of birth</span><span>${esc(dob3)}</span></div>`;
    if(gender3) htmlEp += `<div class="ep-row"><span class="ep-label">Gender</span><span>${esc(gender3)}</span></div>`;
    if(summary) htmlEp += `<div class="ep-bar">Personal Statement</div><p style="font-size:.8rem;">${esc(summary)}</p>`;
    if(expHtml) htmlEp += `<div class="ep-bar">Work Experience</div>${expHtml}`;
    if(eduHtml) htmlEp += `<div class="ep-bar">Education and Training</div>${eduHtml}`;
    let langRowsEp='';
    document.querySelectorAll('#lang-list .repeat-block').forEach(b=>{
      const lname=b.querySelector('.lang-name').value;
      if(!lname) return;
      const r=b.querySelector('.lang-reading').value, w=b.querySelector('.lang-writing').value, s=b.querySelector('.lang-speaking').value;
      langRowsEp += `<div class="ep-row"><span class="ep-label">${esc(lname)}</span><span>Reading: ${esc(r)} · Writing: ${esc(w)} · Speaking: ${esc(s)}</span></div>`;
    });
    if(langRowsEp) htmlEp += `<div class="ep-bar">Personal Skills — Languages</div>${langRowsEp}`;
    const digitalOs=val('r-computing-os'), digitalSw=val('r-computing-software');
    if(digitalOs || digitalSw){
      htmlEp += `<div class="ep-bar">Digital Competence</div>`;
      if(digitalOs) htmlEp += `<div class="ep-row"><span class="ep-label">Operating systems</span><span>${esc(digitalOs)}</span></div>`;
      if(digitalSw) htmlEp += `<div class="ep-row"><span class="ep-label">Software</span><span>${esc(digitalSw)}</span></div>`;
    }
    const strengthsEp=val('r-strengths');
    if(strengthsEp) htmlEp += `<div class="ep-bar">Organisational / Communication Skills</div><p style="font-size:.8rem;">${esc(strengthsEp).replace(/\n/g,'<br>')}</p>`;
    if(skills) htmlEp += `<div class="ep-bar">Other Skills</div><p style="font-size:.8rem;">${esc(skills)}</p>`;
    htmlEp += `</div>`;
    preview.innerHTML = htmlEp;
  } else if(resumeTemplate==='gulf'){
    const dobG=val('r-dob'), natG=val('r-nationality');
    const titleG=val('r-title'), passportG=val('r-passport'), drivingG=document.getElementById('r-driving-license').value;
    const photoHtmlG = photoDataUrl ? `<img class="gulf-photo" src="${photoDataUrl}">` : `<div class="gulf-photo placeholder">Photo</div>`;

    let html = `<div class="gulf-header">
      <div>
        <h3>${esc(name)}</h3>
        ${titleG?`<div class="gulf-title">${esc(titleG)}</div>`:''}
        <div class="gulf-contact-row">
          <div>${natG?esc(natG):''}</div>
          <div>${phone?esc(phone):''}</div>
          <div>${loc?esc(loc):''}</div>
          <div>${email?esc(email):''}</div>
          ${dobG?`<div>${esc(dobG)}</div>`:''}
          <div>Passport: ${esc(passportG)}</div>
          <div>Driving license: ${esc(drivingG)}</div>
        </div>
      </div>
      ${photoHtmlG}
    </div><div class="gulf-body">`;

    if(summary) html += `<div class="gulf-sec-title">Profile</div><p style="font-size:.82rem;">${esc(summary)}</p>`;

    let eduHtmlG='';
    document.querySelectorAll('#edu-list .repeat-block').forEach(b=>{
      const degree=b.querySelector('.edu-degree').value;
      const inst=b.querySelector('.edu-inst').value;
      const dates=b.querySelector('.edu-dates').value;
      if(!degree && !inst) return;
      eduHtmlG += `<div class="gulf-edu-entry">
        <div class="gulf-edu-dates">${esc(dates)}</div>
        <div><div class="gulf-edu-inst">${esc(inst)}</div><div class="gulf-edu-degree">${esc(degree)}</div></div>
      </div>`;
    });
    if(eduHtmlG) html += `<div class="gulf-sec-title">Education</div>${eduHtmlG}`;

    const strengthsG=val('r-strengths');
    if(strengthsG){
      const items=strengthsG.split('\n').map(s=>s.trim()).filter(Boolean);
      html += `<div class="gulf-sec-title">Personal Skills</div><ul class="gulf-check-list">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
    }

    let swRows='';
    document.querySelectorAll('#sw-skill-list .repeat-block').forEach(b=>{
      const swName=b.querySelector('.sw-name').value;
      if(!swName) return;
      const lvl=parseInt(b.querySelector('.sw-level').value)||0;
      let segs='';
      for(let i=1;i<=6;i++) segs += `<span class="${i<=lvl?'filled':''}"></span>`;
      swRows += `<div class="gulf-bar-row"><span class="lbl">${esc(swName)}</span><div class="gulf-bar-segs">${segs}</div></div>`;
    });
    if(swRows) html += `<div class="gulf-sec-title">Software Skills</div>${swRows}`;

    let glangRows='';
    document.querySelectorAll('#gulf-lang-list .repeat-block').forEach(b=>{
      const lname=b.querySelector('.glang-name').value;
      if(!lname) return;
      const lvl=parseInt(b.querySelector('.glang-level').value)||0;
      let dots='';
      for(let i=1;i<=6;i++) dots += `<span class="${i<=lvl?'filled':''}"></span>`;
      glangRows += `<div class="gulf-bar-row"><span class="lbl">${esc(lname)}</span><div class="gulf-dot-segs">${dots}</div></div>`;
    });
    if(glangRows) html += `<div class="gulf-sec-title">Languages</div>${glangRows}`;

    const hobbiesG=val('r-hobbies');
    if(hobbiesG){
      const items=hobbiesG.split(',').map(s=>s.trim()).filter(Boolean);
      html += `<div class="gulf-sec-title">Hobbies</div><div class="gulf-hobbies-row">${items.map(i=>`<span>✓ ${esc(i)}</span>`).join('')}</div>`;
    }

    const trainingG=val('r-training');
    if(trainingG){
      const items=trainingG.split('\n').map(s=>s.trim()).filter(Boolean);
      html += `<div class="gulf-sec-title">Training Courses</div><ul class="gulf-square-list">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
    }

    html += `</div>`;
    preview.innerHTML = html;
  } else if(resumeTemplate==='academic'){
    const researchInterests=val('r-research-interests');
    const awardsRaw=val('r-awards');
    let pubHtml='';
    document.querySelectorAll('#pub-list .repeat-block').forEach(b=>{
      const t=b.querySelector('.pub-title').value, v=b.querySelector('.pub-venue').value, y=b.querySelector('.pub-year').value;
      if(!t) return;
      pubHtml += `<div class="ac-pub-entry">${esc(t)}${v?'. '+esc(v):''}${y?' ('+esc(y)+')':''}.</div>`;
    });
    let confHtmlAc='';
    document.querySelectorAll('#conf-list .repeat-block').forEach(b=>{
      const t=b.querySelector('.conf-title').value, v=b.querySelector('.conf-venue').value, y=b.querySelector('.conf-year').value;
      if(!t) return;
      confHtmlAc += `<div class="ac-pub-entry">${esc(t)}${v?'. '+esc(v):''}${y?' ('+esc(y)+')':''}.</div>`;
    });
    let htmlAc = `<h3>${esc(name)}</h3><div class="contact">${esc(contact)}</div>`;
    if(researchInterests) htmlAc += `<div class="section-title">Research Interests</div><p>${esc(researchInterests)}</p>`;
    if(summary) htmlAc += `<div class="section-title">Profile</div><p>${esc(summary)}</p>`;
    if(eduHtml) htmlAc += `<div class="section-title">Education</div>${eduHtml}`;
    if(expHtml) htmlAc += `<div class="section-title">Academic & Professional Experience</div>${expHtml}`;
    if(pubHtml) htmlAc += `<div class="section-title">Publications</div>${pubHtml}`;
    if(confHtmlAc) htmlAc += `<div class="section-title">Conferences & Presentations</div>${confHtmlAc}`;
    if(awardsRaw){
      const items=awardsRaw.split('\n').map(s=>s.trim()).filter(Boolean);
      htmlAc += `<div class="section-title">Grants & Awards</div><ul style="margin:4px 0 0 0;padding-left:18px;font-size:.85rem;">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
    }
    if(skills) htmlAc += `<div class="section-title">Skills</div><div class="skills-list">${esc(skills)}</div>`;
    const referencesAc=val('r-references');
    if(referencesAc) htmlAc += `<div class="section-title">References</div><p>${esc(referencesAc)}</p>`;
    preview.innerHTML = htmlAc;
  } else if(resumeTemplate==='compact'){
    const linkedinC=val('r-linkedin');
    const titleC=val('r-title');
    const contactC=[loc,email,phone,linkedinC].filter(Boolean).join(' | ');

    let html = `<h3>${esc(name)}</h3>`;
    if(titleC) html += `<div class="cp-subtitle">${esc(titleC)}</div>`;
    if(contactC) html += `<div class="cp-contact">${esc(contactC)}</div>`;

    if(summary) html += `<div class="cp-sec-title">Professional Summary</div><p style="font-size:.82rem;">${esc(summary)}</p>`;

    let expHtmlC='';
    document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
      const role=b.querySelector('.exp-role').value;
      const company=b.querySelector('.exp-company').value;
      const locv=b.querySelector('.exp-loc').value;
      const dates=b.querySelector('.exp-dates').value;
      const desc=b.querySelector('.exp-desc').value;
      if(!role && !company) return;
      const orgLine = locv ? `${esc(company)}, ${esc(locv)}` : esc(company);
      const bullets = desc ? desc.split('\n').map(s=>s.trim()).filter(Boolean) : [];
      expHtmlC += `<div class="cp-entry">
        <div class="cp-role">${esc(role)}</div>
        <div class="cp-org-row"><span>${orgLine}</span><span>${esc(dates)}</span></div>
        ${bullets.length?'<ul>'+bullets.map(x=>`<li>${esc(x)}</li>`).join('')+'</ul>':''}
      </div>`;
    });
    if(expHtmlC) html += `<div class="cp-sec-title">Work Experience</div>${expHtmlC}`;

    let eduHtmlC='';
    document.querySelectorAll('#edu-list .repeat-block').forEach(b=>{
      const degree=b.querySelector('.edu-degree').value;
      const inst=b.querySelector('.edu-inst').value;
      const locv=b.querySelector('.edu-loc').value;
      const dates=b.querySelector('.edu-dates').value;
      if(!degree && !inst) return;
      const orgLine = locv ? `${esc(inst)}, ${esc(locv)}` : esc(inst);
      eduHtmlC += `<div class="cp-entry">
        <div class="cp-role">${esc(degree)}</div>
        <div class="cp-org-row"><span>${orgLine}</span><span>${dates?'Graduated: '+esc(dates):''}</span></div>
      </div>`;
    });
    if(eduHtmlC) html += `<div class="cp-sec-title">Education</div>${eduHtmlC}`;

    if(skills){
      const items=skills.split(',').map(s=>s.trim()).filter(Boolean);
      const groups=[];
      for(let i=0;i<items.length;i+=4) groups.push(items.slice(i,i+4).join(', '));
      html += `<div class="cp-sec-title">Skills</div><ul class="cp-plain-list">${groups.map(g=>`<li>${esc(g)}</li>`).join('')}</ul>`;
    }

    const certsC=val('r-training');
    if(certsC){
      const items=certsC.split('\n').map(s=>s.trim()).filter(Boolean);
      html += `<div class="cp-sec-title">Certifications</div><ul class="cp-plain-list">${items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul>`;
    }

    preview.innerHTML = html;
  } else {
    preview.innerHTML = bodyHtml;
  }
  saveData();
}
function val(id){return document.getElementById(id).value.trim();}
function esc(s){
  return (s||'').replace(/[&<>"']/g, c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
}

// ---- Auto-save / restore ----
let saveTimer;
function saveData(){
  clearTimeout(saveTimer);
  saveTimer=setTimeout(()=>{
    try{ localStorage.setItem('deskwork_draft_v1', JSON.stringify(collectData())); }catch(e){}
  }, 400);
}
function collectData(){
  const exp=[];
  document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
    exp.push({
      role:b.querySelector('.exp-role').value, company:b.querySelector('.exp-company').value,
      dates:b.querySelector('.exp-dates').value, loc:b.querySelector('.exp-loc').value,
      desc:b.querySelector('.exp-desc').value
    });
  });
  const edu=[];
  document.querySelectorAll('#edu-list .repeat-block').forEach(b=>{
    edu.push({
      degree:b.querySelector('.edu-degree').value, inst:b.querySelector('.edu-inst').value,
      dates:b.querySelector('.edu-dates').value, gpa:b.querySelector('.edu-gpa').value,
      scale:b.querySelector('.edu-scale').value, classDiv:b.querySelector('.edu-class').value,
      group:b.querySelector('.edu-group').value, board:b.querySelector('.edu-board').value,
      note:b.querySelector('.edu-note').value, loc:b.querySelector('.edu-loc').value
    });
  });
  const langs=[];
  document.querySelectorAll('#lang-list .repeat-block').forEach(b=>{
    langs.push({
      name:b.querySelector('.lang-name').value, reading:b.querySelector('.lang-reading').value,
      writing:b.querySelector('.lang-writing').value, speaking:b.querySelector('.lang-speaking').value
    });
  });
  const pubs=[];
  document.querySelectorAll('#pub-list .repeat-block').forEach(b=>{
    pubs.push({
      title:b.querySelector('.pub-title').value, venue:b.querySelector('.pub-venue').value,
      year:b.querySelector('.pub-year').value
    });
  });
  const confs=[];
  document.querySelectorAll('#conf-list .repeat-block').forEach(b=>{
    confs.push({
      title:b.querySelector('.conf-title').value, venue:b.querySelector('.conf-venue').value,
      year:b.querySelector('.conf-year').value
    });
  });
  const swSkills=[];
  document.querySelectorAll('#sw-skill-list .repeat-block').forEach(b=>{
    swSkills.push({ name:b.querySelector('.sw-name').value, level:b.querySelector('.sw-level').value });
  });
  const gulfLangs=[];
  document.querySelectorAll('#gulf-lang-list .repeat-block').forEach(b=>{
    gulfLangs.push({ name:b.querySelector('.glang-name').value, level:b.querySelector('.glang-level').value });
  });
  const jpEdu=[];
  document.querySelectorAll('#jp-edu-list .repeat-block').forEach(b=>{
    jpEdu.push({
      start:b.querySelector('.jp-edu-start').value, end:b.querySelector('.jp-edu-end').value,
      school:b.querySelector('.jp-edu-school').value, specialty:b.querySelector('.jp-edu-specialty').value,
      license:b.querySelector('.jp-edu-license').value,
      resultVal:b.querySelector('.jp-edu-result').value, resultScale:b.querySelector('.jp-edu-result-scale').value
    });
  });
  const jpLangCerts=[];
  document.querySelectorAll('#jp-lang-cert-list .repeat-block').forEach(b=>{
    jpLangCerts.push({
      test:b.querySelector('.jp-langcert-test').value,
      value:b.querySelector('.jp-langcert-value').value, max:b.querySelector('.jp-langcert-max').value
    });
  });
  const jpWork=[];
  document.querySelectorAll('#jp-work-list .repeat-block').forEach(b=>{
    jpWork.push({
      start:b.querySelector('.jp-work-start').value, end:b.querySelector('.jp-work-end').value,
      company:b.querySelector('.jp-work-company').value, role:b.querySelector('.jp-work-role').value
    });
  });
  const jpFamily=[];
  document.querySelectorAll('#jp-family-list .repeat-block').forEach(b=>{
    jpFamily.push({
      name:b.querySelector('.jp-fam-name').value, relation:b.querySelector('.jp-fam-relation').value,
      age:b.querySelector('.jp-fam-age').value, occupation:b.querySelector('.jp-fam-occupation').value,
      living:b.querySelector('.jp-fam-living').value
    });
  });
  return {
    name:val('r-name'), email:val('r-email'), phone:val('r-phone'),
    location:val('r-location'), summary:val('r-summary'), skills:val('r-skills'),
    dob:val('r-dob'), nationality:val('r-nationality'),
    father:val('r-father'), mother:val('r-mother'), marital:document.getElementById('r-marital').value,
    religion:val('r-religion'), nid:val('r-nid'), languages:val('r-languages'), references:val('r-references'),
    presentAddr:val('r-present-addr'), permanentAddr:val('r-permanent-addr'),
    gender:document.getElementById('r-gender').value, computingOs:val('r-computing-os'),
    computingSoftware:val('r-computing-software'), strengths:val('r-strengths'), langs,
    passport:val('r-passport'), visaStatus:val('r-visa-status'), drivingLicense:document.getElementById('r-driving-license').value,
    researchInterests:val('r-research-interests'), awards:val('r-awards'), pubs, confs,
    linkedin:val('r-linkedin'), training:val('r-training'),
    title:val('r-title'), hobbies:val('r-hobbies'), swSkills, gulfLangs,
    template:resumeTemplate, exp, edu,
    letter:{
      purpose:document.getElementById('l-purpose').value,
      yourname:val('l-yourname'), extra:val('l-extra'),
      company:val('l-company'), jobtitle:val('l-jobtitle'), manager:val('l-manager'),
      opening:val('l-opening'), body:val('l-body'), closing:val('l-closing')
    },
    japan:{
      fullname:val('jp-fullname'), furigana:val('jp-furigana'), marriage:document.getElementById('jp-marriage').value,
      dob:val('jp-dob'), age:val('jp-age'), permanentAddr:val('jp-permanent-addr'),
      height:val('jp-height'), weight:val('jp-weight'), hand:document.getElementById('jp-hand').value,
      blood:document.getElementById('jp-blood').value, eyeLeft:val('jp-eye-left'), eyeRight:val('jp-eye-right'),
      tattoo:document.getElementById('jp-tattoo').value, colorblind:document.getElementById('jp-colorblind').value,
      smoking:document.getElementById('jp-smoking').value, drinking:document.getElementById('jp-drinking').value,
      medical:document.getElementById('jp-medical').value, drivingLicense:document.getElementById('jp-driving-license').value,
      english:document.getElementById('jp-english').value,
      otherQual:val('jp-other-qual'), personality:val('jp-personality'), hobby:val('jp-hobby'),
      favoriteSubject:val('jp-favorite-subject'), groupLiving:document.getElementById('jp-group-living').value,
      cooking:document.getElementById('jp-cooking').value, dietary:val('jp-dietary'), worship:val('jp-worship'),
      fasting:document.getElementById('jp-fasting').value,
      remittance:val('jp-remittance'), longterm:val('jp-longterm'),
      residenceApplied:document.getElementById('jp-residence-applied').value, residenceDetail:val('jp-residence-detail'),
      relativesJapan:document.getElementById('jp-relatives-japan').value, relativesWho:val('jp-relatives-who'),
      familyOpinion:document.getElementById('jp-family-opinion').value,
      edu:jpEdu, work:jpWork, family:jpFamily, langCerts:jpLangCerts
    },
    blog:{
      title:val('bw-title'), excerpt:val('bw-excerpt'), author:val('bw-author'),
      category:val('bw-category'), metaDesc:val('bw-meta-desc'),
      body:document.getElementById('bw-editor').innerHTML
    }
  };
}
function loadSavedData(){
  let raw;
  try{ raw=localStorage.getItem('deskwork_draft_v1'); }catch(e){ return false; }
  if(!raw) return false;
  let d;
  try{ d=JSON.parse(raw); }catch(e){ return false; }

  document.getElementById('r-name').value=d.name||'';
  document.getElementById('r-email').value=d.email||'';
  document.getElementById('r-phone').value=d.phone||'';
  document.getElementById('r-location').value=d.location||'';
  document.getElementById('r-summary').value=d.summary||'';
  document.getElementById('r-skills').value=d.skills||'';
  document.getElementById('r-dob').value=d.dob||'';
  document.getElementById('r-nationality').value=d.nationality||'';
  document.getElementById('r-father').value=d.father||'';
  document.getElementById('r-mother').value=d.mother||'';
  document.getElementById('r-marital').value=d.marital||'';
  document.getElementById('r-religion').value=d.religion||'';
  document.getElementById('r-nid').value=d.nid||'';
  document.getElementById('r-languages').value=d.languages||'';
  document.getElementById('r-references').value=d.references||'';
  document.getElementById('r-present-addr').value=d.presentAddr||'';
  document.getElementById('r-permanent-addr').value=d.permanentAddr||'';
  document.getElementById('r-gender').value=d.gender||'';
  document.getElementById('r-computing-os').value=d.computingOs||'';
  document.getElementById('r-computing-software').value=d.computingSoftware||'';
  document.getElementById('r-strengths').value=d.strengths||'';
  document.getElementById('r-passport').value=d.passport||'';
  document.getElementById('r-visa-status').value=d.visaStatus||'';
  if(d.drivingLicense) document.getElementById('r-driving-license').value=d.drivingLicense;
  document.getElementById('r-research-interests').value=d.researchInterests||'';
  document.getElementById('r-awards').value=d.awards||'';
  document.getElementById('r-linkedin').value=d.linkedin||'';
  document.getElementById('r-training').value=d.training||'';
  document.getElementById('r-title').value=d.title||'';
  document.getElementById('r-hobbies').value=d.hobbies||'';

  document.getElementById('exp-list').innerHTML='';
  document.getElementById('edu-list').innerHTML='';
  expCount=0; eduCount=0;

  const expArr=(d.exp && d.exp.length) ? d.exp : [{}];
  expArr.forEach(item=>{
    addExp();
    const block=document.getElementById('exp-list').lastElementChild;
    block.querySelector('.exp-role').value=item.role||'';
    block.querySelector('.exp-company').value=item.company||'';
    block.querySelector('.exp-dates').value=item.dates||'';
    block.querySelector('.exp-loc').value=item.loc||'';
    block.querySelector('.exp-desc').value=item.desc||'';
  });

  const eduArr=(d.edu && d.edu.length) ? d.edu : [{}];
  eduArr.forEach(item=>{
    addEdu();
    const block=document.getElementById('edu-list').lastElementChild;
    block.querySelector('.edu-degree').value=item.degree||'';
    block.querySelector('.edu-inst').value=item.inst||'';
    block.querySelector('.edu-dates').value=item.dates||'';
    if(item.scale) block.querySelector('.edu-scale').value=item.scale;
    block.querySelector('.edu-gpa').max=block.querySelector('.edu-scale').value;
    block.querySelector('.edu-gpa').value=item.gpa||'';
    block.querySelector('.edu-class').value=item.classDiv||'';
    block.querySelector('.edu-group').value=item.group||'';
    block.querySelector('.edu-board').value=item.board||'';
    block.querySelector('.edu-note').value=item.note||'';
    block.querySelector('.edu-loc').value=item.loc||'';
  });

  document.getElementById('lang-list').innerHTML='';
  langCount=0;
  if(d.langs && d.langs.length){
    d.langs.forEach(item=>{
      addLangRow();
      const block=document.getElementById('lang-list').lastElementChild;
      block.querySelector('.lang-name').value=item.name||'';
      if(item.reading) block.querySelector('.lang-reading').value=item.reading;
      if(item.writing) block.querySelector('.lang-writing').value=item.writing;
      if(item.speaking) block.querySelector('.lang-speaking').value=item.speaking;
    });
  }

  document.getElementById('pub-list').innerHTML='';
  pubCount=0;
  if(d.pubs && d.pubs.length){
    d.pubs.forEach(item=>{
      addPubRow();
      const block=document.getElementById('pub-list').lastElementChild;
      block.querySelector('.pub-title').value=item.title||'';
      block.querySelector('.pub-venue').value=item.venue||'';
      block.querySelector('.pub-year').value=item.year||'';
    });
  }

  document.getElementById('conf-list').innerHTML='';
  confCount=0;
  if(d.confs && d.confs.length){
    d.confs.forEach(item=>{
      addConfRow();
      const block=document.getElementById('conf-list').lastElementChild;
      block.querySelector('.conf-title').value=item.title||'';
      block.querySelector('.conf-venue').value=item.venue||'';
      block.querySelector('.conf-year').value=item.year||'';
    });
  }

  document.getElementById('sw-skill-list').innerHTML='';
  swSkillCount=0;
  if(d.swSkills && d.swSkills.length){
    d.swSkills.forEach(item=>{
      addSwSkillRow();
      const block=document.getElementById('sw-skill-list').lastElementChild;
      block.querySelector('.sw-name').value=item.name||'';
      if(item.level) block.querySelector('.sw-level').value=item.level;
    });
  }

  document.getElementById('gulf-lang-list').innerHTML='';
  gulfLangCount=0;
  if(d.gulfLangs && d.gulfLangs.length){
    d.gulfLangs.forEach(item=>{
      addGulfLangRow();
      const block=document.getElementById('gulf-lang-list').lastElementChild;
      block.querySelector('.glang-name').value=item.name||'';
      if(item.level) block.querySelector('.glang-level').value=item.level;
    });
  }

  if(d.template){
    resumeTemplate=d.template;
    document.querySelectorAll('.tmpl-btn').forEach(b=>b.classList.toggle('active', b.dataset.tmpl===resumeTemplate));
  }

  if(d.letter){
    if(d.letter.purpose) document.getElementById('l-purpose').value=d.letter.purpose;
    document.getElementById('l-yourname').value=d.letter.yourname||'';
    document.getElementById('l-extra').value=d.letter.extra||'';
    document.getElementById('l-company').value=d.letter.company||'';
    document.getElementById('l-jobtitle').value=d.letter.jobtitle||'';
    document.getElementById('l-manager').value=d.letter.manager||'';
    document.getElementById('l-opening').value=d.letter.opening||'';
    document.getElementById('l-body').value=d.letter.body||'';
    document.getElementById('l-closing').value=d.letter.closing||'';
    onLetterPurposeChange();
  }

  document.getElementById('jp-edu-list').innerHTML='';
  document.getElementById('jp-work-list').innerHTML='';
  document.getElementById('jp-family-list').innerHTML='';
  jpEduCount=0; jpWorkCount=0; jpFamilyCount=0;

  const j=d.japan||{};
  document.getElementById('jp-fullname').value=j.fullname||'';
  document.getElementById('jp-furigana').value=j.furigana||'';
  if(j.marriage) document.getElementById('jp-marriage').value=j.marriage;
  document.getElementById('jp-dob').value=j.dob||'';
  document.getElementById('jp-age').value=j.age||'';
  document.getElementById('jp-permanent-addr').value=j.permanentAddr||'';
  document.getElementById('jp-height').value=j.height||'';
  document.getElementById('jp-weight').value=j.weight||'';
  if(j.hand) document.getElementById('jp-hand').value=j.hand;
  if(j.blood) document.getElementById('jp-blood').value=j.blood;
  document.getElementById('jp-eye-left').value=j.eyeLeft||'';
  document.getElementById('jp-eye-right').value=j.eyeRight||'';
  if(j.tattoo) document.getElementById('jp-tattoo').value=j.tattoo;
  if(j.colorblind) document.getElementById('jp-colorblind').value=j.colorblind;
  if(j.smoking) document.getElementById('jp-smoking').value=j.smoking;
  if(j.drinking) document.getElementById('jp-drinking').value=j.drinking;
  if(j.medical) document.getElementById('jp-medical').value=j.medical;
  if(j.drivingLicense) document.getElementById('jp-driving-license').value=j.drivingLicense;
  if(j.english) document.getElementById('jp-english').value=j.english;
  document.getElementById('jp-other-qual').value=j.otherQual||'';
  document.getElementById('jp-personality').value=j.personality||'';
  document.getElementById('jp-hobby').value=j.hobby||'';
  document.getElementById('jp-favorite-subject').value=j.favoriteSubject||'';
  if(j.groupLiving) document.getElementById('jp-group-living').value=j.groupLiving;
  if(j.cooking) document.getElementById('jp-cooking').value=j.cooking;
  document.getElementById('jp-dietary').value=j.dietary||'';
  document.getElementById('jp-worship').value=j.worship||'';
  if(j.fasting) document.getElementById('jp-fasting').value=j.fasting;
  document.getElementById('jp-remittance').value=j.remittance||'';
  document.getElementById('jp-longterm').value=j.longterm||'';
  if(j.residenceApplied) document.getElementById('jp-residence-applied').value=j.residenceApplied;
  document.getElementById('jp-residence-detail').value=j.residenceDetail||'';
  if(j.relativesJapan) document.getElementById('jp-relatives-japan').value=j.relativesJapan;
  document.getElementById('jp-relatives-who').value=j.relativesWho||'';
  if(j.familyOpinion) document.getElementById('jp-family-opinion').value=j.familyOpinion;

  const jpEduArr=(j.edu && j.edu.length) ? j.edu : [{}];
  jpEduArr.forEach(item=>{
    addJpEdu();
    const b=document.getElementById('jp-edu-list').lastElementChild;
    b.querySelector('.jp-edu-start').value=item.start||'';
    b.querySelector('.jp-edu-end').value=item.end||'';
    b.querySelector('.jp-edu-school').value=item.school||'';
    b.querySelector('.jp-edu-specialty').value=item.specialty||'';
    b.querySelector('.jp-edu-license').value=item.license||'';
    b.querySelector('.jp-edu-result').value=item.resultVal||'';
    if(item.resultScale) b.querySelector('.jp-edu-result-scale').value=item.resultScale;
  });

  const jpLangCertArr=(j.langCerts && j.langCerts.length) ? j.langCerts : [];
  jpLangCertArr.forEach(item=>{
    addJpLangCert();
    const b=document.getElementById('jp-lang-cert-list').lastElementChild;
    if(item.test) b.querySelector('.jp-langcert-test').value=item.test;
    b.querySelector('.jp-langcert-value').value=item.value||'';
    b.querySelector('.jp-langcert-max').value=item.max||'';
  });

  const jpWorkArr=(j.work && j.work.length) ? j.work : [{}];
  jpWorkArr.forEach(item=>{
    addJpWork();
    const b=document.getElementById('jp-work-list').lastElementChild;
    b.querySelector('.jp-work-start').value=item.start||'';
    b.querySelector('.jp-work-end').value=item.end||'';
    b.querySelector('.jp-work-company').value=item.company||'';
    b.querySelector('.jp-work-role').value=item.role||'';
  });

  const jpFamilyArr=(j.family && j.family.length) ? j.family : [{}];
  jpFamilyArr.forEach(item=>{
    addJpFamily();
    const b=document.getElementById('jp-family-list').lastElementChild;
    b.querySelector('.jp-fam-name').value=item.name||'';
    b.querySelector('.jp-fam-relation').value=item.relation||'';
    b.querySelector('.jp-fam-age').value=item.age||'';
    b.querySelector('.jp-fam-occupation').value=item.occupation||'';
    if(item.living) b.querySelector('.jp-fam-living').value=item.living;
  });

  if(d.blog){
    document.getElementById('bw-title').value=d.blog.title||'';
    document.getElementById('bw-excerpt').value=d.blog.excerpt||'';
    document.getElementById('bw-author').value=d.blog.author||'';
    document.getElementById('bw-category').value=d.blog.category||'';
    document.getElementById('bw-meta-desc').value=d.blog.metaDesc||'';
    if(d.blog.body) document.getElementById('bw-editor').innerHTML=d.blog.body;
  }

  return true;
}

// ---- Cover letter ----
const letterPurposes={
  job:{ orgLabel:'Company name', orgPh:'Acme Inc.', subjLabel:'Job title', subjPh:'Software Engineer', recLabel:'Hiring manager', recPh:'Leave blank to use "Hiring Manager"', fallback:'Hiring Manager', extraLabel:'Referral', extraPh:'How you found this role, e.g. LinkedIn, referral' },
  request:{ orgLabel:'Organization', orgPh:'Company or organization name', subjLabel:'Subject', subjPh:'What is this about?', recLabel:'Recipient name', recPh:'Leave blank to use "Sir/Madam"', fallback:'Sir/Madam', extraLabel:'Additional detail', extraPh:'Any reference number or extra context' },
  complaint:{ orgLabel:'Platform / Company', orgPh:'Facebook, product name, etc.', subjLabel:'Issue', subjPh:'Bug report, complaint topic', recLabel:'Recipient / Team', recPh:'Leave blank to use "Support Team"', fallback:'Support Team', extraLabel:'Reference / Order number', extraPh:'Order #12345' },
  school:{ orgLabel:'School / Institution', orgPh:'School name', subjLabel:'Subject', subjPh:'Reason for writing', recLabel:"Teacher's name", recPh:'Leave blank to use "Teacher"', fallback:'Teacher', extraLabel:'Class / Roll number', extraPh:'Class 10, Roll 24' },
  account:{ orgLabel:'Platform', orgPh:'Facebook, Gmail, etc.', subjLabel:'Issue', subjPh:'Account recovery, locked account, etc.', recLabel:'Recipient / Team', recPh:'Leave blank to use "Support Team"', fallback:'Support Team', extraLabel:'Account email or username', extraPh:'The email/username on the affected account' },
  thanks:{ orgLabel:'Organization', orgPh:"Company or person's workplace", subjLabel:'Reason', subjPh:"What you're thanking them for", recLabel:'Recipient name', recPh:'Leave blank to use "there"', fallback:'there', extraLabel:'Additional detail', extraPh:"What specifically you're following up about" },
  custom:{ orgLabel:'Organization / Context', orgPh:'Optional', subjLabel:'Subject', subjPh:'What is this about?', recLabel:'Recipient name', recPh:'Leave blank to use "there"', fallback:'there', extraLabel:'Additional detail', extraPh:'Any extra context' }
};
function currentLetterPurpose(){
  const p=document.getElementById('l-purpose').value;
  return letterPurposes[p] || letterPurposes.job;
}
function onLetterPurposeChange(){
  const p=currentLetterPurpose();
  document.getElementById('l-company-label').textContent=p.orgLabel;
  document.getElementById('l-company').placeholder=p.orgPh;
  document.getElementById('l-jobtitle-label').textContent=p.subjLabel;
  document.getElementById('l-jobtitle').placeholder=p.subjPh;
  document.getElementById('l-manager-label').innerHTML=`${p.recLabel} <span style="font-weight:400;color:var(--ink-soft);">(optional)</span>`;
  document.getElementById('l-manager').placeholder=p.recPh;
  document.getElementById('l-extra-label').innerHTML=`${p.extraLabel} <span style="font-weight:400;color:var(--ink-soft);">(optional)</span>`;
  document.getElementById('l-extra').placeholder=p.extraPh;
  renderLetter();
}

function renderLetter(){
  const name=val('l-yourname')||val('r-name')||'Your Name';
  const email=val('r-email'), phone=val('r-phone'), loc=val('r-location');
  const contactLine=[email,phone,loc].filter(Boolean).join(' · ');
  const company=val('l-company');
  const purpose=currentLetterPurpose();
  const manager=val('l-manager')||purpose.fallback;
  const opening=val('l-opening'), body=val('l-body'), closing=val('l-closing');
  const today=new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});

  let html=`<div style="margin-bottom:16px;"><strong>${esc(name)}</strong><br><span style="font-size:.8rem;color:#555;">${esc(contactLine)}</span></div>`;
  html+=`<div style="margin-bottom:16px;font-size:.82rem;color:#555;">${today}</div>`;
  if(company) html+=`<div style="margin-bottom:16px;font-size:.85rem;">${esc(manager)}<br>${esc(company)}</div>`;
  html+=`<p>Dear ${esc(manager)},</p>`;
  if(opening) html+=`<p>${esc(opening)}</p>`;
  if(body) html+=`<p>${esc(body)}</p>`;
  if(closing) html+=`<p>${esc(closing)}</p>`;
  html+=`<p>Sincerely,<br>${esc(name)}</p>`;

  document.getElementById('letter-preview').innerHTML=html;
  saveData();
}

function autoDraftLetter(){
  const p=document.getElementById('l-purpose').value;
  const org=val('l-company');
  const subject=val('l-jobtitle');
  const extra=val('l-extra');
  const skillsRaw=val('r-skills');
  const skillList=skillsRaw ? skillsRaw.split(',').map(s=>s.trim()).filter(Boolean) : [];
  const roles=[];
  document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
    const role=b.querySelector('.exp-role').value.trim();
    if(role) roles.push(role);
  });

  const templates={
    job:{
      opening:`I'm writing to apply for the ${subject||'this role'} position at ${org||'your company'}.${roles.length ? ' With experience as a '+roles[0]+',' : ''} I believe I'd be a strong fit for this role.${extra?' I found this opportunity through '+extra+'.':''}`,
      body:skillList.length ? `My background includes ${skillList.slice(0,3).join(', ')}${skillList.length>3?', among other areas':''}. I'm confident these skills would let me contribute quickly to your team.` : `My experience has prepared me well for this position, and I'm confident I could contribute quickly to your team.`,
      closing:`Thank you for considering my application. I'd welcome the opportunity to discuss how I can contribute to ${org||'your team'}.`
    },
    request:{
      opening:`I'm writing to ${subject ? 'request assistance with '+subject : 'make a request regarding a matter I\'d like to discuss'}.${extra?' ('+extra+')':''}`,
      body:`I would appreciate it if you could look into this and let me know the next steps.`,
      closing:`Thank you for your time and consideration. I look forward to your response.`
    },
    complaint:{
      opening:`I'm writing to report an issue${subject ? ' regarding '+subject : ''} that I've experienced with ${org||'your service'}.${extra?' Reference: '+extra+'.':''}`,
      body:`I wanted to bring this to your attention so it can be looked into and resolved. Please let me know if you need any further details from me.`,
      closing:`I appreciate your help in resolving this and look forward to your response.`
    },
    school:{
      opening:`I'm writing regarding ${subject || 'a matter concerning my studies'}.${extra?' I am a student in '+extra+'.':''}`,
      body:`I wanted to reach out directly to discuss this and would appreciate your guidance.`,
      closing:`Thank you for your time — please let me know if we could arrange a time to discuss this further.`
    },
    account:{
      opening:`I'm writing to request help with ${subject || 'an issue with my account'} on ${org||'your platform'}.${extra?' The account in question is: '+extra+'.':''}`,
      body:`I'd appreciate any assistance you can provide in resolving this as soon as possible.`,
      closing:`Thank you for your help — please let me know if you need any additional information to verify my account or resolve this issue.`
    },
    thanks:{
      opening:`I wanted to reach out and say thank you${subject ? ' for '+subject : ''}.${extra?' '+extra+'.':''}`,
      body:`I really appreciated it and wanted to make sure you knew.`,
      closing:`Thanks again — I hope to stay in touch.`
    },
    custom:{
      opening:`I'm writing regarding ${subject || 'the following matter'}.${extra?' '+extra+'.':''}`,
      body:`I wanted to share the details and would appreciate your response.`,
      closing:`Thank you for your time and consideration.`
    }
  };
  const t=templates[p]||templates.custom;

  document.getElementById('l-opening').value=t.opening;
  document.getElementById('l-body').value=t.body;
  document.getElementById('l-closing').value=t.closing;
  renderLetter();
  showToast('Draft added — feel free to personalize it.');
}

function printLetter(){ window.print(); }

function copyLetterToClipboard(){
  const name=val('l-yourname')||val('r-name')||'Your Name';
  const purpose=currentLetterPurpose();
  const recipient=val('l-manager')||purpose.fallback;
  const company=val('l-company');
  const opening=val('l-opening'), body=val('l-body'), closing=val('l-closing');

  let text=`Dear ${recipient},\n\n`;
  if(opening) text+=opening+'\n\n';
  if(body) text+=body+'\n\n';
  if(closing) text+=closing+'\n\n';
  text+=`Sincerely,\n${name}`;

  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>{
      showToast('Copied — paste it into Gmail, Facebook, or anywhere else.');
    }).catch(()=>{
      showToast('Could not copy automatically — please select and copy the text manually.');
    });
  } else {
    showToast('Copy isn\'t supported in this browser — please select and copy the text manually.');
  }
}

// ---- Japan format (rirekisho) ----
function jpCheck(selected, valA, labelA, valB, labelB){
  const a = selected===valA ? '☑' : '☐';
  const b = selected===valB ? '☑' : '☐';
  return `${a}${labelA} ${b}${labelB}`;
}

let jpPhotoDataUrl=null;

function renderJapan(){
  const name=val('jp-fullname')||val('r-name')||'Your Name';
  const furigana=val('jp-furigana');
  const dob=val('jp-dob')||val('r-dob'), age=val('jp-age'), permAddr=val('jp-permanent-addr')||val('r-permanent-addr');
  const marriage=document.getElementById('jp-marriage').value;

  const photoHtml = jpPhotoDataUrl
    ? `<img class="jp-photo" src="${jpPhotoDataUrl}">`
    : `<div class="jp-photo placeholder">Photo</div>`;

  let html = `<h3>履歴書 / Resume</h3><div class="jp-sub">Date: ${esc(new Date().toLocaleDateString('en-GB',{year:'numeric',month:'2-digit',day:'2-digit'}))}</div>`;
  html += `<div class="jp-photo-wrap">${photoHtml}</div>`;
  html += `<table>
    <tr><td class="jp-label">フリガナ / Furigana</td><td>${esc(furigana)}</td></tr>
    <tr><td class="jp-label">氏名 / Full Name</td><td>${esc(name)}</td></tr>
    <tr><td class="jp-label">婚姻 / Marriage</td><td>${jpCheck(marriage,'Unmarried','未婚/Unmarried','Married','既婚/Married')}</td></tr>
    <tr><td class="jp-label">生年月日 / Date of Birth</td><td>${esc(dob)}</td></tr>
    <tr><td class="jp-label">年齢 / Age</td><td>${esc(age)}</td></tr>
    <tr><td class="jp-label">本籍地 / Permanent Address</td><td>${esc(permAddr)}</td></tr>
  </table>`;

  const drivingLic=document.getElementById('jp-driving-license').value;
  html += `<div class="jp-section-title">Physical & Health / 身体・健康情報</div>`;
  html += `<table>
    <tr><td class="jp-label">身長 / Height</td><td>${esc(val('jp-height'))} cm</td><td class="jp-label">体重 / Weight</td><td>${esc(val('jp-weight'))} kg</td></tr>
    <tr><td class="jp-label">利き手 / Dominant hand</td><td>${jpCheck(document.getElementById('jp-hand').value,'Left','左/Left','Right','右/Right')}</td><td class="jp-label">血液型 / Blood type</td><td>${esc(document.getElementById('jp-blood').value)}</td></tr>
    <tr><td class="jp-label">視力 / Eyesight (L/R)</td><td>${esc(val('jp-eye-left'))} / ${esc(val('jp-eye-right'))}</td><td class="jp-label">入れ墨 / Tattoo</td><td>${jpCheck(document.getElementById('jp-tattoo').value,'No','無/No','Yes','有/Yes')}</td></tr>
    <tr><td class="jp-label">色覚異常 / Color blindness</td><td>${jpCheck(document.getElementById('jp-colorblind').value,'No','無/No','Yes','有/Yes')}</td><td class="jp-label">喫煙 / Smoking</td><td>${jpCheck(document.getElementById('jp-smoking').value,'No','無/No','Yes','有/Yes')}</td></tr>
    <tr><td class="jp-label">飲酒 / Drinking</td><td>${jpCheck(document.getElementById('jp-drinking').value,'No','無/No','Yes','有/Yes')}</td><td class="jp-label">病歴 / Medical history</td><td>${jpCheck(document.getElementById('jp-medical').value,'No','無/No','Yes','有/Yes')}</td></tr>
    <tr><td class="jp-label">運転免許 / Driving License</td><td colspan="3">${jpCheck(drivingLic,'No','無/No','Yes','有/Yes')}</td></tr>
  </table>`;

  let eduRows='';
  document.querySelectorAll('#jp-edu-list .repeat-block').forEach(b=>{
    const start=b.querySelector('.jp-edu-start').value, end=b.querySelector('.jp-edu-end').value;
    const school=b.querySelector('.jp-edu-school').value, spec=b.querySelector('.jp-edu-specialty').value, lic=b.querySelector('.jp-edu-license').value;
    const resultVal=b.querySelector('.jp-edu-result').value, resultScale=b.querySelector('.jp-edu-result-scale').value;
    if(!school) return;
    let resultTxt='';
    if(resultScale==='running'){
      resultTxt='Running';
    } else if(resultVal){
      resultTxt=`${resultScale==='4'?'CGPA':'GPA'} ${esc(resultVal)}/${resultScale}.00`;
    }
    eduRows+=`<tr><td>${esc(start)}</td><td>${esc(end)}</td><td>${esc(school)}</td><td>${esc(spec)}</td><td>${esc(lic)}</td><td>${resultTxt}</td></tr>`;
  });
  if(eduRows){
    html += `<div class="jp-section-title">Academic Background / 学歴</div>
    <table><tr><th>Start</th><th>End</th><th>School</th><th>Specialty</th><th>License</th><th>Result</th></tr>${eduRows}</table>`;
  }

  let langCertRows='';
  document.querySelectorAll('#jp-lang-cert-list .repeat-block').forEach(b=>{
    const test=b.querySelector('.jp-langcert-test').value;
    const rv=b.querySelector('.jp-langcert-value').value, rm=b.querySelector('.jp-langcert-max').value;
    let resultTxt='';
    if(rv || rm) resultTxt = `${esc(rv)}${rm?' out of '+esc(rm):''}`;
    langCertRows += `<tr><td>${esc(test)}</td><td>${resultTxt}</td></tr>`;
  });
  html += `<div class="jp-section-title">Language Proficiency / 日本語・英語レベル</div>`;
  if(langCertRows){
    html += `<table><tr><th>Test</th><th>Result</th></tr>${langCertRows}</table>`;
  }
  html += `<table>
    <tr><td class="jp-label">英語レベル / English level</td><td>${esc(document.getElementById('jp-english').value)}</td></tr>
  </table>`;

  let workRows='';
  document.querySelectorAll('#jp-work-list .repeat-block').forEach(b=>{
    const start=b.querySelector('.jp-work-start').value, end=b.querySelector('.jp-work-end').value;
    const company=b.querySelector('.jp-work-company').value, role=b.querySelector('.jp-work-role').value;
    if(!company) return;
    workRows+=`<tr><td>${esc(start)}</td><td>${esc(end)}</td><td>${esc(company)}</td><td>${esc(role)}</td></tr>`;
  });
  if(workRows){
    html += `<div class="jp-section-title">Work History / 職歴</div>
    <table><tr><th>Start</th><th>End</th><th>Company</th><th>Role</th></tr>${workRows}</table>`;
  }

  html += `<div class="jp-section-title">Other Information / その他情報</div>`;
  html += `<table>
    <tr><td class="jp-label">その他資格 / Other qualifications</td><td>${esc(val('jp-other-qual'))}</td></tr>
    <tr><td class="jp-label">性格 / Personality</td><td>${esc(val('jp-personality'))}</td></tr>
    <tr><td class="jp-label">趣味 / Hobby</td><td>${esc(val('jp-hobby'))}</td><td class="jp-label">得意科目 / Favorite subjects</td><td>${esc(val('jp-favorite-subject'))}</td></tr>
    <tr><td class="jp-label">集団生活経験 / Group living</td><td>${jpCheck(document.getElementById('jp-group-living').value,'No','無/No','Yes','有/Yes')}</td><td class="jp-label">料理経験 / Cooking</td><td>${jpCheck(document.getElementById('jp-cooking').value,'No','不可/No','Yes','可/Yes')}</td></tr>
    <tr><td class="jp-label">宗教 / Religion</td><td>${esc(val('r-religion'))}</td><td class="jp-label">禁止食材 / Dietary restrictions</td><td>${esc(val('jp-dietary'))}</td></tr>
    <tr><td class="jp-label">礼拝 / Worship practice</td><td>${esc(val('jp-worship'))}</td><td class="jp-label">断食 / Fasting</td><td>${jpCheck(document.getElementById('jp-fasting').value,'No','無/No','Yes','有/Yes')}</td></tr>
  </table>`;

  const residApplied=document.getElementById('jp-residence-applied').value;
  html += `<div class="jp-section-title">Future Plans / 今後の予定</div>`;
  html += `<table>
    <tr><td class="jp-label">送金希望 / Monthly remittance</td><td>${esc(val('jp-remittance'))}</td></tr>
    <tr><td class="jp-label">長期滞在希望 / Long-term stay</td><td>${esc(val('jp-longterm'))}</td></tr>
    <tr><td class="jp-label">在留資格申請歴 / Applied for residence status?</td><td>${jpCheck(residApplied,'No','無/No','Yes','有/Yes')}</td></tr>
    <tr><td class="jp-label">Details, if yes</td><td>${esc(val('jp-residence-detail'))}</td></tr>
  </table>`;

  let famRows='';
  document.querySelectorAll('#jp-family-list .repeat-block').forEach(b=>{
    const fname=b.querySelector('.jp-fam-name').value, rel=b.querySelector('.jp-fam-relation').value;
    const fage=b.querySelector('.jp-fam-age').value, occ=b.querySelector('.jp-fam-occupation').value;
    const living=b.querySelector('.jp-fam-living').value;
    if(!fname) return;
    famRows+=`<tr><td>${esc(fname)}</td><td>${esc(rel)}</td><td>${esc(fage)}</td><td>${esc(occ)}</td><td>${jpCheck(living,'Yes','○','No','')}</td></tr>`;
  });
  const relJapan=document.getElementById('jp-relatives-japan').value;
  const famOpinion=document.getElementById('jp-family-opinion').value;
  html += `<div class="jp-section-title">Family Structure / 家族構成</div>`;
  if(famRows){
    html += `<table><tr><th>Name</th><th>Relationship</th><th>Age</th><th>Occupation</th><th>Living together</th></tr>${famRows}</table>`;
  }
  html += `<table>
    <tr><td class="jp-label">在日親族 / Relatives in Japan?</td><td>${jpCheck(relJapan,'No','無/No','Yes','有/Yes')}</td></tr>
    <tr><td class="jp-label">If yes, who</td><td>${esc(val('jp-relatives-who'))}</td></tr>
    <tr><td class="jp-label">家族の意見 / Family's view</td><td>${jpCheck(famOpinion,'Agree','賛成/Agree','Not agree','反対/Not agree')}</td></tr>
  </table>`;

  document.getElementById('jp-preview').innerHTML=html;
  saveData();
}

// ---- Init ----
if(!loadSavedData()){
  addExp(); addEdu();
  addJpEdu(); addJpWork(); addJpFamily();
}
updateFieldVisibility();
renderPreview();
renderLetter();
renderJapan();
renderBlogPreview();

let toastTimer;
function showToast(msg){
  const t=document.getElementById('toast');
  t.textContent=msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer=setTimeout(()=>t.classList.remove('show'), 3000);
}

function autoDraftSummary(){
  const roles=[], degrees=[];
  document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
    const role=b.querySelector('.exp-role').value.trim();
    if(role) roles.push(role);
  });
  document.querySelectorAll('#edu-list .repeat-block').forEach(b=>{
    const degree=b.querySelector('.edu-degree').value.trim();
    if(degree) degrees.push(degree);
  });
  const skillsRaw=val('r-skills');
  const skillList=skillsRaw ? skillsRaw.split(',').map(s=>s.trim()).filter(Boolean) : [];

  if(roles.length===0 && degrees.length===0 && skillList.length===0){
    showToast('Add a role, education, or a few skills first — then try again.');
    return;
  }

  let opening;
  if(roles.length>0){
    opening = `${roles[0]} with hands-on experience`;
    if(roles.length>1) opening += ` across ${roles.length} roles`;
  } else if(degrees.length>0){
    opening = `${degrees[0]} graduate`;
  } else {
    opening = 'Motivated professional';
  }

  let skillsPart='';
  if(skillList.length>0){
    const shown=skillList.slice(0,3).join(', ');
    skillsPart = ` Skilled in ${shown}${skillList.length>3?', among other areas':''}.`;
  }

  let eduPart='';
  if(degrees.length>0 && roles.length>0){
    eduPart = ` Holds a ${degrees[0]}.`;
  }

  const closers=[
    ' Looking to bring proven skills to a new team.',
    ' Focused on delivering measurable results and growing within a collaborative environment.',
    ' Eager to apply a strong work ethic to new challenges.'
  ];
  const closer = closers[Math.floor(Math.random()*closers.length)];

  const draft = opening + '.' + eduPart + skillsPart + closer;
  document.getElementById('r-summary').value = draft.replace(/\s+/g,' ').trim();
  renderPreview();
  showToast('Draft added — feel free to edit it to sound like you.');
}

function autoDraftStrengths(){
  const roles=[];
  document.querySelectorAll('#exp-list .repeat-block').forEach(b=>{
    const role=b.querySelector('.exp-role').value.trim();
    if(role) roles.push(role);
  });
  const skillsRaw=val('r-skills');
  const skillList=skillsRaw ? skillsRaw.split(',').map(s=>s.trim()).filter(Boolean) : [];

  if(roles.length===0 && skillList.length===0){
    showToast('Add some Experience roles or Skills first — then try again.');
    return;
  }

  const bullets=[];
  if(roles.length>0){
    bullets.push(`Proven experience as a ${roles[0]}, delivering reliable results under deadlines.`);
  }
  if(skillList.length>0){
    const shown=skillList.slice(0,3).join(', ');
    bullets.push(`Skilled in ${shown}${skillList.length>3?' and other related tools':''}, applied in real project work.`);
  }
  if(roles.length>1){
    bullets.push(`Adaptable across multiple roles, including ${roles.slice(0,3).join(', ')}.`);
  }
  bullets.push('Strong ability to work under pressure and meet deadlines.');
  bullets.push('Habituated with teamwork and cross-functional collaboration.');

  document.getElementById('r-strengths').value = bullets.join('\n');
  renderAll();
  showToast('Draft added — feel free to edit it to sound like you.');
}

let unlocked=false;
function checkCode(){
  const code=document.getElementById('premium-code').value.trim();
  if(code.length>3){
    unlocked=true;
    showToast('Premium unlocked — 2 more templates available.');
  } else {
    showToast("That code doesn't look right. Codes are sent after purchase.");
  }
}

// ---- Shared: target file size via binary search on quality ----
function canvasToBlobP(canvas, format, quality){
  return new Promise(resolve => canvas.toBlob(resolve, format, quality));
}
async function compressToTargetSize(canvas, format, targetBytes){
  let lo=0.05, hi=0.98, bestBlob=null;
  for(let i=0;i<8;i++){
    const mid=(lo+hi)/2;
    const blob=await canvasToBlobP(canvas, format, mid);
    if(!blob) break;
    if(blob.size>targetBytes){ hi=mid; }
    else { bestBlob=blob; lo=mid; }
  }
  if(!bestBlob) bestBlob=await canvasToBlobP(canvas, format, lo);
  return bestBlob;
}
function toggleResizeSizeMode(){
  const mode=document.getElementById('resize-size-mode').value;
  document.getElementById('resize-quality-mode-row').style.display = mode==='quality' ? '' : 'none';
  document.getElementById('resize-target-mode-row').style.display = mode==='target' ? '' : 'none';
  document.getElementById('resize-target-size-note').style.display = mode==='target' ? '' : 'none';
}

// ---- Image resizer ----
const resizeDropZone=document.getElementById('resize-drop-zone');
const resizeFileInput=document.getElementById('resize-file-input');
const resizePreviewImg=document.getElementById('resize-preview-img');
let resizeCurrentFile=null, resizeCurrentImg=null, resizeAspectRatio=1;

resizeFileInput.addEventListener('change',e=>handleResizeFile(e.target.files[0]));
resizeDropZone.addEventListener('dragover',e=>{e.preventDefault();resizeDropZone.classList.add('dragover');});
resizeDropZone.addEventListener('dragleave',()=>resizeDropZone.classList.remove('dragover'));
resizeDropZone.addEventListener('drop',e=>{
  e.preventDefault();resizeDropZone.classList.remove('dragover');
  if(e.dataTransfer.files[0]) handleResizeFile(e.dataTransfer.files[0]);
});

function handleResizeFile(file){
  if(!file || !file.type.startsWith('image/')) return;
  resizeCurrentFile=file;
  const reader=new FileReader();
  reader.onload=e=>{
    resizePreviewImg.src=e.target.result;
    resizePreviewImg.style.display='block';
    const img=new Image();
    img.onload=()=>{
      resizeCurrentImg=img;
      resizeAspectRatio=img.width/img.height;
      document.getElementById('resize-width').value=img.width;
      document.getElementById('resize-height').value=img.height;
    };
    img.src=e.target.result;
  };
  reader.readAsDataURL(file);
  document.getElementById('resize-file-meta').textContent=`${file.name} — ${(file.size/1024).toFixed(0)} KB`;
  document.getElementById('resize-controls').style.display='block';
  document.getElementById('resize-drop-label').textContent='Tap to choose a different image';
}

document.getElementById('resize-width').addEventListener('input',e=>{
  if(document.getElementById('resize-lock-aspect').checked && resizeAspectRatio){
    document.getElementById('resize-height').value=Math.round(e.target.value/resizeAspectRatio);
  }
});
document.getElementById('resize-height').addEventListener('input',e=>{
  if(document.getElementById('resize-lock-aspect').checked && resizeAspectRatio){
    document.getElementById('resize-width').value=Math.round(e.target.value*resizeAspectRatio);
  }
});
document.getElementById('resize-quality').addEventListener('input',e=>{
  document.getElementById('resize-quality-val').textContent=e.target.value+'%';
});

async function resizeImage(){
  if(!resizeCurrentImg) return;
  const w=parseInt(document.getElementById('resize-width').value)||resizeCurrentImg.width;
  const h=parseInt(document.getElementById('resize-height').value)||resizeCurrentImg.height;
  if(w<1 || h<1){ showToast('Width and height must be at least 1px.'); return; }
  const canvas=document.createElement('canvas');
  canvas.width=w;
  canvas.height=h;
  const ctx=canvas.getContext('2d');
  ctx.drawImage(resizeCurrentImg,0,0,w,h);
  const format=document.getElementById('resize-format').value;
  const mode=document.getElementById('resize-size-mode').value;

  let blob;
  if(mode==='target'){
    const val=parseFloat(document.getElementById('resize-target-size-value').value)||50;
    const unit=document.getElementById('resize-target-size-unit').value;
    const targetBytes = unit==='MB' ? val*1024*1024 : val*1024;
    blob = await compressToTargetSize(canvas, format, targetBytes);
  } else {
    const quality=document.getElementById('resize-quality').value/100;
    blob = await canvasToBlobP(canvas, format, quality);
  }

  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  const ext=format.split('/')[1];
  a.href=url;
  a.download=`resized-${w}x${h}.${ext}`;
  a.click();
  document.getElementById('resize-result-meta').textContent=
    `Done — ${w}×${h}px, ${(blob.size/1024).toFixed(0)} KB`;
  showToast('Image resized and downloaded.');
}

// ---- File Compressor & Converter ----
let docCurrentFile=null;

document.getElementById('doc-file-input').addEventListener('change', e=>{
  const file=e.target.files[0];
  if(!file) return;
  docCurrentFile=file;
  document.getElementById('doc-file-meta').textContent=`${file.name} — ${(file.size/1024).toFixed(0)} KB`;
  document.getElementById('doc-result-meta').textContent='';
  const ext=file.name.split('.').pop().toLowerCase();
  document.getElementById('doc-pdf-actions').style.display = ext==='pdf' ? 'block' : 'none';
  document.getElementById('doc-docx-actions').style.display = ext==='docx' ? 'block' : 'none';
  if(ext!=='pdf' && ext!=='docx'){
    showToast('Please choose a .pdf or .docx file.');
  }
  document.getElementById('doc-drop-label').textContent='Tap to choose a different file';
});
document.getElementById('doc-quality').addEventListener('input', e=>{
  document.getElementById('doc-quality-val').textContent=e.target.value+'%';
});
function toggleDocSizeMode(){
  const mode=document.getElementById('doc-size-mode').value;
  document.getElementById('doc-quality-mode-row').style.display = mode==='quality' ? '' : 'none';
  document.getElementById('doc-target-mode-row').style.display = mode==='target' ? '' : 'none';
}

function rtfEscape(text){
  let out='';
  for(const ch of text){
    const code=ch.codePointAt(0);
    if(ch==='\\' || ch==='{' || ch==='}'){ out+='\\'+ch; }
    else if(code>127){ out+='\\u'+code+'?'; }
    else { out+=ch; }
  }
  return out;
}

async function pdfToRtfText(arrayBuffer){
  const pdf=await pdfjsLib.getDocument({data:arrayBuffer}).promise;
  let body='';
  for(let p=1;p<=pdf.numPages;p++){
    const page=await pdf.getPage(p);
    const viewport=page.getViewport({scale:1});
    const textContent=await page.getTextContent();
    const items=textContent.items.map(it=>({
      str:it.str, x:it.transform[4], y:it.transform[5], fontName:it.fontName
    }));
    items.sort((a,b)=> b.y-a.y || a.x-b.x);
    let lines=[];
    let current=null;
    const yTol=3;
    items.forEach(it=>{
      if(!current || Math.abs(current.y-it.y)>yTol){
        current={y:it.y, items:[it]};
        lines.push(current);
      } else {
        current.items.push(it);
      }
    });
    lines.forEach(line=>{
      line.items.sort((a,b)=>a.x-b.x);
      const lineText=line.items.map(it=>it.str).join(' ').trim();
      if(!lineText) return;
      const firstX=line.items[0].x;
      const pageWidth=viewport.width;
      let align='\\ql';
      if(firstX>pageWidth*0.3 && firstX<pageWidth*0.6) align='\\qc';
      const isBold=line.items.some(it=>/bold/i.test(it.fontName||''));
      const esc=rtfEscape(lineText);
      const wrapped=isBold ? `{\\b ${esc}}` : esc;
      body+=`${align} ${wrapped}\\par\n`;
    });
    body+='\\par\n';
  }
  return `{\\rtf1\\ansi\\deff0{\\fonttbl{\\f0 Calibri;}}\\fs22\n${body}}`;
}

async function convertPdfToWord(){
  if(!docCurrentFile) return;
  if(typeof pdfjsLib==='undefined'){ showToast('The PDF engine failed to load — check your connection and refresh.'); return; }
  showToast('Converting — this can take a moment...');
  try{
    const buf=await docCurrentFile.arrayBuffer();
    const rtf=await pdfToRtfText(buf);
    const blob=new Blob([rtf], {type:'application/rtf'});
    const url=URL.createObjectURL(blob);
    const a=document.createElement('a');
    a.href=url;
    a.download=docCurrentFile.name.replace(/\.pdf$/i,'')+'.rtf';
    a.click();
    document.getElementById('doc-result-meta').textContent='Done — opens directly in Microsoft Word.';
    showToast('Converted — check simple sections first for accuracy.');
  }catch(err){
    showToast('Conversion failed — this PDF may be scanned/image-based rather than text.');
  }
}

function blobToDataUrlP(blob){
  return new Promise(resolve=>{
    const reader=new FileReader();
    reader.onload=()=>resolve(reader.result);
    reader.readAsDataURL(blob);
  });
}

async function compressPdfFile(){
  if(!docCurrentFile) return;
  if(typeof pdfjsLib==='undefined' || typeof jspdf==='undefined'){ showToast('A required engine failed to load — check your connection and refresh.'); return; }
  showToast('Compressing — this can take a moment...');
  try{
    const buf=await docCurrentFile.arrayBuffer();
    const pdf=await pdfjsLib.getDocument({data:buf}).promise;
    const mode=document.getElementById('doc-size-mode').value;
    let targetBytesPerPage=null, quality=0.7;
    if(mode==='target'){
      const val=parseFloat(document.getElementById('doc-target-size-value').value)||500;
      const unit=document.getElementById('doc-target-size-unit').value;
      const totalTarget = unit==='MB' ? val*1024*1024 : val*1024;
      targetBytesPerPage = totalTarget / pdf.numPages;
    } else {
      quality=document.getElementById('doc-quality').value/100;
    }

    const outPdf=new jspdf.jsPDF({unit:'pt', format:'a4'});
    for(let p=1;p<=pdf.numPages;p++){
      const page=await pdf.getPage(p);
      const viewport=page.getViewport({scale:1.5});
      const canvas=document.createElement('canvas');
      canvas.width=viewport.width;
      canvas.height=viewport.height;
      const ctx=canvas.getContext('2d');
      await page.render({canvasContext:ctx, viewport}).promise;

      let blob;
      if(mode==='target'){
        blob=await compressToTargetSize(canvas, 'image/jpeg', targetBytesPerPage);
      } else {
        blob=await canvasToBlobP(canvas, 'image/jpeg', quality);
      }
      const dataUrl=await blobToDataUrlP(blob);
      if(p>1) outPdf.addPage();
      const pw=outPdf.internal.pageSize.getWidth();
      const ph=outPdf.internal.pageSize.getHeight();
      outPdf.addImage(dataUrl, 'JPEG', 0, 0, pw, ph);
    }
    const originalKb=(docCurrentFile.size/1024).toFixed(0);
    outPdf.save(docCurrentFile.name.replace(/\.pdf$/i,'')+'-compressed.pdf');
    document.getElementById('doc-result-meta').textContent=`Done — compressed from ${originalKb} KB. Text is no longer selectable in the output.`;
    showToast('Compressed PDF downloaded.');
  }catch(err){
    showToast('Compression failed — please try a different file.');
  }
}

async function docxToPdf(arrayBuffer){
  const result=await mammoth.convertToHtml({arrayBuffer});
  const container=document.createElement('div');
  container.style.width='794px';
  container.style.padding='48px';
  container.style.background='#fff';
  container.style.position='fixed';
  container.style.left='-9999px';
  container.style.top='0';
  container.style.fontFamily='Arial, sans-serif';
  container.style.fontSize='14px';
  container.style.lineHeight='1.5';
  container.style.color='#111';
  container.innerHTML=result.value;
  document.body.appendChild(container);

  const canvas=await html2canvas(container, {scale:2});
  document.body.removeChild(container);

  const imgData=canvas.toDataURL('image/jpeg', 0.92);
  const pdf=new jspdf.jsPDF({unit:'pt', format:'a4'});
  const pageWidth=pdf.internal.pageSize.getWidth();
  const pageHeight=pdf.internal.pageSize.getHeight();
  const imgWidth=pageWidth;
  const imgHeight=canvas.height*imgWidth/canvas.width;
  let heightLeft=imgHeight;
  let position=0;
  pdf.addImage(imgData,'JPEG',0,position,imgWidth,imgHeight);
  heightLeft-=pageHeight;
  while(heightLeft>0){
    position=heightLeft-imgHeight;
    pdf.addPage();
    pdf.addImage(imgData,'JPEG',0,position,imgWidth,imgHeight);
    heightLeft-=pageHeight;
  }
  return pdf;
}

async function convertDocxToPdf(){
  if(!docCurrentFile) return;
  if(typeof mammoth==='undefined' || typeof html2canvas==='undefined' || typeof jspdf==='undefined'){
    showToast('A required engine failed to load — check your connection and refresh.');
    return;
  }
  showToast('Converting — this can take a moment...');
  try{
    const buf=await docCurrentFile.arrayBuffer();
    const pdf=await docxToPdf(buf);
    pdf.save(docCurrentFile.name.replace(/\.docx$/i,'')+'.pdf');
    document.getElementById('doc-result-meta').textContent='Done — downloaded as PDF.';
    showToast('Converted to PDF.');
  }catch(err){
    showToast('Conversion failed — please try a different file.');
  }
}

// ---- Document Scanner ----
let scanImg=null, scanImgNatW=0, scanImgNatH=0;
let scanPoints=[{x:0.1,y:0.1},{x:0.9,y:0.1},{x:0.9,y:0.9},{x:0.1,y:0.9}];
let scanPages=[];
let scanDraggingIdx=null;

function handleScanFileSelect(e){
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    const img=document.getElementById('scan-source-img');
    img.onload=()=>{
      scanImg=img;
      scanImgNatW=img.naturalWidth;
      scanImgNatH=img.naturalHeight;
      scanPoints=[{x:0.1,y:0.1},{x:0.9,y:0.1},{x:0.9,y:0.9},{x:0.1,y:0.9}];
      document.getElementById('scan-editor').style.display='block';
      requestAnimationFrame(positionScanHandles);
    };
    img.src=ev.target.result;
  };
  reader.readAsDataURL(file);
}
document.getElementById('scan-camera-input').addEventListener('change', handleScanFileSelect);
document.getElementById('scan-gallery-input').addEventListener('change', handleScanFileSelect);

function positionScanHandles(){
  const wrap=document.getElementById('scan-canvas-wrap');
  const rect=wrap.getBoundingClientRect();
  scanPoints.forEach((pt,i)=>{
    const handle=document.getElementById('scan-handle-'+i);
    handle.style.left=(pt.x*rect.width)+'px';
    handle.style.top=(pt.y*rect.height)+'px';
  });
  updateScanQuadOverlay();
}

function updateScanQuadOverlay(){
  const wrap=document.getElementById('scan-canvas-wrap');
  const rect=wrap.getBoundingClientRect();
  const poly=document.getElementById('scan-quad-poly');
  const pts=scanPoints.map(p=>`${p.x*rect.width},${p.y*rect.height}`).join(' ');
  poly.setAttribute('points', pts);
}

[0,1,2,3].forEach(i=>{
  const handle=document.getElementById('scan-handle-'+i);
  handle.addEventListener('pointerdown', e=>{
    e.preventDefault();
    scanDraggingIdx=i;
    handle.setPointerCapture(e.pointerId);
  });
  handle.addEventListener('pointermove', e=>{
    if(scanDraggingIdx!==i) return;
    const wrap=document.getElementById('scan-canvas-wrap');
    const rect=wrap.getBoundingClientRect();
    let nx=(e.clientX-rect.left)/rect.width;
    let ny=(e.clientY-rect.top)/rect.height;
    nx=Math.max(0,Math.min(1,nx));
    ny=Math.max(0,Math.min(1,ny));
    scanPoints[i]={x:nx,y:ny};
    positionScanHandles();
  });
  handle.addEventListener('pointerup', ()=>{ scanDraggingIdx=null; });
  handle.addEventListener('pointercancel', ()=>{ scanDraggingIdx=null; });
});
window.addEventListener('resize', ()=>{ if(scanImg) positionScanHandles(); });

// Heckbert unit-square -> quadrilateral projective mapping
function computeSquareToQuad(x0,y0,x1,y1,x2,y2,x3,y3){
  const dx1=x1-x2, dx2=x3-x2, dx3=x0-x1+x2-x3;
  const dy1=y1-y2, dy2=y3-y2, dy3=y0-y1+y2-y3;
  let a13,a23;
  const denom=(dx1*dy2-dx2*dy1) || 1e-10;
  if(Math.abs(dx3)<1e-10 && Math.abs(dy3)<1e-10){
    a13=0; a23=0;
  } else {
    a13=(dx3*dy2-dx2*dy3)/denom;
    a23=(dx1*dy3-dx3*dy1)/denom;
  }
  const a11=x1-x0+a13*x1;
  const a21=x3-x0+a23*x3;
  const a12=y1-y0+a13*y1;
  const a22=y3-y0+a23*y3;
  return {a11,a12,a13,a21,a22,a23,a31:x0,a32:y0,a33:1};
}

function sharpenImageData(imgData, width, height){
  const src=new Uint8ClampedArray(imgData.data);
  const dst=imgData.data;
  const kernel=[0,-1,0, -1,5,-1, 0,-1,0];
  for(let y=1;y<height-1;y++){
    for(let x=1;x<width-1;x++){
      for(let c=0;c<3;c++){
        let sum=0, k=0;
        for(let ky=-1;ky<=1;ky++){
          for(let kx=-1;kx<=1;kx++){
            sum+=src[((y+ky)*width+(x+kx))*4+c]*kernel[k];
            k++;
          }
        }
        dst[(y*width+x)*4+c]=Math.max(0,Math.min(255,sum));
      }
    }
  }
}

function applyScanFilter(data, filter){
  for(let i=0;i<data.length;i+=4){
    let r=data[i], g=data[i+1], b=data[i+2];
    const gray=0.299*r+0.587*g+0.114*b;
    if(filter==='grayscale'){
      data[i]=gray; data[i+1]=gray; data[i+2]=gray;
    } else if(filter==='bw'){
      const v = gray>150 ? 255 : (gray<90 ? 0 : gray);
      data[i]=v; data[i+1]=v; data[i+2]=v;
    } else if(filter==='enhanced'){
      const c=1.25;
      data[i]=Math.max(0,Math.min(255,(r-128)*c+128+8));
      data[i+1]=Math.max(0,Math.min(255,(g-128)*c+128+8));
      data[i+2]=Math.max(0,Math.min(255,(b-128)*c+128+8));
    }
  }
}

function applyScanCrop(){
  if(!scanImg) return;
  showToast('Processing scan...');
  setTimeout(()=>{
    const srcCanvas=document.createElement('canvas');
    srcCanvas.width=scanImgNatW;
    srcCanvas.height=scanImgNatH;
    const srcCtx=srcCanvas.getContext('2d');
    srcCtx.drawImage(scanImg,0,0,scanImgNatW,scanImgNatH);
    const srcData=srcCtx.getImageData(0,0,scanImgNatW,scanImgNatH).data;

    const quad=scanPoints.map(p=>({x:p.x*scanImgNatW, y:p.y*scanImgNatH}));
    const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
    const outW=Math.round((dist(quad[0],quad[1])+dist(quad[3],quad[2]))/2);
    const outH=Math.round((dist(quad[0],quad[3])+dist(quad[1],quad[2]))/2);
    const destW=Math.max(200,Math.min(outW,2000));
    const destH=Math.max(200,Math.min(outH,2600));

    const m=computeSquareToQuad(
      quad[0].x,quad[0].y, quad[1].x,quad[1].y,
      quad[2].x,quad[2].y, quad[3].x,quad[3].y
    );

    const destCanvas=document.createElement('canvas');
    destCanvas.width=destW;
    destCanvas.height=destH;
    const destCtx=destCanvas.getContext('2d');
    const destImgData=destCtx.createImageData(destW,destH);

    for(let v=0; v<destH; v++){
      const nv=v/destH;
      for(let u=0; u<destW; u++){
        const nu=u/destW;
        const w=m.a13*nu + m.a23*nv + m.a33;
        const sx=(m.a11*nu + m.a21*nv + m.a31)/w;
        const sy=(m.a12*nu + m.a22*nv + m.a32)/w;
        const di=(v*destW+u)*4;
        if(sx>=0 && sx<scanImgNatW-1 && sy>=0 && sy<scanImgNatH-1){
          const x0=Math.floor(sx), y0=Math.floor(sy);
          const fx=sx-x0, fy=sy-y0;
          const i00=(y0*scanImgNatW+x0)*4, i10=(y0*scanImgNatW+x0+1)*4;
          const i01=((y0+1)*scanImgNatW+x0)*4, i11=((y0+1)*scanImgNatW+x0+1)*4;
          for(let c=0;c<3;c++){
            const top=srcData[i00+c]*(1-fx)+srcData[i10+c]*fx;
            const bot=srcData[i01+c]*(1-fx)+srcData[i11+c]*fx;
            destImgData.data[di+c]=top*(1-fy)+bot*fy;
          }
          destImgData.data[di+3]=255;
        } else {
          destImgData.data[di]=255; destImgData.data[di+1]=255;
          destImgData.data[di+2]=255; destImgData.data[di+3]=255;
        }
      }
    }

    const filter=document.getElementById('scan-filter').value;
    if(filter!=='original') sharpenImageData(destImgData, destW, destH);
    if(filter!=='original') applyScanFilter(destImgData.data, filter);

    destCtx.putImageData(destImgData,0,0);
    scanPages.push(destCanvas.toDataURL('image/jpeg',0.9));
    renderScanPagesList();
    cancelScanEditor();
    showToast('Page added.');
  }, 30);
}

function cancelScanEditor(){
  document.getElementById('scan-editor').style.display='none';
  document.getElementById('scan-camera-input').value='';
  document.getElementById('scan-gallery-input').value='';
  scanImg=null;
}

function renderScanPagesList(){
  const wrap=document.getElementById('scan-pages-wrap');
  wrap.innerHTML='';
  scanPages.forEach((dataUrl,idx)=>{
    const div=document.createElement('div');
    div.className='scan-page-thumb';
    div.innerHTML=`<img src="${dataUrl}"><div class="remove-x" onclick="removeScanPage(${idx})">×</div>`;
    wrap.appendChild(div);
  });
  document.getElementById('scan-actions').style.display = scanPages.length ? 'flex' : 'none';
}

function removeScanPage(idx){
  scanPages.splice(idx,1);
  renderScanPagesList();
}

function clearScanPages(){
  scanPages=[];
  renderScanPagesList();
}

async function downloadScanAsPdf(){
  if(!scanPages.length) return;
  if(typeof jspdf==='undefined'){ showToast('PDF engine failed to load — check your connection and refresh.'); return; }
  const pdf=new jspdf.jsPDF({unit:'pt', format:'a4'});
  for(let i=0;i<scanPages.length;i++){
    if(i>0) pdf.addPage();
    const pw=pdf.internal.pageSize.getWidth();
    const ph=pdf.internal.pageSize.getHeight();
    pdf.addImage(scanPages[i],'JPEG',0,0,pw,ph);
  }
  pdf.save('scanned-document.pdf');
  showToast('Downloaded as PDF.');
}

function downloadScanAsImages(){
  scanPages.forEach((dataUrl,idx)=>{
    const a=document.createElement('a');
    a.href=dataUrl;
    a.download=`scan-page-${idx+1}.jpg`;
    a.click();
  });
  showToast('Downloading each page as an image.');
}

// ---- Blog Composer ----
let bwCoverDataUrl=null;

function bwCmd(command){
  document.getElementById('bw-editor').focus();
  document.execCommand(command, false, null);
  renderBlogPreview();
}
function bwFormatBlock(tag){
  document.getElementById('bw-editor').focus();
  document.execCommand('formatBlock', false, tag);
  renderBlogPreview();
}

document.getElementById('bw-cover-input').addEventListener('change', e=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{ bwCoverDataUrl=ev.target.result; renderBlogPreview(); };
  reader.readAsDataURL(file);
});

document.getElementById('bw-img-input').addEventListener('change', e=>{
  const file=e.target.files[0];
  if(!file) return;
  const reader=new FileReader();
  reader.onload=ev=>{
    document.getElementById('bw-editor').focus();
    document.execCommand('insertImage', false, ev.target.result);
    renderBlogPreview();
  };
  reader.readAsDataURL(file);
  e.target.value='';
});

function bwSlugify(text){
  return (text||'untitled-post').toLowerCase().trim()
    .replace(/[^a-z0-9\s-]/g,'')
    .replace(/\s+/g,'-')
    .replace(/-+/g,'-')
    .slice(0,60) || 'untitled-post';
}
function bwReadTime(){
  const text=document.getElementById('bw-editor').innerText || '';
  const words=text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words/200)) + ' min read';
}

function renderBlogPreview(){
  const title=val('bw-title')||'Untitled Post';
  const excerpt=val('bw-excerpt');
  const author=val('bw-author')||'Deskwork';
  const category=val('bw-category');
  const bodyHtml=document.getElementById('bw-editor').innerHTML;
  const today=new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});
  const readTime=bwReadTime();

  let html='';
  if(bwCoverDataUrl) html+=`<img class="bap-cover" src="${bwCoverDataUrl}">`;
  html+=`<div class="bap-body">`;
  if(category) html+=`<span class="bap-category">${esc(category)}</span>`;
  html+=`<h1>${esc(title)}</h1>`;
  if(excerpt) html+=`<div class="bap-excerpt">${esc(excerpt)}</div>`;
  html+=`<div class="bap-byline">By ${esc(author)} · ${today} · ${readTime}</div>`;
  html+=`<div class="bap-content">${bodyHtml}</div>`;
  html+=`</div>`;

  document.getElementById('bw-preview').innerHTML=html;
}

function buildBlogPostHtml(){
  const title=val('bw-title')||'Untitled Post';
  const excerpt=val('bw-excerpt');
  const author=val('bw-author')||'Deskwork';
  const category=val('bw-category');
  const metaDesc=val('bw-meta-desc')||excerpt;
  const bodyHtml=document.getElementById('bw-editor').innerHTML;
  const today=new Date().toLocaleDateString(undefined,{year:'numeric',month:'long',day:'numeric'});
  const readTime=bwReadTime();
  const coverHtml=bwCoverDataUrl ? `<img class="bap-cover" src="${bwCoverDataUrl}">` : '';
  const categoryHtml=category ? `<span class="bap-category">${esc(category)}</span>` : '';

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${esc(title)} — Deskwork Blog</title>
<meta name="description" content="${esc(metaDesc)}">
<link rel="icon" type="image/svg+xml" href="../favicon.svg">
<link href="https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,600;9..144,700&family=IBM+Plex+Sans:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  :root{--paper:#EDF1F5;--paper-raised:#FFFFFF;--ink:#1B2430;--ink-soft:#4B5563;--stamp:#C1443C;--stamp-dark:#9E362F;--line:#D9E1E8;--radius:10px;}
  *{box-sizing:border-box;}
  body{margin:0;background:var(--paper);color:var(--ink);font-family:'IBM Plex Sans',sans-serif;line-height:1.6;}
  .wrap{max-width:720px;margin:0 auto;padding:0 20px;}
  header{padding:32px 0 0 0;}
  .brand{display:flex;align-items:baseline;gap:10px;margin-bottom:6px;}
  .brand h1{font-family:'Fraunces',serif;font-size:1.4rem;font-weight:600;margin:0;}
  .mark{width:14px;height:14px;background:var(--stamp);transform:rotate(45deg);flex-shrink:0;}
  a.back-link{color:var(--ink-soft);font-size:.85rem;text-decoration:none;border-bottom:1px solid var(--line);}
  main{padding:26px 0 60px 0;}
  article{background:var(--paper-raised);border:1px solid var(--line);border-radius:var(--radius);overflow:hidden;box-shadow:0 6px 20px rgba(27,36,48,.08);}
  .bap-cover{width:100%;display:block;max-height:360px;object-fit:cover;}
  .bap-body{padding:32px;}
  .bap-category{display:inline-block;background:var(--paper);color:var(--stamp-dark);font-size:.72rem;font-weight:600;letter-spacing:.04em;text-transform:uppercase;padding:4px 10px;border-radius:3px;margin-bottom:12px;}
  h1{font-family:'Fraunces',serif;font-size:2rem;margin:0 0 10px 0;line-height:1.2;}
  .bap-excerpt{color:var(--ink-soft);font-size:1.05rem;margin-bottom:14px;}
  .bap-byline{font-size:.82rem;color:var(--ink-soft);margin-bottom:26px;padding-bottom:18px;border-bottom:1px solid var(--line);}
  .bap-content{font-size:1.02rem;line-height:1.8;}
  .bap-content h2{font-family:'Fraunces',serif;font-size:1.4rem;margin:28px 0 10px 0;}
  .bap-content h3{font-family:'Fraunces',serif;font-size:1.15rem;margin:22px 0 8px 0;}
  .bap-content blockquote{border-left:3px solid var(--stamp);padding-left:16px;color:var(--ink-soft);margin:16px 0;font-style:italic;}
  .bap-content img{max-width:100%;border-radius:8px;margin:14px 0;}
  .bap-content p{margin:0 0 16px 0;}
  .bap-content ul, .bap-content ol{margin:0 0 16px 0;padding-left:22px;}
  .ad-slot{display:none;background:#E4E9EE;border:1px dashed var(--line);text-align:center;color:var(--ink-soft);font-size:.78rem;padding:16px;border-radius:6px;margin:24px 0;}
  footer{border-top:1.5px solid var(--line);padding:24px 0 40px 0;color:var(--ink-soft);font-size:.82rem;margin-top:20px;}
  footer a{color:var(--ink-soft);margin-right:16px;}
</style>
</head>
<body>
<header>
  <div class="wrap">
    <div class="brand"><span class="mark"></span><h1>Deskwork</h1></div>
    <a class="back-link" href="index.html">← All posts</a>
  </div>
</header>
<main>
  <div class="wrap">
    <article>
      ${coverHtml}
      <div class="bap-body">
        ${categoryHtml}
        <h1>${esc(title)}</h1>
        ${excerpt ? `<div class="bap-excerpt">${esc(excerpt)}</div>` : ''}
        <div class="bap-byline">By ${esc(author)} · ${today} · ${readTime}</div>
        <div class="ad-slot">Ad space — 728×90 leaderboard placeholder</div>
        <div class="bap-content">${bodyHtml}</div>
        <div class="ad-slot">Ad space — 300×250 rectangle placeholder</div>
      </div>
    </article>
  </div>
</main>
<footer>
  <div class="wrap">
    <a href="index.html">All posts</a>
    <a href="../about.html">About</a>
    <a href="../privacy.html">Privacy Policy</a>
    <span>Deskwork Blog</span>
  </div>
</footer>
</body>
</html>`;
}

function downloadBlogPost(){
  const title=val('bw-title');
  if(!title){ showToast('Add a title first.'); return; }
  const html=buildBlogPostHtml();
  const slug=bwSlugify(title);
  const blob=new Blob([html], {type:'text/html'});
  const url=URL.createObjectURL(blob);
  const a=document.createElement('a');
  a.href=url;
  a.download=slug+'.html';
  a.click();
  showToast(`Downloaded as ${slug}.html — push this into your /blog/ folder.`);
}

function copyBlogListingSnippet(){
  const title=val('bw-title');
  if(!title){ showToast('Add a title first.'); return; }
  const excerpt=val('bw-excerpt');
  const author=val('bw-author')||'Deskwork';
  const category=val('bw-category');
  const slug=bwSlugify(title);
  const today=new Date().toISOString().slice(0,10);
  const readTime=bwReadTime();

  const entry={
    title:title, excerpt:excerpt, slug:slug+'.html',
    image:bwCoverDataUrl||'', date:today, category:category, author:author, readTime:readTime
  };
  const text=JSON.stringify(entry, null, 2)+',';

  if(navigator.clipboard && navigator.clipboard.writeText){
    navigator.clipboard.writeText(text).then(()=>{
      showToast('Copied — paste this as a new entry in /blog/posts.json.');
    }).catch(()=>{
      showToast('Could not copy automatically — check the browser console or try again.');
    });
  } else {
    showToast('Copy isn\'t supported in this browser.');
  }
}

// ---- Student tools: GPA ----
let gpaRows=0;
let gpaSystem='us4';
function onGpaSystemChange(){
  gpaSystem=document.getElementById('gpa-system').value;
  document.getElementById('gpa-list').innerHTML='';
  gpaRows=0;
  addGpaRow();
}
function gradeFieldHtml(){
  if(gpaSystem==='us4'){
    return `<div><label>Grade</label><select class="gpa-grade">
        <option value="4">A</option><option value="3.7">A-</option>
        <option value="3.3">B+</option><option value="3">B</option><option value="2.7">B-</option>
        <option value="2.3">C+</option><option value="2">C</option><option value="1.7">C-</option>
        <option value="1">D</option><option value="0">F</option>
      </select></div>`;
  } else if(gpaSystem==='pt10'){
    return `<div><label>Points (/10)</label><input type="number" class="gpa-grade" min="0" max="10" step="0.1" placeholder="e.g. 8.5"></div>`;
  } else {
    return `<div><label>Marks (%)</label><input type="number" class="gpa-grade" min="0" max="100" step="0.1" placeholder="e.g. 85"></div>`;
  }
}
function addGpaRow(){
  gpaRows++;
  const id='gpa'+gpaRows;
  const row=document.createElement('div');
  row.className='gpa-row';
  row.id=id;
  row.innerHTML=`
    <div><label>Course</label><input type="text" class="gpa-course" placeholder="e.g. Calculus I"></div>
    ${gradeFieldHtml()}
    <div><label>Credits</label><input type="number" class="gpa-credits" min="0" step="0.5" value="3"></div>
    <button class="btn ghost small" onclick="document.getElementById('${id}').remove();calcGpa();">×</button>
  `;
  document.getElementById('gpa-list').appendChild(row);
  row.querySelectorAll('select, input').forEach(el=>el.addEventListener('input',calcGpa));
  calcGpa();
}
function calcGpa(){
  let totalPoints=0, totalCredits=0;
  document.querySelectorAll('#gpa-list .gpa-row').forEach(r=>{
    const grade=parseFloat(r.querySelector('.gpa-grade').value)||0;
    const credits=parseFloat(r.querySelector('.gpa-credits').value)||0;
    totalPoints+=grade*credits;
    totalCredits+=credits;
  });
  const result=totalCredits>0 ? (totalPoints/totalCredits).toFixed(2) : '—';
  let label='GPA', suffix='';
  if(gpaSystem==='pt10'){ label='CGPA'; suffix='/10'; }
  if(gpaSystem==='percent'){ label='Average'; suffix='%'; }
  document.getElementById('gpa-result').textContent = label+': '+result+(result!=='—'?suffix:'');
}
addGpaRow();

// ---- Student tools: Citation generator ----
function genCitation(){
  const author = val('c-author').trim() || 'Author, A.';
  const year = val('c-year').trim() || 'n.d.';
  const title = val('c-title').trim() || 'Untitled';
  const pub = val('c-pub').trim() || 'Publisher';
  const style = document.getElementById('c-style').value;

  // Clean trailing punctuation so generated citations stay consistent.
  const cleanTitle = title.replace(/[.]+$/, '');
  const cleanPub = pub.replace(/[.]+$/, '');

  let out = '';

  if(style === 'apa'){
    // APA 7: basic book/article/web-source form.
    out = `${author} (${year}). ${cleanTitle}. ${cleanPub}.`;
  } else if(style === 'mla'){
    // MLA 9: basic source form.
    out = `${author}. "${cleanTitle}." ${cleanPub}, ${year}.`;
  } else if(style === 'chicago'){
    // Chicago bibliography: basic source form.
    out = `${author}. ${cleanTitle}. ${cleanPub}, ${year}.`;
  }

  const box = document.getElementById('citation-out');
  box.style.display = 'block';
  box.textContent = out;
}
