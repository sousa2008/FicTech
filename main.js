/* ============================================================
   FICTECH — Next-Gen Interactions Engine (fict-novo/main.js)
   Aperfeiçoado:
   - Random Letter Swap: Slow, controlado, sem layout shift, sem disparar no hover
   - Halo Card Carousel: 3D Ring autêntico no palco aberto (Originkit Engine)
   - Coverflow Gallery: Foco total na imagem do participante
   - Foil Drift WebGL: Fundo fluido e sutil
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  /* ==========================================================
     1. FOIL DRIFT — Background Shader WebGL
     ========================================================== */
  function initFoilDrift() {
    const canvas = document.getElementById('foilCanvas');
    if (!canvas) return;
    const gl = canvas.getContext('webgl');
    if (!gl) return;

    const VS = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

    const FS = `
      precision highp float;
      uniform vec2 u_resolution;
      uniform float u_time;
      uniform vec2 u_mouse;

      vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
      vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }

      float snoise(vec2 v) {
        const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
        vec2 i  = floor(v + dot(v, C.yy));
        vec2 x0 = v -   i + dot(i, C.xx);
        vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
        vec4 x12 = x0.xyxy + C.xxzz;
        x12.xy -= i1;
        i = mod289(i);
        vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
        vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
        m = m*m; m = m*m;
        vec3 x = 2.0 * fract(p * C.www) - 1.0;
        vec3 h = abs(x) - 0.5;
        vec3 ox = floor(x + 0.5);
        vec3 a0 = x - ox;
        m *= 1.79284291400159 - 0.85373472095314 * (a0*a0 + h*h);
        vec3 g;
        g.x  = a0.x  * x0.x  + h.x  * x0.y;
        g.yz = a0.yz * x12.xz + h.yz * x12.yw;
        return 130.0 * dot(m, g);
      }

      void main() {
        vec2 uv = gl_FragCoord.xy / u_resolution.xy;
        vec2 mouse = u_mouse / u_resolution.xy;
        float aspect = u_resolution.x / u_resolution.y;
        vec2 p = (uv - 0.5) * vec2(aspect, 1.0);

        float t = u_time * 0.12;
        float n1 = snoise(p * 1.5 + vec2(t * 0.2, t * 0.15));
        float n2 = snoise(p * 3.0 - vec2(t * 0.12, n1 * 0.4));
        float foil = sin((p.x * 1.6 + p.y * 2.4 + n2 * 1.2) * 3.5 + t);

        float dMouse = length(uv - mouse);
        float mouseGlow = smoothstep(0.45, 0.0, dMouse) * 0.2;

        vec3 colorDeep = vec3(0.035, 0.02, 0.067);
        vec3 colorPurple = vec3(0.482, 0.173, 0.749);
        vec3 colorNeon = vec3(0.616, 0.306, 0.867);
        vec3 colorCyan = vec3(0.133, 0.827, 0.933);

        float mix1 = smoothstep(-0.6, 0.8, foil);
        float mix2 = smoothstep(0.2, 1.0, foil + n1 * 0.35);

        vec3 col = mix(colorDeep, colorPurple * 0.35, mix1);
        col = mix(col, colorNeon * 0.5, mix2);
        col += colorCyan * (pow(mix2, 4.0) * 0.25 + mouseGlow);

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function compile(type, src) {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    }

    const prog = gl.createProgram();
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VS));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
      -1, -1,  1, -1, -1,  1,
      -1,  1,  1, -1,  1,  1,
    ]), gl.STATIC_DRAW);

    const pos = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(pos);
    gl.vertexAttribPointer(pos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, 'u_resolution');
    const uTime = gl.getUniformLocation(prog, 'u_time');
    const uMouse = gl.getUniformLocation(prog, 'u_mouse');

    let mousePos = [window.innerWidth / 2, window.innerHeight / 2];
    window.addEventListener('mousemove', (e) => {
      mousePos = [e.clientX, window.innerHeight - e.clientY];
    });

    function resize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener('resize', resize);
    resize();

    const startT = performance.now();
    function render(now) {
      const elapsed = (now - startT) * 0.001;
      gl.uniform2f(uRes, canvas.width, canvas.height);
      gl.uniform1f(uTime, elapsed);
      gl.uniform2f(uMouse, mousePos[0], mousePos[1]);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
      requestAnimationFrame(render);
    }
    requestAnimationFrame(render);
  }

  /* ==========================================================
     2. RANDOM LETTER SWAP — Slow, Controlado & Sem Layout Shift
     ========================================================== */
  function initRandomLetterSwap() {
    const lines = document.querySelectorAll('.headline-line');
    if (!lines || lines.length === 0) return;

    const upperGlyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowerGlyphs = 'abcdefghijklmnopqrstuvwxyz';

    const allSlots = [];

    lines.forEach((line) => {
      const text = line.textContent.trim();
      line.innerHTML = '';

      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        const span = document.createElement('span');
        span.className = 'char-slot';

        if (char === ' ') {
          span.classList.add('space-slot');
          span.innerHTML = '&nbsp;';
          line.appendChild(span);
        } else {
          span.textContent = char;
          line.appendChild(span);

          const isLetter = /[a-zA-ZáéíóúÁÉÍÓÚãõÃÕâêîôûÂÊÎÔÛçÇ]/.test(char);
          const isUpper = char === char.toUpperCase() && isLetter;

          allSlots.push({
            span: span,
            finalChar: char,
            isLetter: isLetter,
            glyphs: isUpper ? upperGlyphs : lowerGlyphs
          });
        }
      }
    });

    // Mede e trava a largura exata de CADA slot de letra no DOM
    // Garante matematicamente ZERO layout shift e zero alteração de altura
    requestAnimationFrame(() => {
      document.querySelectorAll('.char-slot').forEach(slot => {
        const rect = slot.getBoundingClientRect();
        if (rect.width > 0) {
          slot.style.width = `${rect.width.toFixed(2)}px`;
        }
      });
    });

    // Executa uma única vez de forma lenta, suave e controlada
    function runSlowReveal() {
      allSlots.forEach((item, idx) => {
        if (!item.isLetter) return;

        const staggerDelay = idx * 26; // Onda suave da esquerda para a direita
        const cycles = 4;              // 4 trocas cadenciadas
        const intervalMs = 75;         // Ritmo calmo e controlado

        setTimeout(() => {
          let count = 0;
          item.span.classList.add('swapping');

          const timer = setInterval(() => {
            if (count >= cycles) {
              item.span.textContent = item.finalChar;
              item.span.classList.remove('swapping');
              item.span.classList.add('settled');
              clearInterval(timer);
            } else {
              const rIdx = Math.floor(Math.random() * item.glyphs.length);
              item.span.textContent = item.glyphs[rIdx];
              count++;
            }
          }, intervalMs);
        }, staggerDelay);
      });
    }

    // Dispara apenas 1 vez, 350ms após carregar a página
    setTimeout(runSlowReveal, 350);

    // ZERO listeners de hover ou mouseenter — sem re-trigger incômodo
  }

  /* ==========================================================
     3. HALO CARD CAROUSEL — 3D Ring Autêntico com Ícones de Tecnologia
     ========================================================== */
  function initHaloCardCarousel() {
    const root = document.getElementById('haloCarousel');
    const stage = document.getElementById('haloStage');
    if (!root || !stage) return;

    // Tecnologias com seus ícones oficiais e autênticos em alta definição
    const cardsData = [
      { name: 'Python', cat: 'BACKEND CORE', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/python/python-original.svg', color: '#3776ab' },
      { name: 'TypeScript', cat: 'FRONTEND', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg', color: '#3178c6' },
      { name: 'PostgreSQL', cat: 'DATABASE ACID', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/postgresql/postgresql-original.svg', color: '#336791' },
      { name: 'Java', cat: 'ENTERPRISE', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg', color: '#e76f00' },
      { name: 'Node.js', cat: 'RUNTIME', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/nodejs/nodejs-original.svg', color: '#339933' },
      { name: 'Docker', cat: 'DEVOPS / CI', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/docker/docker-original.svg', color: '#2496ed' },
      { name: 'Git', cat: 'VCS / GITHUB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/git/git-original.svg', color: '#f05032' },
      { name: 'FastAPI', cat: 'API CORE', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/fastapi/fastapi-original.svg', color: '#009688' },
      { name: 'MySQL', cat: 'DATABASE SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg', color: '#4479a1' },
      { name: 'Three.js', cat: 'WEBGL / 3D', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/threejs/threejs-original.svg', color: '#22d3ee' },
      { name: 'PHP', cat: 'SERVER APPS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg', color: '#777bb4' },
      { name: 'Linux', cat: 'SYSTEM ENV', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/linux/linux-original.svg', color: '#fcc624' }
    ];

    const N = cardsData.length;
    stage.innerHTML = '';
    const cards = [];

    for (let i = 0; i < N; i++) {
      const d = cardsData[i];
      const el = document.createElement('div');
      el.classList.add('halo-3d-card');
      const extraStyle = d.name === 'Three.js'
        ? 'style="filter: brightness(0) invert(1) drop-shadow(0 0 16px rgba(34, 211, 238, 0.65));"'
        : `style="filter: drop-shadow(0 8px 18px ${d.color}77) drop-shadow(0 4px 8px rgba(0,0,0,0.8));"`;

      el.innerHTML = `
        <div class="halo-card-art">
          <img src="${d.icon}" alt="${d.name}" class="halo-tech-icon" ${extraStyle} draggable="false" loading="lazy">
        </div>
        <div class="halo-card-footer">
          <span class="halo-card-name">${d.name}</span>
          <span class="halo-card-cat">${d.cat}</span>
        </div>
      `;
      stage.appendChild(el);
      cards.push(el);
    }

    let phiTurn = 0;
    let phiUser = 0;
    let vUser = 0;
    let isDragging = false;
    let lastX = 0;
    let lastT = 0;
    let px = 0.5, py = 0.5;
    let pxT = 0.5, pyT = 0.5;

    const TAU = Math.PI * 2;
    const DEG = Math.PI / 180;
    const tilt = 18;       // Inclinação 3D elegante
    const roll = -10;
    const radius = 330;    // Raio orbital perfeito
    const perspective = 1400;

    function renderRing(dt) {
      if (!isDragging) {
        phiTurn += 16 * DEG * dt * 0.38;
        phiUser += vUser * dt;
        vUser *= Math.exp(-dt * 2.2);
      }

      px += (pxT - px) * 0.06;
      py += (pyT - py) * 0.06;

      const phi = phiTurn + phiUser + (px - 0.5) * 5 * DEG;
      const W = root.offsetWidth || 1100;
      const H = root.offsetHeight || 520;
      const cx = W / 2;
      const cy = (H / 2) - 30; // Posicionamento mais elevado para amplitude visual

      const pitchA = (tilt + (py - 0.5) * 6) * DEG;
      const cp = Math.cos(pitchA);
      const sp = Math.sin(pitchA);
      const rollA = roll * DEG;
      const cr = Math.cos(rollA);
      const sr = Math.sin(rollA);

      for (let i = 0; i < N; i++) {
        const th = phi + (TAU * i) / N;
        const x0 = radius * Math.sin(th);
        const z0 = radius * Math.cos(th);
        const y0 = 0;

        const y1 = y0 * cp + z0 * sp;
        const z1 = Math.min(z0 * cp - y0 * sp, perspective - 40);

        const X = cx + (x0 * cr - y1 * sr);
        const Y = cy + (x0 * sr + y1 * cr);
        const scale = 0.88 + (z1 / perspective) * 0.45;
        const yaw = 18 * Math.sin(th);

        const card = cards[i];
        card.style.transform = `translate3d(${X}px, ${Y}px, ${z1}px) translate(-50%, -50%) rotateY(${yaw}deg) scale(${scale})`;
        card.style.zIndex = Math.round(10000 + z1);
        card.style.opacity = Math.max(0.35, Math.min(1, (z1 + radius * 0.8) / (radius * 1.5)));
      }
    }

    // Interações de toque e mouse
    root.addEventListener('pointerdown', (e) => {
      isDragging = true;
      lastX = e.clientX;
      lastT = performance.now();
      vUser = 0;
    });

    window.addEventListener('pointermove', (e) => {
      const rect = root.getBoundingClientRect();
      pxT = (e.clientX - rect.left) / (rect.width || 1);
      pyT = (e.clientY - rect.top) / (rect.height || 1);

      if (!isDragging) return;
      const now = performance.now();
      const dx = e.clientX - lastX;
      const dt = Math.max(0.008, (now - lastT) / 1000);
      lastX = e.clientX;
      lastT = now;
      const da = dx * 0.0035;
      phiUser += da;
      vUser = da / dt;
    });

    window.addEventListener('pointerup', () => { isDragging = false; });
    window.addEventListener('pointercancel', () => { isDragging = false; });

    let lastFrame = performance.now();
    function loopHalo(now) {
      const dt = Math.min(0.05, (now - lastFrame) / 1000);
      lastFrame = now;
      renderRing(dt);
      requestAnimationFrame(loopHalo);
    }
    requestAnimationFrame(loopHalo);
  }

  /* ==========================================================
     4. COVERFLOW GALLERY — Participantes (Foco Total na Foto)
     ========================================================== */
  function initCoverflowGallery() {
    const wrap = document.getElementById('coverflowWrap');
    const items = document.querySelectorAll('.coverflow-item');
    const prevBtn = document.getElementById('coverflowPrev');
    const nextBtn = document.getElementById('coverflowNext');
    const dotsContainer = document.getElementById('coverflowDots');
    if (!wrap || items.length === 0) return;

    let currentIndex = 0;
    const total = items.length;

    dotsContainer.innerHTML = '';
    const dots = [];
    for (let i = 0; i < total; i++) {
      const dot = document.createElement('div');
      dot.classList.add('coverflow-dot');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => updateCoverflow(i));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    }

    function updateCoverflow(newIndex) {
      currentIndex = (newIndex + total) % total;

      items.forEach((item, i) => {
        const offset = i - currentIndex;
        const absOffset = Math.abs(offset);

        if (offset === 0) {
          // Card Central em Máxima Evidência Frontal
          item.style.transform = 'translateX(0px) translateZ(120px) rotateY(0deg) scale(1.06)';
          item.style.zIndex = 60;
          item.style.opacity = '1';
          item.style.filter = 'none';
          item.classList.add('active');
        } else {
          // Cards Laterais Rotacionados em 3D
          const dir = offset > 0 ? 1 : -1;
          const spacing = 220;
          const x = dir * (spacing + (absOffset - 1) * 140);
          const z = -absOffset * 150;
          const rotY = dir * -38;
          const opacity = Math.max(0.35, 1 - absOffset * 0.28);

          item.style.transform = `translateX(${x}px) translateZ(${z}px) rotateY(${rotY}deg) scale(${0.86 - absOffset * 0.04})`;
          item.style.zIndex = 60 - absOffset;
          item.style.opacity = String(opacity);
          item.style.filter = 'brightness(0.65) saturate(0.85)';
          item.classList.remove('active');
        }
      });

      dots.forEach((d, i) => {
        d.classList.toggle('active', i === currentIndex);
      });
    }

    items.forEach((item, i) => {
      item.addEventListener('click', () => {
        if (i !== currentIndex) updateCoverflow(i);
      });
    });

    prevBtn?.addEventListener('click', () => updateCoverflow(currentIndex - 1));
    nextBtn?.addEventListener('click', () => updateCoverflow(currentIndex + 1));

    let touchStartX = 0;
    wrap.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    wrap.addEventListener('touchend', (e) => {
      const diff = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diff) > 40) {
        if (diff > 0) updateCoverflow(currentIndex - 1);
        else updateCoverflow(currentIndex + 1);
      }
    });

    window.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') updateCoverflow(currentIndex - 1);
      if (e.key === 'ArrowRight') updateCoverflow(currentIndex + 1);
    });

    updateCoverflow(0);
  }

  /* ==========================================================
     5. SPA SMOOTH SCROLL & SCROLLSPY
     ========================================================== */
  function initNavbar() {
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section[id]');
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        navbar?.classList.add('scrolled');
      } else {
        navbar?.classList.remove('scrolled');
      }

      const scrollY = window.scrollY + 180;
      let activeId = '';

      sections.forEach(sec => {
        const top = sec.offsetTop;
        const height = sec.offsetHeight;
        if (scrollY >= top && scrollY < top + height) {
          activeId = sec.getAttribute('id');
        }
      });

      navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === '#' + activeId) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });
    }, { passive: true });

    navLinks.forEach(l => {
      l.addEventListener('click', () => {
        document.getElementById('navLinks')?.classList.remove('nav-open');
      });
    });

    const toggleBtn = document.querySelector('.menu-toggle');
    toggleBtn?.addEventListener('click', () => {
      document.getElementById('navLinks')?.classList.toggle('nav-open');
    });
  }

  /* ==========================================================
     6. FORMULÁRIO DE CONTATO
     ========================================================== */
  function initContactForm() {
    const form = document.getElementById('contactForm');
    const btn = document.getElementById('btnContactSubmit');
    const status = document.getElementById('formStatusMsg');

    if (!form || !btn) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      btn.disabled = true;
      btn.innerText = 'Processando solicitação...';

      setTimeout(() => {
        btn.innerText = 'Demanda Registrada!';
        btn.style.background = '#10b981';

        if (status) {
          status.style.display = 'block';
          status.style.padding = '1rem 1.25rem';
          status.style.borderRadius = '12px';
          status.style.marginBottom = '1.4rem';
          status.style.background = 'rgba(16, 185, 129, 0.12)';
          status.style.border = '1px solid rgba(16, 185, 129, 0.35)';
          status.style.color = '#34d399';
          status.style.fontSize = '0.92rem';
          status.innerHTML = '<strong>Solicitação encaminhada.</strong> Os Scrum Masters da FicTech retornarão em até 48 horas úteis.';
        }
        form.reset();
      }, 800);
    });
  }

  // Inicializacao Geral
  initFoilDrift();
  initRandomLetterSwap();
  initHaloCardCarousel();
  initCoverflowGallery();
  initNavbar();
  initContactForm();

  console.log('[FicTech Engine] Precision tuned.');
});
