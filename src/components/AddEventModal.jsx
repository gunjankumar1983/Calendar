import React, { useState } from "react";

export default function AddEventModal({ onAddEvent }) {
  const [showForm, setShowForm] = useState(false);
  const [newEvent, setNewEvent] = useState({
    title: "",
    date: "",
    time: "",
    durationMinutes: "",
  });

  const handleAddEvent = () => {
    if (!newEvent.title || !newEvent.date || !newEvent.time) {
      alert("Please fill all required fields!");
      return;
    }

    const eventToAdd = {
      id: Date.now(),
      title: newEvent.title,
      date: newEvent.date,
      time: newEvent.time,
      durationMinutes: parseInt(newEvent.durationMinutes) || 60,
    };

    onAddEvent(eventToAdd);
    setShowForm(false);
    setNewEvent({ title: "", date: "", time: "", durationMinutes: "" });
  };

  return (
    <>
      {/* Main Button */}
      <button
        onClick={() => setShowForm(true)}
        className="ml-3 px-4 py-1.5 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
      >
        ➕ Add Event
      </button>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50 animate-fadeIn">
          <div className="bg-white w-[420px] rounded-2xl shadow-2xl border border-gray-100 p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Add New Event
            </h2>

            <div className="space-y-3">
              <input
                type="text"
                placeholder="Event Title"
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:ring-2 focus:ring-green-400"
              />
              <input
                type="date"
                value={newEvent.date}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, date: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
              />
              <input
                type="time"
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
              />
              <input
                type="number"
                placeholder="Duration (minutes)"
                value={newEvent.durationMinutes}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, durationMinutes: e.target.value })
                }
                className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400"
              />
            </div>

            <div className="flex justify-end mt-6 gap-3">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-1.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-100 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddEvent}
                className="px-4 py-1.5 rounded-lg bg-green-500 text-white font-semibold hover:bg-green-600 transition"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
