import { useReducer, useState } from 'react';
import { ChevronDown, ChevronUp, X, Plus, Send, FileImage } from 'lucide-react';
import ImageUploadDialog from '../components/ImageUploadDialog';

const initialState = {
  bags: [
    {
      id: 'bag-1',
      bagName: 'Large Suitcase 1',
      bagHidden: false,
      bagItems: [
        { id: 'item-1', itemName: '3 shirts', checked: false },
        { id: 'item-2', itemName: '3 pants', checked: false },
        { id: 'item-3', itemName: 'Laptop charger', checked: false },
        { id: 'item-4', itemName: 'baby diapers (1 pack)', checked: false },
        { id: 'item-5', itemName: 'Hiking shoes', checked: false },
        { id: 'item-6', itemName: 'Running shoes', checked: false },
        { id: 'item-7', itemName: 'Jacket', checked: false },
        { id: 'item-8', itemName: 'Baby onesie', checked: false },
      ]
    },
    {
      id: 'bag-2',
      bagName: 'Small Suitcase 1',
      bagHidden: true,
      bagItems: [
        { id: 'item-9', itemName: 'Camera', checked: false },
        { id: 'item-10', itemName: 'Passport', checked: false },
      ]
    },
    {
      id: 'bag-3',
      bagName: 'Backpack 1',
      bagHidden: true,
      bagItems: [
        { id: 'item-11', itemName: 'Water bottle', checked: false },
        { id: 'item-12', itemName: 'Snacks', checked: false },
      ]
    },
    {
      id: 'bag-4',
      bagName: 'Backpack 2',
      bagHidden: false,
      bagItems: [
        { id: 'item-13', itemName: 'Laptop', checked: true },
        { id: 'item-14', itemName: 'Charger', checked: true },
        { id: 'item-15', itemName: 'Mouse', checked: true },
        { id: 'item-16', itemName: 'Headphones', checked: true },
        { id: 'item-17', itemName: 'Notebook', checked: true },
        { id: 'item-18', itemName: 'Pens', checked: true },
        { id: 'item-19', itemName: 'Wallet', checked: true },
        { id: 'item-20', itemName: 'Keys', checked: true },
        { id: 'item-21', itemName: 'Phone', checked: true },
        { id: 'item-22', itemName: 'Sunglasses', checked: true },
      ]
    }
  ]
};

// Action types
const TOGGLE_BAG_VISIBILITY = 'TOGGLE_BAG_VISIBILITY';
const TOGGLE_ITEM_CHECKED = 'TOGGLE_ITEM_CHECKED';
const DELETE_ITEM = 'DELETE_ITEM';
const ADD_ITEM = 'ADD_ITEM';
const ADD_BAG = 'ADD_BAG';
const DELETE_BAG = 'DELETE_BAG';
export const SET_STATE = 'SET_STATE';

// Reducer function
function packingListReducer(state, action) {
  switch (action.type) {
    case TOGGLE_BAG_VISIBILITY:
      return {
        ...state,
        bags: state.bags.map(bag => 
          bag.id === action.bagId 
            ? { ...bag, bagHidden: !bag.bagHidden } 
            : bag
        )
      };
      
    case TOGGLE_ITEM_CHECKED:
      return {
        ...state,
        bags: state.bags.map(bag => 
          bag.id === action.bagId
            ? {
                ...bag,
                bagItems: bag.bagItems.map(item => 
                  item.id === action.itemId
                    ? { ...item, checked: !item.checked }
                    : item
                )
              }
            : bag
        )
      };
      
    case DELETE_ITEM:
      return {
        ...state,
        bags: state.bags.map(bag => 
          bag.id === action.bagId
            ? {
                ...bag,
                bagItems: bag.bagItems.filter(item => item.id !== action.itemId)
              }
            : bag
        )
      };
      
    case ADD_ITEM:
      return {
        ...state,
        bags: state.bags.map(bag => 
          bag.id === action.bagId
            ? {
                ...bag,
                bagItems: [
                  ...bag.bagItems,
                  { 
                    id: `item-${Date.now()}`, 
                    itemName: action.itemName, 
                    checked: false 
                  }
                ]
              }
            : bag
        )
      };
      
    case ADD_BAG:
      return {
        ...state,
        bags: [
          ...state.bags,
          {
            id: `bag-${Date.now()}`,
            bagName: `New Bag ${state.bags.length + 1}`,
            bagHidden: false,
            bagItems: []
          }
        ]
      };

    case DELETE_BAG:
      return {
        ...state,
        bags: state.bags.filter(bag => bag.id !== action.bagId)
      };

    case SET_STATE:
      return action.newState;
      
    default:
      return state;
  }
}

