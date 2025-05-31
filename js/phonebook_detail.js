// 시계
 function clock() {
    const now = new Date();
    const h = ('0' + now.getHours()).slice(-2);
    const m = ('0' + now.getMinutes()).slice(-2);
    document.querySelectorAll(".clock").forEach(el => el.innerText = `${h}:${m}`);
  }
  clock();
setInterval(clock, 1000);
  
  // URL 파라미터
  const urlParam = new URLSearchParams(location.search);
  const id = urlParam.get("id");
  
  const storedData = localStorage.getItem("contacts");
  const contacts = storedData ? JSON.parse(storedData) : [];
  
  console.log("contacts:", contacts);
  console.log("URL id:", id);
  console.log("Available IDs:", contacts.map(c => c.id));
  
  // 상세 정보 렌더링 함수
  function renderDetail() {
    const isMobile = window.innerWidth < 768;
    let found = false;
  
    const contact = contacts.find(c => String(c.id) === id);
    if (!contact) {
      console.warn("연락처 없음");
      return;
    }
  
    if (isMobile) {
      const mobileImg = document.getElementById("mobile-img");
      const mobileName = document.getElementById("mobile-name");
      const mobilePhone = document.getElementById("mobile-phone");
      const mobileGroup = document.getElementById("mobile-group");
      const mobileBirthday = document.getElementById("mobile-birthday");
      const mobileEmail = document.getElementById("mobile-email");
  
      if (mobileImg) mobileImg.src = contact.img || "default.png";
      if (mobileName) mobileName.innerHTML = contact.name || "-";
      if (mobilePhone) mobilePhone.innerHTML = contact.phone || "-";
      if (mobileGroup) mobileGroup.innerHTML = contact.group || "-";
      if (mobileBirthday) mobileBirthday.innerHTML = contact.birthday || "-";
      if (mobileEmail) mobileEmail.innerHTML = contact.email || "-";
  
    } else {
      const webImg = document.getElementById("web-img");
      const webName = document.getElementById("web-name");
      const webPhone = document.getElementById("web-phone");
      const webGroup = document.getElementById("web-group");
      const webBirthday = document.getElementById("web-birthday");
      const webEmail = document.getElementById("web-email");
  
      if (webImg) webImg.src = contact.img || "default.png";
      if (webName) webName.innerHTML = contact.name || "-";
      if (webPhone) webPhone.innerHTML = contact.phone || "-";
      if (webGroup) webGroup.innerHTML = contact.group || "-";
      if (webBirthday) webBirthday.innerHTML = contact.birthday || "-";
      if (webEmail) webEmail.innerHTML = contact.email || "-";
    }

    console.log("Contact group:", contact.group);
    console.log("contact object:", contact);
    contacts.forEach(c => console.log(`id:${c.id}, name:${c.name}, group:${c.group}`));

  }
  
  
  document.addEventListener("DOMContentLoaded", function () {
    renderDetail();

    const editBtn = document.getElementById("editBtn");
    const mobileEditBtn = document.getElementById("mobile-editBtn");
    if (editBtn) {
      editBtn.addEventListener("click", () => {
        window.location.href = `phonebook_edit.html?id=${id}`;
      });
    }
    if (mobileEditBtn) {
      mobileEditBtn.addEventListener("click", () => {
        window.location.href = `phonebook_edit.html?id=${id}`;
      });
    }

    const previousBtn = document.getElementById("previousBtn");
    const mobilePreviousBtn = document.getElementById("mobilePreviousBtn");
    if (previousBtn) previousBtn.href = "phonebook.html";
    if (mobilePreviousBtn) mobilePreviousBtn.href = "phonebook.html";

    // ✅ 모바일 삭제 버튼 이벤트 바인딩
    const mobileDeleteBtn = document.getElementById("mobileDeleteBtn");
    if (mobileDeleteBtn) {
      if (mobileDeleteBtn) {
  mobileDeleteBtn.addEventListener("click", function () {
    document.getElementById("overlay").style.display = "flex";
  });
}
    }

    // ✅ 웹용 삭제 버튼 (기존 방식도 함께 유지 가능)
    const deleteBtn = document.getElementById("deleteBtn");
    if (deleteBtn) {
      deleteBtn.addEventListener("click", () => {
        if (confirm("정말로 이 연락처를 삭제하시겠습니까?")) {
          const newContacts = contacts.filter(contact => String(contact.id) !== id);
          localStorage.setItem("contacts", JSON.stringify(newContacts));
          alert("삭제되었습니다.");
          window.location.href = "phonebook.html";
        }
      });
    }


    window.deleteprofile = function (isConfirmed) {
      document.getElementById('overlay').style.display = 'none';

      if (isConfirmed) {
        const newContacts = contacts.filter(contact => String(contact.id) !== id);
        localStorage.setItem("contacts", JSON.stringify(newContacts));
        window.location.href = "phonebook.html";
      }
    };
  });


  window.addEventListener('resize', () => {
  renderDetail(); // 창 크기 바뀌면 다시 렌더링
});
  