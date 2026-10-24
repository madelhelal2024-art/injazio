/* Phase 2: an honest, browser-local authoring studio. No server or accounts yet. */
const STORAGE_KEY = 'ala-games-drafts-v2';
const RECOVERY_KEY = 'ala-games-working-v2';
const TYPES = ['mcq', 'boolean', 'short'];
const MAX_QUESTIONS = 100;

const copy = {
  ar: {
    create: 'محرر الألعاب', lead: 'اصنع لعبة تعليمية بأسئلتك، ثم احفظها وجرّبها قبل مشاركة المحتوى في المراحل التالية.',
    draft: 'مسودة محلية', saved: 'تم حفظ المسودة', saving: 'حفظ المسودة', new: 'لعبة جديدة', preview: 'معاينة اللعبة',
    export: 'تصدير JSON', import: 'استيراد أسئلة', title: 'عنوان اللعبة', titleHint: 'مثل: مفردات الأسرة والمزرعة',
    description: 'وصف مختصر', descriptionHint: 'ما الهدف التعليمي لهذه اللعبة؟', category: 'المادة / الوحدة', categoryHint: 'مثل: المفردات',
    level: 'المستوى', beginner: 'مبتدئ', intermediate: 'متوسط', advanced: 'متقدم',
    questions: 'الأسئلة', addQuestion: 'إضافة سؤال', question: 'سؤال', selectQuestion: 'اختر سؤالًا للتعديل',
    questionType: 'نوع السؤال', mcq: 'اختيار من متعدد', boolean: 'صح أو خطأ', short: 'إجابة قصيرة',
    prompt: 'نص السؤال', promptHint: 'اكتب السؤال هنا...', correct: 'الإجابة الصحيحة', answer: 'الإجابة',
    true: 'صح', false: 'خطأ', option: 'اختيار', optionHint: 'اكتب نص الاختيار', shortHint: 'اكتب الإجابة النموذجية',
    points: 'النقاط', seconds: 'الوقت (ثانية)', feedback: 'تغذية راجعة / شرح', feedbackHint: 'اشرح الإجابة أو قدّم تشجيعًا...',
    image: 'رابط صورة (اختياري)', audio: 'رابط صوت (اختياري)', mediaNote: 'تعمل روابط HTTPS المباشرة. رفع الملفات وتخزينها سحابيًا يأتي لاحقًا.',
    moveUp: 'تحريك لأعلى', moveDown: 'تحريك لأسفل', duplicate: 'نسخ السؤال', remove: 'حذف السؤال',
    progress: 'جاهزية الأسئلة', questionsReady: 'أسئلة صالحة للمعاينة', noQuestion: 'أضف سؤالًا أولًا',
    localNotice: 'المسودات محفوظة في هذا المتصفح فقط؛ صدّر نسخة JSON للاحتفاظ بها أو نقلها إلى جهاز آخر.',
    library: 'مكتبة ألعابك', libraryLead: 'مسوداتك المحفوظة محليًا على هذا الجهاز. لا توجد مزامنة بين الأجهزة بعد.',
    count: 'مسودة محفوظة', modified: 'آخر تعديل', open: 'متابعة التحرير', delete: 'حذف', noDrafts: 'مكتبتك مستعدة لأول لعبة!', noDraftsText: 'أنشئ لعبتك الأولى من المحرر وستظهر مسودتها هنا.',
    searchDrafts: 'ابحث في المسودات...', noMatches: 'لا توجد مسودات مطابقة',
    importTitle: 'إضافة عدة أسئلة دفعة واحدة', importLead: 'سطر لكل سؤال، بهذا الترتيب: السؤال | الإجابة الصحيحة | اختيار خاطئ 1 | اختيار خاطئ 2 | اختيار خاطئ 3',
    importExample: 'ما لون السماء؟ | أزرق | أحمر | أخضر | أصفر\nما جمع كتاب؟ | كتب | كتابان | كاتب | مكتبة',
    importAction: 'إضافة الأسئلة', importCount: 'أسئلة جديدة أُضيفت', cancel: 'إلغاء', restoreJson: 'استعادة مسودة من ملف JSON', invalidJson: 'الملف غير صالح. اختر ملفًا سبق تصديره من Arabic Light Games.', importedJson: 'استُعيدت المسودة بنجاح.',
    confirmDelete: 'هل تريد حذف هذه المسودة؟', confirmText: 'سيُحذف محتواها من هذا المتصفح. يمكنك تصديرها أولًا إذا احتجت نسخة احتياطية.',
    confirm: 'نعم، احذف المسودة', deleted: 'حُذفت المسودة', invalidImport: 'لم أجد أسئلة صحيحة. افصل الخانات بالرمز |.',
    emptyPreview: 'أكمل سؤالًا واحدًا على الأقل (نص السؤال والإجابة) لتجربة اللعبة.', previewOnly: 'معاينة المعلم — ليست لعبة منشورة',
    next: 'التالي', finish: 'إنهاء المعاينة', check: 'تحقق من الإجابة', retry: 'إعادة التجربة',
    correctMsg: 'إجابة صحيحة! أحسنت.', wrongMsg: 'محاولة جيدة؛ راجع الإجابة.', timeUp: 'انتهى الوقت.',
    score: 'النتيجة', of: 'من', endTitle: 'اكتملت المعاينة!', endText: 'هذه النتيجة للتجربة فقط ولا تُخزّن ضمن تقارير الطلاب.',
    requiredTitle: 'اكتب عنوان اللعبة أولًا.', saveError: 'تعذر الحفظ في هذا المتصفح؛ جرّب تصدير JSON.',
    savedToast: 'حُفظت المسودة على هذا الجهاز.', exported: 'تم تجهيز نسخة JSON.', imported: 'تمت إضافة الأسئلة.',
    untitled: 'لعبة تعليمية جديدة', readOnly: 'نسخة المرحلة الثانية', help: 'يمكنك إضافة 100 سؤال كحد أقصى.',
    emptyAnswer: 'الإجابة غير محددة', play: 'ابدأ', ready: 'جاهز', incomplete: 'غير مكتمل',
  },
  en: {
    create: 'Game creator', lead: 'Build a learning game from your questions, then save and test it before sharing arrives in a future phase.',
    draft: 'Local draft', saved: 'Draft saved', saving: 'Save draft', new: 'New game', preview: 'Preview game',
    export: 'Export JSON', import: 'Bulk add questions', title: 'Game title', titleHint: 'e.g. Family & farm vocabulary',
    description: 'Short description', descriptionHint: 'What should learners achieve?', category: 'Subject / unit', categoryHint: 'e.g. Vocabulary',
    level: 'Level', beginner: 'Beginner', intermediate: 'Intermediate', advanced: 'Advanced',
    questions: 'Questions', addQuestion: 'Add question', question: 'Question', selectQuestion: 'Select a question to edit',
    questionType: 'Question type', mcq: 'Multiple choice', boolean: 'True or false', short: 'Short answer',
    prompt: 'Question text', promptHint: 'Write your question...', correct: 'Correct answer', answer: 'Answer',
    true: 'True', false: 'False', option: 'Option', optionHint: 'Option text', shortHint: 'Enter the model answer',
    points: 'Points', seconds: 'Time (seconds)', feedback: 'Feedback / explanation', feedbackHint: 'Explain or encourage...',
    image: 'Image URL (optional)', audio: 'Audio URL (optional)', mediaNote: 'Direct HTTPS media links work. Cloud uploads and storage will arrive in a later phase.',
    moveUp: 'Move up', moveDown: 'Move down', duplicate: 'Duplicate question', remove: 'Remove question',
    progress: 'Question readiness', questionsReady: 'Ready to preview', noQuestion: 'Add a question first',
    localNotice: 'Drafts are saved only in this browser. Export JSON to keep a backup or transfer your work.',
    library: 'Your game library', libraryLead: 'Drafts stored on this device. Sync across devices is not available yet.',
    count: 'Saved drafts', modified: 'Last edited', open: 'Continue editing', delete: 'Delete', noDrafts: 'A fresh space for your games!', noDraftsText: 'Create your first game and its draft will appear here.',
    searchDrafts: 'Search drafts...', noMatches: 'No matching drafts',
    importTitle: 'Add multiple questions at once', importLead: 'One line per question, in this order: question | correct answer | wrong option 1 | wrong option 2 | wrong option 3',
    importExample: 'What color is the sky? | Blue | Red | Green | Yellow\nWhat is the plural of book? | Books | Booklet | Library | Reading',
    importAction: 'Add questions', importCount: 'New questions added', cancel: 'Cancel', restoreJson: 'Restore a draft from JSON', invalidJson: 'Invalid file. Choose an export from Arabic Light Games.', importedJson: 'Draft restored successfully.',
    confirmDelete: 'Delete this draft?', confirmText: 'It will be removed from this browser. Export a backup first if you need one.',
    confirm: 'Yes, delete draft', deleted: 'Draft deleted', invalidImport: 'No valid questions. Separate fields with |.',
    emptyPreview: 'Complete at least one question (text and answer) to preview.', previewOnly: 'Teacher preview — not published',
    next: 'Next', finish: 'Finish preview', check: 'Check answer', retry: 'Try again',
    correctMsg: 'Correct! Well done.', wrongMsg: 'Good try. Review the answer.', timeUp: 'Time is up.',
    score: 'Score', of: 'out of', endTitle: 'Preview complete!', endText: 'This is a practice result and is not stored as a student report.',
    requiredTitle: 'Enter a game title first.', saveError: 'Unable to save in this browser. Try exporting JSON.',
    savedToast: 'Draft saved on this device.', exported: 'JSON export ready.', imported: 'Questions added.',
    untitled: 'New learning game', readOnly: 'Phase two preview', help: 'You can add up to 100 questions.',
    emptyAnswer: 'Answer not set', play: 'Start', ready: 'Ready', incomplete: 'Incomplete',
  },
};

