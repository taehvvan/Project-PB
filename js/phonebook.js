
// 시계
function clock() {
    const now = new Date();
    const h = ('0' + now.getHours()).slice(-2);
    const m = ('0' + now.getMinutes()).slice(-2);
    document.querySelectorAll(".clock").forEach(el => el.innerText = `${h}:${m}`);
  }
  clock();
setInterval(clock, 1000);



// 연락처 데이터
const contacts = [
  {
    id: "1",
    img: "https://randomuser.me/api/portraits/men/34.jpg",
    name: "Jang Woo Jin",
    phone: "010 9647 5127",
    group: "가족",
    birthday: "2000-05-01",
    email: "zzzz@gmail.com"
  },
  {
    id: "2",
    img: "https://randomuser.me/api/portraits/women/65.jpg",
    name: "Jane Cooper",
    phone: "010 9647 1111",
    group: "친구",
    birthday: "2001-05-01",
    email: "xxxxx@gmail.com"
  },
  {
    id: "3",
    img: "https://randomuser.me/api/portraits/men/44.jpg",
    name: "Ralph Edwards",
    phone: "010 9647 2222",
    group: "친구",
    birthday: "2002-05-01",
    email: "cccc@gmail.com"
  },
  {
    id: "4",
    img: "https://randomuser.me/api/portraits/men/38.jpg",
    name: "Robert Fox",
    phone: "010 9647 3333",
    group: "직장",
    birthday: "2003-05-01",
    email: "vvvv@gmail.com"
  },
  {
    id: "5",
    img: "https://randomuser.me/api/portraits/men/55.jpg",
    name: "Eleanor Pena",
    phone: "010 9647 0000",
    group: "기타",
    birthday: "2004-05-01",
    email: "qqqq@gmail.com"
  }
];
// localStorage.removeItem('contacts');
if (!localStorage.getItem('contacts')) {
  localStorage.setItem('contacts', JSON.stringify(contacts));
}

function renderContacts() {
  const stored = localStorage.getItem("contacts");
  const contacts = stored ? JSON.parse(stored) : [];

  const isMobile = window.innerWidth <= 767;

  if (isMobile) {
    const mobileList = document.getElementById('mobile-contacts');
    if (!mobileList) return;
    mobileList.innerHTML = '';
    contacts.forEach((contact, i) => {
      mobileList.innerHTML += `
        <li class="contact-item">
          <img class="contact-img" src="${contact.img}" alt="${contact.name}">
          <div class="contact-info">
            <span class="contact-name"><a href="phonebook_detail.html?id=${contact.id}">${contact.name}</a></span>
            <span class="contact-phone">${contact.phone}</span>
          </div>
          <i class="fas fa-phone call-icon"></i>
        </li>
      `;
    });
  } else {
    const webTable = document.getElementById('web-contacts');
    if (!webTable) return;
    webTable.innerHTML = '';
    contacts.forEach((contact, i) => {
      webTable.innerHTML += `
        <tr>
          <td><img class="contact-img" src="${contact.img}" alt="${contact.name}"></td>
          <td class="contact-name"><a href="phonebook_detail.html?id=${contact.id}">${contact.name}</a></td>
          <td class="contact-phone">${contact.phone}</td>
          <td><i class="fas fa-phone call-icon"></i></td>
        </tr>
      `;
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
clock();
renderContacts();
});

window.addEventListener('resize', () => {
renderContacts(); // 창 크기 바뀌면 다시 렌더링
});