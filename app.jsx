function Questions (question, correct, wrong1,wrong2){
    this.question = question;
    this.choices = [ correct, wrong1, wrong2];
}

const allQuestions = [
    new Questions ('Which is the oldest airline in the world?','KLM', 'Abianca', 'Qantas'),
    new Questions ('Which is the largest port in the world?','Port of Shanghai', 'Port de Singapore', 'Port of Rotterdam'),
    new Questions ('What is the longest distance cycling backwards?','337.60 Km', '89.30 Km', '675.10 Km'),
    new Questions ('What is the highest speed ever reached by a school bus?','590 Km/h', '320 Km/h', '245 Km/h'),
    new Questions ('What is the longest car trip on one tank of gas?','2617 Km', '3568 Km', '1732 Km')
]

class ABCquiz extends React.Component {
    constructor(props) {
        super(props);
        this.answers = [];
        this.questions = props.questions;
        this.state = {
            question: this.questions[0].question,
            choices: this.questions[0].choices,
            count: 1
        };
        // console.log(allQuestions);
    }
    cambioEstado (index) {
        this.setState({
            question: this.questions[index].question,
            choices: this.questions[index].choices,
            count: this.state.count +1
        });
    }
    counter (e) {
        let count = this.state.count;
        if (count<5) {
            this.cambioEstado(count);
            this.answers.push();
        }else{
            this.cambioEstadoRespuesta();
        }
    }

    cambioEstadoRespuesta () {
        this.setState({
            question: '',
            choices: [],
            count: 0
        });
    }

    showChoices () { 
        const letters = ['img/a.gif' ,'img/b.gif' ,'img/c.gif' ];
        return this.state.choices.map((choice,index)=>{
            return (<div key={index} className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
                        <button className='btn-question' onClick={(e)=>this.counter(e)}>
                            <img className='letter' src={letters[index]} alt=""/>
                            <p>{choice}</p>
                            <div className='div-check'></div>
                            <div className='div-option'></div>
                        </button>
                    </div>);
        });
    }

    showQuestions () {
        return (
            <div>
                <h4>{this.state.question}</h4>
                <div id="choices" className="row text-center choices">
                    {this.showChoices()}
                </div>
            </div>
        );
    }

    render() {
        // this.cambioEstado(0);
        return (
            <section className="container">
                <div id="abc-game" className="text-center abc-game">
                    <div><img id="prev" src="img/left.svg" alt=""/></div>
                    <div><img id="next" src="img/right.svg" alt=""/></div>
                    <img id='vehicle' src="img/1.svg" alt=""/>
                    <p id="textProgress" className='text-left'>0 of 5 answered</p>
                 
                    <div className="bg-white text-center" id="game">
                        {this.showQuestions()}
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

ReactDOM.render(<ABCquiz questions={allQuestions}/>, document.getElementById("container"));