"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

type Theme = { id: number; name: string; creator: string; type: string; colors: string[]; description: string; downloads: string; dark: boolean };

const rawThemes: [string, string, string, string, string, string, boolean][] = [
  ["Nordic Signal", "Kira Moss", "Palette", "#111827,#8fbcbb,#88c0d0,#ebcb8b", "A cool, low-contrast palette for long sessions.", "8.4k", true],
  ["Paper Lantern", "Hana Seo", "IDE skin", "#f8f4ea,#20302a,#d98968,#87a878", "Warm paper tones with an editorial syntax layer.", "6.1k", false],
  ["Cinder", "Jules Grant", "Terminal", "#161616,#f25f5c,#70c1b3,#ffe066", "High-signal contrast for fast-moving terminals.", "5.8k", true],
  ["Moss Study", "Nia Woods", "IDE skin", "#17211f,#9ab69a,#d8e2d1,#e8d7bf", "A grounded green workspace that stays quiet.", "4.9k", true],
  ["Solar Flare", "Owen Park", "Palette", "#241b2f,#ff7849,#ffd166,#06d6a0", "Bright semantic colors against a cosmic base.", "4.4k", true],
  ["Monoform", "Iris Bell", "IDE skin", "#f1f1ed,#171717,#6b7280,#ef8354", "Minimal monochrome with one confident accent.", "4.2k", false],
  ["Abyss", "Luca Vale", "Terminal", "#090d14,#526777,#82aaff,#c3e88d", "Deep blue-black with crisp ocean syntax.", "3.8k", true],
  ["Citrus", "Maya Chen", "Palette", "#17211f,#b8e06d,#f7f4ea,#f4a261", "Fresh, optimistic highlights for everyday coding.", "3.6k", true],
  ["Clay", "Ava Patel", "IDE skin", "#312a27,#e8c1a0,#d77a61,#a8c090", "Soft clay surfaces with readable warm syntax.", "3.2k", true],
  ["Raincheck", "Theo Brooks", "Terminal", "#0d1b2a,#415a77,#778da9,#e0e1dd", "A rainy afternoon palette for focused work.", "3.1k", true],
  ["Lavender Ink", "Ren Ito", "Palette", "#201b2c,#c8b6ff,#b8f2e6,#ffcad4", "Gentle pastels with enough contrast for code.", "2.9k", true],
  ["Archive", "Sam Reed", "IDE skin", "#eee8d5,#586e75,#b58900,#cb4b16", "Solarized-inspired, tuned for documentation work.", "2.7k", false],
  ["Signal Fire", "Bea Kim", "Terminal", "#101820,#ff5a5f,#f4d35e,#00a896", "A command-line skin that makes status impossible to miss.", "2.5k", true],
  ["Sea Glass", "Mina Ortiz", "Palette", "#e5f4f2,#145c63,#74c0b8,#f2cc8f", "Light, clear, and easy on peripheral vision.", "2.2k", false],
  ["Graphite", "Noah Allen", "IDE skin", "#202124,#9aa0a6,#8ab4f8,#f28b82", "A precise neutral base for dense codebases.", "2.1k", true],
  ["Peach Fuzz", "Elena Fox", "Palette", "#fff7f0,#4a2c2a,#ee9b73,#7fb685", "Friendly peach and fern for a softer workbench.", "1.9k", false],
  ["Voltage", "Kai Brooks", "Terminal", "#0b1020,#f72585,#4cc9f0,#b8f2e6", "Electric accents for late-night build sessions.", "1.8k", true],
  ["Juniper", "Sofia Lane", "IDE skin", "#18241f,#6da58c,#d1e8d0,#e2b07a", "A calm forest floor for thoughtful engineering.", "1.7k", true],
  ["Chalkboard", "Eli Stone", "Palette", "#20251f,#d6e68a,#e7d8b1,#a8dadc", "Handmade chalk colors without the visual noise.", "1.5k", true],
  ["Oat Milk", "June Hart", "IDE skin", "#f5efe5,#5c5048,#c97b63,#789c87", "A bright workspace with cafe-hour energy.", "1.4k", false],
  ["Deep Space", "Arlo James", "Terminal", "#05070d,#7aa2f7,#bb9af7,#9ece6a", "A polished deep-space terminal for serious focus.", "1.3k", true],
  ["Marigold", "Tess Wu", "Palette", "#fff8e7,#3f3a2f,#e9b949,#427a5b", "A sunny, readable palette with botanical green.", "1.2k", false],
  ["Ink Wash", "Yuki Tan", "IDE skin", "#1f2428,#c5c8c6,#7c9aa5,#d19a66", "Restrained ink tones inspired by technical notebooks.", "1.1k", true],
  ["Poplar", "Milo Green", "Palette", "#edf4ed,#1f3a32,#7ba984,#db6f4e", "A clean green palette for product engineers.", "989", false],
  ["Ruby Room", "Faye Cole", "Terminal", "#24121c,#e85d75,#ffb4a2,#80b918", "Ruby-toned warmth with a strong green signal.", "932", true],
  ["Blue Hour", "Ari Singh", "IDE skin", "#17233c,#7aa2f7,#bbd0ff,#f6c177", "The final blue light before a productive night.", "874", true],
  ["Linen", "Rae Ellis", "Palette", "#f4f0e6,#5f665b,#c98b68,#8ca58c", "Natural linen neutrals with editorial highlights.", "810", false],
  ["Carbon", "Devon Hall", "Terminal", "#0e1111,#d3d7cf,#92b6a7,#e8ad5b", "A dependable carbon shell for practical work.", "760", true],
  ["Iris", "Nora Bell", "Palette", "#f5f0ff,#322653,#8e7dbe,#e6a4b4", "A composed violet palette with rose punctuation.", "702", false],
  ["Meadow", "Omar Price", "IDE skin", "#17231b,#b6d7a8,#f0e5cf,#d07a5c", "A soft meadow for code that needs room to breathe.", "644", true],
  ["Copper Wire", "Lena Ward", "Terminal", "#211b18,#d99058,#d8c3a5,#78a083", "Industrial copper and sage for command-line work.", "598", true],
  ["Terminal Rose", "BNZ", "Terminal", "#201719,#e08a83,#f2c6a0,#7ca889", "A focused shell with warm status colors.", "531", true],
  ["Clearwater", "BNZ", "Palette", "#eef7f7,#20444b,#79b8b0,#e8aa72", "Clean aqua contrast for calm product work.", "488", false],
];
const seedThemes: Theme[] = rawThemes.map((item, index) => ({ id: index + 1, name: item[0], creator: item[1], type: item[2], colors: item[3].split(","), description: item[4], downloads: item[5], dark: item[6] }));

