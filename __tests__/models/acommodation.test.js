const {
  User,
  Accomodation,
} = require("../test-setup");

describe("Accomodation Model", () => {
  it("should create an accomodation", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@gmail.com",
      profileImage: "https://image.com/test3.jpg",
    });
    const accomodation =
      await Accomodation.create({
        address: "Lövdalsvägen 1C",
        city: "Stockholm",
        country: "Sweden",
        postalCode: 12341,
        rent: 7503,
        rooms: 2,
        userId: user.id,
      });
    expect(accomodation).toBeDefined();
    expect(accomodation.address).toBe(
      "Lövdalsvägen 1C"
    );
    expect(accomodation.city).toBe("Stockholm");
    expect(accomodation.country).toBe("Sweden");
    expect(accomodation.postalCode).toBe(12341);
    expect(parseFloat(accomodation.rent)).toBe(7503);
    expect(accomodation.rooms).toBe(2);
    expect(accomodation.userId).toBe(user.id);
  });
  it("should not create an accomodation without required fields", async () => {
    await expect(
      Accomodation.create({
        city: "Stockholm",
        country: "Sweden",
      })
    ).rejects.toThrow();
  });
  it("should not create an accomodation with invalid userId", async () => {
    await expect(
      Accomodation.create({
        address: "Lövdalsvägen 1C",
        city: "Stockholm",
        country: "Sweden",
        postalCode: 12341,
        rent: 7000,
        rooms: 2,
        userId: 99999,
      })
    ).rejects.toThrow();
  });
  it("should associate an accomodation with a user", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@gmail.com",
      profileImage: "https://image.com/test3.jpg",
    });
    await Accomodation.create({
      address: "Lövdalsvägen 1C",
      city: "Stockholm",
      country: "Sweden",
      postalCode: 12341,
      rent: 7000,
      rooms: 2,
      userId: user.id,
    });
    const foundUser = await User.findByPk(
      user.id,
      { include: Accomodation }
    );
    expect(foundUser).toBeDefined();
    expect(foundUser.Accomodations.length).toBe(
      1
    );
  });
  it("should not create an accomodation with invalid data types", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@gmail.com",
      profileImage: "https://image.com/test3.jpg",
    });
    await expect(
      Accomodation.create({
        address: "Lövdalsvägen 1C",
        city: "Stockholm",
        country: 99999,
        postalCode: 12341,
        rent: 7000,
        rooms: 2,
        userId: user.id,
      })
    ).rejects.toThrow();
  });

  it("should not create an accomodation with negative rent", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@gmail.com",
      profileImage: "https://image.com/test3.jpg",
    });
    await expect(
      Accomodation.create({
        address: "Lövdalsvägen 1C",
        city: "Stockholm",
        country: "Sweden",
        postalCode: 12341,
        rent: -7000,
        rooms: 2,
        userId: user.id,
      })
    ).rejects.toThrow();
  });
});

describe("User-Accomodation relation", () => {
  test("Accomodations should be deleted when User is deleted (CASCADE)", async () => {
    const user = await User.create({
      username: "testuser",
      email: "test@example.com",
      profileImage: "https://image.com/test.jpg",
    });

    await Accomodation.create({
      address: "Exempelgatan 1",
      city: "Stockholm",
      country: "Sweden",
      postalCode: 12345,
      rent: 10000,
      rooms: 3,
      userId: user.id,
    });

    let accomodations =
      await Accomodation.findAll({
        where: { userId: user.id },
      });
    expect(accomodations.length).toBe(1);

    await user.destroy();

    accomodations = await Accomodation.findAll({
      where: { userId: user.id },
    });
    expect(accomodations.length).toBe(0);
  });
});
