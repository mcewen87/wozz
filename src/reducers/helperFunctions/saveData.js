export default function saveData(location, data) {
  localStorage.setItem(location, JSON.stringify(data))
}
