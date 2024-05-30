import { FormFieldProps} from './types';


const FormField: React.FC<FormFieldProps> =({
    labelName, label, type,placeholder, value, name, handleChange, checked,
    register, error,valueAsNumber
}) =>(
    <label className='h-24 font-bold flex flex-col py-2 capitalize text-lg'
    htmlFor={labelName}>
        {label}
        <input
        className={`bg-transparent border-b border-green placeholder:font-light py-2`}
        type={type}
        checked={checked}
        placeholder={placeholder}
        value={value}
        {...register(name, {valueAsNumber,
            onChange: handleChange
        })}
        />
    {error && <span className='text-sm text-red-600'>{error.message}</span>}
    </label>
);

export default FormField;