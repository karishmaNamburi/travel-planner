import React, { useState } from 'react';

function App() {
  const [form, setForm] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    travelers: 1,
    mood: '',
    interests: '',
    notes: '',
  });

  const [itinerary, setItinerary] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:4000/api/itinerary', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        interests: form.interests.split(',').map(s => s.trim()),
      }),
    });
    const data = await res.json();
    setItinerary(data);
  };

  return (
    <div style={{ maxWidth: '700px', margin: 'auto', padding: 20, fontFamily: 'Segoe UI', background: 'rgba(255,255,255,0.9)', borderRadius: 12 }}>
      <h2>Travel Planner</h2>
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: 12, marginBottom: 20 }}>
        <input
          name="destination"
          placeholder="Destination"
          value={form.destination}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="startDate"
          placeholder="Start Date"
          value={form.startDate}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="endDate"
          placeholder="End Date"
          value={form.endDate}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="travelers"
          min="1"
          placeholder="Number of Travelers"
          value={form.travelers}
          onChange={handleChange}
          required
        />
        <input
          name="mood"
          placeholder="Mood/Theme (e.g., Relaxed, Adventure)"
          value={form.mood}
          onChange={handleChange}
          required
        />
        <input
          name="interests"
          placeholder="Interests (comma separated, e.g., Food, Art)"
          value={form.interests}
          onChange={handleChange}
          required
        />
        <textarea
          name="notes"
          placeholder="Special Requests or Notes"
          value={form.notes}
          onChange={handleChange}
          rows="3"
        />
        <button type="submit" style={{ padding: '10px 15px' }}>Generate Itinerary</button>
      </form>

      {itinerary && (
        <div>
          <h3>Your Itinerary for {itinerary.destination}</h3>
          {itinerary.itinerary.map(({ day, date, story, activities }) => (
            <div key={day} style={{ marginBottom: '1.5rem', backgroundColor: '#f0f4f8', padding: '1rem', borderRadius: 8 }}>
              <h4>Day {day} - {date}</h4>
              <p>{story}</p>
              <ul>
                {activities.map((a, i) => (
                  <li key={i}>{a}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
