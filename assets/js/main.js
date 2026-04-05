/**
 * 山芋の多い料理店 — main.js
 * 全ページ共通スクリプト
 */

/* ============================================================
 * 1. ローディング
 * ============================================================ */
window.addEventListener('load', () => {
  document.body.classList.add('is-loaded');
});

/* ============================================================
 * DOMContentLoaded — メイン初期化
 * ============================================================ */
document.addEventListener('DOMContentLoaded', () => {

  /* prefers-reduced-motion を最初に評価し、全体フラグとして使う */
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ページ判定 */
  const isShopPage = document.body.classList.contains('page-shop');
  const isNishikasai = document.body.classList.contains('page-nishikasai');

  /* ----------------------------------------------------------
   * 2. IntersectionObserver（スクロールアニメーション）
   * ---------------------------------------------------------- */
  initRevealObserver(prefersReducedMotion);

  /* ----------------------------------------------------------
   * 3. パララックス
   * ---------------------------------------------------------- */
  initParallax(prefersReducedMotion);

  /* ----------------------------------------------------------
   * 4. ヘッダー挙動
   * ---------------------------------------------------------- */
  initHeader();

  /* ----------------------------------------------------------
   * 5. モバイルメニュー
   * ---------------------------------------------------------- */
  initMobileMenu();

  /* ----------------------------------------------------------
   * 7. スティッキーCTA（店舗ページのみ）
   * ---------------------------------------------------------- */
  if (isShopPage) {
    initStickyCTA();
  }

  /* ----------------------------------------------------------
   * 6. Swiper 初期化（店舗ページのみ）
   * ---------------------------------------------------------- */
  if (isShopPage) {
    if (isNishikasai) {
      initSwiper('nishikasai');
    } else {
      initSwiper('default');
    }
  }

  /* ----------------------------------------------------------
   * 8. スムーススクロール
   * ---------------------------------------------------------- */
  initSmoothScroll();

  /* ----------------------------------------------------------
   * 9. ヒーロー背景ループスクロール
   * ---------------------------------------------------------- */
  initHeroBgScroll(prefersReducedMotion);

}); /* end DOMContentLoaded */


/* ============================================================
 * 2. IntersectionObserver（スクロールアニメーション）
 * ============================================================ */
function initRevealObserver(prefersReducedMotion) {
  const revealEls = document.querySelectorAll('.reveal, .reveal--fade, .reveal--left, .reveal--right, .reveal--scale, .reveal--stagger');
  if (!revealEls.length) return;

  /* reduced-motion の場合は即座に全要素を表示 */
  if (prefersReducedMotion) {
    revealEls.forEach(el => el.classList.add('is-inview'));
    return;
  }

  const observerOptions = {
    root: null,
    rootMargin: '0px 0px -80px 0px',
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-inview');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  revealEls.forEach(el => observer.observe(el));
}


/* ============================================================
 * 3. パララックス
 * ============================================================ */
function initParallax(prefersReducedMotion) {
  const isMobile = window.innerWidth < 768;

  /* モバイルまたは reduced-motion では無効化 */
  if (prefersReducedMotion || isMobile) return;

  const parallaxEls = document.querySelectorAll('[data-parallax]');
  if (!parallaxEls.length) return;

  let ticking = false;

  function updateParallax() {
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const scrolled = window.innerHeight - rect.top;
      if (scrolled > 0 && rect.top < window.innerHeight) {
        const offset = scrolled * speed;
        el.style.transform = `translateY(${offset}px)`;
      }
    });
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(updateParallax);
      ticking = true;
    }
  }, { passive: true });
}


/* ============================================================
 * 4. ヘッダー挙動
 * ============================================================ */
function initHeader() {
  const header = document.getElementById('header');
  if (!header) return;

  let lastScrollY = window.scrollY;

  window.addEventListener('scroll', () => {
    const currentScrollY = window.scrollY;

    /* 50px以上スクロールで背景色変化 */
    if (currentScrollY > 50) {
      header.classList.add('is-scrolled');
    } else {
      header.classList.remove('is-scrolled');
    }

    /* 200px以上で方向検知 */
    if (currentScrollY > 200) {
      if (currentScrollY > lastScrollY) {
        /* 下スクロール: 隠す */
        header.classList.add('is-hidden');
      } else {
        /* 上スクロール: 出す */
        header.classList.remove('is-hidden');
      }
    } else {
      /* 上部に戻ったら必ず表示 */
      header.classList.remove('is-hidden');
    }

    lastScrollY = currentScrollY;
  }, { passive: true });
}


/* ============================================================
 * 5. モバイルメニュー
 * ============================================================ */
