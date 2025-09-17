
const sideBar = document.querySelector('.sidebar');
const menu = document.querySelector('.menu-icon');
const closeIcon = document.querySelector('.close-icon');

menu?.addEventListener("click", () => {
    sideBar?.classList.add("show");
});

closeIcon?.addEventListener("click", () => {
    sideBar?.classList.remove("show");
});


particlesJS.load('particles-js', 'particles.json', () => {
    console.log(' Particles background loaded');
});


{
(() => {
  const meters = document.querySelectorAll('.skill-meter');

  // Reset a meter to 0%
  function resetMeter(meter){
    const ring = meter.querySelector('.ring');
    const valueEl = meter.querySelector('.value');
    ring.style.setProperty('--p', 0);
    valueEl.textContent = '0%';
  }

  // Animate one meter to its target value
  function animateMeter(meter, duration = 1200){
    const ring = meter.querySelector('.ring');
    const valueEl = meter.querySelector('.value');
    const target = Math.min(100, Math.max(0, parseInt(meter.dataset.value || '0', 10)));
    const accent = meter.dataset.accent || getComputedStyle(ring).getPropertyValue('--accent') || '#9b5cff';

    let start = null;
    function tick(ts){
      if(!start) start = ts;
      const t = Math.min(1, (ts - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3); // easeOutCubic
      const current = Math.round(eased * target);

      ring.style.setProperty('--p', current);
      ring.style.setProperty('--accent', accent);
      valueEl.textContent = current + '%';

      if(t < 1) requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }

  const startAll = () => meters.forEach(m => animateMeter(m));
  const resetAll = () => meters.forEach(m => resetMeter(m));

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if ('IntersectionObserver' in window && !prefersReduced){
    const sec = document.getElementById('skills') || document.querySelector('.skills-section');
    if (sec){
      const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
          if(e.isIntersecting){
            startAll();   // animate when in view
          } else {
            resetAll();   // reset when out of view
          }
        });
      }, { threshold: .25 });
      io.observe(sec);
    } else {
      startAll();
    }
  } else {
    // Fallback: start immediately
    startAll();
  }
})();}


// for email
  {
const form = document.getElementById("contactForm");
const successMsg = document.getElementById("successMsg");
const errorMsg = document.getElementById("errorMsg");

form.addEventListener("submit", async function(e) {
  e.preventDefault();

  const formData = new FormData(form);

  try {
    let response = await fetch(form.action, {
      method: form.method,
      body: formData,
      headers: { 'Accept': 'application/json' }
    });

    if (response.ok) {
      form.reset();
      successMsg.style.display = "block";
      errorMsg.style.display = "none";
      setTimeout(() => successMsg.style.display = "none", 5000);
    } else {
      errorMsg.style.display = "block";
      successMsg.style.display = "none";
    }
  } catch (error) {
    errorMsg.style.display = "block";
    successMsg.style.display = "none";
  }
});
  }
