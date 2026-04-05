# インタラクション & アニメーション仕様書

## 1. スクロールアニメーション

### IntersectionObserver設定
```javascript
const observerOptions = {
  root: null,
  rootMargin: '0px 0px -80px 0px', // 画面下端より80px手前で発火
  threshold: 0.15
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-inview');
      observer.unobserve(entry.target); // 一度だけ発火
    }
  });
}, observerOptions);

document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

### アニメーションバリエーション

#### フェードアップ（デフォルト）
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out-expo),
              transform 0.8s var(--ease-out-expo);
}
.reveal.is-inview {
  opacity: 1;
  transform: translateY(0);
}
```

#### フェードイン（移動なし）
```css
.reveal--fade {
  opacity: 0;
  transform: none;
  transition: opacity 1.2s var(--ease-out-expo);
}
.reveal--fade.is-inview { opacity: 1; }
```

#### スライドイン左から
```css
.reveal--left {
  opacity: 0;
  transform: translateX(-60px);
  transition: opacity 0.8s var(--ease-out-expo),
              transform 0.8s var(--ease-out-expo);
}
.reveal--left.is-inview {
  opacity: 1;
  transform: translateX(0);
}
```

#### スライドイン右から
```css
.reveal--right {
  opacity: 0;
  transform: translateX(60px);
  transition: opacity 0.8s var(--ease-out-expo),
              transform 0.8s var(--ease-out-expo);
}
.reveal--right.is-inview {
  opacity: 1;
  transform: translateX(0);
}
```

#### スケールアップ
```css
.reveal--scale {
  opacity: 0;
  transform: scale(0.92);
  transition: opacity 0.8s var(--ease-out-expo),
              transform 0.8s var(--ease-out-expo);
}
.reveal--scale.is-inview {
  opacity: 1;
  transform: scale(1);
}
```

#### スタガー遅延（子要素のディレイ）
```css
.reveal--stagger > *:nth-child(1) { transition-delay: 0s; }
.reveal--stagger > *:nth-child(2) { transition-delay: 0.1s; }
.reveal--stagger > *:nth-child(3) { transition-delay: 0.2s; }
.reveal--stagger > *:nth-child(4) { transition-delay: 0.3s; }
.reveal--stagger > *:nth-child(5) { transition-delay: 0.4s; }
.reveal--stagger > *:nth-child(6) { transition-delay: 0.5s; }
```
子要素にも `opacity:0; transform:translateY(20px)` を設定し、親の `.is-inview` で解除。

### 各セクションへの適用マッピング

| セクション | アニメーション | 備考 |
|---|---|---|
| ヒーロー | フェードアップ（delay付き） | ロゴ→サブコピー→スクロールインジケーターの順 |
| CONCEPT | stagger（行単位） | テキストを行ごとに遅延 |
| 三種の山芋 | stagger（カラム単位） | 左→中→右 |
| Our Brands | 各カードがフェードアップ | 交互レイアウトに合わせてleft/rightも混ぜる |
| PHILOSOPHY | テキスト: フェードアップ → 写真: reveal--left/right | 0.3秒のディレイ差 |
| NEWS | フェードアップ | シンプル |
| COMPANY | reveal--left（テキスト）+ reveal--right（写真） | 左右から寄せる |
| RECRUIT | reveal--scale | 中央から拡がる感覚 |
| RECOMMEND | なし（Swiperが担当） | |
| FLOOR | reveal--fade（全幅写真）→ stagger（2カラム写真） | |
| ACCESS | フェードアップ | シンプル |

---

## 2. パララックス

### 実装
```javascript
const parallaxElements = document.querySelectorAll('[data-parallax]');

function updateParallax() {
  parallaxElements.forEach(el => {
    const speed = parseFloat(el.dataset.parallax) || 0.1;
    const rect = el.getBoundingClientRect();
    const scrolled = window.innerHeight - rect.top;
    if (scrolled > 0 && rect.top < window.innerHeight) {
      const offset = scrolled * speed;
      el.style.transform = `translateY(${offset}px)`;
    }
  });
}

// RAF loop
let ticking = false;
window.addEventListener('scroll', () => {
  if (!ticking) {
    requestAnimationFrame(() => {
      updateParallax();
      ticking = false;
    });
    ticking = true;
  }
});
```

