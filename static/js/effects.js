// Particle effect on project card hover (lightweight)
// Also handles scroll reveal animations

document.addEventListener('DOMContentLoaded', () => {
    // Scroll reveal setup
    const revealElements = document.querySelectorAll('.project-card, .skill-card, .hero-content, .cta-button');
    revealElements.forEach(el => el.classList.add('reveal'));

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target); // only once
            }
        });
    }, { threshold: 0.2 });

    revealElements.forEach(el => observer.observe(el));

    // Optional: Mouse move glow effect on hero
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.addEventListener('mousemove', (e) => {
            const rect = hero.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            hero.style.setProperty('--mouse-x', `${x}px`);
            hero.style.setProperty('--mouse-y', `${y}px`);
        });
    }
});

// Add a floating particle on card hover (simple)
const cards = document.querySelectorAll('.project-card');
cards.forEach(card => {
    card.addEventListener('mouseenter', (e) => {
        for (let i = 0; i < 6; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = `${e.offsetX}px`;
            particle.style.top = `${e.offsetY}px`;
            particle.style.width = `${Math.random() * 6 + 2}px`;
            particle.style.height = particle.style.width;
            particle.style.background = `hsl(${Math.random() * 60 + 200}, 100%, 60%)`;
            particle.style.position = 'absolute';
            particle.style.pointerEvents = 'none';
            particle.style.borderRadius = '50%';
            particle.style.zIndex = '9999';
            particle.style.animation = `particleFade ${Math.random() * 0.8 + 0.5}s ease-out forwards`;
            card.style.position = 'relative';
            card.appendChild(particle);
            setTimeout(() => particle.remove(), 800);
        }
    });
});

// Add keyframes for particle animation dynamically
const styleSheet = document.createElement("style");
styleSheet.textContent = `
    @keyframes particleFade {
        0% { transform: translate(0, 0) scale(1); opacity: 1; }
        100% { transform: translate(${Math.random() * 40 - 20}px, ${Math.random() * -30 - 10}px) scale(0); opacity: 0; }
    }
`;
document.head.appendChild(styleSheet);

// Mouse-follow glow effect
const glow = document.createElement('div');
glow.className = 'mouse-glow';
document.body.appendChild(glow);

document.addEventListener('mousemove', (e) => {
    glow.style.left = e.clientX + 'px';
    glow.style.top = e.clientY + 'px';
});

// Scroll reveal + counter animation (dynamic stats)
const revealElements = document.querySelectorAll('.project-card, .skill-card, .hero-content');
revealElements.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

revealElements.forEach(el => observer.observe(el));

// Optional: Live data counter – if you add a stats section
// This will count up numbers when they appear
const counters = document.querySelectorAll('.stat-number');
const countObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const target = entry.target;
            const end = parseInt(target.innerText);
            let current = 0;
            const increment = end / 50;
            const timer = setInterval(() => {
                current += increment;
                if (current >= end) {
                    target.innerText = end;
                    clearInterval(timer);
                } else {
                    target.innerText = Math.floor(current);
                }
            }, 20);
            countObserver.unobserve(target);
        }
    });
}, { threshold: 0.5 });