const msg = (locale, key) => copy[locale]?.[key] || copy.ar[key] || key;
const esc = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const uid = () => (globalThis.crypto?.randomUUID?.() || `game-${Date.now()}-${Math.random().toString(36).slice(2)}`);
const clone = value => JSON.parse(JSON.stringify(value));
const clamp = (value, min, max, fallback) => Number.isFinite(Number(value)) ? Math.min(max, Math.max(min, Math.round(Number(value)))) : fallback;
function safeRead(key, fallback) { try { return JSON.parse(localStorage.getItem(key) || 'null') ?? fallback; } catch { return fallback; } }
function safeWrite(key, value) { try { localStorage.setItem(key, JSON.stringify(value)); return true; } catch { return false; } }

function blankQuestion() { return { id: uid(), type: 'mcq', prompt: '', options: ['', '', '', ''], correctIndex: 0, correctText: '', points: 10, seconds: 30, feedback: '', imageUrl: '', audioUrl: '' }; }
function blankGame(locale = 'ar') { return { id: uid(), title: msg(locale,'untitled'), description: '', category: '', level: 'beginner', questions: [blankQuestion()], createdAt: Date.now(), updatedAt: Date.now(), status: 'draft' }; }
function cleanQuestion(q = {}) { return { id: typeof q.id === 'string' ? q.id : uid(), type: TYPES.includes(q.type) ? q.type : 'mcq', prompt: String(q.prompt || '').slice(0,2000), options: Array.from({length:4}, (_,i) => String((Array.isArray(q.options) ? q.options[i] : '') || '').slice(0,500)), correctIndex: clamp(q.correctIndex,0,3,0), correctText: String(q.correctText || '').slice(0,500), points: clamp(q.points,1,100,10), seconds: clamp(q.seconds,5,300,30), feedback: String(q.feedback || '').slice(0,1000), imageUrl: String(q.imageUrl || '').slice(0,1200), audioUrl: String(q.audioUrl || '').slice(0,1200) }; }
function cleanGame(g = {}) { return { id: typeof g.id === 'string' && g.id.length<100 ? g.id : uid(), title: String(g.title || '').slice(0,140), description: String(g.description || '').slice(0,1000), category: String(g.category || '').slice(0,100), level: ['beginner','intermediate','advanced'].includes(g.level) ? g.level : 'beginner', questions: Array.isArray(g.questions) ? g.questions.slice(0,MAX_QUESTIONS).map(cleanQuestion) : [], createdAt: Number(g.createdAt) || Date.now(), updatedAt: Number(g.updatedAt) || Date.now(), status: 'draft' }; }
let drafts = safeRead(STORAGE_KEY, []);
drafts = Array.isArray(drafts) ? drafts.filter(item => item && typeof item==='object').slice(0,150).map(cleanGame) : [];
let working = (() => { const old=safeRead(RECOVERY_KEY,null); let locale='ar';try{locale=localStorage.getItem('ala-games-locale')==='en'?'en':'ar';}catch{}return old && typeof old==='object' ? cleanGame(old) : blankGame(locale); })();
let selectedQuestion = working.questions[0]?.id || null;
let modal = null;
let preview = null;
let timer = null;
let libraryQuery = '';
let transientImport = '';
let dirty = false;
let bridge = null;

