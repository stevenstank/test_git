const FRIEND_NAME = 'Tanmay';
const TIMELINE = [
  {
    date: 'First Photo Together',
    img: 'images/first_photo.jpeg',
    text: "Officially first hangout tha ye humara"
  },
  {
    date: 'Our Son',
    img: 'images/roberto.jpeg',
    text: 'Roberto will always be in our hearts'
  },
  {
    date: 'Pehli baar baarish mein bheegna',
    img: 'images/rain.jpeg',
    text: 'The ice-cream was totally worth it'
  },
  {
    date: 'First Allnighterrrrrrrr',
    img: 'images/an.jpeg',
    text: 'Kya crazy din tha bhaiiiii'
  }
];

const body = document.body;
const themeToggleBtn = document.getElementById('themeToggleBtn');

function setTheme(isLight) {
  if (isLight) {
    body.classList.add('light-mode');
    themeToggleBtn.innerHTML = '🌙 Dark Mode';
  } else {
    body.classList.remove('light-mode');
    themeToggleBtn.innerHTML = '☀️ Light Mode';
  }
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'light') {
  setTheme(true);
}

themeToggleBtn.addEventListener('click', () => {
  const isCurrentlyLight = body.classList.contains('light-mode');
  setTheme(!isCurrentlyLight);
  localStorage.setItem('theme', isCurrentlyLight ? 'dark' : 'light');
});

const name = document.getElementById('namePlace');
if (name) name.textContent = FRIEND_NAME;

const timeline = document.getElementById('timeline');

function buildTimeline() {
  if (!timeline) return;

  timeline.innerHTML = '';

  TIMELINE.forEach((item, idx) => {
    const side = (idx % 2 === 0) ? 'left' : 'right';
    const entry = document.createElement('div');
    entry.className = `entry ${side}`;
    entry.dataset.index = idx;

    const tape = document.createElement('div');
    tape.className = 'tape';
    entry.appendChild(tape);

    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = item.date;
    entry.appendChild(date);

    const pol = document.createElement('div');
    pol.className = 'polaroid';

    const im = document.createElement('img');
    im.src = item.img;
    im.alt = item.text;
    pol.appendChild(im);

    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = item.text;
    pol.appendChild(caption);

    entry.appendChild(pol);
    timeline.appendChild(entry);

    pol.addEventListener('click', () => openModal(idx));
  });

  observeEntries();
}

buildTimeline();

function observeEntries() {
  const entries = document.querySelectorAll('.entry');

  const observer = new IntersectionObserver((items) => {
    items.forEach(item => {
      if (item.isIntersecting) {
        item.target.classList.add('visible');
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  entries.forEach(entry => observer.observe(entry));
}

let currentIndex = 0;

function openModal(index) {
  currentIndex = index;
  updateModal();
  document.getElementById('photoModal').classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  document.getElementById('photoModal').classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateModal() {
  const item = TIMELINE[currentIndex];
  document.getElementById('modalImg').src = item.img;
  document.getElementById('modalDate').textContent = item.date;
  document.getElementById('modalCaption').textContent = item.text;

  document.getElementById('prevBtn').disabled = currentIndex === 0;
  document.getElementById('nextBtn').disabled = currentIndex === TIMELINE.length - 1;
}

document.getElementById('modalClose').addEventListener('click', closeModal);
document.getElementById('photoModal').addEventListener('click', (e) => {
  if (e.target.id === 'photoModal') closeModal();
});

document.getElementById('prevBtn').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    updateModal();
  }
});

document.getElementById('nextBtn').addEventListener('click', () => {
  if (currentIndex < TIMELINE.length - 1) {
    currentIndex++;
    updateModal();
  }
});

document.addEventListener('keydown', (e) => {
  const modal = document.getElementById('photoModal');
  if (!modal.classList.contains('active')) return;

  if (e.key === 'Escape') closeModal();
  if (e.key === 'ArrowLeft' && currentIndex > 0) {
    currentIndex--;
    updateModal();
  }
  if (e.key === 'ArrowRight' && currentIndex < TIMELINE.length - 1) {
    currentIndex++;
    updateModal();
  }
});

const confettiCanvas = document.getElementById('confettiCanvas');
let ctx = confettiCanvas.getContext('2d');
let pieces = [];

function resize() {
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function makeConfetti(x, y) {
  for (let i = 0; i < 24; i++) {
    pieces.push({
      x: x + (Math.random() - 0.5) * 120,
      y: y + (Math.random() - 0.5) * 60,
      vx: (Math.random() - 0.5) * 6,
      vy: Math.random() * -8 - 2,
      r: Math.random() * 6 + 3,
      color: `hsl(${Math.random() * 60 + 10},80%,60%)`,
      life: 0
    });
  }
}

function animate() {
  ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);

  for (let i = pieces.length - 1; i >= 0; i--) {
    const p = pieces[i];
    p.vy += 0.3;
    p.x += p.vx;
    p.y += p.vy;
    p.life++;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(p.x, p.y, p.r, p.r * 0.6, 0, 0, Math.PI * 2);
    ctx.fill();

    if (p.y > confettiCanvas.height + 20 || p.life > 160) {
      pieces.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}
animate();

document.getElementById('confettiBtn').addEventListener('click', () => {
  for (let i = 0; i < 16; i++) {
    makeConfetti(Math.random() * confettiCanvas.width, Math.random() * confettiCanvas.height / 2);
  }
});

document.getElementById('revealBtn').addEventListener('click', () => {
  makeConfetti(confettiCanvas.width / 2, confettiCanvas.height / 3);

  const note = document.createElement('div');
  note.className = 'card msg';
  note.style.position = 'fixed';
  note.style.left = '50%';
  note.style.top = '18%';
  note.style.transform = 'translateX(-50%)';
  note.style.zIndex = '10000';
  note.style.maxWidth = '92%';
  note.innerHTML = `
<h3 style="margin:0;">🎁 Surprise!</h3>
<p style="margin-top:8px;"> yr aap pls suprise hojao yr pls yr ❤️</p>

`;

  document.body.appendChild(note);
  setTimeout(() => note.remove(), 3800);
});

const surpriseURL = 'https://stevenstank.github.io/surprise/#autostart';

document.getElementById('secondarySurpriseBtn').addEventListener('click', () => {
  window.location.href = surpriseURL;
});
