let hasFlipped = false;

function goToPage(pageId) {
    const allPages = document.querySelectorAll('.card-page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    targetPage.classList.add('active');

    if (pageId === 'page-gallery') {
        confetti({ 
            particleCount: 50, 
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#ff9a9e', '#fecfef', '#f5576c']
        });
    } 
    else if (pageId === 'page-wishes') {
        startTypewriter();
    }
    else if (pageId === 'page-welcome') {
        // Reset card and layout state if user comes back
        hasFlipped = false;
        const allCards = document.querySelectorAll('.tarot-card');
        allCards.forEach(c => {
            c.classList.remove('flipped');
            c.classList.remove('disabled');
        });
        
        // ซ่อนกล่องข้อความและจัด Layout กลับตรงกลาง
        document.getElementById('message-box').classList.remove('show');
        document.getElementById('layout-wrapper').classList.remove('shift-left');
        document.getElementById('msg-content').innerHTML = '';
    }
}

function startTypewriter() {
    const app = document.getElementById('typewriter-text');
    app.innerHTML = ''; 
    const typewriter = new Typewriter(app, {
        loop: false,
        delay: 60,
    });

    typewriter
        .pauseFor(500)
        .typeString('<span style="color: #ff9a9e;">สสวก.นะคับขอให้มิ้งมีความสุขมากๆ</span>')
        .pauseFor(300)
        .typeString('<br>และขอให้ในอนาคตมีแต่สิ่งดีๆเกิดขึ้น 🌟')
        .pauseFor(300)
        .typeString('<br>คิดสิ่งใดก็ขอให้สมดังหวังน้า ')
        .pauseFor(300)
        .typeString('<br>อยู่ตรงนี้เป็นกำลังใจให้เสมออเลิฟเลิฟ😊 ')
        .pauseFor(300)
        .typeString('<br>และกำลังจะเรียนจบแหล่วสินะะยินดีด้วยล่วงหน้าคับ ')
        .pauseFor(300)
        .typeString('<br>(ไว้ไปถ่ายรูปอีกหุหุมิ้งต้องไปรับปริญญานะ555:))) ')
        .start();
}

function goToCards() {
    // ปล่อย Confetti ฉลองก่อน
    var duration = 1.5 * 1000;
    var end = Date.now() + duration;

    (function frame() {
      confetti({
        particleCount: 8,
        angle: 60,
        spread: 70,
        origin: { x: 0, y: 0.8 },
        colors: ['#f093fb', '#f5576c', '#ff9a9e', '#ffffff']
      });
      confetti({
        particleCount: 8,
        angle: 120,
        spread: 70,
        origin: { x: 1, y: 0.8 },
        colors: ['#f093fb', '#f5576c', '#ff9a9e', '#ffffff']
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    }());
    
    // ทำให้ปุ่มเด้งดึ๋ง
    const btn = document.querySelector('#page-wishes .btn-style');
    btn.style.transform = 'scale(1.1)';
    setTimeout(() => {
        btn.style.transform = 'scale(1)';
    }, 200);

    // รอ 1.5 วินาทีแล้วเปลี่ยนไปหน้าเลือกการ์ด
    setTimeout(() => {
        goToPage('page-cards');
    }, 1500);
}

function flipCard(cardElement, cardIndex) {
    if (hasFlipped) return; // กดได้แค่ใบเดียว
    
    hasFlipped = true;
    cardElement.classList.add('flipped');
    
    // ปิดการใช้งานการ์ดใบอื่นและทำให้สีซีดลง
    const allCards = document.querySelectorAll('.tarot-card');
    allCards.forEach(c => {
        if (c !== cardElement) {
            c.classList.add('disabled');
        }
    });

    // ดึงข้อความที่ซ่อนไว้มาแสดงในกล่องข้อความด้านขวา
    const hiddenMsg = document.getElementById('msg-data-' + cardIndex).innerHTML;
    document.getElementById('msg-content').innerHTML = hiddenMsg;

    // เปลี่ยน Header ให้ตรงกับไพ่ที่เลือก
    if (cardIndex === 2) {
        document.getElementById('msg-header-text').style.display = 'none';
        document.getElementById('msg-header-qr').style.display = 'block';
    } else {
        document.getElementById('msg-header-text').style.display = 'block';
        document.getElementById('msg-header-qr').style.display = 'none';
    }

    // เลื่อน Layout และแสดงกล่องข้อความด้านขวา
    setTimeout(() => {
        document.getElementById('layout-wrapper').classList.add('shift-left');
        document.getElementById('message-box').classList.add('show');
    }, 600); // รอให้ไพ่พลิกเกือบเสร็จ
}

// ปรับความเร็ววิดีโอพื้นหลังให้ช้าลง
document.addEventListener('DOMContentLoaded', () => {
    const bgVideos = document.querySelectorAll('.page-bg-video');
    bgVideos.forEach(video => {
        video.playbackRate = 0.5; // เล่นช้าลงครึ่งนึง
    });

    // Typewriter effect for Happy Birthday
    const hbdText = document.getElementById('hbd-text');
    if (hbdText) {
        const text = hbdText.innerText;
        hbdText.innerHTML = '';
        text.split('').forEach((char, index) => {
            const span = document.createElement('span');
            // preserve spaces
            if (char === ' ') {
                span.innerHTML = '&nbsp;';
            } else {
                span.innerText = char;
            }
            span.style.opacity = '0';
            span.style.animation = `fadeInChar 0.1s forwards ${index * 0.1}s`;
            hbdText.appendChild(span);
        });
    }
});

// ฟังก์ชันเปิดเผยใบโคลเวอร์
function revealClover() {
    const msgContent = document.getElementById('msg-content');
    const treeSection = msgContent.querySelector('#tree-section');
    const cloverSection = msgContent.querySelector('#clover-section');
    
    if(!treeSection || !cloverSection) return;

    // Fade out tree
    treeSection.style.transition = 'opacity 0.5s ease';
    treeSection.style.opacity = '0';
    
    setTimeout(() => {
        treeSection.style.display = 'none';
        cloverSection.style.display = 'block';
        
        // Trigger reflow
        void cloverSection.offsetWidth;
        
        cloverSection.style.opacity = '1';
        
        // Add confetti when clover appears
        confetti({ 
            particleCount: 50, 
            spread: 60,
            origin: { y: 0.6 },
            colors: ['#a8ff78', '#78ffd6', '#ffffff']
        });
    }, 500);
}

// ฟังก์ชันเปิดเผยคลิปวิดีโอแมว
function revealCatVideo() {
    const msgContent = document.getElementById('msg-content');
    const svgSection = msgContent.querySelector('#cat-svg-section');
    const videoSection = msgContent.querySelector('#cat-video-section');
    
    if(!svgSection || !videoSection) return;

    // Fade out SVG cat
    svgSection.style.transition = 'opacity 0.5s ease';
    svgSection.style.opacity = '0';
    
    setTimeout(() => {
        svgSection.style.display = 'none';
        videoSection.style.display = 'block';
        
        // Trigger reflow
        void videoSection.offsetWidth;
        
        videoSection.style.opacity = '1';
        
        // Play the video explicitly just in case autoplay didn't trigger
        const video = videoSection.querySelector('video');
        if (video) {
            video.play().catch(e => console.log('Autoplay prevented:', e));
        }
    }, 500);
}

// --- Music Player Logic ---
let isPlaying = false;

function togglePlayPause() {
    const msgContent = document.getElementById('msg-content');
    const albumCover = msgContent.querySelector('#album-cover');
    const iconPlay = msgContent.querySelector('#icon-play');
    const iconPause = msgContent.querySelector('#icon-pause');
    const progressFill = msgContent.querySelector('#progress-fill');
    const progressHandle = msgContent.querySelector('#progress-handle');
    const timeCurrent = msgContent.querySelector('.time-current');
    const audio = msgContent.querySelector('#hbd-audio');
    const volumeSlider = msgContent.querySelector('#volume-slider');
    
    if (!albumCover || !audio) return;

    // Sync volume with slider before playing
    if (volumeSlider) {
        audio.volume = volumeSlider.value;
    }

    isPlaying = !isPlaying;

    if (isPlaying) {
        albumCover.classList.add('playing');
        iconPlay.style.display = 'none';
        iconPause.style.display = 'block';
        audio.play().catch(e => console.log('Audio play failed:', e));
        
        // Setup timeupdate listener only once
        if (!audio.hasListener) {
            audio.hasListener = true;
            audio.addEventListener('timeupdate', () => {
                if (audio.duration) {
                    const progressPercent = (audio.currentTime / audio.duration) * 100;
                    progressFill.style.width = `${progressPercent}%`;
                    progressHandle.style.left = `${progressPercent}%`;
                    
                    let currentMins = Math.floor(audio.currentTime / 60);
                    let currentSecs = Math.floor(audio.currentTime % 60);
                    timeCurrent.innerText = `${currentMins}:${currentSecs < 10 ? '0' : ''}${currentSecs}`;
                }
            });
            
            // Auto reset when song ends
            audio.addEventListener('ended', () => {
                isPlaying = false;
                albumCover.classList.remove('playing');
                iconPlay.style.display = 'block';
                iconPause.style.display = 'none';
                progressFill.style.width = `0%`;
                progressHandle.style.left = `0%`;
                timeCurrent.innerText = `0:00`;
            });
        }
        
    } else {
        albumCover.classList.remove('playing');
        iconPlay.style.display = 'block';
        iconPause.style.display = 'none';
        audio.pause();
    }
}

// ฟังก์ชันปรับลด/เพิ่มเสียง
function changeVolume(value) {
    const msgContent = document.getElementById('msg-content');
    if (!msgContent) return;
    const audio = msgContent.querySelector('#hbd-audio');
    if (audio) {
        audio.volume = value;
    }
}