export function draftStats() { return { drafts: drafts.length, recent: [...drafts].sort((a,b)=>b.updatedAt-a.updatedAt).slice(0,3) }; }
export function newDraft(locale='ar') { if(dirty && !saveDraft()) return false; working=blankGame(locale); selectedQuestion=working.questions[0].id; dirty=false; safeWrite(RECOVERY_KEY,working); return true; }
function markEdited() { working.updatedAt=Date.now(); dirty=true; safeWrite(RECOVERY_KEY,working); }
function saveDraft() { if (!working.title.trim()) return false; const item=cleanGame(working); item.updatedAt=Date.now(); const next=[item,...drafts.filter(d=>d.id!==item.id)]; if (!safeWrite(STORAGE_KEY,next)) return false; drafts=next; working=clone(item); dirty=false; safeWrite(RECOVERY_KEY,working); return true; }
function activeQuestion() { return working.questions.find(q=>q.id===selectedQuestion) || working.questions[0]; }
function usableUrl(raw, kind) { try { const u=new URL(String(raw)); return u.protocol==='https:' || (u.protocol==='http:' && (u.hostname==='localhost' || u.hostname==='127.0.0.1')) ? u.href : ''; } catch { return ''; } }
function readyQuestion(q) { if (!q.prompt.trim()) return false; if (q.type==='short') return Boolean(q.correctText.trim()); if (q.type==='boolean') return true; return q.options.filter(o=>o.trim()).length>=2 && Boolean(q.options[q.correctIndex]?.trim()); }
function questionTypeOptions(locale,selected) { return TYPES.map(type=>`<option value="${type}" ${type===selected?'selected':''}>${msg(locale,type)}</option>`).join(''); }
function buttonIcon(symbol, text, action, extras='') { return `<button type="button" class="ed-tool" data-editor-action="${action}" ${extras}>${symbol}<span>${text}</span></button>`; }
function questionSummary(q, i, locale) { return `<button type="button" class="ed-question-tab ${q.id===selectedQuestion?'is-selected':''}" data-editor-action="select-question" data-id="${esc(q.id)}"><span class="ed-question-number">${i+1}</span><span class="ed-question-summary"><b>${esc(q.prompt.trim() || `${msg(locale,'question')} ${i+1}`)}</b><small>${msg(locale,q.type)}</small></span><span class="ed-ready ${readyQuestion(q)?'yes':'no'}" title="${msg(locale,readyQuestion(q)?'ready':'incomplete')}"></span></button>`; }

