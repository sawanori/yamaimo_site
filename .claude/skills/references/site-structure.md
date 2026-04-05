# サイト構造仕様書

## 全体構成

```
index.html          — コーポレートトップ（全店舗への入口）
kawasaki.html        — 川崎店ブランドページ
nishikasai.html      — 西葛西店ブランドページ
newshop.html         — 3号店テンプレート（ベースのみ）
```

---

## 1. index.html — コーポレートトップ

マルコのトップページ（marco.tokyo/index.html）を参考にした構成。全店舗の入口としての役割を持つ。

### セクション順序と詳細

#### SEC-01: ヒーロー
- **レイアウト**: フルスクリーン（100vh）、中央配置
- **背景**: ダミー写真プレースホルダー（山芋料理の湯気が立つイメージ）にオーバーレイ `--c-overlay-light`
- **コンテンツ**:
  - ロゴ: テキストベースで表現。「山芋の多い料理店」を `--f-serif` `--fs-hero` で大きく配置
  - サブコピー: 「全国の山芋を、まっすぐに。」（仮）を `--f-body` `--fs-sub` で配置
  - スクロールインジケーター: 下向き矢印アニメーション
- **アニメーション**: ロゴが0.5秒遅延でフェードアップ、サブコピーが0.8秒遅延
- **注意**: ヒーロー画像は全面ではなく、上下に白い余白（padding: 10vh 0）を残して「額縁」的に見せることで、フルブリードの重さを回避

#### SEC-02: ブランドメッセージ
- **レイアウト**: container内、テキスト中央寄せ
- **背景**: `--c-bg`
- **コンテンツ**:
  - ラベル: 「CONCEPT」`--fs-caption` `--ls-ultra`
  - 見出し: 「山芋を知り尽くした料理人が、三種の山芋で驚きをつくる。」（仮）`--f-serif` `--fs-section`
  - 本文: ブランドストーリー。全国各地の契約農家から直送、自然薯・大和芋・長芋の三種を使い分ける。川崎で始まり、西葛西へ。原点は「山芋のポテンシャルを最大限に引き出すこと」。2〜3段落。`--f-body` `--fs-body` `--lh-relaxed`
- **アニメーション**: テキストが行単位でスタガーフェードイン（reveal--delay-1〜3）

#### SEC-03: 三種の山芋
- **レイアウト**: 3カラム横並び（モバイルは縦積み）。ただし**均等グリッドではない**。左: 30%, 中: 40%, 右: 30% にして中央を大きく
- **背景**: `--c-bg-warm`
- **コンテンツ**: 3つの山芋の紹介
  1. **自然薯（じねんじょ）** — 「粘り最強、風味の王様」。写真プレースホルダー（縦長 2:3）、短い説明文
  2. **大和芋（やまといも）** — 「もっちり濃厚、揚げ物の名手」。写真プレースホルダー（正方形 1:1を大きく）、短い説明文
  3. **長芋（ながいも）** — 「シャキシャキ万能、毎日の相棒」。写真プレースホルダー（横長 3:2）、短い説明文
- **デザインポイント**: 3枚の写真のアスペクト比を全て変えることで、均一感を排除。各写真の下に山芋名を `--f-serif` で大きく表示
- **アニメーション**: 左→中→右の順にスタガーフェードイン

#### SEC-04: Our Brands（店舗一覧）
- **レイアウト**: 各店舗を交互レイアウトで縦積み（マルコ参考）
- **背景**: `--c-bg`
- **コンテンツ**: 各店舗カード（詳細は下記）

##### 店舗カード構造（1店舗分）
```html
<article class="brand-card reveal">
  <div class="brand-card__visual">
    <div class="img-placeholder" style="--aspect: 3/2;">川崎店 店内イメージ</div>
  </div>
  <div class="brand-card__content">
    <span class="brand-card__number">01</span>
    <h3 class="brand-card__name">山芋の多い料理店<br><span class="brand-card__location">川崎</span></h3>
    <p class="brand-card__desc">JR川崎駅徒歩5分。古民家風の和空間で、山芋の三種食べ比べ、名物の自然薯とろろ鍋、石焼とろろごはんを。宴会・貸切対応。</p>
    <div class="brand-card__meta">
      <span>55席</span>
      <span>宴会対応</span>
      <span>ランチ有</span>
    </div>
    <div class="brand-card__actions">
      <a href="kawasaki.html" class="btn">MORE</a>
      <a href="https://www.hotpepper.jp/strJ001168658/yoyaku/" class="btn btn--accent" target="_blank" rel="noopener noreferrer">WEB予約</a>
    </div>
  </div>
</article>
```

