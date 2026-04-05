# デザインシステム仕様書

## 1. カラーパレット

### プライマリ
```css
:root {
  /* --- Base --- */
  --c-bg:           #FAFAF7;     /* メイン背景。純白ではなく生成りに振る */
  --c-bg-warm:      #F5F0E8;     /* 温かみのあるセクション背景 */
  --c-bg-accent:    #EDE6D8;     /* 強調セクション背景 */
  --c-surface:      #FFFFFF;     /* カード等のサーフェス */

  /* --- Text --- */
  --c-text:         #2C2820;     /* 本文。純黒ではなく茶系の黒 */
  --c-text-light:   #6B6459;     /* サブテキスト */
  --c-text-muted:   #9A9285;     /* キャプション、メタ情報 */

  /* --- Accent --- */
  --c-accent:       #8B7355;     /* 山芋の土色。メインアクセント */
  --c-accent-dark:  #6B5A42;     /* ホバー・アクティブ */
  --c-accent-light: #C4A97D;     /* 淡いアクセント */

  /* --- Semantic --- */
  --c-green:        #7A8B5C;     /* 自然・新鮮さ。山芋の蔓の色 */
  --c-green-light:  #A8B88C;     /* 淡い緑 */
  --c-warm:         #D4A574;     /* 自然薯の肌色。温かみ */
  --c-warm-light:   #E8CEB0;     /* 淡い肌色 */

  /* --- UI --- */
  --c-border:       #E5E0D5;     /* ボーダー */
  --c-border-light: #F0EDE5;     /* 薄いボーダー */
  --c-overlay:      rgba(44, 40, 32, 0.6);  /* オーバーレイ */
  --c-overlay-light:rgba(44, 40, 32, 0.3);  /* 薄いオーバーレイ */
}
```

### カラー使用ルール
- 背景は `--c-bg`、`--c-bg-warm`、`--c-bg-accent` を交互に使い、セクション間にリズムを生む
- テキスト色の `#000000` 使用は禁止。必ず `--c-text`（茶系黒）を使う
- アクセント色は1ページに3〜5箇所のみ。使いすぎない
- `--c-green` は「食」「新鮮さ」に関連するコンテキストでのみ使用
- `--c-warm` は「温もり」「手仕事」に関連するコンテキストでのみ使用

## 2. タイポグラフィ

### フォント指定
```css
/* Google Fonts読み込み */
@import url('https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+New:wght@400;500;700&family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400&family=Shippori+Mincho:wght@400;500;600&display=swap');

:root {
  /* --- Font Families --- */
  --f-body:     'Zen Kaku Gothic New', 'Hiragino Kaku Gothic ProN', sans-serif;
  --f-serif:    'Shippori Mincho', 'Hiragino Mincho ProN', serif;
  --f-display:  'Cormorant Garamond', 'Shippori Mincho', serif;

  /* --- Font Sizes (clamp for fluid typography) --- */
  --fs-hero:    clamp(3rem, 8vw, 6rem);       /* 48px → 96px */
  --fs-section: clamp(2rem, 5vw, 3.5rem);     /* 32px → 56px */
  --fs-heading: clamp(1.5rem, 3vw, 2.25rem);  /* 24px → 36px */
  --fs-sub:     clamp(1.125rem, 2vw, 1.5rem); /* 18px → 24px */
  --fs-body:    clamp(0.938rem, 1.2vw, 1.063rem); /* 15px → 17px */
  --fs-small:   clamp(0.75rem, 1vw, 0.875rem);    /* 12px → 14px */
  --fs-caption:  0.75rem;                           /* 12px固定 */

  /* --- Line Heights --- */
  --lh-tight:   1.2;
  --lh-normal:  1.8;
  --lh-relaxed: 2.0;

  /* --- Letter Spacing --- */
  --ls-tight:   -0.02em;
  --ls-normal:  0.04em;
  --ls-wide:    0.12em;
  --ls-ultra:   0.25em;
}
```