function questionForm(locale) {
  const q=activeQuestion(); if(!q) return `<div class="ed-empty">${msg(locale,'noQuestion')}</div>`;
  const idx=working.questions.findIndex(item=>item.id===q.id);
  let answers='';
  if(q.type==='mcq') answers=`<div class="ed-options">${q.options.map((value,i)=>`<label class="ed-option ${q.correctIndex===i?'is-correct':''}"><input type="radio" name="ed-correct-option" value="${i}" data-ed-correct ${q.correctIndex===i?'checked':''} aria-label="${msg(locale,'correct')} ${i+1}"><span class="ed-option-index">${String.fromCharCode(65+i)}</span><input type="text" value="${esc(value)}" maxlength="500" data-ed-option="${i}" placeholder="${msg(locale,'optionHint')} ${i+1}" aria-label="${msg(locale,'option')} ${i+1}"/></label>`).join('')}</div>`;
  if(q.type==='boolean') answers=`<div class="ed-boolean">${[0,1].map(i=>`<label class="ed-boolean-choice"><input type="radio" name="ed-correct-option" value="${i}" data-ed-correct ${q.correctIndex===i?'checked':''}><span>${msg(locale,i===0?'true':'false')}</span></label>`).join('')}</div>`;
  if(q.type==='short') answers=`<label class="ed-field">${msg(locale,'correct')}<input data-ed-qfield="correctText" type="text" maxlength="500" value="${esc(q.correctText)}" placeholder="${msg(locale,'shortHint')}" /></label>`;
  const image=usableUrl(q.imageUrl,'image'); const audio=usableUrl(q.audioUrl,'audio');
  return `<div class="ed-question-edit"><div class="ed-form-head"><div><span class="ed-overline">${msg(locale,'question')} ${idx+1} / ${working.questions.length}</span><h2>${msg(locale,'selectQuestion')}</h2></div><div class="ed-tools">${buttonIcon('↑',msg(locale,'moveUp'),'move-up',idx===0?'disabled':'')}${buttonIcon('↓',msg(locale,'moveDown'),'move-down',idx===working.questions.length-1?'disabled':'')}${buttonIcon('⧉',msg(locale,'duplicate'),'duplicate-question')}${buttonIcon('×',msg(locale,'remove'),'remove-question')}</div></div>
      <div class="ed-field-row"><label class="ed-field">${msg(locale,'questionType')}<select data-ed-qfield="type">${questionTypeOptions(locale,q.type)}</select></label><label class="ed-field">${msg(locale,'points')}<input data-ed-qfield="points" type="number" min="1" max="100" value="${q.points}"></label><label class="ed-field">${msg(locale,'seconds')}<input data-ed-qfield="seconds" type="number" min="5" max="300" value="${q.seconds}"></label></div>
      <label class="ed-field">${msg(locale,'prompt')}<textarea data-ed-qfield="prompt" rows="3" maxlength="2000" placeholder="${msg(locale,'promptHint')}">${esc(q.prompt)}</textarea></label><div class="ed-answers-head"><strong>${msg(locale,'correct')}</strong><small>${msg(locale,q.type)}</small></div>${answers}
      <label class="ed-field">${msg(locale,'feedback')}<textarea data-ed-qfield="feedback" rows="2" maxlength="1000" placeholder="${msg(locale,'feedbackHint')}">${esc(q.feedback)}</textarea></label>
      <div class="ed-media-grid"><label class="ed-field">${msg(locale,'image')}<input data-ed-qfield="imageUrl" type="url" maxlength="1200" value="${esc(q.imageUrl)}" placeholder="https://example.com/image.png" /></label><label class="ed-field">${msg(locale,'audio')}<input data-ed-qfield="audioUrl" type="url" maxlength="1200" value="${esc(q.audioUrl)}" placeholder="https://example.com/audio.mp3" /></label></div>
      <p class="ed-note">ⓘ ${msg(locale,'mediaNote')}</p>${image?`<img class="ed-media-image" src="${esc(image)}" alt="" loading="lazy" referrerpolicy="no-referrer"/>`:''}${audio?`<audio class="ed-media-audio" src="${esc(audio)}" controls preload="none"></audio>`:''}
    </div>`;
}

