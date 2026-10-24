import { studioPage, libraryPage, draftStats, recentDraftsPage, editorOverlay, registerEditorEvents, newDraft } from './editor.js';

const BRAND = {
  deepTeal: '#173A43',
  turquoise: '#23AAA1',
  gold: '#F4C75B',
  ivory: '#FFF9EF',
};

const iconPaths = {
  dashboard: '<rect x="3" y="3" width="7" height="9" rx="1.5"/><rect x="14" y="3" width="7" height="5" rx="1.5"/><rect x="14" y="12" width="7" height="9" rx="1.5"/><rect x="3" y="16" width="7" height="5" rx="1.5"/>',
  gamepad: '<path d="M6 8h12a4 4 0 0 1 3.8 5.2l-1.3 4a2.3 2.3 0 0 1-3.7 1l-2.4-2H9.6l-2.4 2a2.3 2.3 0 0 1-3.7-1l-1.3-4A4 4 0 0 1 6 8Z"/><path d="M8 11v5M5.5 13.5h5M16.5 12.5h.01M19 15h.01"/>',
  library: '<path d="M4 5.5C7 4 10 4 12 6c2-2 5-2 8-.5v13c-3-1.5-6-1.5-8 .5-2-2-5-2-8-.5Z"/><path d="M12 6v13"/>',
  users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/>',
  layers: '<path d="m12 2 9 5-9 5-9-5 9-5ZM3 12l9 5 9-5M3 17l9 5 9-5"/>',
  chart: '<path d="M3 3v18h18"/><path d="m7 16 4-5 4 3 5-7"/>',
  bolt: '<path d="m13 2-3 8H4l9 12 3-8h4L13 2Z"/>',
  settings: '<path d="M12 8a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/><path d="M19.4 15a1.7 1.7 0 0 0 .34 1.88l.07.07-2.05 2.05-.07-.07a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.04 1.57V21h-2.9v-.1a1.7 1.7 0 0 0-1.05-1.57 1.7 1.7 0 0 0-1.88.34l-.07.07-2.05-2.05.07-.07A1.7 1.7 0 0 0 7.23 15a1.7 1.7 0 0 0-1.57-1.04H5.5v-2.9h.16A1.7 1.7 0 0 0 7.23 10a1.7 1.7 0 0 0-.34-1.88l-.07-.07L8.87 6l.07.07a1.7 1.7 0 0 0 1.88.34 1.7 1.7 0 0 0 1.04-1.57V4h2.9v.84a1.7 1.7 0 0 0 1.05 1.57 1.7 1.7 0 0 0 1.88-.34l.07-.07 2.05 2.05-.07.07A1.7 1.7 0 0 0 19.4 10a1.7 1.7 0 0 0 1.57 1.04H21v2.9h-.03A1.7 1.7 0 0 0 19.4 15Z"/>',
  search: '<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
  bell: '<path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9ZM10 21h4"/>',
  chevron: '<path d="m9 18 6-6-6-6"/>',
  arrow: '<path d="M20 12H4m7-7-7 7 7 7"/>',
  plus: '<path d="M12 5v14M5 12h14"/>',
  menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
  close: '<path d="M18 6 6 18M6 6l12 12"/>',
  check: '<path d="m5 12 4 4L19 6"/>',
  sparkles: '<path d="m12 3 1.4 5.6L19 10l-5.6 1.4L12 17l-1.4-5.6L5 10l5.6-1.4L12 3ZM20 17l.6 1.4L22 19l-1.4.6L20 21l-.6-1.4L18 19l1.4-.6L20 17ZM4 18l.5 1.5L6 20l-1.5.5L4 22l-.5-1.5L2 20l1.5-.5L4 18Z"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l4 2"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1"/>',
  trophy: '<path d="M7 4h10v7a5 5 0 0 1-10 0V4ZM7 6H4v3a4 4 0 0 0 4 4M17 6h3v3a4 4 0 0 1-4 4M12 16v4M8 21h8"/>',
  upload: '<path d="M12 16V3m-5 5 5-5 5 5M4 16v4h16v-4"/>',
  globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c-5 5-5 13 0 18M12 3c5 5 5 13 0 18"/>',
  lock: '<rect x="5" y="10" width="14" height="11" rx="2"/><path d="M8 10V7a4 4 0 0 1 8 0v3"/>',
  clipboard: '<rect x="5" y="5" width="14" height="17" rx="2"/><path d="M9 5V3h6v2M9 12h6M9 16h6"/>',
  help: '<circle cx="12" cy="12" r="9"/><path d="M9 9a3 3 0 0 1 6 0c0 2-3 2-3 5M12 18h.01"/>',
};

