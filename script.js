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
        .typeString('<span style="color: #ff9a9e;">สสวก.นะคับขอให้มิ้งมีความสุขที่สุดในโลก</span>')
        .pauseFor(300)
        .typeString('<br>และขอให้ในอนาคตมีแต่สิ่งดีๆเกิดขึ้น 🌟')
        .pauseFor(300)
        .typeString('<br>คิดอะไรก็ขอให้ได้ตามหวังน้า 😊')
        .pauseFor(300)
        .typeString('<br>เลิฟเลิฟ ')
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
});
