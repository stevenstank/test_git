// Data
const FRIEND_NAME = 'Tanmay';
const TIMELINE = [
  {
    date:'First Photo Together',
    img:'',
    text:"Officially first hangout tha ye humara"
  },
  {
    date:'Our Son',
    img:'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=800&auto=format&fit=crop',
    text:'Roberto will always be in our hearts'
  },
  {
    date:'Pehli baar baarish mein bheegna',
    img:'https://images.unsplash.com/photo-1517841905240-472988babdf9?q=80&w=800&auto=format&fit=crop',
    text:'The ice-cream was totally worth it'
  },
  {
    date:'First Allnighterrrrrrrr',
    img:'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop',
    text:'Kya crazy din tha bhaiiiii'
  }
];

// Set name
const name = document.getElementById('namePlace');
if(name) name.textContent = FRIEND_NAME;

// Build timeline
const timeline = document.getElementById('timeline');

function buildTimeline(){
  if(!timeline) return;

  timeline.innerHTML = '';

  TIMELINE.forEach((item, idx)=>{
    const side = (idx % 2 === 0) ? 'left' : 'right';
    const entry = document.createElement('div');
    entry.className = `entry ${side}`;

    // tape
    const tape = document.createElement('div');
    tape.className = 'tape';
    entry.appendChild(tape);

    // date
    const date = document.createElement('div');
    date.className = 'date';
    date.textContent = item.date;
    entry.appendChild(date);

    // polaroid container
    const pol = document.createElement('div');
    pol.className = 'polaroid';

    // img
    const im = document.createElement('img');
    im.src = item.img;
    im.alt = item.text;
    pol.appendChild(im);

    // caption
    const caption = document.createElement('div');
    caption.className = 'caption';
    caption.textContent = item.text;
    pol.appendChild(caption);

    entry.appendChild(pol);
    timeline.appendChild(entry);
  });
}

buildTimeline();

// Confetti Setup
const confettiCanvas = document.getElementById('confettiCanvas');
let ctx = confettiCanvas.getContext('2d');
let pieces = [];

function resize(){
  confettiCanvas.width = window.innerWidth;
  confettiCanvas.height = window.innerHeight;
}
window.addEventListener('resize', resize);
resize();

function makeConfetti(x,y){
  for(let i=0;i<24;i++){
    pieces.push({
      x: x + (Math.random()-0.5)*120,
      y: y + (Math.random()-0.5)*60,
      vx:(Math.random()-0.5)*6,
      vy:Math.random()*-8 - 2,
      r:Math.random()*6 + 3,
      color:`hsl(${Math.random()*60+10},80%,60%)`,
      life:0
    });
  }
}

function animate(){
  ctx.clearRect(0,0,confettiCanvas.width,confettiCanvas.height);

  for(let i=pieces.length-1;i>=0;i--){
    const p = pieces[i];
    p.vy += 0.3;
    p.x += p.vx;
    p.y += p.vy;
    p.life++;

    ctx.fillStyle = p.color;
    ctx.beginPath();
    ctx.ellipse(p.x,p.y,p.r,p.r*0.6,0,0,Math.PI*2);
    ctx.fill();

    if(p.y > confettiCanvas.height+20 || p.life > 160){
      pieces.splice(i,1);
    }
  }

  requestAnimationFrame(animate);
}
animate();

// Confetti button
document.getElementById('confettiBtn').addEventListener('click', ()=>{
  for(let i=0;i<16;i++){
    makeConfetti(Math.random()*confettiCanvas.width, Math.random()*confettiCanvas.height/2);
  }
});

// Surprise popup
document.getElementById('revealBtn').addEventListener('click', ()=>{
  makeConfetti(confettiCanvas.width/2, confettiCanvas.height/3);

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
  setTimeout(()=>note.remove(),3800);
});
