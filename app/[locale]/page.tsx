'use client';

import { useState, useEffect } from 'react';

import { useTranslations, useLocale } from 'next-intl';
import { routing } from '@/i18n/routing';
import { Link } from '@/i18n/navigation';
import BrandOriginSection from '@/components/BrandOriginSection';

export default function HomePage() {
  const locale = useLocale();

  const tHeader = useTranslations('Header');
  const tHero = useTranslations('Hero');
  const tUnveiling = useTranslations('Unveiling');
  const tSubjectO = useTranslations('SubjectO');
  const tVerification = useTranslations('Verification');
  const tManifesto = useTranslations('Manifesto');
  const tPartnership = useTranslations('Partnership');
  const tFooter = useTranslations('Footer');
  const tModalCommon = useTranslations('ModalCommon');
  const tModalDistillery = useTranslations('ModalDistillery');
  const tModalBuyer = useTranslations('ModalBuyer');
  const tLegal = useTranslations('legal');

  const [isDistilleryOpen, setIsDistilleryOpen] = useState(false);
  const [isBuyerOpen, setIsBuyerOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [legalModalType, setLegalModalType] = useState<string | null>(null);

  const closeModal = () => {
    setIsDistilleryOpen(false);
    setIsBuyerOpen(false);
    setLegalModalType(null);
    setFormErrors({});
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        closeModal();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>, formType: string) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    const newErrors: Record<string, string> = {};
    let hasError = false;

    // Validate text/email/tel inputs marked as required
    const requiredInputs = form.querySelectorAll('input[data-required="true"], textarea[data-required="true"]');
    requiredInputs.forEach((input) => {
      const el = input as HTMLInputElement;
      if (!el.value.trim()) {
        newErrors[el.name] = tModalCommon('err_required');
        hasError = true;
      }
    });

    // Validate checkboxes/radios based on formType
    if (formType === 'Distillery') {
      const purposes = formData.getAll('purpose');
      if (purposes.length === 0) {
        newErrors['purpose'] = tModalCommon('err_select');
        hasError = true;
      }
    } else if (formType === 'Buyer') {
      const requests = formData.getAll('request');
      if (requests.length === 0) {
        newErrors['request'] = tModalCommon('err_select');
        hasError = true;
      }
      const businessType = formData.get('business_type');
      if (!businessType) {
        newErrors['business_type'] = tModalCommon('err_select');
        hasError = true;
      }
    }

    if (hasError) {
      setFormErrors(newErrors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);
    
    const objectData: Record<string, any> = {};
    formData.forEach((value, key) => {
      if (objectData[key]) {
        if (!Array.isArray(objectData[key])) {
          objectData[key] = [objectData[key]];
        }
        objectData[key].push(value);
      } else {
        objectData[key] = value;
      }
    });

    if (Array.isArray(objectData['purpose'])) objectData['purpose'] = objectData['purpose'].join(', ');
    if (Array.isArray(objectData['request'])) objectData['request'] = objectData['request'].join(', ');

    objectData['access_key'] = '006a7e7b-b0c7-4027-a90a-ab4c7f350d7c';
    objectData['subject'] = '[Oryza & Co.] 웹사이트 신규 문의 접수';
    objectData['from_name'] = 'Oryza & Co. Website';
    
    const jsonPayload = JSON.stringify(objectData);
    
    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: jsonPayload,
      });
      const data = await response.json();
      
      if (response.ok && data.success) {
        alert(tModalCommon('success'));
        form.reset();
        closeModal();
      } else {
        console.error('Web3Forms Error:', data.message);
        alert(tModalCommon('error'));
      }
    } catch (error) {
      console.error('Web3Forms Submission Error:', error);
      alert(tModalCommon('error'));
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-primary-dark text-primary-light font-serif selection:bg-accent-taupe selection:text-primary-dark">
      {/* ── Header Component ── */}
      <header className="fixed top-0 w-full px-8 py-8 flex justify-between items-center z-50 mix-blend-difference">
        <div className="flex items-center gap-2.5">
          <img 
            src="/images/SealOryza-White@3x.png" 
            alt="Oryza & Co. Symbol" 
            className="h-5 md:h-6 object-contain"
          />
          <div className="text-2xl tracking-widest">{tHeader('logo')}</div>
        </div>
        <nav className="flex gap-8 data-font text-[11px] tracking-[0.2em] uppercase text-accent-taupe">
          {routing.locales.map((l: string) => (
            <Link
              key={l}
              href="/"
              locale={l}
              className={`transition-colors duration-300 ${
                l === locale ? 'text-primary-light font-semibold' : 'hover:text-primary-light'
              }`}
            >
              {l}
            </Link>
          ))}
        </nav>
      </header>

      {/* ── Hero Section Component ── */}
      <section className="relative w-full h-screen flex flex-col justify-center items-center px-6 text-center border-b border-neutral-800/50">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0 overflow-hidden bg-primary-dark">
          <img
            src="/images/hero-grain-object.jpeg"
            alt="Hero Background"
            className="w-full h-full object-cover"
          />
          {/* Obansaek Black (#1A1A18) Overlay (75% opacity for silhouette effect) */}
          <div className="absolute inset-0 bg-primary-dark/75" />
          {/* Radial Gradient for extra text focus in the center */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(26,26,24,0.7)_100%)]" />
          {/* Top/Bottom Gradient */}
          <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/80 via-transparent to-primary-dark" />
        </div>

        {/* Content */}
        <div className="relative z-10 flex flex-col items-center justify-center space-y-6 max-w-3xl mx-auto drop-shadow-2xl px-4">
          <span className="text-xs font-mono text-[#A99C88] tracking-[0.25em] uppercase mb-2">
            {tHero('category')}
          </span>
          <h1 
            className="text-2xl md:text-4xl leading-[1.35] tracking-tight font-serif text-[#F4EFE4] text-center"
            dangerouslySetInnerHTML={{ __html: tHero('title') }}
          />
          <p 
            className="text-xs md:text-sm text-[#F4EFE4]/75 font-light tracking-wide max-w-2xl text-center leading-relaxed mt-1 break-keep"
            dangerouslySetInnerHTML={{ __html: tHero('subtitle') }}
          />
        </div>
      </section>

      {/* ── Section 02: Brand Origin & Mission ── */}
      <BrandOriginSection />

      {/* ── Section 2: Official Unveiling & Ecosystem Vision ── */}
      <section className="w-full bg-neutral-950 border-b border-neutral-800/50 py-40 flex flex-col items-center">
        <div className="w-full max-w-6xl px-6 md:px-12 lg:px-24">
          {/* Top Labels */}
          <div className="data-font text-[11px] tracking-[0.2em] text-accent-taupe mb-20 uppercase font-semibold">
            <span>{tUnveiling('coord')}</span>
          </div>

          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-normal max-w-4xl leading-snug break-keep text-balance">
            {tUnveiling('title')}
          </h2>

          {/* Manifesto Video */}
          <div className="w-full max-w-4xl mx-auto my-16">
            <video
              src="/videos/section2-manifesto.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full aspect-video object-cover rounded-sm border border-accent-taupe/20 opacity-90"
            />
            <p className="mt-4 text-right data-font text-[10px] tracking-[0.2em] text-accent-taupe uppercase font-medium">
              {tUnveiling('videoCaption')}
            </p>
          </div>

          {/* 3 Missions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
            {['01', '02', '03'].map((key) => (
              <div key={key} className="space-y-6 pt-8 border-t border-accent-taupe/30">
                <h3 className="text-lg md:text-xl font-normal tracking-wide text-primary-light">
                  {tUnveiling(`missions.${key}.title`)}
                </h3>
                <p className={`text-sm md:text-base font-light leading-relaxed tracking-normal text-[#F4EFE4]/80 ${locale === 'ko' ? 'break-keep' : 'break-normal text-pretty'}`}>
                  {tUnveiling(`missions.${key}.desc`)}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* ── Section 03: Technical Verification ── */}
      <section className="w-full bg-black border-b border-neutral-800/50 py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="flex flex-col">
          <span className="data-font text-xs tracking-[0.2em] text-accent-taupe uppercase mb-4">
            {tVerification('label')}
          </span>
          <h2 className="text-3xl md:text-4xl font-serif text-primary-light my-3 break-keep">
            {tVerification('title')}
          </h2>
          <p className="text-sm md:text-base text-[#F4EFE4]/70 font-light tracking-wide max-w-2xl leading-relaxed mb-12 break-keep text-balance">
            {tVerification('subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {['01', '02', '03'].map((key) => (
            <div key={key} className="space-y-4 border border-accent-taupe/20 p-8 bg-[#222220]/30">
              <span className="font-mono text-xs text-accent-taupe">{key}</span>
              <h3 className="text-lg md:text-xl font-normal tracking-wide text-primary-light">
                {tVerification(`cards.${key}.title`)}
              </h3>
              <p className={`text-sm md:text-base font-light leading-relaxed tracking-normal text-[#F4EFE4]/80 ${locale === 'ko' ? 'break-keep' : 'break-normal text-pretty'}`}>
                {tVerification(`cards.${key}.desc`)}
              </p>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ── Section 04: Inaugural Object Teaser ── */}
      <section className="w-full bg-neutral-950 border-b border-neutral-800/50 py-40">
        <div className="max-w-7xl mx-auto px-6 md:px-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Visual Component */}
          <div className="w-full aspect-[3/4] bg-[#222220] border border-accent-taupe/20 relative overflow-hidden">
            <img 
              src="/images/subject-o-teaser.jpg" 
              alt="Subject O Teaser" 
              className="w-full h-full object-cover rounded-none border border-accent-taupe/20 absolute inset-0"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
          </div>

          {/* Right Technical Archive */}
          <div className="w-full flex flex-col justify-center">
            <span className="data-font text-xs tracking-[0.2em] text-accent-taupe uppercase">
              {tSubjectO('label1')}
            </span>
            <h2 className="text-3xl md:text-4xl font-serif text-primary-light my-3 break-keep">
              {tSubjectO('title')}
            </h2>
            <span className="data-font text-sm tracking-widest text-accent-taupe uppercase mb-8">
              {tSubjectO('label2')}
            </span>

            {/* Specs Table */}
            <div className="flex flex-col w-full border-t border-accent-taupe/20">
              {[
                { k: tSubjectO('specs.code_k'), v: tSubjectO('specs.code_v') },
                { k: tSubjectO('specs.lineage_k'), v: tSubjectO('specs.lineage_v') },
                { k: tSubjectO('specs.type_k'), v: tSubjectO('specs.type_v') },
                { k: tSubjectO('specs.base_k'), v: tSubjectO('specs.base_v') },
                { k: tSubjectO('specs.maturation_k'), v: tSubjectO('specs.maturation_v') },
                { k: tSubjectO('specs.status_k'), v: tSubjectO('specs.status_v') },
                { k: tSubjectO('specs.unveiling_k'), v: tSubjectO('specs.unveiling_v'), highlight: true }
              ].map((spec, i) => (
                <div key={i} className="flex justify-between items-center border-b border-accent-taupe/20 py-3 font-mono uppercase">
                  <span className="text-accent-taupe text-xs tracking-wider pr-4 text-left flex-shrink-0">{spec.k}</span>
                  <span className={`text-right break-keep text-xs md:text-sm ${spec.highlight ? 'text-accent-red font-semibold' : 'text-primary-light'}`}>
                    {spec.v}
                  </span>
                </div>
              ))}
            </div>

            {/* Branding Message */}
            <p className={`mt-8 text-sm md:text-base text-[#F4EFE4]/80 font-serif leading-relaxed ${locale === 'ko' ? 'break-keep' : 'break-normal text-pretty'}`}>
              {tSubjectO('message')}
            </p>
          </div>
        </div>
        </div>
      </section>

      {/* ── Section 05: Brand Manifesto ── */}
      <section className="w-full bg-black border-b border-neutral-800/50 py-40 flex flex-col items-center">
        <div className="max-w-5xl mx-auto px-6 text-center flex flex-col items-center w-full">
          <span className="data-font text-xs tracking-[0.2em] text-accent-taupe uppercase mb-6">
          {tManifesto('label')}
        </span>
        <h2 className="text-3xl md:text-5xl font-serif text-primary-light mb-16 md:mb-20 leading-tight break-keep text-balance">
          {tManifesto('title')}
        </h2>
        <div className="flex flex-col items-center w-full space-y-8 md:space-y-10">
          {[1, 2, 3].map((i) => (
            <p 
              key={i} 
              className={`text-base md:text-lg lg:text-xl text-[#F4EFE4]/85 font-light tracking-wide text-center leading-relaxed w-full ${locale === 'ko' ? 'break-keep' : 'break-normal text-pretty'}`}
              dangerouslySetInnerHTML={{ __html: tManifesto(`desc${i}`) }}
            />
          ))}
        </div>
        </div>
      </section>

      {/* ── Section 06: Selective Partnership & Inquiries ── */}
      <section className="w-full bg-neutral-950 border-b border-neutral-800/50 py-40">
        <div className="max-w-5xl mx-auto px-6 md:px-12">
          <div className="flex flex-col items-center text-center">
          <span className="data-font text-xs tracking-[0.2em] text-accent-taupe uppercase">
            {tPartnership('label')}
          </span>
          <h2 className="text-2xl md:text-3xl font-serif text-primary-light mt-3 mb-4 tracking-tight break-keep">
            {tPartnership('title')}
          </h2>
          <p 
            className="text-sm text-[#F4EFE4]/75 font-light tracking-wide mb-12 max-w-2xl mx-auto text-center leading-relaxed break-keep"
            dangerouslySetInnerHTML={{ __html: tPartnership('subtitle') }}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {['01', '02'].map((key) => (
            <div key={key} className="bg-[#222220] p-8 md:p-10 border border-[#A99C88]/15 flex flex-col justify-between">
              <div>
                <span className="font-mono text-xs text-[#A99C88] tracking-widest block mb-4 uppercase">
                  {tPartnership(`cards.${key}.target`)}
                </span>
                <h3 className="text-lg md:text-xl font-normal tracking-wide text-primary-light mb-3 break-keep">
                  {tPartnership(`cards.${key}.title`)}
                </h3>
                <p className="text-xs md:text-sm text-[#F4EFE4]/70 font-light leading-relaxed break-keep mt-2 min-h-[72px] whitespace-pre-line">
                  {tPartnership(`cards.${key}.desc`)}
                </p>
              </div>
              <button 
                onClick={() => key === '01' ? setIsDistilleryOpen(true) : setIsBuyerOpen(true)}
                className="w-full py-3.5 text-center text-xs font-mono tracking-wider transition-all duration-300 mt-8 border border-[#A99C88]/30 text-[#F4EFE4] hover:bg-[#A99C88]/10 uppercase"
              >
                {tPartnership(`cards.${key}.btn`)}
              </button>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="bg-[#111110] border-t border-[#A99C88]/20 pt-20 pb-12 px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 mb-16">
            
            {/* Area A: Brand & Non-sales Notice */}
            <div className="col-span-12 md:col-span-5">
              <img 
                src="/images/logo.png" 
                alt={tFooter('brand')} 
                className="h-16 md:h-20 w-auto object-contain mb-6" 
              />
              <p className="text-[11px] text-[#F4EFE4]/50 leading-relaxed font-light break-keep space-y-2 max-w-md">
                {tFooter('notice')}
              </p>
            </div>

            {/* Area B: Corporate Info */}
            <div className="col-span-12 md:col-span-4">
              <h3 className="text-xs font-mono text-[#A99C88] tracking-widest mb-3 uppercase">
                {tFooter('corporate_title')}
              </h3>
              <div className={`text-[11px] text-[#F4EFE4]/60 space-y-1.5 font-light leading-relaxed ${locale === 'ko' ? 'break-keep' : ''}`}>
                <p>{tFooter('company_name')}</p>
                <p>{tFooter('ceo')}</p>
                <p>{tFooter('registration')}</p>
                <p>{tFooter('address')}</p>
                <p>{tFooter('phone_kr')}</p>
                <p>{tFooter('phone_fr')}</p>
                <p>{tFooter('email')}</p>
              </div>
            </div>

            {/* Area C: Network & Social */}
            <div className="col-span-12 md:col-span-3">
              <h3 className="text-xs font-mono text-[#A99C88] tracking-widest mb-3 uppercase">
                {tFooter('network_title')}
              </h3>
              <div className="flex gap-4 items-center mb-4">
                <a href="https://www.linkedin.com/company/oryza-co" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition text-[#F4EFE4]" aria-label="LinkedIn">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                </a>
                <a href="https://www.instagram.com/oryzaandco" target="_blank" rel="noopener noreferrer" className="hover:opacity-100 opacity-60 transition text-[#F4EFE4]" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
              </div>
              <a href="mailto:contact@oryzaandco.com" className="text-xs text-[#F4EFE4]/70 font-mono underline hover:text-[#F4EFE4] transition-colors">
                contact@oryzaandco.com
              </a>
            </div>
          </div>

          {/* Bottom Bar: Legal & Copyright */}
          <div className="border-t border-[#A99C88]/15 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center text-[11px] font-mono text-[#F4EFE4]/40 gap-4">
            <div>{tFooter('rights')}</div>
            <div className="flex gap-4 md:gap-6 flex-wrap justify-center">
              <button onClick={() => setLegalModalType('privacy')} className="hover:text-[#F4EFE4] transition-colors cursor-pointer text-left">{tFooter('privacy')}</button>
              <button onClick={() => setLegalModalType('terms')} className="hover:text-[#F4EFE4] transition-colors cursor-pointer text-left">{tFooter('terms')}</button>
              <button onClick={() => setLegalModalType('license')} className="hover:text-[#F4EFE4] transition-colors cursor-pointer text-left">{tFooter('data_usage')}</button>
              <button onClick={() => setLegalModalType('cookie')} className="hover:text-[#F4EFE4] transition-colors cursor-pointer text-left">{tFooter('cookie')}</button>
            </div>
          </div>
        </div>
      </footer>

      {/* ── Modal: FOR DISTILLERIES ── */}
      {isDistilleryOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="absolute inset-0" onClick={closeModal} />
          <div className="relative bg-[#1A1A18] border border-[#A99C88]/30 p-6 md:p-8 rounded-none max-w-xl w-full max-h-[90vh] overflow-y-auto z-10">
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-[#A99C88] hover:text-[#F4EFE4] transition-colors"
              aria-label={tModalCommon('close')}
            >
              ✕
            </button>
            <h3 className="font-serif text-xl md:text-2xl text-[#F4EFE4] tracking-wide break-keep">
              {tModalDistillery('title')}
            </h3>
            <p className="text-[#A99C88] text-[11px] mb-6 mt-1 font-mono">{tModalCommon('required_mark')}</p>
            
            <form onSubmit={(e) => handleFormSubmit(e, 'Distillery')} className="space-y-4" noValidate>
              <input type="hidden" name="form_type" value="Distillery Request" />
              
              <div>
                <input data-required="true" type="text" name="distillery_name" placeholder={tModalDistillery('distillery_name')} className={`bg-[#222220] border ${formErrors['distillery_name'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                {formErrors['distillery_name'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['distillery_name']}</p>}
              </div>
              <div>
                <input data-required="true" type="text" name="contact_name" placeholder={tModalDistillery('contact_name')} className={`bg-[#222220] border ${formErrors['contact_name'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                {formErrors['contact_name'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['contact_name']}</p>}
              </div>
              <div>
                <input type="text" name="title_position" placeholder={tModalDistillery('title_position')} className="bg-[#222220] border border-[#A99C88]/30 text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input data-required="true" type="tel" name="phone" placeholder={tModalDistillery('phone')} className={`bg-[#222220] border ${formErrors['phone'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                  {formErrors['phone'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['phone']}</p>}
                </div>
                <div>
                  <input data-required="true" type="email" name="email" placeholder={tModalDistillery('email')} className={`bg-[#222220] border ${formErrors['email'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                  {formErrors['email'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['email']}</p>}
                </div>
              </div>
              <div>
                <input type="text" name="category" placeholder={tModalDistillery('category')} className="bg-[#222220] border border-[#A99C88]/30 text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep" />
              </div>
              
              <div className="pt-2">
                <label className="flex items-start gap-3 cursor-pointer group">
                  <input type="checkbox" name="purpose" value="Chemical Analysis & Sensory Data Sheet" className="mt-1 accent-[#A99C88]" />
                  <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalDistillery('purpose_1')}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group mt-3">
                  <input type="checkbox" name="purpose" value="Inclusion in Oryza & Co. SUBJECT Brand Lineup" className="mt-1 accent-[#A99C88]" />
                  <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalDistillery('purpose_2')}</span>
                </label>
                <label className="flex items-start gap-3 cursor-pointer group mt-3">
                  <input type="checkbox" name="purpose" value="Other Inquiries" className="mt-1 accent-[#A99C88]" />
                  <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalDistillery('purpose_3')}</span>
                </label>
                {formErrors['purpose'] && <p className="text-red-400 text-[10px] mt-2 ml-1">{formErrors['purpose']}</p>}
              </div>

              <div className="pt-2">
                <textarea name="additional_message" rows={3} placeholder={tModalDistillery('additional')} className="bg-[#222220] border border-[#A99C88]/30 text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full resize-none placeholder-[#A99C88]/50 break-keep" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 text-center text-sm font-mono tracking-wider transition-all duration-300 mt-6 border border-[#F4EFE4]/80 text-[#F4EFE4] hover:bg-[#F4EFE4] hover:text-[#111110] uppercase disabled:opacity-50 disabled:cursor-not-allowed break-keep"
              >
                {isSubmitting ? tModalCommon('submitting') : tModalDistillery('submit')}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ── Modal: FOR BUYERS & SOMMELIERS ── */}
      {isBuyerOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
          <div className="absolute inset-0" onClick={closeModal} />
          <div className="relative bg-[#1A1A18] border border-[#A99C88]/30 p-6 md:p-8 rounded-none max-w-xl w-full max-h-[90vh] overflow-y-auto z-10">
            <button 
              onClick={closeModal}
              className="absolute top-6 right-6 text-[#A99C88] hover:text-[#F4EFE4] transition-colors"
              aria-label={tModalCommon('close')}
            >
              ✕
            </button>
            <h3 className="font-serif text-xl md:text-2xl text-[#F4EFE4] tracking-wide break-keep">
              {tModalBuyer('title')}
            </h3>
            <p className="text-[#A99C88] text-[11px] mb-6 mt-1 font-mono">{tModalCommon('required_mark')}</p>

            <form onSubmit={(e) => handleFormSubmit(e, 'Buyer')} className="space-y-4" noValidate>
              <input type="hidden" name="form_type" value="Buyer & Sommelier Inquiry" />
              
              <div>
                <input data-required="true" type="text" name="company_name" placeholder={tModalBuyer('company_name')} className={`bg-[#222220] border ${formErrors['company_name'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                {formErrors['company_name'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['company_name']}</p>}
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input data-required="true" type="text" name="contact_name" placeholder={tModalBuyer('contact_name')} className={`bg-[#222220] border ${formErrors['contact_name'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                  {formErrors['contact_name'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['contact_name']}</p>}
                </div>
                <div>
                  <input data-required="true" type="text" name="contact_title" placeholder={tModalBuyer('contact_title')} className={`bg-[#222220] border ${formErrors['contact_title'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                  {formErrors['contact_title'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['contact_title']}</p>}
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <input data-required="true" type="tel" name="phone" placeholder={tModalBuyer('phone')} className={`bg-[#222220] border ${formErrors['phone'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                  {formErrors['phone'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['phone']}</p>}
                </div>
                <div>
                  <input data-required="true" type="email" name="email" placeholder={tModalBuyer('email')} className={`bg-[#222220] border ${formErrors['email'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                  {formErrors['email'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['email']}</p>}
                </div>
              </div>
              <div>
                <input data-required="true" type="text" name="location" placeholder={tModalBuyer('location')} className={`bg-[#222220] border ${formErrors['location'] ? 'border-red-500/50' : 'border-[#A99C88]/30'} text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full placeholder-[#A99C88]/50 break-keep`} />
                {formErrors['location'] && <p className="text-red-400 text-[10px] mt-1.5 ml-1">{formErrors['location']}</p>}
              </div>
              
              <div className="pt-2">
                <p className="text-xs text-[#A99C88] mb-2 font-mono uppercase tracking-widest break-keep">Business Type *</p>
                <div className="flex flex-col gap-3">
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="business_type" value="F&B Channel" className="accent-[#A99C88]" />
                    <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalBuyer('type_1')}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="business_type" value="Importer / Distributor" className="accent-[#A99C88]" />
                    <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalBuyer('type_2')}</span>
                  </label>
                  <label className="flex items-center gap-3 cursor-pointer group">
                    <input type="radio" name="business_type" value="Press & Critic" className="accent-[#A99C88]" />
                    <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalBuyer('type_3')}</span>
                  </label>
                </div>
                {formErrors['business_type'] && <p className="text-red-400 text-[10px] mt-2 ml-1">{formErrors['business_type']}</p>}
              </div>

              <div className="pt-4 border-t border-[#A99C88]/15 mt-4">
                <p className="text-xs text-[#A99C88] mb-2 font-mono uppercase tracking-widest break-keep">Requests *</p>
                <div className="flex flex-col gap-3">
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="request" value="Receive Data Sheets" className="mt-1 accent-[#A99C88]" />
                    <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalBuyer('request_1')}</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="request" value="Allocation Consultation" className="mt-1 accent-[#A99C88]" />
                    <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalBuyer('request_2')}</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="request" value="Sample Kit Request" className="mt-1 accent-[#A99C88]" />
                    <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalBuyer('request_3')}</span>
                  </label>
                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input type="checkbox" name="request" value="Other Inquiries" className="mt-1 accent-[#A99C88]" />
                    <span className="text-sm text-[#F4EFE4]/80 group-hover:text-[#F4EFE4] break-keep">{tModalBuyer('request_4')}</span>
                  </label>
                </div>
                {formErrors['request'] && <p className="text-red-400 text-[10px] mt-2 ml-1">{formErrors['request']}</p>}
              </div>

              <div className="pt-2 border-t border-[#A99C88]/15 mt-4">
                <textarea name="additional_message" rows={3} placeholder={tModalBuyer('additional')} className="bg-[#222220] border border-[#A99C88]/30 text-[#F4EFE4] focus:outline-none focus:border-[#F4EFE4] p-3 text-sm w-full resize-none placeholder-[#A99C88]/50 break-keep mt-2" />
              </div>

              <button 
                type="submit" 
                disabled={isSubmitting}
                className="w-full py-4 text-center text-sm font-mono tracking-wider transition-all duration-300 mt-6 border border-[#F4EFE4]/80 text-[#F4EFE4] hover:bg-[#F4EFE4] hover:text-[#111110] uppercase disabled:opacity-50 disabled:cursor-not-allowed break-keep"
              >
                {isSubmitting ? tModalCommon('submitting') : tModalBuyer('submit')}
              </button>
            </form>
          </div>
        </div>
      )}
      {/* ── Modal: Legal Terms ── */}
      {legalModalType && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={closeModal}
        >
          <div 
            className="bg-[#121212] border border-[#A99C88]/30 p-6 md:p-8 w-full max-w-2xl max-h-[90vh] overflow-y-auto relative flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button 
              onClick={closeModal}
              className="absolute top-4 right-4 md:top-6 md:right-6 text-[#A99C88]/60 hover:text-[#F4EFE4] transition-colors p-2"
              aria-label="Close modal"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
            </button>

            {/* Modal Header */}
            <div className="mb-8">
              <h2 className="text-xl md:text-2xl font-light text-[#F4EFE4] tracking-wide mb-2 break-keep">
                {tLegal(`${legalModalType}.title`)}
              </h2>
            </div>
            
            {/* Modal Content */}
            <div className="text-sm text-[#F4EFE4]/80 leading-relaxed font-light whitespace-pre-line break-keep">
              {tLegal(`${legalModalType}.content`)}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
