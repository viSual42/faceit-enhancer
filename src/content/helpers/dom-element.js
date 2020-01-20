export const ENHANCER_ATTRIBUTE = 'faceit-enhancer'

export const setFeatureAttribute = (featureName, element) =>
  element.setAttribute(`${ENHANCER_ATTRIBUTE}-${featureName}`, '')

export const hasFeatureAttribute = (featureName, element) => {
  if (element)
    return element.hasAttribute(`${ENHANCER_ATTRIBUTE}-${featureName}`)
  return false
}

export const setStyle = (element, style) =>
  element.setAttribute(
    'style',
    typeof style === 'string' ? `${style}` : style.join(';')
  )
