import React, { useEffect, useMemo, useRef, useState } from 'react';

/* -----------------------------
   i18n 型定義
------------------------------ */
type Lang = 'ja' | 'en';
type Dict = Record<string, string>;

/* -----------------------------
   翻訳辞書
   - 必要に応じてキーを追加してください
   - キー名は英語/日本語とも同一であればOK
------------------------------ */
const translations = {
  en: {
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
      'Luxury private transport services for everything from airport transfers to sightseeing. We also arrange for private jets and helicopters.',
    service3_title: 'VIP Reservations',
    service3_desc:
      'We secure reservations for you at popular, hard-to-book restaurants, arrange for private chefs, and book golf courses.',

    // Accommodations
    accommodations_title: 'ACCOMMODATIONS',
    accommodations_subtitle: 'Curated Stays for Your Comfort',

    // About
    about_title: 'ABOUT',
    about_desc:
      'Our dedicated concierge team provides tailored experiences for discerning travelers seeking the finest that Hawaii has to offer.',

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
  },

  ja: {
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
      '空港送迎から観光まで、ラグジュアリーな専用車をご用意。プライベートジェットやヘリの手配も可能です。',
    service3_title: 'VIP予約手配',
    service3_desc:
      '人気店の予約確保、プライベートシェフの手配、ゴルフコースの確保など、特別な時間をお約束します。',

    // Accommodations
    accommodations_title: '宿泊',
    accommodations_subtitle: '厳選された滞在先',

    // About
    about_title: '私たちについて',
    about_desc:
      'ラグジュアリーなハワイ滞在を求める方に、専属コンシェルジュが最適な体験をオーダーメイドでご提案します。',

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
  },
} satisfies Record<Lang, Dict>;

/* ヘルパー：現在の言語から文言を取得 */
const useI18n = (lang: Lang) => {
  return useMemo(() => {
    const dict = translations[lang];
    const t = (key: string) => dict[key] ?? key;
    return { t, dict };
  }, [lang]);
};

/* -----------------------------
   メインコンポーネント
------------------------------ */
export default function App() {
  const [lang, setLang] = useState<Lang>('ja');
  const { t } = useI18n(lang);

  // フェードイン用
  const observerRef = useRef<IntersectionObserver | null>(null);
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>('.fade-in-section');
    observerRef.current?.disconnect();
    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add('is-visible');
        });
      },
      { threshold: 0.1 }
    );
    els.forEach((el) => observerRef.current?.observe(el));
    return () => observerRef.current?.disconnect();
  }, []);

  return (
    <div className="min-h-screen">
      {/* ------- Header ------- */}
      <header className="sticky top-0 z-40 bg-[#F8F5F0]/80 backdrop-blur">
        <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
          <div className="font-serif text-xl">Hawaii VIP</div>
          <nav className="hidden gap-6 md:flex text-sm">
            <a href="#service" className="hover:opacity-70">{t('nav_service')}</a>
            <a href="#accommodations" className="hover:opacity-70">{t('nav_accommodations')}</a>
            <a href="#about" className="hover:opacity-70">{t('nav_about')}</a>
            <a href="#company" className="hover:opacity-70">{t('nav_company')}</a>
            <a href="#contact" className="hover:opacity-70">{t('nav_contact')}</a>
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

      {/* ------- Hero ------- */}
      <section className="relative bg-[url('/hero.jpg')] bg-cover bg-center">
        <div className="mx-auto max-w-6xl px-4 py-28 md:py-40">
          <h1 className="hero-text-animation font-serif text-4xl md:text-6xl leading-tight">
            {t('hero_title_line1')}<br />{t('hero_title_line2')}
          </h1>
          <div className="scroll-down" aria-hidden="true" />
        </div>
      </section>

      {/* ------- Service ------- */}
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

      {/* ------- Accommodations ------- */}
      <section id="accommodations" className="mx-auto max-w-6xl px-4 py-20 fade-in-section">
        <h2 className="font-serif text-3xl mb-2">{t('accommodations_title')}</h2>
        <p className="text-sm opacity-70 mb-8">{t('accommodations_subtitle')}</p>

        <div className="grid md:grid-cols-3 gap-6">
          {/* ダミーカード（実データに置き換えてOK） */}
          {[1, 2, 3].map((n) => (
            <article key={n} className="rounded-2xl bg-white p-6 shadow-sm h-40 flex items-center justify-center opacity-70">
              Coming soon
            </article>
          ))}
        </div>
      </section>

      {/* ------- About ------- */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-20 fade-in-section">
        <h2 className="font-serif text-3xl mb-4">{t('about_title')}</h2>
        <p className="leading-7">{t('about_desc')}</p>
      </section>

      {/* ------- Company ------- */}
      <section id="company" className="mx-auto max-w-6xl px-4 py-20 fade-in-section">
        <h2 className="font-serif text-3xl mb-4">{t('company_title')}</h2>
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <p className="font-serif text-xl mb-2">{t('company_name')}</p>
          <p className="leading-7">{t('company_desc')}</p>
        </div>
      </section>

      {/* ------- Contact ------- */}
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

      {/* ------- Footer ------- */}
      <footer className="border-t">
        <div className="mx-auto max-w-6xl px-4 py-8 text-sm flex flex-col md:flex-row items-center justify-between gap-3">
          <div>{t('footer_copyright')}</div>
          <div className="opacity-70">{t('footer_rights')}</div>
        </div>
      </footer>
    </div>
  );
}
