import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainPage from "../main/MainPage";
import Images from "../pages/Imagens";

export default function MainRoutes(){
    return(
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="midia" element={<Images />} />
            </Routes>
        </BrowserRouter>
    )
}