// Lightbox
    function openLB(title, sub) {
      document.getElementById('lb-title').textContent = title;
      document.getElementById('lb-sub').textContent = sub;
      document.getElementById('lightbox').classList.add('open');
      document.body.style.overflow = 'hidden';
    }
    function closeLB() {
      document.getElementById('lightbox').classList.remove('open');
      document.body.style.overflow = '';
    }
    document.getElementById('lightbox').addEventListener('click', e => {
      if (e.target === document.getElementById('lightbox')) closeLB();
    });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLB(); });

    // Scroll reveal
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.style.opacity = '1';
          e.target.style.transform = 'translateY(0)';
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.07 });

    document.querySelectorAll('.coll-item, .feat-item, .format-item, .artist-img-wrap, .artist-text').forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(28px)';
      el.style.transition = 'opacity 0.75s ease, transform 0.75s ease';
      io.observe(el);
    });

    // Contact form
    function submitForm() {
      const name = document.getElementById('cf-name').value.trim();
      if (!name) { alert('Please enter your name.'); return; }
      alert('Thank you — your inquiry has been sent. I\'ll be in touch shortly.');
    }

const slides = document.querySelectorAll(".hero-slide");

if (slides.length > 0) {

    let currentSlide = 0;

    slides[0].classList.add("active");

    setInterval(() => {

        const previous = currentSlide;

        currentSlide =
            (currentSlide + 1) % slides.length;

        slides[currentSlide]
            .classList.add("active");

        setTimeout(() => {
            slides[previous]
                .classList.remove("active");
        }, 2500);

    }, 5000);

}