export function studioPage(locale='ar') {
  if (!selectedQuestion && working.questions.length) selectedQuestion=working.questions[0].id;
  const total=working.questions.length; const ready=working.questions.filter(readyQuestion).length;
  return `<div class="page-heading"><div><p class="kicker">${msg(locale,'readOnly')}</p><h1>${msg(locale,'create')}</h1><p>${msg(locale,'lead')}</p></div><span class="status-pill">✎ ${msg(locale,'draft')}</span></div>
    <div class="ed-toolbar"><div class="ed-toolbar-state"><span class="ed-toolbar-dot"></span><b>${msg(locale,'draft')}</b><small>${dirty?'●':'✓'} ${total} ${msg(locale,'questions')}</small></div><div class="ed-toolbar-actions">${buttonIcon('＋',msg(locale,'new'),'new-game')}${buttonIcon('↓',msg(locale,'import'),'open-import')}${buttonIcon('⇩',msg(locale,'export'),'export-game')}<button class="button button-primary" type="button" data-editor-action="save-game">✓ ${msg(locale,'saving')}</button><button class="button button-gold" type="button" data-editor-action="open-preview">▶ ${msg(locale,'preview')}</button></div></div>
    <section class="ed-meta panel"><div class="ed-meta-grid"><label class="ed-field ed-title-field">${msg(locale,'title')}<input data-ed-gfield="title" maxlength="140" value="${esc(working.title)}" placeholder="${msg(locale,'titleHint')}"/></label><label class="ed-field">${msg(locale,'category')}<input data-ed-gfield="category" maxlength="100" value="${esc(working.category)}" placeholder="${msg(locale,'categoryHint')}"/></label><label class="ed-field">${msg(locale,'level')}<select data-ed-gfield="level">${['beginner','intermediate','advanced'].map(l=>`<option value="${l}" ${l===working.level?'selected':''}>${msg(locale,l)}</option>`).join('')}</select></label></div><label class="ed-field">${msg(locale,'description')}<textarea data-ed-gfield="description" rows="2" maxlength="1000" placeholder="${msg(locale,'descriptionHint')}">${esc(working.description)}</textarea></label></section>
    <div class="ed-layout"><section class="ed-questions panel"><div class="ed-sidebar-head"><strong>${msg(locale,'questions')}</strong><span>${total}</span></div><div class="ed-question-list">${working.questions.map((q,i)=>questionSummary(q,i,locale)).join('')}</div><button type="button" class="ed-add-button" data-editor-action="add-question" ${total>=MAX_QUESTIONS?'disabled':''}>＋ ${msg(locale,'addQuestion')}</button><div class="ed-readiness"><span>${msg(locale,'progress')}</span><strong>${ready} / ${total}</strong><div class="ed-progress"><i style="width:${total?100*ready/total:0}%"></i></div><small>${msg(locale,'questionsReady')}</small></div></section><section class="ed-editor panel">${questionForm(locale)}</section></div>
    <div class="ed-local-warning">🔒 ${msg(locale,'localNotice')}</div>`;
}

export function libraryPage(locale='ar') {
  const sorted=[...drafts].sort((a,b)=>b.updatedAt-a.updatedAt);
  const visible = sorted.filter(g=>(g.title+' '+g.category).toLocaleLowerCase().includes(libraryQuery.trim().toLocaleLowerCase())).length;
  const rows=sorted.map(g=>`<article class="lb-card" data-lb-card data-title="${esc((g.title+' '+g.category).toLocaleLowerCase())}" ${(g.title+' '+g.category).toLocaleLowerCase().includes(libraryQuery.trim().toLocaleLowerCase())?'':'hidden'}><div class="lb-card-head"><span class="lb-card-icon">📚</span><span class="development-badge">${msg(locale,'draft')}</span></div><h3>${esc(g.title || msg(locale,'untitled'))}</h3><p>${esc(g.description || g.category || msg(locale,'localNotice'))}</p><div class="lb-card-meta"><span>☷ ${g.questions.length} ${msg(locale,'questions')}</span><span>◷ ${new Date(g.updatedAt).toLocaleDateString(locale==='ar'?'ar-EG':'en-US')}</span></div><div class="lb-card-actions"><button class="button button-primary" type="button" data-editor-action="open-draft" data-id="${esc(g.id)}">${msg(locale,'open')}</button><button class="ed-tool" type="button" data-editor-action="export-draft" data-id="${esc(g.id)}">⇩ ${msg(locale,'export')}</button><button class="ed-tool lb-delete" type="button" data-editor-action="ask-delete" data-id="${esc(g.id)}">× ${msg(locale,'delete')}</button></div></article>`).join('');
  return `<div class="page-heading"><div><p class="kicker">${msg(locale,'count')}: ${drafts.length}</p><h1>${msg(locale,'library')}</h1><p>${msg(locale,'libraryLead')}</p></div><button class="button button-primary" type="button" data-editor-action="new-game-go">＋ ${msg(locale,'new')}</button></div>
    ${drafts.length?`<div class="lb-search-wrap"><input type="search" data-lb-search placeholder="${msg(locale,'searchDrafts')}" value="${esc(libraryQuery)}" aria-label="${msg(locale,'searchDrafts')}"><span>${drafts.length} ${msg(locale,'count')}</span></div><div class="lb-grid">${rows}</div><p class="lb-empty-search" id="lb-no-results" ${visible?'hidden':''}>${msg(locale,'noMatches')}</p>`:`<div class="lb-empty panel"><div>🎮</div><h2>${msg(locale,'noDrafts')}</h2><p>${msg(locale,'noDraftsText')}</p><button class="button button-primary" type="button" data-editor-action="new-game-go">＋ ${msg(locale,'new')}</button></div>`}
    <div class="ed-local-warning">🔒 ${msg(locale,'localNotice')}</div>`;
}

export function recentDraftsPage(locale='ar') {
  const items=draftStats().recent;
  if(!items.length) return '';
  return `<div class="ed-recents">${items.map(g=>`<button type="button" data-editor-action="open-draft" data-id="${esc(g.id)}"><span>🎮</span><span><b>${esc(g.title)}</b><small>${g.questions.length} ${msg(locale,'questions')}</small></span><span>↗</span></button>`).join('')}</div>`;
}

