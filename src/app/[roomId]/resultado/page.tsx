"use client";

import { DrumRoll } from "./components/drum-roll";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Game } from "@/shared/protocols";

export default function Page({ params }: Props) {
  const [gameStatus, setGameStatus] = useState(null);
  const router = useRouter();
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const startPolling = () => {
      const interval = setInterval(async () => {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/quest/v1/searchGame/${params.roomId}`
        );

        const data = (await response.json()) as Game;

        if (data.gameStatus === "FINISHED") {
          debugger;
          clearInterval(interval);
          if (data.userWinner === userId) {
            
            router.push(`/resultado/ganhador`);
          } else {
            
            router.push(`/resultado/perdedor`);
          }
        }
      }, 1000);

      return () => clearInterval(interval);
    };
  
    startPolling();
  });

  
  return <DrumRoll />;
}


type Props = {
  params: {
    roomId: string;
  };
};
