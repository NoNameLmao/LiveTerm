import { getProjects } from '../api';
import { getQuote } from '../api';
import { getReadme } from '../api';
import { getWeather } from '../api';
import config from '../../../config.json';
import { getCurrentPath } from '../globals';

export const projects = async (args: string[]): Promise<string> => {
    const projects: GitHubRepo[] = await getProjects();
    return projects
        .map(
            (repo) =>
                `${repo.name} - <a class="text-light-blue dark:text-dark-blue underline" href="${repo.html_url}" target="_blank">${repo.html_url}</a>`,
        )
        .join('\n');
};

export const quote = async (args: string[]): Promise<string> => {
    const data = await getQuote();
    return data.quote;
};

export const readme = async (args: string[]): Promise<string> => {
    const readme = await getReadme();
    return `Opening GitHub README...


  ${readme}
`;
};

export const ls = async (args: string[]): Promise<string> => {
    if (!args[0]) args[0] = getCurrentPath();
    const res = await fetch(`/api/ls?path=${args[0]}`);
    const data = await res.json();
    if (data.error) {
        return data.error;
    }
    const files = data.files.map(
        (file: string) => `<span style="color: green">${file}</span>`,
    );
    const folders = data.folders.map(
        (folder: string) =>
            `<span style="color: blue; background-color: green">${folder}/</span>`,
    );
    const filesAndFolders = [...files, ...folders];
    return filesAndFolders.join('\n');
};

export const cat = async (args: string[]): Promise<string> => {
    const res = await fetch(`/api/cat?path=${args[0]}`);
    const data = await res.json();
    if (data.error) {
        return data.error;
    }
    return data.text;
};

export const markdown = async (args: string[]): Promise<string> => {
    // Call the API to get rendered HTML for markdown
    const res = await fetch(`/api/markdown?filePath=${args.join(' ')}`);
    const data = await res.json();

    if (!res.ok || data.error) {
        return data.error || 'Error fetching markdown content.';
    }

    return data.html;
};

export const weather = async (args: string[]): Promise<string> => {
    const city = args.join('+');
    if (!city) {
        return 'Usage: weather [city]. Example: weather casablanca';
    }
    const weather = await getWeather(city);
    return weather;
};

export const sumfetch = async (args: string[]): Promise<string> => {
    const res = await fetch('/api/uptime');
    const data = await res.json();
    const uptime = new Date(data.uptime * 1000).toISOString().substr(11, 8);
    return `
           ▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▄                  sumfetch
        ▄▓▓▀ ▄▓▓▀▓▓▓▀▓▓▄ ▀▀▓▓▄              -----------
      ▓▓▀  ▄▓▀   ▐▓▓  ▀▓▓    ▓▓▄             ABOUT
    ▄▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓            ${config.name}
   ▓▓     ▓▓▓    ▐▓▓    ▐▓▓     ▓▓          爵 <u><a href="${config.repo}" target="_blank">Github repo</a></u>
▐▓▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▓       -----------
▐▓                                 ▐▓        CONTACT 
▐▓        > L I V E T E R M        ▐▓        <u><a href="mailto:${config.email}" target="_blank">${config.email}</a></u>
▐▓                                 ▐▓        <u><a href="https://github.com/${config.social.github}" target="_blank">github.com/${config.social.github}</a></u>
▐▓▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▓       D <u><a href="${config.social.discord.invite}" target="_blank">Discord: ${config.social.discord.name}</a></u>
   ▓▓      ▐▓▓    ▓▓    ▐▓▓     ▓▓          -----------
    ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓           Uptime: ${uptime}
      ▓▓▓   ▐▓▓   ▓▓   ▓▓▓   ▓▓▀            Terminal: LiveTerm, custom fork
        ▀▓▓▄▄ ▀▓▓▄▓▓▄▓▓▓▄▄▓▓▀ 
            ▀▓▓▓▓▓▓▓▓▓▓▓▀▀ 

`;
};

interface GitHubRepo {
    id: number;
    node_id: string;
    name: string;
    full_name: string;
    private: boolean;
    owner: {
        login: string;
        id: number;
        node_id: string;
        avatar_url: string;
        gravatar_id: string;
        url: string;
        html_url: string;
        followers_url: string;
        following_url: string;
        gists_url: string;
        starred_url: string;
        subscriptions_url: string;
        organizations_url: string;
        repos_url: string;
        events_url: string;
        received_events_url: string;
        type: string;
        site_admin: boolean;
    };
    html_url: string;
    description: string;
    fork: boolean;
    url: string;
    forks_url: string;
    keys_url: string;
    collaborators_url: string;
    teams_url: string;
    hooks_url: string;
    issue_events_url: string;
    events_url: string;
    assignees_url: string;
    branches_url: string;
    tags_url: string;
    blobs_url: string;
    git_tags_url: string;
    git_refs_url: string;
    trees_url: string;
    statuses_url: string;
    languages_url: string;
    stargazers_url: string;
    contributors_url: string;
    subscribers_url: string;
    subscription_url: string;
    commits_url: string;
    git_commits_url: string;
    comments_url: string;
    issue_comment_url: string;
    contents_url: string;
    compare_url: string;
    merges_url: string;
    archive_url: string;
    downloads_url: string;
    issues_url: string;
    pulls_url: string;
    milestones_url: string;
    notifications_url: string;
    labels_url: string;
    releases_url: string;
    deployments_url: string;
    created_at: string;
    updated_at: string;
    pushed_at: string;
    git_url: string;
    ssh_url: string;
    clone_url: string;
    svn_url: string;
    homepage: string | null;
    size: number;
    stargazers_count: number;
    watchers_count: number;
    language: string;
    has_issues: boolean;
    has_projects: boolean;
    has_downloads: boolean;
    has_wiki: boolean;
    has_pages: boolean;
    has_discussions: boolean;
    forks_count: number;
    mirror_url: string | null;
    archived: boolean;
    disabled: boolean;
    open_issues_count: number;
    license: string | null;
    allow_forking: boolean;
    is_template: boolean;
    web_commit_signoff_required: boolean;
    topics: string[];
    visibility: string;
    forks: number;
    open_issues: number;
    watchers: number;
    default_branch: string;
}