- **1枚目（川崎店）**: 写真左・テキスト右（Split 5:7）
- **2枚目（西葛西店）**: テキスト左・写真右（Split 7:5 逆配置）
- **3枚目（3号店）**: 写真フルブリード・テキストオーバーレイ（Full-bleed）。「COMING SOON」表記
- **番号表記**: 各カードの左上に `01` `02` `03` を `--f-display` `--fs-hero` で大きく薄く（opacity: 0.08）表示し、奥行きを出す

#### SEC-05: こだわり（料理哲学）
- **レイアウト**: Overlap型。テキストブロックが写真ブロックに20%重なる
- **背景**: `--c-bg`
- **コンテンツ**:
  - ラベル: 「PHILOSOPHY」
  - 見出し: 「畑から、あなたの前へ。」（仮）
  - 本文: 生産者との関係、産地直送、季節ごとのメニュー変更、山芋の品種ごとの調理法の使い分けなど。3段落程度。
  - 写真: 2枚のプレースホルダー（農家と料理人のイメージ）をずらして配置
- **アニメーション**: テキストが先にフェードイン → 0.3秒後に写真がスライドイン

#### SEC-06: NEWS
- **レイアウト**: container内、シンプルなリスト
- **背景**: `--c-bg-warm`
- **コンテンツ**:
  - ラベル: 「NEWS」
  - 最新3件のニュースをダミーで表示
  ```
  2026.04.01  3号店オープン準備中！（仮）
  2026.03.15  春の旬メニュー始まりました
  2026.02.01  全国鍋総選挙グランプリ受賞
  ```
  - 各行: 日付 `--fs-caption` + タイトル `--fs-body`
  - 「MORE」リンク

#### SEC-07: COMPANY
- **レイアウト**: Split（テキスト左・写真右）
- **背景**: `--c-bg`
- **コンテンツ**:
  - ラベル: 「COMPANY」
  - 会社情報テーブル（定義リスト `<dl>` で実装）
  ```
  運営: （未記載 — ダミーとして「株式会社〇〇」）
  所在地: 神奈川県川崎市川崎区砂子2-10-7 ルリエ川崎1F
  設立: 2017年
  事業内容: 飲食店経営
  ```
  - 写真: 外観 or 集合写真のプレースホルダー

#### SEC-08: RECRUIT
- **レイアウト**: テキスト中央寄せ + CTA
- **背景**: `--c-bg-accent` でセクション全体を囲み、他と差別化
- **コンテンツ**:
  - ラベル: 「RECRUIT」
  - 見出し: 「一緒に、山芋で驚きを。」（仮）
  - 短い採用メッセージ（2行程度）
  - 「求人情報を見る」ボタン（川崎店の求人ページリンク）
- **デザイン**: このセクションだけ `--c-accent` のボーダーライン（上下）で区切る

#### SEC-09: フッター
- **レイアウト**: ダーク背景で反転
- **背景**: `--c-text`（ダーク）
- **コンテンツ**:
  - ロゴ: 「山芋の多い料理店」白文字
  - 店舗リンク一覧（横並び）: 川崎 | 西葛西 | 3号店
  - ナビリンク: HOME / CONCEPT / BRANDS / COMPANY / RECRUIT
  - SNSリンク（アイコン）: Instagram, Facebook
  - コピーライト: `© 2017 山芋の多い料理店. All Rights Reserved.`

### グローバルナビゲーション
- **ヘッダー**: スティッキー。スクロール時に背景色がtransparent → `--c-surface`（半透明）に変化
- **構成**: ロゴ（左）+ ナビリンク（中央、デスクトップのみ）+ 予約ボタン（右）+ ハンバーガー（モバイルのみ）
- **モバイルメニュー**: フルスクリーンオーバーレイ。`--c-bg` 背景、左からスライドイン
- **メニュー内**: ナビリンク + 全店舗の予約リンク（マルコ参考）

---

## 2. kawasaki.html — 川崎店ブランドページ

### セクション順序と詳細

#### SHOP-01: ヒーロー
- **レイアウト**: 全幅、70vh
- **コンテンツ**:
  - 店舗名: 「山芋の多い料理店 川崎」`--f-serif` `--fs-hero`
  - サブ: 「JR川崎駅 東口徒歩5分」`--fs-small`
  - 背景: 店内の古民家風空間のプレースホルダー

