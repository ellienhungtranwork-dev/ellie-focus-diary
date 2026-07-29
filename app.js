/* ==========================================================================
   Ellie's Focus Diary 🌸 - Full App Logic JavaScript (English)
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'ellie_focus_diary_state_v7';

  const TODAY_STR = new Date().toISOString().split('T')[0];

  const BEAUTY_SPOTS = [
    {
      name: 'Kyoto Cherry Blossoms, Japan',
      image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1800&q=85',
      fact: 'Kyoto is the heart of Japanese tradition, home to over 1,600 Buddhist temples and iconic Sakura cherry blossoms along the Philosopher’s Path in spring.',
      query: 'Kyoto+Japan+travel+scenery'
    },
    {
      name: 'Santorini Island, Greece',
      image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&w=1800&q=85',
      fact: 'Perched on Aegean volcanic cliffs, Santorini is famous for whitewashed houses, blue-domed churches, and breathtaking Mediterranean sunsets.',
      query: 'Santorini+Greece+scenery+travel'
    },
    {
      name: 'Yosemite National Park, California',
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1800&q=85',
      fact: 'Known for towering granite cliffs like El Capitan, ancient giant sequoias, and dramatic waterfalls cascading into pristine wilderness.',
      query: 'Yosemite+National+Park+California'
    },
    {
      name: 'Amalfi Coast, Italy',
      image: 'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?auto=format&fit=crop&w=1800&q=85',
      fact: 'A UNESCO World Heritage coastline featuring pastel-colored fishing villages clings dramatically to steep Mediterranean cliffs.',
      query: 'Amalfi+Coast+Italy+travel'
    },
    {
      name: 'Paris Eiffel Tower, France',
      image: 'https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&w=1800&q=85',
      fact: 'The City of Light boasts romantic Haussmann boulevards, world-class art museums, and the iconic 330-meter lattice Eiffel Tower.',
      query: 'Paris+France+travel+insights'
    },
    {
      name: 'Hallstatt & Swiss Alps, Austria',
      image: 'https://images.unsplash.com/photo-1530122037265-a5f1f91d3b99?auto=format&fit=crop&w=1800&q=85',
      fact: 'Nestled between steep alpine peaks and a crystal mirror lake, Hallstatt is considered one of Europe’s most fairy-tale lake villages.',
      query: 'Hallstatt+Austria+scenery+travel'
    }
  ];

  const INSPIRATIONAL_QUOTES = [
    { quote: '"Do something today that your future self will thank you for."', author: 'Mindful Focus Reflection' },
    { quote: '"Focus on progress, not perfection. Every small step counts!"', author: 'Ellie’s Daily Affirmation' },
    { quote: '"Your potential is endless. Keep building and trust the journey."', author: 'Deep Work Philosophy' },
    { quote: '"Deep work is the superpower of the 21st century."', author: 'Cal Newport' },
    { quote: '"Small daily improvements over time lead to stunning results."', author: 'Robin Sharma' },
    { quote: '"Believe you can and you are halfway there."', author: 'Theodore Roosevelt' }
  ];

  let state = {
    lastActiveDate: TODAY_STR,
    dailyContext: {
      energyLevel: 'High',
      goals: [
        'Send strategy contract to Elyx',
        'Outreach to 2 new BD leads',
        'Complete 30-min evening wellness'
      ],
      hardDeadlines: [
        { id: 'dl_1', title: 'Weekly Plan Meeting with Boss', time: '10:30' },
        { id: 'dl_2', title: 'Submit Milestone Report to Client A', time: '15:00' }
      ]
    },
    tasks: [
      {
        id: 'task_demo_1',
        date: TODAY_STR,
        shift: 'morning',
        project: 'Career OS',
        title: 'Send contract to Elyx',
        goal: '1 contract sent',
        details: 'Review deliverables section before emailing',
        category: 'Career/Work',
        cognitiveLoad: 'Brain-heavy',
        priority: 'P1',
        startTime: '09:00',
        endTime: '09:45',
        durationPlannedMin: 45,
        focusMinsDone: 45,
        status: 'completed',
        output: 'Contract PDF generated and sent via email',
        linkOutput: 'https://docs.google.com/document/d/demo',
        fileOutput: '',
        distractions: [
          { type: 'External', note: 'Boss call regarding Q3 headcount', duration_min: 10, timestamp: `${TODAY_STR} 09:20` }
        ]
      },
      {
        id: 'task_demo_2',
        date: TODAY_STR,
        shift: 'morning',
        project: 'Outreach',
        title: 'BD Email Outreach (2 leads)',
        goal: 'Send 2 tailored proposals',
        details: 'Attach PDF deck',
        category: 'Career/Work',
        cognitiveLoad: 'Routine',
        priority: 'P2',
        startTime: '10:00',
        endTime: '10:25',
        durationPlannedMin: 25,
        focusMinsDone: 25,
        status: 'completed',
        output: 'Sent 2 emails with proposal deck attached',
        linkOutput: '',
        fileOutput: '',
        distractions: [
          { type: 'Internal', note: 'Checked Instagram notifications', duration_min: 5, timestamp: `${TODAY_STR} 10:15` }
        ]
      },
      {
        id: 'task_demo_3',
        date: TODAY_STR,
        shift: 'afternoon',
        project: 'Growth',
        title: 'Study AI Productivity Tools',
        goal: 'Summarize top 5 workflow tools',
        details: '',
        category: 'Growth/Study',
        cognitiveLoad: 'Brain-heavy',
        priority: 'P2',
        startTime: '14:00',
        endTime: '14:50',
        durationPlannedMin: 50,
        focusMinsDone: 0,
        status: 'pending',
        output: '',
        linkOutput: '',
        fileOutput: '',
        distractions: []
      }
    ],
    filterPriority: 'all',
    filterCognitive: 'all',
    analyticsDateRange: '7days',
    activeTaskId: null,
    youtubeUrl: 'https://www.youtube.com/watch?v=jfKfPfyJRdk',
    geminiApiKey: '',
    customAffirmation: '',
    currentSpotIndex: 0,
    currentQuoteIndex: 0,
    gsheetWebAppUrl: '',
    timer: {
      isRunning: false,
      mode: 'countdown',
      remainingSecs: 45 * 60,
      initialDurationSecs: 45 * 60,
      overtimeSecs: 0,
      alert5MinFired: false
    },
    distractModalTimer: {
      isRunning: false,
      elapsedSecs: 0,
      intervalId: null
    }
  };

  let timerInterval = null;
  let externalPopWindow = null;

  // --- DOM ELEMENTS ---
  const liveClockHHMM = document.getElementById('liveClockHHMM');
  const liveClockSS = document.getElementById('liveClockSS');
  const liveClockAMPM = document.getElementById('liveClockAMPM');
  const liveDateDisplay = document.getElementById('liveDateDisplay');
  const currentShiftBadge = document.getElementById('currentShiftBadge');
  const heroHeaderBg = document.getElementById('heroHeaderBg');
  const changeBgBtn = document.getElementById('changeBgBtn');
  const locationInsightBtn = document.getElementById('locationInsightBtn');

  const tabWorkspaceBtn = document.getElementById('tabWorkspaceBtn');
  const tabAnalyticsBtn = document.getElementById('tabAnalyticsBtn');
  const workspaceView = document.getElementById('workspaceView');
  const analyticsView = document.getElementById('analyticsView');

  const energyBtns = document.querySelectorAll('.energy-btn');
  const dailyGoal1 = document.getElementById('dailyGoal1');
  const dailyGoal2 = document.getElementById('dailyGoal2');
  const dailyGoal3 = document.getElementById('dailyGoal3');

  const hardDeadlinesList = document.getElementById('hardDeadlinesList');
  const addDeadlineBtn = document.getElementById('addDeadlineBtn');
  const aiConsultTriggerBtn = document.getElementById('aiConsultTriggerBtn');

  // Screenshot Auto-fill Elements
  const screenshotAutoFillBtn = document.getElementById('screenshotAutoFillBtn');
  const screenshotModalBackdrop = document.getElementById('screenshotModalBackdrop');
  const closeScreenshotModalBtn = document.getElementById('closeScreenshotModalBtn');
  const cancelScreenshotModalBtn = document.getElementById('cancelScreenshotModalBtn');
  const screenshotDropZone = document.getElementById('screenshotDropZone');
  const screenshotFileInput = document.getElementById('screenshotFileInput');
  const dropZoneContent = document.getElementById('dropZoneContent');
  const screenshotPreviewContainer = document.getElementById('screenshotPreviewContainer');
  const screenshotPreviewImg = document.getElementById('screenshotPreviewImg');
  const removeScreenshotBtn = document.getElementById('removeScreenshotBtn');
  const ocrStatusBar = document.getElementById('ocrStatusBar');
  const ocrStatusText = document.getElementById('ocrStatusText');
  const ocrProgressBar = document.getElementById('ocrProgressBar');
  const ocrResultGrid = document.getElementById('ocrResultGrid');
  const ocrRawTextArea = document.getElementById('ocrRawTextArea');
  const reparseOcrBtn = document.getElementById('reparseOcrBtn');
  const parsedTasksCount = document.getElementById('parsedTasksCount');
  const parsedTasksList = document.getElementById('parsedTasksList');
  const confirmImportTasksBtn = document.getElementById('confirmImportTasksBtn');
  let currentParsedTasks = [];

  // Output Deliverable Proof Elements
  const proofPasteZone = document.getElementById('proofPasteZone');
  const proofFileInput = document.getElementById('proofFileInput');
  const proofPastePlaceholder = document.getElementById('proofPastePlaceholder');
  const proofImagePreview = document.getElementById('proofImagePreview');
  const proofPreviewImg = document.getElementById('proofPreviewImg');
  const removeProofImgBtn = document.getElementById('removeProofImgBtn');
  const taskProofDataInput = document.getElementById('taskProofDataInput');

  // Shifts Lists
  const morningTaskList = document.getElementById('morningTaskList');
  const afternoonTaskList = document.getElementById('afternoonTaskList');
  const eveningTaskList = document.getElementById('eveningTaskList');
  const morningShiftCard = document.getElementById('morningShiftCard');
  const afternoonShiftCard = document.getElementById('afternoonShiftCard');
  const eveningShiftCard = document.getElementById('eveningShiftCard');
  const morningNowBadge = document.getElementById('morningNowBadge');
  const afternoonNowBadge = document.getElementById('afternoonNowBadge');
  const eveningNowBadge = document.getElementById('eveningNowBadge');

  // Filters & Sort
  const filterPrioritySelect = document.getElementById('filterPrioritySelect');
  const filterCognitiveSelect = document.getElementById('filterCognitiveSelect');
  const autoOrderTimeBtn = document.getElementById('autoOrderTimeBtn');
  const sortPriorityBtn = document.getElementById('sortPriorityBtn');
  const analyticsDateRangeSelect = document.getElementById('analyticsDateRangeSelect');

  // Focus Timer Widget
  const activeCategoryBadge = document.getElementById('activeCategoryBadge');
  const activeTaskTitle = document.getElementById('activeTaskTitle');
  const activeTaskGoal = document.getElementById('activeTaskGoal');
  const timerDigits = document.getElementById('timerDigits');
  const timerSubStatus = document.getElementById('timerSubStatus');
  const overtimeBadge = document.getElementById('overtimeBadge');
  const timerProgressCircle = document.getElementById('timerProgressCircle');
  const distractionMiniBar = document.getElementById('distractionMiniBar');
  const miniDistractionMins = document.getElementById('miniDistractionMins');

  const timerPlayPauseBtn = document.getElementById('timerPlayPauseBtn');
  const timerPlayIcon = document.getElementById('timerPlayIcon');
  const timerPauseDistractBtn = document.getElementById('timerPauseDistractBtn');
  const triggerShortBreakBtn = document.getElementById('triggerShortBreakBtn');
  const popoutTimerBtn = document.getElementById('popoutTimerBtn');
  const timerExtendBtn = document.getElementById('timerExtendBtn');
  const timerCompleteBtn = document.getElementById('timerCompleteBtn');
  const extendPillGroup = document.getElementById('extendPillGroup');

  // Inspire Me & Affirmations
  const inspireMeBtn = document.getElementById('inspireMeBtn');
  const inspireQuoteText = document.getElementById('inspireQuoteText');
  const customAffirmationInput = document.getElementById('customAffirmationInput');

  // Music Player
  const toggleMusicBtn = document.getElementById('toggleMusicBtn');
  const youtubeUrlInput = document.getElementById('youtubeUrlInput');
  const musicIframeWrapper = document.getElementById('musicIframeWrapper');
  const lofiAudioFrame = document.getElementById('lofiAudioFrame');

  // Pop-out Floating Window
  const popoutTimerWindow = document.getElementById('popoutTimerWindow');
  const popoutTaskName = document.getElementById('popoutTaskName');
  const popoutDigits = document.getElementById('popoutDigits');
  const popoutPlayPauseBtn = document.getElementById('popoutPlayPauseBtn');
  const popoutPlayIcon = document.getElementById('popoutPlayIcon');
  const popoutFinishBtn = document.getElementById('popoutFinishBtn');
  const closePopoutTimerBtn = document.getElementById('closePopoutTimerBtn');

  // Floating Timer Bar
  const compactFloatingTimer = document.getElementById('compactFloatingTimer');
  const floatingTaskCat = document.getElementById('floatingTaskCat');
  const floatingTaskTitle = document.getElementById('floatingTaskTitle');
  const floatingDigits = document.getElementById('floatingDigits');
  const floatingPlayPauseBtn = document.getElementById('floatingPlayPauseBtn');
  const floatingPlayIcon = document.getElementById('floatingPlayIcon');
  const floatingFinishBtn = document.getElementById('floatingFinishBtn');

  // Modals
  const inspireModalBackdrop = document.getElementById('inspireModalBackdrop');
  const inspireModalQuote = document.getElementById('inspireModalQuote');
  const inspireModalAuthor = document.getElementById('inspireModalAuthor');
  const closeInspireModalBtn = document.getElementById('closeInspireModalBtn');
  const closeInspireModalFooterBtn = document.getElementById('closeInspireModalFooterBtn');
  const nextInspireQuoteBtn = document.getElementById('nextInspireQuoteBtn');

  const congratsModalBackdrop = document.getElementById('congratsModalBackdrop');
  const congratsTaskTitle = document.getElementById('congratsTaskTitle');
  const congratsMeta = document.getElementById('congratsMeta');
  const congratsDeliverableBox = document.getElementById('congratsDeliverableBox');
  const closeCongratsModalBtn = document.getElementById('closeCongratsModalBtn');
  const closeCongratsModalFooterBtn = document.getElementById('closeCongratsModalFooterBtn');

  const locationInsightModalBackdrop = document.getElementById('locationInsightModalBackdrop');
  const locationNameTitle = document.getElementById('locationNameTitle');
  const locationFactDescription = document.getElementById('locationFactDescription');
  const googleSearchLocationBtn = document.getElementById('googleSearchLocationBtn');
  const closeLocationModalBtn = document.getElementById('closeLocationModalBtn');
  const closeLocationModalFooterBtn = document.getElementById('closeLocationModalFooterBtn');

  const breakModalBackdrop = document.getElementById('breakModalBackdrop');
  const closeBreakModalBtn = document.getElementById('closeBreakModalBtn');
  const cancelBreakModalBtn = document.getElementById('cancelBreakModalBtn');
  const startBreakBtn = document.getElementById('startBreakBtn');
  let selectedBreakMins = 5;

  const taskModalBackdrop = document.getElementById('taskModalBackdrop');
  const taskForm = document.getElementById('taskForm');
  const taskModalTitle = document.getElementById('taskModalTitle');
  const closeTaskModalBtn = document.getElementById('closeTaskModalBtn');
  const cancelTaskModalBtn = document.getElementById('cancelTaskModalBtn');

  const distractModalBackdrop = document.getElementById('distractModalBackdrop');
  const closeDistractModalBtn = document.getElementById('closeDistractModalBtn');
  const saveDistractionBtn = document.getElementById('saveDistractionBtn');
  const distractNoteInput = document.getElementById('distractNoteInput');
  const distractTimerDigits = document.getElementById('distractTimerDigits');
  const distractLiveCounterBox = document.getElementById('distractLiveCounterBox');
  const warning30mText = document.getElementById('warning30mText');

  const outputModalBackdrop = document.getElementById('outputModalBackdrop');
  const closeOutputModalBtn = document.getElementById('closeOutputModalBtn');
  const cancelOutputModalBtn = document.getElementById('cancelOutputModalBtn');
  const confirmCompleteTaskBtn = document.getElementById('confirmCompleteTaskBtn');
  const taskFinalOutputInput = document.getElementById('taskFinalOutputInput');
  const taskLinkOutputInput = document.getElementById('taskLinkOutputInput');
  const taskFileOutputInput = document.getElementById('taskFileOutputInput');

  const deadlineModalBackdrop = document.getElementById('deadlineModalBackdrop');
  const deadlineModalTitle = document.getElementById('deadlineModalTitle');
  const deadlineFormId = document.getElementById('deadlineFormId');
  const closeDeadlineModalBtn = document.getElementById('closeDeadlineModalBtn');
  const cancelDeadlineModalBtn = document.getElementById('cancelDeadlineModalBtn');
  const saveDeadlineBtn = document.getElementById('saveDeadlineBtn');
  const deadlineTitleInput = document.getElementById('deadlineTitleInput');
  const deadlineTimeInput = document.getElementById('deadlineTimeInput');

  const aiConsultModalBackdrop = document.getElementById('aiConsultModalBackdrop');
  const closeAiModalBtn = document.getElementById('closeAiModalBtn');
  const closeAiModalFooterBtn = document.getElementById('closeAiModalFooterBtn');
  const applyAiOrderBtn = document.getElementById('applyAiOrderBtn');
  const geminiApiKeyInput = document.getElementById('geminiApiKeyInput');
  const geminiCustomPromptInput = document.getElementById('geminiCustomPromptInput');
  const sendGeminiQueryBtn = document.getElementById('sendGeminiQueryBtn');
  const aiAdviceContentList = document.getElementById('aiAdviceContentList');
  const aiEnergyTitle = document.getElementById('aiEnergyTitle');
  const aiNorthStarSummary = document.getElementById('aiNorthStarSummary');

  const gsheetModalBackdrop = document.getElementById('gsheetModalBackdrop');
  const closeGsheetModalBtn = document.getElementById('closeGsheetModalBtn');
  const gsheetWebAppUrlInput = document.getElementById('gsheetWebAppUrlInput');
  const openGSheetSyncModalBtn = document.getElementById('openGSheetSyncModalBtn');
  const copyGSheetClipboardBtn = document.getElementById('copyGSheetClipboardBtn');
  const confirmSyncGsheetBtn = document.getElementById('confirmSyncGsheetBtn');

  const alertToastNotification = document.getElementById('alertToastNotification');
  const closeToastBtn = document.getElementById('closeToastBtn');

  const exportCsvBtn = document.getElementById('exportCsvBtn');
  const exportJsonBtn = document.getElementById('exportJsonBtn');

  // --- INITIALIZATION ---
  function init() {
    loadState();
    checkNewDayTransition();
    setupLiveClock();
    setupEventListeners();
    renderAll();
    setupScrollAndResizeListeners();
  }

  function saveState() {
    state.lastActiveDate = TODAY_STR;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }

  function loadState() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        state = { ...state, ...parsed };
      } catch (e) {
        console.error('Failed to load state:', e);
      }
    }
  }

  // Automatic New Day Transition Check (Safeguards Past Data)
  function checkNewDayTransition() {
    if (state.lastActiveDate && state.lastActiveDate !== TODAY_STR) {
      state.lastActiveDate = TODAY_STR;
      state.activeTaskId = null;
      saveState();
    }
  }

  // Real-time Shift "NOW" Detector
  function setupLiveClock() {
    function updateClock() {
      const now = new Date();
      let hours = now.getHours();
      const rawHour = hours;
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const seconds = String(now.getSeconds()).padStart(2, '0');
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;

      if (liveClockHHMM) liveClockHHMM.textContent = `${String(hours).padStart(2, '0')} : ${minutes}`;
      if (liveClockSS) liveClockSS.textContent = seconds;
      if (liveClockAMPM) liveClockAMPM.textContent = ampm;

      const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
      if (liveDateDisplay) liveDateDisplay.textContent = now.toLocaleDateString('en-US', options);

      updateRealtimeShiftBadges(rawHour);
    }
    updateClock();
    setInterval(updateClock, 1000);
  }

  function updateRealtimeShiftBadges(currentHour) {
    let activeShift = 'morning';
    if (currentHour >= 5 && currentHour < 12) {
      activeShift = 'morning';
    } else if (currentHour >= 12 && currentHour < 18) {
      activeShift = 'afternoon';
    } else {
      activeShift = 'evening';
    }

    if (currentShiftBadge) {
      currentShiftBadge.textContent = `${activeShift === 'morning' ? '🌅 MORNING' : activeShift === 'afternoon' ? '☀️ AFTERNOON' : '🌙 EVENING'} SHIFT`;
    }

    morningNowBadge.classList.add('hidden');
    afternoonNowBadge.classList.add('hidden');
    eveningNowBadge.classList.add('hidden');

    morningShiftCard.classList.remove('active-shift');
    afternoonShiftCard.classList.remove('active-shift');
    eveningShiftCard.classList.remove('active-shift');

    if (activeShift === 'morning') {
      morningNowBadge.classList.remove('hidden');
      morningShiftCard.classList.add('active-shift');
    } else if (activeShift === 'afternoon') {
      afternoonNowBadge.classList.remove('hidden');
      afternoonShiftCard.classList.add('active-shift');
    } else {
      eveningNowBadge.classList.remove('hidden');
      eveningShiftCard.classList.add('active-shift');
    }
  }

  // --- EVENT LISTENERS ---
  function setupEventListeners() {
    tabWorkspaceBtn.addEventListener('click', () => switchTab('workspace'));
    tabAnalyticsBtn.addEventListener('click', () => switchTab('analytics'));

    // Beauty Spot Switcher & Location Insight
    changeBgBtn.addEventListener('click', () => {
      state.currentSpotIndex = (state.currentSpotIndex + 1) % BEAUTY_SPOTS.length;
      const spot = BEAUTY_SPOTS[state.currentSpotIndex];
      heroHeaderBg.style.backgroundImage = `linear-gradient(180deg, rgba(0,0,0,0.18) 0%, rgba(236,64,122,0.35) 60%, rgba(171,71,188,0.75) 100%), url('${spot.image}')`;
      saveState();
    });

    locationInsightBtn.addEventListener('click', openLocationInsightModal);
    closeLocationModalBtn.addEventListener('click', () => locationInsightModalBackdrop.classList.add('hidden'));
    closeLocationModalFooterBtn.addEventListener('click', () => locationInsightModalBackdrop.classList.add('hidden'));

    [dailyGoal1, dailyGoal2, dailyGoal3].forEach((input, idx) => {
      input.value = (state.dailyContext.goals && state.dailyContext.goals[idx]) || '';
      input.addEventListener('input', () => {
        if (!state.dailyContext.goals) state.dailyContext.goals = ['', '', ''];
        state.dailyContext.goals[idx] = input.value;
        saveState();
      });
    });

    energyBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        energyBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.dailyContext.energyLevel = btn.getAttribute('data-energy');
        saveState();
      });
    });

    // Task Filter & Chronological Auto-Order Event Listeners
    filterPrioritySelect.addEventListener('change', (e) => {
      state.filterPriority = e.target.value;
      renderTasks();
    });

    filterCognitiveSelect.addEventListener('change', (e) => {
      state.filterCognitive = e.target.value;
      renderTasks();
    });

    // Analytics Date Range Selector
    analyticsDateRangeSelect.value = state.analyticsDateRange || '7days';
    analyticsDateRangeSelect.addEventListener('change', (e) => {
      state.analyticsDateRange = e.target.value;
      saveState();
      renderAnalytics();
    });

    // Auto-order tasks from earliest start time to latest
    autoOrderTimeBtn.addEventListener('click', autoOrderTasksByStartTime);

    sortPriorityBtn.addEventListener('click', () => {
      const pOrder = { P1: 1, P2: 2, P3: 3 };
      state.tasks.sort((a, b) => pOrder[a.priority] - pOrder[b.priority]);
      saveState();
      renderTasks();
    });

    // Inspire Me Pop-Up Modal Launcher
    inspireMeBtn.addEventListener('click', openInspireModal);
    closeInspireModalBtn.addEventListener('click', () => inspireModalBackdrop.classList.add('hidden'));
    closeInspireModalFooterBtn.addEventListener('click', () => inspireModalBackdrop.classList.add('hidden'));
    nextInspireQuoteBtn.addEventListener('click', generateInspiringQuote);

    customAffirmationInput.value = state.customAffirmation || '';
    customAffirmationInput.addEventListener('input', () => {
      state.customAffirmation = customAffirmationInput.value;
      saveState();
    });

    // Deadline Add
    addDeadlineBtn.addEventListener('click', () => openDeadlineModal());
    closeDeadlineModalBtn.addEventListener('click', () => deadlineModalBackdrop.classList.add('hidden'));
    cancelDeadlineModalBtn.addEventListener('click', () => deadlineModalBackdrop.classList.add('hidden'));
    saveDeadlineBtn.addEventListener('click', handleSaveDeadline);

    // AI Consult & Gemini Chat
    aiConsultTriggerBtn.addEventListener('click', openAiConsultModal);
    geminiApiKeyInput.value = state.geminiApiKey || '';
    geminiApiKeyInput.addEventListener('change', () => {
      state.geminiApiKey = geminiApiKeyInput.value.trim();
      saveState();
    });

    sendGeminiQueryBtn.addEventListener('click', handleGeminiCustomQuery);

    // Screenshot Auto-fill Event Listeners
    if (screenshotAutoFillBtn) {
      screenshotAutoFillBtn.addEventListener('click', () => {
        resetScreenshotModal();
        screenshotModalBackdrop.classList.remove('hidden');
      });
    }
    if (closeScreenshotModalBtn) closeScreenshotModalBtn.addEventListener('click', () => screenshotModalBackdrop.classList.add('hidden'));
    if (cancelScreenshotModalBtn) cancelScreenshotModalBtn.addEventListener('click', () => screenshotModalBackdrop.classList.add('hidden'));
    
    if (screenshotDropZone) {
      screenshotDropZone.addEventListener('click', (e) => {
        if (e.target.closest('#removeScreenshotBtn')) return;
        screenshotFileInput.click();
      });
      screenshotFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleImageFileSelect(e.target.files[0]);
        }
      });
      screenshotDropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        screenshotDropZone.classList.add('dragover');
      });
      screenshotDropZone.addEventListener('dragleave', () => screenshotDropZone.classList.remove('dragover'));
      screenshotDropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        screenshotDropZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleImageFileSelect(e.dataTransfer.files[0]);
        }
      });
    }

    if (removeScreenshotBtn) {
      removeScreenshotBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetScreenshotModal();
      });
    }

    if (reparseOcrBtn) {
      reparseOcrBtn.addEventListener('click', () => {
        const text = ocrRawTextArea.value || '';
        parseAndDisplayTasks(text);
      });
    }

    if (confirmImportTasksBtn) {
      confirmImportTasksBtn.addEventListener('click', () => {
        if (currentParsedTasks.length === 0) return;
        
        state.tasks.push(...currentParsedTasks);
        saveState();
        renderTasks();
        screenshotModalBackdrop.classList.add('hidden');
        
        alertToastNotification.classList.remove('hidden');
        alertToastNotification.querySelector('h4').textContent = '🎉 Import Tasks Thành Công!';
        alertToastNotification.querySelector('p').innerHTML = `Đã tự động thêm <strong>${currentParsedTasks.length} tasks</strong> từ ảnh chụp màn hình vào Web Focus!`;
        setTimeout(() => alertToastNotification.classList.add('hidden'), 5000);
      });
    }

    // Proof Screenshot Paste Zone Listeners
    if (proofPasteZone) {
      proofPasteZone.addEventListener('click', (e) => {
        if (e.target.closest('#removeProofImgBtn')) return;
        proofFileInput.click();
      });
      proofFileInput.addEventListener('change', (e) => {
        if (e.target.files && e.target.files[0]) {
          handleProofFileSelect(e.target.files[0]);
        }
      });
      proofPasteZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        proofPasteZone.classList.add('dragover');
      });
      proofPasteZone.addEventListener('dragleave', () => proofPasteZone.classList.remove('dragover'));
      proofPasteZone.addEventListener('drop', (e) => {
        e.preventDefault();
        proofPasteZone.classList.remove('dragover');
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
          handleProofFileSelect(e.dataTransfer.files[0]);
        }
      });
    }

    if (removeProofImgBtn) {
      removeProofImgBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        resetProofZone();
      });
    }

    // Short Break Modal
    triggerShortBreakBtn.addEventListener('click', () => breakModalBackdrop.classList.remove('hidden'));
    closeBreakModalBtn.addEventListener('click', () => breakModalBackdrop.classList.add('hidden'));
    cancelBreakModalBtn.addEventListener('click', () => breakModalBackdrop.classList.add('hidden'));

    document.querySelectorAll('.btn-break-duration').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.btn-break-duration').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedBreakMins = parseInt(btn.getAttribute('data-break'), 10);
      });
    });

    startBreakBtn.addEventListener('click', handleStartBreakAndShiftSchedule);

    // POP-OUT STANDALONE ALWAYS-ON-TOP FLOATING WINDOW ACROSS TABS
    popoutTimerBtn.addEventListener('click', launchStandalonePopoutWindow);
    closePopoutTimerBtn.addEventListener('click', () => popoutTimerWindow.classList.add('hidden'));
    popoutPlayPauseBtn.addEventListener('click', toggleTimerPlayPause);
    popoutFinishBtn.addEventListener('click', openOutputModal);

    // Shift Collapsibles
    document.querySelectorAll('.toggle-shift-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const card = e.target.closest('.shift-card');
        const body = card.querySelector('.shift-body');
        const icon = btn.querySelector('i');
        body.classList.toggle('hidden');
        icon.className = body.classList.contains('hidden') ? 'ri-arrow-down-s-line' : 'ri-arrow-up-s-line';
      });
    });

    // Add Task
    document.querySelectorAll('.btn-add-task').forEach(btn => {
      btn.addEventListener('click', () => {
        openAddTaskModal(btn.getAttribute('data-shift'));
      });
    });

    taskForm.addEventListener('submit', handleTaskFormSubmit);
    closeTaskModalBtn.addEventListener('click', closeTaskModal);
    cancelTaskModalBtn.addEventListener('click', closeTaskModal);

    // YouTube URL Input Listener
    youtubeUrlInput.value = state.youtubeUrl || 'https://www.youtube.com/watch?v=jfKfPfyJRdk';
    youtubeUrlInput.addEventListener('change', () => {
      state.youtubeUrl = youtubeUrlInput.value.trim();
      saveState();
      updateYoutubeIframeSrc();
    });

    toggleMusicBtn.addEventListener('click', () => {
      musicIframeWrapper.classList.toggle('hidden');
      updateYoutubeIframeSrc();
    });

    // Timer Controls
    timerPlayPauseBtn.addEventListener('click', toggleTimerPlayPause);
    floatingPlayPauseBtn.addEventListener('click', toggleTimerPlayPause);

    timerPauseDistractBtn.addEventListener('click', openDistractModal);
    timerExtendBtn.addEventListener('click', () => extendPillGroup.classList.toggle('hidden'));
    timerCompleteBtn.addEventListener('click', openOutputModal);
    floatingFinishBtn.addEventListener('click', openOutputModal);

    // Congrats Modal Close
    closeCongratsModalBtn.addEventListener('click', () => congratsModalBackdrop.classList.add('hidden'));
    closeCongratsModalFooterBtn.addEventListener('click', () => congratsModalBackdrop.classList.add('hidden'));

    document.querySelectorAll('.extend-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        extendTimer(parseInt(chip.getAttribute('data-mins'), 10));
        extendPillGroup.classList.add('hidden');
      });
    });

    // Distraction Modal
    closeDistractModalBtn.addEventListener('click', closeDistractModal);
    saveDistractionBtn.addEventListener('click', saveDistractionAndResume);

    // Output Complete Modal
    closeOutputModalBtn.addEventListener('click', () => outputModalBackdrop.classList.add('hidden'));
    cancelOutputModalBtn.addEventListener('click', () => outputModalBackdrop.classList.add('hidden'));
    confirmCompleteTaskBtn.addEventListener('click', confirmCompleteTask);

    // AI Modal
    closeAiModalBtn.addEventListener('click', () => aiConsultModalBackdrop.classList.add('hidden'));
    closeAiModalFooterBtn.addEventListener('click', () => aiConsultModalBackdrop.classList.add('hidden'));
    applyAiOrderBtn.addEventListener('click', applyAiRecommendationOrder);

    // Google Sheets Sync Modal
    openGSheetSyncModalBtn.addEventListener('click', openGsheetModal);
    closeGsheetModalBtn.addEventListener('click', () => gsheetModalBackdrop.classList.add('hidden'));
    copyGSheetClipboardBtn.addEventListener('click', copyGSheetFormattedData);
    confirmSyncGsheetBtn.addEventListener('click', handleSyncToGoogleSheets);

    // Toast Notification
    closeToastBtn.addEventListener('click', () => alertToastNotification.classList.add('hidden'));

    // Export
    exportCsvBtn.addEventListener('click', exportDataAsCSV);
    exportJsonBtn.addEventListener('click', exportDataAsJSON);
  }

  // REAL STANDALONE FLOATING WINDOW (Picture-in-Picture / Standalone Window)
  async function launchStandalonePopoutWindow() {
    popoutTimerWindow.classList.toggle('hidden');

    if ('documentPictureInPicture' in window) {
      try {
        const pipWin = await window.documentPictureInPicture.requestWindow({
          width: 320,
          height: 220
        });

        pipWin.document.body.style.background = '#0f172a';
        pipWin.document.body.style.color = '#ffffff';
        pipWin.document.body.style.fontFamily = "'Plus Jakarta Sans', sans-serif";
        pipWin.document.body.style.margin = '0';
        pipWin.document.body.style.padding = '20px';
        pipWin.document.body.style.textAlign = 'center';

        const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
        const titleText = activeTask ? activeTask.title : 'Ellie Focus Timer';

        pipWin.document.body.innerHTML = `
          <div style="font-size:13px; font-weight:800; color:#ec407a; margin-bottom:6px;">🌸 Ellie Focus Timer</div>
          <div style="font-size:14px; font-weight:700; color:#94a3b8; overflow:hidden; text-overflow:ellipsis; white-space:nowrap;">${escapeHtml(titleText)}</div>
          <div id="pipDigits" style="font-size:48px; font-weight:800; font-family:'Outfit', sans-serif; color:#38bdf8; margin:8px 0;">${timerDigits.textContent}</div>
        `;

        const updatePip = () => {
          const digitsEl = pipWin.document.getElementById('pipDigits');
          if (digitsEl) digitsEl.textContent = timerDigits.textContent;
        };

        const pipInterval = setInterval(updatePip, 1000);
        pipWin.addEventListener('unload', () => clearInterval(pipInterval));
        return;
      } catch (e) {
        console.log('PiP Window fallback to standalone popout window:', e);
      }
    }

    if (!externalPopWindow || externalPopWindow.closed) {
      externalPopWindow = window.open('', 'EllieFocusTimerWindow', 'width=340,height=220,resizable=yes,scrollbars=no');
      if (externalPopWindow) {
        externalPopWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>Ellie Focus Timer 🌸</title>
            <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@800&family=Plus+Jakarta+Sans:wght@700;800&display=swap" rel="stylesheet">
            <style>
              body { background:#0f172a; color:#fff; font-family:'Plus Jakarta Sans', sans-serif; text-align:center; padding:20px; margin:0; }
              .brand { color:#ec407a; font-size:13px; font-weight:800; }
              .title { font-size:14px; color:#94a3b8; font-weight:700; margin-top:4px; overflow:hidden; text-overflow:ellipsis; white-space:nowrap; }
              .digits { font-size:48px; font-weight:800; font-family:'Outfit', sans-serif; color:#38bdf8; margin:10px 0; }
            </style>
          </head>
          <body>
            <div class="brand">🌸 Ellie Focus Timer</div>
            <div class="title" id="popTitle">Focus Session</div>
            <div class="digits" id="popDigits">${timerDigits.textContent}</div>
            <script>
              window.addEventListener('message', (e) => {
                if (e.data.digits) document.getElementById('popDigits').textContent = e.data.digits;
                if (e.data.title) document.getElementById('popTitle').textContent = e.data.title;
              });
            </script>
          </body>
          </html>
        `);
      }
    }
  }

  // Chronological Auto-Order by Start Time
  function autoOrderTasksByStartTime() {
    state.tasks.sort((a, b) => {
      const timeA = a.startTime ? a.startTime : '99:99';
      const timeB = b.startTime ? b.startTime : '99:99';
      return timeA.localeCompare(timeB);
    });

    saveState();
    renderTasks();
  }

  function openInspireModal() {
    generateInspiringQuote();
    inspireModalBackdrop.classList.remove('hidden');
  }

  function generateInspiringQuote() {
    state.currentQuoteIndex = (state.currentQuoteIndex + 1) % INSPIRATIONAL_QUOTES.length;
    const q = INSPIRATIONAL_QUOTES[state.currentQuoteIndex];
    inspireQuoteText.textContent = q.quote;
    inspireModalQuote.textContent = q.quote;
    inspireModalAuthor.textContent = `— ${q.author}`;
  }

  function openLocationInsightModal() {
    const spot = BEAUTY_SPOTS[state.currentSpotIndex];
    locationNameTitle.textContent = spot.name;
    locationFactDescription.textContent = spot.fact;
    googleSearchLocationBtn.href = `https://www.google.com/search?q=${spot.query}`;
    locationInsightModalBackdrop.classList.remove('hidden');
  }

  function handleStartBreakAndShiftSchedule() {
    const breakMins = selectedBreakMins || 5;

    state.tasks.forEach(t => {
      if (t.startTime && t.status !== 'completed') {
        const [h, m] = t.startTime.split(':').map(Number);
        const totalMin = h * 60 + m + breakMins;
        const newH = Math.floor(totalMin / 60) % 24;
        const newM = totalMin % 60;
        t.startTime = `${String(newH).padStart(2, '0')}:${String(newM).padStart(2, '0')}`;
        t.endTime = calculateTaskEndTime(t.startTime, t.durationPlannedMin);
      }
    });

    state.timer.mode = 'break';
    state.timer.remainingSecs = breakMins * 60;
    state.timer.initialDurationSecs = breakMins * 60;
    timerProgressCircle.setAttribute('stroke', '#f59e0b');

    breakModalBackdrop.classList.add('hidden');
    saveState();
    renderAll();
    startTimer();
  }

  function setupScrollAndResizeListeners() {
    function checkFloatingTimer() {
      const isMobile = window.innerWidth <= 900;
      const isScrolledDown = window.scrollY > 400;

      if (state.activeTaskId && (isMobile || isScrolledDown)) {
        compactFloatingTimer.classList.remove('hidden');
      } else {
        compactFloatingTimer.classList.add('hidden');
      }
    }
    window.addEventListener('scroll', checkFloatingTimer);
    window.addEventListener('resize', checkFloatingTimer);
  }

  function getYoutubeVideoId(url) {
    if (!url) return 'jfKfPfyJRdk';
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : 'jfKfPfyJRdk';
  }

  function updateYoutubeIframeSrc(autoplay = false) {
    const videoId = getYoutubeVideoId(state.youtubeUrl || youtubeUrlInput.value);
    const autoPlayParam = autoplay ? '?autoplay=1&enablejsapi=1' : '?enablejsapi=1';
    lofiAudioFrame.src = `https://www.youtube-nocookie.com/embed/${videoId}${autoPlayParam}`;
  }

  function switchTab(tab) {
    if (tab === 'workspace') {
      tabWorkspaceBtn.classList.add('active');
      tabAnalyticsBtn.classList.remove('active');
      workspaceView.classList.remove('hidden');
      analyticsView.classList.add('hidden');
    } else {
      tabAnalyticsBtn.classList.add('active');
      tabWorkspaceBtn.classList.remove('active');
      workspaceView.classList.add('hidden');
      analyticsView.classList.remove('hidden');
      renderAnalytics();
    }
  }

  function renderAll() {
    renderEnergyButtons();
    renderHardDeadlines();
    renderTasks();
    renderActiveTaskWidget();
  }

  function renderEnergyButtons() {
    energyBtns.forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-energy') === state.dailyContext.energyLevel);
    });
  }

  function renderHardDeadlines() {
    hardDeadlinesList.innerHTML = '';
    const dlList = state.dailyContext.hardDeadlines || [];

    if (dlList.length === 0) {
      hardDeadlinesList.innerHTML = `<span style="font-size: 11px; color: #94a3b8;">No mandatory deadlines today</span>`;
      return;
    }

    dlList.forEach(dl => {
      const chip = document.createElement('div');
      chip.className = 'deadline-item-chip' + (dl.completed ? ' completed' : '');
      chip.innerHTML = `
        <div class="deadline-title-group">
          <input type="checkbox" class="deadline-checkbox" data-id="${dl.id}" ${dl.completed ? 'checked' : ''} title="Mark Done" />
          <span class="deadline-title-text ${dl.completed ? 'strike-through' : ''}">${escapeHtml(dl.title)}</span>
        </div>
        <div class="deadline-actions">
          <span class="deadline-time-badge">⏰ ${escapeHtml(dl.time)}</span>
          <button class="btn-dl-action btn-edit-dl" data-id="${dl.id}" title="Edit"><i class="ri-edit-line"></i></button>
          <button class="btn-dl-action btn-delete-dl" data-id="${dl.id}" title="Delete"><i class="ri-delete-bin-line"></i></button>
        </div>
      `;

      chip.querySelector('.deadline-checkbox').addEventListener('change', (e) => {
        dl.completed = e.target.checked;
        saveState();
        renderHardDeadlines();
      });

      chip.querySelector('.btn-edit-dl').addEventListener('click', () => openDeadlineModal(dl));
      chip.querySelector('.btn-delete-dl').addEventListener('click', () => deleteDeadline(dl.id));

      hardDeadlinesList.appendChild(chip);
    });
  }

  function openDeadlineModal(editObj = null) {
    if (editObj) {
      deadlineFormId.value = editObj.id;
      deadlineTitleInput.value = editObj.title;
      deadlineTimeInput.value = editObj.time;
      deadlineModalTitle.innerHTML = `<i class="ri-alarm-warning-fill"></i> Edit Deadline`;
    } else {
      deadlineFormId.value = '';
      deadlineTitleInput.value = '';
      deadlineTimeInput.value = '';
      deadlineModalTitle.innerHTML = `<i class="ri-alarm-warning-fill"></i> Add Mandatory Deadline`;
    }
    deadlineModalBackdrop.classList.remove('hidden');
  }

  function handleSaveDeadline() {
    const id = deadlineFormId.value || 'dl_' + Date.now();
    const title = deadlineTitleInput.value.trim();
    const time = deadlineTimeInput.value;
    if (!title || !time) {
      alert('Please enter title and time!');
      return;
    }
    if (!state.dailyContext.hardDeadlines) state.dailyContext.hardDeadlines = [];
    const existingIdx = state.dailyContext.hardDeadlines.findIndex(d => d.id === id);

    if (existingIdx > -1) {
      state.dailyContext.hardDeadlines[existingIdx] = { id, title, time };
    } else {
      state.dailyContext.hardDeadlines.push({ id, title, time });
    }

    deadlineModalBackdrop.classList.add('hidden');
    saveState();
    renderHardDeadlines();
  }

  function deleteDeadline(id) {
    if (confirm('Delete this deadline?')) {
      state.dailyContext.hardDeadlines = state.dailyContext.hardDeadlines.filter(d => d.id !== id);
      saveState();
      renderHardDeadlines();
    }
  }

  // RENDER TASKS (SHOWING ONLY TODAY'S ACTIVE WORKSPACE TASKS)
  function renderTasks() {
    morningTaskList.innerHTML = '';
    afternoonTaskList.innerHTML = '';
    eveningTaskList.innerHTML = '';

    const shiftCounts = { morning: 0, afternoon: 0, evening: 0 };
    const shiftPoms = { morning: 0, afternoon: 0, evening: 0 };
    const shiftFocusMins = { morning: 0, afternoon: 0, evening: 0 };

    // Workspace shows tasks created today or active pending tasks
    const todayWorkspaceTasks = state.tasks.filter(t => t.date === TODAY_STR || t.status === 'pending');

    todayWorkspaceTasks.forEach((task, index) => {
      if (state.filterPriority !== 'all' && task.priority !== state.filterPriority) return;
      if (state.filterCognitive !== 'all' && task.cognitiveLoad !== state.filterCognitive) return;

      shiftCounts[task.shift]++;
      const pomsNeeded = Math.ceil(task.durationPlannedMin / 25);
      shiftPoms[task.shift] += pomsNeeded;
      shiftFocusMins[task.shift] += task.focusMinsDone || 0;

      const taskEl = createTaskElement(task, index, pomsNeeded);
      if (task.shift === 'morning') morningTaskList.appendChild(taskEl);
      else if (task.shift === 'afternoon') afternoonTaskList.appendChild(taskEl);
      else if (task.shift === 'evening') eveningTaskList.appendChild(taskEl);
    });

    document.getElementById('morningTaskCount').textContent = shiftCounts.morning;
    document.getElementById('morningPoms').textContent = shiftPoms.morning;
    document.getElementById('morningFocusTime').textContent = shiftFocusMins.morning;

    document.getElementById('afternoonTaskCount').textContent = shiftCounts.afternoon;
    document.getElementById('afternoonPoms').textContent = shiftPoms.afternoon;
    document.getElementById('afternoonFocusTime').textContent = shiftFocusMins.afternoon;

    document.getElementById('eveningTaskCount').textContent = shiftCounts.evening;
    document.getElementById('eveningPoms').textContent = shiftPoms.evening;
    document.getElementById('eveningFocusTime').textContent = shiftFocusMins.evening;
  }

  function createTaskElement(task, index, pomsNeeded) {
    const item = document.createElement('div');
    item.className = `task-item ${task.id === state.activeTaskId ? 'active-running' : ''} ${task.status === 'completed' ? 'completed' : ''}`;

    let priorityBadge = '';
    if (task.priority === 'P1') priorityBadge = `<span class="badge badge-p1">P1 Urgent</span>`;
    else if (task.priority === 'P2') priorityBadge = `<span class="badge badge-p2">P2 Deep</span>`;
    else priorityBadge = `<span class="badge badge-p3">P3 Quick</span>`;

    let cognitiveBadge = '';
    if (task.cognitiveLoad === 'Brain-heavy') cognitiveBadge = `<span class="badge badge-brain">🧠 Brain</span>`;

    const calculatedEndTime = calculateTaskEndTime(task.startTime, task.durationPlannedMin);
    const isOvertime = task.focusMinsDone > task.durationPlannedMin;
    const timeStatusClass = isOvertime ? 'time-range-red' : 'time-range-green';

    item.innerHTML = `
      <div class="task-content-left">
        <div>
          <div class="task-badges">
            <span class="badge badge-cat">${escapeHtml(task.category)}</span>
            ${task.project ? `<span class="badge badge-proj">📁 ${escapeHtml(task.project)}</span>` : ''}
            ${cognitiveBadge}
            ${priorityBadge}
            <span class="badge badge-pom">🍅 ${pomsNeeded} pom${pomsNeeded > 1 ? 's' : ''}</span>
            
            <div class="task-timebox-control" title="Set Start Time & End Time">
              <i class="ri-time-line"></i>
              <input type="time" class="inline-start-time-input" data-id="${task.id}" value="${task.startTime || ''}" />
              <span class="${calculatedEndTime ? timeStatusClass : ''}">${calculatedEndTime ? '➔ ' + calculatedEndTime : ''}</span>
            </div>
          </div>
          <div class="task-name">${escapeHtml(task.title)}</div>
          ${task.goal ? `<div class="task-goal-text">🎯 Goal: ${escapeHtml(task.goal)}</div>` : ''}
          ${task.output ? `<div class="task-output-text">✅ Output: ${escapeHtml(task.output)}</div>` : ''}
          ${task.linkOutput ? `<div class="task-output-text">🔗 Link: <a href="${escapeHtml(task.linkOutput)}" target="_blank">${escapeHtml(task.linkOutput)}</a></div>` : ''}
          ${task.fileOutput ? `<div class="task-output-text">📁 File: ${escapeHtml(task.fileOutput)}</div>` : ''}
        </div>
      </div>
      <div class="task-actions-right">
        <span style="font-size: 13px; font-weight: 800; color: #64748b; margin-right: 6px;">${task.durationPlannedMin}m</span>
        <button class="btn-task-action btn-move-up" data-id="${task.id}" title="Move Up"><i class="ri-arrow-up-line"></i></button>
        <button class="btn-task-action btn-move-down" data-id="${task.id}" title="Move Down"><i class="ri-arrow-down-line"></i></button>
        <button class="btn-task-action btn-edit-task" data-id="${task.id}" title="Edit Task"><i class="ri-edit-line"></i></button>
        <button class="btn-task-action btn-delete-task" data-id="${task.id}" title="Delete Task"><i class="ri-delete-bin-line"></i></button>
        ${task.status !== 'completed' ? `
          <button class="btn-play-task" data-id="${task.id}" title="Select Task for Focus">
            <i class="ri-play-fill"></i>
          </button>
        ` : `<i class="ri-checkbox-circle-fill" style="color: #10b981; font-size: 26px;"></i>`}
      </div>
    `;

    const timeInput = item.querySelector('.inline-start-time-input');
    timeInput.addEventListener('change', (e) => {
      task.startTime = e.target.value;
      task.endTime = calculateTaskEndTime(task.startTime, task.durationPlannedMin);
      saveState();
      renderTasks();
    });

    item.querySelector('.btn-move-up').addEventListener('click', () => moveTask(task.id, -1));
    item.querySelector('.btn-move-down').addEventListener('click', () => moveTask(task.id, 1));
    item.querySelector('.btn-edit-task').addEventListener('click', () => editTask(task.id));
    item.querySelector('.btn-delete-task').addEventListener('click', () => deleteTask(task.id));

    const playBtn = item.querySelector('.btn-play-task');
    if (playBtn) playBtn.addEventListener('click', () => selectActiveTask(task.id));

    return item;
  }

  function calculateTaskEndTime(startTimeStr, durationMins) {
    if (!startTimeStr) return '';
    const [h, m] = startTimeStr.split(':').map(Number);
    const startSecs = h * 3600 + m * 60;
    const endSecs = startSecs + durationMins * 60;
    const endH = Math.floor((endSecs / 3600) % 24);
    const endM = Math.floor((endSecs % 3600) / 60);
    return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
  }

  function moveTask(id, delta) {
    const index = state.tasks.findIndex(t => t.id === id);
    if (index < 0) return;
    const targetIndex = index + delta;
    if (targetIndex < 0 || targetIndex >= state.tasks.length) return;
    const temp = state.tasks[index];
    state.tasks[index] = state.tasks[targetIndex];
    state.tasks[targetIndex] = temp;
    saveState();
    renderTasks();
  }

  function deleteTask(id) {
    if (confirm('Delete this task?')) {
      state.tasks = state.tasks.filter(t => t.id !== id);
      if (state.activeTaskId === id) state.activeTaskId = null;
      saveState();
      renderAll();
    }
  }

  function editTask(id) {
    const task = state.tasks.find(t => t.id === id);
    if (!task) return;
    openAddTaskModal(task.shift, task);
  }

  function selectActiveTask(taskId) {
    const task = state.tasks.find(t => t.id === taskId);
    if (!task) return;

    state.activeTaskId = taskId;
    state.timer.initialDurationSecs = task.durationPlannedMin * 60;
    state.timer.remainingSecs = task.durationPlannedMin * 60;
    state.timer.mode = 'countdown';
    state.timer.overtimeSecs = 0;
    state.timer.isRunning = false;
    state.timer.alert5MinFired = false;
    timerProgressCircle.setAttribute('stroke', '#ec407a');

    clearInterval(timerInterval);
    saveState();
    renderAll();
  }

  function renderActiveTaskWidget() {
    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);

    if (!activeTask) {
      activeCategoryBadge.textContent = 'No task selected';
      activeTaskTitle.textContent = 'Select a task to begin';
      activeTaskGoal.textContent = 'Click ▶️ on any task from your shift lists';
      timerDigits.textContent = '25:00';
      floatingDigits.textContent = '25:00';
      popoutDigits.textContent = '25:00';
      popoutTaskName.textContent = 'No task selected';
      timerSubStatus.textContent = '0 pomodoros done';
      overtimeBadge.classList.add('hidden');
      distractionMiniBar.classList.add('hidden');
      updateProgressRing(1);
      return;
    }

    activeCategoryBadge.textContent = activeTask.category.toUpperCase();
    floatingTaskCat.textContent = activeTask.category.toUpperCase();

    activeTaskTitle.textContent = activeTask.title;
    floatingTaskTitle.textContent = activeTask.title;
    popoutTaskName.textContent = activeTask.title;

    activeTaskGoal.textContent = activeTask.goal ? `🎯 Goal: ${activeTask.goal}` : activeTask.details || '';

    const taskDistractions = activeTask.distractions || [];
    const totalDistractMins = taskDistractions.reduce((sum, d) => sum + d.duration_min, 0);

    if (totalDistractMins > 0) {
      distractionMiniBar.classList.remove('hidden');
      miniDistractionMins.textContent = totalDistractMins;
    } else {
      distractionMiniBar.classList.add('hidden');
    }

    renderTimerDigits();
  }

  function renderTimerDigits() {
    let formatted = '25:00';
    if (state.timer.mode === 'countdown' || state.timer.mode === 'break') {
      const mins = Math.floor(state.timer.remainingSecs / 60);
      const secs = state.timer.remainingSecs % 60;
      formatted = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
      timerDigits.textContent = formatted;
      floatingDigits.textContent = formatted;
      popoutDigits.textContent = formatted;
      overtimeBadge.classList.add('hidden');

      const ratio = state.timer.remainingSecs / state.timer.initialDurationSecs;
      updateProgressRing(isNaN(ratio) ? 1 : ratio);
    } else {
      const mins = Math.floor(state.timer.overtimeSecs / 60);
      const secs = state.timer.overtimeSecs % 60;
      formatted = `+${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} overtime`;
      timerDigits.textContent = `00:00`;
      floatingDigits.textContent = `00:00`;
      popoutDigits.textContent = `00:00`;
      overtimeBadge.textContent = formatted;
      overtimeBadge.classList.remove('hidden');
      updateProgressRing(0);
    }

    if (state.timer.isRunning) {
      timerPlayIcon.className = 'ri-pause-fill';
      floatingPlayIcon.className = 'ri-pause-fill';
      popoutPlayIcon.className = 'ri-pause-fill';
    } else {
      timerPlayIcon.className = 'ri-play-fill';
      floatingPlayIcon.className = 'ri-play-fill';
      popoutPlayIcon.className = 'ri-play-fill';
    }

    if (externalPopWindow && !externalPopWindow.closed) {
      const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
      externalPopWindow.postMessage({
        digits: formatted,
        title: activeTask ? activeTask.title : 'Focus Session'
      }, '*');
    }
  }

  function updateProgressRing(fraction) {
    const circle = timerProgressCircle;
    const radius = circle.r.baseVal.value;
    const circumference = 2 * Math.PI * radius;
    circle.style.strokeDasharray = `${circumference} ${circumference}`;
    const offset = circumference - fraction * circumference;
    circle.style.strokeDashoffset = offset;
  }

  function toggleTimerPlayPause() {
    if (!state.activeTaskId && state.timer.mode !== 'break') return;
    if (state.timer.isRunning) pauseTimer();
    else startTimer();
  }

  function startTimer() {
    state.timer.isRunning = true;
    timerPlayIcon.className = 'ri-pause-fill';
    floatingPlayIcon.className = 'ri-pause-fill';
    popoutPlayIcon.className = 'ri-pause-fill';

    musicIframeWrapper.classList.remove('hidden');
    updateYoutubeIframeSrc(true);

    timerInterval = setInterval(() => {
      if (state.timer.mode === 'countdown' || state.timer.mode === 'break') {
        if (state.timer.remainingSecs > 0) {
          state.timer.remainingSecs--;
          if (state.timer.remainingSecs === 300 && !state.timer.alert5MinFired) {
            state.timer.alert5MinFired = true;
            trigger5MinWarning();
          }
        } else {
          state.timer.mode = 'overtime';
          state.timer.overtimeSecs = 0;
          playNotificationSound();
        }
      } else {
        state.timer.overtimeSecs++;
      }
      renderTimerDigits();
    }, 1000);

    saveState();
  }

  function pauseTimer() {
    state.timer.isRunning = false;
    clearInterval(timerInterval);
    timerPlayIcon.className = 'ri-play-fill';
    floatingPlayIcon.className = 'ri-play-fill';
    popoutPlayIcon.className = 'ri-pause-fill';
    saveState();
  }

  function extendTimer(mins) {
    const addSecs = mins * 60;
    if (state.timer.mode === 'overtime') {
      state.timer.mode = 'countdown';
      state.timer.remainingSecs = addSecs;
    } else {
      state.timer.remainingSecs += addSecs;
    }
    state.timer.initialDurationSecs += addSecs;
    renderTimerDigits();
    saveState();
  }

  function trigger5MinWarning() {
    alertToastNotification.classList.remove('hidden');
    play5MinTingChime();
  }

  function play5MinTingChime() {
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc1 = ctx.createOscillator();
      const gain1 = ctx.createGain();
      osc1.type = 'triangle';
      osc1.frequency.setValueAtTime(880, ctx.currentTime);
      gain1.gain.setValueAtTime(0.5, ctx.currentTime);
      gain1.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.6);
      osc1.connect(gain1);
      gain1.connect(ctx.destination);
      osc1.start();
      osc1.stop(ctx.currentTime + 0.6);

      setTimeout(() => {
        const osc2 = ctx.createOscillator();
        const gain2 = ctx.createGain();
        osc2.type = 'sine';
        osc2.frequency.setValueAtTime(1318.51, ctx.currentTime);
        gain2.gain.setValueAtTime(0.6, ctx.currentTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc2.connect(gain2);
        gain2.connect(ctx.destination);
        osc2.start();
        osc2.stop(ctx.currentTime + 0.8);
      }, 150);

    } catch (e) {
      console.log('Audio Context error:', e);
    }
  }

  function playNotificationSound() {
    play5MinTingChime();
  }

  // --- ADD / EDIT TASK MODAL ---
  function openAddTaskModal(shift = 'morning', editTaskObj = null) {
    taskForm.reset();
    if (editTaskObj) {
      document.getElementById('taskFormId').value = editTaskObj.id;
      document.getElementById('taskShiftSelect').value = editTaskObj.shift;
      document.getElementById('taskCategorySelect').value = editTaskObj.category;
      document.getElementById('taskProjectInput').value = editTaskObj.project || '';
      document.getElementById('taskTitleInput').value = editTaskObj.title;
      document.getElementById('taskGoalInput').value = editTaskObj.goal || '';
      document.getElementById('taskDetailsInput').value = editTaskObj.details || '';
      document.getElementById('taskDurationInput').value = editTaskObj.durationPlannedMin;
      document.getElementById('taskCognitiveSelect').value = editTaskObj.cognitiveLoad;
      document.getElementById('taskPrioritySelect').value = editTaskObj.priority;
      taskModalTitle.textContent = `Edit Task (${editTaskObj.title})`;
    } else {
      document.getElementById('taskFormId').value = '';
      document.getElementById('taskShiftSelect').value = shift;
      taskModalTitle.textContent = `Add Task to ${shift.toUpperCase()}`;
    }
    taskModalBackdrop.classList.remove('hidden');
  }

  function closeTaskModal() {
    taskModalBackdrop.classList.add('hidden');
  }

  function handleTaskFormSubmit(e) {
    e.preventDefault();
    const id = document.getElementById('taskFormId').value || 'task_' + Date.now();
    const shift = document.getElementById('taskShiftSelect').value;
    const category = document.getElementById('taskCategorySelect').value;
    const project = document.getElementById('taskProjectInput').value.trim();
    const title = document.getElementById('taskTitleInput').value.trim();
    const goal = document.getElementById('taskGoalInput').value.trim();
    const details = document.getElementById('taskDetailsInput').value.trim();
    const durationPlannedMin = parseInt(document.getElementById('taskDurationInput').value, 10) || 25;
    const cognitiveLoad = document.getElementById('taskCognitiveSelect').value;
    const priority = document.getElementById('taskPrioritySelect').value;

    const existingIndex = state.tasks.findIndex(t => t.id === id);
    const taskObj = {
      id,
      date: TODAY_STR,
      shift,
      project,
      title,
      goal,
      details,
      category,
      cognitiveLoad,
      priority,
      startTime: existingIndex > -1 ? state.tasks[existingIndex].startTime || '' : '',
      endTime: existingIndex > -1 ? state.tasks[existingIndex].endTime || '' : '',
      durationPlannedMin,
      focusMinsDone: 0,
      status: 'pending',
      output: '',
      linkOutput: '',
      fileOutput: '',
      distractions: []
    };

    if (existingIndex > -1) {
      state.tasks[existingIndex] = { ...state.tasks[existingIndex], ...taskObj };
    } else {
      state.tasks.push(taskObj);
    }

    closeTaskModal();
    saveState();
    renderAll();
  }

  // --- DISTRACTION MODAL ---
  function openDistractModal() {
    if (!state.activeTaskId) return;
    pauseTimer();
    distractNoteInput.value = '';
    distractTimerDigits.textContent = '00:00';
    distractLiveCounterBox.classList.remove('warning-red');
    warning30mText.classList.add('hidden');

    state.distractModalTimer.elapsedSecs = 0;
    state.distractModalTimer.isRunning = true;

    clearInterval(state.distractModalTimer.intervalId);
    state.distractModalTimer.intervalId = setInterval(() => {
      state.distractModalTimer.elapsedSecs++;
      const mins = Math.floor(state.distractModalTimer.elapsedSecs / 60);
      const secs = state.distractModalTimer.elapsedSecs % 60;
      distractTimerDigits.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;

      if (state.distractModalTimer.elapsedSecs >= 1800) {
        distractLiveCounterBox.classList.add('warning-red');
        warning30mText.classList.remove('hidden');
      }
    }, 1000);

    distractModalBackdrop.classList.remove('hidden');
  }

  function closeDistractModal() {
    clearInterval(state.distractModalTimer.intervalId);
    distractModalBackdrop.classList.add('hidden');
  }

  function saveDistractionAndResume() {
    const typeRadio = document.querySelector('input[name="distractType"]:checked');
    const distractType = typeRadio ? typeRadio.value : 'External';
    const note = distractNoteInput.value.trim() || 'Paused session';
    const duration_min = Math.ceil(state.distractModalTimer.elapsedSecs / 60) || 1;

    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
    if (activeTask) {
      if (!activeTask.distractions) activeTask.distractions = [];
      const timeStr = new Date().toTimeString().split(' ')[0].substring(0, 5);
      activeTask.distractions.push({
        type: distractType,
        note,
        duration_min,
        timestamp: `${activeTask.date || TODAY_STR} ${timeStr}`
      });
    }

    closeDistractModal();
    saveState();
    renderAll();
    startTimer();
  }

  // --- OUTPUT COMPLETE MODAL & CONGRATS POP-UP ---
  function openOutputModal() {
    if (!state.activeTaskId) return;
    pauseTimer();
    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
    taskFinalOutputInput.value = activeTask.output || '';
    taskLinkOutputInput.value = activeTask.linkOutput || '';
    taskFileOutputInput.value = activeTask.fileOutput || '';
    resetProofZone();
    if (activeTask.proofImage) {
      proofPreviewImg.src = activeTask.proofImage;
      taskProofDataInput.value = activeTask.proofImage;
      proofPastePlaceholder.classList.add('hidden');
      proofImagePreview.classList.remove('hidden');
    }
    outputModalBackdrop.classList.remove('hidden');
  }

  function confirmCompleteTask() {
    const finalOutput = taskFinalOutputInput.value.trim();
    if (!finalOutput) {
      alert('Please fill out the Deliverables Output summary!');
      return;
    }

    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
    if (activeTask) {
      activeTask.status = 'completed';
      activeTask.output = finalOutput;
      activeTask.linkOutput = taskLinkOutputInput.value.trim();
      activeTask.fileOutput = taskFileOutputInput.value.trim();
      activeTask.proofImage = taskProofDataInput.value || '';

      const elapsedSecs = state.timer.initialDurationSecs - state.timer.remainingSecs + state.timer.overtimeSecs;
      activeTask.focusMinsDone = Math.round(elapsedSecs / 60);

      congratsTaskTitle.textContent = activeTask.title;
      congratsMeta.textContent = `You focused for ${activeTask.focusMinsDone || activeTask.durationPlannedMin} minutes on this session!`;
      congratsDeliverableBox.innerHTML = `<span>✅ Deliverable Saved: "${escapeHtml(finalOutput)}"</span>${activeTask.proofImage ? '<br><small>📷 Screenshot Proof Attached</small>' : ''}`;
      congratsModalBackdrop.classList.remove('hidden');
    }

    state.activeTaskId = null;
    outputModalBackdrop.classList.add('hidden');
    saveState();
    renderAll();
  }

  // --- GEMINI AI CONSULT ENGINE ---
  async function openAiConsultModal() {
    const energy = state.dailyContext.energyLevel || 'High';
    const goals = state.dailyContext.goals || [];

    aiEnergyTitle.textContent = `Analysis based on: ${energy} Energy Mode ${energy === 'High' ? '🔥' : energy === 'Medium' ? '⚡' : '🕯️'}`;
    aiNorthStarSummary.textContent = `Top Goals: ${goals.filter(Boolean).join(' | ')}`;

    aiAdviceContentList.innerHTML = `<div style="text-align:center; padding:20px; color:#ec407a;"><i class="ri-loader-4-line ri-spin" style="font-size:26px;"></i><p style="margin-top:8px; font-weight:700;">Connecting to Gemini AI Consultant...</p></div>`;
    aiConsultModalBackdrop.classList.remove('hidden');

    const cleanKey = (state.geminiApiKey || '').trim();
    if (cleanKey) {
      try {
        const geminiAdvice = await callGeminiAiApi(cleanKey, energy, goals, state.tasks, state.dailyContext.hardDeadlines);
        if (geminiAdvice && geminiAdvice.length > 0) {
          renderAdviceCards(geminiAdvice);
          return;
        }
      } catch (e) {
        console.error('Gemini API Call error:', e);
      }
    }

    const recommendations = generateAiRecommendations(energy);
    renderAdviceCards(recommendations);
  }

  async function handleGeminiCustomQuery() {
    const query = geminiCustomPromptInput.value.trim();
    if (!query) return;
    const cleanKey = (state.geminiApiKey || '').trim();

    aiAdviceContentList.innerHTML = `<div style="text-align:center; padding:20px; color:#ec407a;"><i class="ri-loader-4-line ri-spin" style="font-size:26px;"></i><p style="margin-top:8px; font-weight:700;">Gemini AI is thinking...</p></div>`;

    if (cleanKey) {
      try {
        const customResponse = await callGeminiCustomQueryApi(cleanKey, query, state.tasks);
        if (customResponse) {
          aiAdviceContentList.innerHTML = `
            <div class="advice-step-card" style="border-left: 4px solid #ab47bc; background: #f3e5f5;">
              <h5 style="color: #7b1fa2;"><i class="ri-sparkles-line"></i> Gemini AI Answer:</h5>
              <p style="margin-top:6px; color: #2d3748; font-weight: 700; font-size:14px;">${escapeHtml(customResponse)}</p>
            </div>
          `;
          return;
        }
      } catch (e) {
        console.error('Custom Gemini query error:', e);
      }
    }

    const fallbackAnswer = generateSmartFallbackQueryAnswer(query);
    aiAdviceContentList.innerHTML = `
      <div class="advice-step-card" style="border-left: 4px solid #ec407a; background: #fff5f8;">
        <h5 style="color: #ec407a;"><i class="ri-sparkles-fill"></i> Smart Productivity Recommendation:</h5>
        <p style="margin-top:6px; color: #2d3748; font-weight: 700; font-size:14px;">${escapeHtml(fallbackAnswer)}</p>
      </div>
    `;
  }

  function generateSmartFallbackQueryAnswer(query) {
    const pendingP1 = state.tasks.find(t => t.priority === 'P1' && t.status !== 'completed');
    if (pendingP1) {
      return `For maximum productivity today, start immediately with your P1 Urgent task: "${pendingP1.title}". Completing this frog early will give you momentum for the rest of the day!`;
    }
    return `Start by tackling your highest cognitive load task during your morning peak energy window, followed by 5-minute short breaks to sustain focus.`;
  }

  async function callGeminiCustomQueryApi(apiKey, query, tasks) {
    const promptText = `User query: "${query}". Context: Current tasks are ${JSON.stringify(tasks.map(t => ({ title: t.title, priority: t.priority, shift: t.shift })))}. Give a concise, encouraging, and actionable answer in 2-3 sentences.`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
    });
    const data = await response.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || null;
  }

  async function callGeminiAiApi(apiKey, energy, goals, tasks, deadlines) {
    const promptText = `Act as an expert productivity consultant for Ellie. Energy level today: ${energy}. Top goals: ${JSON.stringify(goals)}. Hard deadlines: ${JSON.stringify(deadlines)}. Tasks: ${JSON.stringify(tasks.map(t => ({ title: t.title, priority: t.priority, cognitiveLoad: t.cognitiveLoad, duration: t.durationPlannedMin })))}. Provide 3 strategic, step-by-step recommendations on how to structure the day across Morning, Afternoon, Evening shifts. Format output strictly as a JSON array of objects with fields "title" and "rationale".`;
    
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: [{ parts: [{ text: promptText }] }] })
    });
    
    const data = await response.json();
    const textOutput = data.candidates?.[0]?.content?.parts?.[0]?.text;
    if (textOutput) {
      const jsonMatch = textOutput.match(/\[.*\]/s);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
    }
    return null;
  }

  function renderAdviceCards(recommendations) {
    aiAdviceContentList.innerHTML = '';
    recommendations.forEach((rec, idx) => {
      const card = document.createElement('div');
      card.className = 'advice-step-card';
      card.innerHTML = `
        <h5>Step ${idx + 1}: ${escapeHtml(rec.title)}</h5>
        <p>${escapeHtml(rec.rationale)}</p>
      `;
      aiAdviceContentList.appendChild(card);
    });
  }

  function generateAiRecommendations(energy) {
    const recs = [];
    const pendingTasks = state.tasks.filter(t => t.status !== 'completed');

    if (pendingTasks.length === 0) {
      return [{ title: 'Add New Tasks', rationale: 'No pending tasks found. Add 2-3 tasks to your Morning Shift to begin!' }];
    }

    const hardDeadlines = state.dailyContext.hardDeadlines || [];
    if (hardDeadlines.length > 0) {
      recs.push({
        title: `Prioritize Hard Deadline (${hardDeadlines[0].title})`,
        rationale: `Mandatory deadline set for ${hardDeadlines[0].time} (${hardDeadlines[0].title}). Scheduled first in Morning!`
      });
    }

    if (energy === 'High') {
      const brainHeavy = pendingTasks.find(t => t.cognitiveLoad === 'Brain-heavy' || t.priority === 'P1');
      if (brainHeavy) {
        recs.push({
          title: `Eat That Frog (${brainHeavy.title})`,
          rationale: `Peak cognitive energy detected. Tackle brain-heavy deep work '${brainHeavy.title}' in the Morning Shift!`
        });
      }
    } else {
      const quickWin = pendingTasks.find(t => t.cognitiveLoad === 'Light' || t.priority === 'P3');
      if (quickWin) {
        recs.push({
          title: `Build Momentum with Quick Win (${quickWin.title})`,
          rationale: `Moderate energy mode. Start with a light 25-min win '${quickWin.title}' to build momentum.`
        });
      }
    }

    return recs;
  }

  function applyAiRecommendationOrder() {
    state.tasks.sort((a, b) => {
      const pOrder = { P1: 1, P2: 2, P3: 3 };
      return pOrder[a.priority] - pOrder[b.priority];
    });

    let startHour = 9;
    let startMin = 0;

    state.tasks.forEach(task => {
      const startTimeStr = `${String(startHour).padStart(2, '0')}:${String(startMin).padStart(2, '0')}`;
      task.startTime = startTimeStr;
      task.endTime = calculateTaskEndTime(startTimeStr, task.durationPlannedMin);

      const totalNextMin = startHour * 60 + startMin + task.durationPlannedMin + 5;
      startHour = Math.floor(totalNextMin / 60);
      startMin = totalNextMin % 60;
    });

    aiConsultModalBackdrop.classList.add('hidden');
    saveState();
    renderAll();
  }

  // --- GOOGLE SHEETS SYNC MODAL ---
  function openGsheetModal() {
    gsheetWebAppUrlInput.value = state.gsheetWebAppUrl || '';
    gsheetModalBackdrop.classList.remove('hidden');
  }

  async function handleSyncToGoogleSheets() {
    const webAppUrl = gsheetWebAppUrlInput.value.trim();
    if (!webAppUrl) {
      alert('Please enter your Google Apps Script Web App Endpoint URL!');
      return;
    }

    state.gsheetWebAppUrl = webAppUrl;
    saveState();

    try {
      await fetch(webAppUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        mode: 'no-cors',
        body: JSON.stringify({
          date: TODAY_STR,
          tasks: state.tasks
        })
      });

      alert('⚡ Sync request sent to Google Sheet! Check your Google Sheet to verify appended rows.');
      gsheetModalBackdrop.classList.add('hidden');
    } catch (e) {
      alert('Sync failed: ' + e.message);
    }
  }

  // --- ANALYTICS RENDER (MULTIDATE PERMANENT RETENTION & FILTER) ---
  function renderAnalytics() {
    const range = state.analyticsDateRange || '7days';

    const now = new Date();
    const filteredTasks = state.tasks.filter(t => {
      const taskDate = t.date ? new Date(t.date) : now;
      if (range === 'today') {
        return t.date === TODAY_STR || taskDate.toDateString() === now.toDateString();
      } else if (range === '7days') {
        const diffTime = Math.abs(now - taskDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      } else if (range === '30days') {
        const diffTime = Math.abs(now - taskDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
      }
      return true;
    });

    let totalFocusMins = 0;
    let pomodorosDone = 0;
    let totalDistractMins = 0;
    let totalPlannedMins = 0;
    let usefulDistract = 0;
    let uselessDistract = 0;

    const allDistractionEntries = [];

    const tbody = document.getElementById('dailyLogTbody');
    tbody.innerHTML = '';

    if (filteredTasks.length === 0) {
      tbody.innerHTML = `<tr><td colspan="10" class="empty-table-text">No tasks recorded for this date range</td></tr>`;
    }

    filteredTasks.forEach(t => {
      totalFocusMins += t.focusMinsDone || 0;
      totalPlannedMins += t.durationPlannedMin || 0;
      if (t.status === 'completed') pomodorosDone++;

      const taskDistracts = t.distractions || [];
      taskDistracts.forEach(d => {
        totalDistractMins += d.duration_min;
        if (d.type === 'External') usefulDistract += d.duration_min;
        else uselessDistract += d.duration_min;

        allDistractionEntries.push({
          timestamp: d.timestamp || t.date || TODAY_STR,
          taskTitle: t.title,
          type: d.type,
          duration_min: d.duration_min,
          note: d.note
        });
      });

      const timeRangeStr = t.startTime && t.endTime ? `${t.startTime} - ${t.endTime}` : '-';

      const row = document.createElement('tr');
      row.innerHTML = `
        <td><strong>${t.date || TODAY_STR}</strong></td>
        <td>${t.shift.toUpperCase()}</td>
        <td><span class="badge badge-cat">${escapeHtml(t.category)}</span></td>
        <td><strong>${escapeHtml(t.project || '-')}</strong></td>
        <td><strong>${escapeHtml(t.title)}</strong><br><small style="color: #64748b;">${escapeHtml(t.goal || '')}</small></td>
        <td>${timeRangeStr}</td>
        <td>
          ${escapeHtml(t.output || '-')}
          ${t.linkOutput ? `<br><a href="${escapeHtml(t.linkOutput)}" target="_blank">🔗 Link</a>` : ''}
          ${t.fileOutput ? `<br><small>📁 ${escapeHtml(t.fileOutput)}</small>` : ''}
        </td>
        <td>${t.focusMinsDone || 0}m / ${t.durationPlannedMin}m</td>
        <td>${taskDistracts.reduce((sum, d) => sum + d.duration_min, 0)}m</td>
        <td>${t.status === 'completed' ? '<span class="badge badge-p3">Done</span>' : '<span class="badge badge-p2">Pending</span>'}</td>
      `;
      tbody.appendChild(row);
    });

    document.getElementById('metricTotalFocusMins').textContent = totalFocusMins;
    document.getElementById('metricPomodorosDone').textContent = pomodorosDone;
    document.getElementById('metricDistractionMins').textContent = totalDistractMins;

    const ratio = totalPlannedMins > 0 ? Math.round(((totalFocusMins - totalDistractMins) / totalPlannedMins) * 100) : 100;
    document.getElementById('metricEfficiencyRatio').textContent = `${Math.max(0, ratio)}%`;

    document.getElementById('usefulDistractMins').innerHTML = `${usefulDistract} <span class="unit">mins</span>`;
    document.getElementById('uselessDistractMins').innerHTML = `${uselessDistract} <span class="unit">mins</span>`;

    renderDistractionsLogTable(allDistractionEntries);
  }

  function renderDistractionsLogTable(entries) {
    const tbody = document.getElementById('distractionLogTbody');
    tbody.innerHTML = '';

    if (entries.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5" class="empty-table-text">No distractions recorded for this date range 🎉</td></tr>`;
      return;
    }

    entries.sort((a, b) => (b.timestamp || '').localeCompare(a.timestamp || ''));

    entries.forEach(item => {
      const row = document.createElement('tr');
      const isExternal = item.type === 'External';
      const typeBadge = isExternal 
        ? `<span class="badge" style="background:#d1fae5; color:#047857;">🟢 External / Urgent</span>` 
        : `<span class="badge" style="background:#fee2e2; color:#b91c1c;">🔴 Internal / Mindless</span>`;

      row.innerHTML = `
        <td><strong>${escapeHtml(item.timestamp)}</strong></td>
        <td><strong>${escapeHtml(item.taskTitle)}</strong></td>
        <td>${typeBadge}</td>
        <td><strong style="color:${isExternal ? '#047857' : '#b91c1c'}">${item.duration_min} mins</strong></td>
        <td>${escapeHtml(item.note || 'No note entered')}</td>
      `;
      tbody.appendChild(row);
    });
  }

  function copyGSheetFormattedData() {
    const headers = ['Date', 'Shift', 'Category', 'Project', 'Task Title', 'Task Goal', 'Start-End Time', 'Output Deliverable', 'Link Output', 'File Attachment', 'Planned Mins', 'Actual Focus Mins', 'Distraction Mins', 'Status'];
    const rows = state.tasks.map(t => [
      t.date || TODAY_STR,
      t.shift,
      t.category,
      t.project || '',
      t.title,
      t.goal || '',
      t.startTime && t.endTime ? `${t.startTime}-${t.endTime}` : '',
      t.output || '',
      t.linkOutput || '',
      t.fileOutput || '',
      t.durationPlannedMin,
      t.focusMinsDone || 0,
      (t.distractions || []).reduce((sum, d) => sum + d.duration_min, 0),
      t.status
    ]);

    const tsvContent = [headers.join('\t'), ...rows.map(r => r.join('\t'))].join('\n');
    navigator.clipboard.writeText(tsvContent).then(() => {
      alert('✅ Raw data copied to clipboard! Open Google Sheets and press Ctrl + V to paste.');
    }).catch(err => {
      console.error('Clipboard copy failed:', err);
    });
  }

  function exportDataAsCSV() {
    const headers = ['Date', 'Shift', 'Category', 'Project', 'Task Title', 'Task Goal', 'Start Time', 'End Time', 'Planned Mins', 'Actual Focus Mins', 'Distraction Mins', 'Output Deliverable', 'Link Output', 'File Output', 'Status'];
    const rows = state.tasks.map(t => [
      t.date || TODAY_STR,
      t.shift,
      t.category,
      `"${(t.project || '').replace(/"/g, '""')}"`,
      `"${(t.title || '').replace(/"/g, '""')}"`,
      `"${(t.goal || '').replace(/"/g, '""')}"`,
      t.startTime || '',
      t.endTime || '',
      t.durationPlannedMin,
      t.focusMinsDone || 0,
      (t.distractions || []).reduce((sum, d) => sum + d.duration_min, 0),
      `"${(t.output || '').replace(/"/g, '""')}"`,
      `"${(t.linkOutput || '').replace(/"/g, '""')}"`,
      `"${(t.fileOutput || '').replace(/"/g, '""')}"`,
      t.status
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const link = document.createElement('a');
    link.setAttribute('href', encodeURI(csvContent));
    link.setAttribute('download', `ellie_focus_diary_raw_data_${TODAY_STR}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function exportDataAsJSON() {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(state, null, 2));
    const link = document.createElement('a');
    link.setAttribute('href', dataStr);
    link.setAttribute('download', `ellie_focus_diary_backup_${TODAY_STR}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  // Global Clipboard Paste Listener (Ctrl + V)
  document.addEventListener('paste', (e) => {
    if (!e.clipboardData || !e.clipboardData.items) return;
    const items = e.clipboardData.items;
    for (let i = 0; i < items.length; i++) {
      if (items[i].type.indexOf('image') !== -1) {
        const blob = items[i].getAsFile();
        
        // If Output Deliverable modal is open, paste image directly as screenshot proof!
        if (outputModalBackdrop && !outputModalBackdrop.classList.contains('hidden')) {
          handleProofFileSelect(blob);
          e.preventDefault();
          break;
        }

        resetScreenshotModal();
        if (screenshotModalBackdrop) screenshotModalBackdrop.classList.remove('hidden');
        handleImageFileSelect(blob);
        e.preventDefault();
        break;
      }
    }
  });

  function resetProofZone() {
    if (!proofFileInput) return;
    proofFileInput.value = '';
    proofPastePlaceholder.classList.remove('hidden');
    proofImagePreview.classList.add('hidden');
    proofPreviewImg.src = '';
    taskProofDataInput.value = '';
  }

  function handleProofFileSelect(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      proofPreviewImg.src = e.target.result;
      taskProofDataInput.value = e.target.result;
      proofPastePlaceholder.classList.add('hidden');
      proofImagePreview.classList.remove('hidden');
    };
    reader.readAsDataURL(file);
  }

  function resetScreenshotModal() {
    if (!screenshotFileInput) return;
    screenshotFileInput.value = '';
    dropZoneContent.classList.remove('hidden');
    screenshotPreviewContainer.classList.add('hidden');
    screenshotPreviewImg.src = '';
    ocrStatusBar.classList.add('hidden');
    ocrResultGrid.classList.add('hidden');
    ocrRawTextArea.value = '';
    parsedTasksList.innerHTML = '';
    parsedTasksCount.textContent = '0';
    confirmImportTasksBtn.classList.add('hidden');
    currentParsedTasks = [];
  }

  function handleImageFileSelect(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      screenshotPreviewImg.src = e.target.result;
      dropZoneContent.classList.add('hidden');
      screenshotPreviewContainer.classList.remove('hidden');
      runOcrAndParsing(e.target.result);
    };
    reader.readAsDataURL(file);
  }

  async function runOcrAndParsing(imageSource) {
    ocrStatusBar.classList.remove('hidden');
    ocrResultGrid.classList.add('hidden');
    ocrProgressBar.style.width = '15%';
    ocrStatusText.textContent = 'Khởi động máy quét OCR Tesseract...';

    try {
      if (typeof Tesseract !== 'undefined') {
        ocrStatusText.textContent = 'Đang nhận diện chữ tiếng Việt & Anh từ ảnh...';
        ocrProgressBar.style.width = '45%';
        const ret = await Tesseract.recognize(imageSource, 'vie+eng', {
          logger: m => {
            if (m.status === 'recognizing text') {
              const pct = Math.round(m.progress * 100);
              ocrProgressBar.style.width = Math.max(20, pct) + '%';
              ocrStatusText.textContent = `Đang quét OCR (${pct}%)...`;
            }
          }
        });
        
        ocrProgressBar.style.width = '100%';
        ocrStatusText.textContent = 'Quét xong! Đang phân tích danh sách task...';
        const text = ret.data.text || '';
        ocrRawTextArea.value = text;
        
        setTimeout(() => {
          ocrStatusBar.classList.add('hidden');
          parseAndDisplayTasks(text);
        }, 300);
      } else {
        ocrProgressBar.style.width = '100%';
        ocrStatusText.textContent = 'Vui lòng dán văn bản trực tiếp vào ô bên dưới:';
        ocrRawTextArea.value = '';
        setTimeout(() => {
          ocrStatusBar.classList.add('hidden');
          ocrResultGrid.classList.remove('hidden');
        }, 300);
      }
    } catch (err) {
      console.error('OCR error:', err);
      ocrStatusText.textContent = 'Không thể tự quét tự động. Bạn có thể dán văn bản trực tiếp vào ô dưới!';
      setTimeout(() => {
        ocrStatusBar.classList.add('hidden');
        ocrResultGrid.classList.remove('hidden');
      }, 500);
    }
  }

  function parseAndDisplayTasks(rawText) {
    ocrResultGrid.classList.remove('hidden');
    currentParsedTasks = parseTasksFromText(rawText);
    renderParsedTasksList(currentParsedTasks);
  }

  function parseTasksFromText(text) {
    const lines = text.split(/\r?\n/).map(l => l.trim()).filter(l => l.length > 0);
    const results = [];
    let currentShift = 'morning';
    
    lines.forEach((line, idx) => {
      const lower = line.toLowerCase();
      
      if (lower.includes('chiều') || lower.includes('afternoon') || lower.includes('shift 2') || lower.includes('block 2') || /1[4-9]:\d\d/.test(lower) || /[2-6]pm/.test(lower)) {
        currentShift = 'afternoon';
      } else if (lower.includes('tối') || lower.includes('evening') || lower.includes('personal') || lower.includes('shift 3') || lower.includes('block 3') || /2[0-3]:\d\d/.test(lower) || /[7-9]pm|10pm|11pm/.test(lower)) {
        currentShift = 'evening';
      } else if (lower.includes('sáng') || lower.includes('morning') || lower.includes('shift 1') || lower.includes('block 1') || /1[0-2]:\d\d/.test(lower)) {
        currentShift = 'morning';
      }
      
      if (/^(morning|afternoon|evening|oac|personal|block \d|shift \d|chế độ|nghỉ trưa|ăn trưa)/i.test(line) && line.length < 35 && !line.includes('-') && !line.includes(':')) {
        return;
      }
      
      let duration = 30;
      const durationMatch = line.match(/(\d+)\s*(phút|ph|mins|min|m)\b/i);
      if (durationMatch) {
        duration = parseInt(durationMatch[1], 10);
      } else {
        const hourMatch = line.match(/(\d+)\s*h\b/i);
        if (hourMatch) {
          duration = parseInt(hourMatch[1], 10) * 60;
        }
      }
      
      let priority = 'P2';
      if (/high|urgent|gấp|p1|🔴/i.test(line)) priority = 'P1';
      else if (/low|quick win|nhẹ|p3|🟢/i.test(line)) priority = 'P3';
      
      let category = 'Career/Work';
      if (/personal|tối|pack đồ|ăn sáng|ăn tối|nấu cơm|đặt xe/i.test(line)) category = 'Personal/Life';
      else if (/sourcing|delivery|outreach/i.test(line)) category = 'Career/Work';
      else if (/am|client|contract|sendout|apply/i.test(line)) category = 'Career/Work';
      else if (/bd|email|linkedin/i.test(line)) category = 'Career/Work';
      else if (/internal|họp|bài giảng|check-in/i.test(line)) category = 'Internal/Admin';
      
      let cleanTitle = line
        .replace(/^[\-\*\+\•\d\.\:\s]+/, '')
        .replace(/\b(high|medium|low|p1|p2|p3)\b/gi, '')
        .replace(/\(\d+ph|\d+phút|\d+mins|\d+m\)/gi, '')
        .trim();
        
      if (cleanTitle.length > 3) {
        results.push({
          id: 'task_' + Date.now() + '_' + idx,
          date: TODAY_STR,
          shift: currentShift,
          project: category.includes('Personal') ? 'Personal Life' : 'Career OS',
          title: cleanTitle,
          goal: 'Complete task milestone',
          details: 'Auto-extracted from screenshot OCR',
          category: category,
          cognitiveLoad: priority === 'P1' ? 'Brain-heavy' : 'Routine',
          priority: priority,
          durationPlannedMin: duration,
          focusMinsDone: 0,
          status: 'pending',
          output: '',
          linkOutput: '',
          fileOutput: '',
          distractions: []
        });
      }
    });
    
    return results;
  }

  function renderParsedTasksList(parsedTasks) {
    if (!parsedTasksList) return;
    parsedTasksList.innerHTML = '';
    parsedTasksCount.textContent = parsedTasks.length;
    
    if (parsedTasks.length === 0) {
      parsedTasksList.innerHTML = `<div style="padding: 16px; text-align: center; color: #94a3b8; font-size: 13px;">Không tìm thấy task hợp lệ từ văn bản/ảnh. Bạn có thể tự dán danh sách task dạng dòng vào ô bên trái!</div>`;
      confirmImportTasksBtn.classList.add('hidden');
      return;
    }
    
    parsedTasks.forEach((t, i) => {
      const card = document.createElement('div');
      card.className = 'parsed-task-card';
      card.innerHTML = `
        <div class="parsed-task-info">
          <h5>${escapeHtml(t.title)}</h5>
          <div class="parsed-task-meta">
            <span class="badge-shift">${t.shift.toUpperCase()}</span>
            <span>⏱️ ${t.durationPlannedMin}m</span>
            <span>🏷️ ${t.category}</span>
            <span>${t.priority === 'P1' ? '🔴 P1' : t.priority === 'P2' ? '🟡 P2' : '🟢 P3'}</span>
          </div>
        </div>
        <button class="btn-dl-action btn-delete-parsed" data-index="${i}" title="Remove"><i class="ri-close-line"></i></button>
      `;
      
      card.querySelector('.btn-delete-parsed').addEventListener('click', () => {
        currentParsedTasks.splice(i, 1);
        renderParsedTasksList(currentParsedTasks);
      });
      
      parsedTasksList.appendChild(card);
    });
    
    confirmImportTasksBtn.classList.remove('hidden');
  }

  document.addEventListener('DOMContentLoaded', init);

})();
