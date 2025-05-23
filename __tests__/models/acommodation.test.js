const { User, Accomodation } = require("../test-setup");

describe('User-Accomodation relation', () => {
  test('Accomodations should be deleted when User is deleted (CASCADE)', async () => {
    
    const user = await User.create({
      username: 'testuser',
      email: 'test@example.com',
      profileImage: 'https://image.com/test.jpg',
    });

    await Accomodation.create({
      address: 'Exempelgatan 1',
      city: 'Stockholm',
      country: 'Sweden',
      postalCode: '12345',
      rent: 10000,
      rooms: 3,
      userId: user.id,
    });

    let accomodations = await Accomodation.findAll({ where: { userId: user.id } });
    expect(accomodations.length).toBe(1);

    await user.destroy();

    accomodations = await Accomodation.findAll({ where: { userId: user.id } });
    expect(accomodations.length).toBe(0);
  });
});
