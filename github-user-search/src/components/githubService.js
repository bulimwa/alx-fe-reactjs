// src/services/githubService.js

export const searchUsers = async (query, location = "", minRepos = 0) => {
  try {
    // Build base URL
    let url = `https://api.github.com/search/users?q=${query}`;

    // Add location filter if provided
    if (location) {
      url += `+location:${location}`;
    }

    // Add minRepos filter if provided
    if (minRepos > 0) {
      url += `+repos:>=${minRepos}`;
    }

    // Fetch from GitHub API
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error("Failed to fetch users");
    }

    const data = await response.json();
    return data.items || [];
  } catch (error) {
    console.error("Error in searchUsers:", error);
    return [];
  }
};

