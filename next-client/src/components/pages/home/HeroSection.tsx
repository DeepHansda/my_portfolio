"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

function TypedText({ text, delay = 0 }: { text: string; delay?: number }) {
  const [displayed, setDisplayed] = useState("");

  useEffect(() => {
    let i = 0;
    let interval: NodeJS.Timeout;
    const timer = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayed(text.slice(0, ++i));
        if (i >= text.length) clearInterval(interval);
      }, 60);
    }, delay);
    return () => {
      clearTimeout(timer);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return (
    <span>
      {displayed}
      {displayed.length < text.length && (
        <span className="cursor-blink" style={{ color: "#00f5ff" }}>
          ▌
        </span>
      )}
    </span>
  );
}

interface GitHubProfile {
  login: string;
  name: string;
  avatar_url: string;
  public_repos: number;
  location: string;
  bio: string | null;
  html_url: string;
  blog: string | null;
  followers: number;
}

interface GitHubRepo {
  id: number;
  name: string;
  desc: string;
  lang: string;
  langColor: string;
  stars: number;
  url: string;
}

const LANG_COLORS: Record<string, string> = {
  JavaScript: "#f7df1e",
  TypeScript: "#3178c6",
  "Jupyter Notebook": "#da5b0b",
  Python: "#a855f7",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Go: "#00add8",
  Rust: "#dea584",
  Java: "#b07219",
  Shell: "#89e051",
};

interface State {
  loading: boolean;
  error: string | null;
  profile: GitHubProfile | null;
  repos: GitHubRepo[];
  languages: { name: string; color: string }[];
}

