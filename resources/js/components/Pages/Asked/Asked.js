import React, { Component } from 'react';
import axios from 'axios';

import Home from './Home';
import Game from './Game';

class Asked extends Component {
    constructor(props) {
        super(props);
                
        this.state = {
            homeGame: true,
            questionAnswers: false,
            questionWithAnswers: [],
        };

      this.onChangeHomeGame = this.onChangeHomeGame.bind(this);
    };

    /**
     * Cambia de pantalla del home al juego de preguntados
     */
    onChangeHomeGame() {
        this.setState({
            homeGame: false,
            questionAnswers: true,
        });
    };

    /**
     * Carga las preguntas y respuetas que se usaran en el juego
     */
    componentDidMount() {

        axios.get("/api/preguntados/pregutas-respuestas")
            .then(res => {
                this.setState({
                    questionWithAnswers: res.data.preguntas,
                });
                console.log(1000,res)
            })
            .catch(function(error) {
                console.log(2000,error);
            });


        // this.setState({
        //     questionWithAnswers: [
        //         {
        //             "_id": "5d8d42e24d93140b608843ff",
        //             "idQuestion": 1,
        //             "idCategory": 1,
        //             "question": "¿QUIÉN ES MÁS GRANDE CAROLINA “PAMPITA” ARDOHAIN O NICOLE NEUMANN?",
        //             "answer": "CAROLINA \"PAMPITA\"",
        //             "optionOne": "NICOLE NEUMANN",
        //             "optionTwo": "",
        //             "optionThree": "",
        //             "optionFour": "",
        //             "__v": 0
        //         },
        //         {
        //             "_id": "5d8d43304d93140b60884400",
        //             "idQuestion": 2,
        //             "idCategory": 1,
        //             "question": "ADEMÁS DEL ACEITE ¿CUÁL ES EL INGREDIENTE FUNDAMENTAL DEL ALIOLI?",
        //             "answer": "AJO",
        //             "optionOne": "KETCHUP",
        //             "optionTwo": "PIMIENTA",
        //             "optionThree": "LIMON",
        //             "optionFour": "OREGANO",
        //             "__v": 0
        //         },
        //         {
        //             "_id": "5d8d435e4d93140b60884401",
        //             "idQuestion": 3,
        //             "idCategory": 1,
        //             "question": "¿CON QUÉ PRÍNCIPE BRITÁNICO ESTÁ CASADA MEGHAN MARKLE?",
        //             "answer": "PRINCIPE HARRY",
        //             "optionOne": "GUILLERMO",
        //             "optionTwo": "CARLOS",
        //             "optionThree": "",
        //             "optionFour": "",
        //             "__v": 0
        //         }
        //     ]
        // });
    };

    render() {
        return (
            <div className="container">
                { this.state.homeGame &&
                    <Home
                        nextPage={this.onChangeHomeGame}
                    />
                }
                { this.state.questionAnswers &&
                    <Game
                        questionWithAnswers={this.state.questionWithAnswers}
                        questionCurrent={1}
                    />
                }
            </div>
        );
    }
}

export default Asked;