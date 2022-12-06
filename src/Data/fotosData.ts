const breakpoints = [3840, 2400, 1080, 640, 384, 256, 128, 96, 64, 48];

const links = (id: string, width: number, height: number) =>
    `https://imgur.com/${id}/${width}x${height}`;   

const Photos = [
    { id: "QEQmTOj.jpg", width: 1024, height: 768 },
    { id: "0j24C94.jpg", width: 1024, height: 768 },
    { id: "ZnbJizv.jpg", width: 768, height: 1024 },
    { id: "OG8sYb8.jpg", width: 1024, height: 768 },
    { id: "HNLR61I.jpg", width: 768, height: 1024 },
    { id: "PCia5BV.jpg", width: 1024, height: 768 },
    { id: "nj7fOoO.jpg", width: 768, height: 1024 },

    { id: "yBAyLpF.jpg", width: 1632, height: 1224 },
    { id: "C06HsMa.jpg", width: 1632, height: 1224 },
    { id: "5UaK84B.jpg", width: 1632, height: 1224 },
    { id: "tA7vLmz.jpg", width: 1632, height: 1224 },
    { id: "XNgeyZz.jpg", width: 1632, height: 1224 },
    { id: "1azaItM.jpg", width: 1632, height: 1224 },
    { id: "lPKDZqq.jpg", width: 1632, height: 1224 },
    { id: "MZuXPEt.jpg", width: 1632, height: 1224 },
    { id: "QTER65U.jpg", width: 1632, height: 1224 },
    { id: "sWbglNN.jpg", width: 1632, height: 1224 },
    { id: "E4oqTWF.jpg", width: 1632, height: 1224 },
    { id: "ADYfjOR.jpg", width: 1632, height: 1224 }, 
];

const fotosData = Photos.map((photo) => {
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