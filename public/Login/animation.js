const map = {
room1: 'room url 1',
room2: 'room url 2',
room3: 'room url 3',
}
document.getElementById('submit').addEventListener('click', () =>
  location.href = map[document.getElementById('select').value])