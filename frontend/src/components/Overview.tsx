import { FaPlusCircle } from "react-icons/fa";
import { Item as ItemModel } from '../models/item';
import * as ItemsApi from "../network/items_api"
import Item from "./Item";
import { useEffect, useState } from "react";
import AddEditItemDialog from "./AddEditItemDialog";

const Overview = () => {
    const [items, setItems] = useState<ItemModel[]>([]);
    const [itemsLoading, setItemsLoading] = useState(false);
    const [itemToEdit, setItemToEdit] = useState<ItemModel | null>(null);
    const [showItemsLoadingError, setShowItemsLoadingError] = useState(false);

    const [showEditItemDialog, setShowEditItemDialog] = useState(false);

    const itemss = [
        {
            "uuid": "e430f0bc-7ad7-4492-8b68-1d32e4161e57",
            "name": "ubuntu22.04",
            "ram": 2048,
            "cpu": 2,
            "state": {
                "id": 1,
                "state": "The domain is shut off"
            }
        },  
        {
            "uuid": "e430f0dc-7ad7-4492-8b68-1d32e4161e57",
            "name": "ubuntu22.04 2",
            "ram": 2048,
            "cpu": 2,
            "state": {
                "id": 5,
                "state": "The domain is shut off"
            }
        },
        {
            "uuid": "e430f0dk-7ad7-4492-8b68-1d32e4161e57",
            "name": "ubuntu22.04 2",
            "ram": 2048,
            "cpu": 2,
            "state": {
                "id": 5,
                "state": "The domain is shut off"
            }
        },
        {
            "uuid": "e430k0dc-7ad7-4492-8b68-1d32e4161e57",
            "name": "ubuntu22.04 2",
            "ram": 2048,
            "cpu": 2,
            "state": {
                "id": 1,
                "state": "The domain is shut off"
            }
        }
    ]
    useEffect(() => {
        async function loadItems() {
            try {
                setShowItemsLoadingError(false);
                setItemsLoading(true);
                const items = await ItemsApi.fetchItems();
                setItems(items);
            } catch (error) {
                console.error(error);
                setShowItemsLoadingError(true);
            }
            finally {
                setItemsLoading(false);
            }
        }
        loadItems();
    }, []); 
    async function deleteItem(item: ItemModel) {
        try {
            await ItemsApi.deleteItem(item);
            setItems(items.filter(existingItem => existingItem.uuid !== item.uuid));
        } catch (error) {
            console.error(error);
            alert(error)
        }
    }
    const itemsGrid = <div className="mx-auto container py-2 px-6">
        <div className="grid sm:gap-6 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
            {items.map((item) => (
                <Item
                    item={item}
                    key={item.uuid}
                    // onChangeStateClicked={item} 
                //    onItemClicked={setItemToEdit} // or   onNoteClicked={(note) => setNoteToEdit(note)}
                   onDeleteClicked={deleteItem} 
                />)
            )}
        </div>
    </div>
    return (
        <>
            <div className=" flex mt-12 items-center justify-center h-28">
                <button
                    className="flex items-center px-6 py-3 text-purple-100 bg-purple-600 rounded-md font-medium"
                    type="button"
                    onClick={() => setShowEditItemDialog(true)}
                >
                    <FaPlusCircle className="mr-2 text-white justify-center items-center" />
                    Add VM
                </button>
            </div>
            {showEditItemDialog &&
                <AddEditItemDialog
                    onDismiss={() => setShowEditItemDialog(false)}
                    showModal={true} onItemSaved={(newItem) => {
                        setItems([...items, newItem])
                        setShowEditItemDialog(false)
                    }} />
            }
            {itemsLoading &&
                <div className="mx-auto container py-2 px-6  animate-pulse">
                    <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-4"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[330px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[300px] mb-2.5"></div>
                    <div className="h-2 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[360px]"></div>
                    <span className="sr-only">Loading...</span>
                </div>
            }
            {showItemsLoadingError && <p>Something went wrong. Please refresh the page</p>}
            {!itemsLoading && !showItemsLoadingError &&
            <>
                {items.length > 0
                    ? itemsGrid : <p>You don't have any Vms yet</p>
                }
            </>
            }


        </>
    );
}

export default Overview;