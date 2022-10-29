import { useEffect } from "react";
import { useParams } from "react-router-dom";
import AnswerCard from "../components/AnswerCard";
import AskQuestionCard from "../components/AskQuestionCard";
import Navbar from "../components/Navbar";
import { selectAnswerById } from "../store/FeedReducer";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { addFollowUpQuestion, addQuestion } from "../store/InboxReduer";

function AskUserPage() {
  const { username, id } = useParams();
  const dispatch = useAppDispatch();
  var answer = useAppSelector(selectAnswerById(+id!));
  const submitQuestion = (question: string, anonymously: boolean) => {
    if (id) {
      dispatch(
        addFollowUpQuestion(
          question,
          username!,
          anonymously,
          answer.question.id
        )
      );
    } else {
      dispatch(addQuestion(question, username!, anonymously));
    }
  };
  return (
    <div>
      <Navbar />
      <div className=" w-2/3 mx-auto pt-2">
        <div className="rounded-md w-2/3 text-white">
          <AskQuestionCard
            label={`Ask @${username}`}
            onSubmit={submitQuestion}
            allowAnonymously={true}
          />
          {id && <AnswerCard answer={answer} showReplay={false} />}
        </div>
      </div>
    </div>
  );
}

export default AskUserPage;
