import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import {
  Camera, Instagram, Facebook, Youtube, MessageCircle, Phone, Plus, Trash2,
  Eye, EyeOff, Save, Palette, QrCode, LayoutDashboard, Link as LinkIcon,
  Image as ImageIcon, ExternalLink, Menu, X, MapPin, Clock, Printer,
  FileText, IdCard, Image, ChevronLeft, Globe, CheckCircle2
} from 'lucide-react';

type Profile = { id: string; title: string; platform: string; url: string; visible: boolean; color: string };
const initial: Profile[] = [
  { id:'p1', title:'WhatsApp پر رابطہ', platform:'WhatsApp', url:'https://wa.me/923449891174', visible:true, color:'#1fbd68' },
  { id:'p2', title:'Facebook Page', platform:'Facebook', url:'https://facebook.com/', visible:true, color:'#1877f2' },
  { id:'p3', title:'Instagram Profile', platform:'Instagram', url:'https://instagram.com/', visible:true, color:'#c13584' },
  { id:'p4', title:'TikTok', platform:'TikTok', url:'https://tiktok.com/', visible:true, color:'#222222' }
];
const services = [
  { title:'فوٹو سٹیٹ (Black & White)', price:'Rs 10', icon:FileText },
  { title:'کلر فوٹو سٹیٹ', price:'Rs 30', icon:Image },
  { title:'کمپیوٹر پرنٹ', price:'Rs 30', icon:Printer },
  { title:'کلر پرنٹ', price:'Rs 50', icon:Printer },
  { title:'پینا فلیکس / بینر ڈیزائن', price:'Rs 500+', icon:ImageIcon },
  { title:'شناختی کارڈ / CV بنوانا', price:'Rs 200', icon:IdCard },
  { title:'فوٹو / پاسپورٹ سائز فوٹو', price:'Rs 150', icon:Camera }
];
const load = <T,>(key:string, fallback:T):T => {
  try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const icons: Record<string, any> = { WhatsApp: MessageCircle, Facebook, Instagram, YouTube: Youtube, Website: Globe, TikTok: Globe };

export default function App() {
  const [tab,setTab] = useState('home');
  const [profiles,setProfiles] = useState<Profile[]>(()=>load('hps-profiles',initial));
  const [name,setName] = useState(()=>load('hps-name','Hassan Photostat & Graphic Center'));
  const [tagline,setTagline] = useState(()=>load('hps-tagline','Photostat • Printing • Graphic Designing • Composing'));
  const [primary,setPrimary] = useState(()=>load('hps-phone','0352099899'));
  const [secondary,setSecondary] = useState(()=>load('hps-phone2','03448991174'));
  const [accent,setAccent] = useState(()=>load('hps-accent','#0b6b3a'));
  const [newTitle,setNewTitle] = useState('');
  const [newUrl,setNewUrl] = useState('');
  const [qr,setQr] = useState('');
  const [notice,setNotice] = useState('');
  const [mobileMenu,setMobileMenu] = useState(false);
  useEffect(()=>{ localStorage.setItem('hps-profiles',JSON.stringify(profiles)); },[profiles]);
  useEffect(()=>{ localStorage.setItem('hps-name',JSON.stringify(name)); },[name]);
  useEffect(()=>{ localStorage.setItem('hps-tagline',JSON.stringify(tagline)); },[tagline]);
  useEffect(()=>{ localStorage.setItem('hps-phone',JSON.stringify(primary)); },[primary]);
  useEffect(()=>{ localStorage.setItem('hps-phone2',JSON.stringify(secondary)); },[secondary]);
  useEffect(()=>{ localStorage.setItem('hps-accent',JSON.stringify(accent)); },[accent]);
  const visible = useMemo(()=>profiles.filter(p=>p.visible),[profiles]);
  const add = () => {
    if(!newTitle.trim() || !/^https?:\/\//i.test(newUrl.trim())) { setNotice('عنوان اور http/https والا درست لنک درج کریں۔'); return; }
    setProfiles(p=>[...p,{id:crypto.randomUUID(),title:newTitle.trim(),platform:'Website',url:newUrl.trim(),visible:true,color:accent}]);
    setNewTitle(''); setNewUrl(''); setNotice('نیا لنک شامل ہوگیا۔');
  };
  const generateQR = async () => {
    const url=window.location.origin || 'https://your-domain.example';
    setQr(await QRCode.toDataURL(url,{width:280,margin:2,errorCorrectionLevel:'H',color:{dark:'#111827',light:'#ffffff'}}));
  };
  const saveAll = () => setNotice('آپ کی تبدیلیاں اس براؤزر میں محفوظ ہوگئی ہیں۔ GitHub پر اپ ڈیٹ کرنے کے لیے نئی فائلیں پش کریں۔');
  const nav = [
    ['home','عوامی ویب سائٹ',LayoutDashboard],['profiles','سوشل لنکس',LinkIcon],['design','ڈیزائن سیٹنگز',Palette],['qr','QR کوڈ',QrCode],['media','میڈیا لائبریری',ImageIcon]
  ] as const;
  const phoneDigits = primary.replace(/\D/g,'');
  const whatsappDigits = secondary.replace(/\D/g,'');
  return <div className="app" style={{'--accent':accent} as React.CSSProperties}>
    <header className="topbar">
      <div className="brand"><span className="brand-mark"><Camera size={21}/></span><div><b>Hassan Photostat & Graphic Center</b><small>Business Website Manager</small></div></div>
      <button className="mobile-toggle" aria-label="مینو" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button>
      <div className="top-actions"><span className="status"><i/> لوکل ایڈمن</span><button className="publish" onClick={saveAll}><Save size={16}/> محفوظ کریں</button></div>
    </header>
    <div className="shell">
      <aside className={`sidebar ${mobileMenu?'open':''}`}>
        <div className="side-label">مین مینو</div>
        {nav.map(([id,label,Icon])=><button key={id} className={`nav-item ${tab===id?'active':''}`} onClick={()=>{setTab(id);setMobileMenu(false);setNotice('')}}><Icon size={18}/>{label}</button>)}
        <div className="side-bottom"><div className="avatar">H</div><div><b>ایڈمن پینل</b><small>ویب سائٹ مینجمنٹ</small></div></div>
      </aside>
      <main className="main">
        {tab==='home' && <>
          <div className="page-heading"><div><p className="eyebrow">ویب سائٹ / مکمل پیش نظارہ</p><h1>آپ کی کاروباری ویب سائٹ</h1><p className="muted">تمام سروسز، قیمتیں، رابطے اور سوشل لنکس ایک ہی صفحے پر</p></div><button className="outline" onClick={()=>setTab('profiles')}><Plus size={16}/> لنک شامل کریں</button></div>
          <div className="stats"><div className="stat"><span>کل سوشل لنکس</span><b>{profiles.length}</b><small>تمام شامل کیے گئے لنکس</small></div><div className="stat"><span>عوامی طور پر نظر آنے والے</span><b>{visible.length}</b><small>ویب سائٹ پر دکھائے جا رہے ہیں</small></div><div className="stat"><span>کاروباری سروسز</span><b>{services.length}</b><small>قیمتوں سمیت درج</small></div></div>
          <div className="public-site">
            <section className="site-hero">
              <div className="hero-icon"><Camera size={34}/></div>
              <span className="hero-kicker">WELCOME TO</span>
              <h2>{name}</h2>
              <p>{tagline}</p>
              <div className="hero-location"><MapPin size={16}/> Dera Ismail Khan, Khyber Pakhtunkhwa</div>
              <div className="hero-actions"><a className="hero-whatsapp" href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp پر آرڈر کریں</a><a className="hero-call" href={`tel:${phoneDigits}`}><Phone size={17}/> ابھی کال کریں</a></div>
            </section>
            <section className="site-section">
              <div className="section-heading"><div><span>WHAT WE OFFER</span><h3>ہماری سروسز</h3></div><span className="section-mark"><Printer size={22}/></span></div>
              <div className="service-grid">{services.map((s,i)=>{const Icon=s.icon;return <article className="service-card" key={s.title}><div className="service-icon"><Icon size={21}/></div><div className="service-copy"><b>{s.title}</b><small>معیاری اور بہترین کام</small></div><strong>{s.price}</strong></article>})}</div>
            </section>
            <section className="site-section links-section">
              <div className="section-heading"><div><span>CONNECT WITH US</span><h3>ہمارے تمام لنکس</h3></div><span className="section-mark"><LinkIcon size={22}/></span></div>
              {visible.length ? <div className="social-grid">{visible.map(p=>{const Icon=icons[p.platform]||ExternalLink;return <a key={p.id} href={p.url} target="_blank" rel="noreferrer" className="social-link" style={{'--link-color':p.color} as React.CSSProperties}><span className="social-icon"><Icon size={20}/></span><span className="social-title">{p.title}</span><ChevronLeft size={17}/></a>})}</div> : <p className="empty-links">فی الحال کوئی فعال لنک موجود نہیں۔ ایڈمن پینل سے لنک شامل کریں۔</p>}
            </section>
            <section className="site-section contact-section">
              <div className="section-heading"><div><span>GET IN TOUCH</span><h3>ہم سے رابطہ کریں</h3></div><span className="section-mark"><MessageCircle size={22}/></span></div>
              <div className="contact-grid"><div className="contact-item"><span><Clock size={20}/></span><div><b>دکان کے اوقات</b><p>صبح 8 بجے سے رات 10 بجے تک</p></div></div><div className="contact-item"><span><MapPin size={20}/></span><div><b>ایڈریس</b><p>Dera Ismail Khan, Khyber Pakhtunkhwa, Pakistan</p></div></div><div className="contact-item"><span><Phone size={20}/></span><div><b>فون نمبر</b><p dir="ltr">{primary}</p></div></div><div className="contact-item"><span><MessageCircle size={20}/></span><div><b>WhatsApp</b><p dir="ltr">{secondary}</p></div></div></div>
              <div className="contact-buttons"><a href={`https://wa.me/${whatsappDigits}`} target="_blank" rel="noreferrer"><MessageCircle size={18}/> WhatsApp پر میسج کریں</a><a href={`tel:${phoneDigits}`}><Phone size={18}/> کال کریں</a></div>
            </section>
            <footer className="site-footer"><div className="footer-brand"><Camera size={19}/><b>{name}</b></div><p>Photostat • Printing • Graphic Designing • Composing</p><small>© 2026 Hassan Photostat and Graphic Center. All rights reserved.</small></footer>
          </div>
        </>}
        {tab==='profiles' && <><div className="page-heading"><div><p className="eyebrow">کنٹینٹ مینجمنٹ</p><h1>سوشل اور ویب لنکس</h1><p className="muted">یہاں شامل کیے گئے تمام فعال لنکس عوامی ویب سائٹ پر ایک ساتھ نظر آئیں گے۔</p></div></div><div className="panel"><h3><Plus size={18}/> نیا لنک شامل کریں</h3><div className="form-grid"><label>لنک کا عنوان<input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="مثلاً Facebook Page"/></label><label>مکمل URL<input value={newUrl} onChange={e=>setNewUrl(e.target.value)} placeholder="https://..." dir="ltr"/></label></div><button className="publish" onClick={add}><Plus size={16}/> لنک شامل کریں</button>{notice&&<p className="notice">{notice}</p>}</div><div className="panel"><h3>موجودہ لنکس <span className="count">{profiles.length}</span></h3>{profiles.map(p=>{const Icon=icons[p.platform]||ExternalLink;return <div className="profile-row" key={p.id}><span className="link-dot" style={{background:p.color}}><Icon size={16}/></span><div className="profile-info"><b>{p.title}</b><small>{p.url}</small></div><button className="icon-btn" title="نظر آنے/چھپانے کے لیے" onClick={()=>setProfiles(prev=>prev.map(x=>x.id===p.id?{...x,visible:!x.visible}:x))}>{p.visible?<Eye size={17}/>:<EyeOff size={17}/>}</button><button className="icon-btn danger" title="حذف کریں" onClick={()=>setProfiles(prev=>prev.filter(x=>x.id!==p.id))}><Trash2 size={17}/></button></div>})}</div></>}
        {tab==='design' && <><div className="page-heading"><div><p className="eyebrow">ویب سائٹ کی شکل</p><h1>ڈیزائن اور کاروباری معلومات</h1><p className="muted">یہ تبدیلیاں عوامی ویب سائٹ کے ہیڈر اور رابطے میں نظر آئیں گی۔</p></div></div><div className="panel"><h3><Palette size={18}/> بنیادی معلومات</h3><div className="form-grid"><label>کاروبار کا نام<input value={name} onChange={e=>setName(e.target.value)}/></label><label>مختصر تعارف<input value={tagline} onChange={e=>setTagline(e.target.value)}/></label><label>بنیادی فون<input value={primary} onChange={e=>setPrimary(e.target.value)} dir="ltr"/></label><label>WhatsApp نمبر<input value={secondary} onChange={e=>setSecondary(e.target.value)} dir="ltr"/></label><label>تھیم کا رنگ<input type="color" value={accent} onChange={e=>setAccent(e.target.value)}/></label></div><button className="publish" onClick={saveAll}><Save size={16}/> محفوظ کریں</button>{notice&&<p className="notice">{notice}</p>}</div><div className="panel info-panel"><CheckCircle2 size={19}/><p>تبدیلیاں اسی ڈیوائس کے براؤزر میں محفوظ ہوتی ہیں۔ GitHub Pages پر مستقل اپ ڈیٹ کے لیے تبدیل شدہ پروجیکٹ دوبارہ اپ لوڈ کرنا ہوگا۔</p></div></>}
        {tab==='qr' && <><div className="page-heading"><div><p className="eyebrow">شیئرنگ</p><h1>QR کوڈ مینیجر</h1><p className="muted">اپنی ویب سائٹ کا QR کوڈ بنائیں اور محفوظ کریں۔</p></div></div><div className="panel qr-panel"><div><h3><QrCode size={18}/> ویب سائٹ QR کوڈ</h3><p className="muted">QR کوڈ اسی وقت کھولی گئی ویب سائٹ کے ایڈریس کے لیے بنے گا۔ اسے پبلش کرنے کے بعد دوبارہ بنائیں۔</p><button className="publish" onClick={generateQR}>QR کوڈ بنائیں</button>{qr&&<a className="download" href={qr} download="hassan-photostat-and-graphic-center-qr.png">PNG ڈاؤن لوڈ کریں</a>}</div>{qr?<img className="qr-image" src={qr} alt="Website QR code"/>:<div className="qr-placeholder"><QrCode size={60}/><span>QR پیش نظارہ</span></div>}</div></>}
        {tab==='media' && <><div className="page-heading"><div><p className="eyebrow">تصاویر</p><h1>میڈیا لائبریری</h1><p className="muted">اس ورژن میں ویب سائٹ کے لیے تصاویر کا سیکشن تیار رکھا گیا ہے۔</p></div></div><div className="panel media-placeholder"><ImageIcon size={42}/><h3>میڈیا لائبریری</h3><p>تصاویر کو ویب سائٹ پر شامل کرنے کے لیے انہیں پروجیکٹ کے public فولڈر میں رکھیں۔</p></div></>}
        <footer className="main-footer">Hassan Photostat and Graphic Center <span>·</span> Website Manager</footer>
      </main>
    </div>
  </div>;
}
