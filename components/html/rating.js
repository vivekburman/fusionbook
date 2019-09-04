function checkVal (str) {
  if (Number.parseInt(str) < 10) {
    return true
  }
  return false
}
function checkColorCode (str) {
  if (str.startsWith('#') && !(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i.test(str))) {
    return false
  } else if (str.startsWith('rgb') && !(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})\)/.test(str))) {
    return false
  }
  return true
}
function validate (args) {
  let result = {}
  // 1. height
  if (args['height'] && ((typeof args['height'] === 'number' && args['height'] < 10) || ((typeof args['height'] === 'string' && args['height'].endsWith('px') && checkVal(args['height'].substr(0, args['height'].lastIndexOf('px')))) || (args['height'].endsWith('%') && checkVal(args['height'].substr(0, args['height'].lastIndexOf('%'))))))) {
    result.height = 'error'
    console.warn('height value is not proper')
  }
  // 2. width
  if (args.width && ((typeof args.width === 'number' && args.width < 10) || ((typeof args.width === 'string' && args.width.endsWith('px') && checkVal(args.width.substr(0, args.width.lastIndexOf('px')))) || (args.width.endsWith('%') && checkVal(args.width.substr(0, args.width.lastIndexOf('%'))))))) {
    result.width = 'error'
    console.warn('width value is not proper')
  }
  // 3. ratingFill
  if (args.ratingFilld && checkColorCode(args.ratingFill) === false) {
    result.ratingFill = 'error'
    console.warn('ratingFill color value is not proper')
  }
  // 4. nonRatingFill
  if (args.nonRatingFill && checkColorCode(args.nonRatingFill) === false) {
    result.nonRatingFill = 'error'
    console.warn('nonRatingFill color value is not proper')
  }
  // 5. orientation
  if (args.orientation && args.orientation !== 'l2r' && args.orientation !== 'r2l' && args.orientation !== 't2b' && args.orientation !== 'b2t') {
    result.orientation = 'error'
    console.warn('orientation value is not proper')
  }
  // 6. ratingStroke
  if (args.ratingStroke && checkColorCode(args.ratingStroke) === false) {
    result.ratingStroke = 'error'
    console.warn('ratingStroke color value is not proper')
  }
  // 7. nonRatingStroke
  if (args.nonRatingStroke && checkColorCode(args.nonRatingStroke) === false) {
    result.nonRatingStroke = 'error'
    console.warn('nonRatingStroke color value is not proper')
  }
  // 8. stroke-width
  if (args.strokeWidth && (Number.isNaN(args.strokeWidth) || args.strokeWidth < 0)) {
    result.strokeWidth = 'error'
    console.warn('strokeWidth value is improper')
  }
  // 9. justify-content
  if (args.justifyContent && args.justifyContent !== 'center' && args.justifyContent !== 'start' && args.justifyContent !== 'end' && args.justifyContent !== 'stretch') {
    result.justifyContent = 'error'
    console.warn('justifyContent value is not proper')
  }
  // 10. padding
  if (args.padding && (Number.isNaN(args.padding) || args.padding < 0)) {
    result.padding = 'error'
    console.warn('Padding value is improper')
  }
  // 11. numberOfStars
  if (args.numberOfStars) {
    if ((Number.isNaN(args.numberOfStars) || args.numberOfStars < 0)) {
      result.numberOfStars = 'error'
      console.warn('numberOfStars value is improper')
    }
  }
  // 12. rating
  if (args.rating && (Number.isNaN(args.rating) || args.rating < 0)) {
    result.rating = 'error'
    console.warn('Fallback to default rating value, as passed value is incorrect')
  }
  return result
}
function createDOMNode () {
  const xlmnsSvg = 'http://www.w3.org/2000/svg'
  let nodeName = arguments[0]
  let attrbutes = arguments[1]
  let node = document.createElementNS(xlmnsSvg, nodeName)
  for (let property in attrbutes) {
    node.setAttribute(property, attrbutes[property])
  }
  return node
}

