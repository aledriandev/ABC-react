class ABCquiz extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <section className="container">
                <div id="abc-game" className="text-center abc-game">
                    <div><img id="prev" src="img/left.svg" alt=""/></div>
                    <div><img id="next" src="img/right.svg" alt=""/></div>
                    <img id='vehicle' src="img/1.svg" alt=""/>
                    <p id="textProgress" className='text-left'>0 of 5 answered</p>
                    
                    <div className="bg-white text-center" id="game">
                        <h4 id="question"></h4>
                        <div id="choices" className="row text-center choices"></div>
                        <div className="social">
                            <div className='circle'><img src="img/fb.png" alt=""/></div>
                            <div className='circle'><img src="img/tw.png" alt=""/></div>
                            <div className='circle'><img src="img/g+.png" alt=""/></div>
                        </div>
                    </div>
                    <div className="bg-white text-center" id="result"></div>
                    <div className="bg-white text-center" id="again"></div>
                </div>
            </section>
        );
    }
}

ReactDOM.render(<ABCquiz />, document.getElementById("container"));