import { useEffect, useMemo, useState } from 'react';
import QRCode from 'qrcode';
import { Camera, Instagram, Facebook, Youtube, MessageCircle, Phone, Plus, Trash2, Eye, EyeOff, Save, Palette, QrCode, LayoutDashboard, Link as LinkIcon, Image as ImageIcon, ExternalLink, Menu, X } from 'lucide-react';

type Profile = { id: string; title: string; platform: string; url: string; visible: boolean; color: string };
const initial: Profile[] = [
  { id:'p1', title:'واٹس ایپ پر رابطہ', platform:'WhatsApp', url:'https://wa.me/923449891174', visible:true, color:'#1fbd68' },
  { id:'p2', title:'Facebook Page', platform:'Facebook', url:'https://facebook.com/', visible:true, color:'#1877f2' },
  { id:'p3', title:'Instagram Profile', platform:'Instagram', url:'https://instagram.com/', visible:true, color:'#c13584' },
  { id:'p4', title:'TikTok', platform:'TikTok', url:'https://tiktok.com/', visible:true, color:'#222222' }
];
const load = <T,>(key:string, fallback:T):T => {
  try { const v=localStorage.getItem(key); return v ? JSON.parse(v) : fallback; } catch { return fallback; }
};
const icons: Record<string, any> = { WhatsApp: MessageCircle, Facebook, Instagram, YouTube: Youtube, Website: LinkIcon };
export default function App() {
  const [tab,setTab] = useState('home');
  const [profiles,setProfiles] = useState<Profile[]>(()=>load('hps-profiles',initial));
  const [name,setName] = useState(()=>load('hps-name','حسن فوٹو اسٹوڈیو گرافک سینٹر'));
  const [tagline,setTagline] = useState(()=>load('hps-tagline','فوٹوگرافی، گرافک ڈیزائننگ اور پرنٹنگ کی خدمات'));
  const [primary,setPrimary] = useState(()=>load('hps-phone','0352099899'));
  const [secondary,setSecondary] = useState(()=>load('hps-phone2','03448991174'));
  const [accent,setAccent] = useState(()=>load('hps-accent','#1fbd68'));
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
  const saveAll = () => { setNotice('ڈیمو تبدیلیاں اسی براؤزر میں محفوظ ہوگئیں۔ آن لائن پبلش کے لیے Supabase سیٹ اپ درکار ہے۔'); };
  const nav = [
    ['home','عوامی ویب سائٹ',LayoutDashboard],['profiles','سوشل لنکس',LinkIcon],['design','ڈیزائن سیٹنگز',Palette],['qr','QR کوڈ',QrCode],['media','میڈیا لائبریری',ImageIcon]
  ] as const;
  return <div className="app" style={{'--accent':accent} as React.CSSProperties}>
    <header className="topbar">
      <div className="brand"><span className="brand-mark"><Camera size={20}/></span><div><b>Hasan Photostat</b><small>Graphic Center · Website Builder</small></div></div>
      <button className="mobile-toggle" onClick={()=>setMobileMenu(!mobileMenu)}>{mobileMenu?<X/>:<Menu/>}</button>
      <div className="top-actions"><span className="status"><i/> ڈیمو موڈ</span><button className="publish" onClick={saveAll}><Save size={16}/> محفوظ کریں</button></div>
    </header>
    <div className="shell">
      <aside className={`sidebar ${mobileMenu?'open':''}`}>
        <div className="side-label">مین مینو</div>
        {nav.map(([id,label,Icon])=><button key={id} className={`nav-item ${tab===id?'active':''}`} onClick={()=>{setTab(id);setMobileMenu(false)}}><Icon size={18}/>{label}</button>)}
        <div className="side-bottom"><div className="avatar">H</div><div><b>ایڈمن ڈیمو</b><small>مقامی پیش نظارہ</small></div></div>
      </aside>
      <main className="main">
        {tab==='home' && <><div className="page-heading"><div><p className="eyebrow">ڈیش بورڈ / پیش نظارہ</p><h1>آپ کی ویب سائٹ</h1><p className="muted">عوامی صفحے کا پیش نظارہ اور بنیادی معلومات</p></div><button className="outline" onClick={()=>setTab('profiles')}><Plus size={16}/> لنک شامل کریں</button></div>
          <div className="stats"><div className="stat"><span>کل پروفائل لنکس</span><b>{profiles.length}</b><small>تمام محفوظ لنکس</small></div><div className="stat"><span>نظر آنے والے</span><b>{visible.length}</b><small>عوامی صفحے پر</small></div><div className="stat"><span>ویب سائٹ اسٹیٹس</span><b className="green-text">ڈرافٹ</b><small>آن لائن پبلش نہیں</small></div></div>
          <div className="preview-wrap"><div className="preview-head"><b><Eye size={17}/> لائیو پیش نظارہ</b><span>موبائل ویو</span></div><div className="phone-frame"><div className="public-card"><div className="cover"><div className="logo-circle"><Camera size={30}/></div></div><h2>{name}</h2><p>{tagline}</p><div className="contact-row"><a href={`https://wa.me/${secondary.replace(/\D/g,'')}`} target="_blank"><MessageCircle size={16}/> WhatsApp</a><a href={`tel:${primary}`}><Phone size={16}/> کال کریں</a></div><div className="public-links">{visible.map(p=>{const Icon=icons[p.platform]||ExternalLink;return <a key={p.id} href={p.url} target="_blank" rel="noreferrer" style={{background:p.color}}><Icon size={18}/><span>{p.title}</span><ExternalLink size={14}/></a>})}</div><div className="gallery-mini"><div/><div/><div/></div><small className="public-footer">© Hasan Photo Studio Graphic Center</small></div></div></div>
        </>}
        {tab==='profiles' && <><div className="page-heading"><div><p className="eyebrow">کنٹینٹ مینجمنٹ</p><h1>سوشل لنکس</h1><p className="muted">لنکس شامل کریں، چھپائیں یا حذف کریں۔</p></div></div><div className="panel"><h3><Plus size={18}/> نیا لنک شامل کریں</h3><div className="form-grid"><label>لنک کا عنوان<input value={newTitle} onChange={e=>setNewTitle(e.target.value)} placeholder="مثلاً Facebook Page"/></label><label>مکمل URL<input value={newUrl} onChange={e=>setNewUrl(e.target.value)} placeholder="https://..."/></label></div><button className="publish" onClick={add}><Plus size={16}/> لنک شامل کریں</button>{notice&&<p className="notice">{notice}</p>}</div><div className="panel"><h3>موجودہ لنکس <span className="count">{profiles.length}</span></h3>{profiles.map((p,i)=><div className="profile-row" key={p.id}><span className="drag">⠿</span><span className="link-dot" style={{background:p.color}}><LinkIcon size={16}/></span><div className="profile-info"><b>{p.title}</b><small>{p.url}</small></div><button className="icon-btn" title="نظر آنے/چھپانے کے لیے" onClick={()=>setProfiles(prev=>prev.map(x=>x.id===p.id?{...x,visible:!x.visible}:x))}>{p.visible?<Eye size={17}/>:<EyeOff size={17}/>}</button><button className="icon-btn danger" title="حذف کریں" onClick={()=>setProfiles(prev=>prev.filter(x=>x.id!==p.id))}><Trash2 size={17}/></button></div>)}</div></>}
        {tab==='design' && <><div className="page-heading"><div><p className="eyebrow">ویب سائٹ کی شکل</p><h1>ڈیزائن سیٹنگز</h1><p className="muted">رنگ اور کاروباری معلومات تبدیل کریں۔</p></div></div><div className="panel"><h3><Palette size={18}/> بنیادی معلومات</h3><div className="form-grid"><label>کاروبار کا نام<input value={name} onChange={e=>setName(e.target.value)}/></label><label>مختصر تعارف<input value={tagline} onChange={e=>setTagline(e.target.value)}/></label><label>بنیادی فون<input value={primary} onChange={e=>setPrimary(e.target.value)}/></label><label>دوسرا فون<input value={secondary} onChange={e=>setSecondary(e.target.value)}/></label><label>تھیم کا رنگ<input type="color" value={accent} onChange={e=>setAccent(e.target.value)}/></label></div><button className="publish" onClick={saveAll}><Save size={16}/> محفوظ کریں</button></div></>}
        {tab==='qr' && <><div className="page-heading"><div><p className="eyebrow">شیئرنگ</p><h1>QR کوڈ مینیجر</h1><p className="muted">یہ ڈیمو موجودہ ویب ایڈریس کے لیے QR بناتا ہے۔</p></div></div><div className="panel qr-panel"><div><h3><QrCode size={18}/> ویب سائٹ QR کوڈ</h3><p className="muted">اصل مستقل QR کے لیے اپنی ہوسٹ کی ہوئی ڈومین استعمال کریں۔</p><button className="publish" onClick={generateQR}>QR کوڈ بنائیں</button>{qr&&<a className="download" href={qr} download="hasan-photo-studio-qr.png">PNG ڈاؤن لوڈ کریں</a>}</div>{qr?<img className="qr-image" src={qr}/>:<div className="qr-placeholder"><QrCode size={60}/><span>QR پیش نظارہ</span></div>}</div></>}
        {tab==='media' && <><div className="page-heading"><div><p className="eyebrow">تصاویر</p><h1>میڈیا لائبریری</h1><p className="muted">اس ابتدائی ورژن میں میڈیا سیکشن کا خاکہ موجود ہے۔</p></div></div><div className="panel media-placeholder"><ImageIcon size={42}/><h3>تصاویر اپ لوڈ کرنے کے لیے</h3><p>آن لائن اسٹوریج فعال کرنے کے لیے Supabase Storage کنفیگر کریں۔</p></div></>}
        <footer className="main-footer">Hasan Photostat and Graphic Center <span>·</span> Website Builder Preview</footer>
      </main>
    </div>
  </div>;
}
