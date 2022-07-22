import React, { FC } from "react";

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
        <svg
          className="w-6 h-6 hover:fill-black cursor-pointer"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          ></path>
        </svg>
        
      </div>
    </div>
  );
};

export default AnswerCard;
