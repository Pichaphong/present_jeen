"use client";

import { useCallback, useEffect, useRef, useState } from "react";

const notes = [
  "เรียนคณะผู้บริหาร อาจารย์ และผู้ใหญ่ทุกท่าน สวัสดีค่ะ ดิฉัน แพทย์จีน กมลทิพย์ เผ่าอำนาจฤทธิ์ พจ.2515 หรือเรียกสั้น ๆ ว่า ‘หมอจีน’ ก็ได้ค่ะ วันนี้อยากนำเสนอว่า ในฐานะแพทย์แผนจีนคนแรก ดิฉันตั้งใจจะเข้ามาเติมเต็ม ทำงานร่วม และพัฒนาบริการนี้ไปกับโรงพยาบาลอย่างไรค่ะ",
  "ดิฉันจบการศึกษาด้านการแพทย์แผนจีนจากมหาวิทยาลัยหัวเฉียวเฉลิมพระเกียรติ หลักสูตรร่วมกับมหาวิทยาลัยแพทย์แผนจีนเซี่ยงไฮ้ และได้ฝึกปฏิบัติทั้งในประเทศไทยและประเทศจีน สิ่งสำคัญที่สุดที่ได้เรียนรู้คือการดูแลแบบผสมผสาน—ไม่ได้มองว่าศาสตร์ใดดีกว่า แต่ดูว่าผู้ป่วยแต่ละคนจะได้ประโยชน์จากวิธีใดมากที่สุดค่ะ",
  "หลังกลับประเทศไทย ดิฉันทำงานร่วมกับนักกายภาพบำบัด ศึกษา Manual Therapy ของ Barral Institute และกลับไปทบทวน Gross Anatomy กับร่างอาจารย์ใหญ่ เพื่อเพิ่มความแม่นยำและความปลอดภัย ประสบการณ์เหล่านี้ทำให้เห็นว่าแต่ละศาสตร์มีจุดแข็งต่างกัน และสามารถนำมาทำงานร่วมกันโดยเคารพขอบเขตวิชาชีพค่ะ",
  "ตัวอย่างในผู้ป่วย Stroke: แพทย์เวชศาสตร์ฟื้นฟูประเมินและวางเป้าหมาย กายภาพบำบัดฝึกการเคลื่อนไหวและการทำกิจวัตร ส่วนแพทย์แผนจีนเข้ามาเป็น Adjunctive Treatment ในผู้ป่วยที่เหมาะสม การฝังเข็มไม่ได้ทดแทนการฝึก แต่เป็นทางเลือกเสริม โดยทุกวิชาชีพมี Rehabilitation Goal เดียวกันค่ะ",
  "การเริ่มต้นยังไม่จำเป็นต้องขยายบริการไปทุกด้าน แต่ควร Start Focused จาก Pain & Rehabilitation วางระบบบริการให้ปลอดภัย สร้างแนวทางส่งต่อและดูแลร่วมกัน แล้วติดตามผลเพื่อนำข้อมูลกลับมาพัฒนา เมื่อพื้นฐานแข็งแรงจึงค่อยขยายตามความเหมาะสมค่ะ",
  "บริการที่ดีต้องถูกเข้าใจ ดิฉันมีประสบการณ์ทำ Content สุขภาพ โดยนำข้อมูลที่ซับซ้อนมาสื่อสารให้เข้าใจง่าย หากมีโอกาสอยากต่อยอดร่วมกับทีมโรงพยาบาล เพื่อสร้างความรู้ การรับรู้ และช่วยให้ผู้ป่วยที่เหมาะสมเข้าถึงการดูแลได้ง่ายขึ้นค่ะ",
  "ความตั้งใจไม่ได้หมายความว่าผู้ป่วยทุกคนต้องได้รับการฝังเข็ม แต่คือให้แพทย์แผนจีนเป็นอีกหนึ่งทางเลือกที่เหมาะสมในระบบของโรงพยาบาล ค่อย ๆ วางระบบ ทำงานร่วมกัน เก็บผลลัพธ์ และพัฒนาบริการ เพื่อประโยชน์สูงสุดของผู้ป่วย ขอบพระคุณค่ะ",
];