### タイポグラフィ使用ルール
- **英語見出し**（CONCEPT, RECOMMEND等）: `--f-display`（Cormorant Garamond）、`--ls-wide`、大文字
- **日本語見出し**: `--f-serif`（Shippori Mincho）、`--ls-normal`
- **本文**: `--f-body`（Zen Kaku Gothic New）、`--lh-normal`〜`--lh-relaxed`
- **キャプション・メタ**: `--f-body` weight 400、`--c-text-muted`、`--fs-small`
- 英字と日本語が混在する見出しでは、英字部分のフォントサイズを日本語の1.1倍にして視覚バランスをとる
- 見出しの上には英語ラベル（セクション名）を `--fs-caption` `--ls-ultra` で配置し、階層を明示する

## 3. スペーシングシステム

```css
:root {
  --s-xs:   0.5rem;    /* 8px */
  --s-sm:   1rem;      /* 16px */
  --s-md:   1.5rem;    /* 24px */
  --s-lg:   2.5rem;    /* 40px */
  --s-xl:   4rem;      /* 64px */
  --s-2xl:  6rem;      /* 96px */
  --s-3xl:  8rem;      /* 128px */
  --s-4xl:  12rem;     /* 192px */

  /* セクション間余白（可変） */
  --section-gap-sm:  clamp(4rem, 8vw, 6rem);
  --section-gap-md:  clamp(6rem, 12vw, 10rem);
  --section-gap-lg:  clamp(8rem, 16vw, 14rem);
}
```

### スペーシングルール
- セクション間の余白は一律にしない。コンテンツが重いセクション（料理写真ギャラリーなど）の後は `--section-gap-lg`、軽いセクション（見出し＋一文のみ）の後は `--section-gap-sm`
- コンテナの最大幅は `1200px`、ただし写真セクションは `100vw` でフルブリードにする
- サイドマージンは `clamp(1.5rem, 5vw, 4rem)`

## 4. レイアウトシステム

### グリッド
```css
.container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 clamp(1.5rem, 5vw, 4rem);
}

.container--wide {
  max-width: 1400px;
}

.container--full {
  max-width: none;
  padding: 0;
}
```

### レイアウトパターン
以下のパターンを各セクションに適用する。同じパターンを連続で使わないこと。

1. **Split（5:7 or 7:5）** — 左右非対称分割。テキスト＋写真
2. **Stack** — 全幅テキスト → 全幅写真の縦積み
3. **Overlap** — 写真が隣のカラムに20%はみ出す
4. **Grid-break** — 3カラムグリッドだが1つだけ2行分の高さを持つ
5. **Full-bleed** — 写真がビューポート全幅、テキストはオーバーレイ
6. **Masonry-like** — 写真を不規則な大きさで配置（CSS Grid auto-fill）
7. **Offset** — テキストブロックが左に40pxオフセット、写真が右に寄る

## 5. コンポーネント仕様

### 5.1 ボタン
```css
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem 2rem;
  font-family: var(--f-body);
  font-size: var(--fs-small);
  font-weight: 500;
  letter-spacing: var(--ls-wide);
  text-transform: uppercase;
  border: 1px solid var(--c-text);
  background: transparent;
  color: var(--c-text);
  cursor: pointer;
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
  position: relative;
  overflow: hidden;
}

.btn:hover {
  background: var(--c-text);
  color: var(--c-bg);
}

.btn--accent {
  border-color: var(--c-accent);
  color: var(--c-accent);
}
.btn--accent:hover {
  background: var(--c-accent);
  color: #fff;
}

.btn--filled {
  background: var(--c-text);
  color: var(--c-bg);
  border-color: var(--c-text);
}
.btn--filled:hover {
  background: transparent;
  color: var(--c-text);
}

.btn--sm {
  padding: 0.625rem 1.25rem;
  font-size: var(--fs-caption);
}
```

