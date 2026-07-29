const icons = {
  grid: '<svg viewBox="0 0 24 24"><rect x="4" y="4" width="6" height="6" rx="1"/><rect x="14" y="4" width="6" height="6" rx="1"/><rect x="4" y="14" width="6" height="6" rx="1"/><rect x="14" y="14" width="6" height="6" rx="1"/></svg>',
  flow: '<svg viewBox="0 0 24 24"><rect x="3" y="4" width="6" height="5" rx="1"/><rect x="15" y="15" width="6" height="5" rx="1"/><path d="M9 6.5h4a4 4 0 0 1 4 4V15M7 9v6a3 3 0 0 0 3 3h5"/></svg>',
  agents: '<svg viewBox="0 0 24 24"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="9" r="2.5"/><path d="M3.5 19c.4-4 2.4-6 5.5-6s5.2 2 5.5 6M14 14c3.5-.5 5.6 1.2 6.5 4"/></svg>',
  book: '<svg viewBox="0 0 24 24"><path d="M4 5.5A3.5 3.5 0 0 1 7.5 2H11v17H7.5A3.5 3.5 0 0 0 4 22zM20 5.5A3.5 3.5 0 0 0 16.5 2H13v17h3.5A3.5 3.5 0 0 1 20 22z"/></svg>',
  report: '<svg viewBox="0 0 24 24"><path d="M5 3h14v18H5zM9 8h6M9 12h6M9 16h4"/></svg>',
  gear: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="3"/><path d="M19 13.5l2-1.5-2-1.5-.6-1.5.4-2.5-2.5.4L14.5 5 13 3h-2L9.5 5 8 6.4 5.5 6 6 9l-.7 1.5L3 12l2.3 1.5L6 15l-.5 2.6L8 17.5 9.5 19l1.5 2h2l1.5-2 1.5-1.5 2.6.2L18 15z"/></svg>',
  check: '<svg viewBox="0 0 24 24"><path d="m6 12 4 4 8-9"/></svg>',
  play: '<svg viewBox="0 0 24 24"><path d="m9 6 9 6-9 6z"/></svg>',
  spark: '<svg viewBox="0 0 24 24"><path d="M12 2l1.7 6.3L20 10l-6.3 1.7L12 18l-1.7-6.3L4 10l6.3-1.7zM19 17l.7 2.3L22 20l-2.3.7L19 23l-.7-2.3L16 20l2.3-.7z"/></svg>',
  clock: '<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>',
  branch: '<svg viewBox="0 0 24 24"><circle cx="7" cy="5" r="2"/><circle cx="17" cy="7" r="2"/><circle cx="7" cy="19" r="2"/><path d="M7 7v10M9 14c5 0 8-2 8-5"/></svg>',
};

const pipeline = [
  ['Intake & Analysis', 'Requirements', 'active', 'Understanding business context', '01:24', 'spark'],
  ['Knowledge Retrieval', 'Context', 'done', '12 related artifacts found', '00:48', 'book'],
  ['BRD Generation', 'Documentation', 'done', 'BRD v1.2 generated', '02:16', 'report'],
  ['Backlog Decomposition', 'Planning', 'done', '8 stories · 24 acceptance criteria', '01:37', 'grid'],
  ['Architecture Review', 'Approval gate', 'review', 'Awaiting your approval', '—', 'agents'],
  ['Sprint Planning', 'Planning', 'queued', 'Ready after approval', '—', 'flow'],
  ['Code Generation', 'Development', 'queued', 'Not started', '—', 'gear'],
  ['Git Operations', 'Development', 'queued', 'Not started', '—', 'branch'],
  ['Code Review', 'Quality', 'queued', 'Not started', '—', 'check'],
  ['Sanity & QA Handoff', 'Quality', 'queued', 'Not started', '—', 'check'],
  ['Knowledge Update', 'Context', 'queued', 'Not started', '—', 'book'],
];