function initMobileMenu() {
  const navToggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  if (!navToggle || !mobileMenu) return;

  const mainContent = document.querySelector('main');
  const body = document.body;

  function openMenu() {
    navToggle.classList.add('is-open');
    mobileMenu.classList.add('is-open');
    body.classList.add('no-scroll');
    mobileMenu.setAttribute('aria-hidden', 'false');
    navToggle.setAttribute('aria-expanded', 'true');

    /* <main> を inert にしてフォーカストラップを実現 */
    if (mainContent) mainContent.setAttribute('inert', '');

    /* メニュー内リンクにスタガー delay を設定 */
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link, i) => {
      link.style.transitionDelay = `${0.05 * (i + 1)}s`;
    });

    /* 最初のリンクにフォーカス */
    const firstLink = mobileMenu.querySelector('.mobile-menu__link');
    if (firstLink) firstLink.focus();
  }

  function closeMenu() {
    navToggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    body.classList.remove('no-scroll');
    mobileMenu.setAttribute('aria-hidden', 'true');
    navToggle.setAttribute('aria-expanded', 'false');

    if (mainContent) mainContent.removeAttribute('inert');
  }

  /* ハンバーガーボタンのトグル */
  navToggle.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.contains('is-open');
    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  /* メニュー内のすべてのリンクをクリックしたら閉じる */
  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      closeMenu();
    });
  });

  /* Esc キーでメニューを閉じ、トグルボタンにフォーカスを戻す */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
      closeMenu();
      navToggle.focus();
    }
  });
}


/* ============================================================
 * 6. Swiper 初期化（RECOMMEND スライダー）
 * ============================================================ */
function initSwiper(variant) {
  const swiperEl = document.querySelector('.recommend-swiper');
  if (!swiperEl) return;

  /* CDN 読み込み失敗時のフォールバック */
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper.js の読み込みに失敗しました。スライダーをスクロール表示にフォールバックします。');
    const wrapper = swiperEl.querySelector('.swiper-wrapper');
    if (wrapper) {
      wrapper.style.display = 'flex';
      wrapper.style.gap = '20px';
      wrapper.style.overflowX = 'auto';
      wrapper.style.scrollSnapType = 'x mandatory';
      wrapper.style.WebkitOverflowScrolling = 'touch';
      wrapper.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.style.flexShrink = '0';
        slide.style.width = '280px';
        slide.style.scrollSnapAlign = 'start';
      });
    }
    return;
  }

  /* 西葛西店: 2.5枚表示（差別化） */
  if (variant === 'nishikasai') {
    new Swiper('.recommend-swiper', {
      slidesPerView: 1.2,
      spaceBetween: 20,
      grabCursor: true,
      pagination: {
        el: '.recommend-swiper__pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.recommend-swiper__next',
        prevEl: '.recommend-swiper__prev',
      },
      breakpoints: {
        768: {
          slidesPerView: 2.5,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 2.5,
          spaceBetween: 32,
          centeredSlides: true,
        },
      },
    });
    return;
  }

  /* デフォルト（川崎店等）: 3枚横並びカルーセル（marco準拠） */
  new Swiper('.recommend-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    grabCursor: true,
    pagination: {
      el: '.recommend-swiper__pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.recommend-swiper__next',
      prevEl: '.recommend-swiper__prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2.3,
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 3,
        spaceBetween: 32,
      },
    },
  });
}


/* ============================================================
 * 7. スティッキーCTA
 * ============================================================ */
function initStickyCTA() {
  const stickyCTA = document.querySelector('.sticky-cta');
  if (!stickyCTA) return;

  const hero = document.querySelector('.hero');
  const footer = document.querySelector('.footer');

  /* hero も footer も存在しない場合はそのまま表示 */
  if (!hero && !footer) {
    stickyCTA.classList.add('is-visible');
    return;
  }

  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === hero) {
        /* ヒーローがビューポートから消えたら表示 */
        stickyCTA.classList.toggle('is-visible', !entry.isIntersecting);
      }
      if (entry.target === footer) {
        /* フッターがビューポートに入ったら非表示 */
        if (entry.isIntersecting) {
          stickyCTA.classList.remove('is-visible');
        }
      }
    });
  }, { threshold: 0 });

  if (hero) ctaObserver.observe(hero);
  if (footer) ctaObserver.observe(footer);
}


/* ============================================================
 * 9. ヒーロー背景ループスクロール
 * ============================================================ */
function initHeroBgScroll(prefersReducedMotion) {
  const bgScroll = document.getElementById('heroBgScroll');
  if (!bgScroll) return;
  const track = bgScroll.querySelector('.hero__bg-track');
  if (!track) return;

  if (prefersReducedMotion) return; /* アクセシビリティ対応 */

  let posX = 0;
  const speed = 0.3;
  // 全画像の半分の幅（1セット分）でリセット
  const totalImages = track.querySelectorAll('.hero__slide-img');
  const halfCount = totalImages.length / 2;

  function getResetWidth() {
    let w = 0;
    for (let i = 0; i < halfCount; i++) {
      w += totalImages[i].offsetWidth;
    }
    return w;
  }

  let resetWidth = 0;
  // 画像読み込み後に幅計算
  window.addEventListener('load', () => {
    resetWidth = getResetWidth();
  });

  function animate() {
    posX -= speed;
    if (resetWidth > 0 && Math.abs(posX) >= resetWidth) {
      posX = 0;
    }
    track.style.transform = `translateX(${posX}px)`;
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
}


/* ============================================================
 * 8. スムーススクロール
 * ============================================================ */
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      /* '#' のみのリンクは無視 */
      if (href === '#') return;

      e.preventDefault();

      const target = document.querySelector(href);
      if (target) {
        const header = document.getElementById('header');
        const headerHeight = header ? header.offsetHeight : 0;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth',
        });
      } else {
        console.warn(`[スムーススクロール] アンカー先が見つかりません: ${href}`);
      }
    });
  });
}