function icon(name, size = 20) {
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[name] || iconPaths.sparkles}</svg>`;
}

function brandMark() {
  return `<span class="brand-mark" aria-hidden="true"><svg width="38" height="38" viewBox="0 0 64 64"><path d="M11 39c9-5 15-5 21 1 6-6 12-6 21-1v10c-9-4-15-4-21 2-6-6-12-6-21-2Z" fill="#23AAA1"/><path d="M32 20v14M22 25l6 9M42 25l-6 9" fill="none" stroke="#F4C75B" stroke-width="5" stroke-linecap="round"/><circle cx="32" cy="17" r="5" fill="#F4C75B"/></svg></span>`;
}

const dictionary = {
  ar: {
    appName: 'استوديو الألعاب', subBrand: 'ARABIC LIGHT ACADEMY', appCaption: 'منصة الألعاب التعليمية',
    primary: 'مساحة العمل', manage: 'الإدارة والمتابعة', dashboard: 'لوحة التحكم', studio: 'إنشاء الألعاب', library: 'مكتبة الألعاب', patterns: 'أنماط الألعاب', students: 'الطلاب', groups: 'المجموعات', reports: 'التقارير', live: 'التحديات المباشرة', settings: 'الإعدادات',
    beta: 'نسخة أولية', teacher: 'مساحة المعلم', demo: 'عرض المرحلة الثانية', search: 'ابحث عن نمط لعبة أو قسم...', language: 'English', notifications: 'الإشعارات', noNotifications: 'ليس لديك إشعارات جديدة', close: 'إغلاق',
    welcome: 'صباح الإبداع، يا معلّم!', welcomeText: 'كل رحلة تعلم مؤثرة تبدأ بفكرة بسيطة.',
    heroEyebrow: 'مساحة عربية لايت التفاعلية', heroTitleA: 'حوّل دروسك إلى', heroTitleB: 'لحظات تعلّم لا تُنسى', heroText: 'مكان واحد لتصميم الألعاب التعليمية، وتنظيمها، ومشاركة التحديات مع طلابك. نبدأ اليوم بأساس متين لتجربة أكثر متعة غدًا.', createGame: 'أنشئ أول لعبة', explorePatterns: 'استكشف الأنماط',
    statsGames: 'ألعابي', statsPublished: 'الألعاب المنشورة', statsStudents: 'الطلاب', statsGroups: 'المجموعات', zeroCaption: 'لم تُضف بيانات بعد',
    recentTitle: 'أحدث ألعابك', recentCaption: 'تظهر مسوداتك المحفوظة هنا', emptyGames: 'مساحة واسعة لأفكارك!', emptyGamesText: 'لم تحفظ أي لعبة بعد. افتح المحرر، أضف الأسئلة، ثم احفظ مسودتك على هذا الجهاز.', startCreating: 'ابدأ إنشاء لعبة', localDrafts: 'مسودات محلية',
    startTitle: 'خطوات البداية', startCaption: 'مسارك إلى أول لعبة تعليمية', stepOne: 'تجهيز مساحة العمل والهوية', stepTwo: 'إضافة أسئلة الدرس', stepThree: 'اختيار طريقة اللعب', stepFour: 'المعاينة والمشاركة', done: 'اكتمل', upcoming: 'قادم',
    patternsTitle: 'أنشطة تجعل التعلّم أمتع', patternsCaption: 'تسعة أنماط سنبنيها خطوة بخطوة داخل الاستوديو', viewAll: 'عرض كل الأنماط',
    tipLabel: 'فكرة تربوية', tipText: 'ابدأ بهدف تعليمي واحد في كل لعبة، واجعل التغذية الراجعة قصيرة ومشجعة؛ فالجودة تبدأ من وضوح المهمة.',
    foundation: 'تم تجهيز الأساس', foundationText: 'الهوية ولوحة التحكم والتنقل جاهزة للتوسّع.',
    soonStatus: 'ضمن خارطة التطوير', notReady: 'هذه الوظيفة قيد البناء', noData: 'لا توجد بيانات في هذا القسم بعد', featureText: 'جهزنا مكان هذا القسم ضمن هيكل المنصة. سيتم ربطه بالوظائف وقاعدة البيانات في المرحلة المخصصة له.',
    studioTitle: 'استوديو الألعاب', studioText: 'هنا ستنشئ الأسئلة وتختار النمط والوسائط والنقاط والوقت، ثم تعاين لعبتك قبل نشرها.', studioPhase: 'محرر الألعاب — المرحلة الثانية',
    libraryTitle: 'مكتبة الألعاب', libraryText: 'ستجد ألعابك ومسوداتك وقوالب المشاركة هنا بعد تنفيذ الحفظ والنشر.',
    studentsTitle: 'إدارة الطلاب', studentsText: 'إضافة الطلاب، وربط الألعاب بهم، ومتابعة المحاولات تأتي مع نظام الحسابات.',
    groupsTitle: 'مجموعات التعلّم', groupsText: 'إنشاء مجموعات للفصول والمستويات وتوزيع التحديات عليها.',
    reportsTitle: 'تقارير التعلّم', reportsText: 'لوحات نتائج ومحاولات ونسب إتقان ستُبنى على بيانات حقيقية.',
    liveTitle: 'التحديات المباشرة', liveText: 'مسابقات لحظية بين الطلاب والفرق مع ترتيب ونقاط مباشرة.',
    settingsTitle: 'هوية وإعدادات المنصة', settingsText: 'تم اعتماد هوية Arabic Light Academy، ويمكن تبديل لغة الواجهة محليًا.', settingsColors: 'لوحة الألوان المعتمدة', settingsLang: 'لغة العرض', currentLanguage: 'العربية',
    patternsPageTitle: 'مكتبة أنماط الألعاب', patternsPageText: 'استكشف آليات اللعب المخططة. اختيار بطاقة يعرض تفاصيلها؛ التنفيذ التفاعلي سيكون في المراحل التالية.', patternDetails: 'كيف سيعمل هذا النمط؟', patternStatus: 'سيُنفّذ ضمن المرحلة الثالثة',
    pattern0: 'اختبار تفاعلي', patternDesc0: 'اختيار من متعدد، صح أو خطأ، وأسئلة قصيرة.',
    pattern1: 'توصيل وتطابق', patternDesc1: 'صل الكلمات بما يناسبها من صور أو معانٍ.',
    pattern2: 'ترتيب', patternDesc2: 'رتّب الكلمات والحروف والخطوات بالتسلسل الصحيح.',
    pattern3: 'تصنيف', patternDesc3: 'ضع كل عنصر في مجموعته المناسبة.',
    pattern4: 'سحب وإفلات', patternDesc4: 'انقل العناصر إلى مواضعها الصحيحة.',
    pattern5: 'بطاقات الذاكرة', patternDesc5: 'اكشف البطاقات وابحث عن الأزواج المتطابقة.',
    pattern6: 'صائد الكلمات', patternDesc6: 'التقط الكلمات المستهدفة وتجنب المشتتات.',
    pattern7: 'تلميح الكلمات', patternDesc7: 'اكتشف الإجابة من تلميحات متدرجة.',
    pattern8: 'لعبة مركبة', patternDesc8: 'اجمع أكثر من نوع سؤال في رحلة واحدة.',
    allPatterns: 'كل الأنماط', noPatterns: 'لا يوجد نمط مطابق لبحثك', searchHint: 'اضغط Enter لعرض الأنماط المطابقة.',
    tagNew: 'قيد التطوير', systemState: 'حالة المشروع', frontEndOnly: 'واجهة أولية — بدون قاعدة بيانات',
    footer: 'صُمّمت لتجعل تعلّم العربية أكثر إشراقًا', product: 'Arabic Light Academy Games Studio',
  },
  en: {
    appName: 'Games Studio', subBrand: 'ARABIC LIGHT ACADEMY', appCaption: 'Educational games platform',
    primary: 'Workspace', manage: 'Manage & track', dashboard: 'Dashboard', studio: 'Game Creator', library: 'Games Library', patterns: 'Game Patterns', students: 'Students', groups: 'Groups', reports: 'Reports', live: 'Live Challenges', settings: 'Settings',
    beta: 'Early preview', teacher: 'Teacher workspace', demo: 'Phase two preview', search: 'Find a game pattern or section...', language: 'العربية', notifications: 'Notifications', noNotifications: 'You have no new notifications', close: 'Close',
    welcome: 'A bright day for teaching!', welcomeText: 'Every meaningful learning journey starts with a simple idea.',
    heroEyebrow: 'Arabic Light interactive space', heroTitleA: 'Turn your lessons into', heroTitleB: 'learning moments that last', heroText: 'One home to design educational games, organize them and share challenges with learners. We are building the right foundation for a more joyful experience.', createGame: 'Create your first game', explorePatterns: 'Explore patterns',
    statsGames: 'My games', statsPublished: 'Published games', statsStudents: 'Students', statsGroups: 'Groups', zeroCaption: 'No data added yet',
    recentTitle: 'Your latest games', recentCaption: 'Your saved drafts appear here', emptyGames: 'Room for your best ideas!', emptyGamesText: 'No games saved yet. Open the editor, add questions and save a draft on this device.', startCreating: 'Create a game', localDrafts: 'Local drafts',
    startTitle: 'Getting started', startCaption: 'Your path to the first learning game', stepOne: 'Workspace and branding', stepTwo: 'Add lesson questions', stepThree: 'Choose a game mode', stepFour: 'Preview and share', done: 'Completed', upcoming: 'Upcoming',
    patternsTitle: 'Activities that spark learning', patternsCaption: 'Nine game mechanics we will build step by step', viewAll: 'View all patterns',
    tipLabel: 'Teaching tip', tipText: 'Start with one learning objective per game. Keep feedback short and encouraging; clarity makes the difference.',
    foundation: 'Foundation ready', foundationText: 'Branding, dashboard and navigation are ready to grow.',
    soonStatus: 'On the roadmap', notReady: 'This feature is being built', noData: 'No data in this section yet', featureText: 'This area is in the platform structure. Functionality and persistent data will be added in its milestone.',
    studioTitle: 'Games Studio', studioText: 'Create questions, choose mechanics, media, points and time. Preview before publishing.', studioPhase: 'Game editor — phase two',
    libraryTitle: 'Games Library', libraryText: 'Your games, drafts and shared templates will appear here once save and publish are implemented.',
    studentsTitle: 'Student management', studentsText: 'Add learners, assign activities and track attempts with the accounts system.',
    groupsTitle: 'Learning groups', groupsText: 'Create class and level groups, then assign challenges to them.',
    reportsTitle: 'Learning reports', reportsText: 'Scores, attempts and mastery dashboards will use real learner data.',
    liveTitle: 'Live challenges', liveText: 'Real-time student and team competitions with live scores and rankings.',
    settingsTitle: 'Platform identity & settings', settingsText: 'Arabic Light Academy branding is active. You can switch the interface language locally.', settingsColors: 'Approved color palette', settingsLang: 'Display language', currentLanguage: 'English',
    patternsPageTitle: 'Game pattern library', patternsPageText: 'Explore the planned mechanics. Selecting a card explains it; interactive gameplay will follow in upcoming milestones.', patternDetails: 'How this pattern will work', patternStatus: 'Planned for phase three',
    pattern0: 'Interactive quiz', patternDesc0: 'Multiple choice, true or false and short answers.',
    pattern1: 'Match & connect', patternDesc1: 'Match words with images, meanings or pairs.',
    pattern2: 'Ordering', patternDesc2: 'Place words, letters and steps in the right sequence.',
    pattern3: 'Classification', patternDesc3: 'Sort each item into its correct group.',
    pattern4: 'Drag & drop', patternDesc4: 'Move items into the right targets.',
    pattern5: 'Memory cards', patternDesc5: 'Flip cards and find matching pairs.',
    pattern6: 'Word hunter', patternDesc6: 'Catch target words and avoid distractions.',
    pattern7: 'Word clues', patternDesc7: 'Discover answers from progressive hints.',
    pattern8: 'Mixed challenge', patternDesc8: 'Combine different questions in one journey.',
    allPatterns: 'All patterns', noPatterns: 'No matching pattern found', searchHint: 'Press Enter to show matching patterns.',
    tagNew: 'In development', systemState: 'Project status', frontEndOnly: 'Front-end preview — no database yet',
    footer: 'Making Arabic learning brighter', product: 'Arabic Light Academy Games Studio',
  },
};

const navigation = [
  { id: 'dashboard', icon: 'dashboard', group: 'primary' },
  { id: 'studio', icon: 'gamepad', group: 'primary' },
  { id: 'library', icon: 'library', group: 'primary' },
  { id: 'patterns', icon: 'layers', group: 'primary' },
  { id: 'students', icon: 'users', group: 'manage' },
  { id: 'groups', icon: 'layers', group: 'manage' },
  { id: 'reports', icon: 'chart', group: 'manage' },
  { id: 'live', icon: 'bolt', group: 'manage' },
  { id: 'settings', icon: 'settings', group: 'manage' },
];

const patternIcons = ['📝', '🔗', '🔢', '🗂️', '🧲', '🧠', '🔎', '💬', '🧩'];
const patternColors = ['mint', 'lilac', 'peach', 'blue', 'gold', 'pink', 'teal', 'sand', 'purple'];

function safeGet(key, fallback) {
  try { return localStorage.getItem(key) || fallback; } catch { return fallback; }
}
function safeSet(key, value) {
  try { localStorage.setItem(key, value); } catch { /* preferences remain in memory */ }
}
function currentPage() {
  const id = decodeURIComponent(location.hash.replace(/^#\/?/, '') || 'dashboard');
  return navigation.some(item => item.id === id) ? id : 'dashboard';
}
function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[char]));
}

const state = {
  locale: safeGet('ala-games-locale', 'ar') === 'en' ? 'en' : 'ar',
  page: currentPage(),
  query: '',
  mobileOpen: false,
  notificationsOpen: false,
  selectedPattern: null,
};

const app = document.querySelector('#app');
function t(key) { return dictionary[state.locale][key] || key; }

function sidebar() {
  const navGroup = group => navigation.filter(item => item.group === group).map(item => `
    <button class="nav-item ${state.page === item.id ? 'is-active' : ''}" type="button" data-nav="${item.id}" ${state.page === item.id ? 'aria-current="page"' : ''}>
      <span class="nav-icon">${icon(item.icon, 19)}</span><span>${t(item.id)}</span>${item.id === 'live' ? '<span class="nav-dot" aria-hidden="true"></span>' : ''}
    </button>`).join('');
  return `<aside class="sidebar ${state.mobileOpen ? 'is-open' : ''}" aria-label="${t('primary')}">
    <div class="brand-row"><div class="brand-symbol">${brandMark()}</div><div><strong>Arabic Light</strong><small>ACADEMY · GAMES</small></div></div>
    <div class="workspace-switch"><span class="workspace-avatar">${icon('sparkles', 21)}</span><span><b>${t('teacher')}</b><small>${t('demo')}</small></span>${icon('chevron', 15)}</div>
    <div class="nav-group"><p class="nav-label">${t('primary')}</p>${navGroup('primary')}</div>
    <div class="nav-group"><p class="nav-label">${t('manage')}</p>${navGroup('manage')}</div>
    <div class="sidebar-spacer"></div>
    <div class="sidebar-help"><span class="sidebar-help-icon">${icon('sparkles', 19)}</span><strong>${t('foundation')}</strong><p>${t('foundationText')}</p><span class="mini-progress"><i style="width:25%"></i></span><small>02 / 08</small></div>
    <div class="sidebar-footer"><span class="online-dot"></span><span>${t('beta')}</span><span class="footer-version">v0.2</span></div>
  </aside>`;
}

function topbar() {
  return `<header class="topbar">
    <div class="topbar-leading"><button class="icon-button mobile-menu" data-action="menu" type="button" aria-label="${t('primary')}">${icon('menu', 22)}</button>
      <span class="breadcrumb-muted">${t('teacher')}</span>${icon('chevron', 15)}<strong>${t(state.page)}</strong></div>
    <div class="topbar-trailing"><form class="global-search" role="search" id="global-search-form"><button class="search-button" type="submit" aria-label="${t('search')}">${icon('search', 18)}</button><input id="global-search-input" type="search" data-search-input autocomplete="off" placeholder="${t('search')}" value="${escapeHtml(state.query)}" /></form>
      <button class="language-button" type="button" data-action="language" aria-label="${t('language')}">${icon('globe', 18)}<span>${state.locale.toUpperCase()}</span></button>
      <div class="notification-wrap"><button class="icon-button notification-button" type="button" data-action="notifications" aria-label="${t('notifications')}" aria-expanded="${state.notificationsOpen}">${icon('bell', 19)}</button>${state.notificationsOpen ? `<div class="notification-popover" role="status"><strong>${t('notifications')}</strong><p>${t('noNotifications')}</p></div>` : ''}</div>
      <span class="header-avatar" title="${t('teacher')}">A</span>
    </div></header>`;
}

function hero() {
  return `<section class="hero-card">
    <div class="hero-copy"><span class="hero-eyebrow">${icon('sparkles', 15)} ${t('heroEyebrow')}</span><h2>${t('heroTitleA')}<br/><em>${t('heroTitleB')}</em></h2><p>${t('heroText')}</p>
      <div class="hero-actions"><button class="button button-gold" type="button" data-action="new-game">${icon('plus', 19)} ${t('createGame')}</button><button class="button button-outline-light" type="button" data-nav="patterns">${t('explorePatterns')} ${icon('arrow', 16)}</button></div>
    </div>
    <div class="hero-art" aria-hidden="true"><div class="art-halo halo-one"></div><div class="art-halo halo-two"></div><div class="art-dots"></div>
      <div class="letter-tile tile-a">أَ<span class="tile-spark">✦</span></div><div class="letter-tile tile-b">بِ</div><div class="letter-tile tile-c">تُ</div>
      <div class="art-trail"><span></span><span></span><span></span></div>
      <div class="art-mini-card">${icon('trophy', 18)} <span>+10 XP</span><i></i></div>
      <div class="art-orb orb-one">✦</div><div class="art-orb orb-two">✳</div>
    </div>
  </section>`;
}

function stats() {
  const draftCount = draftStats().drafts;
  const items = [
    { key: 'statsGames', icon: 'gamepad', color: 'turquoise' },
    { key: 'statsPublished', icon: 'trophy', color: 'gold' },
    { key: 'statsStudents', icon: 'users', color: 'blue' },
    { key: 'statsGroups', icon: 'layers', color: 'purple' },
  ];
  return `<div class="stats-grid">${items.map(item => `<article class="stat-card"><span class="stat-icon ${item.color}">${icon(item.icon, 22)}</span><span class="stat-label">${t(item.key)}</span><div class="stat-bottom"><strong>${item.key === 'statsGames' ? draftCount : 0}</strong><span>${item.key === 'statsGames' && draftCount ? t('localDrafts') : t('zeroCaption')}</span></div></article>`).join('')}</div>`;
}

function patternCards(max = 9) {
  return Array.from({ length: max }, (_, i) => `<button class="pattern-card" type="button" data-pattern="${i}" data-pattern-card data-searchtext="${escapeHtml((t(`pattern${i}`) + ' ' + t(`patternDesc${i}`)).toLocaleLowerCase())}"><span class="pattern-emoji ${patternColors[i]}">${patternIcons[i]}</span><span class="pattern-info"><b>${t(`pattern${i}`)}</b><small>${t(`patternDesc${i}`)}</small></span>${icon('arrow', 17)}</button>`).join('');
}

function dashboard() {
  return `<div class="page-heading"><div><p class="kicker">${t('appCaption')}</p><h1>${t('welcome')}</h1><p>${t('welcomeText')}</p></div><span class="page-date">${icon('sparkles', 15)} ${t('demo')}</span></div>
  ${hero()}${stats()}
  <div class="dashboard-columns"><section class="panel recent-panel"><div class="panel-heading"><div><h3>${t('recentTitle')}</h3><p>${t('recentCaption')}</p></div><button class="text-link" type="button" data-nav="library">${t('library')} ${icon('arrow', 16)}</button></div>
    ${draftCountOrEmpty()}
  </section><section class="panel steps-panel"><div class="panel-heading"><div><h3>${t('startTitle')}</h3><p>${t('startCaption')}</p></div><span class="step-count">2 / 4</span></div>
    <ol class="steps-list"><li class="is-done"><span class="step-mark">${icon('check', 17)}</span><span><b>${t('stepOne')}</b><small>${t('done')}</small></span></li><li class="is-done"><span class="step-mark">${icon('check', 17)}</span><span><b>${t('stepTwo')}</b><small>${t('done')}</small></span></li><li><span class="step-mark">3</span><span><b>${t('stepThree')}</b><small>${t('upcoming')}</small></span></li><li><span class="step-mark">4</span><span><b>${t('stepFour')}</b><small>${t('upcoming')}</small></span></li></ol>
    <div class="steps-progress"><span><i style="width:50%"></i></span><b>50%</b></div></section></div>
  <section class="patterns-preview"><div class="section-heading"><div><span class="section-icon">${icon('layers', 19)}</span><div><h3>${t('patternsTitle')}</h3><p>${t('patternsCaption')}</p></div></div><button class="text-link" type="button" data-nav="patterns">${t('viewAll')} ${icon('arrow', 16)}</button></div><div class="patterns-row">${patternCards(3)}</div></section>
  <div class="teaching-tip"><span class="tip-icon">${icon('sparkles', 21)}</span><div><strong>${t('tipLabel')}</strong><p>${t('tipText')}</p></div><span class="tip-decoration" aria-hidden="true">✳</span></div>`;
}

function draftCountOrEmpty() {
  if (draftStats().drafts) return recentDraftsPage(state.locale);
  return `<div class="empty-games"><div class="empty-illustration"><div class="empty-card-back"></div><div class="empty-card-front">${icon('gamepad', 37)}<span class="empty-plus">+</span></div><span class="empty-star">✦</span></div><h4>${t('emptyGames')}</h4><p>${t('emptyGamesText')}</p><button class="button button-primary" type="button" data-nav="studio">${t('startCreating')} ${icon('arrow', 17)}</button></div>`;
}

const sectionIds = {
  studio: ['studioTitle', 'studioText', 'gamepad', 'studioPhase'],
  library: ['libraryTitle', 'libraryText', 'library', 'soonStatus'],
  students: ['studentsTitle', 'studentsText', 'users', 'soonStatus'],
  groups: ['groupsTitle', 'groupsText', 'layers', 'soonStatus'],
  reports: ['reportsTitle', 'reportsText', 'chart', 'soonStatus'],
  live: ['liveTitle', 'liveText', 'bolt', 'soonStatus'],
};

function placeholderPage(id) {
  const [title, description, sectionIcon, status] = sectionIds[id];
  return `<div class="page-heading"><div><p class="kicker">${t('teacher')}</p><h1>${t(title)}</h1><p>${t(description)}</p></div><span class="status-pill">${icon('clock', 15)} ${t(status)}</span></div>
    <div class="placeholder-panel"><div class="placeholder-graphic"><span class="placeholder-ring ring-outer"></span><span class="placeholder-ring ring-inner"></span><span class="placeholder-icon">${icon(sectionIcon, 48)}</span><span class="placeholder-star">✦</span></div><h2>${t('notReady')}</h2><p>${t('featureText')}</p><span class="development-badge">${icon('lock', 15)} ${t('frontEndOnly')}</span><button type="button" class="button button-primary" data-nav="dashboard">${icon('dashboard', 17)} ${t('dashboard')}</button></div>`;
}

function patternsPage() {
  return `<div class="page-heading"><div><p class="kicker">${t('explorePatterns')}</p><h1>${t('patternsPageTitle')}</h1><p>${t('patternsPageText')}</p></div><span class="status-pill">${icon('layers', 16)} 9 ${t('allPatterns')}</span></div>
    <div class="pattern-catalog-top"><div><h3>${t('allPatterns')}</h3><p>${t('patternStatus')}</p></div><span class="catalog-count">09</span></div>
    <div class="pattern-catalog" id="pattern-catalog">${patternCards(9)}</div><p class="no-patterns" id="no-patterns" hidden>${t('noPatterns')}</p>`;
}

function settingsPage() {
  const colors = [
    ['#FFF9EF', 'Warm ivory'], ['#173A43', 'Deep teal'], ['#23AAA1', 'Turquoise'], ['#F4C75B', 'Soft gold'],
  ];
  return `<div class="page-heading"><div><p class="kicker">${t('appCaption')}</p><h1>${t('settingsTitle')}</h1><p>${t('settingsText')}</p></div></div>
    <section class="settings-grid"><div class="panel settings-panel"><h3>${t('settingsColors')}</h3><div class="swatches">${colors.map(([hex, label]) => `<div class="swatch"><span style="background:${hex}"></span><b>${label}</b><code>${hex}</code></div>`).join('')}</div></div>
    <div class="panel settings-panel"><h3>${t('settingsLang')}</h3><p>${t('currentLanguage')}</p><button class="button button-primary" type="button" data-action="language">${icon('globe', 18)} ${t('language')}</button><div class="settings-note">${icon('help', 17)} ${t('frontEndOnly')}</div></div></section>`;
}

function patternDialog() {
  if (state.selectedPattern === null) return '';
  const i = state.selectedPattern;
  return `<div class="modal-backdrop"><div class="pattern-modal" role="dialog" aria-modal="true" aria-labelledby="modal-title"><button type="button" class="icon-button modal-close" data-action="close-pattern" aria-label="${t('close')}">${icon('close', 20)}</button><span class="modal-pattern-icon ${patternColors[i]}">${patternIcons[i]}</span><span class="development-badge">${t('tagNew')}</span><h2 id="modal-title">${t(`pattern${i}`)}</h2><h3>${t('patternDetails')}</h3><p>${t(`patternDesc${i}`)}</p><div class="modal-coming">${icon('clock', 18)} ${t('patternStatus')}</div><button type="button" class="button button-primary" data-action="close-pattern">${t('close')}</button></div></div>`;
}

function render() {
  const direction = state.locale === 'ar' ? 'rtl' : 'ltr';
  document.documentElement.dir = direction;
  document.documentElement.lang = state.locale;
  document.title = `${t(state.page)} | Arabic Light Academy`;
  const main = state.page === 'dashboard' ? dashboard() : state.page === 'studio' ? studioPage(state.locale) : state.page === 'library' ? libraryPage(state.locale) : state.page === 'patterns' ? patternsPage() : state.page === 'settings' ? settingsPage() : placeholderPage(state.page);
  app.innerHTML = `<div class="shell">${sidebar()}<div class="main-area">${topbar()}<main class="content" id="main-content">${main}<footer class="main-footer"><span>${t('footer')}</span><span>${t('product')} · v0.2</span></footer></main></div></div>${state.mobileOpen ? '<button class="mobile-overlay" aria-label="Close navigation" data-action="menu"></button>' : ''}${patternDialog()}${editorOverlay(state.locale)}<div class="toast" id="toast" role="status" aria-live="polite"></div>`;
  applyPatternFilter();
}

function applyPatternFilter() {
  const cards = [...document.querySelectorAll('[data-pattern-card]')];
  if (!cards.length) return;
  const query = state.page === 'patterns' ? state.query.trim().toLocaleLowerCase() : '';
  let visible = 0;
  for (const card of cards) {
    const match = !query || (card.dataset.searchtext || '').includes(query);
    card.hidden = !match;
    if (match) visible += 1;
  }
  const empty = document.getElementById('no-patterns');
  if (empty) empty.hidden = visible !== 0;
}

function navigate(id) {
  if (!navigation.some(item => item.id === id)) return;
  state.page = id;
  state.mobileOpen = false;
  state.notificationsOpen = false;
  state.selectedPattern = null;
  state.query = id === 'patterns' ? state.query : '';
  const hash = `#/${id}`;
  if (location.hash !== hash) location.hash = hash;
  render();
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function toast(message) {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = message;
  el.classList.add('is-visible');
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove('is-visible'), 3200);
}

