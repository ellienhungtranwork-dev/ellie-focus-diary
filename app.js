/* ==========================================================================
   Ellie's Focus Diary 🌸 - Full App Logic JavaScript (English)
   ========================================================================== */

(function () {
  'use strict';

  const STORAGE_KEY = 'ellie_focus_diary_state_v7';

  function getTodayStr() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  const TODAY_STR = getTodayStr();

  function escapeHtml(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

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
      elapsedTaskSecs: 0,
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

    // Auto-resume running timer if page crashed or reloaded while timer was running
    if (state.timer && state.timer.isRunning) {
      startTimer();
    }

    // Always save state when window is closed, refreshed, unloaded, or hidden
    window.addEventListener('beforeunload', saveState);
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        saveState();
      }
    });
  }

  const BACKUP_KEY = STORAGE_KEY + '_snapshot';

  function saveState() {
    try {
      const currentToday = getTodayStr();
      state.lastActiveDate = currentToday;
      if (state.timer) {
        state.timer.lastTickTimestamp = Date.now();
      }

      // Safe replacer to exclude non-serializable properties (like intervalId)
      const serializableState = JSON.parse(JSON.stringify(state, (key, value) => {
        if (key === 'intervalId') return null;
        return value;
      }));

      const jsonStr = JSON.stringify(serializableState);
      localStorage.setItem(STORAGE_KEY, jsonStr);
      if (Array.isArray(state.tasks) && state.tasks.length > 0) {
        localStorage.setItem(BACKUP_KEY, jsonStr);
      }
    } catch (err) {
      console.error('Failed to save state to localStorage:', err);
      // Fallback for QuotaExceededError (e.g., large base64 proof images)
      try {
        const fallbackState = JSON.parse(JSON.stringify(state, (key, value) => {
          if (key === 'intervalId') return null;
          if (key === 'proofImage' && typeof value === 'string' && value.length > 500) return '';
          return value;
        }));
        const fallbackJson = JSON.stringify(fallbackState);
        localStorage.setItem(STORAGE_KEY, fallbackJson);
        if (Array.isArray(state.tasks) && state.tasks.length > 0) {
          localStorage.setItem(BACKUP_KEY, fallbackJson);
        }
      } catch (fallbackErr) {
        console.error('Fallback saveState also failed:', fallbackErr);
      }
    }
  }

  function loadState() {
    const currentToday = getTodayStr();
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed && typeof parsed === 'object') {
          state = { ...state, ...parsed };

          if (!Array.isArray(state.tasks)) {
            state.tasks = [];
          }

          if (state.distractModalTimer) {
            state.distractModalTimer.intervalId = null;
          }

          // Real-time Timer Auto-Recovery On Crash / Page Reload
          if (state.timer && state.timer.isRunning && state.timer.lastTickTimestamp) {
            const elapsedSecs = Math.floor((Date.now() - state.timer.lastTickTimestamp) / 1000);
            if (elapsedSecs > 0) {
              state.timer.elapsedTaskSecs = (state.timer.elapsedTaskSecs || 0) + elapsedSecs;
              if (state.timer.mode === 'countdown' || state.timer.mode === 'break') {
                if (state.timer.remainingSecs > elapsedSecs) {
                  state.timer.remainingSecs -= elapsedSecs;
                } else {
                  const leftover = elapsedSecs - state.timer.remainingSecs;
                  state.timer.mode = 'overtime';
                  state.timer.remainingSecs = 0;
                  state.timer.overtimeSecs = (state.timer.overtimeSecs || 0) + leftover;
                }
              } else {
                state.timer.overtimeSecs = (state.timer.overtimeSecs || 0) + elapsedSecs;
              }
            }
          }
        }
      } catch (e) {
        console.error('Failed to load state from localStorage:', e);
      }
    }

    if (!state.selectedDate) {
      state.selectedDate = currentToday;
    }
  }

  // Automatic New Day Transition Check (Safeguards Past Data)
  function checkNewDayTransition() {
    const currentToday = getTodayStr();
    if (state.lastActiveDate && state.lastActiveDate !== currentToday) {
      state.lastActiveDate = currentToday;
      state.selectedDate = currentToday;
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

    const autoCascadeAllBtn = document.getElementById('autoCascadeAllBtn');
    if (autoCascadeAllBtn) {
      autoCascadeAllBtn.addEventListener('click', () => {
        autoCascadeShiftTimeline('morning');
        autoCascadeShiftTimeline('afternoon');
        autoCascadeShiftTimeline('evening');
        alertToastNotification.classList.remove('hidden');
        alertToastNotification.querySelector('h4').textContent = '⚡ Timelines Auto-Cascaded!';
        alertToastNotification.querySelector('p').textContent = 'All task start & end times updated consecutively for all shifts!';
        setTimeout(() => alertToastNotification.classList.add('hidden'), 4000);
      });
    }

    document.querySelectorAll('.btn-cascade-shift').forEach(btn => {
      btn.addEventListener('click', () => {
        const shift = btn.getAttribute('data-shift');
        autoCascadeShiftTimeline(shift);
        alertToastNotification.classList.remove('hidden');
        alertToastNotification.querySelector('h4').textContent = `⚡ ${shift.toUpperCase()} Shift Cascaded!`;
        alertToastNotification.querySelector('p').textContent = `Shift timeline updated consecutively!`;
        setTimeout(() => alertToastNotification.classList.add('hidden'), 3000);
      });
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

    // Workspace Date Picker Listener
    const workspaceDatePicker = document.getElementById('workspaceDatePicker');
    if (workspaceDatePicker) {
      if (!state.selectedDate) state.selectedDate = TODAY_STR;
      workspaceDatePicker.value = state.selectedDate;
      workspaceDatePicker.addEventListener('change', (e) => {
        if (e.target.value) {
          state.selectedDate = e.target.value;
          saveState();
          renderAll();
        }
      });
    }

    // Analytics Date Range & Date Picker Listener
    const analyticsDatePicker = document.getElementById('analyticsDatePicker');
    if (analyticsDateRangeSelect) {
      analyticsDateRangeSelect.addEventListener('change', () => {
        state.analyticsDateRange = analyticsDateRangeSelect.value;
        if (analyticsDatePicker) {
          if (analyticsDateRangeSelect.value === 'single') {
            analyticsDatePicker.classList.remove('hidden');
            if (!analyticsDatePicker.value) analyticsDatePicker.value = state.selectedDate || TODAY_STR;
          } else {
            analyticsDatePicker.classList.add('hidden');
          }
        }
        saveState();
        renderAnalytics();
      });
    }
    if (analyticsDatePicker) {
      analyticsDatePicker.addEventListener('change', () => {
        renderAnalytics();
      });
    }

    // AI Consult & Gemini Chat
    aiConsultTriggerBtn.addEventListener('click', openAiConsultModal);
    geminiApiKeyInput.value = state.geminiApiKey || '';
    geminiApiKeyInput.addEventListener('change', () => {
      state.geminiApiKey = geminiApiKeyInput.value.trim();
      saveState();
    });

    sendGeminiQueryBtn.addEventListener('click', handleGeminiCustomQuery);

    // Screenshot & Markdown Auto-fill Event Listeners
    if (screenshotAutoFillBtn) {
      screenshotAutoFillBtn.addEventListener('click', () => {
        resetScreenshotModal();
        screenshotModalBackdrop.classList.remove('hidden');
      });
    }
    if (closeScreenshotModalBtn) closeScreenshotModalBtn.addEventListener('click', () => screenshotModalBackdrop.classList.add('hidden'));
    if (cancelScreenshotModalBtn) cancelScreenshotModalBtn.addEventListener('click', () => screenshotModalBackdrop.classList.add('hidden'));

    // Manual Save Data Button Event Listener
    const saveDataBtn = document.getElementById('saveDataBtn');
    if (saveDataBtn) {
      saveDataBtn.addEventListener('click', () => {
        saveState();
        if (alertToastNotification) {
          alertToastNotification.classList.remove('hidden');
          alertToastNotification.querySelector('h4').textContent = '💾 Data Saved Successfully!';
          alertToastNotification.querySelector('p').textContent = `Đã lưu an toàn ${state.tasks ? state.tasks.length : 0} tasks & cài đặt vào bộ nhớ local!`;
          setTimeout(() => alertToastNotification.classList.add('hidden'), 3500);
        } else {
          alert(`💾 Đã lưu an toàn toàn bộ ${state.tasks ? state.tasks.length : 0} tasks & dữ liệu hiện tại!`);
        }
      });
    }

    // Load Last Data / Restore Snapshot Event Listener
    const restoreLatestDataBtn = document.getElementById('restoreLatestDataBtn');

    if (restoreLatestDataBtn) {
      restoreLatestDataBtn.addEventListener('click', () => {
        let saved = localStorage.getItem(STORAGE_KEY);
        let source = 'Bộ nhớ lưu chính';

        if (!saved || saved === '{}') {
          saved = localStorage.getItem(BACKUP_KEY);
          source = 'Bản sao lưu dự phòng (Snapshot)';
        }

        if (saved) {
          try {
            const parsed = JSON.parse(saved);
            if (parsed && typeof parsed === 'object') {
              state = { ...state, ...parsed };
              if (!Array.isArray(state.tasks)) state.tasks = [];
              renderAll();
              alert(`✅ Đã nạp lại thành công ${state.tasks.length} tasks & dữ liệu mới nhất từ ${source}!`);
              return;
            }
          } catch (e) {
            console.error('Failed to restore latest state:', e);
          }
        }

        alert('⚠️ Chưa tìm thấy bản lưu gần nhất nào trong bộ nhớ!');
      });
    }

    // Reset Today Tasks Event Listeners
    const resetTodayTasksBtn = document.getElementById('resetTodayTasksBtn');
    if (resetTodayTasksBtn) {
      resetTodayTasksBtn.addEventListener('click', () => {
        const activeDate = state.selectedDate || TODAY_STR;
        if (confirm(`🧹 Bạn có chắc chắn muốn XÓA SẠCH toàn bộ tasks của ngày (${activeDate}) để trả về trạng thái trống ban đầu không?`)) {
          state.tasks = state.tasks.filter(t => (t.date || TODAY_STR) !== activeDate);
          state.activeTaskId = null;
          saveState();
          renderAll();
          alert('✨ Đã xóa sạch toàn bộ tasks ngày! Trả về giao diện trống ban đầu.');
        }
      });
    }

    const clearModalTasksBtn = document.getElementById('clearModalTasksBtn');
    if (clearModalTasksBtn) {
      clearModalTasksBtn.addEventListener('click', () => {
        const activeDate = state.selectedDate || TODAY_STR;
        if (confirm(`🧹 Bạn có chắc chắn muốn XÓA SẠCH toàn bộ tasks ngày (${activeDate}) về trống không?`)) {
          state.tasks = state.tasks.filter(t => (t.date || TODAY_STR) !== activeDate);
          state.activeTaskId = null;
          saveState();
          renderAll();
          resetScreenshotModal();
          alert('✨ Đã làm sạch tasks ngày về trống!');
        }
      });
    }

    // Sample AG Markdown Paste Button
    const pasteSampleMarkdownBtn = document.getElementById('pasteSampleMarkdownBtn');
    if (pasteSampleMarkdownBtn) {
      pasteSampleMarkdownBtn.addEventListener('click', () => {
        const sampleText = `| Khung Giờ | Mã Task | Mảng Công Việc | Chi Tiết Nhiệm Vụ Kế Hoạch | Thời Lượng | Độ Ưu Tiên | Trạng Thái | Ghi Chú Kế Hoạch & Kết Quả Mong Đợi |
| :--- | :--- | :--- | :--- | :---: | :---: | :---: | :--- |
| **14:50 - 15:10** | \`PS-10\` | Internal | Sắp xếp & lên danh sách chi tiết các loại tasks đầu ngày | 20ph | High | \`[x]\` | Daily note cập nhật chuẩn xác theo thứ tự ưu tiên |
| **15:10 - 15:55** | \`BD011-01\` | BD | Lọc connection LinkedIn Ellie -> Builder/Startup Founder | 45ph | High | \`[ ]\` | Danh sách target leads Founder/Builder |
| **15:55 - 16:25** | \`BD011-02\` | BD | Viết 1st outreach message trên LinkedIn | 30ph | High | \`[ ]\` | Mẫu 1st outreach message chuẩn hóa |
| **16:25 - 16:50** | \`BD012-01\` | BD | Soạn & gửi 2 L1 messages + 2 L2 messages | 25ph | High | \`[ ]\` | Hoàn thành gửi 2 L1 messages & 2 L2 messages |
| **16:50 - 17:50** | \`DL009-13\` | Delivery | Sourcing 30 CTO Elyx profiles còn lại | 60ph | High | \`[ ]\` | Danh sách 30 profiles CTO Elyx hoàn chỉnh |
| **17:50 - 18:05** | \`AM043-02\` | AM | Phân loại job Rounds.so | 15ph | Medium | \`[ ]\` | Bảng phân loại & đánh giá tiêu chí |
| **18:05 - 18:55** | \`DL031-01\` | Delivery | Sourcing 40 profiles job mới của Rounds | 50ph | High | \`[ ]\` | Danh sách 40 profiles ứng viên |
| **18:55 - 19:25** | \`DL031-02\` | Delivery | Outreach ứng viên (Follow-up & Message) | 30ph | High | \`[ ]\` | Gửi message outreach đội ứng viên |`;

        if (ocrRawTextArea) {
          ocrRawTextArea.value = sampleText;
          parseAndDisplayTasks(sampleText);
        }
      });
    }
    
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

    function executeImportTasks() {
      try {
        if (!currentParsedTasks || currentParsedTasks.length === 0) {
          const rawText = ocrRawTextArea ? ocrRawTextArea.value.trim() : '';
          if (rawText) {
            currentParsedTasks = parseTasksFromText(rawText);
          }
        }

        if (!currentParsedTasks || currentParsedTasks.length === 0) {
          alert('Vui lòng dán đoạn Markdown vào ô nhập và bấm "Phân Tích Markdown Tasks" trước khi bấm Import nhé!');
          return;
        }
        
        const activeDate = state.selectedDate || TODAY_STR;

        if (!Array.isArray(state.tasks)) {
          state.tasks = [];
        }

        // Auto-clear existing tasks for activeDate so pasting a new Markdown auto-deletes old tasks!
        state.tasks = state.tasks.filter(t => (t.date || TODAY_STR) !== activeDate);

        const importedCount = currentParsedTasks.length;
        currentParsedTasks.forEach(newTask => {
          if (!newTask || !newTask.title) return;
          newTask.date = activeDate;
          state.tasks.push(newTask);
        });

        // Sort tasks chronologically by startTime
        state.tasks.sort((a, b) => {
          if (!a || !a.startTime) return 1;
          if (!b || !b.startTime) return -1;
          return a.startTime.localeCompare(b.startTime);
        });

        saveState();
        renderAll();
        
        if (screenshotModalBackdrop) {
          screenshotModalBackdrop.classList.add('hidden');
        }
        
        if (alertToastNotification) {
          alertToastNotification.classList.remove('hidden');
          const h4 = alertToastNotification.querySelector('h4');
          const p = alertToastNotification.querySelector('p');
          if (h4) h4.textContent = '🎉 Đồng Bộ Smart Import Thành Công!';
          if (p) p.innerHTML = `Đã tự động làm sạch tasks cũ & nạp <strong>${importedCount} tasks mới</strong> với khung giờ chuẩn hôm nay!`;
          setTimeout(() => {
            if (alertToastNotification) alertToastNotification.classList.add('hidden');
          }, 5000);
        } else {
          alert(`🎉 Đã nạp thành công ${importedCount} tasks mới vào Web Focus!`);
        }
      } catch (err) {
        console.error('Import Tasks Error:', err);
        alert('Đã xảy ra lỗi khi Import Tasks: ' + err.message);
      }
    }

    if (confirmImportTasksBtn) {
      confirmImportTasksBtn.addEventListener('click', executeImportTasks);
    }
    const quickImportHeaderBtn = document.getElementById('quickImportHeaderBtn');
    if (quickImportHeaderBtn) {
      quickImportHeaderBtn.addEventListener('click', executeImportTasks);
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

    // Direct Click-to-Edit Timer Digits
    timerDigits.addEventListener('click', promptCustomTimeEdit);

    timerPauseDistractBtn.addEventListener('click', openDistractModal);
    timerExtendBtn.addEventListener('click', () => extendPillGroup.classList.toggle('hidden'));
    timerCompleteBtn.addEventListener('click', openOutputModal);
    floatingFinishBtn.addEventListener('click', openOutputModal);

    // Congrats Modal Close
    closeCongratsModalBtn.addEventListener('click', () => congratsModalBackdrop.classList.add('hidden'));
    closeCongratsModalFooterBtn.addEventListener('click', () => congratsModalBackdrop.classList.add('hidden'));

    document.querySelectorAll('.extend-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const minsAttr = chip.getAttribute('data-mins');
        if (minsAttr) {
          extendTimer(parseInt(minsAttr, 10));
          extendPillGroup.classList.add('hidden');
        }
      });
    });

    const setCustomTimeBtn = document.getElementById('setCustomTimeBtn');
    if (setCustomTimeBtn) {
      setCustomTimeBtn.addEventListener('click', () => {
        extendPillGroup.classList.add('hidden');
        promptCustomTimeEdit();
      });
    }

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

    // Congrats Modal Close
    const closeCongratsModalBtn = document.getElementById('closeCongratsModalBtn');
    const closeCongratsModalFooterBtn = document.getElementById('closeCongratsModalFooterBtn');
    if (closeCongratsModalBtn) {
      closeCongratsModalBtn.addEventListener('click', () => {
        congratsModalBackdrop.classList.add('hidden');
        renderAll();
      });
    }
    if (closeCongratsModalFooterBtn) {
      closeCongratsModalFooterBtn.addEventListener('click', () => {
        congratsModalBackdrop.classList.add('hidden');
        renderAll();
      });
    }

    // Toast Notification
    if (closeToastBtn) closeToastBtn.addEventListener('click', () => alertToastNotification.classList.add('hidden'));

    // Global Modal Backdrop Click-Outside & Escape Key handlers (prevents stuck modals!)
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => {
      backdrop.addEventListener('click', (e) => {
        if (e.target === backdrop) {
          backdrop.classList.add('hidden');
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        document.querySelectorAll('.modal-backdrop, .alert-toast').forEach(el => el.classList.add('hidden'));
      }
    });

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
    const workspaceDatePicker = document.getElementById('workspaceDatePicker');
    if (workspaceDatePicker) {
      workspaceDatePicker.value = state.selectedDate || getTodayStr();
    }
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

  // RENDER TASKS (SHOWING WORKSPACE TASKS FOR SELECTED DATE + PAST UNFINISHED CARRIED OVER TASKS)
  function renderTasks() {
    morningTaskList.innerHTML = '';
    afternoonTaskList.innerHTML = '';
    eveningTaskList.innerHTML = '';

    const shiftCounts = { morning: 0, afternoon: 0, evening: 0 };
    const shiftPoms = { morning: 0, afternoon: 0, evening: 0 };
    const shiftFocusMins = { morning: 0, afternoon: 0, evening: 0 };

    const activeDate = state.selectedDate || TODAY_STR;
    const dateWorkspaceTasks = state.tasks.filter(t => {
      const taskDate = t.date || TODAY_STR;
      if (taskDate === activeDate) return true;
      // Keep unfinished or carried_over tasks from previous days on the workspace board!
      if (activeDate >= TODAY_STR && taskDate < activeDate && t.status !== 'completed') {
        return true;
      }
      return false;
    });

    dateWorkspaceTasks.forEach((task, index) => {
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

    let statusBadge = '';
    const taskDate = task.date || TODAY_STR;
    const isPastCarriedOver = taskDate < (state.selectedDate || TODAY_STR) && task.status !== 'completed';

    if (task.status === 'carried_over' || isPastCarriedOver) {
      statusBadge = `<span class="badge badge-carried-over" title="Task chưa xong từ ngày ${taskDate} được giữ lại cho hôm nay">🔄 Carry Over (${taskDate})</span>`;
    } else if (task.status === 'in_progress') {
      statusBadge = `<span class="badge badge-in-progress" title="Partially completed">⏸️ In Progress</span>`;
    }

    const planMins = task.durationPlannedMin || 25;
    const focusMins = task.focusMinsDone || 0;
    const actualMins = focusMins;
    const totalDistractMins = (task.distractions || []).reduce((sum, d) => sum + d.duration_min, 0);
    const totalTaskSpanMins = focusMins + totalDistractMins;
    const diffMins = totalTaskSpanMins - planMins;
    
    let varianceBadge = '';
    let durationDisplayStyle = 'color: #64748b; font-weight: 800;';

    if (task.status === 'completed' || totalTaskSpanMins > 0) {
      if (diffMins > 0) {
        varianceBadge = `<span class="badge" style="background:#fee2e2; color:#dc2626; font-weight:800; font-size:11px; padding:2px 7px; border-radius:6px;" title="Kéo dài hơn plan ${diffMins}m (${focusMins}m focus + ${totalDistractMins}m pause)">🔴 +${diffMins}m</span>`;
        durationDisplayStyle = 'color: #dc2626; font-weight: 800; background: #fee2e2; padding: 2px 7px; border-radius: 6px;';
      } else if (diffMins < 0) {
        varianceBadge = `<span class="badge" style="background:#d1fae5; color:#047857; font-weight:800; font-size:11px; padding:2px 7px; border-radius:6px;" title="Hoàn thành sớm ${Math.abs(diffMins)}m">🟢 Sớm ${Math.abs(diffMins)}m</span>`;
        durationDisplayStyle = 'color: #047857; font-weight: 800; background: #d1fae5; padding: 2px 7px; border-radius: 6px;';
      } else {
        varianceBadge = `<span class="badge" style="background:#d1fae5; color:#047857; font-weight:800; font-size:11px; padding:2px 7px; border-radius:6px;" title="Hoàn thành đúng hạn ${planMins}m">✅ Đúng hạn</span>`;
        durationDisplayStyle = 'color: #047857; font-weight: 800; background: #d1fae5; padding: 2px 7px; border-radius: 6px;';
      }
    }

    const calculatedEndTime = calculateTaskEndTime(task.startTime, totalTaskSpanMins > 0 ? totalTaskSpanMins : planMins);
    const timeStatusClass = diffMins > 0 ? 'time-range-red' : 'time-range-green';

    item.innerHTML = `
      <div class="task-content-left">
        <div>
          <div class="task-badges">
            <span class="badge badge-cat">${escapeHtml(task.category)}</span>
            ${task.project ? `<span class="badge badge-proj">📁 ${escapeHtml(task.project)}</span>` : ''}
            ${statusBadge}
            ${cognitiveBadge}
            ${priorityBadge}
            ${varianceBadge}
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
        <span style="font-size: 13px; margin-right: 6px; ${durationDisplayStyle}">${actualMins > 0 ? `${actualMins}m / ${planMins}m` : `${planMins}m`}</span>
        <button class="btn-task-action btn-carry-task" data-id="${task.id}" title="${task.status === 'carried_over' ? 'Hủy Carry Over' : 'Chuyển Carry Over sang ngày mai/hôm nay'}"><i class="ri-refresh-line"></i></button>
        <button class="btn-task-action btn-move-up" data-id="${task.id}" title="Move Up"><i class="ri-arrow-up-line"></i></button>
        <button class="btn-task-action btn-move-down" data-id="${task.id}" title="Move Down"><i class="ri-arrow-down-line"></i></button>
        <button class="btn-task-action btn-edit-task" data-id="${task.id}" title="Edit Task"><i class="ri-edit-line"></i></button>
        <button class="btn-task-action btn-delete-task" data-id="${task.id}" title="Delete Task"><i class="ri-delete-bin-line"></i></button>
        <button class="btn-task-action btn-toggle-complete" data-id="${task.id}" title="${task.status === 'completed' ? 'Bấm để hủy Hoàn Thành (chuyển lại Pending)' : 'Đánh dấu Hoàn Thành nhanh'}">
          <i class="${task.status === 'completed' ? 'ri-checkbox-circle-fill' : 'ri-checkbox-circle-line'}" style="color: ${task.status === 'completed' ? '#10b981' : '#94a3b8'}; font-size: 24px;"></i>
        </button>
        ${task.status !== 'completed' ? `
          <button class="btn-play-task" data-id="${task.id}" title="Select Task for Focus">
            <i class="ri-play-fill"></i>
          </button>
        ` : ''}
      </div>
    `;

    const timeInput = item.querySelector('.inline-start-time-input');
    timeInput.addEventListener('change', (e) => {
      task.startTime = e.target.value;
      autoCascadeShiftTimeline(task.shift, e.target.value);
    });

    item.querySelector('.btn-toggle-complete').addEventListener('click', (e) => {
      e.stopPropagation();
      if (task.status === 'completed') {
        task.status = 'pending';
      } else {
        task.status = 'completed';
        if (!task.output) task.output = 'Completed via Quick Mark';
        if (!task.focusMinsDone) task.focusMinsDone = task.durationPlannedMin || 25;
      }
      saveState();
      renderAll();
    });

    item.querySelector('.btn-carry-task').addEventListener('click', () => {
      if (task.status === 'carried_over') {
        task.status = 'pending';
      } else {
        task.status = 'carried_over';
      }
      saveState();
      renderAll();
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

  function autoCascadeShiftTimeline(shiftName, forceStartTime = null) {
    const activeDate = state.selectedDate || TODAY_STR;
    const shiftTasks = state.tasks.filter(t => (t.date || TODAY_STR) === activeDate && t.shift === shiftName);
    if (shiftTasks.length === 0) return;

    let currentStartMins = null;

    if (forceStartTime) {
      const [h, m] = forceStartTime.split(':').map(Number);
      currentStartMins = h * 60 + m;
    } else if (shiftTasks[0] && shiftTasks[0].startTime) {
      const [h, m] = shiftTasks[0].startTime.split(':').map(Number);
      currentStartMins = h * 60 + m;
    } else {
      if (shiftName === 'morning') currentStartMins = 9 * 60;
      else if (shiftName === 'afternoon') currentStartMins = 14 * 60;
      else if (shiftName === 'evening') currentStartMins = 19 * 60;
    }

    shiftTasks.forEach(task => {
      const startH = Math.floor((currentStartMins / 60) % 24);
      const startM = Math.floor(currentStartMins % 60);
      task.startTime = `${String(startH).padStart(2, '0')}:${String(startM).padStart(2, '0')}`;

      const endMins = currentStartMins + (task.durationPlannedMin || 30);
      const endH = Math.floor((endMins / 60) % 24);
      const endM = Math.floor(endMins % 60);
      task.endTime = `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;

      currentStartMins = endMins;
    });

    saveState();
    renderTasks();
  }

  function moveTask(id, delta) {
    const index = state.tasks.findIndex(t => t.id === id);
    if (index < 0) return;
    const targetIndex = index + delta;
    if (targetIndex < 0 || targetIndex >= state.tasks.length) return;
    const temp = state.tasks[index];
    state.tasks[index] = state.tasks[targetIndex];
    state.tasks[targetIndex] = temp;

    autoCascadeShiftTimeline(temp.shift);
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
    const doneMins = task.focusMinsDone || 0;
    const planMins = task.durationPlannedMin || 25;
    const remainingMins = Math.max(1, planMins - doneMins);

    state.timer.initialDurationSecs = remainingMins * 60;
    state.timer.remainingSecs = remainingMins * 60;
    state.timer.elapsedTaskSecs = doneMins * 60;
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
      popoutTaskName.textContent = 'No task selected';
      timerSubStatus.textContent = '0 pomodoros done';
      distractionMiniBar.classList.add('hidden');
      renderTimerDigits();
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
    state.timer.lastTickTimestamp = Date.now();
    timerPlayIcon.className = 'ri-pause-fill';
    floatingPlayIcon.className = 'ri-pause-fill';
    popoutPlayIcon.className = 'ri-pause-fill';

    musicIframeWrapper.classList.remove('hidden');
    try {
      if (lofiAudioFrame && lofiAudioFrame.contentWindow) {
        lofiAudioFrame.contentWindow.postMessage('{"event":"command","func":"playVideo","args":""}', '*');
      }
    } catch (e) {}
    updateYoutubeIframeSrc(true);

    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      state.timer.lastTickTimestamp = Date.now();
      state.timer.elapsedTaskSecs = (state.timer.elapsedTaskSecs || 0) + 1;

      const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
      if (activeTask) {
        activeTask.focusMinsDone = Math.round(state.timer.elapsedTaskSecs / 60);
      }

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

      // Periodically persist timer progress to localStorage (every 2 seconds)
      if (state.timer.remainingSecs % 2 === 0 || state.timer.overtimeSecs % 2 === 0) {
        saveState();
      }
    }, 1000);

    saveState();
  }

  function pauseTimer() {
    state.timer.isRunning = false;
    clearInterval(timerInterval);
    timerPlayIcon.className = 'ri-play-fill';
    floatingPlayIcon.className = 'ri-play-fill';
    popoutPlayIcon.className = 'ri-play-fill';

    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
    if (activeTask && state.timer.elapsedTaskSecs) {
      activeTask.focusMinsDone = Math.round(state.timer.elapsedTaskSecs / 60);
    }

    // Pause YouTube music/ambient audio when timer is paused!
    try {
      if (lofiAudioFrame && lofiAudioFrame.contentWindow) {
        lofiAudioFrame.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
      }
    } catch (e) {}
    updateYoutubeIframeSrc(false);

    saveState();
  }

  function extendTimer(mins) {
    if (isNaN(mins) || mins === 0) return;
    const addSecs = mins * 60;

    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
    if (activeTask) {
      activeTask.durationPlannedMin = Math.max(5, (activeTask.durationPlannedMin || 25) + mins);
    }

    if (state.timer.mode === 'overtime') {
      if (mins > 0) {
        state.timer.mode = 'countdown';
        state.timer.remainingSecs = addSecs;
        state.timer.initialDurationSecs = addSecs;
        state.timer.overtimeSecs = 0;
      }
    } else {
      state.timer.remainingSecs = Math.max(10, state.timer.remainingSecs + addSecs);
      state.timer.initialDurationSecs = Math.max(state.timer.remainingSecs, state.timer.initialDurationSecs + addSecs);
    }
    renderAll();
    saveState();
  }

  function promptCustomTimeEdit() {
    const currentMins = Math.max(1, Math.ceil(state.timer.remainingSecs / 60)) || 25;
    const input = prompt('✍️ Enter exact remaining focus time (minutes):', currentMins);
    if (input !== null) {
      const parsedMins = parseInt(input, 10);
      if (!isNaN(parsedMins) && parsedMins > 0) {
        setExactFocusMinutes(parsedMins);
      }
    }
  }

  function setExactFocusMinutes(exactMins) {
    const currentRemainingMins = state.timer.mode === 'countdown' ? Math.floor(state.timer.remainingSecs / 60) : 0;
    const diffMins = exactMins - currentRemainingMins;
    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
    if (activeTask) {
      activeTask.durationPlannedMin = Math.max(5, (activeTask.durationPlannedMin || 25) + diffMins);
    }

    const secs = exactMins * 60;
    state.timer.mode = 'countdown';
    state.timer.remainingSecs = secs;
    state.timer.initialDurationSecs = secs;
    state.timer.overtimeSecs = 0;
    state.timer.alert5MinFired = false;
    renderAll();
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

      // Auto-recalculate endTime and cascade shift timeline including distraction duration!
      if (activeTask.startTime) {
        const totalDistractMins = activeTask.distractions.reduce((sum, d) => sum + d.duration_min, 0);
        const totalTaskSpanMins = (activeTask.focusMinsDone || activeTask.durationPlannedMin) + totalDistractMins;
        activeTask.endTime = calculateTaskEndTime(activeTask.startTime, totalTaskSpanMins);
        autoCascadeShiftTimeline(activeTask.shift, activeTask.startTime);
      }
    }

    closeDistractModal();
    saveState();
    renderAll();
    startTimer();
  }

  // --- OUTPUT COMPLETE MODAL & CONGRATS POP-UP ---
  function openOutputModal(taskId = null) {
    if (taskId) {
      state.activeTaskId = taskId;
    }
    if (!state.activeTaskId) {
      const activeDate = state.selectedDate || TODAY_STR;
      const pendingTask = state.tasks.find(t => (t.date || TODAY_STR) === activeDate && t.status !== 'completed');
      if (pendingTask) {
        state.activeTaskId = pendingTask.id;
      } else if (state.tasks.length > 0) {
        state.activeTaskId = state.tasks[0].id;
      } else {
        alert('Chưa có task nào trong danh sách!');
        return;
      }
    }
    pauseTimer();
    const activeTask = state.tasks.find(t => t.id === state.activeTaskId);
    if (!activeTask) return;
    
    const statusSelect = document.getElementById('taskCompletionStatusSelect');
    if (statusSelect) {
      statusSelect.value = activeTask.status === 'completed' ? 'completed' : (activeTask.status || 'completed');
    }

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
    try {
      let finalOutput = taskFinalOutputInput.value.trim();
      if (!finalOutput) {
        finalOutput = 'Completed task milestone';
      }

      const statusSelect = document.getElementById('taskCompletionStatusSelect');
      const selectedStatus = statusSelect ? statusSelect.value : 'completed';

      let activeTask = state.tasks.find(t => t.id === state.activeTaskId);
      if (!activeTask) {
        const activeDate = state.selectedDate || TODAY_STR;
        activeTask = state.tasks.find(t => (t.date || TODAY_STR) === activeDate && t.status !== 'completed') || state.tasks[0];
      }

      if (activeTask) {
        activeTask.status = selectedStatus;
        activeTask.output = finalOutput;
        activeTask.linkOutput = taskLinkOutputInput.value.trim();
        activeTask.fileOutput = taskFileOutputInput.value.trim();
        activeTask.proofImage = taskProofDataInput.value || '';

        const totalElapsedSecs = (state.timer && typeof state.timer.elapsedTaskSecs === 'number') ? state.timer.elapsedTaskSecs : 0;
        const totalFocusMins = Math.round(totalElapsedSecs / 60);
        activeTask.focusMinsDone = Math.max(1, totalFocusMins > 0 ? totalFocusMins : (activeTask.durationPlannedMin || 25));

        // Auto-adjust endTime based on actual focus duration + distraction mins!
        if (activeTask.startTime) {
          const totalDistractMins = (activeTask.distractions || []).reduce((sum, d) => sum + d.duration_min, 0);
          const totalTaskSpanMins = (activeTask.focusMinsDone || activeTask.durationPlannedMin) + totalDistractMins;
          activeTask.endTime = calculateTaskEndTime(activeTask.startTime, totalTaskSpanMins);
          
          // Auto-cascade subsequent tasks in the same shift so their start times move cleanly!
          autoCascadeShiftTimeline(activeTask.shift, activeTask.startTime);
        }

        const statusBadgeText = selectedStatus === 'completed' ? '✅ Fully Completed' : (selectedStatus === 'carried_over' ? '🔄 Carried Over to Tomorrow' : '⏸️ Saved In Progress');

        const congratsTaskTitle = document.getElementById('congratsTaskTitle');
        const congratsMeta = document.getElementById('congratsMeta');
        const congratsDeliverableBox = document.getElementById('congratsDeliverableBox');

        if (congratsTaskTitle) congratsTaskTitle.textContent = activeTask.title;
        if (congratsMeta) congratsMeta.textContent = `Status: ${statusBadgeText} · Focused for ${activeTask.focusMinsDone || activeTask.durationPlannedMin} minutes!`;
        if (congratsDeliverableBox) congratsDeliverableBox.innerHTML = `<span>Summary Logged: "${escapeHtml(finalOutput)}"</span>${activeTask.proofImage ? '<br><small>📷 Screenshot Proof Attached</small>' : ''}`;
        
        const congratsModalBackdrop = document.getElementById('congratsModalBackdrop');
        if (congratsModalBackdrop) congratsModalBackdrop.classList.remove('hidden');
      }
    } catch (err) {
      console.error('Error completing task:', err);
    } finally {
      state.activeTaskId = null;
      const modal = document.getElementById('outputModalBackdrop') || outputModalBackdrop;
      if (modal) modal.classList.add('hidden');
      saveState();
      renderAll();
    }
  }

  window.confirmCompleteTask = confirmCompleteTask;


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
    const analyticsDatePicker = document.getElementById('analyticsDatePicker');
    const singleDateVal = (analyticsDatePicker && analyticsDatePicker.value) ? analyticsDatePicker.value : (state.selectedDate || TODAY_STR);

    const now = new Date();
    const filteredTasks = state.tasks.filter(t => {
      const taskDateStr = t.date || TODAY_STR;
      if (range === 'today') {
        return taskDateStr === TODAY_STR;
      } else if (range === 'yesterday') {
        const yest = new Date(now);
        yest.setDate(yest.getDate() - 1);
        const yestStr = yest.toISOString().split('T')[0];
        return taskDateStr === yestStr;
      } else if (range === 'single') {
        return taskDateStr === singleDateVal;
      } else if (range === '7days') {
        const tDate = new Date(taskDateStr);
        const diffDays = Math.ceil(Math.abs(now - tDate) / (1000 * 60 * 60 * 24));
        return diffDays <= 7;
      } else if (range === '30days') {
        const tDate = new Date(taskDateStr);
        const diffDays = Math.ceil(Math.abs(now - tDate) / (1000 * 60 * 60 * 24));
        return diffDays <= 30;
      }
      return true; // 'all'
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

  function compressImageBase64(dataUrl, maxDim, quality, callback) {
    if (!dataUrl || !dataUrl.startsWith('data:image')) {
      callback(dataUrl);
      return;
    }
    const img = new Image();
    img.onload = () => {
      let width = img.width;
      let height = img.height;
      if (width > maxDim || height > maxDim) {
        if (width > height) {
          height = Math.round((height * maxDim) / width);
          width = maxDim;
        } else {
          width = Math.round((width * maxDim) / height);
          height = maxDim;
        }
      }
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(img, 0, 0, width, height);
      const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
      callback(compressedDataUrl);
    };
    img.onerror = () => callback(dataUrl);
    img.src = dataUrl;
  }

  function handleProofFileSelect(file) {
    if (!file || !file.type.startsWith('image/')) return;
    const reader = new FileReader();
    reader.onload = (e) => {
      compressImageBase64(e.target.result, 800, 0.6, (compressedDataUrl) => {
        proofPreviewImg.src = compressedDataUrl;
        taskProofDataInput.value = compressedDataUrl;
        proofPastePlaceholder.classList.add('hidden');
        proofImagePreview.classList.remove('hidden');
      });
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
    const targetDate = state.selectedDate || TODAY_STR;
    
    // Check if input contains Markdown table rows (e.g. lines containing '|')
    const tableLines = lines.filter(l => l.startsWith('|') || (l.includes('|') && (l.match(/\|/g) || []).length >= 3));

    if (tableLines.length >= 2) {
      tableLines.forEach((line, idx) => {
        if (line.includes(':---') || line.includes('Khung Giờ') || line.includes('Mã Task') || line.includes('Giờ Bắt Đầu')) {
          return;
        }

        // Robust Markdown Table Column Extraction
        let cols = line.split('|').map(c => c.trim().replace(/[\*\`]/g, ''));
        if (cols.length > 0 && cols[0] === '') cols.shift();
        if (cols.length > 0 && cols[cols.length - 1] === '') cols.pop();
        if (cols.length < 3) return;

        // Col 0: Khung Giờ (e.g. "14:50 - 15:10")
        let timeCol = cols[0] || '';
        let startTime = '';
        let endTime = '';
        let shift = 'afternoon';

        let timeMatch = timeCol.match(/(\d{1,2}[:\.]\d{2})\s*(?:AM|PM)?\s*[\-\–\—\➔\->]*\s*(\d{1,2}[:\.]\d{2})?/i);
        if (!timeMatch && cols[1]) {
          timeMatch = cols[1].match(/(\d{1,2}[:\.]\d{2})\s*(?:AM|PM)?\s*[\-\–\—\➔\->]*\s*(\d{1,2}[:\.]\d{2})?/i);
        }

        if (timeMatch) {
          startTime = timeMatch[1].replace('.', ':').padStart(5, '0');
          if (timeMatch[2]) endTime = timeMatch[2].replace('.', ':').padStart(5, '0');

          const startHour = parseInt(startTime.split(':')[0], 10);
          if (startHour >= 12 && startHour < 18) shift = 'afternoon';
          else if (startHour >= 18 || startHour < 5) shift = 'evening';
          else shift = 'morning';
        }

        // Col 1 & 2: Mã Task & Mảng Công Việc -> Project Name
        const taskCode = cols[1] || '';
        if (taskCode.toUpperCase() === 'BREAK') return;

        const domainCol = cols[2] || '';
        let category = 'Career/Work';
        let project = 'Career OS';

        if (/personal|cá nhân|life|pl/i.test(domainCol) || /^PL-/i.test(taskCode)) {
          category = 'Life/Personal';
          project = 'Personal Life';
        } else if (/internal|nội bộ|admin|in/i.test(domainCol) || /^IN-/i.test(taskCode) || /^PS-/i.test(taskCode)) {
          category = 'Admin/Ops';
          project = 'Internal & Ops';
        } else if (/growth|học tập|study/i.test(domainCol)) {
          category = 'Growth/Study';
          project = 'Skill Growth';
        } else if (/creative|side/i.test(domainCol)) {
          category = 'Creative/Side';
          project = 'Sidequests';
        } else if (/bd/i.test(domainCol) || /^BD/i.test(taskCode)) {
          category = 'Career/Work';
          project = 'BD Outreach';
        } else if (/delivery|dl/i.test(domainCol) || /^DL/i.test(taskCode)) {
          category = 'Career/Work';
          project = 'Delivery Sourcing';
        } else if (/am/i.test(domainCol) || /^AM/i.test(taskCode)) {
          category = 'Career/Work';
          project = 'Account Management';
        }

        // Col 3: Chi Tiết Nhiệm Vụ
        const titleCol = cols[3] || '';
        if (!titleCol) return;
        const fullTitle = taskCode ? `[${taskCode}] ${titleCol}` : titleCol;

        // Col 4: Thời lượng
        let duration = 30;
        const durCol = cols[4] || '';
        const durMatch = durCol.match(/(\d+)/);
        if (durMatch) {
          duration = parseInt(durMatch[1], 10);
        } else if (startTime && endTime) {
          const [sh, sm] = startTime.split(':').map(Number);
          const [eh, em] = endTime.split(':').map(Number);
          const diffMins = (eh * 60 + em) - (sh * 60 + sm);
          if (diffMins > 0) duration = diffMins;
        }

        // Col 5: Độ Ưu Tiên -> Priority & Cognitive Load
        const priorityCol = cols[5] || '';
        let priority = 'P2';
        let cognitiveLoad = 'Routine';
        if (/high|cao|p1|gấp/i.test(priorityCol)) {
          priority = 'P1';
          cognitiveLoad = 'Brain-heavy';
        } else if (/low|thấp|p3|nhẹ/i.test(priorityCol)) {
          priority = 'P3';
          cognitiveLoad = 'Light';
        }

        // Col 6: Trạng Thái
        const statusCol = cols[6] || '';
        let status = 'pending';
        if (statusCol.includes('[x]') || statusCol.includes('completed')) status = 'completed';
        else if (statusCol.includes('[/]') || statusCol.includes('in_progress')) status = 'in_progress';

        // Col 7: Ghi Chú Kế Hoạch & Kết Quả Mong Đợi -> Goal & Details
        const detailsCol = cols[7] || '';

        results.push({
          id: 'task_' + Date.now() + '_' + idx,
          date: targetDate,
          shift: shift,
          project: project,
          title: fullTitle,
          goal: detailsCol || 'Complete planned activity',
          details: detailsCol ? `Ghi chú AG: ${detailsCol}` : '',
          category: category,
          cognitiveLoad: cognitiveLoad,
          priority: priority,
          startTime: startTime,
          endTime: endTime,
          durationPlannedMin: duration,
          focusMinsDone: status === 'completed' ? duration : 0,
          status: status,
          output: status === 'completed' ? 'Completed via AG Check-in Import' : '',
          linkOutput: '',
          fileOutput: '',
          distractions: []
        });
      });

      if (results.length > 0) return results;
    }

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
      if (/personal|tối|pack đồ|ăn sáng|ăn tối|nấu cơm|đặt xe/i.test(line)) category = 'Life/Personal';
      else if (/sourcing|delivery|outreach/i.test(line)) category = 'Career/Work';
      else if (/am|client|contract|sendout|apply/i.test(line)) category = 'Career/Work';
      else if (/bd|email|linkedin/i.test(line)) category = 'Career/Work';
      else if (/internal|họp|bài giảng|check-in/i.test(line)) category = 'Admin/Ops';
      
      let cleanTitle = line
        .replace(/^[\-\*\+\•\d\.\:\s]+/, '')
        .replace(/\b(high|medium|low|p1|p2|p3)\b/gi, '')
        .replace(/\(\d+ph|\d+phút|\d+mins|\d+m\)/gi, '')
        .trim();
        
      if (cleanTitle.length > 3) {
        results.push({
          id: 'task_' + Date.now() + '_' + idx,
          date: targetDate,
          shift: currentShift,
          project: category.includes('Personal') ? 'Personal Life' : 'Career OS',
          title: cleanTitle,
          goal: 'Complete task milestone',
          details: 'Auto-extracted from text',
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
    
    const quickImportHeaderBtn = document.getElementById('quickImportHeaderBtn');

    if (parsedTasks.length === 0) {
      parsedTasksList.innerHTML = `<div style="padding: 16px; text-align: center; color: #94a3b8; font-size: 13px;">Không tìm thấy task hợp lệ từ văn bản/ảnh. Bạn có thể dán bảng Markdown từ AG vào ô trên!</div>`;
      if (confirmImportTasksBtn) confirmImportTasksBtn.classList.add('hidden');
      if (quickImportHeaderBtn) quickImportHeaderBtn.classList.add('hidden');
      return;
    }

    if (confirmImportTasksBtn) confirmImportTasksBtn.classList.remove('hidden');
    if (quickImportHeaderBtn) quickImportHeaderBtn.classList.remove('hidden');
    
    parsedTasks.forEach((t, i) => {
      const card = document.createElement('div');
      card.className = 'parsed-task-card';
      card.style.display = 'flex';
      card.style.alignItems = 'center';
      card.style.justifyContent = 'space-between';
      card.style.padding = '10px 14px';
      card.style.marginBottom = '8px';
      card.style.background = t.status === 'completed' ? '#f0fdf4' : 'var(--card-bg, #ffffff)';
      card.style.border = t.status === 'completed' ? '1px solid #86efac' : '1px solid var(--border-color, #e2e8f0)';
      card.style.borderRadius = '10px';

      const isDone = t.status === 'completed';
      const statusBadgeHtml = isDone 
        ? `<span class="badge" style="background:#d1fae5; color:#047857; font-weight:700;">✅ Đã xong (AG)</span>`
        : t.status === 'in_progress'
        ? `<span class="badge" style="background:#fef3c7; color:#b45309; font-weight:700;">⏸️ Đang làm</span>`
        : `<span class="badge" style="background:#f1f5f9; color:#475569;">⏳ Chờ làm</span>`;

      card.innerHTML = `
        <div class="parsed-task-info" style="flex:1;">
          <h5 style="margin:0 0 4px 0; font-size:14px; font-weight:700; ${isDone ? 'text-decoration:line-through; color:#64748b;' : ''}">${escapeHtml(t.title)}</h5>
          <div class="parsed-task-meta" style="display:flex; gap:6px; flex-wrap:wrap; font-size:11px;">
            <span class="badge-shift" style="background:#e0f2fe; color:#0369a1; padding:2px 6px; border-radius:4px; font-weight:700;">${t.shift.toUpperCase()}</span>
            ${t.startTime ? `<span style="background:#fef3c7; color:#b45309; padding:2px 6px; border-radius:4px; font-weight:700;">⏰ ${t.startTime}${t.endTime ? ' ➔ ' + t.endTime : ''}</span>` : ''}
            <span>⏱️ ${t.durationPlannedMin}m</span>
            <span>🏷️ ${t.category}</span>
            <span>${t.priority === 'P1' ? '🔴 P1' : t.priority === 'P2' ? '🟡 P2' : '🟢 P3'}</span>
            ${statusBadgeHtml}
          </div>
        </div>
        <div style="display:flex; align-items:center; gap:6px;">
          <button class="btn-dl-action btn-toggle-parsed-status" data-index="${i}" title="${isDone ? 'Chuyển sang Chờ làm' : 'Đánh dấu Đã xong'}" style="background:${isDone ? '#10b981' : '#e2e8f0'}; color:${isDone ? '#fff' : '#475569'}; border:none; padding:5px 10px; border-radius:6px; font-size:12px; cursor:pointer; font-weight:700;">
            ${isDone ? '✓ Done' : '◯ Done'}
          </button>
          <button class="btn-dl-action btn-delete-parsed" data-index="${i}" title="Xóa task" style="background:transparent; border:none; color:#ef4444; font-size:16px; cursor:pointer;"><i class="ri-close-line"></i></button>
        </div>
      `;

      card.querySelector('.btn-toggle-parsed-status').addEventListener('click', () => {
        t.status = t.status === 'completed' ? 'pending' : 'completed';
        renderParsedTasksList(currentParsedTasks);
      });

      card.querySelector('.btn-delete-parsed').addEventListener('click', () => {
        currentParsedTasks.splice(i, 1);
        renderParsedTasksList(currentParsedTasks);
      });

      parsedTasksList.appendChild(card);
    });
  }

  document.addEventListener('DOMContentLoaded', init);

})();
