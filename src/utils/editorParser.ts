export const parseDraftContentToHTML = (text: string, language: string = "vi"): string => {
  if (!text) return "";
  
  // Table rendering functions
  const renderHtmlTable = (rows: string[]): string => {
    if (rows.length < 1) return rows.join('\n');
    
    const headerCells = rows[0]
      .split('|')
      .slice(1, -1)
      .map(c => c.trim());
      
    const hasSeparator = rows.length > 1 && rows[1].replace(/[\s\-\|:]/g, '') === '';
    const startIndex = hasSeparator ? 2 : 1;
    
    let htmlTable = `<div class="my-4 overflow-x-auto rounded-xl border border-slate-200/80 dark:border-zinc-800 shadow-2xs"><table class="min-w-full divide-y divide-slate-200 dark:divide-zinc-800 text-xs text-left text-slate-700 dark:text-zinc-300">`;
    
    // Header
    htmlTable += `<thead class="bg-slate-50/80 dark:bg-zinc-900 font-bold text-slate-900 dark:text-white"><tr>`;
    headerCells.forEach(cell => {
      htmlTable += `<th class="px-4 py-2.5 border-r border-slate-200/50 dark:border-zinc-800/50 last:border-o">${cell}</th>`;
    });
    htmlTable += `</tr></thead><tbody class="divide-y divide-slate-100 dark:divide-zinc-900">`;
    
    // Body rows
    for (let i = startIndex; i < rows.length; i++) {
      const cells = rows[i]
        .split('|')
        .slice(1, -1)
        .map(c => c.trim());
      
      htmlTable += `<tr class="hover:bg-slate-50/50 dark:hover:bg-zinc-900/30 transition-colors">`;
      cells.forEach(cell => {
        htmlTable += `<td class="px-4 py-2.5 border-r border-slate-200/50 dark:border-zinc-800/50 last:border-o font-medium">${cell}</td>`;
      });
      htmlTable += `</tr>`;
    }
    
    htmlTable += `</tbody></table></div>`;
    return htmlTable;
  };

  const parseTables = (textStr: string): string => {
    const linesArr = textStr.split('\n');
    let inTable = false;
    let tableRows: string[] = [];
    const resultLines: string[] = [];

    for (let i = 0; i < linesArr.length; i++) {
      const line = linesArr[i].trim();
      if (line.startsWith('|') && line.endsWith('|')) {
        if (!inTable) {
          inTable = true;
          tableRows = [];
        }
        tableRows.push(line);
      } else {
        if (inTable) {
          resultLines.push(renderHtmlTable(tableRows));
          inTable = false;
        }
        resultLines.push(linesArr[i]);
      }
    }
    if (inTable) {
      resultLines.push(renderHtmlTable(tableRows));
    }
    return resultLines.join('\n');
  };

  let html = parseTables(text);

  // 1. Embedded Images syntax: ![alt](url) -> styled <img> with caption
  html = html.replace(/!\[(.*?)\]\((.*?)\)/g, (_, alt, url) => {
    return `<div class="my-3.5 rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm max-w-full"><img src="${url.trim()}" alt="${alt || 'image'}" class="w-full max-h-[420px] object-cover block" referrerPolicy="no-referrer" /><p class="text-[10px] text-slate-400 font-mono text-center py-1.5 bg-slate-50 dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800/60">${alt || (language === 'vi' ? 'Hình ảnh đính kèm' : 'Attached image')}</p></div>`;
  });

  // Images syntax: [img: url] or [img: url|caption]
  html = html.replace(/\[img:\s*(.*?)(?:\|(.*?))?\]/g, (_, url, caption) => {
    const desc = caption || (language === 'vi' ? 'Hình ảnh đính kèm' : 'Attached image');
    return `<div class="my-3.5 rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 shadow-sm max-w-full"><img src="${url.trim()}" alt="embedded image" class="w-full max-h-[420px] object-cover block" referrerPolicy="no-referrer" /><p class="text-[10px] text-slate-400 font-mono text-center py-1.5 bg-slate-50 dark:bg-zinc-900 border-t border-slate-100 dark:border-zinc-800/60">${desc}</p></div>`;
  });

  // Video inline syntax: [video: url]
  html = html.replace(/\[video:\s*(.*?)\]/g, (_, url) => {
    const trimmedUrl = url.trim();
    if (trimmedUrl.includes("youtube.com") || trimmedUrl.includes("youtu.be")) {
      const embedUrl = trimmedUrl.replace("watch?v=", "embed/");
      return `<div class="my-3.5 rounded-2xl overflow-hidden border border-slate-100 dark:border-zinc-800 bg-black aspect-video max-w-xl mx-auto"><iframe class="w-full h-full" src="${embedUrl}" title="Video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe></div>`;
    }
    return `<div class="my-3.5 rounded-2xl p-4 bg-slate-950 border border-slate-800 flex items-center gap-3 text-slate-200 max-w-xl mx-auto">
      <svg class="w-5 h-5 text-sky-400 shrink-0" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" /><path stroke-linecap="round" stroke-linejoin="round" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
      <div class="min-w-0">
        <p class="text-[11px] font-bold text-slate-100 truncate">${trimmedUrl}</p>
        <span class="text-[9px] text-slate-400 font-mono uppercase tracking-wider">Diocesan Video Attachment</span>
      </div>
    </div>`;
  });

  // 2. Embedded Files/Attachments syntax: [file: url|filename] or [file: url]
  html = html.replace(/\[file:\s*(.*?)(?:\|(.*?))?\]/g, (_, url, filename) => {
    const name = filename || url.split('/').pop() || (language === 'vi' ? 'Tài liệu đính kèm.pdf' : 'Attachment.pdf');
    return `<div class="my-3.5 flex items-center justify-between p-3.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100 dark:bg-zinc-900/40 dark:hover:bg-zinc-900/75 border border-slate-100/70 dark:border-zinc-800/80 transition-all shadow-2xs max-w-lg">
      <div class="flex items-center gap-3 min-w-0">
        <div class="h-10 w-10 rounded-xl bg-sky-100 text-sky-600 dark:bg-sky-950/40 dark:text-sky-400 flex items-center justify-center shrink-0">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
        </div>
        <div class="min-w-0">
          <p class="text-xs font-bold text-slate-800 dark:text-zinc-200 truncate pr-2">${name}</p>
          <p class="text-[9px] text-slate-400 font-mono">PDF / Document • ${language === 'vi' ? 'Bấm để tải xuống' : 'Click to download'}</p>
        </div>
      </div>
      <a href="${url.trim()}" target="_blank" rel="noopener noreferrer" class="shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-[10px] font-bold transition shadow-xs">
        <span>${language === 'vi' ? 'Tải tệp' : 'Download'}</span>
      </a>
    </div>`;
  });

  // 3. Headings: # Heading 1 -> styled h1
  html = html.replace(/^(?:#)\s+(.*)$/gm, '<h1 class="text-base md:text-lg font-serif font-extrabold text-slate-900 dark:text-white mt-4 mb-2 leading-tight">$1</h1>');
  // Headings: ## Heading 2 -> styled h2
  html = html.replace(/^(?:##)\s+(.*)$/gm, '<h2 class="text-sm md:text-base font-serif font-bold text-slate-800 dark:text-zinc-200 mt-3.5 mb-1.5 leading-snug">$1</h2>');

  // 4. Bullet Lists: - List item -> styled li
  html = html.replace(/^(?:[-\*])\s+(.*)$/gm, '<li class="ml-5 list-disc pl-1 text-xs text-slate-700 dark:text-zinc-300 my-1">$1</li>');

  // 5. Numbered Lists: 1. List item -> styled li
  html = html.replace(/^(?:\d+\.)\s+(.*)$/gm, '<li class="ml-5 list-decimal pl-1 text-xs text-slate-700 dark:text-zinc-300 my-1">$1</li>');

  // 6. Blockquotes: > quote -> styled blockquote
  html = html.replace(/^>\s+(.*)$/gm, '<blockquote class="border-l-4 border-sky-600 pl-4 py-1.5 italic bg-slate-50 dark:bg-zinc-900/40 rounded-r-xl text-slate-600 dark:text-zinc-400 font-medium my-3">$1</blockquote>');

  // 7. Inline styling tags replacement
  html = html.replace(/<b>(.*?)<\/b>/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
  html = html.replace(/<strong>(.*?)<\/strong>/g, '<strong class="font-bold text-slate-900 dark:text-white">$1</strong>');
  html = html.replace(/<i>(.*?)<\/i>/g, '<em class="italic">$1</em>');
  html = html.replace(/<em>(.*?)<\/em>/g, '<em class="italic">$1</em>');
  html = html.replace(/<u>(.*?)<\/u>/g, '<span class="underline decoration-sky-500/50 decoration-2 underline-offset-2">$1</span>');
  html = html.replace(/<s>(.*?)<\/s>/g, '<span class="line-through text-slate-400 dark:text-zinc-500">$1</span>');
  html = html.replace(/~~(.*?)~~/g, '<span class="line-through text-slate-400 dark:text-zinc-500">$1</span>');
  
  // 8. Links: [text](url) -> styled link
  html = html.replace(/\[(.*?)\]\(((?:https?:\/\/)?.*?)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-sky-600 hover:text-sky-700 dark:text-sky-400 dark:hover:text-sky-300 font-semibold underline decoration-sky-500/30 hover:decoration-sky-500">$1</a>');

  // 9. Horizontal Rule: --- or === -> styled hr
  html = html.replace(/^[-=_]{3,}$/gm, '<hr class="my-4 border-t border-slate-200 dark:border-zinc-800" />');

  // 10. Process double/single newlines to paragraphs (while preserving already parsed block HTML tags)
  const lines = html.split('\n');
  const processedLines = lines.map(line => {
    const trimmed = line.trim();
    if (!trimmed) return '<div class="h-1.5"></div>'; // Empty line spacing
    // If line already starts/ends with block HTML, return as-is
    if (/^<(h1|h2|li|blockquote|div|hr|img)/i.test(trimmed)) {
      return line;
    }
    return `<p class="leading-relaxed text-xs text-slate-700 dark:text-zinc-300 font-medium my-0.5">${line}</p>`;
  });

  return processedLines.join('\n');
};
