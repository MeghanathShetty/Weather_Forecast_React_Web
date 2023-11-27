import "bootstrap/dist/css/bootstrap.min.css";
// import {Button,Form} from "antd";
import {ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// styles
import "../public/styles/topNav.css"
import "../public/styles/midPart.css"
import "../public/styles/bottomPart.css"
import "../public/styles/main.css"
import "../public/styles/sideBar.css"

// import "../public/styles/videobackground.css"

function MyApp({Component,pageProps})
{
    return (
        <>
            <ToastContainer position="top-center" />
            <Component {...pageProps} />
        </>
    )
}

export default MyApp;