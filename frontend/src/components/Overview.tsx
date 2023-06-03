import { FaPlusCircle } from "react-icons/fa";
import { Item as ItemModel } from '../models/item';

import Item from "./Item";
import { useState } from "react";
import AddEditItemDialog from "./AddEditItemDialog";

const Overview = () => {
    const [items, setItems] = useState<ItemModel[]>([]);
    const [itemToEdit, setItemToEdit] = useState<ItemModel | null>(null);
    const [showEditItemDialog, setShowEditItemDialog] = useState(false);

    const itemss = [{
        "id": 1,
        "title": "Machin1,ò",
        "text": "teeext",
    },
    {
        "id": 2,
        "title": "Machin2 ,ò",
        "text": "teeext",
    }]
    // useEffect(() => {
    //     async function loadNotes() {
    //         try {
    //             setShowNotesLoadingError(false);
    //             setNotesLoading(true);
    //             const notes = await NotesApi.fetchNotes();
    //             setNotes(notes);
    //         } catch (error) {
    //             console.error(error);
    //             setShowNotesLoadingError(true);
    //         }
    //         finally {
    //             setNotesLoading(false);
    //         }
    //     }
    //     loadNotes();
    // }, []);
    // async function deleteNote(note: NoteModel) {
    //     try {
    //         await NotesApi.deleteNote(note._id);
    //         setNotes(notes.filter(existingNote => existingNote._id !== note._id));
    //     } catch (error) {
    //         console.error(error);
    //         alert(error)
    //     }
    // }
    const itemsGrid = <div className="mx-auto container py-2 px-6">
        <div className="grid sm:gap-6 gap-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 ">
            {itemss.map((item) => (
                <Item
                    item={item}
                    key={item.id}
                //    onItemClicked={setItemToEdit} // or   onNoteClicked={(note) => setNoteToEdit(note)}
                // onDeleteClicked={deleteNote} 
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
            {/* {notesLoading &&
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
            {showNotesLoadingError && <p>Something went wrong. Please refresh the page</p>} */}
            {/* {!notesLoading && !showNotesLoadingError && */}
            <>
                {itemss.length > 0
                    ? itemsGrid : <p>You don't have any Vms yet</p>
                }
            </>
            {/* } */}
            {itemToEdit &&
                <AddEditItemDialog
                    onDismiss={() => setItemToEdit(null)}
                    showModal={true}
                    itemToEdit={itemToEdit}
                    onItemSaved={(updatedItem) => {
                        setItems(items.map(existingItem => existingItem.id === existingItem.id ? updatedItem : existingItem))
                        setItemToEdit(null);
                    }} />
            }

        </>
    );
}

export default Overview;