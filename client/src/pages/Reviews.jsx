function Reviews() {
  const reviews = [
    {
      user: "Rahul",
      rating: 5,
      comment: "Excellent Builder"
    },
    {
      user: "Priya",
      rating: 4,
      comment: "Good Quality Work"
    }
  ];

  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold mb-6">
        Builder Reviews
      </h1>

      {reviews.map((review, index) => (
        <div
          key={index}
          className="bg-white p-5 rounded shadow mb-4"
        >
          <h2>{review.user}</h2>
          <p>⭐ {review.rating}/5</p>
          <p>{review.comment}</p>
        </div>
      ))}
    </div>
  );
}

export default Reviews;