import React, { useState } from "react";
import { PhotoAlbum } from "react-photo-album";
import fotosData from "../Data/fotosData.ts";
import Lightbox from "yet-another-react-lightbox";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import "yet-another-react-lightbox/styles.css";

export default function Images(){
    const slides = fotosData.map(({ src, width, height, images }) => ({
        src,
        width,
        height,
        srcSet: images.map((image) => ({
            src: image.src,
            width: image.width,
            height: image.height,
        })),
    }));

    const [index, setIndex] = useState(-1)
    return(
        <div className="div--fotos">
            <h1>Galeria de Fotos do Loteamento</h1>
            <PhotoAlbum
                photos={fotosData}
                layout="rows"
                targetRowHeight={200}
                onClick={() => setIndex(0)}
                spacing={5}
            />
            <Lightbox 
                slides={slides}
                open={index === 0}
                index={index}
                close={() => setIndex(-1)}
                plugins={[Zoom, Slideshow]}
            />
        </div>
    )
}