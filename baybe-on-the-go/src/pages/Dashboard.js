import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, StickyNote, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const nav = useNavigate();
  const viewTrip = () => nav('/dashboard/trip');

  const [notes, setNotes] = useState(() => {
    const stored = localStorage.getItem('dashboardNotes');
    return stored ? JSON.parse(stored) : [];
  });
  const [noteInput, setNoteInput] = useState('');

  useEffect(() => {
    localStorage.setItem('dashboardNotes', JSON.stringify(notes));
  }, [notes]);

  const addNote = () => {
    if (noteInput.trim()) {
      setNotes([...notes, { id: Date.now(), text: noteInput }]);
      setNoteInput('');
    }
  };

  const deleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  return (
    <div className="p-10 space-y-5">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      {/*upcoming trip*/}
      <div className="bg-gray-50 p-6 rounded-2xl">
        <h2 className="text-lg font-bold">Upcoming Trip</h2>
        <div className="grid grid-cols-[auto_1fr] gap-x-4 items-start mt-4">
          <div className="bg-blue-100 p-3 rounded-lg flex items-center justify-center">
            <Calendar className="text-blue-600" size={28} />
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="font-medium text-gray-900">Bay Area Family Vacation</div>
              <div className="flex items-center gap-4 text-gray-500">
                <Clock size={20} /> May 2 - 9, 2025
              </div>
              <div className="flex items-center gap-4 text-gray-500">
                <MapPin size={20} /> San Francisco, California
              </div>
            </div>
            <div className="flex space-x-1">
              <span className="bg-green-200 px-2 py-1 rounded-full">Family-Friendly</span>
              <span className="bg-blue-200 px-2 py-1 rounded-full">Beach</span>
              <span className="bg-purple-200 px-2 py-1 rounded-full">With Infant</span>
            </div>
          </div>
        </div>

        <div className="flex gap-4 mt-6">
          <button onClick={viewTrip} className="flex-1 bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-2xl">
            Edit Trip
          </button>
          <button onClick={viewTrip} className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-2xl">
            View Details
          </button>
        </div>
      </div>

      {/*notes*/}
      <div className="bg-gray-50 p-6 rounded-2xl">
        <h2 className="text-lg font-bold flex items-center gap-2"><StickyNote size={20}/> Travel Notes</h2>

        <div className="mt-4 space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Write a quick note..."
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={noteInput}
              onChange={(e) => setNoteInput(e.target.value)}
            />
            <button
              onClick={addNote}
              className="bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              <Plus size={18} />
            </button>
          </div>

          {notes.length === 0 ? (
            <p className="text-gray-500 text-sm">No notes yet. Start by writing one above!</p>
          ) : (
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {notes.map((note) => (
                <li key={note.id} className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm flex justify-between items-start">
                  <p className="text-gray-800 text-sm">{note.text}</p>
                  <button
                    onClick={() => deleteNote(note.id)}
                    className="text-red-500 text-xs ml-2 hover:underline"
                  >
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;