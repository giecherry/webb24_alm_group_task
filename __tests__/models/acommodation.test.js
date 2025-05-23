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

    test('Deleting an Accomodation does not delete the User', async () => {
        const user = await User.create({
            username: 'testuser3',
            email: 'test3@example.com',
            profileImage: 'https://image.com/test3.jpg',
        });

        const accomodation = await Accomodation.create({
            address: 'Exempelgatan 3',
            city: 'Stockholm',
            country: 'Sweden',
            postalCode: '67890',
            rent: 15000,
            rooms: 5,
            userId: user.id,
        });

        await accomodation.destroy();

        const foundUser = await User.findByPk(user.id);
        expect(foundUser).not.toBeNull();
    });
});
