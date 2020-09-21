import { requestAnimationFrame } from '../../lib/requestAnimationFrame'

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
        this.end = opts.end;
        this.r = opts.r;
        this.id = opts.id;
        // 贝塞尔时间
        this.t = 0;
        let firstControlFactor = opts.firstControlFactor || 0.5;
        let secondControlFactor = opts.secondControlFactor || 0.5;
        let time = opts.speedBezierFactor || 6000;
        this.speedArcFactor = opts.speedArcFactor || 200;
        this.startArcAngle = opts.startArcAngle || 0;
        this.endArcAngle = opts.endArcAngle || Math.PI * 2;
        this.counterclockwise = opts.counterclockwise || false
        this.arcDirction = opts.arcDirction || 'bottom'
        this.step = 0
        // 控制点
        this.cps1 = this.computeControlPoint(this.from.location, this.to.location, firstControlFactor)
        this.cps2 = this.computeControlPoint(this.to.location, this.end.location, secondControlFactor)
        this.path = this.getPointList(this.from.location, this.end.location, this.cps1, this.cps2, time)
    }

    MarkLine.prototype.getPointList = function (from, end, cps1, cps2, time) {
        let points = [];
        let step = (2000) / (60 * time);
        for (let t = 0; t <= 1; t += step) {
            const point = this.getPointByTime(from, cps1, cps2, end, t);
            points.push(point)
        }
        //修正最后一点在插值产生的偏移
        points[points.length - 1] = end;
        return points;
    }

    MarkLine.prototype.getPointByTime = function (from, cp1, cp2, end, t) {
        //参数分别为t，起始点，两个控制点和终点
        let x1 = from.x, y1 = from.y;
        let x2 = end.x, y2 = end.y;
        let cx1 = cp1.x, cy1 = cp1.y;
        let cx2 = cp2.x, cy2 = cp2.y
        let x =
            x1 * (1 - t) * (1 - t) * (1 - t) +
            3 * cx1 * t * (1 - t) * (1 - t) +
            3 * cx2 * t * t * (1 - t) +
            x2 * t * t * t;
        let y =
            y1 * (1 - t) * (1 - t) * (1 - t) +
            3 * cy1 * t * (1 - t) * (1 - t) +
            3 * cy2 * t * t * (1 - t) +
            y2 * t * t * t;
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

    MarkLine.prototype.getArcPointList = function (start, r, startAngel, endAngel) {
        let points = [];
        let step = Math.PI / this.speedArcFactor;
        let dy = this.arcDirction === 'top' ? -r : r
        for (let angel = startAngel + step; angel < endAngel; angel += step) {
            let point = {
                x: start.x + r * Math.cos(angel),
                y: start.y + r * Math.sin(angel) + dy
            }

            if (this.counterclockwise) {
                if (!(angel > startAngel + Math.PI * 2 && angel < endAngel || 
                    angel > startAngel && angel < endAngel - Math.PI * 2)) {
                        points.push(point)
                }
            } else {
                points.push(point)
            }
        }
        
        let endPoint = {
            x: start.x + r * Math.cos(endAngel),
            y: start.y + r * Math.sin(endAngel) +  r
        }
        
        // 逆时针则反转数组
        points = this.counterclockwise ? points.reverse() : points;
        //修正最后一点在插值产生的偏移
        points[points.length - 1] = endPoint;
        return points
    }

    MarkLine.prototype.drawLinePath = function (context) {
        context.save();
        context.beginPath();
        context.lineWidth = options.lineWidth;
        context.strokeStyle = options.colors[this.id] || '#EDCC72';
        if (options.lineDash.length === 2) {
            context.setLineDash(options.lineDash);
        }
        context.moveTo(this.from.location.x, this.from.location.y);
        context.bezierCurveTo(this.cps1.x, this.cps1.y, this.cps2.x, this.cps2.y, this.end.location.x, this.end.location.y);
        if (this.r && this.r > 0) {
            let dy = this.arcDirction === 'top' ? -this.r : this.r
            context.arc(this.end.location.x, this.end.location.y + dy, this.r, this.startArcAngle, this.endArcAngle, this.counterclockwise);
            let arcPointList = this.getArcPointList(this.end.location, this.r,this.startArcAngle, this.endArcAngle)
            this.path = [...this.path, ...arcPointList]
        }

        context.stroke();
        context.restore();
        this.t = 0;
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
            // line.drawMarker(ctx);
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
                r: line.r,
                firstControlFactor: line.firstControlFactor,
                secondControlFactor: line.secondControlFactor,
                speedBezierFactor: line.speedBezierFactor,
                speedArcFactor: line.speedArcFactor,
                startArcAngle: line.startArcAngle,
                endArcAngle: line.endArcAngle,
                counterclockwise: line.counterclockwise,
                arcDirction: line.arcDirction,
                from: new Marker({
                    location: line.from,
                    color: options.colors[i] || '#EDCC72',
                }),
                to: new Marker({
                    location: line.to,
                    color: options.colors[i] || '#EDCC72'
                }),
                end: new Marker({
                    location: line.end,
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