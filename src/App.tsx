import React, { useEffect, useMemo, useRef, useState } from 'react';

/* =========================
   型定義
========================= */
type Lang = 'ja' | 'en';

/* =========================
   翻訳辞書（英語を基準にキー型を生成）
========================= */
const en = {
  // Header
  nav_service: 'SERVICE',
  nav_about: 'ABOUT US',
  nav_greeting: 'GREETING',
  nav_company: 'COMPANY',
  nav_contact: 'CONTACT',

  // Brand
  brand: 'Kokualoha',

  // Hero
  hero_title_line1: 'The Ultimate Hawaii Experience,',
  hero_title_line2: 'Exclusively for You.',

  // About (short + long)
  about_title: 'ABOUT US',
  about_desc:
    'We provide reliable, locally rooted concierge support in Hawaii with a focus on “Made in Hawaii.”',
  about_desc_long: `There are unseen pitfalls to living abroad. In Hawaii too, the old notion that “you can trust someone just because they are Japanese” has faded, and people sometimes face unexpected problems.

While Japanese-language services have increased, prices are often higher than local rates, and the sense of safety from “Japanese-owned, so it's fine” is slipping away. In the U.S., rigorous public review systems such as Yelp matter, yet businesses that serve only Japanese customers tend not to appear in those arenas.

We face this reality and, together with local experts, guide guests with respect for what is authentically Made in Hawaii. Because we live here and welcome dear friends, we introduce not only Japanese-run businesses but also the true charms of Hawaii. Our aim is to move beyond a Japan-only bubble and coexist with the local community.

Even school choices can become insular—following where “someone’s child goes” narrows diversity. There are also cases where people rely on a Japanese acquaintance they happened to meet, only to encounter trouble due to insufficient knowledge or experience. Goodwill is not the same as expertise, and mistaking one for the other can have serious consequences.

At Kokualoha, a team handles each case. If an issue arises, we find a way forward and take responsibility for our guests—valuing organizational reliability and accountability over individual goodwill.

Some officials have lamented that more visitors “take from Hawaii without gratitude or giving back.” As people who live here, we continue our work with respect and appreciation for this place.

We share these realities not to be negative, but to learn together about the rigor of a different culture—the United States—so that you can grow and build a richer life. Living in Hawaii is both a challenge and a great joy. We will support that step with sincerity and responsibility.`,

  // Founder greeting (separate section)
  greeting_title: 'Message from the Founder',
  greeting_name: 'Taro Hawaii',
  greeting_body_long: `I have lived in Hawaii for 30 years. I came here alone for university and, through an internship, entered the travel industry. After switching to a work visa and gaining experience, I became independent 20 years ago. I have challenged many areas—from tour buses and transfers to optional tours and vacation rentals—continuing even through the pandemic with the support of locals and guests.

I’m also involved with “Music Band,” the only activity in Hawaii that teaches music to children with disabilities. In recent years, I was entrusted by a Japanese investor to operate a long-standing karaoke venue—another new challenge.

One of our signature tours is the Pearl Harbor Historical Tour. We carefully pass on the history of the efforts and sacrifices of Japanese Americans, and share why Hawaii remains a special place for Japanese people. Delivering experiences that stay in the heart—beyond mere sightseeing—is our pride.`,

  // Service
  service_title: 'SERVICE',
  service_subtitle: 'What We Offer',
  service_note_more:
    'We also arrange professional appointments, immigration support, bespoke tours and golf.',
  svc1_title: 'Japanese Support',
  svc1_desc:
    'Bilingual help via LINE/phone/app; translation for documents and daily procedures.',
  svc2_title: 'Medical Support',
  svc2_desc:
    'Introduce Japanese-speaking doctors, make appointments, accompany as interpreter.',
  svc3_title: 'Loss & Theft Assistance',
  svc3_desc:
    'Guide passport/credit reissue and embassy contact; support police procedures.',
  svc4_title: 'Legal Consultation',
  svc4_desc:
    'Connect you with attorneys; explain cultural/legal differences and next steps.',
  svc5_title: 'Home & Vehicle Care',
  svc5_desc:
    'House/vehicle check, airport pickup, bill payment, mail check—before/after stays.',
  svc6_title: 'Utilities & IDs',
  svc6_desc:
    'Open utilities/mobile, state certificates, driver’s license, SSN procedures.',

  // Plans
  plans_title: 'MEMBERSHIP',
  plan_light: 'Light (one-time)',
  plan_standard: 'Standard (6 months)',
  plan_premium: 'Premium (1 year)',
  plan_price_light: '$20',
  plan_price_standard: '$200',
  plan_price_premium: '$380',
  plans_note:
    'Membership enables us to act on your behalf during trouble; case-by-case fees may apply.',

  // Company
  company_title: 'COMPANY',
  company_name: 'Kokualoha',
  company_desc:
    'Concierge & coordination for residents, investors and travelers — rooted in Hawaii.',

  // Contact
  contact_title: 'CONTACT',
  contact_subtitle: 'Tell us your ideal stay or concern',
  contact_name: 'Name',
  contact_email: 'Email',
  contact_phone: 'Phone',
  contact_message: 'Message',
  contact_send: 'Send',

  // Footer
  footer_rights: 'All Rights Reserved.',
  footer_copyright: '© Kokualoha',
} as const;

