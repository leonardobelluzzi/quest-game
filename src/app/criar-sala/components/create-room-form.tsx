"use client";

import {
  Button,
  ErrorMessage,
  GoBackButton,
  Input,
  useAuth,
} from "@/app/components";
import { AuthModal } from "@/app/components/auth-modal";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";

export function CreateRoomForm() {
  const [nickname, setNickname] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const userData = JSON.parse(localStorage.getItem("user") || "{}");
    const idUser = userData.id;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/quest/v1/createGame`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ idUser }),
      }
    );

    if (!response.ok) {
      throw new Error("Erro ao realizar criacao da sala");
    }

    const responseGame = await response.json();
      const { idFormat, gameStatus, idPlayerOne, idPlayerTwo } = responseGame; // Extrai todos os campos do objeto JSON

      router.push(`/${idFormat}/sala-de-espera`);

  }

  return (
    <>
      <form
        className="font-poppins flex flex-col text-center gap-1 bg-white rounded-lg p-6 text-blue-950 w-full"
        onSubmit={handleSubmit}
      >
        <GoBackButton href="/">Voltar</GoBackButton>
        <h1 className="font-extrabold text-2xl mt-4">Crie uma nova sala</h1>
        <p className="text-md leading-5 my-2">
          Insira os dados para criar uma nova sala e compartilhe com outro
          jogador!
        </p>
        <div className="w-full space-y-4 mt-4">
          <Input
            icon={<FaRegUserCircle size={24} className="text-blue-950" />}
            value={isLoading ? "Carregando..." : user?.username}
            onChange={(event) => setNickname(event.target.value)}
            placeholder="Username"
            disabled
          />
          <ErrorMessage>{errorMessage}</ErrorMessage>
        </div>

        <div className="w-full mt-4">
          <Button type="submit">Criar sala</Button>
        </div>
      </form>
      {!isLoading && !user && <AuthModal />}
    </>
  );
}
