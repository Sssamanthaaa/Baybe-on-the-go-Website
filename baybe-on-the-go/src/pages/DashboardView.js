import { Undo2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const tripData = {
  tripName: "Bay Area Family Vacation",
  timeFrameStart: "2025-05-02",
  timeFrameEnd: "2025-05-09",
  destinationNames: [{ id: 'dest-1', text: 'San Francisco, California' }],
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

const formatDate = (isoStr) => {
  const [year, month, day] = isoStr.split('-').map(Number);
  return new Date(year, month - 1, day).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

const TripSummary = () => {
  const nav = useNavigate();

  const {
    tripName,
    timeFrameStart,
    timeFrameEnd,
    destinationNames,
    numAdults,
    numChildren,
    numInfants,
    tags
  } = tripData;

  const travelers = [
    numAdults && `${numAdults} adult${numAdults > 1 ? 's' : ''}`,
    numChildren && `${numChildren} child${numChildren > 1 ? 'ren' : ''}`,
    numInfants && `${numInfants} infant${numInfants > 1 ? 's' : ''}`,
  ].filter(Boolean).join(', ');

  return (
    <div className="p-10 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Trip Details</h1>
        <button
          onClick={() => nav('/dashboard')}
          className="bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded-full flex items-center gap-2 text-white"
        >
          <span>Back To Main Dashboard</span>
          <Undo2 size={20} />
        </button>
      </div>

      <div className="bg-gray-100 rounded-xl p-6 shadow-sm text-lg leading-relaxed">
        <p>
          <strong>{tripName}</strong> is planned from <strong>{formatDate(timeFrameStart)}</strong> to <strong>{formatDate(timeFrameEnd)}</strong>, covering {destinationNames.map(d => d.text).join(', ')}!
        </p>
        <p>
          The traveling group consists of {travelers}.
        </p>
        <p>
          Tags describing the trip include: {Object.values(tags).flat().join(', ')}.
        </p>
      </div>
    </div>
  );
};

export default TripSummary;