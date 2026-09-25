/* ==========================================================================
   CHANDRASEKAR K — ULTRA-ADVANCED DATA ENGINEER PORTFOLIO DYNAMIC SCRIPTS
   ========================================================================== */

let soundEnabled = true;

document.addEventListener('DOMContentLoaded', () => {
    initCursorGlow();
    initNavbar();
    initTypewriter();
    initScrollReveal();
    initParticleNetwork();
    initContactForm();
    initModals();
    init3DTilt();
    initTerminal();
    initPipelineSimulator();
    initCounterAnimations();
    initSoundFX();
    initThemeSwitcher();
});

/* 1. Cursor Glow Effect */
function initCursorGlow() {
    const glow = document.getElementById('cursor-glow');
    if (!glow) return;

    if (window.matchMedia('(hover: hover)').matches) {
        document.addEventListener('mousemove', (e) => {
            glow.style.opacity = '1';
            glow.style.left = `${e.clientX}px`;
            glow.style.top = `${e.clientY}px`;
        });

        document.addEventListener('mouseleave', () => {
            glow.style.opacity = '0';
        });
    }
}

/* 2. Navbar & ScrollSpy */
function initNavbar() {
    const navbar = document.getElementById('navbar');
    const menuToggle = document.getElementById('menu-toggle');
    const navLinksContainer = document.getElementById('nav-links');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollToTopBtn = document.getElementById('scroll-to-top');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        if (window.scrollY > 400) {
            scrollToTopBtn.classList.add('visible');
        } else {
            scrollToTopBtn.classList.remove('visible');
        }

        scrollSpy();
    });

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navLinksContainer.classList.toggle('open');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navLinksContainer.classList.remove('open');
        });
    });

    if (scrollToTopBtn) {
        scrollToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    const sections = document.querySelectorAll('section, header');

    function scrollSpy() {
        let currentSectionId = 'home';
        const scrollPosition = window.scrollY + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    }
}

/* 3. Typewriter Effect */
function initTypewriter() {
    const typewriterElement = document.getElementById('typewriter-text');
    if (!typewriterElement) return;

    const words = JSON.parse(typewriterElement.getAttribute('data-words'));
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeDelay = 100;

    function type() {
        const currentWord = words[wordIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentWord.substring(0, charIndex - 1);
            charIndex--;
            typeDelay = 40;
        } else {
            typewriterElement.textContent = currentWord.substring(0, charIndex + 1);
            charIndex++;
            typeDelay = 80;
        }

        if (!isDeleting && charIndex === currentWord.length) {
            typeDelay = 2200;
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            wordIndex = (wordIndex + 1) % words.length;
            typeDelay = 500;
        }

        setTimeout(type, typeDelay);
    }

    setTimeout(type, 800);
}

/* 4. Scroll Reveal */
function initScrollReveal() {
    const reveals = document.querySelectorAll('.reveal');

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');

                if (entry.target.classList.contains('skills-grid')) {
                    const progressFills = entry.target.querySelectorAll('.progress-fill');
                    progressFills.forEach(fill => {
                        const targetWidth = fill.style.width;
                        fill.style.width = '0';
                        setTimeout(() => {
                            fill.style.width = targetWidth;
                        }, 150);
                    });
                }
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    reveals.forEach(element => {
        revealObserver.observe(element);
    });
}

