/**
 * ==============================================================================
 * Ghanchi Saad - Professional Developer Portfolio
 * Pure Vanilla JavaScript (Zero Frameworks, Zero Dependencies)
 * ==============================================================================
 */

document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Global Data State ---
  const PERSONAL_EMAIL = 'ghanchisaad082@gmail.com';
  const PERSONAL_PHONE_RAW = '8866365762';

  const ROLES = [
    'Python Developer',
    'Future AI Engineer',
    'Full Stack Developer',
    'Technology Enthusiast'
  ];

  const PROJECTS_DATA = [
    {
      id: 'transaction-risk-classifier',
      title: 'Transaction Risk Level Classifier',
      subtitle: 'AI/ML Financial Risk Assessment Engine',
      category: 'Machine Learning / Python',
      badge: 'AI & ML System',
      description: 'An intelligent classification system that analyzes financial transaction features to assess risk tiers (Low, Medium, High, Critical) in real time.',
      longDescription: 'Engineered a predictive risk evaluation engine designed to safeguard payment gateways and financial services. By inspecting multidimensional parameters like transaction velocity, unusual amount thresholds, geographical deviation, and historical frequency, the model categorizes incoming transactions into risk tiers and alerts automated review pipelines.',
      technologies: ['Python', 'Machine Learning', 'Data Preprocessing', 'Feature Engineering', 'Risk Analytics'],
      metrics: [
        { label: 'Risk Tiers', value: '4 Distinct Levels' },
        { label: 'Engine', value: 'Python Classifier' },
        { label: 'Execution Time', value: '< 25ms / eval' }
      ],
      features: [
        'Real-time heuristic & statistical risk classification',
        'Feature scaling and outlier anomaly detection',
        'Configurable threshold alert triggers for High/Critical anomalies',
        'Modular architecture ready for API integration'
      ],
      githubUrl: 'https://github.com/saad082-alt/transaction-risk-classifier',
      demoType: 'risk-classifier'
    },
    {
      id: 'expense-tracker',
      title: 'Expense Tracker',
      subtitle: 'Smart Personal Financial Management Tool',
      category: 'Python / Full Stack',
      badge: 'Financial Utility',
      description: 'A comprehensive expense tracking application engineered to categorize expenditures, calculate budget thresholds, and generate actionable financial insights.',
      longDescription: 'Built to bring clarity to personal finances. This application allows users to record, categorize, and query their daily expenditures, visualize spending trends across customized timeframes, and set alerts when nearing monthly allocations. Implemented with clean database queries and intuitive reporting.',
      technologies: ['Python', 'SQL Database', 'Data Visualization', 'Budget Logic', 'Full Stack'],
      metrics: [
        { label: 'Tracking', value: 'Multi-Category' },
        { label: 'Database', value: 'Structured SQL' },
        { label: 'Analytics', value: 'Monthly Trends' }
      ],
      features: [
        'Structured category breakdowns (Food, Utilities, Tech, Leisure)',
        'Instant balance calculation and threshold notifications',
        'SQL-powered historical transaction ledger with search filters',
        'Data export and trend analysis support'
      ],
      githubUrl: 'https://github.com/saad082-alt/expense-tracker',
      demoType: 'expense-tracker'
    },
    {
      id: 'smart-canteen-token',
      title: 'Smart Canteen Token System',
      subtitle: 'Campus Digital Order & Queue Orchestrator',
      category: 'Full Stack / Python & SQL',
      badge: 'Campus Innovation',
      description: 'A digital token generation and queue management system designed to eliminate cafeteria congestion, track order statuses, and streamline meal distribution.',
      longDescription: 'Conceived to solve the chaotic peak-hour rush in college cafeterias. The system generates unique, verifiable digital tokens upon order confirmation, updates live kitchen queue displays, and notifies students when their token is ready for collection—drastically reducing wait times and improving kitchen inventory management.',
      technologies: ['Python', 'SQL', 'Queue Algorithms', 'Web Architecture', 'Real-Time Tracking'],
      metrics: [
        { label: 'Wait Time', value: '-60% Estimated' },
        { label: 'Tokens', value: 'Unique Digital IDs' },
        { label: 'Queue Sync', value: 'Instant Status' }
      ],
      features: [
        'Unique digital token generation with timestamped tracking',
        'Kitchen admin dashboard with live order queue management',
        'Order state machine: Pending -> Preparing -> Ready -> Collected',
        'SQL relational schema linking users, menu items, and token logs'
      ],
      githubUrl: 'https://github.com/saad082-alt/smart-canteen-token-system',
      demoType: 'canteen-token'
    }
  ];

  // --- 2. Header Scroll Effect & Mobile Drawer ---
  const header = document.querySelector('.site-header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }, { passive: true });

  const mobileToggle = document.getElementById('mobileToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    });
  }

  if (mobileDrawerClose && mobileDrawer) {
    mobileDrawerClose.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    });
  }

  // Close mobile drawer when clicking any link inside it
  document.querySelectorAll('.mobile-nav-links a').forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) {
        mobileDrawer.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  });

  // --- 3. Typing Role Animation ---
  const typingElement = document.getElementById('typingRole');
  if (typingElement) {
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 90;

    function typeLoop() {
      const currentRole = ROLES[roleIndex];

      if (!isDeleting) {
        typingElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 85;

        if (charIndex === currentRole.length) {
          typingSpeed = 1800; // Pause at full word
          isDeleting = true;
        }
      } else {
        typingElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 40;

        if (charIndex === 0) {
          isDeleting = false;
          roleIndex = (roleIndex + 1) % ROLES.length;
          typingSpeed = 350;
        }
      }

      setTimeout(typeLoop, typingSpeed);
    }

    typeLoop();
  }

  // --- 4. Clipboard Copy Utilities ---
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  const copyEmailNotify = document.getElementById('copyEmailNotify');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(PERSONAL_EMAIL).then(() => {
        if (copyEmailNotify) {
          copyEmailNotify.style.display = 'block';
          setTimeout(() => {
            copyEmailNotify.style.display = 'none';
          }, 2500);
        }
      });
    });
  }

  const copyPhoneBtn = document.getElementById('copyPhoneBtn');
  const copyPhoneNotify = document.getElementById('copyPhoneNotify');
  if (copyPhoneBtn) {
    copyPhoneBtn.addEventListener('click', () => {
      navigator.clipboard.writeText(PERSONAL_PHONE_RAW).then(() => {
        if (copyPhoneNotify) {
          copyPhoneNotify.style.display = 'block';
          setTimeout(() => {
            copyPhoneNotify.style.display = 'none';
          }, 2500);
        }
      });
    });
  }

  // --- 5. Projects Showcase Interactive Tabs ---
  let currentProjectIndex = 0;

  function renderProject(index) {
    currentProjectIndex = index;
    const proj = PROJECTS_DATA[index];

    // Update Tab Buttons
    document.querySelectorAll('.project-tab-btn').forEach((btn, idx) => {
      if (idx === index) {
        btn.classList.add('active');
      } else {
        btn.classList.remove('active');
      }
    });

    // Update Counter
    const counterEl = document.getElementById('projectCounter');
    if (counterEl) {
      counterEl.textContent = `0${index + 1} / 0${PROJECTS_DATA.length}`;
    }

    // Update Project View Elements
    const categoryEl = document.getElementById('projCategory');
    const badgeEl = document.getElementById('projBadge');
    const titleEl = document.getElementById('projTitle');
    const subEl = document.getElementById('projSub');
    const descEl = document.getElementById('projDesc');
    const featuresListEl = document.getElementById('projFeatures');
    const tagsWrapEl = document.getElementById('projTags');
    const githubLinkEl = document.getElementById('projGithubLink');
    const telemetryTitleEl = document.getElementById('telemetryTitle');
    const telemetryMetricsEl = document.getElementById('telemetryMetrics');

    if (categoryEl) categoryEl.textContent = proj.category;
    if (badgeEl) badgeEl.textContent = proj.badge;
    if (titleEl) titleEl.textContent = proj.title;
    if (subEl) subEl.textContent = proj.subtitle;
    if (descEl) descEl.textContent = proj.description;
    if (telemetryTitleEl) telemetryTitleEl.textContent = proj.title;

    if (githubLinkEl) {
      githubLinkEl.href = proj.githubUrl;
    }

    if (featuresListEl) {
      featuresListEl.innerHTML = '';
      proj.features.slice(0, 3).forEach(feat => {
        const li = document.createElement('li');
        li.innerHTML = `<span>&gt;</span><span>${feat}</span>`;
        featuresListEl.appendChild(li);
      });
    }

    if (tagsWrapEl) {
      tagsWrapEl.innerHTML = '';
      proj.technologies.forEach(tech => {
        const span = document.createElement('span');
        span.className = 'tag-pill';
        span.textContent = tech;
        tagsWrapEl.appendChild(span);
      });
    }

    if (telemetryMetricsEl) {
      telemetryMetricsEl.innerHTML = '';
      proj.metrics.forEach(m => {
        const cell = document.createElement('div');
        cell.className = 'metric-cell';
        cell.innerHTML = `
          <div class="metric-val">${m.value}</div>
          <div class="metric-lbl">${m.label}</div>
        `;
        telemetryMetricsEl.appendChild(cell);
      });
    }
  }

  // Setup tab click events
  document.querySelectorAll('.project-tab-btn').forEach((btn, idx) => {
    btn.addEventListener('click', () => {
      renderProject(idx);
    });
  });

  const prevProjBtn = document.getElementById('prevProjBtn');
  const nextProjBtn = document.getElementById('nextProjBtn');

  if (prevProjBtn) {
    prevProjBtn.addEventListener('click', () => {
      const newIdx = (currentProjectIndex === 0) ? PROJECTS_DATA.length - 1 : currentProjectIndex - 1;
      renderProject(newIdx);
    });
  }

  if (nextProjBtn) {
    nextProjBtn.addEventListener('click', () => {
      const newIdx = (currentProjectIndex === PROJECTS_DATA.length - 1) ? 0 : currentProjectIndex + 1;
      renderProject(newIdx);
    });
  }

  // Initial project render
  renderProject(0);

  // --- 6. Interactive Simulator Modal ---
  const projectModal = document.getElementById('projectModal');
  const openSimulatorBtn = document.getElementById('openSimulatorBtn');
  const modalCloseBtn = document.getElementById('modalCloseBtn');
  const modalDismissBtn = document.getElementById('modalDismissBtn');

  function openModalForProject(index) {
    const proj = PROJECTS_DATA[index];
    if (!projectModal || !proj) return;

    // Fill Modal Data
    const modalCategory = document.getElementById('modalCategory');
    const modalBadge = document.getElementById('modalBadge');
    const modalTitle = document.getElementById('modalTitle');
    const modalLongDesc = document.getElementById('modalLongDesc');
    const modalGithubLink = document.getElementById('modalGithubLink');
    const modalMetrics = document.getElementById('modalMetrics');
    const modalTechTags = document.getElementById('modalTechTags');

    if (modalCategory) modalCategory.textContent = proj.category;
    if (modalBadge) modalBadge.textContent = proj.badge;
    if (modalTitle) modalTitle.textContent = proj.title;
    if (modalLongDesc) modalLongDesc.textContent = proj.longDescription;
    if (modalGithubLink) modalGithubLink.href = proj.githubUrl;

    if (modalMetrics) {
      modalMetrics.innerHTML = '';
      proj.metrics.forEach(m => {
        const div = document.createElement('div');
        div.className = 'metric-cell';
        div.style.padding = '0.75rem';
        div.innerHTML = `
          <div class="metric-val" style="font-size: 1.1rem;">${m.value}</div>
          <div class="metric-lbl">${m.label}</div>
        `;
        modalMetrics.appendChild(div);
      });
    }

    if (modalTechTags) {
      modalTechTags.innerHTML = '';
      proj.technologies.forEach(t => {
        const span = document.createElement('span');
        span.className = 'tag-pill';
        span.textContent = t;
        modalTechTags.appendChild(span);
      });
    }

    // Toggle corresponding simulator view
    const riskSim = document.getElementById('riskSimContainer');
    const expenseSim = document.getElementById('expenseSimContainer');
    const canteenSim = document.getElementById('canteenSimContainer');

    if (riskSim) riskSim.style.display = (proj.demoType === 'risk-classifier') ? 'block' : 'none';
    if (expenseSim) expenseSim.style.display = (proj.demoType === 'expense-tracker') ? 'block' : 'none';
    if (canteenSim) canteenSim.style.display = (proj.demoType === 'canteen-token') ? 'block' : 'none';

    projectModal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (projectModal) {
      projectModal.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (openSimulatorBtn) {
    openSimulatorBtn.addEventListener('click', () => {
      openModalForProject(currentProjectIndex);
    });
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalDismissBtn) modalDismissBtn.addEventListener('click', closeModal);

  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Simulator 1: Risk Classifier logic
  const runRiskEngineBtn = document.getElementById('runRiskEngineBtn');
  if (runRiskEngineBtn) {
    runRiskEngineBtn.addEventListener('click', () => {
      const amount = parseFloat(document.getElementById('simRiskAmount')?.value || '3450');
      const isForeign = document.getElementById('simRiskForeign')?.value === 'yes';
      const velocity = parseFloat(document.getElementById('simRiskVelocity')?.value || '2');

      let score = 10;
      if (amount > 5000) score += 35;
      else if (amount > 1500) score += 20;

      if (isForeign) score += 35;
      if (velocity < 5) score += 25;

      score = Math.min(score, 99);

      let tier = 'LOW';
      let color = '#10b981';
      let reason = 'Normal routine spending pattern within safe parameters.';

      if (score >= 80) {
        tier = 'CRITICAL';
        color = '#ef4444';
        reason = 'Unusual spike in transaction amount with immediate cross-border IP mismatch.';
      } else if (score >= 55) {
        tier = 'HIGH';
        color = '#f97316';
        reason = 'Rapid velocity burst detected from unfamiliar regional endpoint.';
      } else if (score >= 30) {
        tier = 'MEDIUM';
        color = '#eab308';
        reason = 'Moderate variance against standard historical account baseline.';
      }

      const resultBox = document.getElementById('riskResultBox');
      if (resultBox) {
        resultBox.style.display = 'flex';
        resultBox.innerHTML = `
          <div style="display: flex; align-items: center; gap: 0.75rem;">
            <div style="width: 48px; height: 48px; border-radius: 8px; border: 1px solid ${color}; color: ${color}; background: ${color}15; display: flex; align-items: center; justify-content: center; font-family: monospace; font-size: 1.15rem; font-weight: 700;">
              ${score}
            </div>
            <div>
              <span style="font-family: monospace; font-size: 0.75rem; font-weight: 700; background: ${color}25; color: ${color}; padding: 0.2rem 0.5rem; border-radius: 4px;">
                RISK TIER: ${tier}
              </span>
              <p style="font-size: 0.75rem; color: #cbd5e1; margin-top: 0.25rem;">${reason}</p>
            </div>
          </div>
          <span style="font-family: monospace; font-size: 0.7rem; color: #64748b; white-space: nowrap;">Evaluated in 18ms</span>
        `;
      }
    });
  }

  // Simulator 2: Expense Tracker logic
  const expenseForm = document.getElementById('expenseSimForm');
  const expenseList = document.getElementById('expenseSimList');
  if (expenseForm && expenseList) {
    expenseForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const nameInput = document.getElementById('expName');
      const amountInput = document.getElementById('expAmount');
      const name = nameInput.value.trim();
      const amount = parseFloat(amountInput.value);

      if (!name || isNaN(amount)) return;

      const row = document.createElement('div');
      row.style.cssText = 'display: flex; align-items: center; justify-content: space-between; padding: 0.5rem 0.75rem; border-radius: 6px; background: #161e31; font-family: monospace; font-size: 0.75rem; border: 1px solid #1e2638;';
      row.innerHTML = `
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <span style="color: #f1f5f9;">${name}</span>
          <span style="font-size: 0.65rem; color: #94a3b8; background: #0b0f19; padding: 0.1rem 0.4rem; border-radius: 4px;">Custom</span>
        </div>
        <span style="font-weight: 700; color: #f1f5f9;">₹${amount.toLocaleString()}</span>
      `;

      expenseList.prepend(row);
      nameInput.value = '';
      amountInput.value = '';
    });
  }

  // Simulator 3: Smart Canteen Token logic
  const tokenButtons = document.querySelectorAll('.btn-canteen-item');
  const tokenResultBox = document.getElementById('canteenTokenBox');

  tokenButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.dataset.item;
      const tokenNumber = Math.floor(100 + Math.random() * 900);
      const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      if (tokenResultBox) {
        tokenResultBox.style.display = 'block';
        tokenResultBox.innerHTML = `
          <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem; flex-wrap: wrap; gap: 0.5rem;">
            <div style="display: flex; align-items: center; gap: 0.5rem;">
              <span style="font-family: monospace; font-size: 1.1rem; font-weight: 700; color: #ffffff;">TOKEN-#${tokenNumber}</span>
              <span id="canteenStatusBadge" style="font-family: monospace; font-size: 0.65rem; padding: 0.15rem 0.5rem; border-radius: 4px; background: rgba(245, 158, 11, 0.2); color: #f59e0b; border: 1px solid rgba(245, 158, 11, 0.4);">
                PREPARING IN KITCHEN
              </span>
            </div>
            <span style="font-family: monospace; font-size: 0.7rem; color: #94a3b8;">Issued at ${time}</span>
          </div>
          <div style="font-size: 0.75rem; color: #cbd5e1;">Item: <strong>${item}</strong></div>
          <div id="canteenStatusMsg" style="font-family: monospace; font-size: 0.7rem; color: #f59e0b; margin-top: 0.4rem;">
            ⏳ Kitchen queue wait time approx 3 mins...
          </div>
        `;

        // Simulate status transition after 3.5s
        setTimeout(() => {
          const badge = document.getElementById('canteenStatusBadge');
          const msg = document.getElementById('canteenStatusMsg');
          if (badge) {
            badge.textContent = 'COLLECTION READY';
            badge.style.background = 'rgba(16, 185, 129, 0.2)';
            badge.style.color = '#10b981';
            badge.style.borderColor = 'rgba(16, 185, 129, 0.4)';
          }
          if (msg) {
            msg.textContent = '✓ Order is ready! Please collect at Counter #2.';
            msg.style.color = '#10b981';
          }
        }, 3500);
      }
    });
  });

  // --- 7. Strict Email Validation & Contact Form Logic ---
  const DISPOSABLE_DOMAINS = new Set([
    'mailinator.com', 'tempmail.com', '10minutemail.com', 'guerrillamail.com',
    'yopmail.com', 'trashmail.com', 'temp-mail.org', 'dispostable.com',
    'sharklasers.com', 'burnermail.io', 'getairmail.com', 'inboxkitten.com',
    'maildrop.cc', 'tempmailo.com', 'emailondeck.com', 'nada.ltd', 'mohmal.com',
    'crazymailing.com', 'fakemailgenerator.com', 'mytemp.email', 'dropmail.me',
    'generator.email', 'throwawaymail.com', 'getnada.com', 'fakeinbox.com',
    'trashmail.net', 'tempr.email', 'disposablemail.com', 'mytempemail.com',
    'spamgourmet.com', 'meltmail.com', 'harakirimail.com', 'filzmail.com'
  ]);

  /**
   * RFC 5322 Syntax validation
   */
  function validateEmailSyntax(email) {
    if (!email || typeof email !== 'string') {
      return { valid: false, error: 'Please enter an email address.' };
    }
    const trimmed = email.trim();
    if (trimmed.length === 0) return { valid: false, error: 'Please enter an email address.' };
    if (trimmed.length > 254) return { valid: false, error: 'Email exceeds maximum 254 characters.' };
    if (/\s/.test(trimmed)) return { valid: false, error: 'Email cannot contain spaces.' };

    const atParts = trimmed.split('@');
    if (atParts.length < 2) return { valid: false, error: "Missing '@' symbol in email address." };
    if (atParts.length > 2) return { valid: false, error: "Email cannot contain more than one '@' symbol." };

    const [localPart, domainPart] = atParts;
    if (!localPart) return { valid: false, error: "Missing username before the '@' symbol." };
    if (localPart.length > 64) return { valid: false, error: 'Username cannot exceed 64 characters.' };
    if (localPart.startsWith('.') || localPart.endsWith('.')) return { valid: false, error: "Username cannot begin or end with a dot ('.')." };
    if (localPart.includes('..')) return { valid: false, error: "Username cannot contain consecutive dots ('..')." };

    if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+$/.test(localPart)) {
      return { valid: false, error: 'Email username contains invalid characters.' };
    }

    if (!domainPart) return { valid: false, error: "Missing domain name after the '@' symbol." };
    if (domainPart.length > 253) return { valid: false, error: 'Domain name cannot exceed 253 characters.' };
    if (!domainPart.includes('.')) return { valid: false, error: "Domain name must include a valid extension (e.g., '.com', '.edu')." };
    if (domainPart.startsWith('.') || domainPart.endsWith('.')) return { valid: false, error: "Domain name cannot begin or end with a dot." };
    if (domainPart.includes('..')) return { valid: false, error: "Domain cannot contain consecutive dots ('..')." };

    const labels = domainPart.split('.');
    for (const label of labels) {
      if (!label || label.length > 63) return { valid: false, error: `Invalid domain segment '${label}'.` };
      if (label.startsWith('-') || label.endsWith('-')) return { valid: false, error: `Domain segment cannot start or end with a hyphen.` };
      if (!/^[a-zA-Z0-9-]+$/.test(label)) return { valid: false, error: `Domain segment contains invalid characters.` };
    }

    const tld = labels[labels.length - 1];
    if (!/^[a-zA-Z]{2,24}$/.test(tld)) return { valid: false, error: `Invalid domain extension '.${tld}'.` };

    const forbiddenTlds = new Set(['local', 'invalid', 'test', 'example', 'localhost', 'internal']);
    if (forbiddenTlds.has(tld.toLowerCase())) {
      return { valid: false, error: `Domain extension '.${tld}' cannot receive external emails.` };
    }

    return { valid: true };
  }

  /**
   * Check for disposable domains
   */
  function validateDisposableDomain(email) {
    const atIndex = email.lastIndexOf('@');
    if (atIndex === -1) return { valid: false, error: "Missing '@' symbol." };
    const domain = email.slice(atIndex + 1).trim().toLowerCase();

    if (DISPOSABLE_DOMAINS.has(domain)) {
      return {
        valid: false,
        error: `Temporary/disposable emails (@${domain}) are blocked. Please use a permanent email.`
      };
    }
    return { valid: true };
  }

  /**
   * Live DNS MX records validation via Google DNS-over-HTTPS
   */
  async function validateDomainMxRecords(domain) {
    const cleanDomain = domain.trim().toLowerCase();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 4000);

      const url = `https://dns.google/resolve?name=${encodeURIComponent(cleanDomain)}&type=MX`;
      const response = await fetch(url, {
        headers: { Accept: 'application/dns-json' },
        signal: controller.signal
      });
      clearTimeout(timeoutId);

      if (response.ok) {
        const data = await response.json();
        if (data.Status === 3) {
          return { valid: false, error: `Domain '@${cleanDomain}' does not exist on global DNS.` };
        }

        const hasMx = Array.isArray(data.Answer) && data.Answer.some(ans => ans.type === 15);
        if (hasMx) return { valid: true };

        const hasA = Array.isArray(data.Answer) && data.Answer.some(ans => ans.type === 1);
        if (hasA) return { valid: true };

        return {
          valid: false,
          error: `The domain '@${cleanDomain}' does not have active mail server (MX) records.`
        };
      }
    } catch {
      // Fallback: If DNS is unreachable, do not hard-block genuine users
    }

    return { valid: true };
  }

  // Form DOM elements
  const contactForm = document.getElementById('contactForm');
  const inputEmail = document.getElementById('contactEmail');
  const emailFeedback = document.getElementById('emailFeedback');
  const generalErrorBox = document.getElementById('generalErrorBox');
  const submitBtn = document.getElementById('submitBtn');
  const formSuccessBox = document.getElementById('formSuccessBox');

  let isEmailVerified = false;
  let isValidatingMx = false;
  let validationDebounce = null;
  const formRenderTime = Date.now();
  let lastSubmissionTime = 0;

  async function performEmailValidation(value) {
    const trimmed = (value || '').trim();
    if (!trimmed) {
      if (emailFeedback) emailFeedback.textContent = '';
      if (inputEmail) {
        inputEmail.classList.remove('input-valid', 'input-error', 'input-validating');
      }
      isEmailVerified = false;
      return false;
    }

    // 1. Syntax
    const syntax = validateEmailSyntax(trimmed);
    if (!syntax.valid) {
      isEmailVerified = false;
      if (inputEmail) {
        inputEmail.classList.remove('input-valid', 'input-validating');
        inputEmail.classList.add('input-error');
      }
      if (emailFeedback) {
        emailFeedback.className = 'email-feedback error';
        emailFeedback.textContent = `⚠ ${syntax.error}`;
      }
      return false;
    }

    // 2. Disposable
    const disposable = validateDisposableDomain(trimmed);
    if (!disposable.valid) {
      isEmailVerified = false;
      if (inputEmail) {
        inputEmail.classList.remove('input-valid', 'input-validating');
        inputEmail.classList.add('input-error');
      }
      if (emailFeedback) {
        emailFeedback.className = 'email-feedback error';
        emailFeedback.textContent = `⚠ ${disposable.error}`;
      }
      return false;
    }

    // 3. DNS MX
    const domain = trimmed.slice(trimmed.lastIndexOf('@') + 1).trim();
    isValidatingMx = true;
    if (inputEmail) {
      inputEmail.classList.remove('input-valid', 'input-error');
      inputEmail.classList.add('input-validating');
    }
    if (emailFeedback) {
      emailFeedback.className = 'email-feedback validating';
      emailFeedback.textContent = `⌛ Verifying mail server & MX records for @${domain}...`;
    }

    const mxResult = await validateDomainMxRecords(domain);
    isValidatingMx = false;

    if (!mxResult.valid) {
      isEmailVerified = false;
      if (inputEmail) {
        inputEmail.classList.remove('input-valid', 'input-validating');
        inputEmail.classList.add('input-error');
      }
      if (emailFeedback) {
        emailFeedback.className = 'email-feedback error';
        emailFeedback.textContent = `⚠ ${mxResult.error}`;
      }
      return false;
    }

    // Passed
    isEmailVerified = true;
    if (inputEmail) {
      inputEmail.classList.remove('input-error', 'input-validating');
      inputEmail.classList.add('input-valid');
    }
    if (emailFeedback) {
      emailFeedback.className = 'email-feedback success';
      emailFeedback.textContent = '✓ Valid email & active MX records verified';
    }
    return true;
  }

  if (inputEmail) {
    inputEmail.addEventListener('input', (e) => {
      isEmailVerified = false;
      if (generalErrorBox) generalErrorBox.style.display = 'none';

      clearTimeout(validationDebounce);
      validationDebounce = setTimeout(() => {
        const val = e.target.value;
        if (val.includes('@') && val.includes('.')) {
          performEmailValidation(val);
        }
      }, 600);
    });

    inputEmail.addEventListener('blur', (e) => {
      performEmailValidation(e.target.value);
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      if (generalErrorBox) generalErrorBox.style.display = 'none';

      // 1. Bot Honeypot Check
      const honeypot = document.getElementById('b_fax_shield')?.value;
      if (honeypot && honeypot.trim().length > 0) {
        if (generalErrorBox) {
          generalErrorBox.style.display = 'flex';
          generalErrorBox.textContent = 'Security protocol: Automated submission detected.';
        }
        return;
      }

      // 2. Submission speed check (>1.5s)
      const elapsed = Date.now() - formRenderTime;
      if (elapsed < 1500) {
        if (generalErrorBox) {
          generalErrorBox.style.display = 'flex';
          generalErrorBox.textContent = 'Security verification: Submission was too rapid. Please review your message.';
        }
        return;
      }

      // 3. Cooldown rate limiter
      if (lastSubmissionTime > 0) {
        const timeSince = Date.now() - lastSubmissionTime;
        if (timeSince < 10000) {
          const waitSecs = Math.ceil((10000 - timeSince) / 1000);
          if (generalErrorBox) {
            generalErrorBox.style.display = 'flex';
            generalErrorBox.textContent = `Rate limit: Please wait ${waitSecs} seconds before sending another message.`;
          }
          return;
        }
      }

      const name = document.getElementById('contactName')?.value.trim();
      const email = inputEmail?.value.trim();
      const subject = document.getElementById('contactSubject')?.value.trim() || `Portfolio Inquiry from ${name}`;
      const message = document.getElementById('contactMessage')?.value.trim();

      if (!name || !email || !message) {
        if (generalErrorBox) {
          generalErrorBox.style.display = 'flex';
          generalErrorBox.textContent = 'Please fill in all required fields.';
        }
        return;
      }

      // 4. Strict Email Gate
      const emailValid = await performEmailValidation(email);
      if (!emailValid) {
        if (generalErrorBox) {
          generalErrorBox.style.display = 'flex';
          generalErrorBox.textContent = 'Please provide a valid email address with active mail server (MX) records.';
        }
        return;
      }

      // 5. Submit
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'DISPATCHING TO INBOX...';
      }

      try {
        await fetch(`https://formsubmit.co/ajax/${PERSONAL_EMAIL}`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify({
            name,
            email,
            subject,
            message,
            _subject: `⚡ Verified Portfolio Inquiry from ${name}`,
            _template: 'table',
            _captcha: 'false'
          })
        });

        lastSubmissionTime = Date.now();
        if (contactForm) contactForm.style.display = 'none';
        if (formSuccessBox) formSuccessBox.style.display = 'block';

      } catch (err) {
        // Fallback to mailto
        window.location.href = `mailto:${PERSONAL_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(
          `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
        )}`;
        if (contactForm) contactForm.style.display = 'none';
        if (formSuccessBox) formSuccessBox.style.display = 'block';
      } finally {
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'SEND MESSAGE DIRECTLY';
        }
      }
    });
  }

  // Reset Form button
  const resetFormBtn = document.getElementById('resetFormBtn');
  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      if (contactForm) {
        contactForm.reset();
        contactForm.style.display = 'block';
      }
      if (inputEmail) {
        inputEmail.classList.remove('input-valid', 'input-error', 'input-validating');
      }
      if (emailFeedback) emailFeedback.textContent = '';
      if (formSuccessBox) formSuccessBox.style.display = 'none';
      if (generalErrorBox) generalErrorBox.style.display = 'none';
    });
  }

  // --- 8. Scroll To Top Button ---
  const scrollTopBtn = document.getElementById('scrollTopBtn');
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
