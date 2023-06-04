import { Card } from "flowbite-react"
import { FaTrash } from "react-icons/fa"
import { Item as ItemModel } from "../models/item"
import { ChangeEvent,useState } from "react";
import * as ItemsApi from "../network/items_api";

interface ItemProps {
    item: ItemModel;
    // onChangeStateClicked : (item: ItemModel) => void
   // onItemClicked: (item: ItemModel) => void,
    onDeleteClicked: (item: ItemModel) => void
}
const Item = ({ item,onDeleteClicked }: ItemProps) => {
    let [check, setCheck] = useState(item.state.id == 1 ? true : false);
    let [currentState, setCurrentState] = useState(false);
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        async function stopVm() {
          try {
                // let itemResponse: ItemModel;
                setCheck(false);
               await ItemsApi.updateItemToStop(item);
            }
           catch (error) {
            console.error(error);
            alert(error)
          }
        }
        async function resumeVm() {
            try {
                  // let itemResponse: ItemModel;
                  setCheck(false);
                 await ItemsApi.updateItemToResume(item);
              }
             catch (error) {
              console.error(error);
              alert(error)
            }
          }
        
        if (check){
            stopVm()
        }
        else {
            resumeVm()
        }
    }

    return (
        <Card className='relative cursor-pointer' imgSrc="https://miro.medium.com/v2/resize:fit:800/1*SIpSf-asJAUkS4cOumEqeg.png">
            <div className='absolute top-0 right-0 left-0 bg-red-600 rounded-tr-md  rounded-bl-xl w-10 h-10  flex ml-auto'>
                <FaTrash className="m-auto text-white justify-center items-center"
                    onClick={(e) => {
                         onDeleteClicked(item);
                        e.stopPropagation();
                    }}
                />
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                    {item.name}
                </p>
            </h5>
            <div className="text-l  font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="mr-1">Ram : </span>  
                <span className="font-normal text-gray-700 dark:text-gray-400">
                    <span>
                        {item.ram}          
                    </span>
                </span>
            </div>
            <div className="text-l  font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="mr-1">Cpu : </span>  
                <span className="font-normal text-gray-700 dark:text-gray-400">
                    <span>
                        {item.cpu}          
                    </span>
                </span>
            </div>
            <div className="text-l  font-bold tracking-tight text-gray-900 dark:text-white">
                <span className="mr-1">State : </span>  
                <span className="font-normal text-gray-700 dark:text-gray-400">
                    <span>
                        {item.state.state}          
                    </span>
                </span>
            </div>
            <div className="flex">
                <span className="mr-3 text-sm text-align text-center items-center font-medium text-gray-900 dark:text-gray-300">Resume</span>
                <label className="relative inline-flex items-center mb-5 cursor-pointer" >
                    <input title="toggle"  name="toggle" type="checkbox" value="" checked={check} onChange={handleChange} className="sr-only peer" />
                    <div className="w-11 h-6 bg-red-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                </label>
            </div>
        </Card >
    );
}

export default Item;