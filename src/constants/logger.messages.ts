export const loggerMessages = {
  create: (property): string => `Create ${property} request body:`,
  signUp: (property): string => `Sign Up ${property} request body:`,
  sendVerLink: (property): string => `Send verification ${property}:`,
  generate: (property): string => `Generate hash ${property}:`,
  login: (property): string => `Login ${property}:`,
  check: (property): string => `Check ${property}:`,
  get: (property): string => `Get ${property}:`,
  transaction: (): string => `Start transaction`,
  upload: (property): string => `Upload files key ${property}`,
  updateImage: (property): string =>
    `Upload update image tailor, key: ${property}`,
  saveAws: (): string => `Save aws files`,
  checkUser: (property): string => `Check user by id: ${property}`,
  generatedData: (): string => `Generated data to DB`,
  saveToDb: (): string => 'Save to DB',
  getPrevious: (property): string => `Get previous: ${property}`,
  remove: (property): string => `Remove: ${property}`,
};
