export function linkParser(text, entities) {
  let htmlString = text;

  if (!entities?.length > 0) return text;
  // Sort entities by offset in descending order to avoid messing up indices when replacing
  const sortedEntities = entities.sort((a, b) => b.offset - a.offset);

  // Iterate through each entity and replace the corresponding text with an HTML link
  for (let entity of sortedEntities) {
    if (entity.type !== 'text_link') {
      continue;
    }
    const { offset, length, url } = entity;
    const linkText = htmlString.substring(offset, offset + length);
    const link = `<a href="${url}">${linkText}</a>`;
    htmlString = htmlString.replace(linkText, link);
  }

  return htmlString;
}