### 適用箇所
- ヒーロー背景画像: `data-parallax="0.15"` （ゆっくり）
- PHILOSOPHY セクション写真: `data-parallax="0.08"` （わずかに）
- FLOOR 全幅写真: `data-parallax="0.1"`
- 三種の山芋 中央画像: `data-parallax="-0.05"` （逆方向にわずか浮遊）

### 注意
- モバイル（768px未満）ではパララックスを無効化（パフォーマンス）
- `prefers-reduced-motion` メディアクエリ尊重

```javascript
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const isMobile = window.innerWidth < 768;
if (!prefersReducedMotion && !isMobile) {
  // パララックス有効化
}
```

---

## 3. ヘッダー挙動

### スクロール時の変化
```javascript
const header = document.getElementById('header');
let lastScrollY = 0;

window.addEventListener('scroll', () => {
  const currentScrollY = window.scrollY;

  // 背景変化: 50px以上スクロールで白背景に
  if (currentScrollY > 50) {
    header.classList.add('is-scrolled');
  } else {
    header.classList.remove('is-scrolled');
  }

  // スクロール方向で表示/非表示（200px以上で有効化）
  if (currentScrollY > 200) {
    if (currentScrollY > lastScrollY) {
      header.classList.add('is-hidden'); // 下スクロール: 隠す
    } else {
      header.classList.remove('is-hidden'); // 上スクロール: 出す
    }
  }

  lastScrollY = currentScrollY;
});
```

### CSS
```css
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 150;
  padding: var(--s-sm) 0;
  background: transparent;
  transition: background 0.4s var(--ease-out-expo),
              transform 0.4s var(--ease-out-expo),
              box-shadow 0.4s var(--ease-out-expo);
}

.header.is-scrolled {
  background: rgba(250, 250, 247, 0.95);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  box-shadow: 0 1px 0 var(--c-border-light);
}

.header.is-hidden {
  transform: translateY(-100%);
}
```

---

## 4. モバイルメニュー

### 開閉アニメーション
```javascript
const navToggle = document.getElementById('navToggle');
const mobileMenu = document.getElementById('mobileMenu');
const mainContent = document.querySelector('main');
const body = document.body;

navToggle.addEventListener('click', () => {
  const isOpen = navToggle.classList.toggle('is-open');
  mobileMenu.classList.toggle('is-open');
  body.classList.toggle('no-scroll');

  // アクセシビリティ: フォーカストラップ
  mobileMenu.setAttribute('aria-hidden', !isOpen);
  if (mainContent) {
    if (isOpen) {
      mainContent.setAttribute('inert', '');
    } else {
      mainContent.removeAttribute('inert');
    }
  }

  // メニュー内リンクのスタガーアニメーション
  if (isOpen) {
    mobileMenu.querySelectorAll('.mobile-menu__link').forEach((link, i) => {
      link.style.transitionDelay = `${0.05 * (i + 1)}s`;
    });
    // メニュー内の最初のリンクにフォーカス
    const firstLink = mobileMenu.querySelector('.mobile-menu__link');
    if (firstLink) firstLink.focus();
  }
});

// メニュー内リンクをクリックしたらメニューを閉じる
mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navToggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    body.classList.remove('no-scroll');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mainContent) mainContent.removeAttribute('inert');
  });
});

// Escキーでメニューを閉じる
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && mobileMenu.classList.contains('is-open')) {
    navToggle.classList.remove('is-open');
    mobileMenu.classList.remove('is-open');
    body.classList.remove('no-scroll');
    mobileMenu.setAttribute('aria-hidden', 'true');
    if (mainContent) mainContent.removeAttribute('inert');
    navToggle.focus();
  }
});
```

### CSS
```css
.mobile-menu {
  position: fixed;
  inset: 0;
  background: var(--c-bg);
  z-index: 140;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: var(--s-lg);
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.5s var(--ease-out-expo),
              visibility 0s 0.5s;
}

.mobile-menu.is-open {
  opacity: 1;
  visibility: visible;
  transition: opacity 0.5s var(--ease-out-expo),
              visibility 0s 0s;
}

.mobile-menu__link {
  font-family: var(--f-display);
  font-size: var(--fs-heading);
  letter-spacing: var(--ls-wide);
  color: var(--c-text);
  text-decoration: none;
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s var(--ease-out-expo),
              transform 0.4s var(--ease-out-expo);
}

.mobile-menu.is-open .mobile-menu__link {
  opacity: 1;
  transform: translateY(0);
}

body.no-scroll {
  overflow: hidden;
}
```

