export const validateData = (schema, data) => {
  const result = schema.safeParse(data);

  console.log("RESULT: ", result);
  if (!result.success) {
    const error = new Error("Validation error");
    error.statusCode = 400;
    error.errors = result.error.flatten().fieldErrors; //flatten() method is supported by Zod to convert the error object into a more readable format
    throw error;
  }
  return result.data;
};
