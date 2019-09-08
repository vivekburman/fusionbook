function checkColorCode (str) {
  if (str.startsWith('#') && !(/(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)|(^#[0-9a-f]{6}$)|(^#[0-9a-f]{3}$) /i.test(str))) {
    return false
  } else if (str.startsWith('rgb') && !(/^rgb\((\d{1,3}),(\d{1,3}),(\d{1,3})\)/i.test(str))) {
    return false
  }
  return true
}
export default class RatingChart {
  constructor (container, args) {
    if (!(container instanceof HTMLElement)) {
      console.error('Container is not a valid HTML element')
      return null
    }
    this.config = {
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
      svg: this._createDOMNode('svg'),
      stars: [],
      structuralStatus: {
        'height': 1,
        'width': 1,
        'numberOfStars': 1,
        'padding': 1,
        'strokeWidth': 1,
        'justifyContent': 1,
        'alignItem': 1
      }
    }
    this.config.container.appendChild(this.config.svg)
    this._createGradient()
    if (!args) {
      this._draw()
    } else {
      if (this._validate(args)) {
        this._draw()
      } else {
        console.error('Configuration is not possible')
      }
    }
  }
  update (args) {
    if (args) {
      if (this._validate(args)) {
        this._draw()
      } else {
        console.error('Configuration is not possible')
      }
    }
  }
  _createGradient () {
    const defs = this._createDOMNode('defs')
    let args = {
      'id': 'gradient-fill',
      'x1': '0%',
      'x2': '100%',
      'y1': '0%',
      'y2': '0%'
    }

    const gradientFill = this._createDOMNode('linearGradient', args)
    args = {
      'id': 'gradient-stroke',
      'x1': '0%',
      'x2': '100%',
      'y1': '0%',
      'y2': '0%'
    }
    const gradientStroke = this._createDOMNode('linearGradient', args)
    args = {
      'offset': '0%',
      'stop-color': this.config.ratedFill,
      'id': 'rated-fill'
    }
    let stop = this._createDOMNode('stop', args)
    this.config.gradientRatedFill = stop
    gradientFill.appendChild(stop)
    args = {
      'offset': '0%',
      'stop-color': this.config.nonRatedFill,
      'id': 'non-rated-fill'
    }
    stop = this._createDOMNode('stop', args)
    this.config.gradientNonRatedFill = stop
    gradientFill.appendChild(stop)
    // end of fill
    args = {
      'offset': '0%',
      'stop-color': this.config.ratedStroke,
      'id': 'rated-stroke'
    }
    stop = this._createDOMNode('stop', args)
    this.config.gradientRatedStroke = stop
    gradientStroke.appendChild(stop)
    args = {
      'offset': '0%',
      'stop-color': this.config.nonRatedStroke,
      'id': 'non-rated-stroke'
    }
    stop = this._createDOMNode('stop', args)
    this.config.gradientNonRatedStroke = stop
    gradientStroke.appendChild(stop)
    defs.appendChild(gradientFill)
    defs.appendChild(gradientStroke)
    this.config.svg.appendChild(defs)
  }
  _checkSideValue (val, side) {
    if (typeof val === 'number' && val > 10) {
      return val
    } else if (typeof val === 'string') {
      let v
      if (val.endsWith('px')) {
        v = val.substr(0, val.indexOf('px'))
        if (v > 10) {
          return v
        }
      } else if (val.endsWith('%')) {
        v = val.substr(0, val.indexOf('%'))
        let parentSide
        if (side === 'width') {
          parentSide = this.config.container.clientWidth
        } else {
          parentSide = this.config.container.clientHeight
        }
        let toPixels = parentSide * v / 100
        if (toPixels > 10) {
          return toPixels
        }
      }
    }
    return -1
  }
  _validate (args) {
    let validJustifyContents = ['start', 'end', 'center', 'space-evenly']
    let validAlignItems = ['start', 'end', 'center']
    let validOrientation = ['l2r', 'r2l', 't2b', 'b2t']
    let height
    let width
    let justifyContent
    let alignItem
    let padding
    let strokeWidth
    let orientation
    let numberOfStars
    let rating
    let ratedFill
    let nonRatedFill
    let ratedStroke
    let nonRatedStroke

    if (args.height) {
      let val = this._checkSideValue(args.height, 'height')
      if (val !== -1) {
        height = val
      } else {
        height = this.config.height
        console.error('Height value is inappropriate')
      }
    } else {
      height = this.config.height
    }

    if (args.width) {
      let val = this._checkSideValue(args.width, 'width')
      if (val !== -1) {
        width = val
      } else {
        width = this.config.width
        console.error('Width value is inappropriate')
      }
    } else {
      width = this.config.width
    }

    if (args.justifyContent) {
      if (typeof args.justifyContent === 'string' && validJustifyContents.includes(args.justifyContent.toLowerCase())) {
        justifyContent = args.justifyContent
      } else {
        justifyContent = this.config.justifyContent
        console.error('JustifyContent value is inappropriate')
      }
    } else {
      justifyContent = this.config.justifyContent
    }

    if (args.alignItem) {
      if (typeof args.alignItem === 'string' &&
      validAlignItems.includes(args.alignItem.toLowerCase())) {
        alignItem = args.alignItem
      } else {
        alignItem = this.config.alignItem
        console.error('Align Item value is inappropriate')
      }
    } else {
      alignItem = this.config.alignItem
    }

    if (args.padding) {
      if (typeof args.padding === 'number' && args.padding > 0) {
        padding = args.padding
      } else {
        padding = this.config.padding
        console.error('Padding value is inappropriate')
      }
    } else {
      padding = this.config.padding
    }

    if (args.strokeWidth) {
      if (typeof args.strokeWidth === 'number' && args.strokeWidth > 0) {
        strokeWidth = args.strokeWidth
      } else {
        strokeWidth = this.config.strokeWidth
        console.error('StrokeWidth value is inappropriate')
      }
    } else {
      strokeWidth = this.config.strokeWidth
    }

    if (args.orientation) {
      if (validOrientation.includes(args.orientation)) {
        orientation = args.orientation
      } else {
        orientation = this.config.orientation
        console.error('Orientation value is inappropriate')
      }
    } else {
      orientation = this.config.orientation
    }

    if (args.numberOfStars) {
      if (typeof args.numberOfStars === 'number' && args.numberOfStars > 0) {
        numberOfStars = args.numberOfStars
      } else {
        numberOfStars = this.config.numberOfStars
        console.error('Number of stars value is inappropriate')
      }
    } else {
      numberOfStars = this.config.numberOfStars
    }
    if (args.rating) {
      if (typeof args.rating === 'number' && args.rating <= numberOfStars && args.rating > 0) {
        rating = args.rating
      } else {
        rating = undefined
        console.error('rating value is inappropriate')
      }
    } else {
      rating = this.config.rating
    }

    if (args.ratedFill) {
      if (checkColorCode(args.ratedFill)) {
        ratedFill = args.ratedFill
      } else {
        ratedFill = this.config.ratedFill
        console.error('ratedFill value is inappropriate')
      }
    } else {
      ratedFill = this.config.ratedFill
    }

    if (args.nonRatedFill) {
      if (checkColorCode(args.nonRatedFill)) {
        nonRatedFill = args.nonRatedFill
      } else {
        nonRatedFill = this.config.nonRatedFill
        console.error('nonRatedFill value is inappropriate')
      }
    } else {
      nonRatedFill = this.config.nonRatedFill
    }

    if (args.ratedStroke) {
      if (checkColorCode(args.ratedStroke)) {
        ratedStroke = args.ratedStroke
      } else {
        ratedStroke = this.config.ratedStroke
        console.error('ratedStroke value is inappropriate')
      }
    } else {
      ratedStroke = this.config.ratedStroke
    }

    if (args.nonRatedStroke) {
      if (checkColorCode(args.nonRatedStroke)) {
        nonRatedStroke = args.nonRatedStroke
      } else {
        nonRatedStroke = this.config.nonRatedStroke
        console.error('nonRatedStroke value is inappropriate')
      }
    } else {
      nonRatedStroke = this.config.nonRatedStroke
    }
    let values = this._checkConfig(height, width, numberOfStars, orientation, padding, strokeWidth)
    if (values !== false) {
      this.config.height = height
      this.config.width = width
      this.config.orientation = orientation
      this.config.justifyContent = justifyContent
      this.config.alignItem = alignItem
      this.config.padding = values.padding
      this.config.strokeWidth = values.strokeWidth
      this.config.numberOfStars = numberOfStars
      this.config.rating = rating
      this.config.ratedFill = ratedFill
      this.config.nonRatedFill = nonRatedFill
      this.config.ratedStroke = ratedStroke
      this.config.nonRatedStroke = nonRatedStroke
      return true
    }
    return false
  }
  _checkConfig (height, width, numberOfStars, orientation, padding, strokeWidth) {
    let block
    if (orientation === 'l2r' || orientation === 'r2l') {
      block = Math.min(height, width / numberOfStars)
    } else {
      block = Math.min(width, height / numberOfStars)
    }
    if (block < 10) {
      return false
    }
    if (block * 0.1 < padding) {
      console.error('Padding cannot be greater than 10% of blockSize')
      padding = block * 0.1
    }
    if (block * 0.1 < strokeWidth) {
      console.error('StrokeWidth cannot be greater than 10% of blockSize')
      strokeWidth = block * 0.1
    }
    if ((block - 2 * (padding + strokeWidth)) / block < 0.2) {
      return false
    }
    return { padding: padding, strokeWidth: strokeWidth }
  }
  _draw () {
    /*
    if (this.config.structuralStatus === 1) {
      // reset svg width height
      this.config.svg.setAttribute('width', this.config.width)
      this.config.svg.setAttribute('height', this.config.height)
      // re-calculate d
      let blockSize
      let justifyOffset
      let alignOffset
      if (this.config.orientation === 'l2r' || this.config.orientation === 'r2l') {
        blockSize = Math.min(this.config.height, this.config.width / this.config.numberOfStars)
        justifyOffset = this._calculateJustify(this.config.justifyContent, this.config.width, blockSize, this.config.numberOfStars)
        alignOffset = this._calculateAlign(this.config.alignItem, this.config.height, blockSize)
      } else {
        blockSize = Math.min(this.config.width, this.config.height / this.config.numberOfStars)
        justifyOffset = this._calculateJustify(this.config.justifyContent, this.config.height, blockSize, this.config.numberOfStars)
        alignOffset = this._calculateAlign(this.config.alignItem, this.config.width, blockSize)
      }
      for (let i = 0; i < this.config.stars.length; i++) {
        let offset
        if (this.config.justifyContent !== 'space-evenly') {
          offset = justifyOffset + blockSize * i + this.config.strokeWidth
        } else {
          offset = (2 * i + 1) * justifyOffset + i * blockSize + this.config.strokeWidth
        }
        if (this.config.orientation === 'l2r' || this.config.orientation === 'r2l') {
          this.config.stars[i].setAttribute('d',
            this._calculateStar(offset, alignOffset, blockSize, this.config.strokeWidth, this.config.padding))
        } else {
          this.config.stars[i].setAttribute('d',
            this._calculateStar(alignOffset, offset, blockSize, this.config.strokeWidth, this.config.padding))
        }
        this.config.stars[i].setAttribute('stroke-width', this.config.strokeWidth)
      }
    }
    */
    this.config.svg.setAttribute('width', this.config.width)
    this.config.svg.setAttribute('height', this.config.height)
    if (this.config.stars.length < this.config.numberOfStars) {
      let n = this.config.numberOfStars - this.config.stars.length
      for (let i = 0; i < n; i++) {
        let path = this._createDOMNode('path')
        this.config.stars.push(path)
        this.config.svg.appendChild(path)
      }
    }
    if (this.config.stars.length > this.config.numberOfStars) {
      let n = this.config.stars.length - this.config.numberOfStars
      for (let i = 0; i < n; i++) {
        this.config.stars.pop().remove()
      }
    }
    let blockSize
    let justifyOffset
    let alignOffset
    if (this.config.orientation === 'l2r' || this.config.orientation === 'r2l') {
      blockSize = Math.min(this.config.height, this.config.width / this.config.numberOfStars)
      justifyOffset = this._calculateJustify(this.config.justifyContent, this.config.width, blockSize, this.config.numberOfStars)
      alignOffset = this._calculateAlign(this.config.alignItem, this.config.height, blockSize)
    } else {
      blockSize = Math.min(this.config.width, this.config.height / this.config.numberOfStars)
      justifyOffset = this._calculateJustify(this.config.justifyContent, this.config.height, blockSize, this.config.numberOfStars)
      alignOffset = this._calculateAlign(this.config.alignItem, this.config.width, blockSize)
    }
    let rating = this.config.rating
    if (rating === undefined) {
      rating = this.config.numberOfStars
    }
    if (Number.parseInt(rating) !== rating) {
      let n = (rating - Number.parseInt(rating)) * 100 + '%'
      this.config.gradientRatedFill.setAttribute('offset', n)
      this.config.gradientNonRatedFill.setAttribute('offset', n)
      this.config.gradientRatedStroke.setAttribute('offset', n)
      this.config.gradientNonRatedStroke.setAttribute('offset', n)
      if (this.config.orientation === 'l2r' || this.config.orientation === 't2b') {
        this.config.gradientRatedFill.setAttribute('stop-color', this.config.ratedFill)
        this.config.gradientNonRatedFill.setAttribute('stop-color', this.config.nonRatedFill)
        this.config.gradientRatedStroke.setAttribute('stop-color', this.config.ratedStroke)
        this.config.gradientNonRatedStroke.setAttribute('stop-color', this.config.nonRatedStroke)
      } else {
        this.config.gradientRatedFill.setAttribute('stop-color', this.config.nonRatedFill)
        this.config.gradientNonRatedFill.setAttribute('stop-color', this.config.ratedFill)
        this.config.gradientRatedStroke.setAttribute('stop-color', this.config.nonRatedStroke)
        this.config.gradientNonRatedStroke.setAttribute('stop-color', this.config.ratedStroke)
      }
    }
    for (let i = 0; i < this.config.stars.length; i++) {
      let offset
      if (this.config.justifyContent !== 'space-evenly') {
        offset = justifyOffset + blockSize * i + this.config.strokeWidth
      } else {
        offset = (2 * i + 1) * justifyOffset + i * blockSize + this.config.strokeWidth
      }
      if (this.config.orientation === 'l2r' || this.config.orientation === 'r2l') {
        this.config.stars[i].setAttribute('d',
          this._calculateStar(offset, alignOffset, blockSize, this.config.strokeWidth, this.config.padding))
      } else {
        this.config.stars[i].setAttribute('d',
          this._calculateStar(alignOffset, offset, blockSize, this.config.strokeWidth, this.config.padding))
      }
      let j = i
      if (this.config.orientation === 'r2l' || this.config.orientation === 'b2t') {
        j = this.config.stars.length - 1 - i
      }
      if (rating >= 1) {
        this.config.stars[j].setAttribute('fill', this.config.ratedFill)
        this.config.stars[j].setAttribute('stroke', this.config.ratedStroke)
      } else if (rating > 0 && rating < 1) {
        this.config.stars[j].setAttribute('fill', 'url(#gradient-fill)')
        this.config.stars[j].setAttribute('stroke', 'url(#gradient-stroke)')
      } else {
        this.config.stars[j].setAttribute('fill', this.config.nonRatedFill)
        this.config.stars[j].setAttribute('stroke', this.config.nonRatedStroke)
      }
      rating -= 1
      this.config.stars[i].setAttribute('stroke-width', this.config.strokeWidth)
    }
  }
  _calculateJustify (justify, side, blockSize, numberOfStars) {
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
  _calculateAlign (align, side, blockSize) {
    if (align === 'start') {
      return 0
    } else if (align === 'end') {
      return side - blockSize
    } else if (align === 'center') {
      return (side - blockSize) / 2
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
  _createDOMNode (nodeName, args = []) {
    const xlmnsSvg = 'http://www.w3.org/2000/svg'
    const node = document.createElementNS(xlmnsSvg, nodeName)
    for (let property in args) {
      node.setAttribute(property, args[property])
    }
    return node
  }
}
