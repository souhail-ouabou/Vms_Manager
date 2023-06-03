import { FieldError, RegisterOptions, UseFormRegister } from "react-hook-form";

interface TextInputFieldProps {
    name: string,
    label: string,
    register: UseFormRegister<any>,
    registerOptions?: RegisterOptions,
    error?: FieldError,
    [x: string]: any,
    area?: any,
}

const TextInputField = ({ name, label, register, registerOptions, error, area, ...props }: TextInputFieldProps) => {
    return (<div>
        <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">{label}</label>
        {error?.message && (<>
            <p className="p-2 text-red-500 text-xs italic">{error?.message}</p>
        </>
        )
        }
        {area ? <textarea className={`py-2 px-3 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600  dark:placeholder-gray-400 dark:text-white ${error?.message ? "border rounded-md focus:border-red-500 border-red-500" : "border border-gray-500"}`}
            {...props}
            {...register(name, registerOptions)}
        /> :
            <input className={`py-2 px-3 bg-gray-50 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600  dark:placeholder-gray-400 dark:text-white ${error?.message ? "border rounded-md focus:border-red-500 border-red-500" : "border border-gray-500"}`}
                {...props}
                {...register(name, registerOptions)}
            />
        }



    </div>);
}

export default TextInputField;