export default function HeroSection() {
  const [state, setState] = useState<State>({
    loading: true,
    error: null,
    profile: null,
    repos: [],
    languages: [],
  });

  useEffect(() => {
    let isMounted = true;

    async function fetchGitHubData() {
      try {
        const [profileRes, reposRes] = await Promise.all([
          fetch("https://api.github.com/users/DeepHansda"),
          fetch(
            "https://api.github.com/users/DeepHansda/repos?sort=updated&per_page=30",
          ),
        ]);

        if (!profileRes.ok || !reposRes.ok) {
          throw new Error(`GitHub API Error: ${profileRes.status}`);
        }

        const [p, r] = await Promise.all([profileRes.json(), reposRes.json()]);
        console.log("🚀 ~ fetchGitHubData ~ r:", r);
        if (!isMounted) return;

        const profile: GitHubProfile = {
          login: p.login,
          name: p.name || p.login,
          avatar_url: p.avatar_url,
          public_repos: p.public_repos,
          location: p.location || "Remote",
          bio: p.bio,
          html_url: p.html_url,
          blog: p.blog,
          followers: p.followers,
        };

        const repos: GitHubRepo[] = Array.isArray(r)
          ? r.slice(0, 6).map((item: any) => ({
              id: item.id,
              name: item.name,
              desc: item.description || "Open-source repository",
              lang: item.language || "Code",
              langColor: LANG_COLORS[item.language] || "#00f5ff",
              stars: item.stargazers_count || 0,
              url: item.html_url,
            }))
          : [];

        const uniqueLangs = Array.from(
          new Set(
            (Array.isArray(r) ? r : [])
              .map((item: any) => item.language)
              .filter(Boolean),
          ),
        ) as string[];

        const languages = uniqueLangs.map((lang) => ({
          name: lang,
          color: LANG_COLORS[lang] || "#00f5ff",
        }));

        setState({ loading: false, error: null, profile, repos, languages });
      } catch (err: any) {
        if (isMounted) {
          setState({
            loading: false,
            error: err.message || "Failed to load GitHub data",
            profile: null,
            repos: [],
            languages: [],
          });
        }
      }
    }

    fetchGitHubData();
    return () => {
      isMounted = false;
    };
  }, []);

  const { loading, error, profile, repos, languages } = state;

  return (
    <section
      className="relative min-h-screen flex items-center grid-bg pt-20 pb-8 md:pb-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #020818 0%, #060f2a 50%, #020818 100%)",
      }}
    >
      <div
        className="absolute top-1/4 right-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(168,85,247,0.08) 0%, transparent 70%)",
        }}
      />
      <div
        className="absolute bottom-1/4 left-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(0,245,255,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 w-full py-12">
        {loading ? (
          <div className="hud-card p-12 text-center border-[#00f5ff40] animate-pulse">
            <div className="font-mono text-sm text-[#00f5ff] tracking-widest mb-2">
              // FETCHING REALTIME GITHUB DATA...
            </div>
            <div className="w-12 h-12 border-2 border-[#00f5ff] border-t-transparent rounded-full animate-spin mx-auto mt-4" />
          </div>
        ) : error || !profile ? (
          <div className="hud-card p-12 text-center border-red-500/40">
            <div className="font-mono text-sm text-red-400">
              {error || "Unable to retrieve GitHub data"}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-4">
            {/* Left Column */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* Card 1: Profile */}
              <div className="hud-card p-6 flex flex-col justify-between group hover:border-[#00f5ff60] transition-all duration-300 flex-1">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-[#00f5ff] tracking-widest uppercase">
                      // PROFILE{" "}
                      <span className="text-[10px] text-[#39ff14] ml-1">
                        (LIVE)
                      </span>
                    </span>
                    <span className="flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-mono bg-[#39ff1415] text-[#39ff14] border border-[#39ff1440]">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#39ff14] animate-pulse" />
                      ONLINE
                    </span>
                  </div>

                  <div className="relative w-28 h-28 mx-auto mt-2 rounded-xl overflow-hidden border-2 border-[#00f5ff40] p-1 bg-[#020818] shadow-[0_0_25px_rgba(0,245,255,0.15)] group-hover:border-[#00f5ff] transition-all">
                    <img
                      src={profile.avatar_url}
                      alt={profile.name}
                      className="w-full h-full object-cover rounded-lg"
                    />
                  </div>

                  <div className="text-center pt-2">
                    <h3 className="font-display font-bold text-lg text-slate-100">
                      {profile.name}
                    </h3>
                    <p className="font-mono text-xs text-[#94a3b8]">
                      @{profile.login}
                    </p>
                    <p className="font-mono text-[11px] text-[#00f5ff80] mt-1">
                      📍 {profile.location}
                    </p>
                  </div>
                </div>

                <div className="mt-6 pt-4 border-t border-[#1a3a6b] flex justify-around font-mono text-xs">
                  <div className="text-center">
                    <div className="text-[#00f5ff] font-bold text-sm">
                      {profile.public_repos}
                    </div>
                    <div className="text-[10px] text-[#64748b]">REPOS</div>
                  </div>
                  <div className="w-px bg-[#1a3a6b]" />
                  <div className="text-center">
                    <div className="text-[#a855f7] font-bold text-sm">
                      {profile.followers}
                    </div>
                    <div className="text-[10px] text-[#64748b]">FOLLOWERS</div>
                  </div>
                </div>
              </div>

              {/* Card X: X.com Profile */}
              <a
                href="https://x.com/DeepHansda31337"
                target="_blank"
                rel="noopener noreferrer"
                className="hud-card p-4 block border-slate-700/50 bg-[#060f2a90] hover:border-[#00f5ff60] transition-all duration-300 group/x"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-9 h-9 rounded-lg bg-black border border-slate-700/80 flex items-center justify-center shrink-0">
                    <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </div>
                  <span className="font-display font-semibold text-sm text-slate-100 group-hover/x:text-[#00f5ff] transition-colors truncate">
                    {profile.name}
                  </span>
                </div>
                <div className="w-full py-2 px-3 rounded-lg border border-slate-700/60 bg-[#020818] text-center font-mono text-xs text-slate-300 group-hover/x:border-[#00f5ff40] transition-colors truncate">
                  x.com/DeepHansda31337
                </div>
              </a>
            </div>

            {/* Center Column */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              {/* Card 4: Marquee */}
              <div className="hud-card p-4 overflow-hidden border-[#a855f740] bg-gradient-to-r from-[#060f2a] via-[#0d1f4a] to-[#060f2a]">
                <div className="flex items-center gap-4 whitespace-nowrap">
                  <h1 className="font-display text-2xl md:text-3xl lg:text-4xl font-black tracking-wider text-slate-100 flex-1 truncate">
                    HI, I'M{" "}
                    <span className="neon-text-cyan">
                      {profile.name.toUpperCase()}
                    </span>
                  </h1>
                  <span className="font-mono text-xs px-2 py-1 bg-[#a855f720] text-[#a855f7] border border-[#a855f750] rounded">
                    LIVE.API
                  </span>
                </div>
              </div>

              {/* Card 3: Realtime Repos */}
              <div className="hud-card p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-5 h-5 text-[#00f5ff]"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          fillRule="evenodd"
                          clipRule="evenodd"
                          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        />
                      </svg>
                      <span className="font-mono text-sm font-semibold text-slate-200">
                        github/{profile.login}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-[#00f5ff80]">
                      // LATEST REPOSITORIES
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {repos.map((repo) => (
                      <a
                        key={repo.id}
                        href={repo.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-[#02081880] border border-[#1a3a6b] rounded hover:border-[#00f5ff50] transition-all group/repo flex flex-col justify-between"
                      >
                        <div>
                          <div className="font-mono text-xs font-bold text-slate-200 group-hover/repo:text-[#00f5ff] truncate">
                            {repo.name}
                          </div>
                          <div className="text-[10px] text-[#64748b] mt-1 line-clamp-2 leading-tight">
                            {repo.desc}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-3 font-mono text-[10px]">
                          <span className="flex items-center gap-1">
                            <span
                              className="w-2 h-2 rounded-full"
                              style={{ background: repo.langColor }}
                            />
                            <span className="text-[#94a3b8]">{repo.lang}</span>
                          </span>
                          {repo.stars > 0 && (
                            <span className="text-[#fbbf24]">
                              ★ {repo.stars}
                            </span>
                          )}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                <div className="mt-4 pt-3 border-t border-[#1a3a6b] flex items-center justify-between text-[11px] font-mono text-[#64748b]">
                  <span>Live GitHub repositories</span>
                  <a
                    href={`${profile.html_url}?tab=repositories`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[#00f5ff] hover:underline"
                  >
                    View all {profile.public_repos} →
                  </a>
                </div>
              </div>

              {/* Card 2: Contact HUD Bar */}
              <div className="hud-card p-4 flex flex-wrap items-center justify-between gap-4 border-[#00f5ff30] bg-[#060f2a90]">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-[#00f5ff15] border border-[#00f5ff40] flex items-center justify-center text-[#00f5ff]">
                    ✉
                  </div>
                  <div>
                    <div className="text-[10px] font-mono text-[#64748b]">
                      EMAIL ADDRESS
                    </div>
                    <a
                      href="mailto:deephansda921@gmail.com"
                      className="font-mono text-xs md:text-sm text-slate-200 hover:text-[#00f5ff] transition-colors"
                    >
                      deephansda921@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <a
                    href={profile.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glowing-btn text-[11px] py-1.5 px-3"
                  >
                    GITHUB ↗
                  </a>
                  <a
                    href="https://www.linkedin.com/in/deep-hansda-44627a20a/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="glowing-btn text-[11px] py-1.5 px-3"
                    style={{ borderColor: "#0077b5", color: "#0077b5" }}
                  >
                    LINKEDIN ↗
                  </a>
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              {/* Card 7: GIF Display */}
              <div className="hud-card p-3 border-[#39ff1440] bg-[#02081880] overflow-hidden">
                <img
                  src="/ezgif-31219becf39b2c41.gif"
                  alt="Featured GIF"
                  className="w-full h-auto rounded object-cover"
                />
              </div>

              {/* Card 6: Bio */}
              <div className="hud-card p-5 flex-1 flex flex-col justify-between">
                <div>
                  <div className="section-label mb-3">
                    <span>INIT SEQUENCE</span>
                    <span className="cursor-blink" style={{ color: "#00f5ff" }}>
                      ▌
                    </span>
                  </div>

                  <h2 className="font-display text-sm font-semibold mb-3 tracking-wider text-[#a855f7]">
                    <TypedText text={profile.bio || "Full-Stack Developer"} />
                  </h2>

                  <p className="text-xs text-[#94a3b8] leading-relaxed mb-4">
                    Building web applications and open-source projects —
                    fetching live stats directly from GitHub.
                  </p>
                </div>

                <div className="flex flex-col gap-2 pt-3 border-t border-[#1a3a6b]">
                  <Link
                    href="/projects"
                    className="glowing-btn-solid text-center text-xs py-2"
                  >
                    View Projects
                  </Link>
                  <Link
                    href="/resume"
                    className="glowing-btn text-center text-xs py-2"
                  >
                    View Resume
                  </Link>
                </div>
              </div>

              {/* Card 5: Languages */}
              <div className="hud-card p-5">
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-xs text-[#00f5ff] tracking-widest uppercase">
                    // REPO LANGUAGES
                  </span>
                  <span className="text-xs text-[#a855f7]">⚙</span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {languages.map((badge) => (
                    <span
                      key={badge.name}
                      className="font-mono text-[11px] px-2.5 py-1 bg-[#020818] border border-[#1a3a6b] rounded text-slate-300 hover:border-[#00f5ff40] transition-colors"
                    >
                      <span style={{ color: badge.color }} className="mr-1.5">
                        ●
                      </span>
                      {badge.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
