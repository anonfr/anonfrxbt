document.addEventListener('DOMContentLoaded', function() {
    // Donate toggle
    const supportToggle = document.querySelector('.support-toggle');
    const supportSection = document.querySelector('.support-section');

    supportToggle.addEventListener('click', function() {
        supportSection.classList.toggle('active');
    });

    // Verify toggle
    const verifyToggle = document.querySelector('.verify-toggle');
    const verifySection = document.querySelector('.verify-section');

    verifyToggle.addEventListener('click', function() {
        verifySection.classList.toggle('active');
    });

    // Copy PGP key
    const copyPgp = document.querySelector('.copy-pgp');
    if (copyPgp) {
        copyPgp.addEventListener('click', function() {
            const key = document.querySelector('.pgp-key').textContent;
            navigator.clipboard.writeText(key).then(() => {
                this.textContent = 'copied!';
                setTimeout(() => { this.textContent = 'copy key'; }, 1500);
            });
        });
    }

    // Copy crypto addresses
    const addresses = document.querySelectorAll('.crypto-address');
    addresses.forEach(address => {
        address.addEventListener('click', function() {
            const textToCopy = this.dataset.address;
            navigator.clipboard.writeText(textToCopy).then(() => {
                const originalText = this.innerHTML;
                this.innerHTML = 'Copied!';
                setTimeout(() => {
                    this.innerHTML = originalText;
                }, 1500);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });

    // ===== KONAMI CODE TERMINAL EASTER EGG =====
    const konamiCode = ['ArrowUp','ArrowUp','ArrowDown','ArrowDown','ArrowLeft','ArrowRight','ArrowLeft','ArrowRight','b','a'];
    let konamiIndex = 0;

    document.addEventListener('keydown', function(e) {
        if (document.getElementById('terminal-overlay').classList.contains('hidden')) {
            if (e.key === konamiCode[konamiIndex]) {
                konamiIndex++;
                if (konamiIndex === konamiCode.length) {
                    konamiIndex = 0;
                    openTerminal();
                }
            } else {
                konamiIndex = 0;
            }
        }
    });

    const terminalOverlay = document.getElementById('terminal-overlay');
    const terminalInput = document.getElementById('terminal-input');
    const terminalOutput = document.getElementById('terminal-output');

    const commands = {
        help: 'available commands:\n  help        - show this message\n  whoami      - who am i?\n  skills      - tech stack\n  secret      - ???\n  socials     - links\n  clear       - clear terminal\n  exit        - close terminal',
        whoami: 'AnonfrXBT\nonchain sleuth. privacy maximalist.\nbuilding encrypted infrastructure on ethereum.\n"if you can read my data, i\'ve already failed."',
        skills: [
            '  solidity    ██████████████████░░  90%',
            '  fhe/fhevm   ████████████████░░░░  80%',
            '  react       ████████████████░░░░  80%',
            '  python      ██████████████░░░░░░  70%',
            '  typescript  ██████████████░░░░░░  70%',
            '  zk proofs   ████████████░░░░░░░░  60%',
        ].join('\n'),
        secret: 'nice try. but some things stay encrypted.\n\n...or do they? try "decrypt"',
        decrypt: '> running decryption protocol...\n> bypassing FHE layer...\n> accessing plaintext...\n\n🐱 the cat was the trader all along.',
        socials: 'github    → github.com/anonfr\nx/twitter → x.com/AnonfrXBT\ntelegram  → t.me/AnonfrXBT',
        matrix: '> entering the matrix...\n\n  ██╗  ██╗██╗\n  ██║  ██║██║\n  ███████║██║\n  ██╔══██║██║\n  ██║  ██║██║\n  ╚═╝  ╚═╝╚═╝\n\n  welcome to the other side.',
        ping: 'pong. latency: 0ms (we\'re already inside your browser)',
        sudo: 'nice try. you don\'t have root access to my life.',
    };

    function openTerminal() {
        terminalOverlay.classList.remove('hidden');
        terminalOutput.textContent = '> terminal unlocked. type "help" for commands.\n\n';
        terminalInput.value = '';
        terminalInput.focus();
    }

    function closeTerminal() {
        terminalOverlay.classList.add('hidden');
        terminalOutput.textContent = '';
    }

    terminalOverlay.addEventListener('click', function(e) {
        if (e.target === terminalOverlay) closeTerminal();
    });

    terminalInput.addEventListener('keydown', function(e) {
        if (e.key === 'Enter') {
            const cmd = this.value.trim().toLowerCase();
            this.value = '';

            terminalOutput.textContent += 'anon@stealth:~$ ' + cmd + '\n';

            if (cmd === 'exit' || cmd === 'quit') {
                closeTerminal();
                return;
            }

            if (cmd === 'clear') {
                terminalOutput.textContent = '';
                return;
            }

            if (commands[cmd]) {
                terminalOutput.textContent += commands[cmd] + '\n\n';
            } else if (cmd) {
                terminalOutput.textContent += 'command not found: ' + cmd + '. type "help" for available commands.\n\n';
            }

            const body = document.getElementById('terminal-body');
            body.scrollTop = body.scrollHeight;
        }

        if (e.key === 'Escape') {
            closeTerminal();
        }
    });
});
