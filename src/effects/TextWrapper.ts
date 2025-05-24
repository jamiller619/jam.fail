export type Options = {
  tag?: string
  attributes?: Record<string, string | boolean>
}

/**
 * Wrap text in an HTML wrapper of your choice
 * @param {Object} el - The text element
 * @param {Options} opts - Options object
 * @returns {void} - A function that wraps text in their own tag
 */
export function wrapText<T extends Element>(
  el: T | null,
  opts: Options = { tag: 'span' },
): T | null {
  if (!el) {
    console.warn(`"wrapText" called without a valid element: "${typeof el}"`)

    return null
  }

  const tag = opts.tag ?? 'span'

  const letters = el.textContent?.replace(
    /\S/g,
    `<${tag} ${attributesToString(opts.attributes)}>$&</${tag}>`,
  )

  console.log('letters', letters)

  if (letters) el.innerHTML = letters

  return el
}

/**
 * Converts an object of attributes into an HTML string.
 * @param {Object} attributes - Object with key-value pairs representing HTML attributes.
 * @returns {string} - A string of HTML attributes.
 */
function attributesToString(attributes: Options['attributes']): string {
  return Object.entries(attributes ?? {})
    .filter(([_, value]) => value !== false && value != null)
    .map(([key, value]) => {
      if (value === true) {
        return `${key}` // e.g. `disabled` becomes just `disabled`
      }
      return `${key}="${String(value).replace(/"/g, '&quot;')}"`
    })
    .join(' ')
}
