import { useState, useEffect, useCallback } from "react";

const GITHUB_USERNAME = "piyush17011";

// Builds the cells + sparse month labels from a contributions array
function buildGraph(contributions) {
  // contributions = [{ date: "2024-04-28", count: 3 }, ...]
  // sorted oldest → newest

  // Pad the start so index 0 = Sunday
  const firstDay = new Date(contributions[0]?.date);
  const startPad = firstDay.getDay(); // 0=Sun … 6=Sat
  const padded = [
    ...Array(startPad).fill({ date: null, count: 0 }),
    ...contributions,
  ];

  // Chunk into weeks (columns of 7)
  const weeks = [];
  for (let i = 0; i < padded.length; i += 7) {
    weeks.push(padded.slice(i, i + 7).map((d) => {
      if (!d.count) return 0;
      if (d.count <= 2) return 1;
      if (d.count <= 5) return 2;
      if (d.count <= 9) return 3;
      return 4;
    }));
  }

  // Sparse month labels — only label the week a new month starts
  const months = weeks.map((_, wi) => {
    const dayIndex = wi * 7 - startPad;
    if (dayIndex < 0) return "";
    const date = new Date(contributions[dayIndex]?.date);
    if (!date || isNaN(date)) return "";
    const prevDayIndex = (wi - 1) * 7 - startPad;
    if (prevDayIndex < 0) return date.toLocaleString("default", { month: "short" });
    const prevDate = new Date(contributions[prevDayIndex]?.date);
    if (!prevDate || isNaN(prevDate)) return "";
    return date.getMonth() !== prevDate.getMonth()
      ? date.toLocaleString("default", { month: "short" })
      : "";
  });

  return { cells: weeks, months };
}

export function useGitHub() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [userRes, reposRes, contribRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`),
        fetch(`https://github-contributions-api.jogruber.de/v4/${GITHUB_USERNAME}?y=last`)
      ]);

      if (!userRes.ok) throw new Error("GitHub user not found");

      const user = await userRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];
      const contribData = contribRes.ok ? await contribRes.json() : null;

      const totalStars = repos.reduce((sum, r) => sum + (r.stargazers_count || 0), 0);
      const totalForks = repos.reduce((sum, r) => sum + (r.forks_count || 0), 0);

      const languages = {};
      repos.forEach((r) => {
        if (r.language) languages[r.language] = (languages[r.language] || 0) + 1;
      });
      const topLangs = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);

      // Build graph from contributions
      const contributions = (contribData?.contributions || [])
        .filter((d) => d.date)
        .sort((a, b) => new Date(a.date) - new Date(b.date));

      const graph = contributions.length ? buildGraph(contributions) : null;

      setStats({
        username: user.login,
        name: user.name || user.login,
        bio: user.bio || "",
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        totalStars,
        totalForks,
        topLangs,
        topLanguage: topLangs[0] || "N/A",
        contributions: contribData?.total?.lastYear ?? 0,
        createdAt: new Date(user.created_at).getFullYear(),
        graph,
      });
    } catch (err) {
      setError(err.message || "Failed to fetch GitHub data");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return { stats, loading, error, fetchStats };
}