/* 5. Particle Canvas Network */
function initParticleNetwork() {
    const canvas = document.getElementById('particle-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let particles = [];
    const mouse = { x: null, y: null, radius: 140 };

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
    }

    window.addEventListener('resize', resizeCanvas);
    window.addEventListener('mousemove', (e) => {
        mouse.x = e.clientX;
        mouse.y = e.clientY;
    });
    window.addEventListener('mouseleave', () => {
        mouse.x = null;
        mouse.y = null;
    });

    class Particle {
        constructor(x, y, dx, dy, size, color) {
            this.x = x;
            this.y = y;
            this.dx = dx;
            this.dy = dy;
            this.size = size;
            this.color = color;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            if (this.x > canvas.width || this.x < 0) this.dx = -this.dx;
            if (this.y > canvas.height || this.y < 0) this.dy = -this.dy;
            this.x += this.dx;
            this.y += this.dy;
            this.draw();
        }
    }

    function initParticles() {
        particles = [];
        const numberOfParticles = Math.min(Math.floor((canvas.width * canvas.height) / 12000), 80);
        const colors = ['rgba(0, 242, 254, 0.4)', 'rgba(0, 120, 212, 0.4)', 'rgba(255, 255, 255, 0.15)'];

        for (let i = 0; i < numberOfParticles; i++) {
            const size = Math.random() * 2 + 1;
            const x = Math.random() * (canvas.width - size * 4) + size * 2;
            const y = Math.random() * (canvas.height - size * 4) + size * 2;
            const dx = (Math.random() - 0.5) * 0.5;
            const dy = (Math.random() - 0.5) * 0.5;
            const color = colors[Math.floor(Math.random() * colors.length)];
            particles.push(new Particle(x, y, dx, dy, size, color));
        }
    }

    function connect() {
        const maxDist = 120;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a + 1; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < maxDist) {
                    const opacity = 1 - (dist / maxDist);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacity * 0.12})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }

            if (mouse.x !== null && mouse.y !== null) {
                const dx = particles[a].x - mouse.x;
                const dy = particles[a].y - mouse.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < mouse.radius) {
                    const opacity = 1 - (dist / mouse.radius);
                    ctx.strokeStyle = `rgba(0, 242, 254, ${opacity * 0.28})`;
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(mouse.x, mouse.y);
                    ctx.stroke();
                }
            }
        }
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach(p => p.update());
        connect();
    }

    resizeCanvas();
    animate();
}

/* 6. 3D Tilt Effect on Cards */
function init3DTilt() {
    const tiltCards = document.querySelectorAll('.tilt-card');

    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            const centerX = rect.width / 2;
            const centerY = rect.height / 2;

            const rotateX = ((y - centerY) / centerY) * -7;
            const rotateY = ((x - centerX) / centerX) * 7;

            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });
}

/* 7. Interactive Developer CLI Terminal */
function initTerminal() {
    const termInput = document.getElementById('terminal-input');
    const termBody = document.getElementById('terminal-body');
    const termClear = document.getElementById('term-clear');

    if (!termInput || !termBody) return;

    if (termClear) {
        termClear.addEventListener('click', () => {
            termBody.innerHTML = `
                <div class="terminal-line">
                    <span class="term-host">chandrasekar@fabric-node-01:~$</span> <span class="term-cmd">clear</span>
                </div>
            `;
        });
    }

    termInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = termInput.value.trim().toLowerCase();
            termInput.value = '';
            runTerminalCmd(cmd);
        }
    });
}