#### SHOP-02: NEWS
- **レイアウト**: container内、横スクロール可能なカード（3件）
- **コンテンツ**: Instagram連携風のダミー投稿3件

#### SHOP-03: CONCEPT
- **レイアウト**: Split（テキスト5:写真7）→ その下にSplit反転（写真7:テキスト5）の2段構成
- **コンテンツ**:
  - ラベル: 「CONCEPT」
  - 見出し: 「どこか懐かしい、和の空間」
  - 本文第1段: 古民家のような雰囲気、カウンターから奥のテーブル席まで、幅広い客層に対応。全国各地の山芋を農家から直接仕入れ。
  - 本文第2段: 「山芋の多い料理店」の名のとおり、自然薯・大和芋・長芋を使い分けた料理が60種類以上。初めてでも常連でも、毎回新しい発見がある。
  - 写真プレースホルダー: 2枚（店内カウンター、料理提供シーン）

#### SHOP-04: RECOMMEND
- **レイアウト**: Swiperスライダー（横スクロール）
- **スライダー仕様**: 
  - デスクトップ: 3枚表示、センターがやや大きい（scale 1.05）
  - モバイル: 1.2枚表示（次のスライドがチラ見え）
  - ページネーション: ドット（`--c-accent`）
  - ナビ矢印: 左右に細い矢印
- **コンテンツ**: おすすめメニュー5品
  1. 石焼とろろごはん — 1,490円 — 「当店の元祖メニュー。アツアツの石焼の上に...」
  2. 鶏つくねの味噌チーズ鍋 — 一人前2,000円 — 「名物じねんじょとろろ鍋。たっぷりのとろろが...」
  3. 明太とろろいそべ揚げ — 800円 — 「大和芋のもっちり食感と明太子の...」
  4. 三種とろろ食べ比べ — 860円 — 「自然薯、大和芋、長芋の三種を...」
  5. 薄切り牛タン葱まみれ — 1,980円 — 「炭火で焼いた薄切り牛タンに...」
- **各スライド構造**:
  ```html
  <div class="swiper-slide recommend-card">
    <div class="recommend-card__img img-placeholder" style="--aspect: 1/1;">料理写真</div>
    <div class="recommend-card__body">
      <h3 class="recommend-card__name">石焼とろろごはん</h3>
      <p class="recommend-card__price">1,490円<span>(税込)</span></p>
      <p class="recommend-card__desc">当店の元祖メニュー。アツアツの石焼の上に...</p>
    </div>
  </div>
  ```

#### SHOP-05: 料理のこと
- **レイアウト**: 写真グリッド（Masonry-like）+ テキスト
- **コンテンツ**:
  - ラベル: 「FOOD」
  - 見出し: 「山芋のすべてを、一皿に。」
  - 本文: メニューカテゴリの説明。旬メニュー、名物じねんじょとろろ鍋（4種）、一品、元祖石焼、自然薯メニュー、長芋メニュー、大和芋メニュー、むかごメニュー、〆、甘味。
  - 写真グリッド: 6〜9枚のプレースホルダーを不規則サイズで配置
  - 価格帯: 「おつまみ 450円〜 / 鍋 一人前2,000円〜 / 〆 610円〜」`--fs-small` `--c-text-muted`

#### SHOP-06: ドリンクのこと
- **レイアウト**: Split（写真左:テキスト右）
- **コンテンツ**:
  - ラベル: 「DRINK」
  - 見出し: 「自然薯ビール、ここだけの一杯。」
  - 本文: T.T Breweryとの共同開発「自然薯ビール」が看板。日本酒・焼酎・ワインも充実。チャージ400円。
  - 価格帯: 「自然薯ビール 1,000円 / 生ビール 600円〜 / サワー 550円〜」
  - 写真: ビールグラスのプレースホルダー

#### SHOP-07: FLOOR 空間
- **レイアウト**: Full-bleed写真 + オーバーレイテキスト → その下に2カラム写真
- **コンテンツ**:
  - ラベル: 「FLOOR」
  - 見出し: 「どこか懐かしい和空間」
  - 本文: 和のテイスト、古民家のような雰囲気。カウンター席、4名席、6名席、8名席。宴会30〜45名。貸切40名〜。
  - フル幅写真: 店内全景のプレースホルダー
  - 2カラム写真: カウンター席、テーブル席のプレースホルダー

