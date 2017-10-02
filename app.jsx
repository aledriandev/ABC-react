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
        // this.correctAnswers = [];
        this.state = {
            question: this.questions[0].question,
            choices: this.questions[0].choices,
            count: 1,
            answers: [],
            // correctAnswers : []
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

    showChoices () { 
        const letters = ['img/a.gif' ,'img/b.gif' ,'img/c.gif' ];
        return this.state.choices.map((choice,index)=>{
            console.log(this.answers);
            return (<div key={index} className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
                        <button key={index} id={index} className='btn-question' onClick={(e)=>this.counter(e,index)}>
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
    
    counter (e,index) {
        let count = this.state.count;
        if (count<5) {
            this.cambioEstado(count);
            this.answers.push(index);
            console.log(this.questions);
        }else if (count ==5){
            this.answers.push(index);
            console.log(this.answers);
            this.cambioEstadoRespuesta();
        }
    }

    cambioEstadoRespuesta () {
        this.setState({
            question: '',
            choices: [],
            count: 0,
            answers: this.answers,
            // correctAnswers: this.correctAnswers
        });
    }

    answersUser () {
        return this.state.answers.map((answer,index)=>{
            return (
                <div key={index}>
                    <p><b>{this.questions[index].question}: </b>{this.questions[index].choices[parseInt(answer)]}</p>
                </div>
            );
        });
    }
    showAnswers () {
        return (
            <div>
                <h3>Here are you answers:</h3>
                {this.answersUser()}
                <button onClick={e=>this.showSolution(e)}>Submit</button>
            </div>
        );
    }

    solution () {
        return this.state.answers.map((answer,index)=>{
            if( answer == 0){
                return <p class='correct'>
                            <b>{this.questions[index].question}: </b>{this.questions[index].choices[parseInt(answer)]}
                        </p>;
            }else{
                return <p class='incorrect'>
                            <del><b>{this.questions[index].question}: </b>{this.questions[index].choices[parseInt(answer)]}</del>
                            {this.questions[index].choices[0]}
                        </p>;
            }
        });
    }

    showSolution () {
        return (
            <div>
                <h3>Solution</h3>
                {this.solution()}
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
                        {this.showAnswers()}
                        {this.showSolution()}
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