const {
  getDrugDetails,
  getProprietaryInfo,
} = require("../controllers/drugController");
const axios = require("axios");
jest.mock("axios");

describe("Drug Controller", () => {
  it("should return drug details for a valid drug", async () => {
    const req = { params: { name: "aspirin" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    axios.get.mockResolvedValue({
      data: {
        drugGroup: {
          conceptGroup: [{ conceptProperties: [{ name: "Aspirin" }] }],
        },
      },
    });
    await getDrugDetails(req, res);

    expect(res.json).toHaveBeenCalledWith({
      drugName: "aspirin",
      drugInfo: [{ name: "Aspirin" }],
    });
  });

  it("should handle errors when fetching drug details", async () => {
    const req = { params: { name: "aspirin" } };
    const res = { json: jest.fn(), status: jest.fn(() => res) };

    axios.get.mockRejectedValue(new Error("API Error"));
    await getDrugDetails(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      error: "Error fetching drug details",
    });
  });
});
