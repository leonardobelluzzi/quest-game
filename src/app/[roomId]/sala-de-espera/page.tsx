"use client";

import { CopyRoomCode, WaitingPlayerContainer } from "./components";
import { GoBackButton } from "@/app/components";
import { LogoQueston } from "@/app/components/logo";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Page({ params }: Props) {

  const [roomCode, setRoomCode] = useState<string>();

   // Função para configurar o intervalo
   const startPolling = () => {
    const interval = setInterval(async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quest/v1/canStartGame/${roomCode}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        if (response.ok) {
          const data = await response.json();
          
        } else {
          console.error("Erro ao obter status do jogo");
        }
      } catch (error) {
        console.error("Erro ao obter status do jogo", error);
      }
    }, 1000);

    return () => clearInterval(interval);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-center space-y-2">
        <LogoQueston/>
      </div>
      <GoBackButton href="/">Voltar</GoBackButton>
      <h1 className="font-[family-name:var(--font-geist-mono)] w-full text-center text-2xl font-bold">
        Sala de espera
      </h1>
      <CopyRoomCode roomId={params.roomId} />
      <WaitingPlayerContainer />
    </div>
  );
}

type Props = {
  params: {
    roomId: string;
  };
};
