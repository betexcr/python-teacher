import { useMemo } from 'react'
import { inlineFormat } from '../lib/inlineMarkdown'
import type { SolutionHighlight } from '../lib/solutionHighlights'
import { SolutionCodeLegend } from './SolutionCodeLegend'
import { annotateSolutionCode as wrapSolutionCodeTokens } from '../utils/annotateSolutionCode'

type Block =
  | { key: string; type: 'h1' | 'h2' | 'h3'; text: string }
  | { key: string; type: 'p'; text: string }
  | { key: string; type: 'ul'; items: string[] }
  | { key: string; type: 'ol'; items: string[] }
  | { key: string; type: 'code'; text: string; lang?: string }
  | { key: string; type: 'table'; header: string[]; rows: string[][] }

function isTableRow(line: string): boolean {
  const trimmed = line.trim()
  return trimmed.startsWith('|') && trimmed.includes('|', 1)
}

function isTableSeparatorRow(line: string): boolean {
  return isTableRow(line) && /^\|[\s\-:|]+\|?$/.test(line.trim())
}

function parseTableRow(line: string): string[] {
  let inner = line.trim()
  if (inner.startsWith('|')) inner = inner.slice(1)
  if (inner.endsWith('|')) inner = inner.slice(0, -1)
  return inner.split('|').map((cell) => cell.trim())
}

function parseTableBlock(lines: string[], start: number): { block: Block; next: number } | null {
  if (!isTableRow(lines[start])) return null

  const tableLines: string[] = []
  let i = start
  while (i < lines.length && isTableRow(lines[i])) {
    tableLines.push(lines[i])
    i++
  }

  if (tableLines.length < 2) return null

  const header = parseTableRow(tableLines[0])
  let bodyStart = 1
  if (tableLines.length > 1 && isTableSeparatorRow(tableLines[1])) {
    bodyStart = 2
  }

  const rows: string[][] = []
  for (const line of tableLines.slice(bodyStart)) {
    if (!isTableSeparatorRow(line)) {
      rows.push(parseTableRow(line))
    }
  }
  if (rows.length === 0) return null

  return {
    block: { key: `table-${start}`, type: 'table', header, rows },
    next: i,
  }
}

function parseMarkdown(source: string): Block[] {
  const blocks: Block[] = []
  const lines = source.replace(/\r\n/g, '\n').split('\n')
  let i = 0
  let inCode = false
  let codeBuf: string[] = []

  let codeLang: string | undefined

  const flushCode = () => {
    if (codeBuf.length) {
      blocks.push({
        key: `code-${blocks.length}-${codeLang ?? 'plain'}-${codeBuf.length}`,
        type: 'code',
        text: codeBuf.join('\n'),
        lang: codeLang,
      })
      codeBuf = []
      codeLang = undefined
    }
  }

  while (i < lines.length) {
    const line = lines[i]

    if (line.startsWith('```')) {
      if (inCode) {
        inCode = false
        flushCode()
      } else {
        flushCode()
        inCode = true
        const info = line.slice(3).trim().toLowerCase()
        codeLang = info || undefined
      }
      i++
      continue
    }

    if (inCode) {
      codeBuf.push(line)
      i++
      continue
    }

    if (line.startsWith('#### ')) {
      blocks.push({ key: `h3-${i}`, type: 'h3', text: line.slice(5) })
      i++
      continue
    }
    if (line.startsWith('### ')) {
      blocks.push({ key: `h3-${i}`, type: 'h3', text: line.slice(4) })
      i++
      continue
    }
    if (line.startsWith('## ')) {
      blocks.push({ key: `h2-${i}`, type: 'h2', text: line.slice(3) })
      i++
      continue
    }
    if (line.startsWith('# ')) {
      blocks.push({ key: `h1-${i}`, type: 'h1', text: line.slice(2) })
      i++
      continue
    }

    if (line.startsWith('- ')) {
      const items: string[] = []
      while (i < lines.length && lines[i].startsWith('- ')) {
        items.push(lines[i].slice(2))
        i++
      }
      blocks.push({ key: `ul-${i - items.length}`, type: 'ul', items })
      continue
    }

    if (/^\d+\.\s/.test(line)) {
      const items: string[] = []
      while (i < lines.length && /^\d+\.\s/.test(lines[i])) {
        items.push(lines[i].replace(/^\d+\.\s/, ''))
        i++
      }
      blocks.push({ key: `ol-${i - items.length}`, type: 'ol', items })
      continue
    }

    if (isTableRow(line)) {
      const parsed = parseTableBlock(lines, i)
      if (parsed) {
        blocks.push(parsed.block)
        i = parsed.next
        continue
      }
    }

    if (line.trim() === '') {
      i++
      continue
    }

    blocks.push({ key: `p-${i}`, type: 'p', text: line })
    i++
  }

  flushCode()
  return blocks
}