#### SHOP-08: ACCESS（店舗情報）
- **レイアウト**: Google Map埋め込み（iframe）+ 店舗情報テーブル
- **コンテンツ**:
  ```
  店名:     山芋の多い料理店 川崎
  住所:     神奈川県川崎市川崎区砂子2-10-7 ルリエ川崎1F
  アクセス:  JR川崎駅東口 徒歩5分 / 京急川崎駅 徒歩5分
  電話:     044-201-8687
  営業時間:  月火木〜土 11:30-14:00, 17:00-23:00
            水 17:00-23:00
            日祝 17:00-22:30
  定休日:   水曜ランチ
  席数:     55席（貸切30〜45名）
  カード:   VISA, Master, AMEX, Diners, JCB, 銀聯
  電子マネー: 楽天Edy, WAON, Suica, PASMO, nanaco, iD, QUICPay
  QR決済:   PayPay, 楽天ペイ, d払い, au PAY, Alipay
  ```
- **Google Map**: `<iframe src="https://maps.google.com/maps?q=神奈川県川崎市川崎区砂子2-10-7&output=embed">`

#### スティッキーCTA（川崎店）
店舗ページのみに表示される固定予約ボタン。各店舗で電話番号・予約URLを正しく切り替えること。
```html
<div class="sticky-cta" data-store="kawasaki">
  <a href="tel:044-201-8687" class="btn btn--sm">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    電話予約
  </a>
  <a href="https://www.hotpepper.jp/strJ001168658/yoyaku/" class="btn btn--accent btn--sm" target="_blank" rel="noopener noreferrer">
    WEB予約
  </a>
</div>
```

#### SHOP-09: フッター
- トップページと同じ共通フッター

---

## 3. nishikasai.html — 西葛西店ブランドページ

川崎店と同じセクション構成だが、以下が異なる:

### 差分データ
- **ヒーロー**: 「山芋の多い料理店 西葛西」、「西葛西駅 徒歩2分」
- **CONCEPT**: 地下に降りる階段が入口。隠れ家的雰囲気でまるで古民家のような空間。掘りごたつ席あり、小さいお子様連れのご家族の方でも安心。
- **RECOMMEND**: 
  1. 自然薯とろろ鍋（鶏つくね味噌チーズ）— 一人前1,848円
  2. むかご入り鶏つくね — 418円
  3. 石焼とろろごはん — 1,490円
  4. 明太とろろいそべ揚げ — 800円
  5. 三種とろろ食べ比べ — 860円
- **DRINK**: 自然薯ビール（ピルスナー）990円。
- **FLOOR**: 45席（カウンター8席、テーブル37席）。掘りごたつあり。B1F。貸切25名〜。
- **ACCESS**:
  ```
  店名:     山芋の多い料理店 西葛西
  住所:     東京都江戸川区西葛西6-18-3 KIRAKUビル B1
  アクセス:  東京メトロ東西線 西葛西駅 南口 徒歩2分
  電話:     03-6661-4243
  営業時間:  月〜日 17:00-23:00
  定休日:   不定休
  席数:     45席（カウンター8席、テーブル37席）
  カード:   VISA, Master, AMEX, Diners, JCB
  電子マネー: 利用不可
  チャージ:  300円
  ```

- **スティッキーCTA**: 西葛西店用に差し替え
```html
<div class="sticky-cta" data-store="nishikasai">
  <a href="tel:03-6661-4243" class="btn btn--sm">
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
    電話予約
  </a>
  <a href="https://www.hotpepper.jp/strJ001173228/yoyaku/" class="btn btn--accent btn--sm" target="_blank" rel="noopener noreferrer">
    WEB予約
  </a>
</div>
```

### レイアウトの差別化
川崎店とテンプレートは共通だが、以下を変えて「コピペ感」を排除する:
- CONCEPT: 川崎は「テキスト左→写真右」だが、西葛西は「写真フルブリード→テキスト重ね」に変更
- RECOMMEND: スライダーの初期表示枚数を変える（デスクトップ2.5枚表示）
- FLOOR: 川崎は「全幅写真→2カラム」だが、西葛西は「3カラム写真グリッド→テキスト」

---

## 4. newshop.html — 3号店テンプレート

