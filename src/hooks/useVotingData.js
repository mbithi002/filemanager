import { useEffect, useState } from "react";
import service from "../appwrite/config";

const useVotingData = () => {
  const [voters, setVoters] = useState([]);
  const [nonVoters, setNonVoters] = useState([]);
  const [userReviews, setUserReviews] = useState({});

  useEffect(() => {
    const fetchVotingData = async () => {
      try {
        const response = await service.getVoteDocs();

        if (response.documents) {
          const documents = response.documents;
          const votersList = [];
          const nonVotersList = [];
          const reviews = {};

          documents.forEach((doc) => {
            const { user, email, review, vote } = doc;

            if (vote) {
              votersList.push({ user, email, review });
            } else {
              nonVotersList.push({ user, email, review });
            }

            if (!reviews[user]) {
              reviews[user] = [];
            }
            reviews[user].push(review);
          });

          setVoters(votersList);
          setNonVoters(nonVotersList);
          setUserReviews(reviews);
        }
      } catch (error) {
        console.log("Error fetching voting data: ", error);
      }
    };

    fetchVotingData();
  }, []);

  const getUserVoteStatus = (userName) => {
    return voters.find((voter) => voter.user.toLowerCase() === userName.toLowerCase())
      ? "Voted"
      : "Not Voted";
  };

  return { voters, nonVoters, userReviews, getUserVoteStatus };
};

export default useVotingData;
