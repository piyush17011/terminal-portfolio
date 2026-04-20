import { useState, useEffect, useCallback } from "react";

const GITHUB_USERNAME = "piyush17011";

export function useGitHub() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const [userRes, reposRes] = await Promise.all([
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}`),
        fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`)
      ]);

      if (!userRes.ok) throw new Error("GitHub user not found");

      const user = await userRes.json();
      const repos = reposRes.ok ? await reposRes.json() : [];

      const totalStars = repos.reduce(
        (sum, repo) => sum + (repo.stargazers_count || 0),
        0
      );

      const totalForks = repos.reduce(
        (sum, repo) => sum + (repo.forks_count || 0),
        0
      );

      const languages = {};
      repos.forEach((repo) => {
        if (repo.language) {
          languages[repo.language] =
            (languages[repo.language] || 0) + 1;
        }
      });

      const topLangs = Object.entries(languages)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([lang]) => lang);

      setStats({
        username: user.login,
        name: user.name || user.login,
        avatar: user.avatar_url,
        followers: user.followers,
        following: user.following,
        publicRepos: user.public_repos,
        totalStars,
        totalForks,
        topLangs,
        graphImage: `https://ghchart.rshah.org/00ff00/${GITHUB_USERNAME}`
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