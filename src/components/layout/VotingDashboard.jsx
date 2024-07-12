import React from 'react';
import useVotingData from '../../hooks/useVotingData';

const VotingDashboard = () => {
    const { voters, nonVoters, userReviews, getUserVoteStatus } = useVotingData();

    return (
        <div className="p-5 mt-[4rem]">
            <h2 className="text-2xl font-bold mb-4">Voting Dashboard</h2>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Voters</h3>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">User</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {voters.map((voter) => (
                            <tr key={voter.email} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{voter.user}</td>
                                <td className="px-4 py-2 border">{voter.email}</td>
                                <td className="px-4 py-2 border">{voter.review}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">Non-Voters</h3>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">User</th>
                            <th className="px-4 py-2 border">Email</th>
                            <th className="px-4 py-2 border">Review</th>
                        </tr>
                    </thead>
                    <tbody>
                        {nonVoters.map((nonVoter) => (
                            <tr key={nonVoter.email} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{nonVoter.user}</td>
                                <td className="px-4 py-2 border">{nonVoter.email}</td>
                                <td className="px-4 py-2 border">{nonVoter.review}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="mb-8">
                <h3 className="text-xl font-semibold mb-2">User Reviews</h3>
                <table className="min-w-full bg-white border border-gray-300">
                    <thead>
                        <tr>
                            <th className="px-4 py-2 border">User</th>
                            <th className="px-4 py-2 border">Reviews</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.keys(userReviews).map((user) => (
                            <tr key={user} className="hover:bg-gray-100">
                                <td className="px-4 py-2 border">{user}</td>
                                <td className="px-4 py-2 border">
                                    <ul className="list-disc pl-5">
                                        {userReviews[user].map((review, index) => (
                                            <li key={index}>{review}</li>
                                        ))}
                                    </ul>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Uncomment and implement the following section if needed */}
            {/* <div>
          <h3 className="text-xl font-semibold mb-2">Check User Vote Status</h3>
          <input
            type="text"
            placeholder="Enter user name"
            className="p-2 border rounded-lg mb-2"
            onChange={(e) => console.log(getUserVoteStatus(e.target.value))}
          />
        </div> */}
        </div>
    );
};

export default VotingDashboard;
