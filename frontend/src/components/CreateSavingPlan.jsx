import React, { useState, useEffect } from 'react';
import MultiSelectSearchInput from './MultiSelectSearchInput';
import { getEkubMembers } from '../util/ApiUtil';

import { formateSavingPlan } from '../util/util';
import { useToken } from '../context/getToken';
import useValidation from '../hooks/useValidation';
import FormInput from './FormInput';
import { FaExclamationCircle } from 'react-icons/fa';

const CreateSavingPlanForm = ({ createSavingPlan }) => {
  const token = useToken();
  const [userQuery, setUserQuery] = useState('');
  const [userSuggestions, setUserSuggestions] = useState([]);

  // Define validation rules
  const validationRules = {
    name: {
      label: 'Plan name',
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    amount: {
      label: 'Amount',
      required: true,
      pattern: /^[1-9]\d*$/,
      message: 'Please enter a valid positive number',
    },
    startDate: {
      label: 'Start date',
      required: true,
    },
    participants: {
      label: 'Participants',
      minItems: 2,
      message: 'You must select at least 2 participants',
    },
  };

  const {
    values: form,
    errors,
    touched,
    handleChange,
    handleBlur,
    handleSubmit,
    setValues,
  } = useValidation(
    {
      name: '',
      amount: '',
      startDate: '',
      paymentPlan: 'weekly',
      participants: [],
    },
    validationRules,
  );

  useEffect(() => {
    const fetchUsers = async () => {
      if (userQuery.trim() === '') return;
      try {
        const res = await getEkubMembers(token, {
          search: userQuery,
          limit: 5,
          page: 1,
        });
        if (res.status === 1) {
          setUserSuggestions(res.payload.data.data);
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
    if (!form.participants.some((p) => p._id === user._id)) {
      setValues((prev) => ({
        ...prev,
        participants: [...prev.participants, user],
      }));
    }
    setUserQuery('');
    setUserSuggestions([]);
  };

  const removeParticipant = (remUser) => {
    setValues((prev) => ({
      ...prev,
      participants: prev.participants.filter(
        (user) => user._id !== remUser._id,
      ),
    }));
  };

  const onSubmit = (formValues) => {
    createSavingPlan(formateSavingPlan(formValues));
  };

  return (
    <form
      onSubmit={(e) => handleSubmit(e, onSubmit)}
      className="max-w-lg mx-auto bg-white p-6 rounded shadow-md space-y-4"
    >
      <h2 className="text-xl text-center font-semibold mb-4">
        Create New Saving Plan
      </h2>

      {/* Plan Name */}
      <FormInput
        name="name"
        label="Plan Name"
        type="text"
        value={form.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        placeholder="Enter plan name"
      />

      {/* Amount */}
      <FormInput
        name="amount"
        label="Amount"
        type="number"
        value={form.amount}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.amount}
        touched={touched.amount}
        placeholder="Enter amount"
      />

      {/* Dates */}
      <div className="grid grid-cols-2 gap-4">
        <FormInput
          name="startDate"
          label="Start Date"
          type="date"
          value={form.startDate}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.startDate}
          touched={touched.startDate}
        />

        {/* Payment Plan */}
        <div>
          <label htmlFor="plan">Payment Plan</label>
          <select
            id="plan"
            name="paymentPlan"
            value={form.paymentPlan}
            onChange={handleChange}
            className="mt-1 block w-full rounded-md border border-gray-300 focus:border-indigo-600 focus:outline-none p-2"
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
      {errors.participants && touched && (
        <div className="flex items-center mt-1 text-red-500 text-xs">
          <FaExclamationCircle className="mr-1" />
          <span>{errors.participants}</span>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={Object.values(errors).some((error) => !!error)}
        className="w-full bg-purple-600 text-white py-2 px-4 rounded hover:bg-purple-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Create Plan
      </button>
    </form>
  );
};

export default CreateSavingPlanForm;
