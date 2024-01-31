import { faker } from '@faker-js/faker/locale/pt_BR';
import { Address, Person } from '../models';

class FakePersonService {
  generateFakeData(count: number): Person[] {
    const people: Person[] = [];
    const gender: 'male' | 'female' = faker.person.sexType() as 'male' | 'female';

    for (let i = 1; i <= count; i += 1) {
      const person: Person = {
        id: i,
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        phone: faker.phone.number(),
        birthday: faker.date.past().toISOString().split('T')[0],
        gender,
        address: this.generateAddress(),
        website: faker.internet.url(),
        image: faker.image.avatar()
      };

      people.push(person);
    }

    return people;
  }

  private generateAddress(): Address {
    return {
      id: 0,
      street: faker.location.streetAddress(),
      streetName: faker.location.street(),
      buildingNumber: faker.number.bigInt({ min: 1, max: 9999 }).toString(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      country: faker.location.country(),
      county_code: faker.location.countryCode(),
      latitude: parseFloat(faker.location.latitude().toString()),
      longitude: parseFloat(faker.location.longitude().toString())
    };
  }
}

export default new FakePersonService();
