import { FormFieldProps} from '../AuthComponents/types';


const FormField: React.FC<FormFieldProps> =({
    labelName, label, type,placeholder,name, register, error,valueAsNumber
}) =>(
    <label className='h-24 font-bold flex flex-col py-2 capitalize text-lg'
    htmlFor={labelName}>
        {label}
        <input
        className={`bg-green-light border-b border-green placeholder:font-light py-2`}
        type={type}
        placeholder={placeholder}
        {...register(name, {valueAsNumber})}
        />
    {error && <span className='text-sm text-red-600'>{error.message}</span>}
    </label>
);

export default FormField;