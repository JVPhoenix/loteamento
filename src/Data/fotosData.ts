const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

// const links = (id: string, width: number, height: number) =>
//     `https://source.unsplash.com/${id}/${width}x${height}`;

const links = (id: string, width: number, height: number) =>
    `https://imgur.com/${id}/${width}x${height}`;   

const unsplashPhotos = [
    { id: "yBAyLpF.jpg", width: 3264, height: 2448 },
    { id: "C06HsMa.jpg", width: 3264, height: 2448 },
    { id: "5UaK84B.jpg", width: 3264, height: 2448 },
    { id: "tA7vLmz.jpg", width: 3264, height: 2448 },
    { id: "XNgeyZz.jpg", width: 3264, height: 2448 },
    { id: "1azaItM.jpg", width: 3264, height: 2448 },
    { id: "lPKDZqq.jpg", width: 3264, height: 2448 },
    { id: "MZuXPEt.jpg", width: 3264, height: 2448 },
    { id: "QTER65U.jpg", width: 3264, height: 2448 },
    { id: "sWbglNN.jpg", width: 3264, height: 2448 },
    { id: "E4oqTWF.jpg", width: 3264, height: 2448 },
    { id: "ADYfjOR.jpg", width: 3264, height: 2448 }, 
];

const fotosData = unsplashPhotos.map((photo) => {
    const width = breakpoints[0];
    const height = (photo.height / photo.width) * width;

    return {
        src: links(photo.id, width, height),
        width,
        height,
        images: breakpoints.map((breakpoint) => {
            const height = Math.round((photo.height / photo.width) * breakpoint);
            return {
                src: links(photo.id, breakpoint, height),
                width: breakpoint,
                height,
            };
        }),
    };
});

export default fotosData;
