import { ReferenceItem, CitationStyleType, CitationValidationWarning } from '../types';

export function formatInTextCitation(
  ref: ReferenceItem,
  style: CitationStyleType = 'apa',
  citationIndex: number = 1
): string {
  const authors = ref.authors;
  const year = ref.year || 'n.d.';

  if (style === 'ieee') {
    return `[${citationIndex}]`;
  }

  let authorPart = 'Anonymous';
  if (authors && authors.length > 0) {
    const firstAuthor = authors[0].split(',')[0].trim().split(' ').pop() || authors[0];
    if (authors.length === 1) {
      authorPart = firstAuthor;
    } else if (authors.length === 2) {
      const secondAuthor = authors[1].split(',')[0].trim().split(' ').pop() || authors[1];
      authorPart = style === 'mla' ? `${firstAuthor} and ${secondAuthor}` : `${firstAuthor} & ${secondAuthor}`;
    } else {
      authorPart = `${firstAuthor} et al.`;
    }
  }

  switch (style) {
    case 'apa':
      return `(${authorPart}, ${year})`;
    case 'harvard':
      return `(${authorPart} ${year})`;
    case 'mla':
      return `(${authorPart} ${ref.pages ? ref.pages.split('-')[0].trim() : year})`;
    case 'chicago':
      return `(${authorPart} ${year})`;
    default:
      return `(${authorPart}, ${year})`;
  }
}

export function formatBibliographyEntry(
  ref: ReferenceItem,
  style: CitationStyleType = 'apa',
  citationIndex: number = 1
): string {
  const authorList = ref.authors.join(', ');
  const year = ref.year || 'n.d.';
  const title = ref.title;
  const journalOrBook = ref.journal || ref.booktitle || '';
  const vol = ref.volume ? ` ${ref.volume}` : '';
  const issue = ref.issue ? `(${ref.issue})` : '';
  const pages = ref.pages ? `: ${ref.pages}` : '';
  const doi = ref.doi ? ` https://doi.org/${ref.doi}` : '';

  switch (style) {
    case 'apa':
      // Author, A. A. (Year). Title of article. Title of Periodical, volume(issue), pages. DOI
      return `${authorList} (${year}). ${title}. ${journalOrBook ? `${journalOrBook}${vol}${issue}${pages}.` : ''}${doi}`;

    case 'ieee':
      // [#] A. Author, "Title of paper," Abbrev. Title of Periodical, vol. x, no. x, pp. xxx-xxx, Year.
      return `[${citationIndex}] ${authorList}, "${title}," ${journalOrBook ? `${journalOrBook}, ` : ''}${ref.volume ? `vol. ${ref.volume}, ` : ''}${ref.issue ? `no. ${ref.issue}, ` : ''}${ref.pages ? `pp. ${ref.pages}, ` : ''}${year}.${doi}`;

    case 'mla':
      // Author. "Title of Source." Title of Container, vol. Number, no. Number, Year, Location.
      return `${authorList}. "${title}." ${journalOrBook ? `${journalOrBook}, ` : ''}${ref.volume ? `vol. ${ref.volume}, ` : ''}${ref.issue ? `no. ${ref.issue}, ` : ''}${year}${ref.pages ? `, pp. ${ref.pages}` : ''}.${doi}`;

    case 'chicago':
      // Author. Year. "Title of Article." Journal Title Volume (Issue): Pages.
      return `${authorList}. ${year}. "${title}." ${journalOrBook} ${ref.volume ? ref.volume : ''}${issue}${pages}.${doi}`;

    case 'harvard':
      // Author, Year. Title. Journal, Volume(Issue), pp. Pages.
      return `${authorList}, ${year}. ${title}. ${journalOrBook}, ${ref.volume || ''}${issue}, pp.${ref.pages || 'n/a'}.${doi}`;

    default:
      return `${authorList} (${year}). ${title}. ${journalOrBook}.${doi}`;
  }
}

