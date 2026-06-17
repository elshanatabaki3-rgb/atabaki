/* ============================================
   Behzad Atabaki Trading Co. — Site Scripts
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- Mobile nav toggle ---------- */
  var navToggle = document.getElementById('navToggle');
  var mainNav = document.getElementById('mainNav');
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', function () {
      mainNav.classList.toggle('open');
    });
    mainNav.querySelectorAll('.nav-link').forEach(function (link) {
      link.addEventListener('click', function () {
        mainNav.classList.remove('open');
      });
    });
  }

  /* ---------- Hero slider ---------- */
  var slides = document.querySelectorAll('.slide');
  var dots = document.querySelectorAll('.dot');
  var current = 0;
  var sliderInterval;

  function goToSlide(index) {
    slides[current].classList.remove('active');
    dots[current].classList.remove('active');
    current = (index + slides.length) % slides.length;
    slides[current].classList.add('active');
    dots[current].classList.add('active');
  }

  function nextSlide() { goToSlide(current + 1); }
  function prevSlide() { goToSlide(current - 1); }

  function startAutoplay() {
    sliderInterval = setInterval(nextSlide, 5500);
  }
  function stopAutoplay() {
    clearInterval(sliderInterval);
  }

  var nextBtn = document.getElementById('nextSlide');
  var prevBtn = document.getElementById('prevSlide');
  if (nextBtn) nextBtn.addEventListener('click', function () { nextSlide(); stopAutoplay(); startAutoplay(); });
  if (prevBtn) prevBtn.addEventListener('click', function () { prevSlide(); stopAutoplay(); startAutoplay(); });

  dots.forEach(function (dot, i) {
    dot.addEventListener('click', function () {
      goToSlide(i);
      stopAutoplay();
      startAutoplay();
    });
  });

  if (slides.length) startAutoplay();

  /* ---------- FAQ accordion ---------- */
  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!isOpen) item.classList.add('open');
    });
  });

  /* ---------- File upload label ---------- */
  var attachment = document.getElementById('attachment');
  var fileLabelText = document.getElementById('fileLabelText');
  if (attachment && fileLabelText) {
    attachment.addEventListener('change', function () {
      if (attachment.files.length > 0) {
        fileLabelText.textContent = attachment.files[0].name;
      } else {
        fileLabelText.textContent = 'انتخاب فایل...';
      }
    });
  }

  /* ---------- Header background on scroll ---------- */
  var header = document.getElementById('siteHeader');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 40) {
      header.style.background = 'rgba(6, 13, 26, 0.92)';
    } else {
      header.style.background = 'rgba(6, 13, 26, 0.7)';
    }
  });

  /* ---------- Active nav link on scroll ---------- */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav-link[href^="#"]');
  window.addEventListener('scroll', function () {
    var scrollPos = window.scrollY + 120;
    sections.forEach(function (section) {
      if (scrollPos >= section.offsetTop && scrollPos < section.offsetTop + section.offsetHeight) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + section.id) {
            link.classList.add('active');
          }
        });
      }
    });
  });

  /* ---------- Request form submission ---------- */
  var requestForm = document.getElementById('requestForm');
  var successBox = document.getElementById('successBox');
  var submitBtn = document.getElementById('submitBtn');
  var trackingField = document.getElementById('trackingField');
  var trackingDisplay = document.getElementById('trackingDisplay');
  var newRequestBtn = document.getElementById('newRequestBtn');

  function generateTrackingNumber() {
    var now = new Date();
    var y = now.getFullYear().toString().slice(-2);
    var rand = Math.floor(1000 + Math.random() * 9000);
    return 'BA-' + y + '-' + rand;
  }

  if (requestForm) {
    requestForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var tracking = generateTrackingNumber();
      trackingField.value = tracking;

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').textContent = 'در حال ارسال...';

      var formData = new FormData(requestForm);

      fetch('https://formsubmit.co/elshanatabaki3@gmail.com', {
        method: 'POST',
        body: formData,
        headers: { 'Accept': 'application/json' }
      })
        .then(function () {
          showSuccess(tracking);
        })
        .catch(function () {
          // Even if the network call fails to confirm, FormSubmit
          // typically still receives the POST — but if it truly fails,
          // let the user know rather than silently pretending it worked.
          submitBtn.disabled = false;
          submitBtn.querySelector('.btn-text').textContent = 'ارسال درخواست';
          alert('ارسال درخواست با مشکل مواجه شد. لطفاً دوباره تلاش کنید یا مستقیماً با ما تماس بگیرید.');
        });
    });
  }

  function showSuccess(tracking) {
    trackingDisplay.textContent = tracking;
    requestForm.classList.add('hide');
    successBox.classList.add('show');
    successBox.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }

  if (newRequestBtn) {
    newRequestBtn.addEventListener('click', function () {
      requestForm.reset();
      fileLabelText.textContent = 'انتخاب فایل...';
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'ارسال درخواست';
      successBox.classList.remove('show');
      requestForm.classList.remove('hide');
    });
  }

});