document.addEventListener('click', event => {
  if (event.target.matches('.modal-backdrop')) { state.selectedPattern = null; render(); return; }
  const nav = event.target.closest('[data-nav]');
  if (nav) { navigate(nav.dataset.nav); return; }
  const pattern = event.target.closest('[data-pattern]');
  if (pattern) { state.selectedPattern = Number(pattern.dataset.pattern); render(); return; }
  const actionEl = event.target.closest('[data-action]');
  if (!actionEl) return;
  switch (actionEl.dataset.action) {
    case 'menu': state.mobileOpen = !state.mobileOpen; render(); break;
    case 'language':
      state.locale = state.locale === 'ar' ? 'en' : 'ar';
      state.query = '';
      safeSet('ala-games-locale', state.locale);
      render(); break;
    case 'notifications': state.notificationsOpen = !state.notificationsOpen; render(); break;
    case 'new-game': newDraft(state.locale); navigate('studio'); break;
    case 'close-pattern': state.selectedPattern = null; render(); break;
  }
});

document.addEventListener('input', event => {
  if (!event.target.matches('[data-search-input]')) return;
  state.query = event.target.value;
  applyPatternFilter();
});

document.addEventListener('submit', event => {
  if (event.target.id !== 'global-search-form') return;
  event.preventDefault();
  navigate('patterns');
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    if (state.selectedPattern !== null || state.notificationsOpen || state.mobileOpen) {
      state.selectedPattern = null;
      state.notificationsOpen = false;
      state.mobileOpen = false;
      render();
    }
  }
});

window.addEventListener('hashchange', () => {
  state.page = currentPage();
  state.mobileOpen = false;
  render();
});

render();
registerEditorEvents({ refresh: render, go: navigate, toast, locale: () => state.locale });
