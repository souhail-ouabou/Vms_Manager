import { Card } from "flowbite-react"
import { FaTrash } from "react-icons/fa"
import { Item as ItemModel } from "../models/item"

interface ItemProps {
    item: any;
   // onItemClicked: (item: ItemModel) => void,
    // onDeleteClicked: (note: NoteModel) => void
}
const Item = ({ item }: ItemProps) => {
    return (
        <Card  className='relative cursor-pointer' imgSrc="https://miro.medium.com/v2/resize:fit:800/1*SIpSf-asJAUkS4cOumEqeg.png">
            <div className='absolute top-0 right-0 left-0 bg-red-600 rounded-tr-md  rounded-bl-xl w-10 h-10  flex ml-auto'>
                <FaTrash className="m-auto text-white justify-center items-center"
                    onClick={(e) => {
                        // onDeleteClicked(note);
                        e.stopPropagation();
                    }}
                />
            </div>
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                <p>
                    Noteworthy technology acquisitions 2021
                </p>
            </h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">
                <p>
                    Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
                </p>
            </p>
            <div className="flex">
                <span className="mr-3 text-sm text-align text-center items-center font-medium text-gray-900 dark:text-gray-300">Resume</span>
                <label className="relative inline-flex items-center mb-5 cursor-pointer" >
                    <input title="toggle" type="checkbox" value="" className="sr-only peer" />
                    <div className="w-11 h-6 bg-red-600 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600">
                    </div>
                </label>
            </div>
        </Card >
    );
}

export default Item;