import { requestAnimationFrame } from './requestAnimationFrame'

let MoveLine = function (ctx, ctx2, userOptions) {
    let self = this;

    //默认参数
    let options = {
        //marker点半径
        markerRadius: 3,
        //marker点颜色,为空或null则默认取线条颜色
        markerColor: '#fff',
        //线条类型 有值则dash, 否则solid
        lineDash: [],
        //线条宽度
        lineWidth: 1,
        //线条颜色
        colors: ['#F9815C', '#F8AB60', '#EDCC72', '#E2F194', '#94E08A', '#4ECDA5'],
        //移动点半径
        moveRadius: 2,
        //移动点颜色
        fillColor: '#fff',
        //移动点阴影颜色
        shadowColor: '#fff',
        //移动点阴影大小
        shadowBlur: 5,
    };

    //全局变量
    let width = ctx.canvas.clientWidth,
        height = ctx.canvas.clientWidth,
        markLines = [];

    //参数合并
    let merge = function (userOptions, options) {
        Object.keys(userOptions).forEach(function (key) {
            options[key] = userOptions[key];
        });
    }

    function Marker(opts) {
        this.location = opts.location;
        this.color = opts.color;
    }

    Marker.prototype.draw = function (context) {
        let pixel = this.pixel = this.location;

        context.save();
        context.beginPath();
        context.fillStyle = options.markerColor || this.color;
        context.arc(pixel.x, pixel.y, options.markerRadius, 0, Math.PI * 2, true);
        context.closePath();
        context.fill();
        context.restore();
    }

    function MarkLine(opts) {
        this.from = opts.from;
        this.to = opts.to;
        this.id = opts.id;
        // 贝塞尔时间
        this.t = 0;
        this.raduis = opts.raduis || 0.5;
        let time = opts.time || 6000;
        this.step = 0
        // 控制点
        this.cps = this.computeControlPoint(this.from.location, this.to.location, this.raduis)
        this.path = this.getPointList(this.from.location, this.to.location, this.cps, time)
    }

    MarkLine.prototype.getPointList = function (from, to, cps, time) {
        let points = [];
        let step = (2000) / (60 * time);
        for (let t = 0; t <= 1; t += step) {
            const point = this.getPointByTime(from, to, cps, t);
            points.push(point)
        }
        //修正最后一点在插值产生的偏移
        points[points.length - 1] = to;
        return points;
    }

    MarkLine.prototype.getPointByTime = function (from, to, cp, t) {
        let x1 = from.x, y1 = from.y;
        let x2 = to.x, y2 = to.y;
        let cx = cp.x, cy = cp.y;
        let x = (1 - t) * (1 - t) * x1 + 2 * t * (1 - t) * cx + t * t * x2,
            y = (1 - t) * (1 - t) * y1 + 2 * t * (1 - t) * cy + t * t * y2;
        return {x: x, y: y};
    }

    MarkLine.prototype.computeControlPoint = function (ps, pe, arc = 0.5) {
        if (arc > 1) {
          arc = 1
        }
  
        if (arc < -1) {
          arc = -1
        }
        const deltaX = pe.x - ps.x
        const deltaY = pe.y - ps.y
        const theta = Math.atan(deltaY / deltaX)
        const len = Math.sqrt((deltaX * deltaX) + (deltaY * deltaY)) / 2 * arc
        const newTheta = theta - Math.PI / 2
        return {
            x: (pe.x + ps.x) / 2 + len * Math.cos(newTheta),
            y: (pe.y + pe.y) / 2 + len * Math.sin(newTheta)
        }
    },

    MarkLine.prototype.drawMarker = function (context) {
        this.from.draw(context);
        this.to.draw(context);
    }

    MarkLine.prototype.drawLinePath = function (context) {
        let pointList = this.path;
        let len = pointList.length;
        context.save();
        context.beginPath();
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.colors[this.id] || '#EDCC72';
        if (options.lineDash.length === 2) {
            context.setLineDash(options.lineDash);
        }
        context.moveTo(this.from.location.x, this.from.location.y);
        context.quadraticCurveTo(this.cps.x, this.cps.y, this.to.location.x, this.to.location.y);
        context.stroke();
        context.restore();
        this.t = 0; //缩放地图时重新绘制动画
    }

    MarkLine.prototype.drawMoveCircle = function (context) {
        let pointList = this.path;
        context.save();
        context.fillStyle = options.fillColor;
        context.shadowColor = options.shadowColor;
        context.shadowBlur = options.shadowBlur;
        context.beginPath();
        context.arc(pointList[this.step].x, pointList[this.step].y, options.moveRadius, 0, Math.PI * 2, true);
        context.fill();
        context.closePath();
        context.restore();
        this.step += 1;
        if (this.step >= pointList.length) {
            this.step = 0;
        }
    }

    //底层canvas渲染，标注，线条
    let brush = function () {
        if (!ctx) {
            return;
        }

        addMarkLine();

        ctx.clearRect(0, 0, width, height);

        markLines.forEach(function (line) {
            line.drawMarker(ctx);
            line.drawLinePath(ctx);
        });
    }

    //上层canvas渲染，动画效果
    let render = function () {
        if (!ctx2) {
            return;
        }

        ctx2.fillStyle = 'rgba(0,0,0,.93)';
        let prev = ctx2.globalCompositeOperation;
        ctx2.globalCompositeOperation = 'destination-in';
        ctx2.fillRect(0, 0, width, height);
        ctx2.globalCompositeOperation = prev;
        for (let i = 0; i < markLines.length; i++) {
            let markLine = markLines[i];
            markLine.drawMoveCircle(ctx2); //移动圆点
        }
    }

    let addMarkLine = function () {
        markLines = [];
        let dataset = options.data;
        dataset.forEach(function (line, i) {
            markLines.push(new MarkLine({
                id: i,
                raduis: line.raduis,
                time: line.time,
                from: new Marker({
                    location: line.from,
                    color: options.colors[i] || '#EDCC72',
                }),
                to: new Marker({
                    location: line.to,
                    color: options.colors[i] || '#EDCC72'
                })
            }));
        });
    }

    //初始化
    let init = function (options) {
        merge(userOptions, options);
        brush();
        (function drawFrame() {
            requestAnimationFrame(drawFrame);
            render();
        }());
    }

    init(options);

    self.options = options;
};

MoveLine.prototype.update = function (resetOpts) {
    for (let key in resetOpts) {
        this.options[key] = resetOpts[key];
    }
};

export default MoveLine;