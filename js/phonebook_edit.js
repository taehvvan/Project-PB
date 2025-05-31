document.addEventListener('DOMContentLoaded', function() {

  function clock() {
    const now = new Date();
    const h = ('0' + now.getHours()).slice(-2);
    const m = ('0' + now.getMinutes()).slice(-2);
    document.querySelectorAll(".clock").forEach(el => el.innerText = `${h}:${m}`);
  }
  clock();
setInterval(clock, 1000);

    const urlParam = new URLSearchParams(location.search);
    const id = urlParam.get("id");
  
    const storedData = localStorage.getItem("contacts");
    const contacts = storedData ? JSON.parse(storedData) : [];
  
    function renderDetail() {
      const contact = contacts.find(c => String(c.id) === id);
      if (!contact) {
        alert("존재하지 않는 연락처입니다.");
        return;
      }
  
      // 모바일
      const mobileImg = document.getElementById("mobile-img");
      const mobileName = document.getElementById("mobile-name");
      const mobilePhone = document.getElementById("mobile-number"); // id 수정
      const mobileGroup = document.getElementById("mobile-tag");
      const mobileBirthday = document.getElementById("mobile-birthday");
      const mobileEmail = document.getElementById("mobile-email");
  
      // 웹
      const webImg = document.getElementById("web-img");
      const webName = document.getElementById("editName");
      const webPhone = document.getElementById("editPhone");
      const webGroup = document.getElementById("editGroup");
      const webBirthday = document.getElementById("editBirthday");
      const webEmail = document.getElementById("editEmail");
  
      // 모바일 데이터 채우기
      if (mobileImg) mobileImg.src = contact.img || "default.png";
      if (mobileName) mobileName.value = contact.name || "";
      if (mobilePhone) mobilePhone.value = contact.phone || "";
      if (mobileGroup) mobileGroup.value = contact.group || "";
      if (mobileBirthday) mobileBirthday.value = contact.birthday || "";
      if (mobileEmail) mobileEmail.value = contact.email || "";
  
      // 웹 데이터 채우기
      if (webImg) webImg.src = contact.img || "default.png";
      if (webName) webName.value = contact.name || "";
      if (webPhone) webPhone.value = contact.phone || "";
      if (webGroup) webGroup.value = contact.group || "";
      if (webBirthday) webBirthday.value = contact.birthday || "";
      if (webEmail) webEmail.value = contact.email || "";
    }
  
    renderDetail();
  
    // 이전 버튼 링크 세팅
    const detailUrl = "phonebook_detail.html?id=" + id;
    const mobileBtn = document.getElementById("mobilePreviousBtn");
    const webBtn = document.getElementById("webPreviousBtn");
    if (mobileBtn) mobileBtn.href = detailUrl;
    if (webBtn) webBtn.href = detailUrl;

    function saveContact(isMobile) {
    const contactIndex = contacts.findIndex(c => String(c.id) === id);
    if (contactIndex === -1) return;

    if (isMobile) {
      contacts[contactIndex].name = document.getElementById("mobile-name").value;
      contacts[contactIndex].phone = document.getElementById("mobile-number").value;
      contacts[contactIndex].group = document.getElementById("mobile-tag").value;
      contacts[contactIndex].birthday = document.getElementById("mobile-birthday").value;
      contacts[contactIndex].email = document.getElementById("mobile-email").value;
    } else {
      contacts[contactIndex].name = document.getElementById("editName").value;
      contacts[contactIndex].phone = document.getElementById("editPhone").value;
      contacts[contactIndex].group = document.getElementById("editGroup").value;
      contacts[contactIndex].birthday = document.getElementById("editBirthday").value;
      contacts[contactIndex].email = document.getElementById("editEmail").value;
    }

    localStorage.setItem("contacts", JSON.stringify(contacts));
  }
  
    // 저장 버튼 이벤트 (모바일)
    const mobileSaveBtn = document.getElementById("saveBtn");
    if (mobileSaveBtn) {
      mobileSaveBtn.addEventListener("click", function(e) {
        e.preventDefault();
        saveContact(true);
        alert("연락처 정보가 저장되었습니다. (모바일)");
        location.href = "phonebook.html";
      });
    }
  
    // 저장 버튼 이벤트 (웹)
    const editCardForm = document.querySelector('.edit-card');
    if (editCardForm) {
      editCardForm.addEventListener('submit', function(e) {
        e.preventDefault();
        saveContact(false);
        alert('연락처 정보가 저장되었습니다. (웹)');
        location.href = "phonebook.html";
      });
    }
  });
  