function runTerminalCmd(cmd) {
    const termBody = document.getElementById('terminal-body');
    if (!termBody) return;

    playUiSound(800, 0.05);

    const line = document.createElement('div');
    line.className = 'terminal-line';
    line.innerHTML = `<span class="term-host">chandrasekar@fabric-node-01:~$</span> <span class="term-cmd">${escapeHtml(cmd)}</span>`;
    termBody.appendChild(line);

    const out = document.createElement('div');
    out.className = 'terminal-output';

    switch (cmd) {
        case 'help':
            out.innerHTML = `<p style="color: #60a5fa;">Available commands:</p>
            <p> - <strong>summary</strong>: View executive bio</p>
            <p> - <strong>skills</strong>: List core tech stack</p>
            <p> - <strong>projects</strong>: Show data engineering projects</p>
            <p> - <strong>certs</strong>: Display Microsoft certifications</p>
            <p> - <strong>run-pipeline</strong>: Execute live pipeline simulation</p>
            <p> - <strong>contact</strong>: Show direct contact methods</p>
            <p> - <strong>clear</strong>: Clear console log</p>`;
            break;
        case 'summary':
            out.innerHTML = `<p>Chandrasekar K | Data Engineer | MCA (8.4 CGPA)</p>
            <p>Microsoft Certified: Fabric Data Engineer Associate (DP-700) & Azure Data Fundamentals (DP-900).</p>`;
            break;
        case 'skills':
            out.innerHTML = `<p style="color: #34d399;">Python, SQL, PySpark, Microsoft Fabric, OneLake, Azure Data Factory, Databricks, ADLS Gen2, Medallion Architecture, SCD Type 1/2.</p>`;
            break;
        case 'projects':
            out.innerHTML = `<p>1. <strong>E-Commerce Lakehouse Platform</strong> (Fabric / PySpark / Delta Lake)</p>
            <p>2. <strong>Azure Retail Data Pipeline</strong> (ADF / Databricks / ADLS Gen2 / SCD Type 2)</p>`;
            break;
        case 'certs':
            out.innerHTML = `<p style="color: #fbbf24;">🏆 Microsoft Certified: Fabric Data Engineer Associate (DP-700) - Credential ID: 8456E0E8655C51C5</p>
            <p style="color: #60a5fa;">☁️ Microsoft Certified: Azure Data Fundamentals (DP-900) - Credential ID: 5AEDDA6327CED867</p>`;
            break;
        case 'run-pipeline':
            out.innerHTML = `<p style="color: #00f2fe;">Executing Medallion Data Pipeline...</p>`;
            termBody.appendChild(out);
            triggerLivePipeline();
            return;
        case 'contact':
            out.innerHTML = `<p>Email: <a href="mailto:chandruanalyst22@gmail.com" style="color: #00f2fe;">chandruanalyst22@gmail.com</a> | Phone: +91 87786 73371</p>`;
            break;
        case 'clear':
            termBody.innerHTML = '';
            return;
        default:
            out.innerHTML = `<p style="color: #ef4444;">Command not recognized: '${escapeHtml(cmd)}'. Type 'help' for options.</p>`;
    }

    termBody.appendChild(out);
    termBody.scrollTop = termBody.scrollHeight;
}

function escapeHtml(str) {
    return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

/* 8. Live Data Pipeline Execution Simulator */
function initPipelineSimulator() {
    const triggerBtn = document.getElementById('trigger-pipeline-sim');
    if (triggerBtn) {
        triggerBtn.addEventListener('click', triggerLivePipeline);
    }
}

function triggerLivePipeline() {
    const b1 = document.getElementById('node-b1');
    const s1 = document.getElementById('node-s1');
    const g1 = document.getElementById('node-g1');

    const b2 = document.getElementById('node-b2');
    const s2 = document.getElementById('node-s2');
    const g2 = document.getElementById('node-g2');

    playUiSound(1000, 0.1);

    // Pulse Step 1: Bronze
    if (b1) b1.classList.add('pulse');
    if (b2) b2.classList.add('pulse');

    setTimeout(() => {
        if (b1) b1.classList.remove('pulse');
        if (b2) b2.classList.remove('pulse');
        if (s1) s1.classList.add('pulse');
        if (s2) s2.classList.add('pulse');
        playUiSound(1200, 0.1);
    }, 1000);

    setTimeout(() => {
        if (s1) s1.classList.remove('pulse');
        if (s2) s2.classList.remove('pulse');
        if (g1) g1.classList.add('pulse');
        if (g2) g2.classList.add('pulse');
        playUiSound(1500, 0.12);
    }, 2000);

    setTimeout(() => {
        if (g1) g1.classList.remove('pulse');
        if (g2) g2.classList.remove('pulse');
    }, 3200);
}

/* 9. Animated Metric Counter Numbers */
function initCounterAnimations() {
    const counterElems = document.querySelectorAll('.count-up');

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = parseFloat(entry.target.getAttribute('data-target'));
                const decimals = parseInt(entry.target.getAttribute('data-decimals') || '0');
                const suffix = entry.target.getAttribute('data-suffix') || '';
                animateValue(entry.target, 0, target, 1500, decimals, suffix);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });

    counterElems.forEach(elem => observer.observe(elem));
}