const docs = [
  ["Start here", "DevSnaps is a visual reference library for the small pieces of craft that make development feel personal. Browse code snaps, save a workspace theme, or publish a setup that helps someone else focus."],
  ["Publish a snap", "A good snap has one clear idea. Add a useful title, a short explanation, the language or tool involved, and one image that shows the result. Use tags to make it discoverable. Keep credentials, tokens, and private source out of public snaps."],
  ["Build a theme", "Themes are organized around four signals: a base surface, readable foreground, a primary syntax color, and one accent for important state. Start with those four decisions before tuning individual tokens."],
  ["Community standards", "Be specific, credit inspiration, and make your examples runnable when possible. Staff picks favor clarity over novelty: useful documentation and thoughtful contrast beat visual noise."],
];

export default function Home() {
  const [view, setView] = useState("Discover");
  const [filter, setFilter] = useState("All themes");
  const [query, setQuery] = useState("");
  const [saved, setSaved] = useState<number[]>([2, 7]);
  const [showUpload, setShowUpload] = useState(false);
  const [greeting, setGreeting] = useState("Good morning");
  useEffect(() => { const timer = window.setTimeout(() => { const hour = new Date().getHours(); setGreeting(hour < 5 ? "Good night" : hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : hour < 22 ? "Good evening" : "Good night"); }, 0); return () => window.clearTimeout(timer); }, []);
  const visibleThemes = useMemo(() => seedThemes.filter((theme) => `${theme.name} ${theme.creator} ${theme.type} ${theme.description}`.toLowerCase().includes(query.toLowerCase()) && (filter === "All themes" || theme.type === filter)), [filter, query]);
  return <main className="app-shell"><aside className="sidebar"><a className="brand" href="#top"><Image className="brand-mark" src="/camera-logo.svg" alt="" width={29} height={29} /><span>dev<span>.</span>snaps</span></a><div className="workspace-switcher"><span className="workspace-icon">B</span><span><small>WORKSPACE</small><strong>BNZ&apos;s library</strong></span><b>v</b></div><nav className="side-nav"><p>WORKSPACE</p>{["Discover", "Themes", "Collections", "Docs"].map((item) => <button key={item} className={view === item ? "selected" : ""} onClick={() => setView(item)}><span className={`nav-icon ${item.toLowerCase()}`} />{item}{item === "Themes" && <em>32</em>}</button>)}<p>YOUR LIBRARY</p><button className={view === "Saved" ? "selected" : ""} onClick={() => setView("Saved")}><span className="nav-icon saved" />Saved snaps <em>{saved.length}</em></button><button onClick={() => setView("Collections")}><span className="nav-icon folder" />Collections</button></nav><div className="sidebar-bottom"><div className="pro-card"><span>*</span><strong>DevSnaps Pro</strong><p>Private collections, unlimited uploads.</p><button>Explore Pro -&gt;</button></div><button className="help-link" onClick={() => setView("Docs")}>? Help and resources</button><button className="user-row"><span className="user-avatar">BN</span><span><strong>BNZ</strong><small>Free workspace</small></span><b>...</b></button></div></aside><section className="main-panel" id="top"><header className="app-header"><div className="breadcrumb"><span>Workspace</span><b>/</b><strong>{view}</strong></div><div className="header-actions"><label className="global-search"><span>?</span><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search snaps, themes, docs..." /></label><button className="header-icon" aria-label="Notifications">!</button><button className="new-button" onClick={() => setShowUpload(true)}>+ New snap</button></div></header>{view === "Docs" ? <DocsView /> : <ThemeView title={view === "Discover" ? `${greeting}, BNZ.` : view === "Saved" ? "Saved references." : "Find your working color."} greeting={greeting} themes={view === "Saved" ? visibleThemes.filter((theme) => saved.includes(theme.id)) : visibleThemes} filter={filter} setFilter={setFilter} saved={saved} setSaved={setSaved} setView={setView} openUpload={() => setShowUpload(true)} />}</section>{showUpload && <UploadModal close={() => setShowUpload(false)} />}</main>;
}

