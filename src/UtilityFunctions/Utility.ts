export const GenerateAssetCode = () => {
  const prefix = "AST";
  const randomNumber = Math.floor(100000 + Math.random() * 900000);

  return `${prefix}-${randomNumber}`;
};
