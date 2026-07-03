/** Remove sections rendered interactively in the app (acceptance + resources). */
export function stripInteractiveSections(markdown: string): string {
  let body = markdown.replace(/\r\n/g, '\n');

  body = body.replace(/\n## Acceptance criteria[\s\S]*?(?=\n## [^\n]+\n|$)/, '\n');
  body = body.replace(/\n## Resources[\s\S]*$/, '');

  return body.trim();
}
