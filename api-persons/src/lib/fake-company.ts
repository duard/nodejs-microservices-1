import { faker } from '@faker-js/faker/locale/pt_BR';
import { Address, Contact, Person } from '../models';

class FakePersonService {
  generateFakeData(count: number): Person[] {
    const persons: Person[] = [];

    for (let i = 1; i <= count; i += 1) {
      const company: Person = {
        id: i,
        name: faker.company.name(),
        email: faker.internet.email(),
        vat: faker.number.bigInt({ min: 100000000, max: 999999999 }).toString(),
        phone: faker.phone.number(),
        country: faker.location.country(),
        addresses: Array.from({ length: 4 }, () => this.generateAddress()),
        website: faker.internet.url(),
        image: faker.image.url(),
        contact: this.generateContact()
      };

      persons.push(company);
    }

    return persons;
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

  private generateContact(): Contact {
    const gender: 'male' | 'female' = faker.person.sexType() as 'male' | 'female';

    return {
      id: 0,
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
  }
}

export default new FakePersonService();
