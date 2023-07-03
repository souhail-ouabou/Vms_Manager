import { Button, Card } from "flowbite-react";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Item as ItemModel } from "../models/item";
import * as ItemsApi from "../network/items_api";

import { toast } from "react-toastify";

interface ItemProps {
  item: ItemModel;

  onItemStateChange: (item: ItemModel) => void;
  onDeleteItem: (uuid: string) => void;
}
const Item = ({
  item,

  onItemStateChange,
  onDeleteItem,
}: ItemProps) => {
  let [check, setCheck] = useState(item.state.id === 1);
  const [isChangingState, setIsChangingState] = useState(false);

  useEffect(() => {
    setCheck(item.state.id === 1);
  }, [item.state.id]);

  async function deleteItem(item: ItemModel) {
    setIsChangingState(true);

    try {
      await ItemsApi.deleteItem(item);
      onDeleteItem(item.uuid);
    } catch (error: any) {
      if (error.message.includes("Domain not found")) {
        onDeleteItem(item.uuid);
        return;
      }
      toast.error(error.message);
    } finally {
      setIsChangingState(false);
    }
  }
  async function startVm(item: ItemModel) {
    setIsChangingState(true);

    try {
      const newItem = await ItemsApi.updateItemToStart(item);
      onItemStateChange(newItem);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsChangingState(false);
    }
  }

  async function shutdownVm(item: ItemModel) {
    setIsChangingState(true);

    try {
      const newItem = await ItemsApi.updateItemToShutdown(item);
      onItemStateChange(newItem);
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsChangingState(false);
    }
  }

  async function stopVm(item: ItemModel) {
    try {
      const newItem = await ItemsApi.updateItemToStop(item);
      onItemStateChange(newItem);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }
  async function resumeVm(item: ItemModel) {
    try {
      const newItem = await ItemsApi.updateItemToResume(item);
      onItemStateChange(newItem);
    } catch (error) {
      toast.error((error as Error).message);
    }
  }

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsChangingState(true);
    try {
      if (check) {
        await stopVm(item);
        setCheck((prev) => !prev);
      } else {
        await resumeVm(item);
        setCheck((prev) => !prev);
      }
    } catch (error) {
      toast.error((error as Error).message);
    } finally {
      setIsChangingState(false);
    }
  };

  return (
    <Card
      className="relative cursor-pointer"
      imgSrc="https://miro.medium.com/v2/resize:fit:800/1*SIpSf-asJAUkS4cOumEqeg.png"
    >
      <div className="absolute top-0 right-0 left-0 bg-red-600 rounded-tr-md  rounded-bl-xl w-10 h-10  flex ml-auto">
        <FaTrash
          className="m-auto text-white justify-center items-center"
          onClick={(e) => {
            deleteItem(item);
            e.stopPropagation();
          }}
        />
      </div>
      <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
        <p>{item.name}</p>
      </h5>
      <div className="text-l  font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="mr-1">Ram : </span>
        <span className="font-normal text-gray-700 dark:text-gray-400">
          <span>{item.ram} GB</span>
        </span>
      </div>
      <div className="text-l  font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="mr-1">Cpu : </span>
        <span className="font-normal text-gray-700 dark:text-gray-400">
          <span>{item.cpu}</span>
        </span>
      </div>
      <div className="text-l  font-bold tracking-tight text-gray-900 dark:text-white">
        <span className="mr-1">State : </span>
        <span className="font-normal text-gray-700 dark:text-gray-400">
          <span>{item.state.state}</span>
        </span>
      </div>

      <div className="flex">
        <span className="mr-3 text-base text-align text-center items-center font-bold text-gray-900 dark:text-gray-300">
          {check ? "Pause" : "Resume"}
        </span>
        <label
          className={`relative inline-flex items-center mb-5 ${
            item.state.id === 4 || item.state.id === 5
              ? "cursor-not-allowed"
              : "cursor-pointer"
          }`}
        >
          <input
            title="toggle"
            disabled={(item.state.id === 4 || item.state.id === 5) && true}
            name="toggle"
            type="checkbox"
            value=""
            checked={!check}
            onChange={handleChange}
            className="sr-only peer"
          />
          <div className="w-11 h-6 bg-red-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600 peer-disabled:bg-gray-400"></div>
        </label>
      </div>

      {item.state.id === 4 || item.state.id === 5 ? (
        <Button onClick={() => startVm(item)} size="sm">
          Start
        </Button>
      ) : (
        <Button
          disabled={item.state.id === 3}
          onClick={() => shutdownVm(item)}
          size="sm"
          color="red"
        >
          Shutdown
        </Button>
      )}

      {isChangingState && (
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
    </Card>
  );
};

export default Item;
