import React from 'react';
import { Star } from 'lucide-react';

const ReviewsPage = () => {
  const reviews = [
    {
      id: 1,
      product: 'Organic Milk',
      rating: 5,
      comment: 'Excellent quality! Very fresh and tasty.',
      date: '2024-10-20'
    },
    {
      id: 2,
      product: 'Fresh Vegetables Pack',
      rating: 4,
      comment: 'Good quality vegetables, arrived fresh.',
      date: '2024-10-18'
    },
    {
      id: 3,
      product: 'Whole Wheat Bread',
      rating: 5,
      comment: 'Best bread I have ever had! Highly recommended.',
      date: '2024-10-15'
    }
  ];

  const renderStars = (rating) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-5 h-5 ${
              star <= rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">My Reviews</h2>
      
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border border-gray-200 rounded-lg p-6">
            <div className="flex justify-between items-start mb-3">
              <h3 className="font-bold text-lg text-gray-900">{review.product}</h3>
              <span className="text-sm text-gray-500">{review.date}</span>
            </div>
            
            <div className="mb-3">
              {renderStars(review.rating)}
            </div>
            
            <p className="text-gray-700">{review.comment}</p>
            
            <div className="flex gap-3 mt-4">
              <button className="text-sm text-gray-600 hover:text-emerald-700 font-medium">
                Edit Review
              </button>
              <button className="text-sm text-red-600 hover:text-red-700 font-medium">
                Delete Review
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewsPage;