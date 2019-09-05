let ratingElements = []
let nonRatingElements = []
let gradientElement

function checkVal (str) {
  if (Number.parseInt(str) < 10) {
    return true
  }
  return false
}
function checkColorCode (str) {
  if (str.startsWith('#') && !(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9a-f]{6}$)|(^#[0-9a-f]{3}$) /i.test(str))) {
    return false
  } else if (str.startsWith('rgb') && !(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i.test(str))) {
    return false
  }
  return true
}
function numericalValfunc (obj) {
  if (typeof obj === 'number') {
    return obj
  } else if (obj.endsWith('px')) {
    return Number.parseInt(obj.substr(0, obj.lastIndexOf('px')))
  } else if (obj.endsWith('%')) {
    return Number.parseInt(obj.substr(0, obj.lastIndexOf('%')))
  }
}
function checkConfiguration (obj, flag, args = undefined) {
  if (args === undefined) {
    args = obj
  }
  let width = numericalValfunc(obj.width)
  let height = numericalValfunc(obj.height)
  let numberOfStars = flag.structure.numberOfStars === 1 ? args.numberOfStars : obj.numberOfStars
  let padding = flag.structure.padding === 1 ? args.padding : obj.padding
  let orientation = flag.structure.orientation === 1 ? args.orientation : obj.orientation
  let strokeWidth = flag.structure.strokeWidth === 1
  let block
  if (orientation === 'l2r' || orientation === 'r2l') {
    block = Math.min(height, width / numberOfStars)
  }
  if (orientation === 't2b' || orientation === 'b2t') {
    block = Math.min(height / numberOfStars, width)
  }
  if (padding / block > 0.1) {
    console.error('Padding has crossed max value')
    return false
  }
  if (strokeWidth / block > 0.05) {
    console.error('StrokeWidth has crossed max value')
    return false
  }
  if (block - 2 * padding - 0.5 * strokeWidth < 5) {
    console.error('Given configuration violates star size')
    return false
  }
  return true
}
function ratingFill (domObject, fillValue, property = 'fill') {
  domObject.setAttribute(property, fillValue)
}
function ratingStroke (domObject, fillValue, property = 'stroke') {
  domObject.setAttribute(property, fillValue)
}
function fillnStroke (obj, property, color) {
  obj.forEach((e) => {
    let element = document.getElementById(e.toString())
    if (property.endsWith('Fill')) {
      ratingFill(element, color)
    } else {
      ratingStroke(element, color)
    }
  })
  gradientElement = document.getElementById(property)
  if (gradientElement) {
    if (property.endsWith('Fill')) {
      ratingFill(gradientElement, color, 'stop-color')
    } else {
      ratingStroke(gradientElement, color, 'stop-color')
    }
  }
}
function validate (args, obj = undefined) {
  // height
  let flag = {
    'structure': {
      'height': 0,
      'width': 0,
      'padding': 0,
      'justifyContent': 0,
      'alignItem': 0,
      'orientation': 0,
      'numberOfStars': 0
    },
    'style': {
      'ratingFill': 0,
      'nonRatingFill': 0,
      'ratingStroke': 0,
      'nonRatingStroke': 0,
      'strokeWidth': 0,
      'rating': 0
    }
  }
  if (args.height) {
    if (((typeof args.height === 'number' && args.height < 10) ||
      ((typeof args.height === 'string' && args.height.endsWith('px') &&
        checkVal(args.height.substr(0, args.height.lastIndexOf('px')))) ||
        (typeof args.height === 'string' && args.height.endsWith('%') &&
          checkVal(args.height.substr(0, args.height.lastIndexOf('%'))))))) {
      if (!obj) {
        args.height = 400
      }
      console.warn('height value is not proper')
    } else if (obj) {
      obj.height = args.height
      flag.structure.height = 1
    }
  }
  // width
  if (args.width) {
    if (((typeof args.width === 'number' && args.width < 10) ||
      ((typeof args.width === 'string' && args.width.endsWith('px') && checkVal(args.width.substr(0, args.width.lastIndexOf('px')))) ||
        (typeof args.width === 'string' && args.width.endsWith('%') && checkVal(args.width.substr(0, args.width.lastIndexOf('%'))))))) {
      if (!obj) {
        args.width = 400
      }
      console.warn('width value is not proper')
    } else if (obj) {
      obj.width = args.width
      flag.structure.width = 1
    }
  }
  // ratingFill
  if (args.ratingFill) {
    if (checkColorCode(args.ratingFill) === false) {
      if (!obj) {
        args.ratingFill = '#ff0'
      }
      console.warn('ratingFill color value is not proper')
    } else if (obj) {
      obj.ratingFill = args.ratingFill
      flag.style.ratingFill = 1
    }
  }
  // nonRatingFill
  if (args.nonRatingFill) {
    if (checkColorCode(args.nonRatingFill) === false) {
      if (!obj) {
        args.nonRatingFill = '#ddd'
      }
      console.warn('nonRatingFill color value is not proper')
    } else if (obj) {
      obj.nonRatingFill = args.nonRatingFill
      flag.style.nonRatingFill = 1
    }
  }
  //  ratingStroke
  if (args.ratingStroke) {
    if (checkColorCode(args.ratingStroke) === false) {
      if (!obj) {
        args.ratingStroke = 'none'
      }
      console.warn('ratingStroke color value is not proper')
    } else if (obj) {
      obj.ratingStroke = args.ratingStroke
      flag.style.ratingStroke = 1
    }
  }
  // 7. nonRatingStroke
  if (args.nonRatingStroke) {
    if (checkColorCode(args.nonRatingStroke) === false) {
      if (!obj) {
        args.nonRatingStroke = 'none'
      }
      console.warn('nonRatingStroke color value is not proper')
    } else if (obj) {
      obj.nonRatingStroke = args.nonRatingStroke
      flag.style.nonRatingStroke = 1
    }
    //  orientation
  }
  if (args.orientation) {
    if (args.orientation !== 'l2r' && args.orientation !== 'r2l' && args.orientation !== 't2b' && args.orientation !== 'b2t') {
      if (!obj) {
        args.orientation = 'l2r'
      }
      console.warn('orientation value is not proper')
    } else if (obj) {
      if (((args.orientation === 'l2r' || args.orientation === 'r2l') &&
        (obj.orientation === 't2b' || obj.orientation === 'b2t')) ||
        ((args.orientation === 't2b' || args.orientation === 'b2t') &&
          (obj.orientation === 'l2r' || obj.orientation === 'r2l'))) {
        flag.structure.orientation = 1
      }
    }
  }
  //  stroke-width
  if (args.strokeWidth) {
    if (typeof args.strokeWidth !== 'number' || args.strokeWidth < 0) {
      if (!obj) {
        args.strokeWidth = 1
      }
      console.warn('strokeWidth value is improper')
    } else if (obj) {
      // if stroke-width can be applied then apply
      // i.e strokkeWidth has a range of 1px to 10%
      flag.style.strokeWidth = 1
    }
  }
  //  justify-content
  if (args.justifyContent) {
    if (args.justifyContent !== 'center' && args.justifyContent !== 'start' &&
      args.justifyContent !== 'end' && args.justifyContent !== 'space-evenly') {
      if (!obj) {
        args.justifyContent = 'center'
      }
      console.warn('justifyContent value is not proper')
    } else if (obj) {
      obj.justifyContent = args.justifyContent
      flag.structure.justifyContent = 1
    }
  }
  // alignItem
  if (args.alignItem) {
    if (args.alignItem !== 'center' && args.justifyContent !== 'start' &&
      args.justifyContent !== 'end') {
      if (!obj) {
        args.alignItem = 'center'
      }
      console.warn('alignItem value is not proper')
    } else if (obj) {
      obj.alignItem = args.alignItem
      flag.structure.alignItem = 1
    }
  }
  //  padding
  if (args.padding) {
    if (typeof args.padding !== 'number' || args.padding < 0) {
      if (!obj) {
        args.padding = 2
      }
      console.warn('Padding value is improper')
    } else if (obj) {
      // if padding can be applied then apply
      // i.e padding has a range of 2px to 10%
      flag.structure.padding = 1
    }
  }
  // numberOfStars
  if (args.numberOfStars) {
    if (typeof args.numberOfStars !== 'number' || args.numberOfStars < 0) {
      args.numberOfStars = 5
      console.warn('numberOfStars value is improper')
    } else {
      // if star cannot get a space of atleast 5px then its a break
      args.numberOfStars = Math.floor(args.numberOfStars)
      flag.structure.numberOfStars = 1
    }
  }
  if (args.rating) {
    if (typeof args.rating !== 'number' || args.rating < 0 ||
    (args.numberOfStars && (args.numberOfStars < args.rating)) ||
       (obj && obj.numberOfStars < args.rating)) {
      args.rating = undefined
      if (obj) {
        obj.rating = args.rating
      }
      flag.style.rating = 1
      console.warn('Fallback to default rating value, as passed value is incorrect')
    } else if (obj) {
      obj.rating = args.rating
      flag.style.rating = 1
    }
  }
  if (obj && checkConfiguration(obj, flag, args)) {
    return flag
  } else if (!obj && checkConfiguration(args, flag)) {
    return flag
  } else {
    console.error('The configuration is not possible')
    return false
  }
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

function calculateStar (domObject, offsetWidth, offsetHeight, r, strokeWidth, padding) {
  r -= (strokeWidth + 2 * padding)
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

// it is used to set rating along l2r and t2b
function orientationAlongPositiveAxis (path, args, i, rating) {
  if (rating === undefined || Number.isNaN(rating)) {
    ratingFill(path, args.ratingFill)
    ratingStroke(path, args.ratingStroke)
    ratingElements.push(i)
    return
  }
  if (rating >= 1) {
    ratingFill(path, args.ratingFill)
    ratingStroke(path, args.ratingStroke)
    ratingElements.push(i)
  } else if (rating > 0 && rating < 1) {
    ratingFill(path, 'url(#gradient-svg-fill)')
    ratingStroke(path, 'url(#gradient-svg-stroke)')
    gradientElement = i
  } else {
    ratingFill(path, args.nonRatingFill)
    ratingStroke(path, args.nonRatingStroke)
    nonRatingElements.push(i)
  }
}
// it is used to set rating along b2t and r2l
function orientationAlongNegativeAxis (path, args, i, reverseOffset) {
  if (reverseOffset === undefined || Number.isNaN(reverseOffset)) {
    ratingFill(path, args.ratingFill)
    ratingStroke(path, args.ratingStroke)
    ratingElements.push(i)
    return
  }
  if (args.numberOfStars - reverseOffset >= 1) {
    ratingFill(path, args.nonRatingFill)
    ratingStroke(path, args.nonRatingStroke)
    nonRatingElements.push(i)
  } else if (args.numberOfStars - reverseOffset > 0 && args.numberOfStars - reverseOffset < 1) {
    ratingFill(path, 'url(#gradient-svg-fill)')
    ratingStroke(path, 'url(#gradient-svg-stroke)')
    gradientElement = i
  } else {
    ratingFill(path, args.ratingFill)
    ratingStroke(path, args.ratingStroke)
    ratingElements.push(i)
  }
}
function emptyContainer (container) {
  while (container.hasChildNodes()) {
    container.removeChild(container.firstChild)
  }
  ratingElements.length = 0
  nonRatingElements.length = 0
  gradientElement = null
}
function calculateJustify (e, justify, spacing, numberOfStars) {
  if (justify === 'start') {
    return 0
  } else if (justify === 'end') {
    return e - spacing * numberOfStars
  } else if (justify === 'center') {
    return (e - spacing * numberOfStars) / 2
  } else if (justify === 'space-evenly') {
    return (e - spacing * numberOfStars) / (2 * numberOfStars)
  }
}
function calculateAlign (e, align, spacing) {
  if (align === 'start') {
    return 0
  } else if (align === 'end') {
    return e - spacing
  } else if (align === 'center') {
    return (e - spacing) / 2
  }
}
function createLinearGradient (svg, args, ratingOffset) {
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
    'stop-color': args.ratingFill,
    'id': 'ratingFill'
  }
  let stop = createDOMNode('stop', argGradient)
  linearGradient.appendChild(stop)
  argGradient = {
    'offset': ratingOffset,
    'stop-color': args.nonRatingFill,
    'id': 'nonRatingFill'
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
    'stop-color': args.ratingStroke,
    'id': 'ratingStroke'
  }
  stop = createDOMNode('stop', argGradient)
  linearGradient.appendChild(stop)
  argGradient = {
    'offset': ratingOffset,
    'stop-color': args.nonRatingStroke,
    'id': 'nonRatingStroke'
  }
  stop = createDOMNode('stop', argGradient)
  linearGradient.appendChild(stop)
}
function updateLinearGradient (args, ratingOffset) {
  let ratingFill = document.getElementById('ratingFill')
  let ratingStroke = document.getElementById('ratingStroke')
  let nonRatingFill = document.getElementById('nonRatingFill')
  let nonRatingStroke = document.getElementById('nonRatingStroke')
  if (args.orientation === 'l2r' || args.orientation === 't2b') {
    ratingFill.setAttribute('offset', ratingOffset)
    ratingFill.setAttribute('stop-color', args.ratingFill)

    nonRatingFill.setAttribute('offset', ratingOffset)
    nonRatingFill.setAttribute('stop-color', args.nonRatingFill)

    ratingStroke.setAttribute('offset', ratingOffset)
    ratingStroke.setAttribute('stop-color', args.ratingStroke)

    nonRatingStroke.setAttribute('offset', ratingOffset)
    nonRatingStroke.setAttribute('stop-color', args.nonRatingStroke)
  } else {
    ratingFill.setAttribute('offset', ratingOffset)
    ratingFill.setAttribute('stop-color', args.nonRatingFill)

    nonRatingFill.setAttribute('offset', ratingOffset)
    nonRatingFill.setAttribute('stop-color', args.ratingFill)

    ratingStroke.setAttribute('offset', ratingOffset)
    ratingStroke.setAttribute('stop-color', args.nonRatingStroke)

    nonRatingStroke.setAttribute('offset', ratingOffset)
    nonRatingStroke.setAttribute('stop-color', args.ratingStroke)
  }
}
function calculateRatingOffset (args) {
  let ratingOffset = 0
  let reverseOffset = 0
  if (args.rating !== undefined && !Number.isInteger(args.rating)) {
    ratingOffset = args.rating.toString().split('.')[1]
    if (ratingOffset.length === 1) {
      ratingOffset += '0'
    } else if (ratingOffset.length > 2) {
      ratingOffset = (Number.parseInt(ratingOffset) / 10).toString()
    }
    reverseOffset = 100 - Number.parseFloat(ratingOffset)
    reverseOffset = reverseOffset.toString() + '%'
    ratingOffset += '%'
  } else if (args.rating !== undefined) {
    ratingOffset = args.rating
    reverseOffset = args.numberOfStars - args.rating
  }
  return { 'ratingOffset': ratingOffset, 'reverseOffset': reverseOffset }
}
function createStar (container, args) {
  let attr = {
    'width': args.width,
    'height': args.height
  }
  let svg = createDOMNode('svg', attr)
  container.appendChild(svg)
  let ratingOffset = 0
  let reverseOffset = 0
  createLinearGradient(svg, args, ratingOffset)
  let _ratingOffset = calculateRatingOffset(args)
  ratingOffset = _ratingOffset.ratingOffset
  reverseOffset = _ratingOffset.reverseOffset
  args.reverseOffset = reverseOffset
  let width = svg.clientWidth
  let height = svg.clientHeight
  let path
  let strokeWidth
  let rating = args.rating
  if (!args.strokeWidth || Number.isNaN(args.strokeWidth)) {
    strokeWidth = 1
  } else {
    strokeWidth = args.strokeWidth
  }
  let _default
  let offset
  let spacing
  let _align
  let justify = args.justifyContent
  let align = args.alignItem
  if (args.orientation === 'l2r' || args.orientation === 'r2l') {
    spacing = Math.min(height, width / args.numberOfStars)
    _default = calculateJustify(width, justify, spacing, args.numberOfStars)
    _align = calculateAlign(height, align, spacing)
  } else if (args.orientation === 't2b' || args.orientation === 'b2t') {
    spacing = Math.min(height / args.numberOfStars, width)
    _default = calculateJustify(height, justify, spacing, args.numberOfStars)
    _align = calculateAlign(width, align, spacing)
  }
  for (let i = 0; i < args.numberOfStars; i++) {
    attr = {
      'id': i,
      'stroke-width': strokeWidth
    }
    let flagRating = 1
    let flagReverseRating = 1
    path = createDOMNode('path', attr)
    svg.appendChild(path)
    if (justify !== 'space-evenly') {
      offset = _default + spacing * i + strokeWidth
    } else {
      offset = (2 * i + 1) * _default + i * spacing + strokeWidth
    }
    if (args.orientation === 'l2r' || args.orientation === 'r2l') {
      calculateStar(path, offset, _align, spacing, strokeWidth, args.padding)
    } else {
      calculateStar(path, _align, offset, spacing, strokeWidth, args.padding)
    }
    if (args.orientation === 'l2r' || args.orientation === 't2b') {
      if (flagRating === 1) {
        updateLinearGradient(args, ratingOffset)
        flagRating = 0
      }
      orientationAlongPositiveAxis(path, args, i, rating)
      rating -= 1
    } else {
      if (flagReverseRating === 1) {
        updateLinearGradient(args, ratingOffset)
        flagReverseRating = 0
      }
      orientationAlongNegativeAxis(path, args, i, rating)
      rating += 1
    }
  }
}
export default class RatingChart {
  constructor (container, args = {}) {
    this.container = container
    this.height = args.height ? args.height : 400
    this.width = args.width ? args.width : 400
    this.ratingFill = args.ratingFill ? args.ratingFill : '#ff0'
    this.nonRatingFill = args['nonRatingFill'] ? args['nonRatingFill'] : '#ddd'
    this.orientation = args['orientation'] ? args['orientation'] : 'l2r'
    this.ratingStroke = args['ratingStroke'] ? args['ratingStroke'] : 'none'
    this.nonRatingStroke = args['nonRatingStroke'] ? args['nonRatingStroke'] : 'none'
    this.strokeWidth = args['strokeWidth'] ? args['strokeWidth'] : 1
    this.justifyContent = args['justifyContent'] ? args['justifyContent'] : 'center'
    this.alignItem = args['alignItem'] ? args['alignItem'] : 'center'
    this.padding = args['padding'] ? args['padding'] : 2
    this.numberOfStars = args['numberOfStars'] ? args['numberOfStars'] : 5
    this.rating = args['rating'] ? args['rating'] : undefined
    let flag = validate(this)
    if (flag !== false) {
      createStar(container, this)
    }
  }
  update (args) {
    if (!args.rating) {
      args.rating = this.rating
    }
    let state = 0
    let a = []
    if (ratingElements.length > 0) {
      a = a.concat(ratingElements)
    }
    if (nonRatingElements.length > 0) {
      a = a.concat(nonRatingElements)
    }
    if (gradientElement) {
      a = a.concat([gradientElement])
    }
    let flag = validate(args, this)
    if (typeof flag === 'object') {
      if (flag.structure.padding === 1) {
        this.padding = args.padding
        state = 1
      }
      if (flag.structure.justifyContent === 1 || flag.structure.alignItem === 1) {
        state = 1
      }
      if (flag.structure.orientation === 1) {
        this.orientation = args.orientation
        state = 1
      }
      if (flag.structure.height === 1 || flag.structure.width === 1) {
        state = 1
      }
      if (flag.style.ratingFill === 1) {
        this.ratingFill = args.ratingFill
        fillnStroke(ratingElements, 'ratingFill', this.ratingFill)
      }
      if (flag.style.nonRatingFill === 1) {
        this.nonRatingFill = args.nonRatingFill
        fillnStroke(nonRatingElements, 'nonRatingFill', this.nonRatingFill)
      }
      if (flag.style.ratingStroke === 1) {
        this.ratingStroke = args.ratingStroke
        fillnStroke(ratingElements, 'ratingStroke', this.ratingStroke)
      }
      if (flag.style.ratingStroke === 1) {
        this.nonRatingStroke = args.nonRatingStroke
        fillnStroke(nonRatingElements, 'nonRatingStroke', this.nonRatingStroke)
      }
      if (flag.style.strokeWidth === 1) {
        this.strokeWidth = args.strokeWidth
        a.forEach((e) => {
          document.getElementById(e.toString()).setAttribute('stroke-width', this.strokeWidth)
        })
      }
      if (flag.structure.numberOfStars === 1) {
        this.numberOfStars = args.numberOfStars
        state = 1
      }
      if (flag.style.rating === 1 && state !== 1) {
        ratingElements.length = 0
        nonRatingElements.length = 0
        gradientElement = null
        let rating = this.rating
        let _offset
        if (this.orientation === 'l2r' || this.orientation === 't2b') {
          _offset = calculateRatingOffset(this)
          updateLinearGradient(this, _offset.ratingOffset)
          a.forEach((e) => {
            let path = document.getElementById(e.toString())
            orientationAlongPositiveAxis(path, this, e, rating)
            rating -= 1
          })
        } else {
          _offset = calculateRatingOffset(this)
          updateLinearGradient(this, _offset.reverseOffset)
          a.forEach((e) => {
            let path = document.getElementById(e.toString())
            orientationAlongNegativeAxis(path, this, e, rating)
            rating += 1
          })
        }
      }
      if (state === 1) {
        emptyContainer(this.container)
        createStar(this.container, this)
      }
    }
  }
}