### 5.2 セクション見出し
```html
<div class="section-header">
  <span class="section-header__label">CONCEPT</span>
  <h2 class="section-header__title">山芋への<br>こだわり</h2>
</div>
```
```css
.section-header {
  margin-bottom: var(--s-xl);
}
.section-header__label {
  display: block;
  font-family: var(--f-display);
  font-size: var(--fs-caption);
  letter-spacing: var(--ls-ultra);
  text-transform: uppercase;
  color: var(--c-text-muted);
  margin-bottom: var(--s-sm);
}
.section-header__title {
  font-family: var(--f-serif);
  font-size: var(--fs-section);
  font-weight: 400;
  line-height: var(--lh-tight);
  letter-spacing: var(--ls-normal);
  color: var(--c-text);
}
```

### 5.3 写真プレースホルダー
実写真は後差し替え前提。ダミーとしてaspect-ratioを維持したプレースホルダーを表示する。
```css
.img-placeholder {
  width: 100%;
  aspect-ratio: var(--aspect, 4/3);
  background: var(--c-bg-accent);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--c-text-muted);
  font-size: var(--fs-small);
  font-family: var(--f-body);
  letter-spacing: var(--ls-wide);
  overflow: hidden;
  position: relative;
}
/* ダミーの質感を出すためのノイズオーバーレイ */
/* ※ feTurbulence SVGフィルターはモバイル端末でスクロールジャンクを引き起こすため不使用 */
.img-placeholder::after {
  content: '';
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      45deg,
      transparent,
      transparent 4px,
      rgba(0, 0, 0, 0.015) 4px,
      rgba(0, 0, 0, 0.015) 5px
    );
  pointer-events: none;
}
```

### 5.4 カード（店舗紹介用）
```css
.brand-card {
  position: relative;
  display: grid;
  grid-template-columns: 5fr 7fr;
  gap: var(--s-lg);
}
/* 偶数番目は左右反転レイアウト（direction:rtlはテキスト方向に副作用があるためorderで制御） */
.brand-card:nth-child(even) {
  grid-template-columns: 7fr 5fr;
}
.brand-card:nth-child(even) .brand-card__visual {
  order: 2;
}
.brand-card:nth-child(even) .brand-card__content {
  order: 1;
}
```

### 5.5 スティッキーCTA（予約ボタン）
```css
.sticky-cta {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--c-surface);
  border-top: 1px solid var(--c-border);
  padding: var(--s-sm) var(--s-md);
  display: flex;
  justify-content: center;
  gap: var(--s-sm);
  transform: translateY(100%);
  transition: transform 0.5s cubic-bezier(0.22, 1, 0.36, 1);
  z-index: 100;
}
.sticky-cta.is-visible {
  transform: translateY(0);
}
```

### 5.7 画像オーバーレイテキスト
写真の上にテキストを重ねるFull-bleedセクション用。背景写真のトーンに依存せず可読性を確保する。
```css
.overlay-text {
  color: #FFFFFF;
  text-shadow: 0 1px 3px rgba(0, 0, 0, 0.4);
}
.overlay-text--dark {
  color: var(--c-text);
  text-shadow: 0 1px 3px rgba(255, 255, 255, 0.6);
}
/* Full-bleed写真の上にテキストを載せる場合、必ず半透明オーバーレイを敷く */
.full-bleed-overlay {
  position: relative;
}
.full-bleed-overlay::before {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    rgba(44, 40, 32, 0.1) 0%,
    rgba(44, 40, 32, 0.5) 100%
  );
  z-index: 1;
}
.full-bleed-overlay > * {
  position: relative;
  z-index: 2;
}
```

