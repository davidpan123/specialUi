import { requestAnimationFrame } from './requestAnimationFrame'

function Marker(opts) {
    this.city = opts.name
    this.pixel = opts.position
    this.color = opts.color
    this.type = opts.type || 'circle'
    this.speed = opts.speed || 0.15
    if (!opts.speed || opts.speed <= 0) {
        this.speed = 0.15
    } else {
        this.speed = opts.speed
    }
    this.size = 0
    this.max = opts.max || 20
}

Marker.prototype.draw = function (context) {
    context.save()
    context.beginPath()
    switch (this.type) {
        case 'circle':
            this._drawCircle(context)
            break
        case 'ellipse':
            this._drawEllipse(context)
            break
        default:
            break
    }
    context.closePath()
    context.restore()

    this.size += this.speed
    if (this.size > this.max) {
        this.size = 0
    }
}

Marker.prototype._drawCircle = function (context) {
    let pixel = this.pixel
    context.strokeStyle = this.color
    context.moveTo(pixel.x + pixel.size, pixel.y)
    context.arc(pixel.x, pixel.y, this.size, 0, Math.PI * 2)
    context.stroke()

}

Marker.prototype._drawEllipse = function (context) {
    let pixel = this.pixel
    let x = pixel.x,
        y = pixel.y,
        w = this.size,
        h = this.size / 2,
        kappa = 0.5522848,
        // control point offset horizontal
        ox = w / 2 * kappa,
        // control point offset vertical
        oy = h / 2 * kappa,
        // x-start
        xs = x - w / 2,
        // y-start
        ys = y - h / 2,
        // x-end
        xe = x + w / 2,
        // y-end
        ye = y + h / 2

    context.strokeStyle = this.color
    context.moveTo(xs, y)
    context.bezierCurveTo(xs, y - oy, x - ox, ys, x, ys)
    context.bezierCurveTo(x + ox, ys, xe, y - oy, xe, y)
    context.bezierCurveTo(xe, y + oy, x + ox, ye, x, ye)
    context.bezierCurveTo(x - ox, ye, xs, y + oy, xs, y)
    context.stroke()
}

function FlashMarker(ctx, dataset) {
    let self = this,
        width = ctx.canvas.clientWidth,
        height = ctx.canvas.clientHeight,
        animationFlag = true
    this.markers = []


    //上层canvas渲染，动画效果
    let render = function render() {
        let markers = self.markers
        if (!ctx) {
            return
        }

        if (!animationFlag) {
            ctx.clearRect(0, 0, width, height)
            return
        }

        ctx.fillStyle = 'rgba(0,0,0,0.95)'
        let prev = ctx.globalCompositeOperation
        ctx.globalCompositeOperation = 'destination-in'
        ctx.fillRect(0, 0, width, height)
        ctx.globalCompositeOperation = prev

        for (let i = 0; i < markers.length; i++) {
            let marker = markers[i]
            marker.draw(ctx)
        }
    }

    let addMarker = () => {
        let markers = self.markers
        let dataset = self.dataset
        dataset.forEach(function (item, i) {
            let newMarker = new Marker(item)
            markers.push(newMarker)
        })
    }

    //初始化
    let init = (dataset) => {
        self.dataset = dataset
        addMarker();
        (function drawFrame() {
            requestAnimationFrame(drawFrame)
            render()
        })()
    }

    init(dataset)

}

FlashMarker.prototype.update = function (dataset) {
    let self = this
    self.markers = []
    dataset.forEach(function (item, i) {
        let newMarker = new Marker(item)
        self.markers.push(newMarker)
    })
}

export default FlashMarker