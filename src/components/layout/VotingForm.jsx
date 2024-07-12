import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import service from '../../appwrite/config';
import { CustomSpinner } from '../components';

const VotingForm = ({ name, email }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { userData } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const onSubmit = async (data) => {
    try {
      setLoading(true);
      const res = await service.voteDocument(
        userData.name,
        userData.email,
        data.review,
        data.vote === 'yes'
      );
      console.log(res);
      if (res) {
        setLoading(false);
        setSuccess(true);
        window.location.reload()
      } else {
        setLoading(false);
        alert('Failed to vote');
      }
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return (
    <div className="w-full h-screen bg-gray-100 bg-opacity-5">
      <CustomSpinner />
    </div>
  );
  if (success) return (
    <div className="w-full h-screen bg-black bg-opacity-10 flex flex-col justify-evenly items-center">
      <i className="fa-solid fa-check-to-slot text-white text-2xl"></i>
      <h1 className="text-2xl font-bold text-white -mt-[6rem]">Thank you for voting</h1>
    </div>
  );

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="shake-top w-full max-w-4xl bg-white p-7 rounded-lg shadow-lg sm:mt-0">
      <h2 className="text-2xl font-bold mb-2 text-center col-span-2">Vote and Review</h2>
      <p className="text-sm col-span-2 mb-4">
        <span className="block text-lg font-semibold">Cast Your Vote for a Better Experience!</span>
        We value your feedback! Help us enhance our services by casting your vote. Your "Yes" can make a big difference in shaping the future of our platform. Vote now and be a part of the change!
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
            Name
          </label>
          <input
            id="name"
            type="text"
            value={name}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-700"
          />
        </div>

        <div className="mb-2">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            type="email"
            value={email}
            readOnly
            className="w-full px-3 py-2 border rounded-lg bg-gray-200 text-gray-700"
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="review">
          Review
        </label>
        <textarea
          id="review"
          {...register('review', { required: true })}
          className="w-full px-3 py-2 border rounded-lg"
          placeholder="Write your review here..."
        />
        {errors.review && <p className="text-red-500 text-xs mt-1">Review is required.</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Vote</label>
        <div className="flex items-center mb-2">
          <input
            id="vote-yes"
            type="radio"
            value="yes"
            {...register('vote', { required: true })}
            className="mr-2"
          />
          <label htmlFor="vote-yes" className="text-gray-700">Yes</label>
        </div>
        <div className="flex items-center">
          <input
            id="vote-no"
            type="radio"
            value="no"
            {...register('vote', { required: true })}
            className="mr-2"
          />
          <label htmlFor="vote-no" className="text-gray-700">No</label>
        </div>
        {errors.vote && <p className="text-red-500 text-xs mt-1">Please select your vote.</p>}
      </div>

      <div className="flex justify-center">
        <button type="submit" className="bg-blue-500 text-white px-4 py-1 rounded-lg hover:bg-blue-700">
          Submit
        </button>
      </div>
    </form>
  );
};

export default VotingForm;
