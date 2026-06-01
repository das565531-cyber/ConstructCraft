function BuilderCard({ builder }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-5">

      <h2 className="text-xl font-bold">
        {builder.company_name}
      </h2>

      <p>
        Owner: {builder.owner_name}
      </p>

      <p>
        Experience: {builder.experience} Years
      </p>

      <p>
        Rating: ⭐ {builder.rating}
      </p>

      <p>
        Location: {builder.location}
      </p>

    </div>
  );
}

export default BuilderCard;