import * as bin from './index';
import config from '../../../config.json';
import { list as listHistory } from '../history';

export const help = async (args: string[]): Promise<string> => {
    const commands = Object.keys(bin).sort().join(', ');
    var c = '';
    for (let i = 1; i <= Object.keys(bin).sort().length; i++) {
        if (i % 7 === 0) {
            c += Object.keys(bin).sort()[i - 1] + '\n';
        } else {
            c += Object.keys(bin).sort()[i - 1] + ' ';
        }
    }
    return `feeling lost? here's some commands:

=========================
${c}
=========================

[tab]: trigger completion.
[ctrl+l]/clear: clear terminal.

Type 'sumfetch' to display summary.
`;
};

export const repo = async (args: string[]): Promise<string> => {
    window.open(`${config.repo}`);
    return 'Opening Github repository...';
};

export const about = async (args: string[]): Promise<string> => {
    return `hi, im ${config.name}
Welcome to my website!
More about me:
'sumfetch' - short summary.
'readme' - my github readme.
`;
};

export const donate = async (args: string[]): Promise<string> => {
    return `you can donate to me here:
- <u><a class="text-light-blue dark:text-dark-blue underline" href="https://www.donationalerts.com/r/emberglaze" target="_blank">donationalerts</a></u>
- telegram: @emberglaze (via @wallet, crypto)
thank you for your interest 🙏
`;
};

export const email = async (args: string[]): Promise<string> => {
    window.open(`mailto:${config.email}`);
    return `Opening mailto:${config.email}...`;
};

export const github = async (args: string[]): Promise<string> => {
    window.open(`https://github.com/${config.social.github}/`);
    return 'Opening github...';
};

export const google = async (args: string[]): Promise<string> => {
    window.open(`https://google.com/search?q=${args.join(' ')}`);
    return `Searching google for ${args.join(' ')}...`;
};

export const duckduckgo = async (args: string[]): Promise<string> => {
    window.open(`https://duckduckgo.com/?q=${args.join(' ')}`);
    return `Searching duckduckgo for ${args.join(' ')}...`;
};

export const bing = async (args: string[]): Promise<string> => {
    window.open(`https://bing.com/search?q=${args.join(' ')}`);
    return `Wow, really? You are using bing for ${args.join(' ')}?`;
};

export const reddit = async (args: string[]): Promise<string> => {
    window.open(`https://www.reddit.com/search/?q=${args.join(' ')}`);
    return `Searching reddit for ${args.join(' ')}...`;
};

export const echo = async (args: string[]): Promise<string> => {
    return args.join(' ');
};

export const whoami = async (args: string[]): Promise<string> => {
    return `${config.ps1_username}`;
};

export const cd = async (args: string[]): Promise<string> => {
    return `Permission denied.`;
};

export const pwd = async (args: string[]): Promise<string> => {
    return `/`;
};

export const date = async (args: string[]): Promise<string> => {
    return new Date().toString();
};

export const sudo = async (args?: string[]): Promise<string> => {
    return `Permission denied.`;
};

export const history = async (args: string[]): Promise<string> => {
    return listHistory();
};

export const banner = (args?: string[]): string => {
    return `
█████        ███                       ███████████                                   
░░███        ░░░                       ░█░░░███░░░█                                   
░███        ████  █████ █████  ██████ ░   ░███  ░   ██████  ████████  █████████████  
░███       ░░███ ░░███ ░░███  ███░░███    ░███     ███░░███░░███░░███░░███░░███░░███ 
░███        ░███  ░███  ░███ ░███████     ░███    ░███████  ░███ ░░░  ░███ ░███ ░███ 
░███      █ ░███  ░░███ ███  ░███░░░      ░███    ░███░░░   ░███      ░███ ░███ ░███ 
███████████ █████  ░░█████   ░░██████     █████   ░░██████  █████     █████░███ █████
░░░░░░░░░░░ ░░░░░    ░░░░░     ░░░░░░     ░░░░░     ░░░░░░  ░░░░░     ░░░░░ ░░░ ░░░░░ 

Type 'help' if you're feeling lost.
Type 'sumfetch' to display a crappy version of neofetch.
Type 'repo' or click <u><a class="text-light-blue dark:text-dark-blue underline" href="${config.repo}" target="_blank">here</a></u> for the Github repository.
`;
};
