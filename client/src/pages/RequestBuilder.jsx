function RequestBuilder() {
  return (
    <div className="p-10">

      <h1 className="text-4xl font-bold mb-6">
        Request A Builder
      </h1>

      <form className="space-y-4">

        <input
          className="border p-3 w-full"
          placeholder="Your Name"
        />

        <input
          className="border p-3 w-full"
          placeholder="Phone"
        />

        <input
          className="border p-3 w-full"
          placeholder="Budget"
        />

        <button
          className="bg-orange-500 text-white px-6 py-3 rounded"
        >
          Submit Request
        </button>

      </form>

    </div>
  );
}

export default RequestBuilder;