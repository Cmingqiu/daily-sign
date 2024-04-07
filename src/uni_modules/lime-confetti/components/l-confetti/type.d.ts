// @ts-nocheck

export interface Canvas {
	width?: number
	height?: number
	left?: number
	right?: number
	bottom?: number
	context?: any
	getContext?: (type: string) => any
	requestAnimationFrame?: (cb: Function) => any,
	cancelAnimationFrame?: (id: any) => any,
}


export declare const isWindow: boolean;
interface Fetti {
    x: number;
    y: number;
    angle2D: number;
    velocity: number;
    drift: number;
    gravity: number;
    wobble: number;
    wobbleSpeed: number;
    decay: number;
    tiltAngle: number;
    tiltSin: number;
    tiltCos: number;
    random: number;
    wobbleX: number;
    wobbleY: number;
    scalar: number;
    tick: number;
    totalTicks: number;
    ovalScalar: number;
    color: {
        r: number;
        g: number;
        b: number;
    };
    shape: Shape;
}
declare type Shape = 'circle' | 'star' | 'square';
interface Size {
    width: number;
    height: number;
}
export interface Options {
    particleCount?: number;
    angle?: number;
    spread?: number;
    startVelocity?: number;
    decay?: number;
    gravity?: number;
    drift?: number;
    ticks?: number;
    x?: number;
    y?: number;
    shapes?: Shape[];
    zIndex?: number;
    colors: string[];
    disableForReducedMotion?: boolean;
    scalar?: number;
}
// @ts-ignore
export declare class Confetti {
    canvas: any;
    play: any;
    raf: {
        frame: (cb: any) => {};
        cancel: (id: any) => void;
    };
    done: any;
    options: any;
    constructor(canvas?: any, options?: any);
    _requestAnimationFrame(): void;
    convert(val: string, transform?: Function): any;
    isOk(val: any): boolean;
    prop(options: any, name: string, transform?: Function): any;
    onlyPositiveInt(number: number): number;
    randomInt(min: number, max: number): number;
    toDecimal(str: string): number;
    colorsToRgb(colors: string[]): {
        r: number;
        g: number;
        b: number;
    }[];
    hexToRgb(str: string): {
        r: number;
        g: number;
        b: number;
    };
    getOrigin(options: any): any;
    setCanvasWindowSize(canvas: HTMLCanvasElement): void;
    setCanvasRectSize(canvas: HTMLCanvasElement): void;
    getCanvas(zIndex: string): HTMLCanvasElement | undefined;
    _draw(context: any): void;
    ellipse(context: CanvasRenderingContext2D, x: number, y: number, radiusX: number, radiusY: number, rotation: number, startAngle: number, endAngle: number, antiClockwise?: boolean): void;
    randomPhysics(opts: any): {
        x: any;
        y: any;
        wobble: number;
        wobbleSpeed: number;
        velocity: number;
        angle2D: number;
        tiltAngle: number;
        color: any;
        shape: any;
        tick: number;
        totalTicks: any;
        decay: any;
        drift: any;
        random: number;
        tiltSin: number;
        tiltCos: number;
        wobbleX: number;
        wobbleY: number;
        gravity: number;
        ovalScalar: number;
        scalar: any;
    };
    updateFetti(context: CanvasRenderingContext2D, fetti: Fetti): boolean;
    animate(canvas: HTMLCanvasElement, fettis: Fetti[], resizer: Function, size: Size, done: Function): {
        addFettis: (fettis: Fetti[]) => Promise<unknown>;
        canvas: HTMLCanvasElement;
        promise: Promise<unknown>;
        reset: () => void;
    };
    confettiCannon(canvas: HTMLCanvasElement, globalOpts: Options): {
        (options: Options): any;
        reset(): void;
    };
}
export {};