type Keys = keyof typeof en;

const ja: Record<Keys, string> = {
  // Header
  nav_service: 'サービス',
  nav_about: '私たちについて',
  nav_greeting: '代表挨拶',
  nav_company: '会社情報',
  nav_contact: 'お問い合わせ',

  // Brand
  brand: 'コクアロハ',

  // Hero
  hero_title_line1: '究極のハワイ体験を、',
  hero_title_line2: 'あなただけに。',

  // About
  about_title: '私たちについて',
  about_desc:
    'Made in Hawaii を大切に、現地に根差した信頼できるコンシェルジュサポートをご提供します。',
  about_desc_long: `海外生活には、見えない落とし穴が存在します。ここハワイでも、かつては「日本人だから安心できる」という信頼がありましたが、残念ながら今はその神話が崩れ、思わぬ被害に遭うケースが少なくありません。

日本語でのサービスは増えましたが、料金はローカルより高く、「日本人が経営しているから大丈夫」という安心感も薄れつつあります。アメリカ社会では Yelp などの厳しい口コミ評価が重視される一方、日本人向けにのみ営業する事業者は、そうした公的な評価の場に現れにくいのが現状です。

私たちはこの現実を直視し、ローカルの専門家と共に、本当に価値のある “Made in Hawaii” を大切にしたご案内を行っています。ここに暮らし、友人を迎える立場だからこそ、日本人経営のお店だけでなく、ハワイ本来の魅力をご紹介したい。目的は「日本人だけの世界からの脱却」と「現地社会との共生」です。

学校選びひとつでも「○○ちゃんが行くから」と同質化が進み、多様性を失う例があります。たまたま知り合った在住日本人に頼み、知識や経験不足からトラブルになるケースも少なくありません。人の善意と専門性は別物であり、見誤ると深刻な結果につながり得ます。

コクアロハでは、一つの案件をチームで遂行します。問題があれば必ず打開策を見つけ、責任をもってご案内します。個人の善意に頼るのではなく、組織としての信頼と責任を重視します。

「最近はハワイに感謝や還元を忘れてしまう日本人が増えた」との声も耳にします。だからこそ、この地に生きる者として、敬意と感謝を忘れずに活動を続けます。

都合の良い話ばかりではなく、異文化である米国の厳しさを共に学び、成長し、より豊かな人生を築いていただきたい――。ハワイで暮らすことは挑戦であり、大きな喜びです。私たちはその一歩を、誠実に、責任をもって支えます。`,

  // Founder greeting（独立セクション）
  greeting_title: '代表挨拶',
  greeting_name: 'ハワイ太郎',
  greeting_body_long: `私はハワイに暮らして30年になります。留学を目的に単身でハワイの大学へ入学し、学生時代の研修をきっかけに旅行業界に入りました。その後、就労ビザに切り替えて経験を積み、20年前に独立。ツアーバスや送迎車両、オプショナルツアー、民泊事業など、多方面に挑戦しながら今日まで歩んでまいりました。パンデミックという大きな試練もありましたが、地元の方々やお客様に支えられ、事業を続けることができました。

また、個人的にはハワイで唯一、障害をもつ子どもたちに音楽を教える「Music Band 」の活動にも携わっております。さらに近年は、日本の投資家から老舗カラオケ店の運営を託され、新たな挑戦も始めました。

私たちの代表的なツアーのひとつに「真珠湾ヒストリカルツアー」があります。日系人の努力や犠牲の歴史を大切に伝え、なぜハワイが日本人にとって特別な場所であり続けるのかを、お客様と分かち合うことを使命としています。観光だけで終わらない“心に残る体験”をお届けすることこそ、私たちの誇りです。`,

  // Service
  service_title: 'サービス',
  service_subtitle: '提供メニュー',
  service_note_more:
    '弁護士・会計士・銀行など各種アポイント、ビザ/移民手続き、オーダーメイド観光やゴルフ手配も承ります。',
  svc1_title: '日本語サポート',
  svc1_desc:
    'LINE・電話・アプリでの日本語＋現地語対応、各種書類や手続きの翻訳・通訳。',
  svc2_title: '医療サポート',
  svc2_desc:
    '日本語対応医師のご紹介・予約、必要に応じて同行や通訳も対応。',
  svc3_title: '紛失・盗難時の支援',
  svc3_desc:
    'パスポート/カード再発行、在外公館や警察手続きのサポート。',
  svc4_title: '法律相談',
  svc4_desc:
    '弁護士のご紹介、文化・法律の違いの解説、対応方針の整理。',
  svc5_title: '住まい・車の管理',
  svc5_desc:
    'お部屋・車の点検、空港送迎、公共料金や郵便の確認など滞在前後のケア。',
  svc6_title: '公共料金・ID手続き',
  svc6_desc:
    '通信/水道/電気の開設、州の証明書、運転免許・SSN 取得の支援。',

  // Plans
  plans_title: '会員プラン',
  plan_light: 'ライト（1回のみ）',
  plan_standard: 'スタンダード（6ヶ月）',
  plan_premium: 'プレミアム（1年）',
  plan_price_light: '$20',
  plan_price_standard: '$200',
  plan_price_premium: '$380',
  plans_note:
    'トラブル時の身元引受・各種対応のため会員登録が必要です。個別案件は内容に応じて別料金。',

  // Company
  company_title: '会社情報',
  company_name: 'コクアロハ',
  company_desc:
    '居住者・投資家・旅行者のための現地密着コンシェルジュ／コーディネーション。',

  // Contact
  contact_title: 'お問い合わせ',
  contact_subtitle: '理想の滞在やお困りごとをお聞かせください',
  contact_name: 'お名前',
  contact_email: 'メールアドレス',
  contact_phone: '電話番号',
  contact_message: 'お問い合わせ内容',
  contact_send: '送信',

  // Footer
  footer_rights: 'All Rights Reserved.',
  footer_copyright: '© コクアロハ',
};

