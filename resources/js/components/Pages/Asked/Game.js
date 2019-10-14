import React, { Component } from 'react';
import swal from "sweetalert2";

import Hexagon from './Hexagon';

import './../../../../css/pages/Game.css';

class Game extends Component {
    constructor(props) {
        super(props);
                
        this.state = {
            questionCurrent: this.props.questionCurrent,
            totalQuestion: this.props.questionWithAnswers.length,
            questionWithAnswers: this.props.questionWithAnswers,
            currentQuestionWithAnswers: null,
        };

        this.getCurrentQuestionWithAnswers = this.getCurrentQuestionWithAnswers.bind(this);
        this.getAnswerUser = this.getAnswerUser.bind(this);
    };

    /**
     * Recibe la respuesta del usuario para comprobar si es valida o no,
     * muestra los diferentes mensajes segun sea el caso
     * @param {string} answer 
     */
    getAnswerUser(answer) {
        if (this.state.currentQuestionWithAnswers.answer === answer) {
            swal.fire({
                title: '<i class="fa fa-check-circle"></i>',
                text: 'Respuesta correcta',
                confirmButtonColor: '#343a40',
                confirmButtonText: 'Ok',
            }).then(() => {
                if (this.state.questionCurrent < this.state.totalQuestion) {
                    this.setState({
                        questionCurrent: this.state.questionCurrent+1,
                    });
                } else {
                    swal.fire({
                        title: '<i class="fas fa-info-circle"></i>',
                        text: 'Juego finalizado',
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok',
                    }).then(() => {
                        location.reload();
                    });
                }
            });
        } else {
            swal.fire({
                title: '<i class="fas fa-exclamation-circle"></i>',
                text: 'Respuesta incorrecta',
                confirmButtonColor: '#343a40',
                confirmButtonText: 'Ok',
            }).then(() => {
                if (this.state.questionCurrent < this.state.totalQuestion) {
                    this.setState({
                        questionCurrent: this.state.questionCurrent+1,
                    });
                } else {
                    swal.fire({
                        title: '<i class="fas fa-info-circle"></i>',
                        text: 'Juego finalizado',
                        confirmButtonColor: '#343a40',
                        confirmButtonText: 'Ok',
                    }).then(() => {
                        location.reload();
                    });
                }
            });
        }
    };

    
    /**
     * Toma la pregunta actual con sus posibles respuestas.
     * Ademas se encarga de saltear las posibles respuestas para que no queden
     * en la misma posicion. 
     */
    getCurrentQuestionWithAnswers() {
        let questionWithAnswerShuffle = [];
        let questionWithAnswer = this.state.questionWithAnswers.map((questionWithAnswer, index) => {
            return(
                (this.state.questionCurrent === index+1 ) ?
                [
                    <Hexagon 
                        key={index}
                        typeQuestion={true}
                        text={questionWithAnswer.question}
                    />,
                    <Hexagon 
                        key={index+1}
                        typeQuestion={false}
                        text={questionWithAnswer.answer}
                        getAnswerUser={this.getAnswerUser}
                    />,
                    <Hexagon 
                        key={index+2}
                        typeQuestion={false}
                        text={questionWithAnswer.optionOne}
                        getAnswerUser={this.getAnswerUser}
                    />,
                    (questionWithAnswer.optionTwo !== "") ?
                    <Hexagon
                        key={index+3} 
                        typeQuestion={false}
                        text={questionWithAnswer.optionTwo}
                        getAnswerUser={this.getAnswerUser}
                    /> : null,
                    (questionWithAnswer.optionThree !== "") ?
                    <Hexagon 
                        key={index+4}
                        typeQuestion={false}
                        text={questionWithAnswer.optionThree}
                        getAnswerUser={this.getAnswerUser}
                    /> : null,
                    (questionWithAnswer.optionFour !== "") ?
                    <Hexagon 
                        key={index+5}
                        typeQuestion={false}
                        text={questionWithAnswer.optionFour}
                        getAnswerUser={this.getAnswerUser}
                    /> : null,
                ] :
                null
            );
        });
        
        if (questionWithAnswer !== null) {
            questionWithAnswer = questionWithAnswer.filter(Boolean);
                if(questionWithAnswer[0] !== undefined) {
                    questionWithAnswer = questionWithAnswer[0].filter(Boolean);
                    questionWithAnswerShuffle.push(questionWithAnswer[0]);
                    questionWithAnswer.shift();
                    questionWithAnswer.sort(function() {return Math.random() - 0.5});
                    questionWithAnswer.map((answer, index) => {questionWithAnswerShuffle.push(answer); });
                }
        }

        return questionWithAnswerShuffle;
    };

    /**
     * Toma la pregunta con las respuestas actuales
     */
    componentDidMount() {
        this.setState({
            currentQuestionWithAnswers: this.state.questionWithAnswers[this.state.questionCurrent-1],
        });
    };

    /**
     * Detecta cuando hay un cambio del numero de pregunta y se la asigna
     * a la pregunta y respuesta actual
     */
    componentDidUpdate(prevProps, prevState) {
        if ((this.props.questionCurrent !== prevProps.questionCurrent) || (this.state.questionCurrent !== prevState.questionCurrent)) {
            console.log("Entre");
            this.setState({
                currentQuestionWithAnswers: this.state.questionWithAnswers[this.state.questionCurrent-1],
            });
        }
    };

    render() {
        console.log(this.state.currentQuestionWithAnswers);
        return (
            <React.Fragment>
                {
                    this.getCurrentQuestionWithAnswers()
                }
                <div className="row mt-5 pt-5 justify-content-end">
                    <div className="col-4">
                        <p>{this.state.questionCurrent}/{this.state.totalQuestion}</p>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default Game;