function animateValue(obj, start, end, duration, decimals, suffix) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const current = progress * (end - start) + start;
        obj.textContent = current.toFixed(decimals) + suffix;
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

/* 10. Sound FX Synthesizer (Web Audio API) */
function initSoundFX() {
    const soundToggle = document.getElementById('sound-toggle');
    const soundIcon = document.getElementById('sound-icon');

    if (soundToggle) {
        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            if (soundEnabled) {
                soundIcon.className = 'fa-solid fa-volume-high';
                playUiSound(800, 0.08);
            } else {
                soundIcon.className = 'fa-solid fa-volume-xmark';
            }
        });
    }

    document.querySelectorAll('.sound-click').forEach(btn => {
        btn.addEventListener('click', () => {
            playUiSound(700, 0.05);
        });
    });
}

function playUiSound(freq, duration) {
    if (!soundEnabled) return;
    try {
        const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();

        osc.type = 'sine';
        osc.frequency.value = freq;
        gain.gain.setValueAtTime(0.05, audioCtx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);

        osc.connect(gain);
        gain.connect(audioCtx.destination);

        osc.start();
        osc.stop(audioCtx.currentTime + duration);
    } catch (e) {
        // Audio API fallback
    }
}

/* 11. Theme Accent Switcher */
function initThemeSwitcher() {
    const switcherToggle = document.getElementById('switcher-toggle');
    const switcher = document.getElementById('accent-switcher');
    const paletteBtns = document.querySelectorAll('.palette-btn');

    if (switcherToggle) {
        switcherToggle.addEventListener('click', () => {
            switcher.classList.toggle('open');
        });
    }

    paletteBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            paletteBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const theme = btn.getAttribute('data-color');
            document.documentElement.setAttribute('data-theme', theme);
            playUiSound(900, 0.05);
        });
    });
}

/* 12. Contact Form Submission */
function initContactForm() {
    const form = document.getElementById('contact-form');
    const responseMsg = document.getElementById('form-response-msg');
    const submitBtn = document.getElementById('form-submit-btn');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        submitBtn.disabled = true;
        const btnText = submitBtn.querySelector('span');
        btnText.textContent = 'Sending...';
        playUiSound(950, 0.08);

        setTimeout(() => {
            responseMsg.className = 'form-response-msg success';
            responseMsg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been received by Chandrasekar.';
            responseMsg.style.display = 'block';
            form.reset();
            submitBtn.disabled = false;
            btnText.textContent = 'Send Message';

            setTimeout(() => {
                responseMsg.style.display = 'none';
            }, 6000);
        }, 1200);
    });
}

/* 13. Modals */
function initModals() {
    const pdfModal = document.getElementById('pdf-modal');
    const modalClose = document.getElementById('modal-close');
    const modalBackdrop = document.getElementById('modal-backdrop');

    const projectModal = document.getElementById('project-modal');
    const projectModalClose = document.getElementById('project-modal-close');
    const projectModalBackdrop = document.getElementById('project-modal-backdrop');

    if (modalClose) {
        modalClose.addEventListener('click', () => pdfModal.classList.remove('active'));
    }
    if (modalBackdrop) {
        modalBackdrop.addEventListener('click', () => pdfModal.classList.remove('active'));
    }

    if (projectModalClose) {
        projectModalClose.addEventListener('click', () => projectModal.classList.remove('active'));
    }
    if (projectModalBackdrop) {
        projectModalBackdrop.addEventListener('click', () => projectModal.classList.remove('active'));
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            if (pdfModal) pdfModal.classList.remove('active');
            if (projectModal) projectModal.classList.remove('active');
        }
    });
}

