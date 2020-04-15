export default class Model {
    equals(other) {
        throw new Error('The equals method must be implemented');
    }

    equalsFor(attribute) {
        throw new Error('The equalsFor method must be implemented');
    }
}