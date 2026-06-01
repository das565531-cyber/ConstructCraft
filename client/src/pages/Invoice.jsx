import jsPDF from "jspdf";

function Invoice() {

  const generateInvoice = () => {

    const doc = new jsPDF();

    doc.setFontSize(22);
    doc.text("ConstructCraft", 20, 20);

    doc.setFontSize(14);
    doc.text("Construction Material Invoice", 20, 30);

    doc.line(20, 35, 190, 35);

    doc.text("Invoice ID: INV-2025-001", 20, 50);
    doc.text("Customer: Souvik Das", 20, 60);
    doc.text("Location: Kolkata", 20, 70);

    doc.line(20, 80, 190, 80);

    doc.text("Material", 20, 95);
    doc.text("Qty", 100, 95);
    doc.text("Price", 150, 95);

    doc.line(20, 100, 190, 100);

    doc.text("Cement", 20, 115);
    doc.text("50 Bags", 100, 115);
    doc.text("₹21,000", 150, 115);

    doc.text("Steel", 20, 130);
    doc.text("500 Kg", 100, 130);
    doc.text("₹35,000", 150, 130);

    doc.text("Bricks", 20, 145);
    doc.text("5000", 100, 145);
    doc.text("₹40,000", 150, 145);

    doc.line(20, 160, 190, 160);

    doc.setFontSize(16);
    doc.text("Total Amount: ₹96,000", 20, 180);

    doc.setFontSize(12);
    doc.text(
      "Thank you for choosing ConstructCraft.",
      20,
      210
    );

    doc.save("ConstructCraft-Invoice.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-28 px-6 pb-16">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl font-extrabold mb-8">
          Invoice Generator
        </h1>

        <div className="bg-white rounded-3xl shadow-xl p-8">

          <div className="border-b pb-6 mb-6">

            <h2 className="text-3xl font-bold text-orange-500">
              ConstructCraft
            </h2>

            <p className="text-gray-500 mt-2">
              Professional Construction Invoice
            </p>

          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">

            <div>
              <h3 className="font-bold">
                Customer
              </h3>

              <p>Souvik Das</p>
              <p>Kolkata</p>
            </div>

            <div>
              <h3 className="font-bold">
                Invoice Details
              </h3>

              <p>INV-2025-001</p>
              <p>June 2026</p>
            </div>

          </div>

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>
                <tr className="border-b">
                  <th className="text-left py-3">
                    Material
                  </th>

                  <th className="text-left py-3">
                    Quantity
                  </th>

                  <th className="text-left py-3">
                    Amount
                  </th>
                </tr>
              </thead>

              <tbody>

                <tr className="border-b">
                  <td className="py-3">
                    Cement
                  </td>

                  <td>
                    50 Bags
                  </td>

                  <td>
                    ₹21,000
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">
                    Steel
                  </td>

                  <td>
                    500 Kg
                  </td>

                  <td>
                    ₹35,000
                  </td>
                </tr>

                <tr className="border-b">
                  <td className="py-3">
                    Bricks
                  </td>

                  <td>
                    5000
                  </td>

                  <td>
                    ₹40,000
                  </td>
                </tr>

              </tbody>

            </table>

          </div>

          <div className="text-right mt-8">

            <h2 className="text-3xl font-bold text-orange-500">
              Total: ₹96,000
            </h2>

          </div>

          <button
            onClick={generateInvoice}
            className="
              mt-8
              bg-orange-500
              text-white
              px-8
              py-4
              rounded-xl
              font-bold
              hover:bg-orange-600
              transition
            "
          >
            Download PDF Invoice
          </button>

        </div>

      </div>

    </div>
  );
}

export default Invoice;