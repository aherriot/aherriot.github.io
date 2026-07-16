const revealEls = document.querySelectorAll('.reveal, .t-item');
const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); } });
}, { threshold: 0.15 });
revealEls.forEach((el) => io.observe(el));

const timeline = document.querySelector('.timeline');
if (timeline) {
  const svg = document.querySelector('.timeline-svg');
  const path = document.getElementById('tracePath');
  const nodes = document.querySelectorAll('.t-node');

  function buildTrace() {
    const tRect = timeline.getBoundingClientRect();
    svg.setAttribute('viewBox', `0 0 60 ${tRect.height}`);

    const pts = Array.from(nodes).map((n) => {
      const r = n.getBoundingClientRect();
      return { x: r.left - tRect.left + r.width / 2, y: r.top - tRect.top + r.height / 2 };
    });

    let d = `M${pts[0].x},${pts[0].y}`;
    for (let i = 1; i < pts.length; i++) {
      const prev = pts[i - 1], cur = pts[i];
      const midY = (prev.y + cur.y) / 2;
      d += ` C${prev.x},${midY} ${cur.x},${midY} ${cur.x},${cur.y}`;
    }
    path.setAttribute('d', d);
    const len = path.getTotalLength();
    path.style.strokeDasharray = len;
    path.style.strokeDashoffset = len;
  }

  function onScrollTrace() {
    const rect = timeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const progress = Math.min(1, Math.max(0, (vh * 0.85 - rect.top) / (rect.height + vh * 0.2)));
    const len = path.getTotalLength();
    path.style.strokeDashoffset = len * (1 - progress);
  }

  buildTrace();
  onScrollTrace();
  window.addEventListener('resize', buildTrace);
  window.addEventListener('scroll', onScrollTrace, { passive: true });
}

const chips = document.querySelectorAll('.chip');
const cards = Array.from(document.querySelectorAll('.card'));
const showMoreBtn = document.getElementById('show-more-btn');
const CARD_LIMIT = 6;
let expanded = false;

function applyFilter(filterValue) {
  let matchCount = 0;
  cards.forEach((card) => {
    const tags = card.dataset.tags.split(' ');
    const matches = filterValue === 'all' || tags.includes(filterValue);
    card.classList.toggle('hidden', !matches);
    if (matches) {
      matchCount++;
      card.classList.toggle('limited', !expanded && matchCount > CARD_LIMIT);
    } else {
      card.classList.remove('limited');
    }
  });

  if (showMoreBtn) {
    if (matchCount > CARD_LIMIT) {
      showMoreBtn.style.display = 'inline-flex';
      showMoreBtn.textContent = expanded ? 'Show fewer' : `Show all ${matchCount} projects`;
    } else {
      showMoreBtn.style.display = 'none';
    }
  }
}

chips.forEach((chip) => {
  chip.addEventListener('click', () => {
    chips.forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    expanded = false;
    applyFilter(chip.dataset.filter);
  });
});

if (showMoreBtn) {
  showMoreBtn.addEventListener('click', () => {
    expanded = !expanded;
    const activeChip = document.querySelector('.chip.active');
    applyFilter(activeChip ? activeChip.dataset.filter : 'all');
  });
  applyFilter('all');
}
