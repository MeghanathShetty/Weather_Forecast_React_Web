const BottomPart =({weather})=>
{
    let imgSrc="/img/a3.jpg";
    return (
        <>
            {/* bottom part */}
            <div className="bot-main">
                        <div className="bot-inner" >
                            <center>
                                <div>
                                    <b>
                                    Wind Now
                                    </b>
                                </div>
                                <div >
                                    <b>
                                        {weather?.current?.wind_kph ?? "--"} kph
                                    </b>
                                </div>
                            </center>
                        </div>

                        <div className="bot-inner" >
                            <center>
                                <div>
                                    <b>
                                        Humidity
                                    </b>
                                </div>
                                <div >
                                    <b>
                                        {weather?.current?.humidity ?? "--"} %
                                    </b>
                                </div>
                            </center>
                        </div>

                        <div className="bot-inner" >
                            <center>
                                <div>
                                    <b>
                                        Wind Direction
                                    </b>
                                </div>
                                <div >
                                    <b>
                                {weather?.current?.wind_dir ?? "--"} 
                                    </b>
                                </div>
                            </center>
                        </div>
            </div>
                
        </>
    )

}

export default BottomPart;