counters.forEach(c => countObserver.observe(c));
document.addEventListener('DOMContentLoaded', () => {
    // --- Terminal interaction ---
    const terminalBody = document.getElementById('terminal-body');
    const terminalInput = document.getElementById('terminal-input');
    const currentInputSpan = document.getElementById('current-input');
    let commandHistory = [];
    let historyIndex = -1;
    let currentCommand = '';

    // Focus the hidden input when clicking terminal body
    terminalBody.addEventListener('click', () => {
        terminalInput.focus();
    });

    // Command definitions
    const commands = {
        help: () => {
            return `Available commands:
- <span class="cmd-highlight">help</span> : show this help
- <span class="cmd-highlight">projects</span> : list my main data projects
- <span class="cmd-highlight">skills</span> : show my tech stack
- <span class="cmd-highlight">contact</span> : how to reach me
- <span class="cmd-highlight">clear</span> : clear the terminal
- <span class="cmd-highlight">random</span> : get a random fact about me
- <span class="cmd-highlight">pipeline [name]</span> : info about a specific pipeline (crypto, ecommerce, datalake)`;
        },
        projects: () => {
            return `🔹 <strong>Real-time Crypto Pipeline</strong> – Kafka + Spark Streaming + S3<br>
🔹 <strong>Batch ETL: E‑commerce Sales</strong> – Airflow + dbt + Redshift<br>
🔹 <strong>Data Lake on AWS</strong> – Glue + Athena + Terraform<br>
🔹 <strong>Interactive Sales Dashboard</strong> – Flask + Pandas + JS filters<br>
🔹 <strong>Live Terminal Portfolio</strong> – you're using it right now!`;
        },
        skills: () => {
            return `🐍 Python &nbsp;&nbsp;|&nbsp;&nbsp; 🛢️ SQL &nbsp;&nbsp;|&nbsp;&nbsp; ⚙️ Airflow &nbsp;&nbsp;|&nbsp;&nbsp; ☁️ AWS (S3, Redshift, Glue)<br>
📦 Terraform &nbsp;&nbsp;|&nbsp;&nbsp; 🐼 Pandas &nbsp;&nbsp;|&nbsp;&nbsp; 🔥 Spark &nbsp;&nbsp;|&nbsp;&nbsp; 🐳 Docker<br>
🖥️ Flask &nbsp;&nbsp;|&nbsp;&nbsp; 📊 dbt &nbsp;&nbsp;|&nbsp;&nbsp; 🧪 Great Expectations &nbsp;&nbsp;|&nbsp;&nbsp; 🧰 Git/GitHub`;
        },
        contact: () => {
            return `📧 Email: dan@danielscottbaker.com<br>
🔗 LinkedIn: <a href="https://linkedin.com/in/danbaker76" target="_blank">linkedin.com/in/danbaker76</a><br>
🐙 GitHub: <a href="https://github.com/danbaker76" target="_blank">github.com/danbaker76</a><br>
🌐 Website: <a href="https://danielscottbaker.com" target="_blank">danielscottbaker.com</a>`;
        },
        clear: () => {
            // Clear all terminal lines except the prompt line
            const lines = document.querySelectorAll('.terminal-line');
            lines.forEach(line => line.remove());
            // Re-add a fresh prompt line
            const newPromptLine = document.createElement('div');
            newPromptLine.className = 'terminal-line';
            newPromptLine.innerHTML = '<span class="prompt">$</span> <span id="current-input"></span><span class="cursor-block">█</span>';
            terminalBody.appendChild(newPromptLine);
            // Reassign the currentInputSpan reference
            window.currentInputSpan = document.getElementById('current-input');
            return null; // return nothing to avoid extra line
        },
        random: () => {
            const facts = [
                "Dan once optimized a Spark job from 45 minutes to 3 minutes.",
                "Favorite data tool: dbt – 'It's like git for analytics.'",
                "Dan built his first data pipeline at age 22 for a local bakery.",
                "He contributed to an open-source data validation library.",
                "Dan's terminal portfolio is written in pure JS – no backend needed!"
            ];
            return facts[Math.floor(Math.random() * facts.length)];
        },
        pipeline: (args) => {
            const name = args.trim().toLowerCase();
            switch(name) {
                case 'crypto':
                    return "Real-time Crypto Pipeline: Uses Coinbase WebSocket → Kafka → Spark Streaming → S3. Latency < 3 seconds.";
                case 'ecommerce':
                    return "Batch ETL: Airflow DAG extracts from PostgreSQL, transforms with dbt, loads into Redshift. Runs daily.";
                case 'datalake':
                    return "Data Lake on AWS: Serverless lake with Glue crawlers, Athena queries, Terraform for IaC.";
                default:
                    return "Available pipelines: crypto, ecommerce, datalake. Example: `pipeline crypto`";
            }
        }
    };

    // Random response for unrecognized commands (to keep it playful)
    const randomResponses = [
        "Not sure, but you can try `help` for something else.",
        "Bippity boppity give me the zoppity.",
        "Not sure I follow, but do you.",
        "Go Birds!",
        "I guess we'll never know."
    ];

    function addTerminalLine(htmlContent) {
        const lineDiv = document.createElement('div');
        lineDiv.className = 'terminal-line';
        lineDiv.innerHTML = htmlContent;
        // Insert before the last line (which is the prompt line)
        const promptLine = terminalBody.querySelector('.terminal-line:last-child');
        terminalBody.insertBefore(lineDiv, promptLine);
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }

    function setPromptContent(content) {
        const promptSpan = document.getElementById('current-input');
        if (promptSpan) promptSpan.innerText = content;
    }

    function executeCommand(cmd) {
        const trimmed = cmd.trim();
        if (trimmed === '') return;
        // Easter egg: Go Birds
            if (trimmed.toLowerCase() === 'go birds') {
            addTerminalLine(`<span class="prompt">$</span> ${trimmed}`);
            addTerminalLine("GO BIRDS DICKHEAD!!");
            setPromptContent('');
            return;
            }


        // Add command to history
        commandHistory.push(trimmed);
        historyIndex = commandHistory.length;

        // Show the command line in terminal
        addTerminalLine(`<span class="prompt">$</span> ${trimmed}`);

        // Parse command and arguments
        const parts = trimmed.split(' ');
        const mainCmd = parts[0].toLowerCase();
        const args = parts.slice(1).join(' ');

        let response = null;
        if (commands[mainCmd]) {
            response = commands[mainCmd](args);
        } else {
            // Random fallback
            const randIdx = Math.floor(Math.random() * randomResponses.length);
            response = randomResponses[randIdx];
        }

        if (response !== null) {
            addTerminalLine(response);
        }

        // Clear current input line
        setPromptContent('');
    }

    terminalInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
            const cmd = terminalInput.value;
            executeCommand(cmd);
            terminalInput.value = '';
            currentCommand = '';
            setPromptContent('');
            e.preventDefault();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            if (historyIndex > 0) {
                historyIndex--;
                terminalInput.value = commandHistory[historyIndex];
                setPromptContent(commandHistory[historyIndex]);
            }
        } else if (e.key === 'ArrowDown') {
            e.preventDefault();
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                terminalInput.value = commandHistory[historyIndex];
                setPromptContent(commandHistory[historyIndex]);
            } else {
                historyIndex = commandHistory.length;
                terminalInput.value = '';
                setPromptContent('');
            }
        } else {
            // Update the displayed current input as user types
            setTimeout(() => {
                setPromptContent(terminalInput.value);
            }, 0);
        }
    });

    // Focus on page load
    terminalInput.focus();
});