const slideLabels = ["Introduction", "About Me", "Continuous Learning", "Integrated Care", "Start Focused", "Education & Awareness", "Vision"];

function Showreel({ active }: { active: boolean }) {
  const clips = [28, 29, 30, 31, 32];
  const [clip, setClip] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [time, setTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [muted, setMuted] = useState(true);
  const video = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    if (!video.current) return;
    if (active && playing) video.current.play().catch(() => undefined);
    else video.current.pause();
  }, [active, clip, playing]);
  const chooseClip = (index: number) => { setClip(index); setTime(0); setPlaying(true); };
  const formatTime = (seconds: number) => `${Math.floor(seconds / 60)}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
  return <div className="showreel">
    <video ref={video} key={clip} src={`/media/${clips[clip]}.mp4`} muted={muted} playsInline preload="metadata" onLoadedMetadata={event => setDuration(event.currentTarget.duration || 0)} onTimeUpdate={event => setTime(event.currentTarget.currentTime)} onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)} onEnded={() => chooseClip((clip + 1) % clips.length)} />
    <div className="phone-shine" />
    <div className="reel-meta"><span>SHOWREEL</span><b>0{clip + 1}</b></div>
    <div className="reel-dots">{clips.map((n, i) => <button key={n} aria-label={`เล่นคลิป ${n}`} className={i === clip ? "active" : ""} onClick={() => chooseClip(i)} />)}</div>
    <div className="reel-controls">
      <div className="clip-picker">{clips.map((n, i) => <button key={n} className={i === clip ? "active" : ""} onClick={() => chooseClip(i)} aria-label={`เลือกวิดีโอ ${i + 1}`}>{i + 1}</button>)}</div>
      <div className="transport">
        <button className="play-toggle" onClick={() => setPlaying(value => !value)} aria-label={playing ? "หยุดวิดีโอ" : "เล่นวิดีโอ"}>{playing ? "Ⅱ" : "▶"}</button>
        <input type="range" min="0" max={duration || 0} step="0.05" value={Math.min(time, duration || 0)} onChange={event => { const next = Number(event.target.value); setTime(next); if (video.current) video.current.currentTime = next; }} aria-label="กรอวิดีโอ" />
        <time>{formatTime(time)} / {formatTime(duration)}</time>
      </div>
    </div>
    <button className="sound" onClick={() => setMuted(value => !value)} aria-label={muted ? "เปิดเสียงวิดีโอทั้งหมด" : "ปิดเสียงวิดีโอทั้งหมด"}>{muted ? "SOUND OFF" : "SOUND ON"}</button>
  </div>;
}

export default function Home() {
  const [active, setActive] = useState(0);
  const [showNotes, setShowNotes] = useState(false);
  const go = useCallback((index: number) => document.querySelector<HTMLElement>(`[data-slide='${Math.max(0, Math.min(6, index))}']`)?.scrollIntoView({ behavior: "smooth" }), []);

  useEffect(() => {
    const sections = [...document.querySelectorAll<HTMLElement>(".slide")];
    const observer = new IntersectionObserver(entries => entries.forEach(entry => entry.isIntersecting && setActive(Number((entry.target as HTMLElement).dataset.slide))), { threshold: .6 });
    sections.forEach(section => observer.observe(section));
    const onKey = (event: KeyboardEvent) => {
      if (["ArrowRight", "ArrowDown", "PageDown", " "].includes(event.key)) { event.preventDefault(); go(active + 1); }
      if (["ArrowLeft", "ArrowUp", "PageUp"].includes(event.key)) { event.preventDefault(); go(active - 1); }
      if (event.key.toLowerCase() === "n") setShowNotes(value => !value);
      if (event.key.toLowerCase() === "f") document.documentElement.requestFullscreen?.();
      if (event.key === "Escape") setShowNotes(false);
    };
    addEventListener("keydown", onKey);
    return () => { observer.disconnect(); removeEventListener("keydown", onKey); };
  }, [active, go]);

  return <main>
    <div className="progress" style={{ transform: `scaleX(${(active + 1) / 7})` }} />
    <header className="topbar"><span className="mark">中</span><span className="brand">KAMONTIP PAOAMNARTRIT<br/><b>INTEGRATED CARE VISION</b></span><span className="count">0{active + 1}<i>/ 07</i></span></header>
    <nav className="rail" aria-label="เลือกสไลด์">{slideLabels.map((label, i) => <button key={label} onClick={() => go(i)} className={active === i ? "active" : ""}><span>0{i + 1}</span><i>{label}</i></button>)}</nav>

    <section className="slide intro" data-slide="0">
      <div className="portrait"><img src="/media/01.jpg" alt="พจ. กมลทิพย์ เผ่าอำนาจฤทธิ์" /><div className="portrait-ring" /></div>
      <div className="intro-copy reveal">
        <p className="kicker">THE FIRST CHAPTER · 2026</p>
        <h1>Traditional Chinese Medicine<br/><em>× Integrated Care</em></h1>
        <div className="keywords"><b>เติมเต็ม</b><i>•</i><b>ทำงานร่วม</b><i>•</i><b>พัฒนา</b></div>
        <p className="translation">Complement · Collaborate · Develop</p>
        <div className="identity"><strong>พจ. กมลทิพย์ เผ่าอำนาจฤทธิ์ <span>| พจ.2515</span></strong><small>Traditional Chinese Medicine Doctor</small></div>
      </div>
      <div className="gold-orbit" />
    </section>

    <section className="slide about" data-slide="1">
      <div className="chapter"><span>02</span><b>ABOUT ME</b></div>
      <div className="about-copy reveal">
        <p className="kicker">EDUCATION → CLINICAL EXPERIENCE → INTEGRATED CARE</p>
        <h2>Different Approaches.<br/><em>One Patient.</em></h2>
        <div className="about-grid">
          <article><label>EDUCATION</label><strong>Traditional Chinese Medicine</strong><p>Huachiew Chalermprakiet University<br/>× Shanghai University of TCM</p></article>
          <article><label>CLINICAL EXPERIENCE</label><strong>Thailand 🇹🇭 × China 🇨🇳</strong><p>Acupuncture · TCM Procedures<br/>Chinese Herbal Medicine</p><small>Kunshan · Huachiew · Thian Fah · Phranangklao</small></article>
        </div>
      </div>
      <div className="china-collage" aria-label="ภาพประสบการณ์ฝึกปฏิบัติที่ประเทศจีน">
        {["02.webp", "03.jpg", "04.jpg", "05.jpg", "06.jpg", "21.jpg"].map((src, i) => <figure key={src} className={`c${i + 1}`}><img src={`/media/${src}`} alt="ประสบการณ์การศึกษาและฝึกคลินิก" /></figure>)}
      </div>
    </section>

    <section className="slide learning" data-slide="2">
      <div className="chapter"><span>03</span><b>CONTINUOUS LEARNING</b></div>
      <div className="learning-title reveal"><p className="kicker">TCM × MANUAL THERAPY × ANATOMY</p><h2>Different Expertise<br/><em>Complementary Strengths</em></h2></div>
      <div className="learning-cards">
        <article><span>01</span><b>Clinical Practice</b><p>Working alongside<br/>Physical Therapists</p></article>
        <article><span>02</span><b>Manual Therapy</b><p>Barral Institute<br/>Visceral · Neuromeningeal</p></article>
        <article><span>03</span><b>Anatomy & Safety</b><p>Gross Anatomy Experience<br/>Precision · Safety</p></article>
      </div>
      <div className="learning-film"><img src="/media/22.jpg" alt="การเรียน Manual Therapy"/><img src="/media/23.jpg" alt="ประกาศนียบัตร Barral Institute"/><img src="/media/24.jpg" alt="การเรียน Gross Anatomy"/></div>
    </section>

    <section className="slide integrated" data-slide="3">
      <div className="chapter light"><span>04</span><b>INTEGRATED CARE IN PRACTICE</b></div>
      <div className="integrated-head reveal"><p className="kicker">ONE PATIENT · ONE SHARED GOAL</p><h2>STROKE<br/><em>REHABILITATION</em></h2></div>
      <div className="care-map">
        <article><span>01</span><b>REHABILITATION<br/>MEDICINE</b><p>Assessment<br/>Goal Setting<br/>Rehabilitation Plan</p></article>
        <i>→</i><article><span>02</span><b>PHYSICAL<br/>THERAPY</b><p>Movement<br/>Balance & Gait<br/>Functional Training</p></article>
        <i>→</i><article><span>03</span><b>TRADITIONAL<br/>CHINESE MEDICINE</b><p>Acupuncture<br/>Electroacupuncture<br/>Neuromodulation</p></article>
      </div>
      <div className="shared-goal"><small>SHARED REHABILITATION GOAL</small><strong>Function ↑ <i>•</i> Independence ↑ <i>•</i> Quality of Life ↑</strong><span>Adjunctive · Collaborative · Patient-Centered</span></div>
    </section>

    <section className="slide focused" data-slide="4">
      <div className="chapter"><span>05</span><b>START FOCUSED</b></div>
      <div className="focused-copy reveal"><p className="kicker">BUILD THE FOUNDATION FIRST</p><h2>START<br/><em>FOCUSED.</em></h2><strong>PAIN & REHABILITATION</strong><p>Neck & Shoulder Pain · Low Back Pain · Knee Pain<br/>Myofascial Pain · Selected Rehabilitation Cases</p></div>
      <div className="process">
        <article><span>01</span><b>SET UP</b><p>Safe &<br/>Standardized Care</p></article><i>→</i>
        <article><span>02</span><b>INTEGRATE</b><p>Referral &<br/>Co-treatment</p></article><i>→</i>
        <article><span>03</span><b>MEASURE</b><p>Outcomes &<br/>Feedback</p></article><i>→</i>
        <article className="develop"><span>04</span><b>DEVELOP</b><p>Grow with<br/>Evidence</p></article>
      </div>
      <div className="focus-photos"><img src="/media/focus-electroacupuncture.jpg" alt="การฝังเข็มและกระตุ้นไฟฟ้าบริเวณคอและหลัง"/><img src="/media/16.jpg" alt="การฝังเข็มบริเวณไหล่"/><video src="/media/25.mp4" autoPlay muted loop playsInline preload="metadata" aria-label="วิดีโอประกอบการดูแลผู้ป่วย"/></div>
    </section>

    <section className="slide awareness" data-slide="5">
      <div className="chapter"><span>06</span><b>EDUCATION & AWARENESS</b></div>
      <div className="awareness-copy reveal"><p className="kicker">FROM CLINICAL SERVICE TO PATIENT ACCESS</p><h2>Make care<br/><em>understood.</em></h2>
        <div className="access-flow"><article><b>EDUCATE</b><p>Accurate & Easy-to-understand Health Content</p></article><i>→</i><article><b>AWARENESS</b><p>Build Hospital Service Awareness</p></article><i>→</i><article><b>ACCESS</b><p>Connect the Right Patient to the Right Care</p></article></div>
        <strong className="trust">Accurate · Understandable · Trustworthy</strong>
      </div>
      <Showreel active={active === 5} />
    </section>

    <section className="slide vision" data-slide="6">
      <div className="vision-backdrop"><img src="/media/19.jpg" alt="ทีมสหวิชาชีพ"/></div>
      <div className="vision-copy reveal"><p className="kicker">THE VISION</p><h2><span>RIGHT PATIENT</span><span>RIGHT TREATMENT</span><span>RIGHT TEAM</span></h2><p className="safe">Safe · Appropriate · Measurable</p><blockquote>“เพื่อการดูแลที่เหมาะสม ปลอดภัย<br/>และเกิดประโยชน์สูงสุดแก่ผู้ป่วย”</blockquote><footer>Traditional Chinese Medicine × Physical Therapy × Rehabilitation Medicine</footer></div>
    </section>

    <button className="notes-toggle" onClick={() => setShowNotes(!showNotes)} aria-label="เปิดบันทึกผู้พูด">N · NOTES</button>
    {showNotes && <aside className="speaker-notes"><div><small>SPEAKER NOTES · SLIDE 0{active + 1}</small><p>{notes[active]}</p><button onClick={() => setShowNotes(false)}>ปิด ×</button></div></aside>}
    <div className="hint">← → เปลี่ยนหน้า · F เต็มจอ · N บันทึกผู้พูด</div>
  </main>;
}