function calculateStar (domObject, offsetWidth, offsetHeight, width, height, strokeWidth) {
  let r = Math.min(height, width) - strokeWidth
  if (strokeWidth > r / 10) {
    domObject.setAttribute('stroke-width', 2)
    console.warn('StrokeWidth crossed max, setting to default')
  }
  let cx = r / 2 + offsetWidth
  let cy = r / 2 + offsetHeight
  let offsetX = r / 3
  let offsetY = r / 3
  let d = 'M' + cx + ',' + offsetHeight + ' ' +
      'L' + (cx + offsetX) + ',' + (offsetHeight + offsetY) + ' ' +
      'H' + (r + offsetWidth) + ' ' +
      'L' + (cx + offsetX) + ',' + (cy + offsetY / 2) + ' ' +
      'L' + (r + offsetWidth) + ',' + (r + offsetHeight) + ' ' +
      'L' + cx + ',' + (cy + offsetY) + ' ' +
      'L' + offsetWidth + ',' + (r + offsetHeight) + ' ' +
      'L' + (cx - offsetX) + ',' + (cy + offsetY / 2) + ' ' +
      'L' + offsetWidth + ',' + (offsetY + offsetHeight) + ' ' +
      'H' + (cx - offsetX) + ' ' +
      'Z'

  domObject.setAttribute('d', d)
}
function calculateOrientation (path, args, reverseOffset) {
  if (args.orientation === 'l2r' || args.orientation === 't2b') {
    if (args.rating >= 1) {
      path.setAttribute('fill', args.ratingFill)
      path.setAttribute('stroke', args.ratingStroke)
      args.rating -= 1
    } else if (args.rating > 0 && args.rating < 1) {
      path.setAttribute('fill', 'url(#gradient-svg-fill)')
      path.setAttribute('stroke', 'url(#gradient-svg-stroke)')
      args.rating -= 1
    } else {
      path.setAttribute('fill', args.nonRatingFill)
      path.setAttribute('stroke', args.nonRatingStroke)
    }
  } else if (args.orientation === 'r2l' || args.orientation === 'b2t') {
    let gradientFill = document.getElementById('gradient-svg-fill')
    gradientFill.setAttribute('offset', reverseOffset)
    let gradientStroke = document.getElementById('gradient-svg-stroke')
    gradientStroke.setAttribute('offset', reverseOffset)
    if (args.rating >= 1) {
      path.setAttribute('fill', args.nonRatingFill)
      path.setAttribute('stroke', args.nonRatingStroke)
      args.rating -= 1
    } else if (args.rating > 0 && args.rating < 1) {
      path.setAttribute('fill', 'url(#gradient-svg-fill)')
      path.setAttribute('stroke', 'url(#gradient-svg-stroke)')
      args.rating -= 1
    } else {
      path.setAttribute('fill', args.ratingFill)
      path.setAttribute('stroke', args.ratingStroke)
    }
  }
}
function createStar (container, args) {
  let attr = {
    'width': args.width,
    'height': args.height
  }
  let svg = createDOMNode('svg', attr)
  container.appendChild(svg)
  let ratingOffset = args.rating.toString().split('.')[1]
  if (ratingOffset.length === 1) {
    ratingOffset += '0'
  } else if (ratingOffset.length > 2) {
    ratingOffset = (Number.parseInt(ratingOffset) / 100).toString()
  }
  let reverseOffset = 100 - Number.parseInt(ratingOffset)
  ratingOffset += '%'
  reverseOffset = reverseOffset.toString() + '%'
  let def = createDOMNode('defs', null)
  svg.appendChild(def)
  let argGradient = {
    'id': 'gradient-svg-fill',
    'x1': '0%',
    'x2': '100%',
    'y1': '0%',
    'y2': '0%'
  }
  let linearGradient = createDOMNode('linearGradient', argGradient)
  def.appendChild(linearGradient)
  argGradient = {
    'offset': ratingOffset,
    'stop-color': args.ratingFill
  }
  let stop = createDOMNode('stop', argGradient)
  linearGradient.appendChild(stop)
  argGradient = {
    'offset': ratingOffset,
    'stop-color': args.nonRatingFill
  }
  stop = createDOMNode('stop', argGradient)
  linearGradient.appendChild(stop)
  // end of fill
  argGradient = {
    'id': 'gradient-svg-stroke',
    'x1': '0%',
    'x2': '100%',
    'y1': '0%',
    'y2': '0%'
  }
  linearGradient = createDOMNode('linearGradient', argGradient)
  def.appendChild(linearGradient)
  argGradient = {
    'offset': ratingOffset,
    'stop-color': args.ratingStroke
  }
  stop = createDOMNode('stop', argGradient)
  linearGradient.appendChild(stop)
  argGradient = {
    'offset': ratingOffset,
    'stop-color': args.nonRatingStroke
  }
  stop = createDOMNode('stop', argGradient)
  linearGradient.appendChild(stop)
  let width = svg.clientWidth
  let height = svg.clientHeight
  let path
  for (let i = 0; i < args.numberOfStars; i++) {
    path = createDOMNode('path', attr)
    svg.appendChild(path)
    let offset
    if (args.orientation === 'l2r' || args.orientation === 'r2l') {
      offset = width / args.numberOfStars * i + args.strokeWidth
      calculateStar(path, offset, 0, (width - args.strokeWidth * 4) / args.numberOfStars, height, args.strokeWidth)
    } else if (args.orientation === 't2b' || args.orientation === 'b2t') {
      offset = args.height / args.numberOfStars * i + args.strokeWidth
      calculateStar(path, 0, offset, width, (height - args.strokeWidth * 4) / args.numberOfStars, args.strokeWidth)
    }
    calculateOrientation(path, args, reverseOffset, ratingOffset)
  }
}
export default class RatingChart {
  constructor (container, args = {}) {
    debugger;
    this.height = args['height'] ? args['height'] : 400
    this.width = args['width'] ? args['width'] : 400
    this.ratingFill = args['ratingFill'] ? args['ratingFill'] : '#ff0'
    this.nonRatingFill = args['nonRatingFill'] ? args['nonRatingFill'] : '#ddd'
    this.orientation = args['orientation'] ? args['orientation'] : 'l2r'
    this.ratingStroke = args['ratingStroke'] ? args['ratingStroke'] : 'none'
    this.nonRatingStroke = args['nonRatingStroke'] ? args['nonRatingStroke'] : 'none'
    this.strokeWidth = args['stroke-width'] ? args['storke-width'] : 1
    this.justifyContent = args['justify-content'] ? args['justify-content'] : 'center'
    this.padding = args['padding'] ? args['padding'] : 2
    this.numberOfStars = args['numberOfStars'] ? args['numberOfStars'] : 5
    this.rating = args['rating'] ? args['rating'] : this.numberOfStars
    this.args = {
      'height': this.height,
      'width': this.width,
      'ratingFill': this.rating,
      'nonRatingFill': this.nonRatingFill,
      'orientation': this.orientation,
      'ratingStroke': this.ratingStroke,
      'nonRatingStroke': this.nonRatingStroke,
      'stroke-width': this.strokeWidth,
      'justify-content': this.justifyContent,
      'padding': this.padding,
      'numberOfStars': this.numberOfStars,
      'rating': this.rating
    }
    this.result = validate.call(this, this.args)
    // 1. height
    if (this.result.height) {
      this.height = 400
    }
    // 2. width
    if (this.result.width) {
      this.width = 400
    }
    // 3. ratingFill
    if (this.result.ratingFill) {
      this.ratingFill = '#ff0'
    }
    // 4. nonRatingFill
    if (this.result.nonRatingFill || this.ratingFill === this.nonRatingFill) {
      this.nonRatingFill = '#ddd'
    }
    // 5. orientationthis
    if (this.result.orientation) {
      this.orientation = 'l2r'
    }
    // 6. ratingStroke
    if (this.result.ratingStroke) {
      this.ratingStroke = 'none'
    }
    // 7. nonRatingStroke
    if (this.result.nonRatingStroke || this.ratingStroke === this.nonRatingStroke) {
      this.nonRatingStroke = 'none'
    }
    // 8. stroke-width
    if (this.result.strokeWidth) {
      this.strokeWidth = 2
    }
    // 9. justify-content
    if (this.result.justifyContent) {
      this.result.justifyContent = 'center'
    }
    // 10. padding
    if (this.result.padding) {
      this.result.padding = 2
    }
    // 11. numberOfStars
    if (this.result.numberOfStars) {
      this.result.numberOfStars = 5
    }
    // 12. rating
    if (this.numberOfStars < this.rating || this.result.rating) {
      this.rating = this.numberOfStars
      console.warn('Error numberOfStars cannot be less than rating')
    }
    createStar(container, this.args)
  }
  update (args) {
    if (this.result.height) {
      args.height = this.height
    }
    // 2. width
    if (this.result.width) {
      args.width = this.width
    }
    // 3. ratingFill
    if (this.result.ratingFill) {
      args.ratingFill = this.ratingFill
    }
    // 4. nonRatingFill
    if (this.result.nonRatingFill || this.ratingFill === args.nonRatingFill) {
      args.nonRatingFill = this.nonRatingFill
    }
    // 5. orientation
    if (this.result.orientation) {
      args.orientation = this.orientation
    }
    // 6. ratingStroke
    if (this.result.ratingStroke) {
      args.ratingStroke = this.ratingStroke
    }
    // 7. nonRatingStroke
    if (this.result.nonRatingStroke || this.ratingStroke === args.nonRatingStroke) {
      args.nonRatingStroke = this.nonRatingStroke
    }
    // 8. stroke-width
    if (this.result.strokeWidth) {
      args.strokeWidth = this.strokeWidth
    }
    // 9. justify-content
    if (this.result.justifyContent) {
      args.justifyContent = this.justifyContent
    }
    // 10. padding
    if (this.result.padding) {
      args.padding = this.padding
    }
    // 11. numberOfStars
    if (this.result.numberOfStars) {
      args.numberOfStars = this.numberOfStars
    }
    // 12. rating
    if (this.result.rating) {
      if (!args.numberOfStars && this.numberOfStars < args.rating) {
        args.rating = this.numberOfStars
        console.warn('Number of stars is less than rating')
      } else if (args.numberOfStars < args.rating) {
        args.rating = args.numberOfStars
        console.warn('Number of stars is less than rating')
      }
    }
  }
}
