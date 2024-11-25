"use client";
import { FloatingButtonProvider } from "../context/FloatingButtonContext";
import { CategoriesProvider } from "../context/CategoriesContext";
export default function App({children}){
    return(
<FloatingButtonProvider>
<CategoriesProvider>
{children}
</CategoriesProvider>
    </FloatingButtonProvider>)
}

