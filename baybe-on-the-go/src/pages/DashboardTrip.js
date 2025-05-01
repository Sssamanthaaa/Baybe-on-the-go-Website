import { useReducer, useState } from 'react';
import { Pencil, Plus, Minus, X, ChevronDown } from 'lucide-react';

// Action types
const UPDATE_TRIP_NAME = 'UPDATE_TRIP_NAME';
const UPDATE_TIME_FRAME = 'UPDATE_TIME_FRAME';
const ADD_DESTINATION = 'ADD_DESTINATION';
const REMOVE_DESTINATION = 'REMOVE_DESTINATION';
const UPDATE_NUM_ADULTS = 'UPDATE_NUM_ADULTS';
const UPDATE_NUM_CHILDREN = 'UPDATE_NUM_CHILDREN';
const UPDATE_NUM_INFANTS = 'UPDATE_NUM_INFANTS';
const ADD_TAG = 'ADD_TAG';
const REMOVE_TAG = 'REMOVE_TAG';
const UPDATE_ALL_TAGS = 'UPDATE_ALL_TAGS';

// Initial state
const initialState = {
  tripName: "Bay Area Family Vacation",
  timeFrameStart: "2025-05-02",
  timeFrameEnd: "2025-05-09",
  destinationNames: [
    { id: 'dest-1', text: 'San Francisco, California' }
  ],
  numAdults: 2,
  numChildren: 2,
  numInfants: 1,
  tags: {
    duration: ['Week-long (6-8 days)'],
    environment: ['Beach/Coastal'],
    activityLevel: ['Moderate Activity'],
    budget: ['Mid-range']
  }
};

// Defines all available tags
const tagsConfig = {
  duration: {
    name: "Duration Tags",
    singleSelection: true,
    options: [
      "Weekend Getaway (1-3 days)",
      "Short Break (3-5 days)",
      "Week-long (6-8 days)",
      "Extended Stay (9+ days)"
    ]
  },
  environment: {
    name: "Environment Tags",
    singleSelection: false,
    options: [
      "Beach/Coastal",
      "Mountains",
      "Desert",
      "Wine Country",
      "Lake",
      "Forest",
      "National Park",
      "Theme Park",
      "Small Town",
      "Urban/City"
    ]
  },
  activityLevel: {
    name: "Activity Level Tags",
    singleSelection: false,
    options: [
      "Relaxing",
      "Moderate Activity",
      "Adventure-packed",
      "Educational"
    ]
  },
  budget: {
    name: "Budget Tags",
    singleSelection: true,
    options: [
      "Budget-friendly",
      "Mid-range",
      "Luxury"
    ]
  }
};

// Reducer function
function tripReducer(state, action) {
  switch (action.type) {
    case UPDATE_TRIP_NAME:
      return {
        ...state,
        tripName: action.payload
      };
      
    case UPDATE_TIME_FRAME:
      return {
        ...state,
        timeFrameStart: action.payload.start,
        timeFrameEnd: action.payload.end
      };
      
    case ADD_DESTINATION:
      return {
        ...state,
        destinationNames: [...state.destinationNames, {
          id: `dest-${Date.now()}`,
          text: action.payload
        }]
      };
      
    case REMOVE_DESTINATION:
      return {
        ...state,
        destinationNames: state.destinationNames.filter(dest => dest.id !== action.payload)
      };
      
    case UPDATE_NUM_ADULTS:
      return {
        ...state,
        numAdults: Math.max(0, state.numAdults + action.payload)
      };
      
    case UPDATE_NUM_CHILDREN:
      return {
        ...state,
        numChildren: Math.max(0, state.numChildren + action.payload)
      };
      
    case UPDATE_NUM_INFANTS:
      return {
        ...state,
        numInfants: Math.max(0, state.numInfants + action.payload)
      };
      
      case ADD_TAG: {
        const { category, tagText } = action.payload;
        const categoryConfig = tagsConfig[category];
        
        // Handle single selection categories
        if (categoryConfig.singleSelection) {
          return {
            ...state,
            tags: {
              ...state.tags,
              [category]: [tagText]
            }
          };
        }
        
        // Handle multi-selection categories
        return {
          ...state,
          tags: {
            ...state.tags,
            [category]: [...state.tags[category], tagText]
          }
        };
      }
        
      case REMOVE_TAG: {
        const { category, tagText } = action.payload;
        
        return {
          ...state,
          tags: {
            ...state.tags,
            [category]: state.tags[category].filter(tag => tag !== tagText)
          }
        };
      }

      case UPDATE_ALL_TAGS:
        return {
          ...state,
          tags: action.payload
        };
      
    default:
      return state;
  }
}

