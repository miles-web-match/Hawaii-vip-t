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
  nav_accommodations: 'ACCOMMODATIONS',
  nav_about: 'ABOUT US',
  nav_company: 'COMPANY',
  nav_contact: 'CONTACT',

  // Hero
  hero_title_line1: 'The Ultimate Hawaii Experience,',
  hero_title_line2: 'Exclusively for You.',

  // Service
  service_title: 'SERVICE',
  service_subtitle: 'Our Services',
  service1_title: 'Bespoke Tours',
  service1_desc:
    'We design one-of-a-kind custom tours tailored to your desires, from private sightseeing to special activities.',
  service2_title: 'Private Transport',
  service2_desc:
    'Luxury private transport for airport transfers and sightseeing. Private jets and helicopters can also be arranged.',
  service3_title: 'VIP Reservations',
  service3_desc:
    'We secure bookings at popular restaurants, arrange private chefs, and reserve golf courses.',

  // Accommodations
  accommodations_title: 'ACCOMMODATIONS',
  accommodations_subtitle: 'Curated Stays for Your Comfort',

  // About
  about_title: 'ABOUT',
  about_desc:
    'Our dedicated concierge team creates tailored experiences for discerning travelers seeking the finest in Hawaii.',
  about_desc_long: `There are unseen pitfalls to living abroad. In Hawaii too, the old belief that “you can trust someone just because they are Japanese” has faded, and unfortunately people sometimes encounter unexpected trouble.

While services in Japanese have increased, prices are often higher than local rates, and the sense of security created by “Japanese-owned, so it's safe” is slipping away. In the U.S., rigorous public review systems such as Yelp matter, yet businesses that market only to Japanese visitors or residents tend not to appear in those arenas.

We face this reality and, together with local experts, provide guidance that values Made in Hawaii. Because we live here and welcome dear friends, we want to introduce not only Japanese-run businesses but also the true charms of Hawaii. Our purpose is to move beyond a Japan-only bubble and to coexist with the local community.

Even school choices can become insular—following where “someone’s child goes” narrows diversity. We also hear of cases where people relied on a Japanese acquaintance they happened to meet, only to encounter problems because that person lacked the necessary knowledge or experience. Goodwill is not the same as expertise, and mistaking one for the other can lead to serious consequences.

At our company, a team handles every case. If an issue arises, we will always find a way forward and take responsibility for guiding our clients. We value organizational reliability and accountability over individual goodwill.

A Japanese government official once remarked that some visitors now “take from Hawaii without remembering gratitude or giving back.” That is why, as people who live here, we act with respect and appreciation for this place.

We share these realities not to be negative, but because we hope to learn together about the rigor of a different culture—the United States—so that you can grow and build a richer life.

Living in Hawaii is both a challenge and a great joy. We will support that step with sincerity and responsibility.`,

  // Company
  company_title: 'COMPANY',
  company_name: 'Milztech Inc.',
  company_desc:
    'We provide premium travel coordination and concierge services for VIP guests visiting the Hawaiian islands.',

  // Contact
  contact_title: 'CONTACT',
  contact_subtitle: 'Tell us your ideal Hawaii stay',
  contact_name: 'Name',
  contact_email: 'Email',
  contact_phone: 'Phone',
  contact_message: 'Message',
  contact_send: 'Send',

  // Footer
  footer_rights: 'All Rights Reserved.',
  footer_copyright: '© Hawaii VIP Concierge',
} as const;

type Keys = keyof typeof en;

