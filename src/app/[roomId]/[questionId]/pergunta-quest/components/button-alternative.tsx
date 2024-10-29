"use client";

import React from "react";
import { Button } from "@/app/components";
import { useRouter } from "next/navigation";
import { Game } from "../question";


interface ButtonAlternativeProps{
    borderColor : string;
    textAlternative: string; 
    roomId: string;
    questionId: number;
    valorAposta: number;
    correctAlternative: boolean;
    gameData?: Game;
}


export function ButtonAlternative({ borderColor , textAlternative, roomId, questionId, gameData, valorAposta, correctAlternative} : ButtonAlternativeProps){
    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const idUser = userData.id;

    const router = useRouter();

    if (correctAlternative && gameData && gameData.pointPlayerOne !== null){

        if (idUser === gameData.idPlayerOne){
            gameData.pointPlayerOne += valorAposta;
        } else {
            gameData.pointPlayerTwo += valorAposta;
        }

    }

    const handleClick = async () => {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/quest/v1/saveGame`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ gameData }),
        });
  
        if (!response.ok) {
          throw new Error('Failed to save game');
        }
  
        // Redirecionar após salvar o jogo para proxima pergunta
        questionId = parseInt(questionId.toString(), 10) + 1;
        router.push(`/${roomId}/${questionId}/pergunta-quest`);
      } catch (error) {
        console.error('Error saving game:', error);
      }
    };
  
    
    return(
        <Button
            style={{
                maxWidth:'300px',
                borderColor:`${borderColor}`
            }}
            onClick={handleClick}
            >
                {textAlternative}
        </Button>
    );
}