const DashboardTrip = () => {
  // Overall Details State
  const [state, dispatch] = useReducer(tripReducer, initialState);

  // Other States
  const [isTripNameEditing, setIsTripNameEditing] = useState(false);
  const [editedTripName, setEditedTripName] = useState('');
  const [isAddingDestination, setIsAddingDestination] = useState(false);
  const [newDestination, setNewDestination] = useState('');
  const [openDropdown, setOpenDropdown] = useState(false);
  const [isAILoading, setIsAILoading] = useState(false);

  // Handler functions
  const handleUpdateTripName = (newName) => {
    dispatch({ type: UPDATE_TRIP_NAME, payload: newName });
  };

  const handleUpdateTravelers = (type, change) => {
    const actionType = {
      'adults': UPDATE_NUM_ADULTS,
      'children': UPDATE_NUM_CHILDREN,
      'infants': UPDATE_NUM_INFANTS
    }[type];
    
    dispatch({ type: actionType, payload: change });
  };

  const handleRemoveTag = (category, tagText) => {
    dispatch({ type: REMOVE_TAG, payload: { category, tagText } });
  };
  
  const handleAddTag = (category, tagText) => {
    dispatch({ type: ADD_TAG, payload: { category, tagText } });
  };

  // Other functions
  const isTagSelected = (category, tagName) => {
    return state.tags[category].some(tag => tag === tagName);
  };

  const getTagColorClasses = (category) => {
    const colorMap = {
      duration: "bg-purple-200 hover:bg-purple-300 text-purple-700",
      environment: "bg-blue-200 hover:bg-blue-300 text-blue-700",
      activityLevel: "bg-green-200 hover:bg-green-300 text-green-700",
      budget: "bg-yellow-200 hover:bg-yellow-300 text-yellow-700"
    };
    
    return colorMap[category] || "bg-gray-200 hover:bg-gray-300 text-gray-700";
  };

  const suggestTags = async () => {
    //filter out tags to pass into noggin
    const { tags, ...filteredState } = state;
    try {
      setOpenDropdown(false);
      setIsAILoading(true);
      
      // Example API call with the image as data URL
      const response = await fetch(
        'https://noggin.rea.gent/wild-raccoon-2522',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer rg_v1_wyc8bd9m6nqrvfb6bhsu5gu2pwuc4jabfbqc_ngk',
          },
          body: JSON.stringify({
            "tripDetails": filteredState,
          }),
        }
      );
      
      const responseData = await response.json();
      
      // Update all tags with the response data
      dispatch({ 
        type: UPDATE_ALL_TAGS, 
        payload: {
          duration: Array.isArray(responseData.duration) ? responseData.duration : [responseData.duration],
          environment: Array.isArray(responseData.environment) ? responseData.environment : [responseData.environment],
          activityLevel: Array.isArray(responseData.activityLevel) ? responseData.activityLevel : [responseData.activityLevel],
          budget: Array.isArray(responseData.budget) ? responseData.budget : [responseData.budget]
        }
      });
      
    } catch (error) {
      console.error('Error suggesting tags:', error);
    } finally {
      setIsAILoading(false);
    }
  };
  
  return (
    <div className="p-10 space-y-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <div className="space-y-5">
        <div className="bg-gray-50 p-6 rounded-2xl">
          <h2 className="text-lg font-bold">Trip Details</h2>
          <div className="space-y-4">  
            <div className="grid grid-rows-[auto_1fr] gap-4 p-6 items-start">

              {/* Trip Name */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center">
                <span className="font-medium text-gray-900">Trip Name</span>
                {isTripNameEditing ? (
                  <input
                    type="text"
                    value={editedTripName}
                    onChange={(e) => setEditedTripName(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        handleUpdateTripName(editedTripName);
                        setIsTripNameEditing(false);
                      }
                    }}
                    className="bg-white border px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    autoFocus
                  />
                ) : (
                  <div className="bg-gray-200 px-3 py-1 rounded-full">{state.tripName}</div>
                )}
                <button 
                  className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center"
                  onClick={() => {
                    if (isTripNameEditing) {
                      handleUpdateTripName(editedTripName);
                    } else {
                      setEditedTripName(state.tripName);
                    }
                    setIsTripNameEditing(!isTripNameEditing);
                  }}
                >
                  <Pencil className="text-blue-500" size={18} />
                </button>
              </div>

              {/* Time Frame */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center">
                <span className="font-medium text-gray-900">Time Frame</span>
                <div className="flex items-center gap-4">
                  <input
                    type="date"
                    value={state.timeFrameStart}
                    onChange={(e) => {
                      dispatch({
                        type: UPDATE_TIME_FRAME,
                        payload: {
                          start: e.target.value,
                          end: state.timeFrameEnd
                        }
                      });
                    }}
                    className="bg-gray-200 px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <span className="font-medium text-gray-900">-</span>
                  <input
                    type="date" 
                    value={state.timeFrameEnd}
                    onChange={(e) => {
                      dispatch({
                        type: UPDATE_TIME_FRAME,
                        payload: {
                          start: state.timeFrameStart,
                          end: e.target.value
                        }
                      });
                    }}
                    className="bg-gray-200 px-3 py-1 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* <div className="w-[42px]" /> */}
              </div>

              {/* Destinations */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-start">
                <span className="font-medium text-gray-900">Destinations</span>
                <div className="space-y-2">
                  {state.destinationNames.map((dest) => (
                    <div key={dest.id} className="flex items-center gap-2">
                      <span className="bg-gray-200 px-3 py-1 rounded-full flex-1">
                        {dest.text}
                      </span>
                      <button 
                        onClick={() => dispatch({ type: REMOVE_DESTINATION, payload: dest.id })}
                        className="bg-red-100 hover:bg-red-200 p-2 rounded-full flex items-center justify-center"
                      >
                        <X className="text-red-500" size={18} />
                      </button>
                    </div>
                  ))}
                  {isAddingDestination ? (
                    <div className="flex items-center gap-2">
                      <input
                        type="text"
                        value={newDestination}
                        onChange={(e) => setNewDestination(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' && newDestination.trim()) {
                            dispatch({ type: ADD_DESTINATION, payload: newDestination.trim() });
                            setNewDestination('');
                            setIsAddingDestination(false);
                          } else if (e.key === 'Escape') {
                            setNewDestination('');
                            setIsAddingDestination(false);
                          }
                        }}
                        placeholder="Enter destination name..."
                        className="bg-white border px-3 py-1 rounded-full flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        autoFocus
                      />
                      <button 
                        onClick={() => {
                          if (newDestination.trim()) {
                            dispatch({ type: ADD_DESTINATION, payload: newDestination.trim() });
                            setNewDestination('');
                          }
                          setIsAddingDestination(false);
                        }}
                        className="bg-green-100 hover:bg-green-200 p-2 rounded-full flex items-center justify-center"
                      >
                        <Plus className="text-green-500" size={18} />
                      </button>
                      <button 
                        onClick={() => {
                          setNewDestination('');
                          setIsAddingDestination(false);
                        }}
                        className="bg-red-100 hover:bg-red-200 p-2 rounded-full flex items-center justify-center"
                      >
                        <X className="text-red-500" size={18} />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsAddingDestination(true)}
                      className="bg-blue-100 hover:bg-blue-200 px-3 py-1 rounded-full flex items-center gap-2 text-blue-500"
                    >
                      <Plus size={18} />
                      <span>Add Destination</span>
                    </button>
                  )}
                </div>
              </div>
              
            </div>  
          </div>

          {/* Travelers */}
          <h2 className="text-lg font-bold">Number of Travelers</h2>
          <div className="space-y-4">
            <div className="grid grid-rows-[auto_1fr] gap-4 p-6 items-start">
              {/* Adults (18+) */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center"> 
                <span className="font-medium text-gray-900">Adults (18+)</span>
                <div className="flex items-center space-x-2">
                  <button 
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateTravelers('adults', -1)}
                  >
                    <Minus className="text-blue-500" size={18} />
                  </button>
                  <span className="bg-gray-200 px-6 py-1 rounded-full">{state.numAdults}</span>
                  <button 
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateTravelers('adults', 1)}
                  >
                    <Plus className="text-blue-500" size={18} />
                  </button>
                </div>
              </div>
              {/* Children (2-17) */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center"> 
                <span className="font-medium text-gray-900">Children (2-17)</span>
                <div className="flex items-center space-x-2">
                  <button 
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateTravelers('children', -1)}
                  >
                    <Minus className="text-blue-500" size={18} />
                  </button>
                  <span className="bg-gray-200 px-6 py-1 rounded-full">{state.numChildren}</span>
                  <button 
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateTravelers('children', 1)}
                  >
                    <Plus className="text-blue-500" size={18} />
                  </button>
                </div>
              </div> 
              {/* Infants (0-1) */}
              <div className="grid grid-cols-[125px_1fr_auto] gap-4 items-center"> 
                <span className="font-medium text-gray-900">Infants (0-1)</span>
                <div className="flex items-center space-x-2">
                  <button 
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateTravelers('infants', -1)}
                  >
                    <Minus className="text-blue-500" size={18} />
                  </button>
                  <span className="bg-gray-200 px-6 py-1 rounded-full">{state.numInfants}</span>
                  <button 
                    className="bg-blue-100 hover:bg-blue-200 p-2 rounded-full flex items-center justify-center"
                    onClick={() => handleUpdateTravelers('infants', 1)}
                  >
                    <Plus className="text-blue-500" size={18} />
                  </button>
                </div>
              </div>  
            </div>
          </div>

          {/* Tags */}
          <div className="flex items-center">
            <h2 className="text-lg font-bold">Tags</h2>
            {/* AI Suggest Button (with fancy gradient background!!) */}
            <button
              className="relative overflow-hidden text-white font-bold px-4 py-1 ml-5 rounded-md flex items-center gap-2 transition-all duration-300"
              onClick={suggestTags}
              disabled={isAILoading}
              style={{
                background: 'linear-gradient(-45deg, #3490dc, #4299e1, #38b2ac, #3182ce)',
                backgroundSize: '400% 400%',
                animation: 'gradient 5s ease infinite'
              }}
            >
              <style jsx>{`
                @keyframes gradient {
                  0% {
                    background-position: 0% 50%;
                  }
                  50% {
                    background-position: 100% 50%;
                  }
                  100% {
                    background-position: 0% 50%;
                  }
                }
              `}</style>
              <span className="relative z-10">
                {isAILoading ? (
                  <>
                    <span className="animate-spin inline-block h-4 w-4 border-2 border-white border-t-transparent rounded-full mr-2"></span>
                    Suggesting...
                  </>
                ) : (
                  <>
                    <span>AI Suggest Tags</span>
                  </>
                )}
              </span>
              <div 
                className={`absolute inset-0 transition-opacity duration-300 ${isAILoading ? 'opacity-50 bg-gray-700' : 'opacity-0'}`}
              ></div>
            </button>
          </div>
          <div className="space-y-4 p-6">
            {/* All selected tags in a single row */}
            <div className="flex flex-wrap gap-2 mb-4">
              {Object.keys(tagsConfig).map(category => 
                state.tags[category].map(tag => (
                  <button 
                    key={`${category}-${tag}`}
                    className={`${getTagColorClasses(category)} px-2 py-1 rounded-full flex items-center`}
                    onClick={() => handleRemoveTag(category, tag)}
                    disabled={isAILoading}
                  >
                    {tag} <X className="ml-1" size={18} />
                  </button>
                ))
              )}
            </div>
            
            {/* Centralized dropdown */}
            <div className="relative inline-block">
              <button 
                className="bg-gray-200 hover:bg-gray-300 px-3 py-2 rounded-md flex items-center gap-2"
                onClick={() => setOpenDropdown(!openDropdown)}
                disabled={isAILoading}
              >
                Add Tag <ChevronDown size={18} />
              </button>
              
              {openDropdown && (
                <div className="absolute z-10 mt-1 w-64 bg-white shadow-lg rounded-md border border-gray-200 py-1 max-h-80 overflow-y-auto">
                  {Object.keys(tagsConfig).map(category => (
                    <div key={category}>
                      <div className="px-3 py-1 bg-yellow-100 font-medium">
                        {tagsConfig[category].name}
                        {tagsConfig[category].singleSelection && " (Select One)"}
                      </div>
                      {tagsConfig[category].options.map(option => {
                        const isSelected = isTagSelected(category, option);
                        return (
                          <button
                            key={option}
                            className={`block w-full text-left px-4 py-2 hover:bg-gray-50 ${
                              isSelected ? 'bg-blue-100' : ''
                            }`}
                            onClick={() => handleAddTag(category, option)}
                            disabled={isSelected}
                          >
                            {option}
                          </button>
                        );
                      })}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>  
    </div>
  );
};
    
export default DashboardTrip;