import type { User } from "./types/User.ts";

/**
 * WIP
 * 
 */
export function mentionify(
    value: string,
    getUserBy: (nickname: string, attribute: string) => User | null,
): string {
    const template = `<span class="badge bg-primary">@{name}</span>`;
    const unknownTemplate = `<span class="fw-bold">@{name}</span>`;
    const mentionRegex = /@(\w|\d)+/gi;
    const mentions = value.match(mentionRegex);

    if (mentions?.length && mentions.length > 0) {
        // Remove duplicates
        const uniqueMentions = mentions.filter((m, i) =>
            mentions.indexOf(m) === i
        );

        for (let i = 0; i < uniqueMentions.length; i++) {
            const elem = uniqueMentions[i];
            const m = elem.substring(1);
            const user = getUserBy(m, "nickname");
            const replRegex = new RegExp(elem, "g");
            let name = m;
            let tpl = unknownTemplate;
            if (user) {
                name = user.name;
                tpl = template;
            }
            value = value.replace(replRegex, tpl.replace("{name}", name));
        }
    }
    return value;
}