const CODE_LANGS_WITH_TOOLTIPS = new Set(['', 'ts', 'tsx', 'js', 'javascript'])

function codeBlockSupportsTooltips(lang?: string): boolean {
  if (!lang) return true
  return CODE_LANGS_WITH_TOOLTIPS.has(lang)
}

type MarkdownViewProps = {
  source: string
  /** Per-token tooltips for fenced code blocks (challenges, system design). */
  solutionHighlights?: SolutionHighlight[]
  codeHighlightLegend?: string
}

export function MarkdownView({
  source,
  solutionHighlights,
  codeHighlightLegend,
}: MarkdownViewProps) {
  const blocks = useMemo(() => parseMarkdown(source), [source])
  const annotateCode = solutionHighlights && solutionHighlights.length > 0

  if (!source.trim()) {
    return <p className="empty-md">No content.</p>
  }

  return (
    <article className={`markdown${annotateCode ? ' markdown--solution' : ''}`}>
      {blocks.map((block) => {
        switch (block.type) {
          case 'h1':
            return <h1 key={block.key}>{inlineFormat(block.text)}</h1>
          case 'h2':
            return <h2 key={block.key}>{inlineFormat(block.text)}</h2>
          case 'h3':
            return <h3 key={block.key}>{inlineFormat(block.text)}</h3>
          case 'p':
            return <p key={block.key}>{inlineFormat(block.text)}</p>
          case 'ul':
            return (
              <ul key={block.key}>
                {block.items.map((item) => (
                  <li key={`${block.key}-${item}`}>{inlineFormat(item)}</li>
                ))}
              </ul>
            )
          case 'ol':
            return (
              <ol key={block.key}>
                {block.items.map((item) => (
                  <li key={`${block.key}-${item}`}>{inlineFormat(item)}</li>
                ))}
              </ol>
            )
          case 'table':
            return (
              <div key={block.key} className="markdown-table-wrap">
                <table>
                  <thead>
                    <tr>
                      {block.header.map((cell) => (
                        <th key={`${block.key}-th-${cell}`}>{inlineFormat(cell)}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row) => (
                      <tr key={`${block.key}-tr-${row.join('\0')}`}>
                        {row.map((cell) => (
                          <td key={`${block.key}-td-${row.join('\0')}-${cell}`}>{inlineFormat(cell)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          case 'code': {
            const useTooltips =
              annotateCode &&
              solutionHighlights &&
              codeBlockSupportsTooltips(block.lang)
            if (useTooltips) {
              return (
                <div key={block.key} className="solution-code-block-wrap">
                  <pre className="solution-code-pre">
                    <code>
                      {wrapSolutionCodeTokens(block.text, solutionHighlights, block.key)}
                    </code>
                  </pre>
                  <SolutionCodeLegend
                    code={block.text}
                    highlights={solutionHighlights}
                    legendLabel={codeHighlightLegend}
                  />
                </div>
              )
            }
            return (
              <pre key={block.key}>
                <code>{block.text}</code>
              </pre>
            )
          }
          default:
            return null
        }
      })}
    </article>
  )
}
