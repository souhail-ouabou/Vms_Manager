import { useForm } from "react-hook-form";

import TextInputField from "./form/TextInputField";
import { ItemInput } from "../network/items_api";
import { Item } from "../models/item";
import * as ItemsApi from "../network/items_api";

import { toast } from "react-toastify";

interface AddEditNoteDialogProps {
  showModal: boolean;
  onDismiss: () => void;
  onItemSaved: (item: Item) => void;
}
const AddEditItemDialog = ({
  onItemSaved,
  onDismiss,
  showModal,
}: AddEditNoteDialogProps) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ItemInput>({
    defaultValues: {
      name: "",
      ram: 2,
      cpu: 2,
      iso_path: "",
      storage: 20,
    },
  });
  async function onSubmit(input: ItemInput) {
    try {
      let itemResponse: Item;

      itemResponse = await ItemsApi.createVm(input);

      onItemSaved(itemResponse);
      onDismiss();
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  return (
    <>
      {showModal ? (
        <>
          <div className="fixed inset-0 z-10 overflow-y-auto ">
            <div className="flex  items-center justify-center min-h-screen px-4 py-8">
              <div className="relative w-full h-full max-w-md md:h-auto  shadow-black shadow-2xl">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                  <button
                    type="button"
                    className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                    data-modal-hide="authentication-modal"
                  >
                    <svg
                      onClick={() => onDismiss()}
                      aria-hidden="true"
                      className="w-5 h-5"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span className="sr-only">Close modal</span>
                  </button>
                  <div className="px-6 py-6 lg:px-8">
                    <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                      {" "}
                      {"Add Virtual Machine"}
                    </h3>
                    <form
                      className="space-y-6"
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <TextInputField
                        name="name"
                        label="Name"
                        type="text"
                        placeholder="Name"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.name}
                      />
                      <TextInputField
                        name="ram"
                        label="Ram"
                        type="number"
                        placeholder="Ram"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.ram}
                      />
                      <TextInputField
                        name="cpu"
                        label="Cpu"
                        type="number"
                        placeholder="Cpu"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.cpu}
                      />
                      <TextInputField
                        name="storage"
                        label="Storage on GB"
                        type="text"
                        placeholder="20"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.storage}
                      />
                      <TextInputField
                        name="iso_path"
                        label="Iso Path"
                        type="text"
                        placeholder="iso path"
                        register={register}
                        registerOptions={{ required: "Required" }}
                        error={errors.iso_path}
                      />

                      <div className="flex">
                        <button
                          className="ml-auto text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                          type="submit"
                          disabled={isSubmitting}
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>

                {isSubmitting && (
                  <div
                    role="status"
                    className="absolute w-full h-full flex items-center justify-center bg-white/80 inset-0 z-10"
                  >
                    <svg
                      aria-hidden="true"
                      className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                      viewBox="0 0 100 101"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                        fill="currentColor"
                      />
                      <path
                        d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                        fill="currentFill"
                      />
                    </svg>
                    <span className="sr-only">Loading...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      ) : null}
    </>
  );
};
export default AddEditItemDialog;
