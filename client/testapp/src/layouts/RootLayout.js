import Navigation from  "../components.js/Navigation";
import MaybeShowNav from  "../components.js/MaybeShowNav";
import {Outlet} from "react-router-dom";

export default function RootLayout(){
    return (
        <div>
            <Navigation />
            <Outlet />
        </div>
    )
}