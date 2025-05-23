const { User, sequelize } = require("../test-setup");

beforeAll(async () => {
  await sequelize.sync({ force:true });
});

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({ username: "testuser", email: "test@test.com", profilePicture: "https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png" })

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
    expect(user.profilePicture).toBe( "https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png");
  });

  it("should validate email format", async () => {
    const user = User.build({ username: "Anders", email: "invalid-email" })
    await expect(user.validate()).rejects.toThrow();
  });

  it("Should be unique email", async () => {
    await User.create({ username: "Lisa", email: "Lisa@test.com" });
    await expect(
      User.create({ username: "Anders", email: "Lisa@test.com" })
    ).rejects.toThrow();
  });

  it("Should be unique username", async () => {
    await User.create({ username: "Lisa", email: "Lisa@test.com" });
    await expect(
      User.create({ username: "Anders", email: "Anders@test.com" })
    ).rejects.toThrow();
  });
  
});

