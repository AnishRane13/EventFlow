import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, Upload } from 'lucide-react';

const CreateEventForm = () => {
  const [formData, setFormData] = useState({
    organizer_id: '',
    name: '',
    description: '',
    venue: '',
    date: '',
    time: '',
  });
  const [banner, setBanner] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }
      if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
        setError('Only JPG, PNG, and JPEG files are allowed');
        return;
      }
      setBanner(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const formPayload = new FormData();
      Object.keys(formData).forEach(key => {
        formPayload.append(key, formData[key]);
      });
      formPayload.append('banner', banner);

      const response = await fetch('http://localhost:5000/api/events', {
        method: 'POST',
        body: formPayload,
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Something went wrong');
      }

      // Reset form on success
      setFormData({
        organizer_id: '',
        name: '',
        description: '',
        venue: '',
        date: '',
        time: '',
      });
      setBanner(null);
      setPreviewUrl(null);
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Create New Event</h1>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 text-red-500 p-4 rounded-lg">
            {error}
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              <User className="inline w-4 h-4 mr-2" />
              Organizer ID
            </label>
            <input
              type="text"
              name="organizer_id"
              value={formData.organizer_id}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Event Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg h-32"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <MapPin className="inline w-4 h-4 mr-2" />
              Venue
            </label>
            <input
              type="text"
              name="venue"
              value={formData.venue}
              onChange={handleInputChange}
              className="w-full p-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">
                <Calendar className="inline w-4 h-4 mr-2" />
                Date
              </label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                <Clock className="inline w-4 h-4 mr-2" />
                Time
              </label>
              <input
                type="time"
                name="time"
                value={formData.time}
                onChange={handleInputChange}
                className="w-full p-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              <Upload className="inline w-4 h-4 mr-2" />
              Banner Image
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/jpeg,image/png,image/jpg"
              className="w-full p-2 border rounded-lg"
              required
            />
            {previewUrl && (
              <div className="mt-2">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="h-32 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 disabled:bg-blue-300"
        >
          {loading ? 'Creating Event...' : 'Create Event'}
        </button>
      </form>
    </div>
  );
};

export default CreateEventForm;