function getPreviewQuestions() { return working.questions.filter(readyQuestion); }
function normalizeAnswer(text) { return String(text||'').normalize('NFKC').replace(/[\u064b-\u065f\u0670]/g,'').replace(/[أإآ]/g,'ا').replace(/ة/g,'ه').replace(/\s+/g,' ').trim().toLocaleLowerCase(); }
function formatAnswer(q,locale) { return q.type==='short'?q.correctText : q.type==='boolean'?msg(locale,q.correctIndex===0?'true':'false'):q.options[q.correctIndex]; }
function previewModal(locale) {
  if(!preview) return '';
  const list=preview.questions;
  if(preview.index>=list.length){ const maximum=list.reduce((total,q)=>total+q.points,0); return `<div class="ed-backdrop"><div class="ed-modal ed-preview-modal" role="dialog" aria-modal="true" aria-labelledby="ed-preview-title"><button class="ed-modal-close" type="button" data-editor-action="close-modal" aria-label="${msg(locale,'cancel')}">×</button><div class="ed-finish-icon">🏆</div><h2 id="ed-preview-title">${msg(locale,'endTitle')}</h2><strong class="ed-score">${preview.score} / ${maximum}</strong><p>${msg(locale,'endText')}</p><div class="ed-modal-actions"><button class="button button-primary" type="button" data-editor-action="retry-preview">↺ ${msg(locale,'retry')}</button><button class="button" type="button" data-editor-action="close-modal">${msg(locale,'cancel')}</button></div></div></div>`; }
  const q=list[preview.index], answer=preview.answer;
  const choices=q.type==='mcq'?q.options.map((o,i)=>({text:o,index:i})).filter(o=>o.text.trim()):q.type==='boolean'?[{text:msg(locale,'true'),index:0},{text:msg(locale,'false'),index:1}]:[];
  const image=usableUrl(q.imageUrl,'image'); const audio=usableUrl(q.audioUrl,'audio');
  return `<div class="ed-backdrop"><div class="ed-modal ed-preview-modal" role="dialog" aria-modal="true" aria-labelledby="ed-preview-title"><button class="ed-modal-close" type="button" data-editor-action="close-modal" aria-label="${msg(locale,'cancel')}">×</button><span class="ed-preview-label">${msg(locale,'previewOnly')}</span><div class="ed-preview-progress"><span>${msg(locale,'question')} ${preview.index+1} / ${list.length}</span><span id="ed-timer" aria-live="off">⏱ ${preview.remaining}s</span></div><div class="ed-progress"><i style="width:${100*(preview.index+1)/list.length}%"></i></div><h2 id="ed-preview-title">${esc(q.prompt)}</h2>${image?`<img src="${esc(image)}" class="ed-preview-image" alt="" referrerpolicy="no-referrer" />`:''}${audio?`<audio src="${esc(audio)}" controls preload="none"></audio>`:''}
    ${q.type==='short'?`<input class="ed-preview-short" data-ed-preview-short placeholder="${msg(locale,'answer')}" value="${esc(preview.typed||'')}" ${answer?'disabled':''} />`:`<div class="ed-preview-choices">${choices.map(item=>`<button type="button" data-editor-action="preview-answer" data-index="${item.index}" class="ed-preview-choice ${answer&&item.index===q.correctIndex?'is-correct':''} ${answer&&!answer.correct&&answer.selected===item.index?'is-wrong':''}" ${answer?'disabled':''}>${esc(item.text)}</button>`).join('')}</div>`}
    ${answer?`<div class="ed-feedback ${answer.correct?'is-correct':'is-wrong'}"><strong>${msg(locale,answer.reason==='time'?'timeUp':answer.correct?'correctMsg':'wrongMsg')}</strong>${answer.correct?'':`<span>${msg(locale,'correct')}: ${esc(formatAnswer(q,locale))}</span>`}${q.feedback?`<p>${esc(q.feedback)}</p>`:''}</div>`:''}
    <div class="ed-modal-actions">${!answer&&q.type==='short'?`<button class="button button-primary" type="button" data-editor-action="preview-short-check">${msg(locale,'check')}</button>`:''}${answer?`<button class="button button-primary" type="button" data-editor-action="next-preview">${msg(locale,preview.index===list.length-1?'finish':'next')} ←</button>`:''}<button class="button" type="button" data-editor-action="close-modal">${msg(locale,'cancel')}</button></div></div></div>`;
}

