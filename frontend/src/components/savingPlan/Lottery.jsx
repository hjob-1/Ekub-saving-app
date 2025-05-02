import React, { useState } from 'react';
import Confetti from 'react-confetti';
import { useToken } from '../../context/getToken';
import Button from '../Button';
import LoadingSpinner from '../Spinner';
import WinnerDisplay from './DisplayWinner';
import MultiSelectSearchInput from '../MultiSelectSearchInput';
import useMultiSelect from '../../hooks/useMultiSelect';
import { drawWinnerApi, getEkubMembers } from '../../util/ApiUtil';
import { notify } from '../../util/notify';

const WinnerDrawModal = ({ savingId }) => {
  const [loading, setLoading] = useState(false);
  const [winner, setWinner] = useState(null);

  const token = useToken();

  const {
    query: userQuery,
    setQuery: setUserQuery,
    suggestions: userSuggestions,
    selectedItems: selectedUsers,
    isLoading: isUserLoading,
    addItem: addParticipant,
    removeItem: removeParticipant,
  } = useMultiSelect({
    fetchFn: (searchQuery) =>
      getEkubMembers(token, { search: searchQuery, page: 1, limit: 10 }),
    identifierKey: '_id', // or 'email' if you prefer
  });

  const handleDraw = async () => {
    setLoading(true);
    setWinner(null);
    try {
      const excluded = selectedUsers.map((user) => user.email);
      const response = await drawWinnerApi(token, savingId, excluded);
      if (response.status === 1) {
        const data = response?.payload?.data;
        console.log('excluded', excluded);
        setWinner(data);
      } else {
        notify(response);
      }

      // // Mocked Data
      // const data = { fullname: 'Job Solomon', phone: '0912345678' };
    } catch (err) {
      console.error('Draw failed:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl p-8 w-full max-w-sm shadow-[0px_3px_35px_rgba(0,0,0,0.01),0px_3px_25px_rgba(0,0,0,0.08)]">
      <h1 className="text-xl font-bold text-indigo-800 mb-6 text-center border-b-2 border-indigo-300 pb-2 ">
        Equb Winner Selection
      </h1>

      <MultiSelectSearchInput
        label="Exclude users from the draw (optional)"
        placeholder="Search users..."
        query={userQuery}
        setQuery={setUserQuery}
        suggestions={userSuggestions}
        selectedItems={selectedUsers}
        onSelect={addParticipant}
        onRemove={removeParticipant}
        isLoading={isUserLoading}
        renderItem={(user) => (
          <span className="font-medium">{user.fullname}</span>
        )}
        getItemId={(user) => user._id}
      />
      <Button onClick={handleDraw} loading={loading} />
      {loading && <LoadingSpinner message="Drawing winner, please wait..." />}
      {winner && !loading && (
        <>
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={250}
            recycle={false}
          />
          <WinnerDisplay winner={winner} />
        </>
      )}
    </div>
  );
};

export default WinnerDrawModal;