const translations: Record<Lang, Record<Keys, string>> = {
  en: { ...en },
  ja,
};

/* キー安全な翻訳ヘルパー */
function useI18n(lang: Lang) {
  return useMemo(() => {
    const dict = translations[lang];
    const t = (k: Keys) => dict[k];
    return { t, dict };
  }, [lang]);
}

/* =========================
   柔らかいグラデ区切り線
========================= */
const Divider = () => (
  <div aria-hidden="true" className="h-4 md:h-5 bg-gradient-to-b from-black/10 to-transparent opacity-30" />
);

/* =========================
   背景色つきセクションのラッパー
========================= */
type BandProps = {
  tone?: 'base' | 'tint';
  id?: string;
  children: React.ReactNode;
};
const Band: React.FC<BandProps> = ({ tone = 'base', id, children }) => (
  <section className={tone === 'tint' ? 'bg-[#F2ECE3]' : ''}>
    <div id={id} className="mx-auto max-w-6xl px-4 py-24 fade-in-section scroll-mt-24">
      {children}
    </div>
  </section>
);

/* =========================
   メインコンポーネント
========================= */
export default function App() {
  const [lang, setLang] = useState<Lang>('ja');
  const { t } = useI18n(lang);

  // スクロール時フェードイン
  const ioRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fade-in-section');
    ioRef.current?.disconnect();
    ioRef.current = new IntersectionObserver(
      entries => entries.forEach(e => e.isIntersecting && e.target.classList.add('is-visible')),
      { threshold: 0.1 }
    );
    els.forEach(el => ioRef.current?.observe(el));
    return () => ioRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-[#F8F5F0]/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-serif text-xl">{t('brand')}</div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a className="hover:opacity-70" href="#service">{t('nav_service')}</a>
            <a className="hover:opacity-70" href="#about">{t('nav_about')}</a>
            <a className="hover:opacity-70" href="#greeting">{t('nav_greeting')}</a>
            <a className="hover:opacity-70" href="#company">{t('nav_company')}</a>
            <a className="hover:opacity-70" href="#contact">{t('nav_contact')}</a>
          </nav>
          <div className="flex items-center gap-2">
            <button
              className={`px-3 py-1 rounded text-sm ${lang === 'ja' ? 'bg-black text-white' : 'border'}`}
              onClick={() => setLang('ja')}
            >
              日本語
            </button>
            <button
              className={`px-3 py-1 rounded text-sm ${lang === 'en' ? 'bg-black text-white' : 'border'}`}
              onClick={() => setLang('en')}
            >
              EN
            </button>
          </div>
        </div>
      </header>

      {/* ------- Hero（全面） ------- */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'linear-gradient(to bottom, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.35) 100%)' }}
        />
        <div className="relative z-10 h-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <p className="uppercase tracking-widest text-xs md:text-sm text-white/80 mb-4">WELCOME TO</p>
          <h1 className="hero-text-animation font-serif text-white drop-shadow leading-tight text-4xl sm:text-5xl md:text-7xl">
            {t('hero_title_line1')}<br />{t('hero_title_line2')}
          </h1>
          <a
            href="#service"
            className="mt-10 inline-block rounded-xl bg-white text-[#4F463F] px-7 py-3 text-sm font-semibold hover:shadow-lg transition"
          >
            {lang === 'ja' ? '詳しく見る' : 'LEARN MORE'}
          </a>
        </div>
        <div className="scroll-down" aria-hidden="true" />
      </section>

      <Divider />

      {/* ------- About（通常） ------- */}
      <Band id="about" tone="base">
        <h2 className="font-serif text-3xl md:text-4xl mb-3">{t('about_title')}</h2>
        <p className="opacity-80 mb-8">{t('about_desc')}</p>
        <div className="space-y-4 text-[15px] md:text-base leading-8 text-[#4F463F]">
          {t('about_desc_long').split(/\n{2,}/).map((p, i) => <p key={i}>{p.trim()}</p>)}
        </div>
        <figure className="mt-12 border-2 border-[#4F463F]/30 p-2">
          <img
            src="https://images.unsplash.com/photo-1501117716987-c8e3f1d6e8d6?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-auto object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </Band>

      <Divider />

      {/* ------- Greeting（薄ベージュ） ------- */}
      <Band id="greeting" tone="tint">
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-start md:items-end">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl mb-3">{t('greeting_title')}</h2>
            <p className="text-sm opacity-70 mb-4">{t('greeting_name')}</p>
            <div className="space-y-4 text-[15px] md:text-base leading-8">
              {t('greeting_body_long').split(/\n{2,}/).map((p, i) => <p key={i}>{p.trim()}</p>)}
            </div>
          </div>
          <figure className="border border-[#4F463F]/20 shadow-sm">
            <img
              src="/about-side.jpg?v=1"
              alt="Founder portrait"
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>
      </Band>

      <Divider />

      {/* ------- Service（通常） ------- */}
      <Band id="service" tone="base">
        <h2 className="font-serif text-3xl mb-2">{t('service_title')}</h2>
        <p className="text-sm opacity-70 mb-8">{t('service_subtitle')}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {([
            ['svc1_title','svc1_desc'],
            ['svc2_title','svc2_desc'],
            ['svc3_title','svc3_desc'],
            ['svc4_title','svc4_desc'],
            ['svc5_title','svc5_desc'],
            ['svc6_title','svc6_desc'],
          ] as const).map(([ti, de]) => (
            <article key={ti} className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="font-serif text-xl mb-2">{t(ti as Keys)}</h3>
              <p className="text-sm leading-6">{t(de as Keys)}</p>
            </article>
          ))}
        </div>

        <p className="text-sm opacity-80 mt-6">{t('service_note_more')}</p>

        <div className="mt-12">
          <h3 className="font-serif text-2xl mb-4">{t('plans_title')}</h3>
          <div className="grid md:grid-cols-3 gap-6">
            {([
              ['plan_light','plan_price_light'],
              ['plan_standard','plan_price_standard'],
              ['plan_premium','plan_price_premium'],
            ] as const).map(([nameKey, priceKey]) => (
              <div key={nameKey} className="rounded-2xl bg-white p-6 shadow-sm flex items-center justify-between">
                <div className="font-serif text-lg">{t(nameKey as Keys)}</div>
                <div className="text-xl font-semibold">{t(priceKey as Keys)}</div>
              </div>
            ))}
          </div>
          <p className="text-xs opacity-70 mt-3">{t('plans_note')}</p>
        </div>
      </Band>

      <Divider />

      {/* ------- Company（薄ベージュ） ------- */}
      <Band id="company" tone="tint">
        <h2 className="font-serif text-3xl mb-4">{t('company_title')}</h2>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-serif text-xl mb-2">{t('company_name')}</p>
          <p className="leading-7">{t('company_desc')}</p>
        </div>
      </Band>

      <Divider />

      {/* ------- Contact（通常） ------- */}
      <Band id="contact" tone="base">
        <h2 className="font-serif text-3xl mb-2">{t('contact_title')}</h2>
        <p className="text-sm opacity-70 mb-8">{t('contact_subtitle')}</p>

        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thanks! (temporary)');
          }}
        >
          <div className="grid gap-2">
            <label className="text-sm">{t('contact_name')}</label>
            <input className="rounded-xl border p-3 bg-white" required />
          </div>
          <div className="grid gap-2">
            <label className="text-sm">{t('contact_email')}</label>
            <input type="email" className="rounded-xl border p-3 bg-white" required />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm">{t('contact_phone')}</label>
            <input className="rounded-xl border p-3 bg-white" />
          </div>
          <div className="grid gap-2 md:col-span-2">
            <label className="text-sm">{t('contact_message')}</label>
            <textarea rows={5} className="rounded-xl border p-3 bg-white" />
          </div>
          <div className="md:col-span-2">
            <button className="rounded-xl bg-black text-white px-5 py-3">
              {t('contact_send')}
            </button>
          </div>
        </form>
      </Band>

      <Divider />

      {/* Footer */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div>{t('footer_copyright')}</div>
          <div className="opacity-70">{t('footer_rights')}</div>
        </div>
      </footer>
    </div>
  );
}