function ThemeView({ title, greeting, themes, filter, setFilter, saved, setSaved, setView, openUpload }: { title: string; greeting: string; themes: Theme[]; filter: string; setFilter: (value: string) => void; saved: number[]; setSaved: (value: number[]) => void; setView: (value: string) => void; openUpload: () => void }) { return <div className="content"><section className="welcome-row"><div><p className="overline">{title === "Find your working color." ? `${greeting} | 32 CURATED ITEMS` : "DEVSNAPS WORKSPACE"}</p><h1>{title} <em>with intention.</em></h1><p className="subhead">Palettes, IDE skins, terminal environments, and useful references for focused developers.</p></div><button className="secondary-button" onClick={openUpload}>Share something -&gt;</button></section><section className="signal-grid"><div className="signal-card signal-primary"><span className="signal-label">COMMUNITY PULSE</span><strong>12,842</strong><p>developers sharing their craft</p><small>+18.4% this month</small></div><div className="signal-card"><span className="signal-label">NEW THIS WEEK</span><strong>284</strong><p>snaps and themes published</p><a onClick={() => setView("Themes")}>Explore latest -&gt;</a></div><div className="signal-card"><span className="signal-label">YOUR LIBRARY</span><strong>{saved.length}</strong><p>saved references to revisit</p><a onClick={() => setView("Saved")}>Open saved snaps -&gt;</a></div></section><div className="library-toolbar"><div className="filter-tabs">{["All themes", "Palette", "IDE skin", "Terminal"].map((item) => <button className={filter === item ? "active" : ""} onClick={() => setFilter(item)} key={item}>{item}</button>)}</div><span>{themes.length} results</span></div><div className="theme-catalog">{themes.map((theme) => <ThemeCard key={theme.id} theme={theme} saved={saved} setSaved={setSaved} />)}</div>{themes.length === 0 && <div className="empty-state">No themes match this search.</div>}<section className="docs-callout"><p className="overline">FIELD GUIDE</p><h2>Make your workspace <em>yours.</em></h2><p>Learn how to choose a palette, publish a useful snap, and build a library that keeps you moving.</p><button onClick={() => setView("Docs")}>Read the docs -&gt;</button></section></div> }

