
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

  async function sendEmail() {
    const name = document.getElementById('contact-name')?.value;
    const email = document.getElementById('contact-email')?.value;
    const subject = document.getElementById('contact-subject')?.value;
    const message = document.getElementById('contact-message')?.value;

    if (!name || !email || !message) {
      alert("Please fill in your name, email, and message.");
      return;
    }

    const btn = document.getElementById('send-msg-btn');
    if (!btn) return;
    
    const originalText = btn.textContent;
    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // USER INSTRUCTION: Get your free access key from https://web3forms.com/ and paste it below
          access_key: "52bc3bac-9e9f-4a87-b1c7-c22df8a45266",
          name: name,
          email: email,
          subject: subject || "Contact Form Inquiry",
          message: message,
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        btn.textContent = '✅ Message Sent!';
        // Clear the form fields
        document.getElementById('contact-name').value = '';
        document.getElementById('contact-email').value = '';
        document.getElementById('contact-subject').value = '';
        document.getElementById('contact-message').value = '';
      } else {
        alert("Failed to send: " + result.message);
        btn.textContent = originalText;
      }
    } catch (error) {
      console.error("Error sending email:", error);
      alert("Something went wrong. Please try again.");
      btn.textContent = originalText;
    } finally {
      btn.disabled = false;
      setTimeout(() => {
        if (btn.textContent === '✅ Message Sent!') {
          btn.textContent = 'Send Message →';
        }
      }, 3000);
    }
  }
