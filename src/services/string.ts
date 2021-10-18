import slugify from 'slugify';

export const slugifyApiError = (message: string): string =>
    slugify(message, { replacement: '_', lower: true, remove: /[*+~.()!:"']/g });

export function getEnumKeyByEnumValue<T extends { [index: string]: string }>(
    enumValues: T,
    enumValue: string,
): keyof T | null {
    const keys = Object.keys(enumValues).filter((x) => enumValues[x] === enumValue);
    return keys.length > 0 ? keys[0] : null;
}

export const kebabize = (str: string): string =>
    str
        .split('')
        .map((letter, idx) =>
            letter.toUpperCase() === letter ? `${idx !== 0 ? '-' : ''}${letter.toLowerCase()}` : letter,
        )
        .join('');
