import { useContext, useEffect, useState } from 'react';
import {
  FaUsers,
  FaMoneyBillWave,
  FaPiggyBank,
  FaHourglassHalf,
  FaCheckCircle,
  FaCrown,
  FaUserPlus,
  FaPlusCircle,
} from 'react-icons/fa';
import { Link } from 'react-router';

import { createSavingPlanApi, getDashboardStatsApi } from '../../util/ApiUtil';
import { useToken } from '../../context/getToken';
import { formateDate } from '../../util/util';
import { AppContext } from '../../context/applicationContext';
import ErrorState from '../../components/ErrorState';
import { FiExternalLink, FiUsers } from 'react-icons/fi';
import CreateSavingPlanForm from '../../components/CreateSavingPlan';
import { notify } from '../../util/notify';

const Dashboard = () => {
  const token = useToken();
  const [stats, setStats] = useState({});
  const [recentWinners, setRecentWinners] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [error, setError] = useState(null);
  const { setModal, openModal, getUserData } = useContext(AppContext);
  const userData = getUserData();

  // Mock data fetching
  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setError(null); // Reset error before trying fetch
      const response = await getDashboardStatsApi(token);
      if (response.status === 1 && response.payload) {
        const {
          completedPlans,
          newUsers,
          ongoingPlans,
          totalCollected,
          totalMembers,
          totalSavingPlans,
          recentWinners,
        } = response.payload.data;
        setStats({
          totalSavingPlans,
          totalMembers,
          ongoingPlans,
          completedPlans,
          totalCollected,
        });
        setRecentWinners(recentWinners);
        setNewUsers(newUsers);
      } else {
        setError('Failed to fetch dashboard stats.');
      }
    } catch (err) {
      console.error(err);
      setError(
        err.payload?.message || 'An error occurred while fetching data.',
      );
    }
  };

  const createSavingPlan = async (planData) => {
    try {
      const response = await createSavingPlanApi(token, planData);
      if (response.status === 1) {
        setModal(null);
        notify(response);
        fetchDashboardStats();
      }
    } catch (error) {
      notify(error);
      console.error('Failed to create saving plan:', error);
    }
  };

  if (error) {
    return <ErrorState error={error} />;
  }

  return (
    <div className="min-h-screen py-2 bg-gray-50">
      {/* Main Content */}
      <div className="mb-6 ">
        <h1 className="text-2xl font-semibold text-gray-800">
          Welcome, {userData?.fullname}! 👋
        </h1>
        <p className="text-gray-600">
          Here's a quick overview of your platform.
        </p>
      </div>
      <div>
        <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
          <button
            onClick={() =>
              openModal(CreateSavingPlanForm, {
                createSavingPlan: createSavingPlan,
              })
            }
            className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-md hover:bg-indigo-700 transition-all duration-200 whitespace-nowrap"
          >
            <FaPlusCircle className="w-4 h-4" />
            New Saving Plan
          </button>

          <Link
            to="/user/members"
            className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-2xl text-sm font-medium shadow-md hover:bg-green-700 transition-all duration-200 whitespace-nowrap"
          >
            <FiUsers className="w-4 h-4" />
            Invite Members
          </Link>
        </div>
        {/* Stats Overview */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">Overview</h2>
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <Link to="/user/members">
              <StatCard
                icon={<FaUsers className="text-indigo-600" size={20} />}
                title="Total Members"
                value={stats?.totalMembers}
                trend={5.2}
                change="up"
                linkIcon={true}
              />
            </Link>

            <StatCard
              icon={<FaMoneyBillWave className="text-green-500" size={20} />}
              title="Money Collected"
              value={`$${stats?.totalCollected?.toLocaleString()}`}
              trend={12.5}
              change="up"
            />
            <Link to="/user/saving-plans">
              <StatCard
                icon={<FaPiggyBank className="text-blue-500" size={20} />}
                title="Saving Plans"
                value={stats?.totalSavingPlans}
                trend={2.1}
                change="up"
                linkIcon={true}
              />
            </Link>
            <StatCard
              icon={<FaHourglassHalf className="text-yellow-500" size={20} />}
              title="Active Users"
              value={stats?.totalMembers}
            />
          </div>
        </div>

        {/* Charts and Highlights */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Quick Stats */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-6">
              Quick Stats
            </h3>
            <div className="space-y-4">
              <StatPill
                icon={<FaHourglassHalf className="text-yellow-500" />}
                title="Ongoing Plans"
                value={stats?.ongoingPlans}
              />
              <StatPill
                icon={<FaCheckCircle className="text-green-500" />}
                title="Completed Plans"
                value={stats?.completedPlans}
              />
              <StatPill
                icon={<FaUserPlus className="text-indigo-500" />}
                title="New Members (7d)"
                value={newUsers?.length}
              />
            </div>
          </div>
          {/* Recent Winners */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <FaCrown className="text-yellow-500 text-xl mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  Recent Winners
                </h3>
              </div>
            </div>
            <div className="space-y-4">
              {recentWinners?.map((user, index) => (
                <WinnerCard
                  key={index}
                  name={user.fullname}
                  meta={`Won the lottery for ${user.savingName}`}
                  avatar={user.avatar}
                  highlight
                  amount={user.amount}
                  wonDate={user.dueDate}
                />
              ))}
            </div>
          </div>
          {/* New Members */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex justify-between items-center mb-6">
              <div className="flex items-center">
                <FaUserPlus className="text-green-500 text-xl mr-2" />
                <h3 className="text-lg font-semibold text-gray-800">
                  New Members
                </h3>
              </div>
            </div>
            <div className="space-y-4">
              {newUsers?.map((user, index) => (
                <UserCard
                  key={index}
                  name={user.fullname}
                  meta={`${user.email} • Joined ${formateDate(user.createdAt)}`}
                  avatar={user.avatar}
                  highlight
                />
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6"></div>
      </div>
    </div>
  );
};

const StatCard = ({ icon, title, value, linkIcon }) => (
  <div className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
    <div className="flex justify-between">
      <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center">
        {icon}
      </div>
      {linkIcon && <FiExternalLink />}
    </div>
    <h3 className="text-gray-500 text-sm mt-4">{title}</h3>
    <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
  </div>
);

const StatPill = ({ icon, title, value }) => (
  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
    <div className="flex items-center">
      <div className="w-8 h-8 rounded-md bg-white flex items-center justify-center shadow-xs mr-3">
        {icon}
      </div>
      <span className="text-gray-600 font-medium">{title}</span>
    </div>
    <span className="font-bold text-gray-800">{value}</span>
  </div>
);

const UserCard = ({ name, meta, amount, avatar, highlight }) => (
  <div
    className={`flex items-center p-3 rounded-lg ${
      highlight ? 'bg-indigo-50' : 'hover:bg-gray-50'
    }`}
  >
    <div className="w-12 h-12 rounded-full bg-indigo-100 flex items-center justify-center mr-4 overflow-hidden">
      {avatar ? (
        <img src={avatar} alt={name} className="w-full h-full object-cover" />
      ) : (
        <span className="text-indigo-600 font-semibold">{name.charAt(0)}</span>
      )}
    </div>
    <div className="flex-1">
      <h4 className="font-semibold text-gray-800">{name}</h4>
      <p className="text-sm text-gray-500">{meta}</p>
    </div>
    {amount && (
      <div className="bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-sm font-medium">
        {amount}
      </div>
    )}
  </div>
);

const WinnerCard = ({ name, meta, amount, wonDate }) => {
  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white p-4 rounded-2xl shadow-md mb-4 flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <div>
          <h3 className="text-lg font-bold">{name}</h3>
          <p className="text-sm font-medium">
            {meta} on{' '}
            <span className="italic">
              {new Date(wonDate).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric',
              })}
            </span>
          </p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-xl font-bold">${amount}</div>
        <div className="text-4xl">🎉</div>
      </div>
    </div>
  );
};

export default Dashboard;
