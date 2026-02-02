export const shapeDefinations = {
    // --- BASIC SHAPES ---
    rectangle: {
        type: 'rect',
        label: 'Rectangle',
        defaultProps: { width: 150, height: 80, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 },
        thumbnail: (fabric, canvas) => {
            canvas.add(new fabric.Rect({ width: 80, height: 50, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    square: {
        type: 'rect',
        label: 'Square',
        defaultProps: { width: 100, height: 100, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 },
        thumbnail: (fabric, canvas) => {
            canvas.add(new fabric.Rect({ width: 60, height: 60, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    circle: {
        type: 'circle',
        label: 'Circle',
        defaultProps: { radius: 50, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 },
        thumbnail: (fabric, canvas) => {
            canvas.add(new fabric.Circle({ radius: 35, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    ellipse: {
        type: 'ellipse',
        label: 'Ellipse',
        defaultProps: { rx: 70, ry: 40, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 },
        thumbnail: (fabric, canvas) => {
            canvas.add(new fabric.Ellipse({ rx: 40, ry: 25, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    triangle: {
        type: 'triangle',
        label: 'Triangle',
        defaultProps: { width: 100, height: 100, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 },
        thumbnail: (fabric, canvas) => {
            canvas.add(new fabric.Triangle({ width: 70, height: 70, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },

    // --- POLYGONS & LINES ---
    line: {
        type: 'line',
        label: 'Line',
        defaultProps: { points: [0, 0, 100, 0], stroke: '#ffffff', strokeWidth: 2 },
        thumbnail: (fabric, canvas) => {
            canvas.add(new fabric.Line([0, 0, 80, 0], { stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    pentagon: {
        type: 'polygon',
        label: 'Pentagon',
        defaultProps: { 
            points: [{x:40,y:0},{x:80,y:30},{x:65,y:75},{x:15,y:75},{x:0,y:30}],
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const points = [{x:40,y:0},{x:80,y:30},{x:65,y:75},{x:15,y:75},{x:0,y:30}];
            canvas.add(new fabric.Polygon(points, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    hexagon: {
        type: 'polygon',
        label: 'Hexagon',
        defaultProps: { 
            points: [{x:20,y:0},{x:60,y:0},{x:80,y:35},{x:60,y:70},{x:20,y:70},{x:0,y:35}],
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const points = [{x:20,y:0},{x:60,y:0},{x:80,y:35},{x:60,y:70},{x:20,y:70},{x:0,y:35}];
            canvas.add(new fabric.Polygon(points, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },

    // --- COMPLEX PATHS (Icons) ---
    star: {
        type: 'path',
        label: 'Star',
        defaultProps: { 
            path: "M 50 0 L 61 35 L 98 35 L 68 57 L 79 91 L 50 70 L 21 91 L 32 57 L 2 35 L 39 35 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const starPath = "M 50 0 L 61 35 L 98 35 L 68 57 L 79 91 L 50 70 L 21 91 L 32 57 L 2 35 L 39 35 Z";
            canvas.add(new fabric.Path(starPath, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    heart: {
        type: 'path',
        label: 'Heart',
        defaultProps: { 
            path: "M 50 15 C 35 -15 0 0 0 35 C 0 65 50 95 50 95 C 50 95 100 65 100 35 C 100 0 65 -15 50 15 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const heartPath = "M 50 15 C 35 -15 0 0 0 35 C 0 65 50 95 50 95 C 50 95 100 65 100 35 C 100 0 65 -15 50 15 Z";
            canvas.add(new fabric.Path(heartPath, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    arrowRight: {
        type: 'path',
        label: 'Arrow Right',
        defaultProps: { 
            path: "M 0 30 L 60 30 L 60 0 L 100 50 L 60 100 L 60 70 L 0 70 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 0 30 L 60 30 L 60 0 L 100 50 L 60 100 L 60 70 L 0 70 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    bubble: {
        type: 'path',
        label: 'Speech Bubble',
        defaultProps: { 
            path: "M 10 10 H 90 V 70 H 40 L 10 90 V 70 H 10 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 10 10 H 90 V 70 H 40 L 10 90 V 70 H 10 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    diamond: {
        type: 'polygon',
        label: 'Diamond',
        defaultProps: { 
            points: [{x:40,y:0},{x:80,y:40},{x:40,y:80},{x:0,y:40}],
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const points = [{x:40,y:0},{x:80,y:40},{x:40,y:80},{x:0,y:40}];
            canvas.add(new fabric.Polygon(points, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    cross: {
        type: 'path',
        label: 'Cross',
        defaultProps: { 
            path: "M 30 0 H 70 V 30 H 100 V 70 H 70 V 100 H 30 V 70 H 0 V 30 H 30 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 30 0 H 70 V 30 H 100 V 70 H 70 V 100 H 30 V 70 H 0 V 30 H 30 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    moon: {
        type: 'path',
        label: 'Moon',
        defaultProps: { 
            path: "M 50 100 A 40 40 0 1 0 50 0 A 30 30 0 1 1 50 100 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 50 100 A 40 40 0 1 0 50 0 A 30 30 0 1 1 50 100 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    parallelogram: {
        type: 'polygon',
        label: 'Parallelogram',
        defaultProps: { 
            points: [{x:20,y:0},{x:100,y:0},{x:80,y:60},{x:0,y:60}],
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const points = [{x:20,y:0},{x:100,y:0},{x:80,y:60},{x:0,y:60}];
            canvas.add(new fabric.Polygon(points, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    trapezoid: {
        type: 'polygon',
        label: 'Trapezoid',
        defaultProps: { 
            points: [{x:20,y:0},{x:80,y:0},{x:100,y:60},{x:0,y:60}],
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const points = [{x:20,y:0},{x:80,y:0},{x:100,y:60},{x:0,y:60}];
            canvas.add(new fabric.Polygon(points, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    octagon: {
        type: 'polygon',
        label: 'Octagon',
        defaultProps: { 
            points: [{x:30,y:0},{x:70,y:0},{x:100,y:30},{x:100,y:70},{x:70,y:100},{x:30,y:100},{x:0,y:70},{x:0,y:30}],
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const points = [{x:30,y:0},{x:70,y:0},{x:100,y:30},{x:100,y:70},{x:70,y:100},{x:30,y:100},{x:0,y:70},{x:0,y:30}];
            canvas.add(new fabric.Polygon(points, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    lightning: {
        type: 'path',
        label: 'Lightning',
        defaultProps: { 
            path: "M 50 0 L 10 60 L 40 60 L 20 100 L 90 40 L 60 40 L 80 0 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 50 0 L 10 60 L 40 60 L 20 100 L 90 40 L 60 40 L 80 0 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    ring: {
        type: 'circle',
        label: 'Ring',
        defaultProps: { radius: 50, fill: 'transparent', stroke: '#ffffff', strokeWidth: 10 },
        thumbnail: (fabric, canvas) => {
            canvas.add(new fabric.Circle({ radius: 30, fill: 'transparent', stroke: '#ffffff', strokeWidth: 6 }));
            return canvas;
        }
    },
    plus: {
        type: 'path',
        label: 'Plus',
        defaultProps: { 
            path: "M 35 0 H 65 V 35 H 100 V 65 H 65 V 100 H 35 V 65 H 0 V 35 H 35 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 35 0 H 65 V 35 H 100 V 65 H 65 V 100 H 35 V 65 H 0 V 35 H 35 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    arrowLeft: {
        type: 'path',
        label: 'Arrow Left',
        defaultProps: { 
            path: "M 100 30 H 40 V 0 L 0 50 L 40 100 V 70 H 100 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 100 30 H 40 V 0 L 0 50 L 40 100 V 70 H 100 Z";
                canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
                return canvas;
            }
        },
        arrowUp: {
            type: 'path',
            label: 'Arrow Up',
            defaultProps: { 
                path: "M 30 100 V 40 H 0 L 50 0 L 100 40 H 70 V 100 Z",
                fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 30 100 V 40 H 0 L 50 0 L 100 40 H 70 V 100 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    chevronRight: {
        type: 'path',
        label: 'Chevron',
        defaultProps: { 
            path: "M 30 10 L 70 50 L 30 90",
            fill: 'transparent', stroke: '#ffffff', strokeWidth: 4 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 30 10 L 70 50 L 30 90";
            canvas.add(new fabric.Path(path, { fill: 'transparent', stroke: '#ffffff', strokeWidth: 4 }));
            return canvas;
        }
    },
    tag: {
        type: 'path',
        label: 'Tag',
        defaultProps: { 
            path: "M 0 20 Q 0 0 20 0 H 60 L 100 50 L 60 100 H 20 Q 0 100 0 80 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 0 20 Q 0 0 20 0 H 60 L 100 50 L 60 100 H 20 Q 0 100 0 80 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    heptagon: {
        type: 'polygon',
        label: 'Heptagon',
        defaultProps: { 
            points: [{x:50,y:0},{x:90,y:20},{x:100,y:60},{x:75,y:100},{x:25,y:100},{x:0,y:60},{x:10,y:20}],
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const points = [{x:50,y:0},{x:90,y:20},{x:100,y:60},{x:75,y:100},{x:25,y:100},{x:0,y:60},{x:10,y:20}];
            canvas.add(new fabric.Polygon(points, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    cylinder: {
        type: 'path',
        label: 'Cylinder',
        defaultProps: { 
            path: "M 10 20 A 40 10 0 1 1 90 20 V 80 A 40 10 0 1 1 10 80 Z M 10 20 A 40 10 0 1 0 90 20",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 10 20 A 40 10 0 1 1 90 20 V 80 A 40 10 0 1 1 10 80 Z M 10 20 A 40 10 0 1 0 90 20";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    shield: {
        type: 'path',
        label: 'Shield',
        defaultProps: { 
            path: "M 50 0 L 90 15 V 50 C 90 80 50 100 50 100 C 50 100 10 80 10 50 V 15 Z",
            fill: '#000000', stroke: '#ffffff', strokeWidth: 2 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 50 0 L 90 15 V 50 C 90 80 50 100 50 100 C 50 100 10 80 10 50 V 15 Z";
            canvas.add(new fabric.Path(path, { fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    capsule: {
        type: 'rect',
        label: 'Capsule',
        defaultProps: { width: 150, height: 60, rx: 30, ry: 30, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 },
        thumbnail: (fabric, canvas) => {
            canvas.add(new fabric.Rect({ width: 80, height: 40, rx: 20, ry: 20, fill: '#000000', stroke: '#ffffff', strokeWidth: 2 }));
            return canvas;
        }
    },
    search: {
        type: 'path',
        label: 'Search',
        defaultProps: { 
            path: "M 40 40 A 30 30 0 1 0 40 0 A 30 30 0 1 0 40 40 Z M 60 60 L 90 90",
            fill: 'transparent', stroke: '#ffffff', strokeWidth: 3 
        },
        thumbnail: (fabric, canvas) => {
            const path = "M 40 40 A 30 30 0 1 0 40 0 A 30 30 0 1 0 40 40 Z M 60 60 L 90 90";
            canvas.add(new fabric.Path(path, { fill: 'transparent', stroke: '#ffffff', strokeWidth: 4 }));
            return canvas;
        }
    }
};
export const shapeTypes = [
    "rectangle", "circle", "triangle", "square", "ellipse", "line", 
    "pentagon", "hexagon", "star", "heart", "arrowRight", "bubble", 
    "diamond", "cross", "moon", "parallelogram", "trapezoid", "octagon", 
    "lightning", "ring", "plus", "arrowLeft", "arrowUp", "chevronRight", 
    "tag", "heptagon", "cylinder", "shield", "capsule", "search"
];