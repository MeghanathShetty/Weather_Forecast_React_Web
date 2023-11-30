import "bootstrap/dist/css/bootstrap.min.css";
// import {Button,Form} from "antd";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { PreloadVideos } from "../components/utils/PreloadVideos";

// styles
import "../styles/topNav.css"
import "../styles/midPart.css"
import "../styles/bottomPart.css"
import "../styles/main.css"
import "../styles/sideBar.css"

// import "../public/styles/videobackground.css"

function MyApp({Component,pageProps})
{
    return (
        <>
            <PreloadVideos />
            <ToastContainer position="top-center" />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp;