async function fetchData(file) {
    const response = await fetch(file);
    if (!response.ok) {
      throw new Error(`Error loading JSON file: ${response.statusText}`);
    }
    return await response.json();
  }


  fetchData('data.json')
    .then(data => {
      const tableBody = document.querySelector('#dataTable tbody');
      const bloodGroupSummary = document.querySelector('#bloodGroupSummary');

      const summary = {};

      data.map(item => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        const cell4 = row.insertCell(3);
        const cell5 = row.insertCell(4);

        cell1.textContent = item.id;
        cell2.textContent = item.name;
        cell3.textContent = item.age;
        cell4.textContent = item.gender;
        cell5.textContent = item.bloodGroup;

        if (!summary[item.bloodGroup]) {
            summary[item.bloodGroup] = [];
          }
          summary[item.bloodGroup].push(item.name);
        });

        Object.entries(summary).map(([group, names]) => {
            const li = document.createElement('li');
            li.textContent = `${group}:`;
    
            const nestedUl = document.createElement('ol');
            names.map(name => {
              const nestedLi = document.createElement('li');
              nestedLi.textContent = name;
              nestedUl.appendChild(nestedLi);
            });
    
            li.appendChild(nestedUl);
            bloodGroupSummary.appendChild(li);
          });
    })
    .catch(error => console.error('Error fetching JSON:', error));