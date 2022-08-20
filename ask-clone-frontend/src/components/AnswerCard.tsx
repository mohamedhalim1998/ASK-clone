import React, { FC } from "react";
import { LikeIcon } from "../utils/Icons";

const AnswerCard: FC = () => {
  return (
    <div className="bg-white rounded-md w-full p-4 text-themeblack">
      <h3 className="font-semibold text-xl  " dir="auto">
        إزاي أعرف إذا كان خطيبي بخيل ولا حريص عشان لسة في بداية حياته ؟
      </h3>
      <div className="flex fkex-row">
        <img
          src="https://cuad.ask.fm/3c8/35d77/5630/4fad/b7c3/eff86398c263/normal/116045.jpg"
          className="rounded-full w-9 h-9 m-2"
        />
        <div className="my-auto">
          <p className="font-semibold">هاني عبد الله</p>
          <p className="text-gray-400 text-xs">July 22, 2022</p>
        </div>
      </div>
      <div className="">
        <p dir="auto" className="text-base ">
          زي ما أنتِ متخوفه من بخله، هو كمان متخوف من إسرافك. أو إنك تعتبريه ATM
          بس. كمان عندنا عادات عقيمة بتزيد يوم عن يوم بتقاليع جديدة.
          <br></br>
          فالفيصل: طبقته الاجتماعية. الزيارات ومش لازم كل زيارة. المناسبات.
          خروجه برا.. سقط الكلام، وهكذا. هتبقى فيه مؤشرات من دي. والأغلب هيكون
          فيه نسبة حرص لانشغاله بالتجهيزات.
          <br></br>
        </p>
      </div>
      <div className="h-px w-full bg-gray-300 my-2 mx-auto"></div>
      <div className="flex flex-row">
        <LikeIcon />
      </div>
    </div>
  );
};

export default AnswerCard;