export function editorOverlay(locale='ar') {
  if(preview) return previewModal(locale);
  if(modal?.type==='import') return `<div class="ed-backdrop"><div class="ed-modal" role="dialog" aria-modal="true" aria-labelledby="ed-modal-title"><button class="ed-modal-close" type="button" data-editor-action="close-modal">×</button><h2 id="ed-modal-title">${msg(locale,'importTitle')}</h2><p>${msg(locale,'importLead')}</p><textarea class="ed-import-text" data-ed-import rows="8" placeholder="${msg(locale,'importExample')}">${esc(transientImport)}</textarea><div class="ed-modal-actions"><button class="button button-primary" type="button" data-editor-action="do-import">＋ ${msg(locale,'importAction')}</button><button class="button" type="button" data-editor-action="close-modal">${msg(locale,'cancel')}</button></div><div class="ed-file-import"><label>${msg(locale,'restoreJson')}<input data-ed-import-json type="file" accept=".json,application/json" /></label></div></div></div>`;
  if(modal?.type==='delete') return `<div class="ed-backdrop"><div class="ed-modal" role="dialog" aria-modal="true" aria-labelledby="ed-modal-title"><button class="ed-modal-close" type="button" data-editor-action="close-modal">×</button><h2 id="ed-modal-title">${msg(locale,'confirmDelete')}</h2><p>${msg(locale,'confirmText')}</p><div class="ed-modal-actions"><button class="button lb-confirm-delete" type="button" data-editor-action="confirm-delete">${msg(locale,'confirm')}</button><button class="button" type="button" data-editor-action="close-modal">${msg(locale,'cancel')}</button></div></div></div>`;
  return '';
}

function downloadGame(game) {
  const json=JSON.stringify({format:'arabic-light-games',version:2,game:cleanGame(game)},null,2);
  const blob=new Blob([json],{type:'application/json;charset=utf-8'});
  const url=URL.createObjectURL(blob), a=document.createElement('a');
  a.href=url; a.download=`arabic-light-${String(game.title||'game').replace(/[^\p{L}\p{N}-]+/gu,'-').slice(0,45)}.json`;
  document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),500);
}
function openPreview() {
  const questions=getPreviewQuestions(); if(!questions.length) return false;
  preview={questions:clone(questions),index:0,score:0,remaining:questions[0].seconds,answer:null,typed:''}; startTimer(); return true;
}
function startTimer() { clearInterval(timer);timer=setInterval(()=>{ if(!preview||preview.answer||preview.index>=preview.questions.length)return; preview.remaining-=1; const element=document.querySelector('#ed-timer');if(element)element.textContent=`⏱ ${Math.max(0,preview.remaining)}s`;if(preview.remaining<=0)checkPreviewAnswer(null,'time'); },1000); }
function checkPreviewAnswer(selected,reason='answer') {
  if(!preview||preview.answer)return;
  const q=preview.questions[preview.index];let correct=false;
  if(reason!=='time')correct=q.type==='short'?normalizeAnswer(preview.typed)===normalizeAnswer(q.correctText):selected===q.correctIndex;
  if(correct)preview.score+=q.points;
  preview.answer={correct,selected,reason};clearInterval(timer);bridge.refresh();
}
function nextPreview() { if(!preview)return;preview.index+=1;preview.answer=null;preview.typed='';if(preview.index<preview.questions.length){preview.remaining=preview.questions[preview.index].seconds;startTimer();}else clearInterval(timer);bridge.refresh(); }
function selectAndGo(id) { const item=drafts.find(g=>g.id===id);if(!item)return;working=clone(item);selectedQuestion=working.questions[0]?.id||null;dirty=false;safeWrite(RECOVERY_KEY,working);bridge.go('studio'); }
function applyLibraryFilter() { const query=libraryQuery.trim().toLocaleLowerCase();let visible=0;document.querySelectorAll('[data-lb-card]').forEach(card=>{const show=!query||(card.dataset.title||'').includes(query);card.hidden=!show;if(show)visible++;});const empty=document.querySelector('#lb-no-results');if(empty)empty.hidden=visible>0; }

