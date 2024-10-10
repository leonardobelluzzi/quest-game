"use client";

import { Button, ErrorMessage, Input, useAuth } from "@/app/components";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function CreateRoomForm() {
  const [finalScore, setFinalScore] = useState<number>();
  const [errorMessage, setErrorMessage] = useState<string>();
  const router = useRouter();
  const { user } = useAuth();

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!finalScore) {
      setErrorMessage("O campo pontuação final é obrigatório");
      return;
    }

    if (finalScore < 1) {
      setErrorMessage("A pontuação final deve ser maior que 0");
      return;
    }

    const randomIdAlphanumeric = Math.random().toString(36).slice(2);
    router.push(`/${randomIdAlphanumeric}/sala-de-espera`);
  }

  return (
    <form
      className="w-full space-y-6 border border-foreground p-8 rounded-lg"
      onSubmit={handleSubmit}
    >
      <h1 className="font-[family-name:var(--font-geist-mono)] w-full text-center text-2xl font-bold">
        Crie uma nova sala
      </h1>
      <p className="text-lg text-center">
        Insira os dados para criar uma nova sala e compartilhe com outro
        jogador!
      </p>
      <div className="w-full space-y-4">
        <div className="w-full">
          <label className="text-foreground mb-2 inline-block font-semibold">
            Usuário: {user?.username}
          </label>
        </div>
        <div className="w-full">
          <Input
            label="Pontuação final"
            value={finalScore}
            onChange={(event) => setFinalScore(Number(event.target.value))}
            placeholder="100"
            type="number"
            min="1"
          />
        </div>
        <ErrorMessage>{errorMessage}</ErrorMessage>
      </div>
      <div className="w-full flex justify-end">
        <div className="w-fit">
          <Button variant="light" type="submit">
            Criar sala
          </Button>
        </div>
      </div>
    </form>
  );
}