### 5.6 ハンバーガーメニュー
```css
.nav-toggle {
  width: 48px;
  height: 48px;
  position: relative;
  cursor: pointer;
  background: none;
  border: none;
  z-index: 200;
}
.nav-toggle__line {
  display: block;
  width: 24px;
  height: 1px;
  background: var(--c-text);
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  transition: all 0.4s cubic-bezier(0.22, 1, 0.36, 1);
}
.nav-toggle__line:nth-child(1) { top: 16px; }
.nav-toggle__line:nth-child(2) { top: 23px; }
.nav-toggle__line:nth-child(3) { top: 30px; }

/* Open state */
.nav-toggle.is-open .nav-toggle__line:nth-child(1) {
  top: 23px; transform: translateX(-50%) rotate(45deg);
}
.nav-toggle.is-open .nav-toggle__line:nth-child(2) {
  opacity: 0;
}
.nav-toggle.is-open .nav-toggle__line:nth-child(3) {
  top: 23px; transform: translateX(-50%) rotate(-45deg);
}
```

## 6. 背景テクスチャ

白ベースだが「べた白」は避ける。以下のテクスチャをCSSで実現する。

### 紙テクスチャ（メイン背景）
```css
/* 紙テクスチャ（メイン背景） */
/* ※ feTurbulence SVGフィルターはモバイル端末でスクロールジャンクを引き起こすため不使用 */
body {
  background-color: var(--c-bg);
  background-image:
    repeating-linear-gradient(
      0deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.008) 2px,
      rgba(0, 0, 0, 0.008) 4px
    ),
    repeating-linear-gradient(
      90deg,
      transparent,
      transparent 2px,
      rgba(0, 0, 0, 0.005) 2px,
      rgba(0, 0, 0, 0.005) 4px
    );
}
```

### 和のパターン（アクセントセクション背景）
CSS linear-gradient で組亀甲や麻の葉のような幾何学模様をごく薄く（opacity 0.03程度）背景に敷く。

## 7. アニメーション

### トランジションカーブ
```css
:root {
  --ease-out-expo: cubic-bezier(0.22, 1, 0.36, 1);
  --ease-in-out:   cubic-bezier(0.45, 0, 0.55, 1);
  --ease-spring:   cubic-bezier(0.34, 1.56, 0.64, 1);
}
```

### スクロールフェードイン
IntersectionObserverで `.is-inview` クラスを付与し、CSSでアニメーション。
```css
.reveal {
  opacity: 0;
  transform: translateY(40px);
  transition: opacity 0.8s var(--ease-out-expo), transform 0.8s var(--ease-out-expo);
}
.reveal.is-inview {
  opacity: 1;
  transform: translateY(0);
}

/* 遅延バリエーション */
.reveal--delay-1 { transition-delay: 0.1s; }
.reveal--delay-2 { transition-delay: 0.2s; }
.reveal--delay-3 { transition-delay: 0.3s; }
.reveal--delay-4 { transition-delay: 0.4s; }

/* スタガー: 親に .reveal--stagger を付け、子要素が順番にフェードイン */
.reveal--stagger > * {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.6s var(--ease-out-expo),
              transform 0.6s var(--ease-out-expo);
}
.reveal--stagger.is-inview > * {
  opacity: 1;
  transform: translateY(0);
}
```

### パララックス
```css
.parallax {
  will-change: transform;
}
```
JSでスクロール量に応じて `transform: translateY(${offset}px)` を適用。速度はdata-speed属性で指定。

## 8. レスポンシブブレークポイント

```css
/* Mobile first */
/* Small (default): ~375px */
/* Tablet: 768px */
@media (min-width: 768px) { }
/* Desktop: 1024px */
@media (min-width: 1024px) { }
/* Wide: 1440px */
@media (min-width: 1440px) { }
```

### レスポンシブルール
- 768px未満: 全セクションシングルカラム。Split/Overlapは縦積みに。写真は100vw
- 768px〜1024px: 2カラム対応。Splitは50:50に
- 1024px以上: 完全なデスクトップレイアウト。全レイアウトパターン有効
- ナビゲーション: 1024px未満はハンバーガー、以上はインラインメニュー
