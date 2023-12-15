export const kMarkupPattern = /<!--[\s\S]*?-->|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*?)(\s*)(\/?)>/gi;
export const kInlineCodeTagPattern = (tagName:string) => new RegExp(`(</${tagName}.*?>)`,"gi");

export const kAttributePattern = /(?:^|\s+)([^=\s]+)(?:\s*=\s*((?:(?:'[^']*')|(?:"[^"]*")|\S+)+))?/gi;