function executeAction(action, element, locale) {
  const q=activeQuestion(), index=working.questions.findIndex(item=>item.id===q?.id);
  switch(action) {
    case 'new-game': if(!newDraft(locale)){bridge.toast(msg(locale,'saveError'));return;}bridge.refresh();return;
    case 'new-game-go':if(!newDraft(locale)){bridge.toast(msg(locale,'saveError'));return;}bridge.go('studio');return;
    case 'save-game':{const saved=saveDraft();bridge.refresh();bridge.toast(msg(locale,saved?'savedToast':'saveError'));return;}
    case 'export-game':downloadGame(working);bridge.toast(msg(locale,'exported'));return;
    case 'open-draft':selectAndGo(element.dataset.id);return;
    case 'export-draft':{const item=drafts.find(g=>g.id===element.dataset.id);if(item)downloadGame(item);return;}
    case 'ask-delete':modal={type:'delete',id:element.dataset.id};bridge.refresh();return;
    case 'confirm-delete':{const deletedId=modal?.id;const next=drafts.filter(g=>g.id!==deletedId);if(!safeWrite(STORAGE_KEY,next)){bridge.toast(msg(locale,'saveError'));return;}drafts=next;if(working.id===deletedId){working=blankGame(locale);selectedQuestion=working.questions[0].id;dirty=false;safeWrite(RECOVERY_KEY,working);}modal=null;bridge.refresh();bridge.toast(msg(locale,'deleted'));return;}
    case 'open-import':modal={type:'import'};bridge.refresh();return;
    case 'do-import':{
      if(working.questions.length>=MAX_QUESTIONS){bridge.toast(msg(locale,'help'));return;}
      const lines=transientImport.split(/\r?\n/).map(line=>line.trim()).filter(Boolean).slice(0,MAX_QUESTIONS-working.questions.length);const added=[];
      for(const line of lines){const parts=line.split('|').map(s=>s.trim());if(parts.length<3||!parts[0]||!parts[1])continue;const q=blankQuestion();q.prompt=parts[0].slice(0,2000);q.options=[parts[1],parts[2],parts[3]||'',parts[4]||''].map(s=>s.slice(0,500));if(readyQuestion(q))added.push(q);}
      if(!added.length){bridge.toast(msg(locale,'invalidImport'));return;}
      working.questions.push(...added.slice(0,MAX_QUESTIONS-working.questions.length));selectedQuestion=added[0].id;markEdited();transientImport='';modal=null;bridge.refresh();bridge.toast(`${added.length} ${msg(locale,'importCount')}`);return;
    }
    case 'close-modal':modal=null;preview=null;clearInterval(timer);bridge.refresh();return;
    case 'add-question':if(working.questions.length>=MAX_QUESTIONS)return;{const added=blankQuestion();working.questions.push(added);selectedQuestion=added.id;markEdited();bridge.refresh();return;}
    case 'select-question':selectedQuestion=element.dataset.id;bridge.refresh();return;
    case 'move-up':case 'move-down':{const target=index+(action==='move-up'?-1:1);if(index<0||target<0||target>=working.questions.length)return;[working.questions[index],working.questions[target]]=[working.questions[target],working.questions[index]];markEdited();bridge.refresh();return;}
    case 'duplicate-question':if(!q||working.questions.length>=MAX_QUESTIONS)return;{const duplicate=cleanQuestion({...q,id:uid()});working.questions.splice(index+1,0,duplicate);selectedQuestion=duplicate.id;markEdited();bridge.refresh();return;}
    case 'remove-question':if(!q)return;working.questions.splice(index,1);selectedQuestion=working.questions[Math.min(index,working.questions.length-1)]?.id||null;markEdited();bridge.refresh();return;
    case 'open-preview':if(!openPreview()){bridge.toast(msg(locale,'emptyPreview'));return;}bridge.refresh();return;
    case 'preview-answer':checkPreviewAnswer(Number(element.dataset.index));return;
    case 'preview-short-check':checkPreviewAnswer(preview?.typed);return;
    case 'next-preview':nextPreview();return;
    case 'retry-preview':clearInterval(timer);openPreview();bridge.refresh();return;
  }
}

export function registerEditorEvents({refresh,go,toast,locale}) {
  bridge={refresh,go,toast,locale};
  document.addEventListener('click',event=>{const el=event.target.closest('[data-editor-action]');if(!el)return;executeAction(el.dataset.editorAction,el,locale());});
  document.addEventListener('input',event=>{
    const el=event.target;
    if(el.matches('[data-lb-search]')){libraryQuery=el.value;applyLibraryFilter();return;}
    if(el.matches('[data-ed-import]')){transientImport=el.value;return;}
    if(el.matches('[data-ed-preview-short]')){if(preview)preview.typed=el.value;return;}
    if(el.hasAttribute('data-ed-gfield')){const field=el.dataset.edGfield;if(['title','description','category','level'].includes(field)){working[field]=el.value;markEdited();}return;}
    const q=activeQuestion();if(!q)return;
    if(el.hasAttribute('data-ed-option')){q.options[Number(el.dataset.edOption)]=el.value;markEdited();return;}
    if(el.hasAttribute('data-ed-qfield')){const field=el.dataset.edQfield;if(!['prompt','correctText','feedback','imageUrl','audioUrl','points','seconds','type'].includes(field))return;q[field]=['points','seconds'].includes(field)?clamp(el.value,field==='points'?1:5,field==='points'?100:300,field==='points'?10:30):el.value;markEdited();}
  });
  document.addEventListener('change',event=>{
    const el=event.target;
    if(el.matches('[data-ed-import-json]')){
      const file=el.files?.[0];if(!file)return;
      (async()=>{try{if(file.size>5_000_000)throw Error('Too large');const data=JSON.parse(await file.text());if(data.format!=='arabic-light-games'||data.version!==2||!data.game||typeof data.game!=='object')throw Error('Wrong format');const restored=cleanGame(data.game);restored.id=uid();working=restored;selectedQuestion=working.questions[0]?.id||null;dirty=true;if(!saveDraft())throw Error('Storage failed');modal=null;refresh();toast(msg(locale(),'importedJson'));}catch{toast(msg(locale(),'invalidJson'));}})();return;
    }
    if(el.matches('[data-ed-correct]')){const q=activeQuestion();if(q){q.correctIndex=Number(el.value);markEdited();refresh();}}
    if(el.matches('[data-ed-qfield="type"]')){const q=activeQuestion();if(q){q.type=TYPES.includes(el.value)?el.value:'mcq';if(q.type==='boolean' && q.correctIndex>1)q.correctIndex=0;markEdited();refresh();}}
    if(el.matches('[data-ed-gfield="level"]'))refresh();
  });
  document.addEventListener('keydown',event=>{
    if(event.key==='Escape'&&(modal||preview)){modal=null;preview=null;clearInterval(timer);refresh();}
    if(event.key==='Enter'&&event.target.matches('[data-ed-preview-short]')){event.preventDefault();checkPreviewAnswer(preview?.typed);}
  });
}
