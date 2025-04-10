import React, { useState, useEffect } from 'react';
import MultiSelectSearchInput from './MultiSelectSearchInput';
import { getEkubMembers } from '../util/ApiUtil';

import { formateSavingPlan } from '../util/util';
import { useToken } from '../context/getToken';

const CreateSavingPlanForm = ({ createSavingPlan }) => {
  const [form, setForm] = useState({
    name: '',
    amount: '',
    startDate: '',
    endDate: '',
    paymentPlan: 'weekly',
    participants: [],
  });

  const [userQuery, setUserQuery] = useState('');
  const [userSuggestions, setUserSuggestions] = useState([]);
  const token = useToken();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  useEffect(() => {
    const fetchUsers = async () => {
      if (userQuery.trim() === '') return;
      try {
        const res = await getEkubMembers(token, userQuery);
        if (res.status === 1) {
          setUserSuggestions(res.payload.data);
        }
      } catch (err) {
        console.error('Error fetching users', err);
      }
    };

    const delayDebounce = setTimeout(() => {
      fetchUsers();
    }, 400);

    return () => clearTimeout(delayDebounce);
  }, [userQuery, token]);

  const addParticipant = (user) => {
    if (!form.participants.includes(user._id)) {
      let participants = form.participants;
      participants.push(user);
      setForm((prev) => ({
        ...prev,
        participants: [...participants],
      }));
    }
    setUserQuery('');
    setUserSuggestions([]);
  };

  const removeParticipant = (remUser) => {
    setForm((prev) => ({
      ...prev,
      participants: prev.participants.filter(
        (user) => user._id !== remUser._id,
      ),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    createSavingPlan(formateSavingPlan(form));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow-md space-y-4"
    >
      <h2 className="text-xl text-center font-semibold mb-4">
        Create New Saving Plan
      </h2>

      {/* Plan Name */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Plan Name
        </label>
        <input
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-1"
          required
        />
      </div>

      {/* Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Amount
        </label>
        <input
          name="amount"
          type="number"
          value={form.amount}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-1"
          required
        />
      </div>

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Start Date
          </label>
          <input
            name="startDate"
            type="date"
            value={form.startDate}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-1"
            required
          />
        </div>
        {/* Payment Plan */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Payment Plan
          </label>
          <select
            name="paymentPlan"
            value={form.paymentPlan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-1 "
          >
            <option value="weekly">Weekly</option>
            <option value="biweekly">Biweekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>
      </div>

      {/* Participants Search and Select */}

      <MultiSelectSearchInput
        label="Add Participants"
        placeholder="Search users..."
        query={userQuery}
        setQuery={setUserQuery}
        suggestions={userSuggestions}
        onSelect={addParticipant}
        selectedItems={form.participants}
        onRemove={removeParticipant}
        renderItem={(user) => `${user.fullname}`}
        getItemId={(user) => user._id}
      />

      {/* Submit */}
      <button
        type="submit"
        className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition"
      >
        Create Plan
      </button>
    </form>
  );
};

export default CreateSavingPlanForm;
