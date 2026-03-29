window.AppStudents = (function () {
  const searchInput = document.querySelector("#student-search");
  const idSearchInput = document.querySelector("#student-id-search");
  const groupFilter = document.querySelector("#group-filter");
  const statusFilter = document.querySelector("#status-filter");
  const studentsBody = document.querySelector("#students-table-body");
  const studentsEmpty = document.querySelector("#students-empty");
  const groupsContainer = document.querySelector("#groups-list");
  const formGroupSelect = document.querySelector("#new-student-group");

  const students = window.AppData.students;
  const groups = window.AppData.groups;
  const statusClassNames = window.AppData.statusClassNames;

  function getStatusClass(status) {
    return statusClassNames[status] || "status-pending";
  }

  function getStudentCountLabel(count) {
    const lastTwoDigits = count % 100;
    const lastDigit = count % 10;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 14) {
      return "студентів";
    }

    if (lastDigit === 1) {
      return "студент";
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
      return "студенти";
    }

    return "студентів";
  }

  function renderStudents(list) {
    if (!studentsBody || !studentsEmpty) {
      return;
    }

    if (list.length === 0) {
      studentsBody.innerHTML = "";
      studentsEmpty.hidden = false;
      return;
    }

    studentsEmpty.hidden = true;
    studentsBody.innerHTML = list.map((student) => `
      <tr>
        <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.group}</td>
        <td><span class="status-badge ${getStatusClass(student.status)}">${student.status}</span></td>
      </tr>
    `).join("");
  }

  function fillGroupOptions(selectElement) {
    if (!selectElement) {
      return;
    }

    const options = groups
      .map((group) => `<option value="${group}">${group}</option>`)
      .join("");

    selectElement.insertAdjacentHTML("beforeend", options);
  }

  function applyGroupFromUrl() {
    if (!groupFilter) {
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const groupFromUrl = params.get("group");

    if (groupFromUrl && groups.includes(groupFromUrl)) {
      groupFilter.value = groupFromUrl;
    }
  }

  function renderGroups() {
    if (!groupsContainer) {
      return;
    }

    groupsContainer.innerHTML = groups.map((group) => {
      const count = students.filter((student) => student.group === group).length;
      const description = "Короткий список студентів і базова інформація про склад групи.";
      const countLabel = `${count} ${getStudentCountLabel(count)}`;
      const studentsPageUrl = `students.html?group=${encodeURIComponent(group)}`;

      return `
        <article class="card group-card">
          <div class="group-card-header">
            <h2 class="group-card-title">${group}</h2>
            <span class="group-count">${countLabel}</span>
          </div>
          <p class="group-description">${description}</p>
          <a href="${studentsPageUrl}" class="button button-secondary">Переглянути студентів</a>
        </article>
      `;
    }).join("");
  }

  function applyFilters() {
    const searchValue = searchInput ? searchInput.value.trim().toLowerCase() : "";
    const idValue = idSearchInput ? idSearchInput.value.trim() : "";
    const selectedGroup = groupFilter ? groupFilter.value : "all";
    const selectedStatus = statusFilter ? statusFilter.value : "all";

    const filteredStudents = students.filter((student) => {
      const matchesName = student.name.toLowerCase().includes(searchValue);
      const matchesId = String(student.id).includes(idValue);
      const matchesGroup = selectedGroup === "all" || student.group === selectedGroup;
      const matchesStatus = selectedStatus === "all" || student.status === selectedStatus;

      return matchesName && matchesId && matchesGroup && matchesStatus;
    });

    renderStudents(filteredStudents);
  }

  function init() {
    fillGroupOptions(groupFilter);
    fillGroupOptions(formGroupSelect);
    applyGroupFromUrl();
    renderGroups();
    applyFilters();

    if (searchInput) {
      searchInput.addEventListener("input", applyFilters);
    }

    if (idSearchInput) {
      idSearchInput.addEventListener("input", applyFilters);
    }

    if (groupFilter) {
      groupFilter.addEventListener("change", applyFilters);
    }

    if (statusFilter) {
      statusFilter.addEventListener("change", applyFilters);
    }
  }

  return { init };
})();