---

## 5. Swiper（RECOMMENDスライダー）

### CDN読み込み
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css">
<script src="https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js"></script>
```

### 初期化
```javascript
// Swiperの存在チェック付き初期化
function initRecommendSwiper() {
  if (typeof Swiper === 'undefined') {
    console.warn('Swiper.js の読み込みに失敗しました。スライダーをスクロール表示にフォールバックします。');
    // フォールバック: 横スクロール可能なコンテナとして表示
    const swiperContainer = document.querySelector('.recommend-swiper');
    if (swiperContainer) {
      swiperContainer.style.overflowX = 'auto';
      swiperContainer.style.display = 'flex';
      swiperContainer.style.gap = '20px';
      swiperContainer.style.scrollSnapType = 'x mandatory';
      swiperContainer.querySelectorAll('.swiper-slide').forEach(slide => {
        slide.style.flexShrink = '0';
        slide.style.width = '280px';
        slide.style.scrollSnapAlign = 'start';
      });
    }
    return;
  }

  const recommendSwiper = new Swiper('.recommend-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: false,
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
        centeredSlides: false,
      },
    },
  });
}

// DOMContentLoaded後に初期化
document.addEventListener('DOMContentLoaded', initRecommendSwiper);
```

### 西葛西店のSwiper差分
西葛西店ではデスクトップの表示枚数を変えてコピペ感を排除する。

```javascript
// 西葛西店用: ページ判定してbreakpointsを上書き
function initNishikasaiSwiper() {
  if (typeof Swiper === 'undefined') return;
  if (!document.body.classList.contains('page-nishikasai')) return;

  const recommendSwiper = new Swiper('.recommend-swiper', {
    slidesPerView: 1.2,
    spaceBetween: 20,
    centeredSlides: false,
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
        slidesPerView: 2.5,  /* 西葛西店: 2.5枚表示 */
        spaceBetween: 24,
      },
      1024: {
        slidesPerView: 2.5,  /* 西葛西店: デスクトップも2.5枚 */
        spaceBetween: 32,
        centeredSlides: true,
      },
    },
  });
}
```
※ 各HTMLの `<body>` にページ識別クラス（`page-kawasaki`, `page-nishikasai` 等）を付与すること。

### スライダーのデザイン
- ナビ矢印: 細い線の矢印（SVGアイコン）、ホバーで `--c-accent` に変化
- ページネーション: 小さなドット、アクティブ時に横長に伸びる
- スライドカード: 上に写真（1:1）、下にテキスト。ホバーで写真が0.02秒かけてscale(1.03)

```css
.recommend-card__img {
  transition: transform 0.6s var(--ease-out-expo);
  overflow: hidden;
}
.recommend-card:hover .recommend-card__img {
  transform: scale(1.03);
}

/* ページネーション */
.swiper-pagination-bullet {
  width: 8px;
  height: 8px;
  background: var(--c-border);
  opacity: 1;
  transition: all 0.3s var(--ease-out-expo);
}
.swiper-pagination-bullet-active {
  width: 24px;
  border-radius: 4px;
  background: var(--c-accent);
}
```

---

## 6. スティッキーCTA

### 表示条件
- ヒーローセクションを過ぎたら表示（下からスライドイン）
- フッターに到達したら非表示
- ブランドページ（店舗ページ）でのみ表示。トップページでは非表示

### 実装
```javascript
function initStickyCTA() {
  const stickyCTA = document.querySelector('.sticky-cta');
  if (!stickyCTA) return;

  const hero = document.querySelector('.hero');
  const footer = document.querySelector('.footer');

  const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.target === hero) {
        // ヒーローが見えなくなったら表示
        stickyCTA.classList.toggle('is-visible', !entry.isIntersecting);
      }
      if (entry.target === footer) {
        // フッターが見えたら非表示
        if (entry.isIntersecting) {
          stickyCTA.classList.remove('is-visible');
        }
      }
    });
  }, { threshold: 0 });

  if (hero) ctaObserver.observe(hero);
  if (footer) ctaObserver.observe(footer);
}
```

### HTML（店舗ページのみ）
```html
<!-- 各店舗ページで電話番号・予約URLを正しく設定すること -->
<!-- 川崎店の例 -->
<div class="sticky-cta" data-store="kawasaki">
  <a href="tel:044-201-8687" class="btn btn--sm">
    <svg><!-- 電話アイコン --></svg>
    電話予約
  </a>
  <a href="https://www.hotpepper.jp/strJ001168658/yoyaku/" class="btn btn--accent btn--sm" target="_blank" rel="noopener noreferrer">
    WEB予約
  </a>