### 方針
- 全セクションの**HTMLスケルトン**を配置済み
- コンテンツはすべてダミー / プレースホルダー
- `<!-- TODO: 3号店情報が決まったら差し替え -->` コメントを要所に挿入
- COMING SOON 表示をヒーローに

### SEO
Thin Content回避のため、`<head>` 内に以下を配置する:
```html
<meta name="robots" content="noindex, follow">
```

### ヒーロー
```html
<section class="hero hero--coming-soon">
  <div class="hero__inner">
    <span class="hero__label">COMING SOON</span>
    <h1 class="hero__title">山芋の多い料理店<br><span>3号店</span></h1>
    <p class="hero__sub">新店舗情報は近日公開</p>
  </div>
</section>
```

残りのセクションは川崎店テンプレートと同じ構造で、コンテンツはすべて `<!-- TODO -->` コメント + プレースホルダー。

---

## 5. 共通ヘッダー / フッター

### ヘッダー
```html
<header class="header" id="header">
  <div class="header__inner">
    <a href="index.html" class="header__logo">
      山芋の多い料理店
    </a>
    <nav class="header__nav" id="globalNav">
      <a href="index.html">HOME</a>
      <a href="index.html#concept">CONCEPT</a>
      <a href="index.html#brands">BRANDS</a>
      <a href="index.html#company">COMPANY</a>
      <a href="index.html#recruit">RECRUIT</a>
    </nav>
    <!-- トップページ: 川崎店予約をデフォルト表示。店舗ページでは各店のリンクに差し替え -->
    <a href="https://www.hotpepper.jp/strJ001168658/yoyaku/" class="header__reserve btn btn--accent btn--sm" target="_blank" rel="noopener noreferrer">WEB予約</a>
    <button class="nav-toggle" id="navToggle" aria-label="メニュー">
      <span class="nav-toggle__line"></span>
      <span class="nav-toggle__line"></span>
      <span class="nav-toggle__line"></span>
    </button>
  </div>
</header>
```

### モバイルメニュー
```html
<div class="mobile-menu" id="mobileMenu" aria-hidden="true">
  <nav class="mobile-menu__nav">
    <a href="index.html" class="mobile-menu__link">HOME</a>
    <a href="index.html#concept" class="mobile-menu__link">CONCEPT</a>
    <a href="index.html#brands" class="mobile-menu__link">BRANDS</a>
    <a href="index.html#company" class="mobile-menu__link">COMPANY</a>
    <a href="index.html#recruit" class="mobile-menu__link">RECRUIT</a>
  </nav>
  <div class="mobile-menu__shops">
    <h4 class="mobile-menu__shops-title">SHOPS</h4>
    <a href="kawasaki.html" class="mobile-menu__shop-link">川崎店</a>
    <a href="nishikasai.html" class="mobile-menu__shop-link">西葛西店</a>
    <a href="newshop.html" class="mobile-menu__shop-link">3号店</a>
  </div>
  <div class="mobile-menu__reserve">
    <a href="https://www.hotpepper.jp/strJ001168658/yoyaku/" class="btn btn--accent" target="_blank" rel="noopener noreferrer">川崎店 WEB予約</a>
    <a href="https://www.hotpepper.jp/strJ001173228/yoyaku/" class="btn btn--accent" target="_blank" rel="noopener noreferrer">西葛西店 WEB予約</a>
  </div>
</div>
```
※ `aria-hidden` はJS側で開閉時に `true`/`false` を切り替える。開いた際は `<main>` に `inert` 属性を付与してフォーカストラップを実現する。

### フッター
```html
<footer class="footer">
  <div class="footer__inner container">
    <div class="footer__brand">
      <p class="footer__logo">山芋の多い料理店</p>
      <p class="footer__copy">© 2017 山芋の多い料理店. All Rights Reserved.</p>
    </div>
    <nav class="footer__nav">
      <a href="index.html">HOME</a>
      <a href="index.html#concept">CONCEPT</a>
      <a href="index.html#brands">BRANDS</a>
      <a href="index.html#company">COMPANY</a>
      <a href="index.html#recruit">RECRUIT</a>
    </nav>
    <div class="footer__shops">
      <h4>SHOPS</h4>
      <a href="kawasaki.html">川崎</a>
      <a href="nishikasai.html">西葛西</a>
      <a href="newshop.html">3号店</a>
    </div>
    <div class="footer__social">
      <!-- SNSアイコンリンク -->
    </div>
  </div>
</footer>
```
