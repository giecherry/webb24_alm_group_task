const { User, sequelize } = require("../test-setup");

beforeAll(async () => {
  await sequelize.sync({ force:true });
});

describe("User Model", () => {
  it("should create a user", async () => {
    const user = await User.create({ username: "testuser", email: "test@test.com", profilPicture: "https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png" })

    expect(user).toBeDefined();
    expect(user.username).toBe("testuser");
    expect(user.email).toBe("test@test.com");
    expect(user.profilPicture).toBe( "https://cdn.pixabay.com/photo/2017/06/13/12/54/profile-2398783_1280.png");
  });

  it("should validate email format", async () => {
    // Build: Create a new user instance without saving it to the database
    const user = User.build({ username: "testuser", email: "invalid-email" });
    // Validate: Check if the user instance is valid
    // rejects.toThrow() is used to check if the user instance is invalid
    expect(user.validate()).rejects.toThrow();
  });
  
});

