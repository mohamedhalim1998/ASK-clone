interface InputFieldParams {
  label: string;
  type: string;
  placeholder: string;
}
const InputField: React.FC<
  InputFieldParams & React.HTMLAttributes<HTMLDivElement>
> = (params) => {
  return (
    <div>
      <h5 className="text-xs font-semibold mt-4 mb-1">{params.label}</h5>
      <input
        type={params.type}
        placeholder={params.placeholder}
        className="border py-3 px-2 w-full focus:outline-none"
      />
    </div>
  );
};
export default InputField;
