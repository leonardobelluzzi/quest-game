"use client";

import { useEffect, useState } from "react";
import { ButtonAlternative } from "./button-alternative";
import { Game, Question } from "../question";
import { useRouter } from "next/navigation";



interface ScreenQuestionProps {

  roomId: string;
  questionId: number;
}

export function ScreenQuestion({ roomId , questionId}: ScreenQuestionProps) {


  const router = useRouter();

  const [gameData, setGameData] = useState<Game>();

  useEffect(() => {
    async function fetchGameData() {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quest/v1/searchGame/${roomId}`);
        const data = await response.json();
        setGameData(data);
      } catch (error) {
        console.error("Error fetching game data:", error);
      }
    }

    fetchGameData();
  }, [roomId, questionId]);
  
  //Simulando uma consulta por categoria da pergunta
    const categoria = gameData?.questions[questionId].catText as keyof typeof CoresCategoria;

    const CoresCategoria: { [key in 'Artes' | 'Ciencia' | 'Mundo' | 'Esporte' | 'Sociedade' | 'Variedades']: string } = {
        Artes : '#B91C1C', 
        Ciencia: '#1E40AF',
        Mundo : '#B45309',
        Esporte : '#15803D',
        Sociedade : '#6B21A8',
        Variedades : '#C2410C',

    }
    //exemplo uma categoria, depois implementar lógica**
    const corPergunta = categoria ? CoresCategoria[categoria] : '#000000'; // Default color if category is not found

    return (

      <div className="bg-white space-y-6 max-w-[1200px] border-8 p-4 rounded-3xl" style={{borderColor : corPergunta}}>
            <h1 className= "text-center" style={{color: corPergunta}}>   
               {categoria}
            </h1>
        <div className="text-justify text-xl" style={{color : corPergunta}}>

            {gameData?.questions[questionId].text}

              <div className = "flex flex-col gap-4 items-center">
                <ButtonAlternative borderColor={corPergunta} textAlternative={gameData?.questions[questionId].answers[0].text || ''}
            roomId={roomId} questionId={questionId} gameData={gameData} valorAposta={1} correctAlternative={gameData?.questions[questionId].answers[0].correct}></ButtonAlternative>
                <ButtonAlternative borderColor = {corPergunta} textAlternative = {gameData?.questions[questionId].answers[1].text || ''} 
                  roomId={roomId} questionId={questionId} gameData={gameData} valorAposta={1} correctAlternative={gameData?.questions[questionId].answers[1].correct}></ButtonAlternative>
                <ButtonAlternative borderColor = {corPergunta} textAlternative = {gameData?.questions[questionId].answers[2].text || ''} 
                  roomId={roomId} questionId={questionId} gameData={gameData} valorAposta={1} correctAlternative={gameData?.questions[questionId].answers[2].correct}></ButtonAlternative>
                <ButtonAlternative borderColor = {corPergunta} textAlternative = {gameData?.questions[questionId].answers[3].text || ''} 
                  roomId={roomId} questionId={questionId} gameData={gameData} valorAposta={1} correctAlternative={gameData?.questions[questionId].answers[3].correct}></ButtonAlternative>
           </div> 
        </div>


      </div>
    );

}