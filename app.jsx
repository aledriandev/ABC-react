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
            count: 1,
            answers: [],
            complete: false,
            solution: false,
            init: true
        };
    }
    changeState (index) {
        this.setState({
            question: this.questions[index].question,
            choices: this.questions[index].choices,
            count: this.state.count +1
        });
    }

    showImagen () {
        const vehicles = ['img/1.svg','img/2.svg','img/3.svg','img/4.svg','img/5.svg','img/6.svg'];
        return <img src={vehicles[this.state.count-1]} alt=""/>
    }

    showChoices () { 
        const letters = ['img/a.gif' ,'img/b.gif' ,'img/c.gif' ];
        return this.state.choices.map((choice,index)=>{
            console.log(this.answers);
            return (<div key={'a'+index} className='col-lg-4 col-md-4 col-sm-6 col-xs-12'>
                        <button className='btn-question' onClick={(e)=>this.counter(e,index)}>
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
                <h3>{this.state.question}</h3>
                <div className="row text-center choices">
                    {this.showChoices()}
                </div>
            </div>
        );
    }
    
    counter (e,index) {
        let count = this.state.count;
        if (count<5) {
            this.changeState(count);
            this.answers.push(index);
            console.log(this.questions);
        }else if (count ==5){
            this.answers.push(index);
            console.log(this.answers);
            this.changeStateComplete();
        }
    }

    changeStateComplete () {
        this.setState({
            init: false,
            complete: true,
            answers: this.answers,
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
                return <p className='correct' key={index}>
                            {this.questions[index].question}: <b>{this.questions[index].choices[parseInt(answer)]}</b>
                        </p>;
            }else{
                return <p className='incorrect' key={index}>
                            <del>{this.questions[index].question}: {this.questions[index].choices[parseInt(answer)]}</del>
                            <b>{this.questions[index].choices[0]}</b>
                        </p>;
            }
        });
    }

    showSolution () {
        this.setState ({
            solution: true,
            complete: false
        });
    }

    prev () {
        this.setState({
            count: this.state.count-1,
        })
        this.answers.pop();
    }

    again () {
        console.log('click ');
        this.answers = [];
        this.setState ({
            question: this.questions[0].question,
            choices: this.questions[0].choices,
            count: 1,
            answers: [],
            complete: false,
            solution: false,
            init: true
        });
    }

    render() {
        // this.cambioEstado(0);
        return (
            <section className="container">
                <div className="text-center abc-game">
                    <div  className='text-left'><img className='btn-direction' src="img/right.svg" alt=""/></div>
                    <div  className='text-left'><img className='btn-direction' src="img/left.svg" onClick={()=>{this.prev()}} alt=""/></div>
                    <div>{this.showImagen()}</div>
                    <p className='text-left'>{this.state.count-1} of 5 answered</p>
                 
                    <div className="bg-white text-center game">
                        {this.state.init&&this.showQuestions()}
                        {this.state.complete&&this.showAnswers()}
                        {this.state.solution&&<div>
                            <h3>Solution</h3>
                            {this.solution()}
                            <button onClick={(e)=>{this.again(e)}}>Again</button>
                        </div>}
                        <div className="social">
                            <div className='circle'><img src="img/fb.png" alt=""/></div>
                            <div className='circle'><img src="img/tw.png" alt=""/></div>
                            <div className='circle'><img src="img/g+.png" alt=""/></div>
                        </div>
                    </div>
                
                    <div className="bg-white text-center result"></div>
                    <div className="bg-white text-center again"></div>
                </div>
            </section>
        );
    }
}

ReactDOM.render(<ABCquiz questions={allQuestions}/>, document.getElementById("container"));