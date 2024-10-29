import { Avatar } from "./components/avatar-user";
import { Avatar2 } from "./components/avatar-user2";
import { ScreenQuestion } from "./components/main-screen-game";
import { SquarePoint } from "./components/square-point";
import { Timer } from "./components/square-timer";
import { useRouter } from "next/navigation";


export default function Page({ params }: Props){

return (
  <div className="font-[family-name:var(--font-geist-mono)]  text-center text-4xl font-bold">
   <h1 className="text-5xl">Quest</h1>
    <div className="w-full space-y-4 border border-foreground p-2 rounded-xl">
      <ScreenQuestion roomId={params.roomId} questionId={params.questionId} />
        <div className="flex flex-row gap-60 justify-center  p-4">
          <div className="flex flex-row gap-2 ">
          <Avatar/>
          <SquarePoint/>
          </div>
          <Timer/>
          <div className="flex flex-row gap-2">
          <SquarePoint></SquarePoint>
          <Avatar2></Avatar2>
        </div>
      </div>
    </div>
  </div>
);

}

type Props = {
  params: {
    roomId: string;
    questionId: string;
  };
};
