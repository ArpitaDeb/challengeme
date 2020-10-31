import React, { useEffect, useState } from 'react';

import Review from './Review';
import network from '../../../../services/network';

function ReviewsTab({ challengeId,setRatingCount }) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const { data: reviewsArrayFromServer } = await network.get(
          `/api/v1/reviews/byChallenge/${challengeId}`,
        );
        setRatingCount(reviewsArrayFromServer.length)
        const reviewsWithContent = reviewsArrayFromServer.filter(
          (review) => review.title && review.content,
        );
        setReviews(reviewsWithContent);
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchReviews();
    const liveReviews = setInterval(fetchReviews, 5000);
    return () => clearInterval(liveReviews);
  }, [challengeId]);

  return reviews.length !== 0 ? (
    reviews.map((review) => {
      const {
        createdAt,
        title,
        content,
        rating,
        User: { userName },
      } = review;
      return (
        <Review
          key={title + createdAt}
          author={userName}
          createdAt={createdAt}
          title={title}
          content={content}
          rating={rating}
        />
      );
    })
  ) : (
      <div>
        {!loading ? <p className="noReviews">This challenge has no reviews yet</p> : <h1>loading...</h1>}
      </div>
    );
}

export default ReviewsTab;
