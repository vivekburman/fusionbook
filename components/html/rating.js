function checkColorCode (str) {
  if (str.startsWith('#') && !(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9a-f]{6}$)|(^#[0-9a-f]{3}$) /i.test(str))) {
    return false
  } else if (str.startsWith('rgb') && !(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i.test(str))) {
    return false
  }
  return true
}
function checkConfig (height, width, numberOfStars, orientation, padding, strokeWidth) {
  let block
  if (orientation === 'l2r' || orientation === 'r2l') {
    block = Math.min(height, width / numberOfStars)
  } else {
    block = Math.min(width, height / numberOfStars)
  }
  if (block * 0.1 < padding) {
    console.error('Configuration not possible as Padding cannot be greater than 10% of blockSize')
    return false
  }
  if (block * 0.1 < strokeWidth) {
    console.error('Configuration not possible as StrokeWidth cannot be greater than 10% of blockSize')
    return false
  }
  if ((block - 2 * (padding + strokeWidth)) / block < 0.2) {
    console.log('Configuration not possible as Content area should be atleast 20% of available space')
    return false
  }
  return true
}
function checkSideValue (val) {
  if (typeof val === 'number' && val > 10) {
    return val
  } else if (typeof val === 'string' && val.endsWith('px')) {
    let v
    v = val.substr(0, val.indexOf('px'))
    if (v > 10) {
      return v
    }
  }
  return -1
}
function createDOMNode (nodeName, args = []) {
  const xlmnsSvg = 'http://www.w3.org/2000/svg'
  const node = document.createElementNS(xlmnsSvg, nodeName)
  for (let property in args) {
    node.setAttribute(property, args[property])
  }
  return node
}
function calculateJustify (justify, side, blockSize, numberOfStars) {
  if (justify === 'start') {
    return 0
  } else if (justify === 'end') {
    return side - blockSize * numberOfStars
  } else if (justify === 'center') {
    return (side - blockSize * numberOfStars) / 2
  } else if (justify === 'space-evenly') {
    return (side - blockSize * numberOfStars) / (2 * numberOfStars)
  }
}
function calculateAlign (align, side, blockSize) {
  if (align === 'start') {
    return 0
  } else if (align === 'end') {
    return side - blockSize
  } else if (align === 'center') {
    return (side - blockSize) / 2
  }
}
export default class RatingChart {
  constructor (container, args) {
    if (!(container instanceof HTMLElement)) {
      console.error('Container is not a valid HTML element')
      return null
    }
    this._config = {
      height: 400,
      width: 400,
      justifyContent: 'center',
      alignItem: 'center',
      padding: 1,
      strokeWidth: 0,
      orientation: 'l2r',
      numberOfStars: 5,
      rating: undefined,
      ratedFill: '#ff0',
      nonRatedFill: '#ddd',
      ratedStroke: 'none',
      nonRatedStroke: 'none',
      container: container,
      svg: createDOMNode('svg'),
      stars: [],
      animationFrameActive: true
    }
    this._config.container.appendChild(this._config.svg)
    this._createGradient()
    this._createAndUpdate(args)
  }
  _createAndUpdate (args) {
    if (!args || (args && this._validateAndSet(args))) {
      if (this._config.animationFrameActive) {
        this._config.animationFrameActive = false
        requestAnimationFrame(() => {
          this._draw()
          this._config.animationFrameActive = true
        })
      }
    }
  }
  update (args) {
    if (args) {
      this._createAndUpdate(args)
    }
    if (typeof this.onUpdate === 'function') {
      this.onUpdate()
    }
  }
  _createGradient () {
    const defs = createDOMNode('defs')
    let args = {
      'id': 'gradient-fill',
      'x1': '0%',
      'x2': '100%',
      'y1': '0%',
      'y2': '0%'
    }

    const gradientFill = createDOMNode('linearGradient', args)
    args = {
      'id': 'gradient-stroke',
      'x1': '0%',
      'x2': '100%',
      'y1': '0%',
      'y2': '0%'
    }
    const gradientStroke = createDOMNode('linearGradient', args)
    args = {
      'offset': '0%',
      'stop-color': this._config.ratedFill,
      'id': 'rated-fill'
    }
    let stop = createDOMNode('stop', args)
    gradientFill.appendChild(stop)
    args = {
      'offset': '0%',
      'stop-color': this._config.nonRatedFill,
      'id': 'non-rated-fill'
    }
    stop = createDOMNode('stop', args)
    gradientFill.appendChild(stop)
    // end of fill
    args = {
      'offset': '0%',
      'stop-color': this._config.ratedStroke,
      'id': 'rated-stroke'
    }
    stop = createDOMNode('stop', args)
    gradientStroke.appendChild(stop)
    args = {
      'offset': '0%',
      'stop-color': this._config.nonRatedStroke,
      'id': 'non-rated-stroke'
    }
    stop = createDOMNode('stop', args)
    gradientStroke.appendChild(stop)
    defs.appendChild(gradientFill)
    defs.appendChild(gradientStroke)
    this._config.svg.appendChild(defs)
  }
  _validateAndSet (args) {
    let validJustifyContents = ['start', 'end', 'center', 'space-evenly']
    let validAlignItems = ['start', 'end', 'center']
    let validOrientation = ['l2r', 'r2l', 't2b', 'b2t']

    if (args.height) {
      let val = checkSideValue(args.height)
      if (val !== -1) {
        args.height = val
      } else {
        args.height = this._config.height
        console.error('Height value is inappropriate')
      }
    } else {
      args.height = this._config.height
    }

    if (args.width) {
      let val = checkSideValue(args.width)
      if (val !== -1) {
        args.width = val
      } else {
        args.width = this._config.width
        console.error('Width value is inappropriate')
      }
    } else {
      args.width = this._config.width
    }
    if (args.justifyContent && (typeof args.justifyContent !== 'string' ||
        !validJustifyContents.includes(args.justifyContent.toLowerCase()))) {
      args.justifyContent = this._config.justifyContent
      console.error('JustifyContent value is inappropriate')
    } else if (!args.justifyContent) {
      args.justifyContent = this._config.justifyContent
    }

    if (args.alignItem && (typeof args.alignItem !== 'string' ||
        !validAlignItems.includes(args.alignItem.toLowerCase()))) {
      args.alignItem = this._config.alignItem
      console.error('Align Item value is inappropriate')
    } else if (!args.alignItem) {
      args.alignItem = this._config.alignItem
    }

    if (args.padding && (typeof args.padding !== 'number' || args.padding < 0)) {
      args.padding = this._config.padding
      console.error('Padding value is inappropriate')
    } else if (!args.padding) {
      args.padding = this._config.padding
    }

    if (args.strokeWidth && (typeof args.strokeWidth !== 'number' || args.strokeWidth < 0)) {
      args.strokeWidth = this._config.strokeWidth
      console.error('StrokeWidth value is inappropriate')
    } else if (!args.strokeWidth) {
      args.strokeWidth = this._config.strokeWidth
    }

    if (args.orientation && !validOrientation.includes(args.orientation)) {
      args.orientation = this._config.orientation
      console.error('Orientation value is inappropriate')
    } else if (!args.orientation) {
      args.orientation = this._config.orientation
    }
    if (args.numberOfStars && (typeof args.numberOfStars !== 'number' ||
        args.numberOfStars < 0)) {
      args.numberOfStars = this._config.numberOfStars
      console.error('Number of stars value is inappropriate')
    } else if (!args.numberOfStars) {
      args.numberOfStars = this._config.numberOfStars
    }
    args.rating = args.rating ? args.rating : this._config.rating
    if (args.rating && (typeof args.rating !== 'number' || args.rating > args.numberOfStars ||
        args.rating < 0)) {
      args.rating = undefined
      console.error('rating value is inappropriate')
    }
    if (args.ratedFill && !checkColorCode(args.ratedFill)) {
      args.ratedFill = this._config.ratedFill
      console.error('ratedFill value is inappropriate')
    } else if (!args.ratedFill) {
      args.ratedFill = this._config.ratedFill
    }

    if (args.nonRatedFill && !checkColorCode(args.nonRatedFill)) {
      args.nonRatedFill = this._config.nonRatedFill
      console.error('nonRatedFill value is inappropriate')
    } else if (!args.nonRatedFill) {
      args.nonRatedFill = this._config.nonRatedFill
    }

    if (args.ratedStroke && !checkColorCode(args.ratedStroke)) {
      args.ratedStroke = this._config.ratedStroke
      console.error('ratedStroke value is inappropriate')
    } else if (!args.ratedStroke) {
      args.ratedStroke = this._config.ratedStroke
    }

    if (args.nonRatedStroke && !checkColorCode(args.nonRatedStroke)) {
      args.nonRatedStroke = this._config.nonRatedStroke
      console.error('nonRatedStroke value is inappropriate')
    } else if (!args.nonRatedStroke) {
      args.nonRatedStroke = this._config.nonRatedStroke
    }
    if (checkConfig(args.height, args.width, args.numberOfStars, args.orientation, args.padding, args.strokeWidth)) {
      this._config.width = args.width !== this._config.width ? args.width : this._config.width
      this._config.height = args.height !== this._config.height ? args.height : this._config.height
      this._config.orientation = args.orientation !== this._config.orientation ? args.orientation : this._config.orientation
      this._config.justifyContent = args.justifyContent !== this._config.justifyContent ? args.justifyContent : this._config.justifyContent
      this._config.alignItem = args.alignItem !== this._config.alignItem ? args.alignItem : this._config.alignItem
      this._config.padding = args.padding !== this._config.padding ? args.padding : this._config.padding
      this._config.strokeWidth = args.strokeWidth !== this._config.strokeWidth ? args.strokeWidth : this._config.strokeWidth
      this._config.numberOfStars = args.numberOfStars !== this._config.numberOfStars ? args.numberOfStars : this._config.numberOfStars
      this._config.rating = args.rating !== this._config.rating ? args.rating : this._config.rating
      this._config.ratedFill = args.ratedFill !== this._config.ratedFill ? args.ratedFill : this._config.ratedFill
      this._config.nonRatedFill = args.nonRatedFill !== this._config.nonRatedFill ? args.nonRatedFill : this._config.nonRatedFill
      this._config.ratedStroke = args.ratedStroke !== this._config.ratedStroke ? args.ratedStroke : this._config.ratedStroke
      this._config.nonRatedStroke = args.nonRatedFill !== this._config.nonRatedFill ? args.nonRatedFill : this._config.nonRatedFill
      return true
    }
    return false
  }
  _draw () {
    this._config.svg.setAttribute('width', this._config.width)
    this._config.svg.setAttribute('height', this._config.height)
    if (this._config.stars.length < this._config.numberOfStars) {
      let n = this._config.numberOfStars - this._config.stars.length
      for (let i = 0; i < n; i++) {
        let path = createDOMNode('path')
        this._config.stars.push(path)
        this._config.svg.appendChild(path)
      }
    }
    if (this._config.stars.length > this._config.numberOfStars) {
      let n = this._config.stars.length - this._config.numberOfStars
      for (let i = 0; i < n; i++) {
        this._config.stars.pop().remove()
      }
    }
    let blockSize
    let justifyOffset
    let alignOffset
    if (this._config.orientation === 'l2r' || this._config.orientation === 'r2l') {
      blockSize = Math.min(this._config.height, this._config.width / this._config.numberOfStars)
      justifyOffset = calculateJustify(this._config.justifyContent, this._config.width, blockSize, this._config.numberOfStars)
      alignOffset = calculateAlign(this._config.alignItem, this._config.height, blockSize)
    } else {
      blockSize = Math.min(this._config.width, this._config.height / this._config.numberOfStars)
      justifyOffset = calculateJustify(this._config.justifyContent, this._config.height, blockSize, this._config.numberOfStars)
      alignOffset = calculateAlign(this._config.alignItem, this._config.width, blockSize)
    }
    let rating = this._config.rating
    if (rating === undefined) {
      rating = this._config.numberOfStars
    }
    if (Number.parseInt(rating) !== rating) {
      let n = (rating - Number.parseInt(rating)) * 100 + '%'
      document.getElementById('rated-fill').setAttribute('offset', n)
      document.getElementById('non-rated-fill').setAttribute('offset', n)
      document.getElementById('rated-stroke').setAttribute('offset', n)
      document.getElementById('non-rated-stroke').setAttribute('offset', n)
      if (this._config.orientation === 'l2r' || this._config.orientation === 't2b') {
        document.getElementById('rated-fill').setAttribute('stop-color', this._config.ratedFill)
        document.getElementById('non-rated-fill').setAttribute('stop-color', this._config.nonRatedFill)
        document.getElementById('rated-stroke').setAttribute('stop-color', this._config.ratedStroke)
        document.getElementById('non-rated-stroke').setAttribute('stop-color', this._config.nonRatedStroke)
      } else {
        document.getElementById('rated-fill').setAttribute('stop-color', this._config.nonRatedFill)
        document.getElementById('non-rated-fill').setAttribute('stop-color', this._config.ratedFill)
        document.getElementById('rated-stroke').setAttribute('stop-color', this._config.nonRatedStroke)
        document.getElementById('non-rated-stroke').setAttribute('stop-color', this._config.ratedStroke)
      }
    }
    for (let i = 0; i < this._config.stars.length; i++) {
      let offset
      if (this._config.justifyContent !== 'space-evenly') {
        offset = justifyOffset + blockSize * i + this._config.strokeWidth
      } else {
        offset = (2 * i + 1) * justifyOffset + i * blockSize + this._config.strokeWidth
      }
      if (this._config.orientation === 'l2r' || this._config.orientation === 'r2l') {
        this._config.stars[i].setAttribute('d',
          this._calculateStar(offset, alignOffset, blockSize, this._config.strokeWidth, this._config.padding))
      } else {
        this._config.stars[i].setAttribute('d',
          this._calculateStar(alignOffset, offset, blockSize, this._config.strokeWidth, this._config.padding))
      }
      let j = i
      if (this._config.orientation === 'r2l' || this._config.orientation === 'b2t') {
        j = this._config.stars.length - 1 - i
      }
      if (rating >= 1) {
        this._config.stars[j].setAttribute('fill', this._config.ratedFill)
        this._config.stars[j].setAttribute('stroke', this._config.ratedStroke)
      } else if (rating > 0 && rating < 1) {
        this._config.stars[j].setAttribute('fill', 'url(#gradient-fill)')
        this._config.stars[j].setAttribute('stroke', 'url(#gradient-stroke)')
      } else {
        this._config.stars[j].setAttribute('fill', this._config.nonRatedFill)
        this._config.stars[j].setAttribute('stroke', this._config.nonRatedStroke)
      }
      rating -= 1
      this._config.stars[i].setAttribute('stroke-width', this._config.strokeWidth)
    }
    if (typeof this.onDraw === 'function') {
      this.onDraw()
    }
  }
  _calculateStar (offsetWidth, offsetHeight, blockSize, strokeWidth, padding) {
    blockSize -= 2 * (strokeWidth + padding)
    const cx = blockSize / 2 + offsetWidth
    const cy = blockSize / 2 + offsetHeight
    const offsetX = blockSize / 3
    const offsetY = blockSize / 3
    const d = 'M' + cx + ',' + offsetHeight + ' ' +
      'L' + (cx + offsetX) + ',' + (offsetHeight + offsetY) + ' ' +
      'H' + (blockSize + offsetWidth) + ' ' +
      'L' + (cx + offsetX) + ',' + (cy + offsetY / 2) + ' ' +
      'L' + (blockSize + offsetWidth) + ',' + (blockSize + offsetHeight) + ' ' +
      'L' + cx + ',' + (cy + offsetY) + ' ' +
      'L' + offsetWidth + ',' + (blockSize + offsetHeight) + ' ' +
      'L' + (cx - offsetX) + ',' + (cy + offsetY / 2) + ' ' +
      'L' + offsetWidth + ',' + (offsetY + offsetHeight) + ' ' +
      'H' + (cx - offsetX) + ' ' +
      'Z'
    return d
  }
}