export function generateBibtex(ref: ReferenceItem): string {
  const key = ref.citationKey || `${ref.authors[0]?.split(' ').pop()?.toLowerCase() || 'ref'}${ref.year || '2024'}`;
  const lines = [
    `@${ref.entryType || 'article'}{${key},`,
    `  title = {${ref.title}},`,
    `  author = {${ref.authors.join(' and ')}},`,
    `  year = {${ref.year || 2024}},`,
  ];

  if (ref.journal) lines.push(`  journal = {${ref.journal}},`);
  if (ref.booktitle) lines.push(`  booktitle = {${ref.booktitle}},`);
  if (ref.volume) lines.push(`  volume = {${ref.volume}},`);
  if (ref.issue) lines.push(`  number = {${ref.issue}},`);
  if (ref.pages) lines.push(`  pages = {${ref.pages}},`);
  if (ref.publisher) lines.push(`  publisher = {${ref.publisher}},`);
  if (ref.doi) lines.push(`  doi = {${ref.doi}},`);
  if (ref.url) lines.push(`  url = {${ref.url}},`);

  lines.push('}');
  return lines.join('\n');
}

export function parseBibtexEntry(rawBibtex: string): Partial<ReferenceItem> | null {
  try {
    const trimmed = rawBibtex.trim();
    const typeMatch = trimmed.match(/^@(\w+)\s*\{\s*([^,]+),/i);
    if (!typeMatch) return null;

    const entryType = typeMatch[1].toLowerCase() as ReferenceItem['entryType'];
    const citationKey = typeMatch[2].trim();

    const getField = (field: string): string => {
      const regex = new RegExp(`${field}\\s*=\\s*[{"']([^}"']+)["'}]`, 'i');
      const match = trimmed.match(regex);
      return match ? match[1].trim() : '';
    };

    const title = getField('title') || 'Untitled Reference';
    const authorStr = getField('author') || 'Unknown Author';
    const authors = authorStr.split(/\s+and\s+/i).map(a => a.trim());
    const yearStr = getField('year');
    const year = yearStr ? parseInt(yearStr, 10) : new Date().getFullYear();
    const journal = getField('journal');
    const booktitle = getField('booktitle');
    const volume = getField('volume');
    const issue = getField('number') || getField('issue');
    const pages = getField('pages');
    const publisher = getField('publisher');
    const doi = getField('doi');
    const url = getField('url');

    return {
      citationKey,
      entryType: ['article', 'book', 'inproceedings', 'techreport'].includes(entryType) ? entryType : 'article',
      title,
      authors,
      year: isNaN(year) ? 2024 : year,
      journal,
      booktitle,
      volume,
      issue,
      pages,
      publisher,
      doi,
      url,
      bibtex: rawBibtex,
    };
  } catch (err) {
    console.error('Error parsing BibTeX:', err);
    return null;
  }
}

export function validateReferences(references: ReferenceItem[]): CitationValidationWarning[] {
  const warnings: CitationValidationWarning[] = [];
  const seenKeys = new Set<string>();

  for (const ref of references) {
    const missing: string[] = [];
    if (!ref.title || ref.title.trim().length === 0) missing.push('Title');
    if (!ref.authors || ref.authors.length === 0 || ref.authors[0] === 'Unknown Author') missing.push('Author(s)');
    if (!ref.year || isNaN(ref.year)) missing.push('Year');
    if (!ref.doi && !ref.url && ref.entryType === 'article') missing.push('DOI/URL');

    if (missing.length > 0) {
      warnings.push({
        referenceId: ref.id,
        referenceTitle: ref.title || 'Untitled Reference',
        missingFields: missing,
        severity: missing.includes('Title') || missing.includes('Author(s)') ? 'error' : 'warning',
      });
    }

    if (seenKeys.has(ref.citationKey)) {
      warnings.push({
        referenceId: ref.id,
        referenceTitle: ref.title,
        missingFields: [`Duplicate citation key: "${ref.citationKey}"`],
        severity: 'error',
      });
    }
    seenKeys.add(ref.citationKey);
  }

  return warnings;
}

