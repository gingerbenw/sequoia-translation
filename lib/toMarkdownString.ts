import * as yaml from 'js-yaml';

export function toMarkdownString(formValues) {
  return (
    '---\n' +
    yaml.dump(formValues.frontmatter) +
    '---\n' +
    (formValues.markdownBody || '')
  );
}
