
  function toggleMenu() {
    document.getElementById('navMenu').classList.toggle('open');
  }

  function showTab(id, btn) {
    document.querySelectorAll('.tab-content').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(id).classList.add('active');
    btn.classList.add('active');
  }

  function selectMilestone(idx) {
    idx = parseInt(idx);
    document.querySelectorAll('.milestone-card').forEach(c => c.classList.remove('active'));
    document.getElementById('ms-' + idx).classList.add('active');
    document.getElementById('msSelect').value = idx;
    document.querySelectorAll('.tl-item').forEach((item, i) => {
      item.classList.toggle('active-tl', i === idx);
    });
  }

  // Animate stats counter on home load
  function animateCounters() {
    document.querySelectorAll('.stat-num').forEach(el => {
      const target = parseInt(el.textContent);
      if (isNaN(target)) return;
      let current = 0;
      const inc = target / 40;
      const timer = setInterval(() => {
        current = Math.min(current + inc, target);
        el.textContent = Math.round(current);
        if (current >= target) clearInterval(timer);
      }, 25);
    });
  }

  window.addEventListener('load', animateCounters);
