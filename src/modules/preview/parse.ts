import { marked, Slugger } from 'marked';

const renderer = {
  heading(text: string,  level: number,  raw: string, slugger: Slugger) {
    return `<h${level} style="color:#666666;">${text}</h${level}>`;
  }
}

marked.use({ renderer })

export function parseMarkdownToHtml(md: string) {
  return marked.parse(md);
}