function ThemeCard({ theme, saved, setSaved }: { theme: Theme; saved: number[]; setSaved: (value: number[]) => void }) { const [expanded, setExpanded] = useState(false); const isSaved = saved.includes(theme.id); return <article className={expanded ? "theme-card expanded" : "theme-card"} onClick={() => setExpanded(!expanded)} onKeyDown={(event) => { if (event.key === "Enter" || event.key === " ") setExpanded(!expanded); }} tabIndex={0}><div className="theme-preview" style={{ background: theme.colors[0] }}><div className="preview-header"><span>{theme.type}</span><button className={isSaved ? "bookmark saved" : "bookmark"} onClick={(event) => { event.stopPropagation(); setSaved(isSaved ? saved.filter((id) => id !== theme.id) : [...saved, theme.id]); }} aria-label={`Save ${theme.name}`}>Save</button></div><div className="preview-editor"><span style={{ color: theme.colors[1] }}>const</span> <b style={{ color: theme.colors[2] }}>workspace</b> = <i style={{ color: theme.colors[3] }}>focused</i><br /><span style={{ color: theme.colors[1] }}>build</span>(<b style={{ color: theme.colors[2] }}>somethingGood</b>)<br /><em style={{ color: theme.colors[3] }}>keep going</em></div><div className="swatches">{theme.colors.map((color) => <i style={{ background: color }} key={color} />)}</div></div><div className="theme-meta"><div><h3>{theme.name}</h3><p>by {theme.creator}</p></div><span className="download-count">v {theme.downloads}</span></div><p className="theme-description">{theme.description}</p><div className="theme-footer"><span className="type-pill">{theme.type}</span><span>{theme.dark ? "Dark" : "Light"} | Updated recently</span></div><div className="theme-details"><p>{theme.description}</p><div className="hex-list">{theme.colors.map((color, index) => <span key={color}><i style={{ background: color }} />COLOR {index + 1}<b>{color}</b></span>)}</div></div></article>; }

function DocsView() { return <div className="content docs-content"><section className="docs-hero"><p className="overline">DEVSNAPS FIELD GUIDE</p><h1>Build a workspace<br /><em>with intention.</em></h1><p>DevSnaps is a place to collect the visual language of your work. This guide covers the habits that turn a saved reference into a useful system.</p><div className="docs-meta"><span>4 chapters</span><span>8 min read</span><span>Updated today</span></div></section><article className="docs-article">{docs.map(([title, body], index) => <section className="doc-section" key={title}><span className="chapter-number">0{index + 1}</span><div><h2>{title}</h2><p>{body}</p></div></section>)}</article></div>; }

function UploadModal({ close }: { close: () => void }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [code, setCode] = useState("");
  const [image, setImage] = useState<{ name: string; url: string } | null>(null);
  const [error, setError] = useState("");
  const [published, setPublished] = useState(false);

  function handleFile(file?: File) {
    if (!file) return;
    if (!file.type.startsWith("image/")) { setError("Choose an image file such as PNG, JPG, or WEBP."); return; }
    if (file.size > 10 * 1024 * 1024) { setError("That image is larger than 10MB."); return; }
    setError("");
    setImage({ name: file.name, url: URL.createObjectURL(file) });
  }

  function publish(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!title.trim() || (!code.trim() && !image)) { setError("Add a title and either paste code or choose a cover image."); return; }
    setPublished(true);
  }

  return <div className="modal-backdrop" onClick={close}><form className="upload-modal" onSubmit={publish} onClick={(event) => event.stopPropagation()}><button type="button" className="modal-close" onClick={close}>x</button>{published ? <div className="publish-success"><span>OK</span><p className="overline">READY TO SHARE</p><h2>Your snap is <em>prepared.</em></h2><p className="modal-copy">The local preview is ready. Connect Supabase Storage and your database to publish it for the community.</p><button type="button" className="primary-button full" onClick={close}>Close</button></div> : <><p className="overline">PUBLISH TO COMMUNITY</p><h2>Share a <em>useful idea.</em></h2><p className="modal-copy">Make it specific. Make it yours. Make it easy for the next developer to understand.</p><label>Title<input value={title} onChange={(event) => setTitle(event.target.value)} placeholder="e.g. The 60-second debounce" /></label><label>Description<textarea value={description} onChange={(event) => setDescription(event.target.value)} placeholder="What makes this useful?" rows={3} /></label><label>Tags<input value={tags} onChange={(event) => setTags(event.target.value)} placeholder="hooks, react, performance" /></label><label>Code<textarea className="code-input" value={code} onChange={(event) => setCode(event.target.value)} placeholder="Paste a code snippet here" rows={5} /></label><input className="file-input" id="snap-image" type="file" accept="image/png,image/jpeg,image/webp" onChange={(event) => handleFile(event.target.files?.[0])} /><label className="drop-zone" htmlFor="snap-image" onDragOver={(event) => event.preventDefault()} onDrop={(event) => { event.preventDefault(); handleFile(event.dataTransfer.files[0]); }}>{image ? <Image src={image.url} alt="Selected cover preview" width={400} height={110} unoptimized /> : <span>+</span>}<strong>{image ? image.name : "Drop a cover image or choose a file"}</strong><small>PNG, JPG, or WEBP up to 10MB</small></label>{error && <p className="form-error">{error}</p>}<button className="primary-button full" type="submit">Prepare snap -&gt;</button></>}</form></div>;
}


