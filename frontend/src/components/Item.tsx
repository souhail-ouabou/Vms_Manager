import { Button, Card } from "flowbite-react";
import { FaTrash } from "react-icons/fa";
import { Item as ItemModel } from "../models/item";
import { ChangeEvent, useState } from "react";
import * as ItemsApi from "../network/items_api";

interface ItemProps {
  item: ItemModel;
  // onChangeStateClicked : (item: ItemModel) => void
  onStartClicked: (item: ItemModel) => void;
  onDeleteClicked: (item: ItemModel) => void;
  onShutdownClicked: (item: ItemModel) => void;
  onStopClicked: (item: ItemModel) => void;
  onResumeClicked: (item: ItemModel) => void;
}
const Item = ({
  item,
  onDeleteClicked,
  onStartClicked,
  onShutdownClicked,
  onStopClicked,
  onResumeClicked,
}: ItemProps) => {
  let [check, setCheck] = useState(item.state.id === 1);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      if (check) {
        await onStopClicked(item);
        setCheck((prev) => !prev);
      } else {
        await onResumeClicked(item);
        setCheck((prev) => !prev);
      }
    } catch (error) {
      alert(error);
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
            onDeleteClicked(item);
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
        <span className="mr-3 text-sm text-align text-center items-center font-medium text-gray-900 dark:text-gray-300">
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
        {(item.state.id === 4 || item.state.id === 5) && (
          <span className="ml-3 text-ellipsis	 text-sm text-red-500 ">
            Cannot change the state when the vm shutdown
          </span>
        )}
      </div>

      {item.state.id === 4 || item.state.id === 5 ? (
        <Button onClick={() => onStartClicked(item)} size="sm">
          Start
        </Button>
      ) : (
        <Button
          disabled={item.state.id === 3}
          onClick={() => onShutdownClicked(item)}
          size="sm"
          color="red"
        >
          Shutdown
        </Button>
      )}
    </Card>
  );
};

export default Item;
