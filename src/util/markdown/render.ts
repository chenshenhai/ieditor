import { marked, Slugger } from 'marked';
import hljs from 'highlight.js';

const renderer = {
  heading(text: string,  level: number,  raw: string, slugger: Slugger) {
    return `<h${level} style="color:#666666;">${text}</h${level}>`;
  },
}

marked.use({ renderer });
const mdRender = new marked.Renderer();
marked.setOptions({
  renderer: mdRender,
  highlight: function(code) {
    return hljs.highlightAuto(code).value;
  },
  pedantic: false,
  gfm: true,
  // tables: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false
});

export function parseMarkdownToHtml(md: string) {
  return marked.parse(md);
}

