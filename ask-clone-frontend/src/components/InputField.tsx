interface InputFieldParams {
  label: string;
  type: string;
  value: string;
  placeholder: string;
  onChange: (newVal: string) => void;
}
const InputField: React.FC<InputFieldParams> = (params) => {
  return (
    <div>
      <h5 className="text-xs font-semibold mt-4 mb-1">{params.label}</h5>
      <input
        type={params.type}
        placeholder={params.placeholder}
        onChange={(e) => {
          params.onChange(e.currentTarget.value);
        }}
        value={params.value}
        className="border py-3 px-2 w-full rounded-sm focus:outline-none"
      />
    </div>
  );
};
export default InputField;
