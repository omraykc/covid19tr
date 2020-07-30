export default async function Fetch(...args) {
  const res = await fetch(...args)
  return res.json()
};