const ja: Record<Keys, string> = {
  // Header
  nav_service: 'サービス',
  nav_accommodations: '宿泊',
  nav_about: '私たちについて',
  nav_company: '会社情報',
  nav_contact: 'お問い合わせ',

  // Hero
  hero_title_line1: '究極のハワイ体験を、',
  hero_title_line2: 'あなただけに。',

  // Service
  service_title: 'サービス',
  service_subtitle: '提供メニュー',
  service1_title: 'オーダーメイドツアー',
  service1_desc:
    '観光から特別アクティビティまで、ご希望に合わせて唯一無二のプランを設計します。',
  service2_title: '専用送迎',
  service2_desc:
    '空港送迎や観光にラグジュアリーな専用車をご用意。プライベートジェットやヘリの手配も可能です。',
  service3_title: 'VIP予約手配',
  service3_desc:
    '人気店の予約確保、プライベートシェフの手配、ゴルフコースの確保など、特別な時間をお約束します。',

  // Accommodations
  accommodations_title: '宿泊',
  accommodations_subtitle: '厳選された滞在先',

  // About
  about_title: '私たちについて',
  about_desc:
    '上質な体験を求めるお客様のために、専属コンシェルジュが最適なプランをオーダーメイドでご提案します。',
  about_desc_long: `海外生活には、見えない落とし穴が存在します。ここハワイでも、かつては「日本人だから安心できる」という信頼がありましたが、残念ながら今はその神話が崩れ、思わぬ被害に遭うケースが少なくありません。

日本語でのサービスは増えましたが、料金はローカルより高く、さらに「日本人が経営しているから大丈夫」という安心感も失われつつあります。実際、アメリカ社会では Yelp などの口コミによる厳しい評価が重視される一方で、日本人向けにのみ営業しているお店や企業は、そうした公的な評価の場に現れにくいのが現状です。

私たちはその状況を直視し、ローカルの専門家と共に、Made in Hawaii を大切にしたご案内を行っています。ハワイに住むからこそ、そして大切な友人を迎えるからこそ、日本人経営のお店だけでなく、本当のハワイの魅力を紹介したい。それが私たちの願いであり、目的は「日本人だけの世界からの脱却」と「現地社会との共生」です。

実際、学校ひとつをとっても「○○ちゃんが行くから」という理由で同じコミュニティーに偏り、結果的に多様性を失う例もあります。また、「たまたま知り合った在住日本人に頼んだら、知識も経験も十分でなく、トラブルに…」というケースも多発しています。人の良さと専門性は別物であり、それを見誤ることで取り返しのつかない結果を招くこともあるのです。

弊社では、一つの案件をチームで遂行し、問題があれば必ず打開策を見つけ、責任をもってお客様をご案内します。個人の善意に頼るのではなく、組織としての信頼と責任を重視しています。

ある日本政府関係者も「最近のハワイは、利用するだけで、感謝や還元を忘れてしまう日本人が増えている」と語っていました。だからこそ、私たちはこの地に住む者として、ハワイへの敬意と感謝を忘れずに活動してまいります。

確かに、ここまで多くの現実をお伝えしました。しかし私たちは、ただ都合の良い話を並べるのではなく、アメリカという異なる文化の厳しさを共に学びながら、成長し、より豊かな人生を築いていただきたいと願っています。

ハワイに暮らすことは、挑戦であり、そして大きな喜びです。私たちはその一歩を、誠実に、責任を持って支えてまいります。`,

  // Company
  company_title: '会社情報',
  company_name: 'Milztech株式会社',
  company_desc:
    'ハワイにお越しになるVIPゲストのための旅程調整・コンシェルジュサービスを提供しています。',

  // Contact
  contact_title: 'お問い合わせ',
  contact_subtitle: '理想のハワイ滞在をお聞かせください',
  contact_name: 'お名前',
  contact_email: 'メールアドレス',
  contact_phone: '電話番号',
  contact_message: 'お問い合わせ内容',
  contact_send: '送信',

  // Footer
  footer_rights: 'All Rights Reserved.',
  footer_copyright: '© Hawaii VIP Concierge',
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
          <div className="font-serif text-xl">Hawaii VIP</div>
          <nav className="hidden md:flex gap-6 text-sm">
            <a className="hover:opacity-70" href="#service">{t('nav_service')}</a>
            <a className="hover:opacity-70" href="#accommodations">{t('nav_accommodations')}</a>
            <a className="hover:opacity-70" href="#about">{t('nav_about')}</a>
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

      {/* ------- Hero（全面＋黒フィルター＋中央） ------- */}
      <section className="relative h-screen w-full overflow-hidden">
        {/* 背景画像（public/hero.jpg） */}
        <img
          src="/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* 黒いオーバーレイ（CDNでも確実に効く） */}
        <div className="absolute inset-0 bg-black bg-opacity-60" />
        {/* 下方向のグラデ（inlineで確実に） */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.35) 100%)',
          }}
        />
        {/* コンテンツ（中央寄せ） */}
        <div className="relative z-10 h-full max-w-5xl mx-auto px-4 flex flex-col items-center justify-center text-center">
          <p className="uppercase tracking-widest text-xs md:text-sm text-white/80 mb-4">
            WELCOME TO
          </p>
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

      {/* ------- About（ヒーロー直下に最初に表示） ------- */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-24 fade-in-section">
        <h2 className="font-serif text-3xl md:text-4xl mb-6">{t('about_title')}</h2>
        <div className="space-y-4 text-[15px] md:text-base leading-8 text-[#4F463F]">
          {t('about_desc_long')
            .split(/\n{2,}/)
            .map((p, i) => <p key={i}>{p.trim()}</p>)}
        </div>
      </section>

      {/* Service */}
      <section id="service" className="mx-auto max-w-6xl px-4 py-20 fade-in-section">
        <h2 className="font-serif text-3xl mb-2">{t('service_title')}</h2>
        <p className="text-sm opacity-70 mb-8">{t('service_subtitle')}</p>

        <div className="grid md:grid-cols-3 gap-6">
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl mb-2">{t('service1_title')}</h3>
            <p className="text-sm leading-6">{t('service1_desc')}</p>
          </article>
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl mb-2">{t('service2_title')}</h3>
            <p className="text-sm leading-6">{t('service2_desc')}</p>
          </article>
          <article className="rounded-2xl bg-white p-6 shadow-sm">
            <h3 className="font-serif text-xl mb-2">{t('service3_title')}</h3>
            <p className="text-sm leading-6">{t('service3_desc')}</p>
          </article>
        </div>
      </section>

      {/* Accommodations */}
      <section id="accommodations" className="mx-auto max-w-6xl px-4 py-20 fade-in-section">
        <h2 className="font-serif text-3xl mb-2">{t('accommodations_title')}</h2>
        <p className="text-sm opacity-70 mb-8">{t('accommodations_subtitle')}</p>
        <div className="grid md:grid-cols-3 gap-6">
          {[1, 2, 3].map(n => (
            <article key={n} className="rounded-2xl bg-white p-6 shadow-sm h-40 flex items-center justify-center opacity-70">
              Coming soon
            </article>
          ))}
        </div>
      </section>

      {/* Company */}
      <section id="company" className="mx-auto max-w-6xl px-4 py-20 fade-in-section">
        <h2 className="font-serif text-3xl mb-4">{t('company_title')}</h2>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-serif text-xl mb-2">{t('company_name')}</p>
          <p className="leading-7">{t('company_desc')}</p>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" className="mx-auto max-w-6xl px-4 py-20 fade-in-section">
        <h2 className="font-serif text-3xl mb-2">{t('contact_title')}</h2>
        <p className="text-sm opacity-70 mb-8">{t('contact_subtitle')}</p>

        <form
          className="grid gap-4 md:grid-cols-2"
          onSubmit={(e) => {
            e.preventDefault();
            alert('Thanks! (仮実装)');
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
      </section>

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