const PackingList = () => {
  const [state, dispatch] = useReducer(packingListReducer, initialState);
  const [newItemText, setNewItemText] = useState('');
  const [bottomInputText, setBottomInputText] = useState('');
  const [previousState, setPreviousState] = useState(null);
  const [responseMessage, setResponseMessage] = useState('');
  const [showError, setShowError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  
  /* Global Metrics */
  const totalItems = state.bags.reduce((total, bag) => total + bag.bagItems.length, 0);
  const packedItems = state.bags.reduce((total, bag) => 
    total + bag.bagItems.filter(item => item.checked).length, 0);
  const progressPercentage = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;
  
  /* Action Dispatchers */
  const toggleBagVisibility = (bagId) => {
    setResponseMessage('');
    dispatch({ type: TOGGLE_BAG_VISIBILITY, bagId });
  };

  const toggleItemChecked = (bagId, itemId) => {
    setResponseMessage('');
    dispatch({ type: TOGGLE_ITEM_CHECKED, bagId, itemId });
  };

  const deleteItem = (bagId, itemId) => {
    setResponseMessage('');
    dispatch({ type: DELETE_ITEM, bagId, itemId });
  };

  const addItemToBag = (bagId, itemName) => {
    setResponseMessage('');
    if (!itemName.trim()) return;
    dispatch({ type: ADD_ITEM, bagId, itemName });
    setNewItemText('');
  };

  const addNewBag = () => {
    setResponseMessage('');
    dispatch({ type: ADD_BAG });
  };

  const deleteBag = (bagId) => {
    setResponseMessage('');
    dispatch({ type: DELETE_BAG, bagId });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!bottomInputText) return;
    setShowError(false);
    setResponseMessage('');
    setIsLoading(true);
    setBottomInputText('');

    try {
      const response = await fetch(
        'https://noggin.rea.gent/shared-cheetah-9397',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_tpf8pvj6pg59ttiiqsfr80b5byj43yi5fcil_ngk',
          },
          body: JSON.stringify({
            "userPrompt": bottomInputText,
            "currentState": JSON.stringify(state),
          }),
        }
      ).then(response => response.text());

      const { updatedState, textResponse } = JSON.parse(response);
      
      if (!updatedState) {
        setShowError(true);
        setResponseMessage('Sorry, I couldn\'t process your request. Please try again.');
        return;
      }

      if (textResponse !== "I don't quite understand your prompt") {
      setPreviousState(state);
      dispatch({ type: SET_STATE, newState: JSON.parse(updatedState) });
      }

      setResponseMessage(textResponse);
    } catch (error) {
      setShowError(true);
      setResponseMessage('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleUndo = () => {
    if (previousState) {
      dispatch({ type: SET_STATE, newState: previousState });
      setPreviousState(null);
      setResponseMessage('');
    }
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow p-4 my-8">
      {/* Overall Progress */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <div className="text-sm font-medium">Overall progress</div>
          <div className="text-sm">{packedItems}/{totalItems} items packed</div>
        </div>
        <div className="h-2 bg-gray-200 rounded-full">
          <div 
            className="h-2 bg-blue-500 rounded-full" 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* Bags List */}
      <div className="space-y-4">
        {state.bags.map((bag, bagIndex) => {
          // Calculate bag metrics
          const bagTotal = bag.bagItems.length;
          const bagPacked = bag.bagItems.filter(item => item.checked).length;
          
          return (
            <div 
              key={bag.id} 
              className={`border rounded-lg overflow-hidden ${
                bagPacked === bagTotal && bagTotal > 0 ? 'bg-green-50 border-green-100' : 'bg-white'
              }`}
            >
              {/* Bag Header */}
              <div 
                className="flex items-center justify-between p-4"
              >
                <div 
                  className="flex-grow cursor-pointer"
                  onClick={() => toggleBagVisibility(bag.id)}
                >
                  <h3 className="font-medium">{bag.bagName}</h3>
                  <p className="text-sm text-gray-500">{bagPacked}/{bagTotal} packed</p>
                </div>
                <div className="flex items-center">
                  <button 
                    onClick={() => {deleteBag(bag.id)}}
                    className="text-gray-400 hover:text-red-500 mr-2"
                  >
                    <X className="h-5 w-5" />
                  </button>
                  <button onClick={() => toggleBagVisibility(bag.id)}>
                    {bag.bagHidden ? <ChevronDown className="h-5 w-5" /> : <ChevronUp className="h-5 w-5" />}
                  </button>
                </div>
              </div>

              {/* Bag Items */}
              {!bag.bagHidden && (
                <div className="px-4 pb-4">
                  <ul className="space-y-2">
                    {bag.bagItems.map((item) => (
                      <li key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={item.checked}
                            onChange={() => toggleItemChecked(bag.id, item.id)}
                            className="h-4 w-4 rounded border-gray-300 text-blue-600"
                          />
                          <span className="ml-3">{item.itemName}</span>
                        </div>
                        <button 
                          onClick={() => deleteItem(bag.id, item.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-5 w-5" />
                        </button>
                      </li>
                    ))}
                  </ul>

                  {/* Add Item Form */}
                  <div className="mt-4 flex">
                    <input
                      type="text"
                      placeholder="Add new item..."
                      className="flex-1 border rounded-l-md px-3 py-2 focus:outline-none focus:ring-1 focus:ring-blue-500"
                      value={newItemText}
                      onChange={(e) => setNewItemText(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          addItemToBag(bag.id, newItemText);
                        }
                      }}
                    />
                    <button
                      onClick={() => addItemToBag(bag.id, newItemText)}
                      className="bg-blue-500 text-white px-3 py-2 rounded-r-md hover:bg-blue-600"
                    >
                      <Plus className="h-5 w-5" />
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add New Bag Button */}
      <button
        onClick={addNewBag}
        className="mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 flex items-center justify-center"
      >
        <Plus className="h-5 w-5 mr-1" /> Add New Bag
      </button>

      {/* Bottom Input Field */}
      <div className="mt-8 border-t pt-4">
        <div className="group relative inline-block">
          <p className="cursor-help font-semibold text-blue-500 hover:text-blue-700">Use AI to help you pack!</p>
          <div className="absolute left-0 top-full mt-2 w-64 p-2 bg-gray-800 text-white text-sm rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
            <p>You can either use the text input field to make changes to your packing list, whether that be shifting items around between your bags or checking off items.</p>
            <p className="mt-2">You can also upload an image of a bunch of items you're about to pack, and those items will be checked off!</p>
          </div>
        </div>
        <form onSubmit={handleSubmit} className="flex-col rounded-lg border overflow-hidden mt-4">
          <textarea
            placeholder="Ask for changes to the packing list (eg. 'I don't have enough bags' or 'check off my Jacket in Large Suitcase 1')"
            className="w-full px-4 py-2 focus:outline-none text-sm resize-none"
            value={bottomInputText}
            onChange={(e) => setBottomInputText(e.target.value)}
          />
          <div className="flex justify-between">
            <button 
              onClick={(e) => {
                e.preventDefault();
                setIsDialogOpen(true);
              }} 
              className="m-2"
            >
              <FileImage className="h-5 w-5" />
            </button>
            <button type="submit" className="bg-blue-500 text-white p-2 rounded-full m-2">
              <Send className="h-5 w-5" />
            </button>
          </div>
        </form>
      </div>

      {/* Image Upload Dialog */}
      <ImageUploadDialog 
        isOpen={isDialogOpen} 
        onClose={() => setIsDialogOpen(false)}
        currentState={state}
        dispatch={dispatch}
        setShowError={setShowError}
        setResponseMessage={setResponseMessage}
        setPreviousState={setPreviousState}
      />

      {/* Response Message */}
      {(responseMessage || showError || isLoading) && (
        <div className={`mb-4 p-3 rounded-md ${
          showError ? 'bg-red-50 text-red-700' : 
          isLoading ? 'bg-gray-50 text-gray-700' : 
          'bg-blue-50 text-blue-700'
        }`}>
          <div className="flex justify-between items-center">
            <p>{isLoading ? 'Loading...' : responseMessage}</p>
            {!showError && !isLoading && previousState && (
              <button
                onClick={handleUndo}
                className="text-sm bg-white px-3 py-1 rounded border border-gray-300 hover:bg-gray-50"
              >
                Undo Changes
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default PackingList;