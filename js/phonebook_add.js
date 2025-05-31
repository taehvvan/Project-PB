const defaultImg = "https://cdn-icons-png.flaticon.com/512/847/847969.png";

document.addEventListener('DOMContentLoaded', function () {
  // 시계
  function clock() {
    const now = new Date();
    const h = ('0' + now.getHours()).slice(-2);
    const m = ('0' + now.getMinutes()).slice(-2);
    document.querySelectorAll("#clock").forEach(el => el.innerText = `${h}:${m}`);
  }
  clock();
  setInterval(clock, 1000);

  // 이미지 미리보기
  const imgInput = document.getElementById('addImg');
  const preview = document.getElementById('profilePreview');
  imgInput?.addEventListener('change', function () {
    const file = imgInput.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (e) {
        preview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    } else {
      preview.src = defaultImg;
    }
  });

  
  function saveNewContact(isMobile) {
    const imgData = preview?.src || defaultImg;
    const name = document.getElementById(isMobile ? "mobileAddName" : "addName")?.value.trim();
    const phone = document.getElementById(isMobile ? "mobileAddPhone" : "addPhone")?.value.trim();
    const group = document.getElementById(isMobile ? "mobileAddGroup" : "addGroup")?.value.trim();
    const birthday = document.getElementById(isMobile ? "mobileAddBirthday" : "addBirthday")?.value.trim();
    const email = document.getElementById(isMobile ? "mobileAddEmail" : "addEmail")?.value.trim();

    if (!name || !phone) {
      alert("이름과 전화번호는 필수입니다.");
      return;
    }

    const stored = localStorage.getItem("contacts");
    const contacts = stored ? JSON.parse(stored) : [];

    const maxId = contacts.reduce((max, c) => Math.max(max, Number(c.id || 0)), 0);
    const newContact = {
      id: maxId + 1,
      img: imgData,
      name,
      phone,
      group,
      birthday,
      email
    };

    contacts.push(newContact);
    localStorage.setItem("contacts", JSON.stringify(contacts));
    alert("저장되었습니다.");
    window.location.href = "phonebook.html";
  }

  // 저장 이벤트
  document.querySelector(".add-card")?.addEventListener("submit", function (e) {
    e.preventDefault();
    saveNewContact(false); // 웹용
  });

  document.querySelector(".group")?.addEventListener("submit", function (e) {
  e.preventDefault();
  saveNewContact(true); // 모바일용
});

});