function openCertModal(pdfPath, title) {
    const pdfModal = document.getElementById('pdf-modal');
    const iframe = document.getElementById('modal-iframe');
    const titleElem = document.getElementById('modal-title');
    const downloadBtn = document.getElementById('modal-download-btn');

    if (!pdfModal || !iframe) return;

    playUiSound(850, 0.05);

    titleElem.textContent = title;
    iframe.src = pdfPath;
    downloadBtn.href = pdfPath;
    downloadBtn.setAttribute('download', pdfPath);

    pdfModal.classList.add('active');
}

function openProjectModal(projectId) {
    const projectModal = document.getElementById('project-modal');
    const bodyElem = document.getElementById('project-modal-body');
    const titleElem = document.getElementById('project-modal-title');

    if (!projectModal || !bodyElem) return;

    playUiSound(850, 0.05);

    if (projectId === 'project1') {
        titleElem.textContent = 'E-Commerce Lakehouse Data Platform (Architecture & Implementation)';
        bodyElem.innerHTML = `
            <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.7;">
                <h4 style="color: #00f2fe; margin-bottom: 0.8rem;">1. Medallion Architecture Breakdown</h4>
                <p><strong>Bronze Layer (Raw Ingestion):</strong> Ingests raw JSON transaction feeds from e-commerce platforms into OneLake via Fabric Data Factory pipelines with timestamp partition keys.</p>
                <p><strong>Silver Layer (Cleaned & Conformed):</strong> PySpark notebooks process incremental batches, execute schema enforcement, drop invalid null payloads, and perform Delta MERGE deduplication.</p>
                <p><strong>Gold Layer (Business Aggregations):</strong> Formats data into a dimensional Star Schema with FactSales, DimCustomer, DimProduct, and DimDate tables ready for DirectLake reporting in Power BI.</p>
                
                <h4 style="color: #00f2fe; margin: 1.2rem 0 0.8rem;">2. Key Technical Highlights</h4>
                <ul style="padding-left: 1.2rem; list-style-type: disc;">
                    <li>Zero-copy OneLake storage virtualization minimizing data duplication.</li>
                    <li>Incremental ingestion logic reducing notebook compute time by ~65%.</li>
                    <li>Data Quality assertions alerting on schema drift or missing primary keys.</li>
                </ul>
            </div>
        `;
    } else if (projectId === 'project2') {
        titleElem.textContent = 'Azure Retail Data Engineering Pipeline (Architecture & Implementation)';
        bodyElem.innerHTML = `
            <div style="color: #cbd5e1; font-size: 0.95rem; line-height: 1.7;">
                <h4 style="color: #0078d4; margin-bottom: 0.8rem;">1. End-to-End Pipeline Workflow</h4>
                <p><strong>Ingestion (Azure Data Factory):</strong> Parameterized ADF copy activities pull REST API payloads, CSV files, and Azure SQL records into ADLS Gen2 landing zones.</p>
                <p><strong>Processing (Azure Databricks PySpark):</strong> Notebook jobs trigger PySpark windowing functions for strict deduplication.</p>
                <p><strong>Storage & SCD Type 2:</strong> Maintains historical customer state by flagging <code>is_current</code>, <code>effective_date</code>, and <code>end_date</code> on Delta Lake tables in ADLS Gen2.</p>
                
                <h4 style="color: #0078d4; margin: 1.2rem 0 0.8rem;">2. Production Metrics</h4>
                <ul style="padding-left: 1.2rem; list-style-type: disc;">
                    <li>Automated daily pipeline execution with email failure alerts via ADF Web Activity.</li>
                    <li>Optimized Delta Lake <code>OPTIMIZE</code> and <code>VACUUM</code> commands for file compaction.</li>
                </ul>
            </div>
        `;
    }

    projectModal.classList.add('active');
}
