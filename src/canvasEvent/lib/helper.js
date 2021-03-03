import UUID from 'uuidjs';
export const generatorId = () => UUID.generate();

console.log(generatorId())