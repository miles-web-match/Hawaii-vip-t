import React, { useEffect, useMemo, useRef, useState } from 'react';

/* =========================
   型定義
========================= */
type Lang = 'ja' | 'en';

/* =========================
   翻訳辞書（英語を基準にキー型を作成）
========================= */
const en = {
  // Header
  nav_service: 'SERVICE',
  nav_accommodations: 'ACCOMMODATIONS',
  nav_about: 'ABOUT US',
  nav_company: 'COMPANY',
  nav_contact: 'CONTACT',

  // Brand
  brand: 'Hawaii VIP',

  // Hero
  hero_title_line1: 'The Ultimate Hawaii Experience,',
  hero_title_line2: 'Exclusively for You.',

  // About
  about_title: 'ABOUT US',
  // 代表挨拶（英語）
  greeting_title: 'Message from the Founder',
  greeting_name: 'Taro Hawaii',
  greeting_body_long: `I have lived in Hawaii for 30 years. I first came here alone for university, and during a student internship I entered the travel industry. After switching to a work visa and gaining experience, I started my own business 20 years ago. I have challenged many areas—including tour buses and transfers, optional tours, and vacation rentals—continuing through the pandemic with the support of locals and guests.

Personally, I’m involved with “Music Band,” the only activity in Hawaii that teaches music to children with disabilities. In recent years, I was also entrusted by a Japanese investor to operate a long-standing karaoke venue—another new challenge.

One of our signature tours is the Pearl Harbor Historical Tour. We pass on the stories of the efforts and sacrifices of Japanese Americans, and share why Hawaii remains a special place for Japanese people. Delivering experiences that stay in the heart—beyond mere sightseeing—is our pride.`,

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

  // Brand
  brand: 'Hawaii VIP',

  // Hero
  hero_title_line1: '究極のハワイ体験を、',
  hero_title_line2: 'あなただけに。',

  // About
  about_title: '私たちについて',
  greeting_title: '代表挨拶',
  greeting_name: 'ハワイ太郎',
  greeting_body_long: `私はハワイに暮らして30年になります。留学を目的に単身でハワイの大学へ入学し、学生時代の研修をきっかけに旅行業界に入りました。その後、就労ビザに切り替えて経験を積み、20年前に独立。ツアーバスや送迎車両、オプショナルツアー、民泊事業など、多方面に挑戦しながら今日まで歩んでまいりました。パンデミックという大きな試練もありましたが、地元の方々やお客様に支えられ、事業を続けることができました。

また、個人的にはハワイで唯一、障害をもつ子どもたちに音楽を教える「Music Band 」の活動にも携わっております。さらに近年は、日本の投資家から老舗カラオケ店の運営を託され、新たな挑戦も始めました。

私たちの代表的なツアーのひとつに「真珠湾ヒストリカルツアー」があります。日系人の努力や犠牲の歴史を大切に伝え、なぜハワイが日本人にとって特別な場所であり続けるのかを、お客様と分かち合うことを使命としています。観光だけで終わらない“心に残る体験”をお届けすることこそ、私たちの誇りです。`,

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

/* 翻訳ヘルパー（キー安全） */
function useI18n(lang: Lang) {
  return useMemo(() => {
    const dict = translations[lang];
    const t = (k: Keys) => dict[k];
    return { t, dict };
  }, [lang]);
}

/* =========================
   コンポーネント本体
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

      {/* ------- Hero（全面写真＋黒フィルター＋中央配置） ------- */}
      <section className="relative h-screen w-full overflow-hidden">
        <img
          src="/hero.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-black/60" />
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background:
              'linear-gradient(to bottom, rgba(0,0,0,0.0) 30%, rgba(0,0,0,0.35) 100%)',
          }}
        />
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

      {/* ------- About（私たちについて：左テキスト＋右写真 → 下に大写真） ------- */}
      <section id="about" className="mx-auto max-w-6xl px-4 py-24 fade-in-section">
        <h2 className="font-serif text-3xl md:text-4xl mb-10">{t('about_title')}</h2>

        {/* 上段：左テキスト／右イメージ */}
        <div className="grid md:grid-cols-[1.2fr_1fr] gap-10 items-start mb-14">
          {/* 左：代表挨拶 */}
          <div>
            <h3 className="font-serif text-2xl md:text-3xl mb-3">{t('greeting_title')}</h3>
            <p className="text-sm opacity-70 mb-4">{t('greeting_name')}</p>
            <div className="space-y-4 text-[15px] md:text-base leading-8">
              {t('greeting_body_long')
                .split(/\n{2,}/)
                .map((p, i) => <p key={i}>{p.trim()}</p>)}
            </div>
          </div>

          {/* 右：小さめ写真（ダミー画像。あとで /about-side.jpg に差し替え可） */}
          <figure className="rounded-2xl overflow-hidden border border-[#4F463F]/20 shadow-sm">
            <img
              src="https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1200&auto=format&fit=crop"
              alt=""
              className="w-full h-full object-cover"
              loading="lazy"
              decoding="async"
            />
          </figure>
        </div>

        {/* 下段：額縁付きの大きい写真（ダミー画像。あとで /about-wide.jpg に差し替え可） */}
        <figure className="border-2 border-[#4F463F]/30 p-2 rounded-xl">
          <img
            src="https://images.unsplash.com/photo-1501117716987-c8e3f1d6e8d6?q=80&w=1600&auto=format&fit=crop"
            alt=""
            className="w-full h-auto rounded-lg object-cover"
            loading="lazy"
            decoding="async"
          />
        </figure>
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
          {[1, 2, 3].map(n => (
            <article key={n} className="rounded-2xl bg-white p-6 shadow-sm h-40 flex items-center justify-center opacity-70">
              Coming soon
            </article>
          ))}
        </div>
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