</div>

<!-- 西葛西店の例 -->
<div class="sticky-cta" data-store="nishikasai">
  <a href="tel:03-6661-4243" class="btn btn--sm">
    <svg><!-- 電話アイコン --></svg>
    電話予約
  </a>
  <a href="https://www.hotpepper.jp/strJ001173228/yoyaku/" class="btn btn--accent btn--sm" target="_blank" rel="noopener noreferrer">
    WEB予約
  </a>
</div>
```

**注意:** 店舗ページごとに正しい電話番号・予約URLに差し替えること。川崎店のハードコードを他店で流用しないこと。

---

## 7. スムーススクロール

### ページ内リンク
```javascript
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return; // '#' のみのリンクは無視

    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.getBoundingClientRect().top + window.scrollY - headerHeight - 20;
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      });
    } else {
      console.warn(`[スムーススクロール] アンカー先が見つかりません: ${href}`);
    }
  });
});
```

---

## 8. ローディング（オプション）

ページ読み込み完了後に `.is-loaded` クラスを付与。初期状態ではコンテンツを非表示にし、ロード完了で表示。

```javascript
window.addEventListener('load', () => {
  document.body.classList.add('is-loaded');
});
```

```css
body:not(.is-loaded) .hero__title,
body:not(.is-loaded) .hero__sub {
  opacity: 0;
}

body.is-loaded .hero__title {
  animation: fadeUp 0.8s var(--ease-out-expo) 0.3s both;
}
body.is-loaded .hero__sub {
  animation: fadeUp 0.8s var(--ease-out-expo) 0.6s both;
}

@keyframes fadeUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
```

---

## 9. アクセシビリティ

- `prefers-reduced-motion: reduce` でアニメーションを無効化
```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- フォーカスインジケーター
```css
:focus-visible {
  outline: 2px solid var(--c-accent);
  outline-offset: 2px;
}
```

- ハンバーガーメニューの `aria-label`, `aria-expanded` を動的に切り替え
- 画像プレースホルダーにも `role="img"` と `aria-label` を設定

---

## 10. レスポンシブ挙動まとめ

| 要素 | < 768px | 768px〜1024px | > 1024px |
|---|---|---|---|
| ナビ | ハンバーガー | ハンバーガー | インラインリンク |
| ヒーロー文字 | 3rem | 4.5rem | 6rem |
| Splitレイアウト | 縦積み | 50:50 | 5:7 or 7:5 |
| Swiper表示枚数 | 1.2枚 | 2.3枚 | 3枚 |
| パララックス | 無効 | 有効 | 有効 |
| スティッキーCTA | 表示 | 表示 | 表示 |
| フッター | 縦積み | 2カラム | 4カラム |
| セクション間余白 | 4rem | 6rem | 8〜14rem |

---

## 11. ページ判定

### body識別クラス
各HTMLの `<body>` タグにページ識別クラスを付与する。JSからページ固有の処理を分岐するために使用。

```html
<!-- index.html -->
<body class="page-top">

<!-- kawasaki.html -->
<body class="page-kawasaki page-shop">

<!-- nishikasai.html -->
<body class="page-nishikasai page-shop">

<!-- newshop.html -->
<body class="page-newshop page-shop">
```

### JS側のページ判定
```javascript
const isShopPage = document.body.classList.contains('page-shop');
const isTopPage = document.body.classList.contains('page-top');

// 店舗ページのみの機能
if (isShopPage) {
  initStickyCTA();
  initRecommendSwiper();
}

// 西葛西店固有
if (document.body.classList.contains('page-nishikasai')) {
  initNishikasaiSwiper();
}
```