const app = document.querySelector('#app');
app.innerHTML = `
  <aside class="sidebar">
    <a class="brand" href="#"><span class="brand-mark">${icons.spark}</span><span>orbit</span></a>
    <nav>
      <p>Workspace</p>
      <a class="active" href="#">${icons.grid}<span>Overview</span></a>
      <a href="#pipeline">${icons.flow}<span>Pipeline</span><b>1</b></a>
      <a href="#">${icons.agents}<span>Agents</span></a>
      <a href="#">${icons.book}<span>Knowledge</span></a>
      <a href="#">${icons.report}<span>Reports</span></a>
      <p>Manage</p>
      <a href="#">${icons.gear}<span>Settings</span></a>
    </nav>
    <div class="sidebar-bottom">
      <div class="status-dot"><i></i><span><strong>All systems operational</strong><small>11 agents connected</small></span></div>
      <div class="profile"><span>AN</span><div><strong>Alex Nguyen</strong><small>Solution Architect</small></div><button>•••</button></div>
    </div>
  </aside>
  <main>
    <header>
      <div><p class="eyebrow">SDLC COMMAND CENTER</p><h1>Good morning, Alex.</h1><p>Here’s what your delivery pipeline is working on today.</p></div>
      <div class="header-actions"><button class="icon-button" aria-label="Notifications"><span class="notify"></span>♢</button><button class="primary" id="new-run">${icons.play} New run</button></div>
    </header>
    <section class="metrics">
      <article><div class="metric-icon purple">${icons.flow}</div><span><small>Active runs</small><strong>3</strong><em class="up">↑ 2 this week</em></span></article>
      <article><div class="metric-icon green">${icons.check}</div><span><small>Completed this month</small><strong>24</strong><em class="up">↑ 18%</em></span></article>
      <article><div class="metric-icon orange">${icons.clock}</div><span><small>Time saved</small><strong>186h</strong><em>Across 24 runs</em></span></article>
      <article><div class="metric-icon blue">${icons.branch}</div><span><small>Traceability</small><strong>98.6%</strong><em class="up">↑ 1.2%</em></span></article>
    </section>
    <section class="workspace">
      <div class="section-heading"><div><h2>Active pipeline</h2><p>Real-time progress across your current delivery run.</p></div><button class="secondary">View all runs <span>→</span></button></div>
      <article class="run-card" id="pipeline">
        <div class="run-head"><div class="run-title"><span class="live">RUNNING</span><h3>Customer self-service refund portal</h3><p><code>RUN-2026-0842</code> · Started 42 minutes ago by Alex Nguyen</p></div><div class="run-score"><span>Overall progress <b>42%</b></span><div><i style="width:42%"></i></div></div></div>
        <div class="pipeline-list">
          ${pipeline.map((step, index) => `<div class="pipeline-row ${step[2]}">
            <div class="step-track"><span>${step[2] === 'done' ? icons.check : index + 1}</span>${index < pipeline.length - 1 ? '<i></i>' : ''}</div>
            <div class="step-icon">${icons[step[5]]}</div>
            <div class="step-info"><strong>${step[0]}</strong><small>${step[1]}</small></div>
            <div class="step-result"><span>${step[3]}</span>${step[2] === 'active' ? '<i class="pulse"></i>' : ''}</div>
            <time>${step[4]}</time>
            ${step[2] === 'review' ? '<button class="review-btn">Review & approve →</button>' : '<button class="more">•••</button>'}
          </div>`).join('')}
        </div>
      </article>
      <div class="lower-grid">
        <article class="activity-card"><div class="card-title"><h2>Recent activity</h2><button>View all</button></div>
          <div class="activity"><span class="avatar purple-bg">BR</span><div><p><strong>BRD Agent</strong> generated <b>BRD v1.2</b></p><small>Customer self-service refund portal · 8 min ago</small></div><em>Document</em></div>
          <div class="activity"><span class="avatar teal-bg">KD</span><div><p><strong>Knowledge Agent</strong> linked 12 related artifacts</p><small>Customer self-service refund portal · 14 min ago</small></div><em>Context</em></div>
          <div class="activity"><span class="avatar orange-bg">AR</span><div><p><strong>Architecture Review</strong> needs your approval</p><small>Mobile onboarding refresh · 26 min ago</small></div><em class="warning">Action needed</em></div>
        </article>
        <article class="insight-card"><span class="insight-icon">${icons.spark}</span><small>ORBIT INSIGHT</small><h3>Your delivery velocity is up <b>18%</b> this month.</h3><p>Approval wait time has dropped by 2.4 hours on average.</p><a href="#">Explore analytics →</a><div class="chart"><i style="height:28%"></i><i style="height:42%"></i><i style="height:38%"></i><i style="height:56%"></i><i style="height:61%"></i><i style="height:72%"></i><i style="height:88%"></i></div></article>
      </div>
    </section>
  </main>
  <dialog id="run-dialog"><button class="close" aria-label="Close">×</button><span class="dialog-icon">${icons.spark}</span><h2>Start a new delivery run</h2><p>Turn a feature requirement into a fully traced delivery pipeline.</p><label>Feature requirement<textarea placeholder="Describe the business requirement and expected outcome..."></textarea></label><div class="dialog-actions"><button class="secondary close-action">Cancel</button><button class="primary start-action">${icons.play} Start pipeline</button></div></dialog>
`;

const dialog = document.querySelector('#run-dialog');
document.querySelector('#new-run').addEventListener('click', () => dialog.showModal());
document.querySelectorAll('.close, .close-action').forEach((button) => button.addEventListener('click', () => dialog.close()));
document.querySelector('.start-action').addEventListener('click', () => {
  const text = dialog.querySelector('textarea').value.trim();
  if (!text) return dialog.querySelector('textarea').focus();
  dialog.close();
  document.querySelector('#new-run').innerHTML = `${icons.check} Run queued`;
  setTimeout(() => (document.querySelector('#new-run').innerHTML = `${icons.play} New